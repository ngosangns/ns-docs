---
area: technology
domain: backend
type: resource
---

# Distributed In-Memory Cache cho Heavy-Read APIs: Tổng hợp và Best Practices

> **Xem thêm:** [[Distributed In Memory Cache Best Practices|Distributed In-Memory Cache Best Practices]]

## 5. Trade-offs và Limitations

### 5.1. CAP Theorem

- **Chọn AP (Availability + Partition tolerance):**
  - Chấp nhận Eventual Consistency
  - Data có thể lệch trong khoảng thời gian ngắn
  - Phù hợp cho use case không yêu cầu strong consistency

**Không phù hợp cho:**

- Financial transactions (cần strong consistency)
- Real-time stock prices (cần real-time accuracy)
- Critical business data yêu cầu 100% accuracy

### 5.2. Memory Constraints

- **Không cache toàn bộ dataset:** Chỉ cache hot data
- **Sharding complexity:** Khi data size tăng → cần sharding + routing
- **Cost:** Memory cost tăng khi scale pods (mỗi pod có local cache)

### 5.3. Redis Pub/Sub Limitations

- **Không guarantee delivery:** Message có thể bị mất
- **Single point of failure:** Redis down → toàn bộ system bị ảnh hưởng
- **Bottleneck:** Khi write traffic tăng → Redis Pub/Sub có thể thành bottleneck

**Giải pháp:**

- Monitor Redis health
- Có fallback mechanism
- Cân nhắc Redis Stream hoặc Kafka cho critical use cases

### 5.4. Sharding và Routing

**Vấn đề:**

- Khi data size tăng → cần sharding
- Routing theo key-id phức tạp
- Rebalancing khi scale pods

**Trade-off:**

- Local-first approach: Đơn giản nhưng tốn memory
- Sharding approach: Phức tạp nhưng memory-efficient

## 6. So sánh với các giải pháp khác

### 6.1. Redis Client-Side Caching

**Tương đồng:**

- Cả hai đều dùng local cache + Redis sync
- Cả hai đùng event-driven invalidation

**Khác biệt:**

- **Custom Pub/Sub channels:** Cho phép invalidate theo tag, group user, etc.
- **Bytes caching:** Cache bytes trực tiếp, không unmarshal
- **Native HTTP:** Trả bytes trực tiếp, không qua framework

**Best Practice:**

- Redis Client-Side Caching phù hợp cho general use case
- Custom solution phù hợp khi cần fine-grained control và optimization

### 6.2. Memcached vs Redis

**Khi nào dùng Memcached:**

- Cache size lớn (>16GB)
- Cần multithreading
- Scale lớn (Facebook scale: 1000 tỷ keys)
- High hit rate requirement (99%+)

**Khi nào dùng Redis:**

- Cần Pub/Sub
- Cần data structures (hash, set, etc.)
- Single-threaded đủ cho use case
- Cost-effective cho small-medium scale

**Best Practice:**

- **Small-medium scale (<16GB):** Redis
- **Large scale (>16GB, high hit rate):** Memcached
- **Cần Pub/Sub:** Redis
- **Pure key-value caching:** Memcached

### 6.3. CDN và API Gateway Caching

**Trade-off:**

- **CDN/API Gateway:** Đơn giản, giảm load upstream
- **Local cache:** Có thể tracking user behavior, custom logic

**Best Practice:**

- Dùng CDN cho public, static content
- Dùng local cache cho dynamic content cần tracking/custom logic

## 7. Performance Metrics

### 7.1. Benchmark Results

- **Local cache (bytes):** p99 ~13ms
- **Local cache (marshal):** p99 ~15ms
- **Redis direct:** p99 ~30ms

### 7.2. Production Metrics

- **Mỗi pod:** ~60k rqs/s
- **1M req/s:** Cần <20 pods
- **Cost:** Horizontal scaling (pods) rẻ hơn vertical scaling (DB/Redis)
