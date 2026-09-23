---
area: technology
domain: design-patterns
type: guide
title: Gatekeeper Pattern
description: Explains protecting services with a dedicated, low-privilege broker that validates and sanitizes requests before handing them to a trusted host, shrinking the attack surface.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - security
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/gatekeeper
---

# Gatekeeper Pattern

The Gatekeeper pattern protects applications and services by using a dedicated host instance (a broker) to mediate requests between clients and the application or service. The broker validates and sanitizes requests, providing an additional layer of security and limiting the system's attack surface.

## Context and Problem

Cloud services often expose endpoints for client applications to call APIs. The code implementing the API typically does many things such as authentication, authorization, parameter validation, and accessing storage or other services.

- **Risk:** If an attacker successfully breaches the application's hosting environment, its security mechanisms, storage keys, and sensitive data are exposed. The attacker may gain unrestricted access to the entire system.

## Solution

Separate the code that implements the public endpoints from the code that handles requests and data access.

- **Gatekeeper:** A dedicated task or façade that interacts with clients. It validates requests and rejects those that don't meet the standard before handing them off to trusted hosts.
- **Trusted Host:** Holds the actual business logic and has access to sensitive data and services. This host communicates only with the Gatekeeper.

### Key elements

- **Controlled validation:** The Gatekeeper validates every request and rejects invalid ones.
- **Limited risk:** The Gatekeeper has no access to the credentials or keys used by the Trusted Host. If the Gatekeeper is compromised, the attacker still has no keys to reach the database.
- **Appropriate privileges:** The Gatekeeper runs with limited privilege, while the Trusted Host runs with full trust.

## Issues and Considerations

- **Internal endpoints:** Ensure the Trusted Hosts expose only internal or protected endpoints that only the Gatekeeper can reach.
- **Least privilege:** The Gatekeeper must run at the lowest privilege possible, usually on virtual machines or hosting services separate from the Trusted Host.
- **No business processing:** The Gatekeeper shouldn't perform any business processing or access data. Its only function is to validate and sanitize requests.
- **Performance:** Adding an intermediate layer increases latency because of the extra processing and network communication.
- **Single point of failure (SPOF):** The Gatekeeper can become a bottleneck or a point of failure for the entire system. Deploy multiple instances and use autoscaling to ensure availability.

## When to Use This Pattern

- When handling extremely sensitive information.
- When providing services that require a high degree of protection against malicious attacks.
- For mission-critical operations that can't be interrupted.
- When you want to centralize request validation for easier management and maintenance.

## Well-Architected Framework Alignment

- **Security:** Lets you centralize features such as WAF (Web Application Firewall), DDoS protection, bot detection, and authorization checks at a single point.
- **Performance Efficiency:** Throttling can be applied at the gateway level instead of being checked at each processing node.

## Related

- **Valet Key pattern:** Often used together to strengthen security by using tokens that restrict access.

---

_Source: [Azure Architecture Center - Gatekeeper pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gatekeeper)_

> **See also:** [Valet Key Pattern](/Technology/System Design/Practices/Azure Design Patterns/Valet Key Pattern) · [Gateway Offloading Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Offloading Pattern) · [Federated Identity Pattern](/Technology/System Design/Practices/Azure Design Patterns/Federated Identity Pattern)
