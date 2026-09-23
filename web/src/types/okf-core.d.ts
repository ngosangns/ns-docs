// Shared shapes for the reused, untyped scripts/okf-core CommonJS library.
// Never edit scripts/okf-core itself from web/ — it is shared with the root
// content-quality tooling (links:check, conformance:check, etc.). See
// src/lib/okf-core.ts for how it's actually loaded.

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
