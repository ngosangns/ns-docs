import fs from "node:fs"
import path from "node:path"
import { okfCore } from "../lib/okf-core"
import type { OkfConcept, OkfReservedFile } from "../types/okf-core"

export interface RawBundle {
  root: string
  concepts: OkfConcept[]
  reservedFiles: OkfReservedFile[]
  attachments: string[]
}

/**
 * Enumerates non-markdown files under the bundle root, reusing okf-core's own
 * ignore rules. Separate from walkBundleTolerant (which only tracks
 * concepts/reserved files) so a single bad-YAML concept never prevents the
 * attachment list from being collected.
 */
function walkAttachments(root: string): string[] {
  const attachments: string[] = []
  const dirs = [root]
  while (dirs.length > 0) {
    const dir = dirs.pop()!
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const absPath = path.join(dir, entry.name)
      const relPosix = okfCore.relPathOf(absPath, root)
      if (okfCore.isIgnoredPath(relPosix)) continue
      if (entry.isDirectory()) {
        dirs.push(absPath)
        continue
      }
      if (!entry.isFile() || okfCore.isMarkdown(entry.name)) continue
      attachments.push(relPosix)
    }
  }
  return attachments
}

export function loadRawBundle(repoRoot: string): RawBundle {
  const { root, concepts, reservedFiles } = okfCore.walkBundleTolerant(repoRoot)
  const attachments = walkAttachments(root)
  return { root, concepts, reservedFiles, attachments }
}
