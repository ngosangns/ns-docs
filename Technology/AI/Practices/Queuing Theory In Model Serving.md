---
area: technology
domain: mlops
type: case-study
title: Queuing Theory In Model Serving
description: A debugging story showing how modeling replayed traffic as a Poisson process, rather than fixed intervals, explained a 2x p99 latency gap in GPU model serving.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - mlops
  - queuing-theory
  - latency
resource: https://en.wikipedia.org/wiki/Queueing_theory
---

# Queuing Theory In Model Serving

## Problem Summary

### Context

- **System**: Model serving - deploying AI models to production
- **Goal**: Optimize latency and throughput on GPUs
  - Latency: must be capped at a given level (a business requirement)
  - Throughput: determines how many GPUs to buy (the higher, the more you save)

### The mystery

- **Dev system**: Records production traffic and replays it at different throughputs to measure p99 latency
- **Result**: The replay system's p99 latency was **only half** of production's p99 latency at the same throughput
- **Debugging attempts**: Reviewed data and code and came up with many hypotheses, but none explained the difference

## Finding the Cause

### Observation from profiling

- When analyzing CUDA kernels, the kernels of different requests were found to be **interleaved** with one another
- **Insight**: A GPU can only run kernels sequentially
- When 2 requests are processed at the same time → each request's latency is stretched
- **Conclusion**: Traffic pattern matters a great deal; it doesn't depend on throughput alone

### Worked example

**Assume**: 10 qps (queries per second), 100ms per request on average, 4 requests received in 400ms, and the GPU handles each request alone in 50ms

**System 1 - Fixed intervals:**

- A new request arrives at a steady 100ms interval
- The GPU can process each request in 50ms (the other 50ms is idle)
- **Latency**: 50ms

**System 2 - Burst traffic:**

- 4 requests arrive at the same time
- The GPU has to process 4 requests concurrently, with their kernels interleaved
- **Latency**: 50ms × 4 = 200ms

## Solution

### Queuing Theory

- Traffic in real systems typically follows a **Poisson process** with a **Poisson distribution**
- The replay system initially used **fixed intervals** → it did not reflect the real traffic pattern

### Implementation

- Reimplemented the replay code to follow a **Poisson distribution** instead of fixed intervals
- **Result**: The gap between production and replay dropped to **under 5%**

## Lessons

1. **Foundational math and statistics knowledge** matters a lot in practice
2. **Traffic pattern** strongly affects latency; it doesn't depend on throughput alone
3. When benchmarking/replaying traffic, simulate the real traffic's **distribution** correctly
4. **Queuing theory** is a useful tool for understanding and optimizing systems

## References

- [Queueing Theory](https://en.wikipedia.org/wiki/Queueing_theory)
- [Poisson Point Process](https://en.wikipedia.org/wiki/Poisson_point_process)
- Central Limit Theorem (to understand why real traffic follows a Poisson distribution)

> **See also:** [DoorDash Feature Store Redis Optimization](/Technology/AI/Practices/DoorDash Feature Store Redis Optimization) · [Monitoring Tracking](/Technology/AI/Tools/MLOps/Monitoring Tracking)
