---
area: technology
domain: backend
topic: database
type: resource
title: SQL Optimization
description: SQL Optimization
timestamp: "2026-06-19T13:43:26.155Z"
tags:
  - technology
  - backend
  - database
resource: https://viblo.asia/p/mit-dac-va-biet-tuot-noi-chuyen-ve-nhung-loi-don-trong-toi-uu-sql-zXRJ8rqOVGq
---

# SQL Optimization

## Thứ tự thực thi câu lệnh SELECT

1. FROM và JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT/OFFSET

## Tối ưu hóa truy vấn SQL

### Resources

- [Mít đặc và biết tuốt về tối ưu SQL](https://viblo.asia/p/mit-dac-va-biet-tuot-noi-chuyen-ve-nhung-loi-don-trong-toi-uu-sql-zXRJ8rqOVGq)
- [12 lý do khiến MySQL truy vấn chậm](https://viblo.asia/p/12-ly-do-khien-mysql-truy-van-cham-part-2-EvbLbxXv4nk)
- [Performance Tuning SQL](https://viblo.asia/p/performance-tuning-sql-tai-sao-code-sql-cua-ong-ben-canh-lai-chay-nhanh-hon-minh-nhi-5pPLkxnyVRZ)

## Kỹ thuật tối ưu

- Sử dụng chính xác tên cột thay vì SELECT \*
- Xem xét loại bỏ DISTINCT nếu không cần
- Chuyển sub-query thành JOIN khi có thể
- Sử dụng UNION ALL thay cho UNION
- Tránh OR cho nhiều điều kiện trên các cột khác nhau
- Paging: Sử dụng LIMIT/OFFSET hoặc cursor-based pagination
- Đưa vào cache
- Đặt index cho WHERE/JOIN/ORDER BY
- Dùng full-text search cho tìm kiếm văn bản
- Deferred Join: JOIN vào tập con đã được lọc và giới hạn

## Keyset Pagination (Truy Vấn Theo Last ID)

- **Giới thiệu**: Keyset Pagination là phương pháp phân trang hiệu quả cho dữ liệu lớn, sử dụng khóa duy nhất để xác định vị trí bắt đầu của trang tiếp theo
- **So sánh với Offset Pagination**:
  - Offset Pagination sử dụng OFFSET và LIMIT để phân trang, nhưng kém hiệu quả khi dữ liệu lớn do phải quét qua nhiều bản ghi
  - Keyset Pagination sử dụng giá trị của cột khóa (thường là ID) để xác định điểm bắt đầu của trang tiếp theo, giúp truy vấn nhanh hơn và ổn định hơn
- **Cách hoạt động**: Sử dụng điều kiện WHERE với giá trị của cột khóa để xác định điểm bắt đầu của trang tiếp theo, kết hợp với LIMIT để giới hạn số lượng kết quả trả về
- **Ưu điểm**:
  - Tăng hiệu suất truy vấn trên tập dữ liệu lớn
  - Giảm thời gian phản hồi
  - Tránh vấn đề trùng lặp hoặc thiếu dữ liệu khi dữ liệu thay đổi trong quá trình phân trang
- **Nhược điểm**:
  - Không hỗ trợ nhảy đến trang cụ thể
  - Yêu cầu cột khóa có thứ tự rõ ràng và giá trị duy nhất
- **Ứng dụng**: Phù hợp cho các hệ thống có lượng dữ liệu lớn và yêu cầu phân trang hiệu quả, như mạng xã hội, sàn thương mại điện tử, API cung cấp danh sách sản phẩm, bài viết, hoặc người dùng

## Prepared Statements

- Sử dụng bind variables thay vì nối chuỗi
- **Lợi ích**: Tăng hiệu năng (reuse execution plan), bảo mật (chống SQL Injection)
- [Tài liệu](https://viblo.asia/p/bi-mat-lon-nhat-ve-tang-toc-do-cau-lenh-sql-ve-muc-mili-giay-cuc-hieu-qua-result-cache-WR5JRvMQJGv)

## Tránh SELECT \*

- Tăng network traffic, CPU usage, memory usage
- Cản trở tối ưu hóa, không thể dùng covering index hiệu quả

## "Điều kiện ngu" (Obfuscated Conditions)

- So sánh cột số với chuỗi số
- Áp dụng hàm lên cột đã index trong WHERE
- Kết hợp các cột không có index phù hợp

## Common Table Expressions (CTE)

- Định nghĩa tập kết quả tạm thời, có tên
- **Recursive CTE**: Cho dữ liệu phân cấp, cây
  - Anchor member: Khởi tạo
  - Recursive member: Mở rộng
  - [Tài liệu](https://data-fun.com/mysql-common-table-expression-with)
  - [Recursive CTE](https://kysuit.net/mysql/a-definitive-guide-to-mysql-recursive-cte)

## Case Study: MariaDB Performance Issue với Large Data Types

- **Vấn đề**: Query chậm (50 giây) khi phân trang với OFFSET lớn trên bảng có 500K+ records
- **Query gây vấn đề**: `SELECT * FROM posts WHERE deleted_at IS NULL ORDER BY group_id DESC, post_number DESC LIMIT 15 OFFSET 418000`
- **Nguyên nhân chính**:
  - Field `content` (LONGTEXT) được load vào memory khi ORDER BY, gây tốn RAM và CPU
  - OFFSET lớn khiến database phải quét qua 80% index rows
  - SELECT \* load tất cả columns kể cả khi không cần thiết
- **Giải pháp**:
  - Tách bảng: Bảng metadata (id, group_id, post_number) và bảng content riêng
  - Chỉ SELECT các field cần thiết thay vì SELECT \*
  - Cải thiện từ 50 giây xuống 1.5 giây
- **Bài học**:
  - Thiết kế schema cẩn thận: Phân tích luồng truy vấn và khối lượng dữ liệu trước khi xây dựng
  - Normalization: Tách các fields lớn (LONGTEXT, BLOB) ra bảng riêng để tránh load không cần thiết
  - Hiểu rõ data types: TEXT/BLOB nặng hơn VARCHAR/INT, đặc biệt khi sort/search
  - Index không phải thần dược: Cần hiểu cách database engine hoạt động, index có thể làm chậm INSERT/UPDATE
  - Pagination với OFFSET lớn rất tệ: Ưu tiên keyset/cursor-based pagination
  - Database partitioning: Có thể cải thiện hiệu năng với dữ liệu lớn
  - Monitoring: Sử dụng Prometheus, Grafana để giám sát từ sớm
  - Caching: Redis cho dữ liệu static hoặc ít thay đổi
  - Cân nhắc lưu trữ text vào file thay vì database cho một số use cases
