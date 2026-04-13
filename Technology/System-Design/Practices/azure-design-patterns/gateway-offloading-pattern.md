---
area: technology
domain: system-design
type: note
---
# Mẫu thiết kế Gateway Offloading (Đẩy tải sang cổng)

Mẫu thiết kế Gateway Offloading giúp đẩy các chức năng dịch vụ chung hoặc chuyên biệt sang một proxy cổng (gateway proxy). Điều này giúp đơn giản hóa việc phát triển ứng dụng bằng cách di chuyển các chức năng dùng chung—như quản lý chứng chỉ SSL, xác thực—từ các phần khác của ứng dụng vào gateway.

## 1. Ngữ cảnh và Vấn đề
Nhiều tính năng thường được sử dụng lặp đi lặp lại trên nhiều dịch vụ khác nhau, đòi hỏi việc cấu hình, quản lý và bảo trì riêng biệt cho từng nơi:
- **Gánh nặng quản trị:** Việc triển khai các tính năng chung (như SSL, xác thực) cùng với mọi dịch vụ làm tăng chi phí quản lý và tăng khả năng xảy ra lỗi triển khai.
- **Kỹ năng chuyên môn:** Việc xử lý các vấn đề bảo mật phức tạp (xác thực token, mã hóa, quản lý chứng chỉ SSL) đòi hỏi đội ngũ có kỹ năng chuyên sâu.
- **Cập nhật khó khăn:** Bất kỳ thay đổi nào đối với tính năng dùng chung đều phải được triển khai lại trên tất cả các dịch vụ đang chia sẻ tính năng đó.

## 2. Giải pháp
Đẩy các tính năng xuyên suốt (cross-cutting concerns) vào một gateway. Các tính năng thường được đẩy tải bao gồm:
- Quản lý chứng chỉ và kết thúc SSL (SSL Termination).
- Xác thực (Authentication) và Ủy quyền (Authorization).
- Giới hạn tốc độ (Throttling/Rate Limiting).
- Ghi nhật ký (Logging) và Giám sát (Monitoring) tập trung.
- Chuyển đổi giao thức (Protocol translation).
- Nén dữ liệu.

## 3. Lợi ích
- **Đơn giản hóa phát triển:** Loại bỏ nhu cầu phân phối và bảo trì các tài nguyên hỗ trợ (như chứng chỉ web server) ở từng microservice.
- **Tập trung chuyên môn:** Cho phép các đội ngũ chuyên trách (ví dụ đội bảo mật) tập trung vào việc triển khai và tối ưu các tính năng chuyên biệt tại gateway, giúp đội phát triển cốt lõi tập trung vào logic nghiệp vụ.
- **Tính nhất quán:** Đảm bảo mức độ giám sát và ghi nhật ký tối thiểu đồng nhất cho tất cả các yêu cầu, ngay cả khi một dịch vụ cụ thể chưa được cài đặt instrumentation đầy đủ.

## 4. Các vấn đề và Cân nhắc
- **Tính sẵn sàng cao:** Gateway trở thành thành phần trọng yếu. Phải chạy nhiều instance để tránh điểm gây lỗi duy nhất (SPOF).
- **Hiệu năng:** Đảm bảo gateway được thiết kế đủ khả năng xử lý và mở rộng để không trở thành điểm nghẽn của hệ thống.
- **Phạm vi:** Chỉ nên đẩy tải các tính năng được sử dụng bởi toàn bộ ứng dụng. **Không bao giờ đưa logic nghiệp vụ (business logic) vào gateway.**
- **Truy vết:** Cần sử dụng mã tương quan (Correlation ID) để theo dõi các giao dịch qua nhiều lớp.

## 5. Khi nào nên sử dụng
- Khi nhiều dịch vụ chia sẻ các mối quan tâm chung như chứng chỉ SSL hoặc mã hóa.
- Khi các tính năng chung đòi hỏi tài nguyên khác biệt (như nhiều bộ nhớ hoặc CPU hơn) so với logic ứng dụng chính.
- Khi bạn muốn chuyển trách nhiệm về bảo mật mạng và ranh giới mạng cho một đội ngũ chuyên gia riêng.

## 6. Khi nào KHÔNG nên sử dụng
- Nếu việc đẩy tải tạo ra sự phụ thuộc quá chặt chẽ (coupling) giữa các dịch vụ.
- Khi ứng dụng chỉ có quy mô nhỏ và việc thêm gateway làm tăng độ phức tạp không cần thiết.

## 7. Ví dụ trên Azure
- **Azure Application Gateway:** Hỗ trợ kết thúc SSL (SSL Termination), giúp các dịch vụ backend bên trong chỉ cần xử lý HTTP thông thường để tiết kiệm CPU.
- **Azure API Management:** Cung cấp đầy đủ các tính năng offloading như xác thực JWT, giới hạn tốc độ (Rate limit), và caching.
- **Azure Front Door:** Đẩy tải các nhiệm vụ bảo mật tại biên (edge) như chống DDoS và WAF.

---
*Nguồn: [Azure Architecture Center - Gateway Offloading pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-offloading)*
