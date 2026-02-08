# Pattern: Publish-Subscribe (Xuất bản - Đăng ký)

Pattern Publish-Subscribe (hay Pub-Sub) là một cơ chế nhắn tin giúp tách biệt hoàn toàn giữa bên gửi tin nhắn (**Publisher**) và bên nhận tin nhắn (**Subscriber**). Việc giao tiếp được thực hiện thông qua một thành phần trung gian gọi là **Message Broker** hoặc **Router**.

### Ý tưởng cốt lõi:
- **Publisher**: Gửi tin nhắn mà không cần biết ai sẽ nhận nó.
- **Subscriber**: Đăng ký quan tâm đến các loại tin nhắn cụ thể và nhận chúng khi có tin mới.
- **Tính bất đồng bộ**: Giúp hệ thống phản hồi nhanh hơn bằng cách đẩy trách nhiệm phân phối tin nhắn cho hạ tầng nhắn tin.

### Trường hợp áp dụng:
- Cần xử lý song song: Một sự kiện đầu vào kích hoạt nhiều quy trình công việc khác nhau.
- Phát tán tin nhắn (Broadcasting) đến nhiều bên nhận mà không yêu cầu phản hồi ngay lập tức.
- Hệ thống có thể chấp nhận tính nhất quán cuối cùng (eventual consistency).
- Giao tiếp giữa các dịch vụ sử dụng ngôn ngữ, giao thức hoặc nền tảng khác nhau.

### Các vấn đề cần lưu ý:
- **Tính khả dụng của Subscriber**: Publisher không biết Subscriber có đang hoạt động hay không. Tin nhắn có thể bị mất nếu không có cơ chế lưu trữ.
- **Thứ tự tin nhắn**: Không đảm bảo thứ tự trừ khi sử dụng các hàng đợi đặc biệt (như FIFO).
- **Trùng lặp tin nhắn**: Subscriber cần được thiết kế có tính **idempotent** (đối đẳng) để xử lý trường hợp nhận cùng một tin nhắn nhiều lần.
- **Dead-letter queues (DLQ)**: Cần có hàng đợi tin nhắn lỗi để xử lý các tin không thể gửi đến Subscriber.

### Triển khai trên AWS:
#### 1. Amazon SNS (Simple Notification Service)
- Dịch vụ Pub-Sub được quản lý hoàn toàn.
- Hỗ trợ **Standard topics** (tốc độ cực cao, thứ tự tốt nhất có thể) và **FIFO topics** (đảm bảo thứ tự và không trùng lặp).
- Phù hợp cho kiến trúc Fan-out (một tin nhắn đẩy ra nhiều hướng).

#### 2. Amazon EventBridge
- Phù hợp khi cần logic định tuyến phức tạp hơn dựa trên nội dung tin nhắn (content-based routing).
- Hỗ trợ lọc tin nhắn, chuyển đổi dữ liệu và kết nối với nhiều dịch vụ AWS hoặc ứng dụng SaaS bên thứ ba.
- Sử dụng các quy tắc (Rules) để xác định Subscriber nào sẽ nhận sự kiện nào.

### Ví dụ:
Khi một khách hàng thanh toán thành công (Payment Service):
1. **Payment Service** gửi một sự kiện `PaymentCompleted` lên SNS Topic.
2. **Inventory Service** nhận tin nhắn để cập nhật kho hàng.
3. **Email Service** nhận tin nhắn để gửi hóa đơn cho khách.
4. **Analytics Service** nhận tin nhắn để thống kê doanh thu.
Các dịch vụ này hoạt động độc lập và không ảnh hưởng đến hiệu suất của Payment Service.
