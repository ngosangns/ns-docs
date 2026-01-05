# Mẫu thiết kế Asynchronous Request-Reply (Yêu cầu-Phản hồi bất đồng bộ)

Mẫu thiết kế này tách rời việc xử lý backend khỏi host frontend. Nó được sử dụng khi backend cần xử lý các tác vụ tốn thời gian (bất đồng bộ), nhưng frontend vẫn cần một phản hồi rõ ràng và kịp thời về tình trạng của yêu cầu.

## 1. Ngữ cảnh và Vấn đề
Trong phát triển ứng dụng hiện đại, các API thường được thiết kế để phản hồi nhanh (dưới 100ms). Tuy nhiên, một số tác vụ backend có thể chạy lâu (vài giây, vài phút hoặc vài giờ).
- Việc bắt client đợi kết nối đồng bộ trong thời gian dài là không khả thi (gây timeout, chiếm dụng tài nguyên).
- Cần một cơ chế để client biết yêu cầu đã được nhận và có thể kiểm tra kết quả sau đó.

## 2. Giải pháp (Sử dụng HTTP Polling)
Thay vì giữ kết nối mở, API sẽ phản hồi ngay lập tức để xác nhận và cung cấp cách thức kiểm tra trạng thái:

1.  **Gửi yêu cầu:** Client gửi một yêu cầu đồng bộ đến API.
2.  **Phản hồi ngay:** API xác thực yêu cầu và phản hồi mã **HTTP 202 (Accepted)**.
3.  **Điểm cuối trạng thái:** Phản hồi chứa tiêu đề `Location` trỏ đến một URL mà client có thể "poll" (truy vấn định kỳ) để kiểm tra kết quả.
4.  **Xử lý Backend:** API đẩy tác vụ vào một hàng đợi hoặc bộ xử lý backend để chạy ngầm.
5.  **Kiểm tra trạng thái (Polling):**
    - Khi đang xử lý: Trả về **HTTP 200 (OK)** kèm thông tin "đang xử lý".
    - Khi hoàn tất: Trả về **HTTP 302 (Found)** hoặc **303 (See Other)** để chuyển hướng đến kết quả cuối cùng, hoặc trả về mã thành công (**200, 201, 204**).

## 3. Các thành phần chính trong phản hồi HTTP 202
| Tiêu đề (Header) | Mô tả |
| :--- | :--- |
| **Location** | URL để client truy vấn trạng thái (Status Endpoint). |
| **Retry-After** | Ước tính thời gian client nên đợi trước khi thử truy vấn lại (để tránh làm quá tải server). |

## 4. Các vấn đề và Cân nhắc
-   **Độ phức tạp cho Client:** Client cần có logic để thực hiện việc polling và xử lý các mã trạng thái khác nhau.
-   **Hủy yêu cầu:** Cần cân nhắc cơ chế để client có thể hủy một tác vụ đang chạy lâu.
-   **An toàn dữ liệu:** URL trong `Location` có thể cần được bảo mật (ví dụ: sử dụng SAS Token/Valet Key).
-   **Dòng chảy dữ liệu (Streaming):** Mẫu này không phù hợp nếu dữ liệu cần được truyền trực tiếp (streaming) theo thời gian thực.

## 5. Khi nào nên sử dụng
-   Mã phía client (như trình duyệt) khó cung cấp điểm cuối callback (webhook) hoặc không muốn dùng WebSockets vì phức tạp.
-   Chỉ có giao thức HTTP khả dụng và không thể fire callback do hạn chế về firewall.
-   Tích hợp với các hệ thống cũ không hỗ trợ công nghệ hiện đại như WebSockets.

## 6. Ví dụ triển khai (Azure Functions)
Một giải pháp điển hình bao gồm 3 hàm:
1.  **AsyncProcessingWorkAcceptor:** Nhận yêu cầu, đẩy vào Service Bus và trả về mã 202 kèm URL trạng thái.
2.  **AsyncProcessingBackgroundWorker:** Lấy tin nhắn từ hàng đợi và thực hiện xử lý thực tế, ghi kết quả vào Blob Storage.
3.  **AsyncOperationStatusChecker:** Kiểm tra xem kết quả trong Blob Storage đã tồn tại chưa để phản hồi cho client.

## 7. Liên kết với Well-Architected Framework
-   **Hiệu suất (Performance Efficiency):** Việc tách rời giúp tối đa hóa khả năng đồng thời trên server và cho phép lập lịch công việc dựa trên năng lực xử lý có sẵn, giúp hệ thống có khả năng mở rộng (scalability) tốt hơn.

---
*Nguồn: [Azure Architecture Center - Asynchronous Request-Reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)*
