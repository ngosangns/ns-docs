---
area: technology
domain: programming-languages
type: note
---

> **Xem thêm:** [[python-dockerfile-optimization-techniques|Dockerfile Optimization Techniques cho Python]]

## Dockerfile 4: UV + Alpine với Tini

### Dockerfile Content

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

### Kỹ thuật sử dụng

#### 1. Tini Init System

- **Mô tả**: Sử dụng `tini` làm init system
- **Kỹ thuật**: `ENTRYPOINT ["/sbin/tini", "--"]`
- **Ưu điểm**:
  - Xử lý signals đúng cách (SIGTERM, SIGINT)
  - Tránh zombie processes
  - Best practice cho containers
- **Nhược điểm**:
  - Thêm một dependency nhỏ
  - Cần hiểu về signal handling

#### 2. UV trên Alpine

- **Mô tả**: Kết hợp UV với Alpine Linux
- **Ưu điểm**:
  - Tốc độ install nhanh của UV
  - Kích thước nhỏ của Alpine
- **Nhược điểm**:
  - Có thể gặp vấn đề với musl libc
  - UV có thể cần compile một số packages

#### 3. Pinned Package Versions

- **Mô tả**: Pin version cụ thể cho system packages
- **Kỹ thuật**: `curl=8.14.1-r2`, `tini=0.19.0-r3`
- **Ưu điểm**:
  - Reproducible builds
  - Tránh breaking changes
- **Nhược điểm**:
  - Cần update thủ công
  - Có thể miss security patches

#### 4. Healthcheck với grep

- **Mô tả**: Healthcheck không chỉ check status code mà còn check response content
- **Kỹ thuật**: `curl -f "..." | grep '"heartbeat":"HEALTHY"'`
- **Ưu điểm**:
  - Verify application logic, không chỉ HTTP
  - Phát hiện issues sớm hơn
- **Nhược điểm**:
  - Phụ thuộc vào response format
  - Có thể break nếu format thay đổi

#### 5. Non-root User với Variables

- **Mô tả**: Sử dụng environment variables cho user/group
- **Kỹ thuật**: `ENV USER=nonroot GROUP=nonroot UID=14406 GID=14406`
- **Ưu điểm**:
  - Dễ thay đổi
  - Consistent naming
- **Nhược điểm**:
  - Có thể bị override
  - Phức tạp hơn hardcode

### Ưu điểm tổng thể

- Đơn giản, dễ hiểu
- Best practices (tini, non-root)
- Kích thước nhỏ với Alpine
- Tốc độ build nhanh với UV

### Nhược điểm tổng thể

- Có thể gặp vấn đề với musl libc
- Healthcheck phụ thuộc vào response format

---

## So sánh tổng thể

### Kích thước Image (ước tính)

1. **UV + Distroless**: ~150-200MB (nhỏ nhất, bảo mật cao)
2. **Ultra Optimized Alpine**: ~110MB (mục tiêu <110MB)
3. **Wheel-based**: ~200-250MB (python:3.13-slim base)
4. **UV + Alpine + Tini**: ~150-180MB (Alpine base)

### Bảo mật

1. **UV + Distroless**: ⭐⭐⭐⭐⭐ (không có shell, minimal)
2. **Ultra Optimized Alpine**: ⭐⭐⭐⭐ (non-root, cleanup)
3. **Wheel-based**: ⭐⭐⭐ (non-root, standard)
4. **UV + Alpine + Tini**: ⭐⭐⭐⭐ (non-root, tini)

### Độ phức tạp

1. **UV + Distroless**: ⭐⭐⭐⭐⭐ (rất phức tạp)
2. **Ultra Optimized Alpine**: ⭐⭐⭐⭐⭐ (rất phức phức tạp)
3. **Wheel-based**: ⭐⭐⭐⭐ (phức tạp)
4. **UV + Alpine + Tini**: ⭐⭐ (đơn giản)

### Tốc độ Build

1. **UV + Distroless**: ⭐⭐⭐⭐⭐ (UV rất nhanh)
2. **Ultra Optimized Alpine**: ⭐⭐ (nhiều optimization steps)
3. **Wheel-based**: ⭐⭐⭐ (wheel cache tốt)
4. **UV + Alpine + Tini**: ⭐⭐⭐⭐⭐ (UV rất nhanh)

### Khả năng Debug

1. **UV + Distroless**: ⭐ (không có shell)
2. **Ultra Optimized Alpine**: ⭐⭐ (có shell nhưng thiếu tools)
3. **Wheel-based**: ⭐⭐⭐⭐ (standard Python image)
4. **UV + Alpine + Tini**: ⭐⭐⭐⭐ (có shell và tools)

---

## Best Practices tổng hợp

### 1. Multi-stage Builds

- Tách builder và runtime stages
- Chỉ copy những gì cần thiết vào runtime

### 2. Layer Caching

- Sử dụng `--mount=type=cache` cho package managers
- Copy dependency files trước source code

### 3. Security

- Sử dụng non-root user
- Pin image versions với SHA256
- Scan với Trivy/Grype

### 4. Optimization

- Xóa cache, test files, docs
- Sử dụng distroless hoặc minimal base images
- Strip binaries khi có thể

### 5. Reproducibility

- Pin tất cả versions
- Sử dụng lock files
- Document build arguments

### 6. Healthchecks

- Implement healthcheck endpoint
- Sử dụng lightweight tools hoặc Python built-in

### 7. Signal Handling

- Sử dụng tini hoặc proper signal handling
- Set STOPSIGNAL

---

## Kết luận

Mỗi Dockerfile có điểm mạnh riêng:

- **Production với yêu cầu bảo mật cao**: UV + Distroless
- **Tối ưu kích thước cực đại**: Ultra Optimized Alpine
- **Offline installation**: Wheel-based
- **Đơn giản, dễ maintain**: UV + Alpine + Tini

Lựa chọn phụ thuộc vào:

- Yêu cầu bảo mật
- Kích thước image
- Tốc độ build
- Khả năng debug
- Team expertise

```

```
