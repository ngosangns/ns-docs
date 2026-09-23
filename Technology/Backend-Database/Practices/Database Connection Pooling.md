---
area: technology
domain: backend
topic: connection-pooling
type: resource
title: Database Connection Pooling
description: Connection là OS process đắt đỏ; cách pool hoạt động và cách định cỡ pool bằng Little's Law, Kingman và process-to-core ratio
timestamp: "2026-09-20T00:00:00.000Z"
tags:
  - technology
  - backend
  - database
  - connection-pooling
  - postgresql
resource: https://sagarshiroya.dev/posts/database-connection-and-pooling
---

# Database Connection Pooling

**Nguồn:** [Database Connections & Connection Pooling](https://sagarshiroya.dev/posts/database-connection-and-pooling) — Sagar Shiroya, 18/04/2026

Xem thêm: [ProxySQL Connection Multiplexing](/Technology/Backend-Database/Practices/Proxysql Connection Multiplexing) (multiplexing N:M ở proxy, khác với pooling 1:1).

## Connection là gì và vì sao đắt

- PostgreSQL (và phần lớn DB) dùng mô hình **process-per-connection**: mỗi client kết nối → postmaster fork một backend process riêng để phục vụ.
- Mỗi backend process cấp phát bộ nhớ riêng (5–10 MB), giữ auth session, transaction state và buffer cache → connection không phải "socket" mà là OS process thật.
- Giới hạn cứng `max_connections` (mặc định thường là 100).

### Vòng đời một connection

1. **Mở**: TCP 3-way handshake → SSL/TLS negotiation (nếu bật) → authentication → spawn backend process.
2. **Thực thi** câu SQL, nhận kết quả.
3. **Đóng**: kill backend process, giải phóng memory, đóng socket.

Thời gian mở connection (tham khảo):

| Vị trí                      | Thời gian   |
| --------------------------- | ----------- |
| Cùng rack, cùng data center | 1–5 ms      |
| Khác rack, cùng data center | 5–20 ms     |
| Khác data center            | 50–200 ms   |
| Cross-region                | 800–1500 ms |

Nếu mở/đóng connection cho mỗi query thì overhead lấn át thời gian chạy query (query 2 ms nhưng tốn thêm hàng chục ms chỉ để mở/đóng).

## Connection Pooling

Pool là cache các connection đã mở sẵn, tái sử dụng thay vì mở/đóng liên tục: request **borrow** một connection, dùng xong **return** (KHÔNG close).

- **Active** connection: đang thực thi query.
- **Idle** connection: chờ query — vẫn chiếm 10–30 MB bộ nhớ khi mở.

Vòng đời pool:

1. **Init** — mở sẵn số connection tối thiểu (min) khi app khởi động.
2. **Borrow** — request lấy connection idle ngay nếu có, không thì xếp hàng.
3. **Use** — chạy query.
4. **Return** — reset connection và trả về pool.
5. **Health check** — định kỳ kiểm tra connection idle còn sống, thay connection chết.

Hai loại pool:

- **Application-side** (nằm trong process app, tùy biến theo nhu cầu): `pg.Pool` (Node.js), HikariCP (Java).
- **Database-side / proxy** (process proxy đứng giữa app và DB): PgBouncer.

## Khi tất cả connection đều bận

Request mới vào **waiting queue**, được phục vụ khi có connection trả về. Nếu chờ quá `connectionTimeoutMillis` thì pool throw lỗi — đúng, vì tránh queue phình vô hạn gây cạn memory. Pool thường xuyên full và queue tăng là dấu hiệu pool quá nhỏ hoặc query quá chậm; đừng vội tăng pool size vì có thể làm tệ hơn.

## Little's Law

`L = λ × W` — L = số request trung bình trong hệ (đang chạy + đang chờ), λ = arrival rate (req/s), W = thời gian request ở trong hệ.

- 50 req/s × 20 ms (0.02s) = **1 connection** trung bình.
- Slow query đẩy service time lên 200 ms → 50 × 0.2 = **10 connections**.

→ **Query latency quyết định nhu cầu connection.** Query chậm không chỉ là vấn đề UX mà còn là vấn đề scale hạ tầng. Tối ưu query giúp giảm số connection cần thiết.

Throughput tối đa: `max_throughput = pool_size / avg_service_time` (10 connection × 10 ms/query = 1000 req/s).

## Kingman's Formula

Queue tăng phi tuyến (gần như exponential) khi utilisation tiến sát 100%. **Không chạy pool quá ~70–80% utilisation** — vượt ngưỡng, burst nhỏ cũng gây queue dài bất thường. Điều này đúng cho mọi tài nguyên chia sẻ (CPU core, network bandwidth, DB connection). Hành động đầu tiên khi pool cạn là **giảm query latency**, không phải tăng pool size.

## Định cỡ pool — Process-to-Core Ratio

DB chỉ chạy song song được tối đa bằng số CPU core. Nhiều connection hơn core không nhanh hơn mà còn chậm hơn do OS phải context-switch và process chờ CPU.

`pool_size = (core_count × 2) + effective_spindle_count`

- `effective_spindle_count` = số ổ đĩa DB đang dùng; SSD hoặc managed cloud DB (RDS, Supabase) → tính là **1**.
- Ví dụ: DB 4 core + SSD → `(4 × 2) + 1 = 9 connections`. 9 connection phục vụ hàng trăm concurrent user vì user phần lớn chờ I/O, không chờ CPU.

**Uber/Postgres:** giảm số connection (qua PgBouncer) + tối ưu query cải thiện throughput nhiều hơn là tăng connection — pool nhỏ, bận rộn thắng pool lớn phải context-switch.

## Nhiều app instance

`total_connections = pool_size × num_app_instances`

- Ví dụ 10 app instance × pool size 20 = 200 connections; nếu `max_connections` là 100 thì một phần connection bị **refuse**.
- Serverless: function cold-start liên tục không được mở connection trực tiếp → dùng connection proxy (PgBouncer, RDS Proxy, Supabase Pooler).

## Key takeaways

- Connection DB là **OS process thật**, không phải object nhẹ: mở một cái tốn 20–100 ms và 5–10 MB RAM.
- **Luôn dùng connection pool ở production** — connection thô không scale.
- Pool size **không phải càng lớn càng tốt**: công thức `(cores × 2) + spindles`; nhiều connection hơn core gây overhead context-switch.
- **Little's Law** nối tốc độ query với nhu cầu connection — tối ưu query trước.
- **Không vượt ~70–80% utilisation** (Kingman) — latency nổ phi tuyến trên ngưỡng này.
- Tính cả **nhiều app instance**: total connection = pool_size × số instance, phải dưới `max_connections` hoặc dùng proxy.
- **Serverless phải dùng connection proxy** (PgBouncer, RDS Proxy, Supabase Pooler).
