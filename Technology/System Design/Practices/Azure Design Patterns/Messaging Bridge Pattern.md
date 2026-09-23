---
area: technology
domain: design-patterns
type: guide
title: Messaging Bridge Pattern
description: Explains building a bridge component that relays messages between incompatible messaging infrastructures, such as MSMQ and Azure Service Bus, without changing existing systems.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - messaging
  - integration
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/messaging-bridge
---

# Messaging Bridge Pattern

This pattern is used to integrate disparate systems built on different messaging infrastructures.

## Summary

- **Problem:** Organizations often own several systems that use different messaging platforms such as MSMQ, RabbitMQ, Azure Service Bus, or Amazon SQS (because of acquisitions, mergers, or extending on-premises systems to the cloud). Forcing these systems to communicate over HTTP usually requires large code changes and makes connection management complex.
- **Solution:** Introduce a "Bridge" component that connects to two or more different messaging infrastructures at the same time.
  - The bridge takes messages from the source system and pushes them into the destination system without changing the content (payload).
  - The sending and receiving systems don't need to know about each other or about the bridge.
- **Benefits:**
  - **Minimal change:** No need to modify the source code of existing systems.
  - **High reliability:** Takes advantage of the messaging systems' "at-least-once" delivery, which is better than calling HTTP directly.
  - **Flexible migration:** Lets you migrate parts of the system to the new platform on a roadmap instead of converting everything at once.
- **Challenges and considerations:**
  - **Technology limits:** The bridge must respect the limits of both sides (for example, the maximum message size differs between MSMQ and Azure Storage Queues).
  - **Duplication:** If one side uses distributed transactions and the other doesn't, the bridge needs a deduplication mechanism.
  - **Error handling:** You need appropriate retry and Circuit Breaker policies to avoid misclassifying a message as a "poison message" when an infrastructure failure occurs.

## When to Use This Pattern

- You need to integrate existing systems with minimal code-change effort.
- Integrating legacy applications that can't be upgraded to modern messaging technologies.
- Connecting geographically distributed systems where internet connectivity is unreliable.
- Gradually migrating a system from one messaging infrastructure to another.

## When Not to Use This Pattern

- One of the systems depends on a particular feature that the other platform doesn't have.
- The interaction requires an immediate response (synchronous communication).
- The data volume is so large that using a messaging system becomes too expensive or exceeds capacity.

## Real-World Example

A legacy on-premises HR application uses **MSMQ**. When building a new service on Azure that uses **Service Bus**, instead of rewriting the legacy application, you create a Messaging Bridge:

1. It reads messages from the MSMQ queue.
2. It pushes those messages straight into a Service Bus topic/queue.
3. The Azure service receives and processes them as if they were internal messages.

---

_Source: [Microsoft Learn - Messaging Bridge Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/messaging-bridge)_

> **See also:** [Anti Corruption Layer Pattern](/Technology/System Design/Practices/Azure Design Patterns/Anti Corruption Layer Pattern) · [Publisher Subscriber Pattern](/Technology/System Design/Practices/Azure Design Patterns/Publisher Subscriber Pattern) · [Strangler Fig Pattern](/Technology/System Design/Practices/Azure Design Patterns/Strangler Fig Pattern)
