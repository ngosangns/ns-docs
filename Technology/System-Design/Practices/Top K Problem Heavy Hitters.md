---
area: technology
domain: system-design
type: resource
title: Top K Problem Heavy Hitters
description: Top K Problem - Heavy Hitters
timestamp: "2026-06-19T13:43:26.115Z"
tags:
  - technology
  - system-design
resource: https://serhatgiydiren.com/system-design-interview-top-k-problem-heavy-hitters
---

# Top K Problem - Heavy Hitters

## 1. Bài toán

### Yêu cầu

- Thiết kế tính năng cho phép tìm danh sách **Top K sản phẩm được xem nhiều nhất** trong khoảng thời gian
- Timeframe: **phút, ngày, hoặc tháng**
- Scale: **10 triệu sản phẩm** và **10 tỷ lượt xem mỗi ngày**
- Use case: Feature cho phía vận hành (operations team)

### Phân tích bài toán

- **Data volume**: 10 tỷ events/ngày ≈ 115,740 events/giây (peak có thể cao hơn)
- **Unique items**: 10 triệu sản phẩm
- **Query pattern**: Top K queries theo timeframe
- **Latency requirement**: Chưa rõ, nhưng là feature cho operations nên không cần realtime tuyệt đối

## 2. Tổng hợp các giải pháp được đề xuất

### 2.1. Redis-based Solutions

#### 2.1.1. Redis Sorted Sets

**Ý tưởng:**

- Key = `{Timeframe}{Timestamp}` (ví dụ: `Min1718141340`, `Day20240612`, `Month202406`)
- Member = Product ID
- Score = Số lượt xem
- Mỗi lượt xem mới: increment score của product đó trong 3 keys (Min/Day/Month tương ứng)

**Ưu điểm:**

- ✅ Native support cho Top K queries với `ZREVRANGE`
- ✅ O(log N) complexity cho insert và query
- ✅ In-memory nên rất nhanh
- ✅ Phù hợp cho timeframe ngắn (phút) cần near-realtime

**Nhược điểm:**

- ❌ Memory intensive: 10M products × 3 timeframes × overhead ≈ vài GB RAM
- ❌ 10 tỷ writes/ngày có thể gây bottleneck
- ❌ Cluster sync và failover phức tạp ở scale lớn
- ❌ Không phù hợp cho timeframe dài (tháng) - tốn memory không cần thiết

**Đánh giá:** ⭐⭐⭐⭐ (4/5)

- Phù hợp cho **near-realtime queries** với timeframe ngắn (phút, giờ)
- Cần kết hợp với batch processing cho timeframe dài

#### 2.1.2. Redis Hash

**Ý tưởng:**

- Sử dụng Redis Hash để lưu count theo product ID
- Query bằng cách scan và sort

**Đánh giá:** ⭐⭐ (2/5)

- Không tối ưu cho Top K queries
- Cần scan toàn bộ data để tìm top K
- Không phù hợp với scale lớn

#### 2.1.3. HyperLogLog

**Ý tưởng:**

- Sử dụng HyperLogLog để estimate unique views

**Đánh giá:** ⭐⭐⭐ (3/5)

- Chỉ estimate được unique views, không phù hợp cho total views
- Không phù hợp với bài toán này (cần count chính xác hoặc approximate total views)

### 2.2. Count-Min Sketch

**Ý tưởng:**

- Sử dụng Count-Min Sketch để estimate frequency
- Trade-off accuracy lấy performance

**Ưu điểm:**

- ✅ Space-efficient: O(d × w) với d, w << N
- ✅ Fast updates: O(d) per item
- ✅ Phù hợp cho streaming data
- ✅ Có thể merge multiple sketches

**Nhược điểm:**

- ❌ Approximate results (có thể có false positives)
- ❌ Cần maintain heap để track top K items
- ❌ Phức tạp hơn sorted sets

**Đánh giá:** ⭐⭐⭐⭐ (4/5)

- Phù hợp khi **chấp nhận approximate results** và cần **tiết kiệm memory**
- Best practice: Kết hợp với min-heap để track top K

### 2.3. Data Pipeline + OLAP Database

#### 2.3.1. Elasticsearch với Data Pipeline

**Ý tưởng:**

- Collect data từ nhiều nguồn phân tán
- Data pipeline aggregate và materialize views
- ES search trên materialized views (không phải raw 10B events)

**Ưu điểm:**

- ✅ Phù hợp cho timeframe dài (ngày, tháng)
- ✅ Có thể cache kết quả
- ✅ Flexible querying

**Nhược điểm:**

- ❌ Latency cao cho timeframe phút
- ❌ Overkill nếu chỉ cần Top K queries
- ❌ Chi phí vận hành cao

**Đánh giá:** ⭐⭐⭐ (3/5)

- Phù hợp cho **reporting và analytics** với timeframe dài
- Không phù hợp cho near-realtime queries

#### 2.3.2. Google Analytics + BigQuery

**Ý tưởng:**

- Sử dụng client-side analytics (GA) để collect
- Data warehouse (BigQuery) để aggregate
- Materialize views cho các timeframe

**Ưu điểm:**

- ✅ Distributed collection (không cần sync)
- ✅ Scalable
- ✅ Managed service

**Nhược điểm:**

- ❌ Latency cao
- ❌ Chi phí
- ❌ Vendor lock-in

**Đánh giá:** ⭐⭐⭐ (3/5)

- Phù hợp nếu đã có infrastructure sẵn
- Không phù hợp cho near-realtime

### 2.4. Batch Processing Solutions

#### 2.4.1. Hadoop + Spark

**Ý tưởng:**

- Batch processing với Spark
- Aggregate theo timeframe

**Đánh giá:** ⭐⭐⭐ (3/5)

- Overkill cho bài toán này
- Phù hợp cho data warehouse, không phù hợp cho timeframe phút

#### 2.4.2. Queue-based Aggregation

**Ý tưởng:**

- Mỗi view event → queue
- Job chạy theo phút → aggregate → queue
- Job chạy theo giờ → aggregate từ phút → queue
- Job chạy theo ngày → aggregate từ giờ → queue
- Job chạy theo tháng → aggregate từ ngày

**Ưu điểm:**

- ✅ Near-realtime (delay theo job interval)
- ✅ Distributed processing
- ✅ Scalable

**Nhược điểm:**

- ❌ Phức tạp (nhiều layers)
- ❌ Cần handle failures và retries
- ❌ Latency phụ thuộc vào job interval

**Đánh giá:** ⭐⭐⭐⭐ (4/5)

- Phù hợp cho **multi-timeframe aggregation**
- Cần thiết kế cẩn thận để handle failures

### 2.5. SQL-based Solutions

#### 2.5.1. SQL với Indexing + Partitioning

**Ý tưởng:**

- Lưu `viewed_at` timestamp
- Index và partition theo thời gian
- Query với window functions

**Ưu điểm:**

- ✅ Exact results
- ✅ Familiar technology

**Nhược điểm:**

- ❌ Không scale được với 10B writes/ngày
- ❌ Query latency cao cho timeframe phút
- ❌ Cần sharding phức tạp

**Đánh giá:** ⭐⭐ (2/5)

- Không phù hợp cho write-heavy workload
- Có thể dùng cho **read-only reporting** sau khi đã aggregate

### 2.6. Fast Path + Slow Path (Best Practice)

**Ý tưởng:** (Tham khảo từ [serhatgiydiren.com](https://serhatgiydiren.com/system-design-interview-top-k-problem-heavy-hitters))

**Fast Path (Approximate):**

- Gateway buffer events theo thời gian hoặc số lượng
- Publish vào queue khi đủ threshold
- Service subscribe và dùng **Count-Min Sketch** để tính toán
- Kết quả approximate nhưng nhanh

**Slow Path (Exact):**

- Chia data theo partition (theo product ID)
- Batch aggregation
- Merge kết quả từ các partitions

**Ưu điểm:**

- ✅ Balance giữa accuracy và performance
- ✅ Fast path cho near-realtime
- ✅ Slow path cho exact results
- ✅ Scalable

**Nhược điểm:**

- ❌ Phức tạp (2 paths)
- ❌ Cần maintain consistency giữa 2 paths

**Đánh giá:** ⭐⭐⭐⭐⭐ (5/5)

- **Best practice** cho production systems
- Phù hợp với bài toán có yêu cầu mixed (near-realtime + exact)

## 3. Best Practices và Khuyến nghị

### 3.1. Phân tích theo Timeframe

#### Timeframe: Phút (Near-realtime)

**Khuyến nghị:**

- ✅ **Redis Sorted Sets** hoặc **Count-Min Sketch**
- ✅ Fast path với approximate results
- ✅ Cache kết quả trong 1-5 phút

**Lý do:**

- Cần low latency
- Có thể chấp nhận approximate results
- Memory usage acceptable cho timeframe ngắn

#### Timeframe: Ngày/Tháng (Reporting)

**Khuyến nghị:**

- ✅ **Batch processing** với queue-based aggregation
- ✅ Materialize views trong database
- ✅ Cache kết quả lâu hơn (1 giờ - 1 ngày)

**Lý do:**

- Không cần realtime
- Cần exact hoặc high-accuracy results
- Có thể pre-compute và cache

### 3.2. Architecture Pattern: Hybrid Approach

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

### 3.3. Data Flow Design

1. **Ingestion Layer**
   - Event gateway nhận view events
   - Buffer theo time window hoặc count threshold
   - Publish vào message queue (Kafka)

2. **Fast Path (Near-realtime)**
   - Stream processor (Flink/Spark Streaming)
   - Count-Min Sketch hoặc Redis Sorted Sets
   - Update top K cache mỗi phút

3. **Slow Path (Exact)**
   - Batch processor (Spark)
   - Aggregate theo partition
   - Materialize views cho ngày/tháng
   - Store vào OLAP database hoặc data warehouse

4. **Query Layer**
   - Check cache trước (Redis)
   - Nếu không có, query từ materialized views
   - Return top K results

### 3.4. Key Design Decisions

#### 3.4.1. Memory vs Accuracy Trade-off

- **Phút/Giờ**: Chấp nhận approximate → Count-Min Sketch hoặc Redis
- **Ngày/Tháng**: Cần exact → Batch processing + Materialized views

#### 3.4.2. Write Path Optimization

- **Batching**: Buffer events trước khi write
- **Partitioning**: Partition theo product ID hoặc timestamp
- **Async writes**: Không block user request

#### 3.4.3. Read Path Optimization

- **Caching**: Cache top K results theo timeframe
- **Pre-computation**: Pre-compute cho các timeframe phổ biến
- **Indexing**: Index trên materialized views

#### 3.4.4. Scalability

- **Horizontal scaling**: Shard data theo product ID
- **Load balancing**: Distribute writes và reads
- **Auto-scaling**: Scale based on load

### 3.5. Technology Stack Recommendation

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

## 4. Các vấn đề cần lưu ý

### 4.1. Memory Management

- **Redis**: Monitor memory usage, set eviction policies
- **Count-Min Sketch**: Tune parameters (d, w) để balance accuracy và memory

### 4.2. Data Consistency

- **Eventual consistency**: Acceptable cho analytics
- **Idempotency**: Handle duplicate events
- **Failure handling**: Retry và dead letter queues

### 4.3. Query Performance

- **Cache strategy**: TTL phù hợp với timeframe
- **Query optimization**: Limit K, use pagination
- **Load balancing**: Distribute query load

### 4.4. Cost Optimization

- **Storage**: Compress old data, archive
- **Compute**: Right-size batch jobs
- **Network**: Minimize data transfer

## 5. Metrics và Monitoring

### 5.1. Key Metrics

- **Write latency**: P99 latency cho event ingestion
- **Query latency**: P99 latency cho top K queries
- **Accuracy**: Compare fast path vs slow path results
- **Throughput**: Events processed per second
- **Error rate**: Failed writes/queries

### 5.2. Alerts

- High write latency
- High query latency
- Memory usage > threshold
- Error rate > threshold
- Data staleness

## 6. Kết luận

### 6.1. Recommended Solution

**Hybrid Approach: Fast Path + Slow Path**

1. **Fast Path** (Phút/Giờ):
   - Redis Sorted Sets hoặc Count-Min Sketch
   - Near-realtime với approximate results
   - Cache TTL: 1-5 phút

2. **Slow Path** (Ngày/Tháng):
   - Batch processing với queue-based aggregation
   - Materialized views trong OLAP database
   - Cache TTL: 1 giờ - 1 ngày

3. **Query Strategy**:
   - Check cache → Fast path → Slow path
   - Return best available result

### 6.2. Implementation Priority

**Phase 1: MVP**

- Event gateway + Kafka
- Redis Sorted Sets cho phút/giờ
- Simple batch job cho ngày/tháng
- Basic caching

**Phase 2: Scale**

- Add Count-Min Sketch cho better memory efficiency
- Optimize batch processing
- Add monitoring và alerting

**Phase 3: Optimize**

- Implement fast path + slow path
- Fine-tune caching strategy
- Cost optimization

### 6.3. Key Takeaways

1. **Không có one-size-fits-all solution**: Cần hybrid approach
2. **Timeframe matters**: Phút cần fast path, ngày/tháng cần batch
3. **Trade-offs**: Memory vs Accuracy, Latency vs Throughput
4. **Scalability**: Design for horizontal scaling từ đầu
5. **Monitoring**: Critical cho production system

---

## References

- [System Design Interview - Top K Problem - Heavy Hitters](https://serhatgiydiren.com/system-design-interview-top-k-problem-heavy-hitters)
- [Redis Leaderboards](https://redis.io/solutions/leaderboards)
- Count-Min Sketch Algorithm
- HyperLogLog Algorithm
- Apache Kafka, Spark, Flink Documentation
