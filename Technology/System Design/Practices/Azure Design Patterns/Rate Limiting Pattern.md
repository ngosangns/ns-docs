---
area: technology
domain: resilience
type: guide
title: Rate Limiting Pattern
description: Control resource consumption by capping the rate of access to a capacity-limited service, avoiding throttling errors and keeping throughput predictable.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - resilience
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern
---

# Rate Limiting Pattern

## Summary

The Rate Limiting pattern helps control resource consumption by imposing a limit on the rate of access to a service. This avoids throttling errors, makes throughput predictable, and optimizes the use of services with limited capacity.

## Key Points

- **Purpose**:
  - Reduce throttling errors from capacity-limited services.
  - Reduce excess traffic compared with the naive "retry on error" approach.
  - Reduce memory consumption by fetching data only when there is capacity to process it.
- **Usage context**: Best suited to large-scale, repetitive automated tasks such as batch processing.
- **How it works**:
  - Controls the number or size of operations sent to a service within a specific time window.
  - Uses durable messaging systems such as Azure Service Bus, Queue Storage, or Event Hubs as a buffer.
  - Can partition the service's capacity and use distributed mutual exclusion (for example: Blob Lease in Azure Storage) to manage exclusive locks on those partitions.
- **Implementation strategies**:
  - **Even distribution**: Instead of sending 100 requests per second, send 20 requests every 200 milliseconds to keep the resource flow steady.
  - **Lease management**: Uncoordinated processes can compete to acquire a "lease" on logical partitions. Each lease grants a fixed amount of processing capacity.
- **Considerations**:
  - You still need to handle throttling errors if they occur.
  - All workstreams that access the same service must be integrated into the shared rate limiting strategy.
  - Monitor contention between different applications that access the same limited service.

## Relationships

- **Throttling**: Rate limiting is often implemented in reaction to a service that applies throttling.
- **Retry**: When a throttling error occurs, retry after a suitable delay.
- **Queue-Based Load Leveling**: Similar, but Rate Limiting focuses specifically on efficient access to capacity-limited services and has a notion of distributed capacity management.

## References

- [Microsoft Learn - Rate Limiting Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern)

> **See also:** [Throttling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Throttling Pattern) · [Retry Pattern](/Technology/System Design/Practices/Azure Design Patterns/Retry Pattern) · [Queue Based Load Leveling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Queue Based Load Leveling Pattern)
