---
area: technology
domain: system-design
type: note
title: External Configuration Store Pattern
description: Mẫu thiết kế External Configuration Store (Kho cấu hình bên ngoài)
timestamp: "2026-06-19T13:43:26.123Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/external-configuration-store
---

# Mẫu thiết kế External Configuration Store (Kho cấu hình bên ngoài)

Mẫu thiết kế này di chuyển thông tin cấu hình ra khỏi gói triển khai ứng dụng (deployment package) đến một vị trí tập trung. Điều này giúp quản lý, kiểm soát dữ liệu cấu hình dễ dàng hơn và có thể chia sẻ cấu hình giữa nhiều ứng dụng hoặc phiên bản ứng dụng khác nhau.

## 1. Ngữ cảnh và Vấn đề

Đa số ứng dụng thường lưu cấu hình trong các file đi kèm khi triển khai. Tuy nhiên, cách này gặp một số vấn đề:

- **Thời gian ngừng hoạt động (Downtime):** Mỗi lần thay đổi cấu hình, bạn thường phải triển khai lại (redeploy) ứng dụng, gây ra gián đoạn dịch vụ không đáng có.
- **Khó chia sẻ:** Các file cấu hình cục bộ giới hạn trong một ứng dụng duy nhất, khó chia sẻ các cài đặt chung (như connection strings, URL của queue) cho nhiều dịch vụ liên quan.
- **Quản lý phức tạp:** Rất khó để đồng bộ hóa thay đổi cấu hình trên nhiều instance đang chạy, dẫn đến tình trạng các instance sử dụng cài đặt khác nhau trong quá trình cập nhật.
- **Thiếu tính phiên bản:** Nhiều hệ thống cấu hình mặc định không hỗ trợ quản lý nhiều phiên bản cấu hình cho các môi trường khác nhau (dev, staging, production).

## 2. Giải pháp

Lưu trữ thông tin cấu hình trong một kho lưu trữ bên ngoài (External Storage) và cung cấp một giao diện (interface) để đọc/cập nhật cấu hình nhanh chóng.

- **Lưu trữ:** Có thể là dịch vụ lưu trữ đám mây, cơ sở dữ liệu hoặc một dịch vụ cấu hình chuyên biệt.
- **Truy cập:** Ứng dụng đọc cấu hình khi khởi động và thường lưu vào bộ nhớ đệm (caching) để tối ưu hiệu năng.
- **Cơ chế thông báo:** Hệ thống có thể gửi thông báo cho ứng dụng khi cấu hình thay đổi để ứng dụng tự động cập nhật mà không cần restart.

## 3. Các vấn đề và Cân nhắc

- **Hiệu năng và Sẵn sàng:** Chọn kho lưu trữ có hiệu suất tốt và tính sẵn sàng cao. Sử dụng Caching tại ứng dụng để giảm độ trễ và xử lý tình huống kho cấu hình tạm thời không truy cập được.
- **Tính phiên bản:** Thiết kế schema để hỗ trợ nhiều phiên bản cấu hình cho từng môi trường hoặc từng phiên bản phát hành.
- **Bảo mật:** Bảo vệ dữ liệu cấu hình khỏi truy cập trái phép. Phân tách rõ ràng quyền đọc và quyền ghi. Mã hóa các thông tin nhạy cảm (như mật khẩu, API key).
- **Cơ chế Fallback:** Nên có một bộ cấu hình dự phòng (last known good values) đi kèm ứng dụng để dùng trong trường hợp hệ thống cấu hình bên ngoài bị lỗi khi ứng dụng bắt đầu khởi động.

## 4. Khi nào nên sử dụng

- Khi cần chia sẻ cấu hình giữa nhiều ứng dụng và instance khác nhau.
- Khi muốn thay đổi hành vi ứng dụng tại thời điểm chạy (runtime) mà không cần redeploy hoặc restart.
- Khi cần một hệ thống quản lý cấu hình tập trung để đơn giản hóa việc quản trị và giám sát.
- Khi cần hỗ trợ các kiểu dữ liệu phức tạp (hình ảnh, tài liệu) mà hệ thống cấu hình tiêu chuẩn không hỗ trợ.

## 5. Khi nào KHÔNG nên sử dụng

- Các ứng dụng đơn giản với cấu hình ít khi thay đổi.
- Khi việc phụ thuộc vào một dịch vụ bên ngoài làm tăng rủi ro quá mức cho tính sẵn sàng của ứng dụng.

## 6. Giải pháp trên Azure

### A. Azure App Configuration

Đây là dịch vụ chuyên biệt của Azure cho mẫu này:

- Hỗ trợ Key-Value theo namespace.
- Có tính năng **Feature Management** (Feature Flags).
- Hỗ trợ lưu ảnh chụp nhanh (Snapshots) để rollback cấu hình dễ dàng.
- Tích hợp sẵn với các thư viện .NET, Java Spring, Python, JavaScript.

### B. Azure Key Vault

Thường được dùng kết hợp để lưu trữ các cấu hình bảo mật (Secrets, Certificates) trong khi Azure App Configuration lưu các cấu hình thông thường.

---

_Nguồn: [Azure Architecture Center - External Configuration Store pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/external-configuration-store)_
