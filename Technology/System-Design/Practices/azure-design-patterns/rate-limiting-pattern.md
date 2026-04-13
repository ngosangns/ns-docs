---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

```ngosangns-obsidian/technology/system-design/azure-design-patterns/Rate Limiting Pattern.md#L1-43
# Rate Limiting Pattern (Mô hình Giới hạn Tốc độ)

## Tóm tắt
Mô hình Rate Limiting giúp kiểm soát tài nguyên tiêu thụ bằng cách áp đặt giới hạn tốc độ truy cập vào một dịch vụ. Điều này giúp tránh lỗi Throttling (nghẽn cổ chai), dự đoán chính xác thông lượng (throughput) và tối ưu hóa việc sử dụng các dịch vụ có giới hạn năng lực.

## Các điểm chính
- **Mục đích**:
    - Giảm thiểu lỗi throttling từ các dịch vụ bị giới hạn.
    - Giảm lưu lượng truy cập thừa so với cách tiếp cận "thử lại khi có lỗi" (naive retry).
    - Giảm mức tiêu thụ bộ nhớ bằng cách chỉ lấy dữ liệu khi có khả năng xử lý.
- **Bối cảnh sử dụng**: Phù hợp nhất cho các tác vụ tự động lặp lại quy mô lớn như xử lý hàng loạt (batch processing).
- **Cơ chế hoạt động**:
    - Kiểm soát số lượng hoặc kích thước hoạt động gửi đến dịch vụ trong một khoảng thời gian cụ thể.
    - Sử dụng hệ thống tin nhắn bền vững (Durable Messaging) như Azure Service Bus, Queue Storage, hoặc Event Hubs để làm đệm.
    - Có thể chia nhỏ (partition) năng lực của dịch vụ và sử dụng hệ thống loại trừ tương hỗ phân tán (distributed mutual exclusion - ví dụ: dùng Blob Lease trong Azure Storage) để quản lý khóa độc quyền trên các phân vùng đó.
- **Chiến lược triển khai**:
    - **Phân phối đều**: Thay vì gửi 100 yêu cầu mỗi giây, có thể gửi 20 yêu cầu mỗi 200 mili giây để giữ luồng tài nguyên ổn định.
    - **Quản lý khóa (Lease management)**: Các tiến trình không phối hợp có thể cạnh tranh để lấy "lease" trên các phân vùng logic. Mỗi lease cấp một lượng năng lực xử lý nhất định.
- **Vấn đề cần lưu ý**:
    - Vẫn cần xử lý lỗi throttling nếu chúng xảy ra.
    - Cần tích hợp tất cả các luồng công việc (workstreams) truy cập vào cùng một dịch vụ vào chiến lược rate limiting chung.
    - Cần theo dõi sự tranh chấp giữa các ứng dụng khác nhau cùng truy cập vào một dịch vụ bị giới hạn.

## Mối liên hệ
- **Throttling**: Rate limiting thường được triển khai để phản ứng lại một dịch vụ đang áp dụng throttling.
- **Retry**: Khi gặp lỗi throttling, nên thử lại sau một khoảng thời gian thích hợp.
- **Queue-Based Load Leveling**: Tương tự nhưng Rate Limiting tập trung cụ thể vào việc truy cập hiệu quả các dịch vụ bị giới hạn năng lực và có khái niệm quản lý năng lực phân tán.

## Tài liệu tham khảo
- [Microsoft Learn - Rate Limiting Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern)
