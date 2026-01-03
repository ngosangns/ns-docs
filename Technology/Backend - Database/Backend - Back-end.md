---
tags:
  - area/technology
  - domain/backend
  - type/resource
  - lang/vi
---

# Backend

## Resources

- **Gleam**: Friendly language for building type-safe, scalable systems - [GitHub](https://github.com/gleam-lang/gleam)
- **Note của anonystick**: [GitHub](https://github.com/anonystick/anonystick/blob/main/README.md)
- **Lộ trình học**: [Google Sheets](https://docs.google.com/spreadsheets/d/11AsPKmB6LYzMx4IhgKSz2oaDOIWPkJhDxjhgY7nKM1g/edit?pli=1#gid=0)
- **Giải quyết deadlock cho hệ thống phân tán**: [Viblo](https://viblo.asia/p/giai-quyet-deadlock-cho-he-thong-phan-tan-bang-nhung-thuat-toan-pho-bien-EvbLbwrPVnk)
- **Tổng hợp API đa mục đích**: [GitHub](https://github.com/public-apis/public-apis)
- **Benchmark Message Queue**: [Kafka vs RabbitMQ vs Redis Streams](https://devops.vn/posts/bai-test-benchmark-giua-cac-message-queue-kafka-vs-rabbitmq-vs-redis-streams-ket-qua-khien-toi-phai-bat-ngo)

## Khoảng tin cậy Wilson

- Khoảng tin cậy trong thống kê, ước lượng tỷ lệ thành công
- Tính biên dưới của tỷ lệ thành công
- Hiệu quả với mẫu nhỏ, không bị nhiễu do kích thước mẫu
- Dùng trong xếp hạng, đánh giá sản phẩm, A/B testing

## Thông lượng

- **Latency**: Độ trễ - thời gian xử lý 1 request
- **Throughput**: Thông lượng - lượng request xử lý được trong 1 khoảng thời gian
- **Công thức**: Throughput = IO Average size × IOPS
- **Ví dụ**: 1M requests/s, avg 1kB/request → Throughput = 1GB/s
- Sử dụng roofline chart để đo điểm nghẽn

## Web Server

- **Spin**: WASM web server, serverless applications - [GitHub](https://github.com/spinframework/spin)
- **Nginx**: [Tìm hiểu nhanh về nginx](https://viblo.asia/p/tim-hieu-nhanh-ve-nginx-phan-1-oK9VyKPxJQR)

## Libraries / Frameworks

- **AsyncAPI**: Swagger alternative - [GitHub](https://github.com/asyncapi/spec)
- **Atlas**: Migration tool for MongoDB - [Website](https://atlasgo.io)
- **TypeORM**: ORM for JavaScript/TypeScript - [Website](https://typeorm.io)
- **LMAX Disruptor**: High-performance, lock-free message processing
  - [GitHub](https://github.com/LMAX-Exchange/disruptor)
  - [Golang version](https://pkg.go.dev/github.com/smartystreets/go-disruptor)
- **Hotwire**: Build front-end from back-end - [Website](https://hotwired.dev)
- **i18n**: [GitHub](https://github.com/i18next/i18next)

## Caching

### Định nghĩa

- **Cache hit**: Tìm được dữ liệu từ cache
- **Cache miss**: Không tìm được dữ liệu từ cache
- **Data stale**: Dữ liệu trong cache không cập nhật so với database

### Chiến lược Caching

- **Cache aside**: Đọc từ cache → database
- **Write through**: Ghi vào database → cache
- **Read through**: Tương tự Cache aside
- **Write back**: Ghi vào cache → đồng bộ theo chu kỳ/batch xuống database
- **Write around**: Không tạo cache khi write → đọc dùng cache aside/read through

### Sự khác biệt Cache aside vs Read through

- **Cache aside**: Application cập nhật dữ liệu vào cache nếu không tồn tại
- **Read through**: Cache server cập nhật dữ liệu vào cache nếu không tồn tại

### Dọn dẹp dữ liệu (Eviction Policies)

- **FIFO**: First In First Out
- **LIFO**: Last In First Out
- **LRU**: Least Recently Used
- **LFU**: Least Frequently Used
- **Random selection**: Lựa chọn ngẫu nhiên

### Redis

- **Resources**:
  - [Nguyên tắc hoạt động của Redis server](https://viblo.asia/p/nguyen-tac-hoat-dong-cua-redis-server-naQZRq7GKvx)
  - [Series quản trị Redis](https://viblo.asia/s/series-quan-tri-redis-P0lPmrrg5ox)
  - [Time-To-Live (TTL) trong Redis](https://viblo.asia/p/time-to-live-ttl-trong-redis-hoat-dong-nhu-nao-EbNVQ1DRVvR)
  - [Cache: Bộ Não Thông Minh](https://viblo.asia/p/cache-bo-nao-thong-minh-cua-he-thong-hien-dai-5pPLk9yD4RZ)

#### Redis Sentinel

- Monitoring, notification và automatic failover cho Redis replica
- **Chức năng**:
  - Giám sát: Theo dõi trạng thái master và slave
  - Cảnh báo: Thông báo khi có sự cố
  - Quản lý: Failover tự động, quản lý replication, cập nhật cấu hình
- **Lợi ích**: Tính sẵn sàng cao, khả năng phục hồi, dễ sử dụng, miễn phí
- [Tài liệu](https://medium.com/@wano1010/redis-redis-sentinel-hoạt-động-như-thế-nào-6ec501312bd8)

## Lỗi thường gặp

### Data race và Race condition

- **Data race**: Hai hoặc nhiều luồng cùng truy cập một biến, ít nhất một luồng ghi
- **Race condition**: Kết quả phụ thuộc vào thứ tự thực hiện các thao tác
- **Giải pháp**: Locking, synchronization, atomic operations

### Deadlock

- Hai hoặc nhiều tiến trình chờ đợi tài nguyên từ nhau
- **Giải pháp**: Timeout hoặc giải quyết ưu tiên

## Phân quyền

- **ACL**: Access Control List - danh sách quyền cho từng người dùng/nhóm
- **RBAC**: Role-Based Access Control - quyền dựa trên vai trò
- **ABAC**: Attribute-Based Access Control - quyền dựa trên thuộc tính

## ID

- **ULID**: Unix time + random string, sắp xếp theo thời gian - [GitHub](https://github.com/ulid/spec)
- **Hashids**: Fake ID cho client, chống brute force - [GitHub](https://github.com/vinkla/hashids)
- **NanoID**: Generate UUID nhanh hơn - [GitHub](https://github.com/hidehalo/nanoid-php)
- **Snowflake**: ID của Twitter, phù hợp replicate services

## Authentication

- [Hiểu Rõ Luồng OAuth 2.0 qua GIFS](https://viblo.asia/p/hieu-ro-luong-oauth-20-qua-cac-hinh-anh-dong-gifs-GyZJZdxEVjm)

## Searching

- [Vector Search and RAG Tutorial](https://www.freecodecamp.org/news/vector-search-and-rag-tutorial-using-llms-with-your-data)
- [Search Engine và Vector Database](https://viblo.asia/s/search-engine-va-vector-database-GyZJZwllLjm)

## API

### Searching APIs

- [exa.ai](https://exa.ai/)
- [brightdata.com](https://brightdata.com/)
- [serper.dev](https://serper.dev/)
