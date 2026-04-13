---
area: technology
domain: devops
topic: workflow-orchestration
type: usecase
---
# Workflow Orchestration

## Kestra

- **Kestra**: Open-source platform để xây dựng, lên lịch và giám sát các workflows phức tạp - https://github.com/kestra-io/kestra

## Apache NiFi

- **Apache NiFi**: Hệ thống xử lý và phân phối dữ liệu mã nguồn mở, tự động hóa data pipelines cho cybersecurity, observability, event streams và generative AI - https://github.com/apache/nifi
  - **Tính năng chính:**
    - Browser UI: Thiết kế, điều khiển và giám sát workflows qua giao diện web
    - Scalable Processing: Ưu tiên throughput/latency, đảm bảo delivery với retry, horizontal scaling
    - Provenance Tracking: Lịch sử tìm kiếm được, data lineage từ nguồn đến đích
    - Extensible Design: Plugin interface cho Processors và Controller Services, hỗ trợ Python processors, REST API
    - Security: Single sign-on (OpenID Connect/SAML 2), role-based access control, TLS/SFTP encryption
  - **Yêu cầu:** Java 21, Python 3.10+ (tùy chọn)
  - **Use cases:** Data pipeline automation, ETL workflows, real-time data processing, data distribution