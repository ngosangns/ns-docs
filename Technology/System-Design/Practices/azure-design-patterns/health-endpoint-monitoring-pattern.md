---
area: technology
domain: system-design
type: note
---
```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Health Endpoint Monitoring Pattern.md#L1-53
# Health Endpoint Monitoring Pattern (Mô hình Giám sát Điểm cuối Sức khỏe)

Mô hình này sử dụng các kiểm tra chức năng bên trong ứng dụng, cho phép các công cụ bên ngoài truy cập thông qua các điểm cuối (endpoints) để xác minh ứng dụng và dịch vụ đang hoạt động bình thường.

## Tóm tắt nội dung (Bullet List)

- **Cơ chế hoạt động:** Ứng dụng cung cấp một endpoint (ví dụ: `/health`) thực hiện các kiểm tra nội bộ và trả về mã trạng thái (HTTP status code) cùng thông tin chi tiết về sức khỏe của hệ thống.
- **Các thành phần được kiểm tra:**
    - Kết nối và thời gian phản hồi của cơ sở dữ liệu hoặc bộ lưu trữ đám mây.
    - Trạng thái của các dịch vụ hoặc tài nguyên bên ngoài mà ứng dụng phụ thuộc.
    - Kiểm tra chứng chỉ TLS (hết hạn).
    - Kiểm tra độ trễ DNS và các bản ghi DNS.
- **Các tiêu chí đánh giá của công cụ giám sát:**
    - **Mã phản hồi (Response code):** Thường là HTTP 200 (OK) nếu khỏe mạnh.
    - **Nội dung phản hồi (Content):** Kiểm tra nội dung cụ thể để đảm bảo không có lỗi ẩn (ngay cả khi mã trả về là 200).
    - **Thời gian phản hồi (Response time):** Đo lường độ trễ mạng và thời gian xử lý để phát hiện xu hướng suy giảm hiệu năng.
- **Lưu ý về bảo mật:**
    - Cần bảo vệ các endpoint này khỏi sự truy cập công cộng để tránh tấn công DoS hoặc lộ thông tin nhạy cảm.
    - Sử dụng các phương pháp như: Xác thực (Authentication), sử dụng cổng/đường dẫn không tiêu chuẩn (obscure), hoặc giới hạn theo địa chỉ IP (IP restriction).
- **Chiến lược triển khai:**
    - **Granularity (Độ chi tiết):** Có thể có nhiều endpoint cho các mức độ ưu tiên khác nhau (core services vs. background tasks).
    - **Caching:** Cân nhắc lưu kết quả kiểm tra vào bộ nhớ đệm (cache) nếu việc kiểm tra tốn nhiều tài nguyên, tránh làm quá tải hệ thống bởi chính công cụ giám sát.
    - **Monitoring Locations:** Thực hiện kiểm tra từ nhiều vị trí địa lý khác nhau để có cái nhìn chính xác về trải nghiệm người dùng thực tế.

## Khi nào nên sử dụng

- Để giám sát tính sẵn sàng và hoạt động chính xác của các website và ứng dụng web.
- Để giám sát các dịch vụ trung gian (middle-tier) hoặc dịch vụ dùng chung nhằm cô lập lỗi.
- Bổ sung cho các cơ chế đo lường hiện có (performance counters, error logs) để phát hiện khi ứng dụng hoàn toàn không phản hồi.

## Khi nào không nên sử dụng

- Không thể thay thế hoàn toàn cho việc ghi log (logging) và kiểm toán (auditing) chi tiết.
- Không cần thiết cho các hệ thống cực kỳ đơn giản mà tính sẵn sàng không phải là ưu tiên hàng đầu.

## Tích hợp trong Azure
- **Azure Monitor / Application Insights:** Tự động thu thập tỷ lệ yêu cầu, thời gian phản hồi và tỷ lệ thất bại.
- **Azure Traffic Manager / Front Door:** Sử dụng "health probes" để điều hướng người dùng tránh xa các endpoint không khỏe mạnh.

---
*Nguồn tham khảo: [Microsoft Learn - Health Endpoint Monitoring Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring)*
