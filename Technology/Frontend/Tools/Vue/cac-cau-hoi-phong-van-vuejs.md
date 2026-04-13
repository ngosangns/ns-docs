---
area: technology
domain: frontend
topic: vue
type: resource
---
# Các câu hỏi phỏng vấn VueJS

## KeepAlive Component

- **Định nghĩa**: Built-in component cho phép cache component instances khi chuyển đổi giữa nhiều components
- **Mục đích**: Giữ trạng thái component, tránh render lại nhiều lần
- **Use case**: Đặc biệt hữu ích ở component stepper - lưu thông tin step, back lại không phải render
- **Lợi ích**:
  - Không phải render lại (performance)
  - Tránh sử dụng store vô tội vạ để lưu trữ khi back đi back lại