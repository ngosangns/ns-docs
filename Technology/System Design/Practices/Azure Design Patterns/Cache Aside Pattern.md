---
area: technology
domain: caching
type: guide
title: Cache Aside Pattern
description: Explains how to load data into a cache on demand from a data store, and how to invalidate entries on update to keep the cache consistent, with a .NET example.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - caching
  - azure
  - design-patterns
  - performance
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside
---

# Cache Aside Pattern

This pattern loads data into a cache on demand from a data store. Use it to improve performance and to maintain consistency between the data held in the cache and the data in the underlying data store.

## Context and Problem

Applications use a cache to improve performance when repeatedly accessing information. However, cached data is not always consistent with the original data store. You need a strategy to:

- Keep the cached data as up to date as possible.
- Detect when cached data becomes stale and handle it appropriately.

## Solution

The Cache-Aside pattern loads data into the cache when it is needed. The flow is:

1.  **Read:** The application checks whether the item is in the cache.
2.  **Cache miss:** If it isn't, the application reads the data from the original store (the database).
3.  **Store:** The application puts the data it just read into the cache and returns it to the caller.

When updating information, the application writes the update to the original store and invalidates (removes) the corresponding entry in the cache to ensure consistency.

## Issues and Considerations

- **Time to live (TTL):** Don't set it too short (which loads the DB) or too long (which leaves data stale).
- **Eviction policy:** A cache has limited size, so a policy such as LRU (Least Recently Used) is needed to free space.
- **Consistency:** This pattern doesn't guarantee immediate consistency if the data in the DB is changed by an external process.
- **Update order:** It is important to update the original data store _before_ removing the entry from the cache, to avoid stale data being reloaded into the cache.

## When to Use This Pattern

- When the cache system doesn't provide automatic read-through/write-through operations.
- When resource demand is unpredictable.

## When Not to Use This Pattern

- When the data is sensitive or security-related (access it directly from the primary source).
- When the dataset is static (preload it fully at startup).
- When most requests miss the cache (the overhead of checking the cache will reduce performance).

## Implementation Example (.NET)

```csharp
public async Task<MyEntity> GetMyEntityAsync(int id)
{
    var key = $"MyEntity:{id}";
    var cache = Connection.GetDatabase();

    // 1. Try to get the data from the cache
    var json = await cache.StringGetAsync(key);
    if (!string.IsNullOrWhiteSpace(json))
    {
        return JsonConvert.DeserializeObject<MyEntity>(json);
    }

    // 2. Cache miss: read from the original DB
    var value = await _db.MyEntities.FindAsync(id);

    if (value != null)
    {
        // 3. Store in the cache with an expiry time (e.g. 5 minutes)
        await cache.StringSetAsync(key, JsonConvert.SerializeObject(value), TimeSpan.FromMinutes(5));
    }

    return value;
}

public async Task UpdateEntityAsync(MyEntity entity)
{
    // 1. Update the DB first
    await _db.UpdateAsync(entity);

    // 2. Then remove the cache entry
    var key = $"MyEntity:{entity.Id}";
    var cache = Connection.GetDatabase();
    await cache.KeyDeleteAsync(key);
}
```

---

_Source: [Azure Architecture Center - Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside)_

> **See also:** [Materialized View Pattern](/Technology/System Design/Practices/Azure Design Patterns/Materialized View Pattern) · [Index Table Pattern](/Technology/System Design/Practices/Azure Design Patterns/Index Table Pattern) · [Sharding Pattern](/Technology/System Design/Practices/Azure Design Patterns/Sharding Pattern)
