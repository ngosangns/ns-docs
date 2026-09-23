---
area: technology
domain: system-design
type: note
title: Bulkhead Pattern
description: Mẫu thiết kế Bulkhead (Vách ngăn)
timestamp: "2026-06-19T13:43:26.116Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead
---

# Mẫu thiết kế Bulkhead (Vách ngăn)

Mẫu thiết kế Bulkhead là một loại thiết kế ứng dụng có khả năng chịu lỗi. Trong kiến trúc vách ngăn (còn được gọi là kiến trúc dựa trên ô - cell-based architecture), các thành phần của ứng dụng được cô lập vào các nhóm (pool) để nếu một nhóm thất bại, các nhóm khác vẫn tiếp tục hoạt động. Tên gọi này bắt nguồn từ các vách ngăn trong thân tàu thủy: nếu thân tàu bị thủng, chỉ phần bị hư hỏng mới bị ngập nước, giúp tàu không bị chìm hoàn toàn.

## 1. Ngữ cảnh và Vấn đề

- Một ứng dụng đám mây có thể bao gồm nhiều dịch vụ. Tải quá mức hoặc lỗi ở một dịch vụ sẽ ảnh hưởng đến tất cả người dùng của dịch vụ đó.
- Một "consumer" có thể gửi yêu cầu đến nhiều dịch vụ đồng thời. Nếu một dịch vụ phản hồi chậm hoặc lỗi, các tài nguyên (như connection pool, thread) được sử dụng cho yêu cầu đó có thể không được giải phóng kịp thời, dẫn đến cạn kiệt tài nguyên toàn hệ thống.
- Lỗi từ một phía có thể gây ra hiệu ứng sụp đổ dây chuyền (cascading failure).

## 2. Giải pháp

Phân chia các phiên bản dịch vụ thành các nhóm khác nhau dựa trên tải của người dùng và yêu cầu về tính sẵn sàng.

- **Phân chia tài nguyên phía Client:** Ví dụ, gán một connection pool riêng cho mỗi dịch vụ mà client gọi đến. Nếu một dịch vụ lỗi, chỉ connection pool đó bị ảnh hưởng.
- **Phân chia phía Service:** Triển khai các dịch vụ vào các máy ảo, container hoặc tiến trình riêng biệt để cô lập tài nguyên.

## 3. Lợi ích

- Cô lập người tiêu dùng và dịch vụ khỏi các lỗi dây chuyền.
- Duy trì một phần chức năng của ứng dụng ngay cả khi có dịch vụ bị lỗi.
- Cho phép cung cấp các mức chất lượng dịch vụ (QoS) khác nhau cho các đối tượng khách hàng khác nhau (ví dụ: nhóm khách hàng ưu tiên sử dụng tài nguyên ưu tiên).

## 4. Các vấn đề và Cân nhắc

- Định nghĩa các phân vùng dựa trên yêu cầu nghiệp vụ và kỹ thuật.
- Cân nhắc mức độ cô lập mà công nghệ cung cấp so với chi phí vận hành và hiệu suất.
- Kết hợp với các mẫu thiết kế khác như **Retry**, **Circuit Breaker**, và **Throttling**.
- Sử dụng các thư viện như **resilience4j** hoặc **Polly** (cho .NET) để tạo vách ngăn phía client.
- Sử dụng Container (Docker, Kubernetes) là một cách tốt để cô lập tài nguyên với chi phí thấp.

## 5. Khi nào nên sử dụng

- Khi cần cô lập tài nguyên cho các dịch vụ backend, đặc biệt khi ứng dụng vẫn có thể hoạt động một phần khi một dịch vụ không phản hồi.
- Khi muốn bảo vệ ứng dụng khỏi các lỗi sụp đổ dây chuyền.
- Khi cần phân cấp người dùng (quan trọng và thông thường).

## 6. Ví dụ triển khai (Kubernetes)

Cấu hình sau tạo một container cô lập cho một dịch vụ với giới hạn CPU và bộ nhớ riêng:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: drone-management
spec:
  containers:
    - name: drone-management-container
      image: drone-service
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "1"
```

---

_Nguồn: [Azure Architecture Center - Bulkhead pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead)_
