---
area: technology
domain: connection-pooling
type: guide
title: Database Connection Pooling
description: Explains why a database connection is an expensive OS process, how connection pools work, and how to size a pool using Little's Law, Kingman's formula, and the process-to-core ratio.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - connection-pooling
  - database
  - postgresql
resource: https://sagarshiroya.dev/posts/database-connection-and-pooling
---

# Database Connection Pooling

**Source:** [Database Connections & Connection Pooling](https://sagarshiroya.dev/posts/database-connection-and-pooling) — Sagar Shiroya, 2026-04-18

See also: [ProxySQL Connection Multiplexing](/Technology/Backend And Database/Practices/ProxySQL Connection Multiplexing) (N:M multiplexing at the proxy, as opposed to 1:1 pooling).

## What a Connection Is and Why It Is Expensive

- PostgreSQL (and most databases) use a **process-per-connection** model: each client connection makes the postmaster fork a dedicated backend process to serve it.
- Each backend process allocates its own memory (5–10 MB) and holds an auth session, transaction state, and buffers, so a connection is not a "socket" but a real OS process.
- Hard limit `max_connections` (the default is usually 100).

### Connection Lifecycle

1. **Open**: TCP 3-way handshake, then SSL/TLS negotiation (if enabled), then authentication, then spawning the backend process.
2. **Execute** the SQL statement and receive the result.
3. **Close**: kill the backend process, free memory, close the socket.

Connection open time (for reference):

| Location                         | Time        |
| -------------------------------- | ----------- |
| Same rack, same data center      | 1–5 ms      |
| Different rack, same data center | 5–20 ms     |
| Different data center            | 50–200 ms   |
| Cross-region                     | 800–1500 ms |

If you open and close a connection for every query, the overhead dominates query execution time (a 2 ms query costs tens of extra milliseconds just to open and close).

## Connection Pooling

A pool is a cache of already-open connections that are reused instead of being opened and closed repeatedly: a request **borrows** a connection and **returns** it when done (it does NOT close it).

- **Active** connection: currently executing a query.
- **Idle** connection: waiting for a query, and still occupying 10–30 MB of memory while open.

Pool lifecycle:

1. **Init**: open the minimum (min) number of connections when the app starts.
2. **Borrow**: a request takes an idle connection immediately if one is available, otherwise it queues.
3. **Use**: run the query.
4. **Return**: reset the connection and give it back to the pool.
5. **Health check**: periodically verify that idle connections are still alive and replace dead ones.

Two kinds of pool:

- **Application-side** (lives inside the app process and can be tuned to your needs): `pg.Pool` (Node.js), HikariCP (Java).
- **Database-side / proxy** (a proxy process sits between the app and the DB): PgBouncer.

## When All Connections Are Busy

New requests go into a **waiting queue** and are served when a connection is returned. If the wait exceeds `connectionTimeoutMillis`, the pool throws an error. This is the right behavior, because it prevents the queue from growing without bound and exhausting memory. A pool that is frequently full with a growing queue is a sign that the pool is too small or the queries are too slow. Do not rush to increase the pool size, because that can make things worse.

## Little's Law

`L = λ × W`, where L = the average number of requests in the system (running + waiting), λ = arrival rate (req/s), W = the time a request spends in the system.

- 50 req/s × 20 ms (0.02 s) = **1 connection** on average.
- A slow query pushes service time up to 200 ms, so 50 × 0.2 = **10 connections**.

→ **Query latency determines connection demand.** A slow query is not just a UX problem but also an infrastructure scaling problem. Optimizing queries reduces the number of connections you need.

Maximum throughput: `max_throughput = pool_size / avg_service_time` (10 connections × 10 ms/query = 1000 req/s).

## Kingman's Formula

Queue length grows non-linearly (almost exponentially) as utilisation approaches 100%. **Do not run a pool above roughly 70–80% utilisation**: past that threshold, even a small burst causes abnormally long queues. This holds for every shared resource (CPU core, network bandwidth, DB connection). The first action when the pool is exhausted is to **reduce query latency**, not to increase the pool size.

## Pool Sizing: Process-to-Core Ratio

A DB can run in parallel only up to its number of CPU cores. More connections than cores are not faster, and are actually slower because the OS has to context-switch and processes wait for CPU.

`pool_size = (core_count × 2) + effective_spindle_count`

- `effective_spindle_count` = the number of disks the DB uses; with SSD or a managed cloud DB (RDS, Supabase) it counts as **1**.
- Example: a 4-core DB with SSD gives `(4 × 2) + 1 = 9 connections`. Nine connections can serve hundreds of concurrent users, because users mostly wait on I/O, not on CPU.

**Uber/Postgres:** reducing the number of connections (via PgBouncer) plus query optimization improved throughput more than adding connections did. A small, busy pool beats a large pool that has to context-switch.

## Multiple App Instances

`total_connections = pool_size × num_app_instances`

- Example: 10 app instances × pool size 20 = 200 connections; if `max_connections` is 100, some connections are **refused**.
- Serverless: functions that cold-start constantly must not open connections directly, so use a connection proxy (PgBouncer, RDS Proxy, Supabase Pooler).

## Key Takeaways

- A DB connection is a **real OS process**, not a lightweight object: opening one costs 20–100 ms and 5–10 MB of RAM.
- **Always use a connection pool in production**: raw connections do not scale.
- A bigger pool is **not always better**: use the formula `(cores × 2) + spindles`; more connections than cores cause context-switch overhead.
- **Little's Law** links query speed to connection demand, so optimize queries first.
- **Do not exceed ~70–80% utilisation** (Kingman): latency blows up non-linearly above this threshold.
- Account for **multiple app instances**: total connections = pool_size × number of instances, which must stay below `max_connections` or go through a proxy.
- **Serverless must use a connection proxy** (PgBouncer, RDS Proxy, Supabase Pooler).

> **See also:** [ProxySQL Connection Multiplexing](/Technology/Backend And Database/Practices/ProxySQL Connection Multiplexing) · [PostgreSQL HA Patroni Best Practices](/Technology/Backend And Database/Practices/PostgreSQL HA Patroni Best Practices)
