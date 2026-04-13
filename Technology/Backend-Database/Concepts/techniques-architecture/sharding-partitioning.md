---
area: technology
domain: backend
topic: database
type: resource
---
# Sharding và Partitioning

## Sharding

- Chia database thành nhiều shards độc lập trên các server khác nhau
- **Mục đích**: Cải thiện hiệu năng, khả năng mở rộng, tính sẵn sàng
- **Nhược điểm**: Tăng độ phức tạp, JOIN giữa shards khó khăn
- [Tài liệu](https://viblo.asia/p/database-sharding-la-gi-Az45boQVKxY)

## Partitioning

- Chia bảng thành nhiều partitions, quản lý như một bảng logic
- **Mục đích**: Cải thiện hiệu năng truy vấn (query pruning), dễ quản lý dữ liệu
- **Loại**: RANGE, LIST, HASH, KEY
- [Tài liệu](https://viblo.asia/p/tang-toc-performance-query-sql-voi-partitions-WAyK89XEZxX)