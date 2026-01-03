#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const WORKSPACE_ROOT = __dirname + "/.."
const IGNORE_DIRS = ["Attachments", "node_modules", ".git", "scripts"]

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

function exportWorkspace() {
  console.log("📦 Exporting workspace...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const exportDir = path.join(WORKSPACE_ROOT, "export")
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const exportPath = path.join(exportDir, `export-${timestamp}`)

  if (!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath, { recursive: true })
  }

  let exportedCount = 0

  mdFiles.forEach(file => {
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const targetPath = path.join(exportPath, relativePath)
    const targetDir = path.dirname(targetPath)

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    fs.copyFileSync(file, targetPath)
    exportedCount++
  })

  console.log("=".repeat(60))
  console.log("📦 EXPORT COMPLETE")
  console.log("=".repeat(60))
  console.log(`\n📊 Summary:`)
  console.log(`   Files exported: ${exportedCount}`)
  console.log(`   Export location: ${path.relative(WORKSPACE_ROOT, exportPath)}`)
  console.log("\n" + "=".repeat(60))
}

exportWorkspace()

