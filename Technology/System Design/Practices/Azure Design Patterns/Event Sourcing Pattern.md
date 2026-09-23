---
area: technology
domain: design-patterns
type: guide
title: Event Sourcing Pattern
description: Explains storing every change to an entity as an immutable sequence of events in an append-only store, with materialized views, replay, snapshots, and trade-offs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - event-sourcing
  - data
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
---

# Event Sourcing Pattern

Instead of storing only the current state of data in a relational database, the Event Sourcing pattern stores the full series of actions (events) performed on an object in an append-only store. This store acts as the system of record and can be used to reconstruct the state of domain objects.

## Context and Problem

In the traditional CRUD model, the application reads data, modifies it, and writes the latest state back to the DB (usually using transactions to lock data). This approach has several limitations in high-load systems:

- **Performance:** Locking data causes resource contention and slows the system as it scales.
- **Scalability:** Synchronous data operations can create bottlenecks and increase latency.
- **Auditability:** Only the current state is stored, so change history is lost unless a separate logging mechanism exists.

## Solution

Store every change as a sequence of events. Each event describes a logical action (for example, `ItemAddedToOrder`, `OrderCanceled`).

- **Event Store:** The store for events. It only allows appends, never updates or deletes. It is the single source of truth.
- **Materialized Views:** Because reading and replaying all events to obtain the current state is expensive, the system usually builds "materialized views" — read-only projections of the data optimized for querying.
- **Replay:** You can reconstruct the state of any entity at any point in time by replaying the events related to that entity.

## Benefits

- **Performance and scalability:** A write is just an append, causing no contention or locking. Event-processing tasks can run in the background.
- **Perfect audit trail:** Provides a full and accurate history of everything that happened, which is extremely useful for debugging, reporting, and regulatory compliance.
- **Decoupling:** The code that produces events is completely separate from the systems that consume them.
- **Recoverability:** You can easily restore system state from any point in the past by rerunning the sequence of events.

## Issues and Considerations

- **Eventual consistency:** There is a delay between when an event is written and when the materialized views are updated.
- **Versioning:** When the event structure changes (migration), handling old events from the past becomes difficult.
- **Data volume:** The event stream can become very long. The remedy is **snapshots** (capturing state at a point in time) to reduce replay time.
- **Idempotency:** Event-consuming systems must ensure that processing the same event multiple times does not corrupt data.

## When to Use This Pattern

- When you need to record the intent and reason for a data change (for example, "Customer changed address" rather than just updating the `Address` column).
- When you need to minimize update contention.
- When you need auditing and strict control over change history (finance, insurance).
- When combined with the **CQRS** pattern.

## When Not to Use This Pattern

- Simple applications that don't need very high performance or large-scale growth.
- Systems that need immediate (strong) consistency for every data view.
- Simple business domains where the traditional CRUD model already works well.

## Real-World Example

A conference seat-reservation system: instead of storing only `TotalSeatsReserved`, the system stores `SeatReserved` and `SeatCanceled` events. To know the number of free seats, it simply sums these events. If there is a conflict, the system relies on the order of events in the Event Store to decide who successfully reserved the seat.

---

_Source: [Azure Architecture Center - Event Sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)_

> **See also:** [CQRS Pattern](/Technology/System Design/Practices/Azure Design Patterns/CQRS Pattern) · [Materialized View Pattern](/Technology/System Design/Practices/Azure Design Patterns/Materialized View Pattern) · [Compensating Transaction Pattern](/Technology/System Design/Practices/Azure Design Patterns/Compensating Transaction Pattern)
