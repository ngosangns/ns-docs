---
relates:
  - "[[MySQL]]"
  - "[[Postgresql]]"
---
# 1. Tổng quan về Cơ sở dữ liệu

## 1.1. Phân loại Cơ sở dữ liệu

- Understanding Database Types - https://blog.bytebytego.com/p/understanding-database-types
- Mastering the Database Duality: Exploring the Realm of SQL and 8 Different NoSQL Databases with…: https://blog.devgenius.io/mastering-the-database-duality-exploring-the-realm-of-sql-and-nosql-with-cheatsheet-33a73f752460?gi=ae1ed3a8bf2b

Bảng phân loại một số Database:

| Database   | SQL/NoSQL | Mô tả                                                            |
| ---------- | --------- | ---------------------------------------------------------------- |
| SCYLLA     | NoSQL     | Xây dựng dựa trên Cassandra                                      |
| Cassandra  | NoSQL     |                                                                  |
| Supabase   | NoSQL     | Firebase Alternative                                             |
| PostgresQL | SQL       |                                                                  |
| TiDB       | NewSQL    | Thường dùng cho ecommerce, bank                                  |
| Neo4j      | Graph     | Dành cho mạng xã hội hoặc truy vết                               |
| Clickhouse | SQL       | Xử lý phân tích trực tuyến (OLAP - Online Analytical Processing) |
|            |           |                                                                  |

## 1.2. Các mô hình lưu trữ NoSQL

Trong thế giới NoSQL - non-relational database, tính đến thời điểm hiện tại có 4 mô hình lưu trữ data là:
* Document database: MongoDB, CouchDB...
* Key - value store: Redis, LevelDB, RocksDB...
* Wide column: Cassandra, Bigtable, HBase...
* Graph database: JanusGraph, Neo4j, TigerGraph...

## 1.3. NewSQL

NewSQL là một loại hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) hiện đại, được thiết kế để cung cấp khả năng mở rộng theo chiều ngang (horizontal scalability) của các hệ thống NoSQL, trong khi vẫn duy trì các thuộc tính ACID (Atomicity, Consistency, Isolation, Durability) của các cơ sở dữ liệu quan hệ truyền thống.

## 1.4. Vector Database

- Vector Database là loại cơ sở dữ liệu được thiết kế chuyên biệt để lưu trữ, quản lý, và thực hiện tìm kiếm hiệu quả trên các dữ liệu dạng vector (vector embeddings). Các vector này thường là kết quả đầu ra từ các mô hình học máy, biểu diễn các đối tượng dữ liệu (như văn bản, hình ảnh, âm thanh) dưới dạng các điểm trong không gian nhiều chiều.
	- Chức năng chính: Tìm kiếm tương đồng (similarity search) dựa trên các độ đo khoảng cách vector như cosine similarity, Euclidean distance.
	- Ứng dụng: Hệ thống gợi ý, tìm kiếm ngữ nghĩa, nhận dạng hình ảnh, phát hiện bất thường, và các ứng dụng AI tạo sinh (Generative AI).
- Loại Database giúp Generative AI bùng nổ | Vector Database: https://www.youtube.com/watch?v=qslGfiM67dE

# 2. Các khái niệm cốt lõi trong Cơ sở dữ liệu

## 2.1. ACID

ACID là một tập hợp các tính chất quan trọng trong cơ sở dữ liệu để đảm bảo tính toàn vẹn và độ tin cậy của dữ liệu. ACID là viết tắt của Atomicity, Consistency, Isolation và Durability.
* Atomicity (Tính nguyên tử): Đảm bảo rằng các giao dịch được thực hiện hoàn toàn hoặc không được thực hiện chút nào. Nếu một phần của giao dịch thất bại, toàn bộ giao dịch sẽ bị hủy bỏ (rollback).
* Consistency (Tính nhất quán): Đảm bảo rằng dữ liệu phải tuân thủ các quy tắc và ràng buộc được xác định trước (ví dụ: khóa ngoại, ràng buộc check). Một giao dịch chuyển cơ sở dữ liệu từ một trạng thái hợp lệ này sang một trạng thái hợp lệ khác.
* Isolation (Tính cô lập): Đảm bảo rằng các giao dịch đang diễn ra đồng thời không ảnh hưởng lẫn nhau. Kết quả của việc thực thi đồng thời nhiều giao dịch phải tương đương với việc thực thi chúng một cách tuần tự.
* Durability (Tính bền vững): Đảm bảo rằng một khi giao dịch đã được cam kết (commit), dữ liệu sẽ được lưu trữ vĩnh viễn và không bị mất ngay cả khi có sự cố hệ thống (ví dụ: mất điện, crash server).

## 2.2. Index

Index là cấu trúc dữ liệu đặc biệt giúp tăng tốc độ truy vấn trong cơ sở dữ liệu bằng cách cho phép hệ quản trị cơ sở dữ liệu tìm kiếm dữ liệu nhanh hơn trên các cột được đánh chỉ mục, thay vì phải quét toàn bộ bảng.
- Database Indexing Strategies: https://blog.bytebytego.com/p/database-indexing-strategies
- Optimizing Database Performance: Exploring Indexing Techniques in DBMS: https://dev.to/abaron10/optimizing-database-performance-exploring-indexing-techniques-in-dbms-1emj
- Nghệ thuật index mongodb: 5 kế sách có thể các hạ chưa biết: https://viblo.asia/p/nghe-thuat-index-mongodb-5-ke-sach-co-the-cac-ha-chua-biet-Do754bnXZM6
- Advanced Indexing Strategies in PostgreSQL: https://www.freecodecamp.org/news/postgresql-indexing-strategies

### 2.2.1. Clustered Index và Non-Clustered Index

https://viblo.asia/p/hieu-ve-clustered-index-bJzKmw9Bl9N
* Clustered Index:
    * Xác định thứ tự vật lý của dữ liệu trong bảng. Dữ liệu của bảng được sắp xếp và lưu trữ dựa trên các giá trị của cột clustered index.
    * Các hàng dữ liệu thực sự được lưu trữ trong các trang lá (leaf pages) của cây B-tree của clustered index.
    * Mỗi bảng chỉ có thể có một clustered index.
    * Trong nhiều hệ quản trị cơ sở dữ liệu (như SQL Server, MySQL với InnoDB), khóa chính (primary key) mặc định sẽ tạo ra một clustered index.
    * Ưu điểm: Truy vấn theo cột clustered index hoặc theo một khoảng giá trị trên cột đó rất nhanh do dữ liệu đã được sắp xếp sẵn.
    * Nhược điểm: Các thao tác INSERT, UPDATE, DELETE có thể chậm hơn nếu chúng gây ra việc sắp xếp lại dữ liệu hoặc phân trang.
* Non-Clustered Index:
    * Là một cấu trúc dữ liệu riêng biệt với dữ liệu của bảng, chứa các giá trị của cột được đánh index và một con trỏ (row locator) đến vị trí thực sự của hàng dữ liệu tương ứng trong bảng (con trỏ này có thể là key của clustered index hoặc một định danh hàng vật lý).
    * Dữ liệu bảng không được sắp xếp theo thứ tự của non-clustered index.
    * Một bảng có thể có nhiều non-clustered index.
    * Ưu điểm: Tăng tốc độ truy vấn trên các cột được đánh index mà không phải là clustered index. Thao tác INSERT và UPDATE thường nhanh hơn so với clustered index vì không cần sắp xếp lại toàn bộ dữ liệu bảng (chỉ cần cập nhật cấu trúc index).
    * Nhược điểm: Cần thêm không gian lưu trữ cho cấu trúc index. Truy vấn có thể cần thêm một bước để tìm dữ liệu thực sự trong bảng sau khi tìm qua non-clustered index (key lookup hoặc bookmark lookup), trừ khi index đó là covering index.

### 2.2.2. Các loại cấu trúc dữ liệu Index trong MySQL

- SERIES INDEX NÂNG CAO - BÀI 2: ĐÀO SÂU VÀO CÁC CẤU TRÚC DỮ LIỆU DÙNG ĐỂ LƯU TRỮ INDEX TRONG MYSQL - https://viblo.asia/p/series-index-nang-cao-bai-2-dao-sau-vao-cac-cau-truc-du-lieu-dung-de-luu-tru-index-trong-mysql-r1QLxjYp4Aw
* B-Tree Index:
    * Cấu trúc index phổ biến nhất, được sử dụng mặc định cho hầu hết các storage engine (ví dụ: InnoDB, MyISAM) và kiểu dữ liệu.
    * Hỗ trợ hiệu quả các toán tử so sánh: `=`, `>`, `>=`, `<`, `<=`, `BETWEEN`, và `LIKE` với wildcard không ở đầu chuỗi.
    * Phù hợp cho các cột có độ chọn lọc cao (high cardinality).
* R-Tree Index:
    * Được sử dụng cho các kiểu dữ liệu không gian (spatial data types) như `GEOMETRY`, `POINT`, `LINESTRING`, `POLYGON` trong MySQL.
    * Cho phép truy vấn hiệu quả các dữ liệu không gian, ví dụ: tìm các đối tượng trong một khu vực nhất định (sử dụng các hàm như `ST_Contains`, `ST_Within`).
* Hash Index:
    * Chỉ được hỗ trợ bởi storage engine `MEMORY`.
    * Tạo ra một bảng băm dựa trên giá trị của cột được index.
    * Rất nhanh cho các truy vấn tìm kiếm chính xác (sử dụng toán tử `=`). Độ phức tạp thường là O(1).
    * Không hỗ trợ truy vấn theo khoảng giá trị (`BETWEEN`) hoặc sắp xếp (`ORDER BY`) vì dữ liệu không được sắp xếp.
    * Lưu ý: `MEMORY` table cũng hỗ trợ B-Tree index.
* Inverted List (Full-Text Index):
    * Được sử dụng cho `FULLTEXT` index trên các cột văn bản (`CHAR`, `VARCHAR`, `TEXT`) trong InnoDB và MyISAM.
    * Hoạt động bằng cách tạo một danh sách các từ (tokens) và ánh xạ chúng tới các tài liệu (hàng) chứa các từ đó.
    * Cho phép tìm kiếm toàn văn hiệu quả, bao gồm tính điểm liên quan (relevance score) dựa trên tần suất và vị trí xuất hiện của từ khóa.

### 2.2.3. Lưu ý khi sử dụng Index

- SERIES INDEX NÂNG CAO - BÀI 1: PHÂN TÍCH NHỮNG SAI LẦM PHỔ BIẾN KHI SỬ DỤNG INDEX TRONG MYSQL - https://viblo.asia/p/series-index-nang-cao-bai-1-phan-tich-nhung-sai-lam-pho-bien-khi-su-dung-index-trong-mysql-MkNLr237LgA
* Index là gì và tại sao quan trọng?
    * Index là cấu trúc dữ liệu giúp tăng tốc độ truy vấn trong cơ sở dữ liệu bằng cách cho phép tìm kiếm nhanh hơn trên các cột được đánh chỉ mục.
    * Ví dụ: Với bảng `users` chứa 1 triệu bản ghi, truy vấn `SELECT * FROM users WHERE name = 'Tờ Mờ Sáng học Lập trình';` sẽ nhanh hơn đáng kể nếu cột `name` được đánh index, giảm từ việc quét toàn bộ bảng xuống chỉ còn khoảng vài chục bước tìm kiếm (tùy thuộc vào cấu trúc cây index).
* Những sai lầm phổ biến khi sử dụng Index:
    * Sai lầm 1: Đánh index quá nhiều.
        * Mỗi index thêm vào sẽ tăng chi phí ghi dữ liệu (overhead) cho các thao tác `INSERT`, `UPDATE`, `DELETE` vì index cũng cần được cập nhật.
        * Tuy nhiên, trong một số trường hợp, việc đánh index cho cột sử dụng trong mệnh đề `WHERE` của câu lệnh `UPDATE` có thể cải thiện hiệu suất, vì index giúp tăng tốc phần lọc dữ liệu trong mệnh đề `WHERE`.
    * Sai lầm 2: Không đánh index cho các cột dùng trong `WHERE`, `JOIN`, `ORDER BY`.
        * Đây là những nơi cần đánh index nhất để cải thiện hiệu suất truy vấn.
        * Tuy nhiên, cần tránh đánh index cho:
            * Cột có tính phân bố thấp (low cardinality): Ví dụ như cột `gender` chỉ có giá trị 'M' hoặc 'F'. Đánh index cho cột này không mang lại lợi ích đáng kể vì mỗi giá trị xuất hiện quá nhiều lần.
            * Cột thường xuyên thay đổi giá trị: Ví dụ như cột `last_login` được cập nhật mỗi lần người dùng đăng nhập. Việc đánh index cho cột này sẽ làm tăng chi phí cập nhật index.
            * Bảng dữ liệu nhỏ: Nếu bảng chỉ có vài trăm bản ghi, việc đánh index có thể không cần thiết và full table scan có thể nhanh hơn.
            * Mệnh đề `WHERE` sử dụng `LIKE` với ký tự đại diện ở đầu: Ví dụ `WHERE name LIKE '%Sang'` sẽ không sử dụng được B-Tree index hiệu quả.
            * Cột có nhiều giá trị NULL: Nếu cột có tỷ lệ lớn giá trị NULL, index có thể không hiệu quả.
    * Sai lầm 3: Sử dụng hàm trong mệnh đề `WHERE` trên cột đã đánh index.
        * Việc sử dụng hàm như `YEAR(created_at) = 2025` sẽ làm MySQL (và nhiều DB khác) không thể sử dụng index trên cột `created_at`, dẫn đến quét toàn bộ bảng.
        * Thay vào đó, nên viết lại truy vấn để cột được index đứng một mình ở một vế của phép so sánh, ví dụ: `WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01';` để tận dụng index.
* Kết luận:
    * Index là công cụ mạnh mẽ để tối ưu hóa truy vấn, nhưng cần sử dụng một cách cẩn thận và hợp lý.
    * Tránh các sai lầm phổ biến như đánh index quá nhiều, không đánh index cho các cột cần thiết, hoặc sử dụng hàm trên cột đã đánh index làm mất khả năng sử dụng index.
    * Luôn kiểm tra kế hoạch thực thi truy vấn (execution plan) bằng cách sử dụng câu lệnh `EXPLAIN` (hoặc tương đương) để đảm bảo index được sử dụng hiệu quả.

## 2.3. Locking

Locking là cơ chế được sử dụng trong cơ sở dữ liệu để quản lý truy cập đồng thời vào dữ liệu, đảm bảo tính nhất quán và toàn vẹn dữ liệu khi có nhiều giao dịch cùng hoạt động.

### 2.3.1. Các cấp độ Locking (Lock Granularity)

* Table-level locking: Khóa toàn bộ bảng. Khi một giao dịch khóa bảng, không giao dịch nào khác có thể sửa đổi bảng đó. Đơn giản nhưng hạn chế tính đồng thời.
* Page-level locking: Khóa một trang dữ liệu (data page) trong bảng. Một trang thường chứa nhiều hàng. Cân bằng giữa table-level và row-level.
* Row-level locking: Khóa từng hàng riêng lẻ trong bảng. Cho phép mức độ đồng thời cao nhất vì chỉ các hàng đang được truy cập mới bị khóa. Tuy nhiên, quản lý nhiều khóa ở cấp độ hàng có thể tốn nhiều tài nguyên hơn.

### 2.3.2. Các chế độ Lock (Lock Modes)

- Exclusive lock và Shared lock - Viblo - Dat Bui - https://viblo.asia/p/010-exclusive-lock-va-shared-lock-924lJjn0lPM
* Exclusive Lock (X Lock - Khóa độc quyền):
	* Được sử dụng khi một giao dịch muốn đọc và ghi (sửa đổi hoặc xóa) dữ liệu.
	* Chỉ duy nhất một giao dịch có thể giữ X lock trên một tài nguyên tại một thời điểm.
	* Khi một tài nguyên bị X lock, không giao dịch nào khác có thể đặt bất kỳ loại khóa nào (kể cả S lock) lên tài nguyên đó.
* Shared Lock (S Lock - Khóa chia sẻ):
    * Được sử dụng khi một giao dịch muốn đọc dữ liệu và đảm bảo dữ liệu không bị thay đổi bởi giao dịch khác trong quá trình đọc.
    * Nhiều giao dịch có thể cùng giữ S lock trên cùng một tài nguyên.
    * Khi một tài nguyên có S lock, các giao dịch khác có thể đặt thêm S lock (để đọc), nhưng không thể đặt X lock (để ghi) cho đến khi tất cả S lock được giải phóng.

### 2.3.3. Các kiểu Lock (Locking Strategies/Types)

- Optimistic lock và Pessimistic lock - Viblo - Dat Bui - https://viblo.asia/p/009-optimistic-lock-va-pessimistic-lock-L4x5xr7aZBM
* Pessimistic Locking (Khóa bi quan):
    * Giả định rằng xung đột có khả năng xảy ra cao, vì vậy nó khóa tài nguyên ngay khi bắt đầu giao dịch (hoặc khi truy cập lần đầu) và giữ khóa cho đến khi giao dịch hoàn thành (commit hoặc rollback).
    * Nếu có bất kỳ giao dịch nào khác cố gắng truy cập vào tài nguyên đã bị khóa đó, chúng sẽ bị buộc phải chờ.
    * Ưu điểm: Đảm bảo tính nhất quán dữ liệu cao, tránh xung đột.
    * Nhược điểm: Giảm tính đồng thời, dễ xảy ra deadlock, tài nguyên có thể bị khóa lâu nếu không chủ động hủy giao dịch.
    * Thường được áp dụng với trường hợp có xác suất xung đột giao dịch cao để đảm bảo tính nhất quán dữ liệu và giảm thiểu việc phải thử lại (retry).
* Optimistic Locking (Khóa lạc quan):
    * Giả định rằng xung đột có khả năng xảy ra thấp. Nó không khóa tài nguyên khi đọc.
    * Khi một giao dịch muốn cập nhật dữ liệu, nó sẽ kiểm tra xem dữ liệu có bị thay đổi bởi một giao dịch khác kể từ lần đọc cuối cùng hay không (thường bằng cách sử dụng một cột version number hoặc timestamp).
    * Nếu dữ liệu đã bị thay đổi (xung đột), giao dịch hiện tại sẽ bị rollback và ứng dụng cần phải xử lý việc thử lại. Nếu không có thay đổi, cập nhật được thực hiện và version number được tăng lên.
    * Ưu điểm: Tăng tính đồng thời, giảm overhead của việc quản lý khóa.
    * Nhược điểm: Yêu cầu logic retry ở phía ứng dụng. Nếu xung đột xảy ra thường xuyên, hiệu suất có thể bị ảnh hưởng do phải rollback và retry nhiều lần. Optimistic lock thường chỉ kiểm tra xung đột trên các thao tác cập nhật, việc đọc vẫn có thể dẫn đến dữ liệu không nhất quán (stale read) nếu không cẩn thận.
    * Thường được áp dụng với trường hợp có xác suất xung đột giao dịch thấp, ưu tiên tính đồng thời cao. Lưu ý rằng quá trình kiểm tra version và cập nhật không phải là một thao tác nguyên tử nếu không được thiết kế cẩn thận.
* Advisory Lock:
    * Là một loại khóa do người dùng tự định nghĩa và quản lý, không phụ thuộc vào cơ chế khóa tự động của cơ sở dữ liệu đối với các đối tượng dữ liệu cụ thể.
    * Các ứng dụng hợp tác với nhau để sử dụng các khóa này nhằm đồng bộ hóa quyền truy cập vào một tài nguyên nào đó (có thể không phải là một hàng hay bảng cụ thể).
    * Cơ sở dữ liệu chỉ cung cấp cơ chế để tạo và giải phóng các khóa này, việc tuân thủ ý nghĩa của khóa là do logic ứng dụng.
    * Thường dùng trong PostgreSQL.

## 2.4. Storage Engine (Trong MySQL)

- Storage engine (hay table type) là thành phần phần mềm mà MySQL sử dụng để thực hiện các thao tác SQL trên bảng. Mỗi storage engine cung cấp các tính năng, ưu nhược điểm và hành vi khác nhau.
	- https://viblo.asia/p/su-khac-nhau-giua-2-storage-engine-myisam-va-innodb-bJzKmgVPl9N
* MyISAM:
    * Locking: Table-level locking (khóa toàn bộ bảng khi có thao tác ghi).
    * ACID Transactions: Không hỗ trợ giao dịch ACID. Các thao tác là không thể rollback.
    * Foreign Keys: Không hỗ trợ khóa ngoại.
    * Full-text search: Hỗ trợ tốt và hiệu quả cho tìm kiếm toàn văn.
    * Sử dụng: Thường phù hợp cho các ứng dụng có tỷ lệ đọc rất cao so với ghi (read-intensive), không yêu cầu tính toàn vẹn dữ liệu nghiêm ngặt thông qua giao dịch (ví dụ: một số loại blog, website danh mục, lưu trữ log). Nhanh hơn cho các thao tác `SELECT COUNT(*)` không có điều kiện `WHERE`.
* InnoDB:
    * Locking: Row-level locking (khóa ở cấp độ hàng), giúp tăng tính đồng thời cho các ứng dụng có nhiều thao tác ghi.
    * ACID Transactions: Hỗ trợ đầy đủ các thuộc tính ACID (commit, rollback, crash recovery).
    * Foreign Keys: Hỗ trợ khóa ngoại, đảm bảo tính toàn vẹn tham chiếu giữa các bảng.
    * Full-text search: Hỗ trợ từ MySQL 5.6.
    * Sử dụng: Là storage engine mặc định trong MySQL từ phiên bản 5.5. Phù hợp cho hầu hết các ứng dụng, đặc biệt là những ứng dụng yêu cầu tính toàn vẹn dữ liệu cao, có nhiều thao tác ghi, cập nhật, xóa (write-intensive), và cần giao dịch (ví dụ: ứng dụng thương mại điện tử, hệ thống ngân hàng, mạng xã hội).
* MEMORY (HEAP):
    * Locking: Table-level locking.
    * Data Storage: Lưu trữ tất cả dữ liệu trong RAM, giúp truy cập rất nhanh. Dữ liệu sẽ bị mất khi server MySQL khởi động lại hoặc tắt máy, trừ khi có cơ chế sao lưu đặc biệt.
    * Indexes: Mặc định sử dụng Hash index (nhanh cho tìm kiếm chính xác), nhưng cũng hỗ trợ B-Tree index.
    * Sử dụng: Phù hợp để lưu trữ dữ liệu tạm thời, bảng cache, hoặc các bảng trung gian cần truy cập nhanh trong các phiên làm việc. Ví dụ: lưu trữ số người dùng đang online, dữ liệu session tạm thời.

## 2.5. Transaction Isolation Levels (Mức độ cô lập giao dịch)

Mức độ cô lập giao dịch xác định cách mà một giao dịch được bảo vệ khỏi những thay đổi được thực hiện bởi các giao dịch khác đang chạy đồng thời. Chuẩn SQL định nghĩa bốn mức cô lập.
- PostgreSQL transaction isolation - Viblo - Dat Bui - https://viblo.asia/p/014-postgresql-transaction-isolation-OeVKB67JKkW
* Read Uncommitted (Đọc dữ liệu chưa commit):
    * Một giao dịch có thể đọc những thay đổi dữ liệu được thực hiện bởi các giao dịch khác ngay cả khi những thay đổi đó chưa được commit (dirty read).
    * Đây là mức cô lập thấp nhất, có thể dẫn đến nhiều vấn đề về dữ liệu không nhất quán.
    * Phù hợp cho các bài toán chấp nhận sai số dữ liệu hoặc khi hiệu năng là ưu tiên tuyệt đối và rủi ro dữ liệu bẩn là chấp nhận được. (PostgreSQL không hỗ trợ mức này thực sự, nó sẽ hoạt động như Read Committed).
* Read Committed (Đọc dữ liệu đã commit):
    * Một giao dịch chỉ nhìn thấy những thay đổi dữ liệu đã được commit bởi các giao dịch khác. Nó không thấy dữ liệu chưa commit (tránh dirty read).
    * Tuy nhiên, trong cùng một giao dịch, nếu một hàng được đọc nhiều lần, kết quả có thể khác nhau nếu một giao dịch khác đã commit thay đổi lên hàng đó giữa các lần đọc (non-repeatable read). Phantom reads cũng có thể xảy ra.
    * Đây là mức cô lập mặc định trong nhiều cơ sở dữ liệu như PostgreSQL, SQL Server, Oracle.
* Repeatable Read (Đọc lặp lại được):
    * Đảm bảo rằng nếu một giao dịch đọc một hàng nhiều lần, nó sẽ luôn thấy cùng một dữ liệu cho hàng đó (ngăn chặn non-repeatable read). Hệ thống đảm bảo rằng bất kỳ dữ liệu nào được đọc bởi giao dịch sẽ không thay đổi trong suốt thời gian giao dịch đó.
    * Tuy nhiên, vấn đề phantom read vẫn có thể xảy ra: một giao dịch khác có thể chèn các hàng mới khớp với điều kiện tìm kiếm của giao dịch hiện tại, và nếu giao dịch hiện tại thực hiện lại truy vấn đó, nó sẽ thấy các hàng "ma" mới xuất hiện.
    * Trong MySQL InnoDB, Repeatable Read là mức mặc định và nó giải quyết được cả phantom read nhờ cơ chế Next-Key Locking trong MVCC.
* Serializable (Tuần tự hóa):
    * Mức cô lập cao nhất. Đảm bảo rằng kết quả của việc thực thi đồng thời nhiều giao dịch là tương đương với việc thực thi chúng một cách tuần tự (một giao dịch kết thúc hoàn toàn trước khi giao dịch tiếp theo bắt đầu).
    * Ngăn chặn tất cả các hiện tượng đọc không nhất quán: dirty read, non-repeatable read, và phantom read.
    * Việc giám sát này có thể làm giảm đáng kể tính đồng thời và hiệu năng, và có thể gây tăng overhead. Nó cũng có thể dẫn đến lỗi "serialization failure" (ví dụ: deadlock hoặc xung đột cần rollback) thường xuyên hơn nếu có nhiều giao dịch cố gắng sửa đổi cùng một tập dữ liệu.

## 2.6. MVCC (Multi-Version Concurrency Control - Kiểm soát đồng thời đa phiên bản)

MVCC là một kỹ thuật nâng cao cho phép cơ sở dữ liệu quản lý truy cập đồng thời hiệu quả hơn so với các cơ chế khóa truyền thống.

- https://viblo.asia/p/011-postgresql-multi-version-concurrency-control-6J3ZgdGLlmB
* Nguyên tắc hoạt động:
    * Khi một hàng dữ liệu được cập nhật hoặc xóa, hệ thống không ghi đè lên dữ liệu cũ ngay lập tức hoặc xóa nó vật lý. Thay vào đó, nó tạo ra một phiên bản mới của hàng đó (cho update) hoặc đánh dấu hàng cũ là đã lỗi thời (cho delete).
    * Mỗi phiên bản của hàng thường có thông tin về giao dịch đã tạo ra nó (ví dụ: `xmin` - ID giao dịch tạo) và giao dịch đã "xóa" hoặc làm cho nó lỗi thời (ví dụ: `xmax` - ID giao dịch xóa).
    * Mỗi giao dịch khi bắt đầu sẽ được cấp một "ảnh chụp nhanh" (snapshot) của cơ sở dữ liệu tại thời điểm đó. Giao dịch chỉ "nhìn thấy" các phiên bản hàng phù hợp với snapshot của nó (tức là các phiên bản đã được commit trước khi giao dịch bắt đầu và chưa bị đánh dấu là đã xóa bởi một giao dịch khác cũng đã commit trước đó).
* Lợi ích:
    * Tăng tính đồng thời: Người đọc không chặn người viết và người viết không chặn người đọc. Nhiều giao dịch có thể truy cập cùng một dữ liệu mà không cần phải chờ đợi nhau (trong nhiều trường hợp).
    * Giảm xung đột khóa: Giảm nhu cầu sử dụng khóa đọc (shared locks) trong nhiều tình huống.
* Thách thức:
    * Quản lý phiên bản: Cần có cơ chế để dọn dẹp các phiên bản cũ không còn được bất kỳ giao dịch nào nhìn thấy (ví dụ: tiến trình `VACUUM` trong PostgreSQL).
    * Phình to bảng (Table Bloat): Nếu các phiên bản cũ không được dọn dẹp kịp thời, kích thước bảng có thể tăng lên đáng kể.
MVCC được sử dụng trong nhiều hệ quản trị cơ sở dữ liệu hiện đại như PostgreSQL, Oracle, MySQL (với InnoDB), SQL Server (với snapshot isolation).

# 3. Ngôn ngữ truy vấn SQL

## 3.1. Thứ tự thực thi câu lệnh SQL

Một câu lệnh `SELECT` phức tạp thường có vẻ được viết theo một thứ tự nhất định, nhưng thứ tự thực thi logic của các mệnh đề bởi hệ quản trị cơ sở dữ liệu thường khác. Hiểu rõ thứ tự này giúp viết truy vấn hiệu quả hơn.


Ví dụ câu lệnh:
```sql
SELECT   column_a, column_b, AGG_FUNC(column_c) AS alias_c
FROM     table1 t1
JOIN     table2 t2
ON       t1.join_column = t2.join_column
WHERE    filter_condition
GROUP BY column_a, column_b
HAVING   agg_filter_condition
ORDER BY alias_c ASC/DESC
LIMIT    count OFFSET N;
```


Thứ tự thực thi logic (có thể thay đổi tùy theo trình tối ưu hóa của DB, nhưng đây là thứ tự chung):
1. `FROM` và `JOIN`: Xác định và kết hợp các bảng nguồn. Các hàng từ `table1` được xử lý, sau đó các phép `JOIN` (INNER, LEFT, RIGHT, FULL) được áp dụng để tạo ra một tập dữ liệu làm việc trung gian. Mệnh đề `ON` được áp dụng ở bước này để lọc các cặp hàng từ các bảng được join.
2. `WHERE`: Lọc các hàng từ tập dữ liệu trung gian dựa trên các điều kiện được chỉ định. Chỉ những hàng thỏa mãn `filter_condition` mới được giữ lại.
3. `GROUP BY`: Nhóm các hàng còn lại dựa trên các giá trị chung trong các cột được chỉ định trong `GROUP BY`. Mỗi nhóm sẽ trở thành một hàng duy nhất trong kết quả tiếp theo.
4. `HAVING`: Lọc các nhóm được tạo bởi `GROUP BY`. Mệnh đề `HAVING` hoạt động tương tự `WHERE` nhưng áp dụng cho các nhóm sau khi đã tổng hợp (thường sử dụng các hàm tổng hợp như `SUM()`, `COUNT()`, `AVG()`).
5. `SELECT`: Chọn và tính toán các cột/biểu thức sẽ xuất hiện trong kết quả cuối cùng. Các hàm tổng hợp (ví dụ: `AGG_FUNC(column_c)`) được tính toán ở bước này (nếu có `GROUP BY`) hoặc trên toàn bộ tập kết quả (nếu không có `GROUP BY`). Các bí danh (alias) cho cột được định nghĩa ở đây.
6. `DISTINCT` (nếu có): Loại bỏ các hàng trùng lặp khỏi tập kết quả.
7. `ORDER BY`: Sắp xếp các hàng trong tập kết quả dựa trên các cột hoặc bí danh được chỉ định.
8. `LIMIT` / `OFFSET` (hoặc tương đương như `TOP`, `ROWNUM`): Giới hạn số lượng hàng trả về và bỏ qua một số hàng đầu tiên.

## 3.2. Tối ưu hóa truy vấn SQL

- Mít đặc và biết tuốt nói chuyện về những lời đồn trong tối ưu SQL: https://viblo.asia/p/mit-dac-va-biet-tuot-noi-chuyen-ve-nhung-loi-don-trong-toi-uu-sql-zXRJ8OZO4Gq
- 12 lý do khiến MySQL truy vấn chậm - Part 2: https://viblo.asia/p/12-ly-do-khien-mysql-truy-van-cham-part-2-EvbLbxXv4nk

## 3.3. Các kỹ thuật chung

Tham khảo: [Performance Tuning SQL] Tại sao code SQL của ông bên cạnh lại chạy nhanh hơn mình nhỉ?: https://viblo.asia/p/performance-tuning-sql-tai-sao-code-sql-cua-ong-ben-canh-lai-chay-nhanh-hon-minh-nhi-5pPLkxnyVRZ
* Sử dụng chính xác tên cột cần truy vấn thay vì dùng `SELECT * FROM`. Điều này giảm lượng dữ liệu truyền tải và xử lý.
* Xem xét nếu không cần thiết dùng `DISTINCT`. `DISTINCT` yêu cầu sắp xếp hoặc hashing để loại bỏ trùng lặp, tốn thêm chi phí.
* Nếu có thể thì hãy loại bỏ các truy vấn con (Sub-query), cân nhắc chuyển thành `JOIN`. Trình tối ưu hóa của DB hiện đại thường xử lý tốt subquery, nhưng đôi khi viết lại bằng `JOIN` có thể rõ ràng hơn hoặc cho phép tối ưu tốt hơn.
* Sử dụng `UNION ALL` thay cho `UNION` nếu bạn chắc chắn không có hàng trùng lặp hoặc không cần loại bỏ trùng lặp. `UNION` sẽ thực hiện một thao tác loại bỏ trùng lặp (tương tự `DISTINCT`) trên kết quả kết hợp.
* Không nên sử dụng `OR` cho các mệnh đề nhiều điều kiện trên các cột khác nhau nếu có thể. Đôi khi việc tách thành nhiều câu truy vấn và dùng `UNION ALL` có thể hiệu quả hơn, hoặc sử dụng index trên từng cột. Tuy nhiên, trình tối ưu hóa hiện đại có thể xử lý `OR` tốt hơn.
* Paging (Phân trang): Sử dụng `LIMIT` và `OFFSET` (hoặc các cú pháp tương đương) để chỉ lấy một phần dữ liệu cần thiết, thay vì lấy toàn bộ rồi xử lý ở client.
    * Lấy dữ liệu theo con trỏ (Cursor-based pagination / Keyset pagination): Thay vì dùng `OFFSET`, gửi ID (hoặc giá trị cột được sắp xếp) của bản ghi cuối cùng của trang trước, và truy vấn các bản ghi "lớn hơn" (hoặc "nhỏ hơn") ID đó. Ví dụ: `WHERE id > last_seen_id ORDER BY id LIMIT page_size`. Cách này thường hiệu quả hơn `OFFSET` với các tập dữ liệu lớn vì `OFFSET` vẫn phải quét qua N bản ghi đầu tiên.
* Đưa vào cache: Lưu trữ kết quả của các truy vấn thường xuyên hoặc tốn kém vào bộ nhớ cache (ví dụ: Redis, Memcached) để giảm tải cho DB.
* Đưa xuống backend/client xử lý: Một số thao tác tính toán hoặc định dạng dữ liệu có thể được thực hiện ở tầng ứng dụng (backend) hoặc client thay vì trong DB nếu điều đó hợp lý và giảm tải cho DB.
* Đặt index: Xem mục 2.2. Index.
* Dùng full-text search: Cho các tìm kiếm văn bản phức tạp. Xem mục 4.3. Full-Text Search.
* Dùng Deferred Join: Kỹ thuật tối ưu `JOIN` bằng cách `JOIN` vào một tập con của bảng (đã được lọc và giới hạn) thay vì toàn bộ bảng. Thường áp dụng khi có `LIMIT` và `ORDER BY` trên một bảng lớn, sau đó mới `JOIN` để lấy thêm thông tin.
Tham khảo thêm các bài viết tối ưu hóa cụ thể:
* Tối ưu thời gian tải 1 trang web từ 7 phút còn 1 giây như thế nào?: https://viblo.asia/p/toi-uu-thoi-gian-tai-1-trang-web-tu-7-phut-con-1-giay-nhu-the-nao-y37LdxMRLov
* Cách hiển thị hiệu quả các bảng dữ liệu lớn: Tối ưu hóa hiệu suất từ 12 phút đến 300 mili giây: https://viblo.asia/p/cach-hien-thi-hieu-qua-cac-bang-du-lieu-lon-toi-uu-hoa-hieu-suat-tu-12-phut-den-300-mili-giay-0gdJz7okLz5
* Phân tích, xử lý bài toán thực tế trên bảng SQL với hơn 5 triệu hàng: https://viblo.asia/p/phan-tich-xu-ly-bai-toan-thuc-te-tren-bang-sql-voi-hon-5-trieu-hang-y37LdxbNLov

### 3.3.1. Sử dụng biến trong query expression (Result Cache / Prepared Statements)

Tham khảo: Bí mật lớn nhất về tăng tốc độ câu lệnh SQL về mức mili giây cực hiệu quả: RESULT CACHE: https://viblo.asia/p/bi-mat-lon-nhat-ve-tang-toc-do-cau-lenh-sql-ve-muc-mili-giay-cuc-hieu-qua-result-cache-WR5JRvMQJGv
Tham khảo: Tối ưu cơ sở dữ liệu cải thiện 97% thời gian thực hiện chỉ bằng một “chấm nhẹ” thế nào? - WE COMMIT: https://wecommit.com.vn/database-performance-tuning-speed-up-97/
Sử dụng Prepared Statements (câu lệnh chuẩn bị sẵn) với các tham số (bind variables) thay vì nối chuỗi các giá trị trực tiếp vào câu SQL.
* Lợi ích:
    * Tăng hiệu năng: Cơ sở dữ liệu có thể phân tích (parse) và tối ưu hóa kế hoạch thực thi (execution plan) cho câu SQL một lần. Các lần thực thi sau với các giá trị tham số khác nhau có thể tái sử dụng kế hoạch đã được cache này, giảm thời gian phân tích và tối ưu hóa.
    * Bảo mật: Giúp ngăn chặn tấn công SQL Injection vì các giá trị tham số được xử lý riêng biệt với cấu trúc câu lệnh SQL.
Ví dụ (pseudo-code):
Không nên: `query = "SELECT * FROM users WHERE name = '" + userName + "';" `
Nên: `query = "SELECT * FROM users WHERE name = ?;"` (sau đó truyền `userName` làm tham số)

### 3.3.2. Index cho Foreign Key

Tham khảo: Foreign Key no index - Performance issue (wecommit.com.vn): https://wecommit.com.vn/foreign-key-no-index/
Khi tạo một Foreign Key (khóa ngoại) trên một cột ở bảng con, hãy đảm bảo rằng cột đó (hoặc các cột nếu là khóa ngoại phức hợp) được đánh index.
* Lý do:
    * Khi xóa hoặc cập nhật một bản ghi ở bảng cha (cụ thể là giá trị của cột mà khóa ngoại tham chiếu tới), cơ sở dữ liệu cần kiểm tra xem có bản ghi nào ở bảng con đang tham chiếu đến giá trị đó không (để thực hiện các hành động như `ON DELETE CASCADE`, `ON UPDATE SET NULL`, hoặc đơn giản là ngăn chặn thao tác nếu có tham chiếu).
    * Nếu cột khóa ngoại ở bảng con không có index, cơ sở dữ liệu sẽ phải thực hiện quét toàn bộ bảng con (full table scan) để tìm các bản ghi liên quan. Điều này rất chậm, đặc biệt với các bảng con có nhiều dữ liệu.
    * Việc quét bảng con không có index có thể gây ra khóa (lock) kéo dài trên bảng con, ảnh hưởng đến hiệu suất của các session khác đang cố gắng truy cập bảng đó.
* Lưu ý: Một số hệ quản trị cơ sở dữ liệu (ví dụ: MySQL với InnoDB) tự động tạo index trên cột khóa ngoại. Tuy nhiên, một số khác (ví dụ: PostgreSQL) không tự động làm điều này, vì vậy bạn cần phải tự tạo index một cách tường minh.

### 3.3.3. Tránh `SELECT *`

Việc sử dụng `SELECT *` có thể gây ra nhiều hệ lụy về hiệu năng và bảo trì:
* Increased network traffic: Truyền tải nhiều dữ liệu hơn mức cần thiết qua mạng.
* Increased CPU usage on client side: Client phải xử lý nhiều dữ liệu hơn.
* Some query plan optimizations not possible: Có thể cản trở một số tối ưu hóa của DB, ví dụ như không thể sử dụng covering index hiệu quả.
* Server-side memory usage: DB server cần nhiều bộ nhớ hơn để giữ các cột không cần thiết.
* Increased CPU usage on server side: DB server tốn thêm CPU để đọc và xử lý các cột không dùng đến.
* Hard parsing/optimization takes more time: Nếu cấu trúc bảng thay đổi, các truy vấn `SELECT *` có thể bị ảnh hưởng hoặc trả về kết quả không mong muốn.
* Cached cursors take more memory in shared pool: Con trỏ được cache có thể lớn hơn.
* LOB Fetching: Nếu bảng có các cột LOB (Large Object) và bạn dùng `SELECT *`, các LOB này cũng sẽ được lấy về dù không cần, gây tốn kém.

### 3.3.4. "Điều kiện ngu" (Obfuscated Conditions)

Đây là các điều kiện trong mệnh đề `WHERE` được viết theo cách mà trình tối ưu hóa của DB không thể sử dụng index hiệu quả, mặc dù cột đó đã được đánh index.
Tham khảo:
* Tăng tốc database index phần 16.2 - Điều kiện ngu (Obfuscated Conditions) với Numeric Strings
* Tăng tốc database index phần 16.3 - Điều kiện ngu (Obfuscated Conditions) với Combining Columns
Ví dụ:
* So sánh một cột số với một chuỗi số: `numeric_column = '123'` thay vì `numeric_column = 123`. Điều này có thể buộc DB phải chuyển đổi kiểu dữ liệu, làm mất khả năng dùng index.
* Áp dụng hàm hoặc phép toán lên cột được index trong mệnh đề `WHERE`: `WHERE YEAR(date_column) = 2023` thay vì `WHERE date_column >= '2023-01-01' AND date_column < '2024-01-01'`.
* Kết hợp các cột trong mệnh đề `WHERE` mà không có index phù hợp: `WHERE first_name || ' ' || last_name = 'John Doe'` thay vì có một cột `full_name` được index hoặc sử dụng các kỹ thuật tìm kiếm khác.

## 3.4. Common Table Expressions (CTE)

CTE cho phép bạn định nghĩa một tập kết quả tạm thời, có tên, mà bạn có thể tham chiếu đến trong một câu lệnh SQL duy nhất (ví dụ: `SELECT`, `INSERT`, `UPDATE`, `DELETE`). CTE giúp truy vấn trở nên dễ đọc và dễ quản lý hơn, đặc biệt với các truy vấn phức tạp.

### 3.4.1. CTE cơ bản

Sử dụng từ khóa `WITH`.
Tham khảo: Học SQL cho Data Anslyst - Sức mạnh của lệnh With và MySQL CTE (data-fun.com): https://data-fun.com/mysql-common-table-expression-with
Ví dụ:
```sql
WITH RegionalSales AS (
    SELECT region, SUM(amount) AS total_sales
    FROM orders
    GROUP BY region
)
SELECT region, total_sales
FROM RegionalSales
WHERE total_sales > (SELECT AVG(total_sales) FROM RegionalSales);
```

### 3.4.2. Recursive CTE (CTE đệ quy)

Recursive CTE cho phép bạn thực hiện các truy vấn đệ quy, thường được sử dụng để xử lý dữ liệu có cấu trúc phân cấp hoặc dạng đồ thị (ví dụ: cây tổ chức, danh mục sản phẩm đa cấp).
Một recursive CTE bao gồm:
1. Anchor member: Một hoặc nhiều truy vấn không đệ quy, khởi tạo tập kết quả ban đầu.
2. Recursive member: Một hoặc nhiều truy vấn tham chiếu đến chính CTE đó, mở rộng tập kết quả.
3. Điều kiện dừng: Logic ngầm hoặc tường minh để kết thúc đệ quy.
4. `UNION ALL` (thường là) để kết hợp anchor member và recursive member.
Tham khảo: Giới thiệu và cách sử dụng MySQL Recursive CTE - Hello, world! I'm Viet NT (kysuit.net): https://kysuit.net/mysql/a-definitive-guide-to-mysql-recursive-cte
Ví dụ (tìm tất cả nhân viên dưới quyền một quản lý):

```sql
WITH RECURSIVE EmployeeHierarchy (employee_id, employee_name, manager_id, level) AS (
    -- Anchor member: chọn người quản lý gốc
    SELECT id, name, manager_id, 0
    FROM employees
    WHERE manager_id IS NULL -- Hoặc một manager_id cụ thể
    UNION ALL
    -- Recursive member: tìm nhân viên báo cáo cho những người trong cấp hiện tại
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM EmployeeHierarchy;
```

# 4. Kỹ thuật và Kiến trúc Cơ sở dữ liệu

## 4.1. Sharding và Partitioning

Cả sharding và partitioning đều là kỹ thuật chia nhỏ dữ liệu để cải thiện quản lý và hiệu năng, nhưng chúng khác nhau về phạm vi và cách thực hiện.

### 4.1.1. Database Sharding

Sharding là một kỹ thuật phân tán dữ liệu theo chiều ngang (horizontal scaling), chia một cơ sở dữ liệu lớn thành nhiều phần nhỏ hơn gọi là shards. Mỗi shard là một cơ sở dữ liệu độc lập, thường nằm trên một server riêng, chứa một tập con của dữ liệu.
Tham khảo: Database sharding là gì?: https://viblo.asia/p/database-sharding-la-gi-Az45boQVKxY
Tham khảo: MySQL sharding at Quora: https://quoraengineering.quora.com/MySQL-sharding-at-Quora
* Mục đích: Cải thiện hiệu năng (phân tán tải), khả năng mở rộng (thêm server mới để tăng dung lượng/thông lượng), và tính sẵn sàng (nếu một shard gặp sự cố, các shard khác vẫn hoạt động).
* Cách hoạt động: Dữ liệu được phân chia dựa trên một "sharding key". Khi ứng dụng truy vấn dữ liệu, một thành phần trung gian (router hoặc logic trong ứng dụng) sẽ xác định shard nào chứa dữ liệu cần thiết và điều hướng truy vấn đến shard đó.
* Ưu điểm: Tăng đáng kể khả năng đọc/ghi đồng thời, giảm kích thước mỗi DB, cải thiện tốc độ truy vấn trên từng shard.
* Nhược điểm: Tăng độ phức tạp của hệ thống (quản lý các shard, định tuyến truy vấn). Các thao tác `JOIN` dữ liệu giữa các shard khác nhau trở nên khó khăn và tốn kém. Việc re-sharding (thay đổi số lượng shard hoặc cách phân chia dữ liệu) có thể phức tạp. Đảm bảo tính nhất quán giao dịch trên nhiều shard là một thách thức.

### 4.1.2. Database Partitioning

Partitioning là kỹ thuật chia một bảng lớn trong một cơ sở dữ liệu thành nhiều phần nhỏ hơn gọi là partitions, nhưng tất cả các partition này vẫn được quản lý như một bảng logic duy nhất và thường nằm trên cùng một server cơ sở dữ liệu.
Tham khảo: Tăng tốc performane query SQL với Partitions - Viblo: https://viblo.asia/p/tang-toc-performance-query-sql-voi-partitions-WAyK89XEZxX
Tham khảo: MySql Partitioning - Nói chung là cũng nhàn: https://viblo.asia/p/mysql-partitioning-noi-chung-la-cung-nhan-m68Z0aW9lkG
* Mục đích: Cải thiện hiệu năng truy vấn (thông qua "query pruning" - trình tối ưu hóa chỉ quét các partition liên quan đến điều kiện truy vấn) và dễ quản lý dữ liệu (ví dụ: xóa dữ liệu cũ bằng cách drop một partition, nhanh hơn nhiều so với `DELETE FROM ... WHERE ...`).
* Cách hoạt động: Dữ liệu trong bảng được phân chia vào các partition dựa trên một "partition key" và một quy tắc phân vùng (ví dụ: theo khoảng giá trị, danh sách giá trị, hoặc hàm băm).
* Các loại partitioning phổ biến trong MySQL: RANGE, LIST, HASH, KEY, và các biến thể COLUMNS.
* Lợi ích: Tăng tốc truy vấn khi điều kiện `WHERE` khớp với partition key. Quản lý dữ liệu (lưu trữ, sao lưu, xóa) hiệu quả hơn cho các tập dữ liệu lớn.
* Lưu ý: Partitioning không phải lúc nào cũng tăng hiệu năng và có thể làm phức tạp thiết kế. Cần phân tích kỹ workload và cấu trúc dữ liệu trước khi áp dụng.

## 4.2. Database Replication (Nhân bản Cơ sở dữ liệu)

Database Replication là một kỹ thuật hoặc nguyên lý thiết kế được sử dụng trong việc mở rộng (scale) và tăng tính sẵn sàng (high availability) của cơ sở dữ liệu bằng cách duy trì các bản sao (replicas) của dữ liệu trên nhiều server cơ sở dữ liệu khác nhau.

Các loại Database Replication dựa trên thời điểm đồng bộ:
* Synchronous Replication (Nhân bản đồng bộ):
    * Hoạt động: Máy khách (Client) gửi yêu cầu ghi dữ liệu đến server chính (master/primary). Server chính ghi dữ liệu và sau đó sao chép dữ liệu đó đến tất cả các server phụ (slave/secondary). Server chính chỉ gửi thông báo hoàn thành về cho máy khách sau khi tất cả các server phụ đã xác nhận hoàn thành việc sao chép dữ liệu.
    * Ưu điểm: Đảm bảo tính nhất quán dữ liệu cao trên tất cả các server (dữ liệu trên tất cả các server là giống nhau tại mọi thời điểm sau khi ghi thành công). Không có mất mát dữ liệu nếu server chính gặp sự cố (vì dữ liệu đã được ghi an toàn trên các server phụ).
    * Khuyết điểm: Độ trễ ghi (write latency) cao hơn vì server chính phải đợi xác nhận từ tất cả các server phụ. Nếu một server phụ nào đó gặp sự cố hoặc chậm phản hồi, toàn bộ quá trình ghi có thể bị chậm lại hoặc thất bại (tùy cấu hình).
* Asynchronous Replication (Nhân bản bất đồng bộ):
    * Hoạt động: Máy khách (Client) gửi yêu cầu ghi dữ liệu đến server chính. Server chính ghi dữ liệu và gửi thông báo hoàn thành về cho máy khách ngay lập tức (hoặc rất nhanh). Sau đó, việc sao chép dữ liệu thay đổi mới được thực hiện ngầm đến các server phụ.
    * Ưu điểm: Độ trễ ghi thấp, phản hồi cho máy khách nhanh chóng. Ít ảnh hưởng đến hiệu năng của server chính.
    * Khuyết điểm: Có khả năng mất mát dữ liệu (data loss) nếu server chính gặp sự cố trước khi dữ liệu kịp sao chép đến các server phụ. Có một khoảng trễ (replication lag) giữa server chính và các server phụ, nghĩa là dữ liệu trên server phụ có thể không phải là mới nhất (eventual consistency).

Các loại Replication Environment (Môi trường nhân bản):
* Master-Slave Replication (Nhân bản Chủ-Tớ):
    * Một server đóng vai trò là master (chủ), nơi tất cả các thao tác ghi (INSERT, UPDATE, DELETE) được thực hiện.
    * Một hoặc nhiều server khác đóng vai trò là slaves (tớ), sao chép dữ liệu từ master. Các slave thường được sử dụng cho các thao tác đọc (read-only) để giảm tải cho master.
    * Đây là mô hình phổ biến nhất.
* Multi-Master Replication (Nhân bản Đa Chủ):
    * Nhiều server (nodes) đều đóng vai trò là master, nghĩa là máy khách có thể thực hiện cả việc đọc và ghi dữ liệu trên bất kỳ master node nào.
    * Dữ liệu thay đổi trên một master sẽ được đồng bộ hóa với các master khác. Việc đồng bộ này có thể là synchronous hoặc asynchronous.
    * Ưu điểm: Tăng tính sẵn sàng cho việc ghi (nếu một master gặp sự cố, các master khác vẫn có thể nhận ghi). Cải thiện hiệu năng ghi bằng cách phân tán tải ghi.
    * Khuyết điểm: Phức tạp hơn trong việc quản lý và giải quyết xung đột dữ liệu (conflict resolution) nếu cùng một dữ liệu được sửa đổi đồng thời trên các master khác nhau, đặc biệt khi sử dụng asynchronous replication.

## 4.3. Full-Text Search

Full-Text Search (FTS) là một kỹ thuật tìm kiếm cho phép người dùng tìm kiếm các từ hoặc cụm từ trong nội dung văn bản lớn (ví dụ: bài viết, mô tả sản phẩm) một cách hiệu quả và linh hoạt hơn so với tìm kiếm bằng toán tử `LIKE` truyền thống.
Tham khảo:
* Giới thiệu:
    * https://freetuts.net/full-text-search-trong-mysql-2763.html
    * https://wiki.tino.org/full-text-search-la-gi
* Chi tiết cách hoạt động: https://viblo.asia/p/fulltext-search-trong-mysql-ap-dung-scout-va-algolia-07LKXNLElV4
* Thực hành: https://viblo.asia/p/cach-tao-database-searches-voi-full-text-search-trong-mysql-OeVKBowrZkW
* Đặc điểm:
    * Sử dụng index đặc biệt (thường là inverted index) để tăng tốc độ tìm kiếm. Inverted index lưu trữ danh sách các từ và ánh xạ chúng tới các tài liệu (hàng) chứa các từ đó.
    * Hỗ trợ tìm kiếm tự nhiên (natural language search), tìm kiếm theo cụm từ, tìm kiếm boolean.
    * Có khả năng bỏ qua các từ không quan trọng (stop words) như "và", "là", "thì".
    * Hỗ trợ stemming (đưa các biến thể của từ về dạng gốc, ví dụ: "running", "ran" về "run").
    * Xếp hạng kết quả tìm kiếm theo mức độ liên quan (relevance scoring) dựa trên các yếu tố như tần suất xuất hiện của từ khóa, vị trí của từ khóa.
* Trong MySQL:
    * Hỗ trợ bởi storage engine MyISAM và InnoDB (từ phiên bản 5.6).
    * Sử dụng cú pháp `MATCH (column_list) AGAINST (search_string [IN BOOLEAN MODE | IN NATURAL LANGUAGE MODE ...])`.
    * Cần tạo `FULLTEXT` index trên các cột muốn tìm kiếm.

## 4.4. Caching với Memcached

Memcached là một hệ thống cache đối tượng trong bộ nhớ, phân tán, mã nguồn mở, hiệu năng cao, được sử dụng để tăng tốc các ứng dụng web động bằng cách giảm tải cho cơ sở dữ liệu.
Tham khảo:
* Memcached & Redis: Nên dùng cái nào?: https://viblo.asia/p/memcached-redis-nen-dung-cai-nao-V3m5WjNylO7
* Memcache và cơ chế hoạt động: https://securityzone.vn/t/memcache-va-co-che-hoat-dong.548
* Đặc điểm chính của Memcached:
    * Lưu trữ key-value: Dữ liệu được lưu trữ dưới dạng cặp khóa-giá trị trong RAM.
    * Đơn giản: Giao thức và tập lệnh đơn giản, dễ sử dụng.
    * Hiệu năng cao: Truy cập dữ liệu từ RAM rất nhanh.
    * Phân tán: Có thể chạy trên nhiều server, tạo thành một cụm cache lớn. Client có thể sử dụng thuật toán hashing để xác định server nào lưu trữ key cụ thể.
    * Đa luồng (multi-threaded): Có thể xử lý nhiều yêu cầu đồng thời.
    * Không có persistence: Dữ liệu trong Memcached sẽ mất khi server restart hoặc dịch vụ dừng, vì nó chỉ lưu trong RAM.
    * Kiểu dữ liệu: Chủ yếu hỗ trợ kiểu dữ liệu string.
* So sánh với Redis:
    * Redis hỗ trợ nhiều kiểu dữ liệu phức tạp hơn (lists, sets, hashes, sorted sets, etc.), có cơ chế persistence (lưu dữ liệu xuống đĩa), hỗ trợ transaction, pub/sub, và nhiều tính năng nâng cao khác.
    * Memcached thường được coi là đơn giản hơn và có thể nhanh hơn một chút cho các tác vụ caching key-value thuần túy do kiến trúc đa luồng của nó trong một số trường hợp.
* Khi nào dùng Memcached:
    * Khi cần một giải pháp caching đơn giản, hiệu năng cao cho các đối tượng nhỏ, không yêu cầu persistence dữ liệu cache.
    * Khi ứng dụng có thể hưởng lợi từ kiến trúc đa luồng của Memcached cho việc xử lý nhiều kết nối đồng thời.

## 4.5. Dữ liệu dạng cây - Hierarchical data

Dữ liệu dạng cây (hay dữ liệu phân cấp) là loại dữ liệu mà các phần tử được tổ chức theo cấu trúc cha-con. Ví dụ: sơ đồ tổ chức công ty, danh mục sản phẩm đa cấp, cây thư mục.
Có nhiều cách để biểu diễn và truy vấn dữ liệu dạng cây trong cơ sở dữ liệu quan hệ:
* Adjacency List (Danh sách kề):
    * Mỗi hàng lưu trữ một ID của chính nó và một ID của cha (parent_id).
    * Đơn giản để thiết kế và chèn/cập nhật một nút.
    * Truy vấn để lấy toàn bộ cây con hoặc cây cha của một nút thường yêu cầu truy vấn đệ quy (ví dụ: sử dụng Recursive CTE) hoặc nhiều truy vấn lồng nhau, có thể không hiệu quả với cây sâu.
* Closure Table (Bảng đóng bao):
    * Lưu trữ tất cả các mối quan hệ tổ tiên-hậu duệ trong một bảng riêng. Bảng này có các cột như `ancestor_id`, `descendant_id`, và `depth` (độ sâu của mối quan hệ).
    * Ví dụ, nếu A là cha của B, và B là cha của C, bảng closure sẽ có các hàng: (A,A,0), (A,B,1), (A,C,2), (B,B,0), (B,C,1), (C,C,0).
    * Truy vấn lấy cây con hoặc cây cha rất nhanh (thường chỉ cần một `JOIN`).
    * Chèn/xóa một nút phức tạp hơn vì cần cập nhật nhiều hàng trong bảng closure. Cần nhiều không gian lưu trữ hơn.
* Nested Set Model (Mô hình tập lồng nhau):
    * Mỗi nút được gán hai giá trị: `left` (lft) và `right` (rgt). Các giá trị này được xác định bằng cách duyệt cây theo thứ tự pre-order. Nút con sẽ có `left` và `right` nằm giữa `left` và `right` của nút cha. `right` của một nút luôn lớn hơn `left` của nó.
    * Truy vấn lấy toàn bộ cây con của một nút rất nhanh: `SELECT * FROM tree WHERE lft BETWEEN node.lft AND node.rgt;`.
    * Chèn/xóa/di chuyển một nút rất tốn kém vì có thể yêu cầu cập nhật lại giá trị `left` và `right` của nhiều nút khác trong cây.
    * Khó hiểu và khó triển khai hơn so với Adjacency List.

# 5. Cơ sở dữ liệu trong kiến trúc Microservices

## 5.1. Reverse Proxy và Load Balancing cho Database

Trong kiến trúc microservices hoặc các hệ thống cơ sở dữ liệu có nhiều replicas, việc sử dụng reverse proxy và load balancer cho database giúp:
* Phân phối tải (Load Balancing): Chia đều các yêu cầu truy vấn đến các server database khác nhau (ví dụ: các read replicas), tránh quá tải cho một server duy nhất.
* Tính sẵn sàng cao (High Availability): Nếu một server database gặp sự cố, load balancer có thể tự động chuyển hướng truy vấn đến các server còn hoạt động.
* Đơn giản hóa cấu hình client: Client chỉ cần kết nối đến một địa chỉ duy nhất của proxy/load balancer, không cần biết về các server database cụ thể.
* Một số tính năng khác: Connection pooling, query caching, query routing (ví dụ: chuyển hướng query ghi đến master, query đọc đến slave), query rewriting, SQL firewall.
Một số công cụ:
* ProxySQL: Một reverse proxy hiệu năng cao, nhận biết giao thức SQL cho MySQL và các biến thể của nó. Cung cấp các tính năng như query routing, query caching, sharding.
    * GitHub: https://github.com/sysown/proxysql
* HAProxy: Một load balancer và reverse proxy mã nguồn mở, phổ biến, có thể sử dụng cho TCP và HTTP. Có thể dùng để cân bằng tải cho các kết nối database ở tầng TCP.
    * GitHub: https://github.com/haproxy/haproxy
* Vitess: Một hệ thống clustering cơ sở dữ liệu cho MySQL, cung cấp khả năng mở rộng theo chiều ngang, sharding, connection pooling, và query routing.
    * GitHub: https://github.com/vitessio/vitess

## 5.2. Đồng bộ dữ liệu giữa các node

Trong các hệ thống phân tán hoặc có nhiều bản sao dữ liệu, việc đồng bộ dữ liệu giữa các node là rất quan trọng.
* Dataguard: Đây là một giải pháp của Oracle Database, cung cấp một bộ dịch vụ toàn diện để tạo, duy trì, quản lý và giám sát một hoặc nhiều standby database (bản sao) để bảo vệ dữ liệu của Oracle database chính khỏi bị lỗi, thảm họa, lỗi người dùng và hỏng hóc dữ liệu. Nó thường được sử dụng cho high availability và disaster recovery.
Đối với các hệ thống khác, các cơ chế replication (xem mục 4.2) là phương pháp chính để đồng bộ dữ liệu.

# 6. Công nghệ liên quan

## 6.1. GraphQL

GraphQL là một ngôn ngữ truy vấn cho API và một runtime phía server để thực thi các truy vấn đó bằng cách sử dụng một hệ thống kiểu (type system) bạn định nghĩa cho dữ liệu của mình. GraphQL không phải là một cơ sở dữ liệu, mà là một lớp nằm giữa client và các nguồn dữ liệu (có thể là DB, microservices, hoặc các API khác).
* Đặc điểm:
    * Client yêu cầu chính xác dữ liệu cần thiết: Tránh over-fetching (lấy quá nhiều dữ liệu) và under-fetching (phải gọi nhiều endpoint để lấy đủ dữ liệu) thường gặp với REST API.
    * Một endpoint duy nhất: Thường chỉ có một endpoint cho tất cả các yêu cầu GraphQL.
    * Hệ thống kiểu mạnh: Dữ liệu được mô tả bằng một schema với các kiểu rõ ràng.
    * Introspection: Client có thể truy vấn schema để biết những dữ liệu nào có sẵn.
Tham khảo:
* Top 10 công cụ trong hệ sinh thái GraphQL (Tập 1): https://www.goccuachung.com/top-10-cong-cu-trong-he-sinh-thai-graphql-tap-1
* Top 10 công cụ trong hệ sinh thái GraphQL (Tập 2): https://www.goccuachung.com/top-10-cong-cu-trong-he-sinh-thai-graphql-tap-2

## 6.2. Apache Spark

Tham khảo: Tìm hiểu về Apache Spark (viblo.asia): https://viblo.asia/p/tim-hieu-ve-apache-spark-ByEZkQQW5Q0
Apache Spark là một framework tính toán phân tán mã nguồn mở, nhanh và đa năng, được thiết kế cho việc xử lý dữ liệu lớn (Big Data).
* Các chức năng chính:
    1. Tính toán phân tán trong bộ nhớ (In-memory distributed computing): Spark có thể tải dữ liệu vào bộ nhớ của một cụm máy tính và thực hiện các phép tính lặp đi lặp lại trên đó, giúp tăng tốc độ xử lý đáng kể so với các hệ thống dựa trên đĩa như MapReduce của Hadoop.
    2. Xử lý dữ liệu lớn: Có khả năng xử lý các tập dữ liệu khổng lồ trên các cụm máy tính.
    3. Tích hợp với nhiều nguồn dữ liệu: Hỗ trợ nhiều nguồn dữ liệu như Hadoop HDFS, Apache Cassandra, Apache HBase, Hive, JSON, Parquet, và các cơ sở dữ liệu quan hệ qua JDBC.
    4. Hỗ trợ nhiều ngôn ngữ lập trình: Cung cấp API cho Scala (ngôn ngữ gốc), Java, Python, R, và SQL.
    5. Hệ sinh thái phong phú: Bao gồm các thư viện mạnh mẽ:
        * Spark SQL: Cho phép làm việc với dữ liệu có cấu trúc bằng SQL hoặc DataFrame API.
        * Spark Streaming: Xử lý dữ liệu theo thời gian thực hoặc gần thời gian thực từ các nguồn stream như Kafka, Flume.
        * MLlib (Machine Learning Library): Cung cấp các thuật toán học máy phổ biến.
        * GraphX: Dành cho xử lý đồ thị và tính toán song song trên đồ thị.
# 7. Một số loại Database đáng chú ý

## 7.1. DiceDB

A redis-compliant, in-memory, real-time, and reactive database optimized for modern hardware and for building and scaling truly real-time applications.
GitHub: https://github.com/dicedb/dice
Mô tả: DiceDB là một cơ sở dữ liệu real-time, tuân thủ giao thức Redis, lưu trữ trong bộ nhớ (in-memory), và có tính phản ứng (reactive). Nó được tối ưu hóa cho phần cứng hiện đại và để xây dựng, mở rộng các ứng dụng real-time.

## 7.2. ScyllaDB

NoSQL database, được xây dựng dựa trên kiến trúc của Apache Cassandra nhưng được viết lại bằng C++ để đạt hiệu năng cao hơn và độ trễ thấp hơn. Tương thích API với Cassandra.

## 7.3. Cassandra

Apache Cassandra là một hệ quản trị cơ sở dữ liệu NoSQL phân tán, mã nguồn mở, được thiết kế để xử lý lượng lớn dữ liệu trên nhiều máy chủ hàng hóa, cung cấp tính sẵn sàng cao mà không có điểm lỗi đơn lẻ (single point of failure). Thuộc loại wide-column store.

## 7.4. Supabase

Supabase là một giải pháp thay thế mã nguồn mở cho Firebase. Nó cung cấp một bộ công cụ backend bao gồm cơ sở dữ liệu PostgreSQL, xác thực, lưu trữ file, và API tự động tạo ra.
Tham khảo: Learn Supabase (Firebase Alternative) – Full Tutorial for Beginners - YouTube - https://www.youtube.com/watch?v=dU7GwCOgvNY

## 7.5. PostgreSQL

Một hệ quản trị cơ sở dữ liệu quan hệ đối tượng (ORDBMS) mã nguồn mở mạnh mẽ, nổi tiếng với độ tin cậy, tính năng phong phú, và khả năng mở rộng. Hỗ trợ đầy đủ ACID, JSON, full-text search, và nhiều kiểu dữ liệu nâng cao.

## 7.6. TiDB

Một cơ sở dữ liệu NewSQL phân tán, mã nguồn mở, tương thích với giao thức MySQL. Nó cung cấp khả năng mở rộng theo chiều ngang, tính nhất quán mạnh (strong consistency), và tính sẵn sàng cao. Thường được sử dụng cho các ứng dụng thương mại điện tử, dịch vụ tài chính, ngân hàng.

## 7.7. Neo4j

Một cơ sở dữ liệu đồ thị (Graph Database) hàng đầu, được thiết kế để lưu trữ, quản lý và truy vấn dữ liệu có mối quan hệ phức tạp. Sử dụng ngôn ngữ truy vấn Cypher. Phù hợp cho các ứng dụng như mạng xã hội, hệ thống gợi ý, phát hiện gian lận, quản lý mạng lưới.

## 7.8. SurrealDB

Một cơ sở dữ liệu đám mây gốc (cloud-native database) đa mô hình (multi-model), có thể hoạt động như một cơ sở dữ liệu quan hệ, tài liệu, đồ thị, và key-value. Hỗ trợ SurrealQL, một ngôn ngữ truy vấn giống SQL.
Website: https://surrealdb.com

## 7.9. Dgraph

Một cơ sở dữ liệu đồ thị phân tán, mã nguồn mở, được thiết kế cho hiệu năng cao và khả năng mở rộng. Sử dụng một biến thể của GraphQL gọi là GraphQL+- cho truy vấn.
GitHub: https://github.com/dgraph-io/dgraph

## 7.10. Apache HBase

Tham khảo:
* Apache HBase – Apache HBase™ Home: https://hbase.apache.org/
* Hbase là gì? Hướng dẫn cài đặt và sử dụng Hbase (itnavi.com.vn) - https://itnavi.com.vn/blog/hbase-la-gi
Apache HBase là một cơ sở dữ liệu NoSQL phân tán, mã nguồn mở, được mô hình hóa theo Bigtable của Google. Nó chạy trên đỉnh của HDFS (Hadoop Distributed File System) và cung cấp khả năng truy cập ngẫu nhiên, theo thời gian thực vào dữ liệu lớn. Thuộc loại wide-column store, phù hợp cho các ứng dụng cần ghi và đọc nhanh trên các tập dữ liệu khổng lồ với các hàng có thể có hàng tỷ cột.

## 7.11. Vitess

Database clustering system for horizontal scaling.
GitHub: https://github.com/vitessio/vitess
Vitess là một hệ thống clustering cơ sở dữ liệu cho MySQL, giúp mở rộng MySQL theo chiều ngang. Nó cung cấp các tính năng như sharding tự động, connection pooling, query routing, schema management, và high availability. Ban đầu được phát triển tại YouTube.

## 7.12. Clickhouse

ClickHouse là một hệ thống quản lý cơ sở dữ liệu SQL hướng theo cột (columnar database) hiệu suất cao, mã nguồn mở được thiết kế chuyên biệt cho việc xử lý phân tích trực tuyến (OLAP - Online Analytical Processing).

ClickHouse được phát triển bởi Yandex, ban đầu để phục vụ nhu cầu nội bộ của công ty này trong việc xử lý và phân tích khối lượng dữ liệu khổng lồ.

### 7.12.1. Đặc điểm kỹ thuật chính

**Kiến trúc cột (Columnar)**: Khác với cơ sở dữ liệu truyền thống lưu trữ theo hàng, ClickHouse lưu trữ dữ liệu theo cột, giúp tối ưu hóa việc truy vấn và phân tích dữ liệu.

**Hiệu suất cao**: ClickHouse được công nhận là một trong những cơ sở dữ liệu phân tích nhanh nhất hiện nay, với khả năng xử lý và phân tích các tệp dữ liệu khổng lồ theo thời gian thực.

**Xử lý dữ liệu lớn**: Hệ thống được thiết kế đặc biệt để xử lý và phân tích dữ liệu lớn (Big Data) một cách hiệu quả.

### 7.12.2. Ứng dụng và vai trò

ClickHouse thường được sử dụng trong tầng phục vụ (serving layer) của các kiến trúc dữ liệu hiện đại, cùng với các công nghệ khác như Apache Druid, Apache Pinot, và Tinybird để cung cấp một nền tảng thống nhất xử lý đầu ra dữ liệu.

Với bản chất cloud-native, ClickHouse có khả năng tự động trừu tượng hóa cấu trúc lưu trữ phân cấp, bao gồm cả việc lưu trữ dữ liệu cũ trong bộ nhớ blob.

## 7.13. Convex-backend

Github: https://github.com/get-convex/convex-backend

**Convex Backend** là **backend mã nguồn mở của Convex**[4], cung cấp một nền tảng backend đầy đủ tính năng cho việc phát triển ứng dụng web hiện đại.

### 7.13.1. Các thành phần cốt lõi

- **Cơ sở dữ liệu** (Database)[1][7][8]
- **Nơi viết server functions**[1][8][9]
- **Client libraries**[1][8][9]
- **Cloud functions**[7]
- **Scheduling** - hệ thống lập lịch[7]
- **Sync engine** - công cụ đồng bộ giữ frontend và backend luôn cập nhật[7]

### 7.13.2. Tính năng đặc biệt:

- **Ứng dụng cập nhật trực tiếp (live-updating apps)**[1][8][9]
- **Ứng dụng động** có khả năng mở rộng[1][8][9]
- **Convex-helpers**: Các thành phần có sẵn để nhanh chóng thêm tính năng vào backend[4]

### 7.13.3. Ưu điểm chính

1. **Dễ dàng xây dựng và mở rộng**: Convex giúp dễ dàng xây dựng và mở rộng các ứng dụng động[1][8][9]
2. **Tích hợp sẵn đầy đủ**: Cung cấp backend đầy đủ tính năng với tất cả các thành phần cần thiết[7]
3. **Đồng bộ tự động**: Sync engine tự động giữ cho frontend và backend luôn được cập nhật[7]
4. **Mã nguồn mở**: Hoàn toàn mã nguồn mở, cho phép tùy chỉnh và đóng góp từ cộng đồng[4]
5. **Components sẵn có**: Convex-helpers cung cấp các thành phần có thể sử dụng ngay để thêm tính năng nhanh chóng[4]

### 7.13.4. Mục đích sử dụng

Convex Backend đặc biệt phù hợp cho:

- **Ứng dụng web real-time** cần cập nhật trực tiếp
- **Ứng dụng động** với dữ liệu thay đổi thường xuyên
- Các dự án cần **backend đầy đủ tính năng** mà không muốn xây dựng từ đầu
- Ứng dụng cần **đồng bộ dữ liệu tự động** giữa frontend và backend

Tóm lại, Convex Backend là một giải pháp backend toàn diện và mạnh mẽ, đặc biệt tối ưu cho việc phát triển các ứng dụng web hiện đại với yêu cầu cập nhật dữ liệu real-time.

References:  
[1]: [https://github.com/get-convex/convex-backend](https://github.com/get-convex/convex-backend)  
[2]: [https://m.facebook.com/groups/609601226107659/posts/ch%C3%A0o-mn-e-c%C3%B3-l%C3%A0m-1-website-%C4%91ang-m%E1%BA%AFc-ch%E1%BB%97-x%C3%A1c-th%E1%BB%B1cem-c%C3%B3-rest-api-%C4%91%E1%BB%83-x%C3%A1c-th%E1%BB%B1c-l%C3%A0-lo/1375874689480305/](https://m.facebook.com/groups/609601226107659/posts/ch%C3%A0o-mn-e-c%C3%B3-l%C3%A0m-1-website-%C4%91ang-m%E1%BA%AFc-ch%E1%BB%97-x%C3%A1c-th%E1%BB%B1cem-c%C3%B3-rest-api-%C4%91%E1%BB%83-x%C3%A1c-th%E1%BB%B1c-l%C3%A0-lo/1375874689480305/)  
[3]: [https://www.scribd.com/document/811504571/giao-trinh-mang-noron-hoc-sau-va-ung-dung-ebook60-2498](https://www.scribd.com/document/811504571/giao-trinh-mang-noron-hoc-sau-va-ung-dung-ebook60-2498)  
[4]: [https://github.com/get-convex](https://github.com/get-convex)  
[5]: [https://dost.hochiminhcity.gov.vn/documents/1888/cntt.pdf](https://dost.hochiminhcity.gov.vn/documents/1888/cntt.pdf)  
[6]: [https://www.tiktok.com/@geckotech0101/video/7383276078858521864](https://www.tiktok.com/@geckotech0101/video/7383276078858521864)  
[7]: [https://docs.convex.dev/tutorial/](https://docs.convex.dev/tutorial/)  
[8]: [https://github.com/orgs/get-convex/packages/container/package/convex-backend](https://github.com/orgs/get-convex/packages/container/package/convex-backend)  
[9]: [https://github.com/get-convex/convex-backend/blob/main/README.md](https://github.com/get-convex/convex-backend/blob/main/README.md)  
[10]: [https://en.wikipedia.org/wiki/Convex_optimization](https://en.wikipedia.org/wiki/Convex_optimization)

# 8. Công cụ hỗ trợ

## 8.1. Docker Compose cho Databases

Docker Compose là công cụ để định nghĩa và chạy các ứng dụng Docker đa container. Rất hữu ích để nhanh chóng thiết lập môi trường phát triển với các loại cơ sở dữ liệu khác nhau mà không cần cài đặt trực tiếp lên máy.
Tham khảo: Docker Compose cho các loại Database phổ biến: https://viblo.asia/p/docker-compose-cho-cac-loai-database-pho-bien-qPoL78N1Vvk
Bài viết trên cung cấp các cấu hình Docker Compose mẫu cho nhiều DB như PostgreSQL, MySQL, MongoDB, Redis, SQL Server, Oracle, Elasticsearch, MariaDB, Cassandra, InfluxDB, Neo4j.

## 8.2. sqlc (Auto-gen boilerplate SQL queries)

sqlc là một công cụ dòng lệnh giúp biên dịch các câu lệnh SQL thành mã nguồn type-safe (an toàn kiểu) trong các ngôn ngữ lập trình như Go. Bạn viết các câu lệnh SQL, sqlc sẽ tạo ra các hàm tương ứng trong ngôn ngữ đích, giúp giảm thiểu việc viết mã boilerplate để tương tác với cơ sở dữ liệu.
Website: https://sqlc.dev

## 8.3. AskDB (Scan database and generate query by asking using LLM)

Một công cụ thử nghiệm cho phép quét schema của cơ sở dữ liệu và sau đó người dùng có thể đặt câu hỏi bằng ngôn ngữ tự nhiên, công cụ sẽ sử dụng Mô hình Ngôn ngữ Lớn (LLM) để tạo ra câu lệnh SQL tương ứng.
GitHub: https://github.com/phanxuanquang/AskDB
Tham khảo liên quan: [[Machine learning - Deep Learning - AI - ML - DL]]

# 9. Tài liệu tham khảo và Nguồn học liệu chung

* 8 điểm so sánh giữa MySQL và PostgreSQL để chọn lựa cái nào phù hợp hơn
* Open Source Database - Ranking
* Learning Database with Tran Quoc Huy: https://www.youtube.com/@tranquochuywecommit