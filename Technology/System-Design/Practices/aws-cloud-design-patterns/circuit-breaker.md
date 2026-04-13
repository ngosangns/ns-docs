---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Pattern: Circuit Breaker (Ngắt mạch)

Pattern này ngăn chặn một dịch vụ gọi (caller) thử lại việc gọi đến một dịch vụ khác (callee) khi dịch vụ đó đang gặp sự cố lặp đi lặp lại hoặc phản hồi chậm. Nó cũng giúp phát hiện khi nào dịch vụ callee hoạt động trở lại.

### Ý tưởng cốt lõi:
Hoạt động giống như một cầu dao điện tự động ngắt dòng điện khi có sự cố. Đối tượng Circuit Breaker nằm giữa caller và callee, nó sẽ "ngắt" (trip) nếu callee không khả dụng, giúp hệ thống không bị treo hoặc cạn kiệt tài nguyên do chờ đợi vô ích.

### Ba trạng thái chính:
- **CLOSED (Đóng)**: Mạch đóng, các yêu cầu được chuyển đến callee bình thường.
- **OPEN (Mở)**: Mạch hở, các yêu cầu bị chặn lại và trả về lỗi ngay lập tức (fail fast) mà không gọi đến callee.
- **HALF-OPEN (Nửa mở)**: Sau một khoảng thời gian, hệ thống cho phép một số lượng nhỏ yêu cầu đi qua để kiểm tra xem callee đã phục hồi chưa. Nếu thành công, mạch đóng lại (CLOSED); nếu tiếp tục lỗi, mạch mở ra (OPEN).

### Trường hợp áp dụng:
- Khi caller thực hiện cuộc gọi có khả năng cao sẽ thất bại.
- Khi callee phản hồi rất chậm gây ra tình trạng timeout cho caller.
- Khi các cuộc gọi là đồng bộ (synchronous) và callee không khả dụng.

### Ưu điểm:
- **Ngăn chặn lỗi lan truyền (Cascading failures)**: Bảo vệ hệ thống khỏi việc sụp đổ dây chuyền.
- **Tiết kiệm tài nguyên**: Tránh lãng phí thread pool, bộ nhớ và băng thông cho các yêu cầu chắc chắn thất bại.
- **Cải thiện trải nghiệm người dùng**: Trả về lỗi nhanh hơn thay vì để người dùng chờ đợi timeout.

### Triển khai trên AWS:
- **AWS Step Functions**: Sử dụng "Express Workflows" để quản lý trạng thái và logic kiểm tra mạch.
- **Amazon DynamoDB**: Lưu trữ trạng thái của mạch (Circuit Status) và thời gian hết hạn (ExpiryTimeStamp). Có thể dùng tính năng TTL của DynamoDB để tự động xóa các bản ghi đã hết hạn.
- **Amazon ElastiCache**: Có thể thay thế DynamoDB để lưu trạng thái mạch trong bộ nhớ nhằm tăng hiệu suất.
- **Lambda Functions**: Thực hiện logic gọi dịch vụ và cập nhật trạng thái mạch khi có lỗi.

### Lưu ý:
- **Tính năng quan sát (Observability)**: Cần log lại các cuộc gọi thất bại khi mạch đang OPEN để theo dõi.
- **Khả năng can thiệp thủ công**: Quản trị viên nên có quyền ép buộc Đóng hoặc Mở mạch khi cần thiết.
