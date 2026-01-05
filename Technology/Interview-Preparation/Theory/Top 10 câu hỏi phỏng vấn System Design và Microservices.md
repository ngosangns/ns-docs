---
tags:
  - area/technology
  - domain/interview
  - topic/interview
  - type/resource
  - lang/vi
---

# Top 10 câu hỏi phỏng vấn System Design và Microservices

**Lưu ý**: Câu hỏi và gợi ý chỉ mang tính tham khảo, nên tự xây dựng câu trả lời hoàn chỉnh

## System Design

### Định lý CAP

- **Trình bày**: Tham khảo video YouTube
- **Lưu ý**: Tìm hiểu sự khác nhau giữa Consistency trong CAP và Consistency trong ACID

### Query chậm với bảng lớn

- **Xử lý**: Làm rõ ý nghĩa dữ liệu và độ lớn bảng
- **Trình bày**: Từ đơn giản đến phức tạp

### Thiết kế hệ thống TinyURL

- **Câu hỏi phổ biến**: Tính phân hoá cao
- **Vấn đề cần làm rõ**:
  - Độ dài của short URL
  - Yêu cầu check trùng (cùng URL nhiều lần có trả về cùng short URL không?)
  - DB nào sử dụng?
  - Xử lý collision như nào?

## Microservice

### So sánh Monolithic và Microservices

- **Gợi ý**: Nêu yếu tố ảnh hưởng tới từng ưu nhược điểm

### Tại sao chia service như này?

- **Câu hỏi khó**: Nhiều bạn đề cập Domain-Driven Design
- **Lưu ý**: Cần nắm rõ nghiệp vụ và cách model business

### Service X bị down trong quá trình xử lý Order

- **Xử lý**: Đảm bảo order được thực thi tiếp khi service X sống lại
- **Gợi ý**: Sử dụng message queue có khả năng persist message

### Service A cần dữ liệu user của Service B (schema khác)

- **Xử lý**: Dựa vào yêu cầu tính nhất quán và tính đúng đắn dữ liệu
- **Giải pháp**: Adapter layer hoặc đồng bộ dữ liệu từ B sang A
- **Lưu ý**: Kiểm tra dữ liệu thực tế trên prod và nonprod, không dựa hoàn toàn vào tài liệu

### Frontend gửi request order qua API Gateway

- **Luồng**: Frontend → API Gateway → Service A → Message Queue → Service B
- **Vấn đề**: Làm sao trả lại response cho frontend?
- **Gợi ý**: Nhiều cách, đánh giá hiệu năng và khả năng mở rộng

### Response time p(95) cao

- **Nguyên nhân**: Review lại thiết kế luồng, đặc biệt điểm giao tiếp với third party
- **Quy trình**: Sử dụng monitor và distributed tracing để xác định issue
- **Giải pháp**: Tối ưu code, query, cấp thêm tài nguyên cho service

## Khác

### Vấn đề kỹ thuật khó gặp phải

- **Câu hỏi hay gặp**: Cần chuẩn bị kỹ
- **Gợi ý**: Chọn và chuẩn bị kỹ 3 vấn đề khó nhất
- **Lưu ý**: Độ phức tạp tương xứng với level hiện tại hoặc level hướng tới
