---
area: technology
domain: docker
type: guide
title: Scratch Nginx
description: A React/Vite Dockerfile that builds a minimal dynamically linked Nginx, copies only its shared libraries into a scratch image, and uses a static C healthcheck binary.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - react
  - nginx
  - scratch
  - dockerfile-optimization
---

# Scratch Nginx

## Techniques

- **Base image**: `scratch`
- **Custom nginx**: Builds nginx with minimal modules
- **Shared libraries**: Copies the required shared libraries from the builder
- **Static healthcheck**: Compiles a C binary for the healthcheck (no wget/curl needed)
- **Multi-arch**: Supports multiple architectures through ldd
- **Minimal filesystem**: Copies only what is needed

## Advantages

- **Small size**: Slightly smaller than distroless (no base layer)
- **Minimal modules**: Builds only the modules that are needed
- **Custom healthcheck**: A tiny binary, with no external tools
- **Flexible**: The nginx build can be customized as needed

## Disadvantages

- **Shared libraries**: Libraries must be copied, which increases size compared with static linking
- **Complexity**: All dependencies must be tracked and copied
- **Maintenance**: Hard to maintain when dependencies change
- **No shell**: Cannot be debugged directly

## Use Cases

- When you want to optimize size but avoid static linking
- When nginx needs some dynamic modules
- Production with high security requirements

## Code Highlights

```dockerfile
# Collect shared libraries
ldd /usr/sbin/nginx | tr -s '[:space:]' '\n' | grep '^/' | \
    xargs -I '{}' sh -c 'mkdir -p /staging$(dirname {}) && cp -L {} /staging$(dirname {})'

# Static healthcheck binary
gcc -static -O2 -o /healthcheck /tmp/healthcheck.c
```

> **See also:** [Distroless Nginx](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Distroless Nginx) · [Alpine Nginx](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Alpine Nginx) · [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Optimization Techniques)
