let activeId: string | null = null
let bound = false

function currentLinks(): Map<string, HTMLAnchorElement> {
  const links = new Map<string, HTMLAnchorElement>()
  const toc = document.querySelector(".toc")
  if (!toc) return links
  for (const a of toc.querySelectorAll<HTMLAnchorElement>("a[href^='#']")) {
    links.set(decodeURIComponent(a.getAttribute("href")!.slice(1)), a)
  }
  return links
}

function setActive(links: Map<string, HTMLAnchorElement>, id: string | null) {
  if (id === activeId) return
  if (activeId) links.get(activeId)?.classList.remove("toc__link--active")
  if (id) links.get(id)?.classList.add("toc__link--active")
  activeId = id
}

/**
 * Re-queries the TOC/headings on every call rather than caching them, so a
 * single scroll listener (bound once, below) stays correct even after
 * soft-router.ts swaps in a whole new page's content.
 */
function update() {
  const links = currentLinks()
  const headings = [...links.keys()]
    .map(id => document.getElementById(id))
    .filter((el): el is HTMLElement => el != null)
  if (headings.length === 0) return

  const threshold = 96
  let current = headings[0].id
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top - threshold <= 0) {
      current = heading.id
    } else {
      break
    }
  }
  setActive(links, current)
}

export function initTocScrollspy() {
  if (bound) return
  bound = true

  let ticking = false
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    },
    { passive: true }
  )
  update()
}

/** Called by soft-router.ts after swapping in a new page's content. */
export function refreshTocScrollspy() {
  activeId = null
  update()
}
