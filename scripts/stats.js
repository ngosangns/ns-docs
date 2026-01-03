#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const WORKSPACE_ROOT = __dirname + "/.."
const IGNORE_DIRS = ["Attachments", "node_modules", ".git"]

function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        getAllMarkdownFiles(filePath, fileList)
      }
    } else if (file.endsWith(".md")) {
      fileList.push(filePath)
    }
  })

  return fileList
}

function extractLinks(content) {
  const linkRegex = /\[\[([^\]]+)\]\]/g
  const links = []
  let match
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1])
  }
  return links
}

function extractTags(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return []

  const frontmatter = frontmatterMatch[1]
  const tagRegex = /tags:\s*\n((?:\s*-\s*[^\n]+\n?)+)/
  const tagMatch = frontmatter.match(tagRegex)
  if (!tagMatch) return []

  const tags = []
  const tagLines = tagMatch[1].match(/-\s*([^\n]+)/g) || []
  tagLines.forEach(line => {
    const tag = line.replace(/^-\s*/, "").trim()
    tags.push(tag)
  })
  return tags
}

function getFileSize(filePath) {
  const stats = fs.statSync(filePath)
  return stats.size
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

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  let totalLinks = 0
  let totalTags = 0
  let totalSize = 0
  let filesWithFrontmatter = 0
  let filesWithoutFrontmatter = 0
  const allTags = new Set()
  const allLinks = new Set()
  const dirStats = {}

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8")
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const dir = path.dirname(relativePath)

    if (!dirStats[dir]) {
      dirStats[dir] = { files: 0, size: 0 }
    }
    dirStats[dir].files++
    dirStats[dir].size += getFileSize(file)

    totalSize += getFileSize(file)

    const links = extractLinks(content)
    totalLinks += links.length
    links.forEach(link => allLinks.add(link))

    const tags = extractTags(content)
    totalTags += tags.length
    tags.forEach(tag => allTags.add(tag))

    if (content.match(/^---\n[\s\S]*?---/)) {
      filesWithFrontmatter++
    } else {
      filesWithoutFrontmatter++
    }
  })

  console.log("=".repeat(60))
  console.log("📈 WORKSPACE STATISTICS")
  console.log("=".repeat(60))
  console.log(`\n📄 Files:`)
  console.log(`   Total markdown files: ${mdFiles.length}`)
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

