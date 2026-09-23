/**
 * Scrolls the current page's entry into view inside the sidebar's own
 * scroll container. Without this, landing on something deep in Technology/
 * (400+ pages, 5+ levels) leaves the highlighted item wherever it happens
 * to fall - often well below the fold in a sidebar that's now sticky and
 * independently scrollable.
 *
 * Called on initial load and on history (back/forward) navigation only:
 * sidebar link clicks deliberately skip it so the scroll position never
 * jumps away from what the user was looking at.
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
