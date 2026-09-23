---
area: technology
domain: operating-systems
type: guide
title: Operating Systems
description: Explains OS time slicing and CPU scheduling, with the common algorithms FCFS, SJN, priority scheduling and round robin.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - operating-systems
  - computer-science
  - scheduling
---

# Operating Systems

## Time Slicing and Scheduling in the OS

- Time slicing is a scheduling technique in which each process or thread is given a fixed amount of time to run, after which control passes to another process or thread. The goal of time slicing is to ensure fairness and efficiency in sharing CPU resources among processes and threads without letting any one process monopolize them.
- Scheduling is the process of deciding which process or thread runs next on the CPU.
  - There are many scheduling algorithms, each with different characteristics and goals. Some common ones include:
    - **First Come First Serve (FCFS)**: Runs each process to completion in arrival order.
    - **Shortest Job Next (SJN)**: Runs the process with the shortest execution time first.
    - **Priority Scheduling**: Runs the process with the higher priority first.
    - **Round Robin**: Uses time slicing; each process gets a chance to run for a fixed time slice before switching to another process.

> **See also:** [CPU Performance](/Technology/Computer Science/Concepts/CPU Performance) · [Signal Processing](/Technology/Computer Science/Concepts/Signal Processing)
