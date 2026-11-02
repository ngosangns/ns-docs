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

Hostname routing isolates API services by giving each API its own hostname. For example, an API could live at `service-a.api.example.com` or `service-a.example.com`. Each service owns its subdomain, which keeps release conflicts low and lets teams run their own DNS records and production environment. The note lists the AWS services this fits and the trade-offs, mainly that consumers must track many hostnames and every new service needs a new registered subdomain or domain.

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

Hostname routing keeps each API on a name that no other service shares. A team might publish at service-a.api.example.com, or shorten that to service-a.example.com. Because the subdomain belongs to that service, another team does not release through the same host, so release conflicts stay low. The owning team can manage its DNS records and run the service in production on its own. That is why the pattern is called the simplest way to route HTTP APIs, and why it is treated as easy to scale. It works with Amazon API Gateway, AWS AppSync, Application Load Balancers, and Amazon EC2. Teams fully manage their own subdomains. Region-specific and version-specific names stay easy to isolate and test, as with dev.region.service-a.api.example.com. Consumers still have to remember a different hostname for each API. A client SDK can mitigate that, but the SDK brings maintenance, updates, and multi-language cost. Every new service also needs a newly registered subdomain or domain.

> **See also:** [API Routing Path](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing Path) · [API Routing HTTP](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing HTTP)
