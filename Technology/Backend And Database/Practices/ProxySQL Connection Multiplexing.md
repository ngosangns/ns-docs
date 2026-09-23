---
area: technology
domain: proxysql
type: resource
title: ProxySQL Connection Multiplexing
description: How ProxySQL connection multiplexing lets many frontend connections share few MySQL backend connections, when it is disabled, and how to tune it.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - proxysql
  - mysql
  - connection-pooling
resource: https://roninhub.com/tai-lieu/bai-viet/ap-dung-connection-multiplexing-trong-proxysql-de-toi-uu-ket-noi-database
---

# ProxySQL Connection Multiplexing

**Source:** [roninhub.com](https://roninhub.com/tai-lieu/bai-viet/ap-dung-connection-multiplexing-trong-proxysql-de-toi-uu-ket-noi-database)

## Overview

- Connection Multiplexing: many frontend connections share backend connections at an N:M ratio (instead of 1:1)
- Reduces pressure on the database layer

## The Problem with Thread-per-Connection (MySQL)

- Each connection spawns its own thread
- RAM/CPU usage climbs sharply with a large number of connections
- Context-switching overhead
- The `max_connections` limit (default 151)

## Architecture with ProxySQL

- **Without ProxySQL**: 3000 app connections = 3000 DB threads (1:1)
- **With ProxySQL multiplexing**: 3000 app connections share 100 backend connections (N:M)
- **Benefits**: Fewer direct connections to the DB, more stable performance, better use of resources, support for horizontal scaling

## Connection Multiplexing vs Connection Pooling

| Criterion         | Connection Pooling         | Connection Multiplexing                         |
| ----------------- | -------------------------- | ----------------------------------------------- |
| Concept           | Connections kept in a pool | Connections flexibly reused across many clients |
| Ratio             | 1:1                        | N:M                                             |
| Resources         | Medium                     | Low                                             |
| Implementation    | Application-level          | Proxy-level                                     |
| Session Isolation | Full                       | Conditional                                     |

## How It Works

1. The app connects to ProxySQL
2. ProxySQL analyzes the query/session
3. It picks a suitable backend connection
4. It sends the query and receives the result
5. It returns the backend connection to the pool

- A single frontend connection can run multiple queries over different backend connections (unless a transaction is open)

### Disabling Multiplexing

- When a transaction is detected, ProxySQL disables multiplexing and "pins" the backend connection until the transaction ends (to guarantee ACID)
- Other cases that disable multiplexing: user-defined variables, temporary tables, table locks, GET_LOCK, or global configuration

## Cases Where Multiplexing Is Disabled

- **Active Transaction**: While a transaction is active
- **Table Locks**: LOCK TABLE/FLUSH TABLES WITH READ LOCK
- **GET_LOCK**: When GET_LOCK() is used
- **Temporary Tables**: When a temporary table is created
- **Session/User Variables**: When @ variables are used
- **Disable by config**: mysql-multiplexing = false

## Delay Parameters

- Avoid errors when using auto-increment (for example: INSERT followed by SELECT LAST_INSERT_ID())
- `mysql-auto_increment_delay_multiplex`: number of queries to delay
- `mysql-connection_delay_multiplex_ms`: delay time (ms)

## Query Rules Control

- Control multiplexing per query type using query rules
- `multiplexing: 0` = disable, `1` = enable, `2` = do not disable for queries containing @

## Conclusion

- Connection Multiplexing helps optimize database performance, especially for high-concurrency systems
- You need to understand when multiplexing gets disabled, tune parameters correctly, and monitor regularly
- When configured correctly, multiplexing can cut backend connections by 80-90%

**References:**

- [ProxySQL Multiplexing Documentation](https://proxysql.com/documentation/multiplexing/)
- [YouTube: ProxySQL Multiplexing](https://www.youtube.com/watch?v=nHBmMjGx-J8)

> **See also:** [PostgreSQL HA Patroni Best Practices](/Technology/Backend And Database/Practices/PostgreSQL HA Patroni Best Practices) · [Vitess Distributed Database Best Practices](/Technology/Backend And Database/Practices/Vitess Distributed Database Best Practices)
