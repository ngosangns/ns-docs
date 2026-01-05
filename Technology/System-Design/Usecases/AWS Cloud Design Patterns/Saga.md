# Pattern: Saga

Saga là một chuỗi các giao dịch địa phương (local transactions). Mỗi giao dịch địa phương sẽ cập nhật cơ sở dữ liệu và kích hoạt giao dịch tiếp theo. Nếu một giao dịch thất bại, Saga sẽ thực hiện các giao dịch bù đắp (compensating transactions) để hoàn tác các thay đổi đã thực hiện trước đó, đảm bảo tính nhất quán của dữ liệu trên toàn hệ thống.

### Nguyên tắc hoạt động:
- **Continuation (Tiếp tục)**: Quyết định việc phục hồi tiến (forward recovery). Nếu lỗi do hạ tầng, Saga có thể thử lại (retry) để tiếp tục quy trình.
- **Compensation (Bù đắp)**: Quyết định việc phục hồi lùi (backward recovery). Nếu lỗi do logic nghiệp vụ (ví dụ: thanh toán không hợp lệ), Saga sẽ chạy các lệnh để đưa dữ liệu về trạng thái cũ.

### Hai biến thể của Saga:

#### 1. Saga Choreography (Vũ đạo)
- **Cơ chế**: Dựa trên các sự kiện (events) được xuất bản bởi các microservices. Mỗi dịch vụ đăng ký sự kiện và hành động dựa trên các sự kiện đó.
- **Ưu điểm**: Đơn giản để triển khai, không có điểm lỗi tập trung (single point of failure).
- **Nhược điểm**: Khó theo dõi luồng dữ liệu và phụ thuộc giữa các dịch vụ khi số lượng người tham gia tăng lên.
- **Phù hợp**: Khi chỉ có ít dịch vụ tham gia.

#### 2. Saga Orchestration (Chỉ huy)
- **Cơ chế**: Có một bộ điều phối trung tâm (**Orchestrator**) quản lý vòng đời giao dịch. Nó biết các bước cần thực hiện và gửi lệnh trực tiếp đến các dịch vụ thành viên.
- **Ưu điểm**: Đóng gói sự phức tạp, giúp các dịch vụ rời rạc hơn (loose coupling), dễ dàng quản lý quy trình phức tạp.
- **Nhược điểm**: Bộ điều phối có thể trở thành điểm lỗi tập trung và gây phức tạp trong việc quản lý logic điều phối.
- **Phù hợp**: Khi có nhiều dịch vụ tham gia và quy trình nghiệp vụ phức tạp.

### Ví dụ (Quy trình mua sách):
1. **Tạo đơn hàng**: Order Service tạo bản ghi đơn hàng.
2. **Cập nhật kho**: Inventory Service trừ số lượng sách.
3. **Thanh toán**: Payment Service thực hiện trừ tiền.
4. **Giao hàng**: Shipping Service bắt đầu vận chuyển.

**Nếu bước Thanh toán thất bại**: Saga sẽ kích hoạt giao dịch bù đắp để Inventory Service hoàn lại số lượng sách và Order Service hủy đơn hàng.
