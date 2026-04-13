---
area: technology
domain: backend
type: resource
---

# Distributed In-Memory Cache cho Heavy-Read APIs: Tổng hợp và Best Practices

> **Xem thêm:** [[distributed-in-memory-cache-best-practices|Distributed In-Memory Cache Best Practices]]

## 3. Các kỹ thuật tối ưu

### 3.1. Serialization Optimization

**Kỹ thuật:**

- Serialize object thành bytes ở Write Service
- Publish bytes vào Redis Pub/Sub
- Reader Pods nhận bytes và update trực tiếp vào local cache (không deserialize)

**Lợi ích:**

- Loại bỏ CPU-bound cho deserialization ở Read Service
- Giảm latency đáng kể

**Best Practice:**

```go
// Write Service
bytes := serialize(object)
redis.Publish(channel, bytes)

// Read Service
bytes := receiveFromPubSub()
cache.Set(key, bytes) // Không unmarshal
```

### 3.2. Native HTTP Response

**Kỹ thuật:**

- Bỏ framework (Go Fiber) → dùng native `net/http`
- Trả bytes trực tiếp từ in-memory cache vào response

**Lợi ích:**

- Loại bỏ overhead của framework middleware
- Giảm CPU-bound và IO-bound

**Benchmark:**

- `/post` (local cache, trả bytes): p99 ~13ms
- `/post-marshal` (local cache, marshal lại): p99 ~15ms
- `/post-redis` (đọc từ Redis): p99 ~30ms

**Best Practice:**

- Read Service: Dùng native `net/http` cho performance-critical endpoints
- Write Service: Vẫn có thể dùng framework cho business logic phức tạp

### 3.3. HTTP 304 Caching

**Kỹ thuật:**

- Compute ETag ở Write Service khi publish event
- Read Service trả 304 Not Modified khi client có ETag hợp lệ

**Lợi ích:**

- Giảm network overhead
- CPU-bound (hash ETag) được xử lý ở Write Service, không ảnh hưởng Read Service

**Best Practice:**

- Compute ETag một lần ở Write Service
- Có thể dùng rules để bump ETag cho một loạt items, tránh compute hash thừa

### 3.4. Compression (Optional)

**Kỹ thuật:**

- Gzip/Brotli compression ở Write Service
- Read Service trả compressed bytes trực tiếp

**Trade-off:**

- Giảm network overhead
- Tăng complexity (client compatibility)
- Có thể tạm bỏ nếu không cần thiết

## 4. Best Practices và Lessons Learned

### 4.1. Cache Strategy

#### 4.1.1. Eviction Policy

- **LFU (Least Frequently Used):** Phù hợp khi có hot data rõ ràng
- **LRU (Least Recently Used):** Phù hợp cho general use case
- **Custom:** Tùy theo business logic (ví dụ: zhash scoring cho warm-up)

**Best Practice:**

```go
// Set limit số lượng items trong cache
cache.SetMaxItems(100000)

// Chọn eviction policy phù hợp
cache.SetEvictionPolicy("LFU") // hoặc "LRU"
```

#### 4.1.2. Memory Management

- **Set max items:** Giới hạn số lượng keys trong cache
- **Monitor memory usage:** Track memory consumption của mỗi pod
- **Smart warm-up:** Không cache toàn bộ data, chỉ cache hot data

**Best Practice:**

- Không cache toàn bộ dataset vào một pod
- Cache theo pattern: "dọn cỗ sẵn chờ người đến ăn" (pre-warm based on usage patterns)
- Dùng zhash scoring để xác định data cần warm-up khi pod mới start

### 4.2. Event-Driven Sync

#### 4.2.1. Redis Pub/Sub Configuration

**Best Practice:**

- Dùng multiple channels cho different use cases:
  - Invalidate theo tag
  - Invalidate theo group user
  - Invalidate theo category
- Monitor Redis uptime và connection health

#### 4.2.2. Handling Message Loss

**Vấn đề:**

- Redis Pub/Sub không đảm bảo message delivery
- Pod có thể miss message khi không sẵn sàng listen

**Giải pháp:**

1. **Health check:** Pod chỉ nhận traffic sau khi cache đã warm-up
2. **Fallback mechanism:** Nếu cache miss → gọi Redis để lấy data
3. **Singleflight pattern:** Tránh thundering herd khi nhiều request cùng miss cache
4. **Redis Stream:** Cân nhắc dùng Redis Stream thay vì Pub/Sub nếu cần guarantee delivery

**Best Practice:**

```go
// Singleflight để tránh thundering herd
var group singleflight.Group

func getFromCache(key string) ([]byte, error) {
    if val, ok := cache.Get(key); ok {
        return val, nil
    }

    // Singleflight: chỉ một request thực sự gọi Redis
    result, err, _ := group.Do(key, func() (interface{}, error) {
        return redis.Get(key)
    })

    if err != nil {
        return nil, err
    }

    bytes := result.([]byte)
    cache.Set(key, bytes)
    return bytes, nil
}
```

### 4.3. Race Condition Prevention

#### 4.3.1. Cache Aside Pattern Race Condition

**Vấn đề:**

```
1. Get cache → not found
2. Get DB → v1 (old)
3. DB update → v2 (new)
4. Replication stream set cache → v2
5. Step 2 set cache → v1 (stale data stuck)
```

**Giải pháp:**

1. **TTL ngắn:** Cho dữ liệu hay thay đổi
2. **CQRS:** Write Service/Worker warm-up cache, giảm Read Service tự đi vã cache
3. **Versioning:** Dùng version/timestamp để check stale data
4. **SET NX:** Redis SET NX để giảm thiểu stale data

**Best Practice:**

- Chấp nhận trade-off: AP system (CAP Theorem) → Eventual Consistency
- Dùng TTL + CQRS để cân bằng giữa complexity và performance
- Versioning cho critical data (xem: [stale-data-prevention example](https://github.com/huykn/distributed-cache/tree/develop/examples/stale-data-prevention))

#### 4.3.2. Avoiding Race Conditions trong Pub/Sub

**Vấn đề:**

```
[D] client -> server: GET foo
[I] server -> client: Invalidate foo (somebody else touched it)
[D] server -> client: "bar" (reply of "GET foo")
```

**Giải pháp:**

- Dùng placeholder khi send command: `cache.Set("foo", "caching-in-progress")`
- Nếu nhận invalidate trước khi nhận data → delete cache entry
- Nếu nhận data sau invalidate → không set vào cache

**Best Practice:**

- Dùng single connection cho data và invalidation (nếu có thể)
- Hoặc implement placeholder mechanism khi dùng two connections

### 4.4. Pod Lifecycle Management

#### 4.4.1. Warm-up Strategy

**Vấn đề:**

- Pod mới start → cache rỗng
- Thundering herd khi nhiều request cùng miss cache

**Giải pháp:**

1. **Health check:** Pod chỉ ready sau khi cache đã warm-up
2. **Smart warm-up:** Dùng zhash scoring để xác định hot data cần load
3. **Gradual traffic:** Load balancer tăng traffic từ từ

**Best Practice:**

```go
// Health check endpoint
func healthCheck() bool {
    // Check cache size
    if cache.Size() < minCacheSize {
        return false
    }

    // Check Redis connection
    if !redis.IsConnected() {
        return false
    }

    return true
}
```

#### 4.4.2. Connection Loss Handling

**Best Practice:**

1. **Flush cache khi mất connection:** Đảm bảo không serve stale data
2. **Ping mechanism:** Ping invalidation channel periodically
3. **Timeout và retry:** Close connection và flush cache nếu không nhận ping back sau timeout
4. **Fallback:** Gọi Redis trực tiếp nếu cache miss

### 4.5. Monitoring và Observability

**Best Practice:**

- Monitor Redis uptime và connection health
- Track cache hit rate, miss rate
- Monitor memory usage của mỗi pod
- Alert khi có vấn đề với Redis connection
- Track metrics cho từng endpoint (p50, p99 latency)
