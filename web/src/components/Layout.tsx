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
        <Show when={props.description}>
          <meta name="description" content={props.description} />
        </Show>
        <link rel="stylesheet" href={props.cssHref} />
        <script innerHTML={FOUC_GUARD} />
      </head>
      <body>
        <header class="site-header">
          <a class="site-header__title" href="/">
            ngosangns Knowledge Base
          </a>
          <div class="site-header__spacer" />
        </header>
        <div class="site-shell">
          <aside class="site-sidebar">
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
                {(frontmatter) => (
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
      </body>
    </html>
  )
}
