---
tags:
  - area/technology
  - domain/backend
  - topic/database
  - type/resource
  - lang/vi
---

# Database

## Phân loại Database

- **Resources**:
  - [Understanding Database Types](https://blog.bytebytego.com/p/understanding-database-types)
  - [Mastering the Database Duality](https://blog.devgenius.io/mastering-the-database-duality-exploring-the-realm-of-sql-and-nosql-with-cheatsheet-33a73f752460)

| Database | SQL/NoSQL | Mô tả |
|----------|-----------|-------|
| SCYLLA | NoSQL | Xây dựng dựa trên Cassandra |
| Cassandra | NoSQL | |
| Supabase | NoSQL | Firebase Alternative |
| PostgreSQL | SQL | |
| TiDB | NewSQL | Thường dùng cho ecommerce, bank |
| Neo4j | Graph | Dành cho mạng xã hội hoặc truy vết |
| Clickhouse | SQL | OLAP - Online Analytical Processing |

## Mô hình lưu trữ NoSQL

- **Document database**: MongoDB, CouchDB
- **Key-value store**: Redis, LevelDB, RocksDB
- **Wide column**: Cassandra, Bigtable, HBase
- **Graph database**: JanusGraph, Neo4j, TigerGraph

## NewSQL

- Hệ quản trị cơ sở dữ liệu quan hệ hiện đại
- Khả năng mở rộng ngang (horizontal scalability) của NoSQL
- Duy trì ACID của RDBMS truyền thống

## Vector Database

- Thiết kế chuyên biệt để lưu trữ, quản lý, tìm kiếm vector embeddings
- **Chức năng**: Tìm kiếm tương đồng (similarity search) dựa trên cosine similarity, Euclidean distance
- **Ứng dụng**: Hệ thống gợi ý, tìm kiếm ngữ nghĩa, nhận dạng hình ảnh, phát hiện bất thường, Generative AI
- [Vector Database Video](https://www.youtube.com/watch?v=qslGfiM67dE)

## ACID

- **Atomicity**: Giao dịch thực hiện hoàn toàn hoặc không thực hiện chút nào
- **Consistency**: Dữ liệu tuân thủ quy tắc và ràng buộc
- **Isolation**: Các giao dịch đồng thời không ảnh hưởng lẫn nhau
- **Durability**: Dữ liệu đã commit được lưu trữ vĩnh viễn

## Index

- Cấu trúc dữ liệu giúp tăng tốc độ truy vấn
- **Resources**:
  - [Database Indexing Strategies](https://blog.bytebytego.com/p/database-indexing-strategies)
  - [Optimizing Database Performance](https://dev.to/abaron10/optimizing-database-performance-exploring-indexing-techniques-in-dbms-1emj)
  - [Nghệ thuật index MongoDB](https://viblo.asia/p/nghe-thuat-index-mongodb-5-ke-sach-co-the-cac-ha-chua-biet-Do754bnXZM6)
  - [Advanced Indexing Strategies in PostgreSQL](https://www.freecodecamp.org/news/postgresql-indexing-strategies)

### Clustered Index vs Non-Clustered Index

- **Clustered Index**:
  - Xác định thứ tự vật lý của dữ liệu
  - Mỗi bảng chỉ có một clustered index
  - Primary key thường tạo clustered index
  - [Tài liệu](https://viblo.asia/p/hieu-ve-clustered-index-bJzKmw9Bl9N)
- **Non-Clustered Index**:
  - Cấu trúc riêng biệt với dữ liệu bảng
  - Một bảng có thể có nhiều non-clustered index
  - Cần thêm không gian lưu trữ

### Cấu trúc Index trong MySQL

- **B-Tree Index**: Phổ biến nhất, hỗ trợ `=`, `>`, `>=`, `<`, `<=`, `BETWEEN`, `LIKE` (wildcard không ở đầu)
- **R-Tree Index**: Cho dữ liệu không gian (GEOMETRY, POINT, LINESTRING, POLYGON)
- **Hash Index**: Chỉ MEMORY engine, O(1) cho tìm kiếm chính xác, không hỗ trợ BETWEEN/ORDER BY
- **Inverted List (Full-Text Index)**: Cho FULLTEXT index trên cột văn bản
- [Tài liệu](https://viblo.asia/p/series-index-nang-cao-bai-2-dao-sau-vao-cac-cau-truc-du-lieu-dung-de-luu-tru-index-trong-mysql-r1QLxjYp4Aw)

### Lưu ý khi sử dụng Index

- **Sai lầm 1**: Đánh index quá nhiều → tăng chi phí INSERT/UPDATE/DELETE
- **Sai lầm 2**: Không đánh index cho WHERE/JOIN/ORDER BY
  - Tránh index cho: cột low cardinality, cột thường xuyên thay đổi, bảng nhỏ, LIKE với wildcard ở đầu, cột nhiều NULL
- **Sai lầm 3**: Sử dụng hàm trong WHERE trên cột đã index → không dùng được index
- [Tài liệu](https://viblo.asia/p/series-index-nang-cao-bai-1-phan-tich-nhung-sai-lam-pho-bien-khi-su-dung-index-trong-mysql-MkNLr237LgA)

## Locking

- Cơ chế quản lý truy cập đồng thời vào dữ liệu

### Cấp độ Locking

- **Table-level**: Khóa toàn bộ bảng, đơn giản nhưng hạn chế đồng thời
- **Page-level**: Khóa một trang dữ liệu, cân bằng
- **Row-level**: Khóa từng hàng, đồng thời cao nhất

### Chế độ Lock

- **Exclusive Lock (X Lock)**: Cho thao tác ghi, chỉ một giao dịch giữ được
- **Shared Lock (S Lock)**: Cho thao tác đọc, nhiều giao dịch có thể cùng giữ
- [Tài liệu](https://viblo.asia/p/010-exclusive-lock-va-shared-lock-924lJjn0lPM)

### Kiểu Lock

- **Pessimistic Locking**: Khóa tài nguyên ngay khi bắt đầu, đảm bảo nhất quán cao, giảm đồng thời
- **Optimistic Locking**: Không khóa khi đọc, kiểm tra version khi cập nhật, tăng đồng thời, cần retry logic
- **Advisory Lock**: Người dùng tự định nghĩa, thường dùng trong PostgreSQL
- [Tài liệu](https://viblo.asia/p/009-optimistic-lock-va-pessimistic-lock-L4x5xr7aZBM)

## Storage Engine (MySQL)

- **MyISAM**: Table-level locking, không ACID, không foreign keys, full-text search tốt, read-intensive
- **InnoDB**: Row-level locking, ACID đầy đủ, foreign keys, full-text search từ 5.6, mặc định từ 5.5, write-intensive
- **MEMORY**: Table-level locking, lưu trong RAM, Hash index mặc định, dữ liệu tạm thời
- [Tài liệu](https://viblo.asia/p/su-khac-nhau-giua-2-storage-engine-myisam-va-innodb-bJzKmgVPl9N)

## Transaction Isolation Levels

- **Read Uncommitted**: Đọc dữ liệu chưa commit, dirty read, mức thấp nhất
- **Read Committed**: Chỉ đọc dữ liệu đã commit, tránh dirty read, mặc định trong PostgreSQL/SQL Server
- **Repeatable Read**: Đảm bảo đọc lặp lại được, ngăn non-repeatable read, mặc định trong MySQL InnoDB
- **Serializable**: Mức cao nhất, đảm bảo tuần tự hóa, ngăn tất cả vấn đề đọc không nhất quán
- [Tài liệu](https://viblo.asia/p/014-postgresql-transaction-isolation-OeVKB67JKkW)

## MVCC (Multi-Version Concurrency Control)

- Kỹ thuật quản lý truy cập đồng thời hiệu quả
- Tạo phiên bản mới khi update/delete thay vì ghi đè
- Mỗi giao dịch có snapshot tại thời điểm bắt đầu
- **Lợi ích**: Tăng đồng thời, giảm xung đột khóa
- **Thách thức**: Quản lý phiên bản, phình to bảng (table bloat)
- [Tài liệu](https://viblo.asia/p/011-postgresql-multi-version-concurrency-control-6J3ZgdGLlmB)

## SQL

### Thứ tự thực thi câu lệnh SELECT

1. FROM và JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT/OFFSET

### Tối ưu hóa truy vấn SQL

- **Resources**:
  - [Mít đặc và biết tuốt về tối ưu SQL](https://viblo.asia/p/mit-dac-va-biet-tuot-noi-chuyen-ve-nhung-loi-don-trong-toi-uu-sql-zXRJ8rqOVGq)
  - [12 lý do khiến MySQL truy vấn chậm](https://viblo.asia/p/12-ly-do-khien-mysql-truy-van-cham-part-2-EvbLbxXv4nk)
  - [Performance Tuning SQL](https://viblo.asia/p/performance-tuning-sql-tai-sao-code-sql-cua-ong-ben-canh-lai-chay-nhanh-hon-minh-nhi-5pPLkxnyVRZ)

### Kỹ thuật tối ưu

- Sử dụng chính xác tên cột thay vì SELECT *
- Xem xét loại bỏ DISTINCT nếu không cần
- Chuyển sub-query thành JOIN khi có thể
- Sử dụng UNION ALL thay cho UNION
- Tránh OR cho nhiều điều kiện trên các cột khác nhau
- Paging: Sử dụng LIMIT/OFFSET hoặc cursor-based pagination
- Đưa vào cache
- Đặt index cho WHERE/JOIN/ORDER BY
- Dùng full-text search cho tìm kiếm văn bản
- Deferred Join: JOIN vào tập con đã được lọc và giới hạn

### Prepared Statements

- Sử dụng bind variables thay vì nối chuỗi
- **Lợi ích**: Tăng hiệu năng (reuse execution plan), bảo mật (chống SQL Injection)
- [Tài liệu](https://viblo.asia/p/bi-mat-lon-nhat-ve-tang-toc-do-cau-lenh-sql-ve-muc-mili-giay-cuc-hieu-qua-result-cache-WR5JRvMQJGv)

### Index cho Foreign Key

- Đảm bảo cột foreign key được đánh index
- Tránh full table scan khi kiểm tra tham chiếu
- [Tài liệu](https://wecommit.com.vn/foreign-key-no-index/)

### Tránh SELECT *

- Tăng network traffic, CPU usage, memory usage
- Cản trở tối ưu hóa, không thể dùng covering index hiệu quả

### "Điều kiện ngu" (Obfuscated Conditions)

- So sánh cột số với chuỗi số
- Áp dụng hàm lên cột đã index trong WHERE
- Kết hợp các cột không có index phù hợp

### Common Table Expressions (CTE)

- Định nghĩa tập kết quả tạm thời, có tên
- **Recursive CTE**: Cho dữ liệu phân cấp, cây
  - Anchor member: Khởi tạo
  - Recursive member: Mở rộng
  - [Tài liệu](https://data-fun.com/mysql-common-table-expression-with)
  - [Recursive CTE](https://kysuit.net/mysql/a-definitive-guide-to-mysql-recursive-cte)

## Kỹ thuật & Kiến trúc

### Sharding và Partitioning

- **Sharding**: Chia database thành nhiều shards độc lập trên các server khác nhau
  - Mục đích: Cải thiện hiệu năng, khả năng mở rộng, tính sẵn sàng
  - Nhược điểm: Tăng độ phức tạp, JOIN giữa shards khó khăn
  - [Tài liệu](https://viblo.asia/p/database-sharding-la-gi-Az45boQVKxY)
- **Partitioning**: Chia bảng thành nhiều partitions, quản lý như một bảng logic
  - Mục đích: Cải thiện hiệu năng truy vấn (query pruning), dễ quản lý dữ liệu
  - Loại: RANGE, LIST, HASH, KEY
  - [Tài liệu](https://viblo.asia/p/tang-toc-performance-query-sql-voi-partitions-WAyK89XEZxX)

### Database Replication

- **Synchronous**: Server chính đợi xác nhận từ tất cả server phụ → nhất quán cao, độ trễ cao
- **Asynchronous**: Server chính phản hồi ngay → độ trễ thấp, có thể mất dữ liệu
- **Master-Slave**: Một master ghi, nhiều slave đọc
- **Multi-Master**: Nhiều master đều có thể ghi, phức tạp hơn

### Full-Text Search

- Sử dụng inverted index
- Hỗ trợ tìm kiếm tự nhiên, cụm từ, boolean
- Bỏ qua stop words, hỗ trợ stemming
- Xếp hạng theo relevance scoring
- MySQL: Hỗ trợ bởi MyISAM và InnoDB (từ 5.6)
- [Tài liệu](https://viblo.asia/p/fulltext-search-trong-mysql-ap-dung-scout-va-algolia-07LKXNLElV4)

### Caching với Memcached

- Cache đối tượng trong bộ nhớ, phân tán
- Key-value đơn giản, đa luồng, không persistence
- So với Redis: Đơn giản hơn, có thể nhanh hơn cho caching thuần túy
- [Tài liệu](https://viblo.asia/p/memcached-redis-nen-dung-cai-nao-V3m5WjNylO7)

### Hierarchical Data

- **Adjacency List**: Mỗi hàng lưu parent_id, đơn giản nhưng truy vấn cây con phức tạp
- **Closure Table**: Lưu tất cả quan hệ tổ tiên-hậu duệ, truy vấn nhanh, chèn/xóa phức tạp
- **Nested Set Model**: Mỗi nút có left/right, truy vấn cây con nhanh, chèn/xóa/di chuyển tốn kém

## Database trong Microservices

### Reverse Proxy và Load Balancing

- **ProxySQL**: Reverse proxy hiệu năng cao cho MySQL, query routing, caching, sharding - [GitHub](https://github.com/sysown/proxysql)
- **HAProxy**: Load balancer TCP/HTTP - [GitHub](https://github.com/haproxy/haproxy)
- **Vitess**: Clustering MySQL, sharding, connection pooling - [GitHub](https://github.com/vitessio/vitess)

### Đồng bộ dữ liệu

- **Dataguard**: Giải pháp của Oracle Database cho high availability và disaster recovery
- Các hệ thống khác: Sử dụng replication

## Công nghệ liên quan

### GraphQL

- Ngôn ngữ truy vấn cho API, runtime phía server
- Client yêu cầu chính xác dữ liệu cần thiết
- Một endpoint duy nhất, hệ thống kiểu mạnh
- [Tài liệu Tập 1](https://www.goccuachung.com/top-10-cong-cu-trong-he-sinh-thai-graphql-tap-1)
- [Tài liệu Tập 2](https://www.goccuachung.com/top-10-cong-cu-trong-he-sinh-thai-graphql-tap-2)

### Apache Spark

- Framework tính toán phân tán, xử lý dữ liệu lớn
- In-memory distributed computing
- Hỗ trợ: Scala, Java, Python, R, SQL
- Thư viện: Spark SQL, Spark Streaming, MLlib, GraphX
- [Tài liệu](https://viblo.asia/p/tim-hieu-ve-apache-spark-ByEZkQQW5Q0)

## Các loại Database

- **DiceDB**: Redis-compliant, in-memory, real-time, reactive - [GitHub](https://github.com/dicedb/dice)
- **ScyllaDB**: NoSQL, xây dựng dựa trên Cassandra, C++, hiệu năng cao
- **Cassandra**: NoSQL phân tán, wide-column store, high availability
- **Supabase**: Thay thế Firebase mã nguồn mở, PostgreSQL-based - [Video](https://www.youtube.com/watch?v=dU7GwCOgvNY)
- **PostgreSQL**: ORDBMS mã nguồn mở, ACID, JSON, full-text search
- **TiDB**: NewSQL phân tán, tương thích MySQL, horizontal scaling
- **Neo4j**: Graph database, ngôn ngữ Cypher, mạng xã hội, gợi ý
- **SurrealDB**: Cloud-native, multi-model (relational, document, graph, key-value) - [Website](https://surrealdb.com)
- **Dgraph**: Graph database phân tán, GraphQL+- - [GitHub](https://github.com/dgraph-io/dgraph)
- **Apache HBase**: NoSQL phân tán, mô hình theo Bigtable, wide-column store - [Website](https://hbase.apache.org/)
- **Vitess**: Clustering MySQL, horizontal scaling - [GitHub](https://github.com/vitessio/vitess)
- **ClickHouse**: Columnar database, OLAP, hiệu suất cao
- **Convex Backend**: Backend mã nguồn mở, live-updating apps, sync engine - [GitHub](https://github.com/get-convex/convex-backend)

## Công cụ hỗ trợ

- **Docker Compose**: Thiết lập môi trường phát triển với nhiều loại database - [Tài liệu](https://viblo.asia/p/docker-compose-cho-cac-loai-database-pho-bien-qPoL78N1Vvk)
- **sqlc**: Auto-gen boilerplate SQL queries, type-safe - [Website](https://sqlc.dev)
- **AskDB**: Scan database và generate query bằng LLM - [GitHub](https://github.com/phanxuanquang/AskDB)

## Tài liệu tham khảo

- 8 điểm so sánh giữa MySQL và PostgreSQL
- Open Source Database - Ranking
- [Learning Database with Tran Quoc Huy](https://www.youtube.com/@tranquochuywecommit)

## Redis - Kỹ thuật scale

1. **Memory Fragmentation**: Bật activedefrag để giảm tới 40% bộ nhớ
2. **Connection Pooling**: Bắt buộc, giảm latency p95 từ 200ms xuống 5ms, tăng throughput từ 15K lên 85K ops/giây
3. **Pipelining**: Gom nhiều lệnh trong một request, giảm thời gian từ 2.3s xuống 45ms (cải thiện hơn 50 lần)
4. **Hash Tags**: Xử lý atomic operations trong Cluster, đặt key theo prefix:{tag}:id
5. **Monitoring**: Dashboard giám sát memory_usage > 85%, hit_rate < 95%
