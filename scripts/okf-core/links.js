#!/usr/bin/env node

// Link resolution and normalization for the OKF tooling.
// See .kiro/specs/okf-redesign/design.md Function 4 (normalizeLink) and
// Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6.
//
// `bundleIndex` is the Map produced by walkBundle (see ./walk.js addToIndex):
// every Concept is registered under several lookup keys — its Concept_Id, its
// bundle-relative path (with and without `.md`) and its bare basename
// (without `.md`). The Map uses first-wins on key collisions, so it cannot by
// itself report whether a bare name is ambiguous. To detect ambiguity we scan
// the distinct Concepts in the index and count how many of them could match a
// given raw target across the reasonable key forms.

const { conceptKeys } = require("./walk")

// isExternal(s) -> boolean
// True for links that point outside the bundle and must be left verbatim.
function isExternal(s) {
  return /^(https?:\/\/|mailto:)/i.test(String(s).trim())
}

// isInternalMarkdownTarget(target) -> boolean
// Conservatively decides whether a markdown link target is an internal link
// worth resolving/rewriting. True only for already bundle-relative targets
// (`/...`) and relative links whose path component ends in `.md`. External
// links, pure anchors (`#section`) and non-`.md` relative paths (attachment or
// image paths) return false so they are neither rewritten nor flagged broken.
// Shared by okf-migrate (rewriteLinks) and check-links.
function isInternalMarkdownTarget(target) {
  const t = String(target).trim()
  if (t === "" || isExternal(t) || t.startsWith("#")) {
    return false
  }
  const beforeAnchor = t.split("#")[0]
  if (beforeAnchor.startsWith("/")) {
    return true
  }
  return /\.md$/i.test(beforeAnchor)
}

// Wikilinks `[[...]]` but NOT embeds `![[...]]`. The inner capture stops at the
// first `]` so it never spans across a closing `]]`. Exposed as a factory
// because a shared `/g` RegExp carries mutable `lastIndex` state.
function wikilinkRegex() {
  return /(?<!!)\[\[([^\]]+)\]\]/g
}

// Markdown links `[label](target)` but NOT images `![label](target)`.
function markdownLinkRegex() {
  return /(?<!!)\[([^\]]*)\]\(([^)]*)\)/g
}

// dirOf(id) -> string
// POSIX-style parent directory of a Concept_Id (no trailing slash). Returns
// "" for a top-level id with no directory component.
function dirOf(id) {
  const str = String(id || "")
  const idx = str.lastIndexOf("/")
  return idx >= 0 ? str.slice(0, idx) : ""
}

// resolveRelative(baseDir, target) -> string
// Resolves a `/`-separated relative `target` against `baseDir`, collapsing
// `.` and `..` segments. Pure, POSIX-only (the inputs are already bundle
// paths using `/`).
function resolveRelative(baseDir, target) {
  const stack = baseDir === "" ? [] : baseDir.split("/")
  const segments = String(target).split("/")
  for (const seg of segments) {
    if (seg === "" || seg === ".") {
      continue
    }
    if (seg === "..") {
      if (stack.length > 0) {
        stack.pop()
      }
      continue
    }
    stack.push(seg)
  }
  return stack.join("/")
}

// addForms(set, value)
// Registers a comparison form and its `.md`-stripped variant.
function addForms(set, value) {
  if (!value) {
    return
  }
  set.add(value)
  set.add(value.replace(/\.md$/i, ""))
}

// distinctConcepts(bundleIndex) -> Concept[]
// The unique Concepts in the index (each Concept is registered under several
// keys, so Map values repeat).
function distinctConcepts(bundleIndex) {
  const seen = new Set()
  const out = []
  for (const concept of bundleIndex.values()) {
    if (concept && !seen.has(concept)) {
      seen.add(concept)
      out.push(concept)
    }
  }
  return out
}

// resolveTarget(rawLink, sourceId, bundleIndex) -> Concept | null
//
// Resolves a wikilink / relative / bundle-relative link to the Concept it
// points at, using `bundleIndex`. The alias (`|...`) and anchor (`#...`) are
// stripped before resolving. Relative targets are resolved against the
// directory of `sourceId`; absolute targets (leading `/`) are resolved from
// the bundle root.
//
// Returns the matching Concept when exactly one Concept matches. Zero matches
// or more than one (ambiguous) match returns null. Pure function — does not
// mutate its arguments.
function resolveTarget(rawLink, sourceId, bundleIndex) {
  if (rawLink == null || !bundleIndex || typeof bundleIndex.values !== "function") {
    return null
  }

  // Strip alias: keep the part before the first `|`.
  let target = String(rawLink).split("|")[0]

  // External links never resolve to a Concept.
  if (isExternal(target)) {
    return null
  }

  // Strip anchor: keep the part before the first `#`.
  target = target.split("#")[0].trim()
  if (target === "") {
    return null
  }

  const isAbsolute = target.startsWith("/")
  const lookup = isAbsolute ? target.replace(/^\/+/, "") : target

  const forms = new Set()
  addForms(forms, lookup)

  // Relative resolution only applies to non-absolute targets and needs a
  // source to resolve against. Absolute (bundle-relative) targets are taken
  // from the bundle root as-is.
  if (!isAbsolute && sourceId != null) {
    addForms(forms, resolveRelative(dirOf(sourceId), lookup))
  }

  const matches = []
  for (const concept of distinctConcepts(bundleIndex)) {
    const keys = conceptKeys(concept)
    if (keys.some((key) => forms.has(key))) {
      matches.push(concept)
    }
  }

  return matches.length === 1 ? matches[0] : null
}

// normalizeLink(rawLink, sourceId, bundleIndex) -> string | null
//
// Normalizes a single link target:
// - External links (`http://`, `https://`, `mailto:`) are returned verbatim.
// - Internal links that resolve uniquely to one Concept return a
//   Bundle_Relative_Link: `/` + Concept_Id, with the original `#anchor`
//   appended (if any) and the `|alias` part dropped.
// - Links that do not resolve or are ambiguous return null (callers keep the
//   original link and record a broken-link warning).
// - A link already in valid bundle-relative form pointing at an existing
//   Concept resolves back to itself (idempotent).
//
// Pure function — does not mutate its arguments.
function normalizeLink(rawLink, sourceId, bundleIndex) {
  if (rawLink == null) {
    return null
  }

  const raw = String(rawLink)

  // External links pass through untouched.
  if (isExternal(raw)) {
    return raw
  }

  // Capture the anchor (`#...`) from the target portion (before the alias).
  const beforeAlias = raw.split("|")[0]
  const hashIdx = beforeAlias.indexOf("#")
  const anchor = hashIdx >= 0 ? beforeAlias.slice(hashIdx) : ""

  const concept = resolveTarget(raw, sourceId, bundleIndex)
  if (!concept) {
    return null
  }

  return "/" + concept.id + anchor
}

module.exports = {
  normalizeLink,
  resolveTarget,
  isExternal,
  isInternalMarkdownTarget,
  wikilinkRegex,
  markdownLinkRegex
}
