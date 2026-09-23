const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const {
  buildDirectoryIndex,
  buildRootIndex,
  renderConceptBullet,
  renderSubdirBullet,
  isIndexUsedAsConcept,
  generateIndexes
} = require("../okf-index")

// makeTempDir() -> string
// Creates a fresh temp directory and returns its absolute path. Callers are
// responsible for cleaning it up with fs.rmSync(dir, { recursive: true }).
function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "okf-index-"))
}

// writeFile(root, relPath, contents)
// Writes `contents` to `root/relPath`, creating parent directories as needed.
function writeFile(root, relPath, contents) {
  const absPath = path.join(root, relPath)
  fs.mkdirSync(path.dirname(absPath), { recursive: true })
  fs.writeFileSync(absPath, contents, "utf8")
}

// concept(relPath, data) -> Concept-like
// Minimal Concept shape consumed by the index builders (relPath + data).
function concept(relPath, data) {
  return { relPath, data: data || {} }
}

// --- Requirement 7.3: concept bullet format --------------------------------

test("renderConceptBullet emits `- [Title](url) - description`", () => {
  const bullet = renderConceptBullet(
    concept("Passive Voice.md", { title: "Passive Voice", description: "How to form it" })
  )
  assert.equal(bullet, "- [Passive Voice](Passive%20Voice.md) - How to form it")
})

test("renderConceptBullet Title falls back to filename without .md when title empty", () => {
  const fromBlank = renderConceptBullet(concept("Relative Clauses.md", { title: "   " }))
  assert.equal(fromBlank, "- [Relative Clauses](Relative%20Clauses.md)")

  const fromMissing = renderConceptBullet(concept("Reported Speech.md", {}))
  assert.equal(fromMissing, "- [Reported Speech](Reported%20Speech.md)")
})

// --- Requirement 7.4: empty description drops ` - description` --------------

test("renderConceptBullet drops the description segment when description is empty", () => {
  const emptyString = renderConceptBullet(concept("A.md", { title: "A", description: "" }))
  assert.equal(emptyString, "- [A](A.md)")

  const whitespace = renderConceptBullet(concept("B.md", { title: "B", description: "   " }))
  assert.equal(whitespace, "- [B](B.md)")

  const missing = renderConceptBullet(concept("C.md", { title: "C" }))
  assert.equal(missing, "- [C](C.md)")
})

// --- Requirement 7.5: reserved files excluded ------------------------------

test("buildDirectoryIndex lists only the concepts it is given (reserved already excluded)", () => {
  const content = buildDirectoryIndex("sub", {
    concepts: [concept("topic.md", { title: "Topic", description: "" })],
    subdirs: []
  })
  assert.match(content, /- \[Topic\]\(topic\.md\)/)
  assert.ok(!content.includes("index.md"), "reserved index.md must not appear")
  assert.ok(!content.includes("log.md"), "reserved log.md must not appear")
})

test("generateIndexes never lists index.md or log.md as concepts", () => {
  const root = makeTempDir()
  try {
    writeFile(root, "note.md", "---\ntitle: Note\n---\nbody\n")
    writeFile(root, "log.md", "## 2024-01-01\n")

    generateIndexes(root, { apply: true })
    const rootIndex = fs.readFileSync(path.join(root, "index.md"), "utf8")

    assert.match(rootIndex, /- \[Note\]\(note\.md\)/)
    assert.ok(!/\]\(log\.md\)/.test(rootIndex), "log.md must not be listed as a concept")
    assert.ok(!/\]\(index\.md\)/.test(rootIndex), "index.md must not be listed as a concept")
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// --- Requirement 7.6: subdir bullet label/url ------------------------------

test("renderSubdirBullet links to the subdirectory's index.md from the bundle root", () => {
  assert.equal(renderSubdirBullet("Grammar", ""), "- [Grammar](Grammar/index.md)")
  assert.equal(
    renderSubdirBullet("Passive Voice", "English/Grammar"),
    "- [Passive Voice](English/Grammar/Passive%20Voice/index.md)"
  )
})

test("buildDirectoryIndex renders subdirs under # Sections with bundle-root index.md urls", () => {
  const content = buildDirectoryIndex("root", {
    concepts: [],
    subdirs: ["Grammar"]
  })
  assert.match(content, /# Sections/)
  assert.match(content, /- \[Grammar\]\(root\/Grammar\/index\.md\)/)
})

// --- Requirement 7.7: deterministic case-insensitive ascending sort --------

test("concepts are sorted ascending case-insensitively by title", () => {
  const content = buildDirectoryIndex("d", {
    concepts: [
      concept("c.md", { title: "banana" }),
      concept("a.md", { title: "Apple" }),
      concept("b.md", { title: "cherry" })
    ],
    subdirs: []
  })
  const order = ["Apple", "banana", "cherry"].map((t) => content.indexOf(`[${t}]`))
  assert.ok(order[0] < order[1] && order[1] < order[2], "expected Apple < banana < cherry")
})

test("subdirs are sorted ascending case-insensitively and deterministically", () => {
  const content = buildDirectoryIndex("d", {
    concepts: [],
    subdirs: ["Zoo", "apple", "Banana"]
  })
  const order = ["apple", "Banana", "Zoo"].map((n) => content.indexOf(`[${n}]`))
  assert.ok(order[0] < order[1] && order[1] < order[2], "expected apple < Banana < Zoo")

  // Determinism: same input, same output regardless of initial array order.
  const reversed = buildDirectoryIndex("d", {
    concepts: [],
    subdirs: ["Banana", "Zoo", "apple"]
  })
  assert.equal(content, reversed)
})

// --- Requirement 7.8: empty directory --------------------------------------

test("buildDirectoryIndex returns an empty body for an empty directory", () => {
  assert.equal(buildDirectoryIndex("empty", { concepts: [], subdirs: [] }), "")
})

test("generateIndexes still produces an index.md for an empty directory", () => {
  const root = makeTempDir()
  try {
    const summary = generateIndexes(root, { apply: true })

    assert.ok(summary.written.includes("index.md"), "root index.md should be written")
    assert.ok(fs.existsSync(path.join(root, "index.md")), "index.md file should exist on disk")
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// --- Requirement 7.9: index.md used as a Concept is preserved --------------

test("isIndexUsedAsConcept flags a non-root index.md carrying frontmatter", () => {
  assert.equal(isIndexUsedAsConcept("---\ntype: Note\n---\n", false), true)
})

test("isIndexUsedAsConcept allows a generated root index (only okf_version)", () => {
  const root = '---\nokf_version: "0.1"\n---\n\n# Concepts\n\n* [A](A.md)\n'
  assert.equal(isIndexUsedAsConcept(root, true), false)
})

test("isIndexUsedAsConcept flags an index.md carrying knowledge body content", () => {
  const raw = "# Concepts\n\n* [A](A.md)\n\nThis is hand-written knowledge.\n"
  assert.equal(isIndexUsedAsConcept(raw, false), true)
})

test("isIndexUsedAsConcept treats bullets with descriptions as generated navigation", () => {
  const raw = "# Concepts\n\n* [A](Tech/A.md) - Một mô tả ngắn\n* [B](Tech/B.md)\n"
  assert.equal(isIndexUsedAsConcept(raw, false), false)
})

test("generateIndexes skips and warns about a concept-like index.md without overwriting it", () => {
  const root = makeTempDir()
  try {
    const handAuthored = "---\ntype: Note\ntitle: Hand Authored\n---\nReal knowledge here.\n"
    writeFile(root, "sub/index.md", handAuthored)
    writeFile(root, "sub/topic.md", "---\ntitle: Topic\n---\nbody\n")

    const summary = generateIndexes(root, { apply: true })

    assert.ok(summary.warnings.includes("sub/index.md"), "concept-like index.md should warn")
    assert.ok(summary.skipped.includes("sub/index.md"), "concept-like index.md should be skipped")

    const after = fs.readFileSync(path.join(root, "sub/index.md"), "utf8")
    assert.equal(after, handAuthored, "hand-authored index.md must not be overwritten")
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

// --- buildRootIndex frontmatter sanity (Requirement 7.2 support) -----------

test("buildRootIndex prepends exactly the okf_version frontmatter", () => {
  const content = buildRootIndex({ concepts: [], subdirs: [] })
  assert.ok(content.startsWith('---\nokf_version: "0.1"\n---\n\n'))
})
