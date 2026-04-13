---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Pattern: Saga Choreography (Saga Vũ đạo)

Saga Choreography là một cách để duy trì tính toàn vẹn dữ liệu trong các giao dịch phân tán trải dài trên nhiều dịch vụ bằng cách sử dụng các đăng ký sự kiện (event subscriptions). Thay vì có một bộ điều khiển trung tâm, mỗi dịch vụ trong giao dịch sẽ thực hiện phần việc của mình và xuất bản các sự kiện để kích hoạt các bước tiếp theo trong các dịch vụ khác.

### Ý tưởng cốt lõi:
- **Tự điều phối**: Mỗi dịch vụ tham gia vào Saga sẽ phát ra sự kiện sau khi hoàn thành giao dịch địa phương của mình. Các dịch vụ khác nghe (subscribe) sự kiện đó và thực hiện hành động tương ứng.
- **Thay thế cho 2PC**: Trong kiến trúc microservices với mỗi dịch vụ một database riêng, việc sử dụng Two-Phase Commit (2PC) là rất khó khăn. Saga Choreography giải quyết vấn đề này bằng cách chuỗi các giao dịch địa phương lại với nhau.

### Trường hợp áp dụng:
- Hệ thống yêu cầu tính toàn vẹn dữ liệu trên nhiều kho lưu trữ khác nhau.
- Kho lưu trữ dữ liệu (như NoSQL) không hỗ trợ ACID transactions hoặc 2PC.
- Muốn tránh một điểm lỗi tập trung (single point of failure) từ một bộ điều phối trung tâm.
- Các dịch vụ tham gia Saga độc lập và cần sự liên kết lỏng lẻo (loose coupling).

### Các vấn đề cần lưu ý:
- **Độ phức tạp khi mở rộng**: Khi số lượng microservices tăng lên, việc quản lý các tương tác giữa chúng trở nên cực kỳ khó khăn.
- **Tính đối đẳng (Idempotency)**: Các dịch vụ phải có khả năng xử lý cùng một sự kiện nhiều lần mà không gây sai lệch dữ liệu.
- **Khả năng quan sát (Observability)**: Khó khăn trong việc theo dõi luồng giao dịch từ đầu đến cuối và debug khi có lỗi xảy ra.
- **Phụ thuộc vòng (Cyclic dependencies)**: Các dịch vụ có thể rơi vào tình trạng đợi sự kiện của nhau tạo thành vòng lặp vô tận hoặc deadlock.

### Triển khai trên AWS:
- **Amazon EventBridge**: Sử dụng các Event Bus để định tuyến sự kiện giữa các dịch vụ. Mỗi dịch vụ gửi kết quả của mình lên Event Bus, và các Rules sẽ xác định dịch vụ tiếp theo nào cần được kích hoạt.
- **AWS Lambda**: Mỗi bước trong Saga (bao gồm cả giao dịch chính và giao dịch bù đắp) được triển khai như một hàm Lambda.

### Ví dụ quy trình (Đặt hàng):
1. **Order Service**: Tạo đơn hàng (T1) -> Gửi sự kiện `Order placed` lên EventBridge.
2. **Inventory Service**: Nghe `Order placed` -> Cập nhật kho (T2) -> Gửi sự kiện `Inventory updated`.
3. **Payment Service**: Nghe `Inventory updated` -> Xử lý thanh toán (T3).
4. **Nếu Payment thất bại**: 
   - Payment Service chạy giao dịch bù đắp (C1) để hoàn tác thanh toán -> Gửi sự kiện `Payment failed`.
   - **Inventory Service**: Nghe `Payment failed` -> Hoàn lại kho (C2) -> Gửi sự kiện `Inventory reverted`.
   - **Order Service**: Nghe `Inventory reverted` -> Hủy đơn hàng (C3).
