const { test } = require("node:test")
const assert = require("node:assert/strict")
const fc = require("fast-check")

const { parseFrontmatter, serializeConcept } = require("../okf-core/frontmatter")
const { OKF_KEYS } = require("../okf-core/constants")

// Words that YAML scalar parsing may coerce away from a plain string. We avoid
// generating these so a generated string stays a string after a round-trip.
const RESERVED_SCALAR_WORDS = new Set([
  "true",
  "false",
  "null",
  "yes",
  "no",
  "on",
  "off",
  "nan",
  "inf"
])

function isSafeScalarString(s) {
  return !RESERVED_SCALAR_WORDS.has(s.toLowerCase())
}

// Identifier-like strings: start with a letter, then letters/digits. These are
// never parsed as numbers/booleans/null by YAML.
const identifier = fc
  .stringMatching(/^[A-Za-z][A-Za-z0-9]{0,15}$/)
  .filter(isSafeScalarString)

// Key names that are guaranteed NOT to be OKF keys.
const unknownKey = identifier.filter((k) => !OKF_KEYS.includes(k))

// Scalar values that round-trip through YAML without changing value or type.
const safeNumber = fc
  .oneof(
    fc.integer({ min: -1000000, max: 1000000 }),
    fc.double({ noNaN: true, noDefaultInfinity: true, min: -1e6, max: 1e6 })
  )
  .filter((n) => !Object.is(n, -0))

const safeValue = fc.oneof(
  identifier,
  safeNumber,
  fc.boolean(),
  fc.array(identifier, { maxLength: 5 })
)

// Generates a data object that always contains at least one unknown key, and
// optionally some OKF keys (including `type`) to mirror real Concepts.
const dataArb = fc
  .tuple(
    fc.uniqueArray(fc.tuple(unknownKey, safeValue), {
      minLength: 1,
      maxLength: 6,
      selector: (entry) => entry[0]
    }),
    fc.option(identifier, { nil: undefined }),
    fc.option(identifier, { nil: undefined })
  )
  .map(([unknownEntries, type, title]) => {
    const data = {}
    if (type !== undefined) data.type = type
    if (title !== undefined) data.title = title
    for (const [key, value] of unknownEntries) {
      data[key] = value
    }
    return { data, unknownKeys: unknownEntries.map((e) => e[0]) }
  })

// Property 2: Preserve unknown keys.
// Validates: Requirements 2.7
test("serialize then parse preserves unknown keys' name, value and type", () => {
  fc.assert(
    fc.property(dataArb, ({ data, unknownKeys }) => {
      const text = serializeConcept({ data, body: "", hadFrontmatter: true })
      const { data: roundTripped } = parseFrontmatter(text)

      for (const key of unknownKeys) {
        assert.ok(
          Object.prototype.hasOwnProperty.call(roundTripped, key),
          `unknown key "${key}" should be preserved`
        )
        assert.deepEqual(
          roundTripped[key],
          data[key],
          `value of unknown key "${key}" should round-trip`
        )
        assert.equal(
          typeof roundTripped[key],
          typeof data[key],
          `type of unknown key "${key}" should round-trip`
        )
      }
    }),
    { numRuns: 200 }
  )
})
