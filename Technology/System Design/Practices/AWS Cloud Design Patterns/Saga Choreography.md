---
area: technology
domain: distributed-transactions
type: guide
title: Saga Choreography
description: Describes the Saga Choreography pattern, which keeps data consistent across services through event subscriptions instead of a central coordinator, with an AWS order-flow example.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - distributed-transactions
  - event-driven
  - aws
  - design-patterns
---

# Saga Choreography

Saga Choreography is a way to maintain data integrity in distributed transactions that span multiple services by using event subscriptions. Instead of a central controller, each service in the transaction does its own part and publishes events that trigger the next steps in other services.

## Core Idea

- **Self-coordination**: Each service participating in the Saga emits an event after completing its local transaction. Other services subscribe to that event and perform the corresponding action.
- **Alternative to 2PC**: In a microservices architecture where each service has its own database, Two-Phase Commit (2PC) is very difficult to use. Saga Choreography solves this by chaining local transactions together.

## When to Use

- The system requires data integrity across different data stores.
- The data store (such as NoSQL) does not support ACID transactions or 2PC.
- You want to avoid a single point of failure caused by a central coordinator.
- The services in the Saga are independent and need loose coupling.

## Considerations

- **Complexity at scale**: As the number of microservices grows, managing the interactions between them becomes extremely difficult.
- **Idempotency**: Services must be able to handle the same event multiple times without corrupting data.
- **Observability**: It is hard to trace the transaction flow end to end and to debug when errors occur.
- **Cyclic dependencies**: Services can end up waiting on each other's events, creating an endless loop or a deadlock.

## Implementation on AWS

- **Amazon EventBridge**: Uses event buses to route events between services. Each service publishes its result to the event bus, and rules determine which service should be triggered next.
- **AWS Lambda**: Each step in the Saga (including both the main transactions and the compensating transactions) is implemented as a Lambda function.

## Example Flow (Placing an Order)

1. **Order Service**: Creates the order (T1) -> publishes an `Order placed` event to EventBridge.
2. **Inventory Service**: Listens for `Order placed` -> updates inventory (T2) -> publishes an `Inventory updated` event.
3. **Payment Service**: Listens for `Inventory updated` -> processes the payment (T3).
4. **If Payment fails**:
   - Payment Service runs a compensating transaction (C1) to undo the payment -> publishes a `Payment failed` event.
   - **Inventory Service**: Listens for `Payment failed` -> restores inventory (C2) -> publishes an `Inventory reverted` event.
   - **Order Service**: Listens for `Inventory reverted` -> cancels the order (C3).

> **See also:** [Saga Orchestration](/Technology/System Design/Practices/AWS Cloud Design Patterns/Saga Orchestration) · [Transactional Outbox](/Technology/System Design/Practices/AWS Cloud Design Patterns/Transactional Outbox) · [Event Sourcing](/Technology/System Design/Practices/AWS Cloud Design Patterns/Event Sourcing)
