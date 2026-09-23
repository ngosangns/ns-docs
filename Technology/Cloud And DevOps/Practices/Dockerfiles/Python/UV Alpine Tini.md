---
area: technology
domain: docker
type: guide
title: UV Alpine Tini
description: A simple, maintainable Python Dockerfile using UV on Alpine with tini as init, plus a cross-Dockerfile comparison, best practices, and conclusion for the Python series.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - python
  - uv
  - tini
  - dockerfile
resource: https://github.com/khiemdoan/
---

# UV Alpine Tini

## Dockerfile Content

```dockerfile
# syntax=docker/dockerfile:1.19

FROM python:3.13-alpine3.22 AS deps

RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-compile uv==0.9.2

WORKDIR /app

COPY pyproject.toml uv.lock ./

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-install-project \
    && uv pip install starlette==0.50.0

FROM python:3.13-alpine3.22 AS final

RUN pip install -U pip

RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache \
    curl=8.14.1-r2 \
    tini=0.19.0-r3

ARG VERSION="0.1.0"
ARG BUILD_DATE="2025-11-10T00:00:00Z"
ARG REVISION="unknown"
ARG GIT_COMMIT_SHA="unknown"

LABEL org.opencontainers.image.title="python-service-template" \
      org.opencontainers.image.description="A batteries-included template for building robust, production-ready Python backend services with FastAPI" \
      org.opencontainers.image.authors="Khiem Doan" \
      org.opencontainers.image.version=$VERSION \
      org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.revision=$REVISION \
      org.opencontainers.image.source="https://github.com/khiemdoan/" \
      org.opencontainers.image.licenses="MIT"

ENV USER=nonroot \
    GROUP=nonroot \
    UID=14406 \
    GID=14406

RUN addgroup -g "$GID" "$GROUP" \
    && adduser -D -u "$UID" -G "$GROUP" "$USER"

USER $USER

WORKDIR /app

COPY --chown=$USER:$GROUP src/ src/

COPY --from=deps --chown=$USER:$GROUP /app/.venv /app/.venv

ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONPATH="/app/src" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    HOST=0.0.0.0 \
    PORT=3000 \
    WORKERS=1 \
    LOGGING__LEVEL=INFO \
    LOGGING__FORMAT=PLAIN \
    COFFEE_API__HOST=https://api.sampleapis.com/coffee/ \
    APP_VERSION=$VERSION \
    GIT_COMMIT_SHA=$GIT_COMMIT_SHA

EXPOSE $PORT

HEALTHCHECK --timeout=1s \
    CMD curl -f "http://localhost:${PORT}/health/" | grep '"heartbeat":"HEALTHY"' || exit 1

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["python", "src/python_service_template/app.py"]
```

## Techniques Used

### Tini Init System

- **Description**: Uses `tini` as the init system
- **Technique**: `ENTRYPOINT ["/sbin/tini", "--"]`
- **Advantages**:
  - Handles signals correctly (SIGTERM, SIGINT)
  - Avoids zombie processes
  - Best practice for containers
- **Disadvantages**:
  - Adds a small dependency
  - Requires understanding signal handling

### UV on Alpine

- **Description**: Combines UV with Alpine Linux
- **Advantages**:
  - UV's fast install speed
  - Alpine's small size
- **Disadvantages**:
  - May run into musl libc issues
  - UV may need to compile some packages

### Pinned Package Versions

- **Description**: Pins exact versions for system packages
- **Technique**: `curl=8.14.1-r2`, `tini=0.19.0-r3`
- **Advantages**:
  - Reproducible builds
  - Avoids breaking changes
- **Disadvantages**:
  - Must be updated manually
  - May miss security patches

### Healthcheck with grep

- **Description**: The healthcheck verifies the response content, not just the status code
- **Technique**: `curl -f "..." | grep '"heartbeat":"HEALTHY"'`
- **Advantages**:
  - Verifies application logic, not just HTTP
  - Detects issues earlier
- **Disadvantages**:
  - Depends on the response format
  - Can break if the format changes

### Non-root User with Variables

- **Description**: Uses environment variables for the user/group
- **Technique**: `ENV USER=nonroot GROUP=nonroot UID=14406 GID=14406`
- **Advantages**:
  - Easy to change
  - Consistent naming
- **Disadvantages**:
  - Can be overridden
  - More complex than hardcoding

## Overall Advantages

- Simple and easy to understand
- Best practices (tini, non-root)
- Small size thanks to Alpine
- Fast builds thanks to UV

## Overall Disadvantages

- May run into musl libc issues
- The healthcheck depends on the response format

---

## Overall Comparison

### Image Size (estimated)

1. **UV + Distroless**: ~150-200MB (smallest, high security)
2. **Ultra Optimized Alpine**: ~110MB (target <110MB)
3. **Wheel-based**: ~200-250MB (python:3.13-slim base)
4. **UV + Alpine + Tini**: ~150-180MB (Alpine base)

### Security

1. **UV + Distroless**: ⭐⭐⭐⭐⭐ (no shell, minimal)
2. **Ultra Optimized Alpine**: ⭐⭐⭐⭐ (non-root, cleanup)
3. **Wheel-based**: ⭐⭐⭐ (non-root, standard)
4. **UV + Alpine + Tini**: ⭐⭐⭐⭐ (non-root, tini)

### Complexity

1. **UV + Distroless**: ⭐⭐⭐⭐⭐ (very complex)
2. **Ultra Optimized Alpine**: ⭐⭐⭐⭐⭐ (very complex)
3. **Wheel-based**: ⭐⭐⭐⭐ (complex)
4. **UV + Alpine + Tini**: ⭐⭐ (simple)

### Build Speed

1. **UV + Distroless**: ⭐⭐⭐⭐⭐ (UV is very fast)
2. **Ultra Optimized Alpine**: ⭐⭐ (many optimization steps)
3. **Wheel-based**: ⭐⭐⭐ (wheel cache works well)
4. **UV + Alpine + Tini**: ⭐⭐⭐⭐⭐ (UV is very fast)

### Debuggability

1. **UV + Distroless**: ⭐ (no shell)
2. **Ultra Optimized Alpine**: ⭐⭐ (has a shell but lacks tools)
3. **Wheel-based**: ⭐⭐⭐⭐ (standard Python image)
4. **UV + Alpine + Tini**: ⭐⭐⭐⭐ (has a shell and tools)

---

## Best Practices Summary

### Multi-stage Builds

- Separate the builder and runtime stages
- Copy only what is needed into the runtime

### Layer Caching

- Use `--mount=type=cache` for package managers
- Copy dependency files before source code

### Security

- Use a non-root user
- Pin image versions with SHA256
- Scan with Trivy/Grype

### Optimization

- Remove caches, test files, and docs
- Use distroless or minimal base images
- Strip binaries where possible

### Reproducibility

- Pin all versions
- Use lock files
- Document build arguments

### Healthchecks

- Implement a healthcheck endpoint
- Use lightweight tools or Python built-ins

### Signal Handling

- Use tini or proper signal handling
- Set STOPSIGNAL

---

## Conclusion

Each Dockerfile has its own strengths:

- **Production with high security requirements**: UV + Distroless
- **Maximum size optimization**: Ultra Optimized Alpine
- **Offline installation**: Wheel-based
- **Simple and easy to maintain**: UV + Alpine + Tini

The choice depends on:

- Security requirements
- Image size
- Build speed
- Debuggability
- Team expertise

> **See also:** [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/Python/Optimization Techniques) · [UV Distroless](/Technology/Cloud And DevOps/Practices/Dockerfiles/Python/UV Distroless) · [Alpine Optimized](/Technology/Cloud And DevOps/Practices/Dockerfiles/Python/Alpine Optimized)
