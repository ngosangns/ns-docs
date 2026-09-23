---
area: technology
domain: design-patterns
type: guide
title: Choreography Pattern
description: Describes decentralizing workflow logic across services that react to each other's events through a message broker, instead of relying on a central orchestrator.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - microservices
  - event-driven
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography
---

# Choreography Pattern

The Choreography pattern decentralizes workflow logic and distributes responsibilities among the different components of the system, rather than depending on a central orchestrator.

## Context and Problem

In microservices applications, a business transaction often requires the participation of several services.

- **Traditional approach (Orchestration):** Use a central service (the orchestrator) to drive the workflow. However, the orchestrator can become a performance bottleneck, a single point of failure, and a source of tight coupling.
- **Problem:** As the number of services grows, managing and changing the orchestrator becomes very complex.

## Solution (Choreography)

Let the services decide for themselves and take part in the workflow. Components interact without communicating directly, typically through a **Message Broker**.

- Each service does its own work and emits an event.
- Other services interested in that event automatically perform the next step.

## How It Works

1.  The **client** sends a request to an entry service.
2.  The service processes it and pushes a message to the **Message Broker**.
3.  Subscribing services check the message and, if it matches their business logic, pick it up and process it.
4.  When done, that service pushes a new message so other services can continue the process.

## Benefits

- **Loosely coupled:** Services don't need to know about each other's existence.
- **Scalability:** Services can be added or removed without breaking central logic.
- **Performance:** Removes the bottleneck of a central coordinator.
- **Serverless friendly:** A very natural fit for event-driven architectures.

## Issues and Considerations

- **Management complexity:** It is hard to track the overall state of a transaction because the logic is distributed.
- **Error handling:** Performing compensating transactions becomes more complex.
- **Execution order:** Hard to control if the process requires strictly sequential steps.

## When to Use This Pattern

- When components can process operations independently ("fire and forget").
- When you expect components to be updated or replaced frequently.
- When the current central orchestrator is having performance problems.

## Implementation Examples on Azure

- **Azure Service Bus & Event Grid:** Used to carry messages and events between microservices.
- **Azure Functions & Container Apps:** Host the event-driven business logic.

---

_Source: [Azure Architecture Center - Choreography pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography)_

> **See also:** [Saga Pattern](/Technology/System Design/Practices/Azure Design Patterns/Saga Pattern) · [Publisher Subscriber Pattern](/Technology/System Design/Practices/Azure Design Patterns/Publisher Subscriber Pattern) · [Compensating Transaction Pattern](/Technology/System Design/Practices/Azure Design Patterns/Compensating Transaction Pattern)
