---
area: technology
domain: programming-languages
type: note
title: Python Dockerfile Wheel Offline
description: 'Xem thêm: Dockerfile Optimization Techniques cho Python'
timestamp: '2026-06-19T13:43:26.132Z'
tags:
  - technology
  - programming-languages
---

> **Xem thêm:** [Dockerfile Optimization Techniques cho Python](/Technology/Programming-Languages/Practices/Python Dockerfile Optimization Techniques)

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
    m = re.match(r'^\s*([A-Za-z0-9_.-]+)(\\[[^\\]]+\\])?\s*(.*)$', s)
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
