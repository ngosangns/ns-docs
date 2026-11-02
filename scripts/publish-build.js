#!/usr/bin/env node

// Publication build: projects Concepts that pass the publication contract into
// portable docs and blog post files under .publication/.
//
// - docs/: every docs-ready Concept, vault path preserved, audit-only sections
//   removed, bare URLs autolinked, internal links made absolute.
// - blog/: every blog-ready Concept as a flat dated post with the H1 removed
//   (the publishing platform renders the title), all audit/source sections
//   removed, and internal links made absolute.
// - QUEUE.md: the notes that still fail, ordered by edit distance so the next
//   batch is obvious.
// - manifest.json: source -> output mapping plus verdicts.
//
// Read-only with respect to the vault. Output is gitignored.

const fs = require("fs")
const path = require("path")

const { auditBundle, AUDIT_HEADING, FENCE, HEADING, slugify } = require("./publish-audit")
const { parseFrontmatter } = require("./okf-core")

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, ".publication")
const SITE_BASE = "https://ngosangns-knowledge-base.pages.dev"

const DOCS_KEEP = new Set(["see also", "sources", "source", "nguồn", "references", "further reading", "liên kết"])

function isAuditHeading(text) {
  const clean = text.replace(/[*_`]/g, "").trim().toLowerCase()
  return AUDIT_HEADING.test(clean)
}

function stripSections(body, keep) {
  const lines = body.split(/\r?\n/)
  const out = []
  let skipDepth = 0
  let fence = false

  for (const line of lines) {
    if (FENCE.test(line)) {
      fence = !fence
      if (!skipDepth) out.push(line)
      continue
    }

    if (!fence) {
      const heading = HEADING.exec(line)
      if (heading) {
        const depth = heading[1].length
        if (skipDepth && depth <= skipDepth) skipDepth = 0
        if (!skipDepth && isAuditHeading(heading[2]) && !keep(heading[2])) {
          skipDepth = depth
          continue
        }
      }
    }

    if (!skipDepth) out.push(line)
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim()
}

function stripFirstH1(body) {
  const lines = body.split(/\r?\n/)
  let fence = false
  for (let i = 0; i < lines.length; i += 1) {
    if (FENCE.test(lines[i])) fence = !fence
    if (fence) continue
    if (/^#\s+/.test(lines[i])) {
      lines.splice(i, 1)
      break
    }
  }
  return lines.join("\n").replace(/^\s*\n/, "").trim()
}

function autolinkBareUrls(body) {
  const lines = body.split(/\r?\n/)
  let fence = false
  return lines
    .map((line) => {
      if (FENCE.test(line)) {
        fence = !fence
        return line
      }
      if (fence) return line
      if (/^\s*<https?:\/\/[^>]+>\s*$/.test(line)) return line
      return line.replace(
        /(?<![\]<("'])(https?:\/\/[^\s<>()\]]+)/g,
        "<$1>"
      )
    })
    .join("\n")
}

function absolutizeLinks(body) {
  return body.replace(/\]\(\s*(\/[^)\n]+?)\s*\)/g, (_m, target) => {
    const encoded = target.includes("%") ? target : encodeURI(target)
    return `](${SITE_BASE}${encoded})`
  })
}

function yamlString(value) {
  return JSON.stringify(String(value))
}

function frontmatterFor(entry, mode) {
  const lines = ["---"]
  lines.push(`title: ${yamlString(entry.title)}`)
  if (entry.description) lines.push(`description: ${yamlString(entry.description)}`)
  if (entry.timestamp) lines.push(`date: ${yamlString(entry.timestamp.slice(0, 10))}`)
  if (entry.tags.length) {
    lines.push("tags:")
    for (const tag of entry.tags) lines.push(`  - ${yamlString(tag)}`)
  }
  lines.push(`type: ${yamlString(entry.type || "note")}`)
  lines.push(`area: ${yamlString(entry.area)}`)
  lines.push(`lang: ${yamlString(entry.language)}`)
  lines.push(`source: ${yamlString(entry.relPath)}`)
  lines.push(`canonical: ${yamlString(SITE_BASE + encodeURI("/" + entry.id))}`)
  lines.push(`mode: ${yamlString(mode)}`)
  lines.push("---")
  return lines.join("\n")
}

function uniquePath(basePath, used) {
  let candidate = basePath
  let i = 2
  while (used.has(candidate)) {
    candidate = basePath.replace(/\.md$/, `-${i}.md`)
    i += 1
  }
  used.add(candidate)
  return candidate
}

function main() {
  const report = auditBundle(ROOT)
  const entries = []
  const used = new Set()
  const blogPosts = []
  const docsFiles = []

  for (const result of report.concepts) {
    const source = path.join(ROOT, result.relPath)
    const raw = fs.readFileSync(source, "utf8")
    const { data, body } = parseFrontmatter(raw)
    const tags = Array.isArray(data.tags)
      ? data.tags.filter((t) => typeof t === "string")
      : []
    const entry = {
      ...result,
      description: typeof data.description === "string" ? data.description : "",
      timestamp: typeof data.timestamp === "string" ? data.timestamp : null,
      tags
    }

    if (result.docs === "docs-ready" || result.docs === "docs-ready-polish") {
      const docsBody = absolutizeLinks(
        autolinkBareUrls(
          stripSections(body, (heading) => DOCS_KEEP.has(heading.trim().toLowerCase()))
        )
      )
      const outPath = uniquePath(path.join(".publication", "docs", result.relPath), used)
      fs.mkdirSync(path.dirname(path.join(ROOT, outPath)), { recursive: true })
      fs.writeFileSync(
        path.join(ROOT, outPath),
        `${frontmatterFor(entry, "docs")}\n\n${docsBody}\n`
      )
      docsFiles.push({ entry, outPath })
      entry.docsOutput = outPath
    }

    if (result.blog === "blog-ready") {
      const blogBody = absolutizeLinks(
        autolinkBareUrls(stripFirstH1(stripSections(body, () => false)))
      )
      const date = (entry.timestamp || "1970-01-01").slice(0, 10)
      const base = path.join(".publication", "blog", `${date}-${slugify(result.title)}.md`)
      const outPath = uniquePath(base, used)
      fs.mkdirSync(path.dirname(path.join(ROOT, outPath)), { recursive: true })
      fs.writeFileSync(
        path.join(ROOT, outPath),
        `${frontmatterFor(entry, "blog")}\n\n${blogBody}\n`
      )
      blogPosts.push({ entry, outPath })
      entry.blogOutput = outPath
    }

    entries.push(entry)
  }

  blogPosts.sort((a, b) =>
    (b.entry.timestamp || "").localeCompare(a.entry.timestamp || "")
  )
  docsFiles.sort((a, b) => a.entry.relPath.localeCompare(b.entry.relPath))

  const blogIndex = [
    "---",
    'title: "Blog"',
    'description: "Posts generated from vault notes that pass the publication contract."',
    "---",
    "",
    "# Blog",
    "",
    ...blogPosts.map(
      ({ entry, outPath }) =>
        `- [${entry.title}](${path.basename(outPath)}) - ${(entry.timestamp || "").slice(0, 10)} - ${entry.description}`
    ),
    ""
  ].join("\n")

  const docsIndex = [
    "---",
    'title: "Docs"',
    'description: "Reference pages generated from vault notes that pass the publication contract."',
    "---",
    "",
    "# Docs",
    "",
    ...Object.entries(
      docsFiles.reduce((groups, { entry, outPath }) => {
        const area = entry.area || "other"
        groups[area] = groups[area] || []
        groups[area].push({ entry, outPath })
        return groups
      }, {})
    )
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([area, files]) => [
        `## ${area}`,
        "",
        ...files.map(({ entry, outPath }) => {
          const rel = path
            .relative(path.join(OUT_DIR, "docs"), path.join(ROOT, outPath))
            .split(path.sep)
            .join("/")
          return `- [${entry.title}](${rel}) - ${entry.description}`
        }),
        ""
      ]),
    ""
  ].join("\n")

  fs.writeFileSync(path.join(OUT_DIR, "blog", "index.md"), blogIndex)
  fs.writeFileSync(path.join(OUT_DIR, "docs", "index.md"), docsIndex)

  const queue = buildQueue(entries)
  fs.writeFileSync(path.join(OUT_DIR, "QUEUE.md"), queue)

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(
      {
        generatedAt: report.generatedAt,
        contract: report.contract,
        totals: report.totals,
        docs: docsFiles.map(({ entry, outPath }) => ({
          source: entry.relPath,
          output: outPath,
          title: entry.title,
          area: entry.area,
          language: entry.language
        })),
        blog: blogPosts.map(({ entry, outPath }) => ({
          source: entry.relPath,
          output: outPath,
          title: entry.title,
          date: (entry.timestamp || "").slice(0, 10),
          language: entry.language
        }))
      },
      null,
      2
    ) + "\n"
  )

  console.log(
    [
      `docs: ${docsFiles.length}`,
      `blog: ${blogPosts.length}`,
      `queue: ${entries.filter((e) => e.docs === "blocked" || e.docs === "fragment" || e.blog === "blog-blocked").length}`,
      `output: .publication/`
    ].join("\n")
  )
}

function buildQueue(entries) {
  const needsWork = entries
    .filter((e) => e.docs === "blocked" || e.docs === "fragment" || e.blog === "blog-blocked")
    .map((e) => {
      const work =
        e.docs === "blocked" || e.docs === "fragment"
          ? e.blockers
          : e.blogBlockers
      return { ...e, work }
    })
    .sort((a, b) => {
      if (a.work.length !== b.work.length) return a.work.length - b.work.length
      return b.words - a.words
    })

  const fragments = needsWork.filter((e) => e.docs === "fragment")
  const blocked = needsWork.filter((e) => e.docs === "blocked")
  const blogOnly = needsWork.filter((e) => e.blog === "blog-blocked" && e.docs !== "blocked" && e.docs !== "fragment")

  const section = (title, items) => [
    `## ${title} (${items.length})`,
    "",
    ...items.map(
      (e) =>
        `- [ ] \`${e.relPath}\` - ${e.work.join("; ")}`
    ),
    ""
  ]

  return [
    "# Publication queue",
    "",
    "Ordered by edit distance. Tick a note when the audit flips it to ready.",
    "",
    ...section("Blocked notes", blocked),
    ...section("Blog-only edits", blogOnly),
    ...section("Fragments", fragments)
  ].join("\n")
}

if (require.main === module) {
  main()
}

module.exports = {
  stripSections,
  stripFirstH1,
  autolinkBareUrls,
  absolutizeLinks,
  frontmatterFor,
  buildQueue
}
