---
area: technology
domain: system-design
topic: microservices
type: resource
---
# Outbox Pattern

## Tổng quan

Outbox Pattern là một mẫu thiết kế giúp giải quyết vấn đề **dual writes** trong kiến trúc microservices, đảm bảo tính nhất quán dữ liệu khi cần vừa cập nhật database vừa gửi event đến message broker (như Apache Kafka).

## Vấn đề Dual Writes

### Vấn đề

- Microservices thường cần:
  - Cập nhật database của chính service đó
  - Gửi event/message đến message broker (Kafka, RabbitMQ) để thông báo cho các service khác
- **Vấn đề**: Không thể có một transaction chung (XA transaction) giữa database và message broker
- **Hệ quả**: Có thể xảy ra tình huống:
  - Ghi thành công vào DB nhưng gửi message thất bại → Service khác không biết về thay đổi
  - Gửi message thành công nhưng ghi DB thất bại → Service khác nhận event nhưng dữ liệu không tồn tại

### Giải pháp thay thế không tối ưu

- **Chỉ ghi vào Kafka**: Service không có "read your own writes" semantics, phải đợi event được consume mới thấy dữ liệu
- **Chỉ ghi vào DB**: Không thể thông báo cho các service khác một cách đáng tin cậy

## Outbox Pattern - Giải pháp

### Nguyên lý

- **Chỉ ghi vào một resource duy nhất**: Database
- **Đảm bảo tính nhất quán**: Sử dụng transaction ACID của database
- **Phát tán event bất đồng bộ**: Dùng Change Data Capture (CDC) để đọc thay đổi từ database và gửi đến message broker

### Cách hoạt động

1. **Bước 1 - Ghi vào Database trong transaction**:
   - Service ghi dữ liệu vào bảng chính (ví dụ: `purchaseorder`, `orderline`)
   - **Đồng thời** ghi event vào bảng `outbox` trong cùng một transaction
   - Đảm bảo tính ACID: hoặc cả hai đều thành công, hoặc cả hai đều rollback

2. **Bước 2 - Capture và phát tán event**:
   - Debezium (hoặc công cụ CDC khác) theo dõi bảng `outbox`
   - Khi có record mới trong `outbox`, Debezium capture và gửi đến Kafka topic tương ứng
   - Sau khi gửi thành công, có thể đánh dấu record trong `outbox` là đã xử lý (hoặc xóa)

### Cấu trúc bảng Outbox

- **id**: UUID duy nhất cho mỗi event
- **aggregatetype**: Loại aggregate (ví dụ: "Order")
- **aggregateid**: ID của aggregate
- **eventtype**: Loại event (ví dụ: "OrderCreated", "OrderLineUpdated")
- **payload**: Nội dung event dưới dạng JSON
- **timestamp**: Thời gian tạo event

### Lợi ích

- **Tính nhất quán**: Đảm bảo dữ liệu và event luôn đồng bộ nhờ transaction ACID
- **Read your own writes**: Service có thể đọc ngay dữ liệu vừa ghi, không cần đợi event
- **Khả năng chịu lỗi**: Nếu Kafka down, events vẫn được lưu trong `outbox` và sẽ được gửi sau khi Kafka phục hồi
- **Replayability**: Có thể replay toàn bộ event stream từ đầu cho consumer mới
- **Decoupling**: Service không cần biết về các consumer, chỉ cần ghi vào `outbox`
- **Khả năng mở rộng**: Dễ dàng thêm consumer mới mà không cần sửa code của producer

## Xử lý Duplicate Events

### Vấn đề

- Message broker thường có "at least once" semantics
- Có thể xảy ra duplicate processing nếu:
  - Debezium connector fail trước khi acknowledge
  - Consumer service fail trước khi acknowledge

### Giải pháp

- **Message Log**: Consumer service lưu UUID của các event đã xử lý vào bảng `consumed_messages`
- **Idempotency check**: Trước khi xử lý event, kiểm tra xem UUID đã được xử lý chưa
- **Transaction**: Đánh dấu event đã xử lý trong cùng transaction với business logic

### Best Practices

- **Retry mechanism**: Chỉ retry một số lần nhất định trước khi đưa vào dead-letter queue
- **Housekeeping**: Xóa các event cũ trong message log (sau khi offset đã được commit với broker)
- **Event structure**: Cấu trúc event nên được coi là API của service, cần versioning và backward compatibility

## Eventual Consistency

- Hệ thống sử dụng Outbox Pattern là **eventually consistent**
- Consumer có thể lag một chút so với producer (thường vài giây hoặc sub-second)
- Điều này thường chấp nhận được trong hầu hết use cases
- End-to-end delay thấp nhờ log-based CDC (near-realtime)

## Công cụ hỗ trợ

- **Debezium**: Change Data Capture platform, hỗ trợ nhiều database (PostgreSQL, MySQL, MongoDB, etc.)
- **Kafka Connect**: Framework để kết nối Debezium với Kafka
- **Debezium SMT (Single Message Transform)**: Có sẵn SMT để routing outbox events (không cần custom SMT như trong bài viết gốc)

## Use Cases

- **Order Service → Shipment Service**: Khi có order mới, thông báo cho shipment service
- **Order Service → Customer Service**: Cập nhật credit balance của customer
- **Data Warehouse**: Lưu trữ toàn bộ lịch sử orders
- **Search Index**: Cập nhật Elasticsearch index khi có order mới

## Tài liệu tham khảo

- Nguồn: https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/
- Debezium Documentation: https://debezium.io/documentation/