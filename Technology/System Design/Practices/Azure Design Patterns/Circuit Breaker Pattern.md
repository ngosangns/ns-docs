---
area: technology
domain: design-patterns
type: guide
title: Circuit Breaker Pattern
description: Explains how a circuit-breaker proxy with Closed, Open, and Half-Open states stops an application from repeatedly calling a failing remote service and prevents cascading failures.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - resilience
  - fault-tolerance
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
---

# Circuit Breaker Pattern

The Circuit Breaker pattern handles faults that might take an unknown amount of time to fix when connecting to remote services or resources. It stops the application from making futile attempts, giving the system time to recover and avoiding cascading failures.

## Context and Problem

In a distributed environment, calls to remote services can fail because of transient faults (slow network, timeouts). However, some faults are more serious and long-lasting:

- If the application keeps retrying (Retry) an operation that is certain to fail, it ties up critical resources (memory, threads, database connections).
- Resource exhaustion in one part of the system can cause failures in other, unrelated parts.

## Solution

Use a proxy that acts as a "circuit breaker" between the application and the remote service. The proxy monitors the number of recent failures and decides whether to let the operation proceed or to return an error immediately.

### The three states of a Circuit Breaker

- **Closed:** The normal state. Requests are forwarded to the service. The proxy counts failures. If the failure count exceeds a threshold within a time period, it switches to **Open**.
- **Open:** Requests from the application immediately fail (fail-fast) without calling the service. A timeout timer is started. When it expires, the breaker moves to **Half-Open**.
- **Half-Open:** A limited number of requests are allowed through to test whether the service has recovered:
  - If they succeed: switch back to **Closed** and reset the failure counter.
  - If they fail: return to **Open** and restart the timer.

## Comparison with the Retry Pattern

- **Retry pattern:** Lets the application retry an operation in the expectation that it will eventually succeed.
- **Circuit Breaker pattern:** Prevents the application from performing an operation that is likely to fail.
- **Combining them:** Typically, Retry is used to handle transient faults inside a Circuit Breaker mechanism.

## Issues and Considerations

- **Exception handling:** The application must handle the case where the Circuit Breaker is Open (for example, returning stale data from a cache or showing a friendly error message).
- **Monitoring:** Log state changes so the operations team knows when the system is having problems.
- **Recoverability:** Configure the timeout and failure threshold to suit the characteristics of the backend service.
- **Manual override:** Give administrators a way to manually close or open the circuit when maintenance is needed.

## When to Use This Pattern

- To prevent cascading failures and protect system resources.
- When connecting to third-party services or services with low reliability.
- When you need to keep the system responsive even when part of the backend is failing.

## When Not to Use This Pattern

- Handling local resource access failures inside the application's memory.
- As a substitute for error handling in business logic.
- When ordinary Retry algorithms are enough to solve the problem.

---

_Source: [Azure Architecture Center - Circuit Breaker pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)_

> **See also:** [Retry Pattern](/Technology/System Design/Practices/Azure Design Patterns/Retry Pattern) · [Bulkhead Pattern](/Technology/System Design/Practices/Azure Design Patterns/Bulkhead Pattern) · [Throttling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Throttling Pattern)
