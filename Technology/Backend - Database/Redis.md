---
tags:
  - area/technology
  - domain/backend
  - type/resource
  - lang/vi
---

# Redis

## Redis Delayed Queue

### Khái niệm

- **Hàng đợi trì hoãn (Delayed Queue)**: Là hàng đợi tin nhắn có cơ chế trì hoãn thực thi
- Hữu ích trong các trường hợp:
  - Nhắc nhở người dùng định kỳ khi thanh toán đơn hàng thất bại
  - Trì hoãn gửi email cho người dùng trong một khoảng thời gian nhất định (ví dụ: 2 phút) để tránh spam khi có nhiều người truy cập đồng thời

### Triển khai hàng đợi cơ bản với Redis

- Sử dụng cấu trúc dữ liệu `list` của Redis để tạo hàng đợi bất đồng bộ
- Thêm vào hàng đợi: `rpush` hoặc `lpush`
- Lấy ra khỏi hàng đợi: `lpop` hoặc `rpop`

### Vấn đề và giải pháp

#### Vấn đề 1: Hàng đợi trống

- Khi hàng đợi trống, client liên tục thực hiện lệnh `pop` nhưng không nhận được dữ liệu
- Gây lãng phí CPU và tăng QPS trên Redis
- **Giải pháp**: Thêm thời gian ngủ (`sleep`) giữa mỗi lần pop để giảm CPU và QPS

#### Vấn đề 2: Độ trễ hàng đợi

- `Sleep` giúp giảm tài nguyên nhưng tạo độ trễ (ví dụ: 1 giây)
- **Giải pháp**: Sử dụng `blpop` hoặc `brpop` - các lệnh pop có chặn (blocking pop)
- Khi không có dữ liệu, thread tự động "ngủ" và tỉnh ngay khi có dữ liệu, giúp độ trễ gần như bằng 0

#### Vấn đề 3: Kết nối rỗi bị ngắt

- Khi dùng `blpop`, nếu thread chờ quá lâu, kết nối Redis có thể bị ngắt vì không hoạt động
- Lệnh `blpop` sẽ ném ra ngoại lệ
- **Giải pháp**: Xử lý ngoại lệ và viết lại logic retry

### Xử lý xung đột khóa phân tán

Khi không thể lấy được khóa phân tán, có ba cách xử lý:

- Ném ngoại lệ: Cho người dùng biết và tự retry sau
- Ngủ rồi thử lại: Đợi vài giây rồi thử lại
- Đưa vào hàng đợi trì hoãn: Xử lý lại sau, tránh gây tắc nghẽn tức thời

### Triển khai Delayed Queue với Redis

- Sử dụng cấu trúc dữ liệu `zset` (sorted set) của Redis
- `score` là timestamp (thời gian thực thi)
- Thêm tin nhắn: `zadd` với score là thời gian thực thi mong muốn
- Lấy tin nhắn đến hạn: `zrangebyscore` với khoảng thời gian phù hợp
- Lấy một tin nhắn: `zrangebyscore key min max withscores limit 0 1`

### Cơ chế hoạt động trong môi trường đa luồng

- Nhiều luồng có thể gọi `zrangebyscore` và nhận cùng một tin nhắn
- Chỉ có một luồng thành công trong việc xóa tin nhắn bằng `zrem` (thao tác nguyên tử)
- Các luồng khác cố gắng xóa nhưng không thành công vì tin nhắn đã bị xóa - họ từ bỏ việc xử lý
- Đảm bảo chỉ có một luồng xử lý một thông báo

### Tối ưu hóa

- Sử dụng tập lệnh Lua để kết hợp `zrangebyscore` và `zrem` thành một hoạt động nguyên tử duy nhất ở phía máy chủ
- Tránh việc nhiều tiến trình cạnh tranh cho cùng một tác vụ dẫn đến việc tìm nạp không cần thiết
- Tập lệnh Lua kiểm tra các tin nhắn đã hết hạn, xóa chúng và trả về tin nhắn nếu xóa thành công

### Ưu điểm của Redis Delayed Queue

- Sắp xếp theo `score` hiệu quả với `zset`
- Chạy hoàn toàn trong bộ nhớ, rất nhanh
- Hỗ trợ clustering để nâng cao hiệu suất
- Có cơ chế lưu trữ (persistence) bằng AOF hoặc RDB

### Nhược điểm

- Tính tin cậy chưa cao như các Message Queue chuyên dụng
- Không có retry - phải tự triển khai
- Không có ACK - nếu client lấy tin nhắn rồi chết giữa chừng, dữ liệu sẽ bị mất
- **Khuyến nghị**: Nếu yêu cầu độ tin cậy cao, hãy dùng một MQ chuyên dụng như Kafka hoặc RabbitMQ

### Triển khai bằng Redisson

- Redisson hỗ trợ `RDelayedQueue`, xây dựng trên `RQueue`
- Cho phép gửi tin nhắn với độ trễ (ví dụ: 10 giây, 1 phút)
- Khi không còn dùng nữa, nên hủy hàng đợi để giải phóng tài nguyên

---

**Nguồn**: [Redis Delayed Queue: Giải thích một lần và mãi mãi - Viblo](https://viblo.asia/p/redis-delayed-queue-giai-thich-mot-lan-va-mai-mai-3RlL5XAPJbB)

## DragonflyDB - So sánh với Redis

### Tổng quan

- **DragonflyDB**: Hệ thống lưu trữ dữ liệu trong bộ nhớ (in-memory) hiệu suất cao, được thiết kế để khắc phục các hạn chế của Redis
- **Mục tiêu**: Vượt trội về hiệu suất so với Redis, đặc biệt trong môi trường đa luồng và tải cao

### Hạn chế của Redis

- **Kiến trúc đơn luồng (Single-threaded)**: Redis sử dụng kiến trúc đơn luồng cho các operations, dẫn đến giới hạn về hiệu suất khi xử lý nhiều yêu cầu đồng thời
- **Bottleneck**: Một luồng duy nhất xử lý tất cả commands, không tận dụng được nhiều CPU cores
- **Multi-threading hạn chế**: Từ Redis 6+ có một số tính năng multi-threading nhưng chủ yếu cho I/O, không phải cho command processing

### Kiến trúc Shared-nothing của Dragonfly

- **Shared-nothing architecture**:
  - Chia dữ liệu thành nhiều phần (shards)
  - Mỗi shard được quản lý độc lập bởi một luồng (thread) riêng biệt
  - Không chia sẻ state giữa các shards
- **Lợi ích**:
  - Tận dụng tối đa tài nguyên CPU đa nhân
  - Tăng khả năng xử lý song song
  - Giảm contention và lock overhead
  - Cải thiện scalability

### Hiệu suất so sánh

- **Throughput**: Dragonfly có throughput cao hơn gấp 25 lần so với Redis trong một số benchmark
- **Latency**: Độ trễ p99 chỉ chậm hơn Redis khoảng 0.2ms, gần như tương đương
- **Memory efficiency**: Quản lý bộ nhớ hiệu quả hơn nhờ kiến trúc tối ưu
- **CPU utilization**: Tận dụng tốt hơn nhiều CPU cores so với Redis

### Tính năng tương thích

- **Redis-compatible**: Dragonfly hỗ trợ hầu hết các commands và protocols của Redis
- **Migration**: Có thể thay thế Redis mà không cần thay đổi code ứng dụng trong nhiều trường hợp
- **Data structures**: Hỗ trợ các cấu trúc dữ liệu tương tự Redis (strings, lists, sets, hashes, sorted sets)

### Use cases phù hợp

- **High-throughput applications**: Ứng dụng cần xử lý lượng lớn requests đồng thời
- **Multi-core systems**: Hệ thống có nhiều CPU cores cần tận dụng
- **Memory-intensive workloads**: Workloads yêu cầu quản lý bộ nhớ hiệu quả
- **Drop-in replacement**: Thay thế Redis khi cần hiệu suất cao hơn mà không muốn thay đổi code

### Trade-offs và cân nhắc

- **Maturity**: Redis đã được sử dụng rộng rãi và ổn định lâu hơn
- **Ecosystem**: Redis có ecosystem và community lớn hơn
- **Persistence**: Cần kiểm tra tính năng persistence và replication của Dragonfly
- **Production readiness**: Đánh giá kỹ trước khi triển khai trong production

**Nguồn**: [50 Days of S.D - How does Dragonfly outperform Redis? - Quang Hoang](https://quanghoang.substack.com/p/50-days-of-sd-dragonfly)
