---
area: technology
domain: migration
type: guide
title: Strangler Fig Pattern
description: Incrementally migrate a legacy system by routing functionality through a façade and replacing it piece by piece with new services until the old system can be retired.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - migration
  - modernization
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig
---

# Strangler Fig Pattern

## Summary

The Strangler Fig pattern incrementally migrates a legacy system by replacing specific pieces of functionality with new applications and services. Over time, the new system covers all of the legacy system's features, allowing you to safely decommission the old one.

## Key Points

- **Purpose**: Modernize a system without a risky, all-at-once ("Big Bang") replacement.
- **How it works**:
  1. **Create a façade (proxy)**: Place an intermediary layer between the client applications and the legacy system. Initially, all requests are still forwarded to the legacy system.
  2. **Transition gradually**: As each new feature is developed, the façade routes the related requests to the new system while the remaining parts still use the legacy system.
  3. **Retire the legacy system**: Once all functionality has moved to the new system, the legacy system is decommissioned.
  4. **Remove the façade**: Finally, the intermediary layer can be removed so clients connect directly to the new system.
- **Benefits**:
  - Minimizes the risk of service disruption.
  - Lets you migrate at a pace that matches the complexity of the project.
  - Customers do not notice the change on the backend.
- **Considerations**:
  - **Data sharing**: You must solve how both systems access and synchronize the database during migration.
  - **Bottleneck**: The façade can become a single point of failure or cause a performance bottleneck if it is not designed well.
  - **Consistency**: Make sure data stays consistent between the two systems (commonly using techniques such as ETL or shadow writes).

## When to Use

- When migrating a large, complex backend application to a new architecture (for example: from monolith to microservices).
- When the legacy system must keep running for a long time while modernization takes place.

## Relationships

- **Messaging Bridge Pattern**: Can be used to bridge communication between the legacy and new systems.
- **Anti-corruption Layer**: Often used together to ensure the new system is not affected by the outdated designs of the legacy system.

## References

- [Microsoft Learn - Strangler Fig Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)

> **See also:** [Anti Corruption Layer Pattern](/Technology/System Design/Practices/Azure Design Patterns/Anti Corruption Layer Pattern) · [Messaging Bridge Pattern](/Technology/System Design/Practices/Azure Design Patterns/Messaging Bridge Pattern) · [Gateway Routing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Routing Pattern)
