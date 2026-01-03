---
tags:
  - area/technology
  - domain/open-source
  - topic/backend-tools
  - type/resource
  - lang/vi
---

# Backend Tools & Microservices

## API Gateway & Reverse Proxy

- **Envoy**: Proxy hiệu năng cao, số liệu chi tiết, traffic shadowing, fault injection
- **HAProxy**: Cân bằng tải TCP/HTTP ổn định
- **Kong**: API Gateway dựa trên plugin
- **Traefik**: Tích hợp Let's Encrypt, tự động khám phá Docker/K8s
- **Pingora**: Proxy của Cloudflare - [GitHub](https://github.com/cloudflare/pingora)
- **godoxy**: Reverse proxy đơn giản (Go) - [GitHub](https://github.com/yusing/godoxy)

## Service Communication

### RPC Frameworks

- **Apache Thrift**: Framework đa ngôn ngữ, tự động sinh code
- **Twirp**: Framework RPC đơn giản (Twitch), Protobuf - [GitHub](https://github.com/twitchtv/twirp)
- **Apache Dubbo**: RPC hiệu năng cao - [GitHub](https://github.com/apache/dubbo)
- **Encore**: Framework cho microservices và event-driven - [GitHub](https://github.com/encoredev/encore)

### Message Broker & Queue

- **Apache Kafka**: Pull model, lưu trữ log, đảm bảo thứ tự trong partition, scale ngang, mạnh cho streaming
  - [Kafka: The Definitive Guide](https://www.confluent.io/resources/kafka-the-definitive-guide/)
  - [Series Vén màn Kafka](https://viblo.asia/s/series-ven-man-su-that-ve-apache-kafka-PAoJe8vN41j)
- **RabbitMQ**: Push model, routing linh hoạt, phù hợp background jobs, scale dọc
  - [So sánh RabbitMQ vs Kafka](https://viblo.asia/p/phong-van-be-so-sanh-rabbitmq-vs-kafka-Yym40XRA491)
- **Apache Pulsar**: Messaging và streaming, hợp nhất queuing và pub-sub
- **Nats**: Messaging hiệu năng cao, đơn giản
- **Khác**: Apache ActiveMQ, JMS, Chronicle

## Service Discovery & Registry

- **Consul** (HashiCorp): CP model, health check linh hoạt, Key/Value Store, hỗ trợ multi-datacenter
- **Eureka** (Netflix): AP model, peer-to-peer, heartbeat từ client

## Service Mesh

- **Istio**: Service Mesh mã nguồn mở
  - Data Plane (Envoy proxy) và Control Plane (Istiod)
  - Routing, load balancing, mTLS, metrics, traces, rate limiting, circuit breaking
  - [Tài liệu](https://viblo.asia/p/service-mesh-la-gi-dong-vai-tro-nhu-the-nao-trong-microservices-architecture-djeZ1jr3lWz)

## Container & Orchestration

- **Docker Swarm**: Độ phức tạp thấp, phù hợp ứng dụng nhỏ, dev/test
- **HashiCorp Nomad**: Tính linh hoạt cao, nhiều workload, hiệu suất cao
- **Kubernetes**: Ứng dụng lớn, production
- **Case study**: [Zalopay merchant trên K8s](https://www.youtube.com/watch?v=2S-_-UKbqqM)

## CI/CD & Feature Flags

- **ArgoCD**: GitOps continuous delivery
- **Jenkins**: CI/CD automation
- **Spinnaker**: Multi-cloud continuous delivery - [spinnaker.io](https://spinnaker.io)
- **Flipt**: Self-hosted, trunk-based development, canary release - [GitHub](https://github.com/flipt-io/flipt)
- **Flagsmith**: Quản lý feature flag - [GitHub](https://github.com/Flagsmith/flagsmith)

## Observability

### All-in-One

- **Signoz**: Thay thế Datadog/New Relic, logs/metrics/traces - [GitHub](https://github.com/SigNoz/signoz)

### Logs

- **Stack**: FluentBit + Elasticsearch (EFK), Promtail + Loki
- **goaccess**: Phân tích log web real-time - [GitHub](https://github.com/allinurl/goaccess)

### Metrics

- **Prometheus**: Monitoring và alerting
- **Victoria Metrics**: High-performance metrics database

### Tracing

- **Jaeger**: Distributed tracing
- **Zipkin**: Distributed tracing
- **Tempo**: Distributed tracing
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

- **Memcached**: Key-value đơn giản, multi-threading
- **Redis**: Nhiều loại cấu trúc dữ liệu, persistence, replication
- **Dragonfly**: Tương thích Redis, hiệu suất cao hơn, multi-threading - [GitHub](https://github.com/dragonflydb/dragonfly)
- **ReadySet**: Database Caching - [GitHub](https://github.com/readysettech/readyset)

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

## Giao tiếp & Hỗ trợ

- **Chat**: Rocket.Chat, Mattermost
- **Hỗ trợ đa kênh**: Chatwoot
- **Video Call**: Jitsi, LiveKit
- **Socket Server**: Soketi

