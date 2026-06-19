#!/usr/bin/env node

// Concept id derivation and reserved-file classification for OKF tooling.
// See .kiro/specs/okf-redesign/design.md Function 1 (conceptIdOf) and
// Requirements 1.3, 1.4, 1.5.

const path = require("path")
const { RESERVED_FILES } = require("./constants")

// conceptIdOf(absPath, rootDir) -> string
// Returns the bundle-relative path of `absPath` with respect to `rootDir`,
// using `/` separators, with the trailing `.md` extension removed and no
// leading `/`. Pure function, idempotent.
function conceptIdOf(absPath, rootDir) {
  const rel = path.relative(rootDir, absPath)
  const normalized = rel.split(/[\\/]+/).join("/")
  const withoutExt = normalized.replace(/\.md$/i, "")
  return withoutExt.replace(/^\/+/, "")
}

// isReservedFile(relPath) -> boolean
// True when the file name is `index.md` or `log.md` (case-insensitive).
function isReservedFile(relPath) {
  const base = path.basename(String(relPath)).toLowerCase()
  return RESERVED_FILES.some((name) => name.toLowerCase() === base)
}

module.exports = {
  conceptIdOf,
  isReservedFile
}
