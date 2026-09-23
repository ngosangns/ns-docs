import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"
import { visit } from "unist-util-visit"
import { toString as hastToString } from "hast-util-to-string"
import type { Root as MdastRoot, Link as MdastLink } from "mdast"
import type { Root as HastRoot, Element as HastElement } from "hast"
import { linksCore } from "../lib/okf-core"
import type { OkfBundleIndex } from "../types/okf-core"
import { rehypeShikiHighlight } from "./shiki-highlight"
import type { TocEntry } from "./types"

export interface RenderedMarkdown {
  html: string
  toc: TocEntry[]
  unresolvedLinks: string[]
  /** Concept_Ids this page successfully links to, for backlink computation. */
  resolvedLinkIds: string[]
  /** Plain-text extraction of the rendered body, for the search index. */
  bodyText: string
}

const FENCE_LINE = /^\s*(```|~~~)/

function routeToConceptId(route: string): string {
  return route.replace(/^\//, "").split("#")[0]
}

function splitAnchor(target: string): [string, string] {
  const idx = target.indexOf("#")
  return idx >= 0 ? [target.slice(0, idx), target.slice(idx)] : [target, ""]
}

/** decodeURI, tolerating malformed `%` sequences that aren't real escapes. */
function safeDecodeURI(target: string): string {
  try {
    return decodeURI(target)
  } catch {
    return target
  }
}

interface LinkResolution {
  href: string
  resolvedConceptId: string | null
  ok: boolean
}

/**
 * Resolves one internal link target to either a Concept (via okf-core, same
 * algorithm as `npm run links:check`) or a known attachment. Decoding the
 * target first makes this idempotent: re-running it on an already-resolved,
 * already-percent-encoded href (e.g. a wikilink's own output re-visited by
 * the markdown-link resolver) still matches the original literal-space
 * Concept_Id instead of failing to re-resolve.
 */
function resolveInternalTarget(
  rawTarget: string,
  sourceId: string,
  bundleIndex: OkfBundleIndex,
  attachmentSet: Set<string>
): LinkResolution {
  const decoded = safeDecodeURI(rawTarget)
  const resolved = linksCore.normalizeLink(decoded, sourceId, bundleIndex)
  if (resolved != null) {
    return {
      href: encodeURI(resolved),
      resolvedConceptId: routeToConceptId(resolved),
      ok: true
    }
  }

  const [beforeAnchor, anchor] = splitAnchor(decoded)
  if (beforeAnchor.startsWith("/")) {
    const relPath = beforeAnchor.slice(1)
    if (attachmentSet.has(relPath.toLowerCase())) {
      return {
        href: encodeURI(beforeAnchor) + anchor,
        resolvedConceptId: null,
        ok: true
      }
    }
  }

  return { href: rawTarget, resolvedConceptId: null, ok: false }
}

/**
 * Converts `[[target|alias]]` wikilinks into ordinary resolved markdown links
 * before the body reaches remark-parse. Operates line-by-line, skipping lines
 * inside fenced code blocks (mirroring check-links.js's own stripCodeFences
 * precaution) so bracket sequences inside code samples, e.g. a regex like
 * `(\[[^\]]+\])?`, are never mistaken for a wikilink.
 */
function preprocessWikilinks(
  body: string,
  sourceId: string,
  bundleIndex: OkfBundleIndex,
  attachmentSet: Set<string>,
  unresolvedLinks: string[],
  resolvedLinkIds: string[]
): string {
  let inFence = false
  const lines = body.split(/\r?\n/).map(line => {
    if (FENCE_LINE.test(line)) {
      inFence = !inFence
      return line
    }
    if (inFence) return line

    return wrapSpacedLinkTargets(line).replace(
      linksCore.wikilinkRegex(),
      (_full: string, inner: string) => {
        const [rawTarget = "", rawAlias] = inner.split("|")
        const target = rawTarget.trim()
        const label = (rawAlias ?? rawTarget).trim()
        const resolution = resolveInternalTarget(
          target,
          sourceId,
          bundleIndex,
          attachmentSet
        )
        if (!resolution.ok) {
          unresolvedLinks.push(target)
          return `[${label}](#unresolved-link "Unresolved wikilink: ${target}")`
        }
        if (resolution.resolvedConceptId)
          resolvedLinkIds.push(resolution.resolvedConceptId)
        return `[${label}](${resolution.href})`
      }
    )
  })
  return lines.join("\n")
}

const SPACED_LINK_TARGET = /\]\(([^<>"'()]* [^<>"'()]*)\)/g

/**
 * Wraps link destinations containing literal spaces in angle brackets so
 * remark-parse accepts them (`[a](/b c)` is not a valid CommonMark link and
 * would render as raw text). The vault's authoring convention writes
 * bundle-relative targets with literal spaces (`/English/Grammar/Concepts/...
 * `), which okf-core resolves fine — this makes the render pipeline equally
 * tolerant. Destinations with quotes (a `"title"` part) or brackets are left
 * untouched.
 */
function wrapSpacedLinkTargets(line: string): string {
  return line.replace(SPACED_LINK_TARGET, "](<$1>)")
}

function remarkResolveInternalLinks(
  sourceId: string,
  bundleIndex: OkfBundleIndex,
  attachmentSet: Set<string>,
  unresolvedLinks: string[],
  resolvedLinkIds: string[]
) {
  return (tree: MdastRoot) => {
    visit(tree, "link", (node: MdastLink) => {
      if (!linksCore.isInternalMarkdownTarget(node.url)) return
      const resolution = resolveInternalTarget(
        node.url,
        sourceId,
        bundleIndex,
        attachmentSet
      )
      if (!resolution.ok) {
        unresolvedLinks.push(node.url)
        return
      }
      if (resolution.resolvedConceptId)
        resolvedLinkIds.push(resolution.resolvedConceptId)
      node.url = resolution.href
    })
  }
}

/**
 * Drops a leading top-level `# Heading` from the body: the page shell
 * (Layout) already renders the frontmatter title as the page's one H1, so an
 * identical/near-identical leading heading in the body would just duplicate
 * it (the repo's Concept convention is `# <Title>` as the body's first line).
 */
function remarkStripLeadingH1() {
  return (tree: MdastRoot) => {
    const first = tree.children[0]
    if (first && first.type === "heading" && first.depth === 1) {
      tree.children.shift()
    }
  }
}

function rehypeCollectToc(toc: TocEntry[]) {
  return (tree: HastRoot) => {
    visit(tree, "element", (node: HastElement) => {
      const match = /^h([1-6])$/.exec(node.tagName)
      if (!match) return
      const id = node.properties?.id
      if (typeof id !== "string" || id === "") return
      toc.push({ id, text: hastToString(node), depth: Number(match[1]) })
    })
  }
}

function rehypeCollectText(out: { text: string }) {
  return (tree: HastRoot) => {
    out.text = hastToString(tree).replace(/\s+/g, " ").trim()
  }
}

export async function renderMarkdown(
  body: string,
  sourceId: string,
  bundleIndex: OkfBundleIndex,
  attachmentSet: Set<string>
): Promise<RenderedMarkdown> {
  const unresolvedLinks: string[] = []
  const resolvedLinkIds: string[] = []
  const toc: TocEntry[] = []
  const textOut = { text: "" }

  const preprocessed = preprocessWikilinks(
    body,
    sourceId,
    bundleIndex,
    attachmentSet,
    unresolvedLinks,
    resolvedLinkIds
  )

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkStripLeadingH1)
    .use(
      remarkResolveInternalLinks,
      sourceId,
      bundleIndex,
      attachmentSet,
      unresolvedLinks,
      resolvedLinkIds
    )
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeCollectToc, toc)
    .use(rehypeKatex, { strict: false })
    .use(rehypeShikiHighlight)
    .use(rehypeCollectText, textOut)
    .use(rehypeStringify)
    .process(preprocessed)

  return {
    html: String(file),
    toc,
    unresolvedLinks,
    resolvedLinkIds,
    bodyText: textOut.text
  }
}
