---
area: technology
domain: backend
type: resource
title: Postgresql HA Patroni Best Practices
description: PostgreSQL HA với Patroni - Tổng hợp Best Practices
timestamp: "2026-06-19T13:43:26.152Z"
tags:
  - technology
  - backend
resource: https://devops.vn/posts/ivory-bien-viec-quan-tri-postgresql-ha-patroni-tro-nen-nhan-hon
---

# PostgreSQL HA với Patroni - Tổng hợp Best Practices

> - Link: https://devops.vn/posts/ivory-bien-viec-quan-tri-postgresql-ha-patroni-tro-nen-nhan-hon
> - Các ý kiến từ cộng đồng về stack PostgreSQL + Patroni + PgBouncer + etcd
> - Đánh giá về Ivory và khi nào nên dùng CLI vs UI

## 1. Tổng quan về Ivory

### 1.1. Ivory là gì?

**Ivory** là một công cụ quản trị UI mã nguồn mở dành riêng cho PostgreSQL Cluster (Patroni). Nó đóng vai trò là **management plane** giúp đơn giản hóa các thao tác vận hành hàng ngày, không thay thế hoàn toàn CLI hay các hệ thống Monitor như Grafana.

### 1.2. Kiến trúc và Cài đặt

- **Backend:** Golang - nhẹ và hiệu năng cao
- **Deployment:** Docker container đơn giản
- **Port:** 8080 (mặc định)
- **Authentication:** Secret Word (bắt buộc), Basic Auth (khuyến nghị cho production)

```bash
docker run -d \
  -p 8080:80 \
  --name ivory \
  --restart unless-stopped \
  ghcr.io/veegres/ivory:latest
```

## 2. Tính năng chính của Ivory

### 2.1. Giao diện trực quan

- **Visualization:** Hiển thị trực quan node Leader/Replica (Sync/Async)
- **Replication Lag:** Hiển thị realtime từ Patroni metadata
- **Switchover/Failover:** Thực hiện qua UI với một click
- **Scheduled Switchover:** Hẹn giờ chuyển đổi Master tự động

### 2.2. Maintenance Mode

- **Pause:** Đóng băng trạng thái cluster trong DCS, vô hiệu hóa auto-failover
- **Resume:** Trả lại quyền điều khiển cho Patroni sau khi bảo trì
- **Use Case:** OS Patching, minor version upgrade, thay đổi phần cứng

### 2.3. Database Maintenance

- **Bloat Detection:** Hiển thị tỷ lệ Bloat của Tables và Indexes
- **Compaction:** Tích hợp `pgcompacttable` để thực hiện compaction trên UI
- **Advantage:** Thu hồi dung lượng đĩa mà hạn chế lock (khác với `VACUUM FULL`)

### 2.4. Configuration Management

- **DCS Configuration:** Sửa đổi cấu hình toàn cục cho cả cluster
- **Local Configuration:** Điều chỉnh cấu hình cho từng node riêng biệt
- **Hot Reload:** Gửi tín hiệu `SIGHUP` để reload config nóng
- **Rolling Restart:** Khởi động lại các node nếu cần thiết

### 2.5. Query Console

- **Role Awareness:** Phân biệt query chạy trên Leader (Write) vs Replica (Read-only)
- **Template Repository:** Lưu lại các câu lệnh troubleshooting thường dùng
- **Use Case:** Check `pg_stat_activity`, check lock, check replication slots

## 3. Stack Architecture - Best Practices

### 3.1. Stack được khuyến nghị

Dựa trên kinh nghiệm thực tế từ cộng đồng:

```
PostgreSQL + Patroni + PgBouncer + etcd
```

**Lý do:**

- **PostgreSQL:** Database engine chính
- **Patroni:** High Availability framework, quản lý failover tự động
- **PgBouncer:** Connection pooling, giảm overhead kết nối
- **etcd:** Distributed Configuration Store (DCS) cho Patroni

### 3.2. Alternative: Autobase

Một số team sử dụng **Autobase** với stack tương tự và đánh giá "khá là ổn":

- Tích hợp sẵn các component cần thiết
- Giảm thiểu công việc setup và configuration

## 4. Khi nào dùng Ivory vs CLI?

### 4.1. Ivory phù hợp cho:

✅ **Daily Operations cho Dev Team:**

- Dev ít kinh nghiệm với CLI
- Cần trực quan hóa trạng thái cluster
- Thực hiện các thao tác thường xuyên: switchover, maintenance mode
- Query console với template sẵn có

✅ **Routine Tasks:**

- Scheduled switchover
- Configuration management tập trung
- Bloat monitoring và compaction
- Quick health checks

### 4.2. CLI (Terminal) vẫn là "chân ái" cho:

✅ **Sự cố phức tạp (Complex Incidents):**

- Cần debug sâu, phân tích log chi tiết
- Troubleshooting các vấn đề edge case
- Tích hợp với các script automation
- Kiểm soát hoàn toàn các thao tác

✅ **Advanced Operations:**

- Fine-tuning performance
- Custom monitoring và alerting
- Integration với các tool khác
- Emergency recovery scenarios

### 4.3. Best Practice: Hybrid Approach

**Khuyến nghị:**

- **Ivory:** Dùng cho daily operations, monitoring, routine tasks
- **CLI:** Dùng cho troubleshooting, advanced operations, incident response
- **Kết hợp:** Sử dụng cả hai tùy theo tình huống

## 5. Technical Details - Replication Lag Monitoring

### 5.1. Cách Ivory lấy Replication Lag

**Câu hỏi:** Ivory lấy replication lag trực tiếp từ Patroni API hay query từ `pg_stat_replication`?

**Trả lời:**

- **Chủ yếu lấy từ Patroni metadata** (không poll trực tiếp DB quá nhiều)
- Patroni đã aggregate thông tin replication lag từ các node
- Giảm thiểu load lên database bằng cách sử dụng metadata có sẵn

### 5.2. Implication

**Ưu điểm:**

- Giảm overhead query lên PostgreSQL
- Sử dụng dữ liệu đã được Patroni xử lý và validate
- Consistent với trạng thái mà Patroni sử dụng để quyết định failover

**Lưu ý:**

- Có thể có độ trễ nhỏ so với query trực tiếp `pg_stat_replication`
- Phụ thuộc vào tần suất Patroni cập nhật metadata

## 6. Best Practices Tổng hợp

### 6.1. Architecture

1. **Stack chuẩn:** PostgreSQL + Patroni + PgBouncer + etcd
2. **DCS:** etcd là lựa chọn phổ biến và ổn định
3. **Connection Pooling:** Luôn sử dụng PgBouncer để tối ưu kết nối

### 6.2. Management Tools

1. **Ivory cho Daily Ops:**
   - Setup Ivory cho dev team
   - Sử dụng cho routine tasks và monitoring
   - Template queries cho common troubleshooting

2. **CLI cho Advanced:**
   - Giữ kỹ năng CLI cho incident response
   - Script automation cho các tác vụ phức tạp
   - Deep debugging và performance tuning

### 6.3. Monitoring

1. **Replication Lag:**
   - Sử dụng Patroni metadata (như Ivory) để giảm DB load
   - Query trực tiếp `pg_stat_replication` khi cần độ chính xác cao
   - Kết hợp cả hai approach tùy use case

2. **Health Checks:**
   - Ivory cho quick visual checks
   - CLI/scripts cho detailed health monitoring
   - Tích hợp với Grafana/Prometheus cho long-term metrics

### 6.4. Maintenance

1. **Scheduled Maintenance:**
   - Sử dụng Ivory Scheduled Switchover
   - Enable Maintenance Mode trước khi thực hiện OS patching
   - Document quy trình và test trên staging

2. **Bloat Management:**
   - Monitor bloat thường xuyên qua Ivory
   - Sử dụng `pgcompacttable` thay vì `VACUUM FULL` khi có thể
   - Schedule compaction vào off-peak hours

### 6.5. Configuration

1. **Centralized Config:**
   - Sử dụng Ivory để quản lý DCS configuration
   - Version control cho configuration changes
   - Test config changes trên staging trước

2. **Hot Reload:**
   - Ưu tiên `SIGHUP` reload khi có thể
   - Rolling restart chỉ khi cần thiết
   - Coordinate với team trước khi restart

## 7. Kết luận

### 7.1. Tóm tắt

- **Ivory** là công cụ quản lý UI tuyệt vời cho PostgreSQL HA với Patroni
- Phù hợp cho **daily operations** và **dev team** ít kinh nghiệm CLI
- **CLI vẫn cần thiết** cho các sự cố phức tạp và advanced operations
- **Hybrid approach** (Ivory + CLI) là best practice

### 7.2. Khuyến nghị

1. **Setup Ivory** cho môi trường production
2. **Đào tạo team** sử dụng cả Ivory và CLI
3. **Document** các thao tác thường dùng và troubleshooting procedures
4. **Monitor** replication lag và health metrics thường xuyên
5. **Test** các thao tác switchover/failover trên staging trước

### 7.3. Tài liệu tham khảo

- [Ivory GitHub](https://github.com/veegres/ivory)
- [Patroni Documentation](https://patroni.readthedocs.io/)
- [PostgreSQL High Availability](https://www.postgresql.org/docs/current/high-availability.html)
- [DevOps Vietnam - Ivory Article](https://devops.vn/posts/ivory-bien-viec-quan-tri-postgresql-ha-patroni-tro-nen-nhan-hon)

---

**Last Updated:** 2025-01-02  
**Source:** Tổng hợp từ bài viết DevOps Vietnam và ý kiến cộng đồng
