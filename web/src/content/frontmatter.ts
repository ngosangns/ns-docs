import path from "node:path"
import type { OkfConcept } from "../types/okf-core"
import type { PageFrontmatter } from "./types"

const KNOWN_KEYS = new Set(["type", "title", "description", "resource", "tags", "timestamp"])

function basenameNoExt(relPath: string): string {
  return path.basename(relPath).replace(/\.md$/i, "")
}

function firstHeading(body: string): string | undefined {
  return body.match(/^#\s+(.+?)\s*$/m)?.[1]
}

function asString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim() !== "") return value
  return undefined
}

function asTimestamp(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim() !== "") return value
  if (value instanceof Date) return value.toISOString()
  return undefined
}

export function normalizeFrontmatter(concept: OkfConcept): PageFrontmatter {
  const data = concept.data ?? {}

  const rawTags = data.tags
  const tags = Array.isArray(rawTags) ? rawTags.filter((t): t is string => typeof t === "string") : []

  const extra: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    if (!KNOWN_KEYS.has(key)) extra[key] = value
  }

  return {
    type: asString(data.type),
    title: asString(data.title) ?? firstHeading(concept.body) ?? basenameNoExt(concept.relPath),
    description: asString(data.description),
    tags,
    timestamp: asTimestamp(data.timestamp),
    resource: asString(data.resource),
    extra,
  }
}
