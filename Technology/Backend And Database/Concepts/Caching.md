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

Caching keeps data close to where it is read so the system answers faster and the database does less work. This note maps the four places a cache can live, the strategies that fill and refresh it, and the ways it is invalidated. The layers section runs from the client and the CDN edge to server memory and the database itself. Four read and write strategies follow, cache-aside, write-through, write-behind, and refresh-ahead, each with the cost it carries. Invalidation gets the same treatment through TTL, event-based eviction, and version keys. The note ends with operating habits such as a clear key strategy, stampede handling, hit ratio monitoring, and warming, plus a short list of tools.

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

A read can hit the browser, a CDN edge, server memory such as Redis or Memcached, or the database buffer pool. Cache-aside fills the cache only after a miss. Write-through updates the cache and the database together, which is slower but consistent. Write-behind updates the cache first and the database later, so a crash can drop data. Refresh-ahead reloads an entry before it expires.

## Resources

- [Redis Documentation](https://redis.io/documentation)
- [Caching Best Practices](https://aws.amazon.com/caching/best-practices/)

> **See also:** [Redis](/Technology/Backend And Database/Tools/Redis) · [Backend Overview](/Technology/Backend And Database/Resources/Backend Overview) · [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization)
