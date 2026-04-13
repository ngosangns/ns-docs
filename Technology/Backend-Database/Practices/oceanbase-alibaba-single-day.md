---
area: technology
domain: backend-database
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Case Study: OceanBase & Alibaba Single Day 11.11

## 1. Tổng quan sự kiện (Performance Metrics)
- **Đỉnh điểm traffic:** 544,000 TPS (Transactions Per Second) - đạt được chỉ trong 3 giây từ 50k TPS.
- **Thời gian kỷ lục:** 1 tỷ USD đầu tiên trong 68 giây, 10 tỷ USD trong chưa đầy 30 phút.
- **Kết quả cuối ngày:** 
    - 1.3 tỷ đơn hàng.
    - 34 tỷ USD doanh thu.
    - **Zero loss, zero downtime**.
- **So sánh:** Visa (65k TPS), Paypal (10k TPS).

## 2. Tại sao chọn OceanBase thay vì Database truyền thống?
- **Vấn đề của DB truyền thống:**
    - **Oracle:** Bottleneck tại shared storage và global lock khi TPS cực cao.
    - **MySQL/PostgreSQL:** Khó khăn trong việc sharding hàng vạn node và xử lý distributed transaction (2PC) ở tầng app khi traffic nhảy vọt.
    - **NoSQL:** Chỉ đảm bảo eventual consistency, rủi ro cao cho thanh toán.
- **OceanBase:** Hệ quản trị CSDL phân tán (Distributed Database) giải quyết được: Strong consistency, RPO ≈ 0, RTO cực thấp và khả năng scale spike write khổng lồ.

## 3. Kiến trúc kỹ thuật cốt lõi (Core Architecture)
- **Thành phần chính:**
    - **OBProxy:** Định tuyến request thông qua tính toán hash (user_id) để tìm đúng OBServer.
    - **OBServer:** Xử lý SQL và lưu trữ dữ liệu.
    - **RootService:** Quản lý metadata và load balancing.
- **Cơ chế Partitioning (Colocation):**
    - Đặt toàn bộ dữ liệu liên quan (orders, payments, balance) của cùng một user vào cùng một server.
    - **Kết quả:** 95% giao dịch là Local Transaction (2ms), tránh overhead của mạng (15-30ms).

## 4. Lưu trữ & Hiệu năng (Storage Engine)
- **LSM-Tree Storage:**
    - **Write-heavy optimization:** Ghi trực tiếp vào MemTable (RAM) cực nhanh.
    - **Flush & Compaction:** Định kỳ đẩy xuống disk thành Mini/Minor SSTable. Major Compaction chạy background (thường là 3am) giúp tiết kiệm 80% I/O.
- **Compression (Nén dữ liệu sâu):**
    - Sử dụng Dictionary Encoding, Delta Encoding, Run-Length Encoding.
    - Giảm dung lượng từ 32.5TB xuống còn 6.5TB (tiết kiệm 80% storage).
- **Cache Architecture:** 
    - Row Cache (tăng tốc point query 40 lần) và Block Cache.
    - Cơ chế **Cache Warming** nạp trước dữ liệu hot vào RAM sau khi compaction.

## 5. Đảm bảo an toàn dữ liệu (High Availability)
- **Paxos Replication:**
    - Sử dụng 5 replicas (1 Leader, 4 Followers).
    - Chỉ cần 3/5 node xác nhận (Majority) là commit thành công (thường mất 5ms).
- **Khả năng chịu lỗi (High Availability):**
    - **RPO = 0:** Không mất dữ liệu ngay cả khi toàn bộ Datacenter mất điện.
    - **RTO < 30s:** Tự động bầu Leader mới và cập nhật bảng định tuyến trong vòng dưới 30 giây.

## 6. Tính năng nâng cao
- **HTAP (Hybrid Transactional/Analytical Processing):**
    - Xử lý đồng thời OLTP (giao dịch) và OLAP (phân tích dashboard real-time).
    - Sử dụng Column-oriented storage và Vector execution cho các truy vấn phân tích.
- **Dynamic Load Balancing:**
    - Tự động phát hiện node quá tải (CPU > 95%).
    - Thực hiện Split (tách partition) và Migrate (di dời) sang node rảnh mà không gây downtime.

## 7. Đánh đổi (Trade-offs)
- **Hạ tầng:** Cần ít nhất 3-5 bản sao, tốn tài nguyên gấp 3-5 lần DB truyền thống.
- **Vận hành:** Debug hệ thống phân tán phức tạp, đòi hỏi hệ thống giám sát (monitoring) tinh vi để xác định lỗi do mạng hay do node.

---
*Nguồn: Tổng hợp từ Alibaba, OceanBase, Baidu và Open Source cộng đồng.*