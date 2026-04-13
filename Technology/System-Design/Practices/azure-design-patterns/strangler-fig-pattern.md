---
area: technology
domain: system-design
type: note
---
```ngosangns-obsidian/technology/system-design/azure-design-patterns/Strangler Fig Pattern.md#L1-35
# Strangler Fig Pattern (Mô hình Cây bóp nghẹt)

## Tóm tắt
Mô hình Strangler Fig giúp di trú dần dần một hệ thống cũ (legacy system) bằng cách thay thế từng phần chức năng cụ thể bằng các ứng dụng và dịch vụ mới. Theo thời gian, hệ thống mới sẽ bao phủ toàn bộ các tính năng của hệ thống cũ, cho phép bạn ngừng hoạt động hệ thống cũ một cách an toàn.

## Các điểm chính
- **Mục đích**: Hiện đại hóa hệ thống mà không cần thực hiện một cuộc thay thế toàn bộ (Big Bang) đầy rủi ro.
- **Cơ chế hoạt động**:
    1. **Tạo Façade (Proxy)**: Đặt một lớp trung gian giữa ứng dụng khách và hệ thống cũ. Ban đầu, tất cả yêu cầu vẫn được chuyển đến hệ thống cũ.
    2. **Chuyển đổi dần dần**: Khi một tính năng mới được phát triển, façade sẽ điều hướng các yêu cầu liên quan đến tính năng đó sang hệ thống mới, trong khi các phần còn lại vẫn dùng hệ thống cũ.
    3. **Loại bỏ hệ thống cũ**: Khi tất cả chức năng đã được chuyển sang hệ thống mới, hệ thống cũ sẽ bị decommission.
    4. **Loại bỏ Façade**: Cuối cùng, lớp trung gian có thể được gỡ bỏ để ứng dụng khách kết nối trực tiếp với hệ thống mới.
- **Lợi ích**:
    - Giảm thiểu rủi ro gián đoạn dịch vụ.
    - Cho phép di trú theo tốc độ phù hợp với độ phức tạp của dự án.
    - Khách hàng không nhận ra sự thay đổi ở phía backend.
- **Vấn đề cần lưu ý**:
    - **Chia sẻ dữ liệu**: Cần giải quyết cách cả hai hệ thống cùng truy cập và đồng bộ hóa cơ sở dữ liệu trong quá trình di trú.
    - **Điểm nghẽn**: Façade có thể trở thành điểm lỗi duy nhất (single point of failure) hoặc gây nghẽn hiệu suất nếu không được thiết kế tốt.
    - **Tính nhất quán**: Cần đảm bảo dữ liệu luôn nhất quán giữa hai hệ thống (thường dùng các kỹ thuật như ETL hoặc Shadow Writes).

## Khi nào sử dụng
- Khi cần di trú một ứng dụng backend lớn, phức tạp sang một kiến trúc mới (ví dụ: từ Monolith sang Microservices).
- Khi hệ thống cũ vẫn phải duy trì hoạt động trong một thời gian dài trong khi quá trình hiện đại hóa diễn ra.

## Mối liên hệ
- **Messaging Bridge Pattern**: Có thể được sử dụng để kết nối giao tiếp giữa hệ thống cũ và mới.
- **Anti-corruption Layer**: Thường được dùng kết hợp để đảm bảo hệ thống mới không bị ảnh hưởng bởi các thiết kế lỗi thời của hệ thống cũ.

## Tài liệu tham khảo
- [Microsoft Learn - Strangler Fig Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
