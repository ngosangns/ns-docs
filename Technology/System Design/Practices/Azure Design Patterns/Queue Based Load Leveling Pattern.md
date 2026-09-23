---
area: technology
domain: messaging
type: guide
title: Queue Based Load Leveling Pattern
description: Place a queue between a task and the service it calls so the queue buffers intermittent heavy loads and smooths out peak demand.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - messaging
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling
---

# Queue Based Load Leveling Pattern

Use a queue as a buffer between a task and a service it invokes, in order to smooth intermittent heavy loads. This reduces the impact of demand peaks on the availability and responsiveness of the whole system.

## Summary

- **Problem:** Cloud services frequently face sudden load spikes. If a service is flooded with too many simultaneous requests, it can hang, respond slowly, or fail completely, hurting the user experience.
- **Solution:** Insert a queue between the component that sends requests (the task) and the component that processes them (the service).
  - The task and the service run asynchronously.
  - The task posts a message to the queue instead of calling the service directly.
  - The queue holds messages until the service is ready to process them.
  - The service pulls messages from the queue and processes them at a rate it can sustain.
- **Benefits:**
  - **Maximizes availability:** The application can keep accepting requests and pushing them onto the queue even when the backend service is temporarily unavailable or overloaded.
  - **Cost optimization:** You do not need to keep enough service instances to handle peak load. You only need enough resources to handle the average load over time.
  - **Flow control (throttling):** Keeps the system from exceeding the processing limits of infrastructure resources (such as a database).
- **Implementation notes:**
  - **One-way communication:** A queue is inherently one-way. If the application needs a response from the service, you must add a request/reply mechanism (using a separate reply queue).
  - **Latency:** The pattern increases latency because requests are not processed immediately but wait in the queue.
  - **Queue durability:** If the queue fails, data can be lost unless there is good persistence (durable storage).

## When to Use

- When the application uses services that are frequently overloaded or have highly variable traffic.
- When the system does not require an immediate, ultra-low-latency response.
- When you want to protect downstream resources (such as a database) from crashing under too many concurrent connections.

## When Not to Use

- The application requires a response from the service with minimal latency (synchronous communication).
- Tasks must be executed in real time and cannot wait in a buffer.

## Azure Example

A web application writes data to an external store (SQL Database):

1. **Web App:** Instead of writing to SQL directly, the application pushes data to an **Azure Service Bus Queue** or **Azure Queue Storage**.
2. **Azure Function:** Triggered by the queue, the function reads the message and writes it to the database.
3. **Control:** You can configure the Azure Function to limit the number of concurrently running instances, ensuring the write rate to the database does not exceed what it can handle.

---

_Source: [Microsoft Learn - Queue-Based Load Leveling Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)_

> **See also:** [Throttling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Throttling Pattern) · [Rate Limiting Pattern](/Technology/System Design/Practices/Azure Design Patterns/Rate Limiting Pattern) · [Competing Consumers Pattern](/Technology/System Design/Practices/Azure Design Patterns/Competing Consumers Pattern)
