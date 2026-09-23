export function initTocScrollspy() {
  const toc = document.querySelector(".toc")
  if (!toc) return

  const links = new Map<string, HTMLAnchorElement>()
  for (const a of toc.querySelectorAll<HTMLAnchorElement>("a[href^='#']")) {
    const id = decodeURIComponent(a.getAttribute("href")!.slice(1))
    links.set(id, a)
  }

  const headings = [...links.keys()]
    .map(id => document.getElementById(id))
    .filter((el): el is HTMLElement => el != null)
  if (headings.length === 0) return

  let activeId: string | null = null
  const setActive = (id: string | null) => {
    if (id === activeId) return
    if (activeId) links.get(activeId)?.classList.remove("toc__link--active")
    if (id) links.get(id)?.classList.add("toc__link--active")
    activeId = id
  }

  const update = () => {
    const threshold = 96
    let current = headings[0].id
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top - threshold <= 0) {
        current = heading.id
      } else {
        break
      }
    }
    setActive(current)
  }

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
