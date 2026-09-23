---
area: technology
domain: concurrency
type: guide
title: Concurrency Parallelism And Multithreading
description: Clarifies concurrency, parallelism, asynchronous execution, and multithreading, and explains why event-loop async beats threads for I/O-bound work.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - concurrency
  - multithreading
  - async
resource: https://viblo.asia/s/lap-trinh-song-song-0gdJzv6kJz5
---

# Concurrency Parallelism And Multithreading

## Resources

- Lập trình song song (Parallel Programming series): https://viblo.asia/s/lap-trinh-song-song-0gdJzv6kJz5
- **Concurrency**: refers to the CPU's ability to switch context.
- **Parallel**: I rarely use this word. It mainly describes spawning multiple threads/processes at the same time to "divide and conquer" a big task. You usually have to declare and handle a callback for when all threads/processes finish (or a callback for each one). In JavaScript, an example is `Promise.allSettled`.
- **Asynchronous**: the easiest way to understand it is a non-blocking task. For example, while you read an article, your browser is loading ads in the background but you can still scroll normally; only when loading finishes does the ad banner pop up.
- **Multithreading**: as the others above pointed out, this concept needs to be clarified as OS threading versus language/framework threading. For example, Python does not really support multithreading in the usual sense; it manages opening and closing threads itself depending on how you call system libraries. The Erlang VM (BEAM) is different: when you create a (green/virtual) thread on BEAM, it goes through preemptive scheduling before reaching an OS thread. The benefit is that you can write code that creates millions of threads without crashing the server, whereas a few tens of thousands of OS threads are enough to bring it down.

![](/Attachments/7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d.png)

Every process has at least one thread, and if it has more than one thread, we say the process is running multithreaded.

Synchronous, asynchronous, and parallel are really different properties of multithreading from a software point of view. Parallelism is the property that allows a process to do multiple jobs at the same time through multiple threads. Asynchronous means threads run in a scattered fashion, in no particular order. Threads running chaotically like this can cause race conditions, so synchronization mechanisms are needed to force threads to run in a certain order or under some common rule to make them manageable. However, synchronization is clearly not always good because it hurts performance, so you need to decide which cases call for sync and which for async.

---

## Handling Context Switches Manually

The cost of a thread context switch is very high (compared with a simple loop iteration). With multithreading, after a thread requests an I/O operation, the following things must happen:

- Back up **all** registers to RAM. On x86, for example, this includes 16 integer registers, 16 SIMD registers, the floating point registers, and system registers that the user cannot touch.
- Flush the CPU cache (which cache level depends on the OS and architecture).
- Switch the thread state to WAITING.
- The OS scheduler looks for another ready thread to execute (if any).

When the I/O completes, meaning the device (e.g. disk, NIC) has interrupted the OS, the OS switches that thread to READY. That does not mean it resumes running immediately; it still has to wait for other threads. When a slot becomes available, the steps above are reversed.

Compared with async using an event loop on a single thread:

- Only the registers used by the coroutine need to be backed up.
- No cache flush is needed.
- It is simpler for the event loop to decide which coroutine runs next than for the OS scheduler to decide which thread runs next.

---

## When to Use

Async is only effective if the task is heavily I/O bound. If the task is mostly CPU bound, multithreading or multiprocessing should be considered instead.

> **See also:** [Distributed Systems Problems](/Technology/System Design/Concepts/Distributed Systems Problems) · [Clean Code Notes](/Technology/System Design/Concepts/Clean Code Notes)
