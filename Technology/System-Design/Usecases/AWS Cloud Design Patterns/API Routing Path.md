# Pattern: Path Routing (Định tuyến theo đường dẫn)

Định tuyến theo đường dẫn là cơ chế nhóm nhiều hoặc tất cả các API dưới cùng một hostname và sử dụng URI của yêu cầu để phân tách các dịch vụ. Ví dụ: `api.example.com/service-a` hoặc `api.example.com/service-b`.

### Trường hợp sử dụng điển hình:
- Phù hợp khi muốn có một kiến trúc đơn giản cho người dùng: chỉ cần nhớ một URL duy nhất (`api.example.com`).
- Tài liệu API tập trung, dễ tra cứu hơn thay vì bị chia nhỏ.
- Tuy nhiên, phương pháp này đòi hỏi quy trình quản lý thay đổi (change management) chặt chẽ để tránh cấu hình sai làm ảnh hưởng đến toàn bộ hệ thống.

### Các phương pháp triển khai trên AWS:

#### 1. HTTP Service Reverse Proxy (Sử dụng NGINX)
- Sử dụng các máy chủ HTTP như NGINX để tạo cấu hình định tuyến động.
- **Ưu điểm**: Tạo ra một hệ thống nhất quán cho người dùng; các đội dịch vụ có thể tự quản lý API của mình; hỗ trợ tốt cho việc thu thập log/metrics.
- **Nhược điểm**: Đòi hỏi kiểm thử và quản lý hạ tầng phức tạp; chi phí cao ở quy mô nhỏ nhưng rất hiệu quả khi đạt lưu lượng cực lớn (trên 100k TPS).

#### 2. API Gateway
- Sử dụng Amazon API Gateway (REST hoặc HTTP APIs) ở chế độ proxy.
- Nên sử dụng đường dẫn wildcard (ví dụ: `/billing/*`) để tăng tính linh hoạt thay vì ánh xạ từng path cụ thể.
- **Ưu điểm**: 
    - Kiểm soát quy trình phức tạp (sử dụng VTL để thay đổi thuộc tính request/response).
    - Tích hợp sẵn IAM, Cognito, Lambda authorizers cho bảo mật.
    - Hỗ trợ Rate limiting, Throttling và AWS WAF.
- **Nhược điểm**: Chi phí có thể trở thành vấn đề khi lưu lượng truy cập rất cao.

#### 3. CloudFront
- Sử dụng tính năng "Dynamic origin selection" để chọn dịch vụ đích dựa trên điều kiện. Logic định tuyến nằm trong code của Lambda@Edge.
- **Ưu điểm**: 
    - Hỗ trợ tốt cho A/B testing, Canary release, Feature flagging.
    - Tích hợp bộ nhớ đệm (Caching).
    - Hỗ trợ mã hóa cấp độ trường (Field-level encryption).
- **Nhược điểm**: 
    - Giới hạn tối đa 250 origins (dịch vụ).
    - Thời gian cập nhật Lambda@Edge và lan truyền (propagation) cấu hình có thể mất từ vài phút đến 30 phút.
