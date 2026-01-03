#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

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

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  return crypto.createHash("md5").update(content).digest("hex")
}

function findDuplicates() {
  console.log("🔍 Finding duplicate content...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const hashMap = new Map()
  const duplicates = []

  mdFiles.forEach(file => {
    const hash = getFileHash(file)
    const relativePath = path.relative(WORKSPACE_ROOT, file)

    if (hashMap.has(hash)) {
      if (!duplicates.find(d => d.hash === hash)) {
        duplicates.push({
          hash: hash,
          files: [hashMap.get(hash), relativePath]
        })
      } else {
        const dup = duplicates.find(d => d.hash === hash)
        dup.files.push(relativePath)
      }
    } else {
      hashMap.set(hash, relativePath)
    }
  })

  console.log("=".repeat(60))
  console.log("📋 DUPLICATE CONTENT")
  console.log("=".repeat(60))
  console.log(`\n📊 Summary:`)
  console.log(`   Total files: ${mdFiles.length}`)
  console.log(`   Duplicate groups: ${duplicates.length}`)

  if (duplicates.length > 0) {
    console.log(`\n📄 Duplicate files:`)
    duplicates.forEach((dup, index) => {
      console.log(`\n   Group ${index + 1}:`)
      dup.files.forEach(file => {
        console.log(`      - ${file}`)
      })
    })
  } else {
    console.log(`\n✅ No duplicate content found!`)
  }

  console.log("\n" + "=".repeat(60))
}

findDuplicates()

