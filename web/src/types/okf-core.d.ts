// Ambient types for the reused, untyped scripts/okf-core CommonJS library.
// Only the functions actually consumed by the site build are declared here.
// Never edit scripts/okf-core itself from web/ — it is shared with the root
// content-quality tooling (links:check, conformance:check, etc.).

export interface OkfConcept {
  id: string
  absPath: string
  relPath: string
  data: Record<string, unknown>
  body: string
  hadFrontmatter: boolean
  parseError?: boolean
}

export interface OkfReservedFile {
  relPath: string
  absPath: string
  name: string
  isRoot: boolean
  data: Record<string, unknown>
  body: string
  hadFrontmatter: boolean
  parseError: boolean
}

export type OkfBundleIndex = Map<string, OkfConcept>

declare module "*okf-core/index.js" {
  export function walkBundleTolerant(rootDir: string): {
    root: string
    concepts: OkfConcept[]
    reservedFiles: OkfReservedFile[]
  }
  export function buildIndex(concepts: OkfConcept[]): OkfBundleIndex
  export function normalizeLink(
    rawLink: string,
    sourceId: string | null,
    bundleIndex: OkfBundleIndex,
  ): string | null
  export function resolveTarget(
    rawLink: string,
    sourceId: string | null,
    bundleIndex: OkfBundleIndex,
  ): OkfConcept | null
  export function toPosix(p: string): string
  export function relPathOf(absPath: string, rootDir: string): string
  export function isIgnoredPath(relPosix: string): boolean
  export function isMarkdown(name: string): boolean
}

declare module "*okf-core/links.js" {
  export function wikilinkRegex(): RegExp
  export function markdownLinkRegex(): RegExp
  export function isExternal(s: string): boolean
  export function isInternalMarkdownTarget(target: string): boolean
  export function normalizeLink(
    rawLink: string,
    sourceId: string | null,
    bundleIndex: OkfBundleIndex,
  ): string | null
  export function resolveTarget(
    rawLink: string,
    sourceId: string | null,
    bundleIndex: OkfBundleIndex,
  ): OkfConcept | null
}
