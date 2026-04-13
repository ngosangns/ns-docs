---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Pattern: Hostname Routing (Định tuyến theo Hostname)

Định tuyến theo hostname là cơ chế cô lập các dịch vụ API bằng cách cấp cho mỗi API một hostname riêng biệt. Ví dụ: `service-a.api.example.com` hoặc `service-a.example.com`.

### Trường hợp sử dụng điển hình:
- Giảm thiểu xung đột trong quá trình phát hành vì không có thành phần nào được chia sẻ giữa các đội ngũ phát triển dịch vụ.
- Các đội tự quản lý mọi thứ từ bản ghi DNS đến vận hành dịch vụ trong môi trường production.

### Ưu điểm:
- **Đơn giản và dễ mở rộng nhất**: Là phương pháp đơn giản nhất để định tuyến HTTP API.
- **Linh hoạt**: Có thể sử dụng với nhiều dịch vụ AWS như Amazon API Gateway, AWS AppSync, Application Load Balancers (ALB), Amazon EC2.
- **Toàn quyền sở hữu**: Các đội có toàn quyền quản lý subdomain của mình.
- **Dễ dàng cô lập và kiểm thử**: Thuận tiện cho việc triển khai theo vùng (Region) hoặc phiên bản cụ thể (ví dụ: `dev.region.service-a.api.example.com`).

### Nhược điểm:
- **Trải nghiệm người dùng**: Người dùng (consumer) phải nhớ nhiều hostname khác nhau để tương tác với các API. (Có thể giảm thiểu bằng cách cung cấp Client SDK, nhưng SDK lại phát sinh chi phí bảo trì, cập nhật, đa ngôn ngữ).
- **Quản lý tên miền**: Cần phải đăng ký subdomain hoặc domain mới mỗi khi tạo một dịch vụ mới.
