---
title: Review Workflow
tags: ["type/guide", "lang/vi"]
created: 2025-12-17
---

## Mục tiêu

Quy trình định kỳ để duy trì chất lượng workspace và đảm bảo tags/cấu trúc nhất quán

## 🔄 Daily Review (5-10 phút)

### Checklist

- [ ] Review [[00-Inbox]] - xử lý notes mới
- [ ] Cập nhật trạng thái projects đang làm
- [ ] Bổ sung tags cơ bản cho notes mới (type, lang, area/project)

### Tìm nhanh
- Sắp xếp `00-Inbox/` theo `modified` để xem notes trong ngày
- Dùng `Search` lọc theo `created: YYYY-MM-DD` trong frontmatter

## 📅 Weekly Review (30-45 phút)

### Checklist
- [ ] **Inbox Cleanup**: Di chuyển notes sang thư mục phù hợp
- [ ] **Tag Hygiene**: 
  - Hợp nhất tags đồng nghĩa
  - Chuẩn hóa `kebab-case`
  - Bổ sung tags thiếu
- [ ] **Project Status**: Cập nhật tiến độ projects
- [ ] **Area Review**: Kiểm tra notes trong các areas

### Tìm nhanh
#### Notes cần review tags
- Dùng `Search` để tìm ghi chú thiếu `area/|project/`, `type/`, `lang/`

#### Tags không chuẩn (cần kiểm tra)
- Tìm và chuẩn hóa: `excalidraw` → `media/excalidraw`, loại bỏ khoảng trắng/`_`

#### Projects cần cập nhật
- Lọc `type/project` + `status/in-progress` và kiểm tra `updated` > 7 ngày

## 📊 Monthly Review (1-2 giờ)

### Checklist
- [ ] **Archive Completed**: Chuyển projects đã hoàn thành sang archive
- [ ] **File Naming**: Kiểm tra và chuẩn hóa tên files
- [ ] **Attachment Cleanup**: Dọn dẹp attachments không dùng
- [ ] **MOC Updates**: Cập nhật các MOC files
- [ ] **Template Review**: Kiểm tra templates còn phù hợp

### Tìm nhanh
#### Projects hoàn thành
- Tìm `type/project` + `status/done` và sắp xếp theo `updated`

#### Files chưa đúng chuẩn naming
- Kiểm tra bằng regex `^[a-z0-9-]+\.md$` trong VS Code `Search`

#### Notes cũ cần review
- Lọc theo `updated` trong frontmatter và sắp xếp tăng dần

## 🎯 Quality Control Metrics

### Tags Coverage
- Mỗi note nên có 5-8 tags
- Bắt buộc: 1 area/project, 1 type, 1 lang
- Khuyến nghị: 1 domain, 1-3 topic, 1 status

### File Structure
- Tên file: `kebab-case` không dấu
- Thư mục: đúng PARA structure
- Links: hoạt động và cập nhật

### Content Quality
- Title phản ánh nội dung
- Có frontmatter đầy đủ
- Có liên kết đến MOC tương ứng

## 🛠️ Tools & Scripts

### Tag Migration
- Business/* → project/{name}
- Technology/* → area/technology + domain/{subfolder}
- English/* → area/english + type/{content-type}

### Common Tag Fixes
- `excalidraw` → `media/excalidraw`
- `js` → `topic/javascript`
- `ai` → `topic/ai-ml`

## 📋 Review Schedule
- **Daily**: 5-10 phút (Inbox + quick updates)
- **Weekly**: 30-45 phút (comprehensive cleanup)
- **Monthly**: 1-2 giờ (deep review + archive)

## 📝 Log Template
```markdown
---
title: Review Log - {{date:YYYY-MM-DD}}
tags: ["type/review", "lang/vi"]
created: {{date:YYYY-MM-DD}}
---

## Daily Review - {{date:YYYY-MM-DD}}
- Inbox processed: X notes
- New tags added: X
- Issues found: 

## Weekly Review - Week {{date:ww}}
- Notes moved: X
- Tags standardized: X
- Projects updated: X
- Problems solved:

## Monthly Review - {{date:YYYY-MM}}
- Archived projects: X
- Files renamed: X
- Attachments cleaned: X
- Improvements made:
```
