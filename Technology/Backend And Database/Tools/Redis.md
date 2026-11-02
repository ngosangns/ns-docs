---
area: technology
domain: redis
type: tool
title: Redis
description: Guide to Redis, the in-memory data structure store used as a database, cache, and message broker, covering its use cases, data types, persistence, and best practices.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - redis
  - caching
  - nosql
resource: https://redis.io/documentation
---

# Redis

Redis is an in-memory data structure store that serves as a database, a cache, and a message broker. This note covers what it offers and where it fits. The feature list runs through RAM storage, RDB and AOF persistence, replication, Cluster, and Pub/Sub. Use cases are grouped by job, from caching sessions, pages, and API responses to leaderboards, rate limiting, task queues, and session management. Each core data type gets a short command example, covering strings, hashes, lists, sets, and sorted sets. The persistence section compares point-in-time RDB snapshots with the append-only file. It closes with production habits such as running Cluster, setting maxmemory and an eviction policy, monitoring, backups, and access control.

## Overview

Redis (Remote Dictionary Server) is an in-memory data structure store, used as a database, cache, and message broker.

## Features

- **In-memory storage**: Data is kept in RAM
- **Persistence**: Supports saving data to disk (RDB, AOF)
- **High performance**: Hundreds of thousands of operations per second
- **Data structures**: Strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, geospatial indexes
- **Replication**: Master-slave replication
- **Clustering**: Redis Cluster for horizontal scaling
- **Pub/Sub**: Message passing pattern

## Use Cases

### Caching

- Session storage
- Page caching
- API response caching
- Object caching

### Real-time Analytics

- Leaderboards
- Counters
- Rate limiting

### Message Queue

- Task queues
- Event streaming
- Pub/Sub messaging

### Session Management

- User sessions
- Shopping carts
- Authentication tokens

## Data Types

### Strings

```
SET key value
GET key
INCR counter
```

### Hashes

```
HSET user:1 name "John" age 30
HGET user:1 name
```

### Lists

```
LPUSH queue job1
RPUSH queue job2
LPOP queue
```

### Sets

```
SADD tags "python" "redis"
SMEMBERS tags
```

### Sorted Sets

```
ZADD leaderboard 100 "player1"
ZREVRANGE leaderboard 0 9 WITHSCORES
```

## Persistence

### RDB (Redis Database)

- Point-in-time snapshots
- Compact file format
- Good for disaster recovery

### AOF (Append Only File)

- Logs every write operation
- Better durability
- Larger file size

## Best Practices

- Use Redis Cluster in production
- Configure maxmemory and an eviction policy
- Monitor with Redis CLI or Redis Insight
- Back up regularly
- Security: bind to specific interfaces and use AUTH

Redis keeps data in RAM and can also save it to disk through RDB or AOF. RDB stores a compact point-in-time snapshot and suits disaster recovery. AOF logs every write, which gives better durability and a larger file. The same server caches sessions, pages, API responses, and objects. It also keeps leaderboards, counters, and rate limits. Strings, hashes, lists, sets, and sorted sets cover those jobs, along with bitmaps, hyperloglogs, and geospatial indexes. The note rates performance at hundreds of thousands of operations per second. In production, use Cluster, set maxmemory with an eviction policy, and monitor from the CLI or Redis Insight. Also back up regularly, bind specific interfaces, and use AUTH.

## Resources

- [Redis Documentation](https://redis.io/documentation)
- [Redis Commands](https://redis.io/commands)
- [Redis Best Practices](https://redis.io/docs/manual/scaling/)

> **See also:** [Caching](/Technology/Backend And Database/Concepts/Caching) · [NoSQL Databases](/Technology/Backend And Database/Concepts/Database Types/NoSQL Databases) · [MongoDB](/Technology/Backend And Database/Tools/MongoDB)
