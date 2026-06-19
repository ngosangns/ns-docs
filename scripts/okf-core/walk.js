#!/usr/bin/env node

// Bundle traversal and Concept indexing for the OKF tooling.
// See .kiro/specs/okf-redesign/design.md (Data Models: Concept/Bundle,
// Function specs) and Requirements 1.1, 1.2, 1.6, 1.7, 1.8, 1.9.

const fs = require("fs")
const path = require("path")

const { conceptIdOf, isReservedFile } = require("./id")
const { parseFrontmatter } = require("./frontmatter")
const { relPathOf, isIgnoredPath, isMarkdown } = require("./paths")

// conceptKeys(concept) -> string[]
// The lookup keys a Concept is reachable by: its Concept_Id, bundle-relative
// path (with and without `.md`) and bare basename (without `.md`). Used both
// when building the bundle index and when resolving links.
function conceptKeys(concept) {
  const relNoExt = concept.relPath.replace(/\.md$/i, "")
  const baseNoExt = relNoExt.split("/").pop() || ""
  return [concept.id, concept.relPath, relNoExt, baseNoExt]
}

// addToIndex(index, concept)
// Registers a Concept under each of its lookup keys. A key is only set when it
// is not already taken, so the first Concept wins on collisions (deterministic
// with the traversal order) and an earlier entry is never silently overwritten.
function addToIndex(index, concept) {
  for (const key of conceptKeys(concept)) {
    if (key && !index.has(key)) {
      index.set(key, concept)
    }
  }
}

// buildIndex(concepts) -> Map<string, Concept>
// Builds the multi-key lookup index from a list of Concepts, skipping any
// flagged with `parseError` (they have no reliable id/relPath to key on).
function buildIndex(concepts) {
  const index = new Map()
  for (const concept of concepts) {
    if (concept && !concept.parseError) {
      addToIndex(index, concept)
    }
  }
  return index
}

// parseConcept(absPath, rootDir) -> Concept
//
// Reads the file at `absPath`, parses its frontmatter and builds a Concept:
//   { id, absPath, relPath, data, body, hadFrontmatter }
// - `id` is conceptIdOf(absPath, rootDir) (no extension, `/` separators).
// - `relPath` is the bundle-relative path WITH `.md`, using `/` separators.
// Invalid YAML in the frontmatter throws an error tagged with the file name
// so callers can report which file failed (Requirement 2.5).
function parseConcept(absPath, rootDir) {
  const raw = fs.readFileSync(absPath, "utf8")

  let parsed
  try {
    parsed = parseFrontmatter(raw)
  } catch (err) {
    throw new Error(`${absPath}: ${err.message}`)
  }

  return {
    id: conceptIdOf(absPath, rootDir),
    absPath,
    relPath: relPathOf(absPath, rootDir),
    data: parsed.data,
    body: parsed.body,
    hadFrontmatter: parsed.hadFrontmatter
  }
}

// assertReadableRoot(rootDir) -> { root, fail }
// Resolves and validates a bundle root. Returns the resolved absolute path, or
// throws a clear error when the root does not exist or is not a directory
// (Requirement 1.8 — never return a partial index).
function resolveRoot(rootDir) {
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
  return root
}

// walkBundle(rootDir, options) -> Bundle
//
// Recursively walks the directory tree rooted at `rootDir`, classifying every
// file as a Concept, a Reserved_File (index.md/log.md) or an attachment (any
// non-`.md` extension, case-insensitive). Directories and files inside
// IGNORED_PATHS are skipped entirely.
//
// Returns a Bundle:
//   { root, concepts, indexFiles, logFiles, attachments, index }
// where `index` is a Map keyed for fast multi-form lookup of every Concept.
//
// - If `rootDir` does not exist or cannot be read, throws a clear error and
//   does NOT return a partial index (Requirement 1.8).
// - An empty bundle yields empty collections and an empty index, no error
//   (Requirement 1.9).
// - Throws on the FIRST file with unparseable YAML frontmatter. Callers that
//   must tolerate bad files should use `walkBundleTolerant` / `loadBundle`.
function walkBundle(rootDir, options) {
  const root = resolveRoot(rootDir)

  const concepts = []
  const indexFiles = []
  const logFiles = []
  const attachments = []
  const index = new Map()

  // Iterative depth-first walk. `dirs` holds absolute directory paths still to
  // visit; entries are read eagerly so a directory that becomes unreadable
  // mid-walk surfaces a clear error rather than a silent partial result.
  const dirs = [root]
  while (dirs.length > 0) {
    const dir = dirs.pop()

    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch (err) {
      throw new Error(`Cannot read directory: ${dir} (${err.message})`)
    }

    for (const entry of entries) {
      const absPath = path.join(dir, entry.name)
      const relPosix = relPathOf(absPath, root)

      if (isIgnoredPath(relPosix)) {
        continue
      }

      if (entry.isDirectory()) {
        dirs.push(absPath)
        continue
      }

      if (!entry.isFile()) {
        continue
      }

      if (!isMarkdown(entry.name)) {
        attachments.push(relPosix)
        continue
      }

      if (isReservedFile(entry.name)) {
        if (entry.name.toLowerCase() === "log.md") {
          logFiles.push(relPosix)
        } else {
          indexFiles.push(relPosix)
        }
        continue
      }

      const concept = parseConcept(absPath, root)
      concepts.push(concept)
      addToIndex(index, concept)
    }
  }

  return {
    root,
    concepts,
    indexFiles,
    logFiles,
    attachments,
    index
  }
}

// walkBundleTolerant(rootDir) -> { root, concepts, reservedFiles }
//
// Like walkBundle, but parses each file's frontmatter individually and
// tolerates YAML errors: a file that fails to parse becomes an entry with
// `parseError: true` instead of throwing, so callers (conformance checking,
// the read-only stat/preview tooling) can report or skip the bad file rather
// than aborting the whole walk.
//
//   Concept       { id, absPath, relPath, data, body, hadFrontmatter,
//                   parseError }
//   ReservedFile  { relPath, absPath, name, isRoot, data, body,
//                   hadFrontmatter, parseError }
function walkBundleTolerant(rootDir) {
  const root = resolveRoot(rootDir)

  const concepts = []
  const reservedFiles = []

  const dirs = [root]
  while (dirs.length > 0) {
    const dir = dirs.pop()

    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch (err) {
      throw new Error(`Cannot read directory: ${dir} (${err.message})`)
    }

    for (const entry of entries) {
      const absPath = path.join(dir, entry.name)
      const relPosix = relPathOf(absPath, root)

      if (isIgnoredPath(relPosix)) {
        continue
      }
      if (entry.isDirectory()) {
        dirs.push(absPath)
        continue
      }
      if (!entry.isFile() || !isMarkdown(entry.name)) {
        continue
      }

      const raw = fs.readFileSync(absPath, "utf8")
      let parsed = null
      let parseError = false
      try {
        parsed = parseFrontmatter(raw)
      } catch (err) {
        parseError = true
      }

      if (isReservedFile(entry.name)) {
        reservedFiles.push({
          relPath: relPosix,
          absPath,
          name: entry.name.toLowerCase(),
          isRoot: relPosix === "index.md",
          data: parsed ? parsed.data : {},
          body: parsed ? parsed.body : "",
          hadFrontmatter: parsed ? parsed.hadFrontmatter : false,
          parseError
        })
        continue
      }

      concepts.push({
        id: conceptIdOf(absPath, root),
        absPath,
        relPath: relPosix,
        data: parsed ? parsed.data : {},
        body: parsed ? parsed.body : "",
        hadFrontmatter: parsed ? parsed.hadFrontmatter : false,
        parseError
      })
    }
  }

  return { root, concepts, reservedFiles }
}

// loadBundle(rootDir) -> { concepts, index, attachments, degraded }
//
// Convenience loader shared by the read-only tooling (stats, tag stats,
// orphan detection, link checking, preview build). It tries the strict
// `walkBundle` first and, if a file has unparseable YAML (which makes
// walkBundle throw), falls back to the tolerant walk and returns only the
// parseable Concepts plus a freshly built index. `attachments` lists the
// bundle-relative paths of non-markdown files (empty in degraded mode, which
// the tolerant walk does not enumerate). `degraded` is true when the fallback
// was used.
function loadBundle(rootDir) {
  try {
    const bundle = walkBundle(rootDir)
    return {
      concepts: bundle.concepts,
      index: bundle.index,
      attachments: bundle.attachments,
      degraded: false
    }
  } catch (err) {
    const { concepts } = walkBundleTolerant(rootDir)
    const parseable = concepts.filter((concept) => !concept.parseError)
    return {
      concepts: parseable,
      index: buildIndex(parseable),
      attachments: [],
      degraded: true
    }
  }
}

module.exports = {
  parseConcept,
  walkBundle,
  walkBundleTolerant,
  loadBundle,
  conceptKeys,
  addToIndex,
  buildIndex
}
