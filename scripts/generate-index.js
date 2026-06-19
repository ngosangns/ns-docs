#!/usr/bin/env node

// Index generation, delegated to okf-index (Requirement 11.8).
//
// The legacy generate-index.js wrote a single root `INDEX.md` using the
// Obsidian wikilink format. That format is superseded by the OKF per-directory
// `index.md` navigation files produced by okf-index (Requirements 7.1-7.9).
//
// This script now delegates to okf-index's exported `generateIndexes` so that
// all parsing goes through okf-core (okf-index walks the bundle with
// okf-core's parseConcept). It defaults to a DRY-RUN preview (no files are
// written) to avoid clobbering hand-authored content; pass `--apply` to write
// the generated `index.md` files.
//
// CLI flags:
//   --apply     Write the generated index.md files.
//   --dry-run   Preview only (default).

const path = require("path")
const { generateIndexes } = require("./okf-index")

const WORKSPACE_ROOT = path.join(__dirname, "..")
const APPLY = process.argv.includes("--apply")

function generateIndex() {
  console.log("📑 Generating OKF index.md files...\n")
  console.log(
    "ℹ️  generate-index now delegates to okf-index (per-directory OKF index.md),\n" +
      "   replacing the legacy root INDEX.md wikilink format.\n"
  )

  const summary = generateIndexes(WORKSPACE_ROOT, { apply: APPLY })
  const mode = APPLY ? "apply" : "dry-run"
  const verb = APPLY ? "Wrote" : "Would write"

  summary.written.forEach(file => {
    console.log(`${verb}: ${file}`)
  })
  summary.unchanged.forEach(file => {
    console.log(`Unchanged: ${file}`)
  })
  summary.warnings.forEach(file => {
    console.log(`WARNING: index.md appears to be used as a Concept, skipping: ${file}`)
  })

  console.log(
    `\nMode: ${mode} | ${verb.toLowerCase()}: ${summary.written.length} | ` +
      `unchanged: ${summary.unchanged.length} | skipped (concept): ${summary.skipped.length}`
  )

  if (!APPLY) {
    console.log("\nℹ️  Dry-run only. Re-run with --apply to write these files.")
  } else {
    console.log("\n✅ Index files generated successfully!")
  }
}

generateIndex()
