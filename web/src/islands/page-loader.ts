/**
 * Full-screen boot loader shown from first paint (the stylesheet is
 * render-blocking, so it covers the window where fonts and the JS bundle
 * are still in flight). Dismissed on window.load, with a hard cap so a
 * hanging resource can never trap the visitor on a spinner forever. The
 * element lives outside .site-shell, so soft-router.ts swaps never
 * recreate it - init once at startup.
 */

const MAX_WAIT_MS = 3000

export function initPageLoader() {
  const loader = document.getElementById("page-loader")
  if (!loader) return

  const finish = () => {
    loader.classList.add("page-loader--done")
    loader.setAttribute("aria-hidden", "true")
  }

  if (document.readyState === "complete") {
    finish()
    return
  }
  window.addEventListener("load", finish, { once: true })
  setTimeout(finish, MAX_WAIT_MS)
}
