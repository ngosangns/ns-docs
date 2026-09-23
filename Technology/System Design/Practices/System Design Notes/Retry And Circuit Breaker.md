---
area: technology
domain: resilience
type: guide
title: Retry And Circuit Breaker
description: Covers retry with gradual backoff, the Circuit Breaker pattern, distributed transaction techniques such as SAGA, and the Outbox pattern for reliable messaging.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - resilience
  - microservices
  - distributed-transactions
resource: https://engineering.grab.com/attribution-platform
---

# Retry And Circuit Breaker

## Retrying Without Causing Outages

Many people retry immediately when an error occurs. But to be more refined, you can implement a Fibonacci-style retry: for example, retry after 1 second, then 3 seconds, then 5 seconds, and so on.

Why? Gradually increasing the time between retries gives the system time to recover while reducing concurrent pressure on the failing service. It avoids the "service comes back up and dies again" situation caused by being flooded too fast.

In practice, few people use Laravel queues; they write their own workers in Golang instead. The vast majority (99%) use the default queue or Horizon. But few people pay attention to factors such as `backoff`, `unique`, `skipping job`, etc.

For Kafka consumers, the delay and DLQ material distilled from the Golang Vietnam thread (10/04/2026) is in [Kafka DLQ And Retry](/Technology/System Design/Practices/Kafka DLQ And Retry).

I once ran into a real situation: service A called service B. When B had an incident, A kept retrying without any control, so B would come up for a while and then crash again. The solution is that when B is working again, traffic should only be pushed back gradually by applying a smart backoff mechanism in the retries – that stabilizes the system much more.

### Miscellaneous

- Evaluating ad effectiveness: an article from Grab's engineering team about their Attribution Platform, a system used to measure and evaluate the effectiveness of advertising campaigns.
  - Source: https://engineering.grab.com/attribution-platform
- View (possibly related to how view counts are displayed or processed):
  - Nghệ thuật xử lý background job (The Art of Handling Background Jobs): https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4 (this link may relate to updating view counts asynchronously)

## Design Patterns

- Aggregator & Proxy: Design Patterns for Microservices — Aggregator Pattern & Proxy pattern | by Nisal Pubudu | Nerd For Tech | Medium - https://medium.com/nerd-for-tech/design-patterns-for-microservices-aggregator-pattern-99c122ac6b73
- SAGA: Distributed transaction - SAGA pattern - Transaction isolation (viblo.asia) - https://viblo.asia/p/distributed-transaction-saga-pattern-transaction-isolation-gGJ590MalX2
- Top 10 Microservices Design Patterns and Principles - Examples (javarevisited.blogspot.com): https://javarevisited.blogspot.com/2021/09/microservices-design-patterns-principles.html#axzz7pw6wS3gQ

### Circuit Breaker Pattern

- **Overview**: a design pattern that helps distributed systems improve fault tolerance and recover quickly from incidents, by blocking requests to a failing service and allowing retries after a set period
- **How it works**:
  - **Closed state**: the system operates normally and requests are forwarded to the service
  - **Open state**: when the number of errors exceeds the allowed threshold, the Circuit Breaker switches to the "Open" state, blocking further requests to the service to avoid adding pressure and to give the service time to recover
  - **Half-Open state**: after a set period, the Circuit Breaker switches to the "Half-Open" state to check whether the service has recovered by letting some trial requests through
  - **State transitions**: if the service works normally in the Half-Open state, the Circuit Breaker returns to "Closed". If errors persist, it goes back to "Open"
- **Benefits**:
  - Prevents failures from spreading through the system by isolating the failing service
  - Improves the system's resilience and reliability
  - Reduces load on the struggling service, giving it time to recover
  - Avoids the "thundering herd" problem, where many requests try to hit a failing service at once
- **Usage in Java**: use a library such as Resilience4j to implement the Circuit Breaker, which helps manage and monitor service state and improves system reliability
- Source: https://viblo.asia/p/cung-tim-hieu-ve-circuitbreaker-trong-java-zXRJ8PKMJGq

### Distributed Transactions

- Comparing Distributed Transaction patterns in microservices (grokking.org): http://newsletter.grokking.org/issues/191-so-sanh-cac-m-u-distributed-transaction-trong-microservices-783202
- Distributed transaction - Two-phase commit (Viblo): https://viblo.asia/p/distributed-transaction-two-phase-commit-naQZRBemZvx
- Blocking Retry, Two-Phase Commit (2PC) and Three-Phase Commit (3PC).
- Use queues to process asynchronously in the background, TCC. Compensation Matters.
- Local Message Table (Asynchronously Ensured)/Outbox Pattern, MQ Transaction.
- Saga Pattern, Event Sourcing, CQRS, Atomic Commitment.
- Parallel Commits, Transactional Replication, Consensus Algorithms.
- Timestamp Ordering, Optimistic Concurrency Control, Byzantine Fault Tolerance (BFT).
- Distributed Locking, Sharding, Multi-Version Concurrency Control (MVCC).
- Distributed Snapshots, Leader-Follower Replication
- Saga pattern with Orchestration & Choreography.
  - With the Saga pattern there are 2 types, Choreography and Orchestration; what they share is that both are message driven.
    - **Choreography - Event based**.
    - **Orchestration - Command based**.
- Parallel pipeline.
- Distributed locks with Redis: https://redis.io/docs/manual/patterns/distributed-locks
- The problem of 2 orders arriving at the same time (related to Kafka and the database): https://www.facebook.com/groups/645391349250568/posts/1897008380755519

### Outbox Pattern

In distributed systems (i.e. microservices), a common situation is that you need to write to one service's database and then fire an event (also called a message) to a message broker (commonly RabbitMQ or Kafka) so other services can receive it and continue processing. In this situation, one of the two actions may fail. For example, the DB write hasn't succeeded yet but the message has already been sent to another service, which can cause data inconsistency. The Outbox Pattern is a simple way to handle this problem.

#### How the Outbox Pattern Works

- **Step 1**: the transaction includes two actions: writing the new data to the main table (e.g. `orders`) and, at the same time, saving the information to be sent (the message) in an `outbox` table in the database. Because both happen in the same transaction, ACID is guaranteed: either both writes succeed, or you get nothing.
- **Step 2**: after the transaction completes, a separate process reads the records from the `outbox` table, sends the information to the message broker, and then marks the record as processed. You'll notice it's very similar to the database queue jobs in Laravel. This process can be implemented as a cronjob, or as a daemon job listening for changes directly from the `outbox` table (CDC, or Change Data Capture).

#### Benefits of the Outbox Pattern

- **Consistency**: ensures consistency between the database and the message broker. Because a transaction covers both the DB update and the write to the outbox, we can rely on ACID consistency.
- **Fault tolerance**: if the message broker has a problem, the system still keeps the unsent messages in the `outbox` table and sends them after the problem is resolved.
- **Easy to extend**: the **Outbox Pattern** makes it easy to extend the system with other microservices without disrupting the core system. When a new service needs to be integrated, I only need to tweak the process that scans the outbox table so it also fires to the new service, which is simpler and limits impact on the old source code.

_Author: Huy Nguyen_

- See more details: [Outbox Pattern](/Technology/System Design/Practices/Outbox Pattern)

> **See also:** [Outbox Pattern](/Technology/System Design/Practices/Outbox Pattern) · [Kafka DLQ And Retry](/Technology/System Design/Practices/Kafka DLQ And Retry) · [Circuit Breaker Pattern](/Technology/System Design/Practices/Azure Design Patterns/Circuit Breaker Pattern)
