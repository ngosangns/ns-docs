---
tags:
  - general
  - orther
  - quick-reference
  - scene
  - target
  - users
  - vietnamese
  - workspace
---

# Một số khái niệm

## **Orther**

- **Total working days in month**: Số ngày làm việc mặc định của một user trong tháng (không tính ngày lễ, ngày nghỉ và ngày tăng ca)
- **Net working days all-inclusive**: Số ngày làm việc thực tế của một user trong tháng

## Target

- **Target**: Mục tiêu cần đạt được
- **Goal**: Số điểm của một target

## Scene

- **Scene**: Một task mà user cần hoàn thành
- **Total Points**: Số điểm có thể lấy được sau khi hoàn thành 1 task (scene)

## **Target & Scene**

- Contribution Ratio: Phần trăm công việc mà một user đóng góp vào để hoàn thành một task

## **Target & Scene period (month)**

- **Unlocked Points**

## **Target period (month)**

- **Total Output**: Số điểm mặc định mà một user kiếm được khi hoàn thành các task trong một period (hiện tại là tháng). Kết thúc mỗi period sẽ reset điểm kiếm được về 0
- **Expected Output**: Số điểm mà một user sẽ kiếm được nếu hoàn thành tất cả các task đã đăng ký trong một period (hiện tại là tháng)
- **All-inclusive Goal**: Số điểm cần để đạt được một target, điểm này khác ở chỗ sẽ thay đổi tùy vào từng user (dựa vào số ngày working day trong period của họ)
- **Levels unlocked** (multi-level target)
- **Levels expected to unlock** (multi-level target)
- **Achievement**: Số điểm thực sự mà một user nhận được khi hoàn thành các task trong một period (hiện tại là tháng). Điểm này dựa vào **Total Output** và **Net working days all-inclusive** của một user. Điểm này tùy thuộc vào từng user
- **Expected Achievement:** Số điểm thực sự mà một user sẽ kiếm được nếu hoàn thành tất cả các task đã đăng ký trong một period (hiện tại là tháng). Điểm này dựa vào **Expected Output** và **Net working days all-inclusive** của một user. Điểm này tùy thuộc vào từng user
- **Planned Output**

| Group | Name | Code | Formula |
| --- | --- | --- | --- |
| Orther | Total working days in month | workingday |  |
| Orther | Net working days all-inclusive | net_workingday |  |
| Target | Goal | goal |  |
| Scene | Total Points | target_point |  |
| Target & Scene | Contribution Ratio | contribution_ratio |  |
| Target & Scene period (month) | Unlocked Points | collected_point |  |
| Target period (month) | Total Output | total_collected_point |  |
| Target period (month) | Expected Output | total_pending_point |  |
| Target period (month) | Levels unlocked | unlocked_level |  |
| Target period (month) | Levels expected to unlock | expected_level |  |
| Target period (month) | All-inclusive Goal | adjusted_goal | goal / workingday * net_workingday |
| Target period (month) | Achievement | achievement | total_collected_point / adjusted_goal |
| Target period (month) | Expected Achievement | expected_achievement | (total_collected_point + total_pending_point) / adjusted_goal |
| Target period (month) | Planned Output | planned_output | adjusted_goal * net_workingday / net_workingday |