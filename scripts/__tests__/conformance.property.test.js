const { test } = require("node:test")
const assert = require("node:assert/strict")
const fc = require("fast-check")

const { checkBundle } = require("../okf-conformance")

// A non-empty `type` string is one with length >= 1 after trimming. The other
// arbitraries deliberately stray outside that set (missing, empty, whitespace,
// non-string) so the generator covers both conformant and non-conformant
// concepts.
const validType = fc
  .string()
  .filter((value) => value.trim().length >= 1)

const typeValue = fc.oneof(
  validType,
  fc.constant(undefined),
  fc.constant(null),
  fc.constant(""),
  fc.constant("   "),
  fc.integer(),
  fc.boolean()
)

const tagsValue = fc.oneof(
  fc.array(fc.string()),
  fc.string(),
  fc.constant(undefined)
)

const timestampValue = fc.oneof(
  fc.constant("2024-01-02T03:04:05Z"),
  fc.constant("not-a-date"),
  fc.constant(undefined),
  fc.integer()
)

// Random concept data: `type` may be valid/invalid, recommended fields and the
// formatted fields randomly present or absent.
const conceptData = fc.record(
  {
    type: typeValue,
    title: fc.option(fc.string(), { nil: undefined }),
    description: fc.option(fc.string(), { nil: undefined }),
    resource: fc.option(fc.string(), { nil: undefined }),
    tags: tagsValue,
    timestamp: timestampValue
  },
  { requiredKeys: [] }
)

// A Concept as accepted by checkBundle in its pre-walked form. Some concepts
// carry a parseError flag (no usable data) instead of a data object.
const concept = fc
  .record({
    id: fc.string({ minLength: 1 }),
    relPath: fc.string({ minLength: 1 }),
    data: conceptData,
    body: fc.string(),
    hadFrontmatter: fc.boolean(),
    parseError: fc.boolean()
  })
  .map((c) =>
    c.parseError ? { ...c, data: undefined } : { ...c, parseError: false }
  )

// Property 9: Conformance => type.
// **Validates: Requirements 9.6**
test("Property 9: conformant report implies every concept has a non-empty type", () => {
  fc.assert(
    fc.property(fc.array(concept), (concepts) => {
      const report = checkBundle({ concepts, reservedFiles: [] })

      if (report.conformant === true) {
        for (const c of concepts) {
          assert.equal(
            typeof c.data.type === "string" && c.data.type.trim().length >= 1,
            true
          )
        }
      }
    }),
    { numRuns: 200 }
  )
})
