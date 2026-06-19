const { test } = require("node:test")
const assert = require("node:assert/strict")
const path = require("node:path")

const { migrateLinks, rewriteLinks } = require("../okf-migrate")

// buildIndex(concepts) -> Map
// Builds a bundleIndex from a list of fake concepts ({ id, relPath, data })
// using the exact key scheme of walk.js#addToIndex: each Concept is registered
// under its Concept_Id, bundle-relative path (with and without `.md`) and bare
// basename (without `.md`). A key is only set when it is not already taken, so
// the first Concept wins on collisions (first-wins, never overwrites).
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

// Shared fixtures. `Target` carries a frontmatter `title` so its wikilink label
// is the title; `Plain` has no title so its label falls back to the basename.
// `Other` exists so a relative markdown link can resolve against the source dir.
const conceptTarget = {
  id: "topics/Target",
  relPath: "topics/Target.md",
  data: { title: "My Target" }
}
const conceptPlain = { id: "topics/Plain", relPath: "topics/Plain.md", data: {} }
const conceptOther = { id: "topics/Other", relPath: "topics/Other.md", data: {} }

const bundleIndex = buildIndex([conceptTarget, conceptPlain, conceptOther])

// sourceId lives in `topics/` so relative links resolve against that directory.
const sourceId = "topics/source"

// rewriteLinks(body, sourceId, bundleIndex) -> { body, broken }.
// See Requirements 5.7 (rewrite to bundle-relative markdown links) and 5.9
// (keep unresolved links verbatim and record them as broken).

test("rewriteLinks rewrites a unique wikilink using the title as the label", () => {
  // Requirement 5.7: `[[Target]]` -> `[label](/Concept_Id)`, label from title.
  const { body, broken } = rewriteLinks("see [[Target]] here", sourceId, bundleIndex)
  assert.equal(body, "see [My Target](/topics/Target) here")
  assert.deepEqual(broken, [])
})

test("rewriteLinks falls back to the basename when the target has no title", () => {
  // Requirement 5.7: label falls back to the resolved Concept's basename.
  const { body, broken } = rewriteLinks("see [[Plain]] here", sourceId, bundleIndex)
  assert.equal(body, "see [Plain](/topics/Plain) here")
  assert.deepEqual(broken, [])
})

test("rewriteLinks keeps the alias as the label", () => {
  // Requirement 5.7: `[[Target|Alias]]` -> `[Alias](/Concept_Id)`.
  const { body, broken } = rewriteLinks("see [[Target|Alias]] here", sourceId, bundleIndex)
  assert.equal(body, "see [Alias](/topics/Target) here")
  assert.deepEqual(broken, [])
})

test("rewriteLinks preserves the anchor on a wikilink", () => {
  // Requirement 5.7: `[[Target#sec]]` -> `[label](/Concept_Id#sec)`.
  const { body, broken } = rewriteLinks("see [[Target#sec]] here", sourceId, bundleIndex)
  assert.equal(body, "see [My Target](/topics/Target#sec) here")
  assert.deepEqual(broken, [])
})

test("rewriteLinks rewrites a relative markdown link", () => {
  // Requirement 5.7: `[x](./Other.md)` resolves against the source dir.
  const { body, broken } = rewriteLinks("see [x](./Other.md) here", sourceId, bundleIndex)
  assert.equal(body, "see [x](/topics/Other) here")
  assert.deepEqual(broken, [])
})

test("rewriteLinks keeps an unresolvable wikilink verbatim and records it as broken", () => {
  // Requirement 5.9: `[[Nope]]` is kept as-is and recorded as a broken link.
  const { body, broken } = rewriteLinks("see [[Nope]] here", sourceId, bundleIndex)
  assert.equal(body, "see [[Nope]] here")
  assert.deepEqual(broken, [{ sourceId, target: "Nope" }])
})

test("rewriteLinks leaves an external link untouched and does not record it as broken", () => {
  // External links are left verbatim and never reported as broken.
  const { body, broken } = rewriteLinks("see [x](https://example.com) here", sourceId, bundleIndex)
  assert.equal(body, "see [x](https://example.com) here")
  assert.deepEqual(broken, [])
})

// migrateLinks(concept, bundleIndex) -> { concept, changes, broken }.
// See Requirements 5.7, 5.9.

test("migrateLinks returns a new concept with the rewritten body and a change entry", () => {
  // Requirement 5.7: body rewrites produce a new concept + a single body change.
  const concept = {
    id: "topics/source",
    relPath: "topics/source.md",
    data: { title: "Source" },
    body: "see [[Target]] and [[Nope]]"
  }
  const { concept: next, changes, broken } = migrateLinks(concept, bundleIndex)

  // A new concept carries the rewritten body.
  assert.notEqual(next, concept)
  assert.equal(next.body, "see [My Target](/topics/Target) and [[Nope]]")

  // A single change is recorded for the body.
  assert.deepEqual(changes, [{ id: "topics/source", field: "body" }])

  // Requirement 5.9: the unresolved link surfaces in broken.
  assert.deepEqual(broken, [{ sourceId: "topics/source", target: "Nope" }])

  // The original input is never mutated.
  assert.equal(concept.body, "see [[Target]] and [[Nope]]")
})

test("migrateLinks returns the same concept and no change when the body is unchanged", () => {
  // No internal links to rewrite -> no body change, original concept returned.
  const concept = {
    id: "topics/source",
    relPath: "topics/source.md",
    data: {},
    body: "see [x](https://example.com) here"
  }
  const { concept: next, changes, broken } = migrateLinks(concept, bundleIndex)

  assert.equal(next, concept)
  assert.deepEqual(changes, [])
  assert.deepEqual(broken, [])
})
