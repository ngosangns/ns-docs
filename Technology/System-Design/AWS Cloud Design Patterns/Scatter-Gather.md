# Pattern: Scatter-Gather (Phân tán - Tập hợp)

Scatter-Gather là một pattern định tuyến tin nhắn, trong đó một yêu cầu được phát tán (broadcast) đến nhiều bên nhận khác nhau để xử lý song song, sau đó các phản hồi được thu thập và tổng hợp lại thành một kết quả duy nhất thông qua một bộ tổng hợp (**Aggregator**).

### Hai giai đoạn chính:
1.  **Giai đoạn Phân tán (Scatter phase)**: Yêu cầu được chia nhỏ hoặc gửi nguyên bản đến danh sách các bên nhận cùng một lúc. Ứng dụng không đợi phản hồi ngay lập tức mà tiếp tục thực thi hoặc gửi các yêu cầu khác.
2.  **Giai đoạn Tập hợp (Gather phase)**: Thu thập các phản hồi từ các bên nhận, lọc bỏ dữ liệu thừa, xử lý lỗi/timeout và kết hợp chúng thành một thông điệp phản hồi cuối cùng cho khách hàng.

### Các phương pháp triển khai:
-   **Scatter by Distribution (Phân phối trực tiếp)**: Người điều phối (Controller) có một danh sách các bên nhận cụ thể (ví dụ: các microservices hoặc Lambda functions) và gọi trực tiếp từng bên.
-   **Scatter by Auction (Đấu giá/Đăng ký)**: Sử dụng mô hình Publish-Subscribe. Controller gửi yêu cầu vào một Topic, các bên nhận quan tâm sẽ tự đăng ký nhận tin và gửi kết quả về một hàng đợi phản hồi chung.

### Trường hợp áp dụng:
-   **Tổng hợp thông tin từ nhiều nguồn**: Ví dụ hệ thống đặt vé máy bay cần lấy giá từ nhiều đối tác/hãng hàng không khác nhau cùng lúc.
-   **Kiểm tra tính sẵn có**: Truy vấn kho hàng ở nhiều khu vực/chi nhánh song song để kiểm tra còn hàng hay không.
-   **Xử lý dữ liệu lớn (Map-Reduce)**: Chia nhỏ một file dữ liệu lớn để xử lý song song trên nhiều node và gộp kết quả cuối cùng.
-   **Tăng hiệu suất**: Giảm tổng thời gian xử lý bằng cách thực hiện các tác vụ độc lập song song thay vì tuần tự.

### Triển khai trên AWS:
#### 1. Sử dụng Step Functions (Scatter by Distribution)
-   **AWS Step Functions**: Sử dụng trạng thái `Parallel` để kích hoạt đồng thời nhiều Lambda functions hoặc các task khác.
-   **Aggregator**: Một Lambda function cuối cùng sẽ nhận đầu ra từ tất cả các nhánh song song để tổng hợp dữ liệu.

#### 2. Sử dụng SNS và SQS (Scatter by Auction)
-   **Amazon SNS**: Đóng vai trò là kênh phát tán yêu cầu đến các Subscriber.
-   **Amazon SQS**: Mỗi bên nhận sau khi xử lý xong sẽ gửi kết quả về một hàng đợi SQS chung hoặc riêng.
-   **Amazon ECS/Lambda**: Một dịch vụ tổng hợp sẽ đọc tin nhắn từ SQS, sử dụng một `Correlation ID` để nhóm các phản hồi thuộc cùng một yêu cầu và trả về cho client.

### Lưu ý quan trọng:
-   **Điểm nghẽn thời gian (Bottleneck)**: Tốc độ của toàn bộ quy trình phụ thuộc vào bên nhận chậm nhất. Cần thiết lập **Timeout** hợp lý để bỏ qua các phản hồi quá chậm.
-   **Xử lý phản hồi thiếu**: Cần có logic để quyết định xem có trả về kết quả một phần hay báo lỗi nếu một số bên nhận không phản hồi.
-   **Tính đối đẳng (Idempotency)**: Đảm bảo việc gửi yêu cầu nhiều lần không gây ra lỗi dữ liệu ở các bên nhận.
