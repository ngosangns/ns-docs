---
area: technology
domain: docker
type: guide
title: UV Distroless
description: A multi-arch Python Dockerfile that installs dependencies with UV and runs on a distroless Debian 12 base with manually copied shared libraries for high security and small size.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - python
  - uv
  - distroless
  - dockerfile
resource: https://api.sampleapis.com/coffee/
---

# UV Distroless

## Dockerfile Content

```dockerfile
FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim@sha256:6b8ac7bb76766ffe9f6cc20f56789755d539e8d0e605d8983131227c5c8b87a1 AS builder
ENV UV_LINK_MODE=copy

ARG TARGETARCH
# Copy enough shared libraries to run the application in a distroless environment
# Check the required shared libraries with: ldd $(which python3), plus the other libraries in the virtual environment after installing the needed packages (check before building)
# Each architecture places libraries in different directories, e.g. /lib/x86_64-linux-gnu/ for amd64 and /lib/aarch64-linux-gnu/ for arm64,
# so the architecture must be determined and the libraries copied from the matching directory.
# TARGETARCH is a built-in docker buildx arg that is set automatically (amd64 or arm64) when building multi-arch
# The shared libraries copied by the command below are not enough to run the application by themselves, but gcr.io/distroless/base-debian12 (the runtime-stage base image) already ships some shared libraries, so only the missing ones need to be copied.
# gcr.io/distroless/base-debian12:nonroot has no shell; inspect shared libraries using gcr.io/distroless/base-debian12:debug
# gcr.io/distroless/base-debian12:debug is like gcr.io/distroless/base-debian12:nonroot but adds a shell for debugging.
RUN if [ "$TARGETARCH" = "amd64" ]; then \
        LIBARCH="x86_64"; \
    elif [ "$TARGETARCH" = "arm64" ]; then \
        LIBARCH="aarch64"; \
    else \
        LIBARCH="unknown"; \
    fi && \
    mkdir -p /lib/multi-arch && \
    cp /lib/${LIBARCH}-linux-gnu/libc.so.6 /lib/multi-arch/ && \
    cp /lib/${LIBARCH}-linux-gnu/libm.so.6 /lib/multi-arch/ && \
    cp /lib/${LIBARCH}-linux-gnu/libz.so.1 /lib/multi-arch/ && \
    cp /lib/${LIBARCH}-linux-gnu/libgcc_s.so.1 /lib/multi-arch/

WORKDIR /build

# Use a cache to speed up the build
# Install dependencies in the uv virtual environment
# Use a type=bind mount to bind uv.lock and pyproject.toml from the host into the container instead of copying them.
# --frozen ensures only the exact dependency versions in uv.lock are installed, without updating uv.lock
# --frozen ensures only the exact dependency versions in uv.lock are installed, without updating uv.lock
# --no-install-project skips installing the current project (dependencies only)
# --no-dev skips dev dependencies
# --no-editable skips editable-mode installation
# starlette 0.46.2 is affected by CVE-2025-62727 and CVE-2025-54121; upgrade it to patch the vulnerabilities (changing pyproject.toml and uv.lock would violate the contest rules, so the install command is run separately)

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-dev --no-editable && \
    uv pip install "starlette==0.49.1" --no-deps

# Use distroless as the runtime base image to ensure security and an optimized image size
# Distroless is chosen over Alpine because Alpine uses musl libc, while Python and many popular Python libraries are compiled against glibc, causing compatibility problems.
# Distroless makes the application run more reliably and is also very light.
# cc-debian12 has more of the shared libraries needed by Python and common packages than base-debian12,
# but once the required shared libraries have been checked carefully (with ldd) and fully copied from the builder stage, base-debian12 optimizes the image size further while keeping the application stable.
FROM gcr.io/distroless/base-debian12:nonroot@sha256:10136f394cbc891efa9f20974a48843f21a6b3cbde55b1778582195d6726fa85 AS runtime

LABEL maintainer="Thanh Nguyen The"
LABEL maintainer.email="thanhnt.devops@gmail.com"
LABEL maintainer.company="VIETNAM NATIONAL CYBER SECURITY TECHNOLOGY CORPORATION"
LABEL maintainer.youtube="DevOps Mentor"
LABEL image.description="Secure, minimal Python app using UV and Distroless"

WORKDIR /app

# Copy the libraries and python from the builder stage
COPY --from=builder /lib/multi-arch/ /lib/multi-arch/
COPY --from=builder /usr/local/lib/libpython3.13.so.1.0 /usr/local/lib/libpython3.13.so.1.0
COPY --from=builder /usr/local/lib/python3.13/ /usr/local/lib/python3.13/
COPY --from=builder /usr/local/bin/python /usr/local/bin/python3
# Copy the virtual environment from the builder
COPY --from=builder --chown=nonroot:nonroot /build/.venv/ /app/.venv/

# Copy source code - copy only what is needed
COPY --chown=nonroot:nonroot src/ ./src/

# Set environment variables
# Since the runtime limit is 1 vCPU and 512MB RAM, set WORKERS=2 instead of 3 (risk of OOM). The formula workers = (2 x number of vCPUs + 1) only applies when there is more than 1GB RAM
# LD_LIBRARY_PATH lets the system find the required shared libraries in the new directory instead of the default one (/lib/x86_64-linux-gnu or /lib/aarch64-linux-gnu)
# Shared libraries not present in /lib/multi-arch continue to be loaded from the system's default directory
ENV PATH="/app/.venv/bin/:$PATH" \
    PYTHONPATH="/app/src/" \
    LANG=C.UTF-8 \
    PYTHONUNBUFFERED=1 \
    PYTHONFAULTHANDLER=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONHASHSEED=random \
    HOST=0.0.0.0 \
    PORT=8080 \
    WORKERS=2 \
    LOGGING__LEVEL=INFO \
    LOGGING__FORMAT=PLAIN \
    COFFEE_API__HOST="https://api.sampleapis.com/coffee/" \
    APP_VERSION=0.1.0 \
    GIT_COMMIT_SHA=sha \
    LD_LIBRARY_PATH=/lib/multi-arch

# The nonroot user is already the default in the distroless base-debian12:nonroot image, so the command below is unnecessary
# USER nonroot:nonroot

# Expose the default port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["python", "src/python_service_template/app.py"]
```

## Techniques Used

### UV Package Manager

- **Description**: Uses `uv` instead of `pip` to manage dependencies
- **Advantages**:
  - Installs far faster than pip (10-100x)
  - Supports a lock file (`uv.lock`) for reproducible builds
  - Integrated virtual environment management
  - Supports `--frozen` to guarantee exact versions
- **Disadvantages**:
  - New tool with less documentation than pip
  - New syntax to learn
  - Some packages may not be fully compatible

### Multi-Architecture Support

- **Description**: Supports building for both amd64 and arm64
- **Technique**:
  - Use `ARG TARGETARCH` (built into Docker buildx)
  - Conditional logic to derive `LIBARCH` from `TARGETARCH`
  - Copy shared libraries from the directory matching the architecture
- **Advantages**:
  - One Dockerfile builds for many platforms
  - Optimized for both x86_64 and ARM64
- **Disadvantages**:
  - More complex logic
  - Must be tested on both platforms

### Bind Mount Instead of COPY

- **Description**: Uses `--mount=type=bind` for `uv.lock` and `pyproject.toml`
- **Advantages**:
  - Does not create a new layer in the image
  - Speeds up builds when the files do not change
  - Reduces image size
- **Disadvantages**:
  - Only works within the build context
  - Cannot be used in the production image (builder stage only)

### Distroless Base Image

- **Description**: Uses `gcr.io/distroless/base-debian12:nonroot` for the runtime
- **Advantages**:
  - High security: no shell, package manager, or unnecessary tools
  - Smaller than full OS images
  - Reduced attack surface
  - Uses glibc (compatible with Python packages)
- **Disadvantages**:
  - Hard to debug (no shell)
  - Shared libraries must be copied manually
  - Requires a good understanding of the application's dependencies

### Manual Shared Libraries Management

- **Description**: Manually copies the required shared libraries
- **Technique**:
  - Use `ldd` to check dependencies
  - Copy them into `/lib/multi-arch/`
  - Set `LD_LIBRARY_PATH` so the runtime can find them
- **Advantages**:
  - Precise control over dependencies
  - Size optimization (copy only what is needed)
- **Disadvantages**:
  - Complex and easy to miss libraries
  - Needs thorough testing before deployment

### Security Patching

- **Description**: Patches CVEs by installing a newer version of a package
- **Technique**: `uv pip install "starlette==0.49.1" --no-deps` after the sync
- **Advantages**:
  - No lock file change needed
  - Quickly fixes security issues
- **Disadvantages**:
  - May cause dependency conflicts
  - Not sustainable (the lock file should be updated)

## Overall Advantages

- High security with distroless
- Multi-arch support
- Fast builds with UV
- Small image size

## Overall Disadvantages

- Complex and hard to maintain
- Hard to debug when problems occur
- Requires deep knowledge of system libraries

> **See also:** [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/Python/Optimization Techniques) · [UV Alpine Tini](/Technology/Cloud And DevOps/Practices/Dockerfiles/Python/UV Alpine Tini) · [Distroless JLink](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Distroless JLink)
