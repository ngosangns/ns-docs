---
title: Archives MOC
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---

## Mục tiêu

Lưu trữ notes không còn active nhưng có giá trị tham khảo

## Notes đã archive

```dataview
TABLE file.link, tags, updated
FROM "40-Archives"
SORT updated desc
LIMIT 30
```

## Theo năm

```dataview
TABLE file.link, tags, created
FROM "40-Archives"
WHERE created >= date({{date:YYYY}}-01-01) - dur(1 year)
SORT created desc
```

## Projects đã hoàn thành

```dataview
TABLE file.link, tags, updated
FROM ""
WHERE contains(tags, "status/done") AND contains(file.path, "40-Archives")
SORT updated desc
```

## Hướng dẫn archive

- Chuyển notes vào đây khi không còn active
- Giữ lại tags để dễ tìm kiếm
- Có thể reference lại khi cần thiết
