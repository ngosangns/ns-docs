---
area: technology
domain: system-design
type: note
title: Index Table Pattern
description: Index Table Pattern
timestamp: "2026-06-19T13:43:26.124Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/index-table
---

```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Index Table Pattern.md#L1-53
# Index Table Pattern (Mô hình Bảng Chỉ mục)

Tạo các chỉ mục trên các trường dữ liệu thường xuyên được truy vấn trong các kho lưu trữ dữ liệu. Mô hình này giúp cải thiện hiệu suất truy vấn bằng cách cho phép ứng dụng tìm kiếm dữ liệu cần truy xuất một cách nhanh chóng hơn.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Nhiều kho lưu trữ NoSQL chỉ tổ chức dữ liệu theo khóa chính (Primary Key). Khi cần truy vấn theo các thuộc tính khác (ví dụ: tìm khách hàng theo thành phố), ứng dụng phải quét toàn bộ dữ liệu, gây chậm trễ và tốn tài nguyên.
- **Giải pháp:** Mô phỏng các chỉ mục thứ cấp (secondary indexes) bằng cách tạo các "bảng chỉ mục" riêng biệt.
- **Các chiến lược cấu trúc bảng chỉ mục:**
    - **Phi bình thường hóa hoàn toàn (Complete Denormalization):** Sao chép toàn bộ dữ liệu vào mỗi bảng chỉ mục, mỗi bảng tổ chức theo một khóa khác nhau. Truy vấn nhanh nhất nhưng tốn dung lượng và khó bảo trì tính nhất quán.
    - **Bảng chỉ mục chuẩn hóa (Normalized Index Tables):** Bảng chỉ mục chỉ chứa khóa phụ và khóa chính của bảng dữ liệu gốc (fact table). Tiết kiệm không gian nhưng cần 2 lần tra cứu (lookup) để lấy dữ liệu cuối cùng.
    - **Phi bình thường hóa một phần (Partially Normalized Index Tables):** Chỉ sao chép các trường thường xuyên được truy vấn nhất vào bảng chỉ mục. Đây là sự cân bằng giữa hiệu suất và chi phí lưu trữ.
- **Lưu ý quan trọng:**
    - **Duy trì tính nhất quán:** Khi dữ liệu gốc thay đổi, các bảng chỉ mục phải được cập nhật. Trong môi trường đám mây, thường sử dụng mô hình **nhất quán cuối cùng (eventual consistency)** thông qua các tác vụ nền hoặc hàng đợi.
    - **Chi phí lưu trữ:** Việc nhân bản dữ liệu sẽ làm tăng chi phí lưu trữ đáng kể.
    - **Phân mảnh dữ liệu (Sharding):** Bảng chỉ mục cực kỳ hữu ích khi dữ liệu được phân mảnh (sharded). Nó có thể lưu trữ ánh xạ từ khóa phụ sang khóa phân mảnh (shard key) tương ứng.

## Khi nào nên sử dụng

- Khi ứng dụng thường xuyên cần truy xuất dữ liệu bằng các khóa không phải khóa chính hoặc khóa phân mảnh.
- Khi kho lưu trữ dữ liệu hiện tại không hỗ trợ chỉ mục thứ cấp một cách tự nhiên.

## Khi nào không nên sử dụng

- **Dữ liệu biến động mạnh (Volatile):** Nếu dữ liệu thay đổi quá thường xuyên, chi phí để cập nhật các bảng chỉ mục sẽ lớn hơn lợi ích truy vấn mang lại.
- **Trường dữ liệu có tính phân biệt thấp:** Ví dụ trường "Giới tính" chỉ có vài giá trị, việc tạo chỉ mục không giúp ích nhiều so với việc quét tuần tự.
- **Dữ liệu bị lệch (Skewed):** Nếu 90% bản ghi có cùng một giá trị ở một trường, chỉ mục cho trường đó sẽ không hiệu quả cho đa số truy vấn.

## Ví dụ thực tế
Trong Azure Table Storage, bạn có thể tạo một bảng chính lưu thông tin phim theo "Thể loại" (Partition Key). Nếu muốn tìm phim theo "Diễn viên", bạn tạo một bảng chỉ mục khác với Partition Key là tên diễn viên và Row Key là tên phim.

---
*Nguồn tham khảo: [Microsoft Learn - Index Table Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/index-table)*
```
