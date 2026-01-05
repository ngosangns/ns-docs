# Mẫu thiết kế Gatekeeper (Người gác cổng)

Mẫu thiết kế Gatekeeper bảo vệ các ứng dụng và dịch vụ bằng cách sử dụng một thực thể host chuyên dụng (broker) để làm trung gian cho các yêu cầu giữa máy khách (client) và ứng dụng/dịch vụ. Broker sẽ kiểm tra tính hợp lệ và làm sạch (sanitize) các yêu cầu, cung cấp thêm một lớp bảo mật và hạn chế bề mặt tấn công của hệ thống.

## 1. Ngữ cảnh và Vấn đề
Các dịch vụ đám mây thường công bố các điểm cuối (endpoints) để ứng dụng khách gọi API. Mã nguồn triển khai API thường thực hiện nhiều tác vụ như xác thực, ủy quyền, kiểm tra tham số và truy cập vào lưu trữ hoặc các dịch vụ khác.
- **Rủi ro:** Nếu một kẻ tấn công xâm nhập thành công vào môi trường lưu trữ ứng dụng, các cơ chế bảo mật, khóa lưu trữ và dữ liệu nhạy cảm sẽ bị lộ. Kẻ tấn công có thể giành quyền truy cập không hạn chế vào toàn bộ hệ thống.

## 2. Giải pháp
Tách biệt mã nguồn thực hiện các điểm cuối công khai khỏi mã nguồn xử lý yêu cầu và truy cập dữ liệu.
- **Gatekeeper (Người gác cổng):** Một tác vụ hoặc facade chuyên dụng tương tác với client. Nó kiểm tra tính hợp lệ của yêu cầu và loại bỏ các yêu cầu không đạt chuẩn trước khi chuyển tiếp (hand-off) đến các host tin cậy.
- **Trusted Host (Host tin cậy):** Nơi chứa logic nghiệp vụ thực sự và có quyền truy cập vào dữ liệu/dịch vụ nhạy cảm. Host này chỉ giao tiếp với Gatekeeper.

### Các yếu tố quan trọng:
- **Kiểm tra có kiểm soát:** Gatekeeper xác thực mọi yêu cầu và từ chối các yêu cầu không hợp lệ.
- **Hạn chế rủi ro:** Gatekeeper không có quyền truy cập vào các thông tin xác thực (credentials) hoặc khóa mà Trusted Host sử dụng. Nếu Gatekeeper bị chiếm quyền, kẻ tấn công vẫn không có khóa để vào database.
- **Phân quyền phù hợp:** Gatekeeper chạy ở chế độ đặc quyền hạn chế (limited privilege), trong khi Trusted Host chạy ở chế độ tin cậy đầy đủ (full trust).

## 3. Các vấn đề và Cân nhắc
- **Cổng nội bộ:** Đảm bảo các Trusted Host chỉ mở các điểm cuối nội bộ hoặc được bảo vệ mà chỉ Gatekeeper mới có thể truy cập.
- **Đặc quyền tối thiểu:** Gatekeeper phải chạy ở chế độ đặc quyền thấp nhất có thể, thường là trên các máy ảo hoặc dịch vụ lưu trữ riêng biệt với Trusted Host.
- **Không xử lý nghiệp vụ:** Gatekeeper không nên thực hiện bất kỳ xử lý nghiệp vụ nào hoặc truy cập dữ liệu. Chức năng duy nhất của nó là xác thực và làm sạch yêu cầu.
- **Hiệu suất:** Việc thêm một lớp trung gian sẽ làm tăng độ trễ do xử lý bổ sung và giao tiếp mạng.
- **Điểm gây lỗi duy nhất (SPOF):** Gatekeeper có thể trở thành điểm nghẽn hoặc gây lỗi cho toàn hệ thống. Cần triển khai nhiều instance và sử dụng autoscaling để đảm bảo tính sẵn sàng.

## 4. Khi nào nên sử dụng
- Khi xử lý các thông tin cực kỳ nhạy cảm.
- Khi cung cấp các dịch vụ đòi hỏi mức độ bảo vệ cao trước các cuộc tấn công độc hại.
- Cho các hoạt động quan trọng (mission-critical) không thể bị gián đoạn.
- Khi muốn tập trung hóa việc xác thực yêu cầu để dễ quản lý và bảo trì.

## 5. Liên kết với Well-Architected Framework
- **Bảo mật (Security):** Cho phép tập trung các tính năng như WAF (Web Application Firewall), chống DDoS, phát hiện bot và kiểm tra ủy quyền tại một điểm duy nhất.
- **Hiệu suất (Performance Efficiency):** Có thể thực hiện giới hạn tốc độ (throttling) ở cấp độ gateway thay vì kiểm tra tại từng node xử lý.

## 6. Liên quan
- **Valet Key pattern:** Thường được dùng kết hợp để tăng cường bảo mật bằng cách sử dụng các token hạn chế quyền truy cập.

---
*Nguồn: [Azure Architecture Center - Gatekeeper pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gatekeeper)*
