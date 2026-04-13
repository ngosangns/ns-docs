---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

```ngosangns-obsidian/Technology/System-Design/azure-design-patterns/Valet Key Pattern.md#L1-43
# Valet Key Pattern (Mô hình Chìa khóa đỗ xe)

## Tóm tắt
Mô hình Valet Key sử dụng một mã thông báo (token) cung cấp cho ứng dụng khách quyền truy cập trực tiếp và bị hạn chế vào một tài nguyên cụ thể (như file trong kho lưu trữ hoặc hàng đợi). Điều này giúp giảm tải việc chuyển dữ liệu cho máy chủ ứng dụng, tối ưu hóa chi phí và tối đa hóa khả năng mở rộng.

## Các điểm chính
- **Mục đích**: 
    - Giảm thiểu việc tiêu thụ tài nguyên tính toán (CPU, RAM, băng thông) trên máy chủ ứng dụng khi xử lý các tệp tin lớn.
    - Cho phép khách hàng tải lên/tải xuống dữ liệu trực tiếp từ kho lưu trữ mà vẫn đảm bảo an ninh.
- **Cơ chế hoạt động**:
    1. Ứng dụng khách gửi yêu cầu quyền truy cập đến ứng dụng chính.
    2. Ứng dụng chính xác thực và tạo một **Valet Key** (ví dụ: Shared Access Signature - SAS trong Azure).
    3. Mã thông báo này chứa các hạn chế về: **Thời gian** (hiệu lực ngắn), **Phạm vi** (chỉ một file/container cụ thể), và **Quyền hạn** (chỉ đọc, chỉ ghi, hoặc chỉ tạo).
    4. Khách hàng sử dụng mã thông báo này để thực hiện thao tác trực tiếp với dịch vụ lưu trữ.
- **Lợi ích**:
    - **Tăng hiệu suất**: Loại bỏ bước trung gian (proxy) của máy chủ ứng dụng.
    - **Tối ưu chi phí**: Giảm số lượng instance máy chủ cần thiết để xử lý luồng dữ liệu.
    - **An toàn**: Không cần chia sẻ thông tin đăng nhập dài hạn của kho lưu trữ cho ứng dụng khách.

## Vấn đề cần lưu ý
- **Thời hạn hiệu lực**: Nên để thời gian hết hạn của token càng ngắn càng tốt để giảm thiểu rủi ro nếu token bị rò rỉ.
- **Quyền hạn tối thiểu**: Chỉ cấp quyền thực sự cần thiết (ví dụ: chỉ cho phép `Create` để tránh việc ghi đè file cũ).
- **Kiểm tra dữ liệu**: Vì dữ liệu được đẩy trực tiếp lên kho lưu trữ, máy chủ ứng dụng cần có cơ chế kiểm tra (validate) hoặc quét virus sau khi quá trình tải lên hoàn tất.
- **Giao tiếp an toàn**: Luôn phân phối mã thông báo qua HTTPS.

## Khi nào sử dụng
- Khi ứng dụng cần xử lý một lượng lớn các thao tác tải lên hoặc tải xuống tệp tin.
- Khi muốn tối ưu hóa băng thông và chi phí cho các tệp tin có kích thước lớn.
- Khi ứng dụng chạy trên các môi trường có tài nguyên tính toán hạn chế.

## Ví dụ thực tế
- **Azure Storage SAS**: Tạo SAS token cho Blob Storage để người dùng tải ảnh trực tiếp từ trình duyệt.
- **Service Bus SAS**: Cấp quyền gửi tin nhắn vào một Topic cụ thể cho một thiết bị IoT.

## Mối liên hệ
- **Gatekeeper Pattern**: Có thể kết hợp để làm lớp bảo vệ trung gian xác thực yêu cầu trước khi cấp Valet Key.
- **Static Content Hosting Pattern**: Sử dụng Valet Key để bảo vệ các nội dung tĩnh không muốn công khai hoàn toàn.

## Tài liệu tham khảo
- [Microsoft Learn - Valet Key Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/valet-key)
