import { build } from "vite"
import solid from "vite-plugin-solid"
import { fileURLToPath } from "node:url"
import path from "node:path"
import fs from "node:fs/promises"
import { loadSiteGraph } from "./src/content/site-graph"
import type { Page } from "./src/content/types"

const webRoot = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(webRoot, "..")
const distDir = path.join(webRoot, "dist")
const ssrOutDir = path.join(webRoot, ".ssr-build")

interface SsrBundle {
  renderConceptPage: (page: Page) => string
}

async function buildSsrBundle(): Promise<SsrBundle> {
  await build({
    root: webRoot,
    plugins: [solid({ ssr: true })],
    build: {
      ssr: path.join(webRoot, "src/entry-server.tsx"),
      outDir: ssrOutDir,
      emptyOutDir: true,
      minify: false,
      rollupOptions: {
        output: { entryFileNames: "entry-server.js" },
      },
    },
    logLevel: "warn",
  })

  return import(path.join(ssrOutDir, "entry-server.js"))
}

async function copyAttachments(attachments: string[]) {
  for (const rel of attachments) {
    const src = path.join(repoRoot, rel)
    const dest = path.join(distDir, rel)
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(src, dest)
  }
}

async function main() {
  const startedAt = Date.now()

  const [{ renderConceptPage }, graph] = await Promise.all([
    buildSsrBundle(),
    loadSiteGraph(repoRoot),
  ])

  await fs.rm(distDir, { recursive: true, force: true })
  await fs.mkdir(distDir, { recursive: true })

  let failed = 0
  for (const page of graph.pages) {
    try {
      const html = renderConceptPage(page)
      const outDir = path.join(distDir, page.id)
      await fs.mkdir(outDir, { recursive: true })
      await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8")
    } catch (err) {
      failed++
      console.error(`Failed to render ${page.id}:`, err)
    }
  }

  await copyAttachments(graph.attachments)

  const totalUnresolved = graph.pages.reduce((n, p) => n + p.unresolvedLinks.length, 0)
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1)

  console.log(`\nBuild summary (${elapsed}s):`)
  console.log(`  Pages rendered: ${graph.pages.length - failed}/${graph.pages.length}`)
  console.log(`  Attachments copied: ${graph.attachments.length}`)
  console.log(`  Frontmatter parse errors: ${graph.parseErrors.length}`)
  if (graph.parseErrors.length > 0) {
    for (const p of graph.parseErrors) console.log(`    - ${p}`)
  }
  console.log(`  Unresolved internal links: ${totalUnresolved}`)
  if (totalUnresolved > 0) {
    for (const page of graph.pages) {
      for (const link of page.unresolvedLinks) {
        console.log(`    - ${page.id}: "${link}"`)
      }
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} page(s) failed to render.`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
