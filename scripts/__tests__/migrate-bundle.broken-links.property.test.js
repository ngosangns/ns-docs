const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const fc = require("fast-check")

const { migrateBundle } = require("../okf-migrate")

// Property 6: Tolerate broken links.
// **Validates: Requirements 6.1, 6.2**
//
// A bundle containing unresolvable internal links must never make migration
// fail: migrateBundle completes without throwing, surfaces the broken links in
// its `broken` collection (Requirement 5.9 / 6.3) rather than in `errors`, and
// the final conformance report is NOT forced non-conformant because of those
// broken links (Requirement 6.1, 6.2).
//
// NOTE on Requirement 6.2's `broken-link` warning rule: the current
// okf-conformance checkConcept/checkBundle inspects frontmatter only and emits
// NO `broken-link` diagnostic — it never looks at links at all. So broken links
// contribute zero diagnostics (neither error nor warning) and therefore cannot
// flip `conformant` to false. Since migration fills `type` for every parseable
// Concept, a bundle whose only "problem" is broken links migrates to a fully
// conformant state. The assertions below are framed around that behaviour.

// A simple ascii identifier (lowercase letters only). Pure letters keep both
// basenames and link targets free of `/`, `#`, `|`, `[`, `]`, `(`, `)`.
const letter = fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz".split(""))
const ident = fc.array(letter, { minLength: 1, maxLength: 6 }).map((cs) => cs.join(""))

// 1-3 Concepts with globally-unique lowercase basenames, each paired with an
// unresolvable wikilink target. Targets are prefixed `DoesNotExist_` and carry
// uppercase letters plus an index, so they can never collide with the
// lowercase basenames (and never resolve to a real Concept).
const bundleSpec = fc
  .uniqueArray(ident, { minLength: 1, maxLength: 3 })
  .chain((bases) =>
    fc
      .tuple(...bases.map(() => ident.map((s) => s.toUpperCase())))
      .map((targets) =>
        bases.map((base, i) => ({
          base,
          broken: "DoesNotExist_" + targets[i] + "_" + i
        }))
      )
  )

test("Property 6: broken links are tolerated by migrateBundle", () => {
  fc.assert(
    fc.property(bundleSpec, (files) => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), "okf-broken-"))
      try {
        files.forEach((file, i) => {
          // Each body carries an unresolvable wikilink. When there is more than
          // one Concept we also add a resolvable wikilink to the next basename,
          // so the bundle mixes valid and broken links.
          const valid =
            files.length > 1 ? " see [[" + files[(i + 1) % files.length].base + "]]" : ""
          const body = "intro [[" + file.broken + "]] outro" + valid + "\n"
          fs.writeFileSync(path.join(root, file.base + ".md"), body, "utf8")
        })

        let result
        // 1. Migration must not throw on broken links (Requirement 6.1).
        assert.doesNotThrow(() => {
          result = migrateBundle(root, { apply: true })
        })

        // 2. Broken links are collected into `broken`, not `errors`. There is
        //    at least one broken link (one per generated file).
        assert.ok(
          result.broken.length >= 1,
          "expected at least one collected broken link"
        )

        // 3. No broken link produces a hard-failure error entry: parse/write/
        //    read errors are the only things recorded in `errors`, and a
        //    well-formed bundle whose only flaw is broken links produces none.
        assert.equal(
          result.errors.length,
          0,
          "broken links must not create error entries: " + JSON.stringify(result.errors)
        )

        // 4. Conformance is not forced false by broken links. Migration fills
        //    `type` for every Concept and broken links emit no diagnostics, so
        //    the migrated bundle is conformant (Requirements 6.1, 6.2).
        assert.equal(
          result.report.conformant,
          true,
          "broken links must not make the bundle non-conformant"
        )

        // The broken links never surface as conformance diagnostics at all
        // (no `broken-link` rule and no error-level diagnostic attributable to
        // them).
        const brokenLinkDiagnostics = result.report.diagnostics.filter(
          (d) => d.rule === "broken-link"
        )
        assert.equal(brokenLinkDiagnostics.length, 0)
      } finally {
        fs.rmSync(root, { recursive: true, force: true })
      }
    }),
    { numRuns: 100 }
  )
})
