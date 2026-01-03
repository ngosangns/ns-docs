#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const WORKSPACE_ROOT = __dirname + "/.."

function createBackup() {
  console.log("💾 Creating backup...\n")

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const backupDir = path.join(WORKSPACE_ROOT, "backups")
  const backupPath = path.join(backupDir, `backup-${timestamp}.tar.gz`)

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  try {
    const excludePatterns = [
      "--exclude=node_modules",
      "--exclude=.git",
      "--exclude=backups",
      "--exclude=export"
    ]

    const command = `tar -czf "${backupPath}" ${excludePatterns.join(" ")} -C "${WORKSPACE_ROOT}" .`
    execSync(command, { stdio: "pipe" })

    const stats = fs.statSync(backupPath)
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2)

    console.log("=".repeat(60))
    console.log("💾 BACKUP COMPLETE")
    console.log("=".repeat(60))
    console.log(`\n📊 Summary:`)
    console.log(`   Backup location: ${path.relative(WORKSPACE_ROOT, backupPath)}`)
    console.log(`   Backup size: ${sizeInMB} MB`)
    console.log("\n" + "=".repeat(60))
  } catch (error) {
    console.error("❌ Error creating backup:", error.message)
    process.exit(1)
  }
}

createBackup()

