---
area: technology
domain: system-design
type: note
---
# Mẫu thiết kế Backends for Frontends (BFF)

Mẫu thiết kế Backends for Frontends (BFF) mô tả cách tách rời các dịch vụ backend khỏi các triển khai frontend để tùy chỉnh trải nghiệm cho các giao diện khách hàng (client interfaces) khác nhau. Mẫu này hữu ích khi bạn muốn tránh việc tùy biến một backend dùng chung cho quá nhiều loại giao diện.

## 1. Ngữ cảnh và Vấn đề
Một ứng dụng ban đầu có thể chỉ có giao diện Web desktop và một dịch vụ backend đi kèm. Khi nhu cầu thay đổi:
- Thêm giao diện di động (Mobile App) với kích thước màn hình, hiệu suất và giới hạn hiển thị khác biệt.
- Một backend duy nhất phục vụ nhiều loại frontend sẽ gặp phải các yêu cầu mâu thuẫn nhau, dẫn đến tắc nghẽn trong phát triển và cập nhật.
- Việc duy trì khả năng tương thích ngược cho tất cả các loại client trên một tài nguyên triển khai duy nhất trở nên quá tải.

## 2. Giải pháp
Giới thiệu một lớp mới chỉ xử lý các yêu cầu cụ thể cho từng giao diện. Lớp này được gọi là dịch vụ **Backend-for-Frontend (BFF)**.
- Mỗi giao diện (Web, Mobile, IoT,...) sẽ có một dịch vụ BFF riêng biệt.
- BFF đóng vai trò trung gian giữa frontend cụ thể và các dịch vụ backend/microservices chung.
- Giúp tối ưu hóa hiệu suất cho môi trường frontend tương ứng (ví dụ: Mobile BFF có thể gộp nhiều request để tiết kiệm băng thông).

## 3. Các vấn đề và Cân nhắc
- **Chi phí vận hành:** Tăng số lượng dịch vụ đồng nghĩa với việc tăng chi phí quản lý, triển khai và bảo mật.
- **Độ trễ:** Thêm một bước nhảy mạng (network hop) có thể làm tăng độ trễ.
- **Trùng lặp mã nguồn:** Có khả năng trùng lặp logic giữa các BFF. Cần cân nhắc giữa việc trùng lặp mã và việc tùy chỉnh trải nghiệm tốt nhất cho client.
- **Phạm vi logic:** BFF chỉ nên chứa logic cụ thể cho giao diện người dùng. Các tính năng dùng chung (xác thực, giám sát) nên được trừu tượng hóa ở lớp khác.

## 4. Khi nào nên sử dụng
- Khi một dịch vụ backend dùng chung đòi hỏi quá nhiều chi phí phát triển để bảo trì cho nhiều loại client.
- Khi bạn muốn tối ưu hóa backend cho các yêu cầu đặc thù của từng loại giao diện.
- Khi một ngôn ngữ lập trình nhất định phù hợp hơn cho backend của một giao diện cụ thể nhưng không phù hợp cho tất cả.

## 5. Khi nào KHÔNG nên sử dụng
- Khi các giao diện thực hiện các yêu cầu tương tự hoặc giống hệt nhau đến backend.
- Khi ứng dụng chỉ có duy nhất một giao diện người dùng.

## 6. Ví dụ triển khai trên Azure
- **API Management:** Làm lớp cổng (gateway) xử lý các vấn đề xuyên suốt như Authorization (Microsoft Entra ID), Monitoring (Azure Monitor), và Caching.
- **Azure Functions:** Thường được dùng để triển khai các BFF vì tính chất serverless, giúp giảm chi phí vận hành và dễ dàng mở rộng.
- **Microservices:** Các dịch vụ backend thực sự xử lý logic nghiệp vụ cốt lõi nằm sau các BFF.

---
*Nguồn: [Azure Architecture Center - Backends for Frontends pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends)*
