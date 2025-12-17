---
title: Quality Control Dashboard
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---

## Mục tiêu

Theo dõi chất lượng tags, cấu trúc và nhật ký thay đổi của workspace

## 🚨 Issues Cần Xử Lý Gấp

### Notes thiếu tags bắt buộc

- Dùng VS Code `Search` để tìm các ghi chú thiếu tags bắt buộc:
- Lọc theo frontmatter `tags:` và kiểm tra có đủ `area/|project/`, `type/`, `lang/`

### Tags không đúng chuẩn

- Tìm và chuẩn hóa các tags không đúng chuẩn bằng `Search`:
- Thay `excalidraw`/`Excalidraw` → `media/excalidraw`
- Loại bỏ khoảng trắng/`_` trong tags
- Thay `js` → `topic/javascript`, `AI` → `topic/ai-ml`

### Files chưa đúng naming convention
- Kiểm tra đặt tên tệp: dùng biểu thức chính quy `^[a-z0-9-]+\.md$` trong VS Code `Search`

## 📊 Thống Kê Tags

### Phân bố theo type
- Thống kê theo `type/*`: dùng `Search` để đếm nhanh các xuất hiện của `type/`

### Phân bố theo area
- Thống kê theo `area/*`: rà soát và cân đối phân bố nội dung theo khu vực

### Phân bố theo domain
- Thống kê theo `domain/*`: bổ sung domain cho ghi chú kỹ thuật còn thiếu

### Phân bố theo status
- Thống kê theo `status/*`: rà soát `idea`, `in-progress`, `done`, `archive`

## 🔍 Quality Metrics

### Tags per note distribution
- Phân bố số lượng tags mỗi note: dùng VS Code `Search` và lọc theo mẫu `tags: [ ... ]`

### Notes theo ngôn ngữ
- Notes theo ngôn ngữ: bảo đảm tất cả ghi chú có `lang/vi` hoặc `lang/en`

### Notes chưa có updated date
- Notes chưa có ngày cập nhật: kiểm tra `created` và `updated` trong frontmatter, cập nhật khi chỉnh sửa

## 📈 Growth Tracking

### Notes created this month
- Notes tạo trong tháng: lọc theo `created: YYYY-MM-DD` bằng VS Code `Search`

### Most active topics
- Chủ đề hoạt động mạnh: rà soát `topic/*` và hợp nhất chủ đề trùng lặp

### Recently updated notes
- Notes cập nhật gần đây: dùng sắp xếp `modified` trong VS Code `Explorer`

## 🎯 Common Fixes Needed

### Tag migrations needed
- `excalidraw` → `media/excalidraw`
- `js` → `topic/javascript` 
- `ai` → `topic/ai-ml`
- `ml` → `topic/ai-ml`
- `backend` → `domain/backend`
- `frontend` → `domain/frontend`

### Business folder migration
- Business/Troodonlabs → 10-Projects/ với tags `project/troodonlabs`
- Business/Viclass → 10-Projects/ với tags `project/viclass`
- Business/Freelance → 10-Projects/ với tags `project/freelance`

### Technology folder organization
- Technology/* → 30-Resources/Technology/ với tags `area/technology` + domain phù hợp

## 📝 Action Items

### High Priority
- [ ] Fix notes thiếu tags bắt buộc
- [ ] Migrate excalidraw tags
- [ ] Standardize file naming

### Medium Priority  
- [ ] Review and merge duplicate topics
- [ ] Add missing lang tags
- [ ] Update outdated project status

### Low Priority
- [ ] Optimize tag distribution
- [ ] Clean up old attachments
- [ ] Archive completed projects
