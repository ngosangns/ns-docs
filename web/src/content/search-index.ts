import MiniSearch from "minisearch"
import type { Page } from "./types"
import { SEARCH_INDEX_OPTIONS, type SearchDoc } from "../lib/search-schema"

export function buildSearchIndexJson(pages: Page[]): string {
  const miniSearch = new MiniSearch<SearchDoc>(SEARCH_INDEX_OPTIONS)

  const docs: SearchDoc[] = pages.map(page => ({
    id: page.id,
    title: page.frontmatter.title,
    description: page.frontmatter.description ?? "",
    tags: page.frontmatter.tags.join(" "),
    body: page.bodyText,
    route: page.route
  }))

  miniSearch.addAll(docs)
  return JSON.stringify(miniSearch)
}
