---
area: technology
domain: event-driven
type: guide
title: Transactional Outbox
description: Describes the Transactional Outbox pattern, which solves the dual-write problem by saving events in the same transaction as the data, using an outbox table or change data capture.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - event-driven
  - distributed-transactions
  - aws
  - design-patterns
---

# Transactional Outbox

The Transactional Outbox pattern solves the "dual write" problem in distributed systems: a single operation that both writes to a database and sends a message or event, but cannot guarantee atomicity.

## The Dual Write Problem

- If the DB write succeeds but sending the event fails: downstream services do not know a change occurred.
- If the DB write fails but the event is still sent: the data is inconsistent and downstream services act on information that does not exist.

## Core Idea

Instead of sending the event directly to a message broker, the application saves the event to a temporary table called the **Outbox Table**, in the same transaction as the main data table. A separate process then reads the outbox table and publishes the events.

## Two Main Implementation Approaches

### Using an Outbox Table (With a Relational Database)

- **Mechanism**: Business data and event data are saved to two different tables (`MainTable` and `OutboxTable`) within the same RDS DB transaction.
- **Processing**: A service periodically polls the outbox table, sends the messages to SQS/SNS, and deletes or marks them as processed in the outbox table after a successful send.
- **Advantage**: Guarantees strict consistency between data and events.

### Using Change Data Capture (CDC)

- **Mechanism**: Takes advantage of the database's own ability to capture data changes.
- **Implementation on AWS**: Uses **Amazon DynamoDB Streams**. When data in DynamoDB changes, a stream automatically records it.
- **Processing**: A Lambda function listens to DynamoDB Streams and pushes the corresponding event to SQS/SNS.
- **Advantage**: Reduces the burden of manually managing an outbox table and uses features the database already provides.

## When to Use

- Building event-driven applications.
- You need atomicity across two different services.
- Implementing the **Event Sourcing** pattern.

## Considerations

- **Duplicate messages**: The sender may deliver duplicates, so consuming services must be **idempotent**.
- **Message ordering**: Very important in Event Sourcing to restore data accurately. Use SQS FIFO if strict ordering is required.
- **No events on rollback**: Only transactions that have been committed successfully may put events into the outbox or stream.

## Example (Booking a Flight)

1. **Flight Service**: Saves the ticket information to the `Flights` table AND saves a `FlightBooked` event to the `Outbox` table (or writes to a DynamoDB table with Streams enabled).
2. **Event Processor**: Reads from the outbox/stream and sends a message to the **Payment Service** via SQS.
3. **Payment Service**: Receives the message and charges the customer. If step 1 fails, the whole transaction is rolled back and no message is sent, so the customer is never charged wrongly.

> **See also:** [Event Sourcing](/Technology/System Design/Practices/AWS Cloud Design Patterns/Event Sourcing) · [Saga Choreography](/Technology/System Design/Practices/AWS Cloud Design Patterns/Saga Choreography)
