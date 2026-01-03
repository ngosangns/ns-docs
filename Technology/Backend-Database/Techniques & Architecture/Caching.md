---
tags:
  - area/technology
  - domain/backend
  - topic/database
  - type/resource
  - lang/vi
---

# Caching

## Định nghĩa

- **Cache hit**: Tìm được dữ liệu từ cache
- **Cache miss**: Không tìm được dữ liệu từ cache
- **Data stale**: Dữ liệu trong cache không cập nhật so với database

## Chiến lược Caching

- **Cache aside**: Đọc từ cache → database
- **Write through**: Ghi vào database → cache
- **Read through**: Tương tự Cache aside
- **Write back**: Ghi vào cache → đồng bộ theo chu kỳ/batch xuống database
- **Write around**: Không tạo cache khi write → đọc dùng cache aside/read through

### Sự khác biệt Cache aside vs Read through

- **Cache aside**: Application cập nhật dữ liệu vào cache nếu không tồn tại
- **Read through**: Cache server cập nhật dữ liệu vào cache nếu không tồn tại

## Dọn dẹp dữ liệu (Eviction Policies)

- **FIFO**: First In First Out
- **LIFO**: Last In First Out
- **LRU**: Least Recently Used
- **LFU**: Least Frequently Used
- **Random selection**: Lựa chọn ngẫu nhiên

### LFU Cache O(1) Implementation

- **Vấn đề truyền thống:**
  - LFU cache thường dùng min-heap → O(log n) time complexity
  - Nhiều developer chọn LRU (O(1)) thay vì LFU dù LFU phù hợp hơn
  - Min-heap cần rebalancing mỗi khi access/delete/insert → O(log n)

- **Giải pháp O(1) (Ketan Shah, Anirban Mitra, Dhruv Matani, 2010/2021):**
  - Dùng Hash Table + Doubly Linked Lists
  - Mỗi kệ (Doubly Linked List) chứa items có cùng frequency
  - Kệ 1: items được access 1 lần, kệ 2: 2 lần, ...
  - Hash table map key → vị trí item trong kệ
  - Access: di chuyển item sang kệ frequency cao hơn → O(1)
  - Eviction: lấy item đầu tiên ở kệ frequency thấp nhất → O(1)

- **Trade-offs:**
  - Tốn nhiều RAM hơn (hash table + multiple linked lists)
  - Khó implement và maintain hơn so với min-heap

- **Paper:** [An O(1) algorithm for implementing the LFU cache eviction scheme](https://arxiv.org/pdf/2110.11602)

## Caching với Memcached

- Cache đối tượng trong bộ nhớ, phân tán
- Key-value đơn giản, đa luồng, không persistence
- So với Redis: Đơn giản hơn, có thể nhanh hơn cho caching thuần túy
- [Tài liệu](https://viblo.asia/p/memcached-redis-nen-dung-cai-nao-V3m5WjNylO7)

## Redis

- **Resources**:
  - [Nguyên tắc hoạt động của Redis server](https://viblo.asia/p/nguyen-tac-hoat-dong-cua-redis-server-naQZRq7GKvx)
  - [Series quản trị Redis](https://viblo.asia/s/series-quan-tri-redis-P0lPmrrg5ox)
  - [Time-To-Live (TTL) trong Redis](https://viblo.asia/p/time-to-live-ttl-trong-redis-hoat-dong-nhu-nao-EbNVQ1DRVvR)
  - [Cache: Bộ Não Thông Minh](https://viblo.asia/p/cache-bo-nao-thong-minh-cua-he-thong-hien-dai-5pPLk9yD4RZ)

### Redis Sentinel

- Monitoring, notification và automatic failover cho Redis replica
- **Chức năng**:
  - Giám sát: Theo dõi trạng thái master và slave
  - Cảnh báo: Thông báo khi có sự cố
  - Quản lý: Failover tự động, quản lý replication, cập nhật cấu hình
- **Lợi ích**: Tính sẵn sàng cao, khả năng phục hồi, dễ sử dụng, miễn phí
- [Tài liệu](https://medium.com/@wano1010/redis-redis-sentinel-hoạt-động-như-thế-nào-6ec501312bd8)

