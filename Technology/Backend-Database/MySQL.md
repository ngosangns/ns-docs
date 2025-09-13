---
relates:
  - "[[Postgresql]]"
  - "[[Database]]"
tags:
  - postgresql
  - database
  - resources
  - tools
  - storage-engine
---
# 1. Resources

- https://viblo.asia/p/su-dung-index-trong-database-nhu-the-nao-cho-hieu-qua-4P856q69lY3
- https://viblo.asia/p/deadlock-trong-sql-transaction-ung-dung-trong-laravel-WAyK89emZxX
- https://viblo.asia/p/window-functions-trong-mysql-nang-cao-va-cuc-ki-huu-dung-phan-ii-QpmleNGD5rd
- https://viblo.asia/p/window-functions-trong-mysql-nang-cao-va-cuc-ki-huu-dung-phan-i-Do754AgXKM6
- Backup data: https://viblo.asia/p/mit-dac-va-biet-tuot-noi-ve-cac-phuong-phap-backup-mysql-de-tang-toc-do-backup-va-restore-len-hang-tram-lan-PAoJeQ8DJ1j
- MySQL Thực Thi Lệnh SELECT Như Thế Nào?: https://viblo.asia/p/mysql-thuc-thi-lenh-select-nhu-the-nao-AZoJjreyJY7
- Nghiên cứu về kiến trúc và cách tối ưu MySQL: https://viblo.asia/p/nghien-cuu-ve-kien-truc-va-cach-toi-uu-mysql-EbNVQww0JvR

# 2. Tools

- [percona/percona-toolkit: Percona Toolkit: a collection of advanced open source command-line tools.](https://github.com/percona/percona-toolkit)

# 3. Extensions (services)

- ProxySQL - Tăng tốc độ truy vấn dữ liệu SQL với replication

# 4. Storage engine

Trong MySQL, các storage engine cung cấp các cơ chế khác nhau để lưu trữ, quản lý và truy xuất dữ liệu. Dưới đây là so sánh của một số engine phổ biến:

**1. InnoDB**

• **Đặc điểm**: Đây là storage engine mặc định của MySQL kể từ phiên bản 5.5.
• **Hỗ trợ transaction**: Có, hỗ trợ ACID (Atomicity, Consistency, Isolation, Durability).
• **Khóa**: Sử dụng khóa theo hàng (row-level locking).
• **Chỉ mục**: Hỗ trợ chỉ mục khóa ngoài (foreign key constraints).
• **Tính năng nổi bật**: Khôi phục sau sự cố, hỗ trợ foreign key, tối ưu cho các tác vụ giao dịch.
• **Ưu điểm**: Phù hợp cho các hệ thống có lượng lớn giao dịch, đòi hỏi tính toàn vẹn dữ liệu và phục hồi sau lỗi.

**2. MyISAM**

• **Đặc điểm**: Là engine mặc định trước khi InnoDB được sử dụng.
• **Hỗ trợ transaction**: Không.
• **Khóa**: Sử dụng khóa theo bảng (table-level locking).
• **Chỉ mục**: Không hỗ trợ khóa ngoài, chỉ sử dụng chỉ mục tĩnh.
• **Tính năng nổi bật**: Hiệu suất cao cho các tác vụ đọc (read-heavy workloads), nhưng thiếu tính năng phục hồi dữ liệu.
• **Ưu điểm**: Tốc độ đọc rất nhanh, phù hợp cho các ứng dụng chủ yếu là đọc dữ liệu, không yêu cầu tính nhất quán giao dịch.

**3. MEMORY**

• **Đặc điểm**: Lưu trữ dữ liệu hoàn toàn trong bộ nhớ (RAM).
• **Hỗ trợ transaction**: Không.
• **Khóa**: Sử dụng khóa theo bảng.
• **Chỉ mục**: Hỗ trợ chỉ mục theo bảng.
• **Tính năng nổi bật**: Dữ liệu không được lưu trữ lâu dài, sẽ mất khi tắt máy chủ.
• **Ưu điểm**: Tốc độ cực kỳ nhanh cho các thao tác đọc và ghi tạm thời. Phù hợp cho dữ liệu tạm thời, phiên làm việc (session), hoặc dữ liệu trung gian.

**4. CSV**

• **Đặc điểm**: Lưu trữ dữ liệu dưới dạng tệp CSV (Comma-Separated Values).
• **Hỗ trợ transaction**: Không.
• **Khóa**: Không hỗ trợ khóa.
• **Chỉ mục**: Không hỗ trợ chỉ mục.
• **Tính năng nổi bật**: Đơn giản, dễ dàng xuất/nhập dữ liệu từ các file CSV.
• **Ưu điểm**: Phù hợp cho việc di chuyển hoặc trao đổi dữ liệu dưới định dạng tệp văn bản.

**5. ARCHIVE**

• **Đặc điểm**: Tối ưu cho lưu trữ dữ liệu lâu dài với dung lượng nhỏ.
• **Hỗ trợ transaction: Không.
• **Khóa**: Không hỗ trợ khóa ghi (write locking), chỉ có thể ghi vào bảng (INSERT), không hỗ trợ UPDATE hoặc DELETE.
• **Chỉ mục**: Không hỗ trợ chỉ mục.
• **Tính năng nổi bật**: Dữ liệu được nén lại khi lưu trữ, tiết kiệm không gian.
• **Ưu điểm**: Thích hợp cho việc lưu trữ dữ liệu lớn mà ít thay đổi, chẳng hạn như lưu trữ log.

**6. BLACKHOLE**

• **Đặc điểm**: Không lưu trữ bất kỳ dữ liệu nào, mọi dữ liệu được ghi vào đều bị “nuốt”.
• **Hỗ trợ transaction**: Không.
• **Khóa**: Không có.
• **Chỉ mục**: Không hỗ trợ chỉ mục.
• **Tính năng nổi bật**: Dữ liệu gửi vào engine này sẽ bị mất, thường được sử dụng để nhân rộng (replication) mà không cần lưu trữ bản sao.
• **Ưu điểm**: Thích hợp cho việc kiểm thử hoặc replication mà không cần lưu dữ liệu.

**7. MERGE**

• **Đặc điểm**: Là sự kết hợp của nhiều bảng MyISAM thành một bảng ảo.
• **Hỗ trợ transaction**: Không.
• **Khóa**: Khóa theo bảng (table-level locking).
• **Chỉ mục**: Phụ thuộc vào chỉ mục của các bảng MyISAM được kết hợp.
• **Tính năng nổi bật**: Cho phép kết hợp nhiều bảng có cấu trúc giống nhau thành một bảng ảo lớn.
• **Ưu điểm**: Thích hợp cho các hệ thống mà dữ liệu được chia thành nhiều bảng khác nhau, nhưng cần truy vấn như một bảng.

**8. FEDERATED**

• **Đặc điểm**: Cho phép kết nối với các bảng ở các máy chủ MySQL khác nhau.
• **Hỗ trợ transaction**: Không.
• **Khóa**: Phụ thuộc vào máy chủ từ xa.
• **Chỉ mục**: Phụ thuộc vào máy chủ từ xa.
• **Tính năng nổi bật**: Dữ liệu không được lưu trữ cục bộ mà được truy vấn từ máy chủ từ xa.
• **Ưu điểm**: Phù hợp cho việc liên kết dữ liệu giữa các cơ sở dữ liệu khác nhau mà không cần di chuyển dữ liệu.

**Tổng kết**

• **InnoDB**: Tối ưu cho các hệ thống cần giao dịch và sự toàn vẹn dữ liệu.
• **MyISAM**: Hiệu suất đọc cao, phù hợp với hệ thống chủ yếu đọc dữ liệu.
• **MEMORY**: Lưu trữ tạm thời trên RAM, rất nhanh nhưng không bền vững.
• **CSV**: Đơn giản và hữu ích cho nhập/xuất dữ liệu.
• **ARCHIVE**: Lưu trữ dữ liệu nén, thích hợp cho dữ liệu lớn, ít thay đổi.
• **BLACKHOLE**: Dùng để kiểm thử hoặc replication, không lưu trữ dữ liệu.
• **MERGE**: Kết hợp nhiều bảng MyISAM thành một bảng ảo.
• **FEDERATED**: Kết nối và truy vấn dữ liệu từ máy chủ MySQL từ xa.
