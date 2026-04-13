---
area: technology
domain: programming-languages
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

## Async trong Javascript

Trong Javascript, khi call-stack hiện tại nếu trả về hoặc đợi một async task thì cả call-stack đó sẽ được xem là async call-stack (ví dụ khi sử dụng `await` trong function thì function đó phải kèm theo từ khoá `async`). Khi đó call-stack hiện tại sẽ được chuyển sang callback queue.

## Async trong PHP

Trong PHP thì stack VM quản lý các call-stack theo process thay vì thread (VM sẽ lo việc chia thread như thế nào). Do đó khi sử dụng async với Fiber là ta đang tạo ra thêm các process Fiber riêng biệt để xử lý công việc sau đó trả về kết quả cho ta nếu cần (ta có thể dùng event loop để thực hiện nhận kết quả).

Process ở đây ta có thể gọi nó là green thread/coroutine. Mỗi process có call-stack, program counter, register của riêng nó. Main process có thể có nhiều hơn 1 thread xử lý nó.

Khác với threads do OS hoặc runtime lập lịch để chúng có thể switch context, các process tự lên kế hoạch trao quyền kiểm soát cho nhau. Ví dụ như trong Fiber có hàm `supsend()` dùng để trao lại quyền cho parent process kèm theo kết quả xử lý nếu có, và main process cũng có thể trao quyền xử lý cho Fiber với method `resume()`.

PHP hiện tại chưa có async thật sự vì khi một process trong một process tree hoạt động thì các process khác trong cây đó phải dừng lại (trong môi trường serve nhiều request thì có thể có nhiều process tree hay không thì chưa thử). Hiện tại có một vài frameworks/libraries triển khai async trong PHP mô phỏng theo JS (chả hạn như event loop).