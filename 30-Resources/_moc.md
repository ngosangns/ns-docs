---
title: Resources MOC
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---
## Mục tiêu
Tổ chức kiến thức và tài nguyên tham khảo theo domain

## Resources chính
- [[Technology/Computer-Science/Computer Science - Khoa học máy tính]] - `domain/cs`
- [[Technology/Backend-Database/Backend - Back-end]] - `domain/backend`
- [[Technology/AI-ML/AI - ML]] - `domain/ai-ml`
- [[Design/Bảng màu gradient đẹp]] - `domain/design`
- [[Technology/Tools-Utilities/Tools]] - `domain/tools`

## Technology Resources
```dataview
TABLE file.link, tags, updated
FROM "Technology"
SORT updated desc
LIMIT 30
```

## Design Resources
```dataview
TABLE file.link, tags, updated
FROM "Design"
SORT updated desc
LIMIT 20
```

## Notes theo Domain
```dataview
TABLE file.link, tags, updated
FROM "Technology"
WHERE contains(tags, "domain/")
SORT updated desc
LIMIT 100
```

## Research mới nhất
```dataview
TABLE file.link, tags, created
FROM ""
WHERE contains(tags, "type/research") AND (contains(file.path, "Technology") OR contains(file.path, "Design"))
SORT created desc
LIMIT 15
```

## How-to guides
```dataview
TABLE file.link, tags, updated
FROM ""
WHERE contains(tags, "type/howto") AND (contains(file.path, "Technology") OR contains(file.path, "Design"))
SORT updated desc
LIMIT 15
```
