#!/usr/bin/env node

// Frontmatter validation, delegated to okf-core / okf-conformance.
//
// Requirements 11.8, 11.9, 11.10:
//   - Parsing goes through okf-core (via okf-conformance.checkBundle, which
//     walks the bundle with safeWalkBundle and parses each file's frontmatter
//     with okf-core's parseFrontmatter). This script no longer does any ad-hoc
//     regex frontmatter parsing of its own.
//   - A Concept missing/empty `type` -> exactly one `error` diagnostic with
//     rule `type-required` (emitted by checkConcept).
//   - A Concept missing/empty `tags` -> a `warning` diagnostic with rule
//     `recommended-field-missing` (NOT an error).
//
// Robustness: checkBundle uses safeWalkBundle internally, so a single file with
// unparseable YAML becomes a `frontmatter-parse` error diagnostic instead of
// crashing the whole run.
//
// CLI flags (kept working in spirit):
//   --missing   List only the files that are missing required frontmatter,
//               i.e. those carrying a `type-required` or `frontmatter-parse`
//               diagnostic. (The legacy flag listed files with no frontmatter
//               at all; the OKF equivalent is "missing the required `type`".)

const path = require("path")
const { checkBundle } = require("./okf-conformance")

const WORKSPACE_ROOT = path.join(__dirname, "..")
const MISSING_ONLY = process.argv.includes("--missing")

// Rules that mean "this Concept is missing required frontmatter".
const MISSING_REQUIRED_RULES = new Set(["type-required", "frontmatter-parse"])

function groupByFile(diagnostics) {
  const byFile = new Map()
  diagnostics.forEach(diag => {
    if (!byFile.has(diag.file)) {
      byFile.set(diag.file, [])
    }
    byFile.get(diag.file).push(diag)
  })
  return byFile
}

function validateAllFrontmatter() {
  console.log("🔍 Validating frontmatter...\n")

  const report = checkBundle(WORKSPACE_ROOT)
  const errors = report.diagnostics.filter(diag => diag.level === "error")
  const warnings = report.diagnostics.filter(diag => diag.level === "warning")

  if (MISSING_ONLY) {
    const missingFiles = Array.from(
      new Set(
        report.diagnostics
          .filter(diag => MISSING_REQUIRED_RULES.has(diag.rule))
          .map(diag => diag.file)
      )
    ).sort()

    if (missingFiles.length === 0) {
      console.log("✅ All Concepts have the required frontmatter!")
    } else {
      console.log(`❌ Found ${missingFiles.length} files missing required frontmatter:\n`)
      missingFiles.forEach(file => {
        console.log(`   ${file}`)
      })
    }
    return
  }

  const byFile = groupByFile(report.diagnostics)

  console.log("=".repeat(60))
  console.log("📋 FRONTMATTER VALIDATION")
  console.log("=".repeat(60))
  console.log(`\n📊 Summary:`)
  console.log(`   Concepts checked: ${report.conceptCount}`)
  console.log(`   Files with issues: ${byFile.size}`)
  console.log(`   Errors: ${errors.length}`)
  console.log(`   Warnings: ${warnings.length}`)
  console.log(`   Conformant: ${report.conformant}`)

  if (errors.length > 0) {
    console.log(`\n❌ Errors:`)
    errors.forEach(diag => {
      console.log(`   ${diag.file}`)
      console.log(`      - [${diag.rule}] ${diag.message}`)
    })
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings:`)
    warnings.forEach(diag => {
      console.log(`   ${diag.file}`)
      console.log(`      - [${diag.rule}] ${diag.message}`)
    })
  }

  if (report.diagnostics.length === 0) {
    console.log(`\n✅ All Concepts have valid frontmatter!`)
  }

  console.log("\n" + "=".repeat(60))
}

validateAllFrontmatter()
