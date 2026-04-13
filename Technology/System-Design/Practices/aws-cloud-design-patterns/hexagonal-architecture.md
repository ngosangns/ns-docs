---
area: technology
domain: system-design
type: note
---
# Pattern: Hexagonal Architecture (Kiến trúc Lục giác)

Kiến trúc Lục giác, còn được gọi là pattern **Ports and Adapters** (Cổng và Bộ chuyển đổi), được thiết kế để tạo ra các kiến trúc có tính liên kết lỏng lẻo (loosely coupled). Nó cho phép các thành phần ứng dụng được kiểm thử độc lập mà không phụ thuộc vào kho lưu trữ dữ liệu hoặc giao diện người dùng (UI).

### Thành phần chính:
- **Core (Business Logic)**: Nằm ở trung tâm, chứa các quy tắc nghiệp vụ cốt lõi (Domain logic). Nó không biết gì về thế giới bên ngoài (database, web, v.v.).
- **Ports (Cổng)**: Là các giao diện (interfaces) không phụ thuộc vào công nghệ. Đây là điểm vào hoặc điểm ra của ứng dụng.
- **Adapters (Bộ chuyển đổi)**: Các thành phần triển khai cụ thể cho một công nghệ nào đó. Ví dụ: một REST adapter để nhận yêu cầu từ web, hoặc một DynamoDB adapter để lưu dữ liệu.

### Ưu điểm:
- **Tính kiểm thử cao (Testability)**: Dễ dàng viết unit test cho logic nghiệp vụ bằng cách sử dụng các đối tượng giả (mock) cho các cổng mà không cần chạy toàn bộ hạ tầng.
- **Linh hoạt và không phụ thuộc công nghệ**: Bạn có thể thay đổi cơ sở dữ liệu (ví dụ từ MySQL sang DynamoDB) hoặc đổi giao diện (từ REST sang GraphQL) mà không cần sửa đổi logic nghiệp vụ.
- **Giảm nợ kỹ thuật**: Giúp hệ thống dễ bảo trì và mở rộng theo thời gian.

### Triển khai trên AWS Lambda:
Trong môi trường Serverless như AWS Lambda, người ta thường có xu hướng viết logic nghiệp vụ và mã kết nối database trong cùng một hàm. Áp dụng kiến trúc này giúp:
- **Domain Model**: Tạo các class chỉ chứa logic nghiệp vụ (ví dụ: kiểm tra trùng lịch đặt chỗ).
- **Input Port**: Một interface điều phối việc thực hiện logic.
- **Adapter**: Một class cụ thể sử dụng `boto3` để tương tác với DynamoDB, được "cắm" vào cổng thông qua Dependency Injection.

### Khi nào nên áp dụng:
- Khi bạn muốn tách biệt hoàn toàn ứng dụng khỏi hạ tầng để dễ dàng kiểm thử.
- Khi cùng một logic nghiệp vụ được sử dụng bởi nhiều loại client khác nhau (Mobile, Web, CLI).
- Khi các thành phần hạ tầng (UI, Database) cần được cập nhật công nghệ thường xuyên.

### Thách thức:
- **Độ phức tạp**: Việc tách biệt mã nguồn yêu cầu nhiều lớp trung gian (adapters), có thể làm tăng khối lượng mã nguồn cần bảo trì.
- **Độ trễ (Latency)**: Việc đi qua nhiều lớp có thể gây ra một chút độ trễ nhỏ, dù thường không đáng kể.
