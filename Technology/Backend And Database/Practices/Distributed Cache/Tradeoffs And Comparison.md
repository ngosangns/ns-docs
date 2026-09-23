---
area: technology
domain: caching
type: guide
title: Tradeoffs And Comparison
description: Trade-offs, limitations, comparisons with Redis client-side caching, Memcached, and CDNs, and benchmark numbers for a local in-memory cache fed by Redis Pub/Sub.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - caching
  - redis
  - memcached
  - cap-theorem
---

# Tradeoffs And Comparison

Distributed In-Memory Cache for Heavy-Read APIs: a compilation and best practices.

> **See also:** [In Memory Cache Best Practices](/Technology/Backend And Database/Practices/Distributed Cache/In Memory Cache Best Practices)

## Trade-offs and Limitations

### CAP Theorem

- **Choose AP (Availability + Partition tolerance):**
  - Accept Eventual Consistency
  - Data may diverge for a short period
  - Suitable for use cases that do not require strong consistency

**Not suitable for:**

- Financial transactions (need strong consistency)
- Real-time stock prices (need real-time accuracy)
- Critical business data that requires 100% accuracy

### Memory Constraints

- **Do not cache the whole dataset:** Cache only hot data
- **Sharding complexity:** As data size grows -> sharding + routing is needed
- **Cost:** Memory cost grows as pods scale (each pod has its own local cache)

### Redis Pub/Sub Limitations

- **No delivery guarantee:** Messages can be lost
- **Single point of failure:** If Redis goes down, the entire system is affected
- **Bottleneck:** As write traffic grows, Redis Pub/Sub can become a bottleneck

**Solutions:**

- Monitor Redis health
- Have a fallback mechanism
- Consider Redis Streams or Kafka for critical use cases

### Sharding and Routing

**Problem:**

- As data size grows -> sharding is needed
- Routing by key-id is complex
- Rebalancing when scaling pods

**Trade-off:**

- Local-first approach: Simple but memory-hungry
- Sharding approach: Complex but memory-efficient

## Comparison with Other Solutions

### Redis Client-Side Caching

**Similarities:**

- Both use a local cache + Redis sync
- Both use event-driven invalidation

**Differences:**

- **Custom Pub/Sub channels:** Allow invalidation by tag, user group, etc.
- **Bytes caching:** Caches bytes directly, with no unmarshal
- **Native HTTP:** Returns bytes directly, without going through a framework

**Best Practice:**

- Redis Client-Side Caching suits general use cases
- A custom solution suits cases that need fine-grained control and optimization

### Memcached vs Redis

**When to use Memcached:**

- Large cache size (>16GB)
- Multithreading is needed
- Very large scale (Facebook scale: 1000 billion keys)
- High hit rate requirement (99%+)

**When to use Redis:**

- Pub/Sub is needed
- Data structures (hash, set, etc.) are needed
- Single-threaded is sufficient for the use case
- Cost-effective at small-to-medium scale

**Best Practice:**

- **Small-to-medium scale (<16GB):** Redis
- **Large scale (>16GB, high hit rate):** Memcached
- **Need Pub/Sub:** Redis
- **Pure key-value caching:** Memcached

### CDN and API Gateway Caching

**Trade-off:**

- **CDN/API Gateway:** Simple, reduces upstream load
- **Local cache:** Can track user behavior and apply custom logic

**Best Practice:**

- Use a CDN for public, static content
- Use a local cache for dynamic content that needs tracking/custom logic

## Performance Metrics

### Benchmark Results

- **Local cache (bytes):** p99 ~13ms
- **Local cache (marshal):** p99 ~15ms
- **Redis direct:** p99 ~30ms

### Production Metrics

- **Per pod:** ~60k req/s
- **1M req/s:** Needs <20 pods
- **Cost:** Horizontal scaling (pods) is cheaper than vertical scaling (DB/Redis)

> **See also:** [Overview And Architecture](/Technology/Backend And Database/Practices/Distributed Cache/Overview And Architecture) · [Optimization Techniques](/Technology/Backend And Database/Practices/Distributed Cache/Optimization Techniques)
