import { For } from "solid-js"
import type { NavNode } from "../content/types"
import { Layout } from "../components/Layout"
import { tagHref } from "../lib/routes"

export interface TagIndexPageProps {
  tags: { tag: string; count: number }[]
  navTree: NavNode
  cssHref: string
}

export function TagIndexPage(props: TagIndexPageProps) {
  return (
    <Layout title="Tags" cssHref={props.cssHref} navTree={props.navTree} activeAncestors={new Set([""])}>
      <ul class="listing">
        <For each={props.tags}>
          {({ tag, count }) => (
            <li>
              <a class="listing__title" href={tagHref(tag)}>
                #{tag}
              </a>{" "}
              <span class="listing__count">({count})</span>
            </li>
          )}
        </For>
      </ul>
    </Layout>
  )
}
