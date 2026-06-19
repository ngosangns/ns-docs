---
area: technology
domain: system-design
type: note
title: Anti Corruption Layer Pattern
description: Mẫu thiết kế Anti-corruption Layer (Lớp chống tham nhũng/Lớp ngăn chặn sự sai lệch)
timestamp: '2026-06-19T13:43:26.116Z'
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer
---
# Mẫu thiết kế Anti-corruption Layer (Lớp chống tham nhũng/Lớp ngăn chặn sự sai lệch)

Mẫu thiết kế Anti-corruption Layer (ACL) triển khai một lớp façade hoặc adapter giữa các hệ thống con khác nhau không chia sẻ cùng một ngữ nghĩa (semantics). Lớp này dịch các yêu cầu mà một hệ thống con gửi đến hệ thống con khác, đảm bảo thiết kế của ứng dụng mới không bị giới hạn bởi các phụ thuộc vào hệ thống bên ngoài hoặc hệ thống cũ.

## 1. Ngữ cảnh và Vấn đề
Hầu hết các ứng dụng đều phụ thuộc vào các hệ thống khác để lấy dữ liệu hoặc chức năng. Khi di chuyển từ hệ thống cũ (legacy) sang hệ thống hiện đại:
- Các hệ thống cũ thường có vấn đề về chất lượng: lược đồ dữ liệu phức tạp, API lỗi thời.
- Để tương tác, ứng dụng mới có thể bị buộc phải tuân theo các hạ tầng, giao thức hoặc mô hình dữ liệu cũ.
- Việc hỗ trợ các tính năng cũ này có thể làm "vấy bẩn" (corrupt) thiết kế sạch sẽ của ứng dụng hiện đại.

## 2. Giải pháp
Cô lập các hệ thống con bằng cách đặt một lớp chống tham nhũng ở giữa chúng.
- Lớp này dịch giao tiếp giữa hai hệ thống.
- Hệ thống A (mới) sử dụng mô hình dữ liệu và kiến trúc riêng của nó.
- Lớp ACL nhận yêu cầu từ A, chuyển đổi nó sang định dạng mà hệ thống B (cũ) hiểu được và ngược lại.
- ACL có thể được triển khai như một thành phần bên trong ứng dụng hoặc một dịch vụ độc lập.

## 3. Các vấn đề và Cân nhắc
- **Độ trễ:** Thêm một lớp dịch sẽ làm tăng thời gian phản hồi của các cuộc gọi.
- **Quản lý:** Thêm một dịch vụ/thành phần mới cần được bảo trì, giám sát và triển khai.
- **Khả năng mở rộng:** Cần tính toán khả năng scale của lớp ACL này.
- **Tính tạm thời:** Nếu ACL là một phần của chiến lược di chuyển, hãy cân nhắc việc gỡ bỏ nó sau khi hệ thống cũ đã được thay thế hoàn toàn.
- **Tính nhất quán:** Đảm bảo tính nhất quán của dữ liệu và giao dịch giữa hai hệ thống qua lớp dịch.

## 4. Khi nào nên sử dụng
- Khi kế hoạch di chuyển hệ thống diễn ra qua nhiều giai đoạn nhưng vẫn cần duy trì tích hợp giữa hệ thống mới và cũ.
- Khi hai hoặc nhiều hệ thống con có ngữ nghĩa khác nhau nhưng vẫn cần giao tiếp với nhau.

## 5. Khi nào KHÔNG nên sử dụng
- Khi không có sự khác biệt đáng kể về mặt ngữ nghĩa hoặc mô hình dữ liệu giữa hệ thống mới và cũ.

## 6. Liên kết với Well-Architected Framework
- **Vận hành xuất sắc (Operational Excellence):** Giúp duy trì chất lượng thiết kế của các thành phần mới, giảm nợ kỹ thuật (technical debt) bằng cách không cho các quy tắc kinh doanh hoặc mô hình dữ liệu cũ ảnh hưởng đến kiến trúc mới.

---
*Nguồn: [Azure Architecture Center - Anti-corruption Layer pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)*
