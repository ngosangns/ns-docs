---
area: technology
domain: performance
type: case-study
title: Case Study Quick Win Optimization
description: Two real-world case studies showing how tiny changes, such as reordering one line of code and moving CORS headers to Cloudflare, cut CPU by 70% and data transfer by 63% on high-traffic systems.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - performance
  - optimization
  - cloudflare
resource: https://viblo.asia/p/toi-uu-he-thong-kieu-luoi-sua-ti-xiu-ma-duoc-qua-troi-Nj4vgpg2J6r
---

# Case Study Quick Win Optimization

> **Source:** [Lazy-Style System Optimization: A Tiny Fix for a Huge Gain - Viblo](https://viblo.asia/p/toi-uu-he-thong-kieu-luoi-sua-ti-xiu-ma-duoc-qua-troi-Nj4vgpg2J6r) > **Author:** Minh Monmen

## Overview

The article shares small changes that delivered outsized results during system optimization. There are two main case studies:

## Case Study 1: 70% Less CPU From a One-Line Change

### Context

- System: a few billion requests per day
- Migrated from NodeJS to Golang
- Initial result: CPU dropped only 10% (below expectations)
- Request A accounted for 60-70% of all requests
- Request A was fully cached in memory, so it triggered no DB queries
- Latency already reached p99 < 10ms (about 96% lower than NodeJS's 200ms)

### Problem

- Goal: reduce CPU (not latency)
- Request A has a very small or empty body (status 204, 304)
- Finding: the processing order was suboptimal

### Solution

- **Change the processing order:** check the conditions for returning a response early BEFORE running the complex logic
- Specifically, move the early-return check ahead of the CPU-expensive operations
- Only one line (the order) changed, plus a few type changes that followed

### Result

- **70% less CPU** for request A
- Cause: avoided unnecessary CPU-intensive operations when the request could return early

### Lessons

- The order of logic processing matters a lot
- The early return pattern can significantly reduce CPU usage
- In large systems, every small optimization has a large impact

## Case Study 2: 63% Less Data Transfer by Moving CORS Headers to Cloudflare

### Context

- System: 1 billion requests per day
- Request bodies are small or empty (status 204, 304)
- Each request is only a few hundred bytes to 1KB

### Problem

- CORS headers were added to every response:
  ```
  access-control-allow-origin: *
  access-control-allow-methods: GET,POST,DELETE,PUT,PATCH,OPTIONS
  access-control-allow-headers: DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization
  access-control-max-age: 86400
  ```
- These headers take about 300 bytes per request
- At scale: 300 bytes × 1 billion req/day × 30 days = **$810/month** just for CORS headers

### Solution

- Move all CORS header handling and CORS preflight requests to **Cloudflare**
- Use the **Cloudflare Snippet** feature (a mini version of Cloudflare Worker)
- Requirement: the domain must be on Cloudflare's Pro plan ($20/month)
- Setup: takes only about 5 minutes

### Result

- **63% less data transfer out** (down to one third of before)
- Saved thousands of dollars in data transfer cost
- Cloudflare handles CORS at the edge, using no bandwidth from the origin server

### Lessons

- In large systems, every byte counts
- Edge computing can significantly reduce data transfer
- Cloudflare Snippet is a cost-effective solution for simple tasks such as adding headers

## Other Case Studies Mentioned (Without Detail)

- **90% less Redis bandwidth** (from 1Gbps to 100Mbps) after increasing the memory cache duration
- **99% less Redis load** (20k RPS down to 200 RPS) after adding a Bloom filter to the blacklist check
- **100% fewer random 5xx errors** (15k req/day) after fixing the NodeJS keep-alive timeout

## Approach

These quick wins are not luck. They come from:

1. **Comprehensive monitoring**
   - Build a detailed, complete monitoring system
   - Detect any anomaly

2. **Prioritizing problems**
   - Sort and set priorities based on impact
   - Focus on the critical path (the point with the largest impact)

3. **Meticulous review**
   - Don't skip the simple possibilities
   - Especially important in large systems
   - Small changes can have a big impact at scale

## Conclusion

- There are many simple changes with big effects
- The causes usually come from small details that people tend to overlook
- Systematic investment in monitoring and a structured approach are the key

> **See also:** [Request Body Limit And Load Shedding](/Technology/System Design/Practices/Request Body Limit And Load Shedding) · [Hedged Request](/Technology/System Design/Practices/Hedged Request)
