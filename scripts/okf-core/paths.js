#!/usr/bin/env node

// Shared filesystem-path helpers for the OKF tooling. These were previously
// copy-pasted across walk.js, okf-conformance.js and okf-index.js; centralizing
// them keeps bundle traversal consistent everywhere.

const path = require("path")

const { IGNORED_PATHS } = require("./constants")

// toPosix(p) -> string
// Normalizes OS path separators (including `\`) to `/`.
function toPosix(p) {
  return String(p).split(/[\\/]+/).join("/")
}

// relPathOf(absPath, rootDir) -> string
// Bundle-relative path of `absPath` with respect to `rootDir`, using `/`
// separators and no leading `/`. The extension is preserved.
function relPathOf(absPath, rootDir) {
  return toPosix(path.relative(rootDir, absPath)).replace(/^\/+/, "")
}

// isIgnoredPath(relPosix) -> boolean
// True when a bundle-relative POSIX path falls inside one of IGNORED_PATHS
// (`.git`, `node_modules`, `.wrangler`, `web`, `AGENTS.md`, ...). Any path with
// a dot-prefixed segment is also ignored: hidden directories (.agents,
// .delta, .markdownvdb, .claude, ...) hold tooling state, not knowledge.
function isIgnoredPath(relPosix) {
  if (relPosix.split("/").some((seg) => seg.startsWith("."))) {
    return true
  }
  return IGNORED_PATHS.some(
    (ignored) => relPosix === ignored || relPosix.startsWith(ignored + "/")
  )
}

// isMarkdown(name) -> boolean
// True when a file name has the `.md` extension (case-insensitive).
function isMarkdown(name) {
  return path.extname(name).toLowerCase() === ".md"
}

module.exports = {
  toPosix,
  relPathOf,
  isIgnoredPath,
  isMarkdown
}
