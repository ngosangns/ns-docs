# Mẫu thiết kế CQRS (Command Query Responsibility Segregation)

CQRS (Phân tách trách nhiệm Lệnh và Truy vấn) là một mẫu thiết kế giúp tách biệt các thao tác đọc (read) và ghi (write) dữ liệu vào các mô hình dữ liệu riêng biệt. Cách tiếp cận này cho phép mỗi mô hình được tối ưu hóa độc lập, từ đó cải thiện hiệu suất, khả năng mở rộng và bảo mật của ứng dụng.

## 1. Ngữ cảnh và Vấn đề
Trong các kiến trúc truyền thống (như CRUD), một mô hình dữ liệu duy nhất thường được dùng cho cả đọc và ghi. Khi ứng dụng phát triển, cách tiếp cận này gặp các thách thức:
- **Bất đối xứng dữ liệu:** Các trường dữ liệu cần để cập nhật thường khác với các trường cần để hiển thị.
- **Tranh chấp khóa (Lock contention):** Các thao tác đọc/ghi đồng thời trên cùng một bộ dữ liệu gây ra xung đột và giảm hiệu năng.
- **Hiệu năng:** Khó tối ưu hóa đồng thời cho cả ghi (cần chuẩn hóa dữ liệu để đảm bảo tính toàn vẹn) và đọc (cần denormalize để truy vấn nhanh).
- **Bảo mật:** Khó quản lý quyền hạn khi một thực thể vừa cho phép đọc vừa cho phép ghi.

## 2. Giải pháp (CQRS)
Tách biệt hệ thống thành hai phần:
- **Lệnh (Commands):** Các thao tác làm thay đổi trạng thái dữ liệu (Create, Update, Delete). Lệnh tập trung vào các tác vụ nghiệp vụ (ví dụ: "Đặt phòng khách sạn" thay vì "Cập nhật trạng thái phòng = Đã đặt").
- **Truy vấn (Queries):** Các thao tác đọc dữ liệu. Truy vấn không bao giờ thay đổi dữ liệu và thường trả về các DTO (Data Transfer Objects) được tối ưu cho giao diện người dùng.

### Các cấp độ triển khai:
1. **Tách biệt logic (Single Data Store):** Sử dụng chung một cơ sở dữ liệu nhưng tách biệt mã nguồn xử lý đọc và ghi.
2. **Tách biệt cơ sở dữ liệu (Separate Data Stores):** Sử dụng các cơ sở dữ liệu riêng biệt cho đọc và ghi (ví dụ: SQL cho ghi để đảm bảo quan hệ, NoSQL cho đọc để truy vấn nhanh). Cần một cơ chế đồng bộ hóa (thường là qua Event-driven) giữa hai kho dữ liệu này.

## 3. Lợi ích
- **Mở rộng độc lập:** Có thể scale riêng phần đọc (thường có tải cao hơn) mà không cần scale phần ghi.
- **Tối ưu hóa Schema:** DB đọc có thể lưu dữ liệu dưới dạng đã gộp (Materialized Views) để tránh các phép Join phức tạp.
- **Bảo mật tốt hơn:** Dễ dàng kiểm soát ai có quyền thay đổi dữ liệu và ai chỉ có quyền xem.
- **Tách biệt mối quan tâm (Separation of Concerns):** Giúp mã nguồn sạch hơn, phía ghi tập trung vào logic nghiệp vụ phức tạp, phía đọc tập trung vào hiệu suất hiển thị.

## 4. Các vấn đề và Cân nhắc
- **Độ phức tạp tăng cao:** Đòi hỏi kiến trúc phức tạp hơn và đội ngũ phát triển có kỹ năng tốt.
- **Nhất quán cuối cùng (Eventual Consistency):** Nếu dùng hai DB riêng, dữ liệu đọc có thể bị trễ một chút so với dữ liệu vừa ghi. Ứng dụng phải chấp nhận và xử lý được độ trễ này.
- **Xử lý thông điệp:** Thường cần đến Message Broker để đồng bộ dữ liệu, dẫn đến các vấn đề về lỗi tin nhắn, trùng lặp.

## 5. Khi nào nên sử dụng
- Các hệ thống có tải đọc rất cao so với tải ghi.
- Các ứng dụng có logic nghiệp vụ phức tạp, cần bảo vệ tính toàn vẹn dữ liệu nghiêm ngặt ở phía ghi.
- Môi trường làm việc nhóm lớn, nơi các nhóm có thể làm việc độc lập trên phần đọc và phần ghi.
- Khi tích hợp với mẫu thiết kế **Event Sourcing**.

## 6. Khi nào KHÔNG nên sử dụng
- Các ứng dụng đơn giản hoặc các hệ thống quản lý kiểu CRUD thuần túy.
- Khi logic nghiệp vụ không quá phức tạp và hiệu năng DB hiện tại vẫn đáp ứng tốt.

---
*Nguồn: [Azure Architecture Center - CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)*
