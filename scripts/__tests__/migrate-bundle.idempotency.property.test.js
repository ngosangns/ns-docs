const { test } = require("node:test")
const assert = require("node:assert/strict")
const fc = require("fast-check")
const fs = require("fs")
const os = require("os")
const path = require("path")

const { migrateBundle } = require("../okf-migrate")

// Property 4: Idempotency (Requirement 10.8). Running migrate twice in a row
// with no external change must leave the bundle at a fixed point: the SECOND
// Apply_Mode run writes exactly 0 files. We exercise this against real
// on-disk bundles (each iteration builds a tiny temp bundle, applies migrate
// twice and asserts the second run is a no-op).

// Pure ascii identifiers keep file names, frontmatter values and wikilink
// targets free of `/`, `#`, `|`, `[`, `]`, `(`, `)` so the body link parser is
// never confused and Concept_Ids stay unambiguous.
const letter = fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz".split(""))
const ident = fc.array(letter, { minLength: 1, maxLength: 6 }).map((cs) => cs.join(""))

// A bundle: a set of unique basenames plus a per-file spec describing optional
// frontmatter (some files omit `type`, some carry it; recommended fields are
// randomly present or absent) and a body that may wikilink to the other
// generated files.
const bundleArb = fc
  .uniqueArray(ident, { minLength: 1, maxLength: 4 })
  .chain((names) =>
    fc
      .tuple(
        ...names.map(() =>
          fc.record({
            type: fc.option(ident, { nil: undefined }),
            title: fc.option(ident, { nil: undefined }),
            description: fc.option(ident, { nil: undefined }),
            timestamp: fc.option(ident, { nil: undefined }),
            links: fc.array(fc.nat(), { maxLength: 3 }),
            words: fc.array(ident, { maxLength: 4 })
          })
        )
      )
      .map((specs) => ({ names, specs }))
  )

// buildFile(spec, names) -> string
// Renders a markdown file. Frontmatter lines are only emitted for fields the
// spec includes (ascii values are always YAML-safe). The body interleaves
// random words with `[[basename]]` wikilinks to the other generated files.
function buildFile(spec, names) {
  const fmLines = []
  if (spec.type !== undefined) fmLines.push("type: " + spec.type)
  if (spec.title !== undefined) fmLines.push("title: " + spec.title)
  if (spec.description !== undefined) fmLines.push("description: " + spec.description)
  if (spec.timestamp !== undefined) fmLines.push("timestamp: " + spec.timestamp)

  const parts = []
  for (const n of spec.links) {
    parts.push("[[" + names[n % names.length] + "]]")
  }
  for (const w of spec.words) {
    parts.push(w)
  }
  const body = parts.join(" and ") + "\n"

  if (fmLines.length === 0) {
    return body
  }
  return "---\n" + fmLines.join("\n") + "\n---\n" + body
}

test("Property 4: a second consecutive migrate run writes 0 files", () => {
  // **Validates: Requirements 10.8**
  fc.assert(
    fc.property(bundleArb, ({ names, specs }) => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), "okf-idem-"))
      try {
        names.forEach((name, i) => {
          fs.writeFileSync(path.join(root, name + ".md"), buildFile(specs[i], names), "utf8")
        })

        // First Apply_Mode run drives the bundle to its fixed point.
        migrateBundle(root, { apply: true })
        // Second run, no external change: must be a no-op on disk.
        const second = migrateBundle(root, { apply: true })

        assert.equal(
          second.written.length,
          0,
          "second consecutive migrate run must write 0 files, wrote: " +
            JSON.stringify(second.written)
        )
      } finally {
        fs.rmSync(root, { recursive: true, force: true })
      }
    }),
    { numRuns: 100 }
  )
})
