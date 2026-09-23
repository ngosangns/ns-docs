import type { JSX } from "solid-js"
import { Show } from "solid-js"
import type { NavNode, TocEntry, PageFrontmatter } from "../content/types"
import { FolderTree } from "./FolderTree"
import { Toc } from "./Toc"
import { Backlinks, type BacklinkEntry } from "./Backlinks"
import { Breadcrumbs, type Crumb } from "./Breadcrumbs"
import { TagList } from "./TagChip"

export interface LayoutProps {
  title: string
  description?: string
  cssHref: string
  jsHref: string
  navTree: NavNode
  activeAncestors: ReadonlySet<string>
  activeId?: string
  crumbs?: Crumb[]
  toc?: TocEntry[]
  backlinks?: BacklinkEntry[]
  frontmatter?: PageFrontmatter
  children: JSX.Element
}

const FOUC_GUARD =
  '(function(){try{var t=localStorage.getItem("theme");' +
  'if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}' +
  "}catch(e){}})();"

export function Layout(props: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/rss.xml"
        />
        <Show when={props.description}>
          <meta name="description" content={props.description} />
        </Show>
        <Show when={props.cssHref}>
          <link rel="stylesheet" href={props.cssHref} />
        </Show>
        <script innerHTML={FOUC_GUARD} />
        <script type="module" src={props.jsHref} />
      </head>
      <body>
        <div id="nav-progress" class="nav-progress" aria-hidden="true" />
        <header class="site-header">
          <button
            id="nav-toggle"
            class="icon-btn nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded="false"
          >
            <span class="hamburger" />
          </button>
          <a class="site-header__title" href="/">
            ngosangns Knowledge Base
          </a>
          <div class="site-header__spacer" />
          <button
            id="search-trigger"
            class="search-trigger"
            aria-label="Search"
          >
            <span>Search</span> <kbd>/</kbd>
          </button>
          <button
            id="theme-toggle"
            class="icon-btn"
            aria-label="Toggle dark mode"
          >
            ◐
          </button>
        </header>
        <div class="nav-backdrop" id="nav-backdrop" />
        <div class="site-shell">
          <aside class="site-sidebar" id="site-sidebar">
            <FolderTree
              node={props.navTree}
              activeAncestors={props.activeAncestors}
              activeId={props.activeId}
            />
          </aside>
          <main class="site-main">
            <div class="site-main__inner">
              <Show when={props.crumbs && props.crumbs.length > 0}>
                <Breadcrumbs crumbs={props.crumbs!} />
              </Show>
              <h1>{props.title}</h1>
              <Show when={props.frontmatter}>
                {frontmatter => (
                  <div class="page-meta">
                    <TagList tags={frontmatter().tags} />
                    <Show when={frontmatter().timestamp}>
                      <p>Updated: {frontmatter().timestamp!.slice(0, 10)}</p>
                    </Show>
                    <Show when={frontmatter().resource}>
                      <p>
                        <a href={frontmatter().resource}>Source</a>
                      </p>
                    </Show>
                  </div>
                )}
              </Show>
              <div class="prose">{props.children}</div>
            </div>
          </main>
          <aside class="site-rail">
            <Show when={props.toc && props.toc.length > 0}>
              <Toc entries={props.toc!} />
            </Show>
            <Show when={props.backlinks}>
              <Backlinks entries={props.backlinks!} />
            </Show>
          </aside>
        </div>
        <div id="search-root" />
      </body>
    </html>
  )
}
