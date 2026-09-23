---
area: technology
domain: design-patterns
type: guide
title: Deployment Stamps Pattern
description: Describes deploying multiple independent copies of a scale unit (stamps) to host different tenants, gaining near-linear scale, limited blast radius, and regional data placement.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - multi-tenancy
  - scalability
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/deployment-stamp
---

# Deployment Stamps Pattern

The Deployment Stamps pattern (also known as Scale Unit, Service Unit, or Cell) involves provisioning, managing, and monitoring a heterogeneous group of resources to host and operate multiple workloads or customers (tenants).

## Context and Problem

When deploying an application in the cloud, a single instance can run into limits:

- **Scale limits:** Services have natural limits on the number of connections, domains, or compute resources.
- **Nonlinear cost:** Scaling one resource up to an extreme level can cost far more than replicating many smaller resources (scale out).
- **Customer isolation:** Some large customers require dedicated resources to guarantee performance and security, and don't want to share with others.
- **Geographic constraints:** Data sovereignty regulations or low-latency requirements demand that data be placed in specific geographic regions.

## Solution (Deployment Stamps)

Divide resources into "scale units" and deploy multiple copies of them, called **stamps**.

- Each stamp hosts and serves a subset of customers (tenants).
- Stamps operate independently of each other and can be deployed and updated individually.
- A geographic region can contain one or more stamps to allow horizontal scaling.

## Key Components

- **Stamps:** A group of resources (VMs, databases, App Services, and so on) defined in a template (IaC).
- **Traffic routing service:** A central component that determines which customer's requests go to which stamp (usually Azure Front Door or API Management combined with a mapping database).

## Benefits

- **Near-linear scalability:** You can serve an unlimited number of customers by adding new stamps.
- **Limited blast radius:** If a stamp fails, only the customers in that stamp are affected; the other stamps keep working normally.
- **Safe deployment:** You can update a few stamps first (canary deployment) to test before rolling out to the whole system.
- **Regulatory compliance:** It is easy to place customer data in specific countries to comply with local laws.

## Issues and Considerations

- **Automation:** Because many identical copies are replicated, using IaC (Bicep, Terraform, ARM templates) is mandatory to avoid human error.
- **Cross-stamp operations:** Questions like "how many customers does the whole system have in total?" become harder to answer. A central data store (data warehouse) is needed to aggregate reports from all stamps.
- **Moving customers:** Moving a customer from one stamp to another is complex, requiring application logic to migrate the data and update the routing map.
- **Cost:** Maintaining multiple copies of the infrastructure increases fixed operating costs.

## When to Use This Pattern

- When the system reaches the scale limits of a single instance.
- When you need to isolate groups of customers for security or performance reasons.
- Multinational applications that must keep data local.
- When you want to increase reliability by isolating faults.

## Implementation Examples on Azure

- **Azure Front Door:** Routes users to the nearest region or a specific stamp.
- **Azure API Management:** Acts as the gateway that looks up the tenant → stamp mapping and forwards the request.
- **Azure Cosmos DB:** Stores the global mapping table between customers and stamps.

---

_Source: [Azure Architecture Center - Deployment Stamps pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/deployment-stamp)_

> **See also:** [Geode Pattern](/Technology/System Design/Practices/Azure Design Patterns/Geode Pattern) · [Sharding Pattern](/Technology/System Design/Practices/Azure Design Patterns/Sharding Pattern) · [Gateway Routing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Routing Pattern)
