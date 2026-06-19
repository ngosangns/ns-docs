#!/usr/bin/env node

// OKF v0.1 conformance checking.
// See .kiro/specs/okf-redesign/design.md (Component 5: okf-conformance,
// Function 5: checkConcept) and Requirements 4.5, 4.6, 9.1-9.5, 9.8.
//
// This module is read-only: it never creates, modifies or deletes files
// (Requirement 9.4). It walks the bundle, parses each file's frontmatter
// individually (catching YAML errors per-file so one bad file never aborts
// the whole check) and reports Diagnostics.
//
// Contracts shared with later tasks (7.2 CLI, 8.x migrate, 11.x adapters):
//
//   Diagnostic        { file, level, rule, message }
//                       level is exactly "error" or "warning".
//                       file is the Concept's relPath (falls back to absPath).
//
//   Concept (input)   { id, absPath, relPath, data, body, hadFrontmatter }
//                       A Concept whose frontmatter could not be parsed is
//                       represented with `parseError: true` (and no `data`).
//
//   ReservedFile      { relPath, absPath, name, isRoot, data,
//                       hadFrontmatter, parseError }
//
//   ConformanceReport { conformant, conceptCount, diagnostics }
//                       conformant === true  IFF  no error-level diagnostic.
//
// Rule names emitted here (stable identifiers downstream tasks align to):
//   - "frontmatter-parse"        error    frontmatter could not be parsed
//   - "type-required"            error    missing/empty `type`
//   - "recommended-field-missing" warning missing recommended field
//   - "timestamp-format"         warning  `timestamp` present, not ISO 8601
//   - "tags-format"              warning  `tags` present, not a YAML list
//   - "index-no-frontmatter"     error    non-root index.md has frontmatter
//   - "index-root-frontmatter"   error    root index.md has keys != okf_version

const path = require("path")

const { OKF_KEYS } = require("./okf-core/constants")
const { walkBundleTolerant } = require("./okf-core")

// Recommended OKF frontmatter fields that warn when missing. `type` is required
// and handled separately. `resource` (a canonical URI) is intentionally NOT
// warned: OKF allows omitting it for abstract concepts, so a missing `resource`
// is acceptable. The remaining fields still warn when absent.
const WARNED_RECOMMENDED_FIELDS = OKF_KEYS.filter(
  (key) => key !== "type" && key !== "resource"
)

// --- small helpers ---------------------------------------------------------

function diagnostic(file, level, rule, message) {
  return { file, level, rule, message }
}

// isMissing(value) -> boolean
// A recommended field counts as "missing" when it is absent, null, an empty
// (or whitespace-only) string, or an empty array.
function isMissing(value) {
  if (value === undefined || value === null) {
    return true
  }
  if (typeof value === "string") {
    return value.trim().length === 0
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  return false
}

// isNonEmptyString(value) -> boolean
// True when `value` is a string with length >= 1 after trimming.
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0
}

// isValidTimestamp(value) -> boolean
// Accepts a real Date (js-yaml parses YAML timestamps into Date objects) or an
// ISO 8601 string (date or date-time form).
const ISO_8601_RE =
  /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}(:?\d{2})?)?)?$/

function isValidTimestamp(value) {
  if (value instanceof Date) {
    return !Number.isNaN(value.getTime())
  }
  if (typeof value !== "string") {
    return false
  }
  const trimmed = value.trim()
  if (!ISO_8601_RE.test(trimmed)) {
    return false
  }
  return !Number.isNaN(new Date(trimmed).getTime())
}

// fileLabelOf(item) -> string
// Diagnostic.file is the relPath when available, otherwise the absPath.
function fileLabelOf(item) {
  return (item && (item.relPath || item.absPath)) || ""
}

// --- checkConcept ----------------------------------------------------------

// checkConcept(concept) -> Diagnostic[]
//
// Pure, no side effects. Evaluates each rule independently and accumulates the
// resulting diagnostics:
//   - parseError flag        -> one `error` rule `frontmatter-parse`
//   - missing/empty `type`   -> exactly one `error` rule `type-required`
//   - each missing recommended field -> one `warning` `recommended-field-missing`
//   - `timestamp` present but not ISO 8601 -> one `warning` `timestamp-format`
//   - `tags` present but not an array      -> one `warning` `tags-format`
function checkConcept(concept) {
  const diagnostics = []
  const file = fileLabelOf(concept)

  // A frontmatter that could not be parsed short-circuits the other rules:
  // we have no reliable `data` to inspect.
  if (concept && concept.parseError) {
    diagnostics.push(
      diagnostic(
        file,
        "error",
        "frontmatter-parse",
        "Frontmatter could not be parsed as YAML"
      )
    )
    return diagnostics
  }

  const data = concept && concept.data && typeof concept.data === "object" ? concept.data : {}

  // Requirement 9.1: missing or empty `type` -> exactly one error.
  if (!isNonEmptyString(data.type)) {
    diagnostics.push(
      diagnostic(file, "error", "type-required", "Missing required `type` field")
    )
  }

  // Requirement 9.3: each missing recommended field -> one warning.
  for (const field of WARNED_RECOMMENDED_FIELDS) {
    if (isMissing(data[field])) {
      diagnostics.push(
        diagnostic(
          file,
          "warning",
          "recommended-field-missing",
          `Missing recommended field \`${field}\``
        )
      )
    }
  }

  // Requirement 4.5: `timestamp` present but not valid ISO 8601 -> one warning.
  if (!isMissing(data.timestamp) && !isValidTimestamp(data.timestamp)) {
    diagnostics.push(
      diagnostic(
        file,
        "warning",
        "timestamp-format",
        "`timestamp` is not a valid ISO 8601 value"
      )
    )
  }

  // Requirement 4.6: `tags` present but not a YAML list (array) -> one warning.
  if (!isMissing(data.tags) && !Array.isArray(data.tags)) {
    diagnostics.push(
      diagnostic(file, "warning", "tags-format", "`tags` is not a valid YAML list")
    )
  }

  return diagnostics
}

// --- checkReservedFile -----------------------------------------------------

// checkReservedFile(file) -> Diagnostic[]
//
// Validates reserved-file structure. An index.md must have NO frontmatter,
// except the root index.md which may contain only the `okf_version` key.
// A reserved file whose frontmatter could not be parsed yields a
// `frontmatter-parse` error. log.md has no structural frontmatter rules here.
function checkReservedFile(file) {
  const diagnostics = []
  const label = fileLabelOf(file)

  if (file && file.parseError) {
    diagnostics.push(
      diagnostic(
        label,
        "error",
        "frontmatter-parse",
        "Frontmatter could not be parsed as YAML"
      )
    )
    return diagnostics
  }

  const name = (file && file.name) || path.basename(label).toLowerCase()
  const isIndex = name.toLowerCase() === "index.md"
  if (!isIndex) {
    // log.md (and any other reserved file) has no frontmatter rule here.
    return diagnostics
  }

  const data = file && file.data && typeof file.data === "object" ? file.data : {}
  const keys = Object.keys(data)
  const isRoot = Boolean(file && file.isRoot) || label === "index.md"

  if (isRoot) {
    // Root index.md may declare only `okf_version`.
    const extraneous = keys.filter((key) => key !== "okf_version")
    if (extraneous.length > 0) {
      diagnostics.push(
        diagnostic(
          label,
          "error",
          "index-root-frontmatter",
          `Root index.md may only contain \`okf_version\`; found: ${extraneous.join(", ")}`
        )
      )
    }
    return diagnostics
  }

  // Non-root index.md must have no frontmatter at all.
  if (file && file.hadFrontmatter && keys.length > 0) {
    diagnostics.push(
      diagnostic(
        label,
        "error",
        "index-no-frontmatter",
        "Non-root index.md must not contain frontmatter"
      )
    )
  }

  return diagnostics
}

// --- safe bundle walk ------------------------------------------------------

// safeWalkBundle(rootDir) -> { concepts, reservedFiles }
//
// Thin wrapper over okf-core.walkBundleTolerant: parses each file's
// frontmatter individually and tolerates YAML errors (a bad file becomes an
// entry with `parseError: true`) so checkBundle can emit a `frontmatter-parse`
// diagnostic rather than aborting the whole check. Kept as a named export for
// back-compat with callers that import it from this module.
function safeWalkBundle(rootDir) {
  return walkBundleTolerant(rootDir)
}

// --- checkBundle -----------------------------------------------------------

// resolveWalk(bundle) -> { concepts, reservedFiles }
//
// Accepts either a bundle root path (string), a pre-walked structure already
// carrying `concepts` + `reservedFiles`, or an okf-core Bundle (which has a
// `root` we can safely re-walk to recover per-file parse handling).
function resolveWalk(bundle) {
  if (typeof bundle === "string") {
    return safeWalkBundle(bundle)
  }
  if (bundle && typeof bundle === "object") {
    if (Array.isArray(bundle.concepts) && Array.isArray(bundle.reservedFiles)) {
      return { concepts: bundle.concepts, reservedFiles: bundle.reservedFiles }
    }
    if (typeof bundle.root === "string") {
      return safeWalkBundle(bundle.root)
    }
  }
  throw new Error("checkBundle: expected a bundle object or a root directory path")
}

// checkBundle(bundle) -> ConformanceReport
//
// Aggregates Diagnostics from every Concept and reserved file.
// `conformant` is true IFF there are no error-level diagnostics
// (Requirement 9.5). Returns { conformant, conceptCount, diagnostics }.
function checkBundle(bundle) {
  const { concepts, reservedFiles } = resolveWalk(bundle)

  const diagnostics = []
  for (const concept of concepts) {
    for (const diag of checkConcept(concept)) {
      diagnostics.push(diag)
    }
  }
  for (const reserved of reservedFiles) {
    for (const diag of checkReservedFile(reserved)) {
      diagnostics.push(diag)
    }
  }

  const conformant = !diagnostics.some((diag) => diag.level === "error")

  return {
    conformant,
    conceptCount: concepts.length,
    diagnostics
  }
}

module.exports = {
  checkConcept,
  checkReservedFile,
  checkBundle,
  safeWalkBundle
}

// --- CLI --------------------------------------------------------------------
//
// Usage: okf-conformance [rootDir] [--json] [--strict]
//
// Flags (parsed regardless of position; the first non-flag argument is the
// optional bundle root, defaulting to process.cwd()):
//   --json     Print the ConformanceReport as JSON ({ conformant, conceptCount,
//              diagnostics }) and suppress the human-readable per-line output.
//   --strict   Treat warnings as errors for exit-code purposes only. The
//              report's `conformant` field still reflects errors only
//              (Requirement 9.5); --strict does not change `conformant`.
//
// Exit codes:
//   - At least one `error` diagnostic        -> non-zero (Requirement 9.9).
//   - No `error` diagnostic                  -> 0        (Requirement 9.10).
//   - With --strict, any `warning` (even without an error) -> non-zero.

function parseCliArgs(argv) {
  let json = false
  let strict = false
  let rootDir = null

  for (const arg of argv) {
    if (arg === "--json") {
      json = true
    } else if (arg === "--strict") {
      strict = true
    } else if (rootDir === null) {
      rootDir = arg
    }
  }

  return { json, strict, rootDir: rootDir || process.cwd() }
}

if (require.main === module) {
  const { json, strict, rootDir } = parseCliArgs(process.argv.slice(2))
  const report = checkBundle(rootDir)

  const errors = report.diagnostics.filter((diag) => diag.level === "error")
  const warnings = report.diagnostics.filter((diag) => diag.level === "warning")

  if (json) {
    // Requirement 9.7: JSON output carries `conformant` and the full
    // diagnostics array (conceptCount included for convenience). Nothing else
    // is printed so the output is always valid, parseable JSON.
    console.log(JSON.stringify(report, null, 2))
  } else {
    for (const diag of report.diagnostics) {
      console.log(`${diag.level.toUpperCase()} [${diag.rule}] ${diag.file}: ${diag.message}`)
    }
    console.log(
      `\nConcepts: ${report.conceptCount} | errors: ${errors.length} | warnings: ${warnings.length} | conformant: ${report.conformant}`
    )
  }

  // Exit code: errors always fail (9.9); with --strict, warnings fail too.
  // Without errors (and, in strict mode, without warnings) -> 0 (9.10).
  const failed = errors.length > 0 || (strict && warnings.length > 0)
  process.exit(failed ? 1 : 0)
}
