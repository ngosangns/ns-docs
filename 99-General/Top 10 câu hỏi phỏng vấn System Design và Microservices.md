---
tags:
  - cau
  - design
  - general
  - gian
  - hoi
  - microservice
  - microservices
  - phong
  - query
  - system
  - theo
  - tinyurl
  - van
  - vietnamese
---

Nhà tuyển dụng thường yêu cầu ứng viên ở vị trí Senior Software Engineer (Backend) cần giải quyết được một số vấn đề của hệ thống Microservices và khả năng thiết kế hệ thống. Dưới đây là một số câu hỏi và gợi ý cách trả lời để bạn tham khảo về 2 chủ đề trên.

_Lưu ý: những câu hỏi và gợi ý dưới đây chỉ mang tính tham khảo. Bạn nên tự xây dựng câu trả lời hoàn chỉnh của riêng mình._

## 0.1. System Design:

### 0.1.1. Bạn trình bày giúp mình về định lý CAP?

Gợi ý:
Bạn có thể tham khảo video này - https://www.youtube.com/watch?v=BHqjEjzAicA
Ngoài ra, bạn nên tìm hiểu thêm sự khác nhau sự Consistency trong định lý CAP và Consistency trong tính chất ACID.



### 0.1.2. Một bảng có lượng dữ liệu lớn và tăng dần theo thời gian, khiến cho các query tới bảng cũng chậm dần. Bạn sẽ xử lý như nào?

Gợi ý:
Đầu tiên, bạn nên làm rõ ý nghĩa của dữ liệu trong bảng và độ lớn của bảng để đưa ra những giải pháp phù hợp. Và nên trình bày theo trình tự từ đơn giản đến phức tạp.



### 0.1.3. Thiết kế hệ thống TinyURL?

Gợi ý:
Đây là một câu hỏi rất phổ biến vì nó có tính phân hoá cao. Độ phức tạp của hệ thống phụ thuộc vào yêu cầu của nhà tuyển dụng. Bạn nên làm rõ những yêu cầu và chú ý một số vấn đề sau:

- Độ dài của short URL
- Các yêu cầu về check trùng. Ví dụ khi shorten 1 URL nhiều lần, có cần trả về cùng 1 short URL không?
- Bạn sử dụng DB nào?
- Bạn xử lý đụng độ (collision) như nào?



![[a03077b24546810e9aabd32f2afe2608_MD5.webp]] _Vẹt xám châu Phi được cho rằng là loài chim thông minh nhất thế giới. Chúng có những khả năng đặc biệt như bước chước giọng người, giải toán và có khả năng nhận thức. Đây là Alex (1976 - 2007) được biết đến là chú vẹt xám châu Phi nổi tiếng nhất trong lịch sử. Alex sở hữu hơn 100 âm thanh của các đồ vật và hành động khác nhau như tiếng gà gáy, tiếng lợn kêu, âm thanh của phi thuyền, tiếng thở dài, … Ngoài ra, Alex có thể sắp xếp đồ vật, có thể đếm đến 6, …_

## 0.2. Microservice:

### 0.2.1. Bạn hãy so sánh ưu nhược điểm của monolithic và microservices?

Gợi ý: Để câu trả lời thuyết phục hơn, bạn có thể nêu ra những yếu tố ảnh hưởng tới từng ưu nhược điểm.



### 0.2.2. Tại sao bạn lại chia service như này?

Gợi ý: Đây là một câu hỏi khó. Nhiều bạn đề cập tới Domain-Driven Design nhưng hãy cẩn thận khi đề cập tới Domain-Driven Design. Bạn cần nắm rõ nghiệp vụ và cách model business bạn sử dụng là gì.



### 0.2.3. Order được xử lý lần lượt qua nhiều service. Do một sự cố nào đó, 1 service X trong đó bị down. Bạn xử lý để đảm bảo order đó được thực thi tiếp ngay khi service X sống lại?

Gợi ý: Bạn có thể sử dụng message queue có khả năng persist được message.



### 0.2.4. Service A cần dữ liệu user của service B nhưng service B có user schema khác so với của service A. Bạn sẽ xử lý tình huống này như nào?

Gợi ý: Bạn cần dựa vào yêu cầu về tính nhất quán và tính đúng đắn của dữ liệu. Từ đó để đưa ra giải pháp như thêm một adapter layer hoặc đồng bộ dữ liệu từ B sang A. Lưu ý để đảm bảo tính đúng đắn của dữ liệu so với tài liệu, logic không thể dựa hoàn toàn vào tài liệu, ta cần kiểm tra dữ liệu thực tế trên môi trường prod và nonprod.



### 0.2.5. Frontend gửi request order tới API Gateway thông qua REST API, order được điều hướng tới service A. Service A xử lý xong gửi order sang service B thông qua message queue. Service B xử lý xong là hết thúc quá trình xử lý order. Làm sao để hệ thống trả lại response cho frontend?

Gợi ý: Có nhiều cách đáp ứng được yêu cầu trên. Bạn nên đánh giá về mặt hiệu năng và khả năng mở rộng của từng giải pháp.



### 0.2.6. Response time p(95) của quá trình xử lý order đang ở mức cao. Theo bạn, nguyên nhân có thể là gì? và cách tiếp cận của bạn để khắc phục vấn đề này là gì?

Gợi ý: Đầu tiên bạn nên review lại thiết kế luồng, đặc biệt chú ý tới điểm giao tiếp với các third party nếu có. Sau đó cần nêu ra 1 quy trình sử dụng các công cụ monitor và distributed tracing để xác định được issue làm ở đâu. Cuối cùng đưa ra những giải pháp khắc phục như tối ưu code, query và cấp thêm tài nguyên cho các service, …

## 0.3. Khác:

### 0.3.1. Trong quá trình làm việc, bạn gặp phải những vấn đề kỹ thuật nào khó?

Gợi ý: Đây là một câu hỏi rất hay gặp thế nên bạn cần chuẩn bị kỹ. Mỗi người có kinh nghiệm, trải nghiệm khác nhau và gặp những vấn đề khác nhau. Bạn nên chọn ra và chuẩn bị kỹ 3 vấn đề khó nhất bạn gặp phải. Thêm nữa, cần đảm bảo rằng độ phức tạp của 3 vấn đề tương xứng với level hiện của bạn hoặc level đang hướng tới.

Nếu mọi người có câu trả lời hoặc câu hỏi khác thì comment ở dưới giúp mình nha 👇
Hẹn mọi người ở phần 2 với những câu hỏi về những chủ đề khác 👋

---

Nếu bạn thấy hay thì cho mình xin 1 upvote 🔼 và share nhé.
Cám ơn mọi người rất nhiều 🙏

📚️ Ronin Engineer: https://ronin-engineer.github.io/register-post
🏢 System Design VN: https://fb.com/groups/systemdesign.vn
