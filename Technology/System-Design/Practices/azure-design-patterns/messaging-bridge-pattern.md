---
area: technology
domain: system-design
type: note
---
```ngosangns-obsidian/technology/system-design/azure-design-patterns/Messaging Bridge Pattern.md#L1-45
# Messaging Bridge Pattern (Mô hình Cầu nối Thông điệp)

Mô hình này được sử dụng để tích hợp các hệ thống rời rạc được xây dựng trên các cơ sở hạ tầng nhắn tin (messaging infrastructure) khác nhau.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Các tổ chức thường sở hữu nhiều hệ thống sử dụng các nền tảng nhắn tin khác nhau như MSMQ, RabbitMQ, Azure Service Bus hoặc Amazon SQS (do mua lại, sáp nhập hoặc mở rộng hệ thống on-premises lên cloud). Việc buộc các hệ thống này giao tiếp qua HTTP thường đòi hỏi thay đổi mã nguồn lớn và phức tạp trong việc quản lý kết nối.
- **Giải pháp:** Giới thiệu một thành phần "Cầu nối" (Bridge) kết nối đồng thời với hai hoặc nhiều cơ sở hạ tầng nhắn tin khác nhau.
    - Cầu nối lấy thông điệp từ hệ thống nguồn và đẩy chúng vào hệ thống đích mà không làm thay đổi nội dung (payload).
    - Các hệ thống gửi và nhận không cần biết về sự tồn tại của nhau hay của cầu nối.
- **Lợi ích:**
    - **Ít thay đổi:** Không cần chỉnh sửa mã nguồn của các hệ thống hiện có.
    - **Độ tin cậy cao:** Tận dụng cơ chế phân phối thông điệp "ít nhất một lần" (at-least-once) của các hệ thống nhắn tin, tốt hơn so với gọi HTTP trực tiếp.
    - **Di chuyển linh hoạt:** Cho phép di chuyển từng phần của hệ thống sang nền tảng mới theo lộ trình thay vì phải chuyển đổi tất cả cùng lúc.
- **Các thách thức và cân nhắc:**
    - **Giới hạn công nghệ:** Cầu nối phải tuân thủ giới hạn của cả hai bên (ví dụ: kích thước thông điệp tối đa khác nhau giữa MSMQ và Azure Storage Queues).
    - **Tính trùng lặp:** Nếu một bên sử dụng giao dịch phân tán (distributed transactions) còn bên kia thì không, cầu nối cần có cơ chế loại bỏ trùng lặp (deduplication).
    - **Xử lý lỗi:** Cần chính sách thử lại (retry) và Circuit Breaker phù hợp để tránh xác định nhầm thông điệp là "thông điệp độc hại" (poison message) khi lỗi hạ tầng xảy ra.

## Khi nào nên sử dụng

- Cần tích hợp các hệ thống hiện có với nỗ lực chỉnh sửa mã nguồn tối thiểu.
- Tích hợp các ứng dụng cũ (legacy) không thể nâng cấp lên các công nghệ nhắn tin hiện đại.
- Kết nối các hệ thống phân tán theo địa lý nơi kết nối internet không ổn định.
- Di chuyển dần dần hệ thống từ một cơ sở hạ tầng nhắn tin này sang cơ sở hạ tầng khác.

## Khi nào không nên sử dụng

- Một trong các hệ thống phụ thuộc vào một tính năng đặc thù mà nền tảng bên kia không có.
- Tương tác yêu cầu phản hồi ngay lập tức (truyền thông đồng bộ - synchronous).
- Khối lượng dữ liệu quá lớn khiến việc sử dụng hệ thống nhắn tin trở nên quá tốn kém hoặc vượt quá công suất.

## Ví dụ thực tế
Một ứng dụng quản lý nhân sự cũ chạy on-premises sử dụng **MSMQ**. Khi xây dựng một dịch vụ mới trên Azure sử dụng **Service Bus**, thay vì viết lại ứng dụng cũ, ta tạo một Messaging Bridge:
1. Đọc thông điệp từ hàng đợi MSMQ.
2. Đẩy trực tiếp thông điệp đó vào Service Bus Topic/Queue.
3. Dịch vụ trên Azure tiếp nhận và xử lý như một thông điệp nội bộ.

---
*Nguồn tham khảo: [Microsoft Learn - Messaging Bridge Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/messaging-bridge)*
