```ngosangns-obsidian/Technology/System-Design/Azure Design Patterns/Sequential Convoy Pattern.md#L1-28
# Sequential Convoy Pattern (Mô hình Đoàn tàu Tuần tự)

## Tóm tắt
Mô hình Sequential Convoy giúp xử lý một tập hợp các tin nhắn có liên quan theo một thứ tự xác định, mà không làm tắc nghẽn việc xử lý các nhóm tin nhắn khác. Điều này giải quyết thách thức trong các hệ thống phân tán khi cần đảm bảo thứ tự (FIFO) nhưng vẫn muốn mở rộng quy mô (scale out) để xử lý tải lớn.

## Các điểm chính
- **Mục đích**: Đảm bảo các tin nhắn thuộc cùng một nhóm (category) được xử lý đúng thứ tự đến, trong khi các nhóm khác nhau có thể được xử lý song song.
- **Cơ chế hoạt động**:
    - Phân loại các tin nhắn đến vào các "category" (ví dụ: theo Order ID).
    - Sử dụng cơ chế khóa (locking) trong hệ thống hàng đợi sao cho mỗi listener chỉ lấy và xử lý từng tin nhắn một trong cùng một category.
    - Trong Azure Service Bus, điều này được thực hiện thông qua **Message Sessions**.
- **Lợi ích**:
    - Duy trì tính thứ tự nghiêm ngặt cho các dữ liệu phụ thuộc nhau (ví dụ: tạo đơn hàng -> thanh toán -> giao hàng).
    - Cho phép mở rộng quy mô bằng cách xử lý nhiều "đoàn tàu" (convoy) khác nhau trên các worker khác nhau.
- **Vấn đề cần lưu ý**:
    - **Thông lượng (Throughput)**: Yêu cầu FIFO nghiêm ngặt sẽ giới hạn khả năng mở rộng. Không phù hợp cho các kịch bản cực kỳ cao tải (hàng triệu tin nhắn/giây).
    - **Độ trễ mạng**: Tin nhắn có thể đến sai thứ tự do mạng. Cần cân nhắc sử dụng số thứ tự (sequence numbers) để kiểm tra.
    - **Điểm nghẽn**: Bộ xử lý hàng đợi ban đầu (ledger processor) có thể trở thành điểm nghẽn nếu không được thiết kế tốt.

## Khi nào sử dụng
- Khi các tin nhắn bắt buộc phải được xử lý theo thứ tự chúng được gửi đi.
- Khi các tin nhắn có thể được phân loại (categorized) để làm đơn vị mở rộng cho hệ thống.

## Mối liên hệ
- **Competing Consumers Pattern**: Sequential Convoy cải tiến mô hình này bằng cách thêm ràng buộc về thứ tự cho các nhóm tin nhắn liên quan.
- **Azure Service Bus Sessions**: Công cụ chính trên Azure để triển khai mô hình này.

## Tài liệu tham khảo
- [Microsoft Learn - Sequential Convoy Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sequential-convoy)
