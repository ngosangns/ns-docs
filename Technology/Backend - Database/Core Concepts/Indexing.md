---
tags:
  - area/technology
  - domain/backend
  - topic/database
  - type/resource
  - lang/vi
---

# Indexing

Cấu trúc dữ liệu giúp tăng tốc độ truy vấn.

## Resources

- [Database Indexing Strategies](https://blog.bytebytego.com/p/database-indexing-strategies)
- [Optimizing Database Performance](https://dev.to/abaron10/optimizing-database-performance-exploring-indexing-techniques-in-dbms-1emj)
- [Nghệ thuật index MongoDB](https://viblo.asia/p/nghe-thuat-index-mongodb-5-ke-sach-co-the-cac-ha-chua-biet-Do754bnXZM6)
- [Advanced Indexing Strategies in PostgreSQL](https://www.freecodecamp.org/news/postgresql-indexing-strategies)

## Clustered Index vs Non-Clustered Index

### Clustered Index

- Xác định thứ tự vật lý của dữ liệu
- Mỗi bảng chỉ có một clustered index
- Primary key thường tạo clustered index
- [Tài liệu](https://viblo.asia/p/hieu-ve-clustered-index-bJzKmw9Bl9N)

### Non-Clustered Index

- Cấu trúc riêng biệt với dữ liệu bảng
- Một bảng có thể có nhiều non-clustered index
- Cần thêm không gian lưu trữ

## Cấu trúc Index trong MySQL

> "Most MySQL indexes (PRIMARY KEY, UNIQUE, INDEX, and FULLTEXT) are stored in B-trees. Exceptions: Indexes on spatial data types use R-trees; MEMORY tables also support hash indexes; InnoDB uses inverted lists for FULLTEXT indexes."

### B-Tree Index

- **Phổ biến nhất**: Được sử dụng cho hầu hết các index (PRIMARY KEY, UNIQUE, INDEX, FULLTEXT)
- **Đặc điểm**:
  - Cây tự cân bằng (balanced tree)
  - Mỗi node chứa nhiều keys và nhiều con trỏ đến node con
  - Giảm độ sâu cây: logₘ(N) thay vì log₂(N) như cây nhị phân
  - Mỗi node có kích thước = 1 disk block (4KB, 8KB, 16KB)
- **Ưu điểm**:
  - Giảm số lần đọc từ ổ cứng (ví dụ: 3 lần thay vì 30 lần với 1 tỷ keys)
  - Hỗ trợ truy vấn: `=`, `>`, `>=`, `<`, `<=`, `BETWEEN`, `LIKE` (wildcard không ở đầu)
  - Hỗ trợ ORDER BY
- **Nhược điểm**:
  - Tốn RAM khi load node vào bộ nhớ (đổi lại giảm I/O)
  - Cần chia/gộp node khi thêm/xóa để đảm bảo cân bằng
  - Composite index phải tuân thủ thứ tự cột (leftmost prefix rule)
- **So sánh với Hash Index**:
  - Hash Index có O(1) nhưng không hỗ trợ BETWEEN, ORDER BY
  - B-Tree cân bằng tốt hơn giữa tốc độ và tính linh hoạt

### R-Tree Index

- **Sử dụng cho**: Spatial data types (GEOMETRY, POINT, LINESTRING, POLYGON)
- **Lý do không dùng B-Tree**: B-Tree thiết kế cho dữ liệu một chiều, spatial data là đa chiều
- **Ứng dụng**: Tìm kiếm trong phạm vi không gian (ví dụ: nhà hàng trong bán kính 5km)
- **Ví dụ**:

```sql
CREATE SPATIAL INDEX idx_location ON restaurants(location);
SELECT * FROM restaurants
WHERE ST_Contains(ST_Buffer(@user_location, 5), location);
```

### Hash Index

- **Chỉ hỗ trợ**: MEMORY storage engine
- **Đặc điểm**:
  - O(1) cho tìm kiếm chính xác (exact match)
  - MEMORY table lưu trên RAM → truy cập nhanh nhưng mất dữ liệu khi mất điện
- **Ưu điểm**: Tìm kiếm cực nhanh với `=`
- **Nhược điểm**:
  - Không hỗ trợ BETWEEN, ORDER BY
  - Không hỗ trợ truy vấn theo khoảng giá trị
- **Lưu ý**: MEMORY table vẫn có thể dùng B-Tree với `USING BTREE`

### Inverted List (Full-Text Index)

- **Sử dụng cho**: FULLTEXT index trên cột văn bản (CHAR, VARCHAR, TEXT)
- **Lý do không dùng B-Tree**: B-Tree phù hợp với `=`, `BETWEEN`, `LIKE 'abc%'`, không phù hợp với tìm kiếm từ khóa trong text
- **Cách hoạt động**:
  - Lưu danh sách các từ (word) và ánh xạ với danh sách document chứa từ đó
  - Lưu thông tin vị trí (byte offset) để hỗ trợ proximity search
- **Cú pháp**: `MATCH(column) AGAINST('keyword')`
- **Tính năng**: Tính điểm relevance dựa trên số lần và vị trí xuất hiện
- **Lưu ý**: InnoDB sử dụng inverted list cho FULLTEXT index (không phải B-Tree)

### Kết luận

- MySQL linh hoạt sử dụng nhiều cấu trúc dữ liệu khác nhau tùy theo use case
- B-Tree là lựa chọn mặc định vì cân bằng tốt giữa tốc độ và tính linh hoạt
- Các cấu trúc khác (R-Tree, Hash, Inverted List) được dùng cho các bài toán chuyên biệt

- [Tài liệu](https://viblo.asia/p/series-index-nang-cao-bai-2-dao-sau-vao-cac-cau-truc-du-lieu-dung-de-luu-tru-index-trong-mysql-r1QLxjYp4Aw)

## Lưu ý khi sử dụng Index

- **Sai lầm 1**: Đánh index quá nhiều → tăng chi phí INSERT/UPDATE/DELETE
- **Sai lầm 2**: Không đánh index cho WHERE/JOIN/ORDER BY
  - Tránh index cho: cột low cardinality, cột thường xuyên thay đổi, bảng nhỏ, LIKE với wildcard ở đầu, cột nhiều NULL
- **Sai lầm 3**: Sử dụng hàm trong WHERE trên cột đã index → không dùng được index
- [Tài liệu](https://viblo.asia/p/series-index-nang-cao-bai-1-phan-tich-nhung-sai-lam-pho-bien-khi-su-dung-index-trong-mysql-MkNLr237LgA)

## Index cho Foreign Key

- Đảm bảo cột foreign key được đánh index
- Tránh full table scan khi kiểm tra tham chiếu
- [Tài liệu](https://wecommit.com.vn/foreign-key-no-index/)

