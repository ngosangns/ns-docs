---
area: technology
domain: algorithms
topic: golang
type: cheatsheet
---

## Linked Lists

- Good for insertions / removals in the first or last node
- Tricky to traverse

### Queue

- Queueing strategies: https://encore.dev/blog/queueing

First in, first out (FiFo)

```
head            tail
1 ->  2 ->  3 ->  4

```

```ts
type Node<T> = {
  value: T
  next?: Node<T>
}

export default class Queue<T> {
  public length: number
  private head?: Node<T>
  private tail?: Node<T>

  constructor() {
    this.head = this.tail = undefined
    this.length = 0
  }

  // add node to the queue: point the current tail to the new node, set the tail to the new node
  enqueue(item: T): void {
    const node = { next: undefined, value: item }
    this.length++
    if (!this.tail) {
      this.tail = this.head = node
      return
    }
    this.tail.next = node
    this.tail = node
  }

  // remove node from the queue: set the current head to the next node, remove the previous heads connection
  dequeue(): T | undefined {
    if (!this.head) return undefined
    this.length--

    const head = this.head
    this.head = this.head.next

    // free
    head.next = undefined

    if (this.length === 0) this.tail = undefined

    return head.value
  }

  // get the heads value
  peek(): T | undefined {
    return this.head?.value
  }
}
```

### Stack

Last in, First out (LiFo)

```
3    head
v
2
v
1    tail

```

```ts
type Node<T> = {
  value: T
  next?: Node<T>
}

export default class Stack<T> {
  public length: number
  private head?: Node<T>

  constructor() {
    this.head = undefined
    this.length = 0
    return
  }

  // Add to the stack: point new node to next head, set head to new node
  push(item: T): void {
    const node = { value: item, next: undefined } as Node<T>
    this.length++
    if (!this.head) {
      this.head = node
      return
    }
    node.next = this.head
    this.head = node
  }

  // Remove from stack: set head to next node, remove pointer of prev node
  pop(): T | undefined {
    if (!this.head) return undefined
    this.length--
    const prevHead = this.head
    this.head = prevHead.next
    prevHead.next = undefined
    return prevHead.value
  }

  peek(): T | undefined {
    return this.head?.value
  }
}
```

### Double Linked Lists

```ts
type Node<T> = {
  value: T
  prev?: Node<T>
  next?: Node<T>
}

export default class DoublyLinkedList<T> {
  public length: number
  private head?: Node<T>
  private tail?: Node<T>

  constructor() {
    this.length = 0
    this.head = this.tail = undefined
  }

  prepend(item: T): void {
    const node = { value: item } as Node<T>
    ++this.length
    if (!this.head) {
      this.head = this.tail = node
      return
    }

    node.next = this.head
    this.head.prev = node
    this.head = node
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) throw new Error("Oops")
    if (idx === this.length) this.append(item)
    if (idx === 0) this.prepend(item)
    else {
      const curr = this.getAt(idx)
      const node = { value: item } as Node<T>
      node.next = curr
      node.prev = curr?.prev
      if (node.prev) node.prev.next = node
      if (curr) curr.prev = node

      ++this.length
    }
  }

  append(item: T): void {
    ++this.length
    const node = { value: item } as Node<T>
    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    node.prev = this.tail
    this.tail.next = node
    this.tail = node
  }

  remove(item: T): T | undefined {
    let curr = this.head
    for (let index = 0; curr && curr.value !== item && index < this.length; index++) curr = curr.next
    return this.removeNode(curr)
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value
  }

  getAt(idx: number): Node<T> | undefined {
    let current = this.head
    for (let i = 0; i < idx && current; i++) current = current.next
    return current
  }

  removeAt(idx: number): T | undefined {
    const curr = this.getAt(idx)
    return this.removeNode(curr)
  }

  removeNode(node?: Node<T>): T | undefined {
    if (!node) return

    --this.length
    if (this.length === 0) {
      const out = this.head?.value
      this.head = this.tail = undefined
      return out
    }
    if (node.prev) node.prev.next = node.next
    if (node.next) node.next.prev = node.prev
    if (node === this.head) this.head = node.next
    if (node === this.tail) this.tail = node.prev
    node.prev = node.next = undefined

    return node.value
  }
}
```
