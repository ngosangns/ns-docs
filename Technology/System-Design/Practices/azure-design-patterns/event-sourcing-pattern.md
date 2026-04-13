---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Mẫu thiết kế Event Sourcing (Nguồn sự kiện)

Thay vì chỉ lưu trữ trạng thái hiện tại của dữ liệu trong cơ sở dữ liệu quan hệ, mẫu Event Sourcing lưu trữ toàn bộ chuỗi các hành động (sự kiện) đã thực hiện trên một đối tượng trong một kho lưu trữ chỉ-thêm (append-only). Kho lưu trữ này đóng vai trò là nguồn dữ liệu tin cậy nhất (system of record) và có thể được dùng để tái tạo trạng thái của các đối tượng tên miền.

## 1. Ngữ cảnh và Vấn đề
Trong mô hình CRUD truyền thống, ứng dụng đọc dữ liệu, thay đổi và cập nhật trạng thái mới nhất vào DB (thường dùng giao dịch để khóa dữ liệu). Cách này có một số hạn chế trong các hệ thống tải cao:
- **Hiệu năng:** Việc khóa dữ liệu (locking) gây ra tranh chấp tài nguyên và giảm tốc độ khi hệ thống mở rộng.
- **Khả năng mở rộng:** Các thao tác dữ liệu đồng bộ có thể gây nghẽn cổ chai và tăng độ trễ.
- **Khả năng kiểm toán (Auditability):** Chỉ lưu trạng thái hiện tại, lịch sử thay đổi bị mất trừ khi có cơ chế ghi log riêng biệt.

## 2. Giải pháp
Lưu trữ mọi thay đổi dưới dạng một chuỗi các sự kiện. Mỗi sự kiện mô tả một hành động logic (ví dụ: `ItemAddedToOrder`, `OrderCanceled`).
- **Event Store:** Kho lưu trữ các sự kiện, chỉ cho phép thêm mới, không cho phép sửa xóa. Đây là nguồn sự thật duy nhất.
- **Materialized Views:** Vì việc đọc và phát lại toàn bộ sự kiện để lấy trạng thái hiện tại rất tốn kém, hệ thống thường tạo ra các "khung nhìn thực thể hóa" - các bản chiếu dữ liệu chỉ đọc được tối ưu hóa cho việc truy vấn.
- **Replay:** Có thể tái tạo trạng thái của bất kỳ thực thể nào tại bất kỳ thời điểm nào bằng cách phát lại (replay) các sự kiện liên quan đến thực thể đó.

## 3. Lợi ích
- **Hiệu suất và Khả năng mở rộng:** Thao tác ghi chỉ là thêm mới (append), không gây tranh chấp hay khóa dữ liệu. Các tiến trình xử lý sự kiện có thể chạy ngầm dưới backend.
- **Kiểm toán hoàn hảo:** Cung cấp một lịch sử đầy đủ và chính xác về mọi thứ đã xảy ra, cực kỳ hữu ích cho việc gỡ lỗi, báo cáo và tuân thủ pháp lý.
- **Phân tách (Decoupling):** Mã nguồn tạo ra sự kiện hoàn toàn tách biệt với các hệ thống tiêu thụ sự kiện.
- **Khả năng khôi phục:** Dễ dàng khôi phục lại trạng thái hệ thống từ bất kỳ điểm nào trong quá khứ bằng cách chạy lại chuỗi sự kiện.

## 4. Các vấn đề và Cân nhắc
- **Nhất quán cuối cùng (Eventual Consistency):** Có độ trễ giữa lúc sự kiện được ghi và lúc các Materialized Views được cập nhật.
- **Thay đổi phiên bản (Versioning):** Khi cấu trúc sự kiện thay đổi (migration), việc xử lý các sự kiện cũ trong quá khứ trở nên khó khăn.
- **Khối lượng dữ liệu:** Chuỗi sự kiện có thể trở nên rất dài. Giải pháp là sử dụng **Snapshots** (chụp ảnh trạng thái tại một thời điểm) để giảm thời gian replay.
- **Tính lũy đẳng (Idempotency):** Các hệ thống tiêu thụ sự kiện phải đảm bảo xử lý cùng một sự kiện nhiều lần không gây ra sai lệch dữ liệu.

## 5. Khi nào nên sử dụng
- Khi bạn cần ghi lại mục đích, lý do thay đổi dữ liệu (ví dụ: "Khách hàng đổi địa chỉ" thay vì chỉ cập nhật cột `Address`).
- Khi cần giảm thiểu tối đa tranh chấp cập nhật dữ liệu.
- Khi cần khả năng audit, kiểm soát lịch sử thay đổi nghiêm ngặt (tài chính, bảo hiểm).
- Khi kết hợp với mẫu **CQRS**.

## 6. Khi nào KHÔNG nên sử dụng
- Các ứng dụng đơn giản, không yêu cầu hiệu năng cực cao hoặc mở rộng quy mô lớn.
- Các hệ thống cần tính nhất quán tức thời (strong consistency) cho tất cả các khung nhìn dữ liệu.
- Các miền nghiệp vụ đơn giản mà mô hình CRUD truyền thống đã đáp ứng tốt.

## 7. Ví dụ thực tế
Hệ thống quản lý đặt chỗ hội thảo: Thay vì chỉ lưu `TotalSeatsReserved`, hệ thống lưu các sự kiện `SeatReserved` và `SeatCanceled`. Để biết số ghế trống, hệ thống chỉ cần tính tổng các sự kiện này. Nếu có tranh chấp, hệ thống dựa vào thứ tự sự kiện trong Event Store để quyết định ai là người đặt chỗ thành công.

---
*Nguồn: [Azure Architecture Center - Event Sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)*
