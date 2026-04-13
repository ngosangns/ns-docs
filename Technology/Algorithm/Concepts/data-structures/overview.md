---
area: technology
domain: algorithm
topic: data-structures
type: resource
lang: vi
created: "2026-04-13"
modified: "2026-04-13"
---

# Data Structures Overview

## Tổng quan

Data structures (Cấu trúc dữ liệu) là cách tổ chức và lưu trữ dữ liệu để có thể truy cập và thao tác hiệu quả.

## Phân loại

### 1. Linear Data Structures

Dữ liệu được tổ chức theo trình tự tuần tự.

#### Array (Mảng)

- **Đặc điểm**: Fixed size, contiguous memory
- **Truy cập**: O(1) - random access
- **Thêm/Xóa**: O(n)
- **Use case**: Danh sách cố định, lookup table

#### Linked List (Danh sách liên kết)

- **Đặc điểm**: Dynamic size, non-contiguous
- **Truy cập**: O(n)
- **Thêm/Xóa**: O(1) tại đầu/cuối
- **Types**: Singly, Doubly, Circular
- **Use case**: Stack, Queue implementation

#### Stack (Ngăn xếp)

- **Đặc điểm**: LIFO (Last In First Out)
- **Operations**: Push, Pop, Peek - O(1)
- **Use case**: Function calls, undo operations, expression evaluation

#### Queue (Hàng đợi)

- **Đặc điểm**: FIFO (First In First Out)
- **Operations**: Enqueue, Dequeue - O(1)
- **Variants**: Circular Queue, Priority Queue, Deque
- **Use case**: BFS, task scheduling, buffering

### 2. Non-linear Data Structures

Dữ liệu không được tổ chức theo trình tự.

#### Tree (Cây)

- **Đặc điểm**: Hierarchical structure
- **Binary Tree**: Mỗi node có tối đa 2 children
- **Binary Search Tree (BST)**: Left < Parent < Right
- **Balanced BST**: AVL Tree, Red-Black Tree
- **Use case**: File systems, organization charts, database indexing

#### Heap

- **Đặc điểm**: Complete binary tree
- **Max-Heap**: Parent >= Children
- **Min-Heap**: Parent <= Children
- **Operations**: Insert, Extract-max/min - O(log n)
- **Use case**: Priority queues, heap sort

#### Trie (Prefix Tree)

- **Đặc điểm**: Tree cho string storage
- **Operations**: Insert, Search, Delete - O(length)
- **Use case**: Auto-complete, spell checking, IP routing

#### Graph (Đồ thị)

- **Đặc điểm**: Collection của vertices và edges
- **Representations**: Adjacency Matrix, Adjacency List
- **Types**: Directed/Undirected, Weighted/Unweighted
- **Use case**: Social networks, maps, dependency management

### 3. Hash-based Structures

#### Hash Table

- **Đặc điểm**: Key-value pairs
- **Hash function**: Map keys to indices
- **Collision handling**: Chaining, Open addressing
- **Operations**: Insert, Delete, Search - O(1) average
- **Use case**: Databases, caches, symbol tables

#### Hash Set

- **Đặc điểm**: Unordered unique elements
- **Operations**: Add, Remove, Contains - O(1) average
- **Use case**: Duplicate detection, membership testing

### 4. Advanced Data Structures

#### Segment Tree

- **Đặc điểm**: Binary tree cho range queries
- **Operations**: Build, Query, Update - O(log n)
- **Use case**: Range sum/min/max queries

#### Fenwick Tree (Binary Indexed Tree)

- **Đặc điểm**: Space-efficient segment tree
- **Operations**: Query prefix sum, Update - O(log n)
- **Use case**: Cumulative frequency tables

#### Disjoint Set Union (Union-Find)

- **Đặc điểm**: Track partitioned sets
- **Operations**: Union, Find - O(α(n)) ~ O(1)
- **Use case**: Connected components, MST (Kruskal)

#### B-Tree / B+ Tree

- **Đặc điểm**: Self-balancing tree for disk storage
- **High branching factor**: Reduce disk I/O
- **Use case**: Database indexing, file systems

## Time Complexity Comparison

| Data Structure | Access     | Search     | Insert     | Delete     |
| -------------- | ---------- | ---------- | ---------- | ---------- |
| Array          | O(1)       | O(n)       | O(n)       | O(n)       |
| Linked List    | O(n)       | O(n)       | O(1)\*     | O(1)\*     |
| Stack          | O(n)       | O(n)       | O(1)       | O(1)       |
| Queue          | O(n)       | O(n)       | O(1)       | O(1)       |
| BST            | O(log n)\* | O(log n)\* | O(log n)\* | O(log n)\* |
| Heap           | O(n)       | O(n)       | O(log n)   | O(log n)   |
| Hash Table     | N/A        | O(1)\*     | O(1)\*     | O(1)\*     |

\*Amortized or average case

## How to Choose

1. **Frequent lookups**: Hash Table, Array
2. **Ordered data**: BST, Heap
3. **LIFO/FIFO**: Stack, Queue
4. **Hierarchical**: Tree
5. **Relationships**: Graph
6. **Range queries**: Segment Tree, Fenwick Tree
7. **External storage**: B-Tree

## Resources

- [[segment-tree]]
- [[bloom-filter]]
- [[technology/algorithm/concepts/big-o-notation]]
- [[technology/algorithm/concepts/approaches/problem-solving-approaches]]
