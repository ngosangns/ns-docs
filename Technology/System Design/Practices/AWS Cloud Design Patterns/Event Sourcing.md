---
area: technology
domain: event-sourcing
type: guide
title: Event Sourcing
description: Describes the Event Sourcing pattern, which stores every state-changing event in an immutable event store and rebuilds state by replay, with challenges and AWS implementations.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - event-sourcing
  - event-driven
  - aws
  - design-patterns
---

# Event Sourcing

Instead of storing only the current state of the data, Event Sourcing stores all the events that led to that state change in an immutable data store (the event store). The current state can be reconstructed by "replaying" these events in chronological order.

## Core Idea

- Every state change is treated as a separate event object that cannot be modified and is ordered by when it occurred.
- The **Event Store** acts as the Single Source of Truth (SSOT).

## When to Use

- You need an immutable history for tracking, auditing, and compliance.
- You need to reconstruct the system state at any point in the past (point-in-time recovery).
- Systems with heavy write volume that do not need immediate real-time processing for complex queries.
- You need multiple representations of the data (projections) built from the same source.

## Challenges and Considerations

- **Complexity**: Requires a mindset shift from traditional CRUD to event-driven thinking. Handling replay and ensuring idempotency can be complex.
- **Eventual consistency**: Because of the delay in propagating updates from the event store to the read models, data may not immediately reflect the latest state.
- **Querying**: Querying current data from the event log is slow, so it is usually combined with the CQRS (Command Query Responsibility Segregation) pattern.
- **Size and cost**: The event store grows quickly over time, so you need an archiving strategy and periodic snapshots.

## Implementation on AWS

- **Event Store**: Amazon Kinesis Data Streams, Amazon EventBridge, or Amazon Managed Streaming for Apache Kafka (Amazon MSK).
- **Storage and auditing**: Amazon S3 (commonly used for long-term storage of events from Kinesis).
- **Event processing**: AWS Lambda receives events, transforms them, and updates the read database.
- **Materialized views**: Use Amazon Aurora or DynamoDB to store the processed current state (the read model) for fast queries.

## Example (Ride-Hailing App)

1. A customer requests a ride -> a `Ride booked` event is sent to **Kinesis**.
2. The event is delivered to **S3** to keep the history.
3. A Lambda function reads the event from Kinesis and updates the ride information in **Aurora** (materialized view) so users can see the status.
4. When the ride ends, the system replays all events for that ride to compute the final route and invoice.

> **See also:** [Transactional Outbox](/Technology/System Design/Practices/AWS Cloud Design Patterns/Transactional Outbox) · [Saga Choreography](/Technology/System Design/Practices/AWS Cloud Design Patterns/Saga Choreography)
