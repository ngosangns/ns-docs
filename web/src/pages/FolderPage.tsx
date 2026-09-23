import { For, Show } from "solid-js"
import type { NavNode } from "../content/types"
import { Layout } from "../components/Layout"
import { breadcrumbSegments, folderHref, pageHref } from "../lib/routes"
import { ancestorPathsInclusive, countPages } from "../content/nav"

export interface FolderPageProps {
  node: NavNode
  navTree: NavNode
  cssHref: string
  jsHref: string
}

export function FolderPage(props: FolderPageProps) {
  const { node } = props
  const folders = node.children.filter(c => !c.page)
  const pages = node.children.filter(c => c.page)
  const title = node.name || "ngosangns Knowledge Base"

  return (
    <Layout
      title={title}
      cssHref={props.cssHref}
      jsHref={props.jsHref}
      navTree={props.navTree}
      activeId={node.path}
      activeAncestors={new Set(ancestorPathsInclusive(node.path))}
      crumbs={node.path ? breadcrumbSegments(node.path) : []}
    >
      <Show when={folders.length > 0}>
        <h2>Sections</h2>
        <ul class="listing">
          <For each={folders}>
            {folder => (
              <li>
                <a class="listing__title" href={folderHref(folder.path)}>
                  {folder.name}
                </a>{" "}
                <span class="listing__count">({countPages(folder)})</span>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <Show when={pages.length > 0}>
        <h2>Pages</h2>
        <ul class="listing">
          <For each={pages}>
            {child => (
              <li>
                <a class="listing__title" href={pageHref(child.page!.id)}>
                  {child.page!.frontmatter.title}
                </a>
                <Show when={child.page!.frontmatter.description}>
                  <div class="listing__desc">
                    {child.page!.frontmatter.description}
                  </div>
                </Show>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </Layout>
  )
}
