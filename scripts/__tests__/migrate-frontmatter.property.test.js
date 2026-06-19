const { test } = require("node:test")
const assert = require("node:assert/strict")
const fc = require("fast-check")

const { migrateFrontmatter } = require("../okf-migrate")

// A path-like Concept_Id built from `/`-joined segments. Each segment is a
// non-empty word so the id resembles a real relative path (e.g. "a/b/c").
const conceptId = fc
  .array(fc.string({ minLength: 1 }).filter((s) => !s.includes("/")), {
    minLength: 1,
    maxLength: 4
  })
  .map((segments) => segments.join("/"))

// A `type` value that may be empty in any of the ways inferType treats as
// empty (missing/null/whitespace/non-string) or a valid non-empty string.
const typeValue = fc.oneof(
  fc.constant(undefined),
  fc.constant(null),
  fc.constant(""),
  fc.constant("   "),
  fc.integer(),
  fc.string({ minLength: 1 })
)

// Random extra frontmatter data that sometimes carries a `type` key.
const conceptData = fc
  .dictionary(fc.string({ minLength: 1 }), fc.string())
  .chain((base) =>
    fc.oneof(
      fc.constant(base),
      typeValue.map((type) => ({ ...base, type }))
    )
  )

const concept = fc.record({
  id: conceptId,
  relPath: conceptId.map((id) => `${id}.md`),
  data: conceptData,
  body: fc.string(),
  hadFrontmatter: fc.boolean()
})

// Property 1: Type guaranteed.
// **Validates: Requirements 3.8**
test("Property 1: every migrated concept has a non-empty type", () => {
  fc.assert(
    fc.property(concept, (input) => {
      const result = migrateFrontmatter(input)
      const type = result.concept.data.type
      assert.equal(typeof type, "string")
      assert.ok(type.trim().length >= 1)
    }),
    { numRuns: 200 }
  )
})
