import { initSidebarPersistence } from "./sidebar-persistence"
import { initSidebarResizer } from "./sidebar-resizer"
import { refreshTocScrollspy } from "./toc-scrollspy"
import { closeMobileNavIfOpen } from "./mobile-nav-drawer"
import { scrollActiveIntoView } from "./sidebar-scroll"

/**
 * Progressive-enhancement client-side navigation for a site that otherwise
 * has none: every URL is still a real, fully self-contained static HTML
 * page (direct loads, view-source, no-JS and search-engine crawling all
 * keep working exactly as before). When JS is available, internal link
 * clicks are intercepted, the target page is fetched and only its
 * `.site-shell` is swapped in - so the CSS/JS already loaded in this
 * document never reloads.
 */

const SHELL_SELECTOR = ".site-shell"
const MAX_CACHE_ENTRIES = 50
const PROGRESS_DELAY_MS = 150

interface PageEntry {
  title: string
  description: string | null
  shellHtml: string
}

interface HistoryState {
  scrollY: number
}

const cache = new Map<string, Promise<PageEntry>>()
let activeNavToken = 0
let progressTimer: ReturnType<typeof setTimeout> | null = null

function cacheKey(url: string): string {
  return url.split("#")[0]
}

async function fetchPage(url: string): Promise<PageEntry> {
  const key = cacheKey(url)
  const cached = cache.get(key)
  if (cached) return cached

  const promise = fetch(key, { headers: { "X-Soft-Nav": "1" } }).then(
    async res => {
      if (!res.ok)
        throw new Error(`Soft nav fetch failed: ${res.status} ${key}`)
      const html = await res.text()
      const doc = new DOMParser().parseFromString(html, "text/html")
      const shell = doc.querySelector(SHELL_SELECTOR)
      if (!shell) throw new Error(`Soft nav: no ${SHELL_SELECTOR} in ${key}`)
      return {
        title: doc.title,
        description:
          doc
            .querySelector('meta[name="description"]')
            ?.getAttribute("content") ?? null,
        shellHtml: shell.innerHTML
      }
    }
  )

  cache.set(key, promise)
  promise.catch(() => cache.delete(key))
  if (cache.size > MAX_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value
    if (oldest) cache.delete(oldest)
  }
  return promise
}

// --- Top loading bar: only appears if a fetch takes long enough to notice,
// so fast/cached navigations stay flicker-free. ---

function progressEl(): HTMLElement | null {
  return document.getElementById("nav-progress")
}

function startProgress() {
  progressTimer = setTimeout(() => {
    progressEl()?.classList.add("nav-progress--active")
  }, PROGRESS_DELAY_MS)
}

function finishProgress() {
  if (progressTimer) {
    clearTimeout(progressTimer)
    progressTimer = null
  }
  const el = progressEl()
  if (!el || !el.classList.contains("nav-progress--active")) return
  el.classList.add("nav-progress--done")
  setTimeout(
    () => el.classList.remove("nav-progress--active", "nav-progress--done"),
    250
  )
}

function applyPage(entry: PageEntry) {
  document.title = entry.title

  let descTag = document.querySelector('meta[name="description"]')
  if (entry.description) {
    if (!descTag) {
      descTag = document.createElement("meta")
      descTag.setAttribute("name", "description")
      document.head.appendChild(descTag)
    }
    descTag.setAttribute("content", entry.description)
  } else {
    descTag?.remove()
  }

  const shell = document.querySelector(SHELL_SELECTOR)
  if (shell) shell.innerHTML = entry.shellHtml

  initSidebarPersistence()
  initSidebarResizer()
  refreshTocScrollspy()
}

function scrollFor(url: string, restoreY: number | null) {
  const hash = new URL(url, location.href).hash
  if (restoreY != null) {
    window.scrollTo(0, restoreY)
    return
  }
  if (hash) {
    document.getElementById(hash.slice(1))?.scrollIntoView()
    return
  }
  window.scrollTo(0, 0)
}

async function swapTo(url: string, restoreScrollY: number | null) {
  const token = ++activeNavToken
  startProgress()

  let entry: PageEntry
  try {
    entry = await fetchPage(url)
  } catch (err) {
    console.error(err)
    finishProgress()
    if (token === activeNavToken) location.href = url
    return
  }
  finishProgress()

  // A newer navigation started (and possibly already finished) while this
  // fetch was in flight - drop this one instead of clobbering the page.
  if (token !== activeNavToken) return

  closeMobileNavIfOpen()
  applyPage(entry)
  scrollActiveIntoView()
  scrollFor(url, restoreScrollY)
}

function isSamePage(url: string): boolean {
  const target = new URL(url, location.href)
  const current = new URL(location.href)
  return (
    target.pathname === current.pathname && target.search === current.search
  )
}

const NON_PAGE_PATHS = new Set([
  "/search-index.json",
  "/sitemap.xml",
  "/rss.xml",
  "/robots.txt",
  "/favicon.svg"
])

function isSoftNavigable(link: HTMLAnchorElement): boolean {
  if (link.origin !== location.origin) return false
  if (link.target && link.target !== "_self") return false
  if (link.hasAttribute("download")) return false
  const href = link.getAttribute("href") ?? ""
  if (href === "" || href.startsWith("#")) return false
  if (link.pathname.startsWith("/Attachments/")) return false
  if (NON_PAGE_PATHS.has(link.pathname)) return false
  return true
}

export function initSoftRouter() {
  if (!("pushState" in history)) return
  history.scrollRestoration = "manual"
  history.replaceState({ scrollY: window.scrollY } satisfies HistoryState, "")

  document.body.addEventListener("click", e => {
    if (e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

    const link = (e.target as HTMLElement).closest("a")
    if (!link || !isSoftNavigable(link)) return
    if (isSamePage(link.href)) {
      // A link to the page we're already on should be a complete no-op
      // rather than a wasteful full reload - unless it points at a
      // different in-page anchor, which the browser scrolls to natively.
      if (link.hash === "" || link.hash === location.hash) e.preventDefault()
      return
    }

    e.preventDefault()
    history.replaceState({ scrollY: window.scrollY } satisfies HistoryState, "")
    swapTo(link.href, null).then(() => {
      history.pushState({ scrollY: 0 } satisfies HistoryState, "", link.href)
    })
  })

  document.body.addEventListener("mouseover", e => {
    const link = (e.target as HTMLElement).closest("a")
    if (link && isSoftNavigable(link) && !isSamePage(link.href)) {
      fetchPage(link.href).catch(() => {})
    }
  })

  window.addEventListener("popstate", e => {
    const state = e.state as HistoryState | null
    swapTo(location.href, state?.scrollY ?? 0)
  })
}
