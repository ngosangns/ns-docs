---
area: technology
domain: system-design
type: note
---
# Mẫu thiết kế Claim-Check (Phiếu nhận hành lý)

Mẫu thiết kế Claim-Check cho phép các hệ thống truyền tải các gói dữ liệu lớn mà không làm quá tải hệ thống tin nhắn (messaging system). Thay vì gửi toàn bộ nội dung trong tin nhắn, nội dung đó được lưu trữ trong một kho dữ liệu bên ngoài và chỉ gửi một "phiếu nhận" (claim check) - là một token hoặc khóa duy nhất - qua hệ thống tin nhắn.

## 1. Ngữ cảnh và Vấn đề
Các hệ thống tin nhắn truyền thống thường được tối ưu hóa cho số lượng lớn tin nhắn nhỏ và có giới hạn về kích thước tin nhắn (ví dụ: Azure Service Bus có giới hạn 1MB hoặc 100MB tùy gói).
- Gửi tin nhắn lớn có thể làm vượt quá giới hạn này.
- Gây chậm trễ toàn bộ hệ thống do tốn tài nguyên cho việc tuần tự hóa (serialization), mã hóa và truyền tải.

## 2. Giải pháp
1.  **Lưu trữ:** Ứng dụng gửi (sender) lưu nội dung dữ liệu (payload) vào một kho dữ liệu bên ngoài (như Azure Blob Storage).
2.  **Tạo Token:** Sender tạo một token "phiếu nhận" trỏ đến vị trí dữ liệu đó.
3.  **Gửi Tin Nhắn:** Sender gửi một tin nhắn nhỏ chứa token này qua hệ thống tin nhắn.
4.  **Nhận & Truy xuất:** Ứng dụng nhận (receiver) lấy tin nhắn, đọc token và dùng nó để tải nội dung gốc từ kho dữ liệu.
5.  **Xử lý:** Receiver xử lý dữ liệu và thực hiện dọn dẹp nếu cần.

## 3. Các vấn đề và Cân nhắc
-   **Xóa dữ liệu:** Cần có chiến lược xóa dữ liệu sau khi đã tiêu thụ (consumed) để tránh tốn chi phí lưu trữ. Có thể xóa đồng bộ bởi ứng dụng nhận hoặc xóa bất đồng bộ bằng một tiến trình quét định kỳ.
-   **Triển khai có điều kiện:** Chỉ nên dùng mẫu này khi tin nhắn vượt quá một kích thước nhất định. Với tin nhắn nhỏ, hãy gửi trực tiếp để giảm độ trễ (latency).
-   **Bảo mật:** Kho lưu trữ dữ liệu cần được bảo vệ chặt chẽ để chỉ những ứng dụng có quyền mới có thể lấy dữ liệu thông qua token.

## 4. Khi nào nên sử dụng
-   **Vượt giới hạn kích thước:** Khi dữ liệu lớn hơn mức hệ thống tin nhắn cho phép.
-   **Bảo vệ hiệu suất:** Khi việc gửi tin nhắn lớn làm giảm thông lượng (throughput) của hệ thống.
-   **Bảo vệ dữ liệu nhạy cảm:** Khi bạn không muốn nội dung nhạy cảm hiển thị hoặc đi qua hệ thống tin nhắn (chỉ lưu trong kho lưu trữ bảo mật).
-   **Định tuyến phức tạp:** Tránh việc dữ liệu lớn phải đi qua nhiều thành phần trung gian (intermediaries).

## 5. Lợi ích (Well-Architected Framework)
-   **Độ tin cậy (Reliability):** Tách biệt dữ liệu giúp khôi phục dễ dàng hơn từ kho lưu trữ chuyên dụng thay vì phụ thuộc vào hàng đợi tin nhắn.
-   **Bảo mật (Security):** Cho phép kiểm soát quyền truy cập chi tiết hơn tại kho dữ liệu.
-   **Tối ưu chi phí (Cost):** Giảm dung lượng tin nhắn có thể giúp sử dụng các gói dịch vụ tin nhắn rẻ hơn.
-   **Hiệu suất (Performance):** Giảm tải cho message broker, giúp truyền tải tin nhắn nhanh hơn.

## 6. Ví dụ trên Azure
-   **Dữ liệu (Payload):** Lưu vào **Azure Blob Storage**.
-   **Tin nhắn (Token):** Gửi qua **Azure Service Bus**, **Queue Storage** hoặc **Event Hubs**.
-   **Tự động hóa:** Có thể sử dụng **Azure Event Grid** để tự động tạo sự kiện khi một file được upload lên Blob Storage, sự kiện này đóng vai trò là "phiếu nhận".

---
*Nguồn: [Azure Architecture Center - Claim-Check pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/claim-check)*
