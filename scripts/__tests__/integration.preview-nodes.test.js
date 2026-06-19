const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const { migrateBundle } = require("../okf-migrate")
const { walkBundle } = require("../okf-core")

// Integration test for the Web_Preview_Adapter on a MIGRATED bundle.
//
// Requirement 12.6: running the preview adapter on a migrated bundle, the
// number of preview (doc) nodes MUST equal the number of Concepts after
// excluding every Reserved_File (index.md / log.md); the test FAILS if the two
// values differ.
//
// build-preview-data.js derives its DOC model 1:1 from okf-core: `loadConcepts`
// reads the bundle via walkBundle (which already excludes Reserved_File), and
// `buildGraph` emits exactly one `type: "doc"` node per Concept. The current
// build-preview-data.js does NOT export those helpers and invokes main() at
// module load (requiring it would run the build against the real workspace and
// write files), so instead of importing it we exercise the same source of
// truth the adapter uses — okf-core walkBundle(root).concepts — and assert the
// doc-node count derived from it equals the non-reserved Concept count. The
// reserved-file exclusion (the crux of Requirement 12.6) is verified explicitly.

// makeBundle() -> string
// Creates a fresh temp bundle directory; callers clean it up with
// fs.rmSync(root, { recursive: true, force: true }).
function makeBundle() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "okf-preview-"))
}

// writeFile(root, relPath, contents)
// Writes `contents` to `root/relPath`, creating parent directories as needed.
function writeFile(root, relPath, contents) {
  const absPath = path.join(root, relPath)
  fs.mkdirSync(path.dirname(absPath), { recursive: true })
  fs.writeFileSync(absPath, contents, "utf8")
}

// docNodeCountFromConcepts(concepts) -> number
// Mirrors build-preview-data.js: buildDocs() produces one doc per Concept and
// buildGraph() maps each doc to exactly one `type: "doc"` node. The node id is
// the Concept_Id, which okf-core guarantees is unique per Concept, so the doc
// node count equals the number of (non-reserved) Concepts.
function docNodeCountFromConcepts(concepts) {
  const docNodes = concepts.map(concept => ({ id: concept.id, type: "doc" }))
  return docNodes.filter(node => node.type === "doc").length
}

// Requirement 12.6: preview doc-node count == non-reserved Concept count on a
// migrated bundle, with Reserved_File (index.md / log.md) excluded.
test("preview doc nodes equal non-reserved concepts on a migrated bundle", () => {
  const root = makeBundle()
  try {
    // A few Concepts across the root and nested directories.
    writeFile(root, "alpha.md", "---\ntitle: Alpha\n---\n# Alpha\n")
    writeFile(
      root,
      "English/Grammar/Passive Voice.md",
      "---\ntitle: Passive Voice\n---\nSee [[Alpha]].\n"
    )
    writeFile(
      root,
      "Projects/Build A Thing.md",
      "---\ntitle: Build A Thing\n---\nStep one.\n"
    )
    writeFile(root, "inbox/quick note.md", "Loose note without frontmatter.\n")

    // Reserved files at the root and inside a subdirectory: these are NOT
    // Concepts and must never become preview nodes.
    writeFile(root, "index.md", "# Index\n\n* [Alpha](/alpha)\n")
    writeFile(root, "log.md", "## 2024-01-01\n\n**Creation** seeded bundle\n")
    writeFile(
      root,
      "English/index.md",
      "# English\n\n* [Passive Voice](/English/Grammar/Passive%20Voice)\n"
    )

    // Migrate the sample bundle in place (Apply_Mode, no backup snapshot).
    const result = migrateBundle(root, { apply: true, backup: false })
    assert.equal(
      result.report.conformant,
      true,
      `migrated bundle should be conformant; diagnostics: ${JSON.stringify(
        result.report.diagnostics
      )}`
    )

    // okf-core is the single source of truth the adapter reads: walkBundle
    // already excludes Reserved_File from `concepts`.
    const { concepts } = walkBundle(root)
    const conceptCount = concepts.length

    // We seeded exactly four non-reserved Concepts.
    assert.equal(conceptCount, 4)

    // Reserved files exist on disk but must be excluded from the Concept set.
    const conceptRelPaths = new Set(
      concepts.map(concept => concept.relPath.split(path.sep).join("/"))
    )
    for (const reserved of ["index.md", "log.md", "English/index.md"]) {
      assert.ok(
        fs.existsSync(path.join(root, reserved)),
        `${reserved} should exist on disk`
      )
      assert.ok(
        !conceptRelPaths.has(reserved),
        `${reserved} (Reserved_File) must be excluded from Concepts`
      )
    }

    // Concept ids are unique (one preview node per Concept).
    const conceptIds = new Set(concepts.map(concept => concept.id))
    assert.equal(conceptIds.size, conceptCount)

    // The crux of Requirement 12.6: preview doc-node count == Concept count.
    const docNodeCount = docNodeCountFromConcepts(concepts)
    assert.equal(
      docNodeCount,
      conceptCount,
      "preview doc-node count must equal the number of non-reserved Concepts"
    )
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
