---
area: technology
domain: distributed-transactions
type: guide
title: Scheduler Agent Supervisor Pattern
description: Coordinate a set of distributed actions as a single operation, with a scheduler, agents, and a supervisor that recovers or compensates failed steps.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - distributed-transactions
  - resilience
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/scheduler-agent-supervisor
---

# Scheduler Agent Supervisor Pattern

## Summary

This pattern coordinates a set of distributed actions as a single operation. If any action fails, the system tries to handle the failure transparently or undo the work already done, so that the whole operation succeeds or fails together. This strengthens the resilience and self-healing of distributed systems.

## Main Actors

- **Scheduler**: Plans and coordinates the steps in a process (pipeline/workflow). It records the workflow state in a state store and invokes agents to do the work.
- **Agent**: Contains the logic that wraps a call to a remote service or resource. Each agent typically handles one specific service, performing error handling and retry logic within the allowed time limit (timeout).
- **Supervisor**: Monitors the state of the steps maintained by the scheduler. It runs periodically to look for steps that have timed out or failed, then asks the scheduler/agent to perform a recovery action or a compensating action.

## How It Works

1. **Initialization**: The application sends a request to the scheduler. The scheduler records the initial state as "Pending" in the state store.
2. **Execution**: The scheduler sends a message to the agent with the job information and a complete-by time.
3. **Response**: If the agent succeeds, it sends a response to the scheduler, which updates the state to "Completed".
4. **Supervision**: The supervisor scans the state store. If it finds a step that is still "Processing" but past its complete-by time, it triggers error handling (retry or undo).

## Considerations

- **Idempotency**: Because the supervisor may re-run a step after a timeout, the agent logic must be idempotent to avoid side effects.
- **Failure recovery**: If the system crashes and restarts, the scheduler must be able to determine the state of in-flight tasks from the state store in order to continue or undo them.
- **State store**: Must be durable and replicated to ensure high availability.

## When to Use

- In distributed environments (such as the cloud) where communication failures and operational failures are common.
- When you need a self-healing system that can automatically recover interrupted tasks.

## Relationships

- **Retry Pattern**: Used by the agent to handle transient failures.
- **Circuit Breaker Pattern**: The agent can use it to handle prolonged failures.
- **Compensating Transaction Pattern**: Used to undo work if the process cannot complete successfully.
- **Leader Election Pattern**: Used to coordinate between multiple supervisor instances to avoid conflicts.

## References

- [Microsoft Learn - Scheduler Agent Supervisor Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/scheduler-agent-supervisor)

> **See also:** [Saga Pattern](/Technology/System Design/Practices/Azure Design Patterns/Saga Pattern) · [Compensating Transaction Pattern](/Technology/System Design/Practices/Azure Design Patterns/Compensating Transaction Pattern) · [Leader Election Pattern](/Technology/System Design/Practices/Azure Design Patterns/Leader Election Pattern)
