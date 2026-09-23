---
area: technology
domain: system-design
type: note
title: Queue Based Load Leveling Pattern
description: Queue Based Load Leveling Pattern
timestamp: "2026-06-19T13:43:26.124Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling
---

```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Queue-based Load Leveling Pattern.md#L1-45
# Queue-Based Load Leveling Pattern (Mô hình San phẳng Tải dựa trên Hàng đợi)

Sử dụng một hàng đợi đóng vai trò như một bộ đệm (buffer) giữa một tác vụ và một dịch vụ mà nó gọi đến, nhằm làm mượt các đợt tải nặng không liên tục. Điều này giúp giảm thiểu tác động của các đỉnh yêu cầu (peak load) đối với tính sẵn sàng và khả năng phản hồi của cả hệ thống.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Các dịch vụ đám mây thường xuyên gặp phải tình trạng tải tăng đột biến (spikes). Nếu một dịch vụ bị tràn ngập bởi quá nhiều yêu cầu đồng thời, nó có thể bị treo, phản hồi chậm hoặc hỏng hoàn toàn, gây ảnh hưởng đến trải nghiệm người dùng.
- **Giải pháp:** Chèn một hàng đợi vào giữa thành phần gửi yêu cầu (Task) và thành phần xử lý (Service).
    - Các tác vụ và dịch vụ chạy bất đồng bộ.
    - Tác vụ gửi thông điệp vào hàng đợi thay vì gọi trực tiếp dịch vụ.
    - Hàng đợi lưu trữ thông điệp cho đến khi dịch vụ sẵn sàng xử lý.
    - Dịch vụ lấy thông điệp từ hàng đợi và xử lý theo tốc độ mà nó có thể chịu đựng được.
- **Lợi ích:**
    - **Tối đa hóa tính sẵn sàng:** Ứng dụng vẫn có thể tiếp tục nhận yêu cầu và đẩy vào hàng đợi ngay cả khi dịch vụ backend đang tạm thời không khả dụng hoặc đang quá tải.
    - **Tối ưu chi phí:** Không cần phải duy trì số lượng instance dịch vụ đủ lớn để đáp ứng mức tải đỉnh (peak load). Chỉ cần đủ tài nguyên để xử lý mức tải trung bình theo thời gian.
    - **Kiểm soát luồng (Throttling):** Giúp hệ thống không vượt quá ngưỡng giới hạn xử lý của các tài nguyên hạ tầng (như database).
- **Các lưu ý khi triển khai:**
    - **Truyền thông một chiều:** Hàng đợi bản chất là một chiều. Nếu ứng dụng cần phản hồi từ dịch vụ, bạn cần triển khai thêm cơ chế Request/Reply (sử dụng hàng đợi phản hồi riêng).
    - **Độ trễ:** Mô hình này làm tăng độ trễ vì yêu cầu không được xử lý tức thì mà phải chờ trong hàng đợi.
    - **Tính bền vững của hàng đợi:** Nếu hàng đợi bị hỏng, dữ liệu có thể bị mất nếu không có cơ chế persistence (lưu trữ vĩnh viễn) tốt.

## Khi nào nên sử dụng

- Khi ứng dụng sử dụng các dịch vụ thường xuyên bị quá tải hoặc có lưu lượng truy cập biến động mạnh.
- Khi hệ thống không yêu cầu phản hồi ngay lập tức với độ trễ cực thấp.
- Khi muốn bảo vệ các tài nguyên phía sau (như Database) khỏi việc bị sập do số lượng kết nối đồng thời quá lớn.

## Khi nào không nên sử dụng

- Ứng dụng yêu cầu phản hồi từ dịch vụ với độ trễ tối thiểu (giao tiếp đồng bộ).
- Các tác vụ phải được thực hiện theo thời gian thực và không thể chờ đợi trong bộ đệm.

## Ví dụ thực tế trên Azure
Một ứng dụng web ghi dữ liệu vào một kho lưu trữ bên ngoài (SQL Database):
1. **Web App:** Thay vì ghi trực tiếp vào SQL, ứng dụng đẩy dữ liệu vào **Azure Service Bus Queue** hoặc **Azure Queue Storage**.
2. **Azure Function:** Được kích hoạt bởi hàng đợi, Function này đọc thông điệp và thực hiện ghi vào database.
3. **Kiểm soát:** Bạn có thể cấu hình Azure Function để giới hạn số lượng instance chạy đồng thời, đảm bảo tốc độ ghi vào database không vượt quá khả năng chịu tải của nó.

---
*Nguồn tham khảo: [Microsoft Learn - Queue-Based Load Leveling Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)*
```
