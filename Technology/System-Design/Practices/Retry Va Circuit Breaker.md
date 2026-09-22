---
area: technology
domain: system-design
topic: system-design
type: resource
title: Retry Va Circuit Breaker
description: Cách retry ít gây down
timestamp: '2026-09-22T00:00:00.000Z'
tags:
  - technology
  - system-design
resource: https://engineering.grab.com/attribution-platform
---

# 4. Cách retry ít gây down

Nhiều người sẽ chọn cách retry ngay lập tức khi có lỗi. Nhưng nếu tinh tế hơn, mình có thể triển khai cơ chế retry theo cấp số Fibonacci — ví dụ: retry sau 1 giây, tiếp theo là 3 giây, rồi 5 giây,...

Lý do là gì? Việc tăng dần thời gian giữa các lần retry giúp hệ thống có thời gian để phục hồi, đồng thời giảm áp lực đồng thời lên service đang gặp sự cố. Điều này giúp tránh tình trạng "service vừa lên lại chết" do bị dồn tải quá nhanh.

Thực tế, không nhiều anh em dùng Laravel queue mà viết worker riêng bằng Golang. Phần lớn (99%) dùng queue mặc định hoặc Horizon. Nhưng ít người để ý các yếu tố như: `backoff`, `unique`, `skipping job`, v.v.

Với Kafka consumer, chỗ delay và DLQ được chắt từ thread Golang Vietnam (10/04/2026) nằm ở [Kafka DLQ và retry](/Technology/System-Design/Practices/Kafka DLQ Va Retry).

Mình từng gặp tình huống thực tế: service A gọi đến service B. Khi B gặp sự cố, A liên tục retry mà không có kiểm soát, khiến B cứ lên được một lúc là lại sập tiếp. Giải pháp là khi B hoạt động trở lại, chỉ nên đẩy traffic dần dần bằng cách áp dụng cơ chế backoff thông minh trong retry — như vậy sẽ ổn định hệ thống hơn rất nhiều.

## 4.1. Khác (Miscellaneous)

- Đánh giá hiệu quả của quảng cáo: Bài viết từ đội ngũ kỹ sư Grab chia sẻ về Attribution Platform của họ, hệ thống dùng để đo lường và đánh giá hiệu quả của các chiến dịch quảng cáo.
  - Nguồn: https://engineering.grab.com/attribution-platform
- View (có thể liên quan đến cách hiển thị hoặc xử lý view count):
  - Nghệ thuật xử lý background job: https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4 (Link này có thể liên quan đến việc cập nhật view count bất đồng bộ)

# 5. Design patterns

- Aggregator & Proxy: Design Patterns for Microservices — Aggregator Pattern & Proxy pattern | by Nisal Pubudu | Nerd For Tech | Medium - https://medium.com/nerd-for-tech/design-patterns-for-microservices-aggregator-pattern-99c122ac6b73
- SAGA: Distributed transaction - SAGA pattern - Transaction isolation (viblo.asia) - https://viblo.asia/p/distributed-transaction-saga-pattern-transaction-isolation-gGJ590MalX2
- Top 10 Microservices Design Patterns and Principles - Examples (javarevisited.blogspot.com): https://javarevisited.blogspot.com/2021/09/microservices-design-patterns-principles.html#axzz7pw6wS3gQ

## 5.0. Circuit Breaker Pattern

- **Tổng quan**: Mẫu thiết kế giúp hệ thống phân tán tăng cường khả năng chịu lỗi và phục hồi nhanh chóng khi gặp sự cố, bằng cách ngăn chặn các yêu cầu đến dịch vụ bị lỗi và cho phép thử lại sau một khoảng thời gian nhất định
- **Cơ chế hoạt động**:
  - **Trạng thái Closed**: Hệ thống hoạt động bình thường, các yêu cầu được chuyển tiếp đến dịch vụ
  - **Trạng thái Open**: Khi số lượng lỗi vượt ngưỡng cho phép, Circuit Breaker chuyển sang trạng thái "Open", chặn các yêu cầu tiếp theo đến dịch vụ để tránh làm tăng thêm áp lực và cho phép dịch vụ có thời gian phục hồi
  - **Trạng thái Half-Open**: Sau một khoảng thời gian nhất định, Circuit Breaker chuyển sang trạng thái "Half-Open" để kiểm tra xem dịch vụ đã phục hồi chưa bằng cách cho phép một số yêu cầu thử nghiệm đi qua
  - **Chuyển đổi trạng thái**: Nếu dịch vụ hoạt động bình thường trong trạng thái Half-Open, Circuit Breaker chuyển về trạng thái "Closed". Nếu vẫn còn lỗi, quay lại trạng thái "Open"
- **Lợi ích**:
  - Ngăn chặn lỗi lan rộng trong hệ thống bằng cách cách ly dịch vụ bị lỗi
  - Cải thiện khả năng phục hồi và độ tin cậy của hệ thống
  - Giảm tải cho dịch vụ đang gặp sự cố, cho phép nó có thời gian phục hồi
  - Tránh tình trạng "thundering herd" khi nhiều yêu cầu cùng lúc cố gắng truy cập dịch vụ đang gặp sự cố
- **Ứng dụng trong Java**: Sử dụng thư viện như Resilience4j để triển khai Circuit Breaker, giúp quản lý và giám sát trạng thái của các dịch vụ, cải thiện độ tin cậy của hệ thống
- Nguồn: https://viblo.asia/p/cung-tim-hieu-ve-circuitbreaker-trong-java-zXRJ8PKMJGq

## 5.1. Distributed transaction

- So sánh các mẫu Distributed Transaction trong microservices (grokking.org): http://newsletter.grokking.org/issues/191-so-sanh-cac-m-u-distributed-transaction-trong-microservices-783202
- Distributed transaction - Two-phase commit (Viblo): https://viblo.asia/p/distributed-transaction-two-phase-commit-naQZRBemZvx
- Blocking Retry, Two-Phase Commit (2PC) and Three-Phase Commit (3PC).
- Sử dụng Queues để xử lý Asynchronously trong Background, TCC. Compensation Matters.
- Local Message Table (Asynchronously Ensured)/Outbox Pattern, MQ Transaction.
- Saga Pattern, Event Sourcing, CQRS, Atomic Commitment.
- Parallel Commits, Transactional Replication, Consensus Algorithms.
- Timestamp Ordering, Optimistic Concurrency Control, Byzantine Fault Tolerance (BFT).
- Distributed Locking, Sharding, Multi-Version Concurrency Control (MVCC).
- Distributed Snapshots, Leader-Follower Replication
- Saga pattern with Orchestration & Choreography.
  - Sử dụng pattern Saga, có 2 loại đó là Choreography và Orchestration, điểm chung đều dùng message driven.
    - **Choreography - Event based**.
    - **Orchestration - Command based**.
- Parallel pipeline.
- Distributed locks with Redis: https://redis.io/docs/manual/patterns/distributed-locks
- Vấn đề 2 đơn hàng đến cùng lúc (liên quan đến Kafka và database): https://www.facebook.com/groups/645391349250568/posts/1897008380755519

## 5.2. Outbox pattern

Trong các hệ thống phân tán (hay distributed system dưới dạng microservices), tình huống thường thấy là bạn sẽ cần write vào database của một service, sau đó bắn một event (sự kiện, hoặc còn gọi là message) lên hệ thống message broker (phổ biến là RabbitMQ, Kafka) để các service khác nhận và tiếp tục xử lý. Trong tình huống này, một trong hai hành động trên có thể thất bại. Ví dụ bạn chưa write thành công vào DB, nhưng message đã được gửi đi tới service khác, có thể gây sai lệch dữ liệu. Outbox Pattern là một hướng handle đơn giản cho vấn đề này.

### 5.2.1. CÁCH Outbox Pattern HOẠT ĐỘNG

- **Bước 1**: Trong transaction sẽ bao gồm hai hành động: ghi dữ liệu mới vào bảng chính (ví dụ: `orders`) và đồng thời lưu thông tin cần gửi (message) vào một bảng `outbox` trong cơ sở dữ liệu. Vì cùng một transaction, điều này đảm bảo tính ACID: hoặc là bạn ghi thành công cả 2 thao tác, hoặc là bạn không có gì cả.
- **Bước 2**: Sau khi transaction hoàn thành, một tiến trình riêng biệt sẽ đọc các bản ghi từ bảng `outbox`, gửi thông tin này tới message broker, sau đó đánh dấu bản ghi là đã được xử lý. Bạn sẽ thấy nó rất tương đồng như queue job database trên Laravel phải không. Tiến trình này có thể được triển khai như một cronjob, hoặc một deamon job lắng nghe các sự kiện thay đổi trực tiếp từ bảng `outbox`(CDC hay Change Data Capture).

### 5.2.2. Lợi ích của Outbox Pattern

- **Tính nhất quán**: Đảm bảo tính nhất quán giữa cơ sở dữ liệu và hệ thống message broker. Vì sử dụng transaction giữa thao tác cập nhật vào db và ghi vào outbox, chúng ta yên tâm sự nhất quán theo nguyên tắc ACID.
- **Khả năng chịu lỗi**: Nếu message broker gặp sự cố, hệ thống vẫn lưu trữ được các message chưa gửi trong bảng `outbox` và gửi chúng sau khi sự cố được khắc phục.
- **Mở rộng dễ dàng**: **Outbox Pattern** giúp dễ dàng mở rộng hệ thống với các microservices khác mà không làm gián đoạn hệ thống cốt lõi. Mình chỉ cần sửa một chút tiến trình quét bảng outbox để nó bắn thêm sang service khác khi cần tích hợp thêm service mới, sẽ đơn giản hơn và hạn chế tác động vào source code cũ.

_Author: Huy Nguyen_

- Xem thêm chi tiết: [Outbox Pattern](/Technology/System-Design/Practices/Outbox Pattern)

> **Xem thêm:** [Tổng hợp System Design & Design Patterns](/Technology/System-Design/Practices/Solutions System Designs Design Patterns)
