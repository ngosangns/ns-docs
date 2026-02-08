# Mẫu thiết kế Competing Consumers (Người tiêu dùng cạnh tranh)

Mẫu thiết kế Competing Consumers cho phép nhiều người tiêu dùng (consumers) đồng thời xử lý các tin nhắn nhận được trên cùng một kênh truyền thông (messaging channel). Điều này giúp hệ thống tối ưu hóa thông lượng (throughput), cải thiện khả năng mở rộng (scalability) và tính sẵn sàng (availability), đồng thời cân bằng khối lượng công việc.

## 1. Ngữ cảnh và Vấn đề
Trong các ứng dụng đám mây, số lượng yêu cầu có thể thay đổi đáng kể theo thời gian:
- Việc xử lý đồng bộ từng yêu cầu có thể làm tắc nghẽn logic nghiệp vụ của ứng dụng.
- Sử dụng một instance consumer duy nhất có thể gây quá tải khi lưu lượng tăng đột biến.
- Cần có cơ chế để điều phối nhiều consumer sao cho mỗi tin nhắn chỉ được xử lý bởi **duy nhất một** consumer và khối lượng công việc được phân phối đều.

## 2. Giải pháp
Sử dụng một hàng đợi tin nhắn (**Message Queue**) làm kênh giao tiếp giữa ứng dụng (producer) và các phiên bản của dịch vụ tiêu thụ (consumers).
- Ứng dụng đưa yêu cầu dưới dạng tin nhắn vào hàng đợi.
- Nhiều instance của dịch vụ tiêu thụ sẽ lấy tin nhắn từ hàng đợi và xử lý chúng một cách độc lập.
- **Lưu ý:** Khác với mẫu Publish-Subscribe (nơi mọi consumer đều nhận được mọi tin nhắn), trong mẫu Competing Consumers, mỗi tin nhắn chỉ được chuyển đến một consumer duy nhất.

## 3. Lợi ích
- **Cân bằng tải (Load Leveling):** Hàng đợi đóng vai trò là bộ đệm, giúp hệ thống xử lý được các biến động lớn về lưu lượng yêu cầu.
- **Độ tin cậy (Reliability):** Nếu một instance consumer bị lỗi, tin nhắn sẽ không bị mất mà sẽ được xử lý bởi instance khác.
- **Khả năng mở rộng (Scalability):** Có thể dễ dàng tăng hoặc giảm số lượng consumer dựa trên độ dài của hàng đợi (Auto-scaling).
- **Tính bền bỉ (Resiliency):** Nếu sử dụng các giao dịch (transactions), một tin nhắn xử lý thất bại có thể được trả lại hàng đợi để thử lại.

## 4. Các vấn đề và Cân nhắc
- **Thứ tự tin nhắn:** Không có gì đảm bảo các consumer nhận được tin nhắn theo đúng thứ tự chúng được tạo ra. Hệ thống nên được thiết kế để xử lý tin nhắn một cách **idempotent** (lũy đẳng).
- **Tin nhắn độc (Poison Messages):** Một tin nhắn bị lỗi định dạng có thể làm hỏng consumer. Cần cơ chế đẩy các tin nhắn này vào hàng đợi lỗi (**Dead-letter queue**) sau một số lần thử lại thất bại.
- **Xử lý kết quả:** Consumer hoàn toàn tách biệt với ứng dụng gửi. Nếu cần trả về kết quả, phải sử dụng một cơ chế khác như hàng đợi phản hồi (reply queue).
- **Tính lũy đẳng (Idempotency):** Đảm bảo rằng việc xử lý cùng một tin nhắn nhiều lần không gây ra lỗi hoặc sai lệch dữ liệu.

## 5. Khi nào nên sử dụng
- Khi công việc có thể chạy bất đồng bộ và các tác vụ độc lập với nhau.
- Khi khối lượng công việc thay đổi liên tục và cần một giải pháp có thể mở rộng.
- Khi hệ thống đòi hỏi tính sẵn sàng cao và khả năng phục hồi khi xử lý lỗi.

## 6. Ví dụ trên Azure
- **Azure Service Bus Queues:** Hỗ trợ cơ chế `PeekLock`, cho phép một consumer lấy tin nhắn mà không xóa nó ngay. Nếu xử lý thành công, consumer gọi lệnh `Complete`; nếu lỗi, gọi `Abandon` để tin nhắn hiển thị lại cho consumer khác.
- **Azure Functions:** Có thể tự động mở rộng (scale out) số lượng thực thi dựa trên độ dài hàng đợi của Service Bus, hoạt động như những "người tiêu dùng cạnh tranh".

---
*Nguồn: [Azure Architecture Center - Competing Consumers pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers)*
