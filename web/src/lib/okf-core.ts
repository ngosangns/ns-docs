// scripts/okf-core is a plain CommonJS library shared with the root content
// tooling (links:check, conformance:check, etc.) - see src/types/okf-core.d.ts
// for the ambient types.
//
// Loaded via Node's own `createRequire` rather than a normal ESM `import`
// because this file gets pulled in through two very different execution
// paths - the production build (real `node`/`tsx` process, via build.ts) and
// Vite's dev-mode SSR module runner (server.ssrLoadModule, a sandboxed
// evaluator with no global `require`) - and `createRequire` is the one
// loading mechanism that behaves identically, using real Node CJS semantics,
// under both.
import { createRequire } from "node:module"
import type {
  OkfBundleIndex,
  OkfConcept,
  OkfReservedFile
} from "../types/okf-core"

const require = createRequire(import.meta.url)

interface OkfCoreIndex {
  walkBundleTolerant: (rootDir: string) => {
    root: string
    concepts: OkfConcept[]
    reservedFiles: OkfReservedFile[]
  }
  buildIndex: (concepts: OkfConcept[]) => OkfBundleIndex
  normalizeLink: (
    rawLink: string,
    sourceId: string | null,
    bundleIndex: OkfBundleIndex
  ) => string | null
  resolveTarget: (
    rawLink: string,
    sourceId: string | null,
    bundleIndex: OkfBundleIndex
  ) => OkfConcept | null
  toPosix: (p: string) => string
  relPathOf: (absPath: string, rootDir: string) => string
  isIgnoredPath: (relPosix: string) => boolean
  isMarkdown: (name: string) => boolean
}

interface OkfCoreLinks {
  wikilinkRegex: () => RegExp
  markdownLinkRegex: () => RegExp
  isExternal: (s: string) => boolean
  isInternalMarkdownTarget: (target: string) => boolean
  normalizeLink: OkfCoreIndex["normalizeLink"]
  resolveTarget: OkfCoreIndex["resolveTarget"]
}

export const okfCore =
  require("../../../scripts/okf-core/index.js") as OkfCoreIndex
export const linksCore =
  require("../../../scripts/okf-core/links.js") as OkfCoreLinks
