---
area: technology
domain: backend
type: resource
---
# ProxySQL Connection Multiplexing

**Nguồn:** [roninhub.com](https://roninhub.com/tai-lieu/bai-viet/ap-dung-connection-multiplexing-trong-proxysql-de-toi-uu-ket-noi-database)

## Tổng quan

- Connection Multiplexing: Nhiều frontend connections chia sẻ backend connections theo tỷ lệ N:M (thay vì 1:1)
- Giúp giảm áp lực lên Database layer

## Vấn đề với Thread-per-Connection (MySQL)

- Mỗi connection tạo một thread riêng
- RAM/CPU tăng cao khi số lượng connection lớn
- Overhead do context switching
- Giới hạn max_connections (mặc định 151)

## Kiến trúc với ProxySQL

- **Không có ProxySQL**: 3000 app connections = 3000 DB threads (1:1)
- **Có ProxySQL Multiplexing**: 3000 app connections chia sẻ 100 backend connections (N:M)
- **Lợi ích**: Giảm số connection trực tiếp tới DB, ổn định hiệu năng, tận dụng tài nguyên tốt hơn, hỗ trợ horizontal scaling

## Connection Multiplexing vs Connection Pooling

| Tiêu chí          | Connection Pooling     | Connection Multiplexing                         |
| ----------------- | ---------------------- | ----------------------------------------------- |
| Khái niệm         | Kết nối giữ trong pool | Kết nối tái sử dụng linh hoạt giữa nhiều client |
| Tỷ lệ             | 1:1                    | N:M                                             |
| Tài nguyên        | Medium                 | Low                                             |
| Implementation    | Application-level      | Proxy-level                                     |
| Session Isolation | Full                   | Conditional                                     |

## Cơ chế hoạt động

1. App kết nối ProxySQL
2. ProxySQL phân tích query/session
3. Chọn backend connection phù hợp
4. Gửi query, nhận kết quả
5. Trả backend connection về pool

- Một frontend connection có thể thực thi nhiều query trên các backend connection khác nhau (trừ khi có transaction)

### Vô hiệu hóa multiplexing

- Khi phát hiện transaction, ProxySQL disable multiplexing và "ghim" backend connection cho đến khi transaction kết thúc (đảm bảo ACID)
- Các trường hợp khác disable multiplexing: user-defined variables, temporary tables, table locks, GET_LOCK, hoặc cấu hình global

## Các trường hợp Multiplexing bị vô hiệu hóa

- **Active Transaction**: Khi transaction đang active
- **Table Locks**: LOCK TABLE/FLUSH TABLES WITH READ LOCK
- **GET_LOCK**: Khi dùng GET_LOCK()
- **Temporary Tables**: Khi tạo bảng tạm
- **Session/User Variables**: Khi dùng biến @
- **Disable by config**: mysql-multiplexing = false

## Delay Parameters

- Tránh lỗi khi dùng auto-increment (ví dụ: INSERT rồi SELECT LAST_INSERT_ID())
- `mysql-auto_increment_delay_multiplex`: số query delay
- `mysql-connection_delay_multiplex_ms`: thời gian delay (ms)

## Query Rules Control

- Kiểm soát multiplexing theo loại query bằng query rules
- `multiplexing: 0` = disable, `1` = enable, `2` = không disable cho queries chứa @

## Kết luận

- Connection Multiplexing giúp tối ưu hiệu suất Database, đặc biệt với hệ thống high-concurrency
- Cần hiểu rõ các trường hợp multiplexing bị disable, tuning đúng parameters, monitoring thường xuyên
- Khi cấu hình đúng, multiplexing có thể giảm 80-90% số backend connections

**Tham khảo:**

- [ProxySQL Multiplexing Documentation](https://proxysql.com/documentation/multiplexing/)
- [YouTube: ProxySQL Multiplexing](https://www.youtube.com/watch?v=nHBmMjGx-J8)