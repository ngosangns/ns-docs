# Pattern: Event Sourcing (Nguồn sự kiện)

Thay vì chỉ lưu trữ trạng thái hiện tại của dữ liệu, Event Sourcing lưu trữ tất cả các sự kiện (events) dẫn đến thay đổi trạng thái đó trong một kho lưu trữ dữ liệu (event store) bất biến. Trạng thái hiện tại có thể được tái thiết lập bằng cách "phát lại" (replay) các sự kiện này theo trình tự thời gian.

### Ý tưởng cốt lõi:
- Mọi thay đổi trạng thái được coi là một đối tượng sự kiện riêng biệt, không thể sửa đổi và được sắp xếp theo thứ tự xảy ra.
- **Event Store** đóng vai trò là "Nguồn sự thật duy nhất" (Single Source of Truth - SSOT).

### Trường hợp áp dụng:
- Cần lịch sử bất biến để theo dõi, kiểm toán (audit) và tuân thủ.
- Cần tái tạo trạng thái hệ thống tại một thời điểm bất kỳ trong quá khứ (point-in-time recovery).
- Các hệ thống có khối lượng ghi lớn và không yêu cầu xử lý thời gian thực ngay lập tức cho các truy vấn phức tạp.
- Cần tạo ra nhiều dạng biểu diễn dữ liệu khác nhau (projections) từ cùng một nguồn dữ liệu.

### Thách thức và cân nhắc:
- **Độ phức tạp**: Đòi hỏi sự thay đổi tư duy từ CRUD truyền thống sang hướng sự kiện. Việc xử lý replay và đảm bảo tính idempotent (đối đẳng) có thể phức tạp.
- **Tính nhất quán cuối cùng (Eventual Consistency)**: Do độ trễ khi cập nhật từ event store sang các bản đọc, dữ liệu có thể không phản ánh trạng thái mới nhất ngay lập tức.
- **Truy vấn**: Việc truy vấn dữ liệu hiện tại từ log sự kiện rất chậm, thường phải kết hợp với pattern CQRS (Command Query Responsibility Segregation).
- **Kích thước và Chi phí**: Kho lưu trữ sự kiện tăng trưởng nhanh theo thời gian, cần chiến lược lưu trữ (archiving) và tạo bản chụp (snapshots) định kỳ.

### Triển khai trên AWS:
- **Event Store**: Amazon Kinesis Data Streams, Amazon EventBridge hoặc Amazon Managed Streaming for Apache Kafka (Amazon MSK).
- **Lưu trữ & Kiểm toán**: Amazon S3 (thường dùng để lưu trữ lâu dài các sự kiện từ Kinesis).
- **Xử lý sự kiện**: AWS Lambda nhận sự kiện, biến đổi và cập nhật vào database đọc.
- **Materialized Views**: Sử dụng Amazon Aurora hoặc DynamoDB để lưu trữ trạng thái hiện tại đã được xử lý (read model) nhằm phục vụ truy vấn nhanh.

### Ví dụ (Ứng dụng đặt xe):
1. Khách gọi xe -> Sự kiện `Ride booked` được gửi vào **Kinesis**.
2. Sự kiện được đẩy vào **S3** để lưu lịch sử.
3. Một Lambda function đọc sự kiện từ Kinesis, cập nhật thông tin chuyến đi vào **Aurora** (Materialized View) để người dùng xem trạng thái.
4. Khi chuyến đi kết thúc, hệ thống thực hiện replay toàn bộ sự kiện của chuyến đó để tính toán lộ trình và hóa đơn cuối cùng.
