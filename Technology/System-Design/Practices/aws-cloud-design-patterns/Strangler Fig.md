---
area: technology
domain: system-design
type: note
title: Strangler Fig
description: 'Pattern: Strangler Fig (Cây bóp nghẹt)'
timestamp: '2026-06-19T13:43:26.125Z'
tags:
  - technology
  - system-design
---
# Pattern: Strangler Fig (Cây bóp nghẹt)

Pattern Strangler Fig giúp chuyển đổi một ứng dụng Monolithic (nguyên khối) sang kiến trúc Microservices một cách dần dần, giúp giảm thiểu rủi ro và gián đoạn kinh doanh so với việc thay thế toàn bộ hệ thống cùng một lúc (Big Bang migration).

### Ý tưởng cốt lõi:
Lấy cảm hứng từ loại cây bóp nghẹt trong tự nhiên (mọc bao quanh một cây chủ và dần thay thế nó), pattern này thực hiện việc trích xuất từng tính năng của khối Monolith ra thành các dịch vụ nhỏ (microservices). Theo thời gian, hệ thống mới sẽ bao quanh và thay thế hoàn toàn hệ thống cũ.

### Các thành phần quan trọng:
- **Proxy Layer (Lớp Proxy)**: Nằm giữa người dùng và hệ thống, có nhiệm vụ điều hướng yêu cầu. Nếu tính năng đã được chuyển sang microservice, proxy sẽ gọi dịch vụ mới; nếu chưa, nó vẫn gọi khối Monolith cũ.
- **Anti-Corruption Layer (ACL - Lớp chống tham nhũng)**: Khi các thành phần trong Monolith cần gọi các dịch vụ đã được tách ra, ACL đóng vai trò như một bộ chuyển đổi (adapter) để đảm bảo sự tương thích và không làm hỏng logic cũ.
- **Data Synchronization (Đồng bộ dữ liệu)**: Đảm bảo dữ liệu giữa cơ sở dữ liệu của Monolith và của Microservice luôn nhất quán trong suốt quá trình chuyển đổi.

### Trường hợp áp dụng:
- Khi muốn di chuyển ứng dụng lớn, phức tạp mà không thể dừng hoạt động để viết lại từ đầu.
- Khi rủi ro của việc thay thế toàn bộ là quá lớn.
- Khi doanh nghiệp cần thêm tính năng mới ngay cả trong quá trình chuyển đổi kiến trúc.
- Khi cần giảm thiểu tác động đến người dùng cuối.

### Triển khai trên AWS:
- **Amazon API Gateway**: Đóng vai trò là lớp Proxy mạnh mẽ, hỗ trợ định tuyến theo đường dẫn (Path-based routing) để chuyển hướng lưu lượng.
- **AWS Lambda**: Thường được dùng để triển khai các dịch vụ nhỏ được tách ra từ Monolith.
- **AWS Migration Hub Refactor Spaces**: Tự động hóa việc tạo hạ tầng định tuyến và quản lý việc chuyển đổi giữa nhiều tài khoản AWS.
- **Polyglot Persistence**: Cho phép mỗi microservice sử dụng loại database phù hợp nhất (DynamoDB cho dữ liệu key-value, Aurora cho quan hệ, ElastiCache cho cache).

### Lợi ích:
- **Giảm rủi ro**: Có thể quay lại trạng thái cũ dễ dàng nếu một bước chuyển đổi gặp lỗi.
- **Phát hành liên tục**: Người dùng có thể sử dụng các tính năng mới ngay khi chúng được tách ra.
- **Độc lập về đội ngũ**: Các đội có thể bắt đầu sở hữu và vận hành các microservices mới một cách độc lập.

### Thách thức:
- **Quản lý dữ liệu**: Việc đồng bộ dữ liệu giữa hệ thống cũ và mới có thể rất phức tạp.
- **Độ phức tạp hạ tầng**: Yêu cầu quản lý lớp proxy và các thành phần trung gian (ACL).
- **Phụ thuộc**: Cần hiểu rõ ranh giới domain (DDD) để tránh tách dịch vụ sai cách gây ra sự phụ thuộc chéo.
