---
area: technology
domain: design-patterns
type: guide
title: Anti Corruption Layer Pattern
description: Describes how a façade or adapter layer translates between subsystems with different semantics so a new application's design is not constrained by legacy or external systems.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - migration
  - legacy
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer
---

# Anti Corruption Layer Pattern

The Anti-corruption Layer (ACL) pattern implements a façade or adapter layer between subsystems that don't share the same semantics. The layer translates requests that one subsystem makes to the other, ensuring that the design of the new application is not limited by dependencies on external or legacy systems.

## Context and Problem

Most applications depend on other systems for data or functionality. When migrating from a legacy system to a modern one:

- Legacy systems often have quality problems: complex data schemas and outdated APIs.
- To interact with them, the new application may be forced to conform to old infrastructure, protocols, or data models.
- Supporting these legacy features can "corrupt" the clean design of the modern application.

## Solution

Isolate the subsystems by placing an anti-corruption layer between them.

- The layer translates communication between the two systems.
- System A (new) uses its own data model and architecture.
- The ACL receives a request from A, converts it to a format that system B (legacy) understands, and does the reverse for responses.
- The ACL can be implemented as a component inside the application or as a standalone service.

## Issues and Considerations

- **Latency:** Adding a translation layer increases the response time of calls.
- **Management:** A new service or component has to be maintained, monitored, and deployed.
- **Scalability:** Work out how the ACL itself will scale.
- **Transience:** If the ACL is part of a migration strategy, consider retiring it once the legacy system has been fully replaced.
- **Consistency:** Ensure data and transaction consistency between the two systems across the translation layer.

## When to Use This Pattern

- When a migration plan happens over multiple phases but integration between the new and legacy systems must be maintained.
- When two or more subsystems have different semantics but still need to communicate.

## When Not to Use This Pattern

- When there are no significant semantic or data-model differences between the new and legacy systems.

## Well-Architected Framework Alignment

- **Operational Excellence:** Helps preserve the design quality of new components and reduces technical debt by keeping legacy business rules and data models from affecting the new architecture.

---

_Source: [Azure Architecture Center - Anti-corruption Layer pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)_

> **See also:** [Strangler Fig Pattern](/Technology/System Design/Practices/Azure Design Patterns/Strangler Fig Pattern) · [Gateway Routing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Routing Pattern) · [Messaging Bridge Pattern](/Technology/System Design/Practices/Azure Design Patterns/Messaging Bridge Pattern)
