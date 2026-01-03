---
tags:
  - area/technology
  - domain/open-source
  - topic/security
  - type/resource
  - lang/vi
---

# Vulnerability Management

## Fluxion

- **Repository**: https://github.com/TinyActive/fluxion
- **Description**: Unified Vulnerability Intelligence Platform - Nền tảng thông tin tình báo về lỗ hổng bảo mật được thiết kế để cung cấp thông tin hợp nhất về các lỗ hổng bảo mật
- **Tech Stack**:
  - Backend: FastAPI (Python), SQLModel, Alembic
  - Frontend: React, TypeScript, Vite
  - UI: Radix UI, Tailwind CSS, shadcn/ui
  - Database: MySQL
  - Data Fetching: TanStack Query
  - Deployment: Docker, Docker Compose, Nginx
- **Features**:
  - Tích hợp và tổng hợp dữ liệu từ nhiều nguồn khác nhau để cung cấp cái nhìn toàn diện về các lỗ hổng bảo mật
  - Giao diện người dùng để truy cập và quản lý thông tin về lỗ hổng
  - Hỗ trợ các công cụ phân tích và báo cáo để đánh giá mức độ nghiêm trọng và tác động của các lỗ hổng
  - RESTful API với authentication (JWT)
  - Quản lý assets, vulnerabilities, users
  - Telegram bot integration cho notifications
  - CORS support
- **Roadmap**:
  - Role-based access control (RBAC)
  - Integration với vulnerability scanners (Nmap, Nessus, OpenVAS)
  - Advanced reporting và analytics
  - Export to common formats (PDF, CSV, JSON)
  - Automated vulnerability correlation
  - Slack/Discord/Teams integrations
  - Real-time notifications và alerts
  - API rate limiting
  - Advanced search và filtering
  - Compliance frameworks mapping (OWASP, CWE, NIST)
  - Multi-language support (i18n)
- **License**: MIT
- **Website**: https://github.com/TinyActive/fluxion

