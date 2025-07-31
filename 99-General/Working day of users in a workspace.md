---
tags:
  - concise
  - general
  - quick-reference
  - users
  - vietnamese
  - working
  - workspace
---

# Một số khái niệm

- **Working day** (of a user in month): Số ngày làm việc của user đó trong tháng.
    - Ví dụ 1 tháng có 4 tuần và mỗi tuần đều đi làm từ thứ 2 → thứ 6 thì working day = 5 * 4 = 20 (ngày)
- **Holiday** (of a user in month): Số ngày nghỉ lễ của user trong tháng. Holiday chỉ có thể được đăng ký vào ngày working day
- **Extra day** (of a user in month): Số ngày mà user đăng ký làm thêm trong tháng. Extra day chỉ có thể đăng ký vào ngày không phải working day và holiday
- **Off day** (of a user in month): Số ngày nghỉ của user trong tháng. Off day chỉ có thể đăng ký vào ngày working day và không phải holiday
- **Total working day** (of a user in month): Số ngày đi làm thực của user trong tháng. Được tính:
    
    > Total working day = working day + extra day - off day + holiday
    >