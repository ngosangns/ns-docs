---
area: technology
domain: api-routing
type: guide
title: API Routing Hostname
description: Explains the hostname routing pattern, which isolates API services by giving each one its own hostname, with typical use cases and trade-offs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - api-routing
  - aws
  - design-patterns
---

# API Routing Hostname

Hostname routing isolates API services by giving each API its own hostname. For example: `service-a.api.example.com` or `service-a.example.com`.

## Typical Use Cases

- Minimizes release conflicts because no components are shared between service development teams.
- Teams manage everything themselves, from DNS records to running the service in production.

## Advantages

- **Simplest and easiest to scale**: The simplest way to route HTTP APIs.
- **Flexible**: Works with many AWS services such as Amazon API Gateway, AWS AppSync, Application Load Balancers (ALB), and Amazon EC2.
- **Full ownership**: Teams fully manage their own subdomains.
- **Easy to isolate and test**: Convenient for Region-specific or version-specific deployments (for example, `dev.region.service-a.api.example.com`).

## Disadvantages

- **Consumer experience**: Consumers must remember many different hostnames to interact with the APIs. (This can be mitigated by providing client SDKs, but SDKs bring their own maintenance, update, and multi-language costs.)
- **Domain management**: A new subdomain or domain must be registered every time a new service is created.

> **See also:** [API Routing Path](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing Path) · [API Routing HTTP](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing HTTP)
