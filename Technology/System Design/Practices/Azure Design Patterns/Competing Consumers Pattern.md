---
area: technology
domain: design-patterns
type: guide
title: Competing Consumers Pattern
description: Explains how multiple consumers can process messages from a single queue concurrently to improve throughput, scalability, and availability, including poison-message and idempotency concerns.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - messaging
  - scalability
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers
---

# Competing Consumers Pattern

The Competing Consumers pattern lets multiple consumers process messages received on the same messaging channel concurrently. This helps the system optimize throughput, improve scalability and availability, and balance the workload.

## Context and Problem

In cloud applications, the number of requests can vary significantly over time:

- Processing each request synchronously can block the application's business logic.
- Using a single consumer instance can overload it when traffic spikes.
- You need a mechanism to coordinate multiple consumers so that each message is processed by **exactly one** consumer and the workload is distributed evenly.

## Solution

Use a message queue (**Message Queue**) as the communication channel between the application (the producer) and the instances of the consuming service (the consumers).

- The application puts requests into the queue as messages.
- Multiple instances of the consuming service pull messages from the queue and process them independently.
- **Note:** Unlike the Publish-Subscribe pattern (where every consumer receives every message), in the Competing Consumers pattern each message is delivered to only one consumer.

## Benefits

- **Load leveling:** The queue acts as a buffer, letting the system absorb large swings in request volume.
- **Reliability:** If a consumer instance fails, the message isn't lost and is processed by another instance.
- **Scalability:** The number of consumers can easily be raised or lowered based on queue length (auto-scaling).
- **Resiliency:** With transactions, a message that fails processing can be returned to the queue to be retried.

## Issues and Considerations

- **Message ordering:** Nothing guarantees consumers receive messages in the order they were created. The system should be designed to process messages **idempotently**.
- **Poison messages:** A malformed message can crash a consumer. You need a mechanism to move such messages to a dead-letter queue (**Dead-letter queue**) after a number of failed retries.
- **Handling results:** Consumers are completely decoupled from the sending application. If results must be returned, another mechanism such as a reply queue must be used.
- **Idempotency:** Ensure that processing the same message multiple times doesn't cause errors or data inconsistencies.

## When to Use This Pattern

- When work can run asynchronously and tasks are independent of one another.
- When the workload varies continuously and you need a solution that can scale.
- When the system requires high availability and resilience when handling failures.

## Implementation Examples on Azure

- **Azure Service Bus queues:** Support the `PeekLock` mechanism, which lets a consumer take a message without deleting it right away. If processing succeeds, the consumer calls `Complete`; if it fails, it calls `Abandon` so the message becomes visible to another consumer again.
- **Azure Functions:** Can automatically scale out the number of executions based on the Service Bus queue length, acting as "competing consumers".

---

_Source: [Azure Architecture Center - Competing Consumers pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers)_

> **See also:** [Queue Based Load Leveling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Queue Based Load Leveling Pattern) · [Priority Queue Pattern](/Technology/System Design/Practices/Azure Design Patterns/Priority Queue Pattern) · [Publisher Subscriber Pattern](/Technology/System Design/Practices/Azure Design Patterns/Publisher Subscriber Pattern)
