const { test } = require("node:test")
const assert = require("node:assert/strict")
const fc = require("fast-check")

const { rewriteLinks } = require("../okf-migrate")

// Mirror of okf-core/walk.js#addToIndex: registers a Concept under its
// Concept_Id, bundle-relative path (with and without `.md`) and bare basename
// (without `.md`), first-wins on key collisions. Resolution in
// okf-core/links.js scans these keys, so the test index must match exactly.
function addToIndex(index, concept) {
  const relNoExt = concept.relPath.replace(/\.md$/i, "")
  const baseNoExt = relNoExt.split("/").pop()
  const keys = [concept.id, concept.relPath, relNoExt, baseNoExt]
  for (const key of keys) {
    if (key && !index.has(key)) {
      index.set(key, concept)
    }
  }
}

// Mirror of okf-migrate.js#isExternalTarget / okf-core/links.js#isExternal.
function isExternal(s) {
  return /^(https?:\/\/|mailto:)/i.test(String(s).trim())
}

// Extract every markdown-link target `](target)` from a body, skipping image
// syntax `![](...)` via the same lookbehind the migrator uses.
const MARKDOWN_LINK_RE = /(?<!!)\[([^\]]*)\]\(([^)]*)\)/g
function markdownTargets(body) {
  const targets = []
  let m
  MARKDOWN_LINK_RE.lastIndex = 0
  while ((m = MARKDOWN_LINK_RE.exec(body)) !== null) {
    targets.push(m[2])
  }
  return targets
}

// A simple ascii identifier (lowercase letters only) used for basenames,
// directory segments and prose words. Pure letters keep Concept_Ids free of
// `/`, `#`, `|`, `[`, `]`, `(`, `)` so links resolve unambiguously and the
// body parser is never confused by stray markup.
const letter = fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz".split(""))
const ident = fc.array(letter, { minLength: 1, maxLength: 6 }).map((cs) => cs.join(""))

// An optional directory prefix drawn from a small fixed pool. Because every
// basename is globally unique (see `concepts` below), prefixes never create an
// ambiguous match: each lookup key still points at exactly one Concept.
const dirPrefix = fc.constantFrom("", "x/", "x/y/", "z/")

// A set of Concepts with globally-unique basenames. Uniqueness guarantees that
// a bare `[[basename]]` wikilink resolves to exactly one Concept, so the
// migrator must rewrite it to a bundle-relative `/`-target.
const concepts = fc
  .uniqueArray(ident, { minLength: 1, maxLength: 6 })
  .chain((basenames) =>
    fc.tuple(...basenames.map(() => dirPrefix)).map((prefixes) =>
      basenames.map((base, i) => {
        const id = prefixes[i] + base
        return { id, relPath: id + ".md", data: {}, base }
      })
    )
  )

test("Property 5: internal links in the migrate result start with '/'", () => {
  // **Validates: Requirements 5.8**
  fc.assert(
    fc.property(
      concepts,
      // Which concepts get a resolving wikilink in the body.
      fc.array(fc.nat(), { maxLength: 8 }),
      // Unresolvable wikilink targets (uppercase => never match lowercase keys).
      fc.array(ident.map((s) => s.toUpperCase()), { maxLength: 4 }),
      // External markdown links that must be left verbatim.
      fc.array(fc.constantFrom("http://e.com", "https://e.org/p", "mailto:a@b.co"), {
        maxLength: 4
      }),
      // Prose words interleaved with the links.
      fc.array(ident, { maxLength: 6 }),
      (concs, picks, missing, externals, words) => {
        const index = new Map()
        for (const c of concs) {
          addToIndex(index, c)
        }

        const parts = []
        for (const n of picks) {
          const c = concs[n % concs.length]
          parts.push("[[" + c.base + "]]")
        }
        for (const t of missing) {
          parts.push("[[" + t + "]]")
        }
        for (const e of externals) {
          parts.push("[link](" + e + ")")
        }
        for (const w of words) {
          parts.push(w)
        }
        const body = parts.join(" and then ")

        const sourceId = concs[0].id
        const result = rewriteLinks(body, sourceId, index)

        // Every produced markdown-link target is either an untouched external
        // link or an internal link rewritten to bundle-relative form (`/...`).
        for (const target of markdownTargets(result.body)) {
          assert.ok(
            target.startsWith("/") || isExternal(target),
            "expected internal link target to start with '/': " + target
          )
        }
      }
    ),
    { numRuns: 200 }
  )
})
