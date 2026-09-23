/** Href for a Concept page, matching the bundle-relative `/Concept_Id` convention. */
export function pageHref(id: string): string {
  return "/" + encodeURI(id)
}

/** Href for a synthesized folder/section page (root path "" -> "/"). */
export function folderHref(path: string): string {
  return path === "" ? "/" : "/" + encodeURI(path)
}

export function tagIndexHref(): string {
  return "/tags"
}

export function tagHref(tag: string): string {
  return "/tags/" + encodeURIComponent(tag)
}

export function breadcrumbSegments(id: string): { name: string; path: string }[] {
  const parts = id.split("/")
  const segments: { name: string; path: string }[] = []
  let acc = ""
  for (const part of parts) {
    acc = acc ? `${acc}/${part}` : part
    segments.push({ name: part, path: acc })
  }
  return segments
}
