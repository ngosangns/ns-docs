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

A persistent segment tree answers range queries and also keeps every earlier state of the array. The note starts from the plain segment tree and its divide and conquer structure. It then explains persistence, where each version of the tree is stored so past states survive untouched. Combining the two ideas gives a structure that supports queries and updates on old versions. Path copying is the key trick. An update copies only the nodes on the changed path instead of the whole tree, which keeps memory low. The closing section lists practical uses, from data version management and undo/redo to systems that store historical data and competitive programming tasks that query data over time.

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

The sections build on each other. The Segment Tree supplies the divide and conquer structure that makes a range query cheap. Persistence adds the history, because each version of the tree is stored independently and an earlier state can be read again without affecting the current one. Combining the two gives a tree that answers queries and updates on previous versions while the data history survives. Path copying is what makes that combination affordable. During an update only the nodes on the changed path are copied, so the rest of the tree is shared with the versions before it. Copying the entire tree on every update would work but would cost far more memory and time. That single choice explains why path copying gets its own section between the combination and the applications. The applications follow from the same property. Data version management and undo/redo both need old states. Systems that store historical data need them at scale. Contest problems need them for each query over time.

## Practical Applications

- Data version management
- Undo/redo in software
- Systems that store historical data
- Competitive programming problems that require querying and updating data over time

> **See also:** [Segment Tree](/Technology/Algorithm/Concepts/Data Structures/Segment Tree) · [Data Structures Overview](/Technology/Algorithm/Concepts/Data Structures/Data Structures Overview)
