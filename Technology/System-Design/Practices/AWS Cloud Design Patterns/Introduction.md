# Giới thiệu về Cloud Design Patterns (AWS)

Hướng dẫn này cung cấp các giải pháp thiết kế phổ biến để hiện đại hóa ứng dụng bằng cách sử dụng các dịch vụ AWS. Việc chuyển đổi từ kiến trúc Monolithic (nguyên khối) sang Microservices giúp tăng khả năng mở rộng, tốc độ phát hành và sự linh hoạt, nhưng cũng đặt ra nhiều thách thức về giao tiếp mạng, quản lý dữ liệu và tính nhất quán.

### Tóm tắt nội dung chính:
- **Kiến trúc Microservices**: Tập trung vào các dịch vụ nhỏ gọn, độc lập, có thể chạy trên mạng và sử dụng nhiều loại cơ sở dữ liệu khác nhau (polyglot persistence).
- **Mục tiêu của các Design Patterns**:
    - Giải quyết các vấn đề thường gặp trong phát triển ứng dụng hiện đại.
    - Đẩy nhanh quá trình phân phối phần mềm.
    - Cung cấp tham chiếu kỹ thuật dựa trên các thực hành tốt nhất (well-architected best practices).
- **Lợi ích kinh doanh**:
    - Thiết kế hệ thống tin cậy, bảo mật, hiệu quả về chi phí và hiệu suất.
    - Giảm thời gian phát triển (cycle time) bằng cách tiêu chuẩn hóa việc triển khai trên AWS.
    - Hạn chế nợ kỹ thuật (technical debt) cho đội ngũ phát triển.

### Danh sách các Pattern sẽ tìm hiểu:
- API routing (Hostname, Path, HTTP header)
- Circuit breaker
- Event sourcing
- Hexagonal architecture
- Publish-subscribe
- Retry with backoff
- Saga (Choreography, Orchestration)
- Scatter-gather
- Strangler fig
- Transactional outbox

---
*Nguồn: [AWS Cloud Design Patterns](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/introduction.html)*
