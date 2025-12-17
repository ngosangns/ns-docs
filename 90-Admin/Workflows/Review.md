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

### Queries hỗ trợ

```data

```
view
LIST file.link
FROM "00-Inbox"
WHERE created >= date(today)
```

## 📅 Weekly Review (30-45 phút)

### Checklist
- [ ] **Inbox Cleanup**: Di chuyển notes sang thư mục phù hợp
- [ ] **Tag Hygiene**: 
  - Hợp nhất tags đồng nghĩa
  - Chuẩn hóa `kebab-case`
  - Bổ sung tags thiếu
- [ ] **Project Status**: Cập nhật tiến độ projects
- [ ] **Area Review**: Kiểm tra notes trong các areas

### Queries hỗ trợ
#### Notes cần review tags
```dataview
LIST file.link
FROM ""
WHERE 
  length(tags) < 4 OR
  (!contains(tags, "area/") AND !contains(tags, "project/")) OR
  !contains(tags, "type/") OR
  !contains(tags, "lang/")
LIMIT 20
```

#### Tags không chuẩn (cần kiểm tra)
```dataview
TABLE length(rows) as count
FROM ""
WHERE contains(tags, "excalidraw") OR 
      contains(tags, "Excalidraw") OR
      contains(tags, " ") OR
      contains(tags, "_")
GROUP BY tags
SORT count desc
```

#### Projects cần cập nhật
```dataview
TABLE file.link, tags, updated
FROM #type/project AND #status/in-progress
WHERE updated <= date(today) - dur(7 days)
SORT updated asc
```

## 📊 Monthly Review (1-2 giờ)

### Checklist
- [ ] **Archive Completed**: Chuyển projects đã hoàn thành sang archive
- [ ] **File Naming**: Kiểm tra và chuẩn hóa tên files
- [ ] **Attachment Cleanup**: Dọn dẹp attachments không dùng
- [ ] **MOC Updates**: Cập nhật các MOC files
- [ ] **Template Review**: Kiểm tra templates còn phù hợp

### Queries hỗ trợ
#### Projects hoàn thành
```dataview
TABLE file.link, tags, updated
FROM #type/project AND #status/done
WHERE updated >= date(today) - dur(30 days)
SORT updated desc
```

#### Files chưa đúng chuẩn naming
```dataview
LIST file.link
FROM ""
WHERE !regexmatch("^[a-z0-9-]+\.md$", file.name)
LIMIT 20
```

#### Notes cũ cần review
```dataview
TABLE file.link, tags, updated
FROM ""
WHERE updated <= date(today) - dur(90 days)
SORT updated asc
LIMIT 20
```

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