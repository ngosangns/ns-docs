---
area: technology
domain: resilience
type: guide
title: Circuit Breaker
description: Describes the Circuit Breaker pattern, which stops a caller from repeatedly calling a failing or slow service, its three states, and how to build it on AWS.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - resilience
  - aws
  - design-patterns
---

# Circuit Breaker

This pattern prevents a calling service (caller) from repeatedly retrying calls to another service (callee) that is failing repeatedly or responding slowly. It also helps detect when the callee is working again.

## Core Idea

It works like an electrical circuit breaker that automatically cuts the current when a fault occurs. A Circuit Breaker object sits between the caller and the callee and "trips" if the callee is unavailable, so the system does not hang or exhaust resources waiting in vain.

## Three States

- **CLOSED**: The circuit is closed and requests are forwarded to the callee normally.
- **OPEN**: The circuit is open; requests are blocked and fail immediately (fail fast) without calling the callee.
- **HALF-OPEN**: After a period of time, the system lets a small number of requests through to check whether the callee has recovered. If they succeed, the circuit closes (CLOSED); if they keep failing, it opens again (OPEN).

## When to Use

- When the caller makes calls that are likely to fail.
- When the callee responds so slowly that the caller times out.
- When calls are synchronous and the callee is unavailable.

## Advantages

- **Prevents cascading failures**: Protects the system from a chain-reaction collapse.
- **Saves resources**: Avoids wasting thread pools, memory, and bandwidth on requests that are bound to fail.
- **Improves user experience**: Returns errors faster instead of making users wait for a timeout.

## Implementation on AWS

- **AWS Step Functions**: Use "Express Workflows" to manage state and circuit-checking logic.
- **Amazon DynamoDB**: Stores the circuit state (Circuit Status) and expiry time (ExpiryTimeStamp). DynamoDB TTL can automatically remove expired records.
- **Amazon ElastiCache**: Can replace DynamoDB to keep the circuit state in memory for better performance.
- **Lambda Functions**: Perform the service call logic and update the circuit state on failure.

## Notes

- **Observability**: Log failed calls made while the circuit is OPEN so they can be monitored.
- **Manual intervention**: Administrators should be able to force the circuit open or closed when necessary.

> **See also:** [Retry With Backoff](/Technology/System Design/Practices/AWS Cloud Design Patterns/Retry With Backoff) · [Saga Orchestration](/Technology/System Design/Practices/AWS Cloud Design Patterns/Saga Orchestration)
