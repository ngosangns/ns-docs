---
area: technology
domain: system-design
type: note
---
# Mẫu thiết kế Gateway Aggregation (Gộp cổng)

Mẫu thiết kế Gateway Aggregation sử dụng một cổng (gateway) để gộp nhiều yêu cầu riêng lẻ từ máy khách thành một yêu cầu duy nhất. Mẫu này đặc biệt hữu ích khi một ứng dụng khách phải thực hiện nhiều cuộc gọi đến các hệ thống backend khác nhau để hoàn thành một thao tác duy nhất.

## 1. Ngữ cảnh và Vấn đề
Trong các kiến trúc microservices, để thực hiện một tác vụ (ví dụ: hiển thị trang chi tiết sản phẩm), máy khách có thể phải gọi đồng thời đến nhiều dịch vụ: dịch vụ thông tin sản phẩm, dịch vụ đánh giá, dịch vụ kho hàng, v.v.
- **Vấn đề "Chattiness":** Việc thực hiện quá nhiều cuộc gọi giữa client và backend gây lãng phí tài nguyên mạng, tăng độ trễ (đặc biệt trên mạng di động có độ trễ cao).
- **Tăng rủi ro:** Mỗi kết nối riêng lẻ là một điểm có khả năng gây lỗi. Máy khách phải quản lý việc gửi, chờ và xử lý dữ liệu cho từng yêu cầu.
- **Phụ thuộc:** Nếu API backend thay đổi hoặc tách nhỏ, máy khách cũng phải cập nhật mã nguồn theo.

## 2. Giải pháp
Sử dụng một gateway để làm trung gian giảm bớt sự "ồn ào" (chattiness) giữa máy khách và các dịch vụ.
1. Máy khách gửi **duy nhất một yêu cầu** đến gateway.
2. Gateway phân rã yêu cầu này và chuyển tiếp các yêu cầu con đến các dịch vụ backend tương ứng.
3. Gateway thu thập kết quả từ tất cả các dịch vụ, gộp chúng lại thành một phản hồi duy nhất.
4. Gateway gửi phản hồi đã gộp về cho máy khách.

## 3. Các vấn đề và Cân nhắc
- **Độ trễ:** Gateway nên được đặt gần các dịch vụ backend nhất có thể để giảm thiểu thời gian gọi nội bộ.
- **Điểm gây lỗi duy nhất (SPOF):** Gateway trở thành thành phần cực kỳ quan trọng. Cần thiết kế có tính sẵn sàng cao và khả năng phục hồi (Circuit Breaker, Retry, Timeouts).
- **Điểm nghẽn (Bottleneck):** Đảm bảo gateway có hiệu suất đủ tốt để xử lý tải gộp và có thể mở rộng (scale) khi cần.
- **Xử lý dữ liệu từng phần:** Nếu một dịch vụ backend phản hồi quá chậm, gateway có thể chọn timeout và trả về tập dữ liệu không đầy đủ (partial data) thay vì thất bại hoàn toàn.
- **Phân tách trách nhiệm:** Không nên đưa logic nghiệp vụ (business logic) vào gateway. Gateway chỉ nên làm nhiệm vụ định tuyến và gộp dữ liệu.

## 4. Khi nào nên sử dụng
- Khi máy khách cần giao tiếp với nhiều dịch vụ backend để hoàn thành một thao tác.
- Khi người dùng sử dụng mạng có độ trễ lớn (như mạng di động).
- Khi muốn tối ưu hóa băng thông bằng cách giảm số lượng tiêu đề (headers) trùng lặp trong nhiều yêu cầu nhỏ.

## 5. Khi nào KHÔNG nên sử dụng
- Khi máy khách chỉ giao tiếp với một dịch vụ duy nhất.
- Khi máy khách ở gần backend và độ trễ không phải là vấn đề đáng kể.
- Khi bạn muốn thực hiện các thao tác hàng loạt (batching) trên cùng một dịch vụ (trong trường hợp này, nên thêm thao tác batch vào chính dịch vụ đó).

## 6. Lợi ích (Well-Architected Framework)
- **Bảo mật (Security):** Giảm bề mặt tấn công công khai vì các dịch vụ backend có thể được cô lập hoàn toàn trong mạng nội bộ sau gateway.
- **Độ tin cậy (Reliability):** Tập trung việc xử lý lỗi tạm thời (transient faults) tại gateway thay vì triển khai rải rác ở từng máy khách.
- **Hiệu suất (Performance):** Giảm số lượng kết nối đồng thời từ máy khách, tiết kiệm pin và tài nguyên trên thiết bị di động.

## 7. Ví dụ trên Azure
- **Azure Application Gateway:** Hỗ trợ định tuyến lớp 7 và có thể cấu hình để gộp các yêu cầu.
- **Azure Front Door:** Cổng toàn cầu có khả năng định tuyến và tối ưu hóa lưu lượng.
- **Azure Functions:** Có thể được sử dụng để xây dựng một "Aggregation Service" tùy chỉnh nằm sau API Management.

---
*Nguồn: [Azure Architecture Center - Gateway Aggregation pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation)*
