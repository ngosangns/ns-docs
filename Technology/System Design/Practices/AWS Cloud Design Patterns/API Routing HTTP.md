---
area: technology
domain: api-routing
type: guide
title: API Routing HTTP
description: Explains the HTTP header routing pattern, where a request header selects the target service, action, version, or feature, along with its pros and cons.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - api-routing
  - aws
  - design-patterns
---

# API Routing HTTP

Header-based routing targets a specific service for each request by specifying an HTTP header in the request. For example, sending the header `x-service-a-action: get-thing` performs the `get thing` action on `Service A`. The note shows how header routing combines with hostname and path routing and where it feeds version routing and feature flags. It then sets out the trade-offs, mainly that you need control over client headers.

## Key Characteristics

- Often combined with other routing methods (Hostname or Path) to build powerful APIs.
- Besides routing actions, it is also used for:
  - Version routing.
  - Feature flags.
  - A/B testing.
- The architecture typically has a thin routing layer in front of the microservices.

## Advantages

- **Flexible**: Configuration is easy to change with minimal effort and can be automated.
- **Highly customizable**: Supports creative ways to expose only the specific operations you want from a service.

## Disadvantages

- **Client control**: Assumes you have full control over the client so that HTTP headers can be customized.
- **Infrastructure limits**: Proxies, CDNs, and load balancers may limit header size (rarely a problem, but worth noting if you use many headers or cookies).

Header routing chooses the service from a request header, not from the host or the path alone. The sample header x-service-a-action with the value get-thing runs the get thing action on Service A. That header can sit beside hostname routing and path routing. It is also used for version routing, feature flags, and A/B testing. A thin routing layer stands in front of the microservices and reads the header before the call goes on. The pattern is flexible because configuration is easy to change, takes minimal effort, and can be automated. It is highly customizable, since you can expose only the operations you want from a service. The hard requirement is client control. You need full control over the client so the headers can be set. Without that, the pattern does not fit. Proxies, CDNs, and load balancers may limit header size. The limit is rarely a problem, but it is worth noting when a request uses many headers or cookies. The hostname and path notes are the other two patterns this one is meant to combine with.

> **See also:** [API Routing Hostname](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing Hostname) · [API Routing Path](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing Path)
