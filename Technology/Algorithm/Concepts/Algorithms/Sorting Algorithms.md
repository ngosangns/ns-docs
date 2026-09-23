---
area: technology
domain: sorting
type: cheatsheet
title: Sorting Algorithms
description: Comparison table of common sorting algorithms with when to use each, stability trade-offs, and Big O complexity.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - sorting
  - algorithms
  - golang
resource: https://viblo.asia/p/sap-xep-voi-thoi-gian-tuyen-tinh-E1XVOZ6GLMz
---

# Sorting Algorithms

## Overview

- Linear-time sorting: https://viblo.asia/p/sap-xep-voi-thoi-gian-tuyen-tinh-E1XVOZ6GLMz

## Comparing Sorting Algorithms

| Algorithm      | Use when                      | Pros / cons              | Big O           |
| -------------- | ----------------------------- | ------------------------ | --------------- |
| Bubble Sort    | Small arrays                  |                          | n^2             |
| Insertion Sort | Small or nearly sorted arrays |                          | n^2             |
| Heap Sort      |                               | Not stable               | nlogn           |
| Quick Sort     |                               | Not stable               | nlogn → n^2     |
| RadixSort      | Sorting integers              | Cannot sort real numbers | nlog(max value) |

![](/Attachments/f6e7d8c9-a0b1-2c3d-4e5f-6a7b8c9d0e1f.png)

> **See also:** [Big O Notation](/Technology/Algorithm/Concepts/Big O Notation) · [Algo Arrays Searching Sorting](/Technology/Algorithm/Resources/Algo Arrays Searching Sorting)
