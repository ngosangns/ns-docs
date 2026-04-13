---
area: technology
domain: backend
topic: database
type: resource
---
# Storage Engines (MySQL)

## Các Storage Engine

### MyISAM

- Table-level locking, không ACID, không foreign keys, full-text search tốt, read-intensive
- [Tài liệu](https://viblo.asia/p/su-khac-nhau-giua-2-storage-engine-myisam-va-innodb-bJzKmgVPl9N)

### InnoDB

- Row-level locking, ACID đầy đủ, foreign keys, full-text search từ 5.6, mặc định từ 5.5, write-intensive
- [Tài liệu](https://viblo.asia/p/su-khac-nhau-giua-2-storage-engine-myisam-va-innodb-bJzKmgVPl9N)

### MEMORY

- Table-level locking, lưu trong RAM, Hash index mặc định, dữ liệu tạm thời

## Page và Row trong InnoDB

### Page

- Đơn vị lưu trữ cơ bản trong InnoDB
- Kích thước mặc định là 16KB, có thể thay đổi thành 4KB, 8KB, 32KB hoặc 64KB
- Tất cả dữ liệu trong bảng được lưu trữ trong các page

### Row

- Mỗi bảng bao gồm nhiều row, mỗi row được lưu trữ trong một page
- Một page có thể chứa nhiều row
- MySQL làm việc với page chứ không trực tiếp với row; khi truy vấn dữ liệu, MySQL sẽ lấy các page chứa row cần thiết để xử lý

### Giới hạn độ dài Row

- Độ dài tối đa của một row không vượt quá một nửa kích thước của một page
- Với page 16KB (mặc định), row dài nhất khoảng 8KB
- Với page 64KB, row dài nhất gần 32KB
- Giới hạn này giúp tránh lãng phí không gian và tăng hiệu quả truy xuất dữ liệu

### Off-page Storage (Khi Row vượt quá dung lượng tối đa)

- Khi một row vượt quá dung lượng cho phép, các cột có định dạng VARCHAR, VARBINARY, BLOB hoặc TEXT (variable-length column) sẽ được lưu trữ bên ngoài page chính
- Có hai loại định dạng off-page storage:

#### COMPACT/REDUNDANT

- Lưu 768 byte đầu tiên của cột trong page chính (page chứa row gốc)
- Phần còn lại sau 768 byte được lưu trong các overflow pages
- Thêm 20 byte con trỏ để lưu trữ độ dài thực tế của cột và trỏ đến danh sách overflow pages
- Ưu điểm: Tốc độ truy cập nhanh với dữ liệu nhỏ (dưới 768 byte)
- Nhược điểm: Tốn nhiều không gian trên page chính

#### DYNAMIC/COMPRESSED

- Toàn bộ dữ liệu cột được chuyển sang các overflow pages ngay từ đầu
- Page chính chỉ lưu 20 byte con trỏ trỏ đến overflow pages
- Ưu điểm: Tiết kiệm không gian trên page chính, tăng khả năng chứa nhiều row hơn trong một page, hiệu quả với cột dữ liệu lớn
- Nhược điểm: Có thể làm giảm tốc độ truy cập dữ liệu do phải truy cập overflow pages

- [Tài liệu](https://viblo.asia/p/mysql-page-va-row-trong-innodb-EoW4oaw7Lml)