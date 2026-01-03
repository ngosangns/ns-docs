#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const WORKSPACE_ROOT = __dirname + "/.."
const IGNORE_DIRS = ["Attachments", "node_modules", ".git"]
const MISSING_ONLY = process.argv.includes("--missing")

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

function validateFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) {
    return { valid: false, error: "Missing frontmatter" }
  }

  const frontmatter = frontmatterMatch[1]
  const errors = []

  if (!frontmatter.includes("tags:")) {
    errors.push("Missing 'tags' field")
  }

  const tagsMatch = frontmatter.match(/tags:\s*\n((?:\s*-\s*[^\n]+\n?)+)/)
  if (tagsMatch) {
    const tags = tagsMatch[1].match(/-\s*([^\n]+)/g) || []
    if (tags.length === 0) {
      errors.push("Tags field is empty")
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors
  }
}

function validateAllFrontmatter() {
  console.log("🔍 Validating frontmatter...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const invalidFiles = []
  const missingFiles = []
  let validCount = 0

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8")
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const validation = validateFrontmatter(content)

    if (!validation.valid) {
      if (validation.error === "Missing frontmatter") {
        missingFiles.push(relativePath)
      } else {
        invalidFiles.push({
          file: relativePath,
          errors: validation.errors
        })
      }
    } else {
      validCount++
    }
  })

  if (MISSING_ONLY) {
    if (missingFiles.length === 0) {
      console.log("✅ All files have frontmatter!")
    } else {
      console.log(`❌ Found ${missingFiles.length} files without frontmatter:\n`)
      missingFiles.forEach(file => {
        console.log(`   ${file}`)
      })
    }
  } else {
    console.log("=".repeat(60))
    console.log("📋 FRONTMATTER VALIDATION")
    console.log("=".repeat(60))
    console.log(`\n📊 Summary:`)
    console.log(`   Total files: ${mdFiles.length}`)
    console.log(`   Valid frontmatter: ${validCount}`)
    console.log(`   Missing frontmatter: ${missingFiles.length}`)
    console.log(`   Invalid frontmatter: ${invalidFiles.length}`)

    if (missingFiles.length > 0) {
      console.log(`\n❌ Files without frontmatter:`)
      missingFiles.forEach(file => {
        console.log(`   ${file}`)
      })
    }

    if (invalidFiles.length > 0) {
      console.log(`\n⚠️  Files with invalid frontmatter:`)
      invalidFiles.forEach(({ file, errors }) => {
        console.log(`   ${file}`)
        errors.forEach(error => {
          console.log(`      - ${error}`)
        })
      })
    }

    if (missingFiles.length === 0 && invalidFiles.length === 0) {
      console.log(`\n✅ All files have valid frontmatter!`)
    }

    console.log("\n" + "=".repeat(60))
  }
}

validateAllFrontmatter()

