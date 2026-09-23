import "./styles/tokens.css"
import "./styles/base.css"
import "./styles/layout.css"
import "./styles/prose.css"

import { render } from "solid-js/web"
import { SearchOverlay } from "./islands/SearchOverlay"
import { initDarkModeToggle } from "./islands/dark-mode-toggle"
import { initPageLoader } from "./islands/page-loader"
import { initSidebarPersistence } from "./islands/sidebar-persistence"
import { initSidebarResizer } from "./islands/sidebar-resizer"
import { initTocScrollspy } from "./islands/toc-scrollspy"
import { initMobileNavDrawer } from "./islands/mobile-nav-drawer"
import { initSoftRouter } from "./islands/soft-router"
import { scrollActiveIntoView } from "./islands/sidebar-scroll"

initDarkModeToggle()
initPageLoader()
initSidebarPersistence()
initSidebarResizer()
initTocScrollspy()
initMobileNavDrawer()
initSoftRouter()
scrollActiveIntoView()

const searchRoot = document.getElementById("search-root")
if (searchRoot) {
  render(() => SearchOverlay({ triggerId: "search-trigger" }), searchRoot)
}
