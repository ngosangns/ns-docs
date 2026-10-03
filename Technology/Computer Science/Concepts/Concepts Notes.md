---
area: technology
domain: computer-science
type: resource
title: Concepts Notes
description: "Notes on CPU and disk latency, and on OS time slicing and CPU scheduling."
timestamp: "2026-10-03T00:00:00.000Z"
tags:
  - technology
  - cpu-performance
  - computer-science
  - latency
  - operating-systems
  - scheduling
resource: https://viblo.asia/p/tim-hieu-ve-do-tre-trong-bo-xu-ly-trung-tam-va-o-cung-toi-uu-hoa-hieu-suat-he-thong-BQyJKvyw4Me
---

# Concepts Notes

## CPU Performance

### Latency in the CPU and Disk - Optimizing System Performance

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

> **See also:** [Signal Processing](/Technology/Computer Science/Concepts/Signal Processing)

## Operating Systems

### Time Slicing and Scheduling in the OS

- Time slicing is a scheduling technique in which each process or thread is given a fixed amount of time to run, after which control passes to another process or thread. The goal of time slicing is to ensure fairness and efficiency in sharing CPU resources among processes and threads without letting any one process monopolize them.
- Scheduling is the process of deciding which process or thread runs next on the CPU.
  - There are many scheduling algorithms, each with different characteristics and goals. Some common ones include:
    - **First Come First Serve (FCFS)**: Runs each process to completion in arrival order.
    - **Shortest Job Next (SJN)**: Runs the process with the shortest execution time first.
    - **Priority Scheduling**: Runs the process with the higher priority first.
    - **Round Robin**: Uses time slicing; each process gets a chance to run for a fixed time slice before switching to another process.

> **See also:** [Signal Processing](/Technology/Computer Science/Concepts/Signal Processing)
