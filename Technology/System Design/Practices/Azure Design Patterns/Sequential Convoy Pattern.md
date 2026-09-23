---
area: technology
domain: messaging
type: guide
title: Sequential Convoy Pattern
description: Process related messages in a defined order without blocking other message groups, using categories and message sessions to keep FIFO while scaling out.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - messaging
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/sequential-convoy
---

# Sequential Convoy Pattern

## Summary

The Sequential Convoy pattern processes a set of related messages in a defined order without blocking the processing of other message groups. It addresses the challenge in distributed systems of needing ordering guarantees (FIFO) while still wanting to scale out to handle heavy load.

## Key Points

- **Purpose**: Ensure that messages belonging to the same group (category) are processed in the order they arrived, while different groups can be processed in parallel.
- **How it works**:
  - Classify incoming messages into "categories" (for example: by Order ID).
  - Use locking in the queuing system so that each listener takes and processes only one message at a time within the same category.
  - In Azure Service Bus, this is done through **Message Sessions**.
- **Benefits**:
  - Maintains strict ordering for interdependent data (for example: create order -> payment -> delivery).
  - Allows scale-out by processing many different "convoys" on different workers.
- **Considerations**:
  - **Throughput**: Strict FIFO requirements limit scalability. Not suitable for extremely high-load scenarios (millions of messages per second).
  - **Network latency**: Messages may arrive out of order because of the network. Consider using sequence numbers to check.
  - **Bottleneck**: The initial queue processor (ledger processor) can become a bottleneck if it is not designed well.

## When to Use

- When messages must be processed in the order they were sent.
- When messages can be categorized so the categories serve as the unit of scale-out for the system.

## Relationships

- **Competing Consumers Pattern**: Sequential Convoy improves on this pattern by adding an ordering constraint for groups of related messages.
- **Azure Service Bus Sessions**: The main Azure tool for implementing this pattern.

## References

- [Microsoft Learn - Sequential Convoy Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sequential-convoy)

> **See also:** [Competing Consumers Pattern](/Technology/System Design/Practices/Azure Design Patterns/Competing Consumers Pattern) · [Priority Queue Pattern](/Technology/System Design/Practices/Azure Design Patterns/Priority Queue Pattern) · [Publisher Subscriber Pattern](/Technology/System Design/Practices/Azure Design Patterns/Publisher Subscriber Pattern)
