import { For } from "solid-js"
import { folderHref } from "../lib/routes"

export interface Crumb {
  name: string
  path: string
}

export function Breadcrumbs(props: { crumbs: Crumb[] }) {
  return (
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <For each={props.crumbs}>
        {(crumb, i) => (
          <>
            <span class="breadcrumbs__sep">/</span>
            {i() === props.crumbs.length - 1 ? (
              <span>{crumb.name}</span>
            ) : (
              <a href={folderHref(crumb.path)}>{crumb.name}</a>
            )}
          </>
        )}
      </For>
    </nav>
  )
}
