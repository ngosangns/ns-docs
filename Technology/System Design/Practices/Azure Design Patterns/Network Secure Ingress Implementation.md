---
area: technology
domain: networking
type: guide
title: Network Secure Ingress Implementation
description: Reference implementation that combines global routing, gateway offloading, and health endpoint monitoring to give HTTP/HTTPS applications a secure entry point on Azure.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - networking
  - azure
  - security
resource: https://learn.microsoft.com/en-us/azure/architecture/pattern-implementations/network-secure-ingress
---

# Network Secure Ingress Implementation

This implementation combines several design patterns, such as global routing, offloading, and health endpoint monitoring, to provide a secure ingress for HTTP/HTTPS applications.

## Key Requirements

- **Global routing:** Able to redirect requests to different regions.
- **Low-latency failover:** Quickly identify failed workloads and adjust routing within minutes.
- **Mitigating attacks at the edge:** Ensure PaaS services cannot be reached directly from the internet; all traffic must pass through a secured gateway.

## Applied Design Patterns

- **Gateway Routing:** Routes requests to multiple services or service instances across regions.
- **Gateway Offloading:** Pushes functions such as attack prevention onto a gateway proxy (WAF).
- **Health Endpoint Monitoring:** Exposes endpoints for checking the operational state of the system.

## Main Architecture Components

- **Azure Front Door (Premium):** Acts as the global gateway, supporting layer-7 load balancing and secure connectivity through Private Link.
- **Azure Web Application Firewall (WAF):** Inspects and blocks malicious HTTP/HTTPS traffic before it reaches the backend.
- **Azure Private Link:** Provides private connectivity from Front Door to backend services (such as Storage and ILB) without exposing public IPs.
- **Azure Storage (Blob):** Stores static content and serves as the origin for web requests.
- **Internal Load Balancer (ILB):** Distributes internal traffic for private workloads.

## Web Request Flow

1. The user sends an HTTP/HTTPS request to the Azure Front Door endpoint.
2. The **WAF** evaluates the security rules. If a rule is violated, the request is blocked.
3. Front Door matches the route and selects the appropriate **Origin Group**.
4. A specific **Origin** is chosen based on the results of the health probes.
5. The request is forwarded to the backend through **Private Link** over the Microsoft backbone network.

## Operational Flow

To manage the system securely without opening internet-facing ports:

- Use **Azure Bastion** to connect over SSH/RDP to a **jump box VM** inside the virtual network (VNET).
- The jump box VM accesses resources (such as the storage account) through a **Private Endpoint** and a **Private DNS Zone**.

## Considerations

- **Reliability:** Use health probes to automatically remove failed regions.
- **Security:** Private Link completely removes public internet exposure for backend services.
- **Cost:** Azure Front Door Premium and WAF Premium cost more than the Standard tier but provide advanced security.
- **Operations:** You must manage self-hosted agents inside the VNET if you want to deploy CI/CD (DevOps) into network-secured resources.

---

_Source: [Azure Architecture Center - Network secure ingress](https://learn.microsoft.com/en-us/azure/architecture/pattern-implementations/network-secure-ingress)_

> **See also:** [Gateway Routing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Routing Pattern) · [Gateway Offloading Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Offloading Pattern) · [Health Endpoint Monitoring Pattern](/Technology/System Design/Practices/Azure Design Patterns/Health Endpoint Monitoring Pattern)
