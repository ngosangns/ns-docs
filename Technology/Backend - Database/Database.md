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

| Database     | SQL/NoSQL | Mô tả                                   |
| ------------ | --------- | --------------------------------------- |
| SCYLLA       | NoSQL     | Xây dựng dựa trên Cassandra             |
| Cassandra    | NoSQL     |                                         |
| Supabase     | NoSQL     | Firebase Alternative                    |
| PostgreSQL   | SQL       |                                         |
| TiDB         | NewSQL    | Thường dùng cho ecommerce, bank         |
| Neo4j        | Graph     | Dành cho mạng xã hội hoặc truy vết      |
| Clickhouse   | SQL       | OLAP - Online Analytical Processing     |
| Apache Pinot | SQL       | OLAP - Phân tích dữ liệu thời gian thực |

## Mô hình lưu trữ NoSQL

- **Document database**: MongoDB, CouchDB
- **Key-value store**: Redis, LevelDB, RocksDB
- **Wide column**: Cassandra, Bigtable, HBase
- **Graph database**: JanusGraph, Neo4j, TigerGraph

### Key-value store

- **DiskDB**: Cơ sở dữ liệu key-value hiệu suất cao dựa trên đĩa, được xây dựng bằng Rust và sử dụng RocksDB làm công cụ lưu trữ. Được thiết kế như một giải pháp thay thế cho Redis nhưng tối ưu hóa cho lưu trữ bền vững, cho phép thực hiện các thao tác đọc và ghi hiệu quả trực tiếp trên đĩa. Hỗ trợ Redis-compatible protocol, hiệu năng cao cho single operations và mixed workloads - [GitHub](https://github.com/transybao1393/DiskDB)

## NewSQL

- Hệ quản trị cơ sở dữ liệu quan hệ hiện đại
- Khả năng mở rộng ngang (horizontal scalability) của NoSQL
- Duy trì ACID của RDBMS truyền thống

## Vector Database

- Thiết kế chuyên biệt để lưu trữ, quản lý, tìm kiếm vector embeddings
- **Chức năng**: Tìm kiếm tương đồng (similarity search) dựa trên cosine similarity, Euclidean distance
- **Ứng dụng**: Hệ thống gợi ý, tìm kiếm ngữ nghĩa, nhận dạng hình ảnh, phát hiện bất thường, Generative AI
- [Vector Database Video](https://www.youtube.com/watch?v=qslGfiM67dE)
- **Dingo**: Hệ thống phân tán mã nguồn mở, cung cấp các dịch vụ và công cụ cho việc quản lý và xử lý dữ liệu lớn - [GitHub](https://github.com/MigoXLab/dingo)

## ElasticSearch

- **Plugin for Vietnamese**: [elasticsearch-analysis-vietnamese](https://github.com/duydo/elasticsearch-analysis-vietnamese)
- [Các phương pháp đồng bộ dữ liệu từ MySQL sang Elasticsearch](https://viblo.asia/p/cac-phuong-phap-dong-bo-du-lieu-tu-mysql-sang-elasticsearch-lua-chon-nao-danh-cho-ban-0gdJzYEn4z5)
- **Kuromoji Tokenizer**: Tokenizer tiếng Nhật tích hợp trong Elasticsearch với các chế độ: Search (tối ưu tìm kiếm), Normal (cân bằng), Extended (phân tích chi tiết)

## GraphQL

- **Tools**: [Altair](https://github.com/altair-graphql/altair) - GraphQL client
- **Frameworks**: [Hasura](https://hasura.io/) - Tự động tạo GraphQL API từ database
- **Clients**: [Relay](https://github.com/facebook/relay) - Framework JavaScript của Facebook để xây dựng ứng dụng React sử dụng GraphQL
- **Resources**: [Tools and services list](https://landscape.graphql.org)

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

> "Most MySQL indexes (PRIMARY KEY, UNIQUE, INDEX, and FULLTEXT) are stored in B-trees. Exceptions: Indexes on spatial data types use R-trees; MEMORY tables also support hash indexes; InnoDB uses inverted lists for FULLTEXT indexes."

#### B-Tree Index

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

#### R-Tree Index

- **Sử dụng cho**: Spatial data types (GEOMETRY, POINT, LINESTRING, POLYGON)
- **Lý do không dùng B-Tree**: B-Tree thiết kế cho dữ liệu một chiều, spatial data là đa chiều
- **Ứng dụng**: Tìm kiếm trong phạm vi không gian (ví dụ: nhà hàng trong bán kính 5km)
- **Ví dụ**:

```sql
CREATE SPATIAL INDEX idx_location ON restaurants(location);
SELECT * FROM restaurants
WHERE ST_Contains(ST_Buffer(@user_location, 5), location);
```

#### Hash Index

- **Chỉ hỗ trợ**: MEMORY storage engine
- **Đặc điểm**:
  - O(1) cho tìm kiếm chính xác (exact match)
  - MEMORY table lưu trên RAM → truy cập nhanh nhưng mất dữ liệu khi mất điện
- **Ưu điểm**: Tìm kiếm cực nhanh với `=`
- **Nhược điểm**:
  - Không hỗ trợ BETWEEN, ORDER BY
  - Không hỗ trợ truy vấn theo khoảng giá trị
- **Lưu ý**: MEMORY table vẫn có thể dùng B-Tree với `USING BTREE`

#### Inverted List (Full-Text Index)

- **Sử dụng cho**: FULLTEXT index trên cột văn bản (CHAR, VARCHAR, TEXT)
- **Lý do không dùng B-Tree**: B-Tree phù hợp với `=`, `BETWEEN`, `LIKE 'abc%'`, không phù hợp với tìm kiếm từ khóa trong text
- **Cách hoạt động**:
  - Lưu danh sách các từ (word) và ánh xạ với danh sách document chứa từ đó
  - Lưu thông tin vị trí (byte offset) để hỗ trợ proximity search
- **Cú pháp**: `MATCH(column) AGAINST('keyword')`
- **Tính năng**: Tính điểm relevance dựa trên số lần và vị trí xuất hiện
- **Lưu ý**: InnoDB sử dụng inverted list cho FULLTEXT index (không phải B-Tree)

#### Kết luận

- MySQL linh hoạt sử dụng nhiều cấu trúc dữ liệu khác nhau tùy theo use case
- B-Tree là lựa chọn mặc định vì cân bằng tốt giữa tốc độ và tính linh hoạt
- Các cấu trúc khác (R-Tree, Hash, Inverted List) được dùng cho các bài toán chuyên biệt

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

### Page và Row trong InnoDB

- **Page**:
  - Đơn vị lưu trữ cơ bản trong InnoDB
  - Kích thước mặc định là 16KB, có thể thay đổi thành 4KB, 8KB, 32KB hoặc 64KB
  - Tất cả dữ liệu trong bảng được lưu trữ trong các page

- **Row**:
  - Mỗi bảng bao gồm nhiều row, mỗi row được lưu trữ trong một page
  - Một page có thể chứa nhiều row
  - MySQL làm việc với page chứ không trực tiếp với row; khi truy vấn dữ liệu, MySQL sẽ lấy các page chứa row cần thiết để xử lý

- **Giới hạn độ dài Row**:
  - Độ dài tối đa của một row không vượt quá một nửa kích thước của một page
  - Với page 16KB (mặc định), row dài nhất khoảng 8KB
  - Với page 64KB, row dài nhất gần 32KB
  - Giới hạn này giúp tránh lãng phí không gian và tăng hiệu quả truy xuất dữ liệu

- **Off-page Storage (Khi Row vượt quá dung lượng tối đa)**:
  - Khi một row vượt quá dung lượng cho phép, các cột có định dạng VARCHAR, VARBINARY, BLOB hoặc TEXT (variable-length column) sẽ được lưu trữ bên ngoài page chính
  - Có hai loại định dạng off-page storage:

  - **COMPACT/REDUNDANT**:
    - Lưu 768 byte đầu tiên của cột trong page chính (page chứa row gốc)
    - Phần còn lại sau 768 byte được lưu trong các overflow pages
    - Thêm 20 byte con trỏ để lưu trữ độ dài thực tế của cột và trỏ đến danh sách overflow pages
    - Ưu điểm: Tốc độ truy cập nhanh với dữ liệu nhỏ (dưới 768 byte)
    - Nhược điểm: Tốn nhiều không gian trên page chính

  - **DYNAMIC/COMPRESSED**:
    - Toàn bộ dữ liệu cột được chuyển sang các overflow pages ngay từ đầu
    - Page chính chỉ lưu 20 byte con trỏ trỏ đến overflow pages
    - Ưu điểm: Tiết kiệm không gian trên page chính, tăng khả năng chứa nhiều row hơn trong một page, hiệu quả với cột dữ liệu lớn
    - Nhược điểm: Có thể làm giảm tốc độ truy cập dữ liệu do phải truy cập overflow pages

- [Tài liệu](https://viblo.asia/p/mysql-page-va-row-trong-innodb-EoW4oaw7Lml)

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

### Keyset Pagination (Truy Vấn Theo Last ID)

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

### Prepared Statements

- Sử dụng bind variables thay vì nối chuỗi
- **Lợi ích**: Tăng hiệu năng (reuse execution plan), bảo mật (chống SQL Injection)
- [Tài liệu](https://viblo.asia/p/bi-mat-lon-nhat-ve-tang-toc-do-cau-lenh-sql-ve-muc-mili-giay-cuc-hieu-qua-result-cache-WR5JRvMQJGv)

### Index cho Foreign Key

- Đảm bảo cột foreign key được đánh index
- Tránh full table scan khi kiểm tra tham chiếu
- [Tài liệu](https://wecommit.com.vn/foreign-key-no-index/)

### Tránh SELECT \*

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

### Case Study: MariaDB Performance Issue với Large Data Types

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

#### PostgreSQL Replication

- **Tổng quan**: Kỹ thuật sao chép dữ liệu từ máy chủ chính (master) sang các máy chủ sao chép (replica) để tăng khả năng chịu tải, đảm bảo tính sẵn sàng cao và khả năng phục hồi sau sự cố
- **Các loại Replication**:
  - **Streaming Replication**: Sao chép dữ liệu dựa trên việc truyền các bản ghi WAL (Write-Ahead Logging) trực tiếp từ máy chủ chính đến máy chủ sao chép. Có hai cách thực hiện: truyền theo đoạn WAL một lần (file-based) và truyền dựa trên các bản ghi WAL (record-based). Quá trình này diễn ra giữa WAL receiver trên máy chủ sao chép và WAL sender trên máy chủ chính qua TCP/IP
  - **Logical Replication**: Sao chép dữ liệu dựa trên các thay đổi cụ thể trong dữ liệu (INSERT, UPDATE, DELETE) thay vì sao chép toàn bộ cấu trúc. Hoạt động thông qua cơ chế publication (nhóm các thay đổi từ một hoặc nhiều bảng) và subscription (nơi lấy dữ liệu từ publication). Cho phép sao chép linh hoạt và chính xác hơn, giảm tải cho hệ thống
- **Chế độ Replication**:
  - **Asynchronous Replication**: Dữ liệu không được sao chép ngay lập tức sang máy chủ dự phòng, có thể xảy ra mất dữ liệu nhỏ nếu máy chủ dự phòng không kịp theo kịp với tốc độ của máy chủ chính. Phù hợp khi rủi ro mất dữ liệu nhỏ này chấp nhận được
  - **Synchronous Replication**: Mỗi cam kết của giao dịch ghi phải chờ xác nhận từ cả máy chủ chính và máy chủ dự phòng trước khi tiếp tục. Giảm thiểu nguy cơ mất dữ liệu nhưng tăng thời gian phản hồi cho mỗi giao dịch do phải chờ đợi xác nhận từ cả hai máy chủ
- **Sự sẵn sàng cao (High Availability)**:
  - **Load Balancing**: Sử dụng các công cụ để quản lý lưu lượng từ ứng dụng, tận dụng tối đa kiến trúc cơ sở dữ liệu, chuyển hướng đến các nút có sẵn/sống sót và xác định cổng với các vai trò khác nhau
  - **Cải thiện hiệu suất**: Sử dụng bộ quản lý kết nối tốt giữa ứng dụng và các máy chủ cơ sở dữ liệu để tối ưu hóa tài nguyên và đảm bảo thời gian phản hồi tốt nhất
- Nguồn: https://viblo.asia/p/postgresql-replication-tong-quan-va-co-che-hoat-dong-part-1-of-3-GAWVpyxo405

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

### Apache Pinot

- Cơ sở dữ liệu phân tán mã nguồn mở, được tạo ra tại LinkedIn vào giữa năm 2010, open-source vào năm 2015, tặng cho Apache Foundation vào năm 2019
- Thiết kế cho phân tích dữ liệu thời gian thực (OLAP - Online Analytical Processing)
- **Tính năng nổi bật**:
  - **Khả năng mở rộng**: Mở rộng theo chiều ngang bằng cách chia nhỏ dữ liệu thành các phân vùng và phân phối trên nhiều nút
  - **Truy vấn nhanh**: Sử dụng định dạng lưu trữ dạng cột (columnar storage), chỉ đọc các cột liên quan đến truy vấn, giảm thiểu lượng dữ liệu cần xử lý
  - **Xử lý thời gian thực**: Hỗ trợ ingestion và truy vấn dữ liệu real-time với độ trễ thấp
- **Kỹ thuật tối ưu hóa**:
  - **Inverted Index**: Cấu trúc dữ liệu giúp tìm kiếm nhanh, giống như mục lục sách, cho phép nhanh chóng xác định tệp phân đoạn và hàng chứa dữ liệu cho từng giá trị cụ thể
  - **Bloom Filter**: Công cụ kiểm tra nhanh xem một phần tử có khả năng nằm trong tập hợp dữ liệu hay không, giúp bỏ qua các tệp phân đoạn không chứa dữ liệu cần tìm, tiết kiệm thời gian và tài nguyên
  - **Data Sorting**: Sắp xếp dữ liệu theo cột thường được truy vấn để giảm thiểu số lượng tệp phân đoạn được truy cập
- **Case Study: Uber Job Counting**:
  - **Bài toán**: Đếm số lượng chuyến đi của từng tài xế trong các khoảng thời gian khác nhau (ngày, tuần, tháng) với hơn 150 triệu người dùng và gần 10 tỷ chuyến đi/năm
  - **Thách thức**:
    - Lượng dữ liệu khổng lồ, hàng triệu chuyến đi mỗi ngày
    - Yêu cầu truy vấn và phân tích dữ liệu thời gian thực với độ trễ thấp
    - Dữ liệu được lưu trữ trên các máy chủ khác nhau
  - **Giải pháp với Apache Pinot**:
    - Sử dụng inverted index cho các cột `provider_id` và `requester_id` để tăng tốc độ truy vấn
    - Bật bloom filter cho từng tệp phân đoạn dựa trên `provider_id` và `requester_id` để loại bỏ các tệp không liên quan
    - Sắp xếp dữ liệu theo cột `provider_id` để các chuyến đi của cùng một tài xế trong cùng một ngày được đặt trong cùng một tệp phân đoạn, giảm số lượng tệp cần truy cập
  - **Xử lý request đột biến**: Áp dụng kỹ thuật "jitter" (độ nhiễu) - thêm khoảng thời gian ngẫu nhiên vào thời gian chờ giữa các lần thử lại khi gặp lỗi, giúp các yêu cầu không dồn dập cùng lúc, giảm tải cho hệ thống
  - [Tài liệu](https://viblo.asia/p/job-counting-bai-toan-hoc-bua-ma-uber-giai-quyet-trong-tich-tac-018J2KDRLYK)
  - [Bài viết từ Uber](https://www.uber.com/en-VN/blog/job-counting-at-scale/)

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
- **ClickHouse**: Columnar database, OLAP, hiệu suất cao - [GitHub](https://github.com/ClickHouse/ClickHouse)
- **Apache Pinot**: OLAP database phân tán, phân tích dữ liệu thời gian thực, columnar storage - [Website](https://pinot.apache.org/)
- **Convex Backend**: Backend mã nguồn mở, live-updating apps, sync engine - [GitHub](https://github.com/get-convex/convex-backend)
- **QuestDB**: Time series database mã nguồn mở hiệu suất cao
  - **Tính năng chính:**
    - Nhập dữ liệu với độ trễ thấp và thông lượng cao
    - Công cụ lưu trữ đa tầng (multi-tier storage)
    - Hỗ trợ native cho Parquet và SQL
    - Dữ liệu dễ dàng di chuyển và sẵn sàng cho AI mà không bị khóa bởi nhà cung cấp
    - Được thiết kế để hoạt động gần với phần cứng nhất có thể
    - Loại bỏ các nút thắt trong quá trình nhập dữ liệu
    - Giảm yêu cầu phần cứng tổng thể
  - **Use cases:** Time series data, IoT, monitoring, financial data, real-time analytics
  - [GitHub](https://github.com/questdb/questdb) #time-series #database #high-performance #parquet #SQL

## Công cụ hỗ trợ

- **Docker Compose**: Thiết lập môi trường phát triển với nhiều loại database - [Tài liệu](https://viblo.asia/p/docker-compose-cho-cac-loai-database-pho-bien-qPoL78N1Vvk)
- **sqlc**: Auto-gen boilerplate SQL queries, type-safe - [Website](https://sqlc.dev)
- **AskDB**: Scan database và generate query bằng LLM - [GitHub](https://github.com/phanxuanquang/AskDB)
- **jason** (aurijs/jason): Công cụ giúp đơn giản hóa việc quản lý cơ sở dữ liệu, giảm bớt sự phức tạp trong việc xử lý dữ liệu - [GitHub](https://github.com/aurijs/jason)
- **RunSQL**: Môi trường trực tuyến để thực thi các truy vấn SQL trên các hệ quản trị cơ sở dữ liệu như MySQL, PostgreSQL và SQL Server
  - Hỗ trợ thực hành và học tập SQL
  - Giao diện web trực quan để viết và chạy queries
  - Website: https://runsql.com/ #SQL #online #database #practice

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
