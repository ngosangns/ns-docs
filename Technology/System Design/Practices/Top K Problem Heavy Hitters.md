---
area: technology
domain: top-k
type: guide
title: Top K Problem Heavy Hitters
description: Compares solutions to the Top K heavy hitters problem at 10 billion views per day (Redis sorted sets, Count-Min Sketch, OLAP pipelines, batch jobs, SQL) and recommends a hybrid fast path plus slow path architecture.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - top-k
  - redis
  - count-min-sketch
  - interview
resource: https://serhatgiydiren.com/system-design-interview-top-k-problem-heavy-hitters
---

# Top K Problem Heavy Hitters

## The Problem

### Requirements

- Design a feature that finds the list of the **Top K most viewed products** within a time window
- Timeframe: **minute, day, or month**
- Scale: **10 million products** and **10 billion views per day**
- Use case: a feature for the operations team

### Problem Analysis

- **Data volume**: 10 billion events/day ≈ 115,740 events/second (peak can be higher)
- **Unique items**: 10 million products
- **Query pattern**: Top K queries by timeframe
- **Latency requirement**: unclear, but since it's an operations feature it doesn't need to be strictly real-time

## Summary of Proposed Solutions

### Redis-Based Solutions

#### Redis Sorted Sets

**Idea:**

- Key = `{Timeframe}{Timestamp}` (e.g., `Min1718141340`, `Day20240612`, `Month202406`)
- Member = Product ID
- Score = view count
- On each new view: increment that product's score in 3 keys (Min/Day/Month respectively)

**Pros:**

- ✅ Native support for Top K queries with `ZREVRANGE`
- ✅ O(log N) complexity for insert and query
- ✅ In-memory, so very fast
- ✅ Suitable for short timeframes (minutes) needing near-realtime

**Cons:**

- ❌ Memory intensive: 10M products × 3 timeframes × overhead ≈ several GB of RAM
- ❌ 10 billion writes/day can create a bottleneck
- ❌ Cluster sync and failover are complex at large scale
- ❌ Not suitable for long timeframes (months), which waste memory unnecessarily

**Rating:** ⭐⭐⭐⭐ (4/5)

- Suitable for **near-realtime queries** with short timeframes (minutes, hours)
- Needs to be combined with batch processing for long timeframes

#### Redis Hash

**Idea:**

- Use a Redis Hash to store counts by product ID
- Query by scanning and sorting

**Rating:** ⭐⭐ (2/5)

- Not optimized for Top K queries
- Must scan all the data to find the top K
- Not suitable at large scale

#### HyperLogLog

**Idea:**

- Use HyperLogLog to estimate unique views

**Rating:** ⭐⭐⭐ (3/5)

- Can only estimate unique views, not total views
- Doesn't fit this problem (which needs exact counts or approximate total views)

### Count-Min Sketch

**Idea:**

- Use Count-Min Sketch to estimate frequency
- Trade accuracy for performance

**Pros:**

- ✅ Space-efficient: O(d × w) with d, w << N
- ✅ Fast updates: O(d) per item
- ✅ Suitable for streaming data
- ✅ Multiple sketches can be merged

**Cons:**

- ❌ Approximate results (false positives are possible)
- ❌ Needs a heap maintained to track the top K items
- ❌ More complex than sorted sets

**Rating:** ⭐⭐⭐⭐ (4/5)

- Suitable when you **accept approximate results** and need to **save memory**
- Best practice: combine with a min-heap to track the top K

### Data Pipeline + OLAP Database

#### Elasticsearch With a Data Pipeline

**Idea:**

- Collect data from many distributed sources
- A data pipeline aggregates and materializes views
- ES searches the materialized views (not the raw 10B events)

**Pros:**

- ✅ Suitable for long timeframes (days, months)
- ✅ Results can be cached
- ✅ Flexible querying

**Cons:**

- ❌ High latency for minute timeframes
- ❌ Overkill if you only need Top K queries
- ❌ High operating cost

**Rating:** ⭐⭐⭐ (3/5)

- Suitable for **reporting and analytics** with long timeframes
- Not suitable for near-realtime queries

#### Google Analytics + BigQuery

**Idea:**

- Use client-side analytics (GA) to collect
- Use a data warehouse (BigQuery) to aggregate
- Materialize views for each timeframe

**Pros:**

- ✅ Distributed collection (no sync needed)
- ✅ Scalable
- ✅ Managed service

**Cons:**

- ❌ High latency
- ❌ Cost
- ❌ Vendor lock-in

**Rating:** ⭐⭐⭐ (3/5)

- Suitable if the infrastructure already exists
- Not suitable for near-realtime

### Batch Processing Solutions

#### Hadoop + Spark

**Idea:**

- Batch processing with Spark
- Aggregate by timeframe

**Rating:** ⭐⭐⭐ (3/5)

- Overkill for this problem
- Suitable for a data warehouse, not for minute timeframes

#### Queue-Based Aggregation

**Idea:**

- Each view event → queue
- A per-minute job → aggregates → queue
- A per-hour job → aggregates from the minute results → queue
- A per-day job → aggregates from the hour results → queue
- A per-month job → aggregates from the day results

**Pros:**

- ✅ Near-realtime (delay depends on the job interval)
- ✅ Distributed processing
- ✅ Scalable

**Cons:**

- ❌ Complex (many layers)
- ❌ Must handle failures and retries
- ❌ Latency depends on the job interval

**Rating:** ⭐⭐⭐⭐ (4/5)

- Suitable for **multi-timeframe aggregation**
- Needs careful design to handle failures

### SQL-Based Solutions

#### SQL With Indexing + Partitioning

**Idea:**

- Store a `viewed_at` timestamp
- Index and partition by time
- Query with window functions

**Pros:**

- ✅ Exact results
- ✅ Familiar technology

**Cons:**

- ❌ Doesn't scale to 10B writes/day
- ❌ High query latency for minute timeframes
- ❌ Requires complex sharding

**Rating:** ⭐⭐ (2/5)

- Not suitable for a write-heavy workload
- Can be used for **read-only reporting** after aggregation

### Fast Path + Slow Path (Best Practice)

**Idea:** (Reference: [serhatgiydiren.com](https://serhatgiydiren.com/system-design-interview-top-k-problem-heavy-hitters))

**Fast Path (Approximate):**

- The gateway buffers events by time or count
- Publishes to a queue when the threshold is reached
- A service subscribes and uses a **Count-Min Sketch** to compute
- Results are approximate but fast

**Slow Path (Exact):**

- Split the data by partition (by product ID)
- Batch aggregation
- Merge the results from the partitions

**Pros:**

- ✅ Balances accuracy and performance
- ✅ Fast path for near-realtime
- ✅ Slow path for exact results
- ✅ Scalable

**Cons:**

- ❌ Complex (two paths)
- ❌ Must maintain consistency between the two paths

**Rating:** ⭐⭐⭐⭐⭐ (5/5)

- **Best practice** for production systems
- Suitable for problems with mixed requirements (near-realtime + exact)

## Best Practices and Recommendations

### Analysis by Timeframe

#### Timeframe: Minutes (Near-Realtime)

**Recommendation:**

- ✅ **Redis Sorted Sets** or **Count-Min Sketch**
- ✅ Fast path with approximate results
- ✅ Cache results for 1-5 minutes

**Reasons:**

- Needs low latency
- Approximate results are acceptable
- Memory usage is acceptable for a short timeframe

#### Timeframe: Days/Months (Reporting)

**Recommendation:**

- ✅ **Batch processing** with queue-based aggregation
- ✅ Materialize views in the database
- ✅ Cache results longer (1 hour - 1 day)

**Reasons:**

- Real-time is not needed
- Needs exact or high-accuracy results
- Can be pre-computed and cached

### Architecture Pattern: Hybrid Approach

```
┌─────────────────┐
│   Event Source  │ (10B views/day)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Event Gateway  │ (Buffer + Batch)
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────────┐
│ Fast   │ │   Queue      │
│ Path   │ │  (Kafka)     │
│(Redis) │ └──────┬───────┘
└────────┘        │
                  ▼
         ┌─────────────────┐
         │ Batch Processor │
         │  (Spark/Flink)  │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │ Materialized    │
         │ Views (DB)      │
         └─────────────────┘
```

### Data Flow Design

1. **Ingestion Layer**
   - The event gateway receives view events
   - Buffers by time window or count threshold
   - Publishes to the message queue (Kafka)

2. **Fast Path (Near-Realtime)**
   - Stream processor (Flink/Spark Streaming)
   - Count-Min Sketch or Redis Sorted Sets
   - Update the top K cache every minute

3. **Slow Path (Exact)**
   - Batch processor (Spark)
   - Aggregate by partition
   - Materialize views for day/month
   - Store in an OLAP database or data warehouse

4. **Query Layer**
   - Check the cache first (Redis)
   - If it's not there, query the materialized views
   - Return the top K results

### Key Design Decisions

#### Memory vs Accuracy Trade-off

- **Minutes/Hours**: accept approximate → Count-Min Sketch or Redis
- **Days/Months**: need exact → batch processing + materialized views

#### Write Path Optimization

- **Batching**: buffer events before writing
- **Partitioning**: partition by product ID or timestamp
- **Async writes**: don't block the user request

#### Read Path Optimization

- **Caching**: cache top K results by timeframe
- **Pre-computation**: pre-compute for common timeframes
- **Indexing**: index the materialized views

#### Scalability

- **Horizontal scaling**: shard data by product ID
- **Load balancing**: distribute writes and reads
- **Auto-scaling**: scale based on load

### Technology Stack Recommendation

#### Option 1: Cost-effective (Startup/Small scale)

```
Event Gateway → Kafka → Spark Streaming → Redis (Fast Path)
                              ↓
                         Spark Batch → PostgreSQL (Slow Path)
```

#### Option 2: High-performance (Enterprise)

```
Event Gateway → Kafka → Flink → Redis + Count-Min Sketch (Fast Path)
                              ↓
                         Spark Batch → ClickHouse/BigQuery (Slow Path)
```

#### Option 3: Cloud-native (AWS/GCP)

```
Event Gateway → Kinesis/PubSub → Lambda/Functions → ElastiCache (Fast Path)
                              ↓
                         EMR/Dataflow → Redshift/BigQuery (Slow Path)
```

## Things to Watch Out For

### Memory Management

- **Redis**: monitor memory usage, set eviction policies
- **Count-Min Sketch**: tune the parameters (d, w) to balance accuracy and memory

### Data Consistency

- **Eventual consistency**: acceptable for analytics
- **Idempotency**: handle duplicate events
- **Failure handling**: retries and dead letter queues

### Query Performance

- **Cache strategy**: a TTL that fits the timeframe
- **Query optimization**: limit K, use pagination
- **Load balancing**: distribute the query load

### Cost Optimization

- **Storage**: compress old data, archive
- **Compute**: right-size batch jobs
- **Network**: minimize data transfer

## Metrics and Monitoring

### Key Metrics

- **Write latency**: P99 latency for event ingestion
- **Query latency**: P99 latency for top K queries
- **Accuracy**: compare fast path vs slow path results
- **Throughput**: events processed per second
- **Error rate**: failed writes/queries

### Alerts

- High write latency
- High query latency
- Memory usage > threshold
- Error rate > threshold
- Data staleness

## Conclusion

### Recommended Solution

**Hybrid Approach: Fast Path + Slow Path**

1. **Fast Path** (Minutes/Hours):
   - Redis Sorted Sets or Count-Min Sketch
   - Near-realtime with approximate results
   - Cache TTL: 1-5 minutes

2. **Slow Path** (Days/Months):
   - Batch processing with queue-based aggregation
   - Materialized views in an OLAP database
   - Cache TTL: 1 hour - 1 day

3. **Query Strategy**:
   - Check cache → Fast path → Slow path
   - Return the best available result

### Implementation Priority

**Phase 1: MVP**

- Event gateway + Kafka
- Redis Sorted Sets for minutes/hours
- A simple batch job for days/months
- Basic caching

**Phase 2: Scale**

- Add Count-Min Sketch for better memory efficiency
- Optimize batch processing
- Add monitoring and alerting

**Phase 3: Optimize**

- Implement fast path + slow path
- Fine-tune the caching strategy
- Cost optimization

### Key Takeaways

1. **There is no one-size-fits-all solution**: a hybrid approach is needed
2. **Timeframe matters**: minutes need a fast path, days/months need batch
3. **Trade-offs**: memory vs accuracy, latency vs throughput
4. **Scalability**: design for horizontal scaling from the start
5. **Monitoring**: critical for a production system

---

## References

- [System Design Interview - Top K Problem - Heavy Hitters](https://serhatgiydiren.com/system-design-interview-top-k-problem-heavy-hitters)
- [Redis Leaderboards](https://redis.io/solutions/leaderboards)
- Count-Min Sketch Algorithm
- HyperLogLog Algorithm
- Apache Kafka, Spark, Flink Documentation

> **See also:** [Search Engine](/Technology/System Design/Practices/Search Engine) · [Instagram Like Photo System Design](/Technology/System Design/Practices/Instagram Like Photo System Design) · [Task Scheduler System Design](/Technology/System Design/Practices/Task Scheduler System Design)
