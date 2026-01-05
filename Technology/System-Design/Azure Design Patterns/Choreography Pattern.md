# Mẫu thiết kế Choreography (Vũ đạo/Điều phối phân tán)

Mẫu thiết kế Choreography giúp phi tập trung hóa logic quy trình công việc (workflow) và phân chia trách nhiệm cho các thành phần khác nhau trong hệ thống, thay vì phụ thuộc vào một bộ điều phối trung tâm.

## 1. Ngữ cảnh và Vấn đề
Trong các ứng dụng microservices, một giao dịch nghiệp vụ thường đòi hỏi sự tham gia của nhiều dịch vụ. 
- **Cách tiếp cận truyền thống (Orchestration):** Sử dụng một dịch vụ trung tâm (Orchestrator) để điều khiển luồng công việc. Tuy nhiên, Orchestrator có thể trở thành "điểm nghẽn" hiệu suất, điểm gây lỗi duy nhất (single point of failure) và làm tăng sự phụ thuộc lẫn nhau (tight coupling).
- **Vấn đề:** Khi số lượng dịch vụ tăng lên, việc quản lý và thay đổi Orchestrator trở nên rất phức tạp.

## 2. Giải pháp (Choreography)
Để các dịch vụ tự quyết định và tham gia vào luồng công việc. Các thành phần tương tác với nhau mà không cần giao tiếp trực tiếp, thường thông qua một **Message Broker**.
- Mỗi dịch vụ thực hiện công việc của mình và phát đi một sự kiện (event).
- Các dịch vụ khác quan tâm đến sự kiện đó sẽ tự động thực hiện bước tiếp theo.

## 3. Cách thức hoạt động
1.  **Client** gửi yêu cầu đến một dịch vụ đầu vào.
2.  Dịch vụ xử lý và đẩy một thông báo vào **Message Broker**.
3.  Các dịch vụ đăng ký (subscribers) kiểm tra thông báo, nếu phù hợp với logic nghiệp vụ của mình thì sẽ lấy về xử lý.
4.  Sau khi xong, dịch vụ đó lại đẩy một thông báo mới để các dịch vụ khác tiếp tục quy trình.

## 4. Lợi ích
- **Loosely Coupled:** Các dịch vụ không cần biết về sự tồn tại của nhau.
- **Khả năng mở rộng:** Dễ dàng thêm hoặc bớt các dịch vụ mà không làm hỏng logic trung tâm.
- **Hiệu suất:** Loại bỏ điểm nghẽn từ bộ điều phối trung tâm.
- **Phù hợp với Serverless:** Rất tự nhiên cho kiến trúc hướng sự kiện (event-driven).

## 5. Các vấn đề và Cân nhắc
- **Độ phức tạp trong quản lý:** Khó theo dõi toàn bộ trạng thái của một giao dịch vì logic bị phân tán.
- **Xử lý lỗi:** Việc thực hiện các giao dịch bù (Compensating Transactions) trở nên phức tạp hơn.
- **Thứ tự thực hiện:** Khó kiểm soát nếu quy trình đòi hỏi các bước phải diễn ra tuần tự khắt khe.

## 6. Khi nào nên sử dụng
- Khi các thành phần có thể xử lý các thao tác độc lập (cơ chế 'fire and forget').
- Khi bạn dự kiến các thành phần sẽ được cập nhật hoặc thay thế thường xuyên.
- Khi bộ điều phối trung tâm hiện tại đang gặp vấn đề về hiệu suất.

## 7. Ví dụ trên Azure
- **Azure Service Bus & Event Grid:** Sử dụng để truyền tải thông điệp và sự kiện giữa các microservices.
- **Azure Functions & Container Apps:** Hosting các logic xử lý nghiệp vụ hướng sự kiện.

---
*Nguồn: [Azure Architecture Center - Choreography pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography)*
