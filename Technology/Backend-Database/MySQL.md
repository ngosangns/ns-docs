---
tags:
  - area/technology
  - domain/backend
  - topic/database
  - type/resource
  - lang/vi
---

# MySQL

## Resources

- Xem chi tiết về Indexing: [[Indexing]]
- [Sử dụng index trong database](https://viblo.asia/p/su-dung-index-trong-database-nhu-the-nao-cho-hieu-qua-4P856q69lY3)
- [Deadlock trong SQL transaction](https://viblo.asia/p/deadlock-trong-sql-transaction-ung-dung-trong-laravel-WAyK89emZxX)
- [Window functions trong MySQL](https://viblo.asia/p/window-functions-trong-mysql-nang-cao-va-cuc-ki-huu-dung-phan-i-Do754AgXKM6)
- [Backup data MySQL](https://viblo.asia/p/mit-dac-va-biet-tuot-noi-ve-cac-phuong-phap-backup-mysql-de-tang-toc-do-backup-va-restore-len-hang-tram-lan-PAoJeQ8DJ1j)
- [MySQL Thực Thi Lệnh SELECT Như Thế Nào?](https://viblo.asia/p/mysql-thuc-thi-lenh-select-nhu-the-nao-AZoJjreyJY7)
- [Nghiên cứu về kiến trúc và cách tối ưu MySQL](https://viblo.asia/p/nghien-cuu-ve-kien-truc-va-cach-toi-uu-mysql-EbNVQww0JvR)

## Tools

- **Percona Toolkit**: Collection of advanced open source command-line tools - [GitHub](https://github.com/percona/percona-toolkit)

## Extensions (Services)

- **ProxySQL**: Tăng tốc độ truy vấn dữ liệu SQL với replication

## Storage Engine

Xem chi tiết: [[Storage Engines]]

### InnoDB

- **Mặc định** từ MySQL 5.5
- **Transaction**: Hỗ trợ ACID
- **Locking**: Row-level locking
- **Foreign Keys**: Hỗ trợ
- **Tính năng**: Crash recovery, foreign key, tối ưu cho giao dịch
- **Use case**: Hệ thống có lượng lớn giao dịch, đòi hỏi tính toàn vẹn dữ liệu

### MyISAM

- **Mặc định** trước InnoDB
- **Transaction**: Không hỗ trợ
- **Locking**: Table-level locking
- **Foreign Keys**: Không hỗ trợ
- **Tính năng**: Hiệu suất cao cho read-heavy workloads
- **Use case**: Ứng dụng chủ yếu đọc dữ liệu, không yêu cầu transaction

### MEMORY

- **Storage**: Lưu trữ hoàn toàn trong RAM
- **Transaction**: Không hỗ trợ
- **Locking**: Table-level
- **Index**: Hỗ trợ Hash index (mặc định) và B-Tree
- **Use case**: Dữ liệu tạm thời, bảng cache, session

### CSV

- **Storage**: Lưu trữ dưới dạng file CSV
- **Transaction**: Không hỗ trợ
- **Locking**: Không hỗ trợ
- **Index**: Không hỗ trợ
- **Use case**: Di chuyển hoặc trao đổi dữ liệu dạng CSV

### ARCHIVE

- **Storage**: Tối ưu cho lưu trữ lâu dài, dung lượng nhỏ
- **Transaction**: Không hỗ trợ
- **Locking**: Chỉ INSERT, không UPDATE/DELETE
- **Index**: Không hỗ trợ
- **Tính năng**: Dữ liệu được nén
- **Use case**: Lưu trữ dữ liệu lớn ít thay đổi (ví dụ: log)

### BLACKHOLE

- **Storage**: Không lưu trữ dữ liệu
- **Transaction**: Không hỗ trợ
- **Locking**: Không có
- **Index**: Không hỗ trợ
- **Use case**: Testing hoặc replication không cần lưu dữ liệu

### MERGE

- **Storage**: Kết hợp nhiều bảng MyISAM thành một bảng ảo
- **Transaction**: Không hỗ trợ
- **Locking**: Table-level
- **Index**: Phụ thuộc vào chỉ mục của các bảng MyISAM
- **Use case**: Dữ liệu được chia thành nhiều bảng nhưng cần truy vấn như một bảng

### FEDERATED

- **Storage**: Kết nối với các bảng ở máy chủ MySQL khác
- **Transaction**: Không hỗ trợ
- **Locking**: Phụ thuộc vào máy chủ từ xa
- **Index**: Phụ thuộc vào máy chủ từ xa
- **Use case**: Liên kết dữ liệu giữa các cơ sở dữ liệu khác nhau
