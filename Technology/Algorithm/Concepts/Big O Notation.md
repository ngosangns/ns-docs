---
area: technology
domain: algorithms
type: note
title: Big O Notation
description: Short note defining Big O notation as the number of operations relative to input size and how to simplify a complexity function.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - algorithms
  - complexity
  - golang
---

# Big O Notation

## Definition

- Definition: the number of operations that must be performed as a function of input size
- Typically used to evaluate the worst case
- Common notation: $\Theta(f(N))$
- Simplification: keep the highest-order term and drop constants (example)

$$
f(N)=2x^2+2x+2 \Rightarrow f(N)=x^2
$$

![](/Attachments/6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d.png)

> **See also:** [Sorting Algorithms](/Technology/Algorithm/Concepts/Algorithms/Sorting Algorithms) · [Data Structures Overview](/Technology/Algorithm/Concepts/Data Structures/Data Structures Overview)
