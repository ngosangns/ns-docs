---
area: technology
domain: system-design
type: note
title: Gateway Routing Pattern
description: Mẫu thiết kế Gateway Routing (Định tuyến tại cổng)
timestamp: '2026-06-19T13:43:26.124Z'
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing
---
# Mẫu thiết kế Gateway Routing (Định tuyến tại cổng)

Mẫu thiết kế Gateway Routing sử dụng một điểm cuối (endpoint) duy nhất để định tuyến các yêu cầu đến nhiều dịch vụ hoặc nhiều phiên bản của cùng một dịch vụ. Mẫu này giúp máy khách không cần biết về cấu trúc phức tạp của các dịch vụ backend.

## 1. Ngữ cảnh và Vấn đề
Khi một ứng dụng khách (client) cần sử dụng nhiều dịch vụ hoặc nhiều phiên bản dịch vụ khác nhau:
- **Nhiều dịch vụ rời rạc:** Một ứng dụng thương mại điện tử có các dịch vụ như tìm kiếm, đánh giá, giỏ hàng, thanh toán. Client phải biết địa chỉ (endpoint) của từng dịch vụ. Nếu API thay đổi hoặc dịch vụ bị tách nhỏ, client phải cập nhật theo.
- **Nhiều instance của cùng một dịch vụ:** Để cân bằng tải hoặc đảm bảo tính sẵn sàng, hệ thống chạy nhiều bản sao của dịch vụ ở các vùng khác nhau. Client phải quản lý việc kết nối đến instance nào.
- **Nhiều phiên bản của cùng một dịch vụ:** Khi triển khai phiên bản mới (ví dụ Blue-Green deployment), cần cơ chế điều phối lưu lượng giữa phiên bản cũ và mới mà không làm gián đoạn người dùng.

## 2. Giải pháp
Đặt một cổng (gateway) phía trước các ứng dụng, dịch vụ hoặc các bản triển khai. Sử dụng định tuyến lớp 7 (Application Layer) để chuyển tiếp yêu cầu đến các instance phù hợp.
- Client chỉ cần biết và giao tiếp với **duy nhất một địa chỉ cổng**.
- Gateway sẽ dựa trên các thông tin như URL path, Headers, Hostname, hoặc địa chỉ IP để quyết định gửi yêu cầu đi đâu.

## 3. Lợi ích
- **Trừu tượng hóa Backend:** Có thể thêm, bớt, chia tách hoặc tổ chức lại các dịch vụ backend mà không cần thay đổi mã nguồn phía client.
- **Quản lý linh hoạt (Elasticity):** Việc đăng ký hoặc hủy đăng ký các instance dịch vụ khi tăng/giảm quy mô được xử lý tập trung tại gateway.
- **Chiến lược triển khai nâng cao:** Dễ dàng thực hiện các kiểu triển khai như Canary, Blue-Green bằng cách thay đổi cấu hình định tuyến tại gateway.
- **Giảm rò rỉ thông tin mạng:** Các dịch vụ backend có thể được đặt trong mạng nội bộ và không cần địa chỉ IP công cộng, chỉ có gateway mới có quyền truy cập.

## 4. Các vấn đề và Cân nhắc
- **Điểm gây lỗi duy nhất (SPOF):** Gateway là thành phần cực kỳ quan trọng. Cần thiết kế có tính chịu lỗi và sẵn sàng cao.
- **Điểm nghẽn (Bottleneck):** Gateway phải có hiệu suất đủ mạnh để xử lý toàn bộ lưu lượng của các dịch vụ phía sau.
- **Định tuyến lớp 7:** Việc xử lý định tuyến dựa trên nội dung yêu cầu (URL, Header) tiêu tốn nhiều tài nguyên hơn so với định tuyến lớp 4 (chỉ dựa trên IP/Port).
- **Phạm vi hoạt động:** Cân nhắc sử dụng gateway toàn cầu (như Azure Front Door) cho các ứng dụng đa vùng, hoặc gateway vùng (như Azure Application Gateway) cho các yêu cầu điều phối chi tiết trong một vùng.

## 5. Khi nào nên sử dụng
- Khi máy khách cần tiêu thụ nhiều dịch vụ nằm sau một cổng chung.
- Khi muốn đơn giản hóa ứng dụng khách bằng cách sử dụng một điểm cuối duy nhất.
- Khi cần định tuyến yêu cầu từ các điểm cuối công khai đến các điểm cuối ảo nội bộ (như port của VM).
- Khi muốn triển khai các chiến lược cập nhật phần mềm không gây gián đoạn (zero-downtime).

## 6. Ví dụ trên Azure
- **Azure Application Gateway:** Cung cấp khả năng định tuyến dựa trên đường dẫn URL (Path-based routing) trong một vùng. Ví dụ: `/images/*` đi đến cụm máy chủ ảnh, `/video/*` đi đến cụm máy chủ video.
- **Azure Front Door:** Cung cấp khả năng định tuyến toàn cầu, giúp người dùng luôn kết nối đến instance gần nhất và nhanh nhất.

## 7. Liên quan
- **Backends for Frontends pattern:** BFF thường sử dụng Gateway Routing để chuyển tiếp yêu cầu đến các dịch vụ backend tương ứng.
- **Gateway Aggregation pattern:** Thường kết hợp với định tuyến để gộp kết quả từ nhiều hướng định tuyến khác nhau.

---
*Nguồn: [Azure Architecture Center - Gateway Routing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)*
