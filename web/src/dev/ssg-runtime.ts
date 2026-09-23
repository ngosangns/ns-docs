// Loaded exclusively via `server.ssrLoadModule()` from vite.config.ts's dev
// plugin, never via a plain import - vite.config.ts itself is bundled by
// esbuild at config-load time, which would inline this whole content
// pipeline (js-yaml and all) into a single file and break Node module
// resolution. Going through Vite's own SSR module graph instead resolves
// everything correctly, same as a real request would.
import { loadSiteGraph } from "../content/site-graph"
import { buildSearchIndexJson } from "../content/search-index"
import { findNode } from "../content/nav"
import {
  renderConceptPage,
  renderFolderPage,
  renderTagIndexPage,
  renderTagPage,
  renderNotFoundPage
} from "../entry-server"
import type { Page, SiteGraph } from "../content/types"

let graphPromise: Promise<SiteGraph> | null = null

export function invalidateGraph() {
  graphPromise = null
}

function getGraph(repoRoot: string): Promise<SiteGraph> {
  if (!graphPromise) graphPromise = loadSiteGraph(repoRoot)
  return graphPromise
}

const DEV_ASSETS = { cssHref: "", jsHref: "/src/client-entry.ts" }

export interface DevResponse {
  status: number
  contentType: string
  body: string
}

function html(body: string, status = 200): DevResponse {
  return { status, contentType: "text/html", body }
}

export async function handleRequest(
  pathname: string,
  repoRoot: string
): Promise<DevResponse> {
  const graph = await getGraph(repoRoot)

  if (pathname === "/search-index.json") {
    return {
      status: 200,
      contentType: "application/json",
      body: buildSearchIndexJson(graph.pages)
    }
  }

  const trimmed = pathname.replace(/^\/+|\/+$/g, "")

  if (trimmed === "tags") {
    const tags = [...graph.tagIndex.entries()]
      .map(([tag, ids]) => ({ tag, count: ids.length }))
      .sort((a, b) => a.tag.localeCompare(b.tag))
    return html(
      renderTagIndexPage({ tags, navTree: graph.navTree, ...DEV_ASSETS })
    )
  }
  if (trimmed.startsWith("tags/")) {
    const tag = decodeURIComponent(trimmed.slice("tags/".length))
    const ids = graph.tagIndex.get(tag)
    if (ids) {
      const pages = ids
        .map(id => graph.pagesById.get(id))
        .filter((p): p is Page => p != null)
      return html(
        renderTagPage({ tag, pages, navTree: graph.navTree, ...DEV_ASSETS })
      )
    }
  }

  const page = graph.pagesById.get(trimmed)
  if (page) {
    const backlinks = (graph.backlinks.get(page.id) ?? [])
      .map(id => graph.pagesById.get(id))
      .filter((p): p is Page => p != null)
      .map(p => ({ id: p.id, title: p.frontmatter.title }))
    return html(
      renderConceptPage({
        page,
        navTree: graph.navTree,
        backlinks,
        ...DEV_ASSETS
      })
    )
  }

  const folderNode = findNode(graph.navTree, trimmed)
  if (folderNode && !folderNode.page) {
    return html(
      renderFolderPage({
        node: folderNode,
        navTree: graph.navTree,
        ...DEV_ASSETS
      })
    )
  }

  return html(
    renderNotFoundPage({ navTree: graph.navTree, ...DEV_ASSETS }),
    404
  )
}
