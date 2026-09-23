---
area: technology
domain: oceanbase
type: case-study
title: OceanBase Alibaba Singles Day
description: Case study of how OceanBase handled Alibaba's 11.11 Singles Day peak of 544,000 TPS, covering its architecture, LSM-tree storage, Paxos replication, and trade-offs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - oceanbase
  - distributed-database
---

# OceanBase Alibaba Singles Day

## Event Overview (Performance Metrics)

- **Peak traffic:** 544,000 TPS (Transactions Per Second), reached within just 3 seconds from 50k TPS.
- **Record times:** the first USD 1 billion in 68 seconds, USD 10 billion in under 30 minutes.
- **End-of-day results:**
  - 1.3 billion orders.
  - USD 34 billion in revenue.
  - **Zero loss, zero downtime**.
- **Comparison:** Visa (65k TPS), PayPal (10k TPS).

## Why OceanBase Instead of a Traditional Database?

- **Problems with traditional databases:**
  - **Oracle:** bottlenecks on shared storage and global locks at extremely high TPS.
  - **MySQL/PostgreSQL:** difficulty sharding across tens of thousands of nodes and handling distributed transactions (2PC) at the app layer when traffic spikes.
  - **NoSQL:** only guarantees eventual consistency, which is high-risk for payments.
- **OceanBase:** a distributed database management system that solves these with strong consistency, RPO ≈ 0, very low RTO, and the ability to scale for huge write spikes.

## Core Architecture

- **Main components:**
  - **OBProxy:** routes requests by computing a hash (user_id) to find the right OBServer.
  - **OBServer:** processes SQL and stores data.
  - **RootService:** manages metadata and load balancing.
- **Partitioning mechanism (Colocation):**
  - Places all related data (orders, payments, balance) of the same user on the same server.
  - **Result:** 95% of transactions are Local Transactions (2 ms), avoiding network overhead (15-30 ms).

## Storage & Performance (Storage Engine)

- **LSM-Tree storage:**
  - **Write-heavy optimization:** writes go directly to the MemTable (RAM), which is extremely fast.
  - **Flush & Compaction:** periodically flushed to disk as Mini/Minor SSTables. Major Compaction runs in the background (usually at 3am) and saves 80% of I/O.
- **Compression (deep data compression):**
  - Uses Dictionary Encoding, Delta Encoding, and Run-Length Encoding.
  - Reduces size from 32.5TB to 6.5TB (80% storage savings).
- **Cache architecture:**
  - Row Cache (speeds up point queries 40x) and Block Cache.
  - **Cache Warming** preloads hot data into RAM after compaction.

## Data Safety (High Availability)

- **Paxos replication:**
  - Uses 5 replicas (1 Leader, 4 Followers).
  - Only 3 of 5 nodes need to acknowledge (Majority) for a commit to succeed (usually takes 5 ms).
- **Fault tolerance (High Availability):**
  - **RPO = 0:** no data loss even if an entire datacenter loses power.
  - **RTO < 30s:** automatically elects a new Leader and updates the routing table in under 30 seconds.

## Advanced Features

- **HTAP (Hybrid Transactional/Analytical Processing):**
  - Handles OLTP (transactions) and OLAP (real-time dashboard analytics) at the same time.
  - Uses column-oriented storage and vectorized execution for analytical queries.
- **Dynamic Load Balancing:**
  - Automatically detects overloaded nodes (CPU > 95%).
  - Performs Split (partition splitting) and Migrate (relocation) to idle nodes without downtime.

## Trade-offs

- **Infrastructure:** requires at least 3-5 replicas, consuming 3-5 times the resources of a traditional DB.
- **Operations:** debugging a distributed system is complex and requires sophisticated monitoring to determine whether a fault is caused by the network or by a node.

---

_Source: compiled from Alibaba, OceanBase, Baidu, and the open-source community._

> **See also:** [1M RPS Voucher System](/Technology/Backend And Database/Practices/1M RPS Voucher System) · [Vitess Distributed Database Best Practices](/Technology/Backend And Database/Practices/Vitess Distributed Database Best Practices)
