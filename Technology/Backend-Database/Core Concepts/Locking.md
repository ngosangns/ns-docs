---
tags:
  - area/technology
  - domain/backend
  - topic/database
  - type/resource
  - lang/vi
---

# Locking

Cơ chế quản lý truy cập đồng thời vào dữ liệu.

## Cấp độ Locking

- **Table-level**: Khóa toàn bộ bảng, đơn giản nhưng hạn chế đồng thời
- **Page-level**: Khóa một trang dữ liệu, cân bằng
- **Row-level**: Khóa từng hàng, đồng thời cao nhất

## Chế độ Lock

- **Exclusive Lock (X Lock)**: Cho thao tác ghi, chỉ một giao dịch giữ được
- **Shared Lock (S Lock)**: Cho thao tác đọc, nhiều giao dịch có thể cùng giữ
- [Tài liệu](https://viblo.asia/p/010-exclusive-lock-va-shared-lock-924lJjn0lPM)

## Kiểu Lock

- **Pessimistic Locking**: Khóa tài nguyên ngay khi bắt đầu, đảm bảo nhất quán cao, giảm đồng thời
- **Optimistic Locking**: Không khóa khi đọc, kiểm tra version khi cập nhật, tăng đồng thời, cần retry logic
- **Advisory Lock**: Người dùng tự định nghĩa, thường dùng trong PostgreSQL
- [Tài liệu](https://viblo.asia/p/009-optimistic-lock-va-pessimistic-lock-L4x5xr7aZBM)

