# Dockerfile Optimization Techniques cho Python

## Tổng quan

Tài liệu này phân tích chi tiết các kỹ thuật tối ưu Dockerfile cho ứng dụng Python, dựa trên 5 Dockerfile mẫu với các approach khác nhau.

---

## Dockerfile 1: UV + Distroless Multi-Arch

### Dockerfile Content

```dockerfile
FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim@sha256:6b8ac7bb76766ffe9f6cc20f56789755d539e8d0e605d8983131227c5c8b87a1 AS builder
ENV UV_LINK_MODE=copy

ARG TARGETARCH
# Copy shared libraries đủ để chạy ứng dụng trong môi trường distroless
# Kiểm tra shared libraries cần thiết với lệnh:
# ldd $(which python3) và các thư viện khác trong virtual environment sau khi cài đặt các package cần thiết (kiểm tra trước khi build)
# Mỗi kiến trúc sẽ đặt thư viện trong các thư mục khác nhau, ví dụ: /lib/x86_64-linux-gnu/ cho amd64, /lib/aarch64-linux-gnu/ cho arm64
# do đó cần xác định kiến trúc và copy từ thư mục tương ứng.
# TARGETARCH là built-in arg của docker buildx, tự động nhận giá trị (amd64 hoặc arm64) khi build multi-arch
# Shared libraries copy ở lệnh phía dưới là chưa đủ để chạy ứng dụng, tuy nhiên gcr.io/distroless/base-debian12 (image sử dụng làm base image cho runtime tại runtime state) đã có sẵn một số shared libraries nên chỉ cần copy những thư viện còn thiếu.
# gcr.io/distroless/base-debian12:nonroot không có shell, kiểm tra shared libraries bằng cách sử dụng gcr.io/distroless/base-debian12:debug
# gcr.io/distroless/base-debian12:debug tương tự gcr.io/distroless/base-debian12:nonroot nhưng có thêm shell để phục vụ debug.
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

# Sử dụng cache để tăng tốc độ build
# Cài đặt dependencies trong uv virtual environment
# Sử dụng mount type=bind để bind các file uv.lock và pyproject.toml từ host vào container mount thay vì copy.
# --frozen để đảm bảo chỉ cài đặt đúng phiên bản dependencies trong uv.lock, không update uv.lock
# --frozen để đảm bảo chỉ cài đặt đúng phiên bản dependencies trong uv.lock, không update uv.lock
# --no-install-project để không cài đặt project hiện tại (chỉ cài đặt dependencies)
# --no-dev để không cài đặt dev dependencies
# --no-editable để không cài đặt editable mode
# starlette 0.46.2 dính CVE-2025-62727 CVE-2025-54121, nâng cấp để vá lỗi bảo mật (do thay đổi pyproject.toml và file uv.lock sẽ vi phạm nội quy nên chạy lệnh install riêng)

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-dev --no-editable && \
    uv pip install "starlette==0.49.1" --no-deps

# Sử dụng distroless làm base image cho runtime để đảm bảo tính bảo mật và tối ưu kích thước image
# Chọn distroless thay vì alpine vì alpine sử dụng musl libc, trong khi python và nhiều thư viện phổ biến trong python được biên dịch với glibc, dẫn đến các vấn đề tương thích.
# distroless giúp ứng dụng chạy ổn định hơn và cũng rất nhẹ.
# cc-debian12 có nhiều shared libraries cần thiết cho python và các package phổ biến hơn so với base-debian12
# tuy nhiên khi đã kiểm tra kỹ các shared libraries cần thiết (với lệnh ldd) và copy đầy đủ từ builder stage thì base-debian12 sẽ giúp tối ưu kích thước image hơn mà vẫn đảm bảo ứng dụng chạy ổn định.
FROM gcr.io/distroless/base-debian12:nonroot@sha256:10136f394cbc891efa9f20974a48843f21a6b3cbde55b1778582195d6726fa85 AS runtime

LABEL maintainer="Thanh Nguyen The"
LABEL maintainer.email="thanhnt.devops@gmail.com"
LABEL maintainer.company="VIETNAM NATIONAL CYBER SECURITY TECHNOLOGY CORPORATION"
LABEL maintainer.youtube="DevOps Mentor"
LABEL image.description="Secure, minimal Python app using UV and Distroless"

WORKDIR /app

# Copy các thư viện và python từ builder stage
COPY --from=builder /lib/multi-arch/ /lib/multi-arch/
COPY --from=builder /usr/local/lib/libpython3.13.so.1.0 /usr/local/lib/libpython3.13.so.1.0
COPY --from=builder /usr/local/lib/python3.13/ /usr/local/lib/python3.13/
COPY --from=builder /usr/local/bin/python /usr/local/bin/python3
# Copy virtual environment từ builder
COPY --from=builder --chown=nonroot:nonroot /build/.venv/ /app/.venv/

# Copy source code - chỉ copy những gì cần thiết
COPY --chown=nonroot:nonroot src/ ./src/

# Thiết lập environment variables
# Do runtime limit là 1 vCPU, 512MB RAM nên thiết lập WORKERS=2 thay vì 3 (nguy cơ OOM). Công thức worker = (2 x số lượng vCPU + 1) chỉ áp dụng trong trường hợp > 1GB RAM
# LD_LIBRARY_PATH để hệ thống có thể tìm thấy các shared libraries cần thiết tại thư mục mới thay vì thư mục mặc đinh (/lib/x86_64-linux-gnu hoặc /lib/aarch64-linux-gnu)
# shared libraries không có trong /lib/multi-arch sẽ tiếp tục được load từ thư mục mặc định của hệ thống
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

# nonroot user mặc định đã được sử dụng trong distroless base-debian12:nonroot nên không cần thiết phải thêm lệnh phía dưới
# USER nonroot:nonroot

# Expose port mặc định
EXPOSE 8080

# Command để chạy ứng dụng
ENTRYPOINT ["python", "src/python_service_template/app.py"]
```

### Kỹ thuật sử dụng

#### 1. UV Package Manager

- **Mô tả**: Sử dụng `uv` thay vì `pip` để quản lý dependencies
- **Ưu điểm**:
  - Tốc độ cài đặt nhanh hơn pip rất nhiều (10-100x)
  - Hỗ trợ lock file (`uv.lock`) đảm bảo reproducible builds
  - Tích hợp virtual environment management
  - Hỗ trợ `--frozen` để đảm bảo version chính xác
- **Nhược điểm**:
  - Tool mới, ít tài liệu hơn pip
  - Cần học syntax mới
  - Một số package có thể chưa tương thích hoàn toàn

#### 2. Multi-Architecture Support

- **Mô tả**: Hỗ trợ build cho cả amd64 và arm64
- **Kỹ thuật**:
  - Sử dụng `ARG TARGETARCH` (built-in của Docker buildx)
  - Conditional logic để xác định `LIBARCH` dựa trên `TARGETARCH`
  - Copy shared libraries từ thư mục tương ứng với kiến trúc
- **Ưu điểm**:
  - Build một Dockerfile cho nhiều platform
  - Tối ưu cho cả x86_64 và ARM64
- **Nhược điểm**:
  - Logic phức tạp hơn
  - Cần test trên cả hai platform

#### 3. Bind Mount thay vì COPY

- **Mô tả**: Sử dụng `--mount=type=bind` cho `uv.lock` và `pyproject.toml`
- **Ưu điểm**:
  - Không tạo layer mới trong image
  - Tăng tốc build khi file không thay đổi
  - Giảm kích thước image
- **Nhược điểm**:
  - Chỉ hoạt động trong build context
  - Không thể sử dụng trong production image (chỉ dùng trong builder stage)

#### 4. Distroless Base Image

- **Mô tả**: Sử dụng `gcr.io/distroless/base-debian12:nonroot` cho runtime
- **Ưu điểm**:
  - Bảo mật cao: không có shell, package manager, hoặc các tool không cần thiết
  - Kích thước nhỏ hơn so với full OS images
  - Giảm attack surface
  - Sử dụng glibc (tương thích tốt với Python packages)
- **Nhược điểm**:
  - Khó debug (không có shell)
  - Cần copy thủ công shared libraries
  - Cần hiểu rõ dependencies của ứng dụng

#### 5. Manual Shared Libraries Management

- **Mô tả**: Copy thủ công các shared libraries cần thiết
- **Kỹ thuật**:
  - Sử dụng `ldd` để kiểm tra dependencies
  - Copy vào `/lib/multi-arch/`
  - Set `LD_LIBRARY_PATH` để runtime tìm thấy
- **Ưu điểm**:
  - Kiểm soát chính xác dependencies
  - Tối ưu kích thước (chỉ copy những gì cần)
- **Nhược điểm**:
  - Phức tạp, dễ thiếu libraries
  - Cần test kỹ trước khi deploy

#### 6. Security Patching

- **Mô tả**: Patch CVE bằng cách install version mới của package
- **Kỹ thuật**: `uv pip install "starlette==0.49.1" --no-deps` sau khi sync
- **Ưu điểm**:
  - Không cần thay đổi lock file
  - Nhanh chóng fix security issues
- **Nhược điểm**:
  - Có thể gây conflict dependencies
  - Không bền vững (nên update lock file)

### Ưu điểm tổng thể

- Bảo mật cao với distroless
- Multi-arch support
- Build nhanh với UV
- Kích thước image nhỏ

### Nhược điểm tổng thể

- Phức tạp, khó maintain
- Khó debug khi có vấn đề
- Cần kiến thức sâu về system libraries

---

## Dockerfile 2: Ultra Optimized Alpine

### Dockerfile Content

```dockerfile
# syntax=docker/dockerfile:1.7

# =============================================================================
# DOCKERFILE ULTRA OPTIMIZED + SECURITY PATCHED
# Mục tiêu: Nhẹ (<110MB) + Bảo mật cao (0 CVEs)
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

# Install dependencies với PATCHED versions để fix CVEs
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

### Kỹ thuật sử dụng

#### 1. Ultra Aggressive Optimization

- **Mô tả**: Loại bỏ tất cả các file không cần thiết
- **Kỹ thuật**:
  - Strip shared libraries (`.so` files)
  - Xóa bytecode (`__pycache__`, `.pyc`, `.pyo`)
  - Xóa test, doc, examples
  - Minimize `.dist-info` directories
  - Xóa typing stubs, C headers, license files
- **Ưu điểm**:
  - Giảm kích thước image đáng kể
  - Loại bỏ code không cần thiết
- **Nhược điểm**:
  - Có thể xóa nhầm file cần thiết
  - Khó debug khi thiếu file
  - Build time tăng

#### 2. Alpine Linux

- **Mô tả**: Sử dụng Alpine làm base image
- **Ưu điểm**:
  - Kích thước rất nhỏ (~5MB base)
  - Bảo mật tốt (ít packages)
  - Package manager nhanh (apk)
- **Nhược điểm**:
  - Sử dụng musl libc (có thể gây vấn đề với một số Python packages)
  - Một số binary wheels không tương thích
  - Cần compile nhiều packages từ source

#### 3. Prefix Installation

- **Mô tả**: Install packages vào `/install` thay vì system-wide
- **Kỹ thuật**: `pip install --prefix=/install`
- **Ưu điểm**:
  - Dễ copy sang runtime stage
  - Tách biệt dependencies
- **Nhược điểm**:
  - Cần set PATH đúng
  - Có thể gây confusion

#### 4. Python Stdlib Cleanup

- **Mô tả**: Xóa các module stdlib không cần thiết
- **Kỹ thuật**: Xóa `pip`, `setuptools`, `distutils`, `lib2to3`, `idlelib`, `tkinter`, `test`, etc.
- **Ưu điểm**:
  - Giảm kích thước đáng kể
  - Loại bỏ attack surface
- **Nhược điểm**:
  - Có thể break một số packages cần các module này
  - Khó maintain khi Python version thay đổi

#### 5. Minimal Healthcheck Tool

- **Mô tả**: Chỉ install `wget` cho healthcheck
- **Ưu điểm**:
  - Nhẹ hơn `curl` hoặc `python` healthcheck
  - Đơn giản
- **Nhược điểm**:
  - Cần thêm package vào image
  - Có thể dùng Python built-in thay thế

### Ưu điểm tổng thể

- Kích thước cực nhỏ (<110MB)
- Tối ưu hóa triệt để
- Bảo mật tốt với non-root user

### Nhược điểm tổng thể

- Phức tạp, khó maintain
- Rủi ro xóa nhầm file cần thiết
- Có thể gặp vấn đề với musl libc

---

## Dockerfile 3: Wheel-based Offline Installation

### Dockerfile Content

```dockerfile
# syntax=docker/dockerfile:1.7
#
##############################
# builder
##############################
FROM python:3.13-slim AS builder

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_ONLY_BINARY=:all: \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Pre-cache manifests
COPY pyproject.toml README.md LICENSE* ./

# Fix HIGH vulnerable issue: CVE-2025-62727 by upgrading starlette and fastapi.
RUN --mount=type=cache,target=/root/.cache/pip python - <<'PY'
import tomllib, pathlib, re
def parse_req(s:str):
    m = re.match(r'^\s*([A-Za-z0-9_.-]+)(\[[^\]]+\])?\s*(.*)$', s)
    if m:
        name, extras, rest = m.group(1), (m.group(2) or ''), (m.group(3) or '')
        return name, extras, rest
    name = re.split(r'[><=~!; ]', s, 1)[0]
    return name, '', s[len(name):]

data = tomllib.loads(pathlib.Path('pyproject.toml').read_text())
deps = data.get('project', {}).get('dependencies', [])
safe = []
present = set()
for d in deps:
    name, extras, rest = parse_req(d)
    norm = name.lower().replace('_','-')
    if norm == 'fastapi':
        safe.append(f'fastapi{extras}>=0.118,<0.121')
    else:
        safe.append(d)
    present.add(norm)
if 'starlette' not in present:
    safe.append('starlette>=0.49.1,<0.50')
pathlib.Path('/requirements.safe.txt').write_text('\n'.join(safe) + '\n')
print('Resolved safe deps:', *safe, sep='\n- ')
PY

# Wheel ALL dependencies from the safe list
RUN --mount=type=cache,target=/root/.cache/pip \
    pip wheel --wheel-dir /wheels -r /requirements.safe.txt

# Build wheel of the project itself
COPY src/ ./src/
RUN --mount=type=cache,target=/root/.cache/pip \
    pip wheel --wheel-dir /wheels .


##############################
# runtime
##############################
FROM python:3.13-slim AS runtime

ARG VERSION=0.1.0
ARG VCS_REF=sha
ARG BUILD_DATE

LABEL org.opencontainers.image.title="python-service-template" \
      org.opencontainers.image.description="Dockerfile contest build" \
      org.opencontainers.image.version=$VERSION \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.licenses="Apache-2.0"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONOPTIMIZE=2 \
    HOST=0.0.0.0 \
    PORT=5000 \
    WORKERS=1 \
    APP_VERSION=$VERSION \
    GIT_COMMIT_SHA=$VCS_REF

# Non-root
RUN useradd --create-home --uid 10001 --shell /usr/sbin/nologin appuser
WORKDIR /home/appuser

# Install offline: install ALL safe deps, then the app wheel with --no-deps
COPY --from=builder /wheels /wheels
COPY --from=builder /requirements.safe.txt /requirements.safe.txt
RUN pip install --no-index --find-links=/wheels -r /requirements.safe.txt \
    && pip install --no-index --find-links=/wheels --no-deps \
       python-service-template --no-compile \
    && rm -rf /wheels /requirements.safe.txt

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=2s --start-period=10s --retries=3 \
  CMD python -c "import sys, http.client; c=http.client.HTTPConnection('127.0.0.1', int(__import__('os').environ.get('PORT','5000')), timeout=1); c.request('GET','/health'); r=c.getresponse(); sys.exit(0 if r.status==200 else 1)" || exit 1

USER 10001:10001

CMD ["python", "-m", "python_service_template.app"]
```

### Kỹ thuật sử dụng

#### 1. Wheel-based Installation

- **Mô tả**: Build wheels trong builder stage, install offline trong runtime
- **Kỹ thuật**:
  - `pip wheel` để build wheels
  - `pip install --no-index --find-links=/wheels` để install offline
- **Ưu điểm**:
  - Không cần internet trong runtime stage
  - Reproducible builds
  - Nhanh hơn khi install từ wheels
  - Có thể cache wheels
- **Nhược điểm**:
  - Tăng kích thước builder stage
  - Cần quản lý wheel files

#### 2. Dynamic Requirements Parsing

- **Mô tả**: Parse `pyproject.toml` bằng Python script inline
- **Kỹ thuật**: Sử dụng `tomllib` (Python 3.11+) để parse và generate `requirements.safe.txt`
- **Ưu điểm**:
  - Tự động patch security vulnerabilities
  - Không cần maintain file requirements riêng
  - Linh hoạt trong việc override versions
- **Nhược điểm**:
  - Phức tạp, khó debug
  - Phụ thuộc vào Python version (cần 3.11+)
  - Logic phức tạp trong Dockerfile

#### 3. PIP_ONLY_BINARY

- **Mô tả**: Chỉ sử dụng binary wheels, không compile từ source
- **Kỹ thuật**: `ENV PIP_ONLY_BINARY=:all:`
- **Ưu điểm**:
  - Build nhanh hơn
  - Không cần build tools trong runtime
  - Giảm dependencies
- **Nhược điểm**:
  - Có thể không có wheel cho một số packages
  - Phụ thuộc vào wheel availability

#### 4. PYTHONOPTIMIZE=2

- **Mô tả**: Enable Python optimization level 2
- **Kỹ thuật**: `ENV PYTHONOPTIMIZE=2`
- **Ưu điểm**:
  - Loại bỏ docstrings, assertions
  - Tối ưu bytecode
  - Giảm kích thước
- **Nhược điểm**:
  - Mất docstrings (có thể ảnh hưởng một số tools)
  - Assertions bị loại bỏ (có thể hide bugs)

#### 5. Python-based Healthcheck

- **Mô tả**: Sử dụng Python built-in thay vì external tool
- **Kỹ thuật**: `python -c "import http.client; ..."`
- **Ưu điểm**:
  - Không cần thêm package
  - Luôn available
- **Nhược điểm**:
  - Command dài, khó đọc
  - Có thể chậm hơn curl/wget

#### 6. --no-compile

- **Mô tả**: Không compile bytecode khi install
- **Kỹ thuật**: `pip install --no-compile`
- **Ưu điểm**:
  - Giảm install time
  - Giảm kích thước (không có .pyc files)
- **Nhược điểm**:
  - Python sẽ compile on-the-fly (chậm hơn lần đầu chạy)

### Ưu điểm tổng thể

- Offline installation
- Reproducible builds
- Tự động security patching
- Không cần external tools cho healthcheck

### Nhược điểm tổng thể

- Logic phức tạp trong Dockerfile
- Phụ thuộc vào wheel availability
- PYTHONOPTIMIZE có thể gây side effects

---

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