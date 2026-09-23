---
area: technology
domain: caching
type: guide
title: Caching
description: Overview of caching layers, read/write caching strategies, invalidation approaches, and popular caching tools for reducing latency and system load.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - caching
resource: https://redis.io/documentation
---

# Caching

## Overview

Caching is a technique for temporarily storing data to reduce access time and load on the system.

## Types of Caching

### Client-side Caching

- Browser caching
- Local storage
- Service workers

### CDN Caching

- Edge caching
- Static asset caching

### Server-side Caching

- In-memory caching (Redis, Memcached)
- Application caching
- Database query caching

### Database Caching

- Query cache
- Connection pooling
- Buffer pool

## Caching Strategies

### Cache-aside (Lazy Loading)

- The application checks the cache first
- On a miss, it queries the database and stores the result in the cache
- Simple, but incurs a cache miss penalty

### Write-through

- Writes to the cache and the database at the same time
- Guarantees consistency but is slower

### Write-behind (Write-back)

- Writes to the cache first, then asynchronously writes to the database
- Very fast, but risks data loss

### Refresh-ahead

- Automatically refreshes cache entries before they expire
- Reduces cache misses

## Cache Invalidation

### Time-based (TTL)

- Sets an expiration time on each cache entry
- Simple, but data can go stale

### Event-based

- Evicts the cache when the underlying data changes
- Guarantees consistency but is more complex

### Version-based

- Caches data keyed by its version
- Enables atomic updates

## Best Practices

- Define a clear cache key strategy
- Handle cache stampede
- Monitor the cache hit/miss ratio
- Consider cache warming
- Handle cache invalidation properly

## Popular Tools

- **Redis**: In-memory data structure store
- **Memcached**: Distributed memory caching
- **Varnish**: HTTP reverse proxy cache
- **CDN**: CloudFlare, AWS CloudFront, etc.

## Resources

- [Redis Documentation](https://redis.io/documentation)
- [Caching Best Practices](https://aws.amazon.com/caching/best-practices/)

> **See also:** [Redis](/Technology/Backend And Database/Tools/Redis) · [Backend Overview](/Technology/Backend And Database/Resources/Backend Overview) · [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization)
