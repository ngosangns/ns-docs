---
tags:
  - area/technology
  - domain/backend
  - topic/database
  - type/resource
  - lang/vi
---

# Transactions

## Transaction Isolation Levels

- **Read Uncommitted**: Đọc dữ liệu chưa commit, dirty read, mức thấp nhất
- **Read Committed**: Chỉ đọc dữ liệu đã commit, tránh dirty read, mặc định trong PostgreSQL/SQL Server
- **Repeatable Read**: Đảm bảo đọc lặp lại được, ngăn non-repeatable read, mặc định trong MySQL InnoDB
- **Serializable**: Mức cao nhất, đảm bảo tuần tự hóa, ngăn tất cả vấn đề đọc không nhất quán
- [Tài liệu](https://viblo.asia/p/014-postgresql-transaction-isolation-OeVKB67JKkW)

## MVCC (Multi-Version Concurrency Control)

- Kỹ thuật quản lý truy cập đồng thời hiệu quả
- Tạo phiên bản mới khi update/delete thay vì ghi đè
- Mỗi giao dịch có snapshot tại thời điểm bắt đầu
- **Lợi ích**: Tăng đồng thời, giảm xung đột khóa
- **Thách thức**: Quản lý phiên bản, phình to bảng (table bloat)
- [Tài liệu](https://viblo.asia/p/011-postgresql-multi-version-concurrency-control-6J3ZgdGLlmB)

