---
tags:
  - back
  - career
  - concise
  - fresher
  - interview
  - interview-preparation
  - java
  - quick-reference
  - vietnamese
---

Lần này mình phỏng vấn với tệp câu hỏi cũ nhưng buộc ứng viên phải hiểu rõ cốt lõi từng cái core cái base của một vấn đề

**Một công ty product kì lân hơn 1 tháng trướcPhỏng vấn tiếng việt full với anh techlead backend và HR manager ( 1h40p đồng hồ )**

*Fresher Backend Developer - Vietnamese Interview*

- trình bày tính đa hình -> interface
- trình bày tham trị & tham chiếu trong java (java ko có tham chiếu), cho ví dụ vs cái này thì sẽ in ra bao nhiu

https://voz.vn/attachments/1689326391346-png.1954537

- Sau cái này thì y = gì bao nhiu tại sao

https://voz.vn/attachments/1689326378762-png.1954536

- So sánh int vs Integer trong java vs nó lưu vào bộ nhớ nào
- So sánh dynamic array vs singly linkedlist ( cơ chế lưu, hiệu năng<cái này so sánh bằng retrieve add dlt search>, tại sao search = index nhanh hơn linkedlist> == retrieve tại index bằng địa chỉ lưu byte, tính toán là ra thay vì duyệt)

Phần project

- cơ chế vận hành theo diagram của các app đã làm, lên whiteboard vẽ quá trời sau đó hỏi đến khi bí thì ổng mới skip
- hỏi tí xíu về nextjs(cơ chế serverside gì đó cái này ko biết trả lời nên qua câu khác)
- hỏi về servlet vs hỏi gì nữa mà cái sau ko biết trả lời nên qua câu khác
- Hỏi 1 mớ về firebase, khúc này là combat căng mấy cái cơ chế vs google provider vs firebase realtime database + firebase SDK ( đại loại là cách vận hành vs config cần cái gì vs tại sao lại đc như vậy, hỏi mấy cái liên quan sâu hơn nữa )
    - Firebase realtime database: dựa trên CTDL cây json mỗi node là 1 reference, mỗi reference chứa 1 cặp key-value. giao tiếp dựa vào firebase sdk hoặc thư viện. kết nối và gởi lấy thông qua websocket hoặc http long polling
    - Firebase Google Provider: gửi request đến bên cung cấp gói ID của ứng dụng, phạm vi quyền truy cập, tham số.., sau đó tạo mã xác thực token dựa trên tài khoản đã chọn và gọi các API liên quan với bên nhà cung cấp
- Hỏi cơ chế redux vs so sánh vs localstorage ( câu này trả lời đúng 1 nửa là nó lưu cả store vs cả application context luôn)
- Hỏi về websocket vận hành như nào sau đó so sánh với http
- hỏi react native các device nhận dữ liệu truyền đi như nào bằng cách gì
- java concurrency theo project hỏi trường hợp xử lí deploy lại cái thiết kế threadpool 1001 req trong lúc đã thiết kế thread pool có 1000 req thôi thì sao, xử lí data & hao hụt như nào
