---
tags:
  - area/technology
  - domain/programming-languages
  - topic/golang
  - type/resource
  - lang/vi
---

# 1. Resources

- https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html

Ký hiệu:

- OS thread: M.
- Thread/CPU/logical processor trong Golang: P.
- Coroutine/process: G.

Mỗi P được gán vào một M khi chương trình Golang chạy. Một M dựa vào P để context-switch G.

Tiếp theo là run queue, ta có 2 loại run-queue:

- Global run queue (GRQ).
- Local run queue (LRQ), mỗi P sẽ có một.
