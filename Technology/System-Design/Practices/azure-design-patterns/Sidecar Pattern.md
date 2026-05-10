---
area: technology
domain: system-design
type: note
---
```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Sidecar Pattern.md#L1-36
# Sidecar Pattern (Mô hình Mô tô có thùng)

## Tóm tắt
Mô hình Sidecar triển khai các thành phần của ứng dụng vào một tiến trình hoặc container riêng biệt để cung cấp sự cô lập và đóng gói. Tên gọi này bắt nguồn từ chiếc thùng xe gắn bên cạnh xe mô tô; sidecar được gắn vào ứng dụng chính (parent application) để cung cấp các tính năng hỗ trợ và chia sẻ cùng vòng đời với ứng dụng đó.

## Các điểm chính
- **Mục đích**: Tách biệt các tác vụ ngoại vi (monitoring, logging, cấu hình, dịch vụ mạng) khỏi ứng dụng chính để tránh sự phụ thuộc chặt chẽ và tăng tính linh hoạt về công nghệ.
- **Lợi ích**:
    - **Độc lập ngôn ngữ**: Sidecar có thể được viết bằng ngôn ngữ khác với ứng dụng chính.
    - **Sát gần tài nguyên**: Sidecar có thể truy cập cùng tài nguyên hệ thống với ứng dụng chính mà không bị trễ mạng đáng kể.
    - **Cô lập lỗi**: Một lỗi trong sidecar ít có khả năng làm sập toàn bộ ứng dụng chính và ngược lại.
    - **Quản lý vòng đời**: Sidecar được triển khai và nghỉ hưu cùng lúc với ứng dụng chính.
- **Cơ chế hoạt động**: Mỗi instance của ứng dụng chính sẽ có một instance sidecar đi kèm. Chúng giao tiếp với nhau qua các cơ chế liên tiến trình (IPC) như HTTP local, gRPC hoặc Unix sockets.
- **Vấn đề cần lưu ý**:
    - **Chi phí tài nguyên**: Việc chạy một tiến trình/container riêng cho mỗi instance có thể tốn kém tài nguyên đối với các ứng dụng nhỏ.
    - **Độ trễ giao tiếp**: Mặc dù ở gần, giao tiếp liên tiến trình vẫn có độ trễ nhất định so với việc gọi hàm trong cùng một tiến trình.
    - **Độ phức tạp triển khai**: Cần cơ chế điều phối (như Kubernetes) để quản lý cặp ứng dụng-sidecar này.

## Khi nào sử dụng
- Khi ứng dụng sử dụng nhiều ngôn ngữ và khung công nghệ khác nhau (heterogeneous).
- Khi một thành phần được sở hữu bởi một nhóm từ xa hoặc tổ chức khác.
- Khi cần kiểm soát chi tiết giới hạn tài nguyên (CPU, Memory) cho từng thành phần hỗ trợ riêng biệt.
- Khi muốn mở rộng chức năng cho các ứng dụng cũ không có cơ chế extensibility.

## Ví dụ thực tế
- **Infrastructure API**: Một sidecar cung cấp lớp truy cập chung cho ghi nhật ký, kiểm tra sức khỏe (health checks) và lấy cấu hình.
- **Ambassador sidecar**: Xử lý việc định tuyến, circuit breaking và logging cho các yêu cầu ra ngoài.
- **Offload proxy**: Sử dụng NGINX sidecar để phục vụ nội dung tĩnh phía trước một dịch vụ Node.js.

## Mối liên hệ
- **Ambassador Pattern**: Một dạng biến thể của Sidecar tập trung vào việc thay mặt ứng dụng kết nối với các dịch vụ bên ngoài.

## Tài liệu tham khảo
- [Microsoft Learn - Sidecar Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar)
