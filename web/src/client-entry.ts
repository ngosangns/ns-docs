import "./styles/tokens.css"
import "./styles/base.css"
import "./styles/layout.css"
import "./styles/prose.css"

import { render } from "solid-js/web"
import { SearchOverlay } from "./islands/SearchOverlay"
import { initDarkModeToggle } from "./islands/dark-mode-toggle"
import { initSidebarPersistence } from "./islands/sidebar-persistence"
import { initTocScrollspy } from "./islands/toc-scrollspy"
import { initMobileNavDrawer } from "./islands/mobile-nav-drawer"
import { initSoftRouter } from "./islands/soft-router"
import { scrollActiveIntoView } from "./islands/sidebar-scroll"

initDarkModeToggle()
initSidebarPersistence()
initTocScrollspy()
initMobileNavDrawer()
initSoftRouter()
scrollActiveIntoView()

const searchRoot = document.getElementById("search-root")
if (searchRoot) {
  render(() => SearchOverlay({ triggerId: "search-trigger" }), searchRoot)
}
