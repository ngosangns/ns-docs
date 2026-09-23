---
area: technology
domain: design-patterns
type: guide
title: Gateway Aggregation Pattern
description: Explains using a gateway to combine multiple client requests into one, cutting chattiness and latency between clients and backend services.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - api-gateway
  - microservices
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation
---

# Gateway Aggregation Pattern

The Gateway Aggregation pattern uses a gateway to combine multiple individual requests from a client into a single request. It is especially useful when a client application has to make many calls to different backend systems to complete a single operation.

## Context and Problem

In microservices architectures, to perform one task (for example, displaying a product detail page) the client may have to call several services at once: a product information service, a review service, an inventory service, and so on.

- **The "chattiness" problem:** Making too many calls between client and backend wastes network resources and increases latency (especially on high-latency mobile networks).
- **Increased risk:** Each individual connection is a potential point of failure. The client has to manage sending, waiting for, and processing the data of every request.
- **Dependency:** If the backend APIs change or are split up, the client must update its code as well.

## Solution

Use a gateway as an intermediary to reduce the chattiness between the client and the services.

1. The client sends **a single request** to the gateway.
2. The gateway decomposes this request and forwards sub-requests to the appropriate backend services.
3. The gateway collects the results from all the services and combines them into a single response.
4. The gateway sends the aggregated response back to the client.

## Issues and Considerations

- **Latency:** The gateway should be placed as close to the backend services as possible to minimize internal call time.
- **Single point of failure (SPOF):** The gateway becomes a critical component. Design it for high availability and resiliency (Circuit Breaker, Retry, timeouts).
- **Bottleneck:** Ensure the gateway performs well enough to handle the aggregated load and can scale when needed.
- **Handling partial data:** If a backend service responds too slowly, the gateway can choose to time out and return an incomplete (partial) data set rather than failing completely.
- **Separation of responsibilities:** Don't put business logic into the gateway. The gateway should only route and aggregate data.

## When to Use This Pattern

- When a client needs to communicate with multiple backend services to complete an operation.
- When users are on high-latency networks (such as mobile networks).
- When you want to optimize bandwidth by reducing the number of duplicate headers across many small requests.

## When Not to Use This Pattern

- When the client communicates with only a single service.
- When the client is close to the backend and latency isn't a significant issue.
- When you want to batch operations on the same service (in that case, add a batch operation to the service itself).

## Well-Architected Framework Benefits

- **Security:** Reduces the public attack surface because backend services can be fully isolated in an internal network behind the gateway.
- **Reliability:** Centralizes handling of transient faults at the gateway rather than implementing it separately in every client.
- **Performance:** Reduces the number of concurrent connections from the client, saving battery and resources on mobile devices.

## Implementation Examples on Azure

- **Azure Application Gateway:** Supports layer 7 routing and can be configured to aggregate requests.
- **Azure Front Door:** A global gateway that can route and optimize traffic.
- **Azure Functions:** Can be used to build a custom "Aggregation Service" behind API Management.

---

_Source: [Azure Architecture Center - Gateway Aggregation pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation)_

> **See also:** [Gateway Routing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Routing Pattern) · [Gateway Offloading Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Offloading Pattern) · [Backends For Frontends Pattern](/Technology/System Design/Practices/Azure Design Patterns/Backends For Frontends Pattern)
