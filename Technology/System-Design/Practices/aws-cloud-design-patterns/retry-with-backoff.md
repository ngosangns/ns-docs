---
area: technology
domain: system-design
type: note
---
# Pattern: Retry with Backoff (Thử lại với khoảng chờ)

Pattern này giúp cải thiện độ ổn định của ứng dụng bằng cách tự động thử lại các thao tác bị thất bại do lỗi tạm thời (transient errors), kết hợp với việc tăng dần thời gian chờ giữa các lần thử.

### Ý tưởng cốt lõi:
Trong kiến trúc phân tán, các lỗi tạm thời như nghẽn mạng, dịch vụ phản hồi chậm hoặc bị giới hạn lưu lượng (throttling) là không thể tránh khỏi. Thay vì bỏ cuộc ngay lập tức hoặc thử lại liên tục làm quá tải hệ thống, chúng ta sẽ:
- **Retry**: Thử lại thao tác.
- **Exponential Backoff**: Tăng thời gian chờ đợi sau mỗi lần thất bại (ví dụ: 1s, 2s, 4s, 8s...).
- **Jitter**: Thêm một khoảng thời gian ngẫu nhiên vào backoff để tránh việc tất cả các client cùng thử lại vào một thời điểm (hiệu ứng bầy đàn).

### Trường hợp áp dụng:
- Khi dịch vụ bị giới hạn (Throttling - lỗi 429 Too Many Requests).
- Khi có các sự cố mạng tạm thời.
- Khi dịch vụ đích tạm thời không khả dụng nhưng có khả năng phục hồi nhanh.

### Các vấn đề cần lưu ý:
- **Tính đối đẳng (Idempotency)**: Thao tác được thử lại PHẢI là idempotent (gọi nhiều lần có kết quả như một lần) để tránh làm sai lệch dữ liệu (ví dụ: trừ tiền hai lần).
- **Fail Fast**: Nếu xác định được lỗi không phải tạm thời (ví dụ: sai mật khẩu, sai tham số), nên dùng **Circuit Breaker** để báo lỗi ngay thay vì cố gắng thử lại vô ích.
- **Trải nghiệm người dùng**: Việc tăng thời gian chờ quá lâu có thể làm ảnh hưởng đến cảm nhận của người dùng về tốc độ ứng dụng.

### Triển khai trên AWS:
- **AWS Step Functions**: Cung cấp cấu hình sẵn cho việc retry với exponential backoff mà không cần viết code. Bạn có thể định nghĩa `ErrorEquals`, `IntervalSeconds`, `MaxAttempts`, và `BackoffRate`.
- **AWS SDKs**: Hầu hết các bộ công cụ phát triển của AWS (SDK) đều đã tích hợp sẵn cơ chế retry mặc định cho các dịch vụ như DynamoDB, S3.
- **AWS Lambda**: Có thể tự triển khai logic retry trong code nếu cần tùy biến sâu.

### Ví dụ:
Một hệ thống phân tích cảm xúc khách hàng gọi đến Amazon Comprehend:
1. Lần đầu gọi bị lỗi 503 (Dịch vụ bận).
2. Hệ thống chờ 1 giây rồi thử lại.
3. Nếu vẫn lỗi, chờ 2 giây (1.0 * 2.0) rồi thử lại.
4. Nếu vẫn lỗi, chờ 4 giây rồi thử lại.
5. Sau số lần thử tối đa (ví dụ 3 lần) mà vẫn thất bại thì mới báo lỗi thực sự hoặc đẩy vào hàng đợi xử lý sau.
