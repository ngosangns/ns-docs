---
area: technology
domain: design-patterns
type: guide
title: Leader Election Pattern
description: Explains coordinating distributed instances by electing one leader via a distributed mutex or consensus algorithm, including heartbeat, lease, and failure considerations.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - distributed-systems
  - coordination
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/leader-election
---

# Leader Election Pattern

Coordinate the actions of a set of collaborating instances in a distributed application by electing one instance as the "leader". That instance is responsible for managing the others, which helps avoid conflicts, contention for shared resources, and accidental interference with each other's work.

## Summary

- **Problem:** In a horizontally scaled cloud system, many instances of the same task can run at the same time. If they all access a shared resource (for example, writing to the same file or aggregating computation results), they need coordination to avoid overwriting data or wasting resources.
- **Solution:** Elect a single node as the Leader to coordinate. All other nodes become Followers (subordinate nodes).
- **Common election mechanisms:**
  - **Shared Distributed Mutex:** Instances race to acquire a lock on a shared resource. The first instance to get the lock becomes the Leader.
  - **Consensus algorithms:** Use algorithms such as Bully, Raft, or Ring to elect automatically based on node IDs.
- **Maintaining leadership:**
  - The Leader must regularly send a "heartbeat" signal or renew its lease to assert that it is still alive.
  - The other nodes watch the Leader. If the Leader fails or loses connectivity, a new election is triggered immediately.
- **Challenges to watch for:**
  - **Single point of failure:** If the service providing the mutex (for example, Azure Blob Storage) fails, the system can't elect a Leader.
  - **Bottleneck:** The Leader can become a bottleneck if it has to handle too much coordination work.
  - **Flexibility:** The system needs to handle the case where the Leader node is shut down by autoscaling (scale-in).

## When to Use This Pattern

- When tasks in a distributed application need tight coordination and there is no natural coordinating process.
- When you need to manage exclusive access to a shared resource.
- When you need one instance responsible for aggregating data from multiple parallel compute sources.

## When Not to Use This Pattern

- When a dedicated process already acts as a fixed leader.
- When coordination can be achieved with lighter approaches such as optimistic locking or pessimistic locking.
- When a more specialized third-party solution such as Apache ZooKeeper can be used.

## Real-World Example on Azure

Use the **Lease Blob** mechanism on Azure Storage. A node tries to acquire a "lease" on a specific blob. If it succeeds, it becomes the Leader for the lease duration (for example, 15–60 seconds) and must keep renewing the lease to hold the role. If the node dies, the lease expires and other nodes can jump in and take over.

---

_Source: [Microsoft Learn - Leader Election Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/leader-election)_

> **See also:** [Scheduler Agent Supervisor Pattern](/Technology/System Design/Practices/Azure Design Patterns/Scheduler Agent Supervisor Pattern) · [Competing Consumers Pattern](/Technology/System Design/Practices/Azure Design Patterns/Competing Consumers Pattern) · [Health Endpoint Monitoring Pattern](/Technology/System Design/Practices/Azure Design Patterns/Health Endpoint Monitoring Pattern)
