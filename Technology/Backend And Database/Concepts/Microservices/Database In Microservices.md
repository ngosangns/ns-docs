---
area: technology
domain: microservices
type: guide
title: Database In Microservices
description: Tools and approaches for database access in microservices, covering reverse proxies, load balancers, MySQL clustering, and data synchronization.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - microservices
  - database
resource: https://github.com/sysown/proxysql
---

# Database In Microservices

## Reverse Proxy and Load Balancing

- **ProxySQL**: High-performance reverse proxy for MySQL with query routing, caching, and sharding - [GitHub](https://github.com/sysown/proxysql)
- **HAProxy**: TCP/HTTP load balancer - [GitHub](https://github.com/haproxy/haproxy)
- **Vitess**: MySQL clustering, sharding, and connection pooling - [GitHub](https://github.com/vitessio/vitess)

## Data Synchronization

- **Dataguard**: Oracle Database's solution for high availability and disaster recovery
- Other systems: use replication

> **See also:** [Sharding Partitioning](/Technology/Backend And Database/Concepts/Techniques And Architecture/Sharding Partitioning) · [MySQL](/Technology/Backend And Database/Tools/MySQL)
