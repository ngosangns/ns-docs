---
area: technology
domain: data-structures
type: guide
title: Data Structures Overview
description: Survey of linear, non-linear, hash-based, and advanced data structures with their operations, time complexities, use cases, and selection guidance.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - data-structures
  - algorithms
---

# Data Structures Overview

## Overview

Data structures are ways of organizing and storing data so it can be accessed and manipulated efficiently.

## Classification

### Linear Data Structures

Data is organized in a sequential order.

#### Array

- **Characteristics**: Fixed size, contiguous memory
- **Access**: O(1) - random access
- **Insert/Delete**: O(n)
- **Use case**: Fixed lists, lookup tables

#### Linked List

- **Characteristics**: Dynamic size, non-contiguous
- **Access**: O(n)
- **Insert/Delete**: O(1) at the head/tail
- **Types**: Singly, Doubly, Circular
- **Use case**: Stack, Queue implementation

#### Stack

- **Characteristics**: LIFO (Last In First Out)
- **Operations**: Push, Pop, Peek - O(1)
- **Use case**: Function calls, undo operations, expression evaluation

#### Queue

- **Characteristics**: FIFO (First In First Out)
- **Operations**: Enqueue, Dequeue - O(1)
- **Variants**: Circular Queue, Priority Queue, Deque
- **Use case**: BFS, task scheduling, buffering

### Non-linear Data Structures

Data is not organized in a sequential order.

#### Tree

- **Characteristics**: Hierarchical structure
- **Binary Tree**: Each node has at most 2 children
- **Binary Search Tree (BST)**: Left < Parent < Right
- **Balanced BST**: AVL Tree, Red-Black Tree
- **Use case**: File systems, organization charts, database indexing

#### Heap

- **Characteristics**: Complete binary tree
- **Max-Heap**: Parent >= Children
- **Min-Heap**: Parent <= Children
- **Operations**: Insert, Extract-max/min - O(log n)
- **Use case**: Priority queues, heap sort

#### Trie (Prefix Tree)

- **Characteristics**: Tree for string storage
- **Operations**: Insert, Search, Delete - O(length)
- **Use case**: Auto-complete, spell checking, IP routing

#### Graph

- **Characteristics**: Collection of vertices and edges
- **Representations**: Adjacency Matrix, Adjacency List
- **Types**: Directed/Undirected, Weighted/Unweighted
- **Use case**: Social networks, maps, dependency management

### Hash-based Structures

#### Hash Table

- **Characteristics**: Key-value pairs
- **Hash function**: Map keys to indices
- **Collision handling**: Chaining, Open addressing
- **Operations**: Insert, Delete, Search - O(1) average
- **Use case**: Databases, caches, symbol tables

#### Hash Set

- **Characteristics**: Unordered unique elements
- **Operations**: Add, Remove, Contains - O(1) average
- **Use case**: Duplicate detection, membership testing

### Advanced Data Structures

#### Segment Tree

- **Characteristics**: Binary tree for range queries
- **Operations**: Build, Query, Update - O(log n)
- **Use case**: Range sum/min/max queries

#### Fenwick Tree (Binary Indexed Tree)

- **Characteristics**: Space-efficient segment tree
- **Operations**: Query prefix sum, Update - O(log n)
- **Use case**: Cumulative frequency tables

#### Disjoint Set Union (Union-Find)

- **Characteristics**: Track partitioned sets
- **Operations**: Union, Find - O(α(n)) ~ O(1)
- **Use case**: Connected components, MST (Kruskal)

#### B-Tree / B+ Tree

- **Characteristics**: Self-balancing tree for disk storage
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

- [Segment Tree](/Technology/Algorithm/Concepts/Data Structures/Segment Tree)
- [Bloom Filter](/Technology/Algorithm/Concepts/Specialized/Bloom Filter)
- [Big O Notation](/Technology/Algorithm/Concepts/Big O Notation)
- [Problem Solving Approaches](/Technology/Algorithm/Concepts/Approaches/Problem Solving Approaches)

> **See also:** [Segment Tree](/Technology/Algorithm/Concepts/Data Structures/Segment Tree) · [Big O Notation](/Technology/Algorithm/Concepts/Big O Notation) · [Bloom Filter](/Technology/Algorithm/Concepts/Specialized/Bloom Filter)
