---
area: technology
domain: system-design
topic: system-design
type: resource
title: System Design Tong Quan
description: Tổng quan về Thiết kế Hệ thống
timestamp: '2026-06-19T13:43:26.112Z'
tags:
  - technology
  - system-design
resource: https://viblo.asia/p/danh-doi-giua-tinh-nhat-quan-va-tinh-san-sang-tradeoff-between-consistency-and-availability-5OXLAvlxVGr
---

# 1. Tổng quan về Thiết kế Hệ thống

## 1.1. Các Nguyên tắc Cơ bản

### 1.1.1. Đánh đổi (Trade-offs)

#### 1.1.1.1. Đánh đổi giữa tính nhất quán và tính sẵn sàng

Bài viết giải thích về định lý CAP (Consistency, Availability, Partition tolerance) và sự đánh đổi giữa tính nhất quán (dữ liệu luôn đồng bộ trên mọi nút) và tính sẵn sàng (hệ thống luôn phản hồi yêu cầu). Trong một hệ thống phân tán, không thể đảm bảo cả ba yếu tố cùng lúc, thường phải chọn giữa C và A khi xảy ra phân vùng mạng (P).
Nguồn: https://viblo.asia/p/danh-doi-giua-tinh-nhat-quan-va-tinh-san-sang-tradeoff-between-consistency-and-availability-5OXLAvlxVGr

## 1.2. Các Vấn đề Thường Gặp và Giải Pháp trong Thiết kế Hệ thống

Dưới đây là 8 vấn đề phổ biến trong thiết kế hệ thống và các giải pháp thường được áp dụng:

1. Caching – Tăng tốc độ đọc
   - Vấn đề: Lượng truy vấn đọc lớn gây quá tải cơ sở dữ liệu (DB).
   - Giải pháp: Sử dụng các hệ thống caching như Redis hoặc Memcached để lưu trữ dữ liệu từ các truy vấn phổ biến, giảm tải cho DB và tăng tốc độ phản hồi.

2. Async Write & LSM-Tree DB – Xử lý ghi hiệu quả
   - Vấn đề: Lượng ghi dữ liệu cao làm nghẽn DB, ảnh hưởng đến hiệu năng.
   - Giải pháp: Áp dụng cơ chế ghi bất đồng bộ (asynchronous write) thông qua hàng đợi tin nhắn (message queue) như Kafka, RabbitMQ. Sử dụng các loại DB được tối ưu cho việc ghi dữ liệu như Cassandra, RocksDB (sử dụng cấu trúc Log-Structured Merge-Tree - LSM-Tree).

3. Redundancy & Failover – Tăng tính sẵn sàng
   - Vấn đề: Hệ thống có một điểm lỗi duy nhất (Single Point of Failure - SPOF) khi chỉ có một máy chủ hoặc một thành phần quan trọng.
   - Giải pháp: Triển khai cơ chế nhân bản dữ liệu (replication) và chuyển đổi dự phòng tự động (automatic failover) giữa máy chủ chính (master) và các máy chủ bản sao (replica) để đảm bảo hệ thống vẫn hoạt động khi có sự cố.

4. Load Balancer – Phân phối tải
   - Vấn đề: Máy chủ bị quá tải khi lưu lượng truy cập (traffic) tăng cao.
   - Giải pháp: Sử dụng Bộ cân bằng tải (Load Balancer) như Nginx, AWS Application Load Balancer (ALB) để phân phối đều các yêu cầu của người dùng đến nhiều máy chủ, tránh tình trạng quá tải cho bất kỳ máy chủ đơn lẻ nào.

5. CDN (Content Delivery Network) – Giảm độ trễ
   - Vấn đề: Người dùng ở vị trí địa lý xa máy chủ chính gặp phải độ trễ cao khi truy cập nội dung.
   - Giải pháp: Sử dụng Mạng phân phối nội dung (CDN) như Cloudflare, AWS CloudFront để lưu trữ bản sao của các tệp tĩnh (hình ảnh, video, CSS, JavaScript) tại các máy chủ biên gần người dùng, giúp giảm độ trễ và tăng tốc độ tải trang.

6. Block/Object Storage – Quản lý file lớn
   - Vấn đề: Lưu trữ các tệp tin lớn trực tiếp trong DB làm tăng kích thước DB, làm chậm truy vấn và gây khó khăn cho việc quản lý.
   - Giải pháp: Sử dụng các dịch vụ lưu trữ khối (Block Storage) như Amazon EBS hoặc lưu trữ đối tượng (Object Storage) như Amazon S3 cho các tệp tin lớn. Metadata của các tệp này (ví dụ: đường dẫn, tên tệp, kích thước) có thể được lưu trong DB.

7. Centralized Logging – Quản lý log hiệu quả
   - Vấn đề: Khó khăn trong việc tìm kiếm và phân tích log lỗi khi hệ thống bao gồm nhiều máy chủ.
   - Giải pháp: Sử dụng một hệ thống quản lý log tập trung như ELK stack (Elasticsearch, Logstash, Kibana) hoặc EFK stack (Elasticsearch, Fluentd, Kibana) để thu thập, lưu trữ, tìm kiếm và phân tích log từ tất cả các thành phần của hệ thống tại một nơi.

8. Sharding & Index – Tối ưu truy vấn
   - Vấn đề: Truy vấn (query) chậm trên các DB có kích thước lớn.
   - Giải pháp:
     - Tạo chỉ mục (index) cho các trường dữ liệu thường xuyên được sử dụng trong điều kiện truy vấn để tăng tốc độ tìm kiếm.
     - Áp dụng kỹ thuật sharding (phân mảnh dữ liệu) để chia DB lớn thành nhiều phần nhỏ hơn (shards), mỗi shard được lưu trữ trên một nút (node) riêng biệt, giúp phân tán tải và cải thiện hiệu năng truy vấn.

![](/Attachments/a3b4c5d6-e7f8-091a-2b3c-4d5e6f708192.png)

## 1.3. Tài liệu và Công cụ Tham khảo

- Bách khoa toàn thư về thiết kế hệ thống: Tổng hợp kiến thức, khái niệm, giải pháp cho các vấn đề phổ biến và ví dụ thực tế. Rất hữu ích cho việc chuẩn bị phỏng vấn thiết kế hệ thống.
  - Nguồn: https://github.com/donnemartin/system-design-primer
- System Design the big archive: [e0f1a2b3-c4d5-6789-9a0b-c1d2e3f4a5b6.pdf](/Attachments/e0f1a2b3-c4d5-6789-9a0b-c1d2e3f4a5b6.pdf)
- System Design and architecture: [d6e7f809-1a2b-3c4d-5e6f-708192a3b4c5.pdf](/Attachments/d6e7f809-1a2b-3c4d-5e6f-708192a3b4c5.pdf)
- Prophecy Product Design Cheatsheet: [b4c5d6e7-f809-1a2b-3c4d-5e6f708192a3.pdf](/Attachments/b4c5d6e7-f809-1a2b-3c4d-5e6f708192a3.pdf)
- Software Architect & Architecture: Mindset, nhiệm vụ và những thứ bạn cần biết: Video thảo luận về vai trò của Kiến trúc sư Phần mềm, tư duy cần có, các nhiệm vụ chính và kiến thức cần thiết.
  - Nguồn: https://www.youtube.com/watch?v=AVhNryY5ujI
- System Architect (SA) là gì? Cách trở thành SA: Video giải thích vai trò của Kiến trúc sư Hệ thống, công việc và lộ trình để trở thành SA.
  - Nguồn: https://www.youtube.com/watch?v=v0CcoWqqZho
- Chuyện anh thợ xây P1: BUILD a write-heavy application: Phần 1 của series, tập trung xây dựng ứng dụng có lượng ghi dữ liệu lớn.
  - Nguồn: https://viblo.asia/p/chuyen-anh-tho-xay-p1-build-a-write-heavy-application-V3m5WQrEZO7#_code-thieu-nhi-thi-cung-phai-kiem-tra-dang-hoang-3
- Chuyện anh thợ xây P2: batch operation và công nghệ bê gạch:
  - Nguồn: https://viblo.asia/p/chuyen-anh-tho-xay-p2-batch-operation-va-cong-nghe-be-gach-RQqKL61Ml7z
- Chuyện anh thợ xây P3: Chuyện cái bộ đếm view:
  - Nguồn: https://viblo.asia/p/chuyen-anh-tho-xay-p3-chuyen-cai-bo-dem-view-5OXLAYrZLGr

> **Xem thêm:** [Tổng hợp System Design & Design Patterns](/Technology/System-Design/Practices/Solutions System Designs Design Patterns)
