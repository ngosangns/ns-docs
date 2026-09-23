---
area: technology
domain: data-structures
type: guide
title: Segment Tree
description: Explains the segment tree for O(log n) range queries and updates, with example problems (LIS, range minimum) and lazy propagation.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - data-structures
  - algorithms
  - segment-tree
resource: https://vnoi.info/wiki/algo/data-structures/segment-tree-basic.md
---

# Segment Tree

## Overview

A segment tree is a data structure that performs queries and updates over a range of array elements efficiently, in O(log n) time.

## Basic Problems Using a Segment Tree

### Problem 1: Longest Increasing Subsequence (LIS)

- **Description**: Find the longest strictly increasing subsequence in a sequence of numbers
- **Method**:
  - Use coordinate compression to map the values in the array to a smaller range while preserving their relative order
  - Use a segment tree to store and query the length of the longest increasing subsequence ending at each element
  - Update and query the segment tree to find the maximum value over the relevant ranges, and from that compute the LIS

### Problem 2: Range Minimum Query

- **Description**: Given an array A, answer queries for the minimum value over the range [l, r]
- **Method**:
  - Build a segment tree that maintains the minimum value over ranges
  - Answer the minimum query over [l, r] efficiently

## Lazy Propagation

### The Problem

When you need to update a range of elements in the array (rather than a single element), updating each element individually can lead to a high complexity of O(n log n).

### The Idea

- Instead of updating every element, update only the nodes that cover the largest ranges in the segment tree (the nodes closest to the root) whose union is exactly the range to be updated
- Store a value at those nodes, called the lazy update value, marking that every node within this range must eventually be updated by the corresponding value
- The child nodes are brought up to date only when really necessary (during a query or when the actual value is needed)

### Implementation

- Each node in the segment tree stores an extra `lazy` value recording a pending update
- To update a range, only the `lazy` values at the corresponding nodes are updated, without immediately updating the actual values
- On a query, or when the actual value is needed, propagate the `lazy` value down to the child nodes and update the actual values

### Benefits

- Reduces the complexity of range update operations from O(n log n) to O(log n)
- Optimizes performance for problems with many range update queries

### Illustrated Example

With array A = [9, 2, 6, 3, 1, 5, 7], when the range [1, 6] must be updated:

- Instead of descending to update all nodes containing elements of the range [1, 6]
- Only the two largest nodes, [1, 4] and [5, 6], are updated (their union is exactly the range [1, 6])
- The child nodes are updated when necessary

## References

- [VNOI - Segment Tree Basic](https://vnoi.info/wiki/algo/data-structures/segment-tree-basic.md)
- [CP-Algorithms - Segment Tree](https://cp-algorithms.com/data_structures/segment_tree.html)

> **See also:** [Persistent Segment Tree](/Technology/Algorithm/Concepts/Data Structures/Persistent Segment Tree) · [Data Structures Overview](/Technology/Algorithm/Concepts/Data Structures/Data Structures Overview) · [Learning Resources](/Technology/Algorithm/Resources/Learning Resources)
