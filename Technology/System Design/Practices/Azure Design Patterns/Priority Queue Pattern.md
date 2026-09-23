---
area: technology
domain: messaging
type: guide
title: Priority Queue Pattern
description: Let a system process high-priority requests ahead of low-priority ones, using a priority-aware queue or separate queues per priority level.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - messaging
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/priority-queue
---

# Priority Queue Pattern

This pattern lets a system process high-priority tasks faster than low-priority ones. It is especially useful in applications that must honor different service-level agreements (SLAs) for different customer groups or job types.

## Summary

- **Problem:** Systems normally process work in FIFO (first in, first out) order. In practice, though, some tasks need immediate handling (for example: payments) while others can wait (for example: sending notification emails). With a single, unclassified queue, urgent tasks can get stuck behind thousands of unimportant ones.
- **Solution:** Use a queuing mechanism that supports priorities so consumers always pick up the important messages first.
- **Main implementation approaches:**
  - **Single queue:** The queue orders itself by the priority property of each message. Consumers just take the next message (the queuing system guarantees it is the highest-priority one).
  - **Multiple queues:** Create a separate queue for each priority level (for example: High, Medium, Low).
    - **Multiple consumer pools:** Each queue has its own pool of consumers. The "High" queue can have more instances or run on more powerful hardware.
    - **A single consumer pool:** Consumers check the "High" queue first and only look at lower queues when it is empty.
- **Benefits:**
  - Meets business requirements well (serving VIP customers faster).
  - Optimizes cost by processing non-urgent tasks during off-peak hours.
  - Adds flexibility in resource management.
- **Important considerations:**
  - **Avoid starvation:** Low-priority tasks may never be processed if high-priority tasks keep arriving. The remedy is to gradually raise the priority of messages that have waited in the queue too long (aging).
  - **Cost management:** Polling multiple queues can raise operating costs (queue transaction fees).
  - **Scalability:** Adjust the number of consumers dynamically based on the length of each queue.

## When to Use

- When tasks have different levels of urgency and importance.
- When you need to offer different service levels (SLAs) to users.
- When you want to prioritize critical workflows to deliver the best user experience.

## When Not to Use

- When all tasks are equally important and FIFO is enough.
- When the system is very simple and adding a priority queue only adds unnecessary complexity.

## Azure Example

Using **Azure Service Bus**:

1. The application sends messages carrying a `Priority` property (High/Low).
2. Service Bus routes each message into the matching queue.
3. Azure Functions (consumers) are configured to listen as follows:
   - `PriorityQueueConsumerHigh`: Processes the high-priority queue and is configured to scale more aggressively.
   - `PriorityQueueConsumerLow`: Processes the low-priority queue.

---

_Source: [Microsoft Learn - Priority Queue Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/priority-queue)_

> **See also:** [Competing Consumers Pattern](/Technology/System Design/Practices/Azure Design Patterns/Competing Consumers Pattern) · [Queue Based Load Leveling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Queue Based Load Leveling Pattern) · [Throttling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Throttling Pattern)
