---
area: technology
domain: data-structures
type: guide
title: Persistent Segment Tree
description: Explains how a persistent segment tree keeps every historical version of the data using path copying, and where it is applied.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - data-structures
  - algorithms
  - segment-tree
resource: https://viblo.asia/p/du-hanh-thoi-gian-cung-persistent-segment-tree-n1j4lkvAVwl
---

# Persistent Segment Tree

> https://viblo.asia/p/du-hanh-thoi-gian-cung-persistent-segment-tree-n1j4lkvAVwl

## Introduction

- The Persistent Segment Tree (PST) supports efficient queries over ranges of data and lets you "look back" at any past state of the data
- It extends the Segment Tree, allowing queries and updates on previous versions of the data without losing information

## Segment Tree

- A data structure that handles queries over a range of an array efficiently
- It works on the "divide and conquer" principle

## Persistence

- Preserves the history of the data, allowing earlier states to be accessed again without affecting the current state
- Each version of the tree is stored independently

## Combining Segment Tree and Persistence

- A PST is created by combining a Segment Tree with persistence
- It allows efficient queries and updates while retaining the data history

## Path Copying

- A smart copying technique that copies only the necessary nodes of the tree during an update
- It saves memory and is more efficient than copying the entire tree

## Practical Applications

- Data version management
- Undo/redo in software
- Systems that store historical data
- Competitive programming problems that require querying and updating data over time

> **See also:** [Segment Tree](/Technology/Algorithm/Concepts/Data Structures/Segment Tree) · [Data Structures Overview](/Technology/Algorithm/Concepts/Data Structures/Data Structures Overview)
