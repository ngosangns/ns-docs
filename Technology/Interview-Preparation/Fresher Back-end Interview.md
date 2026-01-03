---
tags:
  - area/technology
  - domain/interview
  - topic/interview
  - type/resource
  - lang/vi
---

# Fresher Back-end Interview

**Công ty product kỳ lân - Phỏng vấn tiếng Việt với techlead backend và HR manager (1h40p)**

## OOP & Java Core

- **Tính đa hình**: Trình bày → interface
- **Tham trị & tham chiếu trong Java**: Java không có tham chiếu, cho ví dụ và kết quả in ra
- **int vs Integer**: So sánh, lưu vào bộ nhớ nào

## Data Structures

- **Dynamic array vs Singly linkedlist**:
  - Cơ chế lưu
  - Hiệu năng: retrieve, add, delete, search
  - Tại sao search = index nhanh hơn linkedlist: retrieve tại index bằng địa chỉ lưu byte, tính toán ra thay vì duyệt

## Project

- **Cơ chế vận hành**: Vẽ diagram các app đã làm trên whiteboard, hỏi đến khi bí mới skip
- **Next.js**: Cơ chế serverside (không biết trả lời)
- **Servlet**: (không biết trả lời)

## Firebase

- **Firebase Realtime Database**:
  - Dựa trên CTDL cây JSON, mỗi node là reference, mỗi reference chứa key-value
  - Giao tiếp qua Firebase SDK hoặc thư viện
  - Kết nối qua websocket hoặc HTTP long polling
- **Firebase Google Provider**:
  - Gửi request đến provider với ID ứng dụng, phạm vi quyền, tham số
  - Tạo mã xác thực token dựa trên tài khoản đã chọn
  - Gọi API liên quan với provider

## State Management

- **Redux vs LocalStorage**:
  - Redux lưu cả store và application context
  - LocalStorage chỉ lưu dữ liệu

## Networking

- **WebSocket**: Vận hành như nào, so sánh với HTTP

## Mobile

- **React Native**: Các device nhận dữ liệu truyền đi như nào, bằng cách gì

## Concurrency

- **Java concurrency**:
  - Thiết kế threadpool 1000 req
  - Xử lý khi deploy lại có 1001 req
  - Xử lý data và hao hụt như nào
