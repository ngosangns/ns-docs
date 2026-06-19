const { test } = require("node:test")
const assert = require("node:assert/strict")
const path = require("node:path")

const { parseFrontmatter, serializeConcept, conceptIdOf } = require("../okf-core")
const { normalizeLink } = require("../okf-core/links")
const { inferType } = require("../okf-migrate")
const { TYPE_RULES } = require("../okf-core/constants")

// Consolidated round-trip / consistency unit tests.
// **Validates: Requirements 12.7**
//
// These tests pin three cross-cutting invariants of the OKF core:
//   - serializeConcept(parseFrontmatter(input)) is semantically equivalent to
//     `input` (same parsed data + same body).
//   - conceptIdOf produces stable, normalized ids and is idempotent.
//   - normalizeLink resolves consistently against a walk.js-shaped bundleIndex.
//   - inferType maps directory prefixes to types per TYPE_RULES.

// --- Round-trip: serializeConcept(parseFrontmatter(input)) -----------------
//
// Semantic equivalence: re-parsing the serialized output yields the same data
// and body as parsing the original input. We compare via parse (not raw string
// equality) because YAML re-emission may reformat whitespace/quoting while
// preserving meaning (Requirement 2.6).
test("round-trip preserves data and body across representative inputs", () => {
  const inputs = [
    {
      name: "frontmatter with type and recommended fields",
      input: "---\ntype: Note\ntitle: Hello\ndescription: A short note\n---\nBody text here.\n"
    },
    {
      name: "frontmatter with unknown keys preserved",
      input: "---\ntype: Reference\ncustomKey: keep me\nnested:\n  a: 1\n  b: two\n---\nBody with unknown keys.\n"
    },
    {
      name: "no frontmatter at all",
      input: "Just a plain body with no frontmatter.\n\nSecond paragraph.\n"
    }
  ]

  for (const { name, input } of inputs) {
    const parsed = parseFrontmatter(input)
    const serialized = serializeConcept(parsed)
    const reparsed = parseFrontmatter(serialized)

    assert.deepEqual(reparsed.data, parsed.data, `${name}: data preserved`)
    assert.equal(reparsed.body, parsed.body, `${name}: body preserved`)
  }
})

test("round-trip is a no-op for a body without frontmatter", () => {
  // hadFrontmatter=false with empty data emits the body untouched, so the
  // serialized output equals the input byte-for-byte (Requirement 2.7).
  const input = "No frontmatter, just text.\n"
  const parsed = parseFrontmatter(input)
  assert.equal(parsed.hadFrontmatter, false)
  assert.equal(serializeConcept(parsed), input)
})

// --- conceptIdOf consistency (Requirements 1.3, 1.4) -----------------------
test("conceptIdOf yields stable, normalized, idempotent ids", () => {
  const root = path.join("/", "vault")
  const absPath = path.join(root, "English", "Grammar", "Passive Voice.md")

  const id = conceptIdOf(absPath, root)
  assert.equal(id, "English/Grammar/Passive Voice")

  // `/` separators only, no `.md`, no leading slash.
  assert.ok(!id.includes("\\"), "no backslash separators")
  assert.ok(!/\.md$/i.test(id), "no .md extension")
  assert.ok(!id.startsWith("/"), "no leading slash")

  // Stable: same input yields the same id.
  assert.equal(conceptIdOf(absPath, root), id)

  // Idempotent: re-deriving from the already-relative id changes nothing.
  const again = conceptIdOf(path.join(root, id), root)
  assert.equal(again, id)
})

// --- normalizeLink consistency (Requirements 5.1, 5.4, 5.5, 5.6) -----------
//
// buildIndex mirrors walk.js#addToIndex: each Concept is registered under its
// Concept_Id, bundle-relative path (with/without `.md`) and bare basename
// (without `.md`); first-wins on key collisions.
function buildIndex(concepts) {
  const index = new Map()
  for (const concept of concepts) {
    const relNoExt = concept.relPath.replace(/\.md$/i, "")
    const baseNoExt = path.basename(concept.relPath).replace(/\.md$/i, "")
    const keys = [concept.id, concept.relPath, relNoExt, baseNoExt]
    for (const key of keys) {
      if (key && !index.has(key)) {
        index.set(key, concept)
      }
    }
  }
  return index
}

const conceptUnique = { id: "topics/unique", relPath: "topics/unique.md" }
const conceptGuideIntro = { id: "guide/intro", relPath: "guide/intro.md" }
const conceptNotesIntro = { id: "notes/intro", relPath: "notes/intro.md" }
const bundleIndex = buildIndex([conceptUnique, conceptGuideIntro, conceptNotesIntro])

test("normalizeLink is consistent against a bundleIndex", () => {
  // External links pass through verbatim.
  assert.equal(
    normalizeLink("https://example.com/a", null, bundleIndex),
    "https://example.com/a"
  )
  assert.equal(
    normalizeLink("mailto:hi@example.com", null, bundleIndex),
    "mailto:hi@example.com"
  )

  // A unique internal link resolves to `/` + Concept_Id.
  assert.equal(normalizeLink("unique", null, bundleIndex), "/topics/unique")

  // Idempotent on an already bundle-relative link to an existing Concept.
  assert.equal(
    normalizeLink("/topics/unique", null, bundleIndex),
    "/topics/unique"
  )

  // Zero matches and ambiguous (>1) matches both return null.
  assert.equal(normalizeLink("does-not-exist", null, bundleIndex), null)
  assert.equal(normalizeLink("intro", null, bundleIndex), null)
})

// --- inferType directory mapping (Requirements 3.6, 3.7) -------------------
test("inferType maps directory prefixes per TYPE_RULES", () => {
  // A Concept under a TYPE_RULES prefix gets the mapped type.
  assert.equal(
    inferType({ id: "English/Grammar/Passive Voice", data: {} }, TYPE_RULES),
    "Reference"
  )
  assert.equal(
    inferType({ id: "Projects/OKF/Design", data: {} }, TYPE_RULES),
    "Playbook"
  )

  // An existing non-empty type is preserved unchanged.
  assert.equal(
    inferType({ id: "English/Grammar/x", data: { type: "Custom" } }, TYPE_RULES),
    "Custom"
  )

  // No matching prefix falls back to "Note".
  assert.equal(
    inferType({ id: "Unknown/Folder/x", data: {} }, TYPE_RULES),
    "Note"
  )
})
