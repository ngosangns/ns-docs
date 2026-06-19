---
area: technology
domain: system-design
type: note
title: Compensating Transaction Pattern
description: Mẫu thiết kế Compensating Transaction (Giao dịch bù)
timestamp: '2026-06-19T13:43:26.123Z'
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction
---
# Mẫu thiết kế Compensating Transaction (Giao dịch bù)

Mẫu thiết kế Compensating Transaction được sử dụng để hoàn tác (undo) công việc đã được thực hiện bởi một chuỗi các bước trong một hoạt động nhất quán cuối cùng (eventually consistent operation). Nếu một hoặc nhiều bước trong quy trình thất bại, mẫu này giúp đưa hệ thống về trạng thái ổn định thay vì sử dụng cơ chế rollback truyền thống (ACID).

## 1. Ngữ cảnh và Vấn đề
Trong môi trường điện toán đám mây và hệ thống phân tán:
- Các giao dịch thường không thể sử dụng cơ chế khóa (locking) mạnh vì sẽ gây ảnh hưởng nghiêm trọng đến hiệu suất và khả năng mở rộng.
- Các hoạt động nghiệp vụ phức tạp thường được chia thành nhiều bước nhỏ, chạy trên các dịch vụ khác nhau (kiến trúc microservices).
- Khi một bước ở giữa hoặc cuối quy trình bị lỗi, bạn không thể đơn giản là "quay xe" (rollback) các bước trước đó vì dữ liệu có thể đã bị thay đổi bởi các tiến trình khác hoặc đã được lưu vĩnh viễn vào các kho dữ liệu khác nhau.

## 2. Giải pháp
Thay vì rollback, hệ thống sẽ thực hiện một chuỗi các **Giao dịch bù** để đảo ngược tác động của các bước đã thành công trước đó.
- Mỗi bước trong quy trình chính phải có một bước "bù" tương ứng (ví dụ: bước "Đặt vé" có bước bù là "Hủy vé").
- Hệ thống cần ghi lại nhật ký (log) các bước đã thực hiện thành công để biết cần phải chạy các bước bù nào khi có sự cố.
- Giao dịch bù là một quy trình thông minh: nó không chỉ ghi đè trạng thái cũ mà phải tính đến các thay đổi nghiệp vụ hiện tại.

## 3. Các vấn đề và Cân nhắc
- **Idempotency (Tính lũy đẳng):** Các bước trong giao dịch bù có thể thất bại và phải chạy lại nhiều lần. Do đó, chúng phải được thiết kế để kết quả không đổi dù chạy một hay nhiều lần.
- **Thứ tự thực hiện:** Các bước bù không nhất thiết phải chạy theo thứ tự ngược lại hoàn toàn so với quy trình chính. Một số bước có thể chạy song song.
- **Khả năng quan sát:** Hệ thống cần giám sát chặt chẽ quá trình bù. Nếu việc bù cũng thất bại, có thể cần đến sự can thiệp thủ công của con người.
- **Dữ liệu tạm thời:** Trong khi quy trình đang diễn ra (chưa hoàn thành và chưa bị hủy), hệ thống có thể ở trạng thái không nhất quán tạm thời.

## 4. Khi nào nên sử dụng
- Khi thực hiện các quy trình nghiệp vụ dài hơi (Long-running transactions) hoặc các giao dịch phân tán không hỗ trợ ACID.
- Trong các hệ thống dựa trên mô hình **Saga** (Saga Pattern).
- Khi việc khôi phục trạng thái bằng cách ghi đè (restore) là không khả thi hoặc quá phức tạp về mặt nghiệp vụ.

## 5. Ví dụ: Đặt tour du lịch
Một khách hàng đặt một chuyến đi gồm 3 bước:
1. **Đặt vé máy bay:** Trừ tiền trong tài khoản và giữ chỗ.
2. **Đặt khách sạn:** Giữ phòng.
3. **Thuê xe:** Đặt xe.

Nếu bước 3 (Thuê xe) thất bại:
- Hệ thống không thể "rollback" theo kiểu DB vì tiền đã bị trừ.
- **Giao dịch bù sẽ chạy:**
    - Gọi API khách sạn để hủy phòng (H1).
    - Gọi API hãng hàng không để hủy vé và thực hiện quy trình hoàn tiền (F1). Lưu ý: Việc hoàn tiền có thể tuân theo luật nghiệp vụ (ví dụ chỉ hoàn 90% phí).

## 6. Liên kết với Well-Architected Framework
- **Độ tin cậy (Reliability):** Giúp hệ thống tự phục hồi từ các lỗi trong các luồng xử lý quan trọng, đảm bảo tính nhất quán của dữ liệu về lâu dài.
- **Khả năng phục hồi sau thảm họa (Disaster Recovery):** Cung cấp cơ chế để xử lý các giao dịch bị treo hoặc lỗi do sự cố dịch vụ.

---
*Nguồn: [Azure Architecture Center - Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)*
