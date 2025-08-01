---
tags:
  - career
  - engineer
  - interview
  - interview-preparation
  - senior
  - vietnamese
---

Trải nghiệm phỏng vấn Senior Software Developer

Hi mọi người,

Thời gian vừa qua, vì một vài lý do nên mình cũng muốn đổi jobs, nên cũng ứng tuyển khá nhiều chỗ, chủ yếu là vị trí Senior NodeJS/PHP và full-stack.

Cá nhân mình nhận thấy thời gian gần đây việc tuyển dụng nhân sự cũng khá là khó khăn, các công ty mà mình ứng tuyển họ đã không còn tuyển fresher/junior nữa rồi. Ít nhất phải đạt middle level trở lên.

Cách đây vài năm thì quy trình phỏng vấn senior mình nhận xét là dễ dàng hơn so với hiện tại (có thể là do bây giờ dev bị layoff khá nhiều chăng?)

Về interview process thì thực sự nó tuỳ vào vị trí công việc mà bạn ứng tuyển. Tuy nhiên đa số đều theo concept gần như sau đây:

- English: toàn bộ buổi phỏng vấn đều nói chuyện với nhau bằng tiếng Anh.
- Coding Proficiency: Khả năng viết code tốt và triển khai các solutions tối ưu, đặc biệt là tập trung vào Data Structures & Algorithms. Cái này có thể hỏi kiến thức cũng như live coding.
- System Design and Optimization: Kỹ năng nâng cao hiệu suất hệ thống microservices, đặc biệt thông qua việc triển khai các chiến lược caching.
- Project Management: Khả năng tổ chức và lên kế hoạch công việc, thể hiện qua việc tạo và quản lý các tickets/user stories.
- Version Control Discipline: Thực hiện các best practices trong version control, thể hiện qua các regular, atomic commits và clear messages.
- Refactoring Skills: Improve cấu trúc của code, sửa cho dễ đọc, tuân thủ các nguyên tắc Clean Code.
- Adaptability: Có khả năng làm việc hiệu quả với các source code hiện có và tuân thủ các tiêu chuẩn đã đặt ra của dự án.

Chi tiết các phần liên quan của buổi phỏng vấn:

0. Chào hỏi chém gió:

- Cần tìm hiểu trước về công ty
- Lời cám ơn mở đầu
- Giới thiệu bản thân một cách chuyên nghiệp và gọn gàng. Đừng nói lan man. Focus vào những kỹ năng mà công ty hiện tại đang cần.
- Có một câu hay bị hỏi: Tại sao mày quyết định rời công ty cũ và tìm một bến đỗ mới?

1. English:

- nói rõ ràng, chậm rãi, không cần cố gắng nuốt chữ.
- Khi interviewer nói khó nghe thì cứ đừng ngại, kêu họ nói lại là được.
- Quan trọng phải đảm bảo bạn nắm bắt được ý của người nói.

2. Coding Proficiency:

- Cần nắm rõ ngôn ngữ lập trình mà bạn đang phỏng vấn.
- Người phỏng vấn sẽ có thể hỏi bất cứ technical skills nào bạn ghi trong CV.
- Live coding: các bạn cần chú ý giao tiếp liên tục với interviewer. Đảm bảo đọc hiểu đề bài cũng như trình bày cho người phỏng vấn bạn hiểu như thế nào, dự định làm gì.
- Phần này thì lúc đầu mình được hỏi khá nhiều về Stack, Queue, Binary Heap (và ứng dụng thực tế). Có công ty cũng hỏi về Linked List, Binary Search Tree.
- Về problem solving approaches: nắm vững Divide & Conquer, Sliding Window, Recursion, Dynamic Programming (áp dụng để khử đệ quy là chính).
- Bài live code nếu các bạn không biết cách làm xịn xò như leetcode thì cứ code phang đại đi, nested loop cũng được đừng để xảy ra việc mình không biết làm.

Bạn có thể nói hiện tại tao chỉ viết theo cách này, nhưng tao nghĩ có thể improve theo hướng xyz blah blah blah...

- Do mình có ghi trong CV một số thứ như CLEAN architecture, DDD, Event Driven Design,... nên cũng bị hỏi khá nhiều.

3. System Design and Optimization:

- Chủ yếu là thiết kế một số hệ thống như: Notification System, Payment System...
- Cách thức tích hợp và giao tiếp với Third-Party Systems.
- Hỏi rất nhiều về message queue trên kafka/rabbitmq + caching với redis/elasticsearch.
- Ngoài ra cũng hỏi nhiều về bảo mật API với JWT/OAuth.
- Hỏi về thực tế xây dựng microservice của mình ntn. Một số consumer nhỏ thì m có xài nestjs/express/fasity k?

Câu hỏi này chủ yếu các bạn cần trả lời được framework không phải là thứ quan trọng, quan trọng là mình hiểu mình cần làm gì, chi phí như thế nào.

4. Project Management:

- Cái này thì cũng không khó khăn gì lắm. Chủ yếu là cách viết User Stories/Tickets sao cho dễ đọc. Mấy cái này làm lâu đều biết nó có templates cả.
- Ngoài ra thì cách breakdown tasks cũng rất quan trọng.
- Quản lý thời gian, nhân lực.

5. Version Control Discipline:

- Follow các best practices khi làm việc nhóm với git.
- Phân biệt merging/rebasing cũng là một câu hay được hỏi.
- Tag release theo chuẩn như thế nào cũng bị hỏi nhiều lắm.

6. Refactoring Skills:

- Cái này nó cho đọc 1 đoạn code bùi nhùi. Nhiệm vụ là hiểu code và refactor sao cho dễ maintain. Cũng k khó lắm.
- Có hỏi thêm design patterns.
- Ngoài ra hỏi về chiến lược refactor, cân bằng technical debt như thế nào để tránh ảnh hưởng tiến độ dự án nhưng vẫn đảm bảo code đủ tốt.
- Ngoài ra phải trả lời được: viết unit tests trước khi refactor để đảm bảo không block features đang chạy.

7. Adaptability:

- Chủ yếu là về mindset developers khi tham gia dự án mới.
- Cái này người ta cũng có thể cho mình một source code mẫu. Mình cần đọc hiểu và gợi ý khi thêm features mới hoặc refactor sẽ viết ở đâu...
- Mindset của người senior: cái này cũng bị hỏi rất nhiều nha

8. Về cuối phỏng vấn:

Câu hỏi hay bị hỏi nhất: mày còn câu hỏi gì để hỏi bọn tao không?

- Cái này mình hay hỏi về việc công ty support cho career path của mình như thế nào?
- Phương thức thăng tiến
- Cơ hội onsite nước ngoài...

8.1. Cám ơn và kết thúc

8.2. Gửi mail cám ơn công ty đã bỏ thời gian phỏng vấn chúng ta. Hi vọng hợp tác tương lai nếu có.

=======

Sau vài lần interview thì mình cũng có một vài offers Chúc các bạn may mắn giống mình.