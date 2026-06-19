const { test } = require("node:test")
const assert = require("node:assert/strict")
const path = require("node:path")

const {
  buildBundleIndex,
  buildGraph
} = require("../build-preview-data")

// makeConcept(id) -> Concept-like object
// Builds the minimal okf-core Concept shape that buildBundleIndex consumes:
// it only reads `id` and `relPath`. The bundle-relative path keeps the `.md`
// suffix, mirroring real okf-core concepts (Requirement 11.3).
function makeConcept(id) {
  return { id, relPath: `${id}.md` }
}

// makeDoc(id, raw) -> doc
// Builds the preview DOC shape that buildGraph consumes. Only the fields read
// by buildGraph are populated; `raw` carries the markdown body whose wikilinks
// are resolved into edges.
function makeDoc(id, raw, overrides = {}) {
  return {
    id,
    title: id,
    path: `${id}.md`,
    category: id.includes("/") ? id.split("/")[0] : "Root",
    status: "",
    tags: [],
    raw,
    ...overrides
  }
}

test("buildGraph doc node count equals number of non-reserved concepts (11.2)", () => {
  // The docs array represents the non-reserved concepts (reserved files are
  // already excluded upstream by okf-core / loadConcepts).
  const concepts = [
    makeConcept("guide/intro"),
    makeConcept("guide/advanced"),
    makeConcept("topics/alpha")
  ]
  const index = buildBundleIndex(concepts)
  const docs = [
    makeDoc("guide/intro", "no links here"),
    makeDoc("guide/advanced", "still nothing"),
    makeDoc("topics/alpha", "plain body")
  ]

  const graph = buildGraph(docs, index)
  const docNodes = graph.nodes.filter(node => node.type === "doc")

  assert.equal(docNodes.length, docs.length)
  assert.equal(docNodes.length, concepts.length)
})

test("buildGraph doc node ids are unique and equal the Concept_Id without .md (11.3)", () => {
  const concepts = [
    makeConcept("guide/intro"),
    makeConcept("guide/advanced"),
    makeConcept("topics/alpha")
  ]
  const index = buildBundleIndex(concepts)
  const docs = concepts.map(c => makeDoc(c.id, "body"))

  const graph = buildGraph(docs, index)
  const docNodes = graph.nodes.filter(node => node.type === "doc")
  const ids = docNodes.map(node => node.id)

  // Ids are unique across the whole graph.
  assert.equal(new Set(ids).size, ids.length)
  // Each id is the Concept_Id (no `.md`).
  for (const id of ids) {
    assert.ok(!/\.md$/i.test(id), `node id ${id} should not carry .md`)
  }
  assert.deepEqual(ids.sort(), ["guide/advanced", "guide/intro", "topics/alpha"])
})

test("buildGraph skips an unresolved link without halting and records it (11.5)", () => {
  const concepts = [makeConcept("guide/intro"), makeConcept("topics/alpha")]
  const index = buildBundleIndex(concepts)
  // `guide/intro` links to a target that does not exist in the bundle.
  const docs = [
    makeDoc("guide/intro", "see [[does-not-exist]] for details"),
    makeDoc("topics/alpha", "standalone body")
  ]

  const graph = buildGraph(docs, index)

  // No edge created for the unresolved link.
  assert.equal(graph.edges.length, 0)
  // The unresolved link is recorded.
  assert.equal(graph.unresolvedLinks.length, 1)
  assert.equal(graph.unresolvedLinks[0].from, "guide/intro")
  assert.equal(graph.unresolvedLinks[0].raw, "does-not-exist")
  // Graph building completed: both doc nodes remain intact.
  const docNodes = graph.nodes.filter(node => node.type === "doc")
  assert.equal(docNodes.length, 2)
})

test("buildGraph creates an edge for a wikilink to an existing concept", () => {
  const concepts = [makeConcept("guide/intro"), makeConcept("topics/alpha")]
  const index = buildBundleIndex(concepts)
  // `guide/intro` links to `alpha` (bare basename of `topics/alpha`).
  const docs = [
    makeDoc("guide/intro", "read [[alpha]] next"),
    makeDoc("topics/alpha", "standalone body")
  ]

  const graph = buildGraph(docs, index)

  assert.equal(graph.unresolvedLinks.length, 0)
  const refEdges = graph.edges.filter(edge => edge.type === "references")
  assert.equal(refEdges.length, 1)
  assert.equal(refEdges[0].from, "guide/intro")
  assert.equal(refEdges[0].to, "topics/alpha")
})
