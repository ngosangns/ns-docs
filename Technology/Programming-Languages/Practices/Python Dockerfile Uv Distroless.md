---
area: technology
domain: programming-languages
type: note
---

> **Xem thêm:** [[Python Dockerfile Optimization Techniques|Dockerfile Optimization Techniques cho Python]]

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
