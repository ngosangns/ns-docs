export function initMobileNavDrawer() {
  const toggle = document.getElementById("nav-toggle")
  const sidebar = document.getElementById("site-sidebar")
  const backdrop = document.getElementById("nav-backdrop")
  if (!toggle || !sidebar) return

  const close = () => {
    sidebar.classList.remove("site-sidebar--open")
    backdrop?.classList.remove("nav-backdrop--open")
    toggle.setAttribute("aria-expanded", "false")
  }
  const open = () => {
    sidebar.classList.add("site-sidebar--open")
    backdrop?.classList.add("nav-backdrop--open")
    toggle.setAttribute("aria-expanded", "true")
  }

  toggle.setAttribute("aria-expanded", "false")
  toggle.addEventListener("click", () => {
    sidebar.classList.contains("site-sidebar--open") ? close() : open()
  })

  backdrop?.addEventListener("click", close)

  sidebar.addEventListener("click", e => {
    if ((e.target as HTMLElement).tagName === "A") close()
  })

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") close()
  })
}
