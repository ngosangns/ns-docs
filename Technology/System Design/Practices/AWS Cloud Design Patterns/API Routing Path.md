---
area: technology
domain: api-routing
type: guide
title: API Routing Path
description: Explains the path routing pattern, which groups APIs under one hostname and separates services by URI, with NGINX, API Gateway, and CloudFront implementations on AWS.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - api-routing
  - aws
  - design-patterns
---

# API Routing Path

Path routing groups many or all APIs under the same hostname and uses the request URI to separate services. For example, one host serves `api.example.com/service-a` and `api.example.com/service-b`. Consumers deal with one URL and find centralized documentation in one place, but the shared hostname demands strict change management so a misconfiguration cannot affect the entire system. The note also walks through the AWS implementation options and records the advantages and limits of each.

## Typical Use Cases

- Suits a simple architecture for consumers: they only need to remember a single URL (`api.example.com`).
- Centralized API documentation that is easier to look up than documentation split across many places.
- However, this approach requires strict change management to prevent a misconfiguration from affecting the entire system.

## Implementation Options on AWS

### HTTP Service Reverse Proxy (Using NGINX)

- Uses HTTP servers such as NGINX to build dynamic routing configuration.
- **Advantages**: Provides a consistent system for consumers; service teams can manage their own APIs; good support for collecting logs and metrics.
- **Disadvantages**: Requires complex testing and infrastructure management; expensive at small scale but very efficient at extremely high traffic (above 100k TPS).

### API Gateway

- Uses Amazon API Gateway (REST or HTTP APIs) in proxy mode.
- Prefer wildcard paths (for example, `/billing/*`) for flexibility instead of mapping every specific path.
- **Advantages**:
  - Control over complex flows (using VTL to modify request/response properties).
  - Built-in IAM, Cognito, and Lambda authorizers for security.
  - Supports rate limiting, throttling, and AWS WAF.
- **Disadvantages**: Cost can become an issue at very high traffic.

### CloudFront

- Uses the "Dynamic origin selection" feature to choose the target service based on conditions. The routing logic lives in Lambda@Edge code.
- **Advantages**:
  - Good support for A/B testing, canary releases, and feature flagging.
  - Built-in caching.
  - Supports field-level encryption.
- **Disadvantages**:
  - Limited to a maximum of 250 origins (services).
  - Updating Lambda@Edge and propagating the configuration can take anywhere from a few minutes to 30 minutes.

On AWS the same path split can sit in three places. NGINX builds the routes and gives each team its own APIs, plus logs and metrics, but the proxy is costly until traffic is very high. API Gateway in proxy mode can use a wildcard such as the billing prefix, and it adds authorizers, throttling, and WAF. CloudFront picks the origin in Lambda@Edge. That helps canaries and feature flags, with a cap of 250 origins.

> **See also:** [API Routing Hostname](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing Hostname) · [API Routing HTTP](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing HTTP) · [Strangler Fig](/Technology/System Design/Practices/AWS Cloud Design Patterns/Strangler Fig)
