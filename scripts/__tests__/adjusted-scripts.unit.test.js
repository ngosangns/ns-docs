const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const { spawnSync } = require("node:child_process")

const { checkBundle } = require("../okf-conformance")

// Repo root is two levels up from this test file (scripts/__tests__/..).
const REPO_ROOT = path.resolve(__dirname, "..", "..")
const CHECK_LINKS = path.join(REPO_ROOT, "scripts", "check-links.js")

// runScript(scriptPath, args) -> { status, stdout, stderr }
// Spawns a script as a child process (these scripts call process.exit on
// require), capturing its exit status and output regardless of exit code.
function runScript(scriptPath, args) {
  const result = spawnSync("node", [scriptPath, ...args], {
    cwd: REPO_ROOT,
    encoding: "utf8"
  })
  return {
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || ""
  }
}

// makeTempDir() -> string
// Fresh temp directory; callers clean up with fs.rmSync(dir, recursive).
function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "okf-adj-"))
}

// writeFile(root, relPath, contents)
// Writes a file under root, creating parent directories as needed.
function writeFile(root, relPath, contents) {
  const absPath = path.join(root, relPath)
  fs.mkdirSync(path.dirname(absPath), { recursive: true })
  fs.writeFileSync(absPath, contents, "utf8")
}

// countRule(diagnostics, rule) -> number
function countRule(diagnostics, rule) {
  return diagnostics.filter((diag) => diag.rule === rule).length
}

// --- check-links.js: broken links are warnings, never failures (Req 11.7) --

test("check-links exits 0 (broken links never fail the check)", () => {
  // The real vault contains broken links; check-links must still exit 0.
  const { status } = runScript(CHECK_LINKS, [])

  assert.equal(status, 0)
})

test("check-links --broken exits 0 and reports broken links as warnings", () => {
  // Even when broken links are listed, the contract is a warning + exit 0.
  const { status, stdout } = runScript(CHECK_LINKS, ["--broken"])

  assert.equal(status, 0)
  // Either no broken links, or they are surfaced as warnings (never errors).
  const reportsBroken = /broken links/i.test(stdout)
  const reportsNone = /No broken links/i.test(stdout)
  assert.ok(reportsBroken || reportsNone)
})

// --- validate-frontmatter.js delegates to checkBundle (Req 11.9, 11.10) ----
//
// validate-frontmatter prints exactly the diagnostics produced by
// okf-conformance.checkBundle, so we validate the mapping it relies on against
// a controlled temp bundle rather than the whole repo.

test("validate-frontmatter mapping: missing type -> one type-required error", () => {
  const root = makeTempDir()
  try {
    // Concept missing `type`, but with every recommended field present so the
    // only error is the type-required one.
    writeFile(
      root,
      "no-type.md",
      "---\ntitle: T\ndescription: D\nresource: R\ntags:\n  - a\ntimestamp: 2024-01-01\n---\nbody\n"
    )

    const report = checkBundle(root)
    const typeErrors = report.diagnostics.filter(
      (diag) => diag.rule === "type-required"
    )

    assert.equal(typeErrors.length, 1)
    assert.equal(typeErrors[0].level, "error")
    assert.equal(report.conformant, false)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test("validate-frontmatter mapping: missing tags -> warning, not error", () => {
  const root = makeTempDir()
  try {
    // Concept with required `type` but no `tags`: tags must be a warning, and
    // with type present the bundle stays conformant (no errors).
    writeFile(
      root,
      "no-tags.md",
      "---\ntype: Note\ntitle: T\ndescription: D\nresource: R\ntimestamp: 2024-01-01\n---\nbody\n"
    )

    const report = checkBundle(root)
    const tagsWarnings = report.diagnostics.filter(
      (diag) =>
        diag.rule === "recommended-field-missing" && /`tags`/.test(diag.message)
    )

    assert.equal(tagsWarnings.length, 1)
    assert.equal(tagsWarnings[0].level, "warning")
    // Missing tags is never an error.
    assert.equal(countRule(report.diagnostics, "type-required"), 0)
    assert.equal(report.conformant, true)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
