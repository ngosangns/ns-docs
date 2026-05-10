---
area: technology
domain: system-design
type: note
---
```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Scheduler Agent Supervisor Pattern.md#L1-35
# Scheduler Agent Supervisor Pattern (Mô hình Điều phối - Tác nhân - Giám sát)

## Tóm tắt
Mô hình này giúp điều phối một tập hợp các hành động phân tán như một hoạt động duy nhất. Nếu bất kỳ hành động nào thất bại, hệ thống sẽ cố gắng xử lý lỗi một cách minh bạch hoặc hoàn tác công việc đã thực hiện để đảm bảo toàn bộ hoạt động thành công hoặc thất bại cùng nhau. Điều này tăng cường khả năng phục hồi và tự chữa lành cho hệ thống phân tán.

## Các diễn viên chính
- **Scheduler (Bộ điều phối)**: Lên kế hoạch và điều phối các bước trong một quy trình (pipeline/workflow). Nó ghi lại trạng thái của luồng công việc vào một kho lưu trữ trạng thái (state store) và gọi Agent để thực hiện công việc.
- **Agent (Tác nhân)**: Chứa logic bao bọc việc gọi đến một dịch vụ hoặc tài nguyên từ xa. Mỗi Agent thường xử lý một dịch vụ cụ thể, thực hiện xử lý lỗi và logic thử lại (retry) trong giới hạn thời gian cho phép (timeout).
- **Supervisor (Người giám sát)**: Theo dõi trạng thái của các bước được duy trì bởi Scheduler. Nó chạy định kỳ để kiểm tra các bước đã quá hạn (timed out) hoặc thất bại, sau đó yêu cầu Scheduler/Agent thực hiện hành động khôi phục hoặc hành động bù (compensating action).

## Cơ chế hoạt động
1. **Khởi tạo**: Ứng dụng gửi yêu cầu đến Scheduler. Scheduler ghi lại trạng thái ban đầu là "Pending" vào state store.
2. **Thực thi**: Scheduler gửi tin nhắn cho Agent kèm theo thông tin công việc và thời hạn hoàn thành (complete-by time).
3. **Phản hồi**: Nếu Agent thành công, nó gửi phản hồi cho Scheduler để cập nhật trạng thái là "Completed".
4. **Giám sát**: Supervisor quét state store. Nếu thấy bước nào đang "Processing" nhưng đã quá "complete-by time", nó sẽ kích hoạt cơ chế xử lý lỗi (thử lại hoặc hoàn tác).

## Các điểm lưu ý
- **Tính lũy đẳng (Idempotency)**: Vì một bước có thể được thực hiện lại bởi Supervisor sau khi timeout, logic trong Agent phải đảm bảo tính lũy đẳng để tránh tác dụng phụ.
- **Khôi phục lỗi**: Nếu hệ thống bị sập và khởi động lại, Scheduler phải có khả năng xác định trạng thái của các tác vụ đang thực hiện từ state store để tiếp tục hoặc hoàn tác.
- **State Store**: Cần được lưu trữ bền vững và có thể nhân bản (replicated) để đảm bảo tính sẵn sàng cao.

## Khi nào sử dụng
- Sử dụng trong môi trường phân tán (như Cloud) nơi lỗi truyền thông và lỗi vận hành là phổ biến.
- Cần một hệ thống tự chữa lành (self-healing) có thể tự động khôi phục các tác vụ bị gián đoạn.

## Mối liên hệ
- **Retry Pattern**: Được Agent sử dụng để xử lý các lỗi tạm thời.
- **Circuit Breaker Pattern**: Agent có thể dùng để xử lý các lỗi kéo dài.
- **Compensating Transaction Pattern**: Được sử dụng để hoàn tác công việc nếu quy trình không thể hoàn thành thành công.
- **Leader Election Pattern**: Dùng để điều phối giữa nhiều instance của Supervisor nhằm tránh xung đột.

## Tài liệu tham khảo
- [Microsoft Learn - Scheduler Agent Supervisor Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/scheduler-agent-supervisor)
