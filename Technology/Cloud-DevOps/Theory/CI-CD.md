---
tags:
  - area/technology
  - domain/devops
  - topic/cicd
  - type/resource
  - lang/vi
---

# CI/CD (Continuous Integration & Continuous Deployment)

CI/CD là một phương pháp trong phát triển phần mềm giúp tự động hóa quá trình tích hợp mã nguồn, kiểm thử và triển khai ứng dụng, giúp rút ngắn thời gian phát hành sản phẩm và đảm bảo chất lượng mã nguồn.

## Các khái niệm cốt lõi

- **Continuous Integration (CI)**: Tích hợp liên tục các thay đổi từ nhiều lập trình viên vào một kho lưu trữ chung. Quá trình này bao gồm việc tự động build và chạy các bộ kiểm thử (Unit Test, Integration Test).
- **Continuous Delivery**: Đảm bảo mã nguồn sau khi tích hợp luôn ở trạng thái sẵn sàng để triển khai. Quá trình triển khai lên môi trường production thường được thực hiện thủ công sau một nút bấm.
- **Continuous Deployment (CD)**: Tự động hóa hoàn toàn quá trình từ khi code được merge đến khi chạy trên môi trường production mà không cần sự can thiệp của con người (nếu các bài kiểm thử pass).

## Các thành phần của Pipeline

1. **Source Stage**: Trigger khi có thay đổi trong code (Git).
2. **Build Stage**: Biên dịch mã nguồn, cài đặt dependencies.
3. **Test Stage**: Chạy các bài kiểm thử tự động (Unit, Integration, Security scan).
4. **Deploy Stage**: Triển khai lên các môi trường (Staging, Production).

## Tài liệu liên quan

### Công cụ & Frameworks
Xem chi tiết các công cụ hỗ trợ CI/CD tại:
- [[CI-CD Tools|CI/CD Tools]]
- [[Tools|General DevOps Tools]]

### Usecases & Ví dụ thực tế
Các kịch bản triển khai CI/CD trong thực tế:
- [[Node-EKS-CICD|Node.js CI/CD Pipeline trên Amazon EKS]]
- [[Workflow Orchestration|Workflow Orchestration]]

## Resources & Tips

- **Reusable Workflows**: Kỹ thuật tái sử dụng logic pipeline trong Github Actions để giảm thiểu trùng lặp mã - [Viblo Guide](https://viblo.asia/p/reusable-workflows-tai-su-dung-workflows-trong-github-actions-zOQJwowbJMP).