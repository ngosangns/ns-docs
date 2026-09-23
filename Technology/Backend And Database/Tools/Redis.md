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

## Resources

- [Redis Documentation](https://redis.io/documentation)
- [Redis Commands](https://redis.io/commands)
- [Redis Best Practices](https://redis.io/docs/manual/scaling/)

> **See also:** [Caching](/Technology/Backend And Database/Concepts/Caching) · [NoSQL Databases](/Technology/Backend And Database/Concepts/Database Types/NoSQL Databases) · [MongoDB](/Technology/Backend And Database/Tools/MongoDB)
