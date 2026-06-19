#!/usr/bin/env node

// OKF index.md generation.
// See .kiro/specs/okf-redesign/design.md (Component 3: okf-index,
// Algorithm: buildDirectoryIndex) and Requirements 7.1-7.9.
//
// This module turns a Knowledge Bundle's directory tree into per-directory
// `index.md` navigation files (progressive disclosure). It is write-aware:
// `buildDirectoryIndex` / `buildRootIndex` are pure string builders, while the
// CLI walks the bundle and previews (`--dry-run`, default) or writes
// (`--apply`) the generated files.
//
// ---------------------------------------------------------------------------
// Relative-URL scheme
// ---------------------------------------------------------------------------
// Every URL emitted in an index.md is relative to the directory that index.md
// lives in (i.e. relative to the index file itself):
//   - A Concept directly inside the directory is linked by its file basename,
//     extension included, e.g. `Passive Voice.md`.
//   - A direct subdirectory is linked by `<SubdirName>/` (trailing slash), so
//     it resolves to that subdirectory's own index.md.
// This keeps every generated link portable and independent of the bundle root.
//
// ---------------------------------------------------------------------------
// "index.md used as a Concept" detection (no-overwrite heuristic)
// ---------------------------------------------------------------------------
// An existing index.md is treated as a hand-authored Concept (and therefore
// NEVER overwritten, only warned about) when EITHER:
//   - it carries disallowed frontmatter:
//       * non-root: any frontmatter key at all, or
//       * root:     any frontmatter key other than `okf_version`; OR
//   - its body contains non-navigation content: any non-blank line that is not
//     one of the auto-generated section headings (`# Sections` / `# Concepts`)
//     and not an auto-generated bullet (`* [label](url)`).
// The heuristic is intentionally simple and conservative: anything that does
// not look exactly like a generated index is preserved untouched.

const fs = require("fs")
const path = require("path")

const { parseConcept } = require("./okf-core/walk")
const { isReservedFile } = require("./okf-core/id")
const { parseFrontmatter } = require("./okf-core/frontmatter")
const { relPathOf, isIgnoredPath, isMarkdown } = require("./okf-core/paths")

const SECTIONS_HEADING = "# Sections"
const CONCEPTS_HEADING = "# Concepts"

// --- small helpers ---------------------------------------------------------

// isNonEmptyString(value) -> boolean
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0
}

// basenameNoExt(relPath) -> string
// Last `/`-segment of a bundle-relative path with the trailing `.md` removed.
function basenameNoExt(relPath) {
  const base = String(relPath).split("/").pop() || ""
  return base.replace(/\.md$/i, "")
}

// basenameWithExt(relPath) -> string
// Last `/`-segment of a bundle-relative path (extension kept). Used as the
// relative URL of a Concept linked from its own directory's index.md.
function basenameWithExt(relPath) {
  return String(relPath).split("/").pop() || ""
}

// conceptTitle(concept) -> string
// Frontmatter `title` when present and non-empty, otherwise the file name
// without `.md` (Requirement 7.3).
function conceptTitle(concept) {
  const data = concept && concept.data && typeof concept.data === "object" ? concept.data : {}
  if (isNonEmptyString(data.title)) {
    return data.title.trim()
  }
  return basenameNoExt(concept.relPath)
}

// conceptDescription(concept) -> string
// Frontmatter `description` as a trimmed string, or "" when missing/empty.
function conceptDescription(concept) {
  const data = concept && concept.data && typeof concept.data === "object" ? concept.data : {}
  return isNonEmptyString(data.description) ? data.description.trim() : ""
}

// caseInsensitiveCompare(a, b) -> number
// Deterministic ascending, case-insensitive ordering. Ties (same lowercased
// key) fall back to a case-sensitive compare so the order is total and stable.
function caseInsensitiveCompare(a, b) {
  const la = String(a).toLowerCase()
  const lb = String(b).toLowerCase()
  if (la < lb) return -1
  if (la > lb) return 1
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

// --- pure builders ---------------------------------------------------------

// renderConceptBullet(concept) -> string
// `* [Title](relative-url) - description`, dropping ` - description` when the
// description is empty (Requirements 7.3, 7.4).
function renderConceptBullet(concept) {
  const title = conceptTitle(concept)
  const url = basenameWithExt(concept.relPath)
  const description = conceptDescription(concept)
  const base = `* [${title}](${url})`
  return description ? `${base} - ${description}` : base
}

// renderSubdirBullet(name) -> string
// `* [<name>](<name>/)` — label is the subdirectory name, URL is the relative
// path to that subdirectory (Requirement 7.6).
function renderSubdirBullet(name) {
  return `* [${name}](${name}/)`
}

// renderIndexBody(children) -> string
//
// Shared body renderer for both root and non-root index files. `children`:
//   { concepts: Concept[], subdirs: string[] }
// - Reserved_File entries must already be excluded from `concepts`.
// - Subdirs are listed under `# Sections`, concepts under `# Concepts`.
// - Both lists are sorted ascending, case-insensitive and deterministically
//   (concepts by Title, subdirs by name) (Requirement 7.7).
// - An empty directory yields an empty body (Requirement 7.8).
function renderIndexBody(children) {
  const concepts = Array.isArray(children && children.concepts) ? children.concepts.slice() : []
  const subdirs = Array.isArray(children && children.subdirs) ? children.subdirs.slice() : []

  concepts.sort((a, b) => caseInsensitiveCompare(conceptTitle(a), conceptTitle(b)))
  subdirs.sort(caseInsensitiveCompare)

  const sections = []

  if (subdirs.length > 0) {
    const lines = [SECTIONS_HEADING, ""]
    for (const name of subdirs) {
      lines.push(renderSubdirBullet(name))
    }
    sections.push(lines.join("\n"))
  }

  if (concepts.length > 0) {
    const lines = [CONCEPTS_HEADING, ""]
    for (const concept of concepts) {
      lines.push(renderConceptBullet(concept))
    }
    sections.push(lines.join("\n"))
  }

  if (sections.length === 0) {
    return ""
  }

  return sections.join("\n\n") + "\n"
}

// buildDirectoryIndex(dir, children) -> string
//
// Builds the `index.md` content for a NON-root directory: navigation lists
// only, with NO frontmatter block (Requirement 7.1). `dir` is accepted for
// API symmetry / future use; the content depends solely on `children`.
function buildDirectoryIndex(dir, children) {
  return renderIndexBody(children)
}

// buildRootIndex(tree) -> string
//
// Builds the root `index.md` content: a frontmatter block containing EXACTLY
// the single key `okf_version: "0.1"` and nothing else (Requirement 7.2),
// followed by the same navigation body. `tree` is { concepts, subdirs }.
function buildRootIndex(tree) {
  const frontmatter = '---\nokf_version: "0.1"\n---\n\n'
  return frontmatter + renderIndexBody(tree)
}

// --- concept-detection heuristic -------------------------------------------

// isGeneratedNavLine(line) -> boolean
// A line counts as auto-generated navigation when it is blank, one of the
// known section headings, or a markdown bullet of the form `* [label](url)`.
function isGeneratedNavLine(line) {
  const trimmed = line.trim()
  if (trimmed === "") {
    return true
  }
  if (trimmed === SECTIONS_HEADING || trimmed === CONCEPTS_HEADING) {
    return true
  }
  return /^\*\s+\[[^\]]*\]\([^)]*\)\s*$/.test(trimmed)
}

// isIndexUsedAsConcept(raw, isRoot) -> boolean
//
// Decides whether an existing index.md is hand-authored (a Concept) and must
// not be overwritten. See the module header for the full heuristic.
function isIndexUsedAsConcept(raw, isRoot) {
  let parsed
  try {
    parsed = parseFrontmatter(raw)
  } catch (err) {
    // Unparseable frontmatter means hand-authored content we must not clobber.
    return true
  }

  const keys = Object.keys(parsed.data || {})
  if (isRoot) {
    if (keys.some((key) => key !== "okf_version")) {
      return true
    }
  } else if (parsed.hadFrontmatter && keys.length > 0) {
    return true
  }

  // Any non-navigation body line means the file carries real knowledge.
  const bodyLines = parsed.body.split(/\r?\n/)
  return bodyLines.some((line) => !isGeneratedNavLine(line))
}

// --- CLI bundle traversal --------------------------------------------------

// collectDirectories(rootDir) -> DirInfo[]
//
// Walks the bundle filesystem (skipping IGNORED_PATHS) and returns one entry
// per directory (including empty ones, so they still get an index.md per
// Requirement 7.8):
//   { absDir, relDir, isRoot, subdirs: string[], concepts: Concept[] }
// Concepts exclude Reserved_File entries (Requirement 7.5).
function collectDirectories(rootDir) {
  const root = path.resolve(rootDir)

  let rootStat
  try {
    rootStat = fs.statSync(root)
  } catch (err) {
    throw new Error(`Bundle root is not accessible: ${root} (${err.message})`)
  }
  if (!rootStat.isDirectory()) {
    throw new Error(`Bundle root is not a directory: ${root}`)
  }

  const result = []
  const dirs = [root]

  while (dirs.length > 0) {
    const dir = dirs.pop()

    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch (err) {
      throw new Error(`Cannot read directory: ${dir} (${err.message})`)
    }

    const subdirs = []
    const concepts = []

    for (const entry of entries) {
      const absPath = path.join(dir, entry.name)
      const relPosix = relPathOf(absPath, root)

      if (isIgnoredPath(relPosix)) {
        continue
      }

      if (entry.isDirectory()) {
        subdirs.push(entry.name)
        dirs.push(absPath)
        continue
      }

      if (!entry.isFile() || !isMarkdown(entry.name)) {
        continue
      }

      if (isReservedFile(entry.name)) {
        continue
      }

      concepts.push(parseConcept(absPath, root))
    }

    const relDir = relPathOf(dir, root)
    result.push({
      absDir: dir,
      relDir,
      isRoot: relDir === "",
      subdirs,
      concepts
    })
  }

  return result
}

// generateIndexes(rootDir, options) -> { written, skipped, unchanged, warnings }
//
// Builds the index.md content for every directory and either previews
// (dry-run) or writes (apply) it. Existing index.md files used as Concepts are
// left untouched and reported as warnings (Requirement 7.9).
function generateIndexes(rootDir, options) {
  const opts = options || {}
  const apply = Boolean(opts.apply)

  const directories = collectDirectories(rootDir)
  const summary = { written: [], skipped: [], unchanged: [], warnings: [] }

  for (const info of directories) {
    const children = { concepts: info.concepts, subdirs: info.subdirs }
    const content = info.isRoot ? buildRootIndex(children) : buildDirectoryIndex(info.relDir, children)
    const indexAbs = path.join(info.absDir, "index.md")
    const indexRel = info.isRoot ? "index.md" : `${info.relDir}/index.md`

    let existing = null
    if (fs.existsSync(indexAbs)) {
      existing = fs.readFileSync(indexAbs, "utf8")
      if (isIndexUsedAsConcept(existing, info.isRoot)) {
        summary.warnings.push(indexRel)
        summary.skipped.push(indexRel)
        continue
      }
    }

    if (existing === content) {
      summary.unchanged.push(indexRel)
      continue
    }

    if (apply) {
      fs.writeFileSync(indexAbs, content, "utf8")
    }
    summary.written.push(indexRel)
  }

  return summary
}

module.exports = {
  buildDirectoryIndex,
  buildRootIndex,
  renderIndexBody,
  renderConceptBullet,
  renderSubdirBullet,
  isIndexUsedAsConcept,
  collectDirectories,
  generateIndexes
}

// --- CLI --------------------------------------------------------------------
//
// Usage: okf-index [rootDir] [--dry-run] [--apply]
//
// Dry-run is the default (preview only, no writes). `--apply` writes the
// generated index.md files. The first non-flag argument is the optional bundle
// root, defaulting to process.cwd().

function parseCliArgs(argv) {
  let apply = false
  let rootDir = null

  for (const arg of argv) {
    if (arg === "--apply") {
      apply = true
    } else if (arg === "--dry-run") {
      apply = false
    } else if (rootDir === null) {
      rootDir = arg
    }
  }

  return { apply, rootDir: rootDir || process.cwd() }
}

if (require.main === module) {
  const { apply, rootDir } = parseCliArgs(process.argv.slice(2))
  const mode = apply ? "apply" : "dry-run"

  const summary = generateIndexes(rootDir, { apply })

  const verb = apply ? "Wrote" : "Would write"
  for (const file of summary.written) {
    console.log(`${verb}: ${file}`)
  }
  for (const file of summary.unchanged) {
    console.log(`Unchanged: ${file}`)
  }
  for (const file of summary.warnings) {
    console.log(`WARNING: index.md appears to be used as a Concept, skipping: ${file}`)
  }

  console.log(
    `\nMode: ${mode} | ${verb.toLowerCase()}: ${summary.written.length} | unchanged: ${summary.unchanged.length} | skipped (concept): ${summary.skipped.length}`
  )
}
