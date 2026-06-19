---
area: technology
domain: system-design
type: note
title: Edge Workload Configuration Pattern
description: Mẫu thiết kế Edge Workload Configuration (Cấu hình khối lượng công việc tại biên)
timestamp: '2026-06-19T13:43:26.123Z'
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/edge-workload-configuration
---
# Mẫu thiết kế Edge Workload Configuration (Cấu hình khối lượng công việc tại biên)

Mẫu thiết kế này giải quyết thách thức trong việc quản lý và phân phối cấu hình cho các ứng dụng chạy tại biên (Edge), nơi có sự đa dạng lớn về thiết bị, giao thức và yêu cầu vận hành liên tục ngay cả khi mất kết nối đám mây.

## 1. Ngữ cảnh và Vấn đề
Trong chuyển đổi số công nghiệp, các công ty sản xuất thường xây dựng các giải pháp phần mềm có thể tái sử dụng. Tuy nhiên, tại các nhà máy (shop floor):
- Có rất nhiều loại thiết bị và hệ thống khác nhau, đòi hỏi các cấu hình khác nhau về giao thức, driver và định dạng dữ liệu.
- Đôi khi nhiều instance của cùng một workload chạy với các cấu hình khác nhau tại cùng một địa điểm.
- Cấu hình có thể thay đổi thường xuyên (nhiều lần trong ngày) mà không muốn phải triển khai lại toàn bộ phần mềm.

## 2. Đặc điểm của cấu hình tại biên
- **Phân lớp cấu hình:** Cấu hình có thể đến từ nhiều nguồn như mã nguồn, pipeline CI/CD, cloud tenant, hoặc cấu hình riêng tại địa điểm biên.
- **Khả năng truy cập ngoại tuyến:** Để đảm bảo kinh doanh liên tục, các cấu hình phải có thể truy cập được tại biên ngay cả khi không có kết nối internet.
- **Theo dõi và Kiểm toán:** Mọi thay đổi cấu hình cần được theo dõi chặt chẽ để phục vụ mục đích xử lý lỗi và tuân thủ.

## 3. Các biến thể giải pháp

### A. Bộ điều khiển cấu hình bên ngoài (External Configuration Controller)
Có một thành phần điều khiển cấu hình nằm ngoài workload chính.
- **Cách hoạt động:** Cloud controller đẩy cấu hình xuống Edge controller, sau đó Edge controller áp dụng vào workload.
- **Lợi ích:** Workload không cần biết về hệ thống cấu hình (phù hợp với phần mềm đóng gói sẵn/third-party). Có thể thay đổi cấu hình nhiều workload cùng lúc.

### B. Nhà cung cấp cấu hình bên trong (Internal Configuration Provider)
Workload tự chủ động kéo cấu hình từ một nhà cung cấp.
- **Cách hoạt động:** Workload sử dụng một mã định danh duy nhất (Unique ID) để yêu cầu cấu hình phù hợp với môi trường của nó.
- **Lợi ích:** Giảm bớt số lượng thành phần trung gian, đơn giản hóa kiến trúc nếu bạn có quyền kiểm soát mã nguồn workload.

## 4. Các vấn đề và Cân nhắc
- **Độ phức tạp khi chỉnh sửa ngoại tuyến:** Cho phép sửa cấu hình tại biên khi mất kết nối cloud làm tăng độ phức tạp đáng kể (xác thực người dùng, giải quyết xung đột khi kết nối lại).
- **Lưu trữ lịch sử:** Nên lưu trữ các phiên bản cấu hình cũ trên cloud để có thể thực hiện Rollback khi cấu hình mới gây lỗi.
- **Gắn kết với Giám sát (Observability):** Các thay đổi cấu hình nên được ghi nhận trong hệ thống giám sát để giúp đội ngũ vận hành đối chiếu lỗi hệ thống với các lần đổi cấu hình.
- **Giới hạn kích thước:** Nếu sử dụng các công nghệ như IoT Edge Module Twin, cần lưu ý giới hạn kích thước dữ liệu (thường là 32KB). Với cấu hình lớn, nên sử dụng Blob Storage hoặc chia nhỏ dữ liệu.

## 5. Khi nào nên sử dụng
- Khi cần cấu hình workload ngoài chu kỳ phát hành phần mềm (release cycle).
- Khi có nhiều đối tượng khác nhau (dev, ops, factory manager) cùng cần đọc và cập nhật cấu hình.
- Khi cấu hình cần sẵn sàng ngay cả khi mất kết nối cloud.

## 6. Ví dụ trên Azure
- **Azure IoT Edge:** Sử dụng **Module Twins** để đẩy/nhận cấu hình.
- **Azure IoT Hub:** Đóng vai trò là bộ điều khiển cấu hình trung tâm trên cloud.
- **Azure Cosmos DB:** Lưu trữ lịch sử và trạng thái cấu hình của hàng ngàn thiết bị biên.
- **Azure Blob Storage:** Lưu trữ các file cấu hình lớn hoặc các model Machine Learning phức tạp cần phân phối xuống biên.

---
*Nguồn: [Azure Architecture Center - Edge Workload Configuration pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/edge-workload-configuration)*
