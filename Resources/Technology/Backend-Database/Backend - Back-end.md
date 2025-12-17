---
relates:
  - "[[PHP]]"
  - "[[Java]]"
  - "[[Node.js]]"
  - "[[Golang]]"
  - "[[Python]]"
  - "[[SaaS]]"
  - "[[GraphQL]]"
tags:
  - php
  - java
  - node-js
  - golang
  - python
  - area/technology
  - domain/backend
  - type/resource
  - lang/vi
---
# 1. Resources

- A friendly language for building type-safe, scalable systems!: https://github.com/gleam-lang/gleam
- Note của anonystick: https://github.com/anonystick/anonystick/blob/main/README.md
- Lộ trình học: https://docs.google.com/spreadsheets/d/11AsPKmB6LYzMx4IhgKSz2oaDOIWPkJhDxjhgY7nKM1g/edit?pli=1#gid=0
- Giải quyết deadlock cho hệ thống phân tán bằng những thuật toán phổ biến: https://viblo.asia/p/giai-quyet-deadlock-cho-he-thong-phan-tan-bang-nhung-thuat-toan-pho-bien-EvbLbwrPVnk?fbclid=IwAR1krRMhz1phb1Sk-KUOKUje0zf-QNq-R2fbxVdVYSpxgXigrZ2u7NeUS8g
- Giải quyết deadlock cho hệ thống phân tán bằng những thuật toán phổ biến: https://viblo.asia/p/giai-quyet-deadlock-cho-he-thong-phan-tan-bang-nhung-thuat-toan-pho-bien-EvbLbwrPVnk?fbclid=IwAR1krRMhz1phb1Sk-KUOKUje0zf-QNq-R2fbxVdVYSpxgXigrZ2u7NeUS8g
- Tổng hợp API đa mục đích: https://github.com/public-apis/public-apis
- [[Những thứ đã học ở Grab tech talk]]
- [[Concurrency - Parallel - Asynchronus - Multi-threading]]
- [Bài test benchmark giữa các Message Queue: Kafka vs RabbitMQ vs Redis Streams](https://devops.vn/posts/bai-test-benchmark-giua-cac-message-queue-kafka-vs-rabbitmq-vs-redis-streams-ket-qua-khien-toi-phai-bat-ngo)

## 1.1. Khoảng tin cậy Wilson

Khoảng tin cậy Wilson là một loại khoảng tin cậy trong thống kê, dùng để ước lượng tỷ lệ thành công (ví dụ tỷ lệ sản phẩm được đánh giá tốt, tỷ lệ thành công trong A/B testing) với mức độ tin cậy cao. Nó tính biên dưới của tỷ lệ thành công, giúp đưa ra một ước lượng "thấp nhất đáng tin cậy" cho tỷ lệ đó, đặc biệt hiệu quả với mẫu nhỏ và không bị nhiễu do kích thước mẫu. Khoảng tin cậy Wilson thường dùng trong các bài toán xếp hạng, đánh giá sản phẩm, tỷ lệ bán hàng...

Về mặt toán học, khoảng tin cậy Wilson dùng giá trị Z tương ứng với mức độ tin cậy (thường 95% tương ứng z = 1.96), số lần thành công ss, tổng thử nghiệm nn, và tỷ lệ thành công quan sát p=snp=ns. Công thức tính gồm các phần điều chỉnh trung tâm và biên sai số để xác định biên dưới và biên trên, nhưng thường chỉ tính biên dưới để có ước lượng thấp nhất an toàn về tỷ lệ thành công.

Ngoài ra, khoảng tin cậy nói chung (Confidence Interval) là phạm vi giá trị ước tính cho tham số tổng thể dựa trên mẫu, thể hiện sự không chắc chắn trong ước lượng với mức độ tin cậy nhất định như 95% hoặc 99%. Mức độ tin cậy 95% có nghĩa là nếu lấy nhiều mẫu lặp lại thì khoảng tin cậy thu được từ mỗi mẫu sẽ chứa tham số thật của tổng thể khoảng 95% các trường hợp.

## 1.2. Thông lượng

**Latency:** Độ trễ - thời gian xử lý 1 request của BE.
**Throughput:** Thông lượng - lượng request mà BE xử lý được trong 1 khoảng thời gian.
Throughput = IO Average size x IOPS

Tìm hiểu thêm:
- Storage performance
- IOPS throughput latency

Example:
- Nhận 1M requests per second
- Avg size per request: 1kB
- Thoughput = 1kB x 1M = 1GB/s

=> Trong hệ thống sử dụng roofline chart để đo điểm nghẽn

# 2. Web server

- WASM web server: [spinframework/spin: Spin is the open source developer tool for building and running serverless applications powered by WebAssembly.](https://github.com/spinframework/spin)

## 2.1. Nginx

- Tim hiểu nhanh về nginx - Phần 1: https://viblo.asia/p/tim-hieu-nhanh-ve-nginx-phan-1-oK9VyKPxJQR

# 3. Libraries / Frameworks

- SyncAPI - Swagger alternative: https://github.com/asyncapi/spec
- Migration tool for MongoDB: Atlas | Open-source database schema management tool (atlasgo.io) - https://atlasgo.io
- TypeORM - ORM for Javascript/Typescript framework: TypeORM - Amazing ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms. - https://typeorm.io
- LMAX Disruptor: https://github.com/LMAX-Exchange/disruptor là bộ thư viện giúp cho việc phát triển các ứng dụng với độ tải lớn (high-performance) cho phép xử lý đồng thời (concurrency) một số lượng rất lớn message mà không cần Lock (lock-free).
- Disruptor trong Golang: https://pkg.go.dev/github.com/smartystreets/go-disruptor
- Hotwire - Build front-end from back-end: https://hotwired.dev
- Atlas - Migration tool for MongoDB: https://atlasgo.io
- TypeORM - ORM for Javascript/Typescript framework: https://typeorm.io
- [[Fresher Back-end Interview]]
- LMAX Disruptor: https://github.com/LMAX-Exchange/disruptor là bộ thư viện giúp cho việc phát triển các ứng dụng với độ tải lớn (high-performance) cho phép xử lý đồng thời (concurrency) một số lượng rất lớn message mà không cần Lock (lock-free).
    - Disruptor trong Golang: https://pkg.go.dev/github.com/smartystreets/go-disruptor
- i18n: https://github.com/i18next/i18next

## 3.1. Caching - Cache

- Chiến lược caching (Caching strategies) - Viblo: https://viblo.asia/p/chien-luoc-caching-caching-strategies-zXRJ8jPOVGq
- Time-To-Live (TTL) trong Redis hoạt động như nào?: https://viblo.asia/p/time-to-live-ttl-trong-redis-hoat-dong-nhu-nao-EbNVQ1DRVvR?fbclid=IwAR0r0vZuLaXpl7_am-9V1zIdze8fQ9ZmDlQIxM8Yd8Zy2kpNtlvJ9Lk3OkE
- Cache: Bộ Não Thông Minh Của Hệ Thống Hiện Đại: https://viblo.asia/p/cache-bo-nao-thong-minh-cua-he-thong-hien-dai-5pPLk9yD4RZ

### 3.1.1. Định nghĩa

- **Cache hit:** Là khi truy vấn, ta tìm được dữ liệu cần thiết từ cache.
- **Cache miss:** Là khi truy vấn, ta không thấy dữ liệu từ cache.
- **Data stale:** Dữ liệu bị coi là stale nếu dữ liệu trong primary database được cập nhật mới nhất, trong khi dữ liệu trong cache thì không.
- **Cache aside**: Đọc dữ liệu từ cache → database.
- **Write through**: Ghi dữ liệu vào database → cache.
- **Read through**: Tương tự Cache aside.
- **Write back**: Ghi dữ liệu vào cache → đồng bộ theo chu kì hoặc theo batch xuống cache.
- **Write around**: Không tạo cache khi write → đọc sử dụng cache aside hoặc read through cache.

### 3.1.2. Sự khác biệt giữ cache aside và read through

- Cache aside dùng application để cập nhật dữ liệu vào cache nếu dữ liệu không tồn tại.
- Read through sử dụng cache server để cập nhật dữ liệu vào cache nếu dữ liệu không tồn tại.

### 3.1.3. Dọn dẹp dữ liệu thừa

- **First In First Out (FIFO)**: tương tự như queue, những dữ liệu được truy xuất đầu tiên sẽ bị dọn dẹp đi đầu tiên (mà không quan tâm đến tần suất dữ liệu được truy xuất).
- **Last In First Out (LIFO)**: tương tự như stack, dữ liệu được thêm mới nhất sẽ bị dọn dẹp đi đầu tiên (mà không quan tâm đến tần suất dữ liệu được truy xuất).
- **Least Recently Used (LRU)**: Ở đây ta sẽ loại bỏ đi những dữ liệu không được sử dụng gần đây (những dữ liệu loại này được coi như sẽ hiếm được truy xuất kể cả sau này).
- **Least Frequently Used (LFU)**: Ở đây ta cần phải đếm tần xuất dữ liệu được truy xuất, những dữ liệu với tần suất truy xuất thấp sẽ bị loại bỏ đi đầu tiên.
- **Random selection**: Lựa chọn và loại bỏ đi dữ liệu trong cache một cách ngẫu nhiên, cơ chế này sẽ được sử dụng khi cache đạt đến ngưỡng "đầy".

### 3.1.4. Redis

- Nguyên tắc hoạt động của redis server: https://viblo.asia/p/nguyen-tac-hoat-dong-cua-redis-server-naQZRq7GKvx
- Series quản trị Redis: https://viblo.asia/s/series-quan-tri-redis-P0lPmrrg5ox
- **Redis Sentinel**: Monitoring, notification and automatic failover for Redis replica.
- [Redis] Redis Sentinel hoạt động như thế nào?: https://medium.com/@wano1010/redis-redis-sentinel-hoạt-động-như-thế-nào-6ec501312bd8

#### 3.1.4.1. Redis Sentinel

Redis Sentinel là một công cụ quản lý và giám sát cho các Redis server. Nó giúp đảm bảo tính sẵn sàng cao và khả năng phục hồi cho các ứng dụng sử dụng Redis bằng cách tự động thực hiện các hành động sau:

- **Giám sát:** Sentinel theo dõi trạng thái của các Redis master và slave server trong cụm.
- **Cảnh báo:** Khi Sentinel phát hiện ra sự cố với một Redis server, nó sẽ cảnh báo cho người quản trị viên hệ thống.
- **Quản lý:** Sentinel có thể tự động thực hiện các hành động quản lý khác nhau, chẳng hạn như:
    - **Quản lý failover:** Khi một Redis master server bị lỗi, Sentinel sẽ tự động chọn một slave server phù hợp để trở thành master mới.
    - **Quản lý replication:** Sentinel có thể tự động thêm và xóa slave server khỏi cụm.
    - **Quản lý cấu hình:** Sentinel có thể tự động cập nhật cấu hình của Redis server.

# 4. Lợi ích của việc sử dụng Redis Sentinel

Có nhiều lợi ích khi sử dụng Redis Sentinel, bao gồm:

- **Tính sẵn sàng cao:** Sentinel giúp đảm bảo rằng ứng dụng của bạn luôn khả dụng ngay cả khi một Redis server bị lỗi.
- **Khả năng phục hồi:** Sentinel có thể tự động khôi phục ứng dụng của bạn sau khi xảy ra sự cố.
- **Dễ sử dụng:** Sentinel dễ dàng cài đặt và cấu hình.
- **Miễn phí:** Sentinel là phần mềm mã nguồn mở và miễn phí.

# 5. Một số lỗi thường gặp

## 5.1. Data race và Race condition

- Data race: Xảy ra khi hai hoặc nhiều luồng cùng truy cập vào một biến dữ liệu và ít nhất một trong số chúng thực hiện thao tác ghi.
- Race condition: Xảy ra khi hai hoặc nhiều luồng cùng thực hiện một chuỗi các thao tác, và kết quả cuối cùng phụ thuộc vào thứ tự thực hiện của các thao tác này. Kết quả là kết quả cuối cùng có thể không đáng tin cậy và không đồng nhất.

⇒ Các giải quyết: Sử dụng các kỹ thuật như locking, synchronization hoặc atomic operations để đảm bảo rằng chỉ có một luồng được phép truy cập vào biến dữ liệu tại một thời điểm và đảm bảo thứ tự thực hiện các thao tác.

## 5.2. Deadlock

Deadlock là tình trạng mà hai hoặc nhiều tiến trình đang chờ đợi tài nguyên từ nhau mà không thể tiếp tục thực hiện. Trong cơ sở dữ liệu, deadlock xảy ra khi hai hoặc nhiều transaction đang chờ đợi tài nguyên khóa mà được giữ bởi các transaction khác. Ví dụ, transaction A đang giữ khóa X và yêu cầu khóa Y, trong khi transaction B đang giữ khóa Y và yêu cầu khóa X. Khi đó, hai transaction này sẽ bị kẹt lại và không thể tiếp tục thực hiện.
⇒ Cách giải quyết: Để xử lý deadlock, có thể sử dụng phương pháp timeout hoặc phương pháp giải quyết ưu tiên. Phương pháp timeout sẽ giải phóng tài nguyên của transaction nào chưa hoàn thành sau một khoảng thời gian nhất định. Phương pháp giải quyết ưu tiên sẽ ưu tiên cho transaction có ảnh hưởng lớn hơn đến hệ thống để giải quyết deadlock.

# 6. Phân quyền

- ACL là phương pháp quản lý quyền truy cập dựa trên danh sách các quyền được cấp cho từng người dùng hoặc nhóm người dùng cụ thể.
- RBAC là phương pháp quản lý quyền truy cập dựa trên vai trò của người dùng trong hệ thống. Vai trò này được xác định bởi quản trị viên và được gán cho từng người dùng hoặc nhóm người dùng.
- ABAC là phương pháp quản lý quyền truy cập dựa trên các thuộc tính của người dùng, tài nguyên và môi trường. Các quyền truy cập được cấp dựa trên các điều kiện về các thuộc tính này.

# 7. ID

- ULID: Giống UUID, là một loại ID sử dụng unix time và random string để tạo ID. Thường được dùng cho các bảng cần sắp xếp theo thời gian như logs,...
- https://github.com/vinkla/hashids - Database vẫn lưu increment ID nhưng sẽ tạo thêm lớp fake id khi tương tác ở client => Chống bruce force. Nhược điểm là tốn resource để convert ID trong application
- https://github.com/hidehalo/nanoid-php - Generate unique UUID nhanh hơn UUID truyền thống. Nhược điểm là query theo ID không tối ưu bằng
- Snowflake - Loại ID được giới thiệu bởi Twitter, phù hợp cho replicate services

# 8. Authentication

- Hiểu Rõ Luồng OAuth 2.0 qua các Hình Ảnh Động (GIFS): https://viblo.asia/p/hieu-ro-luong-oauth-20-qua-cac-hinh-anh-dong-gifs-GyZJZdxEVjm

# 9. Searching

- Vector Search and RAG Tutorial – Using LLMs with Your Data: https://www.freecodecamp.org/news/vector-search-and-rag-tutorial-using-llms-with-your-data
- Search Engine và Vector Database: https://viblo.asia/s/search-engine-va-vector-database-GyZJZwllLjm

# 10. API

## 10.1. Searching APIs

- https://exa.ai/
- https://brightdata.com/
- https://serper.dev/
