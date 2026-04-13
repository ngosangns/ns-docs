---
area: technology
domain: frontend
topic: dockerfile-optimization
type: resource
---

# 4. Go FastHTTP Server với Embedded Files

> **Xem thêm:** [[dockerfile-optimization-techniques|Dockerfile Optimization Techniques cho React]]

## Kỹ thuật

- **Base image**: `scratch`
- **Go server**: FastHTTP (high-performance HTTP server)
- **Embedded files**: Sử dụng `//go:embed` để embed static files vào binary
- **Single binary**: Tất cả trong một file, không cần web server riêng
- **UPX compression**: Nén binary với UPX ultra-brute LZMA
- **Static linking**: CGO_ENABLED=0 để tạo static binary

## Ưu điểm

- **Kích thước cực nhỏ**: Single binary, có thể <5MB sau UPX
- **Performance cao**: FastHTTP nhanh hơn nhiều so với Nginx cho simple use cases
- **Đơn giản**: Không cần cấu hình web server
- **SPA routing**: Tự động handle SPA routing (fallback về index.html)
- **No dependencies**: Không cần external files hoặc libraries
- **Easy deployment**: Chỉ cần copy một file

## Nhược điểm

- **Không có HTTP/2**: FastHTTP không hỗ trợ HTTP/2 native
- **Limited features**: Ít tính năng hơn Nginx (caching, rate limiting, etc.)
- **Go dependency**: Phải maintain Go code
- **No gzip_static**: Phải implement compression logic trong code
- **Less battle-tested**: FastHTTP ít được sử dụng hơn Nginx

## Use cases

- Microservices với yêu cầu performance cao
- Internal APIs cần serve static files
- Khi muốn tối ưu tối đa kích thước
- Khi không cần các tính năng advanced của Nginx

## Code highlights

```dockerfile
# Embed files vào binary
//go:embed dist
var distFiles embed.FS

# Build với optimization
CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -trimpath -o server main.go
strip server
upx --ultra-brute --lzma server
```
