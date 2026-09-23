import { okfCore } from "../lib/okf-core"
import type { OkfBundleIndex } from "../types/okf-core"
import { loadRawBundle } from "./loader"
import { normalizeFrontmatter } from "./frontmatter"
import { renderMarkdown } from "./markdown"
import type { Page, NavNode, SiteGraph } from "./types"

function emptyNavNode(name: string, path: string): NavNode {
  return { name, path, children: [] }
}

function insertIntoNavTree(root: NavNode, page: Page) {
  const segments = page.id.split("/")
  let node = root
  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i]
    const childPath = node.path ? `${node.path}/${seg}` : seg
    let child = node.children.find(c => c.name === seg && !c.page)
    if (!child) {
      child = emptyNavNode(seg, childPath)
      node.children.push(child)
    }
    node = child
  }
  const leafName = segments[segments.length - 1]
  node.children.push({ name: leafName, path: page.id, page, children: [] })
}

function sortNavTree(node: NavNode) {
  node.children.sort((a, b) => {
    const aIsFolder = !a.page
    const bIsFolder = !b.page
    if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  })
  for (const child of node.children) sortNavTree(child)
}

/**
 * Loads the full site content graph: parses every Concept, resolves all
 * internal/wikilinks via okf-core, and derives backlinks/nav/tags as a
 * second pass over the parsed pages (both are inherently graph-wide, not
 * per-file, computations).
 */
export async function loadSiteGraph(repoRoot: string): Promise<SiteGraph> {
  const raw = loadRawBundle(repoRoot)
  const parseErrors = raw.concepts.filter(c => c.parseError).map(c => c.relPath)
  const validConcepts = raw.concepts.filter(c => !c.parseError)
  const bundleIndex: OkfBundleIndex = okfCore.buildIndex(validConcepts)
  const attachmentSet = new Set(raw.attachments.map(a => a.toLowerCase()))

  const pages: Page[] = []
  const forwardLinks = new Map<string, string[]>()

  for (const concept of validConcepts) {
    const frontmatter = normalizeFrontmatter(concept)
    const rendered = await renderMarkdown(
      concept.body,
      concept.id,
      bundleIndex,
      attachmentSet
    )
    pages.push({
      id: concept.id,
      route: "/" + encodeURI(concept.id),
      frontmatter,
      contentHtml: rendered.html,
      bodyText: rendered.bodyText,
      toc: rendered.toc,
      unresolvedLinks: rendered.unresolvedLinks,
      hadParseError: false
    })
    forwardLinks.set(concept.id, rendered.resolvedLinkIds)
  }

  pages.sort((a, b) => a.id.localeCompare(b.id))
  const pagesById = new Map(pages.map(p => [p.id, p]))

  const backlinks = new Map<string, string[]>()
  for (const [sourceId, targets] of forwardLinks) {
    for (const targetId of new Set(targets)) {
      if (targetId === sourceId) continue
      const list = backlinks.get(targetId) ?? []
      list.push(sourceId)
      backlinks.set(targetId, list)
    }
  }
  for (const list of backlinks.values()) list.sort((a, b) => a.localeCompare(b))

  const navTree = emptyNavNode("", "")
  for (const page of pages) insertIntoNavTree(navTree, page)
  sortNavTree(navTree)

  const tagIndex = new Map<string, string[]>()
  for (const page of pages) {
    for (const tag of page.frontmatter.tags) {
      const list = tagIndex.get(tag) ?? []
      list.push(page.id)
      tagIndex.set(tag, list)
    }
  }
  for (const list of tagIndex.values()) list.sort((a, b) => a.localeCompare(b))

  return {
    pages,
    pagesById,
    backlinks,
    navTree,
    tagIndex,
    attachments: raw.attachments,
    parseErrors
  }
}
