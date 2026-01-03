---
tags:
  - area/technology
  - domain/tools
  - topic/git
  - type/usecase
  - lang/vi
---

# Git Workflows

Trong Git, hai mô hình phổ biến để quản lý workflow dự án là **Trunk-based development (Trunk Flow)** và **Forking Workflow (Forking Flow)**. Dưới đây là phần **giới thiệu chi tiết và so sánh** hai mô hình này:

## 1.1. Trunk Flow (Trunk-based Development)

Trunk Flow là một mô hình phát triển nơi tất cả developer làm việc **trực tiếp trên một nhánh chính duy nhất** (thường là `main` hoặc `master`). Các nhánh phụ (feature branch) thường được tạo tạm thời và được merge lại càng sớm càng tốt.

### 1.1.1. Quy trình

1. Mỗi developer tạo feature branch từ `main`.
2. Làm việc ngắn gọn, tối ưu < vài ngày.
3. Merge lại `main` sớm (thường bằng squash hoặc rebase).
4. Có thể dùng CI/CD để kiểm tra trước khi merge.

### 1.1.2. Ưu điểm

- Lịch sử Git sạch, tuyến tính.
- Dễ tích hợp CI/CD liên tục.
- Thúc đẩy code review thường xuyên, nhanh gọn.
- Phù hợp với team nhỏ đến trung bình.

### 1.1.3. Nhược điểm

- Cần sự đồng bộ cao trong team.
- Merge conflict dễ xảy ra nếu nhiều người cùng làm.

## 1.2. Forking Flow (GitHub Flow / Forking Workflow)

Mỗi developer làm việc trên **một bản sao (fork)** riêng của repo chính. Khi hoàn thành, họ gửi Pull Request (PR) để merge vào repo gốc (upstream).

### 1.2.1. Quy trình:

1. Developer fork repo chính thành bản của riêng họ.
2. Tạo branch từ fork → làm việc → commit.
3. Push lên fork → mở Pull Request tới repo gốc.
4. Maintainer của repo chính review và merge PR.

### 1.2.2. Ưu điểm:

- Bảo mật cao (rất phù hợp cho open-source).
- Giảm rủi ro với repo chính vì không ai push trực tiếp.
- Hỗ trợ cộng tác với bên ngoài dễ dàng (contributor).

### 1.2.3. Nhược điểm:

- Khó thiết lập CI/CD liên tục nếu không cấu hình rõ ràng.
- Workflow phức tạp hơn: cần sync với upstream.
- Pull request có thể stale nếu không chủ động cập nhật fork.

## 1.3. So sánh Trunk Flow vs Forking Flow

| Tiêu chí              | **Trunk Flow**                          | **Forking Flow**                           |
| --------------------- | --------------------------------------- | ------------------------------------------ |
| Mục tiêu chính        | Tốc độ phát triển, CI/CD nhanh          | Bảo mật, kiểm soát cộng đồng               |
| Dùng cho              | Dự án nội bộ, team nhỏ đến vừa          | Dự án open-source, cộng tác viên bên ngoài |
| Cách phát triển       | Branch ngắn, merge nhanh                | Làm việc trên fork, gửi PR về repo gốc     |
| Độ phức tạp           | Đơn giản                                | Phức tạp hơn, cần sync fork                |
| Cấu trúc branch       | Ít branch, thường là `main` + `feature` | Mỗi người dùng một fork riêng              |
| Rủi ro với repo chính | Cao hơn (vì push vào trực tiếp)         | Thấp (vì chỉ maintainer được merge)        |
| Dễ CI/CD              | ✅ Rất dễ tích hợp                      | ❌ Cần thêm thiết lập                      |

## 1.4. Kết luận

| Bạn nên dùng     | Nếu...                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Trunk Flow**   | Bạn làm trong một team nội bộ, muốn triển khai CI/CD nhanh, lịch sử Git rõ ràng.       |
| **Forking Flow** | Bạn phát triển dự án open-source, cộng tác với người lạ, cần kiểm soát quyền truy cập. |
