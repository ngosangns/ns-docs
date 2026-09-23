/**
 * Scrolls the current page's entry into view inside the sidebar's own
 * scroll container. Without this, landing on something deep in Technology/
 * (400+ pages, 5+ levels) leaves the highlighted item wherever it happens
 * to fall - often well below the fold in a sidebar that's now sticky and
 * independently scrollable.
 */
export function scrollActiveIntoView() {
  const sidebar = document.getElementById("site-sidebar")
  if (!sidebar) return

  const target =
    sidebar.querySelector<HTMLElement>('a[aria-current="page"]') ??
    [
      ...sidebar.querySelectorAll<HTMLElement>(
        "details[data-active-path] > summary"
      )
    ].pop()
  if (!target) return

  target.scrollIntoView({ block: "center" })
}
