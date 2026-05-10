---
area: technology
domain: backend
topic: database
type: resource
---
# Hierarchical Data

Các mô hình lưu trữ dữ liệu phân cấp (cây).

## Adjacency List

- Mỗi hàng lưu parent_id, đơn giản nhưng truy vấn cây con phức tạp

## Closure Table

- Lưu tất cả quan hệ tổ tiên-hậu duệ, truy vấn nhanh, chèn/xóa phức tạp

## Nested Set Model

- Mỗi nút có left/right, truy vấn cây con nhanh, chèn/xóa/di chuyển tốn kém
