import { build } from "vite"
import solid from "vite-plugin-solid"
import { fileURLToPath } from "node:url"
import path from "node:path"
import fs from "node:fs/promises"
import { loadSiteGraph } from "./src/content/site-graph"
import { collectFolderNodes } from "./src/content/nav"
import { buildSearchIndexJson } from "./src/content/search-index"
import {
  buildSitemapXml,
  buildRssXml,
  buildRobotsTxt
} from "./src/content/feeds"
import type { Page, NavNode, SiteGraph } from "./src/content/types"
import type { ConceptPageProps } from "./src/pages/ConceptPage"
import type { FolderPageProps } from "./src/pages/FolderPage"
import type { TagIndexPageProps } from "./src/pages/TagIndexPage"
import type { TagPageProps } from "./src/pages/TagPage"

const webRoot = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(webRoot, "..")
const distDir = path.join(webRoot, "dist")
const ssrOutDir = path.join(webRoot, ".ssr-build")

interface SsrBundle {
  renderConceptPage: (props: ConceptPageProps) => string
  renderFolderPage: (props: FolderPageProps) => string
  renderTagIndexPage: (props: TagIndexPageProps) => string
  renderTagPage: (props: TagPageProps) => string
  renderNotFoundPage: (props: {
    navTree: NavNode
    cssHref: string
    jsHref: string
  }) => string
}

interface ViteManifestChunk {
  file: string
  css?: string[]
  isEntry?: boolean
}

/** Client build: bundles src/client-entry.ts (CSS + fonts for now, islands
 * land in a later phase) into dist/assets/**, with a manifest so the SSR
 * step can look up the resulting hashed CSS/JS filenames. Runs first since
 * it owns emptying/recreating dist/. */
async function buildClientAssets(): Promise<{
  cssHref: string
  jsHref: string
}> {
  await build({
    root: webRoot,
    plugins: [solid()],
    build: {
      outDir: distDir,
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: path.join(webRoot, "src/client-entry.ts")
      }
    },
    logLevel: "warn"
  })

  const manifestPath = path.join(distDir, ".vite", "manifest.json")
  const manifest = JSON.parse(
    await fs.readFile(manifestPath, "utf-8")
  ) as Record<string, ViteManifestChunk>
  const entry = manifest["src/client-entry.ts"]
  const cssFile = entry?.css?.[0]
  if (!cssFile || !entry.file) {
    throw new Error("Client build produced no CSS/JS for src/client-entry.ts")
  }
  return { cssHref: "/" + cssFile, jsHref: "/" + entry.file }
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
        output: { entryFileNames: "entry-server.js" }
      }
    },
    logLevel: "warn"
  })

  return import(path.join(ssrOutDir, "entry-server.js"))
}

// Cloudflare Pages rejects any single deployed file over 25 MiB.
const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024

async function copyAttachments(attachments: string[]): Promise<string[]> {
  const skipped: string[] = []
  for (const rel of attachments) {
    const src = path.join(repoRoot, rel)
    const { size } = await fs.stat(src)
    if (size > MAX_ATTACHMENT_BYTES) {
      skipped.push(rel)
      continue
    }
    const dest = path.join(distDir, rel)
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(src, dest)
  }
  return skipped
}

async function writeHtml(outPath: string, html: string) {
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, html, "utf-8")
}

function backlinksFor(graph: SiteGraph, page: Page) {
  const ids = graph.backlinks.get(page.id) ?? []
  return ids
    .map(id => graph.pagesById.get(id))
    .filter((p): p is Page => p != null)
    .map(p => ({ id: p.id, title: p.frontmatter.title }))
}

async function main() {
  const startedAt = Date.now()

  const [assets, ssrBundle, graph] = await Promise.all([
    buildClientAssets(),
    buildSsrBundle(),
    loadSiteGraph(repoRoot)
  ])
  const { cssHref, jsHref } = assets

  let failed = 0
  const fail = (label: string, err: unknown) => {
    failed++
    console.error(`Failed to render ${label}:`, err)
  }

  // Concept pages
  for (const page of graph.pages) {
    try {
      const html = ssrBundle.renderConceptPage({
        page,
        navTree: graph.navTree,
        backlinks: backlinksFor(graph, page),
        cssHref,
        jsHref
      })
      await writeHtml(path.join(distDir, page.id, "index.html"), html)
    } catch (err) {
      fail(page.id, err)
    }
  }

  // Folder pages (root included -> dist/index.html)
  for (const node of collectFolderNodes(graph.navTree)) {
    try {
      const html = ssrBundle.renderFolderPage({
        node,
        navTree: graph.navTree,
        cssHref,
        jsHref
      })
      const outPath =
        node.path === ""
          ? path.join(distDir, "index.html")
          : path.join(distDir, node.path, "index.html")
      await writeHtml(outPath, html)
    } catch (err) {
      fail(node.path || "(root)", err)
    }
  }

  // Tag pages
  const tagCounts = [...graph.tagIndex.entries()]
    .map(([tag, ids]) => ({ tag, count: ids.length }))
    .sort((a, b) => a.tag.localeCompare(b.tag))
  try {
    const html = ssrBundle.renderTagIndexPage({
      tags: tagCounts,
      navTree: graph.navTree,
      cssHref,
      jsHref
    })
    await writeHtml(path.join(distDir, "tags", "index.html"), html)
  } catch (err) {
    fail("tags index", err)
  }
  for (const [tag, ids] of graph.tagIndex) {
    try {
      const pages = ids
        .map(id => graph.pagesById.get(id))
        .filter((p): p is Page => p != null)
      const html = ssrBundle.renderTagPage({
        tag,
        pages,
        navTree: graph.navTree,
        cssHref,
        jsHref
      })
      await writeHtml(path.join(distDir, "tags", tag, "index.html"), html)
    } catch (err) {
      fail(`tags/${tag}`, err)
    }
  }

  // 404
  try {
    const html = ssrBundle.renderNotFoundPage({
      navTree: graph.navTree,
      cssHref,
      jsHref
    })
    await writeHtml(path.join(distDir, "404.html"), html)
  } catch (err) {
    fail("404", err)
  }

  await fs.writeFile(
    path.join(distDir, "search-index.json"),
    buildSearchIndexJson(graph.pages),
    "utf-8"
  )
  await fs.writeFile(
    path.join(distDir, "sitemap.xml"),
    buildSitemapXml(graph.pages),
    "utf-8"
  )
  await fs.writeFile(
    path.join(distDir, "rss.xml"),
    buildRssXml(graph.pages),
    "utf-8"
  )
  await fs.writeFile(
    path.join(distDir, "robots.txt"),
    buildRobotsTxt(),
    "utf-8"
  )

  const skippedAttachments = await copyAttachments(graph.attachments)

  const totalUnresolved = graph.pages.reduce(
    (n, p) => n + p.unresolvedLinks.length,
    0
  )
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1)

  console.log(`\nBuild summary (${elapsed}s):`)
  console.log(`  Concept pages: ${graph.pages.length}`)
  console.log(`  Folder pages: ${collectFolderNodes(graph.navTree).length}`)
  console.log(`  Tags: ${graph.tagIndex.size}`)
  console.log(
    `  Attachments copied: ${graph.attachments.length - skippedAttachments.length}/${graph.attachments.length}`
  )
  if (skippedAttachments.length > 0) {
    console.log(`  Skipped (over 25 MiB, Cloudflare Pages limit):`)
    for (const rel of skippedAttachments) console.log(`    - ${rel}`)
  }
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

main().catch(err => {
  console.error(err)
  process.exit(1)
})
