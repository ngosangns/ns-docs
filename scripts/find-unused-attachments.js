#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const WORKSPACE_ROOT = __dirname + "/.."
const IGNORE_DIRS = ["node_modules", ".git"]
const CLEAN_MODE = process.argv.includes("--clean")

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

function getAllAttachments(dir, fileList = []) {
  const attachmentsDir = path.join(dir, "Attachments")
  
  if (!fs.existsSync(attachmentsDir)) {
    return fileList
  }

  const files = fs.readdirSync(attachmentsDir)

  files.forEach(file => {
    const filePath = path.join(attachmentsDir, file)
    const stat = fs.statSync(filePath)

    if (stat.isFile()) {
      fileList.push(filePath)
    }
  })

  return fileList
}

function extractAttachmentReferences(content) {
  const linkRegex = /\[\[([^\]]+)\]\]/g
  const imageRegex = /!\[\[([^\]]+)\]\]/g
  const references = new Set()
  let match

  while ((match = linkRegex.exec(content)) !== null) {
    references.add(match[1].trim())
  }

  while ((match = imageRegex.exec(content)) !== null) {
    references.add(match[1].trim())
  }

  return references
}

function findUnusedAttachments() {
  console.log("🔍 Finding unused attachments...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const attachments = getAllAttachments(WORKSPACE_ROOT)
  const referencedAttachments = new Set()

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8")
    const references = extractAttachmentReferences(content)

    references.forEach(ref => {
      const refName = ref.toLowerCase()
      const refNameWithoutExt = path.basename(ref, path.extname(ref)).toLowerCase()
      referencedAttachments.add(refName)
      referencedAttachments.add(refNameWithoutExt)
    })
  })

  const unusedAttachments = []

  attachments.forEach(attachment => {
    const fileName = path.basename(attachment)
    const fileNameWithoutExt = path.basename(attachment, path.extname(attachment))
    const relativePath = path.relative(WORKSPACE_ROOT, attachment)

    if (
      !referencedAttachments.has(fileName.toLowerCase()) &&
      !referencedAttachments.has(fileNameWithoutExt.toLowerCase())
    ) {
      unusedAttachments.push(relativePath)
    }
  })

  console.log("=".repeat(60))
  console.log("📎 UNUSED ATTACHMENTS")
  console.log("=".repeat(60))
  console.log(`\n📊 Summary:`)
  console.log(`   Total attachments: ${attachments.length}`)
  console.log(`   Unused attachments: ${unusedAttachments.length}`)

  if (unusedAttachments.length > 0) {
    console.log(`\n📄 Unused attachments:`)
    unusedAttachments.forEach(file => {
      console.log(`   ${file}`)
    })

    if (CLEAN_MODE) {
      console.log(`\n🗑️  Cleaning unused attachments...`)
      let deletedCount = 0
      unusedAttachments.forEach(file => {
        try {
          const fullPath = path.join(WORKSPACE_ROOT, file)
          fs.unlinkSync(fullPath)
          deletedCount++
          console.log(`   ✓ Deleted: ${file}`)
        } catch (error) {
          console.error(`   ✗ Error deleting ${file}: ${error.message}`)
        }
      })
      console.log(`\n✅ Deleted ${deletedCount} unused attachments`)
    }
  } else {
    console.log(`\n✅ No unused attachments found!`)
  }

  console.log("\n" + "=".repeat(60))
}

findUnusedAttachments()

