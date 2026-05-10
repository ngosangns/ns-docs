---
area: technology
domain: algorithms
topic: golang
type: cheatsheet
---

## Trees

- For example the DOM
- `Root` is the top most node
- `Height` is the longest path from the Root to the furthest away node
- `Leaf` is a node with no children
- Binary Tree is a tree that only has two nodes (left/right)
- Balanced Tree when the children have all the same height

### Tree Traversal

- Visit Node
- Recurse
- Pre-Order: Root at the beginning
- In-Order: Root in the middle
- Post-Order: Root in the end

### Depth first search

- Like a `stack`
- Complexity O(N)
- Calling functions as/like a stack
- Will go as deep into the tree as possible on the left
- Preserves the shape of the tree!
- Post order:

```
      7
  23      3
5   4   18  21
Start at 7 => [7]
Add left child => [23]
                  [7]
Add left child => [5]
                  [23]
                  [7]
No more left, no more right =>    => (5)
                              [23]
                               [7]
Add right child => [4] => (5)
                  [23]
                   [7]
No more left, no more right => [] => (5,4)
                              [23]
                              [7]
No more left, no more right => [] => (5,4,23)
                              [7]
Add right child => [3] => (5,4,23)
                   [7]
Add left child => [18] => (5,4,23)
                   [3]
                   [7]
No more left, no more right => [] => (5,4,23,18)
                              [3]
                              [7]
Add right child => [21] => (5,4,23,18)
                    [3]
                    [7]
No more left, no more right => [] => (5,4,23,18,21)
                              [3]
                              [7]
No more left, no more right => [] => (5,4,23,18,21,3)
                              [7]
No more left, no more right => [] => (5,4,23,18,21,3,7)

```

### Pre Order

```
      7
  23      3
5   4   18  21
=> [7, 23, 5, 4, 3, 18, 21]

```

```ts
const traversal = (node: BinaryNode<number> | null, visited: number[]): number[] => {
  // base-case
  if (!node) return visited
  // pre
  visited.push(node.value)
  // recurse
  traversal(node.left, visited)
  traversal(node.right, visited)
  // post
  return visited
}

export default (head: BinaryNode<number>): number[] => traversal(head, [])
```

### In Order

```
      7
  23      3
5   4   18  21
=> [5, 23, 4, 7, 18, 3, 21]

```

```ts
const traversal = (node: BinaryNode<number> | null, visited: number[]): number[] => {
  // base-case
  if (!node) return visited
  // pre
  // recurse
  traversal(node.left, visited)
  visited.push(node.value)
  traversal(node.right, visited)
  // post
  return visited
}

export default (head: BinaryNode<number>): number[] => traversal(head, [])
```

### Post Order

```
      7
  23      3
5   4   18  21
=> [5, 4, 23, 18, 21, 3, 7]

```

```ts
const traversal = (node: BinaryNode<number> | null, visited: number[]): number[] => {
  // base-case
  if (!node) return visited
  // pre
  // recurse
  traversal(node.left, visited)
  traversal(node.right, visited)
  // post
  visited.push(node.value)
  return visited
}

export default (head: BinaryNode<number>): number[] => traversal(head, [])
```

### Compare Trees

- Compare whether two trees are equal in values and shape

```ts
const traversal = (a: BinaryNode<number> | null | undefined, b: BinaryNode<number> | null | undefined): boolean => {
  // base-case
  if (a?.value !== b?.value) return false
  if (!a?.left && !b?.left) return true
  // recurse
  return traversal(a?.left, b?.left) && traversal(a?.right, b?.right)
}

export default (a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean => traversal(a, b)
```

### Lowest Common Ancestor

```ts
const common = (head: BinaryNode<number>, x: number, y: number): number => {
  let lca: BinaryNode<number> = head

  const walk = (node: BinaryNode<number> | null, x: number, y: number): boolean => {
    // base-case
    const val = node?.value
    if (!val) return false
    // recurse
    const hasLeft = walk(node.left, x, y)
    const hasRight = walk(node.right, x, y)
    const current = val === x || val === y
    // post
    if (val === x && val === y) lca = node
    if (Number(hasLeft) + Number(hasRight) + Number(current) >= 2) lca = node
    return hasLeft || hasRight || current
  }

  walk(head, x, y)
  return lca.value
}

/**
 *          20
 *     10          50
 *   5    15     30    100
 *     7        29  45
 */
console.log(common(tree, 7, 15)) // 10
```

### Binary Search Tree

- Given a binary tree whose left children are always smaller or equal to the parent and the right children always greater:

```ts
const traversal = (node: BinaryNode<number> | null, needle: number): boolean => {
  // base-case
  if (!node) return false
  if (node.value === needle) return true
  // recurse
  if (needle < node.value) return traversal(node.left, needle)
  else return traversal(node.right, needle)
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return traversal(head, needle)
}
```

### Breadth first search

- Like a `queue`
- Complexity theoretically O(N) but with JavaScript Arrays `[]` it's O(N^2) because of shift/unshift
- Calling functions as/like a queue
- If children, add children to the queue
- If no children, de queue
- Will go level by level of the tree

```
      7
  23      8
5   4   21  15
Start at 7 => 7
Add children => 7->23->8
Dequeue => 23->8 => (7)
Visit 23 => 23->8 => (7)
Add children => 23->8->5->4 => (7)
Dequeue => 8->5->4 => (7,23)
Visit 8 => 8->5->4 => (7,23)
Add children => 8->5->4->21->15 => (7,23)
Visit & Dequeue => 5->4->21->15 => (7,23,8)
Visit & Dequeue => 4->21->15 => (7,23,8,5)
Visit & Dequeue => 21->15 => (7,23,8,5,4)
Visit & Dequeue => 15 => (7,23,8,5,4,21)
Visit & Dequeue => => (7,23,8,5,4,21,15)

```

### BFS Loop

```ts
const loop = (head: BinaryNode<number>): number[] => {
  const queue = [head]
  const path = []
  while (queue.length) {
    const curr = queue.shift()
    if (!curr?.value) continue
    path.push(curr.value)
    if (curr?.left) queue.push(curr.left)
    if (curr?.right) queue.push(curr.right)
  }
  return path
}

export default (head: BinaryNode<number>): number[] => loop(head)
```

### BFS Recursive

```ts
const recursive = (queue: BinaryNode<number>[], path: number[] = []): number[] => {
  const curr: BinaryNode<number> | undefined = queue.shift()
  // base-case
  if (!curr?.value) return path
  // pre
  path.push(curr.value)
  // recursion
  if (curr?.left) queue.push(curr.left)
  if (curr?.right) queue.push(curr.right)
  return recursive(queue, path)
}

export default (head: BinaryNode<number>): number[] => recursive([head])
```

### BFS Level by Level

```ts
/**
 *          20
 *     10          50
 *   5    15     30    100
 * => [[20],[10,50],[5,15,30,100]]
 */
const loopN = (head: BinaryNode<number>): number[][] => {
  const queue = [head]
  const levels: { [k: string]: number[] } = {}
  let level = 0
  while (queue.length) {
    let store = []
    for (let i = 0, il = queue.length; i < il; i++) {
      const curr = queue.shift()
      if (curr?.left) queue.push(curr.left)
      if (curr?.right) queue.push(curr.right)
      if (curr?.value) store.push(curr.value)
    }
    levels[level] = store
    level++
  }
  return Object.values(levels)
}
```
