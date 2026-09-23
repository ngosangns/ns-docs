---
area: technology
domain: caching
type: guide
title: Optimization Techniques
description: Techniques and lessons learned for tuning a local in-memory cache synchronized by Redis Pub/Sub, covering serialization, native HTTP, ETags, eviction, race conditions, and pod lifecycle.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - caching
  - redis
  - performance
  - golang
resource: https://github.com/huykn/distributed-cache/tree/develop/examples/stale-data-prevention
---

# Optimization Techniques

Distributed In-Memory Cache for Heavy-Read APIs: a compilation and best practices.

> **See also:** [In Memory Cache Best Practices](/Technology/Backend And Database/Practices/Distributed Cache/In Memory Cache Best Practices)

## Optimization Techniques

### Serialization Optimization

**Technique:**

- Serialize the object into bytes in the Write Service
- Publish the bytes to Redis Pub/Sub
- Reader Pods receive the bytes and update the local cache directly (no deserialization)

**Benefits:**

- Removes CPU-bound deserialization work from the Read Service
- Significantly reduces latency

**Best Practice:**

```go
// Write Service
bytes := serialize(object)
redis.Publish(channel, bytes)

// Read Service
bytes := receiveFromPubSub()
cache.Set(key, bytes) // No unmarshal
```

### Native HTTP Response

**Technique:**

- Drop the framework (Go Fiber) -> use native `net/http`
- Write bytes straight from the in-memory cache into the response

**Benefits:**

- Removes framework middleware overhead
- Reduces CPU-bound and IO-bound work

**Benchmark:**

- `/post` (local cache, returns bytes): p99 ~13ms
- `/post-marshal` (local cache, re-marshals): p99 ~15ms
- `/post-redis` (reads from Redis): p99 ~30ms

**Best Practice:**

- Read Service: Use native `net/http` for performance-critical endpoints
- Write Service: Can still use a framework for complex business logic

### HTTP 304 Caching

**Technique:**

- Compute the ETag in the Write Service when publishing the event
- The Read Service returns 304 Not Modified when the client sends a valid ETag

**Benefits:**

- Reduces network overhead
- The CPU-bound work (hashing the ETag) is handled in the Write Service and does not affect the Read Service

**Best Practice:**

- Compute the ETag once in the Write Service
- Rules can be used to bump the ETag for a batch of items, avoiding redundant hash computation

### Compression (Optional)

**Technique:**

- Gzip/Brotli compression in the Write Service
- The Read Service returns the compressed bytes directly

**Trade-off:**

- Reduces network overhead
- Adds complexity (client compatibility)
- Can be skipped for now if not needed

## Best Practices and Lessons Learned

### Cache Strategy

#### Eviction Policy

- **LFU (Least Frequently Used):** Suitable when there is clearly hot data
- **LRU (Least Recently Used):** Suitable for general use cases
- **Custom:** Depends on business logic (for example: zhash scoring for warm-up)

**Best Practice:**

```go
// Set a limit on the number of items in the cache
cache.SetMaxItems(100000)

// Pick a suitable eviction policy
cache.SetEvictionPolicy("LFU") // or "LRU"
```

#### Memory Management

- **Set max items:** Cap the number of keys in the cache
- **Monitor memory usage:** Track the memory consumption of each pod
- **Smart warm-up:** Do not cache all data, only hot data

**Best Practice:**

- Do not cache the entire dataset in a single pod
- Cache by pattern: "lay the feast out before the guests arrive" (pre-warm based on usage patterns)
- Use zhash scoring to decide which data to warm up when a new pod starts

### Event-Driven Sync

#### Redis Pub/Sub Configuration

**Best Practice:**

- Use multiple channels for different use cases:
  - Invalidate by tag
  - Invalidate by user group
  - Invalidate by category
- Monitor Redis uptime and connection health

#### Handling Message Loss

**Problem:**

- Redis Pub/Sub does not guarantee message delivery
- A pod can miss a message when it is not ready to listen

**Solutions:**

1. **Health check:** A pod only receives traffic after its cache has warmed up
2. **Fallback mechanism:** On a cache miss -> call Redis to fetch the data
3. **Singleflight pattern:** Avoid a thundering herd when many requests miss the cache at once
4. **Redis Streams:** Consider Redis Streams instead of Pub/Sub if delivery must be guaranteed

**Best Practice:**

```go
// Singleflight to avoid thundering herd
var group singleflight.Group

func getFromCache(key string) ([]byte, error) {
    if val, ok := cache.Get(key); ok {
        return val, nil
    }

    // Singleflight: only one request actually calls Redis
    result, err, _ := group.Do(key, func() (interface{}, error) {
        return redis.Get(key)
    })

    if err != nil {
        return nil, err
    }

    bytes := result.([]byte)
    cache.Set(key, bytes)
    return bytes, nil
}
```

### Race Condition Prevention

#### Cache Aside Pattern Race Condition

**Problem:**

```
1. Get cache → not found
2. Get DB → v1 (old)
3. DB update → v2 (new)
4. Replication stream set cache → v2
5. Step 2 set cache → v1 (stale data stuck)
```

**Solutions:**

1. **Short TTL:** For frequently changing data
2. **CQRS:** The Write Service/Worker warms up the cache, so the Read Service does not have to fetch and fill the cache itself
3. **Versioning:** Use a version/timestamp to check for stale data
4. **SET NX:** Use Redis SET NX to reduce stale data

**Best Practice:**

- Accept the trade-off: an AP system (CAP Theorem) -> Eventual Consistency
- Use TTL + CQRS to balance complexity and performance
- Use versioning for critical data (see: [stale-data-prevention example](https://github.com/huykn/distributed-cache/tree/develop/examples/stale-data-prevention))

#### Avoiding Race Conditions in Pub/Sub

**Problem:**

```
[D] client -> server: GET foo
[I] server -> client: Invalidate foo (somebody else touched it)
[D] server -> client: "bar" (reply of "GET foo")
```

**Solution:**

- Use a placeholder when sending the command: `cache.Set("foo", "caching-in-progress")`
- If an invalidate arrives before the data -> delete the cache entry
- If the data arrives after an invalidate -> do not set it into the cache

**Best Practice:**

- Use a single connection for both data and invalidation (if possible)
- Or implement a placeholder mechanism when using two connections

### Pod Lifecycle Management

#### Warm-up Strategy

**Problem:**

- A newly started pod has an empty cache
- Thundering herd when many requests miss the cache at once

**Solutions:**

1. **Health check:** The pod is only ready after its cache has warmed up
2. **Smart warm-up:** Use zhash scoring to identify the hot data to load
3. **Gradual traffic:** The load balancer ramps traffic up slowly

**Best Practice:**

```go
// Health check endpoint
func healthCheck() bool {
    // Check cache size
    if cache.Size() < minCacheSize {
        return false
    }

    // Check Redis connection
    if !redis.IsConnected() {
        return false
    }

    return true
}
```

#### Connection Loss Handling

**Best Practice:**

1. **Flush the cache on connection loss:** Ensures no stale data is served
2. **Ping mechanism:** Periodically ping the invalidation channel
3. **Timeout and retry:** Close the connection and flush the cache if no ping response arrives before the timeout
4. **Fallback:** Call Redis directly on a cache miss

### Monitoring and Observability

**Best Practice:**

- Monitor Redis uptime and connection health
- Track cache hit rate and miss rate
- Monitor memory usage of each pod
- Alert on Redis connection problems
- Track metrics per endpoint (p50, p99 latency)

> **See also:** [Overview And Architecture](/Technology/Backend And Database/Practices/Distributed Cache/Overview And Architecture) · [Tradeoffs And Comparison](/Technology/Backend And Database/Practices/Distributed Cache/Tradeoffs And Comparison)
