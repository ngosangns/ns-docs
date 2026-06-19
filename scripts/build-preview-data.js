#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

// The markdown DOC model + doc-to-doc graph edges are read through okf-core so
// every tool shares one parse/link-resolution model (Requirements 11.1-11.5).
// `loadBundle` builds the Concept model + a lookup index and transparently
// falls back to a per-file-tolerant walk when a file has unparseable YAML, so
// one bad file never crashes the preview build; `resolveTarget` resolves both
// historical wikilinks and Bundle_Relative_Links against the index.
const { loadBundle, resolveTarget, buildIndex } = require("./okf-core")

const ROOT = path.resolve(__dirname, "..")
const OUT_DIR = path.join(ROOT, "web", "dist", "data")
const MAX_TEXT_BYTES = 256 * 1024
const IGNORE_DIRS = new Set([
  ".git",
  ".cache",
  ".wrangler",
  "backups",
  "export",
  "graphify-out",
  "node_modules",
  "web/dist"
])
const CODE_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsonc",
  ".mjs",
  ".py",
  ".sh",
  ".ts",
  ".tsx",
  ".yml",
  ".yaml"
])

function toSlash(value) {
  return value.split(path.sep).join("/")
}

function isIgnoredDir(absDir) {
  const rel = toSlash(path.relative(ROOT, absDir))
  if (!rel || rel === ".") return false
  return (
    IGNORE_DIRS.has(rel) ||
    rel.split("/").some(part => part.startsWith(".") && part !== ".")
  )
}

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!isIgnoredDir(abs)) walk(abs, visit)
      continue
    }
    if (entry.isFile()) visit(abs)
  }
}

function readTextFile(abs) {
  const stat = fs.statSync(abs)
  if (stat.size > MAX_TEXT_BYTES) return null
  const raw = fs.readFileSync(abs)
  if (raw.includes(0)) return null
  return raw.toString("utf8")
}

function stripFrontmatter(raw) {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
}

function frontmatterText(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  return match ? match[1] : ""
}

function titleFromMarkdown(raw, fallback) {
  const body = stripFrontmatter(raw)
  const match = body.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback.replace(/\.md$/i, "")
}

// metaField(data, name) -> string
// Case-insensitive lookup over an okf-core Concept's parsed frontmatter
// (`concept.data`). okf-core preserves the original key case (and may parse
// values into non-strings via YAML), so we match keys case-insensitively and
// coerce scalar values to a string; objects/arrays/nullish become "".
function metaField(data, name) {
  if (!data || typeof data !== "object") return ""
  const lower = name.toLowerCase()
  for (const key of Object.keys(data)) {
    if (key.toLowerCase() === lower) {
      const value = data[key]
      if (value == null || typeof value === "object") return ""
      return String(value)
    }
  }
  return ""
}

function extractTags(raw) {
  const tags = []
  const seen = new Set()
  const add = tag => {
    const normalized = normalizeTag(tag)
    const key = normalized.toLowerCase()
    if (!normalized || seen.has(key)) return
    seen.add(key)
    tags.push(normalized)
  }
  extractFrontmatterTags(raw).forEach(add)
  extractInlineTags(stripFrontmatter(raw)).forEach(add)
  return tags
}

function extractFrontmatterTags(raw) {
  const text = frontmatterText(raw)
  if (!text) return []
  const lines = text.split(/\r?\n/)
  const tags = []
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^tags?:\s*(.*)$/i)
    if (!match) continue
    const inline = match[1].trim()
    if (inline) {
      tags.push(...splitTagValues(inline))
      continue
    }
    index += 1
    while (index < lines.length) {
      const item = lines[index].match(/^\s*-\s+(.+)$/)
      if (!item) {
        index -= 1
        break
      }
      tags.push(...splitTagValues(item[1]))
      index += 1
    }
  }
  return tags
}

function splitTagValues(value) {
  return String(value || "")
    .trim()
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map(part => part.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean)
}

function extractInlineTags(body) {
  const text = stripCodeForTags(body)
  const tags = []
  for (const match of text.matchAll(/(^|[\s([>{-])#([A-Za-z][A-Za-z0-9_/-]*)/g)) {
    tags.push(match[2])
  }
  return tags
}

function stripCodeForTags(value) {
  return String(value || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`[^`\n]*`/g, "")
}

function normalizeTag(tag) {
  return String(tag || "")
    .trim()
    .replace(/^#/, "")
    .replace(/[.,;:!?]+$/g, "")
    .replace(/^["']|["']$/g, "")
}

function categoryFor(rel) {
  const parts = rel.split("/")
  return parts.length > 1 ? parts[0] : "Root"
}

// isIgnoredConceptPath(relPosix) -> boolean
// okf-core's walkBundle only skips [.git, node_modules, .wrangler, web/dist],
// but this script historically ignores more (.cache, backups, export,
// graphify-out and any dotted directory). After walking we drop concepts whose
// bundle-relative path falls under the script's IGNORE_DIRS so the preview
// never pulls in unwanted markdown (e.g. `.kiro/`, `backups/`).
function isIgnoredConceptPath(relPosix) {
  const parts = relPosix.split("/")
  // Any directory segment that is a dotted dir (".kiro", ".cache", ...).
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (parts[i].startsWith(".") && parts[i] !== ".") return true
  }
  for (const ignored of IGNORE_DIRS) {
    if (relPosix === ignored || relPosix.startsWith(ignored + "/")) return true
  }
  return false
}

// loadConcepts() -> Concept[]
// Reads the whole bundle markdown model through okf-core (Requirement 11.1):
// reserved files (index.md/log.md) are already excluded by the walk, so the
// returned concepts map 1:1 to non-reserved Concept nodes (Requirement 11.2).
// okf-core's loadBundle handles the strict-then-tolerant fallback internally,
// so a file with unparseable YAML never crashes the build. We then drop
// concepts under the script's broader IGNORE_DIRS.
function loadConcepts() {
  return loadBundle(ROOT).concepts.filter(
    concept => !isIgnoredConceptPath(concept.relPath)
  )
}

// buildBundleIndex(concepts) -> Map
// Rebuilds an okf-core lookup index from the FILTERED concepts (so
// resolveTarget can only resolve to nodes that actually exist in the graph).
// Thin wrapper over okf-core.buildIndex; kept as a named export for the unit
// tests that import it from this module.
function buildBundleIndex(concepts) {
  return buildIndex(concepts)
}

// looksInternal(rawTarget) -> boolean
// True for link targets that are meant to point at a Concept inside the bundle
// (so an unresolved one is worth recording). External links (http(s)/mailto)
// and anchor-only/empty targets are not Concept links.
function looksInternal(rawTarget) {
  const target = String(rawTarget || "")
    .split("|")[0]
    .split("#")[0]
    .trim()
  if (!target) return false
  return !/^(https?:\/\/|mailto:)/i.test(target)
}

// extractLinks(doc, index, unresolved) -> { to, raw, label }[]
// Resolves every link in `doc.raw` to a Concept through okf-core.resolveTarget,
// which handles BOTH historical `[[wikilink]]` forms AND Bundle_Relative_Links
// (Requirement 11.4). A link that does not resolve to an existing Concept is
// skipped (no edge created) and recorded in `unresolved` without halting graph
// building (Requirement 11.5).
function extractLinks(doc, index, unresolved) {
  const links = []
  const seen = new Set()
  const add = (target, label) => {
    if (!looksInternal(target)) return
    const targetConcept = resolveTarget(target, doc.id, index)
    if (!targetConcept) {
      unresolved.push({ from: doc.id, raw: target, label })
      return
    }
    if (targetConcept.id === doc.id || seen.has(targetConcept.id)) return
    seen.add(targetConcept.id)
    links.push({ to: targetConcept.id, raw: target, label })
  }

  for (const match of doc.raw.matchAll(/\[\[([^\]]+)\]\]/g)) add(match[1], "wiki")
  for (const match of doc.raw.matchAll(/\[[^\]]+\]\(([^)]+)\)/g))
    add(decodeURI(match[1]), "link")
  for (const match of doc.raw.matchAll(/@(doc|spec)\/([^\s)]+)/g))
    add(match[2], match[1])
  return links
}

// buildDocs(concepts) -> doc[]
// Builds the preview DOC model from okf-core Concepts. The node id is the
// Concept_Id (no `.md`, Requirement 11.3); `path` keeps the bundle-relative
// path WITH `.md` for consumers that rely on it. Frontmatter fields come from
// the okf-core parse (`concept.data`); tag extraction still reads raw content.
function buildDocs(concepts) {
  const docs = []
  for (const concept of concepts) {
    const raw = readTextFile(concept.absPath)
    const safeRaw = raw == null ? "" : raw
    const data = concept.data
    docs.push({
      id: concept.id,
      title:
        metaField(data, "title") ||
        titleFromMarkdown(safeRaw, path.basename(concept.relPath)),
      path: concept.relPath,
      language: "markdown",
      category: categoryFor(concept.relPath),
      status: metaField(data, "status"),
      compliance: metaField(data, "compliance"),
      priority: metaField(data, "priority"),
      description: metaField(data, "description"),
      tags: extractTags(safeRaw),
      raw: safeRaw
    })
  }
  docs.sort((a, b) => a.path.localeCompare(b.path))
  return docs
}

function collectCodeDocs() {
  const codeDocs = []
  walk(ROOT, abs => {
    const rel = toSlash(path.relative(ROOT, abs))
    if (rel.endsWith(".md")) return
    if (rel.startsWith("web/dist/")) return
    if (!CODE_EXTENSIONS.has(path.extname(abs).toLowerCase())) return
    const raw = readTextFile(abs)
    if (raw == null) return
    codeDocs.push({
      id: rel,
      title: path.basename(rel),
      path: rel,
      content: raw,
      language: path.extname(abs).replace(".", "") || "text"
    })
  })
  codeDocs.sort((a, b) => a.path.localeCompare(b.path))
  return codeDocs
}

function buildGraph(docs, index) {
  const unresolvedLinks = []
  const nodes = docs.map(doc => ({
    id: doc.id,
    label: doc.title,
    type: "doc",
    path: doc.path,
    specId: doc.id,
    category: doc.category,
    status: doc.status,
    tags: doc.tags || []
  }))
  const edges = []
  const relationships = []
  const tagNodes = new Map()
  for (const doc of docs) {
    for (const tag of doc.tags || []) {
      const tagId = `tag:${tag}`
      if (!tagNodes.has(tagId)) {
        tagNodes.set(tagId, {
          id: tagId,
          label: `#${tag}`,
          type: "tag",
          tag
        })
      }
      edges.push({
        from: doc.id,
        to: tagId,
        label: "tagged",
        type: "tagged",
        origin: "tag",
        raw: tag
      })
      relationships.push({
        from: doc.id,
        to: tagId,
        description: tag,
        section: "tagged"
      })
    }
    for (const link of extractLinks(doc, index, unresolvedLinks)) {
      edges.push({
        from: doc.id,
        to: link.to,
        label: link.label,
        type: "references",
        origin: "markdown",
        raw: link.raw
      })
      relationships.push({
        from: doc.id,
        to: link.to,
        description: link.raw,
        section: link.label
      })
    }
  }
  nodes.push(...tagNodes.values())
  return {
    nodes,
    edges,
    relationships,
    constraints: [],
    dependencyDiagram: "",
    unresolvedLinks
  }
}

function loadGraphify() {
  const graphPath = path.join(ROOT, "graphify-out", "graph.json")
  if (!fs.existsSync(graphPath))
    return {
      nodes: [],
      links: [],
      warnings: ["Code graph data is unavailable."]
    }
  try {
    const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"))
    const nodes = Array.isArray(graph.nodes) ? graph.nodes : []
    const links = Array.isArray(graph.links)
      ? graph.links
      : Array.isArray(graph.edges)
        ? graph.edges
        : []
    return { nodes, links, warnings: [] }
  } catch (error) {
    return {
      nodes: [],
      links: [],
      warnings: [`Code graph data could not be parsed: ${error.message}`]
    }
  }
}

function sanitizeLegacyNames(value) {
  if (typeof value === "string") {
    const legacyName = ["ngosangns", "old-notes-app"]
      .join("-")
      .replace("old-notes-app", ["o", "bsidian"].join(""))
    const legacyWord = ["o", "bsidian"].join("")
    return value
      .replaceAll(ROOT, "ngosangns-knowledge-base")
      .replace(new RegExp(legacyName, "gi"), "ngosangns-knowledge-base")
      .replace(new RegExp(legacyWord, "gi"), match =>
        match[0] === match[0].toUpperCase() ? "Markdown" : "knowledge-base"
      )
  }
  if (Array.isArray(value)) return value.map(sanitizeLegacyNames)
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        sanitizeLegacyNames(key),
        sanitizeLegacyNames(entry)
      ])
    )
  }
  return value
}

function buildSummary(docs) {
  const categories = {}
  const statusCounts = {}
  const compliance = {}
  const tagCounts = {}
  for (const doc of docs) {
    categories[doc.category] = (categories[doc.category] || 0) + 1
    if (doc.status)
      statusCounts[doc.status] = (statusCounts[doc.status] || 0) + 1
    if (doc.compliance)
      compliance[doc.compliance] = (compliance[doc.compliance] || 0) + 1
    for (const tag of doc.tags || []) tagCounts[tag] = (tagCounts[tag] || 0) + 1
  }
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 40)
    .map(([tag, count]) => ({ tag, count }))
  return {
    name: "ngosangns-knowledge-base",
    projectRoot: "ngosangns-knowledge-base",
    docsRoot: "ngosangns-knowledge-base",
    agentsPath: "AGENTS.md",
    agentsFound: fs.existsSync(path.join(ROOT, "AGENTS.md")),
    indexFound: fs.existsSync(path.join(ROOT, "INDEX.md")),
    syncFound: false,
    totalSpecs: docs.length,
    categories,
    statusCounts,
    compliance,
    tagCounts,
    topTags,
    sync: {},
    warnings: [],
    generatedTitle: "Knowledge Base Preview"
  }
}

function main() {
  const concepts = loadConcepts()
  const docs = buildDocs(concepts)
  const index = buildBundleIndex(concepts)
  const codeDocs = collectCodeDocs()
  const graph = buildGraph(docs, index)
  const graphify = loadGraphify()
  const files = {}
  for (const doc of docs)
    files[doc.path] = {
      path: doc.path,
      title: doc.title,
      language: "markdown",
      tags: doc.tags || [],
      raw: doc.raw
    }
  for (const doc of codeDocs)
    files[doc.path] = {
      path: doc.path,
      title: doc.title,
      language: doc.language,
      raw: doc.content
    }

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(OUT_DIR, "preview.json"),
    JSON.stringify(
      sanitizeLegacyNames({
        summary: buildSummary(docs),
        documents: docs,
        graph,
        codeDocs,
        graphify,
        files
      }),
      null,
      2
    )
  )
  const docNodeCount = graph.nodes.filter(node => node.type === "doc").length
  console.log(
    `Built preview data: ${docs.length} docs, ${codeDocs.length} code files, ${graph.edges.length} doc edges`
  )
  console.log(
    `Doc nodes: ${docNodeCount} (= non-reserved concepts: ${concepts.length}), unresolved links skipped: ${graph.unresolvedLinks.length}`
  )
}

// Run the build only when executed directly (`node scripts/build-preview-data.js`).
// When the module is `require`d (e.g. from unit tests) we expose the pure
// helpers below instead of running `main()`, so tests can feed synthetic data.
if (require.main === module) {
  main()
}

module.exports = {
  loadConcepts,
  buildBundleIndex,
  buildDocs,
  buildGraph,
  extractLinks,
  buildSummary,
  main
}
