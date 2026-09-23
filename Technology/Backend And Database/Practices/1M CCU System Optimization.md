---
area: technology
domain: rate-limiting
type: resource
title: 1M CCU System Optimization
description: Summary and best practices for optimizing a system serving 1M+ concurrent users, covering custom trace IDs, async rate limiting with Kafka and Flink, minimal Go architecture, and community Q&A.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - rate-limiting
  - distributed-tracing
  - kafka
  - golang
resource: https://blog.cloudflare.com/counting-things-a-lot-of-different-things
---

# 1M CCU System Optimization

## Problem Summary

### Context

- The system serves **1M+ CCU** (Concurrent Users) and **1M+ RPS** (Requests per second)
- It has handled **8M+ CCU** at peak
- Environment: K8s cluster, Go services, Kafka, Apache Flink, Redis
- Challenge: every millisecond matters, and every resource must be optimized to the maximum

### Core Problems

1. **APM overhead is unacceptable at this scale:**
   - Latency up 175% (50ms → 137.5ms)
   - 5+% CPU overhead
   - Network bandwidth spikes from exporting spans
   - The K8s cluster has to scale out by 20+% more nodes

2. **Frameworks become the bottleneck:**
   - Go Fiber, Gin, Echo: overhead of middleware layers
   - HTTP routers: pattern matching, middleware chains
   - Logging libraries: blocking I/O, buffering overhead

3. **Rate limiting at large scale:**
   - Even just the 2 Redis commands `INCR` and `EXPIRE` add significant cost
   - A zero-DB-query solution is needed

## Main Solutions

### Custom Trace ID Architecture

#### Design

A 64-bit structure (extensible to 128-bit or a 64:64 pair):

```
  user_id    service_id     counter
  (32 bit)    (10 bit)      (22 bit)
     ↓            ↓            ↓
  uint32       uint16        uint21
```

**Breakdown:**

- **First 32 bits:** `user_id` (uint32) - 4.3 billion users
- **Middle 10 bits:** `service_id` (uint16) - 1024 services
- **Last 22 bits:** `counter` (uint21) - 4.1M IDs/service/millisecond
  - Can also encode: pod_id, timestamp, or other information

**Encoding:** uint64 → base16 (base32, base36, or base62 can be used for a shorter string)

#### Advantages

- **Zero DB query:** decode the trace_id directly to get the user_id
- **Stateless:** like a JWT token, it carries enough information to be traced back to stateful if needed
- **Memory efficient:** only 2 numbers (previous + current counter) for the sliding window
- **Atomic operations:** only the `INCR` command is needed, no CAS

#### Use Cases

**Rate limiting at 1M CCU scale**

**Flow:**

```
Client → (API Service → Local Queue → Background Process) → Kafka →
Apache Flink → (Middleware Service → Redis)
```

**Details:**

- **Client → API Service:** the user sends a request
- **API Service → Local Queue:** quick authentication, create an event, push it into an in-memory queue, and return the response immediately
- **Local Queue → Background Process:** batch events from the queue
- **Background Process → Kafka:** publish batched events to Kafka
- **Kafka → Apache Flink:** Flink consumes and analyzes in real time
- **Apache Flink → Middleware Service:** if the threshold is exceeded, send a "block_user" event
- **Middleware Service → Redis:** write the key `blocked_users:{user_id}` with a TTL

**Benefits:**

- Zero DB query for rate limiting (decode from the trace_id)
- API response: < 1ms (does not wait for Kafka/Flink)
- Rate limit decision: 1-2 seconds (near real-time), a CAP trade-off (choosing P, A)
- Apache Flink scales linearly: 1M events/sec with 10 workers

**Distributed tracing across services (pattern detection)**

- HTTP: set the trace_id in a header
- Kafka event: put the trace_id in the message
- gRPC: set it in the metadata

**Anomaly detection:**

- Normal: A → B → C → D (latency: 50ms)
- Anomaly: A → B → X → C → D (latency: 500ms) → alert immediately

**Internal tool: vtrace CLI**

A tool to quickly trace any request or client-reported bug, with no internet needed.

### Optimized Architecture

#### Principles

- **Go back to the language's fundamentals:**
  - Use plain Go `net/http`
  - Minimize the middleware stack
  - Turn off logging and APM agents (turn them back on when needed)
  - Batch-send messages to the Kafka cluster (async)

#### Safe Mode

- Inspired by Windows "Safe Mode"
- Cut everything unnecessary when the system is under strain
- Not a complete blackout, because the stateless trace_id carries enough information

#### Local Queue Pattern

- **Purpose:** group events into batches so multiple messages are published to Kafka at once
- **Benefit:** avoids creating many connections and waiting on I/O when firing at Kafka
- **Note:** make sure it cannot overflow

### Internal Service Authentication

**Why use API keys when microservices call each other internally?**

1. **Team management and ownership:**
   - In a large company there are many teams, and sometimes one team dislikes another
   - A psychological solution to reduce unauthorized cross-calls

2. **Limiting unauthorized cross-calls:**
   - Control access between services
   - Clear ownership and responsibility

3. **Internal rate limiting:**
   - Internal services can be rate limited against each other

## Review and Discussion from Comments

### Logging and Monitoring

**Question:** What tool is used to log and monitor the trace header?

**Answer:**

- Inside the pod (Golang): use `zap` if logging is enabled
- Trace tool: written in-house
- OpenTelemetry is still available if enabled

**Best Practice:**

- Logs are pushed to Elasticsearch after decoding the trace_id
- A 64:64 pair (input:output) can be used to compute processing time

### Local Queue and Consistency

**Question:** Is there a risk of inconsistent data between the local queue and Kafka?

**Answer:**

- The local queue is simply for grouping events into batches
- Purpose: avoid creating many connections and waiting on I/O
- In practice, a full local queue has not been encountered

**Best Practice:**

- Have a mechanism for when the local queue is full (drop, backpressure, or blocking)
- Make sure it does not bring down the system

### On-Demand APM

**Question:** How do you turn on APM without redeploying?

**Answer:**

- Previously, a dedicated topic that pods subscribed to was used, and pods changed state when an event arrived
- There were some problems, so it went back to redeploying whenever APM needs to be turned on

**Best Practice:**

- Feature flags or a config service can be used
- Trade-off between complexity and flexibility

### Spike Handling

**Question:** In a spike, if the local queue fills up and the background process has not flushed in time, does the API drop requests?

**Answer:**

- There is a middleware layer in front of the API service:
  - Verify the JWT token
  - Check whether the token is blocked
- A full local queue has not been seen in practice, but it must be guaranteed not to crash

**Best Practice:**

- Circuit breaker and backpressure mechanisms are needed
- A middleware layer in front of the API service to filter early

### Trace ID Encoding

**Suggestions:**

- No delimiters are needed; you can cut the string by bits after conversion
- Crockford base32 as in ULID can be used to make it smaller
- Cloudflare does something similar in its observability system for Workers

**Best Practice:**

- Consider base32 or base62 to shorten the string
- Trade-off between readability and size

### Multi-Region Rate Limiting

**Question:** How do you ensure rate limiting across multiple regions whose data planes are not shared?

**Suggestion from a comment:**

- Set up routing so clients are assigned to consistent limiters (like Cloudflare with anycast & PoPs)
- If routing is not stable, accept that the user gets a wider window/bucket than the real one

**Best Practice (from the Cloudflare blog):**

- Use anycast routing so traffic from one IP always reaches the same PoP
- Consistent hashing to distribute keys
- Accept the accuracy trade-off to achieve performance and availability

### APM and Monitoring

**Question:** APM also monitors cluster metrics, so does turning it off mean a total blackout?

**Answer:**

- It is not a complete blackout
- The trace_id is stateless but has enough information to be traced back to stateful
- A 64:64 pair (input:output) can be used to compute processing time

**Best Practice:**

- Have a separate monitoring mechanism for cluster metrics (independent of APM)
- The trace_id can be decoded to get full information when needed

### Parallel Threads

**Question:** If 2 threads run in parallel, how do you collect the trace?

**Answer:**

- A real environment always has many concurrent threads
- One pod as one thread is fine too
- Ordering does not matter for the problem being solved

**Best Practice:**

- Each request has its own trace_id
- No synchronization between threads is needed

## Consolidated Best Practices

### Trace ID Design

✅ **Do:**

- Design the trace_id so it can be decoded to get information (user_id, service_id, timestamp)
- Use bit manipulation to encode multiple pieces of information in one number
- Consider a 64:64 pair (input:output) to track processing time
- Encoding: base16, base32, or base62 depending on the readability vs size trade-off
- Stateless design that can still be traced back to stateful

❌ **Do not:**

- Use plain UUIDs (they carry no information and require a DB query)
- Depend on an external service to decode the trace_id

### Rate Limiting at Scale

✅ **Do:**

- Async processing: respond to the API immediately, make the rate limit decision later (1-2 seconds)
- Batch processing: Local queue → batch events → Kafka
- Zero DB query: decode from the trace_id
- Distributed processing: Kafka → Apache Flink → Middleware Service
- Keep a rate limit layer in each pod (a fallback if Flink is slow)

❌ **Do not:**

- Use synchronous rate limiting checks (they increase latency)
- Query the DB for every request
- Create a single point of failure

### Architecture Optimization

✅ **Do:**

- Minimize the middleware stack at large scale
- Use native language features instead of frameworks when performance matters
- Batch I/O operations (Kafka, logging)
- Safe Mode: turn off unnecessary features when the system is strained
- Put a middleware layer in front of the API service to filter early

❌ **Do not:**

- Over-engineer with unnecessary frameworks
- Use blocking I/O in the request path
- Keep all monitoring/logging on all the time

### Multi-Region and Distributed Systems

✅ **Do:**

- Consistent routing (anycast, consistent hashing)
- Accept the accuracy trade-off to gain performance
- Distributed rate limiting with eventual consistency
- Local caching for mitigation decisions

❌ **Do not:**

- Use centralized rate limiting (latency and availability issues)
- Pursue perfect consistency everywhere (a trade-off against performance)

### Monitoring and Observability

✅ **Do:**

- A custom trace tool that can run offline
- Decode the trace_id to get full information
- Log to Elasticsearch after decoding
- Have a mechanism to turn APM on/off when needed

❌ **Do not:**

- Depend entirely on APM tools
- Export spans for every request at large scale

### Error Handling and Resilience

✅ **Do:**

- Circuit breaker and backpressure mechanisms
- Handle the full local queue case
- Fallback rate limiting in each pod
- A middleware layer to filter early

❌ **Do not:**

- Ignore edge cases (full local queue, network issues)
- Create a single point of failure

## Conclusion

### Key Takeaways

1. **At 1M+ CCU scale, every millisecond matters:**
   - APM tools can become a bottleneck
   - Frameworks have unacceptable overhead
   - Every layer needs optimizing

2. **Custom solutions can beat off-the-shelf ones:**
   - Trace ID design with embedded information
   - Async rate limiting with eventual consistency
   - Safe Mode to optimize when needed

3. **Trade-offs are unavoidable:**
   - Accuracy vs Performance (rate limiting)
   - Consistency vs Availability (CAP theorem)
   - Features vs Overhead (APM, logging)

4. **Architecture must fit the scale:**
   - There is no one-size-fits-all solution
   - Understand the requirements and constraints clearly
   - Test thoroughly before applying to production

### Important Notes

- **This does not advocate removing APM, logging, or abandoning frameworks:**
  - It only fits specific conditions and circumstances
  - At smaller scale, frameworks and APM tools are still a good choice

- **The use cases are not 100% identical to production:**
  - A confidentiality agreement was signed
  - Test thoroughly before applying

- **The system still uses APM but turns it on when necessary:**
  - It is not a complete blackout
  - There is an on-demand mechanism

### References

- [Cloudflare: Counting things - a lot of different things](https://blog.cloudflare.com/counting-things-a-lot-of-different-things)
  - Sliding window algorithm for rate limiting
  - Anycast routing and PoP architecture
  - Trade-off between accuracy and performance

---

_This document was created from an article and discussion on optimizing systems at 1M+ CCU, consolidating opinions and best practices from the community._

> **See also:** [1M RPS Voucher System](/Technology/Backend And Database/Practices/1M RPS Voucher System) · [Database Connection Pooling](/Technology/Backend And Database/Practices/Database Connection Pooling)
