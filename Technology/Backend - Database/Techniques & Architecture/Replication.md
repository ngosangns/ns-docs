---
tags:
  - area/technology
  - domain/backend
  - topic/database
  - type/resource
  - lang/vi
---

# Database Replication

## Tổng quan

- **Synchronous**: Server chính đợi xác nhận từ tất cả server phụ → nhất quán cao, độ trễ cao
- **Asynchronous**: Server chính phản hồi ngay → độ trễ thấp, có thể mất dữ liệu
- **Master-Slave**: Một master ghi, nhiều slave đọc
- **Multi-Master**: Nhiều master đều có thể ghi, phức tạp hơn

## PostgreSQL Replication

- **Tổng quan**: Kỹ thuật sao chép dữ liệu từ máy chủ chính (master) sang các máy chủ sao chép (replica) để tăng khả năng chịu tải, đảm bảo tính sẵn sàng cao và khả năng phục hồi sau sự cố
- **Các loại Replication**:
  - **Streaming Replication**: Sao chép dữ liệu dựa trên việc truyền các bản ghi WAL (Write-Ahead Logging) trực tiếp từ máy chủ chính đến máy chủ sao chép. Có hai cách thực hiện: truyền theo đoạn WAL một lần (file-based) và truyền dựa trên các bản ghi WAL (record-based). Quá trình này diễn ra giữa WAL receiver trên máy chủ sao chép và WAL sender trên máy chủ chính qua TCP/IP
  - **Logical Replication**: Sao chép dữ liệu dựa trên các thay đổi cụ thể trong dữ liệu (INSERT, UPDATE, DELETE) thay vì sao chép toàn bộ cấu trúc. Hoạt động thông qua cơ chế publication (nhóm các thay đổi từ một hoặc nhiều bảng) và subscription (nơi lấy dữ liệu từ publication). Cho phép sao chép linh hoạt và chính xác hơn, giảm tải cho hệ thống
- **Chế độ Replication**:
  - **Asynchronous Replication**: Dữ liệu không được sao chép ngay lập tức sang máy chủ dự phòng, có thể xảy ra mất dữ liệu nhỏ nếu máy chủ dự phòng không kịp theo kịp với tốc độ của máy chủ chính. Phù hợp khi rủi ro mất dữ liệu nhỏ này chấp nhận được
  - **Synchronous Replication**: Mỗi cam kết của giao dịch ghi phải chờ xác nhận từ cả máy chủ chính và máy chủ dự phòng trước khi tiếp tục. Giảm thiểu nguy cơ mất dữ liệu nhưng tăng thời gian phản hồi cho mỗi giao dịch do phải chờ đợi xác nhận từ cả hai máy chủ
- **Sự sẵn sàng cao (High Availability)**:
  - **Load Balancing**: Sử dụng các công cụ để quản lý lưu lượng từ ứng dụng, tận dụng tối đa kiến trúc cơ sở dữ liệu, chuyển hướng đến các nút có sẵn/sống sót và xác định cổng với các vai trò khác nhau
  - **Cải thiện hiệu suất**: Sử dụng bộ quản lý kết nối tốt giữa ứng dụng và các máy chủ cơ sở dữ liệu để tối ưu hóa tài nguyên và đảm bảo thời gian phản hồi tốt nhất
- Nguồn: https://viblo.asia/p/postgresql-replication-tong-quan-va-co-che-hoat-dong-part-1-of-3-GAWVpyxo405

