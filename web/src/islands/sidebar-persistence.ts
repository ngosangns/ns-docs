const STORAGE_KEY = "folder-tree-overrides"

function readOverrides(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}")
  } catch {
    return {}
  }
}

function writeOverrides(overrides: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  } catch {
    // localStorage unavailable - overrides just won't persist across loads.
  }
}

/**
 * Lets a visitor's manual expand/collapse choices survive navigation, on top
 * of the SSR default (current page's ancestor chain pre-expanded). Only
 * folders the visitor has explicitly toggled are stored, so a fresh page for
 * a not-yet-touched folder still falls back to the ancestor-chain default.
 */
export function initSidebarPersistence() {
  const tree = document.querySelector(".folder-tree")
  if (!tree) return

  const overrides = readOverrides()

  for (const details of tree.querySelectorAll<HTMLDetailsElement>(
    "details[data-path]"
  )) {
    const path = details.dataset.path ?? ""
    if (path in overrides) {
      details.open = overrides[path]
    }
    details.addEventListener("toggle", () => {
      overrides[path] = details.open
      writeOverrides(overrides)
    })
  }
}
