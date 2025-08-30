---
relates:
  - "[[Backend - Back-end]]"
  - "[[SaaS]]"
  - "[[Machine learning - Deep Learning - AI - ML - DL]]"
  - "[[DevOps]]"
  - "[[6 Chiến lược Prompt Hiệu quả của OpenAI]]"
  - "[[Severless]]"
tags:
---
# 1. KHÁI NIỆM & KIẾN TRÚC CỐT LÕI

## 1.1. Mô Hình Kiến Trúc

* Microservices: [https://microservices.io/index.html](https://microservices.io/index.html)
* Kiến trúc hướng dịch vụ (SOA): Giải thích về SOA từ AWS. [https://aws.amazon.com/vi/what-is/service-oriented-architecture](https://aws.amazon.com/vi/what-is/service-oriented-architecture)
* Châm ngôn phát triển service (12-Factor App): [https://12factor.net](https://12factor.net)

## 1.2. Xử Lý Dữ Liệu

* Batch Processing vs. Stream Processing: So sánh hai phương pháp xử lý dữ liệu chính.
  * Tài liệu: [https://viblo.asia/p/batch-processing-va-stream-processing-kham-pha-hai-phuong-phap-xu-ly-du-lieu-chu-luc-gwd43zXrVX9](https://viblo.asia/p/batch-processing-va-stream-processing-kham-pha-hai-phuong-phap-xu-ly-du-lieu-chu-luc-gwd43zXrVX9)
* Xử lý dữ liệu lớn với Apache Spark:
  * Định nghĩa: Framework tính toán cluster mã nguồn mở, xử lý dữ liệu lớn nhanh chóng.
  * Chức năng: Xử lý batch và real-time, hỗ trợ Scala/Java/Python/R, tích hợp nhiều nguồn dữ liệu (HDFS, S3).
  * Thư viện: Spark SQL, Spark Streaming, MLlib, GraphX.
  * Ưu điểm: Tốc độ cao (in-memory), dễ sử dụng, khả năng mở rộng tốt.
  * Tài liệu: [https://viblo.asia/p/tim-hieu-ve-apache-spark-ByEZkQQW5Q0](https://viblo.asia/p/tim-hieu-ve-apache-spark-ByEZkQQW5Q0)

# 2. CÁC THÀNH PHẦN & CÔNG CỤ TRONG HỆ THỐNG PHÂN TÁN

## 2.1. API Gateway & Reverse Proxy

* Envoy:
  * Proxy hiệu năng cao cho cloud-native.
  * Điểm mạnh: Cung cấp số liệu chi tiết (độ trễ, tỷ lệ lỗi), hỗ trợ các tính năng nâng cao như traffic shadowing, fault injection.
  * Điểm yếu: Đường cong học tập dốc, cấu hình phức tạp.
* HAProxy:
  * Giải pháp cân bằng tải TCP/HTTP ổn định và hiệu suất cao.
  * Điểm mạnh: Nổi tiếng về sự tin cậy trong môi trường production.
* Kong:
  * API Gateway kiến trúc dựa trên plugin, dễ mở rộng và tùy chỉnh.
  * Chức năng chính: Quản lý và bảo mật API (xác thực, rate limiting).
* Traefik:
  * Điểm mạnh: Cài đặt đơn giản, tích hợp sẵn Let's Encrypt, tự động khám phá và cấu hình từ Docker/Kubernetes.
* Pingora:
  * Proxy phát triển bởi Cloudflare, tập trung vào hiệu suất và hiệu quả ở quy mô lớn.
  * Link: [https://github.com/cloudflare/pingora](https://github.com/cloudflare/pingora)
* godoxy:
  * Reverse proxy và cân bằng tải đơn giản, viết bằng Go.
  * Link: [https://github.com/yusing/godoxy](https://github.com/yusing/godoxy)

## 2.2. Giao Tiếp Giữa Các Service (Service Communication)

Giao thức & Frameworks:
* HTTP RESTful: Kiến trúc phổ biến nhất, sử dụng các phương thức HTTP trên tài nguyên.
* RPC (Remote Procedure Call):
  * Apache Thrift: Framework đa ngôn ngữ, tự động sinh code client/server từ file định nghĩa interface.
  * Twirp: Framework RPC đơn giản của Twitch, dùng Protobuf, sinh code Go/JS. [https://github.com/twitchtv/twirp](https://github.com/twitchtv/twirp)
* Apache Dubbo: Framework RPC hiệu năng cao, mã nguồn mở. [https://github.com/apache/dubbo](https://github.com/apache/dubbo)
* Encore: Framework đơn giản hóa việc xây dựng microservices và hệ thống event-driven. [https://github.com/encoredev/encore](https://github.com/encoredev/encore)

Message Broker & Message Queue:
* Khái niệm cơ bản: [System Design Cơ Bản: Message Broker (TopDev)](https://topdev.vn/blog/system-design-co-ban-message-broker)
* So sánh RabbitMQ vs. Kafka: [Viblo](https://viblo.asia/p/phong-van-be-so-sanh-rabbitmq-vs-kafka-Yym40XRA491) | [Viblo 2](https://viblo.asia/p/rabbitmq-va-kafka-cung-dat-len-ban-can-n1j4lMWjJwl)
* Kafka:
  * Đặc điểm: Mô hình Pull, lưu trữ log (persistance), đảm bảo thứ tự message trong partition, scale theo chiều ngang (horizontal). Rất mạnh cho streaming và hệ thống lớn.
  * Tài liệu: [Kafka: The Definitive Guide](https://www.confluent.io/resources/kafka-the-definitive-guide/) | [Series Vén màn Kafka (Viblo)](https://viblo.asia/s/series-ven-man-su-that-ve-apache-kafka-PAoJe8vN41j) | [Exactly Once Semantic (Viblo)](https://viblo.asia/p/exactly-one-message-voi-kafka-eos-0gdJz6OEJz5)
* RabbitMQ:
  * Đặc điểm: Mô hình Push, linh hoạt với nhiều loại routing (fan-out, direct), phù hợp cho background jobs, long-running tasks. Scale theo chiều dọc (vertical).
* Apache Pulsar: Nền tảng messaging và streaming, hợp nhất cả queuing và pub-sub.
* Nats: Hệ thống messaging hiệu năng cao, đơn giản.
* Redis: Kho dữ liệu trong bộ nhớ, có thể dùng làm message broker (Pub/Sub).
* Các công cụ khác: Apache ActiveMQ, JMS, Chronicle.

## 2.3. Service Discovery & Registry

* So sánh Consul vs. Eureka:
  | Tính năng | Consul (HashiCorp) | Eureka (Netflix) |
  | :--- | :--- | :--- |
  | Mô hình nhất quán | CP (Consistency > Availability), dùng Raft. | AP (Availability > Consistency), peer-to-peer replication. |
  | Health Check | Rất linh hoạt (Script, HTTP, TCP, gRPC...). | Chủ yếu dựa vào heartbeat từ client. |
  | Kho Key/Value | Có, tích hợp sẵn, rất mạnh. | Không có. |
  | Multi-Datacenter | Hỗ trợ rất tốt, là tính năng cốt lõi. | Cần cấu hình phức tạp. |
  | Giao thức | HTTP API, DNS Interface. | Chỉ có HTTP API (REST). |
  | Kiến trúc | Phức tạp hơn, yêu cầu agent trên các node. | Đơn giản hơn, client tự đăng ký. |
  | Ngôn ngữ | Go. | Java. |

## 2.4. Service Mesh

* Tổng quan: [Service Mesh - tổng hợp các tool hỗ trợ tầng network cho microservices (Viblo)](https://viblo.asia/p/service-mesh-la-gi-dong-vai-tro-nhu-the-nao-trong-microservices-architecture-djeZ1jr3lWz)
* Istio:
  * Định nghĩa: Service Mesh mã nguồn mở, quản lý giao tiếp giữa các microservice.
  * Kiến trúc: Data Plane (Envoy proxy) và Control Plane (Istiod).
  * Chức năng: Quản lý lưu lượng (routing, load balancing), bảo mật (mTLS), quan sát (metrics, traces), kiểm soát (rate limiting, circuit breaking).
  * Nhược điểm: Phức tạp, có thể tăng độ trễ.

## 2.5. Container & Orchestration

* So sánh Docker Swarm vs. Nomad vs. Kubernetes:
  | Tính năng | Docker Swarm | HashiCorp Nomad | Kubernetes (K8s) |
  | :--- | :--- | :--- | :--- |
  | Độ phức tạp | Thấp | Trung bình | Cao |
  | Tính linh hoạt | Thấp (chỉ container) | Cao (container, binaries, Java...) | Cao |
  | Cộng đồng | Nhỏ | Nhỏ | Lớn |
  | Use Case | Ứng dụng nhỏ, dev/test | Nhiều loại workload, hiệu suất cao | Ứng dụng lớn, phức tạp, production |
* Case study: [Xây dựng nền tảng Zalopay merchant trên K8s](https://www.youtube.com/watch?v=2S-_-UKbqqM)

## 2.6. CI/CD & Feature Flags

* CI/CD: ArgoCD, Jenkins, [Spinnaker](https://spinnaker.io).
* Feature Flags / Continuous Configuration:
  * Flipt: Giải pháp self-hosted, không gửi dữ liệu ra bên ngoài. Hỗ trợ trunk-based development, canary release, kill switch. Tích hợp Prometheus/OpenTelemetry.
  * Link: [https://github.com/flipt-io/flipt](https://github.com/flipt-io/flipt)
  * Flagsmith: Quản lý feature flag. [https://github.com/Flagsmith/flagsmith](https://github.com/Flagsmith/flagsmith)
  * [flipt-io/flipt: Enterprise-ready, Git native feature management solution](https://github.com/flipt-io/flipt)

## 2.7. Observability (Logs, Metrics, Tracing)

* Nền tảng All-in-One:
  * Signoz: Thay thế mã nguồn mở cho Datadog, New Relic. Cung cấp logs, metrics, traces trong một giao diện. [https://github.com/SigNoz/signoz](https://github.com/SigNoz/signoz)
* Logs:
  * Stack: FluentBit + Elasticsearch (EFK), Promtail + Loki.
  * Log Analyzer: goaccess - phân tích log web thời gian thực trên terminal. [https://github.com/allinurl/goaccess](https://github.com/allinurl/goaccess)
* Metrics: Prometheus, Victoria Metrics.
* Tracing: Jaeger, Zipkin, Tempo, [Openreplay](https://github.com/openreplay/openreplay) (tập trung front-end).
* Monitoring & Troubleshooting:
  * Coroot: Tự động phát hiện vấn đề trong hệ thống microservices. [https://github.com/coroot/coroot](https://github.com/coroot/coroot)
  * beszel: Hub giám sát server gọn nhẹ. [https://github.com/henrygd/beszel](https://github.com/henrygd/beszel)
* Phân tích code: [Sonarqube](https://github.com/SonarSource/sonarqube) - Phân tích, sửa lỗi mã nguồn.
* [logrocket](https://logrocket.com)

## 2.8. Caching

* So sánh Memcached vs. Redis vs. Dragonfly:
  | Tính năng | Memcached | Redis | Dragonfly |
  | :--- | :--- | :--- | :--- |
  | Cấu trúc dữ liệu| Key-value đơn giản | Nhiều loại (lists, hashes, sets...) | Tương thích Redis |
  | Persistence | Không | Có | Có |
  | Replication | Không | Có | Có |
  | Multi-threading | Có | Một phần (từ v6+) | Có (Hiệu suất cao hơn Redis) |
  | Độ phức tạp | Đơn giản | Phức tạp hơn | Tương tự Redis |
  | Lựa chọn khi | Caching đơn giản, không cần lưu trữ. | Cần nhiều tính năng, cấu trúc dữ liệu, persistence. | Cần hiệu suất cao hơn Redis và tương thích Redis API. |
* Database Caching:
  * ReadySet: [https://github.com/readysettech/readyset](https://github.com/readysettech/readyset)

## 2.9. Data & Storage

* Search Engines:
  * ElasticSearch: Mạnh mẽ, phổ biến cho ứng dụng lớn.
  * Typesense: Nhanh, dễ sử dụng, tập trung vào độ trễ thấp.
  * Opensearch: Fork mã nguồn mở của Elasticsearch. [https://opensearch.org](https://opensearch.org)
  * Lucene: Thư viện tìm kiếm nền tảng của Elasticsearch/Opensearch. [https://github.com/apache/lucene](https://github.com/apache/lucene)
  * Orama: Thư viện tìm kiếm full-text nhẹ, có thể nhúng.
  * Trieve: Nền tảng API cho search, RAG, analytics.
* Object Storage (Self-hosted):
  * Minio: Hiệu năng cao, tương thích S3 API. [https://github.com/minio/minio](https://github.com/minio/minio)
  * Cloudreve: Dịch vụ cloud drive cá nhân/công cộng. [https://github.com/cloudreve/cloudreve](https://github.com/cloudreve/cloudreve)
* Scalable Databases:
  * Apache Cassandra: NoSQL database có khả năng mở rộng cao.
  * Vitess: Giải pháp scale MySQL trên Kubernetes. [https://vitess.io](https://vitess.io)
* Change Data Capture (CDC):
  * Zookeeper: Có thể dùng để quản lý, đồng bộ hóa, sao chép dữ liệu giữa các DB.
* Data Integration & Transformation:
  * Airbyte: Nền tảng tích hợp dữ liệu (ELT) mã nguồn mở, di chuyển dữ liệu giữa các nguồn (API, DB) và đích (data warehouse). [https://github.com/airbytehq/airbyte](https://github.com/airbytehq/airbyte)
  * Multiwoven: Nền tảng tích hợp dữ liệu mã nguồn mở, tương tự Airbyte.
  * Hasura: Tự động tạo GraphQL API từ database có sẵn.

## 2.10. Authentication & Authorization (Xác thực & Phân quyền)

* Keycloak: Giải pháp IAM mã nguồn mở, đầy đủ tính năng (SSO, User Federation, OIDC/OAuth2/SAML). Rất mạnh và linh hoạt.
  * Tài liệu: [Giải pháp phân quyền dùng Keycloak (Viblo)](https://viblo.asia/p/giai-phap-cho-bai-toan-phan-quyen-su-dung-keycloak-Ny0VG717VPA)
* Ory: Bộ công cụ cloud-native, API-first (Kratos, Hydra, Keto, Oathkeeper). Thiết kế cho ứng dụng hiện đại, phân tán.
* Dex: Identity Broker, kết nối nhiều nguồn xác thực (LDAP, SAML, GitHub...) vào một điểm OIDC duy nhất. Phổ biến trong Kubernetes.
* Supertokens: Tập trung vào trải nghiệm dev và quản lý session an toàn.
* Passwordless:
  * Hanko: Tập trung vào WebAuthn và Passkeys. [https://github.com/teamhanko/hanko](https://github.com/teamhanko/hanko)
* Giải pháp đơn giản / tích hợp:
  * Better-auth: Đơn giản, bảo mật, linh hoạt. [https://github.com/better-auth/better-auth](https://github.com/better-auth/better-auth)
  * Supabase-auth: Tích hợp trong hệ sinh thái Supabase, dùng GoTrue.
* Dịch vụ thương mại (IDaaS):
  * Auth0 (Okta): Rất phổ biến, mạnh về tùy chỉnh và tích hợp.
  * Clerk: Tập trung vào sự đơn giản, cung cấp component UI dựng sẵn cho React/Next.js.

## 2.11. Nền tảng No-code / Low-code

* Định nghĩa: Công cụ cho phép tạo ứng dụng với ít hoặc không cần code, dùng giao diện kéo-thả.
* Công cụ Self-hosted / Mã nguồn mở:
  * Appsmith, Budibase, ToolJet: Xây dựng công cụ nội bộ (admin panels, dashboards).
  * NocoDB, Baserow: Biến CSDL thành giao diện bảng tính thông minh (giống Airtable).
  * Directus: Data Platform & Headless CMS, tạo API tức thì từ CSDL.
  * n8n: Tự động hóa quy trình (workflow automation).
  * PocketBase: Backend all-in-one trong 1 file duy nhất (Go), gồm CSDL, auth, storage.
  * Supabase: Giải pháp thay thế Firebase mã nguồn mở.

## 2.12. Các Công Cụ Chuyên Dụng & Tiện Ích Khác

* Quản lý dự án:
  * Plane: Thay thế Jira, Linear. [https://github.com/makeplane/plane](https://github.com/makeplane/plane)
  * Kaneo: Tập trung vào bảng Kanban. [https://github.com/usekaneo/kaneo](https://github.com/usekaneo/kaneo)
* Thông báo & Email:
  * Novu: Nền tảng hạ tầng thông báo mã nguồn mở (Email, SMS, Push, In-app). [https://github.com/novuhq/novu](https://github.com/novuhq/novu)
  * Plunk: Nền tảng Email Marketing & Giao dịch self-hosted. [https://github.com/useplunk/plunk](https://github.com/useplunk/plunk)
* Headless CMS:
  * Strapi: Xây dựng bằng Node.js, API linh hoạt (REST/GraphQL). [https://github.com/strapi/strapi](https://github.com/strapi/strapi)
  * Yao: Application Engine viết bằng Go, có thể dùng xây dựng Headless CMS. [https://github.com/YaoApp/yao](https://github.com/YaoApp/yao)
* URL Shortener: [dub](https://github.com/dubinc/dub), [kutt](https://github.com/thedevs-network/kutt), [Polr](https://github.com/cydrobolt/polr), [YOURLS](https://github.com/YOURLS/YOURLS).
* Môi trường phát triển:
  * Devcontainers (VS Code): Dùng Docker container làm môi trường phát triển.
  * Daytona: Trình quản lý môi trường phát triển mã nguồn mở.
  * Lapdev: Giải pháp self-hosted cho môi trường phát triển.
* Platform - Ảo hóa:
	* [Proxmox VE](https://pve.proxmox.com/wiki/Main_Page)
		* Monitoring for Proxmox VE: [rcourtman/Pulse: A responsive monitoring application for Proxmox VE that displays real-time metrics across multiple nodes](https://github.com/rcourtman/Pulse)

# 3. FRAMEWORKS & LIBRARIES

* Dapr (Distributed Application Runtime):
  * Cung cấp các building blocks (state management, pub/sub, secret management...) cho microservices dưới dạng sidecar. Giúp trừu tượng hóa hạ tầng.
  * Tài liệu: [Phần 1](https://viblo.asia/p/cung-tim-hieu-co-ban-ve-dapr-distributed-application-runtime-phan-1-7ymJXKoq4kq) | [Phần 2](https://viblo.asia/p/cung-tim-hieu-co-ban-ve-dapr-distributed-application-runtime-phan-2-5pPLkG5nLRZ)
  * Link: [https://github.com/dapr/dapr](https://github.com/dapr/dapr)
* LMAX Disruptor:
  * Thư viện Java để xây dựng hệ thống xử lý sự kiện với hiệu suất cao và độ trễ cực thấp.
  * Link: [https://github.com/LMAX-Exchange/disruptor](https://github.com/LMAX-Exchange/disruptor)
* Rest.li:
  * Framework REST+JSON của LinkedIn để xây dựng kiến trúc service có khả năng mở rộng.

# 4. CASE STUDY & STACK THAM KHẢO

## 4.1. Netflix OSS Stack

| Chức năng | Công cụ Netflix / Spring |
| :--- | :--- |
| Service Discovery | Netflix Eureka |
| Routing & Load Balancing | Netflix Ribbon |
| Circuit Breaker | Netflix Hystrix |
| Monitoring | Hystrix dashboard & Turbine |
| API Gateway (Edge Server) | Netflix Zuul |
| Central Configuration | Spring Cloud Config Server |
| Bảo mật API (OAuth 2.0) | Spring Cloud + Spring Security OAuth2 |
| Phân tích Log tập trung | ELK Stack (Elasticsearch, Logstash, Kibana) |

## 4.2. Các Case Study Khác

* Zalopay: [Xây dựng nền tảng Zalopay merchant trên K8s](https://www.youtube.com/watch?v=2S-_-UKbqqM)

# 5. TÀI NGUYÊN & THẢO LUẬN THÊM

## 5.1. Thảo luận: Message Queue vs. RPC/REST

* Message Queue (Gửi và Quên): Giống như gửi thư, bạn gửi đi và không cần chờ phản hồi ngay lập tức. Luồng xử lý là bất đồng bộ. Không thể dùng để nhận kết quả trả về trực tiếp.
* REST/RPC (Gửi và Chờ): Giống như gọi điện, bạn gửi yêu cầu và mong đợi một phản hồi (thành công hoặc lỗi). Luồng xử lý là đồng bộ.

## 5.2. Kho tài nguyên GitHub

* Tổng hợp về khả năng mở rộng: [awesome-scalability](https://github.com/binhnguyennus/awesome-scalability)
* Cẩm nang thiết kế hệ thống: [system-design-primer](https://github.com/donnemartin/system-design-primer)
* Danh sách dự án Microservice: [Microservices_Project_List](https://github.com/davidetaibi/Microservices_Project_List/blob/master/README.md)

## 5.3. Kênh Video & Cộng đồng

* IT Experts Club Hanoi: [https://www.youtube.com/@itexpertsclubhanoi525/videos](https://www.youtube.com/@itexpertsclubhanoi525/videos)

## 5.4. Các liên kết khác

* [[SaaS]]
* [[Top 10 câu hỏi phỏng vấn System Design và Microservices]]

Chắc chắn rồi, đây là phần tiếp tục tái cấu trúc và bổ sung các thông tin còn lại từ ghi chú của bạn, được sắp xếp thành các mục rõ ràng hơn và đào sâu vào các khái niệm quan trọng.

# 6. CÔNG CỤ CHUYÊN DỤNG THEO DANH MỤC (TỪ DANH SÁCH "OTHERS")

Phần này sẽ phân loại chi tiết các công cụ nằm trong mục "Others" và các mục nhỏ lẻ khác để dễ dàng tra cứu.

## 6.1. Quản lý Tri thức & Nội dung (Knowledge & Content Management)

* Wiki:
  * BookStack: Nền tảng tạo tài liệu và wiki dạng sách, dễ sử dụng. [https://github.com/BookStackApp/BookStack](https://github.com/BookStackApp/BookStack)
* Blogging:
  * Canvas: Nền tảng blog tối giản. [https://github.com/austintoddj/canvas](https://github.com/austintoddj/canvas)
* Ghi chú (Note-taking):
  * DocMost: Nền tảng tài liệu mã nguồn mở, dễ sử dụng, hỗ trợ Markdown.

## 6.2. Giao tiếp & Hỗ trợ Khách hàng (Communication & Customer Support)

* Nền tảng Chat:
  * Rocket.Chat: Giải pháp chat mã nguồn mở, thay thế Slack. [https://github.com/RocketChat/Rocket.Chat](https://github.com/RocketChat/Rocket.Chat)
* Hỗ trợ đa kênh:
  * Chatwoot: Hỗ trợ live-chat, email, tạo thành một hệ thống omni-channel. [https://github.com/chatwoot/chatwoot](https://github.com/chatwoot/chatwoot)
* Video Call (WebRTC):
  * Jitsi: Giải pháp họp trực tuyến mã nguồn mở. [https://github.com/jitsi/docker-jitsi-meet](https://github.com/jitsi/docker-jitsi-meet)
  * LiveKit: Nền tảng WebRTC mã nguồn mở, có khả năng mở rộng. [https://github.com/livekit/livekit](https://github.com/livekit/livekit)
* Real-time Socket Server:
  * Soketi: Server WebSocket mã nguồn mở, tương thích Pusher protocol, hiệu năng cao. [https://github.com/soketi/soketi](https://github.com/soketi/soketi)

## 6.3. Thanh toán (Payment)

* Autumn: Nền tảng mã nguồn mở về giá cả và thanh toán, hoạt động như một lớp trung gian giữa ứng dụng của bạn và Stripe.
  * Chức năng: Quản lý subscriptions, hệ thống credit, tính phí theo lượng sử dụng (usage-based), tự động xử lý webhook, nâng/hạ cấp gói.
  * Link: [https://github.com/useautumn/autumn](https://github.com/useautumn/autumn)

## 6.4. Bảo mật & Hạ tầng (Security & Infrastructure)

* Firewall:
	* BunkerWeb: Firewall ứng dụng web (WAF) mã nguồn mở. [https://github.com/bunkerity/bunkerweb](https://github.com/bunkerity/bunkerweb)
* Quản lý Bí mật (Secret Management):
	* Teller: Công cụ quản lý secrets cho lập trình viên. [https://github.com/tellerops/teller](https://github.com/tellerops/teller)
* Control Panel:
	* 1Panel: Control panel cho server Linux hiện đại, mã nguồn mở. [https://github.com/1Panel-dev/1Panel](https://github.com/1Panel-dev/1Panel)
	* CloudPanel: Control panel miễn phí. [https://www.cloudpanel.io](https://www.cloudpanel.io)
	* Coolify: Giải pháp self-hosted thay thế Heroku/Netlify/Vercel. [https://github.com/coollabsio/coolify](https://github.com/coollabsio/coolify)
	- [taubyte/tau: Open source distributed Platform as a Service (PaaS). A self-hosted Vercel / Netlify / Cloudflare alternative.](https://github.com/taubyte/tau)

## 6.5. Tự động hóa & Thu thập dữ liệu (Automation & Crawling)

* Tự động hóa tác vụ:
  * automatisch: Công cụ tự động hóa tác vụ mã nguồn mở, tương tự Zapier. [https://github.com/automatisch/automatisch](https://github.com/automatisch/automatisch)
* Thu thập dữ liệu web (Crawling):
  * Firecrawl: API để crawl và chuyển đổi bất kỳ website nào thành dữ liệu có cấu trúc (Markdown/JSON). [https://github.com/mendableai/firecrawl](https://github.com/mendableai/firecrawl)
  * [apify/crawlee: Crawlee—A web scraping and browser automation library for Node.js to build reliable crawlers. In JavaScript and TypeScript. Extract data for AI, LLMs, RAG, or GPTs. Download HTML, PDF, JPG, PNG, and other files from websites. Works with Puppeteer, Playwright, Cheerio, JSDOM, and raw HTTP. Both headful and headless mode. With proxy rotation.](https://github.com/apify/crawlee)

## 6.6. Công cụ cho Lập trình viên (Developer Tools)

* Tunneling:
  * pgrok: Giải pháp self-hosted thay thế ngrok. [https://github.com/pgrok/pgrok](https://github.com/pgrok/pgrok)
* Email Testing:
  * MailDev: SMTP Server và giao diện web để xem và test email trong quá trình phát triển. [https://github.com/maildev/maildev](https://github.com/maildev/maildev)
* Deployment:
  * PHPloy: Công cụ deploy code lên server qua FTP/SFTP. [https://github.com/banago/PHPloy](https://github.com/banago/PHPloy)
* Webhooks:
  * Hook0: Dịch vụ Webhook-as-a-service mã nguồn mở. [https://github.com/hook0/hook0]
* Data Converter:
  * Data Wizard: Chuyển đổi tài liệu (documents) sang JSON. [https://github.com/capevace/data-wizard](https://github.com/capevace/data-wizard)

## 6.7. Các Công Cụ Tiện Ích Khác

* Form & Khảo sát:
  * Formbricks: Nền tảng khảo sát mã nguồn mở. [https://github.com/formbricks/formbricks](https://github.com/formbricks/formbricks)
* Quản lý tài chính:
  * Ghostfolio: Công cụ quản lý tài chính cá nhân. [https://github.com/ghostfolio/ghostfolio](https://github.com/ghostfolio/ghostfolio)
* Chia sẻ File/Media:
  * slink: Dịch vụ chia sẻ hình ảnh. [https://github.com/andrii-kryvoviaz/slink](https://github.com/andrii-kryvoviaz/slink)
* Dữ liệu cá nhân:
  * dawarich: Giải pháp self-hosted thay thế Google Location History. [https://github.com/Freika/dawarich](https://github.com/Freika/dawarich)
* Self-hosted media converter: [C4illin/ConvertX: 💾 Self-hosted online file converter. Supports 1000+ formats ⚙️](https://github.com/C4illin/ConvertX)
* Deep research the codebase:
	* [AsyncFuncAI/deepwiki-open: Open Source DeepWiki: AI-Powered Wiki Generator for GitHub/Gitlab/Bitbucket Repositories. Join the discord: https://discord.gg/gMwThUMeme](https://github.com/AsyncFuncAI/deepwiki-open)
* Create rich visualizations with UI: [microsoft/data-formulator: 🪄 Create rich visualizations with AI](https://github.com/microsoft/data-formulator)

# 7. BỔ SUNG & ĐÀO SÂU

## 7.1. Bổ sung các công cụ

* Authentication:
  * Logto: Giải pháp IAM mã nguồn mở, tập trung vào trải nghiệm người dùng và nhà phát triển. [https://github.com/logto-io/logto](https://github.com/logto-io/logto)
  * [teamhanko/hanko: Modern Authentication—On Your Terms. Open source alternative to Auth0, Cognito, Clerk, Descope, Stytch.](https://github.com/teamhanko/hanko)
* Email & Newsletters:
  * Listmonk: Trình quản lý bản tin (newsletter) và email marketing self-hosted. [https://github.com/knadh/listmonk](https://github.com/knadh/listmonk)
* Nền tảng No-code/Low-code (Thương mại):
  * Back-end: XANO, Tyk.io, Lark Anycross
  * Front-end: Weweb
  * Full-stack: Bubble.io
  * Mobile: FlutterFlow, Draftbit

## 7.2. Đào sâu: So sánh RabbitMQ vs. Kafka (Chi tiết)

Đây là bản tóm tắt các điểm khác biệt cốt lõi được thảo luận trong ghi chú gốc.

* Mô hình tương tác (Push vs. Pull):
  * RabbitMQ (Push): Broker chủ động *đẩy* (push) message đến consumer.
  * *Rủi ro:* Nếu consumer xử lý không kịp, message có thể bị dồn lại và làm tràn bộ nhớ của consumer hoặc queue.
  * Kafka (Pull): Consumer chủ động *kéo* (pull) message từ topic của broker.
  * *Lợi ích:* Consumer tự quyết định tốc độ xử lý. Kafka lưu message trong một khoảng thời gian (retention period), cho phép consumer đọc lại message cũ bằng cách thay đổi con trỏ `offset`. Điều này cực kỳ hữu ích cho việc xử lý lại các lỗi đã xảy ra.

* Mục đích sử dụng (Use Case):
  * RabbitMQ (Background Jobs): Sinh ra để làm message queue cho các tác vụ chạy nền, xử lý lâu dài (long-running tasks). Không mạnh trong việc đảm bảo thứ tự message.
  * Kafka (Data Streaming): Sinh ra để xử lý luồng dữ liệu (streaming) với thông lượng cao. Đảm bảo thứ tự của các message trong cùng một `partition`, rất quan trọng cho các hệ thống cần xử lý sự kiện tuần tự.

* Lưu trữ & Khả năng đọc lại (Persistence & Replayability):
  * RabbitMQ: Message sẽ bị xóa khỏi queue sau khi consumer xử lý xong và gửi tín hiệu xác nhận (ACK). Khả năng đọc lại message rất hạn chế (chỉ có thể requeue khi có lỗi, không thể "tua lại" để xử lý bug logic).
  * Kafka: Message được lưu trữ bền bỉ trên đĩa dưới dạng log và chỉ bị xóa sau một khoảng thời gian `retention` (mặc định là 7 ngày). Consumer có thể đọc lại bất kỳ message nào trong khoảng thời gian này chỉ bằng cách thay đổi `offset`.

* Khả năng mở rộng (Scaling):
  * RabbitMQ: Mở rộng theo chiều dọc (Vertical Scaling) - tăng cường sức mạnh cho một node broker.
  * Kafka: Mở rộng theo chiều ngang (Horizontal Scaling) - thêm nhiều node broker vào cluster, giúp tăng thông lượng và khả năng lưu trữ. Tuy nhiên, việc scale consumer bị giới hạn bởi số `partition` của topic (số consumer hoạt động không thể lớn hơn số partition).

# 8. DANH MỤC ĐỌC THÊM (SÁCH)

* Building Event-Driven Microservices - Tác giả: Adam Bellemare
  * Nội dung đáng chú ý: Tìm hiểu sâu về các mẫu kiến trúc hướng sự kiện và khái niệm Enterprise Service Bus (ESB).

Chắc chắn rồi. Chúng ta sẽ tiếp tục với các mục còn lại, sắp xếp chúng vào các danh mục hợp lý và bổ sung chi tiết cho các khái niệm quan trọng.

# 9. HỆ SINH THÁI TRIỂN KHAI & VẬN HÀNH

Phần này tập trung vào các công cụ và nền tảng giúp bạn triển khai, quản lý và vận hành các ứng dụng của mình, từ môi trường runtime đến các bảng điều khiển server.

## 9.1. Môi trường Runtime & Nền tảng PaaS Tự Host (Self-hosted PaaS & Runtimes)

Đây là các giải pháp mã nguồn mở cho phép bạn tạo ra một nền tảng "Platform-as-a-Service" của riêng mình, tương tự như Vercel, Netlify hay Heroku, giúp đơn giản hóa quá trình từ code đến triển khai.

* Dokploy: Giải pháp thay thế Vercel, Netlify, Heroku. [https://github.com/Dokploy/dokploy](https://github.com/Dokploy/dokploy)
* Harness: Nền tảng dành cho lập trình viên từ đầu đến cuối, bao gồm SCM, CI/CD, và môi trường được host. [https://github.com/harness/harness](https://github.com/harness/harness)
* Sidekick: Giúp triển khai từ bare metal (máy chủ vật lý) đến production sẵn sàng chỉ trong vài phút. [https://github.com/mightymoud/sidekick](https://github.com/mightymoud/sidekick)
* Coolify: Một giải pháp self-hosted thay thế Heroku/Netlify/Vercel rất phổ biến. [https://github.com/coollabsio/coolify](https://github.com/coollabsio/coolify)
* [ubicloud/ubicloud: Open source alternative to AWS. Elastic compute, block storage (non replicated), firewall and load balancer, managed Postgres, K8s, AI inference, and IAM services.](https://github.com/ubicloud/ubicloud)

## 9.2. Quản lý Cấu hình & Điều phối Server (Server Orchestration & Configuration)

Các công cụ này giúp tự động hóa việc cài đặt và quản lý cấu hình của server.

* Ansible:
  * Định nghĩa: Một công cụ Infrastructure as Code (IaC) mạnh mẽ, không cần agent (agentless).
  * Chức năng: Tự động hóa việc cung cấp phần mềm, quản lý cấu hình và triển khai ứng dụng. Nó hoạt động bằng cách kết nối đến các server qua SSH và thực thi các "playbook" được viết bằng YAML.
  * Use case: Cài đặt đồng loạt phần mềm trên hàng trăm server, đảm bảo các môi trường (dev, staging, prod) có cấu hình nhất quán, thực hiện rolling updates.

## 9.3. Bảng Điều Khiển Server (Server Control Panels)

Giao diện đồ họa để quản lý các tác vụ trên server một cách dễ dàng.

* 1Panel: Bảng điều khiển server Linux mã nguồn mở, hiện đại và giàu tính năng. [https://github.com/1Panel-dev/1Panel](https://github.com/1Panel-dev/1Panel)
* CloudPanel: Bảng điều khiển miễn phí, hiệu suất cao, tập trung vào sự đơn giản. [https://www.cloudpanel.io/](https://www.cloudpanel.io/)
* Ghi chú khác: `AAPanel cracked: https://vps.hocdev.us` (Đây là ghi chú về một phiên bản đã được chỉnh sửa của aapanel).

# 10. HOÀN THIỆN CÁC DANH MỤC CÔNG CỤ

## 10.1. Bổ sung cho Giám sát (Monitoring)

* Các Trụ Cột Của Observability:
  * Logs: ELK Stack (Elasticsearch, Logstash, Kibana), EFK Stack (Elasticsearch, Fluentd, Kibana), Promtail + Loki.
  * Metrics: Prometheus, Victoria Metrics.
  * Tracing (Distributed Tracing): Jaeger, Zipkin, Tempo.
* Thông báo Sự cố (Incident Notification):
  * Versus Incident: Công cụ thông báo khi server gặp sự cố. [https://github.com/VersusControl/versus-incident](https://github.com/VersusControl/versus-incident)
* Phân tích hành vi người dùng:
	* [PostHog/posthog: 🦔 PostHog provides open-source web & product analytics, session recording, feature flagging and A/B testing that you can self-host. Get started - free.](https://github.com/PostHog/posthog)
	* [plausible/analytics: Simple, open source, lightweight and privacy-friendly web analytics alternative to Google Analytics.](https://github.com/plausible/analytics)

## 10.2. Bổ sung cho No-code / Low-code

* Công cụ chuyên biệt của Builder.io:
  * Mitosis: Viết component một lần, biên dịch ra nhiều framework (React, Vue, Svelte, Angular...). [https://github.com/BuilderIO/mitosis](https://github.com/BuilderIO/mitosis)
  * Builder: Visual CMS (Hệ quản trị nội dung trực quan) dạng kéo-thả cho các framework hiện đại. [https://github.com/BuilderIO/builder](https://github.com/BuilderIO/builder)
  * Figma-to-Code: Công cụ chuyển đổi thiết kế Figma sang code (HTML, React, Vue...). [https://github.com/BuilderIO/figma-html](https://github.com/BuilderIO/figma-html)
* Workflow cho n8n:
  * Kho lưu trữ các workflow mẫu cho n8n. [https://github.com/Zie619/n8n-workflows](https://github.com/Zie619/n8n-workflows)

## 10.3. Bổ sung cho Tìm kiếm (Search)

* API Ngôn ngữ:
  * Datamuse API: API hữu ích cho việc tìm kiếm từ đồng nghĩa, trái nghĩa, các từ liên quan, hỗ trợ các ứng dụng ngôn ngữ.

## 10.4. Bổ sung cho Ecommerce

* Digitalhippo: [https://github.com/joschan21/digitalhippo](https://github.com/joschan21/digitalhippo)

## 10.5. Bổ sung cho Netflix OSS Stack (Chi tiết hóa)

Đây là phiên bản chi tiết hơn của bảng, làm rõ vai trò của từng thành phần.

| Chức năng | Công cụ Netflix / Spring | Mô tả vai trò |
| :--- | :--- | :--- |
| Khám phá Dịch vụ | Netflix Eureka | Service Discovery Server: Nơi các microservice đăng ký khi khởi động và các service khác đến để tìm kiếm địa chỉ. |
| Định tuyến & Cân bằng tải | Netflix Ribbon | Client-side Load Balancer: Thư viện phía client, sử dụng thông tin từ Eureka để định tuyến yêu cầu và cân bằng tải giữa các instance. |
| Ngắt mạch (Chống lỗi dây chuyền) | Netflix Hystrix | Circuit Breaker: Ngăn chặn các lỗi dây chuyền bằng cách cô lập các service đang gặp sự cố. |
| Giám sát Circuit Breaker | Hystrix Dashboard & Turbine| Monitoring: Giao diện đồ họa để theo dõi trạng thái của các Hystrix circuit breaker trong toàn hệ thống. |
| Cổng API (Gateway) | Netflix Zuul | Edge Server / Gatekeeper: Điểm vào duy nhất cho các yêu cầu từ bên ngoài, chịu trách nhiệm định tuyến, xác thực, và bảo vệ hệ thống. |
| Cấu hình Tập trung | Spring Cloud Config Server | Central Configuration Server: Cung cấp một nơi tập trung để quản lý cấu hình cho tất cả các microservice. |
| Bảo mật API (OAuth 2.0) | Spring Cloud + Spring Security OAuth2 | OAuth 2.0 protected API's: Bảo vệ các API bằng giao thức OAuth2. |
| Phân tích Log Tập trung | ELK Stack (Elasticsearch, Logstash, Kibana) | Centralised log analyses: Thu thập, lưu trữ và phân tích log từ tất cả các service tại một nơi. |

Rất sẵn lòng. Chúng ta sẽ xử lý nốt những mục còn lại, chủ yếu là các framework, thư viện và các khái niệm, so sánh chi tiết đã được đề cập nhưng chưa được tích hợp vào cấu trúc chính.

Đây là phần cuối cùng để hoàn thiện việc tái cấu trúc toàn bộ ghi chú của bạn.

# 11. FRAMEWORK & THƯ VIỆN HỖ TRỢ MICROSERVICES

Phần này tập trung vào các framework và thư viện cụ thể được thiết kế để giải quyết các thách thức trong kiến trúc phân tán và microservices.

## 11.1. Dapr (Distributed Application Runtime)

* Định nghĩa: Một runtime mã nguồn mở, di động và hướng sự kiện, giúp đơn giản hóa việc xây dựng các ứng dụng microservice linh hoạt cho cloud và edge.
* Mô hình hoạt động: Dapr hoạt động dưới dạng sidecar (một tiến trình riêng chạy bên cạnh ứng dụng của bạn). Ứng dụng giao tiếp với Dapr sidecar qua HTTP/gRPC.
* Lợi ích: Dapr trừu tượng hóa các thách thức phổ biến của hệ thống phân tán. Lập trình viên chỉ cần gọi API của Dapr mà không cần quan tâm đến công nghệ cụ thể bên dưới là gì (ví dụ: không cần biết đang dùng RabbitMQ hay Kafka cho pub/sub).
* Các Building Blocks chính:
  * Service-to-Service Invocation: Gọi an toàn và tin cậy đến các service khác.
  * State Management: Lưu và truy xuất trạng thái (ví dụ: dùng Redis, Cassandra...).
  * Publish & Subscribe (Pub/Sub): Giao tiếp bất đồng bộ giữa các service.
  * Bindings & Triggers: Tích hợp với các hệ thống bên ngoài.
  * Actors: Mô hình lập trình cho các đối tượng có trạng thái.
  * Secrets Management: Truy cập an toàn các bí mật (API keys, connection strings).
* Link: [https://github.com/dapr/dapr](https://github.com/dapr/dapr)
* Tài liệu tham khảo:
  * [Viblo - Phần 1: Giới thiệu Dapr](https://viblo.asia/p/cung-tim-hieu-co-ban-ve-dapr-distributed-application-runtime-phan-1-7ymJXKoq4kq)
  * [Viblo - Phần 2: Các Building Blocks](https://viblo.asia/p/cung-tim-hieu-co-ban-ve-dapr-distributed-application-runtime-phan-2-5pPLkG5nLRZ)

## 11.2. LMAX Disruptor

* Định nghĩa: Một thư viện Java dùng để xây dựng các hệ thống xử lý sự kiện đồng thời với thông lượng cực cao và độ trễ cực thấp (high throughput, low-latency).
* Kiến trúc cốt lõi: Dựa trên mẫu kiến trúc Ring Buffer (bộ đệm vòng) được tối ưu hóa để tránh các vấn đề về tranh chấp tài nguyên (lock contention) trong môi trường đa luồng.
* Đặc điểm nổi bật:
  * Mechanical Sympathy: Thiết kế để hoạt động hài hòa với kiến trúc phần cứng của máy tính hiện đại (CPU caches, memory barriers).
  * Lock-free: Tránh sử dụng khóa (locks) ở những đường dẫn quan trọng, giúp tăng hiệu suất đáng kể.
* Use case: Các hệ thống tài chính yêu cầu xử lý giao dịch nhanh, các hệ thống game, hoặc bất kỳ ứng dụng nào cần xử lý hàng triệu sự kiện mỗi giây với độ trễ tối thiểu.
* Link: [https://github.com/LMAX-Exchange/disruptor](https://github.com/LMAX-Exchange/disruptor)

## 11.3. Rest.li

* Định nghĩa: Một framework REST+JSON được phát triển bởi LinkedIn để xây dựng các kiến trúc service (SOA/Microservices) mạnh mẽ và có khả năng mở rộng.
* Mục tiêu: Giải quyết các vấn đề về sự phát triển không kiểm soát của các API REST trong một tổ chức lớn.
* Các tính năng chính:
  * Type-safe APIs: Định nghĩa API một cách chặt chẽ, giúp tạo ra các client và server nhất quán.
  * Dynamic Discovery: Tích hợp với các hệ thống khám phá dịch vụ để định tuyến động.
  * Asynchronous APIs: API bất đồng bộ từ gốc, phù hợp cho các hệ thống hiệu năng cao.
* Thành phần liên quan: `[[Solutions & System Designs & Design Patterns]]`, `[[Java Microservices]]`

# 12. TỔNG KẾT & TÀI NGUYÊN CUỐI CÙNG

Đây là phần cuối cùng, chứa các tài liệu tham khảo chung và các công cụ tiện ích nhỏ lẻ còn lại.

## 12.1. Tài nguyên học tập chung

* Sách:
  * Building Event-Driven Microservices (Adam Bellemare): Tìm hiểu về kiến trúc hướng sự kiện và Enterprise Service Bus (ESB).
  * Kafka: The Definitive Guide (Confluent): Tài liệu phải đọc về Kafka. [Link](https://www.confluent.io/resources/kafka-the-definitive-guide/)
* Kho GitHub tổng hợp:
  * Awesome Scalability: Bộ sưu tập các tài liệu, bài viết về khả năng mở rộng hệ thống. [https://github.com/binhnguyennus/awesome-scalability](https://github.com/binhnguyennus/awesome-scalability)
  * System Design Primer: Cẩm nang toàn diện về thiết kế hệ thống. [https://github.com/donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)
  * Microservices Project List: Danh sách các dự án mẫu về microservices. [https://github.com/davidetaibi/Microservices_Project_List](https://github.com/davidetaibi/Microservices_Project_List)
* Kênh Video:
  * IT Experts Club Hanoi: Các buổi chia sẻ kỹ thuật. [https://www.youtube.com/@itexpertsclubhanoi525/videos](https://www.youtube.com/@itexpertsclubhanoi525/videos)
* Tài liệu tham khảo nội bộ:
  * `[[Cloud - SaaS]]`
  * `[[Top 10 câu hỏi phỏng vấn System Design và Microservices]]`

## 12.2. Các công cụ và dịch vụ nhỏ lẻ

* Converter:
  * Gotenberg: Dịch vụ Docker để chuyển đổi nhiều định dạng (HTML, Markdown, Office) sang PDF. [https://github.com/gotenberg/gotenberg](https://github.com/gotenberg/gotenberg)
* Media Processing:
  * Imageproxy: Dịch vụ proxy mã nguồn mở để tối ưu hóa và phân phối hình ảnh. [https://github.com/willnorris/imageproxy](https://github.com/willnorris/imageproxy)
* Website Analytics:
  * Plausible Analytics: Giải pháp phân tích website mã nguồn mở, nhẹ và tập trung vào quyền riêng tư. [https://github.com/plausible/analytics](https://github.com/plausible/analytics)
* Cơ sở dữ liệu (Quản lý):
  * whodb: Công cụ quản lý cơ sở dữ liệu. [https://github.com/clidey/whodb](https://github.com/clidey/whodb)
* Translator:
  * Tolgee Platform: Nền tảng dịch thuật mã nguồn mở, cho phép dịch trực tiếp trong ngữ cảnh ứng dụng web.
