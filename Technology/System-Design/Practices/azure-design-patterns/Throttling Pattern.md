---
area: technology
domain: system-design
type: note
title: Throttling Pattern
description: Throttling Pattern
timestamp: '2026-06-19T13:43:26.125Z'
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling
---
```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Throttling Pattern.md#L1-35
# Throttling Pattern (Mô hình Điều tiết)

## Tóm tắt
Mô hình Throttling kiểm soát việc tiêu thụ tài nguyên của một instance ứng dụng, một tenant cụ thể hoặc toàn bộ dịch vụ. Điều này cho phép hệ thống tiếp tục hoạt động và đáp ứng các thỏa thuận cấp độ dịch vụ (SLA) ngay cả khi nhu cầu tăng đột biến gây áp lực cực lớn lên tài nguyên.

## Các chiến lược Throttling
- **Từ chối yêu cầu**: Chặn các yêu cầu từ một người dùng cụ thể nếu họ vượt quá giới hạn n lần/giây trong một khoảng thời gian.
- **Làm suy giảm chức năng**: Vô hiệu hóa hoặc giảm chất lượng của các dịch vụ không thiết yếu để dành tài nguyên cho các dịch vụ quan trọng (ví dụ: giảm độ phân giải video streaming).
- **San phẳng tải (Load Leveling)**: Sử dụng hàng đợi để điều tiết luồng công việc (Queue-based Load Leveling).
- **Trì hoãn thao tác**: Đình chỉ các tác vụ có ưu tiên thấp và thông báo cho người dùng thử lại sau.
- **Tích hợp bên thứ ba**: Giảm số lượng yêu cầu đồng thời đến các dịch vụ bên thứ ba đang gặp sự cố để tránh làm tràn log và tốn chi phí thử lại vô ích.

## Các điểm chính và lưu ý
- **Mục đích**: 
    - Đảm bảo hệ thống đáp ứng SLA.
    - Ngăn chặn một tenant duy nhất độc chiếm tài nguyên (Noisy Neighbor).
    - Tối ưu hóa chi phí bằng cách giới hạn mức tài nguyên tối đa.
- **Kết hợp với Autoscaling**: Throttling có thể là biện pháp tạm thời trong khi chờ hệ thống scale out (vì việc cấp phát tài nguyên mới không diễn ra tức thì).
- **Mã lỗi phản hồi**: Nên trả về mã lỗi HTTP **429 (Too Many Requests)** hoặc **503 (Server Too Busy)** kèm theo header `Retry-After` để ứng dụng khách biết khi nào nên thử lại.
- **Tính năng động**: Cấu hình throttling nên được quản lý bên ngoài (External Configuration Store) để có thể thay đổi trong thời gian chạy (runtime) mà không cần triển khai lại mã nguồn.

## Khi nào sử dụng
- Để duy trì tính ổn định của hệ thống dưới tải trọng biến động.
- Để quản lý chi phí vận hành một cách chặt chẽ.
- Trong các hệ thống đa người thuê (multi-tenant) để đảm bảo công bằng về tài nguyên.

## Mối liên hệ
- **Queue-based Load Leveling Pattern**: Một cơ chế phổ biến để triển khai throttling bằng cách dùng hàng đợi làm bộ đệm.
- **Priority Queue Pattern**: Giúp duy trì hiệu suất cho các yêu cầu quan trọng trong khi điều tiết các yêu cầu ít quan trọng hơn.
- **Rate Limiting Pattern**: Throttling thường là cơ chế phía máy chủ (server-side) mà Rate Limiting (phía client-side) cố gắng tránh vi phạm.

## Tài liệu tham khảo
- [Microsoft Learn - Throttling Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling)
