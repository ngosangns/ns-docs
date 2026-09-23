import { For, Show } from "solid-js"
import { tagHref } from "../lib/routes"

export function TagList(props: { tags: string[] }) {
  return (
    <Show when={props.tags.length > 0}>
      <div class="tag-list">
        <For each={props.tags}>
          {tag => (
            <a class="tag-chip" href={tagHref(tag)}>
              #{tag}
            </a>
          )}
        </For>
      </div>
    </Show>
  )
}
