---
area: technology
domain: devops
topic: tools
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# DevOps Tools

## 1. Infrastructure as Code

- **Flux**: Công cụ GitOps đồng bộ cụm Kubernetes với cấu hình từ Git/OCI, tự động cập nhật mã mới. Phiên bản 2 được xây dựng lại trên API Kubernetes, hỗ trợ đa người thuê và nhiều kho Git, sử dụng GitOps Toolkit để triển khai liên tục. Flux là dự án tốt nghiệp của CNCF, được dùng rộng rãi (https://github.com/fluxcd/flux2)
- **Pulumi**: Infrastructure as Code in any programming language: https://github.com/pulumi/pulumi

## 2. System Management

- **isd**: Interactive systemd manager - Công cụ tương tác để quản lý các đơn vị systemd hiệu quả hơn - [GitHub](https://github.com/kainctl/isd)

## 3. Server Management

- **infra-caddy-guy**: Bộ script quản lý máy chủ nhẹ, backend sử dụng Docker và Caddy Web Server, giúp đơn giản hóa công việc của người quản trị hạ tầng
  - **Cài đặt**: `git clone https://github.com/nguyenanhung/infra-caddy-guy.git && cd infra-caddy-guy && ./bin/enable-shortcut`
  - **Stack hỗ trợ**:
    - Docker, docker-compose, fzf
    - Caddy Web Server: sites, reverse proxy, load balancer và basic authentication
    - Laravel Builder: Start từ đầu với Laravel Framework Playbook, chọn version, worker
    - WordPress Builder: Start từ đầu với WordPress và chọn theme, plugins
    - Static Site Server
    - Node.js Builder: Start từ đầu với NestJS Playbook, chọn version, port
    - Node.js Application: Kết nối đơn giản và nhẹ với Caddy Web Server
    - PHP Application Routing
    - Cải thiện bảo mật (file, header) cho các ứng dụng: PHP, Node.js, SPA, Static site, Reverse Proxy
    - Quick setup Telegram Messenger MTProto proxy
    - Hỗ trợ các packages: redis, memcached, mongodb, mariadb, mysql, percona, postgresql, influxdb, rabbitmq, beanstalkd, gearmand, elasticsearch, mailhog, mailpit, phpmyadmin, adminer, uptime-kuma, n8n, minio
  - **OS Support**: RHEL Based (CentOS, Almalinux, Rocky Linux, Red Hat), Fedora, Ubuntu/Debian, Amazon Linux 2 và 2023, MacOS
  - **Tính năng**:
    - Blue/Green Rolling Deployment
    - Tích hợp Amazon Web Services CLI (`awscli`)
    - Kết nối container với Caddy Web Server network: `docker network connect bear_caddy_net <container_name>`
  - [GitHub](https://github.com/nguyenanhung/infra-caddy-guy) #docker #caddy #infrastructure #server-management #iac

## 4. Deployment Platforms

- **Nixopus**: Giải pháp mã nguồn mở thay thế cho Vercel, Heroku và Netlify, với quy trình làm việc được đơn giản hóa
  - **Tính năng chính:**
    - Triển khai ứng dụng chỉ với một cú nhấp chuột
    - Quản lý file trong trình duyệt
    - Tích hợp terminal
    - Giám sát thời gian thực
    - Quy trình làm việc đơn giản hóa so với các platform truyền thống
  - **Lưu ý:** Hiện đang ở giai đoạn alpha và chưa sẵn sàng cho môi trường production
  - [GitHub](https://github.com/raghavyuva/nixopus) #deployment #platform #vercel-alternative #heroku-alternative

## 5. Incident Management

- **Versus-Incident**: Công cụ quản lý sự cố hỗ trợ cảnh báo đa kênh, tin nhắn tùy chỉnh và tích hợp on-call
  - **Tính năng chính:**
    - Cảnh báo đa kênh: Hỗ trợ nhiều kênh cảnh báo khác nhau
    - Tin nhắn tùy chỉnh: Tùy chỉnh nội dung và format của thông báo
    - Tích hợp on-call: Quản lý lịch trực và thông báo cho on-call engineers
    - Tương thích với bất kỳ công cụ nào hỗ trợ cảnh báo webhook
  - **Use cases:**
    - Quản lý và phản hồi sự cố trong production
    - Tự động hóa quy trình cảnh báo và thông báo
    - Tích hợp với các hệ thống monitoring và alerting hiện có
  - [GitHub](https://github.com/VersusControl/versus-incident) #incident-management #on-call #alerts #webhook

## 6. Cloudflare Tools

- **DockFlare**: Automate Cloudflare Tunnels với Docker Labels - [GitHub](https://github.com/ChrispyBacon-dev/DockFlare)
- **Cloudflare Snippet**: Tính năng giống mini version của Cloudflare Worker, dùng để xử lý các tác vụ đơn giản như thêm CORS headers. Yêu cầu domain phải đăng ký gói Pro (20$/tháng), không tốn thêm chi phí như Worker, có thể giảm đáng kể data transfer từ origin server bằng cách xử lý ở edge. Xem case study: [[case-study-quick-win-optimization]]