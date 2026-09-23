---
area: technology
domain: design-patterns
type: guide
title: CQRS Pattern
description: Covers Command Query Responsibility Segregation, which splits read and write operations into separate models to improve performance, scalability, and security.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - cqrs
  - data
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs
---

# CQRS Pattern

CQRS (Command Query Responsibility Segregation) is a design pattern that separates data read and write operations into distinct data models. This approach lets each model be optimized independently, improving the application's performance, scalability, and security.

## Context and Problem

In traditional architectures (such as CRUD), a single data model is usually used for both reads and writes. As the application grows, this approach runs into challenges:

- **Data asymmetry:** The fields needed to update data often differ from the fields needed to display it.
- **Lock contention:** Concurrent reads and writes on the same dataset cause conflicts and reduce performance.
- **Performance:** It is hard to optimize for both writes (which need normalized data to ensure integrity) and reads (which need denormalized data for fast queries).
- **Security:** Permissions are hard to manage when a single entity allows both reading and writing.

## Solution (CQRS)

Split the system into two parts:

- **Commands:** Operations that change data state (Create, Update, Delete). Commands focus on business tasks (for example, "Book hotel room" rather than "Set room status = Booked").
- **Queries:** Operations that read data. Queries never change data and typically return DTOs (Data Transfer Objects) optimized for the user interface.

### Implementation levels

1. **Logical separation (single data store):** Use one shared database but keep the code that handles reads and writes separate.
2. **Separate data stores:** Use separate databases for reads and writes (for example, SQL for writes to ensure relational integrity and NoSQL for reads to query quickly). A synchronization mechanism (usually event-driven) is needed between the two stores.

## Benefits

- **Independent scaling:** The read side (usually under higher load) can be scaled without scaling the write side.
- **Schema optimization:** The read database can store data in an already aggregated form (Materialized Views) to avoid complex joins.
- **Better security:** It is easy to control who can change data and who can only view it.
- **Separation of Concerns:** Keeps code cleaner, with the write side focused on complex business logic and the read side focused on display performance.

## Issues and Considerations

- **Increased complexity:** Requires a more complex architecture and a skilled development team.
- **Eventual consistency:** With two separate databases, read data may lag slightly behind freshly written data. The application must accept and handle this delay.
- **Message handling:** A message broker is often needed to synchronize data, which brings problems such as message failures and duplicates.

## When to Use This Pattern

- Systems with a very high read load compared with the write load.
- Applications with complex business logic that need strict data integrity protection on the write side.
- Large team environments where teams can work independently on the read side and the write side.
- When integrating with the **Event Sourcing** pattern.

## When Not to Use This Pattern

- Simple applications or purely CRUD-style management systems.
- When the business logic is not very complex and current database performance is still sufficient.

---

_Source: [Azure Architecture Center - CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)_

> **See also:** [Event Sourcing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Event Sourcing Pattern) · [Materialized View Pattern](/Technology/System Design/Practices/Azure Design Patterns/Materialized View Pattern) · [Index Table Pattern](/Technology/System Design/Practices/Azure Design Patterns/Index Table Pattern)
