```ngosangns-obsidian/Technology/System-Design/Azure Design Patterns/Retry Pattern.md#L1-34
# Retry Pattern (Mô hình Thử lại)

## Tóm tắt
Mô hình Retry cho phép ứng dụng xử lý các lỗi tạm thời (transient failures) khi kết nối với dịch vụ hoặc tài nguyên mạng bằng cách thử lại thao tác đã thất bại một cách minh bạch. Điều này giúp cải thiện độ ổn định và khả năng phục hồi của hệ thống.

## Các điểm chính
- **Mục đích**: Đối phó với các lỗi tự khắc phục được như mất kết nối mạng thoáng qua, dịch vụ tạm thời không khả dụng hoặc hết thời gian chờ (timeout) khi dịch vụ đang bận.
- **Chiến lược xử lý**:
    - **Hủy (Cancel)**: Áp dụng khi lỗi được xác định là không phải tạm thời hoặc chắc chắn sẽ thất bại nếu thử lại.
    - **Thử lại ngay lập tức (Retry immediately)**: Dùng cho các lỗi hiếm gặp như nhiễu mạng hoặc hỏng gói tin.
    - **Thử lại sau một khoảng trễ (Retry after delay)**: Thường dùng kỹ thuật *exponential backoff* (tăng thời gian chờ theo hàm mũ) để tránh gây thêm áp lực cho dịch vụ đang quá tải.
- **Vấn đề cần lưu ý**:
    - **Hiệu suất**: Thử lại quá nhiều lần với khoảng thời gian quá ngắn có thể làm giảm hiệu suất tổng thể của ứng dụng và gây treo hệ thống.
    - **Tính lũy đẳng (Idempotency)**: Cực kỳ quan trọng để đảm bảo rằng việc thực hiện lại một thao tác nhiều lần không gây ra tác dụng phụ ngoài ý muốn (ví dụ: không thanh toán đơn hàng hai lần).
    - **Ghi nhật ký (Logging)**: Nên ghi lại các lần thất bại dưới dạng thông tin và chỉ báo lỗi thực sự nếu lần thử cuối cùng vẫn thất bại.
- **Khi nào nên tránh**:
    - Lỗi do logic nghiệp vụ sai hoặc lỗi nội bộ không thể tự phục hồi.
    - Khi dịch vụ bị lỗi kéo dài (trong trường hợp này nên dùng Circuit Breaker).
    - Để che đậy các vấn đề về khả năng mở rộng (scalability).

## Mối liên hệ
- **Circuit Breaker Pattern**: Kết hợp với Retry để xử lý các lỗi kéo dài, giúp hệ thống không lãng phí tài nguyên thử lại khi dịch vụ thực sự đã "sập".
- **Idempotency Pattern**: Đảm bảo an toàn khi thực hiện lại các lệnh thay đổi dữ liệu.

## Tài liệu tham khảo
- [Microsoft Learn - Retry Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry)
