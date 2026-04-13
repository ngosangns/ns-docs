---
area: technology
domain: system-design
type: note
---
```ngosangns-obsidian/technology/system-design/azure-design-patterns/Static Content Hosting Pattern.md#L1-35
# Static Content Hosting Pattern (Mô hình Lưu trữ Nội dung Tĩnh)

## Tóm tắt
Mô hình Static Content Hosting triển khai các nội dung tĩnh (HTML, CSS, JavaScript, hình ảnh, tài liệu) lên một dịch vụ lưu trữ dựa trên đám mây thay vì lưu trữ trên máy chủ ứng dụng. Điều này giúp giảm tải cho các tài nguyên tính toán (compute), giảm chi phí và cải thiện hiệu suất truy cập.

## Các điểm chính
- **Mục đích**: Tối ưu hóa chi phí và hiệu suất bằng cách tách biệt việc phục vụ nội dung tĩnh khỏi việc xử lý logic động.
- **Lợi ích**:
    - **Giảm chi phí**: Lưu trữ đám mây (như Azure Blob Storage) rẻ hơn nhiều so với việc duy trì các instance máy chủ (VM, App Service).
    - **Khả năng mở rộng**: Các dịch vụ lưu trữ được thiết kế để xử lý lượng lớn yêu cầu đồng thời mà không cần cấu hình phức tạp.
    - **Cải thiện hiệu suất**: Giảm tải cho CPU/RAM của máy chủ web để tập trung vào việc tạo nội dung động.
- **Cơ chế hoạt động**:
    - Nội dung tĩnh được đẩy lên một container lưu trữ có quyền truy cập công khai (public read).
    - Ứng dụng khách truy cập trực tiếp các tài nguyên này thông qua HTTP/HTTPS endpoint của dịch vụ lưu trữ.
    - Thường kết hợp với **Content Delivery Network (CDN)** để lưu bộ nhớ đệm (cache) tại các trung tâm dữ liệu gần người dùng nhất trên toàn cầu.
- **Vấn đề cần lưu ý**:
    - **Triển khai**: Việc cập nhật ứng dụng trở nên phức tạp hơn vì cần cập nhật đồng thời cả mã nguồn trên máy chủ và nội dung tĩnh trên kho lưu trữ.
    - **Tên miền tùy chỉnh**: Cần cấu hình để sử dụng domain riêng và HTTPS nếu cần thiết.
    - **Bảo mật**: Đảm bảo kho lưu trữ chỉ có quyền "đọc" công khai, tuyệt đối không cho phép quyền "ghi" công khai. Đối với nội dung riêng tư, cần sử dụng cơ chế **Valet Key** (ví dụ: SAS token).

## Khi nào sử dụng
- Khi ứng dụng có nhiều tài nguyên tĩnh như ảnh, video, tài liệu PDF hoặc các file script lớn.
- Khi muốn xây dựng các trang web hoàn toàn tĩnh (Single Page Applications - SPA).
- Khi cần phục vụ nội dung cho người dùng ở nhiều khu vực địa lý khác nhau.

## Mối liên hệ
- **Valet Key Pattern**: Dùng để kiểm soát quyền truy cập vào các tài nguyên tĩnh không được phép công khai.
- **Azure Storage Static Website**: Tính năng cụ thể trên Azure để triển khai mô hình này.

## Tài liệu tham khảo
- [Microsoft Learn - Static Content Hosting Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/static-content-hosting)
