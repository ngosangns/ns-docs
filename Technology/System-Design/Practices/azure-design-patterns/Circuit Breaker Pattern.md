---
area: technology
domain: system-design
type: note
title: Circuit Breaker Pattern
description: Mẫu thiết kế Circuit Breaker (Ngắt mạch)
timestamp: '2026-06-19T13:43:26.116Z'
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
---
# Mẫu thiết kế Circuit Breaker (Ngắt mạch)

Mẫu thiết kế Circuit Breaker giúp xử lý các lỗi có thể mất một khoảng thời gian không xác định để khắc phục khi kết nối với các dịch vụ hoặc tài nguyên từ xa. Nó ngăn chặn ứng dụng thực hiện các nỗ lực vô ích, giúp hệ thống có thời gian hồi phục và tránh hiện tượng sụp đổ dây chuyền (cascading failure).

## 1. Ngữ cảnh và Vấn đề
Trong môi trường phân tán, các cuộc gọi đến dịch vụ từ xa có thể thất bại do lỗi tạm thời (mạng chậm, timeout). Tuy nhiên, có những lỗi nghiêm trọng hơn và kéo dài:
- Nếu ứng dụng liên tục thử lại (Retry) một thao tác chắc chắn thất bại, nó sẽ chiếm dụng các tài nguyên quan trọng (memory, threads, database connections).
- Việc cạn kiệt tài nguyên ở một phần hệ thống có thể gây ra lỗi ở các phần khác không liên quan.

## 2. Giải pháp
Sử dụng một proxy đóng vai trò là "ngắt mạch" giữa ứng dụng và dịch vụ từ xa. Proxy này giám sát số lượng lỗi gần đây và quyết định cho phép thao tác tiếp tục hoặc trả về lỗi ngay lập tức.

### Ba trạng thái của Circuit Breaker:
- **Closed (Đóng):** Trạng thái bình thường. Các yêu cầu được chuyển đến dịch vụ. Proxy đếm số lượng lỗi. Nếu số lỗi vượt ngưỡng trong một khoảng thời gian, nó chuyển sang trạng thái **Open**.
- **Open (Mở):** Các yêu cầu từ ứng dụng bị trả về lỗi ngay lập tức (fail-fast) mà không gọi đến dịch vụ. Một bộ đếm thời gian (timeout) được bắt đầu. Khi hết thời gian, nó chuyển sang trạng thái **Half-Open**.
- **Half-Open (Nửa mở):** Cho phép một số lượng hạn chế các yêu cầu đi qua để kiểm tra dịch vụ đã hồi phục chưa:
    - Nếu thành công: Chuyển về **Closed** và reset bộ đếm lỗi.
    - Nếu thất bại: Quay lại trạng thái **Open** và bắt đầu lại bộ đếm thời gian.

## 3. So sánh với Retry Pattern
- **Retry Pattern:** Giúp ứng dụng thử lại thao tác với kỳ vọng rằng nó sẽ thành công sau một vài lần thử.
- **Circuit Breaker Pattern:** Ngăn chặn ứng dụng thực hiện thao tác mà khả năng cao là sẽ thất bại.
- **Kết hợp:** Thông thường, ta sử dụng Retry để xử lý các lỗi tạm thời bên trong một cơ chế Circuit Breaker.

## 4. Các vấn đề và Cân nhắc
- **Xử lý ngoại lệ:** Ứng dụng phải có cơ chế xử lý khi Circuit Breaker ở trạng thái Open (ví dụ: trả về dữ liệu cũ từ cache hoặc hiển thị thông báo lỗi thân thiện).
- **Giám sát:** Cần ghi lại nhật ký thay đổi trạng thái để đội vận hành biết khi nào hệ thống gặp sự cố.
- **Khả năng hồi phục:** Cấu hình thời gian timeout và ngưỡng lỗi phù hợp với đặc thù của dịch vụ backend.
- **Thử nghiệm thủ công:** Cung cấp cơ chế cho quản trị viên để đóng hoặc mở mạch thủ công khi cần bảo trì.

## 5. Khi nào nên sử dụng
- Để ngăn chặn các lỗi dây chuyền và bảo vệ tài nguyên hệ thống.
- Khi kết nối với các dịch vụ bên thứ ba hoặc các dịch vụ có độ tin cậy thấp.
- Khi cần duy trì tính đáp ứng (responsiveness) của hệ thống ngay cả khi một phần backend bị lỗi.

## 6. Khi nào KHÔNG nên sử dụng
- Xử lý các lỗi truy cập tài nguyên cục bộ (local) trong bộ nhớ ứng dụng.
- Thay thế cho việc xử lý lỗi trong logic nghiệp vụ.
- Khi các thuật toán Retry thông thường đã đủ để giải quyết vấn đề.

---
*Nguồn: [Azure Architecture Center - Circuit Breaker pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)*
