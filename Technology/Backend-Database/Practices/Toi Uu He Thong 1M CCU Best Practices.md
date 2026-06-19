---
area: technology
domain: backend
type: resource
title: Toi Uu He Thong 1M CCU Best Practices
description: 'Tối ưu hệ thống 1M+ CCU: Tổng hợp và Best Practices'
timestamp: '2026-06-19T13:43:26.152Z'
tags:
  - technology
  - backend
resource: https://blog.cloudflare.com/counting-things-a-lot-of-different-things
---
# Tối ưu hệ thống 1M+ CCU: Tổng hợp và Best Practices

## Tóm tắt bài toán

### Bối cảnh

- Hệ thống đang phục vụ **1M+ CCU** (Concurrent Users) và **1M+ RPS** (Requests per second)
- Đã từng xử lý **8M+ CCU** trong điều kiện peak
- Môi trường: K8s cluster, Go services, Kafka, Apache Flink, Redis
- Thách thức: Mọi millisecond đều quan trọng, mọi resource cần tối ưu tối đa

### Vấn đề cốt lõi

1. **APM overhead không chấp nhận được ở quy mô này:**
   - Latency tăng 175% (50ms → 137.5ms)
   - CPU overhead 5+%
   - Network bandwidth tăng vọt do export spans
   - K8s cluster phải scale thêm 20+% nodes

2. **Frameworks trở thành bottleneck:**
   - Go Fiber, Gin, Echo: Overhead của middleware layers
   - HTTP routers: Pattern matching, middleware chains
   - Logging libraries: I/O blocking, buffering overhead

3. **Rate limiting ở quy mô lớn:**
   - Chỉ 2 command `INCR` và `EXPIRE` của Redis cũng làm tăng chi phí đáng kể
   - Cần giải pháp zero DB query

## Giải pháp chính

### 1. Custom Trace ID Architecture

#### Thiết kế

Cấu trúc 64-bit (có thể mở rộng 128-bit hoặc dùng cặp 64:64):

```
  user_id    service_id     counter
  (32 bit)    (10 bit)      (22 bit)
     ↓            ↓            ↓
  uint32       uint16        uint21
```

**Breakdown:**

- **32 bit đầu:** `user_id` (uint32) - 4.3 tỷ users
- **10 bit giữa:** `service_id` (uint16) - 1024 services
- **22 bit cuối:** `counter` (uint21) - 4.1M IDs/service/millisecond
  - Có thể encode thêm: pod_id, timestamp, hoặc thông tin khác

**Encoding:** uint64 → base16 (có thể dùng base32, base36, base62 để ngắn hơn)

#### Ưu điểm

- **Zero DB Query:** Decode trực tiếp từ trace_id để lấy user_id
- **Stateless:** Giống JWT token, có đầy đủ thông tin để truy ngược thành stateful nếu cần
- **Memory efficient:** Chỉ 2 số (previous + current counter) cho sliding window
- **Atomic operations:** Chỉ cần `INCR` command, không cần CAS

#### Use Cases

**1.1. Rate Limiting ở quy mô 1M CCU**

**Flow:**

```
Client → (API Service → Local Queue → Background Process) → Kafka →
Apache Flink → (Middleware Service → Redis)
```

**Chi tiết:**

- **Client → API Service:** User gửi request
- **API Service → Local Queue:** Xác thực nhanh, tạo event, đẩy vào hàng đợi trong bộ nhớ, trả response ngay
- **Local Queue → Background Process:** Batch events từ hàng đợi
- **Background Process → Kafka:** Publish batch events lên Kafka
- **Kafka → Apache Flink:** Flink consume và phân tích real-time
- **Apache Flink → Middleware Service:** Nếu vượt ngưỡng, gửi event "block_user"
- **Middleware Service → Redis:** Ghi key `blocked_users:{user_id}` với TTL

**Lợi ích:**

- Zero DB query cho rate limiting (decode từ trace_id)
- API response: < 1ms (không wait Kafka/Flink)
- Rate limit decision: 1-2 giây (near real-time) - tradeoff trong CAP (chọn P, A)
- Apache Flink scale tuyến tính: 1M events/sec với 10 workers

**1.2. Distributed Tracing Cross-Services (Pattern Detection)**

- HTTP: set trace_id vào header
- Kafka event: trace_id vào message
- gRPC: set vào metadata

**Phát hiện anomaly:**

- Normal: A → B → C → D (latency: 50ms)
- Anomaly: A → B → X → C → D (latency: 500ms) → Cảnh báo ngay lập tức

**1.3. Tool nội bộ: vtrace CLI**

Tool trace nhanh bất kỳ request hoặc bug được client report, không cần internet.

### 2. Kiến trúc tối ưu

#### Nguyên tắc

- **Tìm về nguyên thủy của language:**
  - Dùng `net/http` thuần của Go
  - Tối giản middleware stack
  - Tắt logging, APM agents (bật lại khi cần)
  - Batch send messages vào Kafka cluster (async)

#### Safe Mode

- Lấy cảm hứng từ "Safe Mode" của Windows
- Tối ưu cắt giảm những thứ không cần thiết khi hệ thống ở trạng thái căng
- Không phải blackout hoàn toàn, vì trace_id là stateless có đủ thông tin

#### Local Queue Pattern

- **Mục đích:** Gộp events thành batch để publish multi messages vào Kafka
- **Lợi ích:** Tránh tạo nhiều connection và wait I/O khi bắn vào Kafka
- **Lưu ý:** Cần đảm bảo không bị overflow

### 3. Internal Service Authentication

**Tại sao microservice gọi nhau internal mà lại dùng API key?**

1. **Quản lý team và quyền sở hữu:**
   - Trong công ty lớn có nhiều teams, đôi khi team này không thích team kia
   - Giải pháp tâm lý để giảm request gọi chéo nhau không được phép

2. **Hạn chế gọi chéo không được phép:**
   - Kiểm soát quyền truy cập giữa các services
   - Quyền sở hữu và trách nhiệm rõ ràng

3. **Rate limiting nội bộ:**
   - Có thể rate limit giữa các internal services

## Đánh giá và thảo luận từ comments

### 1. Về logging và monitoring

**Câu hỏi:** Tool gì để log và monitor trace header?

**Trả lời:**

- Trong pod (Golang): dùng `zap` nếu bật log
- Tool trace: tự viết
- Vẫn có OpenTelemetry nếu được bật

**Best Practice:**

- Log được đẩy về Elasticsearch sau khi decode từ trace_id
- Có thể dùng cặp 64:64 (input:output) để tính thời gian xử lý

### 2. Về local queue và consistency

**Câu hỏi:** Risk inconsistent data giữa local queue với Kafka?

**Trả lời:**

- Local queue đơn giản là để gộp event thành batch
- Mục đích: tránh tạo nhiều connection và wait I/O
- Thực tế chưa gặp case local queue đầy

**Best Practice:**

- Cần có cơ chế xử lý khi local queue đầy (drop, backpressure, hoặc blocking)
- Đảm bảo không làm toang hệ thống

### 3. Về APM on-demand

**Câu hỏi:** Làm sao bật APM mà không redeploy?

**Trả lời:**

- Trước đây dùng topic riêng cho pods subscribe, khi có event thì đổi trạng thái
- Có một số vấn đề nên đã chuyển về kiểu: lúc nào bật thì redeploy lại

**Best Practice:**

- Có thể dùng feature flags hoặc config service
- Tradeoff giữa complexity và flexibility

### 4. Về spike handling

**Câu hỏi:** Nếu spike, local queue đầy → background process chưa kịp flush → API drop request?

**Trả lời:**

- Trước API service có middleware layer:
  - Verify JWT token
  - Kiểm tra token có bị block không
- Local queue đầy: chưa gặp trong thực tế, nhưng phải đảm bảo không oẳng

**Best Practice:**

- Cần có circuit breaker và backpressure mechanism
- Middleware layer trước API service để filter sớm

### 5. Về trace ID encoding

**Gợi ý:**

- Không cần dấu phẩy, có thể cut string theo bit sau khi convert
- Có thể dùng Crockford base32 như ULID cho bé hơn
- Cloudflare cũng làm tương tự trong hệ thống observe cho Workers

**Best Practice:**

- Cân nhắc base32 hoặc base62 để giảm độ dài string
- Tradeoff giữa readability và size

### 6. Về multi-region rate limiting

**Câu hỏi:** Làm sao đảm bảo rate limiting ở nhiều region có data plane không chung nhau?

**Gợi ý từ comment:**

- Setup routing để client được chỉ định vào các limiter consistent (giống Cloudflare với anycast & PoP)
- Trong trường hợp routing không stable, chấp nhận việc user có window/bucket rộng hơn thực tế

**Best Practice (từ Cloudflare blog):**

- Sử dụng anycast routing để đảm bảo traffic từ một IP luôn đến cùng PoP
- Consistent hashing để distribute keys
- Chấp nhận tradeoff về accuracy để đạt được performance và availability

### 7. Về APM và monitoring

**Câu hỏi:** APM còn monitor thông số cluster, tắt đi vậy là blackout luôn?

**Trả lời:**

- Không phải blackout hoàn toàn
- Trace_id là stateless nhưng có đủ thông tin để truy ngược thành stateful
- Có thể dùng cặp 64:64 (input:output) để tính thời gian xử lý

**Best Practice:**

- Có cơ chế monitoring riêng cho cluster metrics (không phụ thuộc APM)
- Trace_id có thể decode để lấy đủ thông tin khi cần

### 8. Về parallel threads

**Câu hỏi:** Nếu chạy 2 thread song song thì collect trace như thế nào?

**Trả lời:**

- Trên môi trường thực tế luôn có nhiều thread đồng thời
- Mỗi pod là 1 thread cũng được
- Không quan tâm trước sau cho bài toán cần giải

**Best Practice:**

- Mỗi request có trace_id riêng
- Không cần đồng bộ giữa các threads

## Best Practices tổng hợp

### 1. Trace ID Design

✅ **Nên làm:**

- Thiết kế trace_id có thể decode để lấy thông tin (user_id, service_id, timestamp)
- Sử dụng bit manipulation để encode nhiều thông tin trong một số
- Cân nhắc dùng cặp 64:64 (input:output) để track thời gian xử lý
- Encoding: base16, base32, hoặc base62 tùy tradeoff readability vs size
- Stateless design nhưng có thể truy ngược thành stateful

❌ **Không nên:**

- Dùng UUID thuần túy (không có thông tin, cần query DB)
- Phụ thuộc vào external service để decode trace_id

### 2. Rate Limiting ở quy mô lớn

✅ **Nên làm:**

- Async processing: API response ngay, rate limit decision sau (1-2 giây)
- Batch processing: Local queue → batch events → Kafka
- Zero DB query: Decode từ trace_id
- Distributed processing: Kafka → Apache Flink → Middleware Service
- Có layer rate limit ở mỗi pod (fallback nếu Flink chậm)

❌ **Không nên:**

- Synchronous rate limiting check (tăng latency)
- Query DB cho mỗi request
- Single point of failure

### 3. Architecture Optimization

✅ **Nên làm:**

- Tối giản middleware stack ở quy mô lớn
- Dùng native language features thay vì frameworks khi cần performance
- Batch I/O operations (Kafka, logging)
- Safe Mode: tắt các tính năng không cần thiết khi hệ thống căng
- Middleware layer trước API service để filter sớm

❌ **Không nên:**

- Over-engineering với frameworks không cần thiết
- Blocking I/O trong request path
- Bật tất cả monitoring/logging mọi lúc

### 4. Multi-Region và Distributed Systems

✅ **Nên làm:**

- Consistent routing (anycast, consistent hashing)
- Chấp nhận tradeoff accuracy để đạt performance
- Distributed rate limiting với eventual consistency
- Local caching cho mitigation decisions

❌ **Không nên:**

- Centralized rate limiting (latency, availability issues)
- Perfect consistency ở mọi nơi (tradeoff với performance)

### 5. Monitoring và Observability

✅ **Nên làm:**

- Custom trace tool có thể chạy offline
- Decode trace_id để lấy đủ thông tin
- Log vào Elasticsearch sau khi decode
- Có cơ chế bật/tắt APM khi cần

❌ **Không nên:**

- Phụ thuộc hoàn toàn vào APM tools
- Export spans cho mọi request ở quy mô lớn

### 6. Error Handling và Resilience

✅ **Nên làm:**

- Circuit breaker và backpressure mechanism
- Xử lý case local queue đầy
- Fallback rate limiting ở mỗi pod
- Middleware layer để filter sớm

❌ **Không nên:**

- Bỏ qua edge cases (local queue đầy, network issues)
- Single point of failure

## Kết luận

### Key Takeaways

1. **Ở quy mô 1M+ CCU, mọi millisecond đều quan trọng:**
   - APM tools có thể trở thành bottleneck
   - Frameworks có overhead không chấp nhận được
   - Cần tối ưu từng layer

2. **Custom solutions có thể tốt hơn off-the-shelf:**
   - Trace ID design với embedded information
   - Async rate limiting với eventual consistency
   - Safe Mode để tối ưu khi cần

3. **Tradeoffs là không thể tránh khỏi:**
   - Accuracy vs Performance (rate limiting)
   - Consistency vs Availability (CAP theorem)
   - Features vs Overhead (APM, logging)

4. **Architecture phải phù hợp với scale:**
   - Không có one-size-fits-all solution
   - Cần hiểu rõ requirements và constraints
   - Test kỹ trước khi áp dụng vào production

### Lưu ý quan trọng

- **Không cổ xúy xóa APM, logging, hay rời bỏ frameworks:**
  - Chỉ phù hợp trong điều kiện và hoàn cảnh cụ thể
  - Ở quy mô nhỏ hơn, frameworks và APM tools vẫn là lựa chọn tốt

- **Use-cases không giống hoàn toàn 100% so với production:**
  - Đã ký thỏa thuận bảo mật
  - Cần test kỹ trước khi áp dụng

- **Hệ thống vẫn dùng APM nhưng bật khi cần thiết:**
  - Không phải blackout hoàn toàn
  - Có cơ chế on-demand

### Tài liệu tham khảo

- [Cloudflare: Counting things - a lot of different things](https://blog.cloudflare.com/counting-things-a-lot-of-different-things)
  - Sliding window algorithm cho rate limiting
  - Anycast routing và PoP architecture
  - Tradeoff giữa accuracy và performance

---

_Tài liệu này được tạo dựa trên bài viết và thảo luận về tối ưu hệ thống 1M+ CCU, tổng hợp các ý kiến và best practices từ cộng đồng._
