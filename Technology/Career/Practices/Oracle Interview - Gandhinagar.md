---
tags:
  - area/technology
  - domain/career
  - topic/interview
  - type/resource
  - lang/vi
---

# Oracle Interview - Gandhinagar

**Địa điểm**: Gandhinagar, Gujarat, Ấn Độ  
**Tổng quan**: 3 vòng phỏng vấn (2 vòng cùng ngày, 1 vòng tuần sau)  
**Độ khó tổng thể**: 8/10

## Vòng 1 - Kiến thức tổng hợp

- **Thời gian**: 60-75 phút
- **Ngày**: 9/5
- **Độ khó**: 7.5/10
- **Nội dung**:
  - **Puzzle logic**: Sắp xếp 4 cặp tất với khoảng cách khác nhau giữa 2 chiếc cùng màu
  - **Java - Đảo chữ**: Giữ nguyên vị trí khoảng trắng
    - Input: "Hello Param How are You Welcome to oracle"
    - Output: "olleh maraP woH era uoY emocleW ot elcaro"
  - **Java - Sliding Window**: Tìm chuỗi con không lặp dài nhất
    - Input: "abcdba" → Output: "abcd"
  - **Toán học**: Tính số bắt tay giữa N người
    - Công thức: n \* (n - 1) / 2
  - **SQL**: Tìm phòng ban có lương cao thứ 2 (3 bảng: Employee, Department, Salary)
  - **SQL nâng cao**: Tìm mức lương cao thứ 2 không dùng window function, limit, offset

## Vòng 2 - Java & System Design

- **Thời gian**: 60 phút
- **Ngày**: 9/5
- **Độ khó**: 8/10
- **Nội dung**:
  - **Java OOP**: Method Overriding và ứng dụng thực tế
    - Ví dụ về kế thừa, trừu tượng, đóng gói, đa hình
  - **Multi-threading & ExecutorService**: Thiết kế hệ thống ATM
    - Hỗ trợ nhiều người rút tiền đồng thời
    - Đảm bảo tính đồng bộ
    - Kiểm tra số dư trước khi rút
  - **Xử lý chuỗi**: Tìm khoảng cách xa nhất giữa 2 từ trùng lặp
    - Input: Chuỗi có từ "Param" xuất hiện nhiều lần
    - Dựa vào index đầu và cuối của từ

## Vòng 3 - Thuật toán & Xử lý chuỗi nâng cao

- **Thời gian**: 1 giờ
- **Ngày**: 11/5 (thứ Hai)
- **Độ khó**: 8.5/10
- **Nội dung**:
  - **Xử lý Date**: Cộng ngày không dùng thư viện Java
    - Input: "09-May-2025", n = 30 → Output: "08-Jun-2025"
    - Tự xử lý: số ngày từng tháng, năm nhuận, chuyển đổi chuỗi → ngày
  - **String**: Tìm tiền tố chung dài nhất
    - Input: ["automatic", "auto", "autonomous"] → Output: "auto"
  - **Matrix traversal**: Duyệt ma trận theo pattern "zig-zag + quay lại"
    - Ma trận 4x4, duyệt từ [0,0] theo pattern rồi quay lại bằng dòng cuối và cột đầu
    - Output: 1, 2, 6, 7, 11, 12, 16, 15, 14, 13, 9, 5
  - **Puzzle logic**: Tìm người thắng trong trận bóng bàn
    - 3 người chơi, người thắng tiếp tục chơi
    - Dựa vào số trận và người thắng liên tiếp cuối cùng (Player 2 thắng 7 trận)

## Tổng kết

### Ưu điểm

- Đề thi đa dạng: logic, thuật toán, xử lý chuỗi, date, hệ thống đa luồng
- Phỏng vấn viên thân thiện, dễ chia sẻ
- Tính học thuật cao, gợi mở tư duy

### Lời khuyên chuẩn bị

- Ôn lại Java core (cơ bản và nâng cao)
- Tập giải bài toán xử lý chuỗi và puzzle
- Làm quen với multi-threading & ExecutorService
- Rèn luyện tư duy logic và khả năng giải thích rõ ràng
