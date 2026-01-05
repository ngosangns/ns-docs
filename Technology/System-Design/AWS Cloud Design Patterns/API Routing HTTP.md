# Pattern: HTTP Header Routing (Định tuyến theo HTTP Header)

Định tuyến dựa trên header cho phép nhắm mục tiêu chính xác dịch vụ cho mỗi yêu cầu bằng cách chỉ định một HTTP header trong request. Ví dụ: gửi header `x-service-a-action: get-thing` sẽ cho phép bạn thực hiện hành động `get thing` từ `Service A`.

### Đặc điểm chính:
- Thường được sử dụng kết hợp với các phương pháp định tuyến khác (Hostname hoặc Path) để tạo ra các API mạnh mẽ.
- Ngoài việc định tuyến hành động, nó còn dùng để:
    - Điều hướng phiên bản (Version routing).
    - Bật/tắt tính năng (Feature flags).
    - Thử nghiệm A/B (A/B testing).
- Kiến trúc thường có một lớp định tuyến mỏng (thin routing layer) nằm trước các microservices.

### Ưu điểm:
- **Linh hoạt**: Dễ dàng thay đổi cấu hình với nỗ lực tối thiểu và có thể tự động hóa.
- **Tùy biến cao**: Hỗ trợ các cách sáng tạo để chỉ công khai các hoạt động cụ thể mà bạn muốn từ một dịch vụ.

### Nhược điểm:
- **Kiểm soát Client**: Giả định rằng bạn có toàn quyền kiểm soát client để có thể tùy chỉnh các HTTP headers.
- **Giới hạn hạ tầng**: Các proxy, CDN và bộ cân bằng tải (load balancers) có thể giới hạn kích thước header (dù hiếm khi là vấn đề nhưng cần lưu ý nếu sử dụng quá nhiều header hoặc cookie).
