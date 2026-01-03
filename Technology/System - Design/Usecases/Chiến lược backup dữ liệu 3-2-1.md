---
tags:
  - area/technology
  - domain/system-design
  - type/resource
  - lang/vi
---

- **3 bản sao của dữ liệu**: Ba bản sao này bao gồm dữ liệu gốc hoặc dữ liệu sản xuất của bạn cùng với hai bản sao khác. Việc tạo ra các bản sao lưu thường xuyên và có kế hoạch là rất quan trọng. Bạn cần xác định tần suất sao lưu dựa trên mức độ thay đổi dữ liệu và yêu cầu khôi phục. Ví dụ, nếu dữ liệu của bạn thay đổi liên tục, bạn có thể cần sao lưu hàng ngày hoặc thậm chí hàng giờ. Ngược lại, nếu dữ liệu ít thay đổi, sao lưu hàng tuần có thể là đủ.
- **2 loại phương tiện lưu trữ khác nhau**: Bạn nên lưu trữ dữ liệu của mình trên hai loại phương tiện lưu trữ khác nhau. Các bản sao này cần được lưu trữ trên hai loại phương tiện lưu trữ khác nhau, chẳng hạn như ổ cứng và đám mây, để tránh rủi ro từ việc hỏng hóc thiết bị hoặc lỗi phần mềm. Việc sử dụng nhiều loại phương tiện lưu trữ khác nhau giúp bảo vệ dữ liệu khỏi các vấn đề liên quan đến từng loại phương tiện. Nếu một loại phương tiện bị lỗi hoặc hỏng hóc, các bản sao dữ liệu trên các loại phương tiện khác vẫn có thể được sử dụng để khôi phục. Chẳng hạn, ổ cứng có thể bị hỏng, nhưng nếu bạn có bản sao dữ liệu trên đám mây hoặc trên ổ cứng ngoài, bạn vẫn có thể truy cập và khôi phục dữ liệu.
- **1 bản sao ở ngoài**: Bạn nên giữ ít nhất một bản sao lưu nên được lưu trữ ngoài địa điểm chính, ví dụ như trên đám mây hoặc tại một vị trí xa, để bảo vệ dữ liệu khỏi các sự cố tại chỗ như hỏa hoạn, lũ lụt, hay trộm cắp. Lưu trữ bản sao ngoài địa điểm có thể thực hiện theo nhiều cách. Một lựa chọn phổ biến là sử dụng dịch vụ lưu trữ đám mây, nơi dữ liệu của bạn được lưu trữ trên các máy chủ từ xa, thường có khả năng bảo vệ cao và sao lưu dữ liệu tự động. Các lựa chọn khác có thể bao gồm lưu trữ trên ổ cứng ngoại vi được giữ tại một địa điểm khác như văn phòng phụ, nhà kho, hoặc nhà riêng của bạn.

# 1. Các bước thực hiện

- **Xác Định Dữ Liệu Cần Sao Lưu**: Trước tiên, bạn cần xác định loại dữ liệu nào cần được sao lưu. Điều này bao gồm dữ liệu quan trọng như tài liệu, ảnh, video, và các tệp công việc. Đánh giá này sẽ giúp bạn lập kế hoạch sao lưu phù hợp.
- **Lên Kế Hoạch Sao Lưu**: Lên kế hoạch về cách và tần suất sao lưu dữ liệu. Quyết định cách tạo các bản sao lưu, chẳng hạn như sao lưu toàn bộ hoặc sao lưu gia tăng, và chọn các công cụ hoặc phần mềm sao lưu phù hợp.
- **Chọn Các Phương Tiện Lưu Trữ**: Lựa chọn các loại phương tiện lưu trữ khác nhau cho các bản sao dữ liệu. Ví dụ, kết hợp giữa ổ cứng, đĩa quang, và lưu trữ đám mây để đáp ứng yêu cầu về đa dạng phương tiện lưu trữ.
- **Thiết Lập Sao Lưu Ngoài Địa Điểm**: Đảm bảo ít nhất một bản sao lưu được lưu trữ ở một địa điểm khác. Bạn có thể sử dụng dịch vụ lưu trữ đám mây, thuê không gian lưu trữ tại một cơ sở dữ liệu từ xa, hoặc giữ ổ cứng dự phòng ở một địa điểm xa.
- **Kiểm Tra và Đánh Giá**: Định kỳ kiểm tra các bản sao lưu để đảm bảo rằng chúng có thể được khôi phục khi cần thiết. Điều này bao gồm việc thực hiện các bài kiểm tra khôi phục dữ liệu để đảm bảo tính toàn vẹn và khả năng truy cập của các bản sao lưu.
- **Đảm Bảo Bảo Mật**: Đảm bảo rằng các bản sao dữ liệu được bảo vệ bằng các biện pháp bảo mật thích hợp, như mã hóa dữ liệu và kiểm soát quyền truy cập, để bảo vệ dữ liệu khỏi các mối đe dọa từ bên ngoài và bên trong.

# 2. Một số câu hỏi

**1. Bạn cần sao lưu những gì?**

Những thứ phổ biến cần sao lưu bao gồm dữ liệu các thiết bị đầu cuối (máy tính để bàn, máy tính xách tay), máy chủ (máy chủ file, NAS, máy ảo) và ứng dụng SaaS (Microsoft 365, Google Drive). Nhà cung cấp ưa thích của bạn phải hỗ trợ tất cả hoặc hầu hết các nguồn dữ liệu mà bạn cần sao lưu.

**2. Ngân sách của bạn là bao nhiêu?**

Nếu bạn là một doanh nghiệp nhỏ và mục đích chính của bạn chỉ là sao lưu và khôi phục dữ liệu, hãy chọn một giải pháp đơn giản, hiệu quả về chi phí. Tuy nhiên, nếu bạn là một phần của tổ chức lớn với hơn 1000 nhân viên, hãy liệt kê tất cả các yêu cầu của bạn và chọn giải pháp đáp ứng nhu cầu của bạn, chẳng hạn như sao lưu và bảo vệ dữ liệu trên các môi trường đa đám mây, trung tâm dữ liệu và edge.

**3. Bạn phải tuân thủ các quy định tuân thủ nào?**

Các công ty trong ngành chăm sóc sức khỏe cần tuân thủ HIPAA khi xử lý dữ liệu hồ sơ bệnh nhân, và các công ty dịch vụ tài chính phải tuân thủ các quy định của SEC, CFTC, FINRA và các sàn giao dịch. Đảm bảo rằng nhà cung cấp dịch vụ sao lưu của bạn tuân thủ các quy định và khung pháp lý quan trọng.

**4. Bạn muốn sao lưu dữ liệu bao nhiêu lần?**

Sao lưu thường xuyên sẽ yêu cầu nhiều không gian lưu trữ và băng thông mạng cao. Nếu bạn đang sử dụng lưu trữ tại chỗ, bạn cũng phải tính đến chi phí phần cứng, chi phí bảo trì và bảo dưỡng, nhân sự bổ sung để quản lý hệ thống lưu trữ, và nhiều hơn nữa. Một giải pháp hoàn toàn dựa trên SaaS với không có phần cứng thường có giá theo mức sử dụng. Giải pháp 100% SaaS có thể giảm tổng chi phí sở hữu của bạn lên đến 50%.

**5. Giải pháp có dễ sử dụng không?**

Sự dễ sử dụng sẽ đảm bảo rằng nhân viên trong tổ chức có thể sao lưu và khôi phục dữ liệu của họ khi cần mà không cần sự hỗ trợ của IT. Điều này sẽ giúp đội ngũ IT có thời gian để xử lý các nhiệm vụ quan trọng hơn như xóa từ xa thiết bị bị mất hoặc điều tra dữ liệu sao lưu để phát hiện phần mềm độc hại.

# 3. Các chiến lược back-up

**1. Backup 3-2-1-1-0 strategy**

![image.png](https://images.viblo.asia/9671f00f-042a-4f9d-8ebd-bce02603202c.png)

**2. Backup 4-3-2 strategy**

![image.png](https://images.viblo.asia/4230ff00-ae90-41d5-a2f6-5280c3654215.png)
