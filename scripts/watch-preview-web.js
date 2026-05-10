#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { spawn, spawnSync } = require("child_process")

const root = path.resolve(__dirname, "..")
const watchedRoots = [
  "English",
  "Life",
  "Projects",
  "Technology",
  "Travel",
  "inbox",
  "scripts",
  "web/static"
].map(part => path.join(root, part))

function build() {
  const result = spawnSync(
    process.execPath,
    [path.join(root, "scripts", "build-preview-web.js")],
    {
      cwd: root,
      stdio: "inherit"
    }
  )
  return result.status === 0
}

if (!build()) process.exit(1)

const vite = spawn("npx", ["vite", "--host", "127.0.0.1", "web/dist"], {
  cwd: root,
  stdio: "inherit"
})

let timer = null
function scheduleBuild() {
  clearTimeout(timer)
  timer = setTimeout(build, 250)
}

for (const dir of watchedRoots) {
  if (!fs.existsSync(dir)) continue
  fs.watch(dir, { recursive: true }, (_event, filename) => {
    if (!filename) return
    if (String(filename).includes("dist")) return
    scheduleBuild()
  })
}

process.on("SIGINT", () => {
  vite.kill("SIGINT")
  process.exit(0)
})
