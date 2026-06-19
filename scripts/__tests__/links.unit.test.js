const { test } = require("node:test")
const assert = require("node:assert/strict")
const path = require("node:path")

const { normalizeLink, resolveTarget } = require("../okf-core/links")

// buildIndex(concepts) -> Map
// Builds a bundleIndex from a list of fake concepts ({ id, relPath }) using the
// exact key scheme of walk.js#addToIndex: each Concept is registered under its
// Concept_Id, bundle-relative path (with and without `.md`) and bare basename
// (without `.md`). A key is only set when it is not already taken, so the first
// Concept wins on collisions (first-wins, never overwrites).
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

// Shared fixtures. `guide/intro` and `notes/intro` deliberately share the
// basename `intro` so a bare `intro` target is ambiguous (>1 match).
const conceptUnique = { id: "topics/unique", relPath: "topics/unique.md" }
const conceptGuideIntro = { id: "guide/intro", relPath: "guide/intro.md" }
const conceptNotesIntro = { id: "notes/intro", relPath: "notes/intro.md" }

const bundleIndex = buildIndex([conceptUnique, conceptGuideIntro, conceptNotesIntro])

// sourceId used for relative resolution lives next to the unique concept.
const sourceId = "topics/source"

test("normalizeLink table-driven cases", () => {
  const cases = [
    // External links are returned verbatim (Requirement 5.4).
    {
      name: "external http link verbatim",
      rawLink: "http://example.com/page",
      expected: "http://example.com/page"
    },
    {
      name: "external https link verbatim",
      rawLink: "https://example.com/a/b?c=d",
      expected: "https://example.com/a/b?c=d"
    },
    {
      name: "external mailto link verbatim",
      rawLink: "mailto:hello@example.com",
      expected: "mailto:hello@example.com"
    },
    // Wikilink alias `|` is dropped from the target (Requirement 5.3).
    {
      name: "wikilink alias dropped",
      rawLink: "unique|Display Name",
      expected: "/topics/unique"
    },
    // Anchor `#` preserved after the normalized id (Requirement 5.2).
    {
      name: "anchor preserved",
      rawLink: "unique#section",
      expected: "/topics/unique#section"
    },
    {
      name: "alias and anchor together: alias dropped, anchor kept",
      rawLink: "unique#section|Display Name",
      expected: "/topics/unique#section"
    },
    // Unique internal resolution -> `/` + Concept_Id (Requirement 5.1).
    {
      name: "unique basename resolves",
      rawLink: "unique",
      expected: "/topics/unique"
    },
    {
      name: "relative link resolves against source dir",
      rawLink: "unique",
      sourceId: sourceId,
      expected: "/topics/unique"
    },
    // Already valid bundle-relative link is idempotent (Requirement 5.6).
    {
      name: "bundle-relative link idempotent",
      rawLink: "/topics/unique",
      expected: "/topics/unique"
    },
    {
      name: "bundle-relative link with anchor idempotent",
      rawLink: "/topics/unique#section",
      expected: "/topics/unique#section"
    },
    // Zero match and ambiguous match both return null (Requirement 5.5).
    {
      name: "zero match returns null",
      rawLink: "does-not-exist",
      expected: null
    },
    {
      name: "ambiguous basename returns null",
      rawLink: "intro",
      expected: null
    }
  ]

  for (const c of cases) {
    const actual = normalizeLink(c.rawLink, c.sourceId, bundleIndex)
    assert.equal(actual, c.expected, c.name)
  }
})

test("resolveTarget table-driven cases", () => {
  const cases = [
    // External links never resolve to a Concept (Requirement 5.4).
    { name: "external http resolves to null", rawLink: "http://example.com", expected: null },
    { name: "external mailto resolves to null", rawLink: "mailto:a@b.com", expected: null },
    // Alias and anchor are stripped before resolving (Requirements 5.2, 5.3).
    { name: "alias stripped before resolving", rawLink: "unique|Alias", expected: conceptUnique },
    { name: "anchor stripped before resolving", rawLink: "unique#frag", expected: conceptUnique },
    // Unique internal resolution returns the Concept (Requirement 5.1).
    { name: "unique basename resolves to concept", rawLink: "unique", expected: conceptUnique },
    // Bundle-relative form resolves to the same Concept (Requirement 5.6).
    { name: "bundle-relative resolves to concept", rawLink: "/topics/unique", expected: conceptUnique },
    // Zero and ambiguous matches return null (Requirement 5.5).
    { name: "zero match resolves to null", rawLink: "missing", expected: null },
    { name: "ambiguous basename resolves to null", rawLink: "intro", expected: null }
  ]

  for (const c of cases) {
    const actual = resolveTarget(c.rawLink, sourceId, bundleIndex)
    assert.equal(actual, c.expected, c.name)
  }
})

test("buildIndex mirrors walk.js#addToIndex first-wins on shared basename", () => {
  // `intro` is claimed by the first concept registered (first-wins), but both
  // concepts remain reachable by their distinct ids, which is what makes the
  // bare `intro` target ambiguous during resolution.
  assert.equal(bundleIndex.get("intro"), conceptGuideIntro)
  assert.equal(bundleIndex.get("guide/intro"), conceptGuideIntro)
  assert.equal(bundleIndex.get("notes/intro"), conceptNotesIntro)
  assert.equal(bundleIndex.get("topics/unique.md"), conceptUnique)
})
