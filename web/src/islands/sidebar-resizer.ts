/**
 * Drag handle on the sidebar/main border. The width lives in the
 * --sidebar-width custom property on <html> (overriding the tokens.css
 * default), so the grid column, the handle position and every media query
 * variant of the shell all track a single value. Persisted to localStorage
 * like the theme and folder-tree overrides; the FOUC guard in Layout.tsx
 * reapplies it before first paint.
 *
 * The handle element itself sits inside .site-shell but survives
 * navigation - soft-router.ts only swaps .site-main and .site-rail - so
 * initSidebarResizer() binds once at startup, and again only if a
 * full-shell fallback swap ever replaces it. All listeners hang off the
 * handle element (pointer capture keeps move/up on it during a drag).
 */

const STORAGE_KEY = "sidebar-width"
const MIN_WIDTH = 160
const MAX_WIDTH = 480
const KEY_STEP = 16

function clampWidth(px: number): number {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(px)))
}

function applyWidth(px: number) {
  document.documentElement.style.setProperty(
    "--sidebar-width",
    `${clampWidth(px)}px`
  )
}

function persist(px: number | null) {
  try {
    if (px == null) localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, String(clampWidth(px)))
  } catch {
    // localStorage unavailable - the width just won't persist across loads.
  }
}

function restoreWidth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw == null) return
    const n = parseInt(raw, 10)
    if (Number.isFinite(n)) applyWidth(n)
  } catch {
    // ignore
  }
}

export function initSidebarResizer() {
  const resizer = document.getElementById("sidebar-resizer")
  if (!resizer) return

  // Looked up fresh on every event instead of cached, so a full-shell
  // fallback swap can never leave this handler holding a detached element.
  const getSidebar = () => document.getElementById("site-sidebar")
  const widthAt = (clientX: number) => {
    const sidebar = getSidebar()
    if (!sidebar) return MIN_WIDTH
    return clampWidth(clientX - sidebar.getBoundingClientRect().left)
  }

  restoreWidth()

  let dragging = false

  resizer.addEventListener("pointerdown", e => {
    if (e.button !== 0) return
    dragging = true
    resizer.setPointerCapture(e.pointerId)
    document.body.classList.add("sidebar-resizing")
    e.preventDefault()
  })

  resizer.addEventListener("pointermove", e => {
    if (!dragging) return
    applyWidth(widthAt(e.clientX))
  })

  const endDrag = (e: PointerEvent) => {
    if (!dragging) return
    dragging = false
    document.body.classList.remove("sidebar-resizing")
    persist(widthAt(e.clientX))
  }
  resizer.addEventListener("pointerup", endDrag)
  resizer.addEventListener("pointercancel", endDrag)

  resizer.addEventListener("dblclick", () => {
    document.documentElement.style.removeProperty("--sidebar-width")
    persist(null)
  })

  resizer.addEventListener("keydown", e => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    const sidebar = getSidebar()
    if (!sidebar) return
    const next = clampWidth(
      sidebar.getBoundingClientRect().width +
        (e.key === "ArrowRight" ? KEY_STEP : -KEY_STEP)
    )
    applyWidth(next)
    persist(next)
    e.preventDefault()
  })
}
