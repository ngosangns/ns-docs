---
area: technology
domain: frontend
topic: docker
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Dockerfile Optimization Techniques cho React Applications

## Tổng quan

Phân tích chi tiết 5 kỹ thuật tối ưu Dockerfile cho React SPA, từ đơn giản đến cực kỳ tối ưu về kích thước và hiệu năng.

---

## 1. BusyBox httpd với lipanski/docker-static-website

### Kỹ thuật

- **Base image**: `lipanski/docker-static-website` (92.5 KB base)
- **Web server**: BusyBox httpd
- **Multi-stage build**: Builder stage (Node Alpine) + Production stage (BusyBox)
- **Pre-compression**: Gzip level 9 cho tất cả static files
- **Layer caching**: Tách riêng package files để tối ưu cache
- **Cache mount**: Sử dụng BuildKit cache mount cho pnpm store

### Ưu điểm

- **Kích thước cực nhỏ**: Base image chỉ 92.5 KB
- **Đơn giản**: Không cần cấu hình phức tạp
- **Tự động gzip**: BusyBox httpd tự động serve file .gz khi client hỗ trợ
- **Build nhanh**: Ít dependencies, build time ngắn
- **Security**: Minimal attack surface do base image nhỏ

### Nhược điểm

- **Tính năng hạn chế**: BusyBox httpd có ít tính năng hơn Nginx
- **Không hỗ trợ Brotli**: Chỉ hỗ trợ gzip
- **Không có HTTP/2**: Chỉ HTTP/1.1
- **Không có SSL/TLS**: Cần reverse proxy nếu cần HTTPS
- **Không có advanced routing**: Hạn chế trong việc cấu hình routing phức tạp

### Use cases

- Static sites đơn giản
- Internal tools không cần HTTPS
- Prototypes và demos
- Khi ưu tiên kích thước image hơn tính năng

### Code highlights

```dockerfile
# Pre-compress với gzip level 9
find dist -type f \( \
  -name "*.html" -o -name "*.css" -o -name "*.js" \
  \) -exec sh -c 'gzip -9 "{}"' \;

# Health check tối thiểu
echo "OK" > dist/health
```

---

## 2. Distroless với Custom Static Nginx (UPX Compressed)

### Kỹ thuật

- **Base image**: `scratch` (distroless)
- **Custom nginx build**: Tự compile nginx với static linking
- **UPX compression**: Nén binary nginx với UPX LZMA
- **Multi-stage**: 5 stages (builder, nginx-builder, compressor, rootfs, final)
- **Dual compression**: Gzip + Brotli cho static assets
- **Parallel compression**: Sử dụng `xargs -P` để nén song song
- **Symbol stripping**: Strip binary để giảm kích thước
- **Multi-arch support**: Hỗ trợ build cho nhiều kiến trúc

### Ưu điểm

- **Kích thước cực nhỏ**: <6MB final image (sau UPX)
- **Tối ưu binary**: Static linking, strip symbols, UPX compression
- **Dual compression**: Hỗ trợ cả gzip và Brotli (tốt hơn gzip ~20%)
- **Performance**: Nginx với các module tối thiểu, tối ưu cho static files
- **Security**: Distroless = không có shell, package manager, hoặc tools
- **HTTP/2 support**: Hỗ trợ HTTP/2 và SSL/TLS
- **Parallel compression**: Tận dụng multi-core để nén nhanh hơn

### Nhược điểm

- **Build time dài**: Phải compile nginx từ source
- **Phức tạp**: Nhiều stages, nhiều cấu hình
- **Khó debug**: Không có shell trong distroless image
- **Maintenance**: Phải tự maintain nginx build khi có update
- **UPX overhead**: Có thể ảnh hưởng startup time (nhỏ)

### Use cases

- Production environments cần kích thước tối thiểu
- Container orchestration với resource constraints
- Edge deployments
- Khi cần HTTP/2 và SSL/TLS support

### Code highlights

```dockerfile
# Static linking với optimization flags
--with-cc-opt='-static -Os -ffunction-sections -fdata-sections' \
--with-ld-opt='-static -Wl,--gc-sections'

# UPX compression
upx --best --lzma /usr/local/nginx/sbin/nginx

# Parallel compression
find dist -type f ... | xargs -0 -P"$(nproc)" -I {} sh -c 'gzip -9 -k -f "{}" && brotli -q 11 -f "{}"'
```

---

## 3. Scratch với Custom Nginx + Shared Libraries

### Kỹ thuật

- **Base image**: `scratch`
- **Custom nginx**: Build nginx với minimal modules
- **Shared libraries**: Copy các shared libraries cần thiết từ builder
- **Static healthcheck**: Compile C binary cho healthcheck (không cần wget/curl)
- **Multi-arch**: Hỗ trợ nhiều kiến trúc thông qua ldd
- **Minimal filesystem**: Chỉ copy những gì cần thiết

### Ưu điểm

- **Kích thước nhỏ**: Nhỏ hơn distroless một chút (không có base layer)
- **Minimal modules**: Chỉ build những module cần thiết
- **Custom healthcheck**: Binary nhỏ, không cần external tools
- **Flexible**: Có thể tùy chỉnh nginx build theo nhu cầu

### Nhược điểm

- **Shared libraries**: Phải copy libraries, tăng kích thước so với static linking
- **Complexity**: Phải track và copy tất cả dependencies
- **Maintenance**: Khó maintain khi có thay đổi dependencies
- **No shell**: Không thể debug trực tiếp

### Use cases

- Khi cần tối ưu kích thước nhưng không muốn static linking
- Khi nginx cần một số dynamic modules
- Production với yêu cầu security cao

### Code highlights

```dockerfile
# Collect shared libraries
ldd /usr/sbin/nginx | tr -s '[:space:]' '\n' | grep '^/' | \
    xargs -I '{}' sh -c 'mkdir -p /staging$(dirname {}) && cp -L {} /staging$(dirname {})'

# Static healthcheck binary
gcc -static -O2 -o /healthcheck /tmp/healthcheck.c
```

---

## 4. Go FastHTTP Server với Embedded Files

### Kỹ thuật

- **Base image**: `scratch`
- **Go server**: FastHTTP (high-performance HTTP server)
- **Embedded files**: Sử dụng `//go:embed` để embed static files vào binary
- **Single binary**: Tất cả trong một file, không cần web server riêng
- **UPX compression**: Nén binary với UPX ultra-brute LZMA
- **Static linking**: CGO_ENABLED=0 để tạo static binary

### Ưu điểm

- **Kích thước cực nhỏ**: Single binary, có thể <5MB sau UPX
- **Performance cao**: FastHTTP nhanh hơn nhiều so với Nginx cho simple use cases
- **Đơn giản**: Không cần cấu hình web server
- **SPA routing**: Tự động handle SPA routing (fallback về index.html)
- **No dependencies**: Không cần external files hoặc libraries
- **Easy deployment**: Chỉ cần copy một file

### Nhược điểm

- **Không có HTTP/2**: FastHTTP không hỗ trợ HTTP/2 native
- **Limited features**: Ít tính năng hơn Nginx (caching, rate limiting, etc.)
- **Go dependency**: Phải maintain Go code
- **No gzip_static**: Phải implement compression logic trong code
- **Less battle-tested**: FastHTTP ít được sử dụng hơn Nginx

### Use cases

- Microservices với yêu cầu performance cao
- Internal APIs cần serve static files
- Khi muốn tối ưu tối đa kích thước
- Khi không cần các tính năng advanced của Nginx

### Code highlights

```dockerfile
# Embed files vào binary
//go:embed dist
var distFiles embed.FS

# Build với optimization
CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -trimpath -o server main.go
strip server
upx --ultra-brute --lzma server
```

---

## 5. Alpine với Custom-built Nginx

### Kỹ thuật

- **Base image**: `alpine:3.20`
- **Custom nginx**: Build nginx từ source với minimal modules
- **Pre-compression**: Gzip level 9 cho static files
- **gzip_static**: Nginx serve pre-compressed files
- **Non-root user**: Chạy với user nginx (UID 101)
- **Security headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Cache optimization**: Long-term caching cho assets, no-cache cho index.html

### Ưu điểm

- **Cân bằng tốt**: Kích thước nhỏ nhưng vẫn có đầy đủ tính năng
- **Dễ debug**: Có shell và tools trong Alpine
- **Security**: Non-root user, security headers
- **Performance**: gzip_static, HTTP/2, SSL/TLS support
- **Maintainable**: Dễ maintain và update hơn distroless
- **Flexible**: Có thể thêm packages nếu cần

### Nhược điểm

- **Lớn hơn distroless**: Alpine base ~5MB, distroless ~0MB
- **Build time**: Vẫn phải compile nginx
- **Attack surface**: Lớn hơn distroless (có shell, package manager)

### Use cases

- Production environments cần cân bằng giữa kích thước và tính năng
- Khi cần debug và troubleshoot
- Khi cần thêm packages hoặc tools
- Development và staging environments

### Code highlights

```dockerfile
# Pre-compress với gzip
find /app/dist -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' \) \
    -exec gzip -k -9 {} \;

# Nginx config với gzip_static
gzip_static on;
gzip_vary on;

# Cache headers
location / {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
location = /index.html {
    expires -1;
    add_header Cache-Control "no-cache";
}
```

---

## So sánh tổng quan

| Tiêu chí        | BusyBox   | Distroless Nginx | Scratch Nginx | Go FastHTTP | Alpine Nginx |
| --------------- | --------- | ---------------- | ------------- | ----------- | ------------ |
| **Kích thước**  | ~1-2MB    | <6MB             | ~5-8MB        | <5MB        | ~15-20MB     |
| **Build time**  | Rất nhanh | Rất chậm         | Chậm          | Trung bình  | Chậm         |
| **Tính năng**   | Tối thiểu | Đầy đủ           | Đầy đủ        | Hạn chế     | Đầy đủ       |
| **HTTP/2**      | ❌        | ✅               | ✅            | ❌          | ✅           |
| **SSL/TLS**     | ❌        | ✅               | ✅            | ❌          | ✅           |
| **Brotli**      | ❌        | ✅               | ❌            | ❌          | ❌           |
| **Debug**       | Khó       | Rất khó          | Rất khó       | Khó         | Dễ           |
| **Maintenance** | Dễ        | Khó              | Khó           | Trung bình  | Dễ           |
| **Performance** | Tốt       | Rất tốt          | Rất tốt       | Cực tốt     | Rất tốt      |
| **Security**    | Tốt       | Cực tốt          | Cực tốt       | Cực tốt     | Tốt          |

---

## Kỹ thuật tối ưu chung

### 1. Multi-stage Build

- **Mục đích**: Giảm kích thước final image bằng cách loại bỏ build dependencies
- **Cách làm**: Tách builder stage và production stage
- **Lợi ích**: Final image chỉ chứa runtime dependencies

### 2. Layer Caching

- **Mục đích**: Tối ưu build time bằng cách cache các layers không thay đổi
- **Cách làm**: Copy package files trước, install dependencies, sau đó mới copy source code
- **Lợi ích**: Khi source code thay đổi, không cần reinstall dependencies

### 3. BuildKit Cache Mount

- **Mục đích**: Cache package manager store giữa các lần build
- **Cách làm**: `RUN --mount=type=cache,id=pnpm,target=/pnpm/store`
- **Lợi ích**: Dependencies được cache, build nhanh hơn nhiều

### 4. Pre-compression

- **Mục đích**: Nén files trước khi serve để giảm bandwidth
- **Cách làm**: Gzip/Brotli compression trong build stage
- **Lợi ích**: Server không cần compress on-the-fly, response nhanh hơn

### 5. Symbol Stripping

- **Mục đích**: Loại bỏ debug symbols khỏi binary
- **Cách làm**: `strip --strip-all /path/to/binary`
- **Lợi ích**: Giảm kích thước binary 20-30%

### 6. UPX Compression

- **Mục đích**: Nén binary executable
- **Cách làm**: `upx --best --lzma /path/to/binary`
- **Lợi ích**: Giảm kích thước binary 50-70%
- **Trade-off**: Tăng startup time một chút (thường không đáng kể)

### 7. Static Linking

- **Mục đích**: Loại bỏ dependency vào shared libraries
- **Cách làm**: Compile với `-static` flag
- **Lợi ích**: Binary độc lập, không cần copy libraries

### 8. Minimal Modules

- **Mục đích**: Chỉ build những module cần thiết
- **Cách làm**: Disable các module không cần với `--without-*`
- **Lợi ích**: Giảm kích thước và attack surface

### 9. Distroless/Scratch Base

- **Mục đích**: Loại bỏ hoàn toàn OS và tools không cần thiết
- **Cách làm**: Sử dụng `scratch` hoặc distroless base image
- **Lợi ích**: Kích thước cực nhỏ, security tốt nhất
- **Trade-off**: Khó debug, không có shell

### 10. Non-root User

- **Mục đích**: Giảm security risk nếu container bị compromise
- **Cách làm**: Tạo user với UID/GID cụ thể, chạy với `USER`
- **Lợi ích**: Principle of least privilege

### 11. Healthcheck

- **Mục đích**: Container orchestration có thể monitor container health
- **Cách làm**: `HEALTHCHECK CMD [...]`
- **Lợi ích**: Tự động restart unhealthy containers

### 12. OCI Labels

- **Mục đích**: Metadata cho image management
- **Cách làm**: `LABEL org.opencontainers.image.*`
- **Lợi ích**: Dễ quản lý và track versions

### 13. SHA256 Pinning

- **Mục đích**: Đảm bảo sử dụng đúng version của base image
- **Cách làm**: `FROM image@sha256:...`
- **Lợi ích**: Security, reproducible builds

### 14. Parallel Compression

- **Mục đích**: Tận dụng multi-core để nén nhanh hơn
- **Cách làm**: `xargs -P"$(nproc)"`
- **Lợi ích**: Build time nhanh hơn đáng kể

### 15. Cleanup Build Artifacts

- **Mục đích**: Loại bỏ files không cần thiết
- **Cách làm**: Xóa source maps, stats files, etc.
- **Lợi ích**: Giảm kích thước final image

---

## Best Practices

### Khi nào dùng approach nào?

1. **BusyBox**: Prototypes, internal tools, khi cần cực kỳ đơn giản
2. **Distroless Nginx**: Production với yêu cầu security và kích thước cao
3. **Scratch Nginx**: Tương tự distroless nhưng muốn control hoàn toàn
4. **Go FastHTTP**: Microservices, APIs, khi cần performance cực cao
5. **Alpine Nginx**: Production thông thường, cần cân bằng giữa các yếu tố

### Security Considerations

- Luôn sử dụng non-root user
- Pin base image với SHA256
- Loại bỏ unnecessary tools và packages
- Sử dụng distroless/scratch khi có thể
- Scan images với security scanners

### Performance Considerations

- Pre-compress static assets
- Sử dụng gzip_static/brotli_static
- Cache headers cho static assets
- Long-term caching cho immutable assets
- No-cache cho index.html

### Build Optimization

- Sử dụng BuildKit cache mounts
- Tối ưu layer ordering
- Parallel operations khi có thể
- Cleanup artifacts ngay sau build

---

## Dockerfile đầy đủ

### 1. BusyBox httpd với lipanski/docker-static-website

```dockerfile
# syntax=docker/dockerfile:1.7
# ==============================================================================
# Build Stage - Using Node Alpine for minimal size
# ==============================================================================
FROM node:22.21.1-alpine3.21@sha256:af8023ec879993821f6d5b21382ed915622a1b0f1cc03dbeb6804afaf01f8885 AS builder

# Install pnpm with specific version from package.json and gzip for pre-compression
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
  corepack prepare pnpm --activate

WORKDIR /app

# Copy package files for dependency installation (optimized layer caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies with cache mount for faster rebuilds
# Installs all dependencies (including devDependencies needed for build: typescript, vite, tailwindcss, etc.)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile

# Copy only necessary source files (exclude tests, docs, config files not needed for build)
COPY tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.ts postcss.config.js ./
COPY index.html ./
COPY public ./public
COPY src ./src

# Build the application
RUN pnpm run build && \
  # Verify build output exists
  test -d dist && test -f dist/index.html && \
  # Remove bundle visualizer output (not needed in production, saves ~100KB compressed)
  rm -f dist/stats.html && \
  # Create a minimal health check endpoint (1 byte file for ultra-fast response)
  echo "OK" > dist/health && \
  # Pre-compress all static files with gzip (level 9 = maximum compression)
  find dist -type f \( \
  -name "*.html" -o \
  -name "*.css" -o \
  -name "*.js" -o \
  -name "*.json" -o \
  -name "*.xml" -o \
  -name "*.txt" -o \
  -name "*.svg" \
  \) -exec sh -c 'gzip -9 "{}"' \;

# ==============================================================================
# Production Stage - Using lipanski/docker-static-website for extreme minimal footprint (92.5 KB base)
# ==============================================================================
FROM lipanski/docker-static-website:latest AS production

# Add OCI labels for metadata
LABEL org.opencontainers.image.title="Vite React Template" \
  org.opencontainers.image.description="Production-ready Vite React application with extreme minimal footprint" \
  org.opencontainers.image.version="0.4.0" \
  org.opencontainers.image.licenses="MIT OR Apache-2.0" \
  org.opencontainers.image.base.name="lipanski/docker-static-website:latest"

# Copy built assets from builder stage
# lipanski/docker-static-website serves from /home/static
COPY --from=builder /app/dist /home/static

# Expose port (BusyBox httpd uses port 3000 by default)
EXPOSE 3000

# The base image already has CMD set to run BusyBox httpd
# It automatically serves .gz files when Accept-Encoding: gzip is present
# No additional configuration needed - inherited from base image
```

### 2. Distroless với Custom Static Nginx (UPX Compressed)

```dockerfile
# syntax=docker/dockerfile:1.7

# Multi-arch support: Automatically provided by buildx
ARG BUILDPLATFORM
ARG TARGETPLATFORM
ARG TARGETARCH

ARG BUILD_DATE
ARG GIT_COMMIT=unknown
ARG NGINX_VERSION=1.26.2
ARG NODE_VERSION=20
ARG ALPINE_VERSION=3.20

# ==============================================================================
# Stage 1: Application Build
# ==============================================================================
FROM node:${NODE_VERSION}-alpine@sha256:2d5e8a8a51bc341fd5f2eed6d91455c3a3d147e91a14298fc564b5dc519c1666 AS builder

WORKDIR /app

# Setup pnpm with corepack
ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.12.2 --activate

# Install dependencies with cache mount
COPY package.json pnpm-lock.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline

# Copy source and build configuration
COPY tsconfig.json tsconfig.node.json vite.config.ts ./
COPY postcss.config.js tailwind.config.ts biome.json ./
COPY index.html ./
COPY public ./public
COPY src ./src

# Build and clean artifacts
ENV NODE_ENV=production
RUN pnpm build && \
    find dist -type f \( -name "*.map" -o -name ".*" \) -delete && \
    rm -f dist/stats.html

# ==============================================================================
# Stage 2: Static Nginx Binary Builder
# ==============================================================================
FROM alpine:${ALPINE_VERSION}@sha256:765942a4039992336de8dd5db680586e1a206607dd06170ff0a37267a9e01958 AS nginx-builder

ARG NGINX_VERSION
ARG TARGETPLATFORM
ARG BUILDPLATFORM
ENV NGINX_SHA256=627fe086209bba80a2853a0add9d958d7ebbdffa1a8467a5784c9a6b4f03d738

# Log build platform info for multi-arch
RUN echo "Building on $BUILDPLATFORM for $TARGETPLATFORM"

# Install build dependencies
RUN apk add --no-cache \
    gcc g++ musl-dev make linux-headers curl \
    pcre-dev pcre2-dev zlib-dev zlib-static \
    openssl-dev openssl-libs-static upx

# Download and verify nginx
WORKDIR /tmp
RUN curl -fSL "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -o nginx.tar.gz && \
    echo "${NGINX_SHA256}  nginx.tar.gz" | sha256sum -c -

# Build fully static nginx with minimal modules
RUN tar -xzf nginx.tar.gz && \
    cd "nginx-${NGINX_VERSION}" && \
    ./configure \
        --prefix=/usr/local/nginx \
        --sbin-path=/usr/local/nginx/sbin/nginx \
        --conf-path=/etc/nginx/nginx.conf \
        --pid-path=/run/nginx.pid \
        --lock-path=/run/nginx.lock \
        --error-log-path=/dev/stderr \
        --http-log-path=/dev/stdout \
        --user=nobody \
        --group=nobody \
        # Performance features
        --with-threads \
        --with-file-aio \
        --with-http_ssl_module \
        --with-http_v2_module \
        --with-http_gzip_static_module \
        --with-http_stub_status_module \
        --with-pcre \
        --with-pcre-jit \
        # Static linking and optimization
        --with-cc-opt='-static -Os -ffunction-sections -fdata-sections' \
        --with-ld-opt='-static -Wl,--gc-sections' \
        # Disable unnecessary modules
        --without-http_charset_module \
        --without-http_ssi_module \
        --without-http_userid_module \
        --without-http_auth_basic_module \
        --without-http_mirror_module \
        --without-http_autoindex_module \
        --without-http_geo_module \
        --without-http_map_module \
        --without-http_split_clients_module \
        --without-http_referer_module \
        --without-http_rewrite_module \
        --without-http_proxy_module \
        --without-http_fastcgi_module \
        --without-http_uwsgi_module \
        --without-http_scgi_module \
        --without-http_grpc_module \
        --without-http_memcached_module \
        --without-http_limit_conn_module \
        --without-http_limit_req_module \
        --without-http_empty_gif_module \
        --without-http_browser_module \
        --without-http_upstream_hash_module \
        --without-http_upstream_ip_hash_module \
        --without-http_upstream_least_conn_module \
        --without-http_upstream_random_module \
        --without-http_upstream_keepalive_module \
        --without-http_upstream_zone_module \
        --without-mail_pop3_module \
        --without-mail_imap_module \
        --without-mail_smtp_module \
        --without-stream_limit_conn_module \
        --without-stream_access_module \
        --without-stream_geo_module \
        --without-stream_map_module \
        --without-stream_split_clients_module \
        --without-stream_return_module \
        --without-stream_set_module \
        --without-stream_upstream_hash_module \
        --without-stream_upstream_least_conn_module \
        --without-stream_upstream_random_module \
        --without-stream_upstream_zone_module && \
    make -j"$(nproc)" && \
    make install

# Optimize binary: strip symbols + UPX compression
RUN strip --strip-all /usr/local/nginx/sbin/nginx && \
    upx --best --lzma /usr/local/nginx/sbin/nginx && \
    /usr/local/nginx/sbin/nginx -V

# ==============================================================================
# Stage 3: Asset Compression
# ==============================================================================
FROM alpine:${ALPINE_VERSION}@sha256:765942a4039992336de8dd5db680586e1a206607dd06170ff0a37267a9e01958 AS compressor

RUN apk add --no-cache brotli gzip findutils

WORKDIR /app
COPY --from=builder /app/dist ./dist

# Parallel compression: gzip + brotli for all text-based assets
RUN find dist -type f \
    \( -name "*.html" -o -name "*.css" -o -name "*.js" -o \
       -name "*.json" -o -name "*.svg" -o -name "*.xml" \) \
    -print0 | xargs -0 -P"$(nproc)" -I {} sh -c 'gzip -9 -k -f "{}" && brotli -q 11 -f "{}"'

# ==============================================================================
# Stage 4: Minimal Filesystem Preparation
# ==============================================================================
FROM alpine:${ALPINE_VERSION}@sha256:765942a4039992336de8dd5db680586e1a206607dd06170ff0a37267a9e01958 AS rootfs

# Create directory structure
RUN mkdir -p \
    /rootfs/etc/nginx/conf.d \
    /rootfs/usr/share/nginx/html \
    /rootfs/var/log/nginx \
    /rootfs/var/cache/nginx \
    /rootfs/usr/local/nginx/{client_body,proxy,fastcgi,uwsgi,scgi}_temp \
    /rootfs/tmp \
    /rootfs/run && \
    chmod 1777 /rootfs/tmp

# Create minimal user database (nobody user)
RUN echo "nobody:x:65534:65534:nobody:/:/sbin/nologin" > /rootfs/etc/passwd && \
    echo "nobody:x:65534:" > /rootfs/etc/group

# Copy nginx configuration
COPY nginx.conf /rootfs/etc/nginx/conf.d/default.conf
COPY --from=nginx-builder /etc/nginx/mime.types /rootfs/etc/nginx/mime.types
COPY --from=compressor /app/dist /rootfs/usr/share/nginx/html

# Create main nginx.conf
RUN cat > /rootfs/etc/nginx/nginx.conf <<'EOF'
worker_processes auto;
error_log stderr warn;
pid /run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    access_log /dev/stdout;

    # Performance optimizations
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    server_tokens off;

    # Compression
    gzip on;
    gzip_static on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    include /etc/nginx/conf.d/*.conf;
}
EOF

# Set proper ownership
RUN chown -R 65534:65534 \
    /rootfs/usr/share/nginx/html \
    /rootfs/var/log/nginx \
    /rootfs/var/cache/nginx \
    /rootfs/usr/local/nginx \
    /rootfs/tmp \
    /rootfs/run

# ==============================================================================
# Stage 5: Final Distroless Image (FROM SCRATCH)
# ==============================================================================
FROM scratch

# Re-declare build args for metadata
ARG BUILD_DATE
ARG GIT_COMMIT=unknown

# OCI metadata labels
LABEL org.opencontainers.image.title="Vite React - Distroless" \
      org.opencontainers.image.description="Distroless minimal image (<6MB) - UPX compressed" \
      org.opencontainers.image.version="2.2.0-distroless-upx" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.revision="${GIT_COMMIT}" \
      org.opencontainers.image.base.name="scratch" \
      org.opencontainers.image.source="https://github.com/riipandi/vite-react-template" \
      org.opencontainers.image.licenses="MIT OR Apache-2.0" \
      maintainer="contest-2025-optimized"

# Copy static nginx binary and minimal filesystem
COPY --from=nginx-builder /usr/local/nginx/sbin/nginx /usr/sbin/nginx
COPY --from=rootfs /rootfs /

# Run as non-root user (nobody = 65534)
USER 65534:65534

EXPOSE 3000

# Lightweight healthcheck using nginx config test
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD ["/usr/sbin/nginx", "-t", "-q"]

STOPSIGNAL SIGTERM

ENTRYPOINT ["/usr/sbin/nginx"]
CMD ["-g", "daemon off;"]
```

### 3. Scratch với Custom Nginx + Shared Libraries

```dockerfile
# STAGE 1: The Builder (Custom Nginx Build)
FROM alpine:3.19 AS builder

# Multi-arch support
ARG TARGETARCH
RUN apk add --no-cache build-base pcre2-dev zlib-dev openssl-dev

# Download and verify Nginx source with SHA256 checksum
ARG NGINX_VERSION=1.27.0
ARG NGINX_SHA256=b7230e3cf87eaa2d4b0bc56aadc920a960c7873b9991a1b66ffcc08fc650129c
ADD --checksum=sha256:${NGINX_SHA256} https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz /tmp/
RUN tar -xzf /tmp/nginx-${NGINX_VERSION}.tar.gz -C /tmp

# Configure Nginx with minimal modules (static file serving only)
RUN cd /tmp/nginx-${NGINX_VERSION} && \
    ./configure \
    --prefix=/etc/nginx \
    --sbin-path=/usr/sbin/nginx \
    --conf-path=/etc/nginx/nginx.conf \
    --pid-path=/var/run/nginx.pid \
    --error-log-path=/dev/stderr \
    --http-log-path=/dev/stdout \
    --user=nginx \
    --group=nginx \
    --without-http_rewrite_module \
    --without-http_gzip_module \
    --without-http_proxy_module \
    --without-http_fastcgi_module \
    --without-http_uwsgi_module \
    --without-http_scgi_module \
    --without-mail_pop3_module \
    --without-mail_imap_module \
    --without-mail_smtp_module && \
    make && \
    make install && rm -rf /tmp/* && strip /usr/sbin/nginx

# Create file Nginx main config (include snippet file)
RUN { \
    mkdir -p /etc/nginx/conf.d && \
    cat > /etc/nginx/nginx.conf; \
    } <<EOF
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    client_body_temp_path /var/cache/nginx/client_body_temp;
    include       /etc/nginx/conf.d/default.conf;
}
EOF

RUN mkdir -p /etc/nginx/conf.d && \
    cat > /etc/nginx/mime.types <<'EOF'
types {
    text/html    html;
    text/css     css;
    application/javascript  js;
    image/png    png;
    application/json json;
}
EOF

# Create minimal user/group files (no full /etc/passwd needed in scratch image)
RUN echo "nginx:x:101:101:nginx:/var/cache/nginx:/sbin/nologin" > /etc/passwd && \
    echo "nginx:x:101:" > /etc/group

# Build static healthcheck binary (no external dependencies like wget/curl needed)
RUN { \
    cat > /tmp/healthcheck.c && \
    gcc -static -O2 -o /healthcheck /tmp/healthcheck.c; \
    } <<EOF
#include <netdb.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main() {
    struct hostent *h = gethostbyname("localhost");
    if (!h) return 1;

    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) return 1;

    struct sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(3000);
    addr.sin_addr = *(struct in_addr *)h->h_addr_list[0];

    int result = connect(sock, (struct sockaddr *)&addr, sizeof(addr));
    close(sock);
    return (result == 0) ? 0 : 1;
}
EOF

# Collect shared libraries required by Nginx (supports multi-arch)
RUN mkdir -p /staging/lib /staging/usr/lib && \
    ldd /usr/sbin/nginx | tr -s '[:space:]' '\n' | grep '^/' | \
    xargs -I '{}' sh -c 'mkdir -p /staging$(dirname {}) && cp -L {} /staging$(dirname {})'

# Create mount point directories for tmpfs (writable dirs in read-only container)
RUN mkdir -p /var/cache/nginx /var/run /tmp && chown -R 101:101 /var/cache/nginx /var/run /tmp

# STAGE 2: App Builder (Build React App)
FROM node:20.11.0-alpine3.19 AS app_builder

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.2 --activate

# Copy dependencies files first for caching
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store,sharing=locked \
    pnpm install --frozen-lockfile --prefer-offline

# Copy config files
COPY tsconfig.json tsconfig.node.json vite.config.ts ./
COPY postcss.config.js tailwind.config.ts index.html ./

# Copy source code (avoid copying tests, stories, etc.)
COPY public/ ./public/
COPY src/ ./src/

RUN pnpm build && \
    test -f dist/index.html || (echo "Build failed" && exit 1)

# STAGE 3: Production Image (FROM scratch)
FROM scratch

LABEL org.opencontainers.image.title="Vite React Template" \
    org.opencontainers.image.description="Minimal Vite React SPA with custom Nginx built from scratch" \
    org.opencontainers.image.version="1.0.0" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.base.name="scratch" \
    org.opencontainers.image.authors="Contest 2025"

# Copy file user/group
COPY --from=builder /etc/passwd /etc/group /etc/

# Copy mount points to image
COPY --chown=101:101 --from=builder /var/cache/nginx /var/cache/nginx
COPY --chown=101:101 --from=builder /var/run /var/run
COPY --chown=101:101 --from=builder /tmp /tmp

# Copy Nginx and shared libraries
COPY --from=builder /usr/sbin/nginx /usr/sbin/nginx
COPY --from=builder /staging/ /

# Copy main Nginx config (just created)
COPY --from=builder /etc/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy file config from project into included location
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy remaining necessary files
COPY --from=builder /etc/nginx/mime.types /etc/nginx/mime.types
COPY --from=app_builder /app/dist /usr/share/nginx/html
COPY --from=builder /healthcheck /healthcheck

USER 101:101

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD ["/healthcheck"]

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

### 4. Go FastHTTP Server với Embedded Files

```dockerfile
# Stage 1: Build frontend
FROM node:20-alpine AS builder

RUN corepack enable pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig*.json vite.config.ts postcss.config.js tailwind.config.ts ./
COPY index.html ./
COPY src ./src
COPY public ./public

RUN pnpm build

# Clean up dist (remove source maps, licenses, stats, robots.txt, etc.)
RUN find /app/dist -type f -name '*.map' -delete \
 && find /app/dist -type f -name '*.LICENSE.*' -delete \
 && find /app/dist -type f -name '*.txt' -delete \
 && find /app/dist -type f -name 'stats.html' -delete \
 && find /app/dist -type f -name 'robots.txt' -delete \
 && find /app/dist -type f -name '_redirects' -delete

# Stage 2: Build Go server with FastHTTP
FROM golang:1.21-alpine AS go-builder

WORKDIR /app

# Cài strip và upx
RUN apk add --no-cache binutils upx

# Copy dist files để embed
COPY --from=builder /app/dist ./dist

# Tạo go.mod và main.go với FastHTTP
RUN cat > go.mod << 'GOMOD'
module server

go 1.21

require github.com/valyala/fasthttp v1.51.0
GOMOD

RUN cat > main.go << 'GOSRC'
package main

import (
    "embed"
    "log"
    "os"
    "path"
    "strings"

    "github.com/valyala/fasthttp"
)

//go:embed dist
var distFiles embed.FS

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }

    // FastHTTP handler
    handler := func(ctx *fasthttp.RequestCtx) {
        pathStr := string(ctx.Path())

        // Check if it's a static asset (has file extension)
        if strings.Contains(path.Base(pathStr), ".") {
            // Try to serve static file
            file, err := distFiles.Open("dist" + pathStr)
            if err == nil {
                defer file.Close()

                // Set content type based on extension
                ext := path.Ext(pathStr)
                switch ext {
                case ".js":
                    ctx.SetContentType("application/javascript")
                case ".css":
                    ctx.SetContentType("text/css")
                case ".svg":
                    ctx.SetContentType("image/svg+xml")
                case ".png":
                    ctx.SetContentType("image/png")
                case ".jpg", ".jpeg":
                    ctx.SetContentType("image/jpeg")
                case ".ico":
                    ctx.SetContentType("image/x-icon")
                default:
                    ctx.SetContentType("application/octet-stream")
                }

                // Copy file content to response
                ctx.Response.SetBodyStream(file, -1)
                return
            }
        }

        // SPA fallback - serve index.html for all routes
        file, err := distFiles.Open("dist/index.html")
        if err != nil {
            ctx.SetStatusCode(404)
            ctx.SetBodyString("Not Found")
            return
        }
        defer file.Close()

        ctx.SetContentType("text/html; charset=utf-8")
        ctx.Response.SetBodyStream(file, -1)
    }

    // healthcheck
    if len(os.Args) > 1 && os.Args[1] == "-health" {
        _, _, err := fasthttp.Get(nil, "http://127.0.0.1:"+port)
        if err != nil {
            os.Exit(1)
        }
        os.Exit(0)
    }

    log.Printf("FastHTTP server on :%s", port)
    log.Fatal(fasthttp.ListenAndServe(":"+port, handler))
}
GOSRC

# Download dependencies và build với tối ưu extreme
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -trimpath -o server main.go
RUN strip server
RUN upx --ultra-brute --lzma server

# Stage 3: Ultra-minimal runtime (scratch)
FROM scratch

# Copy binary (chứa cả static files)
COPY --from=go-builder /app/server /server

EXPOSE 3000

# Thêm USER 1000
USER 1000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/server", "-health"]

CMD ["/server"]
```

### 5. Alpine với Custom-built Nginx

```dockerfile
# =========================
# Giai đoạn 1: Node base
# =========================
# Môi trường build cho Vite/React: chỉ cài những thứ tối thiểu để biên dịch
FROM alpine:3.20@sha256:765942a4039992336de8dd5db680586e1a206607dd06170ff0a37267a9e01958 AS node-base
RUN apk add --no-cache nodejs npm git python3 g++ make && \
    npm install -g pnpm@9.12.2 && npm cache clean --force

# =========================
# Giai đoạn 2: Builder
# =========================
# Dùng cache mount cho pnpm để tăng tốc build lại; xóa source map; nén gzip sẵn
FROM node-base AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-custom,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline
# Sao chép cấu hình & mã nguồn
COPY index.html ./
COPY vite.config.ts tsconfig.json tsconfig.node.json ./
COPY postcss.config.js tailwind.config.ts ./
COPY public ./public
COPY src ./src
# Build & tối ưu artefact tĩnh
RUN pnpm run build && \
    find /app/dist -name "*.map" -type f -delete || true && \
    find /app/dist -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.svg' -o -name '*.json' \) \
    -exec gzip -k -9 {} \;

# ======================================
# Giai đoạn 3: Nginx builder (tự biên dịch)
# ======================================
# Biên dịch nginx 1.27.3 với module tối thiểu cho SPA + nén tĩnh
FROM alpine:3.20@sha256:765942a4039992336de8dd5db680586e1a206607dd06170ff0a37267a9e01958 AS nginx-builder
RUN apk add --no-cache --virtual .build-deps gcc libc-dev make pcre2-dev zlib-dev openssl-dev linux-headers && \
    wget -O /tmp/nginx.tar.gz https://nginx.org/download/nginx-1.27.3.tar.gz && \
    tar -xzf /tmp/nginx.tar.gz -C /tmp && cd /tmp/nginx-1.27.3 && \
    ./configure \
      --prefix=/etc/nginx \
      --sbin-path=/usr/sbin/nginx \
      --modules-path=/usr/lib/nginx/modules \
      --conf-path=/etc/nginx/nginx.conf \
      --error-log-path=/var/log/nginx/error.log \
      --http-log-path=/var/log/nginx/access.log \
      --pid-path=/var/run/nginx.pid \
      --lock-path=/var/run/nginx.lock \
      --http-client-body-temp-path=/var/cache/nginx/client_temp \
      --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
      --user=nginx --group=nginx \
      --with-http_ssl_module --with-http_v2_module \
      --with-http_gzip_static_module --with-http_stub_status_module \
      --with-threads --with-file-aio \
      --without-http_autoindex_module --without-http_browser_module \
      --without-http_geo_module --without-http_map_module \
      --without-http_memcached_module --without-http_userid_module \
      --without-mail_pop3_module --without-mail_imap_module \
      --without-mail_smtp_module --without-http_split_clients_module \
      --without-http_uwsgi_module --without-http_scgi_module \
      --without-http_grpc_module && \
    make -j$(nproc) && make install && strip /usr/sbin/nginx && \
    rm -rf /tmp/nginx* && apk del .build-deps

# ======================================
# Giai đoạn 4: Runtime base tối giản
# ======================================
# Chỉ giữ runtime deps; tạo user non-root; chuẩn bị thư mục và quyền
FROM alpine:3.20@sha256:765942a4039992336de8dd5db680586e1a206607dd06170ff0a37267a9e01958 AS custom-runtime-base
RUN apk add --no-cache pcre2 zlib openssl tzdata && \
    addgroup -g 101 -S nginx && \
    adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx && \
    mkdir -p /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /usr/share/nginx/html
COPY --from=nginx-builder /usr/sbin/nginx /usr/sbin/nginx
COPY --from=nginx-builder /etc/nginx /etc/nginx

# ======================================
# Giai đoạn 5: Runtime cuối
# ======================================
FROM custom-runtime-base AS runtime
LABEL org.opencontainers.image.title="SvnFrs-Dockerfile_Contest_2025" \
      org.opencontainers.image.description="SPA production trên Alpine với Nginx tự biên dịch, tối ưu và bảo mật" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.created="2025-10-28" \
      org.opencontainers.image.base.name="alpine:3.20"

# Ứng dụng tĩnh đã build
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Cấu hình Nginx tối thiểu (inline) bật gzip_static để phục vụ file .gz
RUN echo 'server { \
  listen 3000; server_name localhost; \
  root /usr/share/nginx/html; index index.html; \
  gzip_static on; gzip_vary on; \
  location / { try_files $uri $uri/ /index.html; expires 1y; add_header Cache-Control "public, immutable"; } \
  location = /index.html { expires -1; add_header Cache-Control "no-cache"; } \
  add_header X-Frame-Options "SAMEORIGIN" always; \
  add_header X-Content-Type-Options "nosniff" always; \
  add_header X-XSS-Protection "1; mode=block" always; \
}' > /etc/nginx/conf.d/default.conf && \
echo 'worker_processes auto; error_log /var/log/nginx/error.log warn; pid /var/run/nginx.pid; \
events { worker_connections 1024; } http { include /etc/nginx/mime.types; default_type application/octet-stream; sendfile on; keepalive_timeout 65; include /etc/nginx/conf.d/*.conf; }' > /etc/nginx/nginx.conf && \
echo 'types { \
  text/html html htm shtml; text/css css; text/javascript js; application/json json; \
  image/svg+xml svg svgz; image/x-icon ico; image/png png; image/jpeg jpeg jpg; \
  font/woff2 woff2; application/wasm wasm; \
}' > /etc/nginx/mime.types

# Thư mục tạm/ngầm của Nginx + phân quyền trước khi chuyển USER
RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /etc/nginx/fastcgi_temp \
             /etc/nginx/proxy_temp \
             /etc/nginx/client_body_temp \
             /etc/nginx/uwsgi_temp \
             /etc/nginx/scgi_temp && \
    chown -R nginx:nginx /var/cache/nginx \
                         /var/log/nginx \
                         /usr/share/nginx/html \
                         /etc/nginx/fastcgi_temp \
                         /etc/nginx/proxy_temp \
                         /etc/nginx/client_body_temp \
                         /etc/nginx/uwsgi_temp \
                         /etc/nginx/scgi_temp && \
    chmod -R 755 /var/cache/nginx \
                 /etc/nginx/fastcgi_temp \
                 /etc/nginx/proxy_temp \
                 /etc/nginx/client_body_temp \
                 /etc/nginx/uwsgi_temp \
                 /etc/nginx/scgi_temp && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

# Healthcheck rẻ: HTTP 200 ở cổng 3000
RUN apk add --no-cache wget
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

EXPOSE 3000
STOPSIGNAL SIGQUIT
USER nginx
CMD ["nginx", "-g", "daemon off;"]
```

---

## References

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Optimization](https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html)
- [Distroless Images](https://github.com/GoogleContainerTools/distroless)
- [FastHTTP](https://github.com/valyala/fasthttp)
- [UPX Compression](https://upx.github.io/)