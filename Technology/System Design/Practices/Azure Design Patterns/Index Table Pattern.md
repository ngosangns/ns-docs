---
area: technology
domain: design-patterns
type: guide
title: Index Table Pattern
description: Explains emulating secondary indexes in NoSQL stores with separate index tables, comparing denormalized, normalized, and partially normalized layouts and their consistency costs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - data
  - nosql
  - indexing
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/index-table
---

# Index Table Pattern

Create indexes over the fields in data stores that queries frequently reference. This pattern improves query performance by letting applications find the data they need to retrieve more quickly.

## Summary

- **Problem:** Many NoSQL stores organize data only by primary key. When you need to query by other attributes (for example, finding customers by city), the application has to scan all the data, which is slow and resource-intensive.
- **Solution:** Emulate secondary indexes by creating separate "index tables".
- **Strategies for structuring index tables:**
  - **Complete denormalization:** Copy all the data into every index table, each organized by a different key. This gives the fastest queries but costs storage and makes consistency hard to maintain.
  - **Normalized index tables:** The index table contains only the secondary key and the primary key of the original data table (the fact table). This saves space but needs two lookups to get the final data.
  - **Partially normalized index tables:** Copy only the most frequently queried fields into the index table. This balances performance against storage cost.
- **Important notes:**
  - **Maintaining consistency:** When the source data changes, the index tables must be updated. In the cloud, **eventual consistency** is typically used, through background tasks or queues.
  - **Storage cost:** Replicating data increases storage cost significantly.
  - **Sharding:** Index tables are extremely useful when data is sharded. They can store a mapping from a secondary key to the corresponding shard key.

## When to Use This Pattern

- When the application frequently needs to retrieve data using keys other than the primary key or shard key.
- When the current data store doesn't natively support secondary indexes.

## When Not to Use This Pattern

- **Volatile data:** If data changes too often, the cost of updating the index tables outweighs the query benefit.
- **Low-selectivity fields:** For example, a "Gender" field has only a few values, so an index helps little compared with a sequential scan.
- **Skewed data:** If 90% of records share the same value in a field, an index on that field won't be effective for most queries.

## Real-World Example

In Azure Table Storage, you can create a main table that stores movie information by "Genre" (Partition Key). If you want to find movies by "Actor", you create another index table whose Partition Key is the actor's name and whose Row Key is the movie name.

---

_Source: [Microsoft Learn - Index Table Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/index-table)_

> **See also:** [Materialized View Pattern](/Technology/System Design/Practices/Azure Design Patterns/Materialized View Pattern) · [Sharding Pattern](/Technology/System Design/Practices/Azure Design Patterns/Sharding Pattern) · [CQRS Pattern](/Technology/System Design/Practices/Azure Design Patterns/CQRS Pattern)
