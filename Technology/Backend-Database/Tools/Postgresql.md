---
tags:
  - area/technology
  - domain/backend
  - topic/database
  - type/resource
  - lang/vi
---

# PostgreSQL

PostgreSQL là hệ quản trị cơ sở dữ liệu quan hệ đối tượng (ORDBMS) mã nguồn mở, mạnh mẽ và đáng tin cậy.

## Đặc điểm nổi bật

- **ACID**: Đảm bảo tính toàn vẹn dữ liệu - Xem [[ACID]]
- **MVCC**: Multi-Version Concurrency Control, cho phép nhiều người dùng truy cập đồng thời - Xem [[Transactions]]
- **Khả năng mở rộng**: Hỗ trợ JSON, XML, mảng, hstore, full-text search, kiểu dữ liệu tùy chỉnh
- **Tính năng nâng cao**: Replication (streaming, logical), partitioning, indexing đa dạng (B-tree, Hash, GiST, SP-GiST, GIN, BRIN), stored procedures, triggers, FDW
- **Cộng đồng lớn mạnh**: Phát triển và hỗ trợ bởi cộng đồng toàn cầu

## Tài nguyên học tập

- **Trang chủ**: [PostgreSQL Official Website](https://www.postgresql.org/)
- **Tài liệu**: [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- **Tutorials**: [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- **Blog/Bài viết**:
  - [Explaining the Postgres Meme](https://avestura.dev/blog/explaining-the-postgres-meme)
  - [PostgreSQL Performance Tuning Settings](https://vladmihalcea.com/postgresql-performance-tuning-settings)
  - [Document + Relational: PostgreSQL mang lại điều gì?](https://devops.vn/posts/document-relational-postgresql-mang-lai-dieu-gi/)

### PostgreSQL như một nền tảng đa năng

- **JSONB**: PostgreSQL 18 với JSONB đạt ~4,520 ops/s so với MongoDB 7.0 ~3,150 ops/s (nhanh hơn ~43%)
- **Full-text search**: PostgreSQL ~35ms so với Elasticsearch 8.11 ~25ms (chấp nhận được, kiến trúc đơn giản hơn)
- **Caching với UNLOGGED TABLE**: PostgreSQL 18 (UNLOGGED) ~71,000 ops/s so với Redis 7.2 ~95,000 ops/s (đủ tốt, lợi thế ACID)
- **Giao dịch ACID giữa các service**: Xử lý nhiều nghiệp vụ trong 1 transaction SQL, performance giảm từ ~260ms xuống ~40ms
- **Chi phí vận hành**: Stack đơn PostgreSQL giảm ~40% memory so với stack đa database

## Performance Tuning

- **shared_buffers**: Bộ nhớ đệm dùng chung
- **work_mem**: Bộ nhớ cho sắp xếp, hash join
- **maintenance_work_mem**: Bộ nhớ cho VACUUM, CREATE INDEX
- **effective_cache_size**: Ước tính dung lượng bộ nhớ đệm
- **max_connections**: Số lượng kết nối tối đa đồng thời
- **checkpoint_completion_target & max_wal_size**: Quản lý WAL

## Tools

- **psql**: Công cụ dòng lệnh mặc định
- **pgAdmin**: Công cụ quản trị với giao diện đồ họa
- **DBeaver**: Công cụ quản trị đa năng
- **Teable**: Giao diện quản trị dữ liệu dạng bảng - [GitHub](https://github.com/teableio/teable)

## Indexing

Xem thêm: [[Indexing]]

### BRIN Index (Block Range Index)

- **Khái niệm**: Loại index đặc biệt trong PostgreSQL, lưu trữ thông tin tóm tắt ở mức block thay vì từng record riêng lẻ
- **Cách hoạt động**:
  - Chia table thành các block (mặc định 128KB, mỗi block PostgreSQL là 8KB)
  - Lưu trữ giá trị min và max cho mỗi block
  - Giảm đáng kể kích thước index so với B-Tree (có thể tiết kiệm hơn 99% dung lượng)
- **Khi nào sử dụng**:
  - Dữ liệu có thứ tự tuần tự hoặc được sắp xếp (sequential data)
  - Dữ liệu time-series với timestamp tăng dần
  - Khi truy vấn theo phạm vi (range queries) trên dữ liệu tuần tự
  - Cần tối ưu hiệu năng với storage nhỏ nhất
- **Ưu điểm**:
  - Kích thước index rất nhỏ so với B-Tree
  - Hiệu năng tốt hơn B-Tree khi scan tuần tự
  - Phù hợp cho dữ liệu lớn có tính tuần tự
- **Nhược điểm**:
  - Không hiệu quả với dữ liệu ngẫu nhiên hoặc không có thứ tự
  - Cần dữ liệu được sắp xếp hoặc có pattern tuần tự

## Extensions

- **PostGIS**: Hỗ trợ dữ liệu không gian địa lý
- **TimescaleDB**: Mở rộng cho dữ liệu chuỗi thời gian
- **Citus Data**: Phân tán PostgreSQL thành cụm
- **pgvector**: Hỗ trợ lưu trữ và truy vấn vector embeddings cho AI/ML

## TOAST (The Oversized-Attribute Storage Technique)

- **Khái niệm**: Kỹ thuật trong PostgreSQL để quản lý các giá trị dữ liệu lớn vượt quá kích thước trang (8KB)
- **Mục đích**: Cho phép PostgreSQL lưu trữ các giá trị lớn mà không làm giảm hiệu suất của các thao tác trên các cột khác
- **Các kiểu dữ liệu sử dụng TOAST**:
  - Các kiểu dữ liệu có độ dài biến đổi như `text`, `varchar`, `json`, `jsonb`, `xml`
  - Các kiểu mảng (arrays)
  - Các kiểu dữ liệu hình học (geometric types)
  - Các kiểu dữ liệu tùy chỉnh lớn
- **Chiến lược TOAST**:
  - **PLAIN**: Lưu trữ dữ liệu trực tiếp trong trang, không nén hoặc lưu trữ ngoài (không thể dùng TOAST)
  - **EXTERNAL**: Lưu trữ dữ liệu ngoài trang mà không nén, phù hợp khi cần truy cập nhanh
  - **EXTENDED**: Nén dữ liệu và lưu trữ ngoài trang (chiến lược mặc định), tối ưu cho storage
  - **MAIN**: Nén dữ liệu và lưu trữ trong trang nếu có thể, nếu không thì lưu ngoài trang
- **Lựa chọn chiến lược**:
  - Phụ thuộc vào kích thước dữ liệu và yêu cầu hiệu suất
  - Chiến lược mặc định thường là `EXTENDED` để tối ưu storage
  - `EXTERNAL` phù hợp khi cần truy cập nhanh và không cần nén
  - Có thể thay đổi chiến lược bằng `ALTER TABLE ... SET STORAGE`
- **Tầm quan trọng**:
  - Hiểu về TOAST giúp tối ưu hóa hiệu suất và quản lý hiệu quả các cột có dữ liệu lớn
  - Ảnh hưởng đến cách PostgreSQL lưu trữ và truy xuất dữ liệu lớn
  - Quan trọng cho backend developers khi làm việc với dữ liệu lớn trong PostgreSQL

> https://levelup.gitconnected.com/why-knowing-toast-in-postgresql-is-necessary-for-backend-devs-340da420971a

## Managed Services

- Amazon RDS for PostgreSQL
- Google Cloud SQL for PostgreSQL
- Azure Database for PostgreSQL
- **Supabase**: Backend-as-a-Service xây dựng trên PostgreSQL
- **Neon**: Serverless Postgres

## High Availability

Xem thêm: [[Replication]]

### Patroni

- **Tổng quan**: Template/toolkit cho PostgreSQL High Availability, sử dụng Distributed Configuration Store (DCS) như Etcd, Consul, ZooKeeper hoặc Kubernetes
- **Tính năng chính**:
  - Quản lý failover tự động cho PostgreSQL cluster
  - Hỗ trợ nhiều DCS backends (etcd, Consul, ZooKeeper, Kubernetes)
  - Tự động phát hiện và xử lý sự cố
  - Quản lý replication và switchover
- **Use cases**:
  - Thiết lập PostgreSQL cluster với tính sẵn sàng cao
  - Tự động hóa failover và recovery
  - Quản lý multi-node PostgreSQL deployments
- **GitHub**: https://github.com/patroni/patroni
- **Best practices**: Xem thêm [[PostgreSQL HA Patroni Best Practices]]

## Công cụ liên quan

- **PgDog**: Quản lý sharding và connection pooling - [GitHub](https://github.com/pgdogdev/pgdog)
- **databasus**: Công cụ sao lưu cơ sở dữ liệu hỗ trợ PostgreSQL, MySQL và MongoDB
  - Sao lưu tự động và định kỳ
  - Khôi phục dữ liệu dễ dàng
  - Giao diện người dùng thân thiện
  - Cung cấp các tùy chọn cấu hình linh hoạt cho việc sao lưu và khôi phục
  - [GitHub](https://github.com/databasus/databasus) #backup #database #PostgreSQL #MySQL #MongoDB
  - [Website](https://databasus.com)

## Neon - Serverless Postgres

- **Tách biệt Storage & Compute**: Compute (stateless PostgreSQL) và storage engine (pageserver + safekeeper) tách biệt
- **Serverless & Autoscale**: Tự động scale theo nhu cầu, có thể scale-to-zero
- **Open-source, viết bằng Rust**: Apache 2.0 license
- **Thành phần**: Compute nodes, Safekeepers (WAL backup), Pageserver (replay WAL, replicate to S3)
- **Công cụ**: neonctl CLI, GUI và API, tích hợp GitHub Actions, hỗ trợ Vercel/Prisma/Next.js
- **Lợi ích**: Tối ưu chi phí, phát triển nhanh (branching), độ tin cậy cao, tính mở & cộng đồng
- **GitHub**: [neondatabase/neon](https://github.com/neondatabase/neon)
