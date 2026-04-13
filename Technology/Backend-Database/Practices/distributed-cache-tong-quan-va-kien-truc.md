---
area: technology
domain: backend
type: resource
---

# Distributed In-Memory Cache cho Heavy-Read APIs: Tổng hợp và Best Practices

> **Xem thêm:** [[distributed-in-memory-cache-best-practices|Distributed In-Memory Cache Best Practices]]

## 1. Tổng quan bài toán

### 1.1. Context

- **Yêu cầu:** Xử lý 1M+ requests/second cho Heavy-Read APIs
- **Vấn đề:** Vertical scaling (scale DB/Redis) tốn kém và không hiệu quả
- **Use case:** E-commerce với tương quan Write/Read rất lớn (ví dụ: đăng sản phẩm vs xem sản phẩm)

### 1.2. Mục tiêu

- **Ultra-low latency:** Sub-millisecond response time
- **Linear scaling:** Thêm reader pod = tăng throughput tỷ lệ thuận
- **Cost-effective:** Horizontal scaling (pods) thay vì vertical scaling (DB/Redis)
- **Real-time sync:** Auto propagation qua pub/sub

## 2. Kiến trúc giải pháp

### 2.1. Kiến trúc tổng quan

```
Writer Service (POST)
   → Serialize object → Publish event vào Redis
Redis Pub/Sub
   → Fan-out event đến tất cả Reader Pods
Reader Pods (GET)
   → Update Local In-Memory Cache (LFU/LRU)
   → Trả thẳng bytes qua net/http (không unmarshal/serialize)
```

### 2.2. Đặc điểm chính

- **CQRS Pattern:** Tách biệt Write Service và Read Service
- **Local-first caching:** Mỗi pod giữ local cache trong RAM
- **Event-driven sync:** Redis Pub/Sub để đồng bộ cache giữa các pods
- **Zero serialization overhead:** Cache bytes trực tiếp, không unmarshal/marshal
