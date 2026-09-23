---
area: technology
domain: system-design
type: note
title: Network Secure Ingress Implementation
description: Triển khai Network Secure Ingress (Lối vào mạng bảo mật)
timestamp: "2026-06-19T13:43:26.124Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/pattern-implementations/network-secure-ingress
---

# Triển khai Network Secure Ingress (Lối vào mạng bảo mật)

Mẫu triển khai này kết hợp nhiều mẫu thiết kế như định tuyến toàn cầu (global routing), giảm tải (offloading), và giám sát điểm cuối sức khỏe (health endpoint monitoring) để cung cấp lối vào an toàn cho các ứng dụng HTTP/HTTPS.

## 1. Yêu cầu chính của mẫu

- **Định tuyến toàn cầu (Global routing):** Có khả năng chuyển hướng yêu cầu đến các vùng (region) khác nhau.
- **Dự phòng lỗi độ trễ thấp (Low-latency failover):** Xác định nhanh chóng các workload bị lỗi và điều chỉnh định tuyến trong vài phút.
- **Giảm thiểu tấn công tại biên (Mitigating attacks at the edge):** Đảm bảo các dịch vụ PaaS không thể truy cập trực tiếp từ internet; mọi lưu lượng phải đi qua gateway bảo mật.

## 2. Các mẫu thiết kế áp dụng

- **Gateway Routing:** Định tuyến yêu cầu đến nhiều dịch vụ hoặc phiên bản dịch vụ ở các vùng khác nhau.
- **Gateway Offloading:** Đẩy các chức năng như ngăn chặn tấn công sang proxy cổng (WAF).
- **Health Endpoint Monitoring:** Cung cấp các điểm cuối để kiểm tra trạng thái hoạt động của hệ thống.

## 3. Thành phần kiến trúc chính

- **Azure Front Door (Premium):** Đóng vai trò là gateway toàn cầu, hỗ trợ cân bằng tải lớp 7 và kết nối bảo mật qua Private Link.
- **Azure Web Application Firewall (WAF):** Kiểm tra và chặn các lưu lượng HTTP/HTTPS độc hại trước khi chúng đến backend.
- **Azure Private Link:** Cho phép kết nối riêng tư từ Front Door đến các dịch vụ backend (như Storage, ILB) mà không cần mở IP công cộng.
- **Azure Storage (Blob):** Lưu trữ nội dung tĩnh, đóng vai trò là origin cho các yêu cầu web.
- **Internal Load Balancer (ILB):** Phân phối lưu lượng nội bộ cho các workload riêng tư.

## 4. Quy trình xử lý yêu cầu (Web Request Flow)

1. Người dùng gửi yêu cầu HTTP/HTTPS đến điểm cuối Azure Front Door.
2. **WAF** kiểm tra các quy tắc bảo mật. Nếu vi phạm, yêu cầu sẽ bị chặn.
3. Front Door khớp định tuyến và chọn **Origin Group** phù hợp.
4. Chọn **Origin** cụ thể dựa trên kết quả kiểm tra sức khỏe (Health Probes).
5. Yêu cầu được chuyển tiếp đến backend qua **Private Link** trên mạng xương sống của Microsoft.

## 5. Quy trình vận hành (Operational Flow)

Để quản trị hệ thống một cách an toàn mà không cần mở cổng internet:

- Sử dụng **Azure Bastion** để kết nối SSH/RDP vào một **Jump box VM** trong mạng ảo (VNET).
- Jump box VM truy cập các tài nguyên (như Storage account) thông qua **Private Endpoint** và **Private DNS Zone**.

## 6. Các cân nhắc (Considerations)

- **Độ tin cậy:** Sử dụng Health Probes để tự động loại bỏ các vùng bị lỗi.
- **Bảo mật:** Loại bỏ hoàn toàn việc tiếp xúc với internet công cộng cho các dịch vụ backend nhờ Private Link.
- **Chi phí:** Azure Front Door Premium và WAF Premium có chi phí cao hơn bản Standard nhưng cung cấp bảo mật nâng cao.
- **Vận hành:** Cần quản lý các tác nhân tự lưu trữ (self-hosted agents) trong VNET nếu muốn triển khai CI/CD (DevOps) vào các tài nguyên đã được bảo mật mạng.

---

_Nguồn: [Azure Architecture Center - Network secure ingress](https://learn.microsoft.com/en-us/azure/architecture/pattern-implementations/network-secure-ingress)_
