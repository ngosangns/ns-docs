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
- **Encore**: Framework mã nguồn mở cho phép phát triển các ứng dụng backend một cách nhanh chóng và hiệu quả. Cung cấp các công cụ để xây dựng, triển khai và quản lý các dịch vụ backend, giúp giảm bớt sự phức tạp trong quá trình phát triển với sự hỗ trợ tích hợp cho các dịch vụ đám mây và triển khai liên tục - [GitHub](https://github.com/encoredev/encore) #backend #framework
- **Hypervel**: Framework PHP theo phong cách Laravel với hỗ trợ coroutine gốc, mang lại hiệu suất cực cao cho các ứng dụng I/O-intensive - [GitHub](https://github.com/hypervel/hypervel) #php #framework #coroutine
- **Motia**: Framework backend đa ngôn ngữ, thống nhất API, công việc nền, hàng đợi, quy trình làm việc, luồng và các tác nhân AI với một lõi duy nhất, tích hợp khả năng quan sát và quản lý trạng thái - [GitHub](https://github.com/motiadev/motia) #backend #framework #multi-language
- **PocketBase**: Backend mã nguồn mở viết bằng Go, tất cả trong một file. Bao gồm embedded database (SQLite) với realtime subscriptions, built-in files và users management, admin dashboard UI, và REST-ish API. Có thể dùng như standalone app hoặc Go framework/toolkit - [GitHub](https://github.com/pocketbase/pocketbase) #backend #database #go #realtime

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

#### LFU Cache O(1) Implementation

- **Vấn đề truyền thống:**
  - LFU cache thường dùng min-heap → O(log n) time complexity
  - Nhiều developer chọn LRU (O(1)) thay vì LFU dù LFU phù hợp hơn
  - Min-heap cần rebalancing mỗi khi access/delete/insert → O(log n)

- **Giải pháp O(1) (Ketan Shah, Anirban Mitra, Dhruv Matani, 2010/2021):**
  - Dùng Hash Table + Doubly Linked Lists
  - Mỗi kệ (Doubly Linked List) chứa items có cùng frequency
  - Kệ 1: items được access 1 lần, kệ 2: 2 lần, ...
  - Hash table map key → vị trí item trong kệ
  - Access: di chuyển item sang kệ frequency cao hơn → O(1)
  - Eviction: lấy item đầu tiên ở kệ frequency thấp nhất → O(1)

- **Trade-offs:**
  - Tốn nhiều RAM hơn (hash table + multiple linked lists)
  - Khó implement và maintain hơn so với min-heap

- **Paper:** [An O(1) algorithm for implementing the LFU cache eviction scheme](https://arxiv.org/pdf/2110.11602)

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
- **Typesense**: Công cụ tìm kiếm mã nguồn mở, nhanh chóng và dễ sử dụng, thay thế cho Algolia và ElasticSearch. Hỗ trợ typo-tolerance, faceting, filtering, sorting - [GitHub](https://github.com/typesense/typesense) #search-engine #open-source

## API

### Searching APIs

- [exa.ai](https://exa.ai/)
- [brightdata.com](https://brightdata.com/)
- [serper.dev](https://serper.dev/)

## Payment Processing

- **Hyperswitch**: Giải pháp thanh toán mã nguồn mở, cho phép tích hợp nhiều cổng thanh toán khác nhau thông qua một API duy nhất - [GitHub](https://github.com/juspay/hyperswitch) #payment #gateway

## No-code Platforms

- **NocoBase**: Nền tảng mã nguồn mở cho phép xây dựng ứng dụng quản lý dữ liệu mà không cần viết mã, hỗ trợ tạo CRUD và quản lý quan hệ dữ liệu - [GitHub](https://github.com/nocobase/nocobase) #nocode #platform

## API Gateway

- **KGateway**: API Gateway và AI Gateway theo kiến trúc đám mây, cung cấp giải pháp quản lý và định tuyến API hiệu quả - [GitHub](https://github.com/kgateway-dev/kgateway) #api-gateway #ai-gateway #cloud
