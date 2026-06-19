const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const { migrateBundle } = require("../okf-migrate")
const { walkBundle } = require("../okf-core")

// End-to-end integration test (Requirements 12.4, 12.5): build a small sample
// bundle in a temp dir, run migrateBundle in Apply_Mode against it, then verify
// the returned ConformanceReport is conformant. When it is not, fail with a
// readable list of every violation so the offending file/level/rule/message is
// visible in the test output (Requirement 12.5).
//
// `backup:false` is used throughout: createBackupSnapshot spawns
// scripts/backup.js which tar-gzips the WHOLE workspace (not `rootDir`), so a
// real backup would touch the project and be slow/flaky. Backup ordering is
// covered by dedicated tests; this test keeps the apply run hermetic.

// writeFile(root, relPath, contents)
// Writes `contents` to `root/relPath`, creating parent directories as needed.
function writeFile(root, relPath, contents) {
  const absPath = path.join(root, relPath)
  fs.mkdirSync(path.dirname(absPath), { recursive: true })
  fs.writeFileSync(absPath, contents, "utf8")
}

// describeViolations(report) -> string
// Builds a human-readable, newline-separated list of every diagnostic in a
// ConformanceReport so a non-conformant result prints exactly what went wrong.
function describeViolations(report) {
  const lines = report.diagnostics.map(
    (d) => `  [${d.level}] ${d.file} (${d.rule}): ${d.message}`
  )
  return (
    `Bundle is not conformant after migrate ` +
    `(${report.conceptCount} concepts, ${report.diagnostics.length} diagnostics):\n` +
    lines.join("\n")
  )
}

// buildSampleBundle(root)
// Lays out a small but representative bundle across a couple of directories:
//   - concepts missing `type` (frontmatter-only and no-frontmatter)
//   - a fully-specified concept with explicit type/title/timestamp
//   - resolvable internal wikilinks and a resolvable relative markdown link
//   - one broken wikilink (must NOT break conformance -> only a `broken-link`
//     warning, never an error; Requirement 6.1)
//   - a non-reserved concept named like content under TYPE_RULES prefixes
function buildSampleBundle(root) {
  // Missing `type`, has frontmatter, links to a sibling concept (resolvable).
  writeFile(
    root,
    "Life/Health/Sleep.md",
    "---\ntitle: Sleep\n---\nGood sleep pairs with [[Hydration]].\n"
  )

  // Fully-specified concept: explicit type + recommended fields + valid tags.
  writeFile(
    root,
    "Life/Health/Hydration.md",
    "---\n" +
      "type: Note\n" +
      "title: Hydration\n" +
      "description: Drink water\n" +
      "tags:\n  - health\n  - habits\n" +
      "timestamp: 2024-01-01T00:00:00.000Z\n" +
      "---\nDrink enough water every day.\n"
  )

  // No frontmatter at all under an English/ prefix (TYPE_RULES -> Reference).
  writeFile(
    root,
    "English/Grammar/Tenses.md",
    "Present, past and future tenses.\n"
  )

  // Explicit type under a Projects/ prefix; body has a resolvable relative
  // markdown link plus one broken wikilink (tolerated as a warning).
  writeFile(
    root,
    "Projects/Alpha.md",
    "---\ntype: Playbook\ntitle: Alpha\n---\n" +
      "See [Sleep](../Life/Health/Sleep.md) and [[DoesNotExist]].\n"
  )

  // No frontmatter under an inbox/ prefix (TYPE_RULES -> Note).
  writeFile(root, "inbox/quick.md", "A quick captured thought.\n")
}

// Requirements 12.4, 12.5: migrate then conform end-to-end.
test("migrate then conformance: sample bundle is conformant after apply", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "okf-integration-"))
  try {
    buildSampleBundle(root)

    const result = migrateBundle(root, { apply: true, backup: false })

    // Requirement 12.5: on failure, surface the full violation list.
    assert.ok(result.report.conformant === true, describeViolations(result.report))

    // Every concept must end up with a non-empty `type` (re-read from disk).
    const { concepts } = walkBundle(root)
    for (const concept of concepts) {
      const type = concept.data ? concept.data.type : undefined
      assert.ok(
        typeof type === "string" && type.trim().length >= 1,
        `Concept "${concept.id}" has empty type after migrate: ${JSON.stringify(type)}`
      )
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
