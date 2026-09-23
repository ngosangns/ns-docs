---
area: technology
domain: system-design
type: note
title: Saga Orchestration
description: "Pattern: Saga Orchestration (Saga Chỉ huy)"
timestamp: "2026-06-19T13:43:26.125Z"
tags:
  - technology
  - system-design
---

# Pattern: Saga Orchestration (Saga Chỉ huy)

Saga Orchestration sử dụng một bộ điều phối trung tâm (**Orchestrator**) để quản lý và điều phối các giao dịch phân tán trải dài trên nhiều dịch vụ. Bộ điều phối này chịu trách nhiệm gọi các dịch vụ thành viên theo đúng thứ tự và kích hoạt các giao dịch bù đắp nếu có bất kỳ bước nào thất bại.

### Ý tưởng cốt lõi:

- **Bộ điều phối trung tâm**: Đóng vai trò như một người chỉ huy dàn nhạc, biết toàn bộ quy trình và ra lệnh cho các dịch vụ cụ thể thực hiện công việc.
- **Quản lý trạng thái**: Orchestrator theo dõi trạng thái của từng bước trong giao dịch phân tán và quyết định bước tiếp theo dựa trên kết quả trả về.

### Trường hợp áp dụng:

- Hệ thống yêu cầu tính toàn vẹn dữ liệu trên nhiều kho lưu trữ khác nhau.
- Các giao dịch phức tạp liên quan đến nhiều dịch vụ (nhiều hơn 3-4 dịch vụ).
- Khi muốn giảm sự phụ thuộc trực tiếp giữa các microservices (loose coupling) bằng cách tập trung logic điều phối vào một nơi duy nhất.
- Khi sử dụng NoSQL hoặc các hệ thống không hỗ trợ giao dịch ACID kiểu 2PC (Two-Phase Commit).

### Các vấn đề cần lưu ý:

- **Độ phức tạp**: Việc thiết kế các giao dịch bù đắp (compensatory transactions) và logic xử lý lỗi đòi hỏi sự đầu tư kỹ lưỡng.
- **Tính đối đẳng (Idempotency)**: Các dịch vụ thành viên phải có tính đối đẳng để xử lý việc Orchestrator gọi lại nhiều lần khi có lỗi tạm thời.
- **Điểm lỗi tập trung (Single Point of Failure)**: Nếu Orchestrator gặp sự cố, toàn bộ quy trình sẽ bị ngưng trệ. (Sử dụng các dịch vụ Managed như AWS Step Functions sẽ giúp giải quyết vấn đề này).
- **Độ trễ (Latency)**: Các bước giao dịch bù đắp có thể làm tăng tổng thời gian phản hồi của hệ thống.

### Triển khai trên AWS:

- **AWS Step Functions**: Là dịch vụ hoàn hảo để triển khai Orchestrator.
  - Cung cấp cơ chế máy trạng thái (State Machine) để quản lý luồng công việc.
  - Tích hợp sẵn khả năng xử lý lỗi (Error handling), thử lại (Retry) và chờ đợi (Wait).
  - Trực quan hóa quy trình giúp dễ dàng giám sát và debug.
- **AWS Lambda**: Thực hiện các tác vụ cụ thể của từng dịch vụ (ví dụ: tạo đơn hàng, trừ kho, thanh toán).

### Ví dụ quy trình (Đặt hàng thành công và thất bại):

1. **Bắt đầu**: Client gọi API Gateway kích hoạt Step Functions.
2. **Success Path**:
   - `Place Order` (Lambda) -> `Update Inventory` (Lambda) -> `Make Payment` (Lambda) -> **Thành công**.
3. **Failure Path** (Giả sử thanh toán lỗi):
   - `Make Payment` trả về lỗi.
   - Orchestrator kích hoạt: `Revert Payment` (nếu cần) -> `Revert Inventory` -> `Remove Order` -> **Kết thúc với trạng thái Thất bại**.
