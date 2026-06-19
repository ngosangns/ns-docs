#!/usr/bin/env node

// Orphaned-note detection, sourced from the okf-core bundle model
// (Requirement 11.8). Instead of self-parsing files, this script reads the
// bundle through okf-core's walkBundle and inspects each Concept's `body`
// for wikilinks.
//
// Robustness: reads the bundle through okf-core's `loadBundle`, which tries the
// strict walk first and transparently falls back to a per-file-tolerant walk
// when a file has unparseable YAML, so one bad file never crashes the tool.

const path = require("path")
const { loadBundle } = require("./okf-core")

const WORKSPACE_ROOT = path.join(__dirname, "..")

function extractLinks(body) {
  const linkRegex = /\[\[([^\]#]+)(?:#([^\]]+))?\]\]/g
  const links = []
  let match
  while ((match = linkRegex.exec(body)) !== null) {
    links.push(match[1].trim())
  }
  return links
}

function findOrphaned() {
  console.log("🔍 Finding orphaned notes...\n")

  const { concepts } = loadBundle(WORKSPACE_ROOT)
  const referencedFiles = new Set()
  const allFileNames = new Set()

  concepts.forEach(concept => {
    const fileName = path.basename(concept.relPath, ".md")
    allFileNames.add(fileName.toLowerCase())
    allFileNames.add(concept.relPath.replace(/\.md$/i, "").toLowerCase())
  })

  concepts.forEach(concept => {
    const links = extractLinks(concept.body)

    links.forEach(link => {
      const linkName = link.toLowerCase()
      const linkNameWithoutPath = path.basename(link).toLowerCase()

      if (allFileNames.has(linkName) || allFileNames.has(linkNameWithoutPath)) {
        referencedFiles.add(linkName)
        referencedFiles.add(linkNameWithoutPath)
      }
    })
  })

  const orphanedFiles = []

  concepts.forEach(concept => {
    const relativePath = concept.relPath
    const fileName = path.basename(relativePath, ".md").toLowerCase()
    const fullPath = relativePath.replace(/\.md$/i, "").toLowerCase()

    if (
      !referencedFiles.has(fileName) &&
      !referencedFiles.has(fullPath) &&
      !relativePath.includes("INDEX") &&
      !relativePath.includes("home")
    ) {
      orphanedFiles.push(relativePath)
    }
  })

  console.log("=".repeat(60))
  console.log("📋 ORPHANED NOTES")
  console.log("=".repeat(60))
  console.log(`\n📊 Summary:`)
  console.log(`   Total concepts: ${concepts.length}`)
  console.log(`   Orphaned files: ${orphanedFiles.length}`)

  if (orphanedFiles.length > 0) {
    console.log(`\n📄 Orphaned notes (not linked from anywhere):`)
    orphanedFiles.forEach(file => {
      console.log(`   ${file}`)
    })
  } else {
    console.log(`\n✅ No orphaned notes found!`)
  }

  console.log("\n" + "=".repeat(60))
}

findOrphaned()
