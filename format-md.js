#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const WORKSPACE_ROOT = __dirname
const CHECK_MODE = process.argv.includes("--check")

// Directories to ignore
const IGNORE_DIRS = ["Attachments", "node_modules", ".git", "web"]

function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Skip ignored directories
      if (!IGNORE_DIRS.includes(file)) {
        getAllMarkdownFiles(filePath, fileList)
      }
    } else if (file.endsWith(".md")) {
      fileList.push(filePath)
    }
  })

  return fileList
}

function formatFiles() {
  console.log("🔍 Scanning for markdown files...")
  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  console.log(`📄 Found ${mdFiles.length} markdown files\n`)

  if (mdFiles.length === 0) {
    console.log("No markdown files found.")
    return
  }

  let formattedCount = 0
  let errorCount = 0
  const errors = []

  mdFiles.forEach(file => {
    try {
      const relativePath = path.relative(WORKSPACE_ROOT, file)

      if (CHECK_MODE) {
        // Check mode: only verify formatting without changing files
        try {
          execSync(`npx prettier --check "${file}"`, {
            stdio: "pipe",
            cwd: WORKSPACE_ROOT
          })
          console.log(`✓ ${relativePath}`)
        } catch (error) {
          console.log(`✗ ${relativePath} (needs formatting)`)
          formattedCount++
        }
      } else {
        // Format mode: actually format the files
        execSync(`npx prettier --write "${file}"`, {
          stdio: "pipe",
          cwd: WORKSPACE_ROOT
        })
        console.log(`✓ Formatted: ${relativePath}`)
        formattedCount++
      }
    } catch (error) {
      errorCount++
      const relativePath = path.relative(WORKSPACE_ROOT, file)
      errors.push({ file: relativePath, error: error.message })
      console.error(`✗ Error formatting: ${relativePath}`)
    }
  })

  console.log("\n" + "=".repeat(50))
  if (CHECK_MODE) {
    console.log(`📊 Check complete:`)
    console.log(`   Files that need formatting: ${formattedCount}`)
  } else {
    console.log(`📊 Format complete:`)
    console.log(`   Files formatted: ${formattedCount}`)
  }
  console.log(`   Errors: ${errorCount}`)

  if (errors.length > 0) {
    console.log("\n❌ Errors:")
    errors.forEach(({ file, error }) => {
      console.log(`   ${file}: ${error}`)
    })
  }

  console.log("=".repeat(50))
}

// Check if prettier is available
try {
  execSync("npx prettier --version", { stdio: "pipe" })
} catch (error) {
  console.error("❌ Prettier is not installed. Please run: npm install")
  process.exit(1)
}

formatFiles()

