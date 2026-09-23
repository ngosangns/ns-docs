---
area: technology
domain: caching
type: guide
title: Overview And Architecture
description: Problem context and reference architecture for serving 1M+ requests per second on heavy-read APIs using local in-memory caches synchronized through Redis Pub/Sub.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - caching
  - redis
  - cqrs
---

# Overview And Architecture

Distributed In-Memory Cache for Heavy-Read APIs: a compilation and best practices.

> **See also:** [In Memory Cache Best Practices](/Technology/Backend And Database/Practices/Distributed Cache/In Memory Cache Best Practices)

## Problem Overview

### Context

- **Requirement:** Handle 1M+ requests/second for heavy-read APIs
- **Problem:** Vertical scaling (scaling the DB/Redis) is expensive and inefficient
- **Use case:** E-commerce with a very large write-to-read ratio (for example: posting a product vs viewing a product)

### Goals

- **Ultra-low latency:** Sub-millisecond response time
- **Linear scaling:** Adding reader pods increases throughput proportionally
- **Cost-effective:** Horizontal scaling (pods) instead of vertical scaling (DB/Redis)
- **Real-time sync:** Automatic propagation through pub/sub

## Solution Architecture

### High-Level Architecture

```
Writer Service (POST)
   → Serialize object → Publish event to Redis
Redis Pub/Sub
   → Fan-out event to all Reader Pods
Reader Pods (GET)
   → Update Local In-Memory Cache (LFU/LRU)
   → Return bytes directly via net/http (no unmarshal/serialize)
```

### Key Characteristics

- **CQRS Pattern:** Separates the Write Service from the Read Service
- **Local-first caching:** Each pod keeps a local cache in RAM
- **Event-driven sync:** Redis Pub/Sub keeps the cache in sync across pods
- **Zero serialization overhead:** Caches bytes directly, with no unmarshal/marshal

> **See also:** [Optimization Techniques](/Technology/Backend And Database/Practices/Distributed Cache/Optimization Techniques) · [Tradeoffs And Comparison](/Technology/Backend And Database/Practices/Distributed Cache/Tradeoffs And Comparison)
