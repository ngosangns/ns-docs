---
area: technology
domain: latency
type: guide
title: Hedged Request
description: Explains how hedged requests reduce long-tail latency in distributed systems by sending a duplicate request to another replica after a p95 delay, with the trade-offs around idempotency and choosing the delay.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - latency
  - distributed-systems
  - reliability
resource: https://quanghoang.substack.com/p/50-days-of-sd-hedged-request
---

# Hedged Request

> Source: [50 Days of System Design - Hedged Request](https://quanghoang.substack.com/p/50-days-of-sd-hedged-request) - Quang Hoang (Mar 15, 2025)
> Original paper: [The Tail at Scale](https://research.google/pubs/pub40801/) - Jeff Dean and Luiz Barroso (2013)

## Long-Tail Latency

- **Definition:** The phenomenon where users occasionally hit extremely high latency (lag) when using apps or websites
- **Measurement:** Use percentiles
  - **p50:** 50% of users experience latency below this value
  - **p90:** 90% of users experience latency below this value
  - **p99:** 99% of users experience latency below this value
- **Business impact:**
  - Amazon: every 100ms of latency costs 1% of revenue (2024 revenue > $600B)
  - Google (2006): every extra 0.5s of latency on the search page reduced traffic by 20%
- **The problem in distributed systems:**
  - Systems usually consist of many different services
  - The user's latency depends on the slowest service to respond
  - Example: if Google depends on 100 services, each with p99 = 1s
    - The probability that a user sees latency > 1s rises to **63%** (instead of 1%)
    - Formula: `P(at least 1 slow) = 1 - P(fast request)^100 = 1 - 0.99^100 ≈ 63%`

## Causes of Long-Tail Latency

1. **Resource Contention**
   - Datacenters are shared by many different services
   - Contention over shared resources: CPU, bandwidth, memory, network, file system
   - Background cron jobs can use a lot of resources and make the system stutter

2. **Garbage Collection (GC)**
   - GC needs exclusive access to heap memory to clean up
   - This forces other applications on the server to pause

3. **Hardware Bottlenecks**
   - Hardware problems cause uneven latency

## Hedged Request: The Solution

### Concept

- **Definition:** A technique widely used at Google to limit long-tail latency
- **Idea:** Send the same request to multiple replica servers and use the result from whichever replica responds first

### How It Works

1. Send the first request to replica server **X** and wait for a period of **D (ms)**
2. If **X** still hasn't responded after **D**, send a hedged request to another replica server **Y**
3. After receiving the first response from **X** or **Y**, cancel the other request
4. Repeat the process if neither **X** nor **Y** responds after **2\*D**

### Difference From Retry

- **Retry:** resend the request when the first one times out
- **Hedged Request:** proactively resend the request after a period **D** that is much shorter than the timeout

### Important Notes

1. **Idempotency**
   - The APIs exposed by the replica servers must be idempotent
   - The same request sent many times always produces the same result
   - Example: sending the payment request for the same order 10 times charges the credit card only once

2. **Choosing a suitable D**
   - **D too small:** overloads the system with too many hedged requests → retry storm
   - **D too large:** reduces the effectiveness of hedged requests
   - **Solution:** choose **D = the current p95 latency**
     - Only send hedged requests for the slowest 5% of requests
     - Keeps the extra load from hedged requests limited to about 5% of total requests
     - Still effectively reduces long-tail latency
   - **Percentile algorithms:** DDSketch, TDigest (for real-time stream data)

### Real-World Results

- **Experiment:** reading 1000 keys from 100 Google Bigtable servers with D = 10ms
- **Result:**
  - **p99.9 latency dropped from 1800ms to 74ms**
  - **Load on the system increased by only 2%**

### Implementation

- **Envoy:** supports request hedging (fairly basic)
- **gRPC:** supports request hedging (fairly basic)

## Other Solutions in "The Tail at Scale"

- **Tied Request:** another technique for reducing long-tail latency
- **Micro-partition:** a solution that splits data into smaller partitions

## Conclusion

- Long-tail latency is a persistent challenge in large distributed systems
- The causes often come from factors outside your control (infrastructure)
- Hedged requests don't eliminate the root cause, but they can reduce the impact on user experience
- Philosophy: "Cure the symptoms, not the disease"

> **See also:** [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker) · [Request Body Limit And Load Shedding](/Technology/System Design/Practices/Request Body Limit And Load Shedding)
