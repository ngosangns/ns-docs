#!/usr/bin/env node

// Shared constants for the OKF (Open Knowledge Format) tooling.
// See .kiro/specs/okf-redesign/design.md for the rationale behind each value.

// Reserved file names that are part of the bundle structure rather than
// knowledge Concepts. Compared case-insensitively by the tooling.
const RESERVED_FILES = ["index.md", "log.md"]

// The canonical OKF frontmatter keys. Keys outside this list are treated as
// "unknown" and must be preserved verbatim during serialization.
const OKF_KEYS = ["type", "title", "description", "resource", "tags", "timestamp"]

// Paths (relative to the bundle root) excluded from bundle traversal. Beyond
// the build/VCS directories, this also excludes non-knowledge areas that live
// in the repo but are not Concepts: spec docs (.kiro), generated graph output
// (graphify-out), planning docs (docs), the Node tooling (scripts) and the
// repo-level README.
const IGNORED_PATHS = [
  ".git",
  "node_modules",
  ".wrangler",
  "web",
  ".kiro",
  "graphify-out",
  "docs",
  "scripts",
  "backups",
  "export",
  "README.md"
]

// Maps a top-level directory prefix to the inferred `type` used when a Concept
// has no explicit `type`. Resolution priority is: explicit data.type >
// longest-matching directory prefix here > default "Note". Prefixes use the
// bundle-relative POSIX form (forward slashes, no leading slash).
const TYPE_RULES = {
  English: "Reference",
  Technology: "Reference",
  docs: "Reference",
  Projects: "Playbook",
  Life: "Note",
  Travel: "Note",
  inbox: "Note"
}

module.exports = {
  RESERVED_FILES,
  OKF_KEYS,
  IGNORED_PATHS,
  TYPE_RULES
}
