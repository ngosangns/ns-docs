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

The note compares three relational models for tree data. They are the adjacency list, the closure table, and the nested set model. The trade-off is between query cost and update cost. All three are relational.

In an adjacency list, each row stores a parent id. That model is simple. Querying a subtree is complex.

A closure table stores every ancestor and descendant relationship. Queries are fast. Insert and delete are complex.

In the nested set model, each node has a left value and a right value. Subtree queries are fast. Insert, delete, and move are expensive. Only this model calls out move as expensive.

## Adjacency List

- Each row stores a parent_id; simple, but querying subtrees is complex

## Closure Table

- Stores every ancestor-descendant relationship; fast queries, but insert/delete is complex

## Nested Set Model

- Each node has left/right values; subtree queries are fast, but insert/delete/move is expensive

> **See also:** [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization) · [Graph Databases](/Technology/Backend And Database/Concepts/Database Types/Graph Databases)
