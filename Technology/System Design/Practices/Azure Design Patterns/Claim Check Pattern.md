---
area: technology
domain: design-patterns
type: guide
title: Claim Check Pattern
description: Explains how to move large payloads out of a messaging system by storing them externally and sending only a claim-check token, with Azure Blob Storage and Service Bus examples.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - messaging
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/claim-check
---

# Claim Check Pattern

The Claim-Check pattern lets systems transfer large data packages without overloading the messaging system. Instead of sending the entire content in a message, the content is stored in an external data store and only a "claim check" (a unique token or key) is sent through the messaging system.

## Context and Problem

Traditional messaging systems are usually optimized for large numbers of small messages and impose a message size limit (for example, Azure Service Bus has a limit of 1 MB or 100 MB depending on the tier).

- Sending large messages can exceed these limits.
- It can slow down the whole system because of the resources spent on serialization, encryption, and transmission.

## Solution

1.  **Store:** The sending application stores the payload in an external data store (such as Azure Blob Storage).
2.  **Create a token:** The sender creates a "claim check" token that points to the data's location.
3.  **Send the message:** The sender sends a small message containing this token through the messaging system.
4.  **Receive and retrieve:** The receiving application gets the message, reads the token, and uses it to download the original content from the data store.
5.  **Process:** The receiver processes the data and cleans up if needed.

## Issues and Considerations

- **Data deletion:** You need a strategy for deleting data after it has been consumed to avoid storage costs. Deletion can be synchronous, done by the receiving application, or asynchronous, done by a periodic sweeper process.
- **Conditional implementation:** Use this pattern only when a message exceeds a certain size. For small messages, send them directly to reduce latency.
- **Security:** The data store must be tightly protected so that only authorized applications can retrieve data with the token.

## When to Use This Pattern

- **Size limits exceeded:** When the data is larger than the messaging system allows.
- **Performance protection:** When sending large messages reduces the system's throughput.
- **Sensitive data protection:** When you don't want sensitive content to be visible in, or pass through, the messaging system (it lives only in the secure store).
- **Complex routing:** To avoid large data having to travel through multiple intermediaries.

## Well-Architected Framework Benefits

- **Reliability:** Separating the data makes recovery easier from a dedicated store rather than depending on the message queue.
- **Security:** Allows finer-grained access control at the data store.
- **Cost:** Smaller messages may allow the use of cheaper messaging service tiers.
- **Performance:** Offloads the message broker, letting messages be delivered faster.

## Implementation Examples on Azure

- **Payload:** Stored in **Azure Blob Storage**.
- **Message (token):** Sent through **Azure Service Bus**, **Queue Storage**, or **Event Hubs**.
- **Automation:** **Azure Event Grid** can automatically raise an event when a file is uploaded to Blob Storage, and this event acts as the "claim check".

---

_Source: [Azure Architecture Center - Claim-Check pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/claim-check)_

> **See also:** [Valet Key Pattern](/Technology/System Design/Practices/Azure Design Patterns/Valet Key Pattern) · [Queue Based Load Leveling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Queue Based Load Leveling Pattern) · [Publisher Subscriber Pattern](/Technology/System Design/Practices/Azure Design Patterns/Publisher Subscriber Pattern)
