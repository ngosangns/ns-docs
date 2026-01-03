---
tags:
  - area/technology
  - domain/backend
  - topic/kafka
  - type/resource
  - lang/vi
---

# Kafka

## Tổng quan

- Apache Kafka là nền tảng xử lý luồng dữ liệu phân tán, được phát triển bởi LinkedIn và sau đó trở thành dự án mã nguồn mở của Apache
- Mục tiêu: Thu thập, lưu trữ và xử lý luồng dữ liệu theo thời gian thực với hiệu suất cao và khả năng mở rộng

## Ứng dụng thực tế

- Thu thập và phân tích log theo thời gian thực
- Xây dựng pipeline xử lý dữ liệu từ các nguồn sự kiện như clickstream, giao dịch, cảm biến IoT
- Hệ thống thông báo giữa các microservices, đảm bảo truyền tải thông điệp tin cậy
- Kết nối và đồng bộ dữ liệu giữa các hệ thống, ví dụ từ cơ sở dữ liệu đến kho dữ liệu lớn

## Kiến trúc và thành phần chính

- **Producer**: Gửi tin nhắn vào Kafka
- **Broker**: Máy chủ lưu trữ và xử lý tin nhắn
- **Topic**: Danh mục chứa tin nhắn (như "hộp thư")
- **Partition**: Chia nhỏ topic để xử lý song song, tăng hiệu suất
- **Consumer**: Đọc tin nhắn từ topic
- **Consumer Group**: Nhóm consumer chia sẻ việc đọc tin nhắn, đảm bảo mỗi tin nhắn chỉ được xử lý một lần

## Cấu hình và quản lý

- **Broker**: Thiết lập thời gian giữ tin nhắn, số lượng partition mặc định
- **Producer**: Cấu hình xác nhận gửi tin (acknowledgment), số lần thử lại khi lỗi, nén dữ liệu
- **Consumer**: Cấu hình đọc từ đầu, quản lý nhóm, offset management
- **Replication & ISR (In-Sync Replicas)**: Đảm bảo bản sao đồng bộ với leader, tăng độ tin cậy và khả năng chịu lỗi
- **Retention**: Giữ tin nhắn trong khoảng thời gian hoặc dung lượng nhất định
- **Zookeeper vs KRaft**: Chuyển từ Zookeeper sang KRaft để tự quản lý metadata, giảm phụ thuộc vào Zookeeper

## Xử lý luồng dữ liệu và ứng dụng

- **Kafka Streams**: Thư viện xử lý luồng dữ liệu trong Kafka, hỗ trợ các thao tác như lọc, gộp, phân tích real-time
- **Kafka Connect**: Framework tích hợp dữ liệu giữa Kafka và các hệ thống khác, hỗ trợ source và sink connectors

## Ứng dụng trong kiến trúc microservices

- Giao tiếp bất đồng bộ giữa các microservices
- Xây dựng pipeline dữ liệu giữa các dịch vụ
- Đảm bảo tính nhất quán và tin cậy trong truyền tải thông điệp
- Event-driven architecture: Các service giao tiếp thông qua events thay vì direct calls

## Tối ưu hóa hiệu suất và Best Practices

### Tăng tốc độ xử lý tin nhắn

- **Chia topic thành nhiều partition**: Cho phép xử lý song song, tăng tốc độ xử lý đáng kể
- **Sử dụng Consumer Group**: Nhóm nhiều consumer để xử lý song song các partition khác nhau
- **Cân bằng tải**: Đảm bảo số lượng partition phù hợp với số lượng consumer trong group

### Đảm bảo thứ tự xử lý

- **Sử dụng key để phân phối**: Khi cần xử lý các thao tác trên cùng một đối tượng theo thứ tự nghiêm ngặt, producer cần đảm bảo các yêu cầu thao tác trên cùng một đối tượng được phân phối đến cùng một partition bằng cách sử dụng key phù hợp (ví dụ: ID đơn hàng)
- **Partition key strategy**: Chọn key phù hợp để đảm bảo các message liên quan đến cùng một entity được xử lý tuần tự

### Xử lý tình huống phức tạp

- **Consumer xử lý chậm**: Khi consumer xử lý chậm và số lượng yêu cầu thao tác cho mỗi đối tượng có sự chênh lệch lớn, cần xem xét:
  - Xử lý bất đồng bộ: Tách các thao tác nặng ra khỏi luồng xử lý chính
  - Thêm các lớp caching phù hợp: Cache kết quả xử lý để giảm tải cho consumer
  - Tối ưu hóa logic xử lý: Cải thiện hiệu suất của consumer
- **Đảm bảo tính nhất quán**: Trong môi trường hệ thống cũ với hạn chế thay đổi, cần cân nhắc các giải pháp không làm thay đổi logic nghiệp vụ và kiến trúc tổng thể

## Libraries & Tools

### retry-kafka

- **GitHub**: [retry-kafka](https://github.com/tuanuet/retry-kafka)
- **Mô tả**: Library Go linh hoạt, độ tin cậy cao cho message processing, hỗ trợ retry tự động và Dead Letter Queue (DLQ)
- **Đặc điểm chính**:
  - Unified producer và consumer interfaces
  - Hỗ trợ cả Kafka và Redis Streams backends
  - Retry mechanism với backoff tăng dần (configurable)
  - Dead Letter Queue (DLQ) cho messages không xử lý được sau nhiều lần retry
  - Batch consume support
  - Custom marshaller (JSON, protobuf, etc.)
  - Nhiều options để cấu hình (async, partition, batch flush, retry options, etc.)
- **Kiến trúc Retry & DLQ**:
  - Main Queue → Consumer
  - Nếu fail → Retry Queue(s) với delay tăng dần (10s, 1m, 5m...)
  - Nếu vẫn fail sau max retries → DLQ
- **Lợi ích**:
  - Không mất dữ liệu do lỗi tạm thời
  - Có thể phân tích nguyên nhân lỗi qua DLQ
  - Cấu hình linh hoạt số lần retry và khoảng thời gian retry
- **Khi nào dùng Redis vs Kafka**:
  - Kafka: High throughput, guaranteed ordering, high distribution, long-term storage
  - Redis: Small systems, low latency, hoặc đã có Redis sẵn
- **Cài đặt**: `go get github.com/tuanuet/retry-kafka/v2`
- **Version**: v2.1.2 (latest, từ 2025-04-24)

## Change Data Capture (CDC) với Apache Kafka & Debezium

### Tổng quan về CDC

- **Change Data Capture (CDC)**: Công nghệ bắt và phát tán các thay đổi dữ liệu từ database với độ trễ thấp
- **Debezium**: Công cụ open-source cho CDC, được phát triển bởi Red Hat
- **Vai trò**: Giải phóng dữ liệu khỏi database, cho phép phản ứng với thay đổi dữ liệu theo thời gian thực

### Use Cases chính

#### 1. Microservices Integration

- **Outbox Pattern**: Đảm bảo tính nhất quán giữa database và message broker
  - Ghi dữ liệu vào bảng chính và bảng outbox trong cùng transaction
  - Debezium đọc từ bảng outbox và gửi message đến Kafka
  - Tránh dual writes (ghi đôi) - nguyên nhân chính gây inconsistency
- **Strangler Pattern**: Tích hợp microservices với hệ thống monolith hiện có
  - Sử dụng CDC để đồng bộ dữ liệu từ monolith sang microservices
  - Anti-corruption layer: Chuyển đổi format dữ liệu cũ sang format mới

#### 2. Audit Logging

- Tự động ghi lại mọi thay đổi dữ liệu trong database
- Không cần thay đổi application code
- Tạo audit trail hoàn chỉnh cho compliance và debugging

#### 3. Streaming Queries

- Xử lý và phân tích dữ liệu theo thời gian thực
- Cập nhật read models từ write model (CQRS pattern)
- Đồng bộ nhiều read models với write model

#### 4. Data Replication

- Đồng bộ dữ liệu giữa các database
- Replication từ production sang staging/development
- Backup và disaster recovery

### Best Practices cho Production

#### Deployment trên Kubernetes

- Sử dụng Kafka Connect operators để quản lý connectors
- Tách biệt connector instances cho từng database/tenant
- Sử dụng ConfigMaps và Secrets cho cấu hình
- Template-based deployment: Sử dụng biến môi trường cho tenant ID, server name

#### Deployment ngoài Kubernetes

- Quản lý connector configurations qua REST API
- Sử dụng configuration templates với external variables
- Deploy nhiều connector configurations tương tự nhau

#### Monitoring và Observability

- Theo dõi connector status và lag
- Alert khi connector bị lỗi hoặc lag quá cao
- Metrics về throughput và latency

### Single Message Transformations (SMT)

**Khái niệm**: Công cụ để modify messages trước khi gửi vào Kafka hoặc sau khi lấy ra từ Kafka

**Use Cases**:

- **Format conversion**: Chuyển đổi format date/time, đổi kiểu dữ liệu
- **Message routing**: Route messages đến các topic khác nhau dựa trên column value (outbox routing)
- **Compatibility**: Giữ backward compatibility khi refactor
  - Rename fields
  - Remove fields
  - Change types
  - Implement anti-corruption layer cho strangler pattern
- **Externalize large data (Claim Check Pattern)**:
  - Với columns lớn (binary data, images): Không gửi trực tiếp vào Kafka
  - SMT externalize data: Ghi binary vào external storage (S3, etc.)
  - Trong Kafka message chỉ giữ placeholder (bucket ID, identifier)
  - Consumer có thể retrieve binary data từ external storage sau

### Lợi ích của CDC

- **Low latency**: Phản ứng với thay đổi dữ liệu gần như real-time
- **Liberation for data**: Dữ liệu không bị "nhốt" trong database
- **No application changes**: Không cần thay đổi code application để implement CDC
- **Reliable**: Đảm bảo không mất dữ liệu, exactly-once semantics
- **Scalable**: Có thể scale để xử lý high-throughput

### Takeaways quan trọng

- **"Friends don't let friends do dual writes"**: Tránh dual writes - nguyên nhân chính gây data inconsistency
- **Data là aspect quan trọng**: Không quên nghĩ về data khi thiết kế microservices
- **CDC là powerful tool**: Có nhiều use cases ngoài replication
- **Debezium là production-ready**: Đã được sử dụng rộng rãi trong production

### Resources

- [Practical Change Data Streaming Use Cases with Apache Kafka & Debezium](https://www.infoq.com/presentations/data-streaming-kafka-debezium/) - Presentation by Gunnar Morling (Red Hat, Debezium lead)
- [Debezium Website](https://debezium.io/)
- [Debezium Blog](https://debezium.io/blog/) - Các bài viết về auditing, outbox pattern, etc.

## Resources

- [Kafka Fundamental](https://viblo.asia/s/kafka-fundamental-aNj4vplxL6r)
- [Kafka design patterns](https://viblo.asia/p/chinh-phuc-kafka-design-patterns-E1XVORYNLMz)
- [Ôn lại kiến thức về Apache Kafka](https://hxd.vn/on-lai-mo-kien-thuc-bi-lang-quen-apache-kafka)
- [Kafka: Hướng dẫn phỏng vấn dưới góc nhìn của một DEV chuẩn bị layoff (phần 2)](https://anonystick.com/blog-developer/kafka-huong-dan-phong-van-duoi-goc-nhin-cua-mot-dev-chuan-bi-layoff-phan-2-2025010752691983) #interview #best-practices
