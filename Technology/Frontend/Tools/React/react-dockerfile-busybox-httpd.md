---
area: technology
domain: frontend
topic: dockerfile-optimization
type: resource
---

# 1. BusyBox httpd với lipanski/docker-static-website

> **Xem thêm:** [[dockerfile-optimization-techniques|Dockerfile Optimization Techniques cho React]]

## Kỹ thuật

- **Base image**: `lipanski/docker-static-website` (92.5 KB base)
- **Web server**: BusyBox httpd
- **Multi-stage build**: Builder stage (Node Alpine) + Production stage (BusyBox)
- **Pre-compression**: Gzip level 9 cho tất cả static files
- **Layer caching**: Tách riêng package files để tối ưu cache
- **Cache mount**: Sử dụng BuildKit cache mount cho pnpm store

## Ưu điểm

- **Kích thước cực nhỏ**: Base image chỉ 92.5 KB
- **Đơn giản**: Không cần cấu hình phức tạp
- **Tự động gzip**: BusyBox httpd tự động serve file .gz khi client hỗ trợ
- **Build nhanh**: Ít dependencies, build time ngắn
- **Security**: Minimal attack surface do base image nhỏ

## Nhược điểm

- **Tính năng hạn chế**: BusyBox httpd có ít tính năng hơn Nginx
- **Không hỗ trợ Brotli**: Chỉ hỗ trợ gzip
- **Không có HTTP/2**: Chỉ HTTP/1.1
- **Không có SSL/TLS**: Cần reverse proxy nếu cần HTTPS
- **Không có advanced routing**: Hạn chế trong việc cấu hình routing phức tạp

## Use cases

- Static sites đơn giản
- Internal tools không cần HTTPS
- Prototypes và demos
- Khi ưu tiên kích thước image hơn tính năng

## Code highlights

```dockerfile
# Pre-compress với gzip level 9
find dist -type f \( \
  -name "*.html" -o -name "*.css" -o -name "*.js" \
  \) -exec sh -c 'gzip -9 "{}"' \;

# Health check tối thiểu
echo "OK" > dist/health
```
