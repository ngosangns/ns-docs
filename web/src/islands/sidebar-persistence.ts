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

// Assigning .open from code fires the same async "toggle" event a real
// click does, with nothing to tell them apart. Recording the state we
// meant to set lets the listener below recognise (and skip) the echo of
// programmatic changes, so navigation never fabricates user overrides.
const intendedOpen = new WeakMap<HTMLDetailsElement, boolean>()
const boundDetails = new WeakSet<HTMLDetailsElement>()

function setOpen(details: HTMLDetailsElement, open: boolean) {
  intendedOpen.set(details, open)
  details.open = open
}

/**
 * Lets a visitor's manual expand/collapse choices survive navigation, on top
 * of the SSR default (current page's ancestor chain pre-expanded). Only
 * folders the visitor has explicitly toggled are stored, so a fresh page for
 * a not-yet-touched folder still falls back to the ancestor-chain default.
 *
 * Bound once per element: the sidebar DOM survives soft navigation now, so
 * re-running this on the same tree must not stack duplicate listeners.
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
      setOpen(details, overrides[path])
    }
    if (boundDetails.has(details)) continue
    boundDetails.add(details)
    details.addEventListener("toggle", () => {
      if (intendedOpen.get(details) === details.open) {
        intendedOpen.delete(details)
        return
      }
      intendedOpen.delete(details)
      overrides[path] = details.open
      writeOverrides(overrides)
    })
  }
}

/**
 * Replays on the live sidebar what SSR baked into the freshly fetched one:
 * moves aria-current="page" to the new active link and re-applies the
 * open-state rules (explicit user override wins, otherwise only the active
 * page's ancestor chain stays expanded). Everything mutates in place, so
 * scroll position, listeners and unrelated folder state are untouched.
 * Returns false when either tree is missing so the caller can fall back to
 * a full-shell swap.
 */
export function syncFolderTree(freshSidebar: Element): boolean {
  const liveTree = document.querySelector("#site-sidebar .folder-tree")
  const freshTree = freshSidebar.querySelector(".folder-tree")
  if (!liveTree || !freshTree) return false

  liveTree.querySelector('a[aria-current="page"]')?.removeAttribute(
    "aria-current"
  )
  const activeHref = freshTree
    .querySelector('a[aria-current="page"]')
    ?.getAttribute("href")
  if (activeHref) {
    for (const a of liveTree.querySelectorAll("a")) {
      if (a.getAttribute("href") === activeHref) {
        a.setAttribute("aria-current", "page")
        break
      }
    }
  }

  const activePaths = new Set(
    [
      ...freshTree.querySelectorAll<HTMLDetailsElement>(
        "details[data-active-path]"
      )
    ].map(d => d.dataset.path ?? "")
  )
  const overrides = readOverrides()
  for (const details of liveTree.querySelectorAll<HTMLDetailsElement>(
    "details[data-path]"
  )) {
    const path = details.dataset.path ?? ""
    const isActivePath = activePaths.has(path)
    details.toggleAttribute("data-active-path", isActivePath)
    setOpen(details, path in overrides ? overrides[path] : isActivePath)
  }
  return true
}
