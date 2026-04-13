---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Pattern: Transactional Outbox (Hàng chờ giao dịch)

Pattern Transactional Outbox giải quyết vấn đề "dual write" (ghi kép) trong các hệ thống phân tán—tình trạng một thao tác đơn lẻ bao gồm cả việc ghi vào cơ sở dữ liệu và gửi thông báo/sự kiện nhưng không đảm bảo được tính nguyên tử (atomicity).

### Vấn đề "Dual Write":
- Nếu ghi DB thành công nhưng gửi sự kiện thất bại: Các dịch vụ hạ nguồn không biết có sự thay đổi.
- Nếu ghi DB thất bại nhưng vẫn gửi sự kiện: Dữ liệu bị sai lệch, dịch vụ hạ nguồn xử lý dựa trên thông tin không có thực.

### Ý tưởng cốt lõi:
Thay vì gửi sự kiện trực tiếp đến message broker, ứng dụng sẽ lưu sự kiện đó vào một bảng tạm gọi là **Outbox Table** ngay trong cùng một giao dịch (transaction) với bảng dữ liệu chính. Sau đó, một tiến trình riêng biệt sẽ đọc bảng Outbox này và đẩy sự kiện đi.

### Hai phương pháp triển khai chính:

#### 1. Sử dụng Outbox Table (với Relational Database)
- **Cơ chế**: Lưu dữ liệu nghiệp vụ và dữ liệu sự kiện vào hai bảng khác nhau (`MainTable` và `OutboxTable`) trong cùng một DB transaction của RDS.
- **Xử lý**: Một dịch vụ quét (polling) bảng Outbox định kỳ, gửi tin nhắn đến SQS/SNS, và xóa/đánh dấu đã xử lý trong bảng Outbox sau khi gửi thành công.
- **Ưu điểm**: Đảm bảo tính nhất quán tuyệt đối giữa dữ liệu và sự kiện.

#### 2. Sử dụng Change Data Capture (CDC)
- **Cơ chế**: Tận dụng khả năng ghi nhận thay đổi dữ liệu của chính database.
- **Triển khai trên AWS**: Sử dụng **Amazon DynamoDB Streams**. Khi có thay đổi trong DynamoDB, một luồng dữ liệu (Stream) sẽ tự động ghi lại.
- **Xử lý**: Một hàm Lambda lắng nghe DynamoDB Streams và đẩy sự kiện tương ứng sang SQS/SNS.
- **Ưu điểm**: Giảm tải việc quản lý bảng Outbox thủ công và tận dụng tính năng có sẵn của database.

### Trường hợp áp dụng:
- Xây dựng ứng dụng hướng sự kiện (Event-driven applications).
- Cần đảm bảo tính nguyên tử giữa hai dịch vụ khác nhau.
- Triển khai pattern **Event Sourcing**.

### Các vấn đề cần lưu ý:
- **Trùng lặp tin nhắn**: Hệ thống gửi tin có thể gửi lặp lại, nên các dịch vụ tiêu thụ (Consumer) phải có tính **Idempotent** (đối đẳng).
- **Thứ tự thông báo**: Rất quan trọng trong Event Sourcing để đảm bảo phục hồi dữ liệu chính xác. Nên sử dụng SQS FIFO nếu cần đảm bảo thứ tự tuyệt đối.
- **Không gửi sự kiện khi Rollback**: Chỉ những giao dịch đã commit thành công mới được phép đẩy sự kiện vào Outbox hoặc Stream.

### Ví dụ (Đặt vé máy bay):
1. **Flight Service**: Lưu thông tin vé vào bảng `Flights` VÀ lưu sự kiện `FlightBooked` vào bảng `Outbox` (hoặc ghi vào DynamoDB có bật Stream).
2. **Event Processor**: Đọc từ Outbox/Stream và gửi tin nhắn đến **Payment Service** qua SQS.
3. **Payment Service**: Nhận tin nhắn và thực hiện trừ tiền. Nếu có lỗi ở bước 1, toàn bộ giao dịch bị hủy và không có tin nhắn nào được gửi đi, đảm bảo khách hàng không bị trừ tiền oan.
