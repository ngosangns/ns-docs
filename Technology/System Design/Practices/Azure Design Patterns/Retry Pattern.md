---
area: technology
domain: resilience
type: guide
title: Retry Pattern
description: Handle transient failures when connecting to services or network resources by transparently retrying failed operations, with backoff and idempotency in mind.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - resilience
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/retry
---

# Retry Pattern

## Summary

The Retry pattern lets an application handle transient failures when connecting to a service or network resource by transparently retrying the failed operation. Self-healing failures such as momentary network loss or a briefly unavailable service are the usual candidates. A failed call can be cancelled when the fault is permanent, retried immediately for rare network noise, or retried after a delay with exponential backoff. Idempotency decides whether repeating the call is safe, and an error should be reported only after the final attempt fails.

## Key Points

- **Purpose**: Cope with self-healing failures such as momentary network loss, a temporarily unavailable service, or timeouts while a service is busy.
- **Handling strategies**:
  - **Cancel**: Apply when the failure is identified as non-transient or is certain to fail again on retry.
  - **Retry immediately**: Use for rare failures such as network noise or corrupted packets.
  - **Retry after a delay**: Often uses _exponential backoff_ (increasing the wait time exponentially) to avoid adding pressure to an already overloaded service.
- **Considerations**:
  - **Performance**: Retrying too many times at too short intervals can degrade the application's overall performance and cause the system to hang.
  - **Idempotency**: Critical to ensure that repeating an operation multiple times has no unintended side effects (for example: not charging for an order twice).
  - **Logging**: Log failed attempts as informational entries, and report a genuine error only if the final attempt still fails.
- **When to avoid**:
  - Failures caused by faulty business logic or internal errors that cannot self-recover.
  - When the service is failing for a prolonged period (use a Circuit Breaker in this case).
  - To mask scalability problems.

Momentary network loss, a busy timeout, or a short outage can be retried. Rare packet noise can be retried immediately. An overloaded service should wait, and exponential backoff stretches that wait so retries do not add load. Repeating a charge is the idempotency case to avoid. Each failed try is only an informational log until the last try still fails. A long outage belongs with a circuit breaker. Do not use retries to hide faulty business logic or a scalability problem.

## Relationships

- **Circuit Breaker Pattern**: Combined with Retry to handle prolonged failures, so the system does not waste resources retrying when the service is truly "down".
- **Idempotency Pattern**: Ensures it is safe to re-execute commands that modify data.

## References

- [Microsoft Learn - Retry Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry)

> **See also:** [Circuit Breaker Pattern](/Technology/System Design/Practices/Azure Design Patterns/Circuit Breaker Pattern) · [Throttling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Throttling Pattern) · [Rate Limiting Pattern](/Technology/System Design/Practices/Azure Design Patterns/Rate Limiting Pattern)
