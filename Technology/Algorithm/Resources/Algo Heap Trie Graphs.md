---
area: technology
domain: data-structures
type: guide
title: Algo Heap Trie Graphs
description: TypeScript notes on heaps and priority queues, tries, graph representations and traversals, maps, and LRU cache design.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - data-structures
  - algorithms
  - golang
  - typescript
resource: https://viblo.asia/p/autocomplete-bai-toan-kinh-dien-trong-cac-he-thong-tim-kiem-gwd43jOjVX9
---

# Algo Heap Trie Graphs

## Heap / Priority Queue

- It is a binary tree where every child and grand child is smaller (MaxHeap) or larger (MinHeap) than the current node.
- Whenever a node is added, we must adjust the tree
- Whenever a node is deleted, we must adjust the tree
- There is no traversing the tree
- Maintains a weak ordering
- The heap is always complete at each level (there is no gap on one side)
- Self balancing
- Can be used for priority

```
                50 (0)
            /           \\
     71 (1)               100 (2)
     /    \\               /     \\
  101 (3)  80 (4)     200 (5)    101 (6)
  /
200 (7)

- [50,71,100,101,80,200,101,200]
- Left hand child: 2*i+1
- Right hand child: 2*i+2
- Parent: Math.floor((i-1)/2)

      | (i-1)/2
      0
    /   \\
2*i+1   2*i+2

```

// how to get the medium? (= using two heaps)

- MinHeap: means that the root node must be the smallest
- MaxHeap: Means that the root node must be the largest

```ts
export default class MinHeap {
  public length: number
  private data: number[]

  constructor() {
    this.data = []
    this.length = 0
  }

  insert(value: number): void {
    this.data[this.length] = value
    this.heapifyUp(this.length)
    this.length++
  }
  // also some times called `poll` or `pop`
  delete(): number {
    if (this.length === 0) return -1
    const out = this.data[0]
    this.length--

    if (this.length === 0) {
      this.data = []
      return out
    }
    this.data[0] = this.data[this.length]
    this.heapifyDown(0)
    return out
  }

  private heapifyDown(idx: number): void {
    if (idx >= this.length) return
    const leftChild = this.leftChild(idx)
    const rightChild = this.rightChild(idx)
    if (leftChild >= this.length || rightChild >= this.length) return

    const lV = this.data[leftChild]
    const rV = this.data[rightChild]
    const value = this.data[idx]

    if (rV > lV && value > lV) {
      this.swap(idx, leftChild)
      this.heapifyDown(leftChild)
    } else if (lV > rV && value > rV) {
      this.swap(idx, rightChild)
      this.heapifyDown(rightChild)
    }
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) return
    const parent = this.parent(idx)
    const parentValue = this.data[parent]
    const value = this.data[idx]

    if (parentValue > value) {
      this.swap(idx, parent)
      this.heapifyUp(parent)
    }
  }

  private swap(a: number, b: number) {
    const tmp = this.data[a]
    this.data[a] = this.data[b]
    this.data[b] = tmp
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2)
  }
  private leftChild(idx: number): number {
    return 2 * idx + 1
  }
  private rightChild(idx: number): number {
    return 2 * idx + 2
  }
}
```

- Runtime O(logN) (add/delete)

## Trie / Prefix Tree / Digital Tree

- Autocomplete - a classic problem in search systems: https://viblo.asia/p/autocomplete-bai-toan-kinh-dien-trong-cac-he-thong-tim-kiem-gwd43jOjVX9
- Autocomplete problems
- Cashing problems

```
// To be done

```

## Graphs

- Anything with 3 nodes is a graph (it needs a cycle)
- A connected graph is where each node can reach each other node
- Nodes are called Point or `Vertex`
- Big O is commonly stated in terms of V: vertices and E: edges
- i.e. O(V\*E) = on every vertex we check every edge
- Breadth First Search and Depth First Searches can be used, one just needs to store the already seen nodes

### Adjacency List

A way to represent a graph is to write an `Adjacency List`:

```
0 - > 1
^ \\   ^
|  _\\||
3 < - 2

```

Can be represented as a list of edges (Adjacency List (what am I adjacent to? > Edge)):

```ts
[
  [{to: 1, weight: 10}, {to: 2, weight: 5}],
  [],
  [{to: 1, weight: …}, {to: 2, weight: …}],
  [{to: 0, weight: …}]
]

```

### Adjacency Matrix

```
0 - > 1
^ \\   ^
|  _\\||
3 < - 2

```

Can be represented in an `Adjacency Matrix` (memory intensive O(V^2), not used in maps):

```
[
    0, 1, 2, 3
0, [0,10, 5, 0]
1, [0, 0, 0, 0]
2, [0, …, 0, …]
3, […, 0, 0, …]
]

```

The numbers in the matrix represent `0` for no connection or the weight if there is a connection.

### Searching the Graph

- DFS and BFS both work, one just needs a seen array (and to share a path also a previous array starting at -1)
- Seen: [f,…]
- Prev: [-1,…]
- Queue: [0,…]
- The Complexity is `O(V+E)` (vertices + edges) since worst case each of them they will be checked once

### Breadth First Search Matrix

```ts
/**
 * Example:
    >(1)<--->(4) ---->(5)
   /          |       /|
(0)     ------|------- |
   \\   v      v        v
    >(2) --> (3) <----(6)
export const matrix2: WeightedAdjacencyMatrix = [
    [0, 3, 1,  0, 0, 0, 0], // 0
    [0, 0, 0,  0, 1, 0, 0],
    [0, 0, 7,  0, 0, 0, 0],
    [0, 0, 0,  0, 0, 0, 0],
    [0, 1, 0,  5, 0, 2, 0],
    [0, 0, 18, 0, 0, 0, 1],
    [0, 0, 0,  1, 0, 0, 1],
];
 */
export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
  const queue: number[] = [source]
  const seen: boolean[] = Array(graph.length).fill(false)
  const prev: number[] = Array(graph.length).fill(-1)
  seen[source] = true

  while (queue.length) {
    const curr = queue.shift() as number
    if (!curr && curr !== 0) continue
    if (curr === needle) break

    const adjs = graph[curr]
    for (let index = 0; index < adjs.length; index++) {
      const element = adjs[index]
      if (element === 0 || seen[index]) continue
      seen[index] = true
      prev[index] = curr
      queue.push(index)
    }
  }

  if (prev[needle] === -1) return null

  let curr = needle
  const out: number[] = []
  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }

  out.push(source)
  return out.reverse()
}
```

### Depth First Search List

```ts
/**
 * Example:
     >(1)<--->(4) ---->(5)
    /          |       /|
 (0)     ------|------- |
    \\   v      v        v
     >(2) --> (3) <----(6)
export const list2: WeightedAdjacencyList = [[
  [{to: 1, weight: 3}, {to: 2, weight: 1}],
  [{to: 4, weight: 1}],
  [{to: 2, weight: 7}],
  [],
  [{to: 1, weight: 1}, {to: 3, weight: 5}, {to: 5, weight: 2}],
  [{to: 2, weight: 18}, {to: 6, weight: 1}],
  [{to: 3, weight: 1}, {to: 6, weight: 1}],
]
 */

console.log(dfs(list2, 0, 6)) // 0, 1, 4, 5, 6

function recursion(graph: WeightedAdjacencyList, curr: number, needle: number, seen: boolean[], path: number[]): boolean {
  if (seen[curr] || (!curr && curr !== 0)) return false
  seen[curr] = true

  path.push(curr)
  if (curr === needle) return true

  for (let index = 0; index < graph[curr].length; index++) {
    const element = graph[curr][index]
    if (recursion(graph, element.to, needle, seen, path)) return true
  }

  path.pop()

  return false
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
  if (needle === source) return null
  const path: number[] = []
  const seen = new Array(graph.length).fill(false)
  if (recursion(graph, source, needle, seen, path)) return path
  return null
}
```

### Dijkstra Shortest Path in Graph

```ts
const hasUnvisited = (seen: boolean[], dists: number[]): boolean => seen.some((bool, index) => !bool && dists[index] < Infinity)

const getLowestUnvisited = (seen: boolean[], dists: number[]): number => {
  let idx = -1
  let lowestDistance = Infinity

  for (let index = 0; index < seen.length; index++) {
    if (seen[index]) continue
    if (lowestDistance > dists[index]) {
      lowestDistance = dists[index]
      idx = index
    }
  }
  return idx
}

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
  const seen = new Array(arr.length).fill(false)
  const prev = new Array(arr.length).fill(-1)
  const dists = new Array(arr.length).fill(Infinity)
  dists[source] = 0

  // could be replaced by min-heap
  while (hasUnvisited(seen, dists)) {
    const curr = getLowestUnvisited(seen, dists)
    seen[curr] = true

    const adjs = arr[curr]
    for (let index = 0; index < adjs.length; index++) {
      const edge = adjs[index]
      if (seen[edge.to]) continue
      const dist = dists[curr] + edge.weight
      if (dist < dists[edge.to]) {
        dists[edge.to] = dist
        prev[edge.to] = curr
      }
    }
  }

  const out: number[] = []
  let curr = sink
  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }

  out.push(source)
  return out.reverse()
}
```

## Maps

- Load factor: amount of data points vs storage (data.length / storage.capacity) (7/10 => load factor .7)
- Key: value used to lookup data
- Value: value associated with the key
- Collision: when 2 keys map to the same cell

## Least Recently Used (LRU) Cache

- Combination of the linked list and a map
- Complexity of O(1) because the doubly linked list elements are mapped

```
(V2) <-> (V0) <-> (V1) <-> (/) <-> (V3) <-> …
 ^                          |
 |__________________________|

- If any element gets looked up (like V2 in this example) it's placed at the front of the list
- Hashmap<K,(V)> in order to avoid O(n) retrieval

```

```ts
type Node<T> = {
  value: T
  next?: Node<T>
  prev?: Node<T>
}

function createNode<V>(value: V): Node<V> {
  return { value } as Node<V>
}

export default class LRU<K, V> {
  private length: number
  private head?: Node<V>
  private tail?: Node<V>

  private lookup: Map<K, Node<V>>
  private reverseLookup: Map<Node<V>, K>

  constructor(public capacity: number = 10) {
    this.length = 0
    this.head = this.tail = undefined
    this.lookup = new Map<K, Node<V>>()
    this.reverseLookup = new Map<Node<V>, K>()
  }

  update(key: K, value: V): void {
    let node = this.lookup.get(key)
    if (!node) {
      node = createNode(value)
      this.length++
      this.prepend(node)
      this.trimCache()

      this.lookup.set(key, node)
      this.reverseLookup.set(node, key)
    } else {
      this.detach(node)
      this.prepend(node)
      node.value = value
    }
  }

  get(key: K): V | undefined {
    const node = this.lookup.get(key)
    if (!node) return

    this.detach(node)
    this.prepend(node)

    return node.value
  }

  private detach(node: Node<V>) {
    if (node.prev) node.prev.next = node.next
    if (node.next) node.next.prev = node.prev

    if (this.head === node) this.head = this.head.next
    if (this.tail === node) this.tail = this.tail.prev

    node.next = undefined
    node.prev = undefined
  }

  private prepend(node: Node<V>): Node<V> {
    if (!this.head) return (this.head = this.tail = node)

    node.next = this.head
    this.head.prev = node

    return (this.head = node)
  }

  private trimCache() {
    if (this.length <= this.capacity) return

    const tail = this.tail as Node<V>
    this.detach(this.tail as Node<V>)
    const key = this.reverseLookup.get(tail) as K
    this.lookup.delete(key)
    this.reverseLookup.delete(tail)
    this.length--
  }
}
```

> **See also:** [Algo Trees](/Technology/Algorithm/Resources/Algo Trees) · [Data Structures Overview](/Technology/Algorithm/Concepts/Data Structures/Data Structures Overview) · [Bloom Filter](/Technology/Algorithm/Concepts/Specialized/Bloom Filter)
