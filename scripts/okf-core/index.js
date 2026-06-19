#!/usr/bin/env node

// Aggregate entry point for the OKF core library.
// See .kiro/specs/okf-redesign/design.md (Component 1: okf-core) for the full
// public interface this module is meant to expose.

const { conceptIdOf, isReservedFile } = require("./id")
const { parseFrontmatter, serializeConcept } = require("./frontmatter")
const {
  walkBundle,
  walkBundleTolerant,
  loadBundle,
  parseConcept,
  conceptKeys,
  addToIndex,
  buildIndex
} = require("./walk")
const paths = require("./paths")

// `normalizeLink` and `resolveTarget` live in ./links, which is implemented by
// a later task (5.1). Load them defensively so this aggregate keeps working
// before links.js exists: once the file is added, its exports are picked up
// automatically with no change here.
let links = {}
try {
  links = require("./links")
} catch (err) {
  if (err && err.code !== "MODULE_NOT_FOUND") {
    throw err
  }
  // links.js not present yet — normalizeLink/resolveTarget remain undefined.
}

module.exports = {
  walkBundle,
  walkBundleTolerant,
  loadBundle,
  parseConcept,
  serializeConcept,
  conceptIdOf,
  isReservedFile,
  parseFrontmatter,
  conceptKeys,
  addToIndex,
  buildIndex,
  toPosix: paths.toPosix,
  relPathOf: paths.relPathOf,
  isIgnoredPath: paths.isIgnoredPath,
  isMarkdown: paths.isMarkdown,
  normalizeLink: links.normalizeLink,
  resolveTarget: links.resolveTarget
}
