---
area: technology
domain: algorithms
type: guide
title: Problem Solving Approaches
description: Overview of the main algorithmic problem-solving strategies (brute force, greedy, divide and conquer, dynamic programming, backtracking, and more) and when to apply each.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - algorithms
  - problem-solving
resource: https://vnoi.info/wiki/translate/topcoder/How-to-Find-a-Solution.md
---

# Problem Solving Approaches

## Table of Contents

- [References](#references)
- [Approaches](#approaches)
- [TODO](#todo)

## References

- The Art of Solving Problems (vnoi.info): https://vnoi.info/wiki/translate/topcoder/How-to-Find-a-Solution.md
- https://viblo.asia/p/cac-cach-tiep-can-trong-giai-thuat-huong-dan-de-hieu-cho-lap-trinh-vien-oK9Vy6rq4QR

## Approaches

### Brute Force

- Try every possible option to find the right answer
- Suitable when the data is small or no better method is known yet
- Downside: slow on large data

### Greedy

- At each step, pick the best option available now without regard for the future
- Applies when the problem can be solved in small steps and earlier choices do not much affect later ones
- Note: it does not always produce the optimal result

### Divide and Conquer

- Split a large problem into smaller parts, solve each part, then combine the results
- Useful when the problem can be split while preserving its nature and the results are easy to combine

### Dynamic Programming

- Store the results of steps already computed to avoid recomputation
- Use when the problem has many repeated parts that can be broken into related subproblems

### Backtracking

- Try a choice; if it does not fit, go back and try another
- Use when you want to find all solutions or there are many possibilities but the unreasonable ones can be pruned

### Branch and Bound

- Similar to backtracking but adds upper and lower bounds to prune unnecessary branches
- Applies when you need an optimal solution and can determine the search range in advance

### Graph Algorithms

- Traverse vertices and edges to find the solution
- Use when the problem can be modeled as a graph

### Bit Manipulation

- Use bit-level operations to process data faster
- Useful when working with binary numbers or optimizing memory

### Machine Learning Approach

- Use data to learn the patterns instead of writing a fixed algorithm
- Applies when the problem is too complex to write an algorithm for or when you need to predict from existing data

## TODO

- Add a table of signals indicating when to apply each algorithm to a problem

> **See also:** [Algorithm Development](/Technology/Algorithm/Concepts/Approaches/Algorithm Development) · [Enumeration Problems](/Technology/Algorithm/Concepts/Approaches/Enumeration Problems) · [Learning Resources](/Technology/Algorithm/Resources/Learning Resources)
