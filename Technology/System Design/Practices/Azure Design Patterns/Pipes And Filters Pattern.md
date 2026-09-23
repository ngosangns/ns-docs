---
area: technology
domain: messaging
type: guide
title: Pipes And Filters Pattern
description: Decompose a complex processing task into a chain of reusable, independently deployable and scalable filters connected by pipes.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - messaging
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/pipes-and-filters
---

# Pipes And Filters Pattern

Break a task that performs complex processing into a series of separate, reusable components (filters). This pattern lets processing elements be deployed and scaled independently, improving performance, scalability, and modularity.

## Summary

- **Problem:** Complex data-processing systems are often written as monoliths, which makes it hard to reuse code, optimize individual processing steps, or scale the system under heavy load.
- **Solution:** Decompose the process into independent steps:
  - **Filters:** Each filter performs a single task (for example: decoding, formatting, validating). Filters know nothing about each other and care only about their input and output data.
  - **Pipes:** Act as data channels, connecting the output of one filter to the input of the next.
- **Benefits:**
  - **Flexibility:** Easily reorder filters or insert new ones without affecting the whole system.
  - **Independent scalability:** Run multiple instances of resource-hungry filters (for example: video compression) on more powerful hardware, while lightweight filters stay on cheap hardware.
  - **Reuse:** Filters can be reused across different pipelines.
  - **Resilience:** If one step fails, only that step is retried rather than the whole process.
- **Challenges to consider:**
  - **Consistency and state:** Filters should be stateless to make scaling easier.
  - **Idempotency:** Make sure that if a filter reprocesses a message (because of an earlier failure), it does not cause incorrect side effects (for example: writing data twice).
  - **Latency:** Passing data between filters (especially when they live on different servers) can increase overall latency.
  - **Error handling:** You need a mechanism for when a filter in the chain fails (for example: a dead-letter queue).

## When to Use

- When the processing can easily be split into independent steps.
- When the steps have different scalability requirements.
- When you need flexibility to change the order or composition of the pipeline.
- When the steps need to run in different environments (for example: partly in the cloud, partly on-premises).

## When Not to Use

- Systems with direct request-response interaction that need an immediate result.
- Processing steps that depend tightly on one another and must run in the same transaction.
- When the amount of context (state) passed between steps is so large that it wastes network or memory resources.

## Azure Example

An image-processing pipeline:

1. **Pipe 1 (Queue):** Receives the raw image.
2. **Filter 1 (Azure Function):** Content moderation.
3. **Pipe 2 (Queue):** Carries the moderated image.
4. **Filter 2 (Azure Function):** Resizing.
5. **Pipe 3 (Queue):** Carries the resized image.
6. **Filter 3 (Azure Function):** Applies a watermark and stores the result.

---

_Source: [Microsoft Learn - Pipes and Filters Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/pipes-and-filters)_

> **See also:** [Competing Consumers Pattern](/Technology/System Design/Practices/Azure Design Patterns/Competing Consumers Pattern) · [Queue Based Load Leveling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Queue Based Load Leveling Pattern) · [Priority Queue Pattern](/Technology/System Design/Practices/Azure Design Patterns/Priority Queue Pattern)
