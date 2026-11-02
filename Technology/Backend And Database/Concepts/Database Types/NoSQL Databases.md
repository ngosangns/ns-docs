---
area: technology
domain: nosql
type: guide
title: NoSQL Databases
description: Survey of NoSQL storage models (document, key-value, wide-column, graph) with representative databases such as Redis, RocksDB, Cassandra, and MongoDB.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - nosql
  - database
resource: https://github.com/transybao1393/DiskDB
---

# NoSQL Databases

Non-relational databases trade the relational model for storage shapes built around a specific access pattern. This note groups those shapes into four families. It then lists representative engines for each one, from Redis, LevelDB, RocksDB, DiskDB and DiceDB among key-value stores to Cassandra, ScyllaDB and HBase for wide column, and MongoDB and CouchDB for documents. Graph engines such as Neo4j, JanusGraph and TigerGraph appear in the model overview. Readers get pointers to deeper notes on Redis and MongoDB, plus two background articles on database types and the SQL versus NoSQL trade-off, so the note works as a starting map before choosing a store.

## NoSQL Storage Models

- **Document database**: MongoDB, CouchDB
- **Key-value store**: Redis, LevelDB, RocksDB
- **Wide column**: Cassandra, Bigtable, HBase
- **Graph database**: JanusGraph, Neo4j, TigerGraph

## Key-value Stores

- **Redis**: In-memory data structure store
  - See details: [Redis](/Technology/Backend And Database/Tools/Redis)
- **LevelDB**: Google's key-value store
- **RocksDB**: High-performance key-value store, a fork of LevelDB
- **DiskDB**: A high-performance, disk-based key-value database built in Rust that uses RocksDB as its storage engine. Designed as an alternative to Redis but optimized for durable storage, allowing efficient reads and writes directly on disk. Supports the Redis-compatible protocol, with high performance for single operations and mixed workloads - [GitHub](https://github.com/transybao1393/DiskDB)
- **DiceDB**: Redis-compliant, in-memory, real-time, reactive - [GitHub](https://github.com/dicedb/dice)

## Wide Column Databases

- **Cassandra**: Distributed NoSQL wide-column store with high availability
- **ScyllaDB**: NoSQL database built on Cassandra, written in C++, high performance
- **Apache HBase**: Distributed NoSQL database modeled after Bigtable, a wide-column store - [Website](https://hbase.apache.org/)

## Document Databases

- **MongoDB**: Popular document database
  - See details: [MongoDB](/Technology/Backend And Database/Tools/MongoDB)
- **CouchDB**: Document database with built-in replication

## Other NoSQL Databases

- **Supabase**: Open-source Firebase alternative, PostgreSQL-based - [Video](https://www.youtube.com/watch?v=dU7GwCOgvNY)

Document stores here are MongoDB, the popular one, and CouchDB, which has built-in replication. Key-value options include Redis, an in-memory data structure store, LevelDB from Google, and RocksDB, a high-performance fork of LevelDB. DiskDB is a Rust database that uses RocksDB as its storage engine. It is built for durable disk storage and a Redis-compatible protocol. It offers high performance for single operations and mixed workloads. DiceDB is in memory, Redis-compliant, and real-time reactive. Cassandra is a distributed wide-column store with high availability. ScyllaDB is written in C++ on Cassandra for high performance, and HBase is modeled after Bigtable. Graph engines in the overview are JanusGraph, Neo4j, and TigerGraph. Supabase is an open-source Firebase alternative based on PostgreSQL.

## Resources

- [Understanding database-types](https://blog.bytebytego.com/p/understanding-database-types)
- [Mastering the Database Duality](https://blog.devgenius.io/mastering-the-database-duality-exploring-the-realm-of-sql-and-nosql-with-cheatsheet-33a73f752460)

> **See also:** [SQL Databases](/Technology/Backend And Database/Concepts/Database Types/SQL Databases) · [Redis](/Technology/Backend And Database/Tools/Redis) · [MongoDB](/Technology/Backend And Database/Tools/MongoDB)
