---
area: technology
domain: vitess
type: resource
title: Vitess Distributed Database Best Practices
description: Community-derived best practices for Vitess MySQL sharding, covering cross-shard transactions, CDC and the outbox pattern, distributed transaction patterns, and deployment.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - vitess
  - mysql
  - sharding
  - distributed-transactions
---

# Vitess Distributed Database Best Practices

## Overview

This document compiles opinions and best practices about Vitess, a database sharding solution for MySQL, with a particular focus on cross-shard transactions, CDC (Change Data Capture), and distributed system design.

## Cross-Shard Transactions

### The Core Problem

**Original question:** Does Vitess have a way to guarantee that cross-shard write transactions stay correct?

**Conclusion:**

- **By default Vitess does NOT guarantee** cross-shard transactions
- If one of the shards fails, the transaction is left in an inconsistent state
- Vitess has no complete connector for this; some companies build and sell their own (for example: PlanetScale)

### Solution: Two-Phase Commit (2PC)

- 2PC can be used to guarantee ACID for cross-shard transactions
- **Drawbacks:**
  - Significantly lower performance
  - Higher CPU usage
  - Not reliable under network partitions, split brain, or timeouts

**Best Practice:** Avoid cross-shard transactions as much as possible

## Designing to Avoid Cross-Shard Transactions

### Use Case Analysis

#### Use Case 1: An API for a single user (~80% of cases)

- **Characteristic:** The API is used by exactly one user
- **Solution:** Queries normally filter by, or stay within the scope of, a single userId
- **Result:** No cross-shard transaction occurs

#### Use Case 2: An API that works with many different users

- **Problem:** Leads to cross-shard transactions
- **Solution:** Redesign the system/application
  - Break the task into multiple separate, retryable transactions
  - Example: deleting 500 users -> group users by shard (1-xxx, 2-xxx, ...)
  - Push each group onto a durable queue (Kafka)
  - Workers pick up messages and run the transaction (consumer groups ensure parallelism)
  - Retry with backoff on failure
- **Requirement:** Make sure the business logic only needs atomicity/ACID within one specific database, not across the whole cluster
- **Nature:** Usually results in eventual consistency

#### Use Case 3: Cross-shard transactions are unavoidable (~1-2% of cases)

- **Situation:** A cross-shard transaction (CS TX) is needed, with all-or-nothing semantics over several different userIds
- **Solution:**
  1. Restructure the feature if possible
  2. Switch to a partitioning model instead of sharding
  3. Use a single master for that table
- **Principle:** If you need to prioritize ACID across a whole table, do not shard it

#### Use Case 4: OLAP (Online Analytical Processing)

- **Characteristic:** Mostly reads
- **Solution:** Use dedicated OLAP databases
- **Note:** Cross-shard transactions are not a concern

### Data Planning

**Key principles:**

- A **data planning** step is required before sharding
- Tables that are frequently joined must live on the same master
- Rows that are used together must be on the same shard
- Design from UI/UX -> API -> Backend -> Database

**Experience:**

- Split by domain; do not split too finely, but do not make pieces too large either
- If pieces are too large, the DB design easily ends up cross-shard
- Scaling to ~50 million users -> around ~260 machines running Vitess to be stable
- Do not cram everything into one cluster -> it becomes extremely hard to manage

## Change Data Capture (CDC) and Event Streaming

### Original Problem

- Need to capture insert, update, and delete events from Vitess
- Debezium + Kafka is the standard solution but hard to implement yourself
- Vitess VStream can also capture events through vtgate
- **Open question:** When using VStream, can you tell whether a captured event belongs to user1 or user2?

### Best Practice: Outbox Pattern

**Instead of reading CDC directly:**

- Use the **Outbox Pattern** at the application layer
- It ensures consistency and is easier to manage
- Fits many use cases

**Note:** Whether to use CDC or the Outbox Pattern depends on the specific case

### VStream and Event Identification

- VStream captures events through vtgate
- Logically, Vitess abstracts away the processing behind it
- Users see a single database rather than many distributed databases
- Check the Vitess documentation on how to identify which shard/user an event comes from

## Distributed Transaction Patterns

### Two-Phase Commit (2PC)

- **Characteristic:** Slowest, not reliable under network partitions, split brain, or timeouts
- **Use:** When strict ACID must be guaranteed

### Saga Pattern

- **Characteristic:** Compensating transactions
- **Use:** When eventual consistency is acceptable and rollback logic is needed

### Log Replication + Leader Election (Paxos, Raft)

- **Characteristic:** The most general and most commonly used
- **Note:** Easy to get wrong if not implemented properly, especially leader leasing
- **Use:** Common in modern distributed systems

### Three-Phase Commit (3PC)

- **Characteristic:** Solves the problems of 2PC, but in practice nobody uses it because it is error-prone

### Atomic Broadcast

- **Characteristic:** See Zookeeper
- **Note:** Some papers have found gaps, but they are rarely encountered in practice
- **Reference:** jepsen.io

## Architecture and Deployment

### Suggested Architecture

```
1 Load Balancer
2 vtgate (gateway)
4 vtablet (tablet server)
```

### Deployment

**Docker Swarm:**

- Good for learning and testing
- Run each component on its own virtual machine to simulate scalability
- Online, most people use Kubernetes (more complex)

**Notes:**

- Take the system apart and learn one component at a time to keep things simple
- First write everything into a single docker compose file, then spread out across more nodes

### Alternatives

**Google Cloud Spanner:**

- People who moved to Spanner say they do not want to move back to another solution
- A managed service: less to worry about, but it has a cost

## Consolidated Best Practices

### Sharding Design

1. **Shard by logical domain:**
   - Split by domain; not too fine, not too large
   - Design from UI/UX -> API -> Backend -> Database

2. **Data Planning:**
   - Frequently joined tables must be on the same master
   - Rows that are used together must be on the same shard
   - The shard key must be designed carefully (for example: userId)

3. **Limit Cross-Shard Operations:**
   - Design so that ~80% of use cases need no cross-shard work
   - Break large tasks into multiple separate transactions
   - Use the queue and worker pattern

### Handling Cross-Shard Transactions

1. **Avoid when possible:**
   - Redesign the feature
   - Switch to partitioning instead of sharding
   - Use a single master for tables that need strict ACID

2. **When unavoidable:**
   - Use 2PC (accepting the performance loss)
   - Or accept eventual consistency with the Saga pattern

### Event Streaming and CDC

1. **Outbox Pattern:**
   - Prefer the Outbox Pattern at the application layer
   - It ensures consistency and is easy to manage

2. **CDC when needed:**
   - Debezium + Kafka is the standard solution
   - Vitess VStream can be used but requires checking the documentation

### Scale and Management

1. **Scale:**
   - ~50 million users -> ~260 machines running Vitess
   - Do not cram everything into one cluster

2. **Learning:**
   - Take it apart and learn piece by piece
   - Start with docker compose, then distribute
   - Learn how the engine organizes and manages files first, then move up to writes

## Conclusion

### Summary

- Vitess does not guarantee cross-shard transactions by default
- The best practice is to design so that cross-shard transactions are avoided (~80% of use cases)
- When cross-shard is needed, use 2PC or accept eventual consistency
- Data planning and shard key design are critically important
- The Outbox Pattern is usually better than reading CDC directly

### Recommendations for Students

1. **Start simple:**
   - Learn one part at a time
   - Start with docker compose
   - Learn the engine first, then move up to writes

2. **Practice:**
   - Build a Vitess cluster with Docker Swarm
   - Test different use cases
   - Understand the trade-off between ACID and performance

3. **Advanced:**
   - Study CDC + Kafka + the Saga pattern
   - Research distributed transaction patterns
   - Read the material on jepsen.io about distributed systems

## References

- Vitess Documentation
- Jepsen.io - Testing distributed systems
- Debezium Documentation
- Google Cloud Spanner
- PlanetScale (commercial Vitess solution)

---

**Note:** This document is compiled from a community discussion. Best practices may vary depending on the context and requirements of each project.

> **See also:** [ProxySQL Connection Multiplexing](/Technology/Backend And Database/Practices/ProxySQL Connection Multiplexing) · [PostgreSQL HA Patroni Best Practices](/Technology/Backend And Database/Practices/PostgreSQL HA Patroni Best Practices)
