#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const WORKSPACE_ROOT = __dirname + "/.."
const IGNORE_DIRS = ["Attachments", "node_modules", ".git", "export", "backups", "scripts"]

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
  const linkRegex = /\[\[([^\]#]+)(?:#([^\]]+))?\]\]/g
  const links = []
  let match
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1].trim())
  }
  return links
}

function findOrphaned() {
  console.log("🔍 Finding orphaned notes...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const referencedFiles = new Set()
  const allFileNames = new Set()

  mdFiles.forEach(file => {
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const fileName = path.basename(file, ".md")
    allFileNames.add(fileName.toLowerCase())
    allFileNames.add(relativePath.replace(/\.md$/, "").toLowerCase())
  })

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8")
    const links = extractLinks(content)

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

  mdFiles.forEach(file => {
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const fileName = path.basename(file, ".md").toLowerCase()
    const fullPath = relativePath.replace(/\.md$/, "").toLowerCase()

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
  console.log(`   Total files: ${mdFiles.length}`)
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

