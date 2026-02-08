```ngosangns-obsidian/Technology/System-Design/Azure Design Patterns/Leader Election Pattern.md#L1-55
# Leader Election Pattern (Mô hình Bầu chọn Lãnh đạo)

Điều phối hành động của một tập hợp các thực thể (instances) cộng tác trong một ứng dụng phân tán bằng cách bầu ra một thực thể làm "lãnh đạo" (leader). Thực thể này sẽ chịu trách nhiệm quản lý các thực thể khác, giúp tránh xung đột, tranh chấp tài nguyên chung hoặc vô tình can thiệp vào công việc của nhau.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Trong hệ thống đám mây có khả năng mở rộng ngang, nhiều instance của cùng một tác vụ có thể chạy đồng thời. Nếu chúng cùng truy cập vào một tài nguyên chung (ví dụ: ghi vào cùng một file, tổng hợp kết quả tính toán), cần có sự điều phối để tránh ghi đè dữ liệu hoặc lãng phí tài nguyên.
- **Giải pháp:** Bầu ra một node duy nhất làm Leader để điều phối. Tất cả các node khác trở thành Follower (node cấp dưới).
- **Cơ chế bầu chọn phổ biến:**
    - **Sử dụng Mutex phân tán (Shared Distributed Mutex):** Các instance chạy đua để giành được một khóa (lock) trên một tài nguyên chung. Instance đầu tiên giành được khóa sẽ trở thành Leader.
    - **Thuật toán đồng thuận (Consensus Algorithms):** Sử dụng các thuật toán như Bully, Raft hoặc Ring để tự động bầu chọn dựa trên ID của các node.
- **Duy trì vai trò Leader:**
    - Leader phải thường xuyên gửi tín hiệu "nhịp tim" (heartbeat) hoặc gia hạn khóa (lease) để khẳng định mình vẫn đang hoạt động.
    - Các node khác theo dõi Leader. Nếu Leader gặp sự cố hoặc mất kết nối, một cuộc bầu chọn mới sẽ được kích hoạt ngay lập tức.
- **Các thách thức cần lưu ý:**
    - **Điểm yếu duy nhất (Single Point of Failure):** Nếu dịch vụ cung cấp Mutex (ví dụ: Azure Blob Storage) bị hỏng, hệ thống không thể bầu Leader.
    - **Nút thắt cổ chai:** Leader có thể trở thành điểm nghẽn nếu nó phải xử lý quá nhiều việc điều phối.
    - **Tính linh hoạt:** Hệ thống cần xử lý được trường hợp node Leader bị tắt do cơ chế tự động giảm quy mô (autoscaling).

## Khi nào nên sử dụng

- Khi các tác vụ trong ứng dụng phân tán cần sự điều phối chặt chẽ mà không có một quy trình điều phối tự nhiên nào.
- Khi cần quản lý quyền truy cập độc quyền vào tài nguyên dùng chung.
- Khi cần một thực thể chịu trách nhiệm tổng hợp dữ liệu từ nhiều nguồn tính toán song song.

## Khi nào không nên sử dụng

- Khi đã có sẵn một tiến trình chuyên biệt (dedicated process) đóng vai trò lãnh đạo cố định.
- Khi sự điều phối có thể đạt được bằng các phương pháp nhẹ nhàng hơn như khóa lạc quan (optimistic locking) hoặc khóa bi quan (pessimistic locking).
- Khi có thể sử dụng các giải pháp của bên thứ ba chuyên dụng hơn như Apache ZooKeeper.

## Ví dụ thực tế trên Azure
Sử dụng cơ chế **Lease Blob** trên Azure Storage. Một node sẽ cố gắng lấy quyền "lease" trên một file blob cụ thể. Nếu thành công, nó trở thành Leader trong khoảng thời gian lease đó (ví dụ 15-60 giây) và phải liên tục gia hạn (renew) để giữ vai trò. Nếu node chết, lease sẽ hết hạn và các node khác có thể nhảy vào chiếm quyền.

---
*Nguồn tham khảo: [Microsoft Learn - Leader Election Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/leader-election)*
