export interface PageFrontmatter {
  type: string | undefined
  title: string
  description: string | undefined
  tags: string[]
  timestamp: string | undefined
  resource: string | undefined
  /** Unknown frontmatter keys (area, domain, topic, ...), preserved verbatim. */
  extra: Record<string, unknown>
}

export interface TocEntry {
  id: string
  text: string
  depth: number
}

export interface Page {
  /** Concept_Id: bundle-relative path without the .md extension. */
  id: string
  /** Bundle-relative link target, e.g. "/Technology/Cloud-DevOps/Tools/Reverse Proxy". */
  route: string
  frontmatter: PageFrontmatter
  contentHtml: string
  toc: TocEntry[]
  /** Forward links that failed to resolve to a Concept (raw targets, for build warnings). */
  unresolvedLinks: string[]
  hadParseError: boolean
}

export interface NavNode {
  /** Directory or concept name as it appears on disk. */
  name: string
  /** Bundle-relative path (no leading slash), "" for the root. */
  path: string
  page?: Page
  children: NavNode[]
}

export interface SiteGraph {
  pages: Page[]
  pagesById: Map<string, Page>
  /** conceptId -> ids of pages that link to it. */
  backlinks: Map<string, string[]>
  navTree: NavNode
  tagIndex: Map<string, string[]>
  attachments: string[]
  parseErrors: string[]
}
