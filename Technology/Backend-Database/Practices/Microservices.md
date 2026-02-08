---
tags:
  - area/technology
  - domain/backend
  - topic/system-design
  - type/resource
  - lang/vi
---

# Microservices

## Khái niệm & Kiến trúc

- **Microservices**: [microservices.io](https://microservices.io/index.html)
- **SOA**: [AWS SOA](https://aws.amazon.com/vi/what-is/service-oriented-architecture)
- **12-Factor App**: [12factor.net](https://12factor.net)

## Xử lý dữ liệu

- **Batch vs Stream Processing**: [Viblo](https://viblo.asia/p/batch-processing-va-stream-processing-kham-pha-hai-phuong-phap-xu-ly-du-lieu-chu-luc-gwd43zXrVX9)
- **Apache Spark**: Framework tính toán cluster, xử lý dữ liệu lớn
  - Hỗ trợ: Batch và real-time, Scala/Java/Python/R, HDFS/S3
  - Thư viện: Spark SQL, Spark Streaming, MLlib, GraphX
  - [Tài liệu](https://viblo.asia/p/tim-hieu-ve-apache-spark-ByEZkQQW5Q0)

## API Gateway & Reverse Proxy

Xem chi tiết các công cụ: [[Backend-Tools#API Gateway & Reverse Proxy]]

## Service Communication

### Giao thức & Frameworks

- **HTTP RESTful**: Kiến trúc phổ biến nhất
- **RPC**: Xem chi tiết các framework: [[Backend-Tools#RPC Frameworks]]

### Message Broker & Queue

#### Phân loại Message Broker

- **Message Queues (Hàng đợi thông điệp)**:
  - Ví dụ: RabbitMQ, AWS SQS
  - Thích hợp: Xử lý thông điệp theo thứ tự (FIFO) hoặc đảm bảo mỗi thông điệp chỉ được xử lý bởi MỘT worker (point-to-point)
  - Use case: Hệ thống gửi email, thông báo
- **Message Streams (Luồng thông điệp)**:
  - Ví dụ: Apache Kafka, AWS Kinesis, Redis Streams
  - Thích hợp: Xử lý dữ liệu thời gian thực, phát broadcast thông điệp cho NHIỀU consumer
  - Use case: Phân tích dữ liệu lớn, log processing, streaming dữ liệu, tracking hành vi người dùng
- **Lưu ý**: Pub/Sub là mô hình giao tiếp, Message Broker là công cụ (middleware) giúp triển khai mô hình Pub/Sub

#### Công cụ cụ thể

Xem chi tiết các công cụ: [[Backend-Tools#Message Broker & Queue]]

### So sánh Message Queue vs RPC/REST

- **Message Queue**: Gửi và quên, bất đồng bộ, không nhận kết quả trả về trực tiếp
- **REST/RPC**: Gửi và chờ, đồng bộ, nhận phản hồi ngay

### Data Consistency Patterns

- **Outbox Pattern**: Giải quyết vấn đề dual writes giữa database và message broker, đảm bảo tính nhất quán dữ liệu trong microservices
  - Xem chi tiết: [[Outbox Pattern]]

## Service Discovery & Registry

Xem chi tiết các công cụ: [[Backend-Tools#Service Discovery & Registry]]

| Tính năng        | Consul (HashiCorp)                    | Eureka (Netflix)                              |
| ---------------- | ------------------------------------- | --------------------------------------------- |
| Mô hình          | CP (Consistency > Availability), Raft | AP (Availability > Consistency), peer-to-peer |
| Health Check     | Linh hoạt (Script, HTTP, TCP, gRPC)   | Heartbeat từ client                           |
| Key/Value Store  | Có, tích hợp sẵn                      | Không có                                      |
| Multi-Datacenter | Hỗ trợ tốt                            | Cần cấu hình phức tạp                         |
| Giao thức        | HTTP API, DNS                         | HTTP API (REST)                               |
| Ngôn ngữ         | Go                                    | Java                                          |

## Service Mesh

Xem chi tiết: [[Backend-Tools#Service Mesh]]

## Container & Orchestration

Xem chi tiết các công cụ: [[Backend-Tools#Container & Orchestration]]

| Tính năng      | Docker Swarm           | HashiCorp Nomad                 | Kubernetes               |
| -------------- | ---------------------- | ------------------------------- | ------------------------ |
| Độ phức tạp    | Thấp                   | Trung bình                      | Cao                      |
| Tính linh hoạt | Thấp (chỉ container)   | Cao (container, binaries, Java) | Cao                      |
| Cộng đồng      | Nhỏ                    | Nhỏ                             | Lớn                      |
| Use Case       | Ứng dụng nhỏ, dev/test | Nhiều workload, hiệu suất cao   | Ứng dụng lớn, production |

## Caching

Xem chi tiết các công cụ: [[Backend-Tools#Caching]]

| Tính năng        | Memcached          | Redis                            | Dragonfly               |
| ---------------- | ------------------ | -------------------------------- | ----------------------- |
| Cấu trúc dữ liệu | Key-value đơn giản | Nhiều loại (lists, hashes, sets) | Tương thích Redis       |
| Persistence      | Không              | Có                               | Có                      |
| Replication      | Không              | Có                               | Có                      |
| Multi-threading  | Có                 | Một phần (từ v6+)                | Có (hiệu suất cao hơn)  |
| Use Case         | Caching đơn giản   | Nhiều tính năng, persistence     | Hiệu suất cao hơn Redis |

## Netflix OSS Stack

| Chức năng                | Công cụ                               |
| ------------------------ | ------------------------------------- |
| Service Discovery        | Netflix Eureka                        |
| Routing & Load Balancing | Netflix Ribbon                        |
| Circuit Breaker          | Netflix Hystrix                       |
| Monitoring               | Hystrix Dashboard & Turbine           |
| API Gateway              | Netflix Zuul                          |
| Central Configuration    | Spring Cloud Config Server            |
| Bảo mật API (OAuth 2.0)  | Spring Cloud + Spring Security OAuth2 |
| Phân tích Log tập trung  | ELK Stack                             |

## Tài nguyên

- **Sách**:
  - Building Event-Driven Microservices (Adam Bellemare)
  - [Kafka: The Definitive Guide](https://www.confluent.io/resources/kafka-the-definitive-guide/)
- **GitHub**:
  - [awesome-scalability](https://github.com/binhnguyennus/awesome-scalability)
  - [system-design-primer](https://github.com/donnemartin/system-design-primer)
  - [Microservices_Project_List](https://github.com/davidetaibi/Microservices_Project_List)
- **Video**: [IT Experts Club Hanoi](https://www.youtube.com/@itexpertsclubhanoi525/videos)
- **Benchmark**: [Kafka vs RabbitMQ vs Redis Streams](https://devops.vn/posts/bai-test-benchmark-giua-cac-message-queue-kafka-vs-rabbitmq-vs-redis-streams-ket-qua-khien-toi-phai-bat-ngo)
