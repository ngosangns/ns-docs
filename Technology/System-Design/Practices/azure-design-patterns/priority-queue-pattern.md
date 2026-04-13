---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

```ngosangns-obsidian/technology/system-design/azure-design-patterns/Priority Queue Pattern.md#L1-55
# Priority Queue Pattern (Mô hình Hàng đợi Ưu tiên)

Mô hình này cho phép hệ thống xử lý các tác vụ có độ ưu tiên cao nhanh hơn các tác vụ có độ ưu tiên thấp. Điều này cực kỳ hữu ích trong các ứng dụng cần đảm bảo cam kết về mức độ dịch vụ (SLA) khác nhau cho từng đối tượng khách hàng hoặc loại công việc.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Thông thường, các hệ thống xử lý theo cơ chế FIFO (vào trước ra trước). Tuy nhiên, trong thực tế, một số tác vụ cần được xử lý ngay lập tức (ví dụ: thanh toán) trong khi các tác vụ khác có thể chờ (ví dụ: gửi email thông báo). Nếu sử dụng một hàng đợi duy nhất không phân loại, các tác vụ khẩn cấp có thể bị nghẽn sau hàng ngàn tác vụ không quan trọng.
- **Giải pháp:** Sử dụng cơ chế hàng đợi hỗ trợ ưu tiên để các consumer luôn lấy các thông điệp quan trọng ra xử lý trước.
- **Các cách triển khai chính:**
    - **Một hàng đợi duy nhất (Single Queue):** Hàng đợi tự sắp xếp thứ tự dựa trên thuộc tính ưu tiên của thông điệp. Các consumer chỉ việc lấy thông điệp tiếp theo (hệ thống hàng đợi đảm bảo đó là thông điệp ưu tiên nhất).
    - **Nhiều hàng đợi (Multiple Queues):** Tạo các hàng đợi riêng biệt cho từng mức độ ưu tiên (ví dụ: High, Medium, Low).
        - **Nhiều nhóm consumer:** Mỗi hàng đợi có một nhóm consumer riêng. Hàng đợi "High" có thể có nhiều instance hơn hoặc chạy trên phần cứng mạnh hơn.
        - **Một nhóm consumer duy nhất:** Consumer sẽ kiểm tra hàng đợi "High" trước, nếu trống mới kiểm tra đến các hàng đợi thấp hơn.
- **Lợi ích:**
    - Đáp ứng tốt các yêu cầu về kinh doanh (phục vụ khách hàng VIP nhanh hơn).
    - Tối ưu hóa chi phí bằng cách xử lý các tác vụ không khẩn cấp vào khung giờ thấp điểm.
    - Tăng tính linh hoạt trong quản lý tài nguyên.
- **Các lưu ý quan trọng:**
    - **Tránh "đói" dữ liệu (Starvation):** Các tác vụ ưu tiên thấp có thể không bao giờ được xử lý nếu tác vụ ưu tiên cao đổ về liên tục. Giải pháp là tăng dần độ ưu tiên của các thông điệp đã nằm trong hàng đợi quá lâu (aging).
    - **Quản lý chi phí:** Kiểm tra nhiều hàng đợi có thể làm tăng chi phí vận hành (phí truy vấn hàng đợi).
    - **Khả năng mở rộng:** Cần điều chỉnh số lượng consumer linh hoạt dựa trên độ dài của từng hàng đợi.

## Khi nào nên sử dụng

- Khi có các tác vụ với mức độ khẩn cấp và tầm quan trọng khác nhau.
- Khi cần cung cấp các cấp độ dịch vụ (SLA) khác nhau cho người dùng.
- Khi muốn ưu tiên các luồng công việc quan trọng để đảm bảo trải nghiệm người dùng tốt nhất.

## Khi nào không nên sử dụng

- Khi tất cả các tác vụ đều có tầm quan trọng như nhau và cơ chế FIFO là đủ.
- Khi hệ thống cực kỳ đơn giản và việc thêm hàng đợi ưu tiên chỉ làm tăng độ phức tạp không cần thiết.

## Ví dụ thực tế trên Azure
Sử dụng **Azure Service Bus**:
1. Ứng dụng gửi thông điệp gắn kèm thuộc tính `Priority` (High/Low).
2. Service Bus điều hướng thông điệp vào các hàng đợi tương ứng.
3. Các Azure Functions (Consumer) được cấu hình để lắng nghe:
    - `PriorityQueueConsumerHigh`: Xử lý hàng đợi ưu tiên cao, cấu hình scale mạnh hơn.
    - `PriorityQueueConsumerLow`: Xử lý hàng đợi ưu tiên thấp.

---
*Nguồn tham khảo: [Microsoft Learn - Priority Queue Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/priority-queue)*
