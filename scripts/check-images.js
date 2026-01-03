#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const WORKSPACE_ROOT = __dirname + "/.."
const IGNORE_DIRS = ["node_modules", ".git", "export", "backups"]
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

function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        getAllImageFiles(filePath, fileList)
      } else if (file === "Attachments" || dir.includes("Attachments")) {
        getAllImageFiles(filePath, fileList)
      }
    } else {
      const ext = path.extname(file).toLowerCase()
      if ([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(ext)) {
        fileList.push(filePath)
      }
    }
  })

  return fileList
}

function extractImageReferences(content) {
  const imageRegex = /!\[\[([^\]]+)\]\]/g
  const linkRegex = /\[\[([^\]]+\.(png|jpg|jpeg|gif|svg|webp))\]\]/gi
  const references = []
  let match

  while ((match = imageRegex.exec(content)) !== null) {
    references.push(match[1].trim())
  }

  while ((match = linkRegex.exec(content)) !== null) {
    references.push(match[1].trim())
  }

  return references
}

function findImageFile(imageName) {
  const allImages = getAllImageFiles(WORKSPACE_ROOT)
  const imageNameLower = imageName.toLowerCase()
  const imageNameWithoutExt = path.basename(imageName, path.extname(imageName)).toLowerCase()

  for (const img of allImages) {
    const fileName = path.basename(img).toLowerCase()
    const fileNameWithoutExt = path.basename(img, path.extname(img)).toLowerCase()

    if (
      fileName === imageNameLower ||
      fileNameWithoutExt === imageNameLower ||
      fileNameWithoutExt === imageNameWithoutExt
    ) {
      return true
    }
  }

  return false
}

function checkImages() {
  console.log("🖼️  Checking image references...\n")

  const mdFiles = getAllMarkdownFiles(WORKSPACE_ROOT)
  const brokenImages = []
  let totalImages = 0
  let validImages = 0

  const seenBroken = new Set()

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8")
    const relativePath = path.relative(WORKSPACE_ROOT, file)
    const imageRefs = extractImageReferences(content)

    imageRefs.forEach(imageRef => {
      totalImages++
      if (findImageFile(imageRef)) {
        validImages++
      } else {
        const key = `${relativePath}::${imageRef}`
        if (!seenBroken.has(key)) {
          seenBroken.add(key)
          brokenImages.push({
            file: relativePath,
            image: imageRef
          })
        }
      }
    })
  })

  if (BROKEN_ONLY) {
    if (brokenImages.length === 0) {
      console.log("✅ No broken image links found!")
    } else {
      console.log(`❌ Found ${brokenImages.length} broken image links:\n`)
      brokenImages.forEach(({ file, image }) => {
        console.log(`   ${file}`)
        console.log(`   → ![[${image}]]`)
        console.log("")
      })
    }
  } else {
    console.log("=".repeat(60))
    console.log("🖼️  IMAGE CHECK RESULTS")
    console.log("=".repeat(60))
    console.log(`\n📊 Summary:`)
    console.log(`   Total image references: ${totalImages}`)
    console.log(`   Valid images: ${validImages}`)
    console.log(`   Broken images: ${brokenImages.length}`)

    if (brokenImages.length > 0) {
      console.log(`\n❌ Broken image links:`)
      brokenImages.forEach(({ file, image }) => {
        console.log(`   ${file} → ![[${image}]]`)
      })
    } else {
      console.log(`\n✅ All image links are valid!`)
    }
    console.log("\n" + "=".repeat(60))
  }
}

checkImages()

