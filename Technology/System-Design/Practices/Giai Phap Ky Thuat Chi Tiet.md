---
area: technology
domain: system-design
topic: system-design
type: resource
title: Giai Phap Ky Thuat Chi Tiet
description: Giải pháp Kỹ thuật Chi tiết
timestamp: '2026-06-19T13:43:26.102Z'
tags:
  - technology
  - system-design
resource: https://viblo.asia/p/jwt-huy-hang-loat-token-da-bao-gio-ban-nghi-den-EvbLbxGv4nk?fbclid=IwAR0-7dicLCxg0aSjZqgnHoPvk__tl0zP5gr3EPSxE0uX5yu9VdqsRfg6St0
---

# 3. Giải pháp Kỹ thuật Chi tiết

## 3.1. Xác thực và Phân quyền (Authentication and Authorization)

### 3.1.1. JWT (JSON Web Tokens)

- JWT: Huỷ hàng loạt token, đã bao giờ bạn nghĩ đến?: Thảo luận về vấn đề hủy (revoke) JSON Web Tokens (JWT), đặc biệt là hủy hàng loạt token, và các giải pháp khả thi do JWT vốn là stateless (ví dụ: sử dụng blacklist, short-lived tokens kết hợp refresh tokens).
  - Nguồn: https://viblo.asia/p/jwt-huy-hang-loat-token-da-bao-gio-ban-nghi-den-EvbLbxGv4nk?fbclid=IwAR0-7dicLCxg0aSjZqgnHoPvk__tl0zP5gr3EPSxE0uX5yu9VdqsRfg6St0

## 3.2. Tối ưu Hóa (Optimization)

### 3.2.1. Tối ưu Bộ nhớ (Memory Optimization)

- Tối ưu ứng dụng với cấu trúc dữ liệu cơ bản và bitwise: Hướng dẫn cách tối ưu hóa ứng dụng bằng việc sử dụng hiệu quả các cấu trúc dữ liệu cơ bản và các phép toán bitwise (bitwise operations) để tiết kiệm bộ nhớ và tăng tốc độ xử lý.
  - Nguồn: https://200lab.io/blog/cau-truc-du-lieu-toi-uu-ung-dung-cua-ban-nhu-the-nao

### 3.2.2. Tối ưu Hiệu năng (Performance Optimization)

- Performance Optimization Guideline: Cung cấp một bộ hướng dẫn (guideline) về tối ưu hóa hiệu năng cho ứng dụng, bao gồm các phương pháp và điểm cần lưu ý ở các tầng khác nhau của hệ thống (frontend, backend, database).
  - Nguồn: https://viblo.asia/s/performance-optimization-guideline-DVK2jDQ2KLj

### 3.2.3. Caching

- Bài toán "Super fast API" với Golang và Mongodb: Trình bày giải pháp xây dựng API siêu nhanh sử dụng Golang và MongoDB, tập trung vào các kỹ thuật tối ưu hóa và caching.
  - Nguồn: https://viblo.asia/p/bai-toan-super-fast-api-voi-golang-va-mongodb-3Q75wmA7ZWb
- Caching đại pháp: Tổng hợp các kiến thức và kỹ thuật về caching, một trong những phương pháp quan trọng để cải thiện hiệu năng hệ thống (ví dụ: cache strategies, cache eviction policies, types of caches).
  - Nguồn: https://viblo.asia/s/caching-dai-phap-QqKLvpNbl7z

## 3.3. Xử lý Dữ liệu và Tác vụ (Data and Task Processing)

### 3.3.1. Background Jobs / Hàng đợi (Queues)

- Nghệ thuật xử lý background job: Chia sẻ kinh nghiệm và các kỹ thuật trong việc thiết kế và xử lý các tác vụ nền (background jobs) một cách hiệu quả, đảm bảo độ tin cậy và khả năng mở rộng. Bao gồm việc lựa chọn message queue, xử lý lỗi, retry mechanism.
  - Nguồn: https://viblo.asia/s/nghe-thuat-xu-ly-background-job-0gdJzvqnJz5 (Link này được dùng cho nhiều mục, giả định là bài tổng quan)
  - Nguồn khác (có thể liên quan đến View/Email): https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4
- [Task Scheduler System Design](/Technology/System-Design/Practices/Task Scheduler System Design): Tóm tắt bài viết về thiết kế hệ thống Task Scheduler từ một buổi phỏng vấn với Meta Staff Engineer, bao gồm thảo luận yêu cầu, khả năng mở rộng, khả năng chịu lỗi, và các best practices. Nguồn: https://medium.com/@bugfreeai/system-design-interview-with-a-meta-staff-engineer-designing-a-task-scheduler-1a5041b4860e

### 3.3.2. Xử lý Log (Logging)

- Dùng Discord làm logger: Hướng dẫn một cách sáng tạo về việc sử dụng Discord (thông qua webhook) như một công cụ để ghi log (logger) cho ứng dụng, tiện lợi cho việc theo dõi nhanh các sự kiện quan trọng hoặc lỗi.
  - Nguồn: https://www.youtube.com/watch?v=c6-ZDgz7SCo
- - [e2f3a4b5-c6d7-49e0-9f1a-2b3c4d5e6f70.pdf](/Attachments/e2f3a4b5-c6d7-49e0-9f1a-2b3c4d5e6f70.pdf)

### 3.3.3. Nén Dữ liệu (Data Compression - zip, gzip)

#### 3.3.3.1. Cách Discord giảm 40% lưu lượng Websocket

Discord đã giảm 40% lưu lượng websocket bằng cách:

- Áp dụng thuật toán nén streaming zstandard thay cho zlib. Streaming zstandard vượt trội hơn về tốc độ, sử dụng bộ nhớ và tỷ lệ nén.
- Thay đổi logic cập nhật dữ liệu từ server về client (passive session) giúp giảm thiểu những dữ liệu dư thừa.
  ![](/Attachments/4d5e6f70-8192-a3b4-c5d6-e7f8091a2b3c.png)

### 3.3.4. Upload File Lớn (Large File Upload)

- Tăng tốc quá trình upload file lớn với kỹ thuật phân mảnh và tải lên đa luồng: Giới thiệu kỹ thuật phân mảnh tệp (file chunking) và tải lên đa luồng (multi-threaded upload) để tăng tốc độ quá trình upload các file có dung lượng lớn, đồng thời cải thiện khả năng phục hồi khi có lỗi.
  - Nguồn: https://viblo.asia/p/tang-toc-qua-trinh-upload-file-lon-voi-ky-thuat-phan-manh-va-tai-len-da-luong-38X4EPbdVN2?fbclid=IwAR21dFUUPrOdtnWzT4BXtuMwnbB0ExVyUPZ9vsmqjgWGs8zhoaO1Q6v2fc8

### 3.3.5. Đồng bộ hóa Dữ liệu (Data Syncing)

- Loro - Syncing / conflict free / automatic merging: Loro là một thư viện CRDT (Conflict-free Replicated Data Type) hiệu suất cao cho việc đồng bộ hóa trạng thái cục bộ và hợp nhất tự động mà không có xung đột. Hỗ trợ cả backend (xem [Backend Overview](/Technology/Backend-Database/Resources/Backend Overview)) và frontend (xem [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview)).
  - Nguồn: https://github.com/loro-dev/loro

### 3.3.6. Metadata

- The Reddit Media Metadata Store: Bài đăng trên subreddit r/RedditEng thảo luận về hệ thống lưu trữ metadata cho media của Reddit, bao gồm kiến trúc và các lựa chọn công nghệ.
  - Nguồn: https://www.reddit.com/r/RedditEng/comments/1avlywv/the_reddit_media_metadata_store

### 3.3.7. Sao lưu Dữ liệu (Data Backup)

- [Chien Luoc Backup Du Lieu 3 2 1](/Technology/System-Design/Practices/Chien Luoc Backup Du Lieu 3 2 1)

## 3.4. Giao tiếp và Thông báo (Communication and Notification)

### 3.4.1. OTP (One-Time Password)

- OTP và các khía cạnh bảo mật cần phải đảm bảo: Phân tích về One-Time Password (OTP), cơ chế hoạt động (ví dụ: TOTP, HOTP) và các khía cạnh bảo mật quan trọng cần lưu ý khi triển khai hệ thống OTP để đảm bảo an toàn (ví dụ: chống brute-force, thời gian hiệu lực, kênh gửi an toàn).
  - Nguồn: https://viblo.asia/p/otp-va-cac-khia-canh-bao-mat-can-phai-dam-bao-r1QLxxagLAw

### 3.4.2. Thông báo (Notifications)

- Bí thuật xử lý ngữ pháp notification như Facebook: Chia sẻ kỹ thuật xử lý ngữ pháp cho các thông báo (notifications) một cách linh hoạt và tự nhiên, tùy theo ngữ cảnh và số lượng đối tượng, tương tự như cách Facebook hiển thị thông báo.
  - Nguồn: https://viblo.asia/p/bi-thuat-xu-ly-ngu-phap-notification-nhu-facebook-m2vJPwxo4eK
- Con chim xanh Duolingo và bài toán gửi 4 triệu notification trong 5s: Phân tích case study của Duolingo về thách thức gửi một lượng lớn thông báo (4 triệu trong 5 giây) và các giải pháp kỹ thuật mà họ đã áp dụng (ví dụ: tối ưu hóa batch processing, sử dụng message queues, lựa chọn cơ sở hạ tầng phù hợp).
  - Nguồn: https://viblo.asia/p/con-chim-xanh-duolingo-va-bai-toan-gui-4-trieu-notification-trong-5s-qPoL7RraJvk

### 3.4.3. Chat / Real-time Communication

- Chat chit và bức tranh về realtime communication: Cung cấp cái nhìn tổng quan về giao tiếp thời gian thực (real-time communication), các công nghệ (ví dụ: WebSockets, WebRTC, SSE) và kiến trúc thường được sử dụng để xây dựng ứng dụng chat.
  - Nguồn: https://viblo.asia/p/chat-chit-va-buc-tranh-ve-realtime-communication-maGK7vRA5j2
- Go Random Chat: Kho lưu trữ GitHub cho một ứng dụng chat ngẫu nhiên được xây dựng bằng Go.
  - Nguồn: https://github.com/minghsu0107/go-random-chat

### 3.4.4. Email

- Nghệ thuật xử lý background job (có thể áp dụng cho gửi email hàng loạt):
  - Nguồn: https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4

## 3.5. Các Hệ thống Đặc thù (Specific Systems)

### 3.5.1. Thương mại Điện tử (E-commerce)

- Design System: Payment System cơ bản - 3k RPS: Video hướng dẫn thiết kế một hệ thống thanh toán (Payment System) cơ bản có khả năng xử lý khoảng 3000 yêu cầu mỗi giây (RPS), bao gồm các thành phần chính, luồng xử lý và các cân nhắc về bảo mật, độ tin cậy.
  - Nguồn: https://www.youtube.com/watch?v=zI6w11T0_hY
- Ngàn lẻ một lỗi thường gặp trong ứng dụng web về tài chính và cách phòng tránh: Series bài viết liệt kê các lỗi thường gặp trong quá trình phát triển ứng dụng web liên quan đến lĩnh vực tài chính (ví dụ: lỗi làm tròn, xử lý race condition trong giao dịch, bảo mật dữ liệu nhạy cảm) và cung cấp các giải pháp, cách phòng tránh.
  - Phần 1: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-1-5OXLAomw4Gr
  - Phần 2: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-2-38X4ENmAJN2?fbclid=IwAR3FZtO-o3z5tT6H_KreLb76su31lv9cv8Ra5-0jGdTRCw1deUy1YVO4LV8
  - Phần 3: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-3-W13VMeZ5VY7
- Arcturus — Inventory Processing System - Tiki Engineering: Bài viết từ đội ngũ kỹ sư Tiki chia sẻ về Arcturus, hệ thống xử lý tồn kho (Inventory Processing System) của họ, bao gồm kiến trúc và các thách thức kỹ thuật.
  - Nguồn: https://engineering.tiki.vn/arcturus-inventory-processing-system/?fbclid=IwAR2B533HipyuGC86RZtL8MsN9_Ke5ARs5mkJoa11H9z19jx8rCIuTBQLfjk
- Thiết Kế Hệ Thống Airbnb - Viblo: Phân tích và hướng dẫn cách thiết kế một hệ thống tương tự Airbnb, bao gồm các thành phần chính (quản lý người dùng, nhà cho thuê, đặt phòng, tìm kiếm, thanh toán), luồng dữ liệu và các cân nhắc về scalability, availability.
  - Nguồn: https://viblo.asia/p/thiet-ke-he-thong-airbnb-x7Z4DYX2JnX?fbclid=IwAR1a_7ab055VuHj2UJ2-CX77aj-5W3G1avwf6PG3Dau3b2Aq6XZGnSrBB8w
- Thiết Kế Hệ Thống Bán Vé (Ticketing System Design): Hướng dẫn các bước và yếu tố cần xem xét khi thiết kế một hệ thống bán vé trực tuyến, từ quản lý sự kiện, loại vé, số lượng, đặt vé, xử lý thanh toán đến chống gian lận.
  - Nguồn: https://viblo.asia/p/thiet-ke-he-thong-ban-ve-ticketing-system-design-GyZJZnjZJjm
- [Thanh Toan Chuyen Khoan Ngan Hang](/Technology/System-Design/Practices/Thanh Toan Chuyen Khoan Ngan Hang)
- VietQR-Portal: Cổng thông tin chính thức về VietQR, một chuẩn QR Code chung cho thanh toán tại Việt Nam. - Nguồn: https://vietqr.net

### 3.5.2. Mạng Xã hội (Social Networks)

- Misskey: Kho lưu trữ GitHub của Misskey, một nền tảng mạng xã hội phi tập trung, mã nguồn mở với nhiều tính năng phong phú.
  - Nguồn: https://github.com/misskey-dev/misskey

### 3.5.3. Streaming Video (HLS)

- HLS (HTTP Live Streaming): Là một giao thức truyền phát video trực tiếp dựa trên HTTP được phát triển bởi Apple. HLS chia video thành các đoạn nhỏ, cho phép client yêu cầu các đoạn này qua HTTP và thích ứng với các điều kiện mạng khác nhau bằng cách chuyển đổi giữa các luồng có chất lượng khác nhau.

### 3.5.4. Hệ thống Gợi ý (Recommendation Systems / Suggestion Algorithms)

- Collaborative-Filtering: Kho lưu trữ GitHub cung cấp hướng dẫn và mã nguồn ví dụ cho thuật toán Lọc Cộng tác (Collaborative Filtering), một kỹ thuật phổ biến trong các hệ thống gợi ý dựa trên hành vi của người dùng tương tự hoặc các mục tương tự.
  - Nguồn: https://github.com/Longcodedao/Collaborative-Filtering

### 3.5.5. Xử lý Địa lý (Geography-based Solutions)

- Bài toán ghép đơn hàng tối ưu thời gian đi giao: Một thảo luận trên Facebook group J2Team Community về bài toán tối ưu hóa việc ghép đơn hàng để giảm thiểu thời gian giao hàng, một vấn đề thực tế trong logistics, có thể liên quan đến thuật toán tối ưu đường đi (ví dụ: Traveling Salesman Problem).
  - Nguồn: https://www.facebook.com/groups/j2team.community/permalink/2303868619945245/

### 3.5.6. Rút gọn URL (URL Shortening - TinyURL)

Thiết kế hệ thống rút gọn URL như TinyURL.

- Yêu cầu:
  - Nhận một URL dài, trả về một URL ngắn.
  - Khi truy cập URL ngắn, chuyển hướng đến URL dài ban đầu.
  - URL ngắn phải là duy nhất.
  - Khả năng tùy chỉnh URL ngắn (optional).
  - Phân tích số lượt click (optional).
- Các thành phần chính:
  - Application Service: Xử lý logic, tạo mã ngắn, lưu trữ.
  - Database: Lưu trữ ánh xạ giữa URL ngắn và URL dài.
    - Có thể dùng NoSQL (ví dụ: Cassandra, DynamoDB) cho khả năng ghi và đọc nhanh, khả năng mở rộng cao.
    - Key: mã ngắn, Value: URL dài.
  - ID Generator: Tạo mã ngắn duy nhất.
    - Cách 1: Base62 encoding từ một số nguyên tăng dần (cần cơ chế đồng bộ để tránh trùng lặp trong hệ thống phân tán, ví dụ: dùng Zookeeper, hoặc một service sinh ID riêng).
    - Cách 2: Sinh UUID rồi hash và lấy một phần.
    - Cách 3: Pre-generate một lượng lớn ID và lưu vào DB.
  - Load Balancer: Phân phối tải cho application service.
  - Caching: Cache các URL ngắn thường xuyên truy cập để giảm tải cho DB.
- Luồng hoạt động:
  - Tạo URL ngắn: User gửi URL dài -> Load Balancer -> Application Service -> ID Generator tạo mã ngắn -> Application Service lưu (mã ngắn, URL dài) vào DB -> Trả URL ngắn cho user.
  - Chuyển hướng: User truy cập URL ngắn -> Load Balancer -> Application Service -> Tìm URL dài tương ứng trong Cache, nếu không có thì tìm trong DB -> Trả về HTTP 301/302 redirect đến URL dài.
- Cân nhắc:
  - Khả năng mở rộng (Scalability): Sharding DB theo mã ngắn, stateless application services.
  - Tính sẵn sàng (Availability): Replication DB, nhiều instance application service.
  - Độ trễ (Latency): Caching, chọn DB phù hợp.
- Nguồn: https://www.threads.net/@viettranx89/post/C_ZdnH-B9DI
  ![](/Attachments/1a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809.png)
  ![](/Attachments/2b3c4d5e-6f70-8192-a3b4-c5d6e7f8091a.png)
- Protip từ nguồn: Nên tiếp cận vấn đề theo hướng MVP trước, giải quyết core design rồi hãy mở rộng. Làm rõ các ràng buộc về actors (lock, race condition, chosen protocol) trước khi tính đến scalability.

### 3.5.7. Bộ đếm Phân tán (Distributed Counter)

Đối với các trường hợp sử dụng như đếm số lượt xem, lượt thích, lượt vote, có nhiều cách tiếp cận (integer counter trong RDBMS, message queue, INCR trong Redis, HyperLogLog).
Khi yêu cầu khả năng mở rộng cao, không yêu cầu strong consistency (có thể eventual consistency với độ trễ thấp), có thể sử dụng Conflict-free Replicated Data Type (CRDT).

- CRDT cho phép các bản sao dữ liệu được cập nhật độc lập và sau đó hợp nhất mà không có xung đột.
- Tham khảo:
  - Phân tích và các use case của CRDT: https://www.infoq.com/articles/database-merge-replication-crdt/
  - Đọc thêm về CRDT: https://crdt.tech/resources
  - CRDT in Redis (Active-Active replication): https://redis.io/active-active/

### 3.5.8. Tìm kiếm (Search) & Tự động hoàn thành (Autocomplete)

#### 3.5.8.1. Thực tiễn từ Twitter

Bài blog từ Twitter (X) Engineering chia sẻ về các nỗ lực và giải pháp để đảm bảo tính ổn định và khả năng mở rộng cho hệ thống tìm kiếm của họ.

- Nguồn: https://blog.x.com/engineering/en_us/topics/infrastructure/2022/stability-and-scalability-for-search

#### 3.5.8.2. Thảo luận về giải pháp Autocomplete

![](/Attachments/0f1a2b3c-4d5e-6f70-8192-a3b4c5d6e7f8.png)

- Một số ý tưởng:
  - Dùng Spark Graph, HDFS, Cloud Hadoop để implement Trie.
  - Shard dữ liệu: Mỗi cluster lưu một số prefix, có proxy để điều hướng. Thách thức là chia sao cho request đều.
  - Sync data về DWH chung, dùng Spark/Hadoop để query + caching.
  - Sử dụng Elasticsearch (GitHub cũng dùng).
- Nguồn thảo luận: https://www.facebook.com/groups/sydexa/permalink/1775084429648431/

#### 3.5.8.3. Prefixy - Dịch vụ tìm kiếm tiền tố cho Autocomplete

Prefixy là một dịch vụ tìm kiếm tiền tố (prefix search) có khả năng mở rộng, được thiết kế để cung cấp năng lượng cho các tính năng tự động hoàn thành (autocomplete).

- Bài viết: https://medium.com/@prefixyteam/how-we-built-prefixy-a-scalable-prefix-search-service-for-powering-autocomplete-c20f98e2eff1
- Github repo: https://github.com/prefixy/prefixy

#### 3.5.8.4. Thư viện khác

- typeahead.js: Thư viện autocomplete nhanh và đầy đủ tính năng.
  - Nguồn: https://github.com/twitter/typeahead.js

### 3.5.9. Hệ thống Sinh ID (ID Generation)

- Xây dựng hệ thống sinh ID của GHTK - 100 triệu ID / giây: Video từ Giao Hàng Tiết Kiệm (GHTK) chia sẻ về cách họ xây dựng hệ thống sinh ID có khả năng tạo ra 100 triệu ID mỗi giây. Các yếu tố quan trọng bao gồm tính duy nhất, thứ tự (tùy chọn), khả năng mở rộng và hiệu năng cao. - Nguồn: https://www.youtube.com/watch?v=bSyFHY3a3_s
  ![](/Attachments/3c4d5e6f-7081-92a3-b4c5-d6e7f8091a2b.png)

## 3.6. Vận hành và Giám sát (Operations and Monitoring)

### 3.6.1. Giám sát Hệ thống (System Monitoring)

- 1 ngày làm analytic: Đo lường CCU theo thời gian thực: Chia sẻ kinh nghiệm thực tế về việc đo lường số lượng người dùng đồng thời (CCU - Concurrent Users) theo thời gian thực, một yếu tố quan trọng trong phân tích và giám sát hệ thống. - Nguồn: https://viblo.asia/p/1-ngay-lam-analytic-do-luong-ccu-theo-thoi-gian-thuc-4P856L0BZY3
  ![](/Attachments/a3b4c5d6-e7f8-49a0-9b1c-2d3e4f5a6b7c.jpg)

### 3.6.2. Rate Limiting

- Giải mã Rate Limiting: Lá chắn bảo vệ API khỏi các cuộc tấn công mạng: Giải thích về Rate Limiting, một kỹ thuật quan trọng để bảo vệ API khỏi lạm dụng, tấn công từ chối dịch vụ (DoS) và đảm bảo sự ổn định của hệ thống. Bao gồm các thuật toán (Token Bucket, Leaky Bucket) và cách triển khai.
  - Nguồn: https://viblo.asia/p/giai-ma-rate-limiting-la-chan-bao-ve-api-khoi-cac-cuoc-tan-cong-mang-gwd432WbVX9

### 3.6.3. Benchmarking

Công cụ để đo lường hiệu năng và tải của hệ thống.

- Apache JMeter
- K6: https://k6.io
- wrk: https://github.com/wg/wrk

## 3.7. Công nghệ và Nền tảng (Technologies and Platforms)

### 3.7.1. Serverless

- A year of running a hotel booking application on AWS Serverless services for $0.8/month: Chia sẻ kinh nghiệm vận hành một ứng dụng đặt phòng khách sạn trên các dịch vụ Serverless của AWS (ví dụ: Lambda, API Gateway, DynamoDB) với chi phí cực thấp.
  - Nguồn: https://hieudd.substack.com/p/a-year-of-running-a-hotel-booking

### 3.7.2. Message Brokers (Kafka, RabbitMQ)

Các hệ thống hàng đợi tin nhắn (Message Queue) dùng để giao tiếp bất đồng bộ giữa các service.

- Zero Disk Architectures - stateless broker: Kiến trúc broker không trạng thái, sử dụng bộ nhớ ngoài (ví dụ S3) để lưu trữ trạng thái, giúp broker dễ dàng scale và phục hồi.
  - WarpStream
  - AutoMQ

### 3.7.3. Distributed Computing (Tính toán Phân tán)

- Hadoop: Một framework mã nguồn mở cho phép xử lý và lưu trữ các tập dữ liệu lớn theo mô hình phân tán.

### 3.7.4. Distributed Data Join & Mapping (Kết hợp và Ánh xạ Dữ liệu Phân tán)

- Hasura: Cung cấp GraphQL API tức thời trên các nguồn dữ liệu mới hoặc hiện có, giúp dễ dàng kết hợp dữ liệu từ nhiều nguồn.
- Krakend: Một API Gateway hiệu suất cao với middleware cho phép biến đổi, tổng hợp và lọc dữ liệu từ nhiều microservices.

### 3.7.5. Trí tuệ Nhân tạo (AI / Machine Learning)

- SaaS AI models: Replicate là một nền tảng cho phép chạy các mô hình AI/Machine Learning trong cloud mà không cần quản lý cơ sở hạ tầng. Cung cấp API để dễ dàng tích hợp các mô hình AI vào ứng dụng.
  - Nguồn: https://replicate.com
- Practice xây dựng LLM + RAG trên AWS: Bài đăng trên Facebook group AWS Study Group FCJ chia sẻ kinh nghiệm thực hành xây dựng mô hình ngôn ngữ lớn (LLM) kết hợp với Retrieval Augmented Generation (RAG) trên nền tảng AWS.
  - Nguồn: https://www.facebook.com/groups/awsstudygroupfcj/posts/1710057443092554/

## 3.8. Di chuyển và Hiện đại hóa Hệ thống (System Migration and Modernization)

### 3.8.1. Câu chuyện về Hiện đại hóa Từng bước (A Tale of Incremental Modernisation)

Một khách hàng lớn ở UK và Ireland vận hành hệ thống legacy trên Mainframe gặp khó khăn về chi phí, tốc độ thay đổi và nhân lực. Team Thoughtworks được yêu cầu thay thế và di chuyển hệ thống lên Cloud.

- Hành trình này sử dụng nhiều patterns: Dual Run, Event Interception, Legacy Mimic, Transitional Architecture, Change Data Capture (CDC), Dark Launching, Canary Release.
- Testing đóng vai trò rất quan trọng.
- Nguồn: https://martinfowler.com/articles/uncovering-mainframe-seams.html

### 3.8.2. Di chuyển Cơ sở dữ liệu

- Chuyển dữ liệu từ DB này sang DB khác - Bí mật đằng sau bài toán lưu trữ media của Canva và hành trình tìm đến DynamoDB: Chia sẻ về case study của Canva trong việc di chuyển và lưu trữ dữ liệu media, cụ thể là hành trình chuyển sang sử dụng DynamoDB, cùng với các thách thức và giải pháp.
  - Nguồn: https://viblo.asia/p/bi-mat-dang-sau-bai-toan-luu-tru-media-cua-canva-va-hanh-trinh-tim-den-dynamodb-3RlL5gPz4bB
- How Discord Stores Trillions of Messages (MongoDB -> ScyllaDB): Bài blog từ Discord giải thích cách họ lưu trữ hàng nghìn tỷ tin nhắn, bao gồm quyết định di chuyển từ MongoDB sang ScyllaDB để cải thiện hiệu năng và khả năng mở rộng.
  - Nguồn: https://discord.com/blog/how-discord-stores-trillions-of-messages

## 3.9. Quản lý Phiên bản (Versioning)

- Cách đặt tên version: Bài viết từ ByteByteGo giải thích ý nghĩa của các con số trong việc đặt tên phiên bản phần mềm, thường theo chuẩn Semantic Versioning (Major.Minor.Patch).
  - Major: Thay đổi không tương thích API.
  - Minor: Thêm chức năng mới, tương thích ngược.
  - Patch: Sửa lỗi, tương thích ngược.
  - Nguồn: https://blog.bytebytego.com/p/ep120-what-do-version-numbers-mean

## 3.10. Thu thập Dữ liệu Web (Web Crawling)

- Puppeteer: Một thư viện Node.js cung cấp API cấp cao để điều khiển trình duyệt Chrome/Chromium qua DevTools Protocol. Thường được sử dụng cho crawling, scraping, tự động hóa kiểm thử UI.

## 3.11. Xử lý Văn bản & Trình soạn thảo (Text & Editor)

- [Solution Sao Luu Lich Su Chinh Sua](/Technology/System-Design/Practices/Solution Sao Luu Lich Su Chinh Sua)

## 3.12. Mở rộng Hệ thống khi Lưu lượng Tăng đột biến (Scaling for Traffic Spikes)

- Chiến lược scale-out hiệu quả khi lượng truy cập gia tăng đột biến cho hệ thống Viblo: Chia sẻ chiến lược scale-out (mở rộng theo chiều ngang) hiệu quả cho hệ thống khi đối mặt với tình trạng lượng truy cập tăng đột biến, dựa trên kinh nghiệm của Viblo.
  - Nguồn: https://viblo.asia/p/chien-luoc-scale-out-hieu-qua-khi-luong-truy-cap-gia-tang-dot-bien-cho-he-thong-viblo-zOQJw5xNVMP

> **Xem thêm:** [Tổng hợp System Design & Design Patterns](/Technology/System-Design/Practices/Solutions System Designs Design Patterns)
