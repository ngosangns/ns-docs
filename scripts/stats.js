#!/usr/bin/env node

// Workspace statistics, sourced from the okf-core bundle model
// (Requirement 11.8). Counts/links/tags are derived from okf-core Concepts
// (`concept.data` and `concept.body`) rather than ad-hoc frontmatter regexes.
// Note: reserved files (index.md/log.md) are not Concepts in the OKF model, so
// stats reflect Concepts only.
//
// Robustness: reads the bundle through okf-core's `loadBundle`, which falls
// back to a per-file-tolerant walk when a file has unparseable YAML.

const fs = require("fs")
const path = require("path")
const { loadBundle } = require("./okf-core")

const WORKSPACE_ROOT = path.join(__dirname, "..")

function extractLinks(body) {
  const linkRegex = /\[\[([^\]]+)\]\]/g
  const links = []
  let match
  while ((match = linkRegex.exec(body)) !== null) {
    links.push(match[1])
  }
  return links
}

// normalizeTags(value) -> string[]
// Reads tags from the parsed frontmatter (`concept.data.tags`). Accepts a YAML
// list (array) or a single scalar; anything else yields no tags.
function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value
      .filter(tag => tag !== null && tag !== undefined)
      .map(tag => String(tag).trim())
      .filter(tag => tag.length > 0)
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return [value.trim()]
  }
  return []
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
}

function calculateStats() {
  console.log("📊 Calculating workspace statistics...\n")

  const concepts = loadBundle(WORKSPACE_ROOT).concepts
  let totalLinks = 0
  let totalTags = 0
  let totalSize = 0
  let filesWithFrontmatter = 0
  let filesWithoutFrontmatter = 0
  const allTags = new Set()
  const allLinks = new Set()
  const dirStats = {}

  concepts.forEach(concept => {
    const relativePath = concept.relPath
    const dir = path.dirname(relativePath)
    const size = fs.statSync(concept.absPath).size

    if (!dirStats[dir]) {
      dirStats[dir] = { files: 0, size: 0 }
    }
    dirStats[dir].files++
    dirStats[dir].size += size

    totalSize += size

    const links = extractLinks(concept.body)
    totalLinks += links.length
    links.forEach(link => allLinks.add(link))

    const tags = normalizeTags(concept.data.tags)
    totalTags += tags.length
    tags.forEach(tag => allTags.add(tag))

    if (concept.hadFrontmatter) {
      filesWithFrontmatter++
    } else {
      filesWithoutFrontmatter++
    }
  })

  console.log("=".repeat(60))
  console.log("📈 WORKSPACE STATISTICS")
  console.log("=".repeat(60))
  console.log(`\n📄 Files:`)
  console.log(`   Total concepts: ${concepts.length}`)
  console.log(`   Files with frontmatter: ${filesWithFrontmatter}`)
  console.log(`   Files without frontmatter: ${filesWithoutFrontmatter}`)
  console.log(`\n🔗 Links:`)
  console.log(`   Total links: ${totalLinks}`)
  console.log(`   Unique links: ${allLinks.size}`)
  console.log(`\n🏷️  Tags:`)
  console.log(`   Total tags: ${totalTags}`)
  console.log(`   Unique tags: ${allTags.size}`)
  console.log(`\n💾 Size:`)
  console.log(`   Total size: ${formatBytes(totalSize)}`)

  console.log(`\n📁 Top directories by file count:`)
  const sortedDirs = Object.entries(dirStats)
    .sort((a, b) => b[1].files - a[1].files)
    .slice(0, 10)
  sortedDirs.forEach(([dir, stats]) => {
    console.log(`   ${dir || "."}: ${stats.files} files (${formatBytes(stats.size)})`)
  })

  console.log("\n" + "=".repeat(60))
}

calculateStats()
