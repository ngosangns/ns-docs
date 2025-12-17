---
title: Home Dashboard
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
updated: 2025-12-17
---

## 📋 Liên kết nhanh

- [[00-Inbox/_moc]] [[10-Projects/_moc]] [[20-Areas/_moc]] [[30-Resources/_moc]] [[40-Archives/_moc]]
- [[90-Admin/MOC/Tags]] [[90-Admin/Guides/Tags]] [[90-Admin/Workflows/Review]] [[90-Admin/MOC/Templates]]

## 🚀 Projects đang active

```dataview
TABLE file.link, tags, updated
FROM #type/project AND -#status/done
SORT updated desc
LIMIT 10
```

## 📚 Areas chính

- [[20-Areas/English]] - `area/english`
- [[20-Areas/Fashion]] - `area/fashion`
- [[20-Areas/Travel]] - `area/travel`
- [[20-Areas/Personal-Development]] - `area/personal-dev`
- [[30-Resources/Technology/_moc]] - `area/technology`

## ⏰ Cần review tuần này

```dataview
TABLE file.name, tags, updated
FROM ""
WHERE contains(tags, "status/in-progress")
SORT updated desc
LIMIT 15
```

## 📝 Notes mới nhất

```dataview
TABLE file.link, tags, created
FROM ""
SORT created desc
LIMIT 15
```

## 📅 Meetings sắp tới

```dataview
TABLE file.link, date, tags
FROM #type/meeting
WHERE date >= date(today)
SORT date asc
LIMIT 10
```

## 🔬 Research mới nhất

```dataview
TABLE file.link, created, tags
FROM #type/research
SORT created desc
LIMIT 15
```

## 📊 Thống kê nhanh

### Theo type
- **Daily**: `LIST FROM #type/daily AND created >= date(today) - dur(7 days)`
- **Research**: `LIST FROM #type/research AND created >= date(today) - dur(30 days)`
- **How-to**: `LIST FROM #type/howto AND updated >= date(today) - dur(30 days)`

### Theo domain
```dataview
TABLE length(rows) as count
FROM "Technology"
WHERE contains(tags, "domain/")
GROUP BY split(tags, "/")[1] as domain
SORT count desc
```

### Tags thiếu chuẩn
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

## 🎯 Quick Actions
- [ ] Review [[00-Inbox]] mới
- [ ] Cập nhật projects đang `in-progress`
- [ ] Kiểm tra notes thiếu tags
- [ ] Archive projects đã hoàn thành
