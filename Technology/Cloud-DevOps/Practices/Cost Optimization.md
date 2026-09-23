---
area: technology
domain: devops
topic: cost-optimization
type: usecase
title: Cost Optimization
description: DevOps đốt tiền infra – Tập 2
timestamp: "2026-06-19T13:43:26.145Z"
tags:
  - technology
  - devops
  - cost-optimization
---

# DevOps đốt tiền infra – Tập 2

## 1. Câu chuyện "bốc hơi" chi phí Lambda

- Một SRE phát hiện chi phí AWS Lambda tăng gấp **70 lần** trong 3 ngày (từ ~\$200/tháng lên ~\$14,000/tháng).
- Mặc dù đã thiết lập **AWS Budget Alert** và trích xuất dữ liệu cost bằng Lambda, vẫn không ngăn được chi phí gia tăng quá nhanh.
- Sự cố do copy-paste Terraform: Lambda memory được đặt thành **4096 MB**, trong khi thực tế chỉ cần ~128 MB, làm số lượng gọi mỗi ngày ở mức hàng triệu nên chi phí "nổ" nhanh chóng.

## 2. Phân tích chi phí Lambda

Chi phí phụ thuộc vào ba yếu tố chính:

1. **Memory allocated** – càng cao, chi phí càng lớn nhưng giúp giảm thời gian thực thi.
2. **Request count** – càng nhiều invoke thì càng tốn tiền.
3. **Duration (execution time)** – thời gian chạy càng dài thì chi phí càng cao.
   - Sử dụng dòng CPU ARM (Graviton) thay vì x86 để giảm giá.
   - Dùng công cụ **AWS Lambda Power Tuning** để tìm điểm tối ưu giữa memory và execution time.
   - Thiết lập **reserved concurrency** để giới hạn số instance và **provisioned concurrency** để giữ warm function, tránh cold starts khi có nhiều request.

## 3. Bài học rút ra

- Chỉ alloc memory thật cần thiết – không nên copy-paste cấu hình "to" cho nhanh.
- Tinh chỉnh memory và architecture (ARM/x86) để cân bằng cost & performance.
- Giới hạn concurrency để kiểm soát scale-up sudden spike.
- Thiết lập profiling và warm-up (provisioned concurrency) để tối ưu hiệu suất.
