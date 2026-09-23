import { createSignal, For, Show, onMount, onCleanup } from "solid-js"
import type MiniSearch from "minisearch"
import { SEARCH_INDEX_OPTIONS, type SearchDoc } from "../lib/search-schema"

// Only fields declared in SEARCH_INDEX_OPTIONS.storeFields (plus id/score)
// actually come back from MiniSearch#search - not the full SearchDoc.
type SearchResult = Pick<SearchDoc, "title" | "description" | "route"> & {
  id: string
  score: number
}

let indexPromise: Promise<MiniSearch<SearchDoc>> | null = null

function loadIndex(): Promise<MiniSearch<SearchDoc>> {
  if (!indexPromise) {
    indexPromise = Promise.all([
      import("minisearch").then(m => m.default),
      fetch("/search-index.json").then(r => r.text())
    ]).then(([MiniSearch, json]) =>
      MiniSearch.loadJSON<SearchDoc>(json, SEARCH_INDEX_OPTIONS)
    )
  }
  return indexPromise
}

export function SearchOverlay(props: { triggerId: string }) {
  const [isOpen, setIsOpen] = createSignal(false)
  const [query, setQuery] = createSignal("")
  const [results, setResults] = createSignal<SearchResult[]>([])
  const [loading, setLoading] = createSignal(false)
  let inputRef: HTMLInputElement | undefined

  const open = () => {
    setIsOpen(true)
    setLoading(true)
    loadIndex().then(() => setLoading(false))
    queueMicrotask(() => inputRef?.focus())
  }
  const close = () => {
    setIsOpen(false)
    setQuery("")
    setResults([])
  }

  const runQuery = async (q: string) => {
    setQuery(q)
    if (q.trim() === "") {
      setResults([])
      return
    }
    const index = await loadIndex()
    const hits = index.search(q).slice(0, 20) as unknown as SearchResult[]
    setResults(hits)
  }

  onMount(() => {
    const trigger = document.getElementById(props.triggerId)
    trigger?.addEventListener("click", open)

    const onKeydown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)

      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !typing)
      ) {
        e.preventDefault()
        isOpen() ? close() : open()
        return
      }
      if (e.key === "Escape" && isOpen()) {
        close()
      }
    }
    document.addEventListener("keydown", onKeydown)
    onCleanup(() => {
      trigger?.removeEventListener("click", open)
      document.removeEventListener("keydown", onKeydown)
    })
  })

  return (
    <Show when={isOpen()}>
      <div
        class="search-overlay"
        role="dialog"
        aria-modal="true"
        onClick={close}
      >
        <div class="search-panel" onClick={e => e.stopPropagation()}>
          <input
            ref={inputRef}
            class="search-input"
            type="text"
            placeholder="Search the knowledge base…"
            value={query()}
            onInput={e => runQuery(e.currentTarget.value)}
          />
          <Show when={loading()}>
            <p class="search-status">Loading index…</p>
          </Show>
          <Show
            when={!loading() && query().trim() !== "" && results().length === 0}
          >
            <p class="search-status">No results.</p>
          </Show>
          <ul class="search-results">
            <For each={results()}>
              {result => (
                <li>
                  <a href={result.route} onClick={close}>
                    <span class="search-results__title">{result.title}</span>
                    <Show when={result.description}>
                      <span class="search-results__desc">
                        {result.description}
                      </span>
                    </Show>
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </Show>
  )
}
