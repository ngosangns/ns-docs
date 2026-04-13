---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

```ngosangns-obsidian/Technology/System-Design/azure-design-patterns/Materialized View Pattern.md#L1-45
# Materialized View Pattern (Mô hình View Kết xuất sẵn)

Tạo ra các view dữ liệu được tính toán hoặc định dạng sẵn từ một hoặc nhiều kho lưu trữ dữ liệu khi dữ liệu gốc không ở định dạng lý tưởng cho các hoạt động truy vấn cụ thể. Mô hình này giúp hỗ trợ truy vấn hiệu quả, trích xuất dữ liệu nhanh chóng và cải thiện hiệu suất ứng dụng.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Các kho lưu trữ dữ liệu (đặc biệt là NoSQL) thường tối ưu cho việc ghi hơn là việc đọc. Khi một truy vấn phức tạp cần kết hợp dữ liệu từ nhiều thực thể hoặc tính toán các giá trị tổng hợp (aggregate), hiệu suất sẽ bị ảnh hưởng nghiêm trọng nếu phải xử lý dữ liệu thô mỗi lần.
- **Giải pháp:** Tạo ra một "view" chứa kết quả của các truy vấn phức tạp và lưu trữ nó một cách vật lý (materialized). View này chỉ chứa dữ liệu cần thiết cho một truy vấn cụ thể hoặc một tập hợp các truy vấn liên quan.
- **Đặc điểm của Materialized View:**
    - **Dữ liệu dùng một lần (Disposable):** View có thể được xóa và tạo lại hoàn toàn từ dữ liệu gốc bất cứ lúc nào.
    - **Chỉ đọc (Read-only):** Ứng dụng không bao giờ cập nhật trực tiếp vào Materialized View mà chỉ đọc từ đó.
    - **Tính toán sẵn:** Có thể bao gồm các cột tính toán, kết quả của phép biến đổi (transformation) hoặc kết quả gộp (join) từ nhiều bảng/phân vùng.
- **Cơ chế cập nhật:**
    - **Dựa trên sự kiện (Event-driven):** Cập nhật view ngay khi dữ liệu gốc thay đổi (thường dùng kết hợp với mô hình CQRS hoặc Event Sourcing).
    - **Lập lịch (Scheduled):** Cập nhật định kỳ (ví dụ: hàng giờ, hàng ngày) nếu dữ liệu không yêu cầu tính thời gian thực cao.
- **Lợi ích:**
    - Cải thiện đáng kể hiệu suất truy vấn cho các báo cáo hoặc màn hình dashboard phức tạp.
    - Giảm tải cho các kho dữ liệu chính.
    - Đơn giản hóa mã nguồn ứng dụng vì không cần thực hiện các logic join/tổng hợp phức tạp phía client.

## Khi nào nên sử dụng

- Khi dữ liệu gốc khó truy vấn trực tiếp (dữ liệu phi cấu trúc, bán cấu trúc hoặc phân tán).
- Khi cần tạo các view tạm thời để phục vụ báo cáo, UI hoặc trích xuất dữ liệu.
- Khi cần hỗ trợ các kịch bản ngoại tuyến (offline) bằng cách cache dữ liệu view tại địa phương.
- Khi cần cung cấp quyền truy cập vào các tập con dữ liệu vì lý do bảo mật (không muốn lộ toàn bộ dữ liệu gốc).

## Khi nào không nên sử dụng

- Dữ liệu gốc đơn giản và dễ dàng truy vấn với hiệu suất tốt.
- Dữ liệu gốc thay đổi quá nhanh chóng, khiến chi phí cập nhật view vượt quá lợi ích mang lại.
- Hệ thống yêu cầu tính nhất quán tức thì (strong consistency). Materialized views thường tuân theo mô hình **nhất quán cuối cùng (eventual consistency)**.

## Mối liên hệ với các mô hình khác
- **CQRS:** Thường được dùng để tách biệt phần đọc (sử dụng Materialized View) và phần ghi.
- **Event Sourcing:** Materialized View là cách duy nhất để có được trạng thái hiện tại của thực thể từ một chuỗi các sự kiện.

---
*Nguồn tham khảo: [Microsoft Learn - Materialized View Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view)*
