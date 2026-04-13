---
area: technology
domain: backend
type: resource
---
# Vitess - Distributed Database Best Practices

## Tổng quan

Tài liệu này tổng hợp các ý kiến và best practices về Vitess - một giải pháp database sharding cho MySQL, đặc biệt tập trung vào các vấn đề về cross-shard transactions, CDC (Change Data Capture), và thiết kế hệ thống phân tán.

## 1. Cross-Shard Transactions

### 1.1. Vấn đề cốt lõi

**Câu hỏi ban đầu:** Vitess có cách nào để đảm bảo write transaction cross-shard vẫn đúng không?

**Kết luận:**

- **Mặc định Vitess KHÔNG đảm bảo** cross-shard transaction
- Nếu một trong các shard fail, transaction sẽ để nguyên trạng thái không nhất quán
- Không có connector hoàn chỉnh từ Vitess, một số công ty tự viết và bán (ví dụ: PlanetScale)

### 1.2. Giải pháp: Two-Phase Commit (2PC)

- Có thể sử dụng 2PC để đảm bảo ACID cho cross-shard transaction
- **Nhược điểm:**
  - Hiệu năng giảm đáng kể
  - CPU usage tăng cao
  - Không reliable trong điều kiện network partition, split brain hoặc timeout

**Best Practice:** Hạn chế cross-shard transaction hết mức có thể

## 2. Thiết kế để tránh Cross-Shard Transaction

### 2.1. Phân tích Use Case

#### Use Case 1: API của 1 user (~80% trường hợp)

- **Đặc điểm:** API được sử dụng bởi 1 user duy nhất
- **Giải pháp:** Query thường lọc theo/trong phạm vi 1 userId
- **Kết quả:** Không xảy ra cross-shard transaction

#### Use Case 2: API làm việc với nhiều user khác nhau

- **Vấn đề:** Dẫn đến cross-shard transaction
- **Giải pháp:** Thiết kế lại hệ thống/ứng dụng
  - Chia nhỏ tác vụ thành nhiều transaction riêng biệt có thể retry
  - Ví dụ: Xóa 500 user → group user theo shard (1-xxx, 2-xxx,...)
  - Mỗi group đẩy lên durable queue (Kafka)
  - Worker lấy message và thực hiện transaction (consumer group đảm bảo song song)
  - Retry với backoff nếu fail
- **Yêu cầu:** Đảm bảo nghiệp vụ chỉ cần atomic/ACID trên 1 database cụ thể, không cần trên toàn cluster
- **Tính chất:** Thường sẽ eventual consistency

#### Use Case 3: Bắt buộc Cross-Shard Transaction (~1-2% trường hợp)

- **Tình huống:** Cần CS TX hoặc có hoặc không trên nhiều userId khác nhau
- **Giải pháp:**
  1. Tái cấu trúc lại chức năng nếu được
  2. Chuyển qua mô hình partition thay vì sharding
  3. Dùng single master cho bảng đó
- **Nguyên tắc:** Nếu cần ưu tiên ACID toàn bảng thì không nên shard

#### Use Case 4: OLAP (Online Analytical Processing)

- **Đặc điểm:** Read là chủ yếu
- **Giải pháp:** Dùng các DB OLAP chuyên biệt
- **Lưu ý:** Không cần quan tâm cross-shard transaction

### 2.2. Data Planning

**Nguyên tắc quan trọng:**

- Phải có bước **data planning** trước khi shard
- Đảm bảo các bảng hay join thì buộc phải nằm cùng master
- Các row cần dùng chung thì phải cùng shard
- Thiết kế từ UI/UX → API → Backend → Database

**Kinh nghiệm:**

- Chia theo domain, không chia nhỏ quá nhưng cũng không làm to quá
- Làm to quá → thiết kế DB dễ bị cross-shard
- Scale ~50 triệu user → DB tầm ~260 machine chạy Vitess mới ổn định
- Không nên nhét hết vào 1 cluster → quản lý cực

## 3. Change Data Capture (CDC) và Event Streaming

### 3.1. Vấn đề ban đầu

- Cần bắt event insert, update, delete từ Vitess
- Debezium + Kafka là giải pháp chuẩn nhưng khó tự implement
- VStream của Vitess cũng có thể bắt event thông qua vtgate
- **Thắc mắc:** Khi dùng VStream, event bắt được có biết là event của user1 hay user2 không?

### 3.2. Best Practice: Outbox Pattern

**Thay vì đọc CDC trực tiếp:**

- Sử dụng **Outbox Pattern** ở application layer
- Đảm bảo tính nhất quán và dễ quản lý hơn
- Phù hợp với nhiều trường hợp sử dụng

**Lưu ý:** Việc dùng CDC hay Outbox Pattern tùy thuộc vào từng trường hợp cụ thể

### 3.3. VStream và Event Identification

- VStream bắt event thông qua vtgate
- Về mặt logic, Vitess trừu tượng hóa phần xử lý phía sau
- Người dùng nhìn như 1 database chứ không phải nhiều database phân tán
- Cần kiểm tra documentation của Vitess về cách xác định event từ shard/user nào

## 4. Các Pattern Xử Lý Transaction Phân Tán

### 4.1. Two-Phase Commit (2PC)

- **Đặc điểm:** Chậm nhất, không reliable trong network partition, split brain hoặc timeout
- **Sử dụng:** Khi cần đảm bảo ACID strict

### 4.2. Saga Pattern

- **Đặc điểm:** Compensating transactions
- **Sử dụng:** Khi có thể chấp nhận eventual consistency và cần rollback logic

### 4.3. Log Replication + Leader Election (Paxos, Raft)

- **Đặc điểm:** Tổng quát nhất, hay dùng nhất
- **Lưu ý:** Dễ làm sai nếu hiện thực không chuẩn, đặc biệt ở khâu leader leasing
- **Sử dụng:** Phổ biến trong các hệ thống phân tán hiện đại

### 4.4. Three-Phase Commit (3PC)

- **Đặc điểm:** Giải quyết vấn đề của 2PC nhưng thực tế không ai sử dụng vì dễ lỗi

### 4.5. Atomic Broadcast

- **Đặc điểm:** Tham khảo Zookeeper
- **Lưu ý:** Đã có một số paper tìm được khe hở nhưng thực tế khá ít gặp
- **Tài liệu tham khảo:** jepsen.io

## 5. Kiến trúc và Deployment

### 5.1. Kiến trúc đề xuất

```
1 Load Balancer
2 vtgate (gateway)
4 vtablet (tablet server)
```

### 5.2. Deployment

**Docker Swarm:**

- Phù hợp cho học tập và testing
- Mỗi component chạy trên 1 máy ảo để fake khả năng mở rộng
- Trên mạng chủ yếu dùng Kubernetes (phức tạp hơn)

**Lưu ý:**

- Nên bóc từng phần để học thành phần nào thì học cho đơn giản
- Viết gom vào 1 docker compose trước, sau đó phân tán ra thêm node

### 5.3. Alternatives

**Google Cloud Spanner:**

- Người ta chuyển sang dùng Spanner xong không muốn chuyển về solution khác
- Giải pháp managed service, nhẹ đầu hơn nhưng có chi phí

## 6. Best Practices Tổng Hợp

### 6.1. Thiết kế Sharding

1. **Shard theo domain logic:**
   - Chia theo domain, không chia nhỏ quá, không làm to quá
   - Thiết kế từ UI/UX → API → Backend → Database

2. **Data Planning:**
   - Các bảng hay join phải nằm cùng master
   - Các row cần dùng chung phải cùng shard
   - Shard key phải được thiết kế cẩn thận (ví dụ: userId)

3. **Hạn chế Cross-Shard:**
   - Thiết kế để ~80% use case không cần cross-shard
   - Chia nhỏ tác vụ lớn thành nhiều transaction riêng biệt
   - Sử dụng queue và worker pattern

### 6.2. Xử lý Cross-Shard Transaction

1. **Tránh khi có thể:**
   - Thiết kế lại chức năng
   - Chuyển sang partition thay vì sharding
   - Dùng single master cho bảng cần ACID strict

2. **Khi bắt buộc:**
   - Sử dụng 2PC (chấp nhận hiệu năng giảm)
   - Hoặc chấp nhận eventual consistency với Saga pattern

### 6.3. Event Streaming và CDC

1. **Outbox Pattern:**
   - Ưu tiên Outbox Pattern ở application layer
   - Đảm bảo tính nhất quán và dễ quản lý

2. **CDC khi cần:**
   - Debezium + Kafka là giải pháp chuẩn
   - VStream của Vitess có thể sử dụng nhưng cần kiểm tra documentation

### 6.4. Scale và Quản lý

1. **Scale:**
   - ~50 triệu user → ~260 machine chạy Vitess
   - Không nên nhét hết vào 1 cluster

2. **Học tập:**
   - Bóc từng phần để học
   - Bắt đầu với docker compose, sau đó phân tán
   - Tìm hiểu engine tổ chức/quản lý file trước, sau đó mới lên write

## 7. Kết luận

### 7.1. Tóm tắt

- Vitess mặc định không đảm bảo cross-shard transaction
- Best practice là thiết kế để tránh cross-shard transaction (~80% use case)
- Khi cần cross-shard, có thể dùng 2PC hoặc chấp nhận eventual consistency
- Data planning và thiết kế shard key là cực kỳ quan trọng
- Outbox Pattern thường tốt hơn CDC trực tiếp

### 7.2. Khuyến nghị cho Sinh viên

1. **Bắt đầu đơn giản:**
   - Học từng phần một
   - Bắt đầu với docker compose
   - Tìm hiểu engine trước, sau đó mới lên write

2. **Thực hành:**
   - Dựng cluster Vitess với Docker Swarm
   - Test các use case khác nhau
   - Hiểu rõ trade-off giữa ACID và performance

3. **Nâng cao:**
   - Tìm hiểu CDC + Kafka + Saga pattern
   - Nghiên cứu các pattern xử lý transaction phân tán
   - Đọc tài liệu trên jepsen.io về distributed systems

## 8. Tài liệu tham khảo

- Vitess Documentation
- Jepsen.io - Testing distributed systems
- Debezium Documentation
- Google Cloud Spanner
- PlanetScale (commercial Vitess solution)

---

**Lưu ý:** Tài liệu này được tổng hợp từ cuộc thảo luận cộng đồng, các best practices có thể thay đổi tùy theo context và yêu cầu cụ thể của từng dự án.