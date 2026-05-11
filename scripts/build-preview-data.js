#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

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

function parseFrontmatter(raw) {
  const text = frontmatterText(raw)
  if (!text) return {}
  const meta = {}
  for (const line of text.split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (field)
      meta[field[1].toLowerCase()] = field[2].trim().replace(/^["']|["']$/g, "")
  }
  return meta
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

function makeDocId(rel) {
  return toSlash(rel)
}

function categoryFor(rel) {
  const parts = rel.split("/")
  return parts.length > 1 ? parts[0] : "Root"
}

function slugify(text) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\.md$/i, "")
    .replace(/[^a-z0-9/ -]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function buildDocIndex(docs) {
  const index = new Map()
  for (const doc of docs) {
    const noExt = doc.path.replace(/\.md$/i, "")
    const keys = [
      doc.path,
      noExt,
      path.basename(noExt),
      doc.title,
      slugify(doc.path),
      slugify(noExt),
      slugify(path.basename(noExt)),
      slugify(doc.title)
    ]
    for (const key of keys) {
      const normalized = String(key || "").toLowerCase()
      if (normalized && !index.has(normalized)) index.set(normalized, doc)
    }
  }
  return index
}

function resolveDocTarget(rawTarget, sourceDoc, index) {
  if (!rawTarget) return null
  const clean = rawTarget.split("#")[0].split("|")[0].trim().replace(/\\/g, "/")
  if (!clean || /^https?:\/\//i.test(clean)) return null
  const candidates = [clean, clean.replace(/\.md$/i, ""), slugify(clean)]
  if (clean.startsWith("./") || clean.startsWith("../")) {
    const sourceDir = path.posix.dirname(sourceDoc.path)
    const joined = path.posix.normalize(path.posix.join(sourceDir, clean))
    candidates.push(joined, joined.replace(/\.md$/i, ""), slugify(joined))
  }
  for (const candidate of candidates) {
    const doc = index.get(candidate.toLowerCase())
    if (doc) return doc
  }
  return null
}

function extractLinks(doc, index) {
  const links = []
  const seen = new Set()
  const add = (target, label) => {
    const targetDoc = resolveDocTarget(target, doc, index)
    if (!targetDoc || targetDoc.id === doc.id || seen.has(targetDoc.id)) return
    seen.add(targetDoc.id)
    links.push({ to: targetDoc.id, raw: target, label })
  }

  for (const match of doc.raw.matchAll(/\[\[([^\]]+)\]\]/g))
    add(match[1], "wiki")
  for (const match of doc.raw.matchAll(/\[[^\]]+\]\(([^)]+)\)/g))
    add(decodeURI(match[1]), "link")
  for (const match of doc.raw.matchAll(/@(doc|spec)\/([^\s)]+)/g))
    add(match[2], match[1])
  return links
}

function collectDocs() {
  const docs = []
  walk(ROOT, abs => {
    if (path.extname(abs).toLowerCase() !== ".md") return
    const rel = toSlash(path.relative(ROOT, abs))
    const raw = readTextFile(abs)
    if (raw == null) return
    const meta = parseFrontmatter(raw)
    const tags = extractTags(raw)
    docs.push({
      id: makeDocId(rel),
      title: meta.title || titleFromMarkdown(raw, path.basename(rel)),
      path: rel,
      language: "markdown",
      category: categoryFor(rel),
      status: meta.status || "",
      compliance: meta.compliance || "",
      priority: meta.priority || "",
      description: meta.description || "",
      tags,
      raw
    })
  })
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

function buildGraph(docs) {
  const index = buildDocIndex(docs)
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
    for (const link of extractLinks(doc, index)) {
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
  return { nodes, edges, relationships, constraints: [], dependencyDiagram: "" }
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
  const docs = collectDocs()
  const codeDocs = collectCodeDocs()
  const graph = buildGraph(docs)
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
  console.log(
    `Built preview data: ${docs.length} docs, ${codeDocs.length} code files, ${graph.edges.length} doc edges`
  )
}

main()
