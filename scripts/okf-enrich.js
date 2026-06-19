#!/usr/bin/env node

// okf-enrich: fill recommended OKF metadata from genuine content and rewrite
// attachment wikilinks to bundle-relative form. Complements okf-migrate, which
// guarantees `type` and seeds empty recommended fields; this step derives real
// values so the bundle has no recommended-field warnings.
//
// For each Concept it:
//   - description : derived from the first meaningful body line when empty.
//   - tags        : derived from legacy frontmatter (area/domain/topic/status/
//                   category) plus the top-level directory; never fabricated
//                   beyond what the note already declares.
//   - resource    : the first http(s) URL found in the body, when present
//                   (left absent otherwise — resource is optional in OKF).
//   - body        : `![[file]]` / `[[file]]` references to real attachments are
//                   rewritten to bundle-relative markdown (`![](/Attachments/…)`
//                   for images, `[name](/Attachments/…)` otherwise).
//
// CLI: node scripts/okf-enrich.js [rootDir] [--dry-run] [--apply]
// Dry-run (default) previews counts; --apply writes changed files atomically.

const fs = require("fs")
const path = require("path")

const { walkBundle, serializeConcept } = require("./okf-core")

const IMAGE_RE = /\.(png|jpe?g|gif|webp|svg|bmp)$/i

// slugTag(value) -> string
// Normalizes a raw frontmatter value into a lowercase, hyphenated tag token.
function slugTag(value) {
  return String(value == null ? "" : value)
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9/-]+/g, "")
    .replace(/^-+|-+$/g, "")
}

// deriveTags(data, relPath) -> string[]
// Builds a non-empty, de-duplicated tag list from the note's existing legacy
// metadata and its top-level directory. Falls back to the `type` when nothing
// else is available so the list is never empty.
function deriveTags(data, relPath) {
  const out = []
  const push = (raw) => {
    if (raw == null) return
    for (const part of String(raw).split(/[,/]/)) {
      const t = slugTag(part)
      if (t && !out.includes(t)) out.push(t)
    }
  }

  for (const key of ["area", "domain", "topic", "status", "category"]) {
    push(data[key])
  }
  if (Array.isArray(data.tags)) data.tags.forEach(push)
  else if (typeof data.tags === "string") push(data.tags)

  push(relPath.split("/")[0])

  if (out.length === 0) push(data.type || "note")
  return out
}

// cleanInline(text) -> string
// Strips markdown markup so a body line reads as plain prose: images removed,
// links reduced to their label, wikilinks to alias/target, emphasis/backticks
// dropped, whitespace collapsed.
function cleanInline(text) {
  return String(text)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[\[([^\]]+)\]\]/g, (m, inner) => {
      const parts = inner.split("|")
      return (parts[1] || parts[0]).split("#")[0].trim()
    })
    .replace(/[*_`~]+/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

// capSentence(text) -> string
// Trims to the first sentence (or ~200 chars) for a concise one-line summary.
// Requires a sentence to be reasonably long and not end right after a digit, so
// leading enumerators like "7." or version numbers don't truncate it.
function capSentence(text) {
  const t = text.trim().replace(/[:\s]+$/, "")
  const m = t.match(/^(.{15,200}?[.!?])(\s|$)/)
  if (m && !/\d[.!?]$/.test(m[1])) return m[1].trim()
  return t.length > 200 ? t.slice(0, 197).trim() + "…" : t
}

// stripEnumerator(text) -> string
// Removes a leading section/list number such as "7." or "7.1." so headings like
// "# 7. Tài liệu" yield "Tài liệu".
function stripEnumerator(text) {
  return String(text).replace(/^\s*\d+(?:\.\d+)*\.?\s+/, "")
}

// Generic section headings that make poor descriptions; when a note opens with
// one we skip past it to the first substantive line.
const GENERIC_HEADINGS = new Set([
  "resources", "resource", "resouces", "references", "reference",
  "links", "link", "notes", "note", "overview", "introduction", "intro",
  "contents", "table of contents", "summary", "tldr",
  "tong quan", "tổng quan", "muc luc", "mục lục", "gioi thieu", "giới thiệu"
])

function isGeneric(text) {
  return GENERIC_HEADINGS.has(String(text).trim().toLowerCase())
}

// deriveDescription(body, title) -> string
// Picks the first meaningful line of the body (skipping frontmatter remnants,
// code fences, blank lines, images/embeds, tables, rules and generic section
// headings). Headings contribute their text. Falls back to the title so the
// result is never empty.
function deriveDescription(body, title) {
  const lines = String(body).split(/\r?\n/)
  let inFence = false
  for (const raw of lines) {
    const line = raw.trim()
    if (line.startsWith("```") || line.startsWith("~~~")) {
      inFence = !inFence
      continue
    }
    if (inFence || line === "") continue
    if (/^!\[/.test(line) || /^!\[\[/.test(line)) continue
    if (/^(-{3,}|\|)/.test(line)) continue
    if (/^#{1,6}\s/.test(line)) {
      const h = cleanInline(stripEnumerator(line.replace(/^#{1,6}\s+/, "")))
      if (h && !isGeneric(h)) return capSentence(h)
      continue
    }
    const stripped = stripEnumerator(line.replace(/^\s*([-*+]|\d+\.|>)\s+/, ""))
    const cleaned = cleanInline(stripped)
    if (cleaned && !isGeneric(cleaned)) return capSentence(cleaned)
  }
  return title
}

// deriveResource(body) -> string | null
// The first http(s) URL referenced in the body, trailing punctuation trimmed.
function deriveResource(body) {
  const m = String(body).match(/https?:\/\/[^\s)>\]"']+/)
  if (!m) return null
  return m[0].replace(/[.,;:]+$/, "")
}

// buildAttachmentMap(attachments) -> Map<string, string>
// Maps an attachment's bare basename (lowercased) and its full bundle-relative
// path (lowercased) to its bundle-relative path, so wikilink targets that name
// an attachment can be resolved. Ambiguous basenames (same name in two dirs)
// are dropped from the basename key to avoid a wrong rewrite.
function buildAttachmentMap(attachments) {
  const byBase = new Map()
  const ambiguous = new Set()
  const map = new Map()
  for (const rel of attachments) {
    const base = rel.split("/").pop().toLowerCase()
    map.set(rel.toLowerCase(), rel)
    if (byBase.has(base)) ambiguous.add(base)
    else byBase.set(base, rel)
  }
  for (const [base, rel] of byBase) {
    if (!ambiguous.has(base)) map.set(base, rel)
  }
  return map
}

// rewriteAttachmentLinks(body, attMap) -> { body, count }
// Rewrites `![[target|alias]]` embeds and `[[target|alias]]` links that name a
// real attachment into bundle-relative markdown. Non-attachment wikilinks (e.g.
// code snippets) are left untouched.
function rewriteAttachmentLinks(body, attMap) {
  let count = 0
  const replace = (match, inner, isEmbed) => {
    const parts = inner.split("|")
    const target = parts[0].split("#")[0].trim()
    const alias = parts[1] ? parts[1].trim() : null
    const rel = attMap.get(target.toLowerCase())
    if (!rel) return match
    count += 1
    const url = "/" + rel
    if (IMAGE_RE.test(rel)) return `![${alias || ""}](${url})`
    return `[${alias || target}](${url})`
  }
  const next = String(body)
    .replace(/!\[\[([^\]]+)\]\]/g, (m, inner) => replace(m, inner, true))
    .replace(/(?<!!)\[\[([^\]]+)\]\]/g, (m, inner) => replace(m, inner, false))
  return { body: next, count }
}

function isEmpty(value) {
  if (value === undefined || value === null) return true
  if (typeof value === "string") return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  return false
}

// enrichConcept(concept, attMap) -> { concept, changed, stats }
function enrichConcept(concept, attMap) {
  const data = { ...concept.data }
  const stats = { description: false, tags: false, resource: false, links: 0 }

  if (isEmpty(data.description)) {
    const title = typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : concept.relPath.split("/").pop().replace(/\.md$/i, "")
    data.description = deriveDescription(concept.body, title)
    stats.description = true
  }

  if (isEmpty(data.tags)) {
    data.tags = deriveTags(data, concept.relPath)
    stats.tags = true
  }

  if (isEmpty(data.resource)) {
    const resource = deriveResource(concept.body)
    if (resource) {
      data.resource = resource
      stats.resource = true
    }
  }

  const rewritten = rewriteAttachmentLinks(concept.body, attMap)
  stats.links = rewritten.count

  const next = { ...concept, data, body: rewritten.body }
  const changed =
    stats.description || stats.tags || stats.resource || stats.links > 0
  return { concept: next, changed, stats }
}

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
      // best-effort cleanup
    }
    throw err
  }
}

function enrichBundle(rootDir, options) {
  const apply = Boolean(options && options.apply)
  const bundle = walkBundle(rootDir)
  const attMap = buildAttachmentMap(bundle.attachments)

  const totals = {
    written: 0,
    description: 0,
    tags: 0,
    resource: 0,
    links: 0,
    errors: []
  }

  for (const concept of bundle.concepts) {
    const { concept: next, changed, stats } = enrichConcept(concept, attMap)
    if (stats.description) totals.description += 1
    if (stats.tags) totals.tags += 1
    if (stats.resource) totals.resource += 1
    totals.links += stats.links
    if (!changed) continue

    const content = serializeConcept(next)
    if (content === fs.readFileSync(concept.absPath, "utf8")) continue

    if (apply) {
      try {
        writeFileAtomic(concept.absPath, content)
        totals.written += 1
      } catch (err) {
        totals.errors.push({ file: concept.relPath, message: err.message })
      }
    } else {
      totals.written += 1
    }
  }

  return totals
}

module.exports = {
  enrichBundle,
  enrichConcept,
  deriveTags,
  deriveDescription,
  deriveResource,
  rewriteAttachmentLinks,
  buildAttachmentMap
}

if (require.main === module) {
  const argv = process.argv.slice(2)
  const apply = argv.includes("--apply")
  const rootDir = argv.find((a) => !a.startsWith("--")) || process.cwd()

  const t = enrichBundle(rootDir, { apply })
  const verb = apply ? "Wrote" : "Would write"
  console.log(`Mode: ${apply ? "apply" : "dry-run"}`)
  console.log(`${verb}: ${t.written} files`)
  console.log(`  descriptions filled: ${t.description}`)
  console.log(`  tag lists filled:    ${t.tags}`)
  console.log(`  resources filled:    ${t.resource}`)
  console.log(`  attachment links rewritten: ${t.links}`)
  for (const err of t.errors) {
    console.log(`ERROR ${err.file}: ${err.message}`)
  }
  process.exit(t.errors.length > 0 ? 1 : 0)
}
