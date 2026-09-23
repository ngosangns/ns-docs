---
area: technology
domain: resilience
type: guide
title: Throttling Pattern
description: Control resource consumption per application instance, tenant, or service so the system keeps meeting its SLAs under sudden demand spikes.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - resilience
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling
---

# Throttling Pattern

## Summary

The Throttling pattern controls the resource consumption of an application instance, an individual tenant, or an entire service. This lets the system keep operating and meet its service-level agreements (SLAs) even when a sudden spike in demand puts extreme pressure on resources.

## Throttling Strategies

- **Reject requests**: Block requests from a specific user if they exceed n requests per second within a time window.
- **Degrade functionality**: Disable or reduce the quality of non-essential services to reserve resources for critical ones (for example: lowering video streaming resolution).
- **Load leveling**: Use a queue to regulate the flow of work (Queue-based Load Leveling).
- **Defer operations**: Suspend low-priority tasks and tell users to try again later.
- **Third-party integration**: Reduce the number of concurrent requests to third-party services that are having problems, to avoid flooding logs and wasting money on useless retries.

## Key Points and Considerations

- **Purpose**:
  - Ensure the system meets its SLAs.
  - Prevent a single tenant from monopolizing resources (Noisy Neighbor).
  - Optimize cost by capping the maximum resource level.
- **Combine with autoscaling**: Throttling can be a temporary measure while waiting for the system to scale out (because provisioning new resources is not instantaneous).
- **Response error codes**: Return HTTP **429 (Too Many Requests)** or **503 (Server Too Busy)** along with a `Retry-After` header so the client knows when to retry.
- **Dynamic configuration**: Throttling settings should be managed externally (External Configuration Store) so they can be changed at runtime without redeploying code.

## When to Use

- To keep the system stable under fluctuating load.
- To keep tight control over operating costs.
- In multi-tenant systems, to ensure fairness of resources.

## Relationships

- **Queue-based Load Leveling Pattern**: A common way to implement throttling, using a queue as a buffer.
- **Priority Queue Pattern**: Helps maintain performance for important requests while throttling less important ones.
- **Rate Limiting Pattern**: Throttling is usually a server-side mechanism that Rate Limiting (client-side) tries to avoid triggering.

## References

- [Microsoft Learn - Throttling Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling)

> **See also:** [Rate Limiting Pattern](/Technology/System Design/Practices/Azure Design Patterns/Rate Limiting Pattern) · [Queue Based Load Leveling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Queue Based Load Leveling Pattern) · [Priority Queue Pattern](/Technology/System Design/Practices/Azure Design Patterns/Priority Queue Pattern)
