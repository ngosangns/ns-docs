const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const { migrateBundle } = require("../okf-migrate")
const { serializeConcept } = require("../okf-core")

// Unit tests for migrateBundle(rootDir, options) -> { report, broken, written,
// skipped, errors }. See Requirements 6.3, 6.4, 10.1, 10.4, 10.5, 10.7.
//
// Backup-before-write (Requirements 10.2/10.3) is intentionally NOT exercised
// here with `backup:true`: createBackupSnapshot spawns scripts/backup.js, which
// tar-gzips the WHOLE workspace (it runs against the project, not `rootDir`),
// so driving it from a unit test would touch the real workspace and be slow and
// flaky. Backup ordering is covered separately; these tests keep apply runs
// fast and hermetic by always passing `backup:false`.

// makeBundle() -> string
// Creates a fresh temp bundle directory and returns its absolute path. Callers
// clean it up with fs.rmSync(root, { recursive: true, force: true }).
function makeBundle() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "okf-migrate-"))
}

// writeFile(root, relPath, contents)
// Writes `contents` to `root/relPath`, creating parent directories as needed.
function writeFile(root, relPath, contents) {
  const absPath = path.join(root, relPath)
  fs.mkdirSync(path.dirname(absPath), { recursive: true })
  fs.writeFileSync(absPath, contents, "utf8")
}

// read(root, relPath) -> string
function read(root, relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8")
}

// Requirement 10.1: Dry_Run_Mode (apply:false, the default) must never modify
// the disk. A bundle whose only file is missing `type` clearly needs changes,
// yet the file must be byte-identical afterwards and `written` empty.
test("dry-run writes nothing even when the bundle needs changes", () => {
  const root = makeBundle()
  try {
    const before = "---\ntitle: Needs Type\n---\nbody without links\n"
    writeFile(root, "note.md", before)

    const result = migrateBundle(root, { apply: false })

    assert.deepEqual(result.written, [])
    assert.equal(read(root, "note.md"), before)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// Requirement 10.4: Apply_Mode writes a file when migration changes it. A file
// with no `type` gets the inferred type written to disk and is listed in
// `written`.
test("apply writes the inferred type when a file is missing type", () => {
  const root = makeBundle()
  try {
    writeFile(root, "note.md", "---\ntitle: Needs Type\n---\nbody without links\n")

    const result = migrateBundle(root, { apply: true, backup: false })

    const after = read(root, "note.md")
    // Root file with no matching TYPE_RULE prefix -> inferred default "Note".
    assert.match(after, /type: Note/)
    assert.ok(result.written.includes("note.md"))
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// Requirement 10.5: a fully-conformant file (explicit type + all recommended
// fields present + no links) is a migration fixed point: apply leaves it
// byte-identical and never lists it in `written`. The fixture is built with
// serializeConcept so it is guaranteed to be a fixed point of the serializer.
test("apply skips a fully-conformant file (no change, not written)", () => {
  const root = makeBundle()
  try {
    const content = serializeConcept({
      data: {
        type: "Note",
        title: "Stable Note",
        description: "",
        timestamp: "2024-01-01T00:00:00.000Z"
      },
      body: "Just stable prose, no links.\n",
      hadFrontmatter: true
    })
    writeFile(root, "stable.md", content)

    const result = migrateBundle(root, { apply: true, backup: false })

    assert.equal(read(root, "stable.md"), content)
    assert.ok(!result.written.includes("stable.md"))
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// Requirement 10.7: --only=frontmatter migrates frontmatter only. A file with
// an internal wikilink and no type gets a type added, but its body link is left
// untouched. A resolvable target exists so the link WOULD be rewritten if the
// links pass ran.
test("--only=frontmatter adds type but does not rewrite body links", () => {
  const root = makeBundle()
  try {
    writeFile(root, "Target.md", "---\ntype: Note\ntitle: The Target\n---\ntarget body\n")
    writeFile(root, "source.md", "---\ntitle: Src\n---\nsee [[Target]] here\n")

    const result = migrateBundle(root, { apply: true, only: "frontmatter", backup: false })

    const after = read(root, "source.md")
    assert.match(after, /type:/)
    // Body wikilink untouched: links pass did not run.
    assert.match(after, /\[\[Target\]\]/)
    assert.ok(result.written.includes("source.md"))
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// Requirement 10.7: --only=links migrates body links only. The wikilink is
// rewritten to a bundle-relative markdown link, but no `type` is added to the
// frontmatter (frontmatter pass did not run).
test("--only=links rewrites body links but does not add type", () => {
  const root = makeBundle()
  try {
    writeFile(root, "Target.md", "---\ntype: Note\ntitle: The Target\n---\ntarget body\n")
    writeFile(root, "source.md", "---\ntitle: Src\n---\nsee [[Target]] here\n")

    const result = migrateBundle(root, { apply: true, only: "links", backup: false })

    const after = read(root, "source.md")
    // Link rewritten to bundle-relative markdown form.
    assert.match(after, /\]\(\/Target\)/)
    assert.doesNotMatch(after, /\[\[Target\]\]/)
    // Frontmatter pass did not run: no type key was added.
    assert.doesNotMatch(after, /type:/)
    assert.ok(result.written.includes("source.md"))
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// Requirements 6.3, 6.4, 5.9: unresolved internal links are collected into
// `broken` as { sourceId, target } records (and never abort the run).
test("--report-broken: a broken wikilink is listed in result.broken", () => {
  const root = makeBundle()
  try {
    writeFile(root, "source.md", "---\ntype: Note\n---\nsee [[Nonexistent]] here\n")

    const result = migrateBundle(root, { apply: false, reportBroken: true })

    assert.deepEqual(result.broken, [{ sourceId: "source", target: "Nonexistent" }])
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// Requirements 6.3, 6.4: a bundle with no broken links yields an empty list.
test("--report-broken: result.broken is an empty list when there are no broken links", () => {
  const root = makeBundle()
  try {
    writeFile(root, "Target.md", "---\ntype: Note\ntitle: The Target\n---\ntarget body\n")
    writeFile(root, "source.md", "---\ntype: Note\n---\nsee [[Target]] here\n")

    const result = migrateBundle(root, { apply: false, reportBroken: true })

    assert.deepEqual(result.broken, [])
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
