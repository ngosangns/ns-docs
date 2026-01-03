#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const WORKSPACE_ROOT = __dirname + "/.."
const IGNORE_DIRS = ["Attachments", "node_modules", ".git"]
const BROKEN_ONLY = process.argv.includes("--broken")

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

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        getAllFiles(filePath, fileList)
      } else if (file === "Attachments") {
        getAllFiles(filePath, fileList)
      }
    } else {
      fileList.push(filePath)
    }
  })

  return fileList
}

function getAllFileNames() {
  const allFiles = getAllFiles(WORKSPACE_ROOT)
  const fileNames = new Set()

  allFiles.forEach(file => {
    const fileName = path.basename(file)
    const fileNameWithoutExt = path.basename(file, path.extname(file))
    fileNames.add(fileName.toLowerCase())
    fileNames.add(fileNameWithoutExt.toLowerCase())
  })

  return fileNames
}

function findNoteFile(linkName) {
  const fileNames = getAllFileNames()
  const linkNameLower = linkName.toLowerCase()
  
  if (fileNames.has(linkNameLower)) {
    return true
  }

  const linkNameWithoutPath = path.basename(linkName).toLowerCase()
  if (fileNames.has(linkNameWithoutPath)) {
    return true
  }

  const linkNameWithoutExt = path.basename(linkName, path.extname(linkName)).toLowerCase()
  if (fileNames.has(linkNameWithoutExt)) {
    return true
  }

  return false
}

function checkLinks() {
  console.log("🔍 Checking links in workspace...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const brokenLinks = []
  let totalLinks = 0
  let validLinks = 0

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8")
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const linkRegex = /\[\[([^\]#]+)(?:#([^\]]+))?\]\]/g
    let match

    while ((match = linkRegex.exec(content)) !== null) {
      totalLinks++
      const linkName = match[1].trim()
      const anchor = match[2]

      if (linkName === "") continue

      const fileExists = findNoteFile(linkName)

      if (!fileExists) {
        brokenLinks.push({
          file: relativePath,
          link: linkName,
          anchor: anchor || null
        })
      } else {
        validLinks++
      }
    }
  })

  if (BROKEN_ONLY) {
    if (brokenLinks.length === 0) {
      console.log("✅ No broken links found!")
    } else {
      console.log(`❌ Found ${brokenLinks.length} broken links:\n`)
      brokenLinks.forEach(({ file, link, anchor }) => {
        const anchorStr = anchor ? `#${anchor}` : ""
        console.log(`   ${file}`)
        console.log(`   → [[${link}${anchorStr}]]`)
        console.log("")
      })
    }
  } else {
    console.log("=".repeat(60))
    console.log("🔗 LINK CHECK RESULTS")
    console.log("=".repeat(60))
    console.log(`\n📊 Summary:`)
    console.log(`   Total links: ${totalLinks}`)
    console.log(`   Valid links: ${validLinks}`)
    console.log(`   Broken links: ${brokenLinks.length}`)

    if (brokenLinks.length > 0) {
      console.log(`\n❌ Broken links:`)
      brokenLinks.forEach(({ file, link, anchor }) => {
        const anchorStr = anchor ? `#${anchor}` : ""
        console.log(`   ${file} → [[${link}${anchorStr}]]`)
      })
    } else {
      console.log(`\n✅ All links are valid!`)
    }
    console.log("\n" + "=".repeat(60))
  }
}

checkLinks()

