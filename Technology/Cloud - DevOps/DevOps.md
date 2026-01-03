---
tags:
  - area/technology
  - domain/devops
  - type/resource
  - lang/vi
---

- Devops Training materials - Minh Monmen: https://github.com/minhpq331/devops-training
- CI, CD và ... DevOps ??? (viblo.asia): https://viblo.asia/p/ci-cd-va-devops-07LKXYXDZV4
- Ansible - Cài đặt các package cho server một cách tự động qua SSH: (Phần 1) Tìm hiểu về Ansible. (viblo.asia) - https://viblo.asia/p/phan-1-tim-hieu-ve-ansible-4dbZNxv85YM
- Terraform - Infrastructure as Code - Tạo và setup server một cách tự động: Terraform Series - Viblo - https://viblo.asia/s/terraform-series-3m5WB8JvlO7
- GraalVM: https://www.graalvm.org/ - máy ảo cho phép chạy nhiều ngôn ngữ khác nhau, ngoài ra còn hỗ trợ build java app thành mã máy (native code)
  - GraalVM — Make Java Great Again. Sau 8 năm phát triển tích cực cuối cùng… | by Nam Vu | Medium: https://batnamv.medium.ninja/c%C3%A1ch-m%E1%BA%A1ng-h%C3%B3a-java-v%E1%BB%9Bi-graalvm-d7fe1cfa3c25
- https://voz.vn/t/kubernetes-k8s-noi-hoc-tap-va-trao-doi-kinh-nghiem.871591
- https://devopsvn.tech
- [[Kubernetes - K8S]]
- [Phỏng vấn DevOps Architect tại Atlassian: "Khoai" đến mức nào?](https://devops.vn/posts/phong-van-devops-architect-tai-atlassian-khoai-den-muc-nao/)

![[4c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f.png]]

# 1. Github Actions

- Reusable Workflows - Tái sử dụng Workflows trong Github Actions: https://viblo.asia/p/reusable-workflows-tai-su-dung-workflows-trong-github-actions-zOQJwowbJMP

# 2. Tools

- Flux là công cụ GitOps đồng bộ cụm Kubernetes với cấu hình từ Git/OCI, tự động cập nhật mã mới. Phiên bản 2 được xây dựng lại trên API Kubernetes, hỗ trợ đa người thuê và nhiều kho Git, sử dụng GitOps Toolkit để triển khai liên tục. Flux là dự án tốt nghiệp của CNCF, được dùng rộng rãi (https://github.com/fluxcd/flux2)
- Pulumi - Infrastructure as Code in any programming language: https://github.com/pulumi/pulumi
- **isd**: Interactive systemd manager - Công cụ tương tác để quản lý các đơn vị systemd hiệu quả hơn - [GitHub](https://github.com/kainctl/isd)
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

## 2.1. Workflow Orchestration

- [[Workflow Orchestration]]: Các công cụ và nền tảng cho workflow orchestration (Kestra, Apache NiFi)

## 2.2. CI/CD

- **Woodpecker**: Công cụ CI/CD đơn giản nhưng mạnh mẽ với khả năng mở rộng cao - https://github.com/woodpecker-ci/woodpecker #CI #CD #cicd

## 2.4. Deployment Platforms

- **Nixopus**: Giải pháp mã nguồn mở thay thế cho Vercel, Heroku và Netlify, với quy trình làm việc được đơn giản hóa
  - **Tính năng chính:**
    - Triển khai ứng dụng chỉ với một cú nhấp chuột
    - Quản lý file trong trình duyệt
    - Tích hợp terminal
    - Giám sát thời gian thực
    - Quy trình làm việc đơn giản hóa so với các platform truyền thống
  - **Lưu ý:** Hiện đang ở giai đoạn alpha và chưa sẵn sàng cho môi trường production
  - [GitHub](https://github.com/raghavyuva/nixopus) #deployment #platform #vercel-alternative #heroku-alternative

## 2.3. Incident Management

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

## 2.4. Cloudflare

- **DockFlare**: Automate Cloudflare Tunnels với Docker Labels - [GitHub](https://github.com/ChrispyBacon-dev/DockFlare)
- **Cloudflare Snippet**: Tính năng giống mini version của Cloudflare Worker, dùng để xử lý các tác vụ đơn giản như thêm CORS headers. Yêu cầu domain phải đăng ký gói Pro (20$/tháng), không tốn thêm chi phí như Worker, có thể giảm đáng kể data transfer từ origin server bằng cách xử lý ở edge. Xem case study: [[Case Study - Quick Win Optimization]]

### 2.2.1. Node.js CI/CD Pipeline trên Amazon EKS

**Node-EKS-CICD** (https://gitlab.com/HlaliMedAmine/node-aks-cicd) - End-to-end CI/CD pipeline production-ready cho Node.js application trên Amazon EKS.

- **Kiến trúc:**
  - Developer push code → GitLab pipeline trigger
  - CI thực hiện: build, tests, static analysis, security scanning
  - Docker image được build và push lên Docker Hub
  - Kubernetes manifests được update động
  - Deployment được apply trên Amazon EKS
  - Prometheus + Grafana cung cấp monitoring và dashboards

- **Technologies & Tools:**
  - **Core Infrastructure:**
    - AWS EKS: Kubernetes cluster cho scalable workloads
    - AWS Load Balancer Controller: External traffic routing
    - Docker Hub: Container registry

  - **CI/CD:**
    - GitLab Pipeline với multi-stage jobs:
      - Build: Install dependencies, prepare artifacts
      - Test: Run automated tests
      - Security: Semgrep SAST scan
      - Quality: SonarQube full code analysis
      - Package: Build & push Docker image
      - Deploy: Apply Kubernetes manifests to EKS

  - **Security & Code Quality:**
    - Semgrep: Static security analysis, phát hiện security risks, misconfigurations, vulnerable patterns
    - SonarQube: Code quality analysis, bugs, vulnerabilities, duplications, maintainability index

  - **Monitoring:**
    - Prometheus: Metrics collection
    - Grafana: Custom DevOps dashboards cho CPU/Memory, Node & Pod metrics, Cluster state, Application behavior

- **Pipeline Guarantees:**
  - Continuous testing
  - Early detection of vulnerabilities
  - Prevention of low-quality code
  - Fully automated deployments
  - Rolling updates để tránh downtime

- **Features:**
  - Docker packaging với optimized Dockerfile
  - Automatic image tagging với GitLab commit SHA
  - Dynamic Kubernetes manifest updates
  - High availability và intelligent pod scheduling
  - Public exposure qua AWS Load Balancer
  - Production-grade monitoring stack

- **Use cases:**
  - Enterprise-grade DevOps workflow
  - Security-first pipeline
  - Kubernetes-native deployment
  - Full observability
  - High-quality và stable application delivery

# 3. Reverse proxy

- Các loại reverse proxy và khi nào nên dùng: https://viblo.asia/p/reverse-proxy-tu-thang-chuyen-phat-thanh-ong-quan-gia-PAoJeOArV1j

## 3.1. Caddy

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

# 4. Usecases

## 4.1. 🔥 DevOps đốt tiền infra – Tập 2

### 4.1.1. Câu chuyện “bốc hơi” chi phí Lambda

- Một SRE phát hiện chi phí AWS Lambda tăng gấp **70 lần** trong 3 ngày (từ ~$200/tháng lên ~$14,000/tháng).
- Mặc dù đã thiết lập **AWS Budget Alert** và trích xuất dữ liệu cost bằng Lambda, vẫn không ngăn được chi phí gia tăng quá nhanh.
- Sự cố do copy-paste Terraform: Lambda memory được đặt thành **4096 MB**, trong khi thực tế chỉ cần ~128 MB, làm số lượng gọi mỗi ngày ở mức hàng triệu nên chi phí “nổ” nhanh chóng.

### 4.1.2. Phân tích chi phí Lambda

Chi phí phụ thuộc vào ba yếu tố chính:

1. **Memory allocated** – càng cao, chi phí càng lớn nhưng giúp giảm thời gian thực thi.
2. **Request count** – càng nhiều invoke thì càng tốn tiền.
3. **Duration (execution time)** – thời gian chạy càng dài thì chi phí càng cao.
   - Sử dụng dòng CPU ARM (Graviton) thay vì x86 để giảm giá.
   - Dùng công cụ **AWS Lambda Power Tuning** để tìm điểm tối ưu giữa memory và execution time.
   - Thiết lập **reserved concurrency** để giới hạn số instance và **provisioned concurrency** để giữ warm function, tránh cold starts khi có nhiều request.

### 4.1.3. Bài học rút ra

- Chỉ alloc memory thật cần thiết – không nên copy-paste cấu hình “to” cho nhanh.
- Tinh chỉnh memory và architecture (ARM/x86) để cân bằng cost & performance.
- Giới hạn concurrency để kiểm soát scale-up sudden spike.
- Thiết lập profiling và warm-up (provisioned concurrency) để tối ưu hiệu suất.

# 5. AIOps

## 5.1. Beta9

https://github.com/beam-cloud/beta9

**Beta9** (by beam-cloud) là một nền tảng mã nguồn mở cung cấp **cơ sở hạ tầng AI hiệu suất cao và bảo mật mạnh mẽ, được viết bằng Python**, giúp chạy các workload AI một cách đơn giản, dễ mở rộng và nhanh chóng.

### 5.1.1. Chức năng chính của Beta9

- **Khởi tạo container cực nhanh:** Container được launch trong dưới 1 giây nhờ runtime container tùy chỉnh.
- **Song song và đồng thời:** Có thể phân tán workload đến hàng trăm container.
- **Trải nghiệm phát triển hàng đầu:** Hỗ trợ hot-reloading, webhook, và các tác vụ theo lịch.
- **Scale-to-Zero:** Các workload chạy serverless và tự động tắt khi không cần thiết.
- **Lưu trữ đĩa phân tán (distributed volume storage):** Hỗ trợ mount volume phân tán cho các container.
- **Hỗ trợ GPU:** Có thể chạy trên các GPU mạnh (như 4090, H100) trên cloud của Beam hoặc GPU riêng của người dùng.
- **Sandbox:** Khởi tạo các container cô lập để chạy mã do LLM sinh ra.
- **Endpoint tự động mở rộng:** Có thể triển khai endpoint serverless có autoscaling dựa trên độ sâu hàng đợi.
- **Queue task (thay thế Celery queue):** Cho phép chạy các tác vụ nền thông qua decorator Python đơn giản.

### 5.1.2. Ưu điểm nổi bật

| Ưu điểm                             | Mô tả                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| **Tốc độ khởi tạo container nhanh** | Container khởi chạy dưới 1 giây, phù hợp cho các workload AI cần phản hồi nhanh |
| **Quy mô lớn, song song cao**       | Dễ dàng phân tán workloads đến hàng trăm container để tăng throughput           |
| **Serverless & Scale-to-zero**      | Tự động tăng giảm tài nguyên, tiết kiệm chi phí khi không có workload           |
| **Hỗ trợ GPU đa dạng**              | Dùng GPU cao cấp trên cloud hoặc GPU của người dùng                             |
| **Developer Experience tốt**        | Hot-reloading, webhook, scheduled jobs giúp dev thao tác nhanh, hiệu quả        |
| **Mã nguồn mở, linh hoạt**          | Có thể tự host miễn phí hoặc dùng dịch vụ cloud quản lý của Beam                |

### 5.1.3. Use cases

- **Triển khai model inference serverless:** Tạo các endpoint inference AI tự động mở rộng (autoscaling) trên GPU.
- **Chạy các tác vụ AI song song (parallel workloads):** Phân tán các tác vụ train hoặc infer lên hàng trăm container.
- **Chạy code do LLM sinh ra trong môi trường sandbox an toàn:** Ví dụ chạy code Python được tạo bởi chatbot AI.
- **Thay thế hệ thống hàng đợi như Celery bằng task queue tùy biến:** Quản lý tác vụ nền cho pipelines AI.
- **Tự host hoặc dùng cloud Beam để giảm gánh nặng vận hành hạ tầng AI.**
