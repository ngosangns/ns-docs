#!/usr/bin/env node

// check-links: report internal links that do not resolve to a Concept.
//
// See .kiro/specs/okf-redesign/requirements.md Requirements 11.6 and 11.7.
// The script resolves links THROUGH okf-core (no bespoke parsing), supporting
// both historical wikilinks `[[target]]` and Bundle_Relative_Link / relative
// `.md` markdown links `[label](target)` via `resolveTarget`. A link that does
// not resolve to exactly one Concept is reported as a `warning`; the process
// always exits 0 — broken links never fail the check (Requirement 11.7).
//
// Robustness: reads the bundle through okf-core's `loadBundle`, which tries the
// strict walk first and transparently falls back to a per-file-tolerant walk
// when a file has unparseable YAML, so one bad file never crashes the check.
// The link regexes and `isInternalMarkdownTarget` classifier are shared with
// okf-migrate via okf-core/links.

const path = require("path")

const { loadBundle, resolveTarget } = require("./okf-core")
const {
  isInternalMarkdownTarget,
  wikilinkRegex,
  markdownLinkRegex
} = require("./okf-core/links")

const WORKSPACE_ROOT = path.join(__dirname, "..")
const BROKEN_ONLY = process.argv.includes("--broken")

// stripCodeFences(body) -> string
// Blanks out fenced code blocks (``` / ~~~) so bracket sequences inside code
// samples (e.g. a regex `[[^\\d]]`) are not mistaken for links.
function stripCodeFences(body) {
  const lines = String(body).split(/\r?\n/)
  let inFence = false
  const out = []
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      out.push("")
      continue
    }
    out.push(inFence ? "" : line)
  }
  return out.join("\n")
}

// collectLinks(body) -> string[]
// Extracts every internal link to resolve from a Concept body: all wikilinks
// (alias/anchor stripping is handled by resolveTarget) and every internal
// markdown link target. Fenced code blocks are ignored. External links,
// images/embeds and pure anchors are excluded.
function collectLinks(body) {
  const source = stripCodeFences(typeof body === "string" ? body : "")
  const links = []

  const wikiRe = wikilinkRegex()
  let match
  while ((match = wikiRe.exec(source)) !== null) {
    const inner = match[1].trim()
    if (inner !== "") {
      links.push(inner)
    }
  }

  const mdRe = markdownLinkRegex()
  while ((match = mdRe.exec(source)) !== null) {
    const target = match[2]
    if (isInternalMarkdownTarget(target)) {
      links.push(target.trim())
    }
  }

  return links
}

function checkLinks() {
  console.log("🔍 Checking links via okf-core...\n")

  const { concepts, index, attachments, degraded } = loadBundle(WORKSPACE_ROOT)
  if (degraded) {
    console.warn(
      "⚠️  A file has unparseable frontmatter; checking the parseable files only.\n"
    )
  }
  // Attachment paths are valid internal link targets too (resolveTarget only
  // resolves Concepts), so a bundle-relative link to a real attachment file is
  // not broken.
  const attachmentSet = new Set((attachments || []).map((a) => a.toLowerCase()))
  const isAttachmentLink = (target) => {
    const clean = String(target).split("#")[0].split("|")[0].trim()
    if (!clean.startsWith("/")) return false
    return attachmentSet.has(clean.replace(/^\/+/, "").toLowerCase())
  }
  const brokenLinks = []
  let totalLinks = 0
  let validLinks = 0

  for (const concept of concepts) {
    const links = collectLinks(concept.body)
    for (const target of links) {
      totalLinks++
      const resolved = resolveTarget(target, concept.id, index) || isAttachmentLink(target)
      if (resolved) {
        validLinks++
      } else {
        brokenLinks.push({ file: concept.relPath, link: target })
      }
    }
  }

  if (BROKEN_ONLY) {
    if (brokenLinks.length === 0) {
      console.log("✅ No broken links found!")
    } else {
      console.log(`⚠️  Found ${brokenLinks.length} broken links (warnings):\n`)
      brokenLinks.forEach(({ file, link }) => {
        console.log(`   ${file}`)
        console.log(`   → ${link}`)
        console.log("")
      })
    }
  } else {
    console.log("=".repeat(60))
    console.log("🔗 LINK CHECK RESULTS")
    console.log("=".repeat(60))
    console.log(`\n📊 Summary:`)
    console.log(`   Concepts scanned: ${concepts.length}`)
    console.log(`   Total links: ${totalLinks}`)
    console.log(`   Valid links: ${validLinks}`)
    console.log(`   Broken links: ${brokenLinks.length}`)

    if (brokenLinks.length > 0) {
      console.log(`\n⚠️  Broken links (warnings):`)
      brokenLinks.forEach(({ file, link }) => {
        console.log(`   WARNING ${file} → ${link}`)
      })
    } else {
      console.log(`\n✅ All links are valid!`)
    }
    console.log("\n" + "=".repeat(60))
  }

  // Requirement 11.7: broken links are warnings, never failures. Exit 0 even
  // when broken links exist.
  process.exit(0)
}

checkLinks()
