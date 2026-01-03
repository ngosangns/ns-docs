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

- **Envoy**: Proxy hiệu năng cao, số liệu chi tiết, traffic shadowing, fault injection
- **HAProxy**: Cân bằng tải TCP/HTTP ổn định
- **Kong**: API Gateway dựa trên plugin
- **Traefik**: Tích hợp Let's Encrypt, tự động khám phá Docker/K8s
- **Pingora**: Proxy của Cloudflare - [GitHub](https://github.com/cloudflare/pingora)
- **godoxy**: Reverse proxy đơn giản (Go) - [GitHub](https://github.com/yusing/godoxy)

## Service Communication

### Giao thức & Frameworks

- **HTTP RESTful**: Kiến trúc phổ biến nhất
- **RPC**:
  - **Apache Thrift**: Framework đa ngôn ngữ, tự động sinh code
  - **Twirp**: Framework RPC đơn giản (Twitch), Protobuf - [GitHub](https://github.com/twitchtv/twirp)
  - **Apache Dubbo**: RPC hiệu năng cao - [GitHub](https://github.com/apache/dubbo)
  - **Encore**: Framework cho microservices và event-driven - [GitHub](https://github.com/encoredev/encore)

### Message Broker & Queue

- **Kafka**: Pull model, lưu trữ log, đảm bảo thứ tự trong partition, scale ngang, mạnh cho streaming
  - [Kafka: The Definitive Guide](https://www.confluent.io/resources/kafka-the-definitive-guide/)
  - [Series Vén màn Kafka](https://viblo.asia/s/series-ven-man-su-that-ve-apache-kafka-PAoJe8vN41j)
- **RabbitMQ**: Push model, routing linh hoạt, phù hợp background jobs, scale dọc
  - [So sánh RabbitMQ vs Kafka](https://viblo.asia/p/phong-van-be-so-sanh-rabbitmq-vs-kafka-Yym40XRA491)
- **Apache Pulsar**: Messaging và streaming, hợp nhất queuing và pub-sub
- **Nats**: Messaging hiệu năng cao, đơn giản
- **Redis**: Có thể dùng làm message broker (Pub/Sub)
- **Khác**: Apache ActiveMQ, JMS, Chronicle

### So sánh Message Queue vs RPC/REST

- **Message Queue**: Gửi và quên, bất đồng bộ, không nhận kết quả trả về trực tiếp
- **REST/RPC**: Gửi và chờ, đồng bộ, nhận phản hồi ngay

## Service Discovery & Registry

| Tính năng        | Consul (HashiCorp)                    | Eureka (Netflix)                              |
| ---------------- | ------------------------------------- | --------------------------------------------- |
| Mô hình          | CP (Consistency > Availability), Raft | AP (Availability > Consistency), peer-to-peer |
| Health Check     | Linh hoạt (Script, HTTP, TCP, gRPC)   | Heartbeat từ client                           |
| Key/Value Store  | Có, tích hợp sẵn                      | Không có                                      |
| Multi-Datacenter | Hỗ trợ tốt                            | Cần cấu hình phức tạp                         |
| Giao thức        | HTTP API, DNS                         | HTTP API (REST)                               |
| Ngôn ngữ         | Go                                    | Java                                          |

## Service Mesh

- **Istio**: Service Mesh mã nguồn mở
  - Data Plane (Envoy proxy) và Control Plane (Istiod)
  - Routing, load balancing, mTLS, metrics, traces, rate limiting, circuit breaking
  - [Tài liệu](https://viblo.asia/p/service-mesh-la-gi-dong-vai-tro-nhu-the-nao-trong-microservices-architecture-djeZ1jr3lWz)

## Container & Orchestration

| Tính năng      | Docker Swarm           | HashiCorp Nomad                 | Kubernetes               |
| -------------- | ---------------------- | ------------------------------- | ------------------------ |
| Độ phức tạp    | Thấp                   | Trung bình                      | Cao                      |
| Tính linh hoạt | Thấp (chỉ container)   | Cao (container, binaries, Java) | Cao                      |
| Cộng đồng      | Nhỏ                    | Nhỏ                             | Lớn                      |
| Use Case       | Ứng dụng nhỏ, dev/test | Nhiều workload, hiệu suất cao   | Ứng dụng lớn, production |

- **Case study**: [Zalopay merchant trên K8s](https://www.youtube.com/watch?v=2S-_-UKbqqM)

## CI/CD & Feature Flags

- **CI/CD**: ArgoCD, Jenkins, [Spinnaker](https://spinnaker.io)
- **Feature Flags**:
  - **Flipt**: Self-hosted, trunk-based development, canary release - [GitHub](https://github.com/flipt-io/flipt)
  - **Flagsmith**: Quản lý feature flag - [GitHub](https://github.com/Flagsmith/flagsmith)

## Observability

### All-in-One

- **Signoz**: Thay thế Datadog/New Relic, logs/metrics/traces - [GitHub](https://github.com/SigNoz/signoz)

### Logs

- **Stack**: FluentBit + Elasticsearch (EFK), Promtail + Loki
- **goaccess**: Phân tích log web real-time - [GitHub](https://github.com/allinurl/goaccess)

### Metrics

- Prometheus, Victoria Metrics

### Tracing

- Jaeger, Zipkin, Tempo
- **Openreplay**: Front-end tracing - [GitHub](https://github.com/openreplay/openreplay)

### Monitoring & Troubleshooting

- **Coroot**: Tự động phát hiện vấn đề - [GitHub](https://github.com/coroot/coroot)
- **beszel**: Hub giám sát server - [GitHub](https://github.com/henrygd/beszel)
- **Sonarqube**: Phân tích mã nguồn - [GitHub](https://github.com/SonarSource/sonarqube)
- **logrocket**: [logrocket.com](https://logrocket.com)
- **Checkmate**: Theo dõi server hardware, uptime - [GitHub](https://github.com/bluewave-labs/checkmate)
- **PostHog**: Analytics, session recording, feature flags - [GitHub](https://github.com/PostHog/posthog)
- **Plausible Analytics**: Phân tích website, privacy-focused - [GitHub](https://github.com/plausible/analytics)

## Caching

| Tính năng        | Memcached          | Redis                            | Dragonfly               |
| ---------------- | ------------------ | -------------------------------- | ----------------------- |
| Cấu trúc dữ liệu | Key-value đơn giản | Nhiều loại (lists, hashes, sets) | Tương thích Redis       |
| Persistence      | Không              | Có                               | Có                      |
| Replication      | Không              | Có                               | Có                      |
| Multi-threading  | Có                 | Một phần (từ v6+)                | Có (hiệu suất cao hơn)  |
| Use Case         | Caching đơn giản   | Nhiều tính năng, persistence     | Hiệu suất cao hơn Redis |

- **Database Caching**: ReadySet - [GitHub](https://github.com/readysettech/readyset)

## Data & Storage

### Search Engines

- **ElasticSearch**: Mạnh mẽ, phổ biến
- **Typesense**: Nhanh, độ trễ thấp
- **Opensearch**: Fork mã nguồn mở của Elasticsearch - [opensearch.org](https://opensearch.org)
- **Lucene**: Thư viện tìm kiếm nền tảng - [GitHub](https://github.com/apache/lucene)
- **Orama**: Full-text search nhẹ, có thể nhúng
- **Trieve**: API cho search, RAG, analytics
- **Datamuse API**: API tìm kiếm từ đồng nghĩa, trái nghĩa

### Object Storage (Self-hosted)

- **Minio**: Hiệu năng cao, tương thích S3 - [GitHub](https://github.com/minio/minio)
- **Cloudreve**: Cloud drive cá nhân/công cộng - [GitHub](https://github.com/cloudreve/cloudreve)

### Scalable Databases

- **Apache Cassandra**: NoSQL khả năng mở rộng cao
- **Vitess**: Scale MySQL trên Kubernetes - [vitess.io](https://vitess.io)

### Data Integration

- **Zookeeper**: Quản lý, đồng bộ, sao chép dữ liệu
- **Airbyte**: Tích hợp dữ liệu (ELT) - [GitHub](https://github.com/airbytehq/airbyte)
- **Multiwoven**: Tích hợp dữ liệu mã nguồn mở
- **Hasura**: Tự động tạo GraphQL API từ database

## Authentication & Authorization

- **Keycloak**: IAM mã nguồn mở, SSO, User Federation, OIDC/OAuth2/SAML
  - [Tài liệu](https://viblo.asia/p/giai-phap-cho-bai-toan-phan-quyen-su-dung-keycloak-Ny0VG717VPA)
- **Ory**: Cloud-native, API-first (Kratos, Hydra, Keto, Oathkeeper)
- **Dex**: Identity Broker, kết nối nhiều nguồn xác thực vào OIDC
- **Supertokens**: Quản lý session an toàn
- **Hanko**: WebAuthn và Passkeys - [GitHub](https://github.com/teamhanko/hanko)
- **Logto**: IAM mã nguồn mở - [GitHub](https://github.com/logto-io/logto)
- **Better-auth**: Đơn giản, bảo mật - [GitHub](https://github.com/better-auth/better-auth)
- **Supabase-auth**: Tích hợp Supabase, dùng GoTrue
- **IDaaS**: Auth0 (Okta), Clerk

## No-code / Low-code

### Self-hosted / Mã nguồn mở

- **Appsmith, Budibase, ToolJet**: Admin panels, dashboards
- **NocoDB, Baserow**: Biến CSDL thành bảng tính
- **Directus**: Data Platform & Headless CMS
- **n8n**: Workflow automation
  - Alternatives: [sim](https://github.com/simstudioai/sim)
- **PocketBase**: Backend all-in-one (Go)
- **Supabase**: Thay thế Firebase mã nguồn mở

### Builder.io Tools

- **Mitosis**: Viết component một lần, biên dịch ra nhiều framework - [GitHub](https://github.com/BuilderIO/mitosis)
- **Builder**: Visual CMS kéo-thả - [GitHub](https://github.com/BuilderIO/builder)
- **Figma-to-Code**: Chuyển Figma sang code - [GitHub](https://github.com/BuilderIO/figma-html)

### Thương mại

- **Back-end**: XANO, Tyk.io, Lark Anycross
- **Front-end**: Weweb
- **Full-stack**: Bubble.io
- **Mobile**: FlutterFlow, Draftbit

## Frameworks & Libraries

- **Dapr**: Distributed Application Runtime, building blocks (state, pub/sub, secrets) dưới dạng sidecar
  - [GitHub](https://github.com/dapr/dapr)
  - [Tài liệu Phần 1](https://viblo.asia/p/cung-tim-hieu-co-ban-ve-dapr-distributed-application-runtime-phan-1-7ymJXKoq4kq)
  - [Tài liệu Phần 2](https://viblo.asia/p/cung-tim-hieu-co-ban-ve-dapr-distributed-application-runtime-phan-2-5pPLkG5nLRZ)
- **LMAX Disruptor**: Thư viện Java, xử lý sự kiện hiệu suất cao, độ trễ thấp, Ring Buffer
  - [GitHub](https://github.com/LMAX-Exchange/disruptor)
- **Rest.li**: Framework REST+JSON của LinkedIn, type-safe APIs, asynchronous APIs

## Self-hosted PaaS & Runtimes

- **Dokploy**: Thay thế Vercel/Netlify/Heroku - [GitHub](https://github.com/Dokploy/dokploy)
- **Harness**: Nền tảng từ đầu đến cuối - [GitHub](https://github.com/harness/harness)
- **Sidekick**: Deploy từ bare metal - [GitHub](https://github.com/mightymoud/sidekick)
- **Coolify**: Thay thế Heroku/Netlify/Vercel - [GitHub](https://github.com/coollabsio/coolify)
- **Ubicloud**: Open source alternative to AWS - [GitHub](https://github.com/ubicloud/ubicloud)
- **tau**: Platform as a Service phân tán - [GitHub](https://github.com/taubyte/tau)

## Server Orchestration & Configuration

- **Ansible**: Infrastructure as Code, không cần agent, SSH, playbook YAML
- **Proxmox VE**: Nền tảng ảo hóa
  - **Pulse**: Monitoring cho Proxmox VE - [GitHub](https://github.com/rcourtman/Pulse)
- **Control Panels**: 1Panel, CloudPanel

## Quản lý Dự án & Thông báo

- **Quản lý Dự án**: Plane, Kaneo (Kanban)
- **Thông báo & Email**:
  - **Novu**: Hạ tầng thông báo (Email, SMS, Push, In-app) - [GitHub](https://github.com/novuhq/novu)
  - **Plunk**: Email Marketing self-hosted - [GitHub](https://github.com/useplunk/plunk)
  - **Listmonk**: Newsletter và email marketing - [GitHub](https://github.com/knadh/listmonk)
  - **Versus Incident**: Thông báo sự cố server - [GitHub](https://github.com/VersusControl/versus-incident)

## CMS & Quản lý Nội dung

- **Headless CMS**: Strapi, Yao
- **Wiki/Blog**: BookStack, Canvas, DocMost

## Giao tiếp & Hỗ trợ

- **Chat**: Rocket.Chat, Mattermost
- **Hỗ trợ đa kênh**: Chatwoot
- **Video Call**: Jitsi, LiveKit
- **Socket Server**: Soketi

## Developer Tools & Utilities

- **Môi trường Phát triển**: Devcontainers (VS Code), Daytona, Lapdev
- **Tunneling**: pgrok (thay thế ngrok) - [GitHub](https://github.com/pgrok/pgrok)
- **Email Testing**: MailDev - [GitHub](https://github.com/maildev/maildev)
- **Deployment**: PHPloy (FTP/SFTP) - [GitHub](https://github.com/banago/PHPloy)
- **Webhooks**: Hook0 - [GitHub](https://github.com/hook0/hook0)
- **Converter & Media**:
  - **Gotenberg**: Chuyển đổi sang PDF - [GitHub](https://github.com/gotenberg/gotenberg)
  - **Imageproxy**: Tối ưu hình ảnh - [GitHub](https://github.com/willnorris/imageproxy)
  - **Data Wizard**: Chuyển tài liệu sang JSON - [GitHub](https://github.com/capevace/data-wizard)
  - **ConvertX**: File converter self-hosted - [GitHub](https://github.com/C4illin/ConvertX)
- **Automation & Crawling**:
  - **automatisch**: Tự động hóa (tương tự Zapier) - [GitHub](https://github.com/automatisch/automatisch)
  - **Firecrawl, Crawlee, Scrapling**: Web crawling
- **Bảo mật**: BunkerWeb (WAF), Teller (Secret Management)
- **Tiện ích**: URL Shortener (dub, kutt, Polr, YOURLS), Formbricks (Form/Survey), Ghostfolio (Tài chính), dawarich (Dữ liệu cá nhân), whodb (Quản lý CSDL), Digitalhippo (Ecommerce), Tolgee (Dịch thuật)

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
