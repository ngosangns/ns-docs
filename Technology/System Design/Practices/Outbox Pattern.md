---
area: technology
domain: microservices
type: guide
title: Outbox Pattern
description: Explains how the Outbox Pattern with Change Data Capture (Debezium and Kafka) solves the dual-write problem in microservices, including the outbox table structure, duplicate handling, and eventual consistency.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - microservices
  - outbox
  - cdc
  - kafka
resource: https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/
---

# Outbox Pattern

## Overview

The Outbox Pattern is a design pattern that solves the **dual writes** problem in a microservices architecture. It keeps data consistent when a service must both update its database and send an event to a message broker (such as Apache Kafka).

## The Dual Writes Problem

### The Problem

- Microservices usually need to:
  - Update the service's own database
  - Send an event/message to a message broker (Kafka, RabbitMQ) to notify other services
- **The problem**: there is no shared transaction (XA transaction) across the database and the message broker
- **Consequence**: these situations can occur:
  - The DB write succeeds but sending the message fails → other services never learn about the change
  - The message is sent but the DB write fails → other services receive an event for data that doesn't exist

### Suboptimal Alternatives

- **Write only to Kafka**: the service has no "read your own writes" semantics and must wait for the event to be consumed before it sees the data
- **Write only to the DB**: there is no reliable way to notify other services

## The Outbox Pattern Solution

### Principle

- **Write to a single resource only**: the database
- **Ensure consistency**: use the database's ACID transaction
- **Publish events asynchronously**: use Change Data Capture (CDC) to read changes from the database and send them to the message broker

### How It Works

1. **Step 1 - Write to the database in a transaction**:
   - The service writes data to the main tables (e.g., `purchaseorder`, `orderline`)
   - **At the same time** it writes the event to the `outbox` table in the same transaction
   - ACID guarantees that either both succeed or both roll back

2. **Step 2 - Capture and publish the event**:
   - Debezium (or another CDC tool) watches the `outbox` table
   - When a new record appears in `outbox`, Debezium captures it and sends it to the corresponding Kafka topic
   - After a successful send, the record in `outbox` can be marked as processed (or deleted)

### Outbox Table Structure

- **id**: a unique UUID for each event
- **aggregatetype**: the aggregate type (e.g., "Order")
- **aggregateid**: the ID of the aggregate
- **eventtype**: the event type (e.g., "OrderCreated", "OrderLineUpdated")
- **payload**: the event content as JSON
- **timestamp**: the time the event was created

### Benefits

- **Consistency**: data and events always stay in sync thanks to the ACID transaction
- **Read your own writes**: the service can read back the data it just wrote without waiting for an event
- **Fault tolerance**: if Kafka is down, events remain stored in `outbox` and are sent once Kafka recovers
- **Replayability**: the entire event stream can be replayed from the beginning for a new consumer
- **Decoupling**: the service doesn't need to know about consumers; it only writes to `outbox`
- **Scalability**: new consumers can be added easily without changing the producer's code

## Handling Duplicate Events

### The Problem

- Message brokers usually have "at least once" semantics
- Duplicate processing can occur if:
  - The Debezium connector fails before acknowledging
  - The consumer service fails before acknowledging

### Solution

- **Message log**: the consumer service stores the UUIDs of processed events in a `consumed_messages` table
- **Idempotency check**: before processing an event, check whether its UUID has already been processed
- **Transaction**: mark the event as processed in the same transaction as the business logic

### Best Practices

- **Retry mechanism**: retry only a limited number of times before moving the message to a dead-letter queue
- **Housekeeping**: delete old events from the message log (after the offset has been committed with the broker)
- **Event structure**: treat the event structure as the service's API, with versioning and backward compatibility

## Eventual Consistency

- A system using the Outbox Pattern is **eventually consistent**
- Consumers may lag slightly behind the producer (usually a few seconds or sub-second)
- This is acceptable in most use cases
- End-to-end delay is low thanks to log-based CDC (near-realtime)

## Supporting Tools

- **Debezium**: a Change Data Capture platform supporting many databases (PostgreSQL, MySQL, MongoDB, etc.)
- **Kafka Connect**: the framework for connecting Debezium to Kafka
- **Debezium SMT (Single Message Transform)**: a ready-made SMT for routing outbox events (no custom SMT is needed as in the original article)

## Use Cases

- **Order Service → Shipment Service**: when a new order arrives, notify the shipment service
- **Order Service → Customer Service**: update the customer's credit balance
- **Data Warehouse**: store the full order history
- **Search Index**: update the Elasticsearch index when a new order arrives

## References

- Source: https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/
- Debezium Documentation: https://debezium.io/documentation/

> **See also:** [Kafka DLQ And Retry](/Technology/System Design/Practices/Kafka DLQ And Retry) · [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker)
