#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { spawnSync } = require("child_process")

const root = path.resolve(__dirname, "..")
const staticDir = path.join(root, "web", "static")
const distDir = path.join(root, "web", "dist")

fs.rmSync(distDir, { recursive: true, force: true })
fs.mkdirSync(distDir, { recursive: true })
fs.cpSync(staticDir, distDir, { recursive: true })

const result = spawnSync(
  process.execPath,
  [path.join(root, "scripts", "build-preview-data.js")],
  {
    cwd: root,
    stdio: "inherit"
  }
)
if (result.status !== 0) process.exit(result.status || 1)

console.log(`Built preview web: ${path.relative(root, distDir)}`)
