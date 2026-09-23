---
area: technology
domain: data-partitioning
type: guide
title: Sharding Pattern
description: Split a data store into horizontal partitions (shards) using lookup, range, or hash strategies to improve scalability and performance.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - data-partitioning
  - databases
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding
---

# Sharding Pattern

## Summary

The Sharding pattern divides a data store into a set of horizontal partitions called shards. Each shard has the same schema but holds its own distinct subset of the data. This improves scalability, reduces resource contention, and optimizes performance when storing and accessing large volumes of data.

## Sharding Strategies

1. **Lookup strategy**:
   - Uses a map to route requests to the shard that holds the data, based on the shard key.
   - Gives good control over data placement and makes rebalancing easy through virtual partitions.
2. **Range strategy**:
   - Groups related items into the same shard and orders them by shard key (for example: by month/year).
   - Very effective for range queries.
   - However, it easily leads to "hotspots" if new data keeps concentrating in one particular range.
3. **Hash strategy**:
   - Applies a hash function to the shard key to decide where the data is stored.
   - Distributes data and load more evenly, minimizing hotspots.
   - Makes range queries and shard rebalancing more difficult.

## Key Points and Considerations

- **Shard key**: Must be a static, unchanging attribute that guarantees uniqueness. Choosing the right shard key is the most important factor for optimal performance.
- **Consistency**: Maintaining referential integrity and consistency across shards is difficult. You usually have to accept an _eventual consistency_ model.
- **Cross-shard queries**: Queries that touch multiple shards are less efficient. Avoid joins across shards. Parallel tasks (fan-out queries) can improve speed but add complexity.
- **Rebalancing**: When data grows unevenly, you need a strategy for moving data between shards without disrupting the system.

## When to Use

- When the data store needs to scale beyond the capacity of a single storage node.
- When you need to reduce contention and improve response performance for a large number of concurrent users.
- When you need to keep data geographically close to users to reduce latency.

## Relationships

- **Index Table Pattern**: Supports querying data by attributes other than the shard key.
- **Materialized View Pattern**: Helps aggregate and summarize data from multiple shards to speed up queries.
- **Data Partitioning Guidance**: Sharding is a form of horizontal data partitioning.

## References

- [Microsoft Learn - Sharding Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding)

> **See also:** [Index Table Pattern](/Technology/System Design/Practices/Azure Design Patterns/Index Table Pattern) · [Materialized View Pattern](/Technology/System Design/Practices/Azure Design Patterns/Materialized View Pattern) · [Geode Pattern](/Technology/System Design/Practices/Azure Design Patterns/Geode Pattern)
