---
area: technology
domain: distributed-systems
type: guide
title: Designing For Distributed Failure
description: "How to design a multi-service system around failure: timeouts that mean unknown, partial failure, clock skew, replication lag, sagas and compensation, duplicate or out-of-order messages, retry budgets, tracing, and the trade-offs behind each choice."
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - distributed-systems
  - microservices
  - reliability
  - idempotency
  - sagas
---

# Designing For Distributed Failure

A single process either works or stops. A system spread over services, queues and databases can be half-working: the gateway is up, orders are accepted, and payment is down. One request may cross an API gateway, an auth service, an order service, a payment service, an inventory service and a message queue. Every component can pass its own tests while the whole flow still fails on a timeout, a duplicate message or a stale read.

The difficulty is not the number of servers. It is that no component knows the global state, the network is not reliable, replicas can disagree, and a step can complete partially. The happy path is the easy part; the design work is deciding what the system does when a step does not finish normally.

## Failure Questions To Ask First

| Question                                                           | What it exposes              | Usual mechanism                                        |
| ------------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------ |
| What if the request never arrives?                                 | Lost call                    | Timeout, bounded retry                                 |
| What if the work succeeded but the response was lost?              | Unknown outcome              | Idempotency key, reconciliation                        |
| What if this service is down but the rest are up?                  | Partial failure              | Circuit breaker, bulkhead, queue, degradation          |
| What if two nodes record the same event with different timestamps? | Clock skew                   | Logical clocks, ordering by a database or log          |
| What if a replica has not caught up?                               | Replication lag              | Read from primary, read-your-writes, conditional write |
| What if step 3 fails after steps 1 and 2 committed?                | No cross-service transaction | Saga, compensating action                              |
| What if this message is delivered twice or late?                   | At-least-once delivery       | Idempotent consumer, deduplication, event versioning   |
| What if the dependency is overloaded and everyone retries?         | Retry amplification          | Retry budget, backoff with jitter                      |
| How will an operator find the failing hop?                         | Blind spots                  | Logs, metrics, distributed tracing                     |

## 1. A Remote Call Is Not A Function Call

A local function returns a value or throws. A remote call has at least three outcomes:

- The request never reached the callee.
- The callee processed it and the response was lost.
- The callee is still working and the caller timed out first.

In the third case the caller cannot tell failure from slowness. That is the core difference: **a timeout means the outcome is unknown, not that the operation failed.** If the caller retries a payment after a timeout, and the first attempt already charged the customer, the retry charges again unless something prevents it.

An idempotency key makes the retry safe. Stripe's implementation keeps the status code and body of the first request for 24 hours, returns the saved response when the same key is retried, and rejects a reuse with different parameters. The key only works if the service records it atomically with the business effect; a key checked before the write but not stored with it still leaves a crash window.

Timeouts, bounded retries, exponential backoff, jitter and idempotency keys are usually needed together. None of them is sufficient alone.

## 2. Partial Failure Is The Normal Case

In a five-service commerce system, the gateway, order service and inventory database can all be healthy while payment cannot reach the external provider. The system has not stopped; it is partially working.

The design question is not only how to restore payment, but what the rest of the system does meanwhile:

- Accept orders that cannot be paid yet, or reject them?
- What state does an order have when it exists but payment failed?
- Return an error immediately, or let the customer pay later?
- Keep in-flight requests holding resources, or shed them?
- When payment recovers, how are unfinished operations completed?

Circuit breakers, bulkheads, timeouts, queues and graceful degradation limit how far a failure spreads. They do not by themselves make the data or the business state correct; that still needs the decisions above.

## 3. There Is No Global Clock

Two servers write at `10:00:00.100` and `10:00:00.090`. The second timestamp is earlier, but the event on the second server may have happened later in causal terms. Clocks drift, NTP steps them, and a timestamp records when a machine observed an event, not the order between events on different machines.

Consequences:

- Wall-clock timestamps cannot establish causality across nodes.
- "Last write wins" by timestamp can discard the newer logical update.
- Ordering must come from somewhere explicit: a logical clock, a vector clock, a single database, an append-only log, or a coordinator that assigns sequence numbers.

Lamport clocks (1978) give a partial order consistent with causality; vector clocks extend this so concurrent events can be detected rather than arbitrarily ordered. Many systems avoid the problem by letting one component assign the order and treating timestamps as metadata, not as the source of truth.

## 4. Replicas Can Disagree

With a primary and two replicas, a write lands on the primary and reaches the replicas later. A read from a replica in that window returns the old value. This is eventual consistency: without further writes, replicas converge.

The problem is not that eventual consistency is wrong. The problem is using it for the wrong read. A feed that shows a post a few seconds late is fine. A balance check, a credit limit or a duplicate-payment check is not.

Decide per data type and per operation:

- Tolerate staleness: feeds, counters, search indexes, analytics.
- Read from the primary or a quorum: balances, permissions, inventory before a reservation.
- Read-your-writes: route the user's next read to a replica that has caught up, or carry a version token.
- Conditional write: compare-and-set on a version so a stale read cannot overwrite a newer value.

Strong consistency for everything is a valid choice only if the latency, availability and coordination cost are acceptable. Choosing weaker consistency is also valid, but the application must handle stale reads explicitly.

## 5. No Transaction Spans Services

A relational transaction groups statements into one ACID unit. When a business flow crosses services with separate databases, there is no ordinary transaction that commits or rolls back all of them.

The order flow is the standard example: create order, charge payment, reserve inventory, prepare shipping. If payment succeeds and inventory cannot reserve, what happens? If money was taken and the order is cancelled, how is it returned? If the "payment succeeded" message is delivered twice, what does the inventory service do?

The common answer is the [Saga Pattern](/Technology/System Design/Practices/Azure Design Patterns/Saga Pattern): a sequence of local transactions, each with a compensating action if the flow cannot continue. A pivot point separates compensable steps from steps that must be retried until they succeed.

Compensation is not rollback. Azure's [Compensating Transaction Pattern](/Technology/System Design/Practices/Azure Design Patterns/Compensating Transaction Pattern) states that a compensating transaction "doesn't necessarily return the system data to its state at the start of the original operation", and that compensations "are eventually consistent operations and can fail". A refund after a charge is a new business event with its own latency, failure modes and accounting, not the absence of the charge.

Two practical rules follow:

- Make compensating steps idempotent, because they will be retried.
- Put irreversible steps after the validations that must succeed, and define clear points of no return.

## 6. Messages Can Duplicate, Lag Or Reorder

A worker consumes a message, writes to the database, and crashes before acknowledging. On restart the message is delivered again. If the handler is not idempotent, the effect happens twice.

The usual fix is an idempotent consumer: a deduplication table keyed by message ID, updated in the same transaction as the business write. If the write and the dedup record commit together, a replay is a no-op. Related mechanisms:

- Deduplication keys and a retention window for processed IDs.
- Event versioning, so an older consumer can reject or upgrade an event it does not understand.
- A partition key so events for one entity share an order; ordering is per partition, not global.
- State guards: accept `OrderShipped` only from `OrderPaid`, so a late or out-of-order event cannot move the state backwards.

"Exactly-once delivery" does not remove this work. Kafka's exactly-once semantics cover the transactional produce-consume path inside Kafka; Confluent's documentation notes that they "do not cover external side effects" and that a consumer or producer outside the system may still fail. A broker guarantee is scoped to the broker. The business effect still needs idempotence at the boundary where it is applied.

## 7. Retries Can Save Or Destroy The System

Retry helps when the error is transient. It hurts when every layer retries at once. A service slows down, callers time out and retry, the extra load makes it slower, and the layers above retry too. That is retry amplification, or a retry storm.

AWS's Builders' Library describes retries as "selfish": each client acts in its own interest and adds load that the failing dependency cannot absorb. The recommended controls:

- A retry budget or token bucket per caller, so retries are a fraction of normal traffic.
- Exponential backoff with a cap, so a dependency gets time to recover.
- Jitter, so clients do not retry in lockstep and create synchronized spikes.
- Circuit breaking, so a caller stops sending to a dependency that is already failing.
- Bulkheads, so one workload cannot consume all connections or threads.

One rule matters more than the mechanics: **do not retry a write whose outcome is unknown unless it is idempotent.** If the first attempt may have applied the effect, a blind retry may apply it twice. When the outcome cannot be determined, recording an explicit unknown state and reconciling later is often better than guessing.

## 8. Observability Is Harder Across Hops

A stack trace in one process explains a lot. A request crossing services, queues and workers leaves separate logs, at different times, with different error formats. The order service may log a payment timeout without revealing whether payment never received the request, is still processing, or charged successfully and lost the response.

Three signal types are usually combined:

- **Logs**: discrete events with context.
- **Metrics**: rates, errors, latency, queue lag, saturation, in-flight requests.
- **Distributed traces**: the path of one request across services, with per-hop timing.

A trace or correlation ID is the joining key, but adding an ID to log lines is not enough. The context must be propagated across HTTP, gRPC and message boundaries, instrumentation must cover the libraries in use, and dashboards and alerts must be built around the signals that indicate user impact.

Observability is also a design input: a system whose failures can only be diagnosed by reading five unrelated log streams is harder to operate than one that emits a consistent event envelope and a trace per request.

## 9. Every Choice Is A Trade-Off

| Choice               | Gain                               | Cost                                                         |
| -------------------- | ---------------------------------- | ------------------------------------------------------------ |
| More replicas        | Availability, read capacity        | Replication lag, more consistency decisions                  |
| Strong consistency   | Correct reads                      | Coordination latency, reduced availability during partitions |
| Retries              | Survive transient faults           | Extra load, duplicate effects without idempotence            |
| Queues               | Decoupling, buffering              | Delayed state, harder tracing, ordering constraints          |
| Synchronous calls    | Simple flow, immediate result      | Coupling, cascading failure, latency accumulation            |
| Distributed services | Independent scaling and deployment | Network failure modes, operational overhead                  |

There is no universally correct answer. A feed can accept delayed updates; a payment system needs reconciliation, auditability and explicit handling of unknown states. Two systems can use the same technology and still need different architecture decisions.

## 10. Design From Failure Behaviour

Before choosing Kafka or RabbitMQ, or microservices versus a monolith, answer the failure questions:

- If a service does not respond, what does the caller do?
- If a request times out but the work succeeded, how is a repeat avoided?
- If a message is redelivered or arrives out of order, what does the consumer do?
- If replicas disagree, which business reads can tolerate staleness?
- If a later step fails, how is the earlier work compensated, and can compensation itself fail?
- If a dependency is overloaded, how is the failure prevented from spreading?
- During an incident, how do logs, metrics and traces identify the failing hop?

Not every application needs a distributed architecture. A modular monolith can meet load, reliability and delivery-speed requirements with far less operational cost. Distribution pays off when independent scaling, team autonomy, geographic placement or fault isolation are worth the network failure modes it adds.

## Check Before Repeating

- "The request timed out, so it failed." The outcome is unknown; it may have succeeded.
- "A compensating action is a rollback." It is a new business event. It can be late, partial or fail, and it may not restore the original state.
- "Exactly-once delivery removes duplicates." The guarantee is scoped to the broker; the business effect still needs idempotence.
- "Adding an idempotency key is enough." The key must be stored atomically with the effect, or a crash reopens the duplicate window.
- "Retry until it succeeds." Without a budget and backoff, retries amplify the outage they were meant to survive.
- "The timestamp with the larger value is the newer event." Wall clocks order events per machine, not causally across machines.
- "Splitting into services makes the system scale." It adds network failure modes; a modular monolith is often enough.

## Sources

- [AWS Builders' Library – Timeouts, retries and backoff with jitter](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter)
- [Azure Architecture Center – Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)
- [Azure Architecture Center – Saga distributed transactions pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga)
- [Confluent – Kafka delivery semantics](https://docs.confluent.io/kafka/design/delivery-semantics.html)
- [Stripe – Idempotent requests](https://docs.stripe.com/api/idempotent_requests)
- [Leslie Lamport – Time, clocks, and the ordering of events in a distributed system (1978)](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)

> **See also:** [Modular Monolith Vs Microservices](/Technology/System Design/Concepts/Modular Monolith Vs Microservices) · [Distributed Systems Problems](/Technology/System Design/Concepts/Distributed Systems Problems) · [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker) · [Saga Pattern](/Technology/System Design/Practices/Azure Design Patterns/Saga Pattern) · [Compensating Transaction Pattern](/Technology/System Design/Practices/Azure Design Patterns/Compensating Transaction Pattern) · [Circuit Breaker Pattern](/Technology/System Design/Practices/Azure Design Patterns/Circuit Breaker Pattern) · [Bulkhead Pattern](/Technology/System Design/Practices/Azure Design Patterns/Bulkhead Pattern) · [Outbox Pattern](/Technology/System Design/Practices/Outbox Pattern) · [Kafka DLQ And Retry](/Technology/System Design/Practices/Kafka DLQ And Retry)
