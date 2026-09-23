import { For } from "solid-js"
import type { NavNode } from "../content/types"
import { pageHref } from "../lib/routes"

interface FolderTreeListProps {
  nodes: NavNode[]
  activeAncestors: ReadonlySet<string>
  activeId?: string
}

function FolderTreeList(props: FolderTreeListProps) {
  return (
    <ul>
      <For each={props.nodes}>
        {node =>
          node.page ? (
            <li>
              <a
                href={pageHref(node.page.id)}
                aria-current={
                  props.activeId === node.page.id ? "page" : undefined
                }
              >
                {node.page.frontmatter.title}
              </a>
            </li>
          ) : (
            <li>
              <details
                data-path={node.path}
                open={props.activeAncestors.has(node.path)}
              >
                <summary>{node.name}</summary>
                <FolderTreeList
                  nodes={node.children}
                  activeAncestors={props.activeAncestors}
                  activeId={props.activeId}
                />
              </details>
            </li>
          )
        }
      </For>
    </ul>
  )
}

export interface FolderTreeProps {
  node: NavNode
  activeAncestors: ReadonlySet<string>
  activeId?: string
}

export function FolderTree(props: FolderTreeProps) {
  return (
    <nav class="folder-tree" aria-label="Folder navigation">
      <FolderTreeList
        nodes={props.node.children}
        activeAncestors={props.activeAncestors}
        activeId={props.activeId}
      />
    </nav>
  )
}
