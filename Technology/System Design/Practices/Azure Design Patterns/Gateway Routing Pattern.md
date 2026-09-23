---
area: technology
domain: design-patterns
type: guide
title: Gateway Routing Pattern
description: Explains routing requests to multiple services or service versions through a single layer-7 gateway endpoint, enabling backend abstraction and zero-downtime deployments.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - api-gateway
  - routing
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing
---

# Gateway Routing Pattern

The Gateway Routing pattern uses a single endpoint to route requests to multiple services or to multiple versions of the same service. This pattern means the client doesn't need to know about the complex structure of the backend services.

## Context and Problem

When a client application needs to use many services or many versions of services:

- **Many separate services:** An e-commerce application has services such as search, reviews, cart, and checkout. The client has to know the endpoint of each service. If an API changes or a service is split up, the client must update as well.
- **Multiple instances of the same service:** To balance load or ensure availability, the system runs several copies of a service in different regions. The client has to manage which instance to connect to.
- **Multiple versions of the same service:** When rolling out a new version (for example, Blue-Green deployment), you need a mechanism to steer traffic between the old and new versions without disrupting users.

## Solution

Place a gateway in front of the applications, services, or deployments. Use layer 7 (application layer) routing to forward requests to the appropriate instances.

- The client only needs to know and talk to **a single gateway address**.
- The gateway decides where to send a request based on information such as URL path, headers, hostname, or IP address.

## Benefits

- **Backend abstraction:** You can add, remove, split, or reorganize backend services without changing client-side code.
- **Elasticity management:** Registering and deregistering service instances as you scale up or down is handled centrally at the gateway.
- **Advanced deployment strategies:** Canary and Blue-Green deployments are easy to perform by changing the routing configuration at the gateway.
- **Less network information leakage:** Backend services can sit in an internal network without public IP addresses; only the gateway has access.

## Issues and Considerations

- **Single point of failure (SPOF):** The gateway is a critical component. Design it to be fault tolerant and highly available.
- **Bottleneck:** The gateway must be powerful enough to handle all the traffic for the services behind it.
- **Layer 7 routing:** Routing based on request content (URL, headers) consumes more resources than layer 4 routing (based only on IP/port).
- **Scope of operation:** Consider a global gateway (such as Azure Front Door) for multi-region applications, or a regional gateway (such as Azure Application Gateway) for fine-grained routing within a region.

## When to Use This Pattern

- When a client needs to consume multiple services behind a common gateway.
- When you want to simplify the client application with a single endpoint.
- When you need to route requests from public endpoints to internal virtual endpoints (such as VM ports).
- When you want to implement zero-downtime software update strategies.

## Implementation Examples on Azure

- **Azure Application Gateway:** Provides URL path-based routing within a region. For example, `/images/*` goes to the image server pool and `/video/*` goes to the video server pool.
- **Azure Front Door:** Provides global routing so users always connect to the nearest and fastest instance.

## Related

- **Backends for Frontends pattern:** A BFF often uses Gateway Routing to forward requests to the appropriate backend services.
- **Gateway Aggregation pattern:** Often combined with routing to aggregate results from multiple routing directions.

---

_Source: [Azure Architecture Center - Gateway Routing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)_

> **See also:** [Gateway Aggregation Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Aggregation Pattern) · [Gateway Offloading Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Offloading Pattern) · [Backends For Frontends Pattern](/Technology/System Design/Practices/Azure Design Patterns/Backends For Frontends Pattern)
