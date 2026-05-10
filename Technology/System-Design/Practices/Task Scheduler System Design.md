---
area: technology
domain: system-design
topic: task-scheduler
type: resource
---
# Task Scheduler System Design

> **Nguồn:** https://medium.com/@bugfreeai/system-design-interview-with-a-meta-staff-engineer-designing-a-task-scheduler-1a5041b4860e

## Tổng quan

Bài viết mô tả một buổi phỏng vấn thiết kế hệ thống giả lập với một Kỹ sư Cấp cao (E6) từ Meta, tập trung vào việc thiết kế một Bộ lập lịch tác vụ (Task Scheduler).

## 1. Thảo luận Yêu cầu (Requirements Discussion)

### 1.1. Loại tác vụ

Cần xác định hệ thống sẽ xử lý:

- **Tác vụ định kỳ (Recurring tasks)**: Công việc lặp lại theo lịch (ví dụ: backup hàng ngày, gửi báo cáo tuần)
- **Tác vụ ad-hoc (One-time tasks)**: Tác vụ thực thi một lần (ví dụ: xử lý yêu cầu người dùng)

### 1.2. Hạn chế tài nguyên

Xác định các tài nguyên cần thiết để thực thi tác vụ:

- Thời gian chạy (runtime)
- Băng thông mạng
- Tiêu thụ CPU
- Bộ nhớ (memory)
- Các tài nguyên khác

### 1.3. Mục tiêu tối ưu hóa

Xác định phần nào của hệ thống cần được tối ưu hóa:

- Giảm độ trễ (latency)
- Tăng thông lượng (throughput)
- Đảm bảo công bằng tài nguyên giữa các tác vụ (fairness)
- Đảm bảo tính sẵn sàng (availability)

## 2. Khả năng mở rộng (Scalability)

### 2.1. Xử lý tác vụ song song với Hàng đợi tin nhắn

Sử dụng hàng đợi tin nhắn (Message Queue) để:

- Tách biệt việc tạo tác vụ khỏi việc thực thi
- Phân phối tác vụ đến nhiều nút công nhân (worker nodes)
- Ngăn chặn tắc nghẽn

**Công nghệ có thể sử dụng:**

- Kafka
- RabbitMQ
- AWS SQS

### 2.2. Xử lý tác vụ phức tạp

Đối với các tác vụ tiêu tốn nhiều tài nguyên hoặc mất nhiều thời gian:

#### 2.2.1. Hàng đợi ưu tiên (Priority Queue)

- Ưu tiên các tác vụ nhỏ, nhanh
- Đảm bảo các tác vụ quan trọng được xử lý trước

#### 2.2.2. Phân chia tác vụ theo loại

- Phân chia tác vụ theo loại hoặc yêu cầu tài nguyên
- Tách biệt các tác vụ phức tạp khỏi các tác vụ đơn giản
- Tránh tình trạng tác vụ lớn chặn các tác vụ nhỏ

#### 2.2.3. Mở rộng công nhân động (Dynamic Worker Scaling)

- Tự động tăng số lượng worker khi phát hiện sự gia tăng của các tác vụ nặng
- Đảm bảo hệ thống có đủ tài nguyên để xử lý tải cao

## 3. Khả năng chịu lỗi (Fault Tolerance)

### 3.1. Phát hiện lỗi và Thông báo cho người dùng

Khi một tác vụ thất bại, hệ thống nên:

- Ghi lại lỗi chi tiết
- Thông báo cho người dùng kịp thời

**Công cụ có thể sử dụng:**

- **Giám sát**: Prometheus, Grafana
- **Cảnh báo**: PagerDuty, Slack notifications

### 3.2. Cơ chế thử lại tác vụ (Retry Mechanism)

Đối với các lỗi tạm thời (ví dụ: vấn đề mạng, tài nguyên tạm thời không khả dụng):

- Thử lại tác vụ một số lần có thể cấu hình được
- Áp dụng chiến lược backoff theo cấp số nhân (exponential backoff) để tránh quá tải hệ thống

**Lợi ích của exponential backoff:**

- Giúp hệ thống có thời gian phục hồi
- Giảm áp lực đồng thời lên service đang gặp sự cố
- Tránh tình trạng "service vừa lên lại chết" do bị dồn tải quá nhanh

### 3.3. Xử lý lỗi liên tục

Nếu một tác vụ tiếp tục thất bại sau nhiều lần thử lại, hệ thống cần:

- **Leo thang (Escalation)**: Chuyển tác vụ sang xử lý thủ công hoặc cảnh báo đội ngũ vận hành
- **Cách ly (Isolation)**: Tách tác vụ lỗi ra khỏi hàng đợi chính để tránh ảnh hưởng đến các tác vụ khác
- **Nhật ký lỗi chi tiết**: Cung cấp log chi tiết để giúp người dùng chẩn đoán vấn đề
- **Quản lý thủ công**: Cho phép người dùng lên lịch lại hoặc hủy các tác vụ thất bại

## 4. Các thành phần chính của hệ thống

### 4.1. Scheduler Service

- Quản lý lịch trình tác vụ
- Tạo và đẩy tác vụ vào hàng đợi

### 4.2. Message Queue

- Lưu trữ các tác vụ chờ xử lý
- Đảm bảo tính bền vững (durability) của tác vụ

### 4.3. Worker Pool

- Các worker nodes xử lý tác vụ
- Có thể scale động dựa trên tải

### 4.4. Database

- Lưu trữ metadata của tác vụ
- Lưu trữ lịch sử thực thi
- Lưu trữ trạng thái tác vụ

### 4.5. Monitoring & Alerting

- Giám sát hiệu năng hệ thống
- Cảnh báo khi có lỗi hoặc tải cao

## 5. Các cân nhắc thiết kế

### 5.1. Tính nhất quán (Consistency)

- Đảm bảo tác vụ không bị mất hoặc trùng lặp
- Xử lý race condition khi nhiều worker cùng lấy cùng một tác vụ

### 5.2. Tính sẵn sàng (Availability)

- Replication cho các thành phần quan trọng
- Failover tự động khi có sự cố

### 5.3. Hiệu năng (Performance)

- Tối ưu hóa độ trễ từ khi tác vụ được tạo đến khi bắt đầu thực thi
- Tối ưu hóa thông lượng (số lượng tác vụ xử lý mỗi giây)

### 5.4. Công bằng (Fairness)

- Đảm bảo các tác vụ được xử lý công bằng
- Tránh tình trạng một số tác vụ bị "đói" tài nguyên

## 6. Best Practices

1. **Bắt đầu với MVP**: Tiếp cận vấn đề theo hướng MVP trước, giải quyết core design rồi hãy mở rộng
2. **Làm rõ các ràng buộc**: Làm rõ các ràng buộc về actors (lock, race condition, chosen protocol) trước khi tính đến scalability
3. **Sử dụng exponential backoff**: Áp dụng cơ chế retry thông minh với exponential backoff để tránh quá tải hệ thống
4. **Monitoring từ đầu**: Thiết lập monitoring và alerting ngay từ đầu để có thể phát hiện và xử lý vấn đề sớm
5. **Tách biệt loại tác vụ**: Phân chia tác vụ theo loại để tránh tác vụ lớn chặn tác vụ nhỏ