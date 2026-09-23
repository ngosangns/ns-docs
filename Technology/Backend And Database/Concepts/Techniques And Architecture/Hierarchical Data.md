---
area: technology
domain: hierarchical-data
type: guide
title: Hierarchical Data
description: Compares three relational models for storing tree data (adjacency list, closure table, nested set) and their query and update trade-offs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - hierarchical-data
  - database
---

# Hierarchical Data

Models for storing hierarchical (tree) data.

## Adjacency List

- Each row stores a parent_id; simple, but querying subtrees is complex

## Closure Table

- Stores every ancestor-descendant relationship; fast queries, but insert/delete is complex

## Nested Set Model

- Each node has left/right values; subtree queries are fast, but insert/delete/move is expensive

> **See also:** [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization) · [Graph Databases](/Technology/Backend And Database/Concepts/Database Types/Graph Databases)
