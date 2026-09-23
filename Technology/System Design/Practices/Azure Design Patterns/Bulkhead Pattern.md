---
area: technology
domain: design-patterns
type: guide
title: Bulkhead Pattern
description: Explains how isolating application components into separate resource pools keeps a failure or overload in one pool from cascading, with a Kubernetes resource-limit example.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - resilience
  - fault-tolerance
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead
---

# Bulkhead Pattern

The Bulkhead pattern is a type of application design that is tolerant of failure. In a bulkhead architecture (also called a cell-based architecture), application elements are isolated into pools so that if one fails, the others keep working. The name comes from the partitions in a ship's hull: if the hull is punctured, only the damaged section fills with water, which prevents the ship from sinking entirely.

## Context and Problem

- A cloud application may consist of multiple services. Excessive load or a failure in one service affects every consumer of that service.
- A consumer may send requests to several services at once. If one service responds slowly or fails, the resources used for that request (such as connection pools and threads) may not be released in time, leading to resource exhaustion across the whole system.
- A failure on one side can trigger a cascading failure.

## Solution

Partition service instances into different groups based on consumer load and availability requirements.

- **Client-side resource partitioning:** For example, assign a dedicated connection pool to each service the client calls. If one service fails, only that connection pool is affected.
- **Service-side partitioning:** Deploy services into separate virtual machines, containers, or processes to isolate resources.

## Benefits

- Isolates consumers and services from cascading failures.
- Preserves some application functionality even when a service fails.
- Makes it possible to offer different quality-of-service (QoS) levels to different consumers (for example, a priority consumer group uses priority resources).

## Issues and Considerations

- Define partitions based on business and technical requirements.
- Weigh the degree of isolation the technology provides against operational overhead and performance.
- Combine with other patterns such as **Retry**, **Circuit Breaker**, and **Throttling**.
- Use libraries such as **resilience4j** or **Polly** (for .NET) to build client-side bulkheads.
- Using containers (Docker, Kubernetes) is a good low-cost way to isolate resources.

## When to Use This Pattern

- When you need to isolate resources for backend services, especially when the application can still work partially if one service is unresponsive.
- When you want to protect the application from cascading failures.
- When you need to tier consumers (critical and standard).

## Implementation Example (Kubernetes)

The following configuration creates an isolated container for a service with its own CPU and memory limits:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: drone-management
spec:
  containers:
    - name: drone-management-container
      image: drone-service
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "1"
```

---

_Source: [Azure Architecture Center - Bulkhead pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead)_

> **See also:** [Circuit Breaker Pattern](/Technology/System Design/Practices/Azure Design Patterns/Circuit Breaker Pattern) · [Retry Pattern](/Technology/System Design/Practices/Azure Design Patterns/Retry Pattern) · [Throttling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Throttling Pattern)
