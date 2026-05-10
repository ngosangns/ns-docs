---
area: technology
domain: frontend
topic: dockerfile-optimization
type: resource
---

# 3. Scratch với Custom Nginx + Shared Libraries

> **Xem thêm:** [[Dockerfile Optimization Techniques|Dockerfile Optimization Techniques cho React]]

## Kỹ thuật

- **Base image**: `scratch`
- **Custom nginx**: Build nginx với minimal modules
- **Shared libraries**: Copy các shared libraries cần thiết từ builder
- **Static healthcheck**: Compile C binary cho healthcheck (không cần wget/curl)
- **Multi-arch**: Hỗ trợ nhiều kiến trúc thông qua ldd
- **Minimal filesystem**: Chỉ copy những gì cần thiết

## Ưu điểm

- **Kích thước nhỏ**: Nhỏ hơn distroless một chút (không có base layer)
- **Minimal modules**: Chỉ build những module cần thiết
- **Custom healthcheck**: Binary nhỏ, không cần external tools
- **Flexible**: Có thể tùy chỉnh nginx build theo nhu cầu

## Nhược điểm

- **Shared libraries**: Phải copy libraries, tăng kích thước so với static linking
- **Complexity**: Phải track và copy tất cả dependencies
- **Maintenance**: Khó maintain khi có thay đổi dependencies
- **No shell**: Không thể debug trực tiếp

## Use cases

- Khi cần tối ưu kích thước nhưng không muốn static linking
- Khi nginx cần một số dynamic modules
- Production với yêu cầu security cao

## Code highlights

```dockerfile
# Collect shared libraries
ldd /usr/sbin/nginx | tr -s '[:space:]' '\n' | grep '^/' | \
    xargs -I '{}' sh -c 'mkdir -p /staging$(dirname {}) && cp -L {} /staging$(dirname {})'

# Static healthcheck binary
gcc -static -O2 -o /healthcheck /tmp/healthcheck.c
```
