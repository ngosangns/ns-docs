---
relates:
  - "[[Backend - Back-end]]"
  - "[[Solutions & System Designs & Design Patterns]]"
---
# 1. Resources

- Lập trình song song: https://viblo.asia/s/lap-trinh-song-song-0gdJzv6kJz5
- **Concurrency**: Nói đến khả năng switch-context của CPU.
- **Parallel**: từ này tui hiếm khi dùng, chủ yếu để nói tại 1 thời điểm spawn nhiều thread/process song song “chia để trị” một cái big task nào đó. Và thường phải khai báo + xử lý một cái callback khi toàn bộ thread/process hoàn tất (hoặc callback ở mỗi thằng). Ví dụ ở Javascript là Promise.allSettled
- **Asynchronous**: dễ hiểu nhất là 1 tác vụ non-blocking: ví dụ khi đọc báo trình duyệt của bạn đang tải quảng cáo (tải ngầm) nhưng bạn vẫn cuộn chuột bình thường, khi tải xong nó mới popup cái ads banner cho bạn.
- **Multithreading**: Như mấy ông nói ở trên, khái niệm này cần nói rõ thêm là OS threading hay language/framework threading. Ví dụ như Python ko support multithread, nó tự quản lý đóng/mở thread tuỳ theo cách bạn gọi system library. Con máy ảo Erlang (BEAM) thì lại khác, bạn tạo 1 (green/virtual) thread trên BEAM thì nó phải qua bước preemptive scheduling rồi mới xuống tới OS thread, nên điểm lợi là bạn có code tạo ra cả triệu thread cũng ko làm tạch server, trong khi vài chục nghìn OS thread là đủ tạch.

![[Pasted image 20240120111541.png]]

Mọi process đều có ít nhất 1 thread và nếu có nhiều hơn 1 thread thì ta gọi process đó đang chạy multithread  
  
Synchronize, Asynchronize, Parallelism thực chất là tính chất khác nhau của multithread theo góc nhìn phần mềm. Parallelism là tính chất cho phép một process chạy nhiều công việc cùng lúc thông qua nhiều thread. Asyncronous là việc các thread chạy loạn xạ, không theo thứ tự nào cả. Việc các thread chạy loạn xạ thế này có thể sẽ gây ra lỗi race condition, do đó cần có các cơ chế synchronize bắt buộc các thread phải chạy theo thứ tự nào đấy hoặc một quy tắc chung nào đấy để dễ quản lý. Tuy nhiên, rõ ràng không phải lúc nào synchronize cũng tốt vì nó cản trở hiệu năng, cần phải xem trường hợp nào cần sync và async

---

# 2. Handle switch-context manually

Vì chi phí context-switch của thread là rất lớn (so với một vòng lặp đơn giản). Với multithread thì sau khi yêu cầu thực hiện thao tác I/O thì có những việc sau cần phải thực hiện:  

- Backup hết **tất cả** các thanh ghi vào RAM, VD x86 thì bao gồm 16 thanh ghi integer, 16 thanh ghi SIMD, các thanh ghi floating point, các thanh ghi hệ thống mà user không tác động được,
- Flush CPU cache (cache level nào thì tùy vào OS và kiến trúc),
- Chuyển trạng thái của thread sang WAITING
- OS scheduler kiếm một thread ready khác để thực thi (nếu có).
  
Đến khi I/O thực hiện xong, tức là device (VD disk, NIC) đã interrupt cho OS thì OS đổi thread đó sang trạng thái READY, nhưng điều đó không có nghĩa là nó sẽ được tiếp tục run mà còn phải chờ thread khác nữa. Khi có slot thì làm ngược lại những điều trên.  
  
So với việc async bằng event-loop trên 1 thread thì:  

- Chỉ phải backup những thanh ghi mà coroutine đang dùng,
- Không cần flush cache,
- Để event-loop xác định xem coroutine nào chạy tiếp theo thì đơn giản hơn là OS scheduler xác định thread nào chạy tiếp.

---

# 3. Khi nào nên dùng

Async chỉ phát huy được hiệu quả nếu task có nhiều I/O bound, còn task đa phần là CPU bound thì lúc đó multithread hay multiprocess sẽ được cân nhắc hơn để sử dụng.