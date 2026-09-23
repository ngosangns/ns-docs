---
area: technology
domain: api-gateway
type: note
title: Grab Tech Talk Takeaways
description: Notes from a Grab tech talk on building an API gateway, covering technology choices, design, performance, maintenance and safe upgrades.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - api-gateway
  - microservices
  - grab
---

# Grab Tech Talk Takeaways

## Technology Choices

- Detailed Nginx metrics are only available in the enterprise edition, so avoid it when you need fine-grained metrics.
- Avoid Kong: its Lua scripting is dated and there is little documentation online.
- Prefer open source to save time and reduce bugs, and contribute back to that project where possible.
- Pick an API gateway that supports custom logic well and exposes many metrics.
- Envoy is process-based. Each request is handled by exactly one Envoy process; whether memory can be shared between processes is unclear. **Look into this further.**
- Use microservices to avoid rebuilding the whole program on every deploy or change.
- Running on k8s can cause network incidents if it is not configured carefully. For stability, the API gateway currently serves directly on EC2.

## Design

- The API gateway also takes on authorization and authentication.
- A Golang program can be split into multiple `.so` files so that development and deployment are faster (only modules that changed need updating). **Look into how the `.so` files communicate with each other.**

## Performance

- When sharing data between services, share memory addresses instead of copying memory to reduce memory usage. The downside is that you must watch for memory leaks. **Look into how fields are accessed and how the interface should be organized.**
  - Sync calls: no need to worry about the garbage collector, because the function holding the variable waits for the communication to finish before it is released.
  - Async calls: I forgot the details. **Look into this.**

## Maintenance

- You need a team that tracks changes in the open-source projects you depend on.

## Upgrade

- When rewriting a service, deploy the new version in "shadow" mode (it does the same work as the old version whenever a request arrives) and compare the results. Only replace the old version once the new service has proven stable.
- The API gateway must never go down, so always keep a standby gateway.

> **See also:** [Developer Resources](/Technology/Documentation/Resources/Developer Resources) · [Tech Blogs And Books](/Technology/Documentation/Resources/Tech Blogs And Books)
