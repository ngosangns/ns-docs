---
area: technology
domain: docker
type: guide
title: Alpine Optimized
description: A Python FastAPI Dockerfile on Alpine that strips libraries, bytecode, and unused stdlib modules to get an image under 110MB with a non-root user.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - python
  - alpine
  - dockerfile
resource: http://127.0.0.1:${PORT}/health/
---

# Alpine Optimized

## Dockerfile Content

```dockerfile
# syntax=docker/dockerfile:1.7

# =============================================================================
# DOCKERFILE ULTRA OPTIMIZED + SECURITY PATCHED
# Goal: Lightweight (<110MB) + high security (0 CVEs)
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Dependencies Builder
# -----------------------------------------------------------------------------
FROM python:3.13-alpine@sha256:e5fa639e49b85986c4481e28faa2564b45aa8021413f31026c3856e5911618b1 AS deps

ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache --virtual .build-deps \
      build-base \
      python3-dev \
      cargo

# Install dependencies with PATCHED versions to fix CVEs
# Note: FastAPI 0.116+ required for starlette 0.49.1+ support
RUN --mount=type=cache,target=/root/.cache/pip \
    python -m pip install --no-cache-dir --prefix=/install \
         "aiohttp>=3.12.14,<4.0.0" \
         "asgi-correlation-id>=4.3.4,<5.0.0" \
         "fastapi>=0.116.0" \
         "prometheus-fastapi-instrumentator>=7.0.0,<8.0.0" \
         "pydantic>=2.11.0,<3.0.0" \
         "pydantic-settings>=2.9.1,<3.0.0" \
         "structlog>=25.3.0,<26.0.0" \
         "uvloop>=0.21.0,<0.22.0" \
         "uvicorn[standard]>=0.30.0,<0.31.0"

# ULTRA AGGRESSIVE optimization
RUN apk add --no-cache binutils \
 # Strip ALL .so files aggressively
 && find /install -type f \( -name '*.so*' -o -name '*.a' \) -exec strip --strip-all {} + 2>/dev/null || true \
 # Remove all bytecode
 && find /install \( -type d -name __pycache__ -o -type f -name '*.py[co]' \) -delete 2>/dev/null || true \
 # Remove test/doc/examples
 && find /install -type d \( -name tests -o -name testing -o -name test -o -name doc -o -name docs -o -name example -o -name examples \) -prune -exec rm -rf {} + 2>/dev/null || true \
 # Minimize .dist-info
 && find /install -name '*.dist-info' -type d -exec sh -c 'cd "$1" && find . -type f ! -name "METADATA" ! -name "top_level.txt" ! -name "RECORD" -delete' _ {} \; 2>/dev/null || true \
 # Remove typing stubs, headers, C files
 && find /install -type f \( -name '*.pyi' -o -name '*.c' -o -name '*.h' -o -name '*.cpp' -o -name '*.cc' \) -delete \
 # Remove license files
 && find /install -type f \( -name 'LICENSE*' -o -name 'COPYING*' -o -name 'NOTICE*' -o -name 'AUTHORS*' -o -name 'CHANGELOG*' -o -name 'README*' \) -delete 2>/dev/null || true \
 && apk del binutils .build-deps

# -----------------------------------------------------------------------------
# Stage 2: Runtime (ULTRA MINIMAL + SECURE)
# -----------------------------------------------------------------------------
FROM python:3.13-alpine@sha256:e5fa639e49b85986c4481e28faa2564b45aa8021413f31026c3856e5911618b1 AS runtime

LABEL org.opencontainers.image.title="Python Service Template" \
      org.opencontainers.image.description="Production-ready FastAPI service - Optimized & Secured" \
      org.opencontainers.image.version="0.1.0" \
      org.opencontainers.image.authors="newnol <contact@newnol.io.vn>" \
      maintainer="newnol" \
      security.scan="trivy-passed"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    HOST=0.0.0.0 \
    PORT=5000 \
    WORKERS=1 \
    PYTHONPATH=/app/src \
    TZ=UTC

# Install ONLY wget for healthcheck
RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache wget

WORKDIR /app

# Create non-root user
RUN addgroup -g 10001 -S app \
 && adduser -u 10001 -S -G app -h /app -s /sbin/nologin app

# Copy dependencies
COPY --from=deps --chown=app:app /install /usr/local

# Copy source (minimal)
COPY --chown=app:app src/ ./src/

# Permissions
RUN chmod -R 550 /app

# EXTREME Python stdlib cleanup
RUN rm -rf \
    /usr/local/lib/python3.13/ensurepip \
    /usr/local/lib/python3.13/site-packages/pip* \
    /usr/local/lib/python3.13/site-packages/setuptools* \
    /usr/local/lib/python3.13/site-packages/wheel* \
    /usr/local/lib/python3.13/distutils \
    /usr/local/lib/python3.13/lib2to3 \
    /usr/local/lib/python3.13/idlelib \
    /usr/local/lib/python3.13/tkinter \
    /usr/local/lib/python3.13/turtledemo \
    /usr/local/lib/python3.13/test \
    /usr/local/lib/python3.13/unittest/test \
    /usr/local/bin/pip* \
    /usr/local/bin/2to3* \
    /usr/local/bin/idle* \
    2>/dev/null || true

# Clean up more unused stdlib modules
RUN cd /usr/local/lib/python3.13 && rm -rf \
    turtle.py \
    pydoc_data \
    2>/dev/null || true

USER app

EXPOSE 5000

# Heathcheck
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=2 \
    CMD wget --no-verbose --tries=1 -O /dev/null http://127.0.0.1:${PORT}/health/ || exit 1

STOPSIGNAL SIGTERM

CMD ["python", "src/python_service_template/app.py"]
```

## Techniques Used

### Ultra Aggressive Optimization

- **Description**: Removes every unnecessary file
- **Techniques**:
  - Strip shared libraries (`.so` files)
  - Delete bytecode (`__pycache__`, `.pyc`, `.pyo`)
  - Delete tests, docs, and examples
  - Minimize `.dist-info` directories
  - Delete typing stubs, C headers, and license files
- **Advantages**:
  - Significantly reduces image size
  - Removes unnecessary code
- **Disadvantages**:
  - May delete needed files by mistake
  - Hard to debug when files are missing
  - Longer build time

### Alpine Linux

- **Description**: Uses Alpine as the base image
- **Advantages**:
  - Very small (~5MB base)
  - Good security (few packages)
  - Fast package manager (apk)
- **Disadvantages**:
  - Uses musl libc (may cause problems with some Python packages)
  - Some binary wheels are incompatible
  - Many packages must be compiled from source

### Prefix Installation

- **Description**: Installs packages into `/install` instead of system-wide
- **Technique**: `pip install --prefix=/install`
- **Advantages**:
  - Easy to copy into the runtime stage
  - Keeps dependencies isolated
- **Disadvantages**:
  - PATH must be set correctly
  - Can cause confusion

### Python Stdlib Cleanup

- **Description**: Removes unneeded stdlib modules
- **Technique**: Delete `pip`, `setuptools`, `distutils`, `lib2to3`, `idlelib`, `tkinter`, `test`, etc.
- **Advantages**:
  - Significant size reduction
  - Reduces the attack surface
- **Disadvantages**:
  - May break packages that need these modules
  - Hard to maintain when the Python version changes

### Minimal Healthcheck Tool

- **Description**: Installs only `wget` for the healthcheck
- **Advantages**:
  - Lighter than `curl` or a `python` healthcheck
  - Simple
- **Disadvantages**:
  - Requires adding a package to the image
  - Python built-ins could be used instead

## Overall Advantages

- Extremely small size (<110MB)
- Thorough optimization
- Good security with a non-root user

## Overall Disadvantages

- Complex and hard to maintain
- Risk of deleting needed files by mistake
- May run into musl libc issues

> **See also:** [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/Python/Optimization Techniques) · [UV Alpine Tini](/Technology/Cloud And DevOps/Practices/Dockerfiles/Python/UV Alpine Tini) · [UV Distroless](/Technology/Cloud And DevOps/Practices/Dockerfiles/Python/UV Distroless)
