---
title: Quality Control Dashboard
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---

## Mục tiêu

Theo dõi chất lượng tags, cấu trúc và nhật ký thay đổi của workspace

## 🚨 Issues Cần Xử Lý Gấp

### Notes thiếu tags bắt buộc

```dataview
TABLE file.link, tags, created
FROM ""
WHERE
  (!contains(tags, "area/") AND !contains(tags, "project/")) OR
  !contains(tags, "type/") OR
  !contains(tags, "lang/")
SORT created desc
LIMIT 20
```

### Tags không đúng chuẩn

```dataview
TABLE length(rows) as count, rows.file.link as files
FROM ""
WHERE contains(tags, "excalidraw") OR
      contains(tags, "Excalidraw") OR
      contains(tags, " ") OR
      contains(tags, "_") OR
      contains(tags, "js ") OR
      contains(tags, "AI ")
GROUP BY tags
S
```
ORT count desc
LIMIT 15
```

### Files chưa đúng naming convention
```dataview
LIST file.link
FROM ""
WHERE !regexmatch("^[a-z0-9-]+\.md$", file.name)
LIMIT 20
```

## 📊 Thống Kê Tags

### Phân bố theo type
```dataview
TABLE length(rows) as count
FROM ""
WHERE contains(tags, "type/")
GROUP BY split(tags, "type/")[1] as type
SORT count desc
```

### Phân bố theo area
```dataview
TABLE length(rows) as count
FROM ""
WHERE contains(tags, "area/")
GROUP BY split(tags, "area/")[1] as area
SORT count desc
```

### Phân bố theo domain
```dataview
TABLE length(rows) as count
FROM ""
WHERE contains(tags, "domain/")
GROUP BY split(tags, "domain/")[1] as domain
SORT count desc
```

### Phân bố theo status
```dataview
TABLE length(rows) as count
FROM ""
WHERE contains(tags, "status/")
GROUP BY split(tags, "status/")[1] as status
SORT count desc
```

## 🔍 Quality Metrics

### Tags per note distribution
```dataview
TABLE length(tags) as tag_count, length(rows) as note_count
FROM ""
GROUP BY length(tags)
SORT tag_count asc
```

### Notes theo ngôn ngữ
```dataview
TABLE length(rows) as count
FROM ""
WHERE contains(tags, "lang/")
GROUP BY split(tags, "lang/")[1] as language
SORT count desc
```

### Notes chưa có updated date
```dataview
LIST file.link
FROM ""
WHERE updated = created
LIMIT 20
```

## 📈 Growth Tracking

### Notes created this month
```dataview
TABLE file.link, created, tags
FROM ""
WHERE created >= date({{date:YYYY-MM}}-01)
SORT created desc
```

### Most active topics
```dataview
TABLE length(rows) as count
FROM ""
WHERE contains(tags, "topic/")
GROUP BY split(tags, "topic/")[1] as topic
SORT count desc
LIMIT 15
```

### Recently updated notes
```dataview
TABLE file.link, updated, tags
FROM ""
WHERE updated >= date(today) - dur(7 days)
SORT updated desc
LIMIT 20
```

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