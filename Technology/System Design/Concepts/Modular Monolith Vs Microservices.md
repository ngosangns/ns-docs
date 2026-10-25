---
area: technology
domain: software-architecture
type: guide
title: Modular Monolith Vs Microservices
description: "When a modular monolith is enough and when splitting into services pays off: boundary enforcement, in-process calls versus network calls, the Orders–Billing example, Spring Modulith and ArchUnit, and a Strangler Fig migration path."
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - software-architecture
  - microservices
  - modular-monolith
  - spring
  - archunit
---

# Modular Monolith Vs Microservices

Both styles try to keep clear boundaries around business capabilities. They differ in where the boundary lives and what it costs to cross it.

A **modular monolith** ships the whole system as one deployable unit and draws module boundaries in code: each module exposes a narrow API and owns its tables or schema. **Microservices** make the boundary physical: separately deployable services communicate over the network, each usually with its own data store. Neither is a maturity level above the other. The choice is whether independent deployment, targeted scaling or fault isolation are worth the network failure modes and operational overhead.

## The Two Shapes

| Dimension                | Modular monolith                                | Microservices                                          |
| ------------------------ | ----------------------------------------------- | ------------------------------------------------------ |
| Deployable unit          | One process or artifact                         | One per service                                        |
| Boundary                 | Package/module plus public API                  | Network plus API                                       |
| Data                     | Shared database, ownership by module convention | Database per service                                   |
| Communication            | In-process call, in-process events              | HTTP, gRPC or a broker                                 |
| Failure                  | A bad module can take down the process          | Smaller blast radius, but partial failure              |
| Scaling                  | Replicate the whole application                 | Replicas per service                                   |
| Cross-module consistency | One ACID transaction                            | Eventual consistency, sagas                            |
| Operations               | One pipeline, one debugger                      | Many pipelines, service discovery, distributed tracing |

## Boundaries Are The Invariant

The target is the same in both: a module or service should expose only what other modules need and should own its data. The difference is enforcement.

- In a monolith the boundary is a convention. Nothing in a shared database stops one module from reading another module's tables, and nothing in the JVM stops a class from importing an internal package. Without tests and review, a modular monolith decays into a big ball of mud.
- In microservices the boundary is physical. A caller can only use the published API, and the service's database is not reachable by others. The cost is that every in-process call becomes a network call.

The term "modular monolith" is only meaningful when the modules are actually enforced. The architecture is the discipline, not the single deployment.

## In-Process Call Versus Network Call

An in-process call is cheap: low latency, one stack trace, no partial network failure, and it can join the caller's database transaction. A network call introduces:

- Latency and a new timeout to choose.
- Failure handling: retry, circuit breaker, idempotency.
- Partial failure: the callee may have succeeded while the caller saw an error.
- Data ownership: a business operation spanning two services can no longer use one ACID transaction, so it needs eventual consistency or a [Saga Pattern](/Technology/System Design/Practices/Azure Design Patterns/Saga Pattern).

The call itself is not the expensive part. The failure handling around it is. See [Designing For Distributed Failure](/Technology/System Design/Concepts/Designing For Distributed Failure) for the full set of consequences.

## Failure Isolation And Scaling

A monolith deploys simply, but it also fails simply: a memory leak, a CPU hot loop or a crash in one module affects every request in the process. Scaling means replicating the whole application, even if only the search path is hot.

Microservices isolate failures and allow targeted scaling: ten replicas for search and two for an admin service. They also multiply operational work: one CI/CD pipeline per service, service discovery, versioned APIs, distributed tracing, and an on-call rotation that has to debug across processes.

"Microservices scale better" is not automatic. If all services share one database, or if a synchronous chain passes every request through ten services, the bottleneck and the latency remain. Scaling follows from where state and contention live, not from the number of deployables.

## Worked Example: Orders To Billing

**Inside the monolith.** The Orders module saves the order, then publishes `OrderPlaced` by iterating over registered handlers and calling them directly. Billing handles the event and creates an invoice. This is an in-process synchronous callback: one transaction boundary, one stack trace, no broker.

**After extracting Billing.** Orders sends a message through a broker and Billing subscribes over the network. Two new failure windows appear:

- A crash between saving the order and publishing the message leaves Billing with no event.
- A broker redelivery after a network blip makes Billing create a second invoice.

The standard fixes are a [Transactional Outbox](/Technology/System Design/Practices/Outbox Pattern) — write the event row in the same database transaction as the order, then let a relay publish it — and an idempotent consumer that ignores a duplicate order ID.

The same crash window exists inside a monolith if the event is published after the transaction commits and the process dies in between. Spring Modulith's event publication registry addresses this without a broker: it writes an entry for each transactional event listener "as part of the original business transaction", leaves failed entries in place for retry, marks stale in-progress entries as failed, and can republish outstanding events on restart (`spring.modulith.events.republish-outstanding-events-on-restart`). A monolith can therefore get an outbox-like guarantee for in-process listeners, provided the listeners are transactional and the registry is enabled.

## Keeping Boundaries In Java

Two tools cover most of the discipline:

| Tool                                                                                  | What it does                                                                                                                                  | Where it runs                                                            |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [ArchUnit](https://www.archunit.org/)                                                 | "free, simple and extensible library for checking the architecture of your Java code using any plain Java unit test framework"                | JUnit tests; a violation fails the build                                 |
| [Spring Modulith](https://docs.spring.io/spring-modulith/reference/fundamentals.html) | Derives application modules from the package structure, verifies dependencies and cycles, supports named interfaces and `allowedDependencies` | `ApplicationModules.of(Application.class).verify()`, typically in a test |

Spring Modulith's defaults matter: types in a module's base package are API, while types in sub-packages are internal. That gives a narrow public surface by convention, and verification catches a module reaching into another module's internals. ArchUnit is the more general option: write rules such as "no module may access another module's `internal` package" and keep them as ordinary unit tests.

Verification is only as good as the rules and the build that runs them. A module boundary with no test is a comment.

## When To Keep The Monolith

- The team is small or medium and works on one product.
- Domain boundaries are still moving, so logic needs to move between modules cheaply.
- CI/CD automation and distributed monitoring are not ready.
- The business needs immediate transactional integrity across capabilities.
- The simplest operating model wins: one deploy, one schema, one place to trace a request.

## When To Split

- Several teams need to release on their own schedules. Conway's law describes the pull between org structure and system structure.
- Parts of the system have very different load or availability requirements, such as search versus administration.
- Module boundaries have been stable for a while and data ownership is clear.
- The team can operate many services: pipelines, network monitoring, incident response across processes.
- A component needs isolation for regulatory, security or failure-domain reasons.

## Migrating With Strangler Fig

Do not rewrite. Extract one piece at a time behind a routing layer, following the [Strangler Fig Pattern](/Technology/System Design/Practices/Azure Design Patterns/Strangler Fig Pattern):

1. Pick a module with a concrete reason to leave: high load, a separate team, or a distinct availability requirement.
2. Tighten its data ownership and shrink its public API before moving it.
3. Replace in-process calls with network calls or messages, and separate its data.
4. Route traffic gradually through a gateway, with a rollback path at each step.

Two practical cautions. Extract along boundaries that already exist; if the monolith has none, enforcing modules first is cheaper than extracting a tangle. And avoid long-lived dual writes during the move — use CDC or an outbox so the old and new stores do not drift.

## Check Before Repeating

- "A modular monolith is a big ball of mud." Only when module boundaries are unenforced.
- "Microservices always scale better." Bottlenecks move to the shared database or the synchronous call chain, not away.
- "Splitting services isolates failure." It shrinks the blast radius but adds partial failure and cascading timeouts.
- "A monolith cannot use events." It can, and Spring Modulith's registry gives durable in-process event delivery.
- "Database per service happens automatically." It is a design rule; a shared database silently reintroduces coupling.
- "Starting with microservices avoids a later rewrite." Boundaries are cheaper to move while they are still in one codebase.

## Sources

- [Spring Modulith – Fundamentals](https://docs.spring.io/spring-modulith/reference/fundamentals.html)
- [Spring Modulith – Events](https://docs.spring.io/spring-modulith/reference/events.html)
- [ArchUnit](https://www.archunit.org/)
- [Martin Fowler – StranglerFigApplication](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Azure Architecture Center – Strangler Fig pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)

> **See also:** [Designing For Distributed Failure](/Technology/System Design/Concepts/Designing For Distributed Failure) · [Software Architecture](/Technology/System Design/Practices/System Design Notes/Software Architecture) · [Outbox Pattern](/Technology/System Design/Practices/Outbox Pattern) · [Strangler Fig Pattern](/Technology/System Design/Practices/Azure Design Patterns/Strangler Fig Pattern) · [Saga Pattern](/Technology/System Design/Practices/Azure Design Patterns/Saga Pattern) · [Database In Microservices](/Technology/Backend And Database/Concepts/Microservices/Database In Microservices)
