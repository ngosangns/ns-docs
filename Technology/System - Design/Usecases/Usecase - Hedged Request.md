---
tags:
  - area/technology
  - domain/system-design
  - type/resource
  - lang/vi
---

# Hedged Request

> Nguồn: [50 Days of System Design - Hedged Request](https://quanghoang.substack.com/p/50-days-of-sd-hedged-request) - Quang Hoang (Mar 15, 2025)
> Paper gốc: [The Tail at Scale](https://research.google/pubs/pub40801/) - Jeff Dean và Luiz Barroso (2013)

## Long-tail Latency

- **Định nghĩa:** Hiện tượng user thi thoảng gặp phải độ trễ cực lớn (lag) khi sử dụng các ứng dụng hay website
- **Đo lường:** Sử dụng percentiles (bách vị phân)
  - **p50:** 50% user trải nghiệm độ trễ thấp hơn giá trị này
  - **p90:** 90% user trải nghiệm độ trễ thấp hơn giá trị này
  - **p99:** 99% user trải nghiệm độ trễ thấp hơn giá trị này
- **Tác động kinh doanh:**
  - Amazon: Mỗi 100ms latency khiến mất 1% doanh thu (doanh thu 2024 > $600B)
  - Google (2006): Mỗi 0.5s latency tăng thêm ở trang tìm kiếm làm giảm 20% lưu lượng truy cập
- **Vấn đề trong hệ thống phân tán:**
  - Hệ thống thường bao gồm nhiều service khác nhau
  - Độ trễ của user phụ thuộc vào service trả về kết quả chậm nhất
  - Ví dụ: Nếu Google phụ thuộc vào 100 service, mỗi service có p99 = 1s
    - Xác suất user gặp latency > 1s lên tới **63%** (thay vì 1%)
    - Công thức: `P(at least 1 slow) = 1 - P(fast request)^100 = 1 - 0.99^100 ≈ 63%`

## Nguyên nhân Long-tail Latency

1. **Tranh chấp tài nguyên (Resource Contention)**
   - Datacenter chia sẻ bởi nhiều service khác nhau
   - Tranh chấp tài nguyên chung: CPU, băng thông, bộ nhớ, network, file system
   - Cronjob chạy ngầm có thể sử dụng nhiều tài nguyên và khiến hệ thống giật cục

2. **Garbage Collection (GC)**
   - GC dọn dẹp bộ nhớ cần truy cập độc quyền vào heap memory
   - Khiến các ứng dụng khác trên server phải tạm dừng hoạt động

3. **Hardware Bottleneck**
   - Các vấn đề về phần cứng gây ra độ trễ không đều

## Hedged Request - Giải pháp

### Khái niệm

- **Định nghĩa:** Kỹ thuật được sử dụng phổ biến ở Google để hạn chế long-tail latency
- **Ý tưởng:** Gửi cùng 1 request tới nhiều replica server, sử dụng kết quả từ replica phản hồi sớm nhất

### Cách hoạt động

1. Gửi request đầu tiên tới replica server **X** và đợi khoảng thời gian **D (ms)**
2. Nếu **X** vẫn chưa phản hồi sau thời gian **D**, gửi hedged request tới replica server **Y** khác
3. Sau khi nhận được phản hồi đầu tiên từ **X** hoặc **Y**, hủy request còn lại
4. Lặp lại quá trình này nếu cả **X** và **Y** đều không phản hồi sau khoảng thời gian **2\*D**

### Khác biệt với Retry

- **Retry:** Gửi lại request khi request đầu tiên bị timeout
- **Hedged Request:** Chủ động gửi lại request sau khoảng thời gian **D** ngắn hơn timeout rất nhiều

### Lưu ý quan trọng

1. **Idempotency (Tính bất biến)**
   - API cung cấp bởi các replica server phải có tính idempotent
   - Cùng một request được gửi đi nhiều lần sẽ luôn cho ra cùng một kết quả
   - Ví dụ: Gửi request thanh toán cùng một order 10 lần, thẻ tín dụng chỉ bị trừ tiền một lần

2. **Chọn giá trị D phù hợp**
   - **D quá nhỏ:** Dẫn đến overload hệ thống, quá nhiều hedged request → Retry Storm
   - **D quá lớn:** Làm giảm hiệu quả của Hedged Request
   - **Giải pháp:** Chọn **D = p95 latency hiện tại**
     - Chỉ gửi hedged request cho 5% request chậm nhất
     - Đảm bảo lượng tải phát sinh từ hedged request được giới hạn trong khoảng 5% tổng số request
     - Vẫn đảm bảo hiệu quả giảm thiểu long-tail latency
   - **Thuật toán tính percentile:** DDSketch, TDigest (cho stream data theo thời gian thực)

### Kết quả thực tế

- **Thử nghiệm:** Đọc 1000 key từ 100 server Google Bigtable với D = 10ms
- **Kết quả:**
  - **p99.9 latency giảm từ 1800ms xuống còn 74ms**
  - **Chỉ tăng load cho hệ thống 2%**

### Triển khai

- **Envoy:** Support request hedging (khá thô sơ)
- **gRPC:** Support request hedging (khá thô sơ)

## Các giải pháp khác trong "The Tail at Scale"

- **Tied Request:** Kỹ thuật khác để giảm long-tail latency
- **Micro-partition:** Giải pháp phân chia dữ liệu nhỏ hơn

## Kết luận

- Long-tail latency là thách thức dai dẳng trong hệ thống phân tán lớn
- Nguyên nhân thường đến từ các yếu tố ngoài tầm kiểm soát (infrastructure)
- Hedged Request không giải quyết triệt để nguyên nhân nhưng có thể giảm thiểu tác động tới trải nghiệm người dùng
- Triết lý: "Cure the symptoms not the disease"
