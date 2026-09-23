---
area: technology
domain: distributed-systems
type: guide
title: Distributed Systems Problems
description: "Explains the core problems of distributed systems: partial failures, unreliable networks and clocks, synchronous versus asynchronous networks, and long-tail latency."
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - distributed-systems
  - latency
resource: https://viblo.asia/p/nhung-van-de-trong-he-thong-phan-tan-phan-1-pgjLNKvdV32
---

# Distributed Systems Problems

> https://viblo.asia/p/nhung-van-de-trong-he-thong-phan-tan-phan-1-pgjLNKvdV32

## Faults and Partial Failures

- **Difference from a single machine:**
  - On a single computer, software either works completely or does not work at all (all-or-nothing)
  - In a distributed system, a **partial failure** can occur: part of the system fails in an unpredictable way
  - Partial failure is **non-deterministic**, hard to predict and hard to detect

- **Causes:**
  - Message transmission time over the network is non-deterministic
  - You may not be able to tell whether a node is alive because of network latency

## Cloud Computing vs Supercomputing

### Different Philosophies

- **HPC (High Performance Computing) / Supercomputing:**
  - The philosophy resembles a single computer: if one node fails, stop the whole cluster
  - Wait until the problem is handled, then restart from the most recent checkpoint
  - "Just let everything crash" – similar to a kernel panic on a single machine

- **Cloud Computing:**
  - Must guarantee **availability** when users make requests
  - Uses commodity hardware that is cheaper but more likely to fail
  - Different network topology: **Clos topology** (IP & Ethernet) vs multi-dimensional meshes and toruses (HPC)

### Why the HPC Philosophy Cannot Be Applied to Internet Services

- **Availability:** the service must always be available to users
- **Hardware cost:** cloud services use commodity hardware, which is cheaper but more failure-prone
- **Network topology:**
  - HPC: multi-dimensional meshes and toruses
  - Cloud: Clos topology (IP & Ethernet)
- **Failure rate:** the larger the system, the greater the risk that some part of it fails
  - In a system with thousands of nodes, it is reasonable to assume something is always failing
  - If you stopped the system on every incident, you would spend more time recovering than doing useful work
- **Fault tolerance for operations:**
  - If the system can tolerate failed nodes, that is very useful for operations and maintenance
  - Example: **rolling upgrade** – upgrade part of the system at a time without stopping the whole thing
  - In a cloud environment, you can kill an unstable VM and restart it
- **Distance and network:**
  - Over long distances, communication mostly goes through the internet, which is slower and less reliable than a local network
  - In a supercomputer, all nodes are usually close together

### Building Reliable Systems from Unreliable Components

- **Error-detecting codes:** handle bit errors during communication
- **Combining protocols:** use TCP (reliable) on top of IP (unreliable)
- **Fault tolerance:** fault-tolerance mechanisms must be built into the software
- **Principle:** build reliable systems from unreliable components
- **Scale:** even a small system with a few nodes needs to consider partial failure

## Unreliable Networks

### Network Problems

- **The network is unreliable:**
  - A request may be lost
  - A request may be delayed and arrive late
  - A request may arrive but the response is lost
  - A response may be delayed and arrive late

- **Causes:**
  - Network partition: the network is split and some nodes cannot communicate with each other
  - Network congestion
  - Network switch failures
  - Network cable issues

### Timeouts and Failure Detection

- **Timeout:**
  - A timeout is needed to detect nodes that do not respond
  - Timeout too short: false positives (declaring a healthy node failed)
  - Timeout too long: slow failure detection, hurting user experience

- **Choosing an effective timeout:**
  - Based on **experiments**: measure round-trip time across many machines over a long period
  - Tune to balance fast failure detection against avoiding false timeouts

- **Optimizing timeouts:**
  - Use a **Phi Accrual failure detector** (as in Akka, Cassandra) to adjust timeouts automatically based on latency variation
  - TCP also has a similar dynamic timeout mechanism

### Network Congestion and Queueing

- **Congestion points:**
  - Network switch queues
  - OS queues
  - VM queues
  - TCP flow control

- **TCP vs UDP:**
  - **TCP:** guarantees reliability but can cause variable latency due to flow control and retransmission
  - **UDP:** no flow control and no retransmission of lost packets, which reduces latency but does not guarantee delivery
  - **UDP use cases:** VoIP, video calls – if a packet is lost there is no time to resend it, so the application must accept data loss (e.g. a brief audio dropout)

- **Latency variation in cloud environments:**
  - Network resources in the cloud and multi-tenant datacenters are shared
  - Latency varies widely when a "noisy neighbor" uses a lot of bandwidth
  - Batch workloads such as MapReduce can suddenly saturate the network

## Synchronous vs Asynchronous Networks

### The Telephone Network (Circuit Switching)

- **Characteristics:**
  - Extremely reliable
  - Fixed amount of data
  - No queuing, so delay is bounded
  - **Circuit Switching:** a dedicated channel is reserved for each call

### TCP/IP (Packet Switching)

- **Characteristics:**
  - Uses whatever bandwidth is available
  - The amount of data is of unknown size
  - Tries to send as fast as possible
  - Does not hold bandwidth when idle
  - **Packet Switching:** splits data into packets and sends them across the network

### Why Ethernet and IP Chose Packet Switching

- **Optimized for bursty traffic:**
  - Ordinary requests have unknown size
  - You just need to send them as fast as possible
  - Circuit switching does not fit because:
    - If you guess the bandwidth too low, transfers are slow because network capacity goes unused
    - If you guess it too high, the circuit cannot be set up, since allocated bandwidth must be guaranteed
  - TCP adapts the amount of data sent to the available network capacity

### Hybrid Networks

- **Attempts to combine the two:**
  - ATM (Asynchronous Transfer Mode): combines circuit switching and packet switching
  - Not widely adopted outside the core switches of telephone systems
  - **InfiniBand:** supports end-to-end flow control at the link layer, reducing the need for queueing
  - Uses QoS (Quality of Service) and admission control to emulate circuit switching on a packet network, or to provide statistically bounded latency

### Variable Latency

- **Causes:**
  - A consequence of dynamic resource partitioning
  - Fixed telephone network: bandwidth is statically allocated, even when unused
  - Internet: bandwidth is shared dynamically, which optimizes resource usage but causes queueing

- **Analogy with the CPU:**
  - The CPU is dynamically shared among many threads
  - A thread may be delayed while waiting for the CPU
  - This makes better use of the hardware than fixed resource allocation

- **Trade-off:**
  - **Guaranteed low latency:** achievable with static resource allocation, but it lowers efficiency and costs more
  - **Dynamic sharing:** optimizes resource utilization and reduces cost, at the price of variable latency

## Unreliable Clocks

- **Clock problems in distributed systems:**
  - Each node has its own clock (hardware clock)
  - Clocks may be out of sync between nodes
  - Clocks may drift over time
  - Clocks may be adjusted (clock skew) by NTP or other factors

- **Impact:**
  - Hard to determine the order of events across nodes
  - Hard to guarantee data consistency based on timestamps
  - Mechanisms such as vector clocks and logical clocks are needed to handle ordering

## Long-tail Latency

- **Problem:** users occasionally experience extremely high latency in distributed systems
- **Causes:** resource contention, garbage collection, hardware bottlenecks
- **Impact:** in a system with many services, the probability that a user hits high latency rises significantly (e.g. 100 services with p99=1s → 63% of users see latency > 1s)
- **Solution:** [Hedged Request](/Technology/System Design/Practices/Hedged Request) – a technique that sends the request to multiple replicas and uses the result from whichever replica responds first

> **See also:** [Hedged Request](/Technology/System Design/Practices/Hedged Request) · [Concurrency Parallelism And Multithreading](/Technology/System Design/Concepts/Concurrency Parallelism And Multithreading) · [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker)
