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

function extractTitle(content) {
  const frontmatterMatch = content.match(/^---\n[\s\S]*?---\n/)
  const contentWithoutFrontmatter = frontmatterMatch
    ? content.slice(frontmatterMatch[0].length)
    : content

  const headingMatch = contentWithoutFrontmatter.match(/^#\s+(.+)$/m)
  if (headingMatch) {
    return headingMatch[1].trim()
  }

  return null
}

function generateIndex() {
  console.log("📑 Generating index...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const index = {}

  mdFiles.forEach(file => {
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const dir = path.dirname(relativePath)
    const fileName = path.basename(relativePath, ".md")

    if (!index[dir]) {
      index[dir] = []
    }

    const content = fs.readFileSync(file, "utf8")
    const title = extractTitle(content) || fileName

    index[dir].push({
      file: relativePath,
      title: title,
      fileName: fileName
    })
  })

  let output = "# Workspace Index\n\n"
  output += `Generated on: ${new Date().toLocaleString()}\n\n`
  output += `Total files: ${mdFiles.length}\n\n`

  const sortedDirs = Object.keys(index).sort()

  sortedDirs.forEach(dir => {
    const dirName = dir === "." ? "Root" : dir
    output += `## ${dirName}\n\n`

    index[dir].sort((a, b) => a.fileName.localeCompare(b.fileName))

    index[dir].forEach(({ file, title }) => {
      output += `- [[${file.replace(/\.md$/, "")}|${title}]]\n`
    })

    output += "\n"
  })

  const indexPath = path.join(WORKSPACE_ROOT, "INDEX.md")
  fs.writeFileSync(indexPath, output, "utf8")

  console.log("✅ Index generated successfully!")
  console.log(`📄 Location: ${path.relative(WORKSPACE_ROOT, indexPath)}`)
}

generateIndex()

