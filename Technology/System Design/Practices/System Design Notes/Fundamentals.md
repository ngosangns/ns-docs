---
area: technology
domain: system-design
type: guide
title: Fundamentals
description: "An overview of system design fundamentals: the CAP consistency-availability trade-off, eight common problems with standard solutions, and a curated list of learning references."
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - system-design
  - scalability
resource: https://viblo.asia/p/danh-doi-giua-tinh-nhat-quan-va-tinh-san-sang-tradeoff-between-consistency-and-availability-5OXLAvlxVGr
---

# Fundamentals

## Basic Principles

### Trade-offs

#### The Trade-off Between Consistency and Availability

The article explains the CAP theorem (Consistency, Availability, Partition tolerance) and the trade-off between consistency (data is always in sync on every node) and availability (the system always responds to requests). In a distributed system you cannot guarantee all three at once; you usually have to choose between C and A when a network partition (P) occurs.
Source: https://viblo.asia/p/danh-doi-giua-tinh-nhat-quan-va-tinh-san-sang-tradeoff-between-consistency-and-availability-5OXLAvlxVGr

## Common Problems and Solutions in System Design

Below are 8 common system design problems and the solutions usually applied to them:

1. Caching – speed up reads
   - Problem: a large volume of read queries overloads the database (DB).
   - Solution: use caching systems such as Redis or Memcached to store the results of popular queries, reducing DB load and speeding up responses.

2. Async Write & LSM-Tree DB – handle writes efficiently
   - Problem: a high write volume bottlenecks the DB and hurts performance.
   - Solution: use asynchronous writes through a message queue such as Kafka or RabbitMQ. Use DBs optimized for writes, such as Cassandra and RocksDB (which use the Log-Structured Merge-Tree, LSM-Tree, structure).

3. Redundancy & Failover – increase availability
   - Problem: the system has a Single Point of Failure (SPOF) when there is only one server or one critical component.
   - Solution: deploy data replication and automatic failover between the primary server (master) and replica servers so the system keeps working when something fails.

4. Load Balancer – distribute load
   - Problem: servers get overloaded when traffic increases.
   - Solution: use a Load Balancer such as Nginx or AWS Application Load Balancer (ALB) to distribute user requests evenly across multiple servers, so no single server is overloaded.

5. CDN (Content Delivery Network) – reduce latency
   - Problem: users geographically far from the main server experience high latency when accessing content.
   - Solution: use a Content Delivery Network (CDN) such as Cloudflare or AWS CloudFront to store copies of static files (images, video, CSS, JavaScript) on edge servers close to users, reducing latency and speeding up page loads.

6. Block/Object Storage – manage large files
   - Problem: storing large files directly in the DB bloats the DB, slows queries, and makes management difficult.
   - Solution: use block storage such as Amazon EBS or object storage such as Amazon S3 for large files. The files' metadata (e.g. path, file name, size) can be stored in the DB.

7. Centralized Logging – manage logs effectively
   - Problem: it is hard to search and analyze error logs when the system spans many servers.
   - Solution: use a centralized log management system such as the ELK stack (Elasticsearch, Logstash, Kibana) or the EFK stack (Elasticsearch, Fluentd, Kibana) to collect, store, search, and analyze logs from all system components in one place.

8. Sharding & Index – optimize queries
   - Problem: slow queries on large DBs.
   - Solution:
     - Create indexes on fields frequently used in query conditions to speed up lookups.
     - Apply sharding (data partitioning) to split a large DB into smaller parts (shards), each stored on a separate node, which spreads load and improves query performance.

![](/Attachments/a3b4c5d6-e7f8-091a-2b3c-4d5e6f708192.png)

## References and Tools

- The encyclopedia of system design: a compilation of knowledge, concepts, solutions to common problems, and real-world examples. Very useful for preparing for system design interviews.
  - Source: https://github.com/donnemartin/system-design-primer
- System Design the big archive: [e0f1a2b3-c4d5-6789-9a0b-c1d2e3f4a5b6.pdf](/Attachments/e0f1a2b3-c4d5-6789-9a0b-c1d2e3f4a5b6.pdf)
- System Design and architecture: [d6e7f809-1a2b-3c4d-5e6f-708192a3b4c5.pdf](/Attachments/d6e7f809-1a2b-3c4d-5e6f-708192a3b4c5.pdf)
- Prophecy Product Design Cheatsheet: [b4c5d6e7-f809-1a2b-3c4d-5e6f708192a3.pdf](/Attachments/b4c5d6e7-f809-1a2b-3c4d-5e6f708192a3.pdf)
- Software Architect & Architecture: Mindset, responsibilities, and what you need to know: a video discussing the role of the Software Architect, the mindset required, the main responsibilities, and the necessary knowledge.
  - Source: https://www.youtube.com/watch?v=AVhNryY5ujI
- What is a System Architect (SA)? How to become one: a video explaining the role of the System Architect, the work, and the path to becoming an SA.
  - Source: https://www.youtube.com/watch?v=v0CcoWqqZho
- Chuyện anh thợ xây P1 (The Builder's Story, Part 1): BUILD a write-heavy application: part 1 of the series, focusing on building an application with a large volume of data writes.
  - Source: https://viblo.asia/p/chuyen-anh-tho-xay-p1-build-a-write-heavy-application-V3m5WQrEZO7#_code-thieu-nhi-thi-cung-phai-kiem-tra-dang-hoang-3
- Chuyện anh thợ xây P2: batch operations and the "carrying bricks" technique:
  - Source: https://viblo.asia/p/chuyen-anh-tho-xay-p2-batch-operation-va-cong-nghe-be-gach-RQqKL61Ml7z
- Chuyện anh thợ xây P3: the story of the view counter:
  - Source: https://viblo.asia/p/chuyen-anh-tho-xay-p3-chuyen-cai-bo-dem-view-5OXLAYrZLGr

> **See also:** [Overview](/Technology/System Design/Practices/System Design Notes/Overview) · [Technical Solutions](/Technology/System Design/Practices/System Design Notes/Technical Solutions) · [Software Architecture](/Technology/System Design/Practices/System Design Notes/Software Architecture)
