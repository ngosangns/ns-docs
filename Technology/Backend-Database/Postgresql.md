---
relates:
  - "[[Backend - Back-end]]"
  - "[[Database]]"
  - "[[ProxySQL Connection Multiplexing]]"
tags:
  - postgres
  - database
  - backend
  - back-end
  - performance-tuning
---
**PostgreSQL** (thường gọi là Postgres) là một hệ quản trị cơ sở dữ liệu quan hệ đối tượng (ORDBMS) mã nguồn mở mạnh mẽ và đáng tin cậy. Nó nổi tiếng với kiến trúc vững chắc, tuân thủ chuẩn SQL, tính năng phong phú và khả năng mở rộng cao.

# 1. Đặc điểm nổi bật

- **Tuân thủ ACID:** Đảm bảo tính toàn vẹn dữ liệu cho các giao dịch (Atomicity, Consistency, Isolation, Durability).
- **MVCC (Multi-Version Concurrency Control):** Cho phép nhiều người dùng truy cập và sửa đổi dữ liệu đồng thời mà ít bị chặn lẫn nhau.
- **Khả năng mở rộng:** Hỗ trợ nhiều kiểu dữ liệu phức tạp (JSON, XML, mảng, hstore), full-text search, và cho phép tạo kiểu dữ liệu, hàm, toán tử tùy chỉnh.
- **Tính năng nâng cao:** Hỗ trợ replication (streaming, logical), partitioning, indexing đa dạng (B-tree, Hash, GiST, SP-GiST, GIN, BRIN), stored procedures, triggers, foreign data wrappers (FDW).
- **Cộng đồng lớn mạnh:** Được phát triển và hỗ trợ bởi một cộng đồng toàn cầu năng động.

# 2. Tài nguyên học tập

- **Trang chủ:** [PostgreSQL Official Website](https://www.postgresql.org/)
- **Tài liệu chính thức:** [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- **Tutorials:** [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- **Blog/Bài viết:**
    - [Explaining the Postgres Meme](https://avestura.dev/blog/explaining-the-postgres-meme) (Giải thích về sự phổ biến của Postgres)
    - [PostgreSQL Performance Tuning Settings by Vlad Mihalcea](https://vladmihalcea.com/postgresql-performance-tuning-settings)

# 3. Tối ưu hiệu năng (Performance Tuning)

- Tham khảo bài viết [PostgreSQL Performance Tuning Settings](https://vladmihalcea.com/postgresql-performance-tuning-settings) để biết thêm chi tiết:
	- `shared_buffers`: Bộ nhớ đệm dùng chung cho các tiến trình PostgreSQL.
	- `work_mem`: Bộ nhớ cho các thao tác sắp xếp, hash join nội bộ trước khi ghi ra đĩa tạm.
	- `maintenance_work_mem`: Bộ nhớ cho các tác vụ bảo trì như `VACUUM`, `CREATE INDEX`.
	- `effective_cache_size`: Ước tính dung lượng bộ nhớ đệm của hệ điều hành và PostgreSQL có thể sử dụng.
	- `max_connections`: Số lượng kết nối tối đa đồng thời.
	- `checkpoint_completion_target` & `max_wal_size`: Quản lý hoạt động ghi WAL (Write-Ahead Logging).

# 4. Công cụ (Tools)

- **psql:** Công cụ dòng lệnh mặc định, mạnh mẽ của PostgreSQL.
- **pgAdmin:** Công cụ quản trị và phát triển mã nguồn mở phổ biến với giao diện đồ họa.
- **DBeaver:** Công cụ quản trị cơ sở dữ liệu đa năng, hỗ trợ nhiều loại CSDL bao gồm PostgreSQL.
- **Teable:** Giao diện quản trị dữ liệu dạng bảng (spreadsheet-like) cho Postgres ([GitHub](https://github.com/teableio/teable)).

# 5. Mở rộng và Dịch vụ (Extensions & Services)

## 5.1. Extensions phổ biến

- **PostGIS:** Hỗ trợ mạnh mẽ cho dữ liệu không gian địa lý (geospatial).
- **TimescaleDB:** Mở rộng cho dữ liệu chuỗi thời gian (time-series).
- **Citus Data:** Mở rộng để phân tán PostgreSQL thành cụm (distributed cluster).
- **pgvector:** Hỗ trợ lưu trữ và truy vấn vector embeddings cho các ứng dụng AI/ML.

## 5.2. Dịch vụ quản lý (Managed Services)

- **Amazon RDS for PostgreSQL**
- **Google Cloud SQL for PostgreSQL**
- **Azure Database for PostgreSQL**
- **Supabase:** Nền tảng Backend-as-a-Service xây dựng trên PostgreSQL.
- **Neon:** Serverless Postgres.

## 5.3. Công cụ liên quan

- **PgDog:** Quản lý phân mảnh (sharding) và connection pooling cho PostgreSQL ([GitHub](https://github.com/pgdogdev/pgdog)). Nó hoạt động như một transaction pooler và quản lý logical replication, được viết bằng Rust.

# 6. Neon - Serverless Postgres

Neon là một nền tảng **Serverless PostgreSQL** mã nguồn mở, được thiết kế như một giải pháp thay thế hiệu quả và linh hoạt cho các dịch vụ như AWS Aurora Postgres.

Github: https://github.com/neondatabase/neon

### 6.1.1. 🔍 Điểm nổi bật

- **Tách biệt Storage & Compute**: Kiến trúc của Neon phân chia rõ ràng giữa tầng compute (stateless PostgreSQL) và storage engine (pageserver + safekeeper), giúp hệ thống dễ dàng mở rộng và tối ưu tài nguyên ([github.com](https://github.com/neondatabase/neon?utm_source=chatgpt.com "neondatabase/neon - GitHub")).
- **Serverless & Autoscale**: Compute có thể **tự động scale** theo nhu cầu; thậm chí có thể scale-to-zero để tối ưu chi phí ([neon.com](https://neon.com/?utm_source=chatgpt.com "Neon Serverless Postgres — Ship faster")).
- **Open-source, viết bằng Rust**: Theo giấy phép Apache 2.0, hoàn toàn minh bạch và kiểm soát mã nguồn; core engine phát triển bằng Rust, đảm bảo hiệu suất và ổn định ([prisma.io](https://www.prisma.io/docs/orm/overview/databases/neon?utm_source=chatgpt.com "Neon | Prisma Documentation")).

### 6.1.2. 🛠 Thành phần chính

1. **Compute nodes** – các instance PostgreSQL được triển khai stateless, chịu trách nhiệm xử lý query.
2. **Safekeepers** – sao lưu WAL (Write-Ahead Log) một cách bền vững, đảm bảo dữ liệu không bị mất.
3. **Pageserver** – tái tạo và replay các WAL để phục vụ truy vấn đọc, đồng thời sao chép dữ liệu lên S3/S3-like storage ([semaphore.io](https://semaphore.io/blog/neon-database?utm_source=chatgpt.com "A First Look At Neon: a PostgreSQL database that branches")).

### 6.1.3. Công cụ & Tích hợp

- **neonctl**: CLI chính thức để quản lý project, branch, database, roles ngay từ terminal ([github.com](https://github.com/neondatabase/neonctl?utm_source=chatgpt.com "neondatabase/neonctl: Neon CLI tool. The Neon CLI is a command ...")).
- **GUI và API**: Quản trị tiện dụng qua giao diện Web Console hoặc gọi API.
- **Tích hợp với GitHub Actions**: Tự động tạo branch khi mở PR, áp migration, xóa branch khi đóng PR ([neon.com](https://neon.com/docs/guides/neon-github-integration?utm_source=chatgpt.com "The Neon GitHub integration - Neon Docs")).
- **Hỗ trợ Vercel, Prisma, Next.js**: Kết nối nhanh chóng và thuận tiện cho phát triển Web/Edge ([vercel.com](https://vercel.com/marketplace/neon?utm_source=chatgpt.com "vercel.com/marketplace/n...")).

### 6.1.4. 💡 Lợi ích khi sử dụng Neon

|Ưu điểm|Mô tả ngắn|
|---|---|
|**Tối ưu chi phí**|Scale theo nhu cầu, scale-to-zero|
|**Phát triển nhanh**|Branching + serverless giúp dev/test đơn giản|
|**Độ tin cậy cao**|Đảm bảo dữ liệu nhờ cơ chế WAL và safekeepers|
|**Tính mở & cộng đồng**|OSS, có CLI, API, tích hợp đa nền|

Neon là một bước tiến đáng kể trong thế giới PostgreSQL: serverless, autoscale, hỗ trợ branching như Git, phù hợp cho workflows hiện đại (CI/CD, dev/test sandbox, edge web...). Nếu bạn đang tìm kiếm cơ sở dữ liệu Postgres linh hoạt, dễ scale và thân thiện với developer, Neon là lựa chọn tuyệt vời để thử.