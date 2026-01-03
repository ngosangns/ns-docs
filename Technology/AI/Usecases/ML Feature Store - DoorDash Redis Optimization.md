---
tags:
  - area/technology
  - domain/ai-ml
  - topic/mlops
  - type/case-study
  - lang/vi
---

# ML Feature Store - DoorDash Redis Optimization

> **Nguồn**: [Building a Gigascale ML Feature Store with Redis](https://careersatdoordash.com/blog/building-a-gigascale-ml-feature-store-with-redis/) - DoorDash Engineering Blog (November 19, 2020)

## Tổng quan

DoorDash xây dựng và tối ưu hóa ML Feature Store quy mô lớn sử dụng Redis, đạt được:

- Giảm chi phí gấp 3 lần
- Giảm độ trễ đọc Redis 38%
- Giảm memory footprint 2.5x
- Giảm CPU utilization 2.85x

## Yêu cầu của Feature Store quy mô lớn

### Persistent scalable storage

- Hỗ trợ hàng tỷ bản ghi
- Số lượng records phụ thuộc vào số lượng entities (consumers, merchants, food items) và số ML use cases
- Tổng số feature-value pairs vượt quá hàng tỷ
- Cần backup lên disk để recovery khi hệ thống lưu trữ lỗi

### High read throughput

- Phục vụ hàng triệu feature lookups mỗi giây
- Request rates phụ thuộc trực tiếp vào số lượng predictions được serve
- Ví dụ: Store ranking use case tạo hơn 1 triệu predictions/giây, mỗi prediction dùng hàng chục features
- Cần hỗ trợ hàng chục triệu reads/giây

### Fast batch writes

- Cho phép full data refresh trong nightly run
- Hầu hết features được update hàng ngày
- Real-time features (như "average delivery time trong 20 phút qua") được update đều đặn trong ngày

## Thách thức thiết kế cụ thể

### Batch random reads

- Một prediction cần nhiều features → cần batch lookup operations
- Key-value stores thường hỗ trợ unit lookup (GET), nhưng batch lookups không phải standard
- Ví dụ: Apache Cassandra không hỗ trợ batch random lookups

### Heterogeneous data types

- Features có thể là:
  - Simple types: integers, floats, strings (ví dụ: categorical features như "order protocol")
  - Compound types: vector embeddings, lists (ví dụ: "list of cuisines trong 4 tuần qua")
- Mỗi data type cần được tối ưu riêng cho storage và performance

### Low read latency, loose write latency

- Read latency phải thấp vì là một phần của model serving (thường trong low milliseconds)
- Writes ít thường xuyên hơn (0.1% của reads khi không batch refresh)
- Hướng tới read-heavy key-value store nhưng vẫn đủ nhanh cho large batch writes

## Benchmarking key-value stores

### Công cụ: YCSB (Yahoo Cloud Serving Benchmark)

- Đáp ứng 4 yêu cầu chính:
  1. Data generation với preset distributions
  2. Simulate characteristic workloads
  3. Fine-grained performance reporting (averages, 95th, 99th percentiles)
  4. Reproducibility

### Các database được benchmark

1. **Cassandra** 3.11.4
2. **CockroachDB** 20.1.5
3. **Redis** 3.2.10
4. **ScyllaDB** 4.1.7
5. **YugabyteDB** 2.3.1.0-b15

### Setup

- Platform: Docker trên MacOS Catalina 10.15.7 (2.4 GHz Intel Core i9, 16GB RAM, 8 cores)
- Data schema:
  - SQL/Cassandra: `CREATE TABLE table (key varchar primary key, value varchar)`
  - Redis: `SET key-value GET key`
- Input data: Key size dựa trên average measure từ production, value size dựa trên histogram từ actual feature values
- Operations: batch writes, batch reads, update
- Batch reads implementation:
  - SQL: `IN` clause
  - Redis: Pipelining
  - CQL: Datastax executeAsync

### Kết quả

- **Redis** (in-memory) có read latency tốt nhất
- **CockroachDB** là disk-based store tốt nhất
- **Redis** sử dụng CPU ít hơn một nửa so với CockroachDB
- Kết luận: Redis vượt trội cả về performance và cost cho use case này

## Tối ưu hóa Redis

### 1. Sử dụng Redis Hashes

**Từ flat key-value pairs:**

```
SET feature_name_for_entity_id feature_value
```

**Sang Redis hash per entity:**

```
HSET entity_id feature_name feature_value
HMGET entity_id feature_name1 feature_name2 ...
```

**Lợi ích:**

- Collocation: các fields của một object ở cùng một Redis node → hiệu quả hơn khi query nhiều fields
- Giảm số lượng Redis commands: 1 HMGET command thay vì nhiều GET calls
- Cải thiện CPU efficiency và read performance

**Trade-off:**

- TTLs chỉ có thể set ở top-level key (`entity_id`), không thể set cho nested hash fields
- Nested hash fields không tự động evict, phải explicitly remove

**Kết quả:**

- Read latency giảm >40%
- CPU efficiency cải thiện 5x
- Memory footprint giảm đáng kể (từ 700.2MiB xuống 422MiB cho 1M records)

### 2. String hashing với xxHash

**Vấn đề:**

- Feature names dạng string dài (ví dụ: `daf_cs_p6m_consumer2vec_emb.` = 27 bytes)
- 32-bit integer chỉ 4 bytes

**Giải pháp:**

- Sử dụng **xxHash** (non-cryptographic hash function) để convert feature names thành integers
- 32-bit hashing để minimize hash collisions
- Consistent references across all systems mà không cần maintain enum/map

**Implementation:**

```
HSET entity_id XXHash32(feature_name) feature_value
```

**Kết quả:**

- Giảm thêm 15% cluster memory
- Không có computational overhead đáng kể

### 3. Binary serialization với Protocol Buffers

**Cho compound data types:**

- Vector embeddings: list of float values
- Integer lists

**Approach:**

- Serialize compound types với protocol buffer format
- Float values: dùng string format thay vì binary (vì nhiều zeros, string '0' chỉ 1 byte)
- Kết hợp: protobufs cho compound types + strings cho floats

### 4. Compression với Snappy

**Cho integer lists:**

- Apply Snappy compression trên protobuf-encoded integer lists
- Lý do chọn Snappy: high compression ratio + low deserialization overheads

**Không compress embeddings:**

- Embeddings có entropy cao → ít compressible
- Không có gains với compression

**So sánh compression algorithms:**

- **Snappy**: 377MiB, 44s upload, 2.5ms latency, 1.9ms deserialization
- **LZ4**: 397.5MiB, 33s upload, 2.1ms latency, 6.5ms deserialization
- Snappy tốt hơn về compression ratio và deserialization time

### Tổng hợp strategy theo feature type

| Feature Type | Redis Value                                              |
| ------------ | -------------------------------------------------------- |
| Float        | String form (better than binary khi floats mostly zeros) |
| Embedding    | Byte encoding of Embedding protobuf                      |
| Int List     | Snappy Compressed byte encoding of Int List protobuf     |

## Kết quả tổng thể

### Memory reduction

- **1M records sample**: 700MB → 280MB (2.5x reduction)
- **Production**: 298 GB RAM → 112 GB RAM per billion features (2.66x reduction)

### CPU utilization

- **Production**: 208 vCPUs → 72 vCPUs per 10 million reads-per-second (2.89x reduction)

### Latency improvement

- **Redis read latency**: Giảm 40% cho characteristic model prediction requests (1,000 feature lookups per request)
- **Overall feature store API latency**: Giảm 15% (bao gồm reads từ Redis và deserialization)

## Bài học và best practices

### Benchmarking

- Sử dụng YCSB cho rapid comparison giữa các key-value stores
- Docker setup cho phép rapid iteration
- Validate Docker results với production improvements

### Redis optimization techniques

- Redis Hashes cho collocation và giảm commands
- String hashing (xxHash) cho compact feature names
- Custom serialization (protobufs + strings) cho compound types
- Selective compression (Snappy cho lists, không compress embeddings)

### Data type-specific optimizations

- Float → string khi mostly zeros
- Embeddings → protobuf binary, không compress
- Integer lists → protobuf + Snappy compression

## Future work

- Khai thác tính chất sparse của feature data để đạt được compact representation hơn nữa

## Takeaways

1. **Redis phù hợp cho large-scale feature stores** với yêu cầu high throughput, batch random reads, và low latency
2. **Redis Hashes** là optimization quan trọng nhất, cải thiện cả CPU efficiency và memory footprint
3. **String hashing** đơn giản nhưng hiệu quả để giảm memory
4. **Compression** có thể giúp giảm payload size trong specific cases
5. **Benchmarking methodology** (YCSB + Docker) giúp rapid evaluation và decision-making
