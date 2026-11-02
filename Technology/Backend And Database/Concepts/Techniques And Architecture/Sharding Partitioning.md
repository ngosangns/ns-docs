---
area: technology
domain: sharding
type: guide
title: Sharding Partitioning
description: Explains database sharding across servers versus table partitioning within one database, including goals, drawbacks, and partition types.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - sharding
  - partitioning
  - database
resource: https://viblo.asia/p/database-sharding-la-gi-Az45boQVKxY
---

# Sharding Partitioning

Sharding and partitioning both split data, but they do not split it in the same place. Sharding splits a database into independent shards on different servers. Partitioning splits one table into partitions that stay one logical table inside one database. One split is across servers. The other stays within one database.

Sharding aims at performance, scalability, and availability. Shards are independent of each other. The cost is extra complexity. JOINs across shards are difficult.

Partitioning aims at query performance through query pruning, and it makes data easier to manage. The partition types named here are RANGE, LIST, HASH, and KEY.

## Sharding

- Splits a database into multiple independent shards on different servers
- **Purpose**: Improve performance, scalability, and availability
- **Drawbacks**: Adds complexity, and JOINs across shards are difficult
- [Reference](https://viblo.asia/p/database-sharding-la-gi-Az45boQVKxY)

## Partitioning

- Splits a table into multiple partitions, managed as one logical table
- **Purpose**: Improve query performance (query pruning) and make data easier to manage
- **Types**: RANGE, LIST, HASH, KEY
- [Reference](https://viblo.asia/p/tang-toc-performance-query-sql-voi-partitions-WAyK89XEZxX)

> **See also:** [Database In Microservices](/Technology/Backend And Database/Concepts/Microservices/Database In Microservices) · [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization) · [MongoDB](/Technology/Backend And Database/Tools/MongoDB)
