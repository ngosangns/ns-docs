---
tags:
  - area/technology
  - domain/system-design
  - type/resource
  - lang/vi
---

# 1. Định lý CAP

Định lý CAP là một khái niệm quan trọng trong hệ thống phân tán. Nó đề cập đến ba yếu tố chính của một hệ thống phân tán:

- Tính nhất quán (consistency)
- Khả năng chịu đựng (availability)
- Khả năng chịu đựng mạng (partition tolerance).

Định lý CAP khẳng định rằng trong một hệ thống phân tán, chỉ có thể đáp ứng được hai trong số ba yếu tố này đồng thời. Vì vậy, khi thiết kế một hệ thống phân tán, chúng ta cần phải xác định rõ mục tiêu của hệ thống và quyết định những yếu tố nào là quan trọng nhất để đáp ứng nhu cầu của người dùng. Ví dụ, nếu một hệ thống cần đảm bảo tính nhất quán cao và khả năng chịu đựng mạng tốt, thì nó có thể phải hy sinh khả năng chịu đựng để đạt được tính nhất quán.

# 2. Kiểm tra hiệu suất

Để kiểm tra hiệu suất của một ứng dụng, ta có thể thực hiện các bước sau đây:

- Load Testing: Kiểm tra khả năng chịu tải của hệ thống bằng cách tạo ra một lượng lớn người dùng truy cập vào ứng dụng cùng một lúc.
- Stress Testing: Kiểm tra khả năng chịu đựng của hệ thống trong điều kiện tải cao và áp lực lớn.
- Endurance Testing: Kiểm tra khả năng hoạt động liên tục của hệ thống trong một khoảng thời gian dài.
- Spike Testing: Kiểm tra khả năng xử lý tải lớn đột ngột trong một khoảng thời gian ngắn.
- Volume Testing: Kiểm tra khả năng xử lý dữ liệu lớn của hệ thống.
- Scalability Testing: Kiểm tra khả năng mở rộng của hệ thống khi có thêm người dùng hoặc tải lớn hơn.

Các bước kiểm tra này giúp đánh giá hiệu suất của hệ thống và tìm ra những vấn đề cần được cải thiện để đảm bảo ứng dụng hoạt động tốt và đáp ứng được nhu cầu của người dùng.

Đĩ Nghiện Code Thuật Vấn đáp - https://viblo.asia/s/di-nghien-code-thuat-van-dap-JzKmg8nPl9N

# 3. Square Root Staffing Law

> https://dzone.com/articles/the-square-root-staffing-law

- Quy luật căn bậc hai về nhân sự là một quy tắc từ lý thuyết hàng đợi, giúp ước tính năng lực cần thiết để phục vụ lượng truy cập tăng lên
- Ứng dụng trong lập kế hoạch năng lực: Giúp cân bằng giữa hiệu quả và chất lượng dịch vụ
- Nguyên tắc: Để duy trì chất lượng dịch vụ khi nhu cầu tăng, cần tăng năng lực dự phòng theo căn bậc hai của mức tăng tải
- Ví dụ minh họa:
  - Hiện tại có 10 máy chủ với mức sử dụng đỉnh điểm là 25%, tức là có 75% năng lực dự phòng
  - Dự đoán cần phục vụ lượng tải gấp 3 lần hiện tại
  - Theo quy luật này, cần tăng số máy chủ lên 21 thay vì 30 như tăng tuyến tính
  - Công thức: Nếu tăng tải lên N lần, cần tăng năng lực theo căn bậc hai của N
- Lưu ý: Quy luật này là một ước tính gần đúng và có thể được sử dụng như một công cụ lập kế hoạch năng lực hiệu quả, nhưng không chính xác tuyệt đối trong mọi trường hợp
- Tài liệu: [The Square Root Staffing Law](https://dzone.com/articles/the-square-root-staffing-law)

# 4. Case Studies - Quick Win Optimization

Xem thêm: [[Usecase - Case Study - Quick Win Optimization]]

Các case studies về những thay đổi nhỏ nhưng mang lại hiệu quả lớn:

- Giảm 70% CPU bằng cách thay đổi thứ tự xử lý logic (early return pattern)
- Giảm 63% data transfer bằng cách chuyển CORS headers lên Cloudflare edge

# 5. Hedged Request - Giảm Long-tail Latency

Xem thêm: [[Usecase - Hedged Request]]

- **Kỹ thuật:** Gửi cùng 1 request tới nhiều replica server, sử dụng kết quả từ replica phản hồi sớm nhất
- **Kết quả thực tế:** p99.9 latency giảm từ 1800ms xuống 74ms, chỉ tăng load 2%
- **Áp dụng:** Phù hợp cho hệ thống phân tán có nhiều service phụ thuộc lẫn nhau
