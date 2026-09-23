---
area: technology
domain: messaging
type: guide
title: Publisher Subscriber Pattern
description: Announce events to many interested consumers asynchronously through a message broker, without tightly coupling senders to receivers.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - messaging
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/publisher-subscriber
---

# Publisher Subscriber Pattern

Enable an application to announce events to multiple interested consumers asynchronously, without tightly coupling the senders to the receivers.

## Summary

- **Problem:** In distributed systems, components often need to share information when an event occurs. Sending messages directly to each receiver (point-to-point) does not scale well and makes the sender depend on the identity and state of the receivers.
- **Solution:** Introduce an asynchronous messaging subsystem:
  - **Publisher:** Packages the event into a message and sends it through an input channel.
  - **Subscriber:** Registers interest in specific message types through output channels.
  - **Message broker / event bus:** The intermediary that copies messages from the input channel and delivers them to every matching subscriber.
- **Benefits:**
  - **Loose coupling:** Senders and receivers operate independently and do not need to know about each other.
  - **High scalability:** Subscribers can be added or removed easily without affecting the publisher.
  - **Improved reliability:** The system keeps working even when some subscribers are offline.
  - **Better responsiveness:** After sending a message, the publisher can move on to other work without waiting for receivers to finish processing.
- **Message filtering mechanisms:**
  - **Topic-based:** Subscribers register for specific topics.
  - **Content-based (content filtering):** The message content is inspected to decide which subscribers receive it.
- **Implementation notes:**
  - **Idempotency:** Because a message may be delivered more than once (on failure or retry), subscribers must be designed to process the same message repeatedly without corrupting data.
  - **Message ordering:** There is no guarantee that subscribers receive messages in the order they were sent.
  - **Poison messages:** Use a dead-letter queue to hold messages that fail repeatedly, so they do not stall the system.

## When to Use

- You need to broadcast information to a large number of consumers.
- You are integrating applications built on different platforms or protocols.
- The system accepts an eventual consistency model.
- The sender does not require a real-time response from the receivers.

## When Not to Use

- The application has only a few consumers, and each needs completely different information.
- The application requires near-real-time interaction.

## Azure Examples

- **Azure Service Bus Topics:** Suited to enterprise messaging with complex filtering rules.
- **Azure Event Grid:** Suited to large-scale event-driven architecture and to reacting quickly to changes in Azure resources.
- **Azure Event Hubs:** Used for ingesting extremely high volumes of data and events (streaming data).

---

_Source: [Microsoft Learn - Publisher-Subscriber Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/publisher-subscriber)_

> **See also:** [Choreography Pattern](/Technology/System Design/Practices/Azure Design Patterns/Choreography Pattern) · [Competing Consumers Pattern](/Technology/System Design/Practices/Azure Design Patterns/Competing Consumers Pattern) · [Messaging Bridge Pattern](/Technology/System Design/Practices/Azure Design Patterns/Messaging Bridge Pattern)
