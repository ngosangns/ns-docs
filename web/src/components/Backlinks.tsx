import { For, Show } from "solid-js"
import { pageHref } from "../lib/routes"

export interface BacklinkEntry {
  id: string
  title: string
}

export function Backlinks(props: { entries: BacklinkEntry[] }) {
  return (
    <div class="rail-section backlinks">
      <p class="rail-section__title">Backlinks</p>
      <Show
        when={props.entries.length > 0}
        fallback={<p class="backlinks__empty">No pages link here yet.</p>}
      >
        <ul>
          <For each={props.entries}>
            {(entry) => (
              <li>
                <a href={pageHref(entry.id)}>{entry.title}</a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  )
}
