---
area: technology
domain: frontend
topic: dockerfile-optimization
type: resource
title: React Dockerfile Distroless Nginx
description: Distroless với Custom Static Nginx (UPX Compressed)
timestamp: '2026-06-19T13:43:26.141Z'
tags:
  - technology
  - frontend
  - dockerfile-optimization
---

# 2. Distroless với Custom Static Nginx (UPX Compressed)

> **Xem thêm:** [Dockerfile Optimization Techniques cho React](/Technology/Frontend/Tools/React/Dockerfile Optimization Techniques)

## Kỹ thuật

- **Base image**: `scratch` (distroless)
- **Custom nginx build**: Tự compile nginx với static linking
- **UPX compression**: Nén binary nginx với UPX LZMA
- **Multi-stage**: 5 stages (builder, nginx-builder, compressor, rootfs, final)
- **Dual compression**: Gzip + Brotli cho static assets
- **Parallel compression**: Sử dụng `xargs -P` để nén song song
- **Symbol stripping**: Strip binary để giảm kích thước
- **Multi-arch support**: Hỗ trợ build cho nhiều kiến trúc

## Ưu điểm

- **Kích thước cực nhỏ**: <6MB final image (sau UPX)
- **Tối ưu binary**: Static linking, strip symbols, UPX compression
- **Dual compression**: Hỗ trợ cả gzip và Brotli (tốt hơn gzip ~20%)
- **Performance**: Nginx với các module tối thiểu, tối ưu cho static files
- **Security**: Distroless = không có shell, package manager, hoặc tools
- **HTTP/2 support**: Hỗ trợ HTTP/2 và SSL/TLS
- **Parallel compression**: Tận dụng multi-core để nén nhanh hơn

## Nhược điểm

- **Build time dài**: Phải compile nginx từ source
- **Phức tạp**: Nhiều stages, nhiều cấu hình
- **Khó debug**: Không có shell trong distroless image
- **Maintenance**: Phải tự maintain nginx build khi có update
- **UPX overhead**: Có thể ảnh hưởng startup time (nhỏ)

## Use cases

- Production environments cần kích thước tối thiểu
- Container orchestration với resource constraints
- Edge deployments
- Khi cần HTTP/2 và SSL/TLS support

## Code highlights

```dockerfile
# Static linking với optimization flags
--with-cc-opt='-static -Os -ffunction-sections -fdata-sections' \
--with-ld-opt='-static -Wl,--gc-sections'

# UPX compression
upx --best --lzma /usr/local/nginx/sbin/nginx

# Parallel compression
find dist -type f ... | xargs -0 -P"$(nproc)" -I {} sh -c 'gzip -9 -k -f "{}" && brotli -q 11 -f "{}"'
```
