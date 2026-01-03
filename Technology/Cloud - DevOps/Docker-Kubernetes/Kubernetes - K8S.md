---
tags:
  - area/technology
  - domain/devops
  - type/resource
  - lang/vi
---

# 1. Resources

- 26 Top Kubernetes Tools for 2024: https://medium.com/spacelift/26-top-kubernetes-tools-for-2024-6809b2f0d5d4
- Ingress: Quản lý traffic từ ngoài vào.
- Kubernetes Example - Xây dựng hệ thống microservices đơn giản: https://viblo.asia/p/kubernetes-example-xay-dung-he-thong-microservices-don-gian-pgjLNKyAV32
- Công cụ hỗ trợ bảo mật k8s: https://viblo.asia/p/bao-mat-ung-dung-tren-kubernetes-he-dieu-hanh-may-khong-danh-cho-nguoi-mong-mo-Yym40GddV91

# 2. Tools

- https://tilt.dev: Công cụ mã nguồn mở giúp các nhóm phát triển phần mềm dễ dàng thiết lập và quản lý môi trường phát triển cho các ứng dụng microservices chạy trên Kubernetes. Nó tự động hóa các bước từ việc thay đổi mã nguồn đến triển khai ứng dụng, giúp tăng tốc độ phát triển và giảm thiểu lỗi.

## MLOps - Model PVC Provisioning (MPP)

### Thách thức khi triển khai AI service trên Kubernetes

- Kích thước image lớn (hàng chục GB) gây khó khăn trong việc build, lưu trữ và triển khai
- Thời gian khởi động lâu và tiêu tốn tài nguyên mạng khi tải model trong thời gian chạy
- Dễ gặp lỗi khi khởi động do kích thước image quá lớn

### Phương pháp triển khai truyền thống

- **Code + Model = Image**: Đưa cả code và model vào cùng một image, dẫn đến kích thước image lớn và khó quản lý
- **Download model khi khởi động**: Service tải model về khi pod được tạo, gây ra thời gian khởi động lâu và tiêu tốn tài nguyên mạng

### Giải pháp Model PVC Provisioning (MPP)

#### Kiến trúc triển khai

- Sử dụng Model Registry để lưu trữ và quản lý các phiên bản model
- Sử dụng MPP Tool để tải model về và lưu trữ trong Persistent Volume Claim (PVC)
- Mount PVC vào pod, cho phép AI service sử dụng model thông qua biến môi trường `MODEL_PATH`

#### Ưu điểm của MPP

- Giải quyết các vấn đề về kích thước image và thời gian khởi động
- Tối ưu hóa việc chuyển giao model giữa các môi trường
- Cho phép chia sẻ model giữa nhiều service trong cùng một namespace
- Dễ dàng thay đổi model bằng cách cập nhật biến môi trường
- Giảm kích thước image và thời gian build

#### Nhược điểm của MPP

- Quy trình triển khai phức tạp hơn, yêu cầu chuẩn bị StorageClass cho PVC và triển khai công cụ MPP
- Cần sự phối hợp và nỗ lực từ các đội ngũ để thay đổi quy trình hiện tại

---

**Nguồn**: [[MLOps] Model PVC Provisioning (MPP) - A way to ship large AI image to K8s - Viblo](https://viblo.asia/p/mlops-model-pvc-provisioning-mpp-a-way-to-ship-large-ai-image-to-k8s-3kY4gdKqJAe)
