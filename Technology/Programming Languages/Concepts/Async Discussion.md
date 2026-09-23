---
area: technology
domain: async
type: note
title: Async Discussion
description: Notes comparing how asynchronous execution works in JavaScript (call stack and callback queue) and in PHP (Fibers as green threads).
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - async
  - javascript
  - php
---

# Async Discussion

## Async in JavaScript

In JavaScript, when the current call stack returns or waits on an async task, the whole call stack is treated as an async call stack (for example, a function that uses `await` must also be marked with the `async` keyword). The current call stack is then moved to the callback queue.

## Async in PHP

In PHP, the VM manages call stacks per process rather than per thread (the VM decides how work is divided across threads). So when you use async with Fibers, you are creating additional, separate Fiber processes to do the work and then return the result if needed (an event loop can be used to receive the results).

Here, a "process" can be called a green thread or coroutine. Each process has its own call stack, program counter, and registers. The main process can be served by more than one thread.

Unlike threads, which the OS or runtime schedules so they can context-switch, these processes plan for themselves when to hand control to one another. For example, a Fiber has a `suspend()` function that hands control back to the parent process together with the result, if any, and the main process can hand control to the Fiber with the `resume()` method.

PHP does not yet have truly asynchronous execution, because when one process in a process tree is running, the other processes in that tree must stop (whether a server handling many requests can have multiple process trees has not been tested). Today, a few frameworks and libraries implement async in PHP by imitating JS (for example, an event loop).

> **See also:** [Defer Async Inline](/Technology/Programming Languages/Concepts/Defer Async Inline) · [Golang Scheduler](/Technology/Programming Languages/Concepts/Golang Scheduler)
