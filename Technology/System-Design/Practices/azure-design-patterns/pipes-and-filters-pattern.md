---
area: technology
domain: system-design
type: note
---
```ngosangns-obsidian/technology/system-design/azure-design-patterns/Pipes and Filters Pattern.md#L1-45
# Pipes and Filters Pattern (Mô hình Đường ống và Bộ lọc)

Chia nhỏ một tác vụ thực hiện xử lý phức tạp thành một chuỗi các thành phần riêng biệt (bộ lọc) có thể tái sử dụng. Mô hình này cho phép các yếu tố xử lý được triển khai và mở rộng độc lập, cải thiện hiệu suất, khả năng mở rộng và tính mô-đun.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Các hệ thống xử lý dữ liệu phức tạp thường được viết dưới dạng khối (monolithic), gây khó khăn cho việc tái sử dụng mã nguồn, tối ưu hóa từng bước xử lý hoặc mở rộng hệ thống khi tải tăng cao.
- **Giải pháp:** Phân rã quy trình thành các bước độc lập:
    - **Filters (Bộ lọc):** Mỗi bộ lọc thực hiện một nhiệm vụ duy nhất (ví dụ: giải mã, định dạng, kiểm tra). Các bộ lọc không biết về nhau và chỉ quan tâm đến dữ liệu đầu vào/đầu ra.
    - **Pipes (Đường ống):** Đóng vai trò là kênh dẫn dữ liệu, kết nối đầu ra của bộ lọc này với đầu vào của bộ lọc tiếp theo.
- **Lợi ích:**
    - **Tính linh hoạt:** Dễ dàng sắp xếp lại thứ tự các bộ lọc hoặc chèn thêm bộ lọc mới mà không ảnh hưởng đến toàn bộ hệ thống.
    - **Khả năng mở rộng độc lập:** Có thể chạy nhiều instance của các bộ lọc tốn tài nguyên (ví dụ: nén video) trên các phần cứng mạnh hơn, trong khi các bộ lọc nhẹ vẫn chạy trên phần cứng rẻ tiền.
    - **Tái sử dụng:** Các bộ lọc có thể được dùng lại trong nhiều quy trình (pipeline) khác nhau.
    - **Khả năng phục hồi:** Nếu một bước thất bại, có thể thử lại bước đó thay vì toàn bộ quy trình.
- **Các thách thức cần cân nhắc:**
    - **Tính nhất quán và trạng thái:** Các bộ lọc nên không trạng thái (stateless) để dễ mở rộng.
    - **Idempotency (Tính lũy đẳng):** Đảm bảo rằng nếu một bộ lọc thực hiện lại một thông điệp (do lỗi trước đó), nó sẽ không gây ra tác dụng phụ sai lệch (ví dụ: ghi dữ liệu hai lần).
    - **Độ trễ:** Việc truyền dữ liệu giữa các bộ lọc (đặc biệt nếu chúng nằm trên các server khác nhau) có thể làm tăng độ trễ tổng thể.
    - **Xử lý lỗi:** Cần cơ chế xử lý khi một bộ lọc trong chuỗi gặp sự cố (ví dụ: sử dụng hàng đợi dead-letter).

## Khi nào nên sử dụng

- Khi quy trình xử lý có thể dễ dàng chia thành các bước độc lập.
- Khi các bước xử lý có yêu cầu về quy mô (scalability) khác nhau.
- Khi cần sự linh hoạt để thay đổi thứ tự hoặc thành phần của quy trình.
- Khi các bước xử lý cần chạy trong các môi trường khác nhau (ví dụ: một phần trên cloud, một phần on-premises).

## Khi nào không nên sử dụng

- Hệ thống tương tác theo kiểu yêu cầu-phản hồi (request-response) trực tiếp cần kết quả tức thì.
- Các bước xử lý phụ thuộc chặt chẽ vào nhau và phải được thực hiện trong cùng một giao dịch (transaction).
- Lượng dữ liệu ngữ cảnh (state) cần truyền giữa các bước quá lớn, gây lãng phí tài nguyên mạng/bộ nhớ.

## Ví dụ thực tế trên Azure
Quy trình xử lý ảnh:
1. **Pipe 1 (Queue):** Nhận ảnh thô.
2. **Filter 1 (Azure Function):** Kiểm duyệt nội dung (moderation).
3. **Pipe 2 (Queue):** Truyền ảnh đã kiểm duyệt.
4. **Filter 2 (Azure Function):** Thay đổi kích thước (resizing).
5. **Pipe 3 (Queue):** Truyền ảnh đã resize.
6. **Filter 3 (Azure Function):** Gắn watermark và lưu trữ.

---
*Nguồn tham khảo: [Microsoft Learn - Pipes and Filters Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/pipes-and-filters)*
