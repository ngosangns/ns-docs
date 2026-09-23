---
area: technology
domain: system-design
type: note
title: Ambassador Pattern
description: Mẫu thiết kế Ambassador (Đại sứ)
timestamp: "2026-06-19T13:43:26.115Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/ambassador
---

# Mẫu thiết kế Ambassador (Đại sứ)

Mẫu thiết kế Ambassador tạo ra các dịch vụ trợ giúp để gửi các yêu cầu mạng thay mặt cho một dịch vụ hoặc ứng dụng khách (consumer service/application). Có thể coi dịch vụ Ambassador như một proxy ngoài tiến trình (out-of-process proxy) nằm cùng vị trí với máy khách.

## 1. Ngữ cảnh và Vấn đề

Các ứng dụng đám mây hiện đại đòi hỏi các tính năng như: ngắt mạch (circuit breaking), định tuyến, giám sát, và khả năng cập nhật cấu hình mạng. Tuy nhiên:

- Khó hoặc không thể cập nhật các ứng dụng cũ (legacy) để thêm các tính năng này.
- Việc cấu hình kết nối, xác thực, ủy quyền phức tạp và lặp lại trên nhiều ngôn ngữ/framework khác nhau.
- Các tính năng bảo mật và mạng thường cần được quản lý bởi một đội ngũ chuyên trách riêng.

## 2. Giải pháp

Đưa các thư viện và khung kết nối khách vào một tiến trình bên ngoài đóng vai trò proxy giữa ứng dụng và các dịch vụ bên ngoài.

- Triển khai proxy trên cùng môi trường lưu trữ (host) với ứng dụng.
- Cho phép kiểm soát định tuyến, khả năng phục hồi (resiliency), bảo mật (TLS) mà không phụ thuộc vào ngôn ngữ lập trình của ứng dụng chính.
- Có thể triển khai dưới dạng **Sidecar** (đi kèm vòng đời ứng dụng trong container) hoặc **Daemon/Windows Service**.

## 3. Các vấn đề và Cân nhắc

- **Độ trễ:** Proxy sẽ thêm một khoảng thời gian trễ nhất định cho mỗi yêu cầu.
- **Tính tổng quát:** Cần cân nhắc xem các tính năng có nên được tổng quát hóa hay không (ví dụ: việc thử lại - retry - chỉ an toàn nếu thao tác là idempotent).
- **Cơ chế ngữ cảnh:** Làm thế nào để truyền ngữ cảnh (context) qua lại giữa máy khách và proxy (ví dụ: HTTP headers).
- **Triển khai:** Quyết định sử dụng một instance dùng chung cho tất cả hay mỗi khách hàng một instance riêng.

## 4. Khi nào nên sử dụng

- Khi cần xây dựng một bộ tính năng kết nối chung cho nhiều ngôn ngữ/framework.
- Khi muốn đẩy các vấn đề kết nối xuyên suốt (cross-cutting concerns) cho các chuyên gia hạ tầng xử lý.
- Khi cần hỗ trợ các yêu cầu kết nối đám mây cho ứng dụng cũ hoặc khó chỉnh sửa.

## 5. Khi nào KHÔNG nên sử dụng

- Khi độ trễ mạng là cực kỳ quan trọng.
- Khi các tính năng kết nối chỉ được sử dụng bởi một ngôn ngữ duy nhất (thư viện sẽ tốt hơn).
- Khi các tính năng kết nối yêu cầu tích hợp sâu vào logic của ứng dụng khách.

---

_Nguồn: [Azure Architecture Center - Ambassador pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/ambassador)_
