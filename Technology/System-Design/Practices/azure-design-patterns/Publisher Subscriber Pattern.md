---
area: technology
domain: system-design
type: note
---
```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Publisher-Subscriber Pattern.md#L1-55
# Publisher-Subscriber Pattern (Mô hình Xuất bản - Đăng ký)

Cho phép một ứng dụng thông báo các sự kiện đến nhiều người tiêu dùng (consumers) quan tâm một cách bất đồng bộ, mà không cần gắn kết chặt chẽ người gửi với người nhận.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Trong hệ thống phân tán, các thành phần thường cần chia sẻ thông tin khi có sự kiện xảy ra. Việc gửi thông điệp trực tiếp đến từng người nhận (point-to-point) không có khả năng mở rộng tốt và khiến người gửi bị phụ thuộc vào danh tính cũng như trạng thái của người nhận.
- **Giải pháp:** Giới thiệu một hệ thống con nhắn tin bất đồng bộ:
    - **Publisher (Người xuất bản):** Đóng gói sự kiện thành thông điệp và gửi qua một kênh đầu vào.
    - **Subscriber (Người đăng ký):** Đăng ký quan tâm đến các loại thông điệp cụ thể qua các kênh đầu ra.
    - **Message Broker/Event Bus:** Thành phần trung gian sao chép thông điệp từ kênh đầu vào và phân phối đến tất cả các subscriber phù hợp.
- **Lợi ích:**
    - **Ghép nối lỏng lẻo (Loose Coupling):** Người gửi và người nhận hoạt động độc lập, không cần biết về nhau.
    - **Khả năng mở rộng cao:** Dễ dàng thêm hoặc bớt các subscriber mà không ảnh hưởng đến publisher.
    - **Tăng độ tin cậy:** Hệ thống vẫn hoạt động tốt ngay cả khi một số subscriber đang ngoại tuyến (offline).
    - **Cải thiện tính phản hồi:** Publisher gửi thông điệp xong là có thể quay lại xử lý việc khác, không cần chờ người nhận xử lý xong.
- **Các cơ chế lọc thông điệp:**
    - **Dựa trên Topic:** Subscriber đăng ký theo các chủ đề cụ thể.
    - **Dựa trên Nội dung (Content filtering):** Thông điệp được kiểm tra nội dung để quyết định gửi đến subscriber nào.
- **Lưu ý khi triển khai:**
    - **Tính lũy đẳng (Idempotency):** Do thông điệp có thể được gửi nhiều lần (trong trường hợp lỗi/thử lại), subscriber cần được thiết kế để xử lý cùng một thông điệp nhiều lần mà không gây sai lệch dữ liệu.
    - **Thứ tự thông điệp:** Không có gì đảm bảo subscriber sẽ nhận được thông điệp đúng theo thứ tự được gửi.
    - **Thông điệp độc hại (Poison messages):** Cần có cơ chế hàng đợi "dead-letter" để chứa các thông điệp gây lỗi liên tục, tránh làm treo hệ thống.

## Khi nào nên sử dụng

- Cần phát sóng thông tin đến một lượng lớn người tiêu dùng.
- Tích hợp các ứng dụng phát triển trên nhiều nền tảng hoặc giao thức khác nhau.
- Các hệ thống chấp nhận mô hình nhất quán cuối cùng (eventual consistency).
- Khi người gửi không yêu cầu phản hồi theo thời gian thực từ người nhận.

## Khi nào không nên sử dụng

- Ứng dụng chỉ có rất ít người tiêu dùng và mỗi người cần thông tin hoàn toàn khác nhau.
- Yêu cầu tương tác gần như thời gian thực (real-time).

## Ví dụ thực tế trên Azure
- **Azure Service Bus Topics:** Phù hợp cho nhắn tin doanh nghiệp với các quy tắc lọc phức tạp.
- **Azure Event Grid:** Phù hợp cho kiến trúc hướng sự kiện (event-driven) với quy mô lớn và phản ứng nhanh với các thay đổi của tài nguyên Azure.
- **Azure Event Hubs:** Dùng cho việc thu nhận dữ liệu và sự kiện với khối lượng cực lớn (streaming data).

---
*Nguồn tham khảo: [Microsoft Learn - Publisher-Subscriber Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/publisher-subscriber)*
