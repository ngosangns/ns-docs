const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const { execFileSync } = require("node:child_process")

const {
  checkConcept,
  checkReservedFile,
  checkBundle
} = require("../okf-conformance")

const CLI = path.join(__dirname, "..", "okf-conformance.js")

// rulesOf(diagnostics) -> string[]
// Collects the `rule` field of every diagnostic, preserving order.
function rulesOf(diagnostics) {
  return diagnostics.map((diag) => diag.rule)
}

// countRule(diagnostics, rule) -> number
// How many diagnostics carry the given rule name.
function countRule(diagnostics, rule) {
  return diagnostics.filter((diag) => diag.rule === rule).length
}

// makeTempDir() -> string
// Fresh temp directory; callers clean up with fs.rmSync(dir, recursive).
function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "okf-conf-"))
}

// writeFile(root, relPath, contents)
// Writes a file under root, creating parent directories as needed.
function writeFile(root, relPath, contents) {
  const absPath = path.join(root, relPath)
  fs.mkdirSync(path.dirname(absPath), { recursive: true })
  fs.writeFileSync(absPath, contents, "utf8")
}

// runCli(args) -> { status, stdout }
// Spawns the conformance CLI, capturing exit status and stdout whether the
// process exits 0 or non-zero.
function runCli(args) {
  try {
    const stdout = execFileSync("node", [CLI, ...args], { encoding: "utf8" })
    return { status: 0, stdout }
  } catch (err) {
    return { status: err.status, stdout: (err.stdout || "").toString() }
  }
}

// --- checkConcept ----------------------------------------------------------

test("checkConcept reports a single type-required error when type is missing", () => {
  const diags = checkConcept({
    id: "note",
    relPath: "note.md",
    data: { title: "T", description: "D", resource: "R", tags: ["a"], timestamp: "2024-01-01" }
  })

  assert.equal(countRule(diags, "type-required"), 1)
  const typeError = diags.find((diag) => diag.rule === "type-required")
  assert.equal(typeError.level, "error")
  assert.equal(typeError.file, "note.md")
})

test("checkConcept treats an empty type as missing", () => {
  const diags = checkConcept({
    relPath: "note.md",
    data: { type: "   ", title: "T", description: "D", resource: "R", tags: ["a"], timestamp: "2024-01-01" }
  })

  assert.equal(countRule(diags, "type-required"), 1)
})

test("checkConcept reports frontmatter-parse error and nothing else when parseError is set", () => {
  const diags = checkConcept({ relPath: "bad.md", parseError: true })

  assert.deepEqual(rulesOf(diags), ["frontmatter-parse"])
  assert.equal(diags[0].level, "error")
})

test("checkConcept warns recommended-field-missing for each absent recommended field", () => {
  const diags = checkConcept({ relPath: "note.md", data: { type: "Note" } })

  // title, description, tags, timestamp are missing and warned. `resource` is
  // optional (OKF allows omitting it) so it is NOT warned.
  assert.equal(countRule(diags, "recommended-field-missing"), 4)
  for (const diag of diags) {
    assert.equal(diag.level, "warning")
  }
})

test("checkConcept does not warn about a missing resource", () => {
  const diags = checkConcept({
    relPath: "note.md",
    data: { type: "Note", title: "T", description: "D", tags: ["a"], timestamp: "2024-01-01" }
  })

  assert.equal(diags.length, 0)
})

test("checkConcept warns timestamp-format exactly once for an invalid timestamp", () => {
  const diags = checkConcept({
    relPath: "note.md",
    data: {
      type: "Note",
      title: "T",
      description: "D",
      resource: "R",
      tags: ["a"],
      timestamp: "not-a-date"
    }
  })

  assert.equal(countRule(diags, "timestamp-format"), 1)
  const warn = diags.find((diag) => diag.rule === "timestamp-format")
  assert.equal(warn.level, "warning")
})

test("checkConcept warns tags-format exactly once when tags is not a list", () => {
  const diags = checkConcept({
    relPath: "note.md",
    data: {
      type: "Note",
      title: "T",
      description: "D",
      resource: "R",
      tags: "tag1",
      timestamp: "2024-01-01"
    }
  })

  assert.equal(countRule(diags, "tags-format"), 1)
  const warn = diags.find((diag) => diag.rule === "tags-format")
  assert.equal(warn.level, "warning")
})

test("checkConcept emits no diagnostics for a fully conformant concept", () => {
  const diags = checkConcept({
    relPath: "note.md",
    data: {
      type: "Note",
      title: "T",
      description: "D",
      resource: "R",
      tags: ["a"],
      timestamp: "2024-01-01"
    }
  })

  assert.deepEqual(diags, [])
})

// --- checkReservedFile -----------------------------------------------------

test("checkReservedFile flags frontmatter on a non-root index.md", () => {
  const diags = checkReservedFile({
    relPath: "sub/index.md",
    name: "index.md",
    isRoot: false,
    hadFrontmatter: true,
    data: { type: "Note" }
  })

  assert.equal(countRule(diags, "index-no-frontmatter"), 1)
  assert.equal(diags[0].level, "error")
})

// --- checkBundle -----------------------------------------------------------

test("checkBundle is conformant when there are no error diagnostics", () => {
  const report = checkBundle({
    concepts: [
      {
        relPath: "note.md",
        data: {
          type: "Note",
          title: "T",
          description: "D",
          resource: "R",
          tags: ["a"],
          timestamp: "2024-01-01"
        }
      }
    ],
    reservedFiles: []
  })

  assert.equal(report.conformant, true)
  assert.equal(report.conceptCount, 1)
  assert.deepEqual(report.diagnostics, [])
})

test("checkBundle is conformant despite warnings (no errors)", () => {
  const report = checkBundle({
    // Missing recommended fields produce warnings only.
    concepts: [{ relPath: "note.md", data: { type: "Note" } }],
    reservedFiles: []
  })

  assert.ok(report.diagnostics.length > 0)
  assert.ok(report.diagnostics.every((diag) => diag.level === "warning"))
  assert.equal(report.conformant, true)
})

test("checkBundle is non-conformant when any error diagnostic is present", () => {
  const report = checkBundle({
    concepts: [{ relPath: "note.md", data: {} }],
    reservedFiles: []
  })

  assert.ok(report.diagnostics.some((diag) => diag.level === "error"))
  assert.equal(report.conformant, false)
})

test("checkBundle diagnostics each carry file, level, rule and message", () => {
  const report = checkBundle({
    concepts: [{ relPath: "note.md", data: {} }],
    reservedFiles: []
  })

  for (const diag of report.diagnostics) {
    assert.equal(typeof diag.file, "string")
    assert.ok(diag.level === "error" || diag.level === "warning")
    assert.equal(typeof diag.rule, "string")
    assert.ok(diag.rule.length > 0)
    assert.equal(typeof diag.message, "string")
    assert.ok(diag.message.length > 0)
  }
})

// --- CLI: --json output and exit codes -------------------------------------

test("CLI --json prints a parseable report with conformant and diagnostics", () => {
  const root = makeTempDir()
  try {
    writeFile(
      root,
      "note.md",
      "---\ntype: Note\ntitle: T\ndescription: D\nresource: R\ntags:\n  - a\ntimestamp: 2024-01-01\n---\nbody\n"
    )

    const { status, stdout } = runCli([root, "--json"])

    assert.equal(status, 0)
    const report = JSON.parse(stdout)
    assert.equal(report.conformant, true)
    assert.ok(Array.isArray(report.diagnostics))
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test("CLI exits 0 for a conformant bundle", () => {
  const root = makeTempDir()
  try {
    writeFile(
      root,
      "note.md",
      "---\ntype: Note\ntitle: T\ndescription: D\nresource: R\ntags:\n  - a\ntimestamp: 2024-01-01\n---\nbody\n"
    )

    const { status } = runCli([root])

    assert.equal(status, 0)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test("CLI exits non-zero when a bundle has an error diagnostic", () => {
  const root = makeTempDir()
  try {
    // Missing `type` -> type-required error -> non-zero exit.
    writeFile(root, "note.md", "---\ntitle: T\n---\nbody\n")

    const { status, stdout } = runCli([root, "--json"])

    assert.notEqual(status, 0)
    const report = JSON.parse(stdout)
    assert.equal(report.conformant, false)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
