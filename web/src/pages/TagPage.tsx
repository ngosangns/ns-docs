import { For, Show } from "solid-js"
import type { NavNode, Page } from "../content/types"
import { Layout } from "../components/Layout"
import { pageHref } from "../lib/routes"

export interface TagPageProps {
  tag: string
  pages: Page[]
  navTree: NavNode
  cssHref: string
}

export function TagPage(props: TagPageProps) {
  return (
    <Layout
      title={`#${props.tag}`}
      cssHref={props.cssHref}
      navTree={props.navTree}
      activeAncestors={new Set([""])}
    >
      <ul class="listing">
        <For each={props.pages}>
          {(page) => (
            <li>
              <a class="listing__title" href={pageHref(page.id)}>
                {page.frontmatter.title}
              </a>
              <Show when={page.frontmatter.description}>
                <div class="listing__desc">{page.frontmatter.description}</div>
              </Show>
            </li>
          )}
        </For>
      </ul>
    </Layout>
  )
}
