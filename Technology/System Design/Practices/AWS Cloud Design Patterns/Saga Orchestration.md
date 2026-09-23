---
area: technology
domain: distributed-transactions
type: guide
title: Saga Orchestration
description: Describes the Saga Orchestration pattern, which uses a central orchestrator such as AWS Step Functions to coordinate distributed transactions and compensating actions.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - distributed-transactions
  - aws
  - design-patterns
---

# Saga Orchestration

Saga Orchestration uses a central coordinator (the **Orchestrator**) to manage and coordinate distributed transactions that span multiple services. The orchestrator is responsible for calling the participating services in the right order and for triggering compensating transactions if any step fails.

## Core Idea

- **Central coordinator**: Acts like an orchestra conductor: it knows the entire process and instructs individual services to do their work.
- **State management**: The orchestrator tracks the state of each step in the distributed transaction and decides the next step based on the returned result.

## When to Use

- The system requires data integrity across different data stores.
- Complex transactions involve many services (more than 3-4 services).
- You want to reduce direct dependencies between microservices (loose coupling) by centralizing the coordination logic in one place.
- You use NoSQL or other systems that do not support ACID transactions in the 2PC (Two-Phase Commit) style.

## Considerations

- **Complexity**: Designing compensating transactions and error-handling logic requires careful investment.
- **Idempotency**: Participating services must be idempotent to handle the orchestrator calling them multiple times after transient errors.
- **Single point of failure**: If the orchestrator fails, the whole process stalls. (Using managed services such as AWS Step Functions helps address this.)
- **Latency**: Compensating transaction steps can increase the total response time of the system.

## Implementation on AWS

- **AWS Step Functions**: An ideal service for implementing the orchestrator.
  - Provides a state machine mechanism to manage the workflow.
  - Built-in error handling, retry, and wait capabilities.
  - Visualizing the process makes it easy to monitor and debug.
- **AWS Lambda**: Performs the specific tasks of each service (for example, creating an order, deducting inventory, making a payment).

## Example Flow (Successful and Failed Order)

1. **Start**: The client calls API Gateway, which triggers Step Functions.
2. **Success path**:
   - `Place Order` (Lambda) -> `Update Inventory` (Lambda) -> `Make Payment` (Lambda) -> **Success**.
3. **Failure path** (assume the payment fails):
   - `Make Payment` returns an error.
   - The orchestrator triggers: `Revert Payment` (if needed) -> `Revert Inventory` -> `Remove Order` -> **Ends in a Failed state**.

> **See also:** [Saga Choreography](/Technology/System Design/Practices/AWS Cloud Design Patterns/Saga Choreography) · [Retry With Backoff](/Technology/System Design/Practices/AWS Cloud Design Patterns/Retry With Backoff) · [Circuit Breaker](/Technology/System Design/Practices/AWS Cloud Design Patterns/Circuit Breaker)
