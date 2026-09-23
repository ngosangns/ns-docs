---
area: technology
domain: golang
type: note
title: Golang Scheduler
description: Short notes on the Go runtime scheduler model (M, P, G and the global and local run queues), based on the Ardan Labs article.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - golang
  - scheduler
resource: https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html
---

# Golang Scheduler

## Resources

- https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html

Notation:

- OS thread: M.
- Thread/CPU/logical processor in Go: P.
- Coroutine/process (goroutine): G.

Each P is assigned to an M when a Go program runs. An M relies on its P to context-switch Gs.

Next come the run queues. There are two kinds:

- Global run queue (GRQ).
- Local run queue (LRQ), one per P.

> **See also:** [OS Scheduler](/Technology/Programming Languages/Concepts/Os Scheduler) · [Scalable Golang Course Notes](/Technology/Programming Languages/Concepts/Scalable Golang Course Notes)
