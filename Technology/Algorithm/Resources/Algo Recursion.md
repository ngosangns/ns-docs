---
area: technology
domain: algorithms
topic: golang
type: cheatsheet
title: Algo Recursion
description: Recursion
timestamp: "2026-06-19T13:43:26.155Z"
tags:
  - technology
  - algorithms
  - golang
---

## Recursion

Basic example:

```ts
function foo(n: number): number {
  if (n === 1) return 1
  return n + foo(n - 1)
}

/**
 *          ReturnAddress | ReturnValue | Arguments
 * foo(3)   Entry         | 3+?    3    | 3
 * foo(2)   foo(3)^       | 2+?  1 ^    | 2
 * foo(1)   foo(2)^       | 1    ^      | 1
 *
 * foo(3) => Outcome is 3+3=6
 */
```

A Recursion can always be broken down in 3 steps:

- Pre (what can be done before)
- Recurse (calling of the function)
- Post (doing something else after recursion)
- Complexity O(N)

### Examples

### Maze solver

```ts
;["#####E#", "#     #", "#S#####"]
```

Base cases

- It's a wall
- Off the map
- It's the end
- If we have seen it

```ts
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
]

// Base Case
const walk = (maze: string[], seen: boolean[][], path: Point[], wall: string, end: Point, curr: Point): boolean => {
  // Off the map
  if (curr.x < 0 || curr.x >= maze[0].length || curr.y < 0 || curr.y >= maze.length) return false
  // On a wall
  if (maze[curr.y][curr.x] === wall) return false
  // Already Seen
  if (seen[curr.y][curr.x]) return false
  // The end
  if (curr.x === end.x && curr.y === end.y) {
    path.push(curr)
    return true
  }

  // Pre
  seen[curr.y][curr.x] = true
  path.push(curr)
  // Curr
  for (let index = 0; index < directions.length; index++) {
    const [x, y] = directions[index]
    if (walk(maze, seen, path, wall, end, { x: curr.x + x, y: curr.y + y })) return true
  }
  // Post
  path.pop()

  return false
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = []
  const path: Point[] = []
  for (let index = 0; index < maze.length; index++) seen.push(new Array(maze[index].length).fill(false))

  walk(maze, seen, path, wall, end, start)
  return path
}
```

### Green houses

- The task is to get a district energy positive by installing solar panels.
- You can add either buy a solar panel X that turns the energy of one house to 0
- Or you buy a solar panel Y that converts the energy consumption of the house to energy production
- X and Y costs the same for any house
- Sum of energy of all houses should be <= 0
- => What is the cheapest way to make all houses non-positive?

Base Case:

- Use X
- Use Y

We actually need run through all possibilities, calculate all possible costs and return the cheapest. In a graph it would look like this:

```
              0
           /     \\
         X         Y
        /\\         /\\
       X  Y       X  Y
      /\\  /\\     /\\  /\\
     X Y  X Y   X Y  X Y
            …etc…

```

A self-building tree branching into infinity based of the amount of houses to walk through. Each house has 2 possibilities, hence it's a binary tree

```ts
const traverse = (total: number, cost: number, A: number[], X: number, Y: number, index: number, isX: boolean) => {
  if (!A[index]) return cost

  if (isX) {
    total -= A[index]
    cost += X
  } else {
    total -= A[index] * 2
    cost += Y
  }

  if (total <= 0) return cost

  index++
  const totalLeft = traverse(total, cost, A, X, Y, index, true) // left (X)
  const totalRight = traverse(total, cost, A, X, Y, index, false) // right (Y)

  return Math.min(totalLeft, totalRight)
}

function solution(A: number[], X: number, Y: number): number {
  // - Sort houses by biggest consumption as it makes most sense to get rid of those first
  A.sort((a, b) => b - a)

  // - Calculate total consumption
  const totalConsumption = A.reduce((prev, curr) => prev + curr)

  // - Traverse all possibilities
  const costsX = traverse(totalConsumption, 0, A, X, Y, 0, true)
  const costsY = traverse(totalConsumption, 0, A, X, Y, 0, false)

  // - Return the cheapest
  return Math.min(costsX, costsY)
}

console.log(solution([4, 2, 7], 4, 100)) // 12
console.log(solution([5, 3, 8, 3, 2], 2, 5)) // 7
console.log(solution([4, 2, 7], 4, 100)) // 12
console.log(solution([2, 2, 1, 2, 2], 2, 3)) // 8
console.log(solution([4, 1, 5, 3], 5, 2)) // 4
```

### Count the Islands

```ts
/**
 * I have an array with 0 and 1s
 *
 * [
 *  [0, 1, 0, 0, 1],
 *  [0, 0, 0, 1, 1],
 *  [0, 0, 0, 0, 1],
 *  [0, 0, 0, 0, 0],
 * ]
 *
 * How many islands are there on?
 *
 * - An island is any 1 that is not connected in any direction to another 1
 */

const directions = [
  [-1, 0], // top
  [1, 0], // bottom
  [0, -1], // left
  [0, 1] // right
]

const walk = (map: number[][], y: number, x: number) => {
  // seen? => false
  // is not a 1 => false
  if (!map[y] || !map[y][x] || map[y][x] === 0) return
  // is a 1 => mark as seen
  map[y][x] = 0
  // left, right, top, down, as long as there is a 1 connected => recurse
  for (let index = 0; index < directions.length; index++) walk(map, y - directions[index][0], x - directions[index][1])
}

const question = (map: number[][]) => {
  let islands = 0

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== 1) continue
      walk(map, y, x)
      ++islands
    }
  }

  return islands
}

console.log(
  // 3
  question([
    [0, 1, 0, 0, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0]
  ])
)
```
