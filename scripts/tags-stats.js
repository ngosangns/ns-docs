#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const WORKSPACE_ROOT = __dirname + "/.."
const IGNORE_DIRS = ["Attachments", "node_modules", ".git"]
const LIST_ONLY = process.argv.includes("--list")

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

function calculateTagStats() {
  console.log("🏷️  Analyzing tags...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const tagCount = new Map()
  const tagFiles = new Map()
  let filesWithTags = 0
  let filesWithoutTags = 0

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8")
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const tags = extractTags(content)

    if (tags.length > 0) {
      filesWithTags++
      tags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
        if (!tagFiles.has(tag)) {
          tagFiles.set(tag, [])
        }
        tagFiles.get(tag).push(relativePath)
      })
    } else {
      filesWithoutTags++
    }
  })

  if (LIST_ONLY) {
    console.log("=".repeat(60))
    console.log("🏷️  ALL TAGS")
    console.log("=".repeat(60))
    const sortedTags = Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1])
    sortedTags.forEach(([tag, count]) => {
      console.log(`   ${tag} (${count} files)`)
    })
    console.log("\n" + "=".repeat(60))
  } else {
    console.log("=".repeat(60))
    console.log("🏷️  TAG STATISTICS")
    console.log("=".repeat(60))
    console.log(`\n📊 Summary:`)
    console.log(`   Total unique tags: ${tagCount.size}`)
    console.log(`   Files with tags: ${filesWithTags}`)
    console.log(`   Files without tags: ${filesWithoutTags}`)
    console.log(`   Total tag occurrences: ${Array.from(tagCount.values()).reduce((a, b) => a + b, 0)}`)

    console.log(`\n📈 Top 20 most used tags:`)
    const sortedTags = Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
    sortedTags.forEach(([tag, count], index) => {
      const bar = "█".repeat(Math.min(20, Math.floor((count / sortedTags[0][1]) * 20)))
      console.log(`   ${(index + 1).toString().padStart(2)}. ${tag.padEnd(30)} ${count.toString().padStart(3)} ${bar}`)
    })

    console.log(`\n📋 Tags by category:`)
    const tagsByCategory = new Map()
    tagCount.forEach((count, tag) => {
      const category = tag.split("/")[0]
      if (!tagsByCategory.has(category)) {
        tagsByCategory.set(category, [])
      }
      tagsByCategory.get(category).push({ tag, count })
    })

    Array.from(tagsByCategory.entries())
      .sort((a, b) => b[1].length - a[1].length)
      .forEach(([category, tags]) => {
        console.log(`\n   ${category}:`)
        tags
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
          .forEach(({ tag, count }) => {
            console.log(`      - ${tag} (${count})`)
          })
      })

    console.log("\n" + "=".repeat(60))
  }
}

calculateTagStats()

