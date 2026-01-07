---
tags:
  - area/technology
  - domain/security
  - topic/tools
  - type/resource
  - lang/vi
---

# Security Tools & Utilities

## 1. Secret Management
Các công cụ quản lý bí mật (API keys, passwords, certificates) một cách tập trung và an toàn.

- **HashiCorp Vault**: Công cụ tiêu chuẩn để quản lý bí mật, mã hóa dữ liệu khi lưu trữ và cung cấp bí mật động với TTL. [Website](https://www.hashicorp.com/en/products/vault)
- **Google Secret Manager**: Dịch vụ quản lý bí mật trên Google Cloud Platform. [Website](https://cloud.google.com/security/products/secret-manager)
- **AWS Secrets Manager**: Dịch vụ quản lý bí mật trên Amazon Web Services. [Website](https://aws.amazon.com/secrets-manager)

## 2. Vulnerability Scanning & Auditing
Công cụ quét lỗ hổng bảo mật cho mã nguồn, package và container.

- **osv-scanner**: Công cụ quét lỗ hổng của Google sử dụng cơ sở dữ liệu osv.dev. Hỗ trợ quét thư mục mã nguồn, container và kiểm tra giấy phép. [GitHub](https://github.com/google/osv-scanner)
- **npq**: Cài đặt npm package an toàn bằng cách kiểm tra các lỗ hổng trước khi cài đặt. [GitHub](https://github.com/lirantal/npq)
- **HarborGuard**: Nền tảng hiện đại để quét bảo mật container, tích hợp nhiều công cụ quét khác nhau. [GitHub](https://github.com/HarborGuard/HarborGuard)

## 3. Cryptography Libraries
Các thư viện cung cấp các thuật toán mã hóa an toàn và dễ sử dụng.

- **Tink**: Thư viện mã hóa đa ngôn ngữ và đa nền tảng của Google, giúp triển khai mã hóa an toàn và tránh các lỗi phổ biến. [GitHub](https://github.com/tink-crypto)

## 4. Security Analytics & Monitoring
Giám sát hành vi người dùng và phát hiện gian lận trong ứng dụng.

- **Tirreno**: Nền tảng phân tích bảo mật mã nguồn mở giúp bảo vệ sản phẩm khỏi các mối đe dọa tài khoản và gian lận bằng cách theo dõi sự kiện chi tiết trong ứng dụng. [Website](https://www.tirreno.com/)

## 5. Penetration Testing & Exploitation
Công cụ hỗ trợ kiểm thử xâm nhập và khai thác lỗi.

- **DroneSploit**: Framework pentesting dành riêng cho máy bay không người lái (drone), giao diện tương tự Metasploit. [GitHub](https://github.com/dronesploit/dronesploit)
- **HExHTTP**: Công cụ tạo ra các biến thể của HTTP request để kiểm tra lỗi Header Exploitation ở phía backend. [GitHub](https://github.com/c0dejump/HExHTTP)
