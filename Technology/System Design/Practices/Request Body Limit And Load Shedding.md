---
area: technology
domain: load-shedding
type: guide
title: Request Body Limit And Load Shedding
description: Covers three ways to protect a system from overload and p99 degradation - gateway request body limits (with benchmark results), load shedding with overload detection methods, and hotspot mitigation via small caches and request collapsing.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - load-shedding
  - benchmark
  - hotspot
  - gateway
resource: https://devops.vn/posts/benchmark-gioi-han-request-body-pha-p99-he-thong
---

# Request Body Limit And Load Shedding

## Table of Contents

1. [Real-World Benchmark: Just 5% Large Requests Can Wreck the Whole System's p99](#real-world-benchmark-just-5-large-requests-can-wreck-the-whole-systems-p99)
2. [Load Shedding: Protecting Systems From Overload](#load-shedding-protecting-systems-from-overload)
3. [Hotspot: Uneven Load Distribution in Distributed Systems](#hotspot-uneven-load-distribution-in-distributed-systems)

---

## Real-World Benchmark: Just 5% Large Requests Can Wreck the Whole System's p99

**Source:** [devops.vn](https://devops.vn/posts/benchmark-gioi-han-request-body-pha-p99-he-thong)  
**Author:** Long Bùi  
**Published:** 29/12/2025

### The Real-World Problem

In an enterprise environment with many different systems, a common problem occurs: the system becomes unstable not because of a DDoS with millions of RPS, but because some clients repeatedly send requests with an **extremely large body**.

**Symptoms:**

- RPS is not high
- Gateway CPU rises
- Memory swings sharply
- Upstreams start timing out because they have to read large bodies
- **The p99 of the whole system gets worse** even though most users send normal requests

A system usually has 3 kinds of endpoints:

1. **Normal JSON APIs** (bodies of a few KB)
2. **File upload** (images/PDFs) via the API (some endpoints still accept multipart)
3. A few internal endpoints with larger bodies (batch)

The problem is that setting a **limit of X MB for everything** (e.g., X=1) sounds safe but can break upload use cases and affect quite a few systems.

**Two questions to answer:**

1. If the gateway has a **low limit** (1MB), is the system noticeably **healthier**?
2. If the gateway has a **high limit** (10MB/50MB), is abuse still enough to **strain** the system?

### Benchmark Setup

**Test architecture:**

- **Loadgen**: the server that fires requests
- **Gateway**: Nginx (could be replaced with Envoy/HAProxy)
- **Upstream**: a simple backend service (receives the body and returns HTTP 200)

**Server configuration:**

- 4 vCPU / 8GB RAM
- Same LAN (low latency)

**The upstream has 2 modes:**

- **Mode 1 (Full Body Processing)**: simulates real application logic (parsing JSON, handling multipart, etc.)
- **Mode 2 (Early Response/Short-circuiting)**: the upstream responds immediately without processing the body, to accurately measure the gateway's protective effect and its request filtering ability

**Traffic mix:**

- **Good traffic**: 95% of requests with a body of ~2-10KB
- **Bad traffic**: 5% of requests with a large body: **5MB/20MB/80MB** (depending on the test)

Total RPS is only about 1k-3k rps, because this story **doesn't need high rps**, it needs **large bodies**.

### Limit Thresholds Tested

**Profile A: Strict**

- Limit **1MB**
- For ordinary JSON APIs

**Profile B: Balanced**

- Limit **10MB**
- Enough for small images/PDFs

**Profile C: Loose**

- Limit **50MB**
- Reserved for endpoints that support multipart upload or large files

### Benchmark Results

**With no limit:**

- With 5% of requests at 5MB, p99 rises noticeably
- With 5% of requests at 20MB, p99 rises much more
- With 5% of requests at 80MB, p99 rises very sharply and the system almost cannot cope

**With a limit:**

- **Profile A (1MB)**: blocks most abuse, p99 drops clearly
- **Profile B (10MB)**: still blocks most abuse, p99 improves considerably
- **Profile C (50MB)**: still has an impact but less

**Key conclusions:**

- Just **5% large-body requests** is enough to **degrade the p99 of the whole system**
- A gateway body-size limit has a clear effect in protecting the upstream
- The lower the limit (within a reasonable range), the better the protection

### Hidden Factors That Make a Limit Effective or Meaningless

1. **`client_max_body_size` is only part of it**: if the gateway still buffers large bodies to disk/memory before rejecting them, you still pay the I/O.

2. **Timeouts must go with the limit**: a large body sent slowly by the client needs `client_body_timeout`/a request timeout to cut it off.

3. **Rate limit by IP/route**: large bodies fired continuously from a few IPs need rate limiting and body limits together for the **full combo**.

### Practical Recommendations

**3 things to do:**

1. Set the body limit **per route** (not globally)
2. Set a timeout for **client body send** (to block slow-upload abuse)
3. Track the 413/4xx metrics and the body-size distribution (to know whether the limit is right)

**Settling on thresholds:**
If your system resembles the author's (mostly small JSON, a few uploads):

- **Default API: 1MB**
- **Upload endpoint: 10MB** (if the product only needs medium images/PDFs)
- **If you truly need large uploads**: don't route them through the app, switch to presigned URLs

**In short:** a body limit isn't there to restrict users, but to **protect the p99 of good users from a few bad requests**.

---

## Load Shedding: Protecting Systems From Overload

**Source:** [quanghoang.substack.com](https://quanghoang.substack.com/p/50-days-of-sd-load-shedding)  
**Author:** Quang Hoàng  
**Published:** 27/03/2025

### A Real Story: One Million Cans of Beer

On a summer day in 2021, before the Vietnam - UAE match, Budweiser decided to give Vietnamese fans **one million cans of beer** to share in the joy of victory. The distribution partner was Shopee.

**What went wrong:**

- On the first day of the campaign, alerts fired wildly
- Latency spiked
- **The database went down!**
- Cause: a huge crowd of fans rushing to "claim" beer overloaded the servers, paralyzing part of Shopee

### What Is Overload?

**Overload** is the phenomenon where traffic surges and a server receives more requests than it can normally handle.

**Causes:**

1. **The number of users grows too fast** within a short time (e.g., a flash sale)
2. **The server is saturated by a hacker attack** (DDoS attack)
3. **The domino effect**: when one server in a cluster fails, the load balancer redirects its traffic to the remaining servers. This causes a sudden load increase on those servers, and in turn they become overloaded.

**Early symptoms:**

- CPU and/or memory utilization rises
- Latency spikes

**Two things that make overload tend to amplify itself:**

1. **Timeout waste work**: when latency exceeds a limit, clients start receiving timeout errors. All the resources spent processing these timed-out requests go to waste. As the famous saying goes: "the last thing a system should do in an overload situation, where resource is constrained, is waste work."

2. **Retry storm**: on a timeout error, clients typically retry. If each service retries 3 times on timeout, a chain of 4 services calling each other can make the last service receive **64 times** as many requests (the retry storm phenomenon).

**Three common ways to mitigate overload:**

1. Auto-scaling
2. **Load shedding**
3. Circuit breaker

### What Is Load Shedding?

**The idea of load shedding is quite natural:** when a server is "about to" be overloaded, we start **refusing to process new requests** from clients. The goal is for the server to focus its resources on the requests it already accepted.

Rejected requests get a **service unavailable (503)** error.

**In other words:** with load shedding, we accept trading away some **availability** to keep performance up and protect the server from crashing.

### Methods for Detecting Overload

#### CPU Utilization

A common way to detect that a server is "about to" be overloaded is to continuously monitor **CPU utilization**. On Linux, everything is a file, so we can read this metric from `/proc/stat`.

**Weaknesses:**

- It's hard to pick a perfect CPU utilization threshold for deciding when to refuse new requests. It could be 30%, 50%, or 70%, and the threshold often changes over time.
- Choosing a threshold that's too low hurts availability.
- Choosing a threshold that's too high can increase latency and reduce throughput.

To pick a reasonable threshold, you usually need to **stress test** the system many times. Brendan Gregg, author of the book "Systems Performance", has a detailed article on the limitations of the CPU metric, titled "CPU Utilization is Wrong".

#### Throughput (QPS)

Another common way to load shed is based on **throughput - QPS (queries per second)**. This suits services with relatively stable and uniform latency.

As with CPU utilization, you need to run careful stress tests to determine the highest QPS the system can handle without raising latency too much.

#### In-Flight Requests

For systems with unstable latency, for example when latency depends on the request or the size of the response payload, relying on QPS alone for load shedding is no longer accurate. We need a metric that combines both throughput and latency.

**Little's Law** in queuing theory states that: **the average length of a queue equals the arrival rate times the average time spent queued.**

For load shedding:

- **L** is the average number of requests being processed on the server (in-flight requests)
- **λ** is throughput
- **W** is latency

Knowing **λ** and **W**, we can estimate the average number of in-flight requests. For example: if the system's average latency is 100 (ms) and the average throughput is 1000 (qps), the average number of in-flight requests is **0.1 (s) x 1000 (qps) = 100**.

When the actual number of in-flight requests is far greater than 100, we know the system is overloaded and needs to shed load.

**Drawbacks:**

- Average latency tends to change over time, so the in-flight request limit must be recalculated frequently.
- Not suitable for I/O-bound services, for example services that call many third-party APIs or spend a lot of time accessing a database or file system. These services spend most of their time waiting for network responses, so the number of in-flight requests often doesn't accurately reflect CPU utilization.

#### Runnable Process Queue Length

**A refresher on operating systems:** OS processes have 5 states: new, ready, running, waiting, terminated.

- When the server reads/writes data from disk or network, the process moves from **running** to **waiting**. In this state the process is paused and doesn't use the CPU.
- When the read/write completes, the process "wakes up" and moves to **ready**. These ready processes are kept in a queue called the ready queue, ready to be executed.
- The CPU scheduler picks processes from the ready queue to execute according to some algorithm (e.g., the Completely Fair Scheduler).

**The process state transitions in the OS give us a perfect metric for predicting overload:**

**runnable process number = ready process number + running process number**

The runnable process count excludes processes waiting on I/O, which fixes the drawback of counting in-flight requests.

For example: suppose the server has 16 CPU cores. If the **average** number of runnable processes is greater than 16, we can conclude that the server is overloaded and needs to shed load. As with CPU utilization, the runnable process count can be computed simply by reading the `/proc/stat` file.

### Prioritizing Requests

**"All men are created equal, but requests to a server are not."**

When the server is overloaded and starts load shedding, it has the opportunity to choose which requests to refuse. For example:

1. The **/health-check** request from the load balancer is one the server must (at all costs) prioritize: if the server doesn't respond in time, the load balancer stops sending it new requests.

2. Depending on the business model, some types of requests are prioritized. For example, for an e-commerce marketplace, these are requests related to authentication, catalog listing, and orders. Similarly, Netflix classifies requests into 3 groups: NON_CRITICAL, DEGRADED_EXPERIENCE, and CRITICAL, based on their impact on user experience.

### Conclusion

The journey of reading about and researching load shedding made the author appreciate even more the importance of understanding and applying the **fundamentals** of computer science.

Load shedding is an important tool for managing distributed systems, helping maintain performance and reliability by prioritizing important requests and reducing load when needed. However, it is a "last resort" because it trades away availability, and it usually serves as the **last line of defense**.

---

## Hotspot: Uneven Load Distribution in Distributed Systems

**Source:** [quanghoang.substack.com](https://quanghoang.substack.com/p/50-days-of-sd-hotspot)  
**Author:** Quang Hoàng  
**Published:** 13/04/2025

### What Is a Hotspot?

When the amount of data grows too large, the most common way to scale a system is **partitioning**: splitting the dataset into smaller pieces, each piece (called a partition or shard) stored and managed on a separate server (shard server).

However, partitioning often runs into the **hotspot** problem. It occurs when traffic is distributed unevenly, so some shards receive too many requests from clients. As a result, these shards become overloaded and may even crash.

**A concrete example:**
A database system has n shards, each shard holds at most 10000 keys, and each key receives an average of 1 QPS. If some key suddenly becomes extremely popular with QPS = 1000 (say, Sơn Tùng releases a new hit and his fans, the Sky army, flock in to boost the views), the shard holding that key becomes sluggish, latency and error rate climb, and it may eventually crash.

### Relationship With Load Shedding

In article #5, the author introduced the **Load Shedding** technique to keep a server from going down by refusing new requests when the server shows signs of overload. Although effective, it is a "last resort" because it trades away some availability to maintain performance and protect the server. In practice, load shedding usually serves as the **last line of defense**.

In this article, the author wants to share 2 other interesting techniques for handling hotspots: **Small Cache - Big Effect** and **Request Collapsing**.

### Small Cache - Big Effect

#### The Idea

The idea of this technique comes from a very "natural" observation:

> "the worst case for load balance - a highly imbalanced query workload - is simultaneously the best case for caching, and vice-versa."

**Roughly translated:** the worst case for load balancing, when traffic is extremely imbalanced, is the best case for caching, and vice versa.

Based on this observation, we use a **cache server** to store the results of **hot keys**. As a result, most of the traffic for hot keys is handled by the cache server (which has many times the throughput of a shard server).

#### The Key Question

**How large must the cache server be to guarantee that no shard server is overloaded, even in the worst case?**

#### Research Result

Fortunately, researchers at CMU and Intel answered this question for us in a paper published in 2011: **Small Cache, Big Effect**.

**Their calculation shows:** we need to store **O(nlogn) keys** on the cache server, where **n is the number of shard servers**.

**The remarkable part:** the number of keys to cache **does not depend on the number of keys stored in the database cluster**, it **depends only on the number of shard servers**!!!

**A concrete example:**
Suppose a database cluster stores 1,000,000 keys using n=100 shards, each shard holding 10,000 keys. The cache server only needs to store **8\*nlogn+1 ~ 3,600 keys** to guarantee that no shard server becomes a hotspot (note that logn here is ln(n)).

**The author was shocked to read this result because it's so remarkable!**

This research result is currently used in many services at the author's company and has proven effective.

### Request Collapsing

#### The Idea

The second technique is **Request Collapsing** (also called request gating, request deduplication, or singleflight).

The idea of this technique comes from the observation that **hotspots often occur when too many duplicate requests are sent to the same shard.**

So instead of sending the same request over and over, we send **just one representative request** and use its result to answer the remaining duplicate requests. This ensures that at any moment, for any key A, **at most one request is sent to the shard server**.

#### Implementation

The implementation of Request Collapsing is fairly simple: when the API server receives a request to read key A from a client, it **acquires a mutex lock for key A**:

- **If it acquires the lock successfully**: the API server sends the read request for key A to the shard server, waits for the response, and then unlocks the key.
- **If it cannot acquire the lock** (meaning another process holds it): the API server waits until the shard server's response for key A arrives.

**The mutex lock here can be:**

- A **distributed lock** (e.g., Redis Redlock)
- A **local mutex lock** (e.g., Golang's built-in singleflight library)

#### A Note on Consistency

The implementation above **does not guarantee "strong consistency"**: while Req 2 waits for Res 1 at the API server, the value of key A may have changed. In other words, if Req 2 did not wait and were sent immediately by the API server to the shard server, we might receive a newer value for Res 2.

In many real systems, "strong consistency" is not a hard requirement. To achieve "strong consistency", a small change to the algorithm above is needed.

### Conclusion

To solve the hotspot problem in partitioning, the two techniques **Small Cache** and **Request Collapsing** are often **used together**. In particular, Request Collapsing is a perfect complement to Small Cache, helping prevent the **Thundering Herd** effect, a topic to be analyzed in more depth in upcoming articles.

---

## Summary

All three articles revolve around **protecting systems from overload** and **maintaining stable performance**:

1. **Request Body Limit**: protects the system from requests with overly large bodies; even when they make up only 5% of traffic, they're enough to degrade the p99 of the whole system.

2. **Load Shedding**: a technique for refusing new requests when the system is about to be overloaded, trading availability to protect performance. It is the last line of defense.

3. **Hotspot**: the problem of uneven load distribution in distributed systems, addressed with Small Cache (O(nlogn) keys) and Request Collapsing (deduplication).

All of them stress the importance of:

- **Monitoring** to detect problems early
- **Benchmarking and stress testing** to determine appropriate thresholds
- **A deep understanding of the fundamentals** (queuing theory, OS concepts) to apply them correctly

> **See also:** [Hedged Request](/Technology/System Design/Practices/Hedged Request) · [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker) · [Case Study Quick Win Optimization](/Technology/System Design/Practices/Case Study Quick Win Optimization)
