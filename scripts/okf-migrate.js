#!/usr/bin/env node

// OKF migration tooling: infers missing frontmatter, normalizes recommended
// fields, and rewrites cross-links to bundle-relative form.
// See .kiro/specs/okf-redesign/design.md (Component 2: okf-migrate) and
// Requirements 3.x, 4.x, 5.x, 6.x, 10.x.
//
// This file is built up incrementally across tasks 8.x, 9.x and 10.x. Task 8.1
// adds `inferType`; later tasks add `migrateFrontmatter`, `migrateLinks`,
// `rewriteLinks` and `migrateBundle` plus the CLI entry point.

const fs = require("fs")
const path = require("path")
const { execFileSync } = require("child_process")

const { TYPE_RULES } = require("./okf-core/constants")
const {
  walkBundle,
  walkBundleTolerant,
  buildIndex,
  serializeConcept
} = require("./okf-core")
const {
  normalizeLink,
  resolveTarget,
  isInternalMarkdownTarget,
  wikilinkRegex,
  markdownLinkRegex
} = require("./okf-core/links")
const { checkBundle } = require("./okf-conformance")

// inferType(concept, typeRules) -> string
//
// Returns a non-empty `type` string for a Concept.
//   - If `concept.data.type` is a non-empty string (length >= 1 after trim),
//     the original value is returned unchanged (content and whitespace kept).
//   - Otherwise the Concept_Id (`concept.id`) is matched against `typeRules` on
//     directory-segment boundaries, choosing the longest matching root-directory
//     prefix; the mapped type is returned.
//   - When no prefix matches, returns "Note".
//
// Pure function: it never mutates `concept` or any other input.
function inferType(concept, typeRules) {
  const rules = typeRules || TYPE_RULES

  const existing = concept && concept.data ? concept.data.type : undefined
  if (typeof existing === "string" && existing.trim().length >= 1) {
    return existing
  }

  const id = concept && typeof concept.id === "string" ? concept.id : ""
  const idSegments = id.split("/").filter((segment) => segment.length > 0)

  let bestType = "Note"
  let bestLength = 0

  for (const key of Object.keys(rules)) {
    const keySegments = key.split("/").filter((segment) => segment.length > 0)
    if (keySegments.length === 0) {
      continue
    }
    if (keySegments.length > idSegments.length) {
      continue
    }

    let matches = true
    for (let i = 0; i < keySegments.length; i++) {
      if (keySegments[i] !== idSegments[i]) {
        matches = false
        break
      }
    }

    if (matches && keySegments.length > bestLength) {
      bestLength = keySegments.length
      bestType = rules[key]
    }
  }

  return bestType
}

// isEmptyType(value) -> boolean
// Matches inferType's "empty" definition for `type`: a value counts as empty
// unless it is a string with length >= 1 after trimming.
function isEmptyType(value) {
  return !(typeof value === "string" && value.trim().length >= 1)
}

// isEmptyField(value) -> boolean
// A Recommended_Field counts as fillable when it is missing, null, or an
// empty/whitespace-only string. Non-string present values (e.g. a YAML date,
// number or list) are treated as non-empty and kept untouched (Requirement
// 4.4).
function isEmptyField(value) {
  if (value === undefined || value === null) {
    return true
  }
  if (typeof value === "string") {
    return value.trim().length === 0
  }
  return false
}

// fileNameTitle(concept) -> string
// Derives the Concept's file name without the `.md` extension, preferring
// `relPath` and falling back to `id` (Requirement 4.1).
function fileNameTitle(concept) {
  const source =
    concept && (concept.relPath || concept.id) ? concept.relPath || concept.id : ""
  const base = source.split("/").pop() || ""
  return base.replace(/\.md$/i, "")
}

// migrateFrontmatter(concept, typeRules) -> { concept, changes }
//
// Normalizes a Concept's frontmatter without touching its body:
//   - When `type` is empty (per inferType's empty check), assigns the inferred
//     type and records a change (Requirements 3.6, 3.7).
//   - Fills missing Recommended_Fields `title`, `description` and `timestamp`
//     (Requirements 4.1, 4.2, 4.3); existing non-empty values are kept and no
//     change is recorded for them (Requirement 4.4).
//
// Returns a NEW concept whose `data` is a shallow clone carrying the updates,
// so the original input is never mutated. Each change is a structured record
// `{ id, field, before, after }` where `id` is the source Concept_Id.
function migrateFrontmatter(concept, typeRules) {
  const id = concept && typeof concept.id === "string" ? concept.id : ""
  const data = concept && concept.data ? { ...concept.data } : {}
  const next = { ...concept, data }
  const changes = []

  // type (Requirement 3.6 / 3.7): infer when empty, record before/after.
  if (isEmptyType(data.type)) {
    const before = data.type
    const after = inferType(concept, typeRules)
    data.type = after
    if (before !== after) {
      changes.push({ id, field: "type", before, after })
    }
  }

  // Recommended_Fields (Requirements 4.1, 4.2, 4.3). `description` is only
  // filled when the key is ABSENT (hasOwnProperty) so that an already-filled
  // empty string ("") is treated as present and never refilled — this keeps the
  // second run change-free (idempotency, Requirement 10.8 / task 10.2). `title`
  // and `timestamp` are filled whenever missing or empty. Existing non-empty
  // values are kept untouched and record no change (Requirement 4.4).
  const recommended = [
    {
      field: "title",
      shouldFill: () => isEmptyField(data.title),
      value: () => fileNameTitle(concept)
    },
    {
      field: "description",
      shouldFill: () => !Object.prototype.hasOwnProperty.call(data, "description"),
      value: () => ""
    },
    {
      field: "timestamp",
      shouldFill: () => isEmptyField(data.timestamp),
      value: () => new Date().toISOString()
    }
  ]

  for (const { field, shouldFill, value } of recommended) {
    if (shouldFill()) {
      const before = data[field]
      const after = value()
      data[field] = after
      if (before !== after) {
        changes.push({ id, field, before, after })
      }
    }
  }

  return { concept: next, changes }
}

// --- Cross-link normalization (Requirements 5.7, 5.8, 5.9) -----------------
//
// Embeds and images are intentionally LEFT UNTOUCHED:
//   - `![[...]]` Obsidian embeds (matched out via the `(?<!!)` lookbehind on
//     the wikilink scanner)
//   - `![](...)` markdown image syntax (matched out via the same lookbehind on
//     the markdown-link scanner)
// Only normal references `[[target]]` / `[[target|alias#anchor]]` and normal
// markdown links `[label](target)` are rewritten. This keeps attachment/image
// references stable while migrating prose cross-links to bundle-relative form.
// The link regexes and `isInternalMarkdownTarget` classifier are shared with
// check-links via okf-core/links.

// basenameOf(id) -> string
// The final `/`-separated segment of a Concept_Id (its file name without the
// `.md` extension, which Concept_Id never carries).
function basenameOf(id) {
  return String(id || "").split("/").pop() || ""
}

// conceptLabel(concept, fallback) -> string
// The display label for a resolved Concept: its frontmatter `title` when it is
// a non-empty string, otherwise the basename of its Concept_Id. `fallback` is
// only used defensively when no Concept resolved.
function conceptLabel(concept, fallback) {
  if (concept && concept.data && typeof concept.data.title === "string") {
    if (concept.data.title.trim().length >= 1) {
      return concept.data.title
    }
  }
  if (concept) {
    return basenameOf(concept.id)
  }
  return fallback
}

// rewriteLinks(body, sourceId, bundleIndex) -> { body, broken }
//
// Scans `body` for wikilinks and internal markdown links and rewrites every
// internal link that resolves uniquely to a Concept into a bundle-relative
// markdown link `[label](/Concept_Id#anchor)`:
//   - Wikilinks: label = alias (text after `|`) when present, else the resolved
//     Concept's `title` or its basename; the `#anchor` is preserved by
//     normalizeLink on the target.
//   - Markdown links: the existing label is kept; only the target is rewritten.
// Links that do not resolve (zero/ambiguous match) are kept verbatim and a
// broken-link record `{ sourceId, target }` is collected (Requirement 5.9),
// where `target` is the original unresolved destination string. External links
// and embeds/images are left untouched.
//
// Returns `{ body, broken }` with `broken` an array of `{ sourceId, target }`.
// Pure: does not mutate its arguments.
function rewriteLinks(body, sourceId, bundleIndex) {
  const broken = []
  const source = typeof body === "string" ? body : ""

  // Pass 1: wikilinks. Using a single replace pass over the original string
  // means freshly produced markdown links are not re-scanned here.
  let next = source.replace(wikilinkRegex(), (match, inner) => {
    const pipeIdx = inner.indexOf("|")
    const alias = pipeIdx >= 0 ? inner.slice(pipeIdx + 1) : null
    const targetRaw = pipeIdx >= 0 ? inner.slice(0, pipeIdx) : inner

    const normalized = normalizeLink(inner, sourceId, bundleIndex)
    if (normalized == null) {
      broken.push({ sourceId, target: targetRaw })
      return match
    }

    let label = alias
    if (label == null) {
      const concept = resolveTarget(inner, sourceId, bundleIndex)
      label = conceptLabel(concept, targetRaw)
    }
    return "[" + label + "](" + normalized + ")"
  })

  // Pass 2: markdown links. Any wikilink converted above is now `[label](/id)`
  // — an internal bundle-relative target that normalizeLink returns unchanged,
  // so this pass is idempotent over them and records no spurious broken links.
  next = next.replace(markdownLinkRegex(), (match, label, target) => {
    if (!isInternalMarkdownTarget(target)) {
      return match
    }
    const normalized = normalizeLink(target.trim(), sourceId, bundleIndex)
    if (normalized == null) {
      broken.push({ sourceId, target })
      return match
    }
    return "[" + label + "](" + normalized + ")"
  })

  return { body: next, broken }
}

// migrateLinks(concept, bundleIndex) -> { concept, changes, broken }
//
// Applies rewriteLinks to `concept.body`. When the body changes, returns a NEW
// concept carrying the rewritten body and records a single change
// `{ id, field: "body" }`; the input concept is never mutated. Collected
// broken-link records are returned so the orchestration layer (task 10) can
// surface them via `--report-broken` (Requirements 5.7, 5.8, 5.9).
function migrateLinks(concept, bundleIndex) {
  const id = concept && typeof concept.id === "string" ? concept.id : ""
  const body = concept && typeof concept.body === "string" ? concept.body : ""

  const result = rewriteLinks(body, id, bundleIndex)
  const changes = []
  let next = concept

  if (result.body !== body) {
    next = { ...concept, body: result.body }
    changes.push({ id, field: "body" })
  }

  return { concept: next, changes, broken: result.broken }
}

// --- Orchestration: migrateBundle ------------------------------------------
//
// migrateBundle(rootDir, options) -> {
//   report,    // ConformanceReport from checkBundle(rootDir) (always run last,
//              //   read-only; even in Dry_Run_Mode it only reads the bundle).
//   broken,    // { sourceId, target }[]  — every unresolved internal link
//              //   collected across all concepts (empty when none). `sourceId`
//              //   is the source Concept_Id, `target` the original unresolved
//              //   destination string (Requirements 5.9, 6.3, 6.4).
//   written,   // string[]  — relPath of every file actually written to disk
//              //   (always [] in Dry_Run_Mode).
//   skipped,   // string[]  — relPath of every Concept skipped because its
//              //   frontmatter could not be parsed (never overwritten).
//   errors     // { file, stage, message }[]  — signalled errors. `stage` is
//              //   "parse" (unparseable frontmatter, skipped) or "write" (a
//              //   write that failed; the original file is left intact). A
//              //   failed backup is signalled by THROWING before any write.
// }
//
// options = { apply, only, backup, reportBroken }
//   - apply       false -> Dry_Run_Mode (default): never write/modify/delete/
//                 create any file and never create a backup (Requirement 10.1).
//                 true  -> Apply_Mode: writes changed files to disk.
//   - only        "frontmatter" -> only frontmatter changes; "links" -> only
//                 link changes; anything else -> both (Requirement 10.7).
//   - backup      In Apply_Mode, create a snapshot of the bundle (covering every
//                 file that will be modified) BEFORE any write; if it fails,
//                 stop before modifying anything and throw (Requirements 10.2,
//                 10.3). Ignored in Dry_Run_Mode.
//   - reportBroken  Surfaced by the CLI to print the broken-link list; the
//                 returned `broken` array is populated regardless.
//
// Behaviour summary (Requirements 6.1, 6.3, 6.4, 10.1-10.7, 10.9, 10.10):
//   - The write decision is content-based: a concept is migrated, re-serialized
//     and the result compared against the CURRENT file content; a file is
//     written only when the new content differs. This guarantees idempotency
//     (Requirement 10.8): a second consecutive run produces identical content
//     and writes 0 files.
//   - Broken links never abort the run (Requirement 6.1); they are collected
//     and returned.
//   - A write failure leaves the original file intact (writes go through a
//     temp file + atomic rename), is recorded in `errors`, and processing
//     continues with the remaining concepts (Requirement 10.6).
function migrateBundle(rootDir, options) {
  const opts = options || {}
  const apply = Boolean(opts.apply)
  const only = opts.only === "frontmatter" || opts.only === "links" ? opts.only : null
  const backup = Boolean(opts.backup)

  const { concepts, index } = walkForMigration(rootDir)

  const broken = []
  const skipped = []
  const errors = []
  const plans = []

  for (const concept of concepts) {
    // Unparseable frontmatter: skip the file, never overwrite it, list it and
    // signal an error, then continue (Requirements 10.9 / Error Scenario 1).
    if (concept.parseError) {
      const file = concept.relPath || concept.absPath
      skipped.push(file)
      errors.push({
        file,
        stage: "parse",
        message: "Frontmatter could not be parsed as YAML"
      })
      continue
    }

    let migrated = concept

    if (only !== "links") {
      migrated = migrateFrontmatter(migrated, TYPE_RULES).concept
    }

    if (only !== "frontmatter") {
      const linkResult = migrateLinks(migrated, index)
      migrated = linkResult.concept
      for (const record of linkResult.broken) {
        broken.push(record)
      }
    }

    // Content-based change detection / idempotency anchor.
    let current
    try {
      current = fs.readFileSync(concept.absPath, "utf8")
    } catch (err) {
      errors.push({
        file: concept.relPath || concept.absPath,
        stage: "read",
        message: err.message
      })
      continue
    }

    const next = serializeConcept(migrated)
    if (next !== current) {
      plans.push({
        absPath: concept.absPath,
        relPath: concept.relPath,
        content: next
      })
    }
  }

  const written = []

  // Only ever touch the disk in Apply_Mode (Requirement 10.1).
  if (apply && plans.length > 0) {
    if (backup) {
      // Snapshot must complete BEFORE any write; a failure stops the run with
      // the bundle untouched (Requirements 10.2, 10.3).
      try {
        createBackupSnapshot(rootDir)
      } catch (err) {
        const failure = new Error(`Backup snapshot failed: ${err.message}`)
        failure.code = "BACKUP_FAILED"
        throw failure
      }
    }

    for (const plan of plans) {
      try {
        writeFileAtomic(plan.absPath, plan.content)
        written.push(plan.relPath)
      } catch (err) {
        // Original file is left intact (atomic write); record which file
        // failed and keep going (Requirement 10.6).
        errors.push({ file: plan.relPath, stage: "write", message: err.message })
      }
    }
  }

  // Always finish with a (read-only) conformance check (Requirement 10.10).
  const report = checkBundle(rootDir)

  return { report, broken, written, skipped, errors }
}

// walkForMigration(rootDir) -> { concepts, index }
//
// Walks the bundle for migration. The happy path uses okf-core.walkBundle,
// whose `index` is the canonical multi-key lookup used by link resolution.
// walkBundle aborts on the FIRST file with unparseable frontmatter, which would
// prevent skipping just the bad files, so on such a failure we fall back to the
// per-file-tolerant walkBundleTolerant (which flags each bad file with
// `parseError: true`) and rebuild an equivalent index from the parseable
// concepts via okf-core.buildIndex (which skips parseError concepts).
function walkForMigration(rootDir) {
  try {
    const bundle = walkBundle(rootDir)
    const concepts = bundle.concepts.map((concept) => ({
      ...concept,
      parseError: false
    }))
    return { concepts, index: bundle.index }
  } catch (err) {
    const { concepts } = walkBundleTolerant(rootDir)
    return { concepts, index: buildIndex(concepts) }
  }
}

// createBackupSnapshot(rootDir)
//
// Creates a backup snapshot covering every file that may be modified, by
// invoking the existing scripts/backup.js as a child process. backup.js
// produces a timestamped `backups/backup-<ts>.tar.gz` of the whole workspace
// (excluding node_modules/.git/backups/export) — a superset of the files
// migrate touches — and exits non-zero on failure.
//
// NOTE on the chosen approach: scripts/backup.js exposes no importable function
// (it runs on require and calls process.exit on error) and snapshots the whole
// workspace as a `.tar.gz` rather than per-file copies. Running it as a
// subprocess is therefore the cleanest fit: it reuses the project's existing
// backup tool, the `.tar.gz` artifact is never picked up by the bundle walk (so
// it cannot pollute conformance), and a non-zero exit throws synchronously
// here — before any write — so the caller can abort with the bundle untouched.
function createBackupSnapshot(rootDir) {
  const script = path.join(__dirname, "backup.js")
  execFileSync(process.execPath, [script], { stdio: "ignore" })
}

// writeFileAtomic(absPath, content)
// Writes `content` to `absPath` atomically: it first writes a sibling temp file
// then renames it over the target. If anything fails the original file is left
// intact (no half-written content) and the temp file is cleaned up.
function writeFileAtomic(absPath, content) {
  const dir = path.dirname(absPath)
  const tmp = path.join(dir, `.${path.basename(absPath)}.okf-tmp-${process.pid}`)
  fs.writeFileSync(tmp, content, "utf8")
  try {
    fs.renameSync(tmp, absPath)
  } catch (err) {
    try {
      fs.unlinkSync(tmp)
    } catch (cleanupErr) {
      // best-effort cleanup; surface the original write error below.
    }
    throw err
  }
}

module.exports = {
  inferType,
  migrateFrontmatter,
  migrateLinks,
  rewriteLinks,
  migrateBundle
}

// --- CLI --------------------------------------------------------------------
//
// Usage: node scripts/okf-migrate.js [rootDir]
//          [--dry-run] [--apply] [--only=frontmatter|links] [--backup]
//          [--report-broken]
//
// Default mode is Dry_Run_Mode (no disk changes). `--apply` switches to
// Apply_Mode. `--backup` (Apply_Mode only) snapshots before writing.
// `--report-broken` prints the collected broken-link list (an empty list when
// none).
//
// Exit codes:
//   - Backup failure -> non-zero (the bundle is left untouched).
//   - Any parse/write/read error in `errors` -> non-zero.
//   - Otherwise (including bundles with only broken links) -> 0 (Requirement
//     6.1: broken links are tolerated, not failures).

function parseCliArgs(argv) {
  let apply = false
  let only = null
  let backup = false
  let reportBroken = false
  let rootDir = null

  for (const arg of argv) {
    if (arg === "--apply") {
      apply = true
    } else if (arg === "--dry-run") {
      apply = false
    } else if (arg === "--backup") {
      backup = true
    } else if (arg === "--report-broken") {
      reportBroken = true
    } else if (arg.startsWith("--only=")) {
      only = arg.slice("--only=".length)
    } else if (!arg.startsWith("--") && rootDir === null) {
      rootDir = arg
    }
  }

  return { apply, only, backup, reportBroken, rootDir: rootDir || process.cwd() }
}

if (require.main === module) {
  const { apply, only, backup, reportBroken, rootDir } = parseCliArgs(
    process.argv.slice(2)
  )

  let result
  try {
    result = migrateBundle(rootDir, { apply, only, backup, reportBroken })
  } catch (err) {
    console.error(`ERROR: ${err.message}`)
    process.exit(1)
  }

  const mode = apply ? "apply" : "dry-run"
  const errors = result.report.diagnostics.filter((d) => d.level === "error")
  const warnings = result.report.diagnostics.filter((d) => d.level === "warning")

  console.log(`Mode: ${mode}${only ? ` | only: ${only}` : ""}`)
  console.log(
    `Files ${apply ? "written" : "to change"}: ${
      apply ? result.written.length : "(dry-run; nothing written)"
    }`
  )
  if (result.skipped.length > 0) {
    console.log(`Skipped (unparseable frontmatter): ${result.skipped.length}`)
    for (const file of result.skipped) {
      console.log(`  - ${file}`)
    }
  }
  for (const err of result.errors) {
    console.log(`ERROR [${err.stage}] ${err.file}: ${err.message}`)
  }

  if (reportBroken) {
    console.log(`\nBroken links: ${result.broken.length}`)
    for (const record of result.broken) {
      console.log(`  - ${record.sourceId} -> ${record.target}`)
    }
  }

  console.log(
    `\nConformance: ${result.report.conceptCount} concepts | errors: ${errors.length} | warnings: ${warnings.length} | conformant: ${result.report.conformant}`
  )

  // Broken links never fail the run (Requirement 6.1). Parse/write/read errors
  // and backup failures do.
  process.exit(result.errors.length > 0 ? 1 : 0)
}
