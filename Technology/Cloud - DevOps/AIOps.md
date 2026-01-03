---
tags:
  - area/technology
  - domain/devops
  - topic/aiops
  - type/resource
  - lang/vi
---

# AIOps - AI for DevOps

## Tổng quan

- **AIOps** (Artificial Intelligence for IT Operations): Sử dụng trí tuệ nhân tạo để cải thiện hiệu quả giám sát và vận hành hệ thống
- Giải quyết vấn đề "mệt mỏi cảnh báo" (alert fatigue) và phản ứng chậm với sự cố trong các hệ thống phức tạp

## Thách thức trong giám sát hệ thống

- Hệ thống ngày càng phức tạp dẫn đến lượng lớn log và metric
- Gây ra "mệt mỏi cảnh báo" (alert fatigue) - quá nhiều cảnh báo khiến kỹ sư khó phân biệt vấn đề thực sự
- Phản ứng chậm với sự cố do thiếu thông tin ngữ cảnh và phân tích thông minh

## Kiến trúc AIOps đề xuất

### MCP Server (Model Context Protocol Server)

- **Vai trò**: Trung tâm thu thập và xử lý dữ liệu từ nhiều nguồn
- **Chức năng**:
  - Thu thập dữ liệu từ các nguồn như Amazon CloudWatch, Elasticsearch/Amazon OpenSearch Service, Prometheus
  - Chuẩn hóa và lọc thông tin trước khi chuyển đến AI Agent
  - Xử lý và tổng hợp dữ liệu từ nhiều nguồn khác nhau

### Versus AI Agent

- **Vai trò**: "Bộ não" AI phân tích thông tin từ MCP Server
- **Chức năng**:
  - Phân tích dữ liệu đã được chuẩn hóa để phát hiện và xử lý sự cố một cách thông minh
  - Đưa ra quyết định và hành động phù hợp dựa trên ngữ cảnh
  - Học hỏi và thích nghi với vấn đề mới

### Versus Incident

- Công cụ hiện tại gửi cảnh báo, sẽ được nâng cấp với thông tin thông minh hơn từ hệ thống AIOps

## Triển khai trên AWS

### Thu thập dữ liệu

- **Amazon CloudWatch**: Thu thập log và metric từ các dịch vụ AWS
- **Elasticsearch / Amazon OpenSearch Service**: Lưu trữ và tìm kiếm log
- **Prometheus**: Thu thập metric từ các ứng dụng và hệ thống

### MCP Server

- Chạy trên **Amazon EC2** hoặc dịch vụ container như **Amazon ECS/EKS**
- Thu thập, chuẩn hóa và lọc dữ liệu từ các nguồn khác nhau

### Giao tiếp giữa MCP Server và AI Agent

- Sử dụng **Amazon API Gateway** để quản lý và bảo mật các yêu cầu
- Đảm bảo giao tiếp an toàn và có thể mở rộng

## Mục tiêu của hệ thống AIOps

- Tạo ra hệ thống giám sát thông minh, hiểu sâu về sự cố
- Học hỏi và thích nghi với vấn đề mới
- Tự động hóa phân tích và phản hồi
- Giảm tải cho kỹ sư và nâng cao hiệu quả vận hành
- Giảm thiểu "mệt mỏi cảnh báo" bằng cách cung cấp thông tin ngữ cảnh và phân tích thông minh

## Nguồn tham khảo

- https://aws.plainenglish.io/idea-building-the-future-of-devops-monitoring-with-aiops-and-aws-ai-5b997f497cc8
