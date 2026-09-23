---
area: technology
domain: mlops
type: case-study
title: DoorDash Feature Store Redis Optimization
description: How DoorDash benchmarked key-value stores and tuned Redis with hashes, xxHash, protobuf, and Snappy to cut its ML feature store's cost, memory, CPU, and latency.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - mlops
  - redis
  - feature-store
resource: https://careersatdoordash.com/blog/building-a-gigascale-ml-feature-store-with-redis/
---

# DoorDash Feature Store Redis Optimization

> **Source**: [Building a Gigascale ML Feature Store with Redis](https://careersatdoordash.com/blog/building-a-gigascale-ml-feature-store-with-redis/) - DoorDash Engineering Blog (November 19, 2020)

## Overview

DoorDash built and optimized a large-scale ML Feature Store on Redis, achieving:

- 3x cost reduction
- 38% lower Redis read latency
- 2.5x smaller memory footprint
- 2.85x lower CPU utilization

## Requirements of a Large-Scale Feature Store

### Persistent scalable storage

- Support billions of records
- The number of records depends on the number of entities (consumers, merchants, food items) and the number of ML use cases
- Total feature-value pairs exceed billions
- Needs disk backup for recovery when the storage system fails

### High read throughput

- Serve millions of feature lookups per second
- Request rates depend directly on the number of predictions served
- Example: the store ranking use case generates over 1 million predictions/second, each prediction using dozens of features
- Must support tens of millions of reads/second

### Fast batch writes

- Allow a full data refresh in the nightly run
- Most features are updated daily
- Real-time features (such as "average delivery time over the last 20 minutes") are updated regularly throughout the day

## Specific Design Challenges

### Batch random reads

- One prediction needs many features → batch lookup operations are required
- Key-value stores typically support unit lookups (GET), but batch lookups are not standard
- Example: Apache Cassandra does not support batch random lookups

### Heterogeneous data types

- Features can be:
  - Simple types: integers, floats, strings (e.g., categorical features such as "order protocol")
  - Compound types: vector embeddings, lists (e.g., "list of cuisines over the last 4 weeks")
- Each data type needs its own storage and performance optimization

### Low read latency, loose write latency

- Read latency must be low because it is part of model serving (typically low milliseconds)
- Writes are less frequent (0.1% of reads when not doing a batch refresh)
- The target is a read-heavy key-value store that is still fast enough for large batch writes

## Benchmarking Key-Value Stores

### Tool: YCSB (Yahoo Cloud Serving Benchmark)

- Meets 4 key requirements:
  1. Data generation with preset distributions
  2. Simulation of characteristic workloads
  3. Fine-grained performance reporting (averages, 95th, 99th percentiles)
  4. Reproducibility

### Databases benchmarked

1. **Cassandra** 3.11.4
2. **CockroachDB** 20.1.5
3. **Redis** 3.2.10
4. **ScyllaDB** 4.1.7
5. **YugabyteDB** 2.3.1.0-b15

### Setup

- Platform: Docker on macOS Catalina 10.15.7 (2.4 GHz Intel Core i9, 16GB RAM, 8 cores)
- Data schema:
  - SQL/Cassandra: `CREATE TABLE table (key varchar primary key, value varchar)`
  - Redis: `SET key-value GET key`
- Input data: key size based on the average measured in production, value size based on a histogram of actual feature values
- Operations: batch writes, batch reads, update
- Batch reads implementation:
  - SQL: `IN` clause
  - Redis: Pipelining
  - CQL: Datastax executeAsync

### Results

- **Redis** (in-memory) had the best read latency
- **CockroachDB** was the best disk-based store
- **Redis** used less than half the CPU of CockroachDB
- Conclusion: Redis wins on both performance and cost for this use case

## Redis Optimization

### Use Redis Hashes

**From flat key-value pairs:**

```
SET feature_name_for_entity_id feature_value
```

**To one Redis hash per entity:**

```
HSET entity_id feature_name feature_value
HMGET entity_id feature_name1 feature_name2 ...
```

**Benefits:**

- Collocation: the fields of an object live on the same Redis node → more efficient when querying many fields
- Fewer Redis commands: one HMGET instead of many GET calls
- Better CPU efficiency and read performance

**Trade-off:**

- TTLs can only be set on the top-level key (`entity_id`), not on nested hash fields
- Nested hash fields are not evicted automatically and must be removed explicitly

**Results:**

- Read latency dropped by more than 40%
- CPU efficiency improved 5x
- Significantly smaller memory footprint (from 700.2MiB down to 422MiB for 1M records)

### String hashing with xxHash

**Problem:**

- Feature names are long strings (e.g., `daf_cs_p6m_consumer2vec_emb.` = 27 bytes)
- A 32-bit integer is only 4 bytes

**Solution:**

- Use **xxHash** (a non-cryptographic hash function) to convert feature names into integers
- 32-bit hashing to minimize hash collisions
- Consistent references across all systems without maintaining an enum/map

**Implementation:**

```
HSET entity_id XXHash32(feature_name) feature_value
```

**Results:**

- A further 15% reduction in cluster memory
- No significant computational overhead

### Binary serialization with Protocol Buffers

**For compound data types:**

- Vector embeddings: lists of float values
- Integer lists

**Approach:**

- Serialize compound types in protocol buffer format
- Float values: use string format rather than binary (many values are zeros, and the string '0' is only 1 byte)
- Combination: protobufs for compound types + strings for floats

### Compression with Snappy

**For integer lists:**

- Apply Snappy compression to protobuf-encoded integer lists
- Why Snappy: high compression ratio + low deserialization overhead

**Do not compress embeddings:**

- Embeddings have high entropy → poorly compressible
- No gains from compression

**Comparison of compression algorithms:**

- **Snappy**: 377MiB, 44s upload, 2.5ms latency, 1.9ms deserialization
- **LZ4**: 397.5MiB, 33s upload, 2.1ms latency, 6.5ms deserialization
- Snappy is better on compression ratio and deserialization time

### Summary of strategy by feature type

| Feature Type | Redis Value                                                   |
| ------------ | ------------------------------------------------------------- |
| Float        | String form (better than binary when floats are mostly zeros) |
| Embedding    | Byte encoding of Embedding protobuf                           |
| Int List     | Snappy-compressed byte encoding of Int List protobuf          |

## Overall Results

### Memory reduction

- **1M-record sample**: 700MB → 280MB (2.5x reduction)
- **Production**: 298 GB RAM → 112 GB RAM per billion features (2.66x reduction)

### CPU utilization

- **Production**: 208 vCPUs → 72 vCPUs per 10 million reads-per-second (2.89x reduction)

### Latency improvement

- **Redis read latency**: 40% lower for characteristic model prediction requests (1,000 feature lookups per request)
- **Overall feature store API latency**: 15% lower (including Redis reads and deserialization)

## Lessons and Best Practices

### Benchmarking

- Use YCSB for rapid comparison between key-value stores
- A Docker setup allows rapid iteration
- Validate Docker results against production improvements

### Redis optimization techniques

- Redis Hashes for collocation and fewer commands
- String hashing (xxHash) for compact feature names
- Custom serialization (protobufs + strings) for compound types
- Selective compression (Snappy for lists, no compression for embeddings)

### Data type-specific optimizations

- Float → string when mostly zeros
- Embeddings → protobuf binary, uncompressed
- Integer lists → protobuf + Snappy compression

## Future Work

- Exploit the sparsity of feature data to reach an even more compact representation

## Takeaways

1. **Redis suits large-scale feature stores** that need high throughput, batch random reads, and low latency
2. **Redis Hashes** are the most important optimization, improving both CPU efficiency and memory footprint
3. **String hashing** is simple but effective at reducing memory
4. **Compression** can reduce payload size in specific cases
5. **Benchmarking methodology** (YCSB + Docker) enables rapid evaluation and decision-making

> **See also:** [Monitoring Tracking](/Technology/AI/Tools/MLOps/Monitoring Tracking) · [Recommender Systems](/Technology/AI/Practices/Recommender Systems)
