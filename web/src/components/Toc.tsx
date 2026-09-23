import { For, Show } from "solid-js"
import type { TocEntry } from "../content/types"

export function Toc(props: { entries: TocEntry[] }) {
  const minDepth = () => Math.min(...props.entries.map((e) => e.depth))
  return (
    <Show when={props.entries.length > 0}>
      <div class="rail-section toc">
        <p class="toc__title">On this page</p>
        <ul>
          <For each={props.entries}>
            {(entry) => (
              <li style={{ "padding-left": `${(entry.depth - minDepth()) * 0.75}rem` }}>
                <a href={`#${entry.id}`}>{entry.text}</a>
              </li>
            )}
          </For>
        </ul>
      </div>
    </Show>
  )
}
