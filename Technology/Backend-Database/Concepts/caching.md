---
area: technology
domain: backend-database
topic: caching
type: resource
lang: vi
created: "2026-04-13"
modified: "2026-04-13"
---

# Caching

## Tổng quan

Caching là kỹ thuật lưu trữ dữ liệu tạm thời để giảm thời gian truy cập và tải cho hệ thống.

## Các loại caching

### 1. Client-side Caching

- Browser caching
- Local storage
- Service workers

### 2. CDN Caching

- Edge caching
- Static asset caching

### 3. Server-side Caching

- In-memory caching (Redis, Memcached)
- Application caching
- Database query caching

### 4. Database Caching

- Query cache
- Connection pooling
- Buffer pool

## Chiến lược caching

### Cache-aside (Lazy Loading)

- Application kiểm tra cache trước
- Nếu không có, query database và lưu vào cache
- Đơn giản nhưng có cache miss penalty

### Write-through

- Ghi vào cache và database đồng thời
- Đảm bảo consistency nhưng chậm hơn

### Write-behind (Write-back)

- Ghi vào cache trước, sau đó async ghi vào database
- Tốc độ cao nhưng có rủi ro mất dữ liệu

### Refresh-ahead

- Tự động refresh cache trước khi expire
- Giảm cache miss

## Cache invalidation

### Time-based (TTL)

- Đặt thời gian expire cho cache entry
- Đơn giản nhưng có thể stale data

### Event-based

- Xóa cache khi data thay đổi
- Đảm bảo consistency nhưng phức tạp hơn

### Version-based

- Cache theo version của data
- Atomic updates

## Best practices

- Xác định rõ cache key strategy
- Xử lý cache stampede
- Monitoring cache hit/miss ratio
- Cân nhắc cache warming
- Xử lý cache invalidation đúng cách

## Tools phổ biến

- **Redis**: In-memory data structure store
- **Memcached**: Distributed memory caching
- **Varnish**: HTTP reverse proxy cache
- **CDN**: CloudFlare, AWS CloudFront, etc.

## Resources

- [Redis Documentation](https://redis.io/documentation)
- [Caching Best Practices](https://aws.amazon.com/caching/best-practices/)
