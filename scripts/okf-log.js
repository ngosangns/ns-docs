#!/usr/bin/env node

// OKF v0.1 update log maintenance.
// See .kiro/specs/okf-redesign/design.md (Component 4: okf-log, and the
// `appendLogEntry` algorithm) and Requirements 8.1-8.5, 8.7, 8.8.
//
// Maintains `log.md` at the bundle root in newest-first order. Each entry is
// recorded under a `## YYYY-MM-DD` heading (UTC date) and starts with exactly
// one bold keyword from {**Update**, **Creation**, **Deprecation**}.
//
// CLI: node scripts/okf-log.js add --kind=Update|Creation|Deprecation --message="..."
//
// --- parseLog representation -----------------------------------------------
//
//   parseLog(raw) -> { preamble, blocks }
//
//     preamble : string[]   raw lines appearing before the first date heading
//                           (e.g. a `# Log` title or blank lines). Preserved
//                           verbatim so nothing is lost on round-trip.
//     blocks   : Block[]    one entry per `## YYYY-MM-DD` heading, in document
//                           order.
//
//   Block { date, lines }
//     date  : string        the ISO date captured from the heading.
//     lines : string[]      every raw line between this heading and the next
//                           heading (entry lines plus any blank/extra lines),
//                           preserved verbatim.
//
// This representation preserves all existing content (headings are the only
// thing re-rendered, and they are re-rendered to their canonical `## <date>`
// form) and supports rendering back to text via `renderLog`.

const fs = require("fs")
const path = require("path")

// The only accepted log-entry keywords (Requirement 8.2 / 8.7).
const VALID_KINDS = ["Update", "Creation", "Deprecation"]

// Matches a date heading line: `## YYYY-MM-DD` (trailing whitespace allowed).
const HEADING_RE = /^##\s+(\d{4}-\d{2}-\d{2})\s*$/

// --- helpers ---------------------------------------------------------------

// todayUtcDate() -> string
// The current date in UTC, formatted as ISO 8601 `YYYY-MM-DD` (Requirement 8.1).
function todayUtcDate() {
  return new Date().toISOString().slice(0, 10)
}

// buildEntryLine(kind, message) -> string
// An entry line begins with exactly one bold keyword followed by the message
// (Requirement 8.2). Empty messages produce just the bold keyword.
function buildEntryLine(kind, message) {
  const text = typeof message === "string" ? message.trim() : ""
  return text.length > 0 ? `**${kind}** ${text}` : `**${kind}**`
}

// isValidKind(kind) -> boolean
function isValidKind(kind) {
  return VALID_KINDS.includes(kind)
}

// --- parseLog --------------------------------------------------------------

// parseLog(raw) -> { preamble, blocks }
// Pure. Splits the log into a leading preamble plus one block per date heading.
function parseLog(raw) {
  const text = typeof raw === "string" ? raw : ""
  // An empty document has no preamble and no blocks (avoids a spurious leading
  // blank line when starting from a missing/empty log).
  const lines = text === "" ? [] : text.split("\n")

  const preamble = []
  const blocks = []
  let current = null

  for (const line of lines) {
    const match = line.match(HEADING_RE)
    if (match) {
      current = { date: match[1], lines: [] }
      blocks.push(current)
    } else if (current) {
      current.lines.push(line)
    } else {
      preamble.push(line)
    }
  }

  return { preamble, blocks }
}

// --- renderLog -------------------------------------------------------------

// renderLog(parsed) -> string
// Inverse of parseLog: rebuilds the document text. Headings are emitted in
// their canonical `## <date>` form; everything else is preserved verbatim.
function renderLog(parsed) {
  const out = []

  for (const line of parsed.preamble) {
    out.push(line)
  }
  for (const block of parsed.blocks) {
    out.push(`## ${block.date}`)
    for (const line of block.lines) {
      out.push(line)
    }
  }

  return out.join("\n")
}

// --- appendLogEntry --------------------------------------------------------

// insertionIndexFor(blocks, date) -> number
// Returns the index at which a new block for `date` should be inserted to keep
// the date headings in descending order (newest first) WITHOUT reordering any
// existing block (Requirement 8.5, 8.6): the first existing block whose date is
// strictly older than `date`. For the typical case (today's UTC date, newest of
// all) this is index 0 — i.e. the new block lands at the top (Requirement 8.4).
function insertionIndexFor(blocks, date) {
  for (let i = 0; i < blocks.length; i += 1) {
    if (blocks[i].date < date) {
      return i
    }
  }
  return blocks.length
}

// computeNewLog(currentRaw, entry) -> string
// Pure core of appendLogEntry: validates the kind, then computes the new log
// text. Throws on an invalid kind BEFORE producing any output (Requirement 8.7).
function computeNewLog(currentRaw, entry) {
  const kind = entry && entry.kind
  if (!isValidKind(kind)) {
    throw new Error(
      `Invalid log entry kind: ${JSON.stringify(kind)}. ` +
        `Expected one of ${VALID_KINDS.join(", ")}.`
    )
  }

  const date = entry.date || todayUtcDate()
  const line = buildEntryLine(kind, entry.message)

  const parsed = parseLog(currentRaw)
  const existing = parsed.blocks.find((block) => block.date === date)

  if (existing) {
    // Requirement 8.3: insert as the first line directly under the heading.
    existing.lines.unshift(line)
  } else {
    // Requirement 8.4: create a new date block and place it at the top
    // (descending order is preserved via insertionIndexFor).
    const at = insertionIndexFor(parsed.blocks, date)
    parsed.blocks.splice(at, 0, { date, lines: [line] })
  }

  return renderLog(parsed)
}

// appendLogEntry(logPath, entry) -> void
// entry = { date?, kind, message }. If `date` is omitted the current UTC date
// is used. Reads the current log.md (empty string when missing), computes the
// new content and writes it.
//
// Validation: an invalid kind is rejected before any write, leaving log.md
// untouched (Requirement 8.7).
//
// Write safety (Requirement 8.8): the new content is written to a temporary
// file in the same directory and then atomically renamed over the target. The
// original file is never partially overwritten — if any step fails the original
// remains intact (and is explicitly restored as a defensive fallback), and the
// error is re-thrown so the caller can signal failure.
function appendLogEntry(logPath, entry) {
  const target = path.resolve(logPath)

  const existed = fs.existsSync(target)
  const original = existed ? fs.readFileSync(target, "utf8") : ""

  // Validate (and compute) BEFORE touching the filesystem.
  const newContent = computeNewLog(original, entry)

  const tmpPath = `${target}.${process.pid}.tmp`
  try {
    fs.writeFileSync(tmpPath, newContent, "utf8")
    fs.renameSync(tmpPath, target)
  } catch (err) {
    // Clean up any temp artifact and restore the original content so we never
    // leave half-written output behind (Requirement 8.8).
    try {
      if (fs.existsSync(tmpPath)) {
        fs.unlinkSync(tmpPath)
      }
    } catch (cleanupErr) {
      // Ignore cleanup failures; the primary error is more important.
    }
    if (existed) {
      try {
        fs.writeFileSync(target, original, "utf8")
      } catch (restoreErr) {
        // Surface restore failure alongside the original write failure.
        throw new Error(
          `Failed to write log and could not restore original: ` +
            `${err.message}; restore error: ${restoreErr.message}`
        )
      }
    }
    throw new Error(`Failed to write log file ${target}: ${err.message}`)
  }
}

module.exports = {
  parseLog,
  renderLog,
  appendLogEntry,
  computeNewLog,
  buildEntryLine,
  todayUtcDate,
  isValidKind,
  VALID_KINDS
}

// --- CLI -------------------------------------------------------------------
//
// Usage: node scripts/okf-log.js add --kind=<Update|Creation|Deprecation> --message="..." [logPath]
//
// The optional positional argument overrides the log path (defaults to
// <cwd>/log.md). On an invalid kind (or other failure) an error is printed and
// the process exits non-zero, leaving log.md unchanged.

function parseCliArgs(argv) {
  let command = null
  let kind = null
  let message = null
  let logPath = null

  for (const arg of argv) {
    if (arg.startsWith("--kind=")) {
      kind = arg.slice("--kind=".length)
    } else if (arg.startsWith("--message=")) {
      message = arg.slice("--message=".length)
    } else if (arg.startsWith("--")) {
      // Unknown flag — ignore.
    } else if (command === null) {
      command = arg
    } else if (logPath === null) {
      logPath = arg
    }
  }

  return {
    command,
    kind,
    message: message || "",
    logPath: logPath || path.join(process.cwd(), "log.md")
  }
}

if (require.main === module) {
  const { command, kind, message, logPath } = parseCliArgs(process.argv.slice(2))

  if (command !== "add") {
    console.error(
      `Usage: node scripts/okf-log.js add --kind=${VALID_KINDS.join("|")} --message="..." [logPath]`
    )
    process.exit(1)
  }

  if (!isValidKind(kind)) {
    console.error(
      `Invalid --kind: ${JSON.stringify(kind)}. Expected one of ${VALID_KINDS.join(", ")}.`
    )
    process.exit(1)
  }

  try {
    appendLogEntry(logPath, { kind, message })
    console.log(`Added ${kind} entry to ${logPath}`)
    process.exit(0)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
