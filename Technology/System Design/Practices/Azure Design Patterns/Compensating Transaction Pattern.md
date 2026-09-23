---
area: technology
domain: design-patterns
type: guide
title: Compensating Transaction Pattern
description: Explains how to undo the steps of an eventually consistent, multi-step operation by running compensating actions instead of a traditional ACID rollback, with a travel-booking example.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - distributed-transactions
  - reliability
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction
---

# Compensating Transaction Pattern

The Compensating Transaction pattern is used to undo work performed by a series of steps in an eventually consistent operation. If one or more steps in the process fail, the pattern brings the system back to a stable state instead of relying on a traditional (ACID) rollback mechanism.

## Context and Problem

In cloud computing and distributed systems:

- Transactions usually can't use strong locking because it would seriously hurt performance and scalability.
- Complex business operations are often split into many small steps that run on different services (a microservices architecture).
- When a step in the middle or at the end of the process fails, you can't simply "roll back" the earlier steps, because the data may already have been changed by other processes or permanently saved in different data stores.

## Solution

Instead of a rollback, the system runs a series of **compensating transactions** that reverse the effects of the steps that previously succeeded.

- Each step in the main process must have a corresponding "compensating" step (for example, the "Book ticket" step is compensated by "Cancel ticket").
- The system needs to log the steps that completed successfully so it knows which compensating steps to run when something goes wrong.
- A compensating transaction is an intelligent process: it doesn't just overwrite the old state, but must account for current business changes.

## Issues and Considerations

- **Idempotency:** Steps in a compensating transaction can fail and have to be rerun several times. They must therefore be designed so the result is the same whether they run once or many times.
- **Execution order:** Compensating steps don't necessarily have to run in exactly the reverse order of the main process. Some can run in parallel.
- **Observability:** The system needs to closely monitor the compensation process. If compensation also fails, manual human intervention may be needed.
- **Temporary data:** While the process is in flight (neither completed nor canceled), the system may be temporarily in an inconsistent state.

## When to Use This Pattern

- When running long-running business processes (long-running transactions) or distributed transactions that don't support ACID.
- In systems based on the **Saga** model (Saga pattern).
- When restoring state by overwriting is infeasible or too complex from a business standpoint.

## Example: Booking a Trip

A customer books a trip made up of three steps:

1. **Book a flight:** Charge the account and hold the seat.
2. **Book a hotel:** Reserve a room.
3. **Rent a car:** Reserve a vehicle.

If step 3 (renting a car) fails:

- The system can't do a DB-style "rollback" because the money has already been charged.
- **The compensating transactions run:**
  - Call the hotel API to cancel the room (H1).
  - Call the airline API to cancel the ticket and run the refund process (F1). Note: the refund may follow business rules (for example, only 90% of the fee is refunded).

## Well-Architected Framework Alignment

- **Reliability:** Helps the system recover on its own from failures in critical processing flows, ensuring data consistency in the long run.
- **Disaster Recovery:** Provides a way to handle transactions that are stuck or failed because of service incidents.

---

_Source: [Azure Architecture Center - Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)_

> **See also:** [Saga Pattern](/Technology/System Design/Practices/Azure Design Patterns/Saga Pattern) · [Choreography Pattern](/Technology/System Design/Practices/Azure Design Patterns/Choreography Pattern) · [Scheduler Agent Supervisor Pattern](/Technology/System Design/Practices/Azure Design Patterns/Scheduler Agent Supervisor Pattern)
