---
tags:
  - area/technology
  - domain/system-design
  - type/resource
  - lang/vi
---

# 1. Bối Cảnh Thực Tế & Mục Tiêu

## 1.1. Hai loại dự án phổ biến

- **ODC (Offshore Development Center)**: Dài hạn, tài nguyên ổn định, khách hàng thay đổi yêu cầu thường xuyên.
- **Project-Based**: Có deadline, scope và ngân sách cố định – áp lực cao về chất lượng và chi phí.

## 1.2. Mục tiêu nội bộ

- **Gross Margin (GM)** lý tưởng: 45%  
   → Nếu doanh thu dự án là `$100,000`, chi phí tối đa là `$55,000`.

> Khi scope thay đổi, khách hàng kỳ vọng cao, nhưng nguồn lực bị cắt – PM/DM phải đứng ra làm người cân đối.

## 1.3. Case Study Thực Tế

## 1.4. **Case 1 – Project-Based, GM 45%**

- **Hợp đồng**: $80,000
- **Kế hoạch ban đầu**: 1,100 giờ (~$44,000 cost) → GM kỳ vọng = 45%
- **Thực tế**: Scope tăng 35% → 1,500 giờ (~$60,000) → GM thực tế ~25%

**Hướng xử lý:**

- Workshop với khách hàng → tách scope không cần thiết sang Phase 2
- Đưa non-critical vào backlog
- MVP vẫn đúng deadline với chất lượng ổn định

**Kết quả:**

- GM giữ ~40%
- Defect leakage trong UAT < 5 lỗi nghiêm trọng
- Khách hàng đánh giá cao tinh thần chuyên nghiệp

## 1.5. **Case 2 – Dự án ODC, burnrate ổn nhưng chất lượng giảm**

- **Team size**: 10 developers
- **Chi phí tháng**: ~$35,000
- **Vấn đề**: Velocity thấp, chất lượng không tương xứng

**Hướng xử lý:**

- Đánh giá velocity, UT coverage, defect rate hàng tuần
- Đổi team lead, bổ sung CI/CD
- KPI review & pair programming

**Kết quả:**

- Velocity tăng 30% sau 2 tháng
- Defect giảm 40%
- Hợp đồng gia hạn thêm 1 năm

# 2. Nguyên Tắc Cân Bằng P&L & Quality

## 2.1. Biến chất lượng & chi phí thành thứ có thể **đo lường**

❌ Sai lầm: “Cảm thấy ổn”, “Chắc vẫn lãi”  
✅ Đúng đắn:

- **Chất lượng**:
  - `Defect count`
  - `Unit Test coverage`
  - `Cycle time`
  - `Defect leakage`
- **Chi phí**:
  - BA, QA, PM, DevOps
  - Gián tiếp: máy chủ, license, overhead...

> Khi có dữ liệu, bạn mới **ra quyết định đúng**: cắt/giữ/trade-off.

## 2.2. Suy nghĩ theo **vòng đời dự án**, không chỉ sprint

| Giai đoạn     | Vai trò chủ lực                                |
| ------------- | ---------------------------------------------- |
| Inception     | Senior xác lập kỹ thuật, quy trình             |
| Execution     | Pre-senior + junior "cày task", kiểm soát chặt |
| Stabilization | Làm sạch, tối ưu, kiểm thử, bàn giao           |

## 2.3. Giao tiếp minh bạch – **chìa khóa giữ khách hàng & team**

- **Với khách hàng**: Minh bạch effort, chất lượng, trade-off → dễ đàm phán
- **Với team**: Rõ lý do tăng effort, cắt scope → tránh hiểu nhầm, chủ động phối hợp

## 2.4. Khó khăn điển hình & Cách xử lý

| Thách thức                    | Hệ quả                         | Gợi ý xử lý                                        |
| ----------------------------- | ------------------------------ | -------------------------------------------------- |
| Giữ GM ở mức 45%              | Ép timeline, burnout           | Theo dõi GM theo sprint/module                     |
| Khách thay đổi scope          | Trượt deadline, OT             | Framework Change Request, % scope creep            |
| Thiếu dữ liệu chi phí thực tế | Khó dự báo rủi ro ngân sách    | Log effort + timesheet theo vai trò/task           |
| Team nhiều junior/non trẻ     | Tăng defect, mất thời gian fix | Gắn KPI + checklist + effort coaching              |
| Không có chỉ số đo chất lượng | Chất lượng cảm tính            | Dùng UT coverage, defect leakage, review checklist |

# 3. Cơ Cấu Nguồn Lực Tối Ưu

| Giai đoạn     | Senior | Pre-Senior | Junior |
| ------------- | ------ | ---------- | ------ |
| Inception     | 40%    | 40%        | 20%    |
| Execution     | 20%    | 40%        | 40%    |
| Stabilization | 30%    | 50%        | 20%    |

> Tỷ lệ này **không cứng nhắc** nhưng được chứng minh hiệu quả trong hàng trăm dự án.

# 4. Nếu Không Đạt Cơ Cấu Lý Tưởng – Làm Sao Giữ Chất Lượng?

### 4.1.1. Khi Thiếu Senior:

- Peer-review cho mọi pull request
- Checklist kỹ thuật cụ thể cho từng task
- Pair programming
- QA tăng effort lên 20% ở các phase nhạy cảm

## 4.2. Khi Junior Chiếm Đa Số:

- Task nhỏ, scope rõ ràng
- Đào tạo nội bộ theo sprint
- PM/BA đánh giá định kỳ chất lượng

# 5. Tỷ Lệ Team Theo Quy Mô Dự Án

| Quy mô           | Senior | Pre-Senior | Junior | Ghi chú                                           |
| ---------------- | ------ | ---------- | ------ | ------------------------------------------------- |
| Nhỏ (≤3 devs)    | 1      | 1          | 1      | 33-33-33 – dễ kiểm soát                           |
| Trung bình (4–6) | 2      | 2          | 2      | Cần 1 lead/reviewer kiểm soát chất lượng          |
| Lớn (≥7 devs)    | 3      | 4          | 3      | Tỷ lệ 30-40-30 – vừa scale vừa đảm bảo chất lượng |

# 6. Case Study – Sai Lệch Cấu Trúc Team

- **Dự án $150,000**
- Team: 1 Senior, 2 Pre, 6 Junior → Tỷ lệ 10-20-70

**Vấn đề:**

- Velocity chỉ đạt 55% kế hoạch
- UT coverage < 40%
- Defect nghiêm trọng trong UAT

**Giải pháp:**

- Junior → QA full-time
- PM tăng effort review code từ 10% → 30%
- Cắt 2 tính năng phụ

**Kết quả:**

- Defect giảm 45%
- Velocity tăng 20%
- Khách hàng hài lòng delivery thứ hai

# 7. Công Cụ & Chỉ Số Gợi Ý

- **Gross Margin Tracker** (sprint/module/milestone)
- **Defect Leakage Rate**
- **UT Coverage**
- **Cycle Time, Lead Time**
- **Earned Value Management (EVM)**

# 8. Checklist Cho PM/DM Khi Lập Kế Hoạch

✅ Xác định rõ scope + risk + assumption  
✅ Tính effort theo độ phức tạp  
✅ Có buffer cho testing & kỹ thuật  
✅ Theo dõi velocity & burnrate hàng tuần  
✅ Review code, bug, test theo checklist  
✅ Quyết định dựa trên dữ liệu (log, chart, defect rate)
