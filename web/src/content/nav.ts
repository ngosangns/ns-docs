import type { NavNode } from "./types"

/** Every folder node in the nav tree, including the root ("" path). */
export function collectFolderNodes(root: NavNode): NavNode[] {
  const out: NavNode[] = []
  const walk = (node: NavNode) => {
    if (!node.page) out.push(node)
    for (const child of node.children) walk(child)
  }
  walk(root)
  return out
}

/** Ancestor folder paths of a Concept_Id or folder path, root ("") first. */
export function ancestorPaths(id: string): string[] {
  const parts = id.split("/")
  const paths = [""]
  let acc = ""
  for (let i = 0; i < parts.length - 1; i++) {
    acc = acc ? `${acc}/${parts[i]}` : parts[i]
    paths.push(acc)
  }
  return paths
}

/** Ancestor folder paths of a folder path, INCLUDING the folder itself. */
export function ancestorPathsInclusive(path: string): string[] {
  if (path === "") return [""]
  const parts = path.split("/")
  const paths = [""]
  let acc = ""
  for (const part of parts) {
    acc = acc ? `${acc}/${part}` : part
    paths.push(acc)
  }
  return paths
}

export function countPages(node: NavNode): number {
  if (node.page) return 1
  return node.children.reduce((sum, child) => sum + countPages(child), 0)
}

export function findNode(root: NavNode, path: string): NavNode | undefined {
  if (path === "") return root
  const parts = path.split("/")
  let node = root
  for (const part of parts) {
    const child = node.children.find((c) => !c.page && c.name === part)
    if (!child) return undefined
    node = child
  }
  return node
}
