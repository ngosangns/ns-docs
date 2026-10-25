---
area: technology
domain: java-concurrency
type: guide
title: Structured Concurrency In Java
description: "Why ExecutorService fan-out leaks threads and waits too long, and how StructuredTaskScope models subtasks as one unit: fork, join and close, joiner policies, timeout semantics, interrupt-based cancellation, JSON thread dumps, and the JDK 27 preview / JDK 28 final status."
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - java
  - concurrency
  - virtual-threads
  - structured-concurrency
resource: https://www.youtube.com/watch?v=aow56RgptLA
---

# Structured Concurrency In Java

> **Source**: Devoxx, "Structured Concurrency Looms", Alan Bateman and Viktor Klang (Java Platform Group, Oracle), uploaded 2026-10-08, 50:56. Checked 2026-10-25: 1,365 views on the Devoxx channel and 29,403 on the Java channel reupload.
>
> API details are checked against JEP 543, which proposes finalizing structured concurrency in JDK 28. JDK 27 carries the preview via JEP 533.

A common API fan-out fetches a customer profile from a database and an order from an external service concurrently, then combines them into an `OrderSummary`. Virtual threads make the two blocking calls cheap, but an `ExecutorService` does not make the _group_ behave as one operation. Structured concurrency treats the group as a unit of work: no subtask outlives the block that created it, and one failure cancels the rest.

## Why The ExecutorService Pattern Falls Short

The usual virtual-thread version:

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<Customer> customer = executor.submit(() -> fetchCustomer(id));
    Future<Order> order = executor.submit(() -> fetchOrder(id));
    return new OrderSummary(customer.get(), order.get());
}
```

It has three failure-related problems:

- **Unnecessary waiting.** If `fetchOrder` fails immediately, the owner is still blocked in `customer.get()`. The combined result cannot succeed, but the slow branch is not cancelled.
- **Delayed error propagation.** If `fetchCustomer` throws first, the exception leaves the block and `close()` runs. `ExecutorService.close()` performs an orderly shutdown: it waits for already-submitted tasks to finish. `fetchOrder` keeps running, and the client waits for it before seeing the customer error.
- **A broken parent-child relationship.** A thread dump shows the owner waiting in `Future.get()`; the two worker threads appear as unrelated threads.

The executor is also the wrong abstraction for fan-out: it is designed for task submission and pooling, not for scoping a group of tasks to one caller's block. Tasks can outlive the caller, and interruption of the caller does not propagate to them.

## The Structured Model

```java
OrderSummary summary;
try (var scope = StructuredTaskScope.open()) {
    Subtask<Customer> customer = scope.fork(() -> fetchCustomer(id));
    Subtask<Order> order = scope.fork(() -> fetchOrder(id));
    scope.join();
    summary = new OrderSummary(customer.get(), order.get());
}
```

The lifecycle:

| Step  | Call                         | Meaning                                                             |
| ----- | ---------------------------- | ------------------------------------------------------------------- |
| Open  | `StructuredTaskScope.open()` | The calling thread becomes the scope's owner                        |
| Fork  | `scope.fork(callable)`       | Runs the task on its own virtual thread, returns a `Subtask`        |
| Join  | `scope.join()`               | Waits for all subtasks as one unit and applies the joiner policy    |
| Read  | `subtask.get()`              | Returns the result, or throws the recorded failure after join       |
| Close | implicit `close()`           | Cancels incomplete subtasks and waits for every thread to terminate |

`StructuredTaskScope` deliberately does **not** implement `Executor` or `ExecutorService`, because those interfaces invite fire-and-forget use. Only the owner thread may fork, and misuse outside the proper nesting can raise `StructureViolationException`.

## join() Versus close()

They answer different questions:

- **`join()` decides the business outcome.** With the default policy, it waits for the subtasks; if one fails, it cancels the others by interrupting them, then throws an `ExecutionException` whose cause is the subtask's exception. `join()` returns `null` for the default scope; results come from the `Subtask` handles.
- **`close()` guarantees lifecycle safety.** It cancels any subtask that is still running and waits for all subtask threads to terminate before control leaves the block. No thread is left behind.

The important nuance: **join still waits for cancelled subtasks to terminate.** It stops waiting for the slow branch's _result_ and starts cancelling it immediately, but structured concurrency also promises that nothing outlives the scope. If a subtask ignores interruption, `join()` and `close()` can block indefinitely. The cancellation has to be cooperative.

## Joiner Policies

`open()` takes a `Joiner` that decides when the scope is done:

- **Default / `awaitAllSuccessfulOrThrow()`**: wait for all subtasks; on the first failure, cancel the rest and throw. `allSuccessfulOrThrow()` has the same completion policy but returns a list of results instead of `null`.
- **`anySuccessfulOrThrow()`**: return the first successful result and cancel the remaining subtasks. This is the racing pattern, for example reading the same key from cache and database concurrently:

```java
try (var scope = StructuredTaskScope.open(Joiner.anySuccessfulOrThrow())) {
    scope.fork(() -> cache.get(key));
    scope.fork(() -> db.get(key));
    return scope.join();
}
```

If every subtask fails, the joiner throws. A custom `Joiner` can implement other policies, such as collecting partial successes or deciding from a predicate.

## Cancellation And Timeout

Cancellation is built on `Thread.interrupt()`. A subtask finishes quickly only if its code responds to interruption: `Thread.sleep`, blocking I/O and most `java.util.concurrent` operations throw `InterruptedException` or a related exception. Code that swallows the interrupt flag, or blocks in an operation that is not interruptible, keeps the scope open.

A timeout is set at open time:

```java
try (var scope = StructuredTaskScope.open(
        cf -> cf.withTimeout(Duration.ofMillis(300)))) {
    scope.fork(() -> fetchCustomer(id));
    scope.fork(() -> fetchOrder(id));
    scope.join();
}
```

Two details matter:

- The timer starts when the scope is opened, not when `fork()` or `join()` is called. Work done between opening and joining counts against the budget.
- On expiry, the scope is cancelled and `join()` throws an `ExecutionException` with `CancelledByTimeoutException` as the cause. This is **not** a hard deadline for the method: `close()` still waits for the interrupted subtasks to terminate, so a non-cooperative subtask can hold the owner past the timeout.

## Observability

The JSON thread dump added for virtual threads extends to structured scopes. Running:

```
jcmd <pid> Thread.dump_to_file -format=json <file>
```

produces a hierarchy: each scope object contains the threads forked inside it, so the dump shows which scope is open, which owner thread is waiting in `join()`, and which subtasks are running. That replaces the flat list of unrelated threads from the executor pattern.

## Status

Structured concurrency has a long preview history:

| JEP           | JDK        | Change                                              |
| ------------- | ---------- | --------------------------------------------------- |
| 428, 437      | 19, 20     | Incubator                                           |
| 453           | 21         | Preview; `fork` returns `Subtask`                   |
| 462, 480, 499 | 22, 23, 24 | Re-previews                                         |
| 505           | 25         | Static factory methods replace public constructors  |
| 525           | 26         | Minor changes                                       |
| 533           | 27         | Type parameter for the exception thrown by `join()` |
| 543           | 28         | Proposed to finalize, no further change             |

As of 2026-10-25, JDK 27 is the current preview and JEP 543 is proposed to target JDK 28; it has not shipped as final. Code written against the JDK 27 API is the closest to the proposed final form.

## When To Use It

Use `StructuredTaskScope` when a set of independent subtasks belongs to one request or one unit of work and the caller needs all-or-one-of their results:

- Fan-out to several downstream services with a shared deadline.
- Racing redundant reads where the first success wins.
- Any place where a failed branch should stop the others instead of leaving them running.

Do not use it as a replacement for a long-lived executor or for background work that must outlive the request. It is a scoping tool for a block of related work, not a thread pool.

## Check Before Repeating

- "Virtual threads already solve this." They make blocking cheap; they do not cancel sibling tasks or tie subtasks to the caller's lifetime.
- "`join()` returns as soon as one subtask fails." It cancels the others, but still waits for their threads to terminate.
- "The timeout guarantees the method returns within that duration." It only cancels the scope; `close()` can wait longer for non-interruptible code.
- "Cancellation stops a subtask immediately." It sends an interrupt; the subtask must respond.
- "The executor's `close()` cancels running tasks." It performs an orderly shutdown and waits for them; cancellation requires `shutdownNow()` or a scope.
- "The API is final." JDK 27 is a preview; JDK 28 finalization is proposed, not shipped.

## Sources

- [Devoxx – Structured Concurrency Looms (Alan Bateman, Viktor Klang, 2026)](https://www.youtube.com/watch?v=aow56RgptLA)
- [JEP 543 – Structured Concurrency (proposed final, JDK 28)](https://openjdk.org/jeps/543)
- [JEP 533 – Structured Concurrency (preview, JDK 27)](https://openjdk.org/jeps/533)
- [JEP 505 – Structured Concurrency (fifth preview, JDK 25)](https://openjdk.org/jeps/505)
- [JEP 444 – Virtual Threads](https://openjdk.org/jeps/444)

> **See also:** [JVM Anatomy](/Technology/Programming Languages/Concepts/JVM Anatomy) · [Concurrency Parallelism And Multithreading](/Technology/System Design/Concepts/Concurrency Parallelism And Multithreading) · [Designing For Distributed Failure](/Technology/System Design/Concepts/Designing For Distributed Failure)
