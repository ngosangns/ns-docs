---
area: technology
domain: design-patterns
type: guide
title: Ambassador Pattern
description: Explains how an ambassador helper service acts as an out-of-process proxy that sends network requests on behalf of a client, adding resiliency, routing, and security without changing the application.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - networking
  - proxy
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/ambassador
---

# Ambassador Pattern

The Ambassador pattern creates helper services that send network requests on behalf of a consumer service or application. You can think of an ambassador service as an out-of-process proxy that is co-located with the client.

## Context and Problem

Modern cloud applications need features such as circuit breaking, routing, monitoring, and the ability to update network configuration. However:

- Legacy applications are hard or impossible to update to add these features.
- Configuring connectivity, authentication, and authorization is complex and gets repeated across many languages and frameworks.
- Security and networking features often need to be managed by a dedicated team.

## Solution

Move client connectivity libraries and frameworks into an external process that acts as a proxy between the application and outside services.

- Deploy the proxy on the same host as the application.
- It lets you control routing, resiliency, and security (TLS) independently of the programming language of the main application.
- It can be deployed as a **Sidecar** (sharing the application's container lifecycle) or as a **Daemon/Windows Service**.

## Issues and Considerations

- **Latency:** The proxy adds some latency to every request.
- **Generalization:** Consider whether features should be generalized at all (for example, retries are only safe if the operation is idempotent).
- **Context propagation:** Decide how to pass context between the client and the proxy (for example, HTTP headers).
- **Deployment:** Decide between a single shared instance for everyone and one instance per client.

## When to Use This Pattern

- When you need to build a common set of connectivity features for multiple languages or frameworks.
- When you want to hand cross-cutting connectivity concerns to infrastructure specialists.
- When you need to add cloud connectivity capabilities to legacy applications or applications that are hard to modify.

## When Not to Use This Pattern

- When network latency is critical.
- When the connectivity features are used by only a single language (a library is a better fit).
- When the connectivity features need to be deeply integrated with the client application's logic.

---

_Source: [Azure Architecture Center - Ambassador pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/ambassador)_

> **See also:** [Sidecar Pattern](/Technology/System Design/Practices/Azure Design Patterns/Sidecar Pattern) · [Gateway Offloading Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Offloading Pattern) · [Circuit Breaker Pattern](/Technology/System Design/Practices/Azure Design Patterns/Circuit Breaker Pattern)
