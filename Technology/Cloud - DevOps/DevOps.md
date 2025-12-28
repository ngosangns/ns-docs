---
relates:
  - "[[IaaS]]"
  - "[[SaaS]]"
  - "[[Backend - Back-end]]"
  - "[[AWS]]"
  - "[[Azure]]"
  - "[[Google Cloud Platform - GCP]]"
tags:
  - devops
  - iaas
  - saas
  - backend-back-end
  - aws
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

# 3. Reverse proxy

- Các loại reverse proxy và khi nào nên dùng: https://viblo.asia/p/reverse-proxy-tu-thang-chuyen-phat-thanh-ong-quan-gia-PAoJeOArV1j

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
