import type MiniSearch from "minisearch"

export interface SearchDoc {
  id: string
  title: string
  description: string
  tags: string
  body: string
  route: string
}

/** Shared between the build-time indexer and the client search island so
 * `MiniSearch.loadJSON` reconstructs an index with matching field config. */
export const SEARCH_INDEX_OPTIONS: ConstructorParameters<
  typeof MiniSearch<SearchDoc>
>[0] = {
  fields: ["title", "description", "tags", "body"],
  storeFields: ["title", "description", "route"],
  searchOptions: {
    boost: { title: 4, description: 2, tags: 2, body: 1 },
    prefix: true,
    fuzzy: 0.2
  }
}
