const { test } = require("node:test")
const assert = require("node:assert/strict")
const fc = require("fast-check")

const { parseFrontmatter, serializeConcept } = require("../okf-core/frontmatter")

// Generators constrained to YAML-round-trippable values: strings, finite
// numbers, booleans, arrays of strings, and one level of nested simple
// objects. Special floats (NaN, +/-Infinity) are excluded because YAML cannot
// represent them losslessly.
const scalar = fc.oneof(
  fc.string(),
  fc.integer(),
  fc.double({ noNaN: true, noDefaultInfinity: true }),
  fc.boolean()
)

const nested = fc.dictionary(fc.string({ minLength: 1 }), scalar)

const value = fc.oneof(scalar, fc.array(fc.string()), nested)

// Random frontmatter objects that always carry a `type` key.
const frontmatter = fc
  .dictionary(fc.string({ minLength: 1 }), value)
  .map((obj) => ({ ...obj, type: "Note" }))

// Property 3: Round-trip frontmatter.
// **Validates: Requirements 2.6**
test("Property 3: parse(serialize(parse(x))) preserves data and body", () => {
  fc.assert(
    fc.property(frontmatter, fc.string(), (data, body) => {
      const s1 = serializeConcept({ data, body, hadFrontmatter: true })
      const p1 = parseFrontmatter(s1)

      const s2 = serializeConcept({
        data: p1.data,
        body: p1.body,
        hadFrontmatter: true
      })
      const p2 = parseFrontmatter(s2)

      assert.deepEqual(p2.data, p1.data)
      assert.equal(p2.body, p1.body)
    }),
    { numRuns: 200 }
  )
})
