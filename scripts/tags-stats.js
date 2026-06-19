#!/usr/bin/env node

// Tag statistics, sourced from the okf-core bundle model (Requirement 11.8).
// Tags are read from the parsed frontmatter (`concept.data.tags`) via okf-core
// rather than ad-hoc regex parsing.
//
// Robustness: reads the bundle through okf-core's `loadBundle`, which falls
// back to a per-file-tolerant walk when a file has unparseable YAML.

const path = require("path")
const { loadBundle } = require("./okf-core")

const WORKSPACE_ROOT = path.join(__dirname, "..")
const LIST_ONLY = process.argv.includes("--list")

// normalizeTags(value) -> string[]
// Reads tags from the parsed frontmatter. Accepts a YAML list (array) or a
// single scalar; anything else yields no tags.
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

function calculateTagStats() {
  console.log("🏷️  Analyzing tags...\n")

  const concepts = loadBundle(WORKSPACE_ROOT).concepts
  const tagCount = new Map()
  const tagFiles = new Map()
  let filesWithTags = 0
  let filesWithoutTags = 0

  concepts.forEach(concept => {
    const relativePath = concept.relPath
    const tags = normalizeTags(concept.data.tags)

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
