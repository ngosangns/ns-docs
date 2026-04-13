---
area: technology
domain: backend-database
topic: redis
type: resource
lang: vi
created: "2026-04-13"
modified: "2026-04-13"
---

# Redis

## Tổng quan

Redis (Remote Dictionary Server) là một in-memory data structure store, được sử dụng như database, cache, và message broker.

## Đặc điểm

- **In-memory storage**: Dữ liệu được lưu trong RAM
- **Persistence**: Hỗ trợ lưu dữ liệu xuống disk (RDB, AOF)
- **High performance**: Hàng trăm nghìn operations/second
- **Data structures**: Strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, geospatial indexes
- **Replication**: Master-slave replication
- **Clustering**: Redis Cluster cho horizontal scaling
- **Pub/Sub**: Message passing pattern

## Use cases

### 1. Caching

- Session storage
- Page caching
- API response caching
- Object caching

### 2. Real-time analytics

- Leaderboards
- Counters
- Rate limiting

### 3. Message Queue

- Task queues
- Event streaming
- Pub/Sub messaging

### 4. Session Management

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

- Log every write operation
- Better durability
- Larger file size

## Best practices

- Sử dụng Redis Cluster cho production
- Cấu hình maxmemory và eviction policy
- Monitoring với Redis CLI hoặc Redis Insight
- Backup regularly
- Security: bind to specific interfaces, use AUTH

## Resources

- [Redis Documentation](https://redis.io/documentation)
- [Redis Commands](https://redis.io/commands)
- [Redis Best Practices](https://redis.io/docs/manual/scaling/)
