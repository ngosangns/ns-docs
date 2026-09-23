---
area: technology
domain: cpu-performance
type: guide
title: CPU Performance
description: Overview of latency across CPU caches, RAM, SSD and disk, plus branch prediction, shared memory contention and false sharing for system performance tuning.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - cpu-performance
  - computer-science
  - latency
resource: https://viblo.asia/p/tim-hieu-ve-do-tre-trong-bo-xu-ly-trung-tam-va-o-cung-toi-uu-hoa-hieu-suat-he-thong-BQyJKvyw4Me
---

# CPU Performance

## Latency in the CPU and Disk - Optimizing System Performance

- **System latency**:
  - Reading from disk is 80 times slower than RAM, and even SSD is still 4 times slower than RAM
  - Latency from fastest to slowest: CPU L1 cache (0.5 ns), L2 cache (7 ns), RAM (100 ns), SSD (1,000,000 ns for 1 MB), disk (20,000,000 ns for 1 MB)
  - Understanding latency helps optimize system performance by preferring the faster memory tiers
- **CPU branch prediction**:
  - Modern CPUs use branch predictors to handle branching instructions efficiently, minimizing wasted CPU cycles
  - This lets the CPU predict the program's direction ahead of time and preload the instructions it will need
- **The illusion of shared memory**:
  - Processes/threads use a common memory region to interact, but reads and writes must be managed and resource contention avoided
  - Sharing memory between processes/threads can lead to resource contention and reduced performance if not handled properly
- **False sharing**:
  - When multiple CPU cores work on different variables that sit on the same cache line, the cores must synchronize, which degrades performance
  - This is a subtle problem in multithreaded programming that needs attention to optimize performance
- Source: https://viblo.asia/p/tim-hieu-ve-do-tre-trong-bo-xu-ly-trung-tam-va-o-cung-toi-uu-hoa-hieu-suat-he-thong-BQyJKvyw4Me

> **See also:** [Operating Systems](/Technology/Computer Science/Concepts/Operating Systems) · [Signal Processing](/Technology/Computer Science/Concepts/Signal Processing)
