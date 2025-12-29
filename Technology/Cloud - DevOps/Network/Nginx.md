---
relates:
  - "[[Backend - Back-end]]"
  - "[[DevOps]]"
tags:
  - backend
  - devops
  - resources
  - nginx-proxy-manager
  - performance-optimization
  - area/technology
  - domain/devops
  - topic/nginx
  - type/resource
  - lang/vi
---

# 1. Resources

- https://github.com/NginxProxyManager/nginx-proxy-manager
- Tối ưu Performance Cho Nginx: https://viblo.asia/p/toi-uu-performance-cho-nginx-m2vJPomn4eK
  - https://github.com/mrphuongbn/nginx-best-practice-configuration

## 1.1. Tools

- https://github.com/dvershinin/gixy: NGINX configuration static analyzer

### 1.1.1. nginx-love: https://github.com/TinyActive/nginx-love

- **Mục đích:**  
   Phần mềm quản lý Nginx nâng cao tích hợp ModSecurity WAF, quản lý domain, SSL, giám sát theo thời gian thực. Thiết kế đơn giản, thân thiện, phù hợp cá nhân và doanh nghiệp để cấu hình load balancer, bảo mật web dễ dàng.
- **Tính năng chính:**
  - Tường lửa ứng dụng web (WAF) ModSecurity với OWASP CRS và rule tùy chỉnh
  - Quản lý domain, cân bằng tải, giám sát upstream, hỗ trợ HTTPS backend
  - Quản lý chứng chỉ SSL (Let's Encrypt tự động + upload thủ công)
  - Quản lý người dùng đa vai trò (Admin, Moderator, Viewer)
  - Giám sát hiệu suất, cảnh báo thông minh qua email/Telegram
  - ACL (danh sách trắng/đen IP, GeoIP, User-Agent)
  - Ghi log hoạt động chi tiết
  - Cơ sở dữ liệu PostgreSQL sử dụng Prisma ORM
  - Giao diện hiện đại React + TypeScript + Tailwind CSS
- **Cài đặt:**
  Có script deploy cho server mới (production), quickstart cho dev mode, update phiên bản.  
   Có hỗ trợ Docker + Docker Compose, tự động cài đặt Node.js, pnpm, Docker, PostgreSQL, Nginx + ModSecurity.
- **Ứng dụng:**
  - Frontend (React SPA) trên port 8080
  - Backend API (Express.js) trên port 3001
  - Web server (Nginx + ModSecurity) bảo vệ website trên port 80 và 443
- **Quản lý dịch vụ:** systemd service control cho PostgreSQL, backend, frontend, Nginx.
- **API chính:**
  - Xác thực: đăng nhập, đăng xuất, refresh token, thay đổi mật khẩu
  - Quản lý domain, upstream
  - Quản lý SSL certificate
  - Cấu hình rule ModSecurity (CRS và tùy chỉnh)
  - ACL rule quản lý truy cập
  - Giám sát hiệu năng và cảnh báo
  - Quản lý người dùng (admin)
- **Tech stack:**
  - Frontend: React18, TypeScript, Vite, Tailwind, Zustand, React Hook Form
  - Backend: Node.js, Express.js, TypeScript, Prisma ORM, JWT, 2FA (TOTP)
  - CSDL: PostgreSQL 15 qua Docker
  - WAF: Nginx + ModSecurity 3.x + OWASP CRS
- **Tài liệu bổ trợ:**  
   API docs, OpenAPI spec, database schema, script cài đặt, hướng dẫn dev.

## 1.2. Traefik

- [traefik-tunnel-expose](https://github.com/zenkiet/traefik-tunnel-expose): Tool to expose local services through Traefik using tunnels. #Traefik #tunnel
- [trafexia](https://github.com/danieldev23/trafexia): Traefik management and automation tool. #Traefik #automation
