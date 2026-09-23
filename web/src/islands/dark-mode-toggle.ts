export function initDarkModeToggle() {
  const btn = document.getElementById("theme-toggle")
  if (!btn) return

  btn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    const isDark = current ? current === "dark" : prefersDark
    const next = isDark ? "light" : "dark"

    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch {
      // localStorage unavailable (private mode, blocked storage) - toggle still works for this load.
    }
  })
}
