---
area: technology
domain: design-patterns
type: guide
title: Compute Resource Consolidation Pattern
description: Describes consolidating multiple tasks into a single computational unit to raise resource utilization and cut cost, and the scalability, lifetime, security, and contention trade-offs involved.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - cost-optimization
  - compute
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/compute-resource-consolidation
---

# Compute Resource Consolidation Pattern

This pattern consolidates multiple tasks or operations into a single computational unit. It increases resource utilization, reduces cost, and lightens the management burden for applications running in the cloud.

## Context and Problem

A cloud application often has many different kinds of operations. Architects typically start by applying the "separation of concerns" principle and split these operations into separate computational units for deployment (for example, individual App Services or VMs).

- **Problem:** Although this gives a clean logical design, having too many computational units raises hosting costs because each unit consumes resources even when idle or under low load.
- **Management:** Managing a large number of independent instances becomes complex and inefficient.

## Solution

Consolidate multiple tasks into a single computational unit.

- **Group by characteristics:** Find tasks with similar profiles for scalability, lifetime, and processing requirements and group them together.
- **Leverage elasticity:** The cloud lets you scale the number of instances of the computational unit up or down based on the combined load of all the tasks inside it.
- **Example:** Instead of running five small App Services for five rarely used services, run them on one App Service Plan to make full use of the resources you pay for.

## Issues and Considerations

- **Scalability:** Avoid grouping tasks with opposing scaling requirements (for example, one that must scale extremely fast under heavy traffic and one that only scans a queue periodically).
- **Lifetime:** Cloud infrastructure sometimes recycles virtual environments. If a task runs for a very long time, you need a state-saving mechanism (check-pointing) so it can resume after a restart.
- **Security:** Tasks in the same computational unit usually share the same security context, so high trust between tasks is required.
- **Contention:** Avoid running two CPU-hungry or two RAM-hungry tasks on the same unit, because they will fight over resources. It's best to pair a CPU-intensive task with a memory-intensive one.
- **Complexity:** Putting more logic in one place makes the code more complex and harder to debug and test.

## When to Use This Pattern

- When tasks running on their own aren't cost-effective (a lot of idle time).
- When tasks have similar resource and runtime requirements.
- When you want to simplify infrastructure monitoring and management.

## When Not to Use This Pattern

- Mission-critical tasks that need high fault tolerance and absolute isolation.
- Tasks that handle sensitive data and require a separate security context.
- Tasks with very different scaling requirements.

## Options on Azure

- **Azure App Service & Functions:** Run multiple apps/functions on the same **App Service Plan**.
- **Azure Container Apps:** Deploy multiple containers into the same **Environment**.
- **Azure Kubernetes Service (AKS):** Group applications into **Node Pools** based on CPU/RAM requirements.
- **Virtual Machines:** Use **Virtual Machine Scale Sets** to manage shared resources.

---

_Source: [Azure Architecture Center - Compute Resource Consolidation pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compute-resource-consolidation)_

> **See also:** [Sidecar Pattern](/Technology/System Design/Practices/Azure Design Patterns/Sidecar Pattern) · [Bulkhead Pattern](/Technology/System Design/Practices/Azure Design Patterns/Bulkhead Pattern) · [Deployment Stamps Pattern](/Technology/System Design/Practices/Azure Design Patterns/Deployment Stamps Pattern)
