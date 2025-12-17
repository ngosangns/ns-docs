---
title: Areas MOC
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---
## Mục tiêu
Quản lý các lĩnh vực phát triển dài hạn

## Areas chính
- [[English/English]] - `area/english`
- [[Fashion/Fashion - Tủ đồ - Quần áo]] - `area/fashion`
- [[Travel/Du lịch]] - `area/travel`
- [[Personal Development/Life]] - `area/personal-dev`

## Ghi chú theo Area
```dataview
TABLE file.link, tags, updated
FROM ""
WHERE contains(tags, "area/english") OR contains(tags, "area/fashion") OR contains(tags, "area/travel") OR contains(tags, "area/personal-dev")
SORT updated desc
LIMIT 50
```

## English notes
```dataview
TABLE file.link, tags, updated
FROM "English"
SORT updated desc
LIMIT 20
```

## Fashion notes
```dataview
TABLE file.link, tags, updated
FROM "Fashion"
SORT updated desc
LIMIT 20
```

## Travel notes
```dataview
TABLE file.link, tags, updated
FROM "Travel"
SORT updated desc
LIMIT 20
```

## Personal Development notes
```dataview
TABLE file.link, tags, updated
FROM "Personal Development"
SORT updated desc
LIMIT 20
```
