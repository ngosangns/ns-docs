---
area: technology
domain: backend
topic: database
type: resource
---
# NoSQL Databases

Cơ sở dữ liệu phi quan hệ.

## Mô hình lưu trữ NoSQL

- **Document database**: MongoDB, CouchDB
- **Key-value store**: Redis, LevelDB, RocksDB
- **Wide column**: Cassandra, Bigtable, HBase
- **Graph database**: JanusGraph, Neo4j, TigerGraph

## Key-value store

- **Redis**: In-memory data structure store
  - Xem chi tiết: [[redis]]
- **LevelDB**: Key-value store của Google
- **RocksDB**: Key-value store hiệu suất cao, fork của LevelDB
- **DiskDB**: Cơ sở dữ liệu key-value hiệu suất cao dựa trên đĩa, được xây dựng bằng Rust và sử dụng RocksDB làm công cụ lưu trữ. Được thiết kế như một giải pháp thay thế cho Redis nhưng tối ưu hóa cho lưu trữ bền vững, cho phép thực hiện các thao tác đọc và ghi hiệu quả trực tiếp trên đĩa. Hỗ trợ Redis-compatible protocol, hiệu năng cao cho single operations và mixed workloads - [GitHub](https://github.com/transybao1393/DiskDB)
- **DiceDB**: Redis-compliant, in-memory, real-time, reactive - [GitHub](https://github.com/dicedb/dice)

## Wide column databases

- **Cassandra**: NoSQL phân tán, wide-column store, high availability
- **ScyllaDB**: NoSQL, xây dựng dựa trên Cassandra, C++, hiệu năng cao
- **Apache HBase**: NoSQL phân tán, mô hình theo Bigtable, wide-column store - [Website](https://hbase.apache.org/)

## Document databases

- **MongoDB**: Document database phổ biến
  - Xem chi tiết: [[mongodb]]
- **CouchDB**: Document database với replication tích hợp

## Other NoSQL databases

- **Supabase**: Thay thế Firebase mã nguồn mở, PostgreSQL-based - [Video](https://www.youtube.com/watch?v=dU7GwCOgvNY)

## Resources

- [Understanding database-types](https://blog.bytebytego.com/p/understanding-database-types)
- [Mastering the Database Duality](https://blog.devgenius.io/mastering-the-database-duality-exploring-the-realm-of-sql-and-nosql-with-cheatsheet-33a73f752460)