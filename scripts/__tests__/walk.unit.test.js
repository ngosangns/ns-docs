const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const { walkBundle, parseConcept } = require("../okf-core/walk")

// makeTempDir() -> string
// Creates a fresh temp directory and returns its absolute path. Callers are
// responsible for cleaning it up with fs.rmSync(dir, { recursive: true }).
function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "okf-walk-"))
}

// writeFile(root, relPath, contents)
// Writes `contents` to `root/relPath`, creating parent directories as needed.
function writeFile(root, relPath, contents) {
  const absPath = path.join(root, relPath)
  fs.mkdirSync(path.dirname(absPath), { recursive: true })
  fs.writeFileSync(absPath, contents, "utf8")
}

test("walkBundle classifies concepts, reserved files and attachments", () => {
  const root = makeTempDir()
  try {
    writeFile(root, "note.md", "---\ntype: Note\n---\nbody\n")
    writeFile(root, "sub/topic.md", "---\ntype: Reference\n---\ntopic body\n")
    writeFile(root, "index.md", "* listing\n")
    writeFile(root, "log.md", "## 2024-01-01\n")
    writeFile(root, "pic.PNG", "binary-ish")
    writeFile(root, ".git/x.md", "---\ntype: Note\n---\n")
    writeFile(root, "node_modules/y.md", "---\ntype: Note\n---\n")
    writeFile(root, "web/dist/z.md", "---\ntype: Note\n---\n")

    const bundle = walkBundle(root)

    const conceptIds = bundle.concepts.map((c) => c.id).sort()
    assert.deepEqual(conceptIds, ["note", "sub/topic"])

    assert.deepEqual(bundle.indexFiles, ["index.md"])
    assert.deepEqual(bundle.logFiles, ["log.md"])
    assert.deepEqual(bundle.attachments, ["pic.PNG"])

    // Ignored directories must contribute nothing to any collection.
    const allPaths = [
      ...bundle.concepts.map((c) => c.relPath),
      ...bundle.indexFiles,
      ...bundle.logFiles,
      ...bundle.attachments
    ]
    for (const ignored of [".git", "node_modules", "web/dist"]) {
      assert.ok(
        !allPaths.some((p) => p.startsWith(ignored + "/")),
        `expected no entries under ${ignored}`
      )
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test("walkBundle index contains every concept by id", () => {
  const root = makeTempDir()
  try {
    writeFile(root, "note.md", "---\ntype: Note\n---\nbody\n")
    writeFile(root, "sub/topic.md", "---\ntype: Reference\n---\ntopic body\n")

    const bundle = walkBundle(root)

    for (const concept of bundle.concepts) {
      assert.equal(bundle.index.get(concept.id), concept)
    }
    assert.ok(bundle.index.get("note"))
    assert.ok(bundle.index.get("sub/topic"))
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test("walkBundle throws when the root does not exist", () => {
  const root = makeTempDir()
  const missing = path.join(root, "does-not-exist")
  try {
    assert.throws(() => walkBundle(missing))
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test("walkBundle returns an empty bundle for an empty directory", () => {
  const root = makeTempDir()
  try {
    const bundle = walkBundle(root)

    assert.deepEqual(bundle.concepts, [])
    assert.deepEqual(bundle.indexFiles, [])
    assert.deepEqual(bundle.logFiles, [])
    assert.deepEqual(bundle.attachments, [])
    assert.equal(bundle.index.size, 0)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test("parseConcept derives id and relPath from a concept file", () => {
  const root = makeTempDir()
  try {
    writeFile(root, "sub/topic.md", "---\ntype: Reference\n---\ntopic body\n")
    const concept = parseConcept(path.join(root, "sub/topic.md"), root)

    assert.equal(concept.id, "sub/topic")
    assert.equal(concept.relPath, "sub/topic.md")
    assert.equal(concept.data.type, "Reference")
    assert.equal(concept.hadFrontmatter, true)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
