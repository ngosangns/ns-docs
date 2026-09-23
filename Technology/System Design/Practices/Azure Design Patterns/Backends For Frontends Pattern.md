---
area: technology
domain: design-patterns
type: guide
title: Backends For Frontends Pattern
description: Describes creating a separate backend service per client interface so each frontend gets a tailored experience instead of forcing one shared backend to serve conflicting needs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - api
  - microservices
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends
---

# Backends For Frontends Pattern

The Backends for Frontends (BFF) pattern describes how to separate backend services from frontend implementations in order to tailor the experience for different client interfaces. It is useful when you want to avoid customizing a single shared backend for too many kinds of interfaces.

## Context and Problem

An application may start out with only a desktop web interface and a companion backend service. As needs change:

- A mobile app is added, with a different screen size, performance profile, and display limitations.
- A single backend serving several kinds of frontends runs into conflicting requirements, which creates bottlenecks in development and updates.
- Maintaining backward compatibility for every type of client on one deployment resource becomes overwhelming.

## Solution

Introduce a new layer that handles only the requests specific to each interface. This layer is called a **Backend-for-Frontend (BFF)** service.

- Each interface (Web, Mobile, IoT, and so on) gets its own BFF service.
- The BFF sits between the specific frontend and the shared backend services/microservices.
- It helps optimize performance for the corresponding frontend environment (for example, a Mobile BFF can combine several requests to save bandwidth).

## Issues and Considerations

- **Operational overhead:** More services mean more management, deployment, and security cost.
- **Latency:** An extra network hop can increase latency.
- **Code duplication:** Logic may be duplicated across BFFs. Weigh code duplication against the best tailored experience for each client.
- **Scope of logic:** A BFF should contain only logic specific to the user interface. Shared features (authentication, monitoring) should be abstracted into another layer.

## When to Use This Pattern

- When a shared backend service requires too much development effort to maintain for multiple kinds of clients.
- When you want to optimize the backend for the specific needs of each type of interface.
- When a particular programming language suits the backend of one interface better but not all of them.

## When Not to Use This Pattern

- When the interfaces make the same or nearly identical requests to the backend.
- When the application has only a single user interface.

## Implementation Example on Azure

- **API Management:** Acts as the gateway layer that handles cross-cutting concerns such as authorization (Microsoft Entra ID), monitoring (Azure Monitor), and caching.
- **Azure Functions:** Often used to implement BFFs because of their serverless nature, which reduces operational cost and scales easily.
- **Microservices:** The backend services that actually run the core business logic sit behind the BFFs.

---

_Source: [Azure Architecture Center - Backends for Frontends pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends)_

> **See also:** [Gateway Aggregation Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Aggregation Pattern) · [Gateway Routing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Routing Pattern) · [Gateway Offloading Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Offloading Pattern)
