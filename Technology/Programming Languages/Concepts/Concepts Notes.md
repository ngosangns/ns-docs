---
area: technology
domain: schedulers
type: resource
title: Concepts Notes
description: "Notes on the Go runtime scheduler and the operating-system scheduler article it builds on."
timestamp: "2026-10-03T00:00:00.000Z"
tags:
  - technology
  - golang
  - scheduler
  - operating-system
resource: https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html
---

# Concepts Notes

## Golang Scheduler

### Resources

- https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html

Notation:

- OS thread: M.
- Thread/CPU/logical processor in Go: P.
- Coroutine/process (goroutine): G.

Each P is assigned to an M when a Go program runs. An M relies on its P to context-switch Gs.

Next come the run queues. There are two kinds:

- Global run queue (GRQ).
- Local run queue (LRQ), one per P.

> **See also:** [Scalable Golang Course Notes](/Technology/Programming Languages/Concepts/Scalable Golang Course Notes)

## Os Scheduler

### Resources

- https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part1.html
