---
area: technology
domain: distributed-transactions
type: guide
title: Saga Pattern
description: Keep data consistent across microservices with a sequence of local transactions and compensating transactions, using choreography or orchestration instead of two-phase commit.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - distributed-transactions
  - microservices
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/saga
---

# Saga Pattern

## Summary

The Saga pattern maintains data consistency in distributed systems by coordinating transactions across multiple services. A saga is a sequence of local transactions in which each service performs its own operation and triggers the next step through an event or message. If a step fails, the saga executes compensating transactions to undo the steps that already completed.

## Key Points

- **Purpose**: Ensure data consistency (eventual consistency) in a microservices architecture without using traditional distributed transactions (such as 2PC, Two-Phase Commit).
- **Main components**:
  - **Compensable transactions**: Transactions that can be undone.
  - **Pivot transaction**: The point of no return. After this step, compensating transactions no longer apply, and the system must complete the remaining steps.
  - **Retryable transactions**: Transactions after the pivot point, which must be idempotent so they can be retried until they succeed.
- **Two implementation approaches**:
  - **Choreography**: Services exchange events with each other without a central coordinator. Suitable for simple flows with few services.
  - **Orchestration**: A central orchestrator manages the workflow, commands the services, and handles failure recovery. Suitable for complex flows.
- **Considerations**:
  - **Complexity**: Debugging and tracing a saga becomes hard as the number of services grows.
  - **Data anomalies**: Because there is no isolation between services, problems such as _lost updates_, _dirty reads_, and _fuzzy reads_ can occur.
  - **Countermeasures**: Use application-level locks (semantic lock), commutative updates, or re-check values before updating.

## When to Use

- You need data consistency in a distributed system without tight coupling.
- You need the ability to roll back (compensate) if an operation in the chain fails.

## Relationships

- **Compensating Transaction Pattern**: Provides the mechanism for undoing steps that were already performed.
- **Retry Pattern**: Helps handle transient failures in retryable steps.
- **Choreography Pattern**: One of the two main ways to implement a saga.

## References

- [Microsoft Learn - Saga Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga)

> **See also:** [Compensating Transaction Pattern](/Technology/System Design/Practices/Azure Design Patterns/Compensating Transaction Pattern) · [Choreography Pattern](/Technology/System Design/Practices/Azure Design Patterns/Choreography Pattern) · [Scheduler Agent Supervisor Pattern](/Technology/System Design/Practices/Azure Design Patterns/Scheduler Agent Supervisor Pattern)
