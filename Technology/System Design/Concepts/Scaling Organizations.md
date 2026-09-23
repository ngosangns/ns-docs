---
area: technology
domain: engineering-management
type: guide
title: Scaling Organizations
description: Applies the Universal Scalability Law and Little's Law to scaling teams, with lessons on delegation, communication overhead, and limiting work in progress.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - engineering-management
  - scalability
resource: https://quanghoang.substack.com/p/on-scaling-organisations
---

# Scaling Organizations

## On Scaling Organisations - Quang Hoang

> Source: https://quanghoang.substack.com/p/on-scaling-organisations

### Universal Scalability Law (USL)

- **Formula**: X(N) = N / (1 + α(N-1) + β·N(N-1))
  - **N**: number of resources (CPUs, nodes, people)
  - **α (alpha)**: contention coefficient – the portion of work that must be done sequentially
  - **β (beta)**: coherency coefficient – the cost of communication and synchronization

**Detailed explanation:**

- USL describes real-world performance as a system or organization scales up
- **X(N)**: relative performance with N resources (compared with N=1)
- The **denominator** has 3 components:
  1. **1**: baseline performance
  2. **α(N-1)**: contention cost (bottleneck) – grows linearly with N
  3. **β·N(N-1)**: coherency cost (disruption) – grows quadratically with N

**Practical examples:**

- With α=0.01, β=0.0001, N=10: X(10) ≈ 8.26 (only 82.6% of ideal efficiency)
- With α=0.05, β=0.0001, N=20: X(20) ≈ 9.52 (only 47.6% of ideal efficiency)
- When β is large, performance can drop as N grows too far

### The 3 Growth Regimes

1. **Linear Scalability** (α=0, β=0): ideal, performance grows 1:1 with resources – rarely happens
2. **Contention** (bottleneck): performance grows slowly and then saturates no matter how many resources you add
3. **Coherency** (disruption): performance declines – the more resources you add, the slower it gets

**Detailed explanation:**

#### Linear Scalability (α=0, β=0)

- **Condition**: no bottlenecks and no synchronization cost
- **Characteristic**: X(N) = N – performance grows perfectly linearly
- **Example**: fully independent tasks that need no shared resources
- **In practice**: very rare, only happens with fully stateless and parallelizable workloads

#### Contention (α > 0)

- **Cause**: resources have to compete for a shared resource
- **Symptoms**:
  - Performance grows, but more and more slowly
  - It hits a saturation point, and adding resources no longer improves it much
  - Examples: database connection pool, shared memory, single-threaded bottleneck
- **In organizations**:
  - The leader has to approve every decision → bottleneck
  - Shared resources (servers, tool licenses) are fought over
  - Sequential processes cannot be parallelized

#### Coherency (β > 0, especially when β is large)

- **Cause**: synchronization and communication costs grow faster than the benefit of parallelism
- **Symptoms**:
  - Performance peaks and then declines as N grows
  - The more nodes, the more synchronization overhead
  - Examples: a distributed system with too many network calls, cache invalidation overhead
- **In organizations**:
  - Too many meetings, status updates, and coordination
  - Decision-making overhead grows quadratically with the number of people
  - The communication tax exceeds the benefit of adding people

### Lessons for Leaders

#### Lesson 1: Effective Delegation

**Principle**: growth is inversely proportional to how deeply the leader intervenes in the details

**Problems:**

- The leader wants to control everything → creates a bottleneck (α rises)
- Every decision must go through the leader → delay rises, throughput falls
- The team depends on the leader → cannot scale

**Solutions:**

- **Delegation framework**: clearly define decision-making authority at each level
- **Context, not control**: provide context and guidelines, don't micromanage
- **Trust but verify**: delegate authority but have a periodic review mechanism
- **Escalation path**: escalate only when truly needed, not for everything

**Examples:**

- ❌ Bad: the leader approves every PR and every design decision
- ✅ Good: the leader only reviews architecture changes, and the team decides implementation details

#### Lesson 2: Control the "Communication Tax"

**Principle**: reduce β (coherency overhead) by reducing communication costs

**Strategies:**

1. **Split the team into independent sub-teams**
   - **High internal cohesion**: members of the same sub-team communicate a lot and understand the context well
   - **Low coupling between groups**: sub-teams only need to communicate through well-defined interfaces
   - **Example**:
     - Team A builds the backend API, Team B builds the frontend
     - Interface: REST API contract
     - No daily sync needed, just API documentation and contract testing

2. **Limit the number of people involved in decisions**
   - **Two-pizza team**: small enough that two pizzas feed everyone (~6-8 people)
   - **Decision-making quorum**: only 2-3 people are needed, not the whole team
   - **RACI matrix**: clearly define who is Responsible, Accountable, Consulted, Informed

3. **Give sub-teams the authority to decide**
   - **Autonomous teams**: a sub-team can decide its tech stack, process, and timeline (within limits)
   - **Clear boundaries**: define scope and constraints clearly, and let the team decide the rest
   - **Outcome-based management**: measure results, don't micromanage process

**Communication overhead formula:**

- With N people: number of communication channels = N(N-1)/2
- N=5: 10 channels
- N=10: 45 channels (4.5x increase)
- N=20: 190 channels (19x increase!)
- **Solution**: split into independent sub-teams to reduce cross-team communication

### Little's Law

- **Formula**: WIP = Throughput × Wait Time
  - **WIP** (Work In Progress): number of items currently in progress
  - **Throughput**: rate at which work is completed (items per unit of time)
  - **Wait Time** (Cycle Time): time from starting to finishing

**Detailed explanation:**

- Little's Law describes the relationship between WIP, throughput, and wait time
- **The law**: in a stable system, the number of items in progress = completion rate × average time
- **Corollary**: Wait Time = WIP / Throughput

#### Lesson 3: To Go Fast, Do Less at Once

**Concrete examples:**

- **Scenario 1**: WIP=1, throughput=2 items/week
  - Wait Time = 1/2 = 0.5 weeks
  - Each item is completed in 3.5 days
- **Scenario 2**: WIP=20, throughput=2 items/week
  - Wait Time = 20/2 = 10 weeks
  - Each item takes 10 weeks to complete!

**Causes:**

- **Context switching overhead**: switching between many tasks costs time and energy
- **Task dependencies**: many tasks wait on each other → cascading delays
- **Parkinson's Law**: work expands to fill available time
- **Thrashing**: too many tasks → no task gets enough focus

**Solutions:**

1. **Limit WIP** (Work In Progress limit)
   - Kanban: set a WIP limit for each stage (e.g., "In Progress" max 3 tasks)
   - Only start a new task when a slot is free
   - Force prioritization: you must pick the most important task

2. **Focus and completion**
   - Finish the current task before starting a new one
   - "Stop starting, start finishing"
   - Batch similar tasks to reduce context switching

3. **Measure and optimize**
   - Track cycle time (time from start to done)
   - Track throughput (tasks completed per unit of time)
   - Reduce WIP to reduce cycle time and increase responsiveness

**Conclusion:**

- Controlling the number of concurrent work items = maintaining fast responsiveness
- Quality > Quantity: doing less but finishing it fast beats doing a lot and leaving it half done

### Summary

#### Core Principles

- **Scaling ≠ adding people**: adding people does not automatically increase performance
- **Eliminate bottlenecks (α)**:
  - Identify bottlenecks (single points of failure, sequential dependencies)
  - Parallelize or eliminate bottlenecks
  - Delegate authority, don't make the leader a bottleneck
- **Reduce decision-making cost (β)**:
  - Autonomous teams with clear boundaries
  - Reduce cross-team dependencies
  - Keep decision-making close to execution

#### Avoid the Trap of Fake Busyness

**Signs:**

- Lots of meetings but few decisions
- Lots of tasks but few completions
- Lots of status updates but little real progress
- The team is "busy" but throughput is low

**Causes:**

- WIP too high (violating Little's Law)
- Communication overhead too large (high β)
- Lack of focus and prioritization

**Solutions:**

- Measure throughput, not activity
- Focus on completion rate, not task count
- Reduce WIP to increase focus

#### A Practical Test: "Bus Factor" and the "Vacation Test"

**Question**: if you take 10 days off and turn off your computer, does the team fall apart?

**Meaning:**

- If the team cannot function when the leader is absent → there is a bottleneck (high α)
- If everything has to go through the leader → it cannot scale
- If the team can decide on its own → you have scaled successfully

**Other tests:**

- **Bus factor**: if one person gets "hit by a bus", can the team carry on?
- **Knowledge distribution**: is knowledge concentrated in one person?
- **Decision velocity**: can the team make decisions quickly when the leader is away?

**Goal:**

- Build systems and processes that don't depend on a single person
- Distribute knowledge and authority
- Enable autonomous decision-making within clear boundaries

> **See also:** [Work Process](/Technology/System Design/Resources/Business/Work Process) · [Distributed Systems Problems](/Technology/System Design/Concepts/Distributed Systems Problems)
