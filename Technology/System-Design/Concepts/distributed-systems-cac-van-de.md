---
area: technology
domain: system-design
type: resource
---
# Distributed Systems - Các vấn đề

> https://viblo.asia/p/nhung-van-de-trong-he-thong-phan-tan-phan-1-pgjLNKvdV32

## 1. Faults and Partial Failures

- **Khác biệt với hệ thống đơn lẻ:**
  - Trên một máy tính đơn, phần mềm hoặc hoạt động hoàn toàn hoặc không hoạt động (all-or-nothing)
  - Trong hệ thống phân tán, có thể xảy ra **partial failure** - một phần hệ thống bị lỗi theo cách không lường trước được
  - Partial failure là **không tất định** (non-deterministic), khó dự đoán và khó phát hiện

- **Nguyên nhân:**
  - Thời gian truyền message trong network là không tất định
  - Có thể không biết được một node đang hoạt động hay không do độ trễ mạng

## 2. Cloud Computing vs Supercomputing

### 2.1 Triết lý khác biệt

- **HPC (High Performance Computing) / Supercomputing:**
  - Triết lý giống một máy tính đơn: nếu một node hỏng thì dừng cả cluster
  - Chờ đến khi vấn đề được xử lý, restart từ checkpoint gần nhất
  - "Just let everything crash" - tương tự kernel panic trên máy đơn

- **Cloud Computing:**
  - Cần đảm bảo tính **sẵn sàng** (availability) khi user request
  - Sử dụng phần cứng phổ thông với giá thành rẻ hơn, nhưng khả năng fail cao hơn
  - Network topology khác: **Clos topology** (IP & Ethernet) vs multi-dimensional meshes và toruses (HPC)

### 2.2 Lý do không thể áp dụng triết lý HPC cho internet services

- **Tính sẵn sàng:** Cần đảm bảo service luôn sẵn sàng cho user
- **Chi phí phần cứng:** Cloud service sử dụng phần cứng phổ thông, rẻ hơn nhưng dễ lỗi hơn
- **Network topology:**
  - HPC: multi-dimensional meshes và toruses
  - Cloud: Clos topology (IP & Ethernet)
- **Tỷ lệ lỗi:** Hệ thống càng lớn thì rủi ro một phần hệ thống lỗi càng lớn
  - Trong hệ thống hàng ngàn node, hợp lý khi cho rằng luôn có gì đó đang lỗi
  - Nếu dừng hệ thống khi có sự cố, sẽ tốn thời gian recover hơn là thực sự làm việc có ích
- **Fault tolerance cho operations:**
  - Nếu hệ thống có thể tolerate failed node, rất hữu ích cho operation và maintenance
  - Ví dụ: **rolling upgrade** - nâng cấp từng phần mà không dừng toàn bộ hệ thống
  - Trong cloud env, có thể kill VM không ổn định và khởi động lại
- **Khoảng cách và network:**
  - Ở khoảng cách xa, giao tiếp chủ yếu qua internet - chậm và không đáng tin như local network
  - Supercomputer thường có tất cả node gần nhau

### 2.3 Xây dựng hệ thống tin cậy từ thành phần không đáng tin cậy

- **Error-detecting code:** Xử lý sai số bits trong quá trình giao tiếp
- **Kết hợp giao thức:** Sử dụng TCP (đáng tin cậy) trên nền IP (không đáng tin cậy)
- **Fault-tolerance:** Cần build cơ chế fault-tolerance vào software
- **Nguyên tắc:** Build hệ thống đáng tin cậy từ những thành phần không đáng tin cậy
- **Quy mô:** Kể cả hệ thống nhỏ với vài node cũng cần nghĩ tới partial failure

## 3. Unreliable Networks

### 3.1 Các vấn đề về network

- **Network không đáng tin cậy:**
  - Request có thể bị mất
  - Request có thể bị delay và đến muộn
  - Request có thể đến nhưng response bị mất
  - Response có thể bị delay và đến muộn

- **Nguyên nhân:**
  - Network partition: Mạng bị chia cắt, một số node không thể giao tiếp với nhau
  - Network congestion: Tắc nghẽn mạng
  - Network switch failures: Lỗi switch mạng
  - Network cable issues: Vấn đề về cáp mạng

### 3.2 Timeout và phát hiện lỗi

- **Timeout:**
  - Cần timeout để phát hiện node không phản hồi
  - Timeout quá ngắn: Phát hiện lỗi sai (false positive)
  - Timeout quá dài: Phát hiện lỗi chậm, ảnh hưởng đến user experience

- **Cách xác định timeout hiệu quả:**
  - Dựa trên **thực nghiệm**: Đo thời gian truyền khứ hồi trên nhiều máy, trong thời gian dài
  - Điều chỉnh để cân bằng giữa phát hiện lỗi nhanh và tránh timeout sai

- **Tối ưu timeout:**
  - Sử dụng **Phi Accrual failure detector** (như trong Akka, Cassandra) để tự động điều chỉnh timeout dựa trên biến động độ trễ
  - TCP cũng có cơ chế timeout động tương tự

### 3.3 Tắc nghẽn mạng và hàng đợi

- **Các điểm tắc nghẽn:**
  - Network switch queues
  - OS queues
  - VM queues
  - TCP flow control

- **TCP vs UDP:**
  - **TCP:** Đảm bảo độ tin cậy nhưng có thể gây độ trễ biến đổi do kiểm soát luồng và truyền lại gói tin
  - **UDP:** Không kiểm soát luồng, không gửi lại gói tin mất, giúp giảm độ trễ nhưng không đảm bảo dữ liệu đến nơi
  - **Ứng dụng UDP:** VoIP, video call - nếu gói tin bị mất, không có thời gian để gửi lại, ứng dụng phải chấp nhận mất dữ liệu (ví dụ: mất âm thanh tạm thời)

- **Biến động độ trễ trong môi trường đám mây:**
  - Tài nguyên mạng trong cloud & datacenter đa khách hàng (multi-tenant) bị chia sẻ
  - Độ trễ thay đổi lớn nếu có "hàng xóm ồn ào" (noisy neighbor) sử dụng nhiều băng thông
  - Batch workloads như MapReduce có thể làm nghẽn mạng đột ngột

## 4. Synchronous vs Asynchronous Networks

### 4.1 Mạng điện thoại (Circuit Switching)

- **Đặc điểm:**
  - Cực kỳ đáng tin cậy
  - Lượng data cố định (fixed)
  - Không có queuing → bounded delay
  - **Circuit Switching:** Dành riêng một kênh truyền cho mỗi cuộc gọi

### 4.2 TCP/IP (Packet Switching)

- **Đặc điểm:**
  - Dùng băng thông khả dụng
  - Lượng data không rõ kích thước
  - Cố gắng gửi trong thời gian nhanh nhất có thể
  - Không chiếm băng thông khi idle
  - **Packet Switching:** Chia nhỏ dữ liệu thành các gói và gửi qua mạng

### 4.3 Tại sao Ethernet và IP chọn Packet Switching

- **Tối ưu cho busty traffic:**
  - Request thông thường không rõ dung lượng
  - Chỉ cần gửi nhanh nhất có thể
  - Circuit switching không phù hợp vì:
    - Nếu đoán băng thông quá thấp → chuyển chậm do network capacity không được sử dụng hết
    - Nếu đoán băng thông cao → circuit không thể setup được, vì băng thông cấp phát phải được đảm bảo
  - TCP đáp ứng được lượng dữ liệu chuyển phát qua mạng khả dụng

### 4.4 Hybrid Networks

- **Nỗ lực kết hợp:**
  - ATM (Asynchronous Transfer Mode): Kết hợp circuit switching và packet switching
  - Không được chấp nhận rộng rãi ngoài các switch mạng cốt lõi của hệ thống điện thoại
  - **InfiniBand:** Hỗ trợ kiểm soát luồng từ đầu đến cuối ở tầng liên kết, giúp giảm nhu cầu xếp hàng
  - Sử dụng QoS (Quality of Service) và admission control để mô phỏng circuit switching trên packet network hoặc cung cấp độ trễ có giới hạn có thể thống kê được

### 4.5 Độ trễ biến đổi

- **Nguyên nhân:**
  - Hệ quả của việc phân chia tài nguyên động (dynamic resource partitioning)
  - Mạng điện thoại cố định: Băng thông được cấp phát tĩnh, ngay cả khi không sử dụng hết
  - Internet: Chia sẻ băng thông động, tối ưu tài nguyên nhưng gây ra xếp hàng (queueing)

- **Tương tự với CPU:**
  - CPU được chia sẻ động giữa nhiều luồng (threads)
  - Một luồng có thể bị trì hoãn khi chờ CPU
  - Cách này tận dụng phần cứng tốt hơn so với cấp phát tài nguyên cố định

- **Trade-off:**
  - **Đảm bảo độ trễ thấp:** Có thể đạt được bằng cách cấp phát tài nguyên tĩnh, nhưng làm giảm hiệu suất và tốn kém hơn
  - **Chia sẻ động:** Tối ưu hóa sử dụng tài nguyên và giảm chi phí, nhưng đánh đổi bằng độ trễ biến đổi

## 5. Unreliable Clocks

- **Vấn đề về đồng hồ trong hệ thống phân tán:**
  - Mỗi node có đồng hồ riêng (hardware clock)
  - Đồng hồ có thể không đồng bộ giữa các node
  - Đồng hồ có thể drift (lệch thời gian) theo thời gian
  - Đồng hồ có thể bị điều chỉnh (clock skew) do NTP hoặc các yếu tố khác

- **Tác động:**
  - Khó xác định thứ tự sự kiện giữa các node
  - Khó đảm bảo tính nhất quán dữ liệu dựa trên timestamp
  - Cần các cơ chế như vector clocks, logical clocks để xử lý ordering

## 6. Long-tail Latency

- **Vấn đề:** User thi thoảng gặp phải độ trễ cực lớn trong hệ thống phân tán
- **Nguyên nhân:** Tranh chấp tài nguyên, garbage collection, hardware bottleneck
- **Tác động:** Trong hệ thống có nhiều service, xác suất user gặp latency cao tăng đáng kể (ví dụ: 100 service với p99=1s → 63% user gặp latency > 1s)
- **Giải pháp:** [[hedged-request]] - kỹ thuật gửi request tới nhiều replica và sử dụng kết quả từ replica phản hồi sớm nhất