let bound = false
let close: (() => void) | null = null

/** Called by soft-router.ts before swapping in a new page, so the drawer
 * never gets left open across a navigation. */
export function closeMobileNavIfOpen() {
  close?.()
}

export function initMobileNavDrawer() {
  const toggle = document.getElementById("nav-toggle")
  const backdrop = document.getElementById("nav-backdrop")
  if (!toggle) return

  // #site-sidebar is looked up fresh on every call instead of cached in a
  // closure, so a full-shell fallback swap can't leave a detached element.
  const getSidebar = () => document.getElementById("site-sidebar")

  close = () => {
    getSidebar()?.classList.remove("site-sidebar--open")
    backdrop?.classList.remove("nav-backdrop--open")
    toggle.setAttribute("aria-expanded", "false")
  }
  const open = () => {
    getSidebar()?.classList.add("site-sidebar--open")
    backdrop?.classList.add("nav-backdrop--open")
    toggle.setAttribute("aria-expanded", "true")
  }

  if (bound) return
  bound = true

  toggle.setAttribute("aria-expanded", "false")
  toggle.addEventListener("click", () => {
    getSidebar()?.classList.contains("site-sidebar--open") ? close?.() : open()
  })

  backdrop?.addEventListener("click", () => close?.())

  // Delegated, so it keeps working however the sidebar DOM changes.
  document.addEventListener("click", e => {
    const sidebar = getSidebar()
    const target = e.target as HTMLElement
    if (sidebar?.contains(target) && target.closest("a")) close?.()
  })

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") close?.()
  })
}
