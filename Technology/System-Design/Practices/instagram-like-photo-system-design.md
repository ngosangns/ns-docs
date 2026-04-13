---
area: technology
domain: system-design
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Thiết kế hệ thống ảnh như Instagram

> Tóm tắt từ bài viết: https://viblo.asia/p/thiet-ke-don-gian-mot-he-thong-anh-nhu-instagram-GAWVpZd5J05

## Tóm tắt

### Yêu cầu hệ thống

**Yêu cầu chức năng:**

- Người dùng có thể upload/download/xem ảnh
- Tìm kiếm ảnh dựa trên tiêu đề
- Người dùng có thể follow người dùng khác
- Hệ thống tạo newsfeed gồm ảnh hàng đầu từ những người được follow

**Yêu cầu phi chức năng:**

- High availability
- Độ trễ chấp nhận được: 200ms cho News Feed Generation
- High reliability: tỷ lệ mất ảnh/video rất thấp

### Ước tính khả năng

- 500 triệu người dùng, 1 triệu DAU
- 2 triệu ảnh mới/ngày (~23 ảnh/giây)
- Kích thước ảnh trung bình: ~200KB
- Dung lượng cần thiết: 400GB/ngày
- Tổng dung lượng 5 năm: 730TB

### Thiết kế hệ thống

**Kiến trúc cơ bản:**

- Object Storage (S3) để lưu trữ ảnh
- Database servers để lưu metadata về ảnh
- Hệ thống read-heavy (đọc nhiều hơn ghi)

### Database Design

**Các bảng chính:**

**Photo Table:**

- photo_id (PK)
- user_id
- photo_path
- photo_latitude, photo_longitude
- user_latitude, user_longitude
- created_at

**User Table:**

- user_id (PK)
- name, email, dob
- created_at, last_login

**UserFollow Table:**

- follower_id (PK)
- following_id (PK)

**Lựa chọn database:**

- Có thể dùng RDBMS (MySQL) cho queries quan hệ
- Nên dùng NoSQL distributed column store (Cassandra) để scale
- Metadata ảnh lưu trong key-value store với key là photo_id
- Cassandra hỗ trợ replication và delayed deletion (giữ data vài ngày trước khi xóa vĩnh viễn)

### Newsfeed Generation

**Quy trình:**

1. Lấy danh sách người dùng được follow
2. Lấy metadata của 100 ảnh mới nhất từ mỗi người
3. Gửi tất cả ảnh cho ranking algorithm
4. Trả về top 100 ảnh cho newsfeed

**Pre-generating Newsfeed:**

- Dùng dedicated servers để tạo newsfeed trước và lưu vào bảng `newsfeed`
- Khi cần tạo lại, query bảng newsfeed để tìm timestamp mới nhất, sau đó tạo từ thời điểm đó

**Phương pháp phân phối newsfeed:**

1. **Pull Model:**
   - Client kéo dữ liệu từ server theo định kỳ hoặc thủ công
   - Vấn đề: dữ liệu mới không hiển thị ngay, nhiều API calls trả về empty

2. **Push Model:**
   - Server push dữ liệu mới ngay khi có
   - Vấn đề: người dùng nổi tiếng có nhiều followers → server phải push nhiều updates → quá tải

3. **Hybrid Model (Best Practice):**
   - Người dùng có nhiều followers (>1000) → dùng Pull model
   - Người dùng có ít followers (<1000) → dùng Push model
   - Server push updates với tần suất nhất định, cho phép heavy users pull data

### Caching và Load Balancing

**CDN:**

- Sử dụng CDN phân bố địa lý để đưa nội dung gần người dùng hơn
- Phục vụ ảnh trên quy mô toàn cầu

**Metadata Caching:**

- Memcache để cache các DB rows có traffic cao
- Cache 20% daily read traffic (áp dụng quy tắc 80-20: 20% ảnh tạo ra 80% traffic)

### Key Generation

**Vấn đề:**

- Auto-increment ID có thể gây bottleneck khi scale

**Giải pháp:**

1. **Two DB approach:**
   - DB1: tạo ID số chẵn (auto-increment-increment = 2, offset = 1)
   - DB2: tạo ID số lẻ (auto-increment-increment = 2, offset = 2)
   - Load balancer trước 2 DB để đảm bảo availability

2. **Key Generation Service (KGS):**
   - Dịch vụ độc lập tạo 6 ký tự ngẫu nhiên
   - Pre-generate và lưu trong key-DB

## Best Practices

### 1. Database Design

- **Sử dụng NoSQL cho metadata khi scale:** Cassandra hoặc key-value stores phù hợp hơn RDBMS cho hệ thống lớn
- **Delayed deletion:** Giữ data vài ngày trước khi xóa vĩnh viễn để hỗ trợ recovery
- **Replication:** Sử dụng replication để đảm bảo reliability

### 2. Newsfeed Strategy

- **Pre-computation:** Tạo newsfeed trước thay vì tính toán real-time
- **Hybrid Push/Pull:**
  - Push cho users có ít followers (<1000)
  - Pull cho users có nhiều followers (>1000)
  - Giảm tải server cho celebrity accounts

### 3. Caching Strategy

- **80-20 Rule:** Cache 20% popular content tạo ra 80% traffic
- **Multi-layer caching:**
  - CDN cho static content (ảnh)
  - Memcache cho metadata (DB rows)

### 4. Key Generation

- **Avoid single point of failure:** Không dùng single auto-increment DB
- **Distributed ID generation:**
  - Multiple DBs với different offsets
  - Hoặc dedicated Key Generation Service

### 5. System Architecture

- **Separation of concerns:**
  - Object storage riêng cho ảnh (S3)
  - Database riêng cho metadata
- **Read-heavy optimization:** Tối ưu cho read operations vì read nhiều hơn write

### 6. Scalability

- **Geographic distribution:** CDN để phục vụ global users
- **Horizontal scaling:** Sử dụng distributed systems (Cassandra, multiple DBs)
- **Load balancing:** Cân bằng tải cho tất cả services

### 7. Reliability

- **Data redundancy:** Replication trong database
- **Delayed deletion:** Recovery mechanism
- **High availability:** Multiple servers, load balancers

## Đánh giá bài viết

**Điểm mạnh:**

- Cover đầy đủ các khía cạnh: requirements, capacity estimation, database design, newsfeed, caching
- Đưa ra các giải pháp cụ thể cho các vấn đề scale
- Hybrid Push/Pull model là approach thực tế và hiệu quả
- Có tính đến 80-20 rule cho caching

**Điểm có thể cải thiện:**

- Thiếu chi tiết về ranking algorithm cho newsfeed
- Không đề cập đến image processing (resize, compression)
- Chưa có chi tiết về search functionality
- Thiếu discussion về consistency models
- Không đề cập đến monitoring và observability

**Kết luận:**
Bài viết cung cấp overview tốt về thiết kế hệ thống photo-sharing, đặc biệt mạnh về newsfeed strategy và caching. Phù hợp cho người mới bắt đầu học system design, nhưng cần bổ sung thêm chi tiết về các aspects khác để có thiết kế production-ready.