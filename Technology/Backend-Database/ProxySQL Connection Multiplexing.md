---
relates:
  - "[[Database]]"
  - "[[Postgresql]]"
---
# 1. Áp dụng Connection Multiplexing trong ProxySQL để tối ưu kết nối Database

**Nguồn:** [roninhub.com](https://roninhub.com/tai-lieu/bai-viet/ap-dung-connection-multiplexing-trong-proxysql-de-toi-uu-ket-noi-database)

## 1.1. Tổng quan

- Connection Multiplexing là tính năng nổi bật của ProxySQL, cho phép nhiều frontend connections chia sẻ backend connections theo tỷ lệ N:M thay vì 1:1, giúp giảm áp lực lên Database layer.

## 1.2. Vấn đề với mô hình Thread-per-Connection của MySQL

- Mỗi connection tạo ra một thread riêng, dẫn đến:
  - RAM/CPU tăng cao khi số lượng connection lớn.
  - Overhead do context switching.
  - Giới hạn max_connections (mặc định 151).

## 1.3. Kiến trúc với ProxySQL

- **Không có ProxySQL:** 3000 app connections = 3000 DB threads (1:1).
- **Có ProxySQL Multiplexing:** 3000 app connections chia sẻ 100 backend connections (N:M), Database chỉ tạo 100 threads.
- Lợi ích: Giảm số connection trực tiếp tới DB, ổn định hiệu năng, tận dụng tài nguyên tốt hơn, hỗ trợ horizontal scaling.

## 1.4. Connection Multiplexing vs Connection Pooling

| Tiêu chí          | Connection Pooling     | Connection Multiplexing                         |
| ----------------- | ---------------------- | ----------------------------------------------- |
| Khái niệm         | Kết nối giữ trong pool | Kết nối tái sử dụng linh hoạt giữa nhiều client |
| Tỷ lệ             | 1:1                    | N:M                                             |
| Tài nguyên        | Medium                 | Low                                             |
| Implementation    | Application-level      | Proxy-level                                     |
| Session Isolation | Full                   | Conditional                                     |

## 1.5. Cơ chế hoạt động của Multiplexing

- Flow:
  1. App kết nối ProxySQL
  2. ProxySQL phân tích query/session
  3. Chọn backend connection phù hợp
  4. Gửi query, nhận kết quả
  5. Trả backend connection về pool
- Một frontend connection có thể thực thi nhiều query trên các backend connection khác nhau (trừ khi có transaction).

### 1.5.1. Vô hiệu hóa multiplexing

- Khi phát hiện transaction, ProxySQL sẽ disable multiplexing và "ghim" backend connection cho đến khi transaction kết thúc (đảm bảo ACID).
- Ngoài transaction, các trường hợp khác cũng disable multiplexing: user-defined variables, temporary tables, table locks, GET_LOCK, hoặc cấu hình global.

## 1.6. Các trường hợp Multiplexing bị vô hiệu hóa

- **Active Transaction:** Khi transaction đang active.
- **Table Locks:** Khi LOCK TABLE/FLUSH TABLES WITH READ LOCK.
- **GET_LOCK:** Khi dùng GET_LOCK().
- **Temporary Tables:** Khi tạo bảng tạm.
- **Session/User Variables:** Khi dùng biến @.
- **Disable by config:** mysql-multiplexing = false.

## 1.7. Delay Parameters

- Để tránh lỗi khi dùng auto-increment (ví dụ: INSERT rồi SELECT LAST_INSERT_ID()), ProxySQL hỗ trợ delay multiplexing theo số query hoặc thời gian:
  - `mysql-auto_increment_delay_multiplex`: số query delay.
  - `mysql-connection_delay_multiplex_ms`: thời gian delay (ms).

## 1.8. Query Rules Control

- Có thể kiểm soát multiplexing theo loại query bằng query rules:

```sql
INSERT INTO mysql_query_rules (rule_id, active, match_pattern, multiplexing, apply) VALUES
  (1, 1, '^SELECT.*', 1, 1),
  (2, 1, '^SET @.*', 0, 1),
  (3, 1, '^SELECT @@max_allowed_packet', 2, 1);
LOAD MYSQL QUERY RULES TO RUNTIME;
SAVE MYSQL QUERY RULES TO DISK;
```

- multiplexing: 0 = disable, 1 = enable, 2 = không disable cho queries chứa @

## 1.9. Kết luận

- Connection Multiplexing giúp tối ưu hiệu suất Database, đặc biệt với hệ thống high-concurrency.
- Cần hiểu rõ các trường hợp multiplexing bị disable, tuning đúng parameters, monitoring thường xuyên, và thiết kế ứng dụng phù hợp.
- Khi cấu hình đúng, multiplexing có thể giảm 80-90% số backend connections, cải thiện performance và scalability.

**Tham khảo:**

- [ProxySQL Multiplexing Documentation](https://proxysql.com/documentation/multiplexing/)
- [YouTube: ProxySQL Multiplexing](https://www.youtube.com/watch?v=nHBmMjGx-J8)
