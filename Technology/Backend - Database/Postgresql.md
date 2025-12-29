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

# PostgreSQL

PostgreSQL là hệ quản trị cơ sở dữ liệu quan hệ đối tượng (ORDBMS) mã nguồn mở, mạnh mẽ và đáng tin cậy.

## Đặc điểm nổi bật

- **ACID**: Đảm bảo tính toàn vẹn dữ liệu
- **MVCC**: Multi-Version Concurrency Control, cho phép nhiều người dùng truy cập đồng thời
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

## Công cụ

- **psql**: Công cụ dòng lệnh mặc định
- **pgAdmin**: Công cụ quản trị với giao diện đồ họa
- **DBeaver**: Công cụ quản trị đa năng
- **Teable**: Giao diện quản trị dữ liệu dạng bảng - [GitHub](https://github.com/teableio/teable)

## Extensions

- **PostGIS**: Hỗ trợ dữ liệu không gian địa lý
- **TimescaleDB**: Mở rộng cho dữ liệu chuỗi thời gian
- **Citus Data**: Phân tán PostgreSQL thành cụm
- **pgvector**: Hỗ trợ lưu trữ và truy vấn vector embeddings cho AI/ML

## Managed Services

- Amazon RDS for PostgreSQL
- Google Cloud SQL for PostgreSQL
- Azure Database for PostgreSQL
- **Supabase**: Backend-as-a-Service xây dựng trên PostgreSQL
- **Neon**: Serverless Postgres

## Công cụ liên quan

- **PgDog**: Quản lý sharding và connection pooling - [GitHub](https://github.com/pgdogdev/pgdog)

## Neon - Serverless Postgres

- **Tách biệt Storage & Compute**: Compute (stateless PostgreSQL) và storage engine (pageserver + safekeeper) tách biệt
- **Serverless & Autoscale**: Tự động scale theo nhu cầu, có thể scale-to-zero
- **Open-source, viết bằng Rust**: Apache 2.0 license
- **Thành phần**: Compute nodes, Safekeepers (WAL backup), Pageserver (replay WAL, replicate to S3)
- **Công cụ**: neonctl CLI, GUI và API, tích hợp GitHub Actions, hỗ trợ Vercel/Prisma/Next.js
- **Lợi ích**: Tối ưu chi phí, phát triển nhanh (branching), độ tin cậy cao, tính mở & cộng đồng
- **GitHub**: [neondatabase/neon](https://github.com/neondatabase/neon)
