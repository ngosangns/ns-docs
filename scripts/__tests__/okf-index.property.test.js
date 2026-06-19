const { test } = require("node:test")
const assert = require("node:assert/strict")
const fc = require("fast-check")

const { buildDirectoryIndex, buildRootIndex } = require("../okf-index")
const { parseFrontmatter } = require("../okf-core/frontmatter")

// Simple ascii text that cannot be mistaken for YAML/frontmatter structure.
// We avoid leading `---`, colons and newlines so titles/descriptions stay
// plain text and only the property under test is exercised.
const simpleText = fc
  .string()
  .map((s) => s.replace(/[\r\n:]/g, " ").replace(/^-+/, ""))

// A single Concept child: id, bundle-relative path and optional title/description.
const conceptArb = fc.record({
  id: simpleText,
  relPath: simpleText.map((s) => `${s || "concept"}.md`),
  data: fc.record(
    {
      title: simpleText,
      description: simpleText
    },
    { requiredKeys: [] }
  )
})

// `children` = { concepts: Concept[], subdirs: string[] }.
const childrenArb = fc.record({
  concepts: fc.array(conceptArb, { maxLength: 6 }),
  subdirs: fc.array(simpleText.map((s) => s || "sub"), { maxLength: 6 })
})

// Property 7: Reserved file no frontmatter.
// **Validates: Requirements 7.1, 7.2**
test("Property 7A: non-root index.md has no frontmatter", () => {
  fc.assert(
    fc.property(simpleText, childrenArb, (dir, children) => {
      const content = buildDirectoryIndex(dir, children)
      const parsed = parseFrontmatter(content)
      assert.equal(parsed.hadFrontmatter, false)
    }),
    { numRuns: 200 }
  )
})

test("Property 7B: root index.md only contains okf_version", () => {
  fc.assert(
    fc.property(childrenArb, (children) => {
      const parsed = parseFrontmatter(buildRootIndex(children))
      const keys = Object.keys(parsed.data)
      for (const key of keys) {
        assert.ok(key === "okf_version", `unexpected frontmatter key: ${key}`)
      }
      if (keys.includes("okf_version")) {
        assert.equal(parsed.data.okf_version, "0.1")
      }
    }),
    { numRuns: 200 }
  )
})
