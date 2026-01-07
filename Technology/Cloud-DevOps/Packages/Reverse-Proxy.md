---
tags:
  - area/technology
  - domain/devops
  - topic/reverse-proxy
  - type/resource
  - lang/vi
---

# Reverse Proxy

## 1. Tổng quan

- Các loại reverse proxy và khi nào nên dùng: https://viblo.asia/p/reverse-proxy-tu-thang-chuyen-phat-thanh-ong-quan-gia-PAoJeOArV1j

## 2. Caddy

- **Caddy**: Fast and extensible multi-platform HTTP/1-2-3 web server with automatic HTTPS
  - **GitHub**: https://github.com/caddyserver/caddy
  - **Website**: https://caddyserver.com
  - **License**: Apache-2.0
  - **Tính năng chính:**
    - **Automatic HTTPS**: Tự động cấp và gia hạn SSL/TLS certificates từ Let's Encrypt và ZeroSSL
      - ZeroSSL và Let's Encrypt cho public names
      - Fully-managed local CA cho internal names & IPs
      - Hỗ trợ Encrypted ClientHello (ECH)
      - Multi-issuer fallback
      - Có thể phối hợp với các instance Caddy khác trong cluster
      - Stays up khi các server khác gặp vấn đề với TLS/OCSP/certificate
    - **HTTP/1.1, HTTP/2, và HTTP/3** được hỗ trợ mặc định
    - **Cấu hình linh hoạt:**
      - Caddyfile: Cấu hình đơn giản, dễ đọc
      - Native JSON config: Cấu hình mạnh mẽ và chi tiết
      - Dynamic configuration: Thay đổi cấu hình qua JSON API mà không cần restart
      - Config adapters: Hỗ trợ nhiều format (JSON 5, YAML, TOML, NGINX config, v.v.)
    - **Reverse proxy & Load balancing**: Hỗ trợ reverse proxy và load balancing
    - **Modular architecture**: Kiến trúc mô-đun, dễ mở rộng với plugins
    - **Production-ready**: Đã phục vụ hàng nghìn tỷ requests và quản lý hàng triệu TLS certificates
    - **Scalable**: Đã được chứng minh có thể scale đến hàng trăm nghìn sites
    - **No external dependencies**: Chạy được mọi nơi, không cần dependencies bên ngoài (kể cả libc)
    - **Memory safety**: Được viết bằng Go, đảm bảo memory safety tốt hơn các web server khác
    - **Platform**: Multi-platform (Windows, macOS, Linux, v.v.)
  - **Cài đặt:**
    - Download từ GitHub Releases: https://github.com/caddyserver/caddy/releases
    - Build from source với Go 1.25.0+
      - Development: `git clone` → `cd caddy/cmd/caddy/` → `go build`
      - Với version info và plugins: Sử dụng xcaddy builder tool
    - Sử dụng xcaddy để build với plugins tùy chỉnh
  - **Cấu trúc:**
    - Caddy là một platform để chạy Go applications
    - Caddy "apps" là các Go programs được implement như Caddy modules
    - Hai apps chính: `tls` và `http` được tích hợp sẵn
    - Các apps tự động có documentation, graceful config changes qua API, và tích hợp với các Caddy apps khác
  - **Use cases:**
    - Web server với automatic HTTPS
    - Reverse proxy cho microservices
    - Load balancer
    - API gateway
    - Static file server
    - Development server với HTTPS local
  - **Ưu điểm:**
    - Zero-config HTTPS: Tự động cấp và gia hạn certificates
    - Cấu hình đơn giản với Caddyfile
    - Hiệu suất cao với HTTP/3 support
    - Không cần restart khi thay đổi cấu hình (dynamic config)
    - Extensible với plugin system
    - Production-ready và đã được chứng minh ở quy mô lớn
    - Fun to use: Thiết kế thân thiện với developer
  - **Documentation:**
    - Getting Started guide: https://caddyserver.com/docs/getting-started
    - Full documentation: https://caddyserver.com/docs/
    - Community forum: https://caddy.community
