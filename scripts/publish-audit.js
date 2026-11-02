#!/usr/bin/env node

// Publication audit: measures every Concept against the contract that decides
// whether it can be published as documentation, as a blog post, or needs an
// edit first. Read-only. Writes a JSON report plus a Markdown summary under
// .reports/ (ignored by the bundle walk and by git).
//
// Contract v1
//   docs-ready: title, description, timestamp, >=1 tag, exactly one H1 that
//     matches the title, >=1 intro paragraph, >=200 prose words, no
//     placeholders, no unresolved local links, no empty body.
//   blog-ready: docs-ready plus >=60-word intro, >=35% of prose in paragraphs
//     (not bullets), >=350 prose words, no audit-only sections, no bare URLs,
//     average sentence <=30 words, at most 10% of sentences over 40 words.
//   fragment: fewer than 150 prose words.
//   invalid: unparseable YAML or empty body.

const fs = require("fs")
const path = require("path")

const { walkBundleTolerant } = require("./okf-core")

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, ".reports")

const AUDIT_HEADING =
  /^(not checked|see also|sources?|nguồn|references?|further reading|chưa kiểm chứng|ghi chú kiểm chứng|kiểm chứng)$/i
const PLACEHOLDER = /\b(TODO|TBD|FIXME|lorem ipsum)\b/i
const VIETNAMESE_CHAR = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/gi
const HEADING = /^(#{1,6})\s+(.+?)\s*$/
const BULLET = /^\s*(?:[-*+]|\d+[.)])\s+/
const TABLE = /^\s*\|/
const FENCE = /^\s*(```|~~~)/
const LINK_DEST = /\]\([^)]*\)/g
const INTERNAL_LINK = /\]\((\/[^)\s]+)\)/g
const EXTERNAL_LINK = /\]\((https?:\/\/[^)\s]+)\)/g
const MARKDOWN_NOISE = /[*_`~]/g

function words(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

function cleanInline(text) {
  return text
    .replace(LINK_DEST, "]")
    .replace(/!\[[^\]]*\]/g, "")
    .replace(MARKDOWN_NOISE, "")
    .replace(/\s+/g, " ")
    .trim()
}

function stripTags(text) {
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

function detectLanguage(text) {
  const letters = (text.match(/\p{L}/gu) || []).length
  if (!letters) return "unknown"
  const vietnamese = (text.match(VIETNAMESE_CHAR) || []).length
  return vietnamese / letters >= 0.02 ? "vi" : "en"
}

function splitSentences(lines) {
  const sentences = []
  for (const line of lines) {
    const parts = line
      .split(/(?<=[.!?])\s+(?=[\p{Lu}\p{Ll}0-9"'([])/u)
      .map((s) => s.trim())
      .filter(Boolean)
    if (parts.length > 0) sentences.push(...parts)
  }
  return sentences
}

function isTitleCaseHeading(text) {
  const parts = text
    .replace(/[`*_]/g, "")
    .split(/\s+/)
    .filter((w) => /\p{L}/u.test(w))
  if (parts.length < 4) return false
  const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to", "vs", "with", "via"])
  const capitalized = parts.filter(
    (w, i) => i > 0 && i < parts.length - 1 && !small.has(w.toLowerCase()) && /^\p{Lu}/u.test(w)
  ).length
  const eligible = parts.length - 2
  return eligible >= 2 && capitalized / eligible >= 0.6
}

function analyzeBody(body) {
  const lines = body.split(/\r?\n/)
  const headings = []
  const proseLines = []
  const paragraphLines = []
  const bulletLines = []
  const narrativeBulletLines = []
  const codeLines = []
  const auditSections = []
  let fence = false
  let fenceLang = null
  let fenceCount = 0
  let tableRows = 0
  let bareUrls = 0
  let emDashes = 0
  let boldLabels = 0
  let currentAudit = null

  for (const line of lines) {
    const fenceMatch = FENCE.exec(line)
    if (fenceMatch) {
      fence = !fence
      if (fence) fenceCount += 1
      fenceLang = fence ? line.trim().slice(3).trim() : null
      continue
    }
    if (fence) {
      codeLines.push(line)
      continue
    }

    const heading = HEADING.exec(line)
    if (heading) {
      const depth = heading[1].length
      const text = heading[2].trim()
      headings.push({ depth, text })
      if (AUDIT_HEADING.test(text.replace(/[*_`]/g, "").trim())) {
        currentAudit = text
        auditSections.push(text)
      } else {
        currentAudit = null
      }
      continue
    }

    if (currentAudit) continue

    if (!line.trim()) continue

    const withoutDest = line.replace(LINK_DEST, "]")
    const urls = withoutDest.match(/https?:\/\/[^\s)>\]]+/g)
    if (urls) bareUrls += urls.length

    if (TABLE.test(line)) {
      tableRows += 1
      continue
    }

    const cleaned = stripTags(cleanInline(line)).replace(BULLET, "")
    if (!cleaned) continue

    if (BULLET.test(line)) {
      bulletLines.push(cleaned)
      if (words(cleaned) >= 8) narrativeBulletLines.push(cleaned)
      if (/^\s*[-*+]\s+\*\*[^*]+\*\*\s*[:.]/.test(line)) boldLabels += 1
      proseLines.push(cleaned)
      continue
    }

    proseLines.push(cleaned)
    paragraphLines.push(cleaned)
  }

  const proseText = proseLines.join(" ")
  const paragraphText = paragraphLines.join(" ")
  const proseWords = words(proseText)
  const paragraphWords = words(paragraphText)
  const sentences = splitSentences(proseLines)
  const sentenceLengths = sentences.map(words).filter((n) => n > 0)
  const avgSentence =
    sentenceLengths.length > 0
      ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length
      : 0
  const longSentences = sentenceLengths.filter((n) => n > 40).length

  const h1 = headings.filter((h) => h.depth === 1)
  const h1Index = lines.findIndex((l) => /^#\s+/.test(l) && !FENCE.test(l))

  // The lead is the prose block after the H1 up to the first list, table, code
  // block, or section heading. It may span several paragraphs, and section
  // headings before it (e.g. "## Overview") do not end it.
  let introWords = 0
  if (h1Index >= 0) {
    let started = false
    for (let i = h1Index + 1; i < lines.length; i += 1) {
      const line = lines[i]
      if (FENCE.test(line) || TABLE.test(line)) break
      if (HEADING.test(line)) {
        if (started) break
        continue
      }
      if (!line.trim()) continue
      if (BULLET.test(line)) break
      started = true
      introWords += words(stripTags(cleanInline(line)))
    }
  }

  const truncated = body.slice(0, 4000)
  return {
    headings,
    h1Count: h1.length,
    h1Text: h1[0] ? h1[0].text.replace(/[*_`]/g, "") : null,
    headingDepths: [...new Set(headings.map((h) => h.depth))].sort(),
    maxDepth: headings.reduce((m, h) => Math.max(m, h.depth), 0),
    titleCaseHeadings: headings.filter((h) => isTitleCaseHeading(h.text)).length,
    proseWords,
    paragraphWords,
    narrativeBulletWords: words(narrativeBulletLines.join(" ")),
    paragraphRatio: proseWords
      ? (paragraphWords + words(narrativeBulletLines.join(" "))) / proseWords
      : 0,
    bulletItems: bulletLines.length,
    bulletWords: words(bulletLines.join(" ")),
    introWords,
    sentenceCount: sentenceLengths.length,
    avgSentence: Number(avgSentence.toFixed(1)),
    longSentences,
    longSentenceRatio:
      sentenceLengths.length > 0 ? longSentences / sentenceLengths.length : 0,
    codeFences: fenceCount,
    codeLangs: [...new Set(lines.filter((l) => FENCE.test(l)).map((l) => l.trim().slice(3).trim()).filter(Boolean))].sort(),
    codeLines: codeLines.filter((l) => l.trim()).length,
    tableRows,
    externalLinks: (body.replace(/```[\s\S]*?```/g, "").match(EXTERNAL_LINK) || []).length,
    internalLinks: (body.replace(/```[\s\S]*?```/g, "").match(INTERNAL_LINK) || []).length,
    wikilinks: (body.replace(/```[\s\S]*?```/g, "").match(/\[\[[^\]]+\]\]/g) || []).length,
    bareUrls,
    emDashes: (body.match(/[—–]/g) || []).length,
    boldLabels,
    auditSections,
    placeholder: PLACEHOLDER.test(truncated),
    language: detectLanguage(proseText)
  }
}

function slugify(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function frontmatterChecks(data, body) {
  const blockers = []
  const polish = []
  const title = typeof data.title === "string" ? data.title.trim() : ""
  const description =
    typeof data.description === "string" ? data.description.trim() : ""
  const tags = Array.isArray(data.tags) ? data.tags : []

  if (!title) blockers.push("missing title")
  if (!description) blockers.push("missing description")
  else if (description.length < 40) polish.push("description under 40 chars")
  else if (description.length > 240) polish.push("description over 240 chars")
  if (!data.timestamp) blockers.push("missing timestamp")
  if (tags.length === 0) blockers.push("missing tags")
  if (!data.type) blockers.push("missing type")
  return { title, description, tags, blockers, polish }
}

function classify(text, analysis) {
  const blockers = []
  const polish = []

  if (analysis.placeholder) blockers.push("placeholder text")
  if (!text.trim()) blockers.push("empty body")
  if (analysis.h1Count === 0) blockers.push("missing H1")
  if (analysis.h1Count > 1) blockers.push("multiple H1")
  if (analysis.h1Count === 1 && analysis.h1Text) {
    const normalizedTitle = analysis.title.replace(/\s+/g, " ").trim().toLowerCase()
    const normalizedH1 = analysis.h1Text.replace(/\s+/g, " ").trim().toLowerCase()
    if (normalizedTitle && normalizedH1 !== normalizedTitle) {
      polish.push("H1 differs from title")
    }
  }
  if (analysis.introWords === 0) blockers.push("no intro paragraph")
  if (analysis.proseWords < 150) blockers.push("fragment under 150 words")
  if (analysis.bulletItems >= 8 && analysis.paragraphWords < 60) {
    blockers.push("bullet list without prose")
  }
  if (analysis.avgSentence > 30) polish.push("average sentence over 30 words")
  if (analysis.longSentenceRatio > 0.1) polish.push("over 10% of sentences past 40 words")
  if (analysis.bareUrls > 0) polish.push(`${analysis.bareUrls} bare URL(s)`)
  if (analysis.auditSections.length > 0) polish.push("audit-only section")
  if (analysis.language === "en" && analysis.titleCaseHeadings > 0) {
    polish.push("title-case heading")
  }
  if (analysis.emDashes > 0) polish.push(`${analysis.emDashes} em/en dash(es)`)
  if (analysis.boldLabels >= 3) polish.push(`${analysis.boldLabels} bold-label bullets`)

  return { blockers, polish }
}

function verdictFor(error, analysis, checks, blockers) {
  if (error) return { docs: "invalid", blog: "invalid" }
  if (blockers.some((b) => b.startsWith("fragment"))) {
    return { docs: "fragment", blog: "fragment" }
  }
  if (blockers.length > 0) return { docs: "blocked", blog: "blocked" }

  // The projection strips audit sections, autolinks bare URLs, and makes
  // internal links absolute, so the blog gate measures editorial shape only.
  const blogBlockers = []
  if (analysis.introWords < 60) blogBlockers.push("intro under 60 words")
  if (analysis.paragraphRatio < 0.35) blogBlockers.push("under 35% paragraph prose")
  if (analysis.proseWords < 350) blogBlockers.push("under 350 prose words")
  if (analysis.avgSentence > 30) blogBlockers.push("average sentence over 30 words")
  if (analysis.longSentenceRatio > 0.1) blogBlockers.push("over 10% long sentences")

  return {
    docs: checks.polish.length > 0 ? "docs-ready-polish" : "docs-ready",
    blog: blogBlockers.length === 0 ? "blog-ready" : "blog-blocked",
    blogBlockers
  }
}

function auditBundle(root = ROOT) {
  const { concepts } = walkBundleTolerant(root)
  const seenTitles = new Map()
  const results = []

  for (const concept of concepts) {
    const error = concept.parseError ? "unparseable frontmatter" : null
    const analysis = analyzeBody(concept.body || "")
    const checks = frontmatterChecks(concept.data || {}, concept.body || "")
    const blockers = [...checks.blockers]
    const { blockers: bodyBlockers, polish: bodyPolish } = error
      ? { blockers: [], polish: [] }
      : classify(concept.body || "", { ...analysis, title: checks.title })
    blockers.push(...bodyBlockers)
    const polish = [...checks.polish, ...bodyPolish]
    const verdict = verdictFor(error, analysis, checks, blockers)

    const title = checks.title || concept.relPath.split("/").pop().replace(/\.md$/i, "")
    const titleKey = title.toLowerCase()
    if (titleKey) {
      if (!seenTitles.has(titleKey)) seenTitles.set(titleKey, [])
      seenTitles.get(titleKey).push(concept.relPath)
    }

    results.push({
      id: concept.id,
      relPath: concept.relPath,
      title,
      type: concept.data.type || null,
      area: concept.data.area || concept.relPath.split("/")[0].toLowerCase(),
      slug: slugify(title),
      language: analysis.language,
      words: analysis.proseWords,
      paragraphRatio: Number(analysis.paragraphRatio.toFixed(2)),
      introWords: analysis.introWords,
      avgSentence: analysis.avgSentence,
      sentenceCount: analysis.sentenceCount,
      headings: analysis.headings.length,
      maxDepth: analysis.maxDepth,
      codeFences: analysis.codeFences,
      tableRows: analysis.tableRows,
      internalLinks: analysis.internalLinks,
      externalLinks: analysis.externalLinks,
      auditSections: analysis.auditSections,
      docs: verdict.docs,
      blog: verdict.blog,
      blogBlockers: verdict.blogBlockers || [],
      blockers: error ? [error, ...blockers] : blockers,
      polish,
      duplicateTitle: false
    })
  }

  const resultById = new Map(results.map((r) => [r.relPath, r]))
  for (const [title, paths] of seenTitles) {
    if (paths.length > 1) {
      for (const p of paths) resultById.get(p).duplicateTitle = paths.filter((x) => x !== p)
    }
  }

  const counts = (field, value) => results.filter((r) => r[field] === value).length
  const blockerCounts = {}
  for (const r of results) {
    for (const b of r.blockers) {
      const key = b.replace(/^\d+\s/, "")
      blockerCounts[key] = (blockerCounts[key] || 0) + 1
    }
  }
  const polishCounts = {}
  for (const r of results) {
    for (const p of r.polish) {
      const key = p.replace(/^\d+\s/, "").replace(/e?s$/, "")
      polishCounts[key] = (polishCounts[key] || 0) + 1
    }
  }

  const totals = {
    concepts: results.length,
    docsReady: counts("docs", "docs-ready"),
    docsReadyPolish: counts("docs", "docs-ready-polish"),
    blogReady: counts("blog", "blog-ready"),
    blogBlocked: counts("blog", "blog-blocked"),
    fragment: counts("docs", "fragment"),
    blocked: counts("docs", "blocked"),
    invalid: counts("docs", "invalid"),
    vietnamese: counts("language", "vi"),
    english: counts("language", "en"),
    duplicateTitles: results.filter((r) => r.duplicateTitle).length,
    words: results.reduce((n, r) => n + r.words, 0),
    withAuditSections: results.filter((r) => r.auditSections.length > 0).length,
    withCode: results.filter((r) => r.codeFences > 0).length,
    withTables: results.filter((r) => r.tableRows > 0).length
  }

  return {
    generatedAt: new Date().toISOString(),
    contract: "publication-contract-v1",
    totals,
    blockerCounts,
    polishCounts,
    byType: Object.fromEntries(
      [...new Set(results.map((r) => r.type || "(none)"))]
        .map((t) => [t, results.filter((r) => (r.type || "(none)") === t).length])
        .sort((a, b) => b[1] - a[1])
    ),
    byArea: Object.fromEntries(
      [...new Set(results.map((r) => r.area))]
        .map((a) => [a, results.filter((r) => r.area === a).length])
        .sort((a, b) => b[1] - a[1])
    ),
    concepts: results
  }
}

function main() {
  const report = auditBundle(ROOT)
  const totals = report.totals

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(OUT_DIR, "publish-audit.json"),
    JSON.stringify(report, null, 2) + "\n"
  )
  fs.writeFileSync(path.join(OUT_DIR, "publish-audit.md"), renderMarkdown(report))

  console.log(
    [
      `concepts: ${totals.concepts}`,
      `docs-ready: ${totals.docsReady} (+${totals.docsReadyPolish} with polish)`,
      `blog-ready: ${totals.blogReady}`,
      `blog-blocked: ${totals.blogBlocked}`,
      `blocked: ${totals.blocked}`,
      `fragment: ${totals.fragment}`,
      `invalid: ${totals.invalid}`,
      `languages: en ${totals.english}, vi ${totals.vietnamese}`,
      `duplicate titles: ${totals.duplicateTitles}`,
      `audit-only sections: ${totals.withAuditSections}`,
      `report: .reports/publish-audit.md`
    ].join("\n")
  )
}

function renderMarkdown(report) {
  const t = report.totals
  const byArea = Object.entries(report.byArea)
    .map(([a, n]) => `| ${a} | ${n} |`)
    .join("\n")
  const blockers = Object.entries(report.blockerCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([b, n]) => `| ${b} | ${n} |`)
    .join("\n")
  const polish = Object.entries(report.polishCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([p, n]) => `| ${p} | ${n} |`)
    .join("\n")

  const list = (items, limit = 30) =>
    items
      .slice(0, limit)
      .map((r) => `- \`${r.relPath}\` (${r.type || "no type"}, ${r.language}, ${r.words} words)`)
      .join("\n")

  const byVerdict = (field, value) =>
    report.concepts.filter((r) => r[field] === value)

  return `# Publication audit

Generated ${report.generatedAt} against ${report.contract}.

## Summary

- Concepts: ${t.concepts}
- Docs ready: ${t.docsReady}
- Docs ready after polish: ${t.docsReadyPolish}
- Blog ready: ${t.blogReady}
- Blog blocked: ${t.blogBlocked}
- Blocked: ${t.blocked}
- Fragment: ${t.fragment}
- Invalid: ${t.invalid}
- English / Vietnamese: ${t.english} / ${t.vietnamese}
- Duplicate titles: ${t.duplicateTitles}
- Notes with an audit-only section: ${t.withAuditSections}
- Total prose words: ${t.words}

## Concepts by area

| Area | Concepts |
| --- | --- |
${byArea}

## Blockers

| Blocker | Concepts |
| --- | --- |
${blockers}

## Polish items

| Item | Concepts |
| --- | --- |
${polish}

## Blog ready (${t.blogReady})

${list(byVerdict("blog", "blog-ready"))}

## Blog candidates that need polish (${t.blogBlocked})

${list(byVerdict("blog", "blog-blocked"), 60)}

## Blocked (${t.blocked})

${list(byVerdict("docs", "blocked"), 60)}

## Fragments (${t.fragment})

${list(byVerdict("docs", "fragment"), 60)}

## Invalid (${t.invalid})

${list(byVerdict("docs", "invalid"), 60)}
`
}

if (require.main === module) {
  main()
}

module.exports = {
  auditBundle,
  analyzeBody,
  classify,
  frontmatterChecks,
  renderMarkdown,
  slugify,
  AUDIT_HEADING,
  FENCE,
  HEADING,
  TABLE,
  BULLET
}
