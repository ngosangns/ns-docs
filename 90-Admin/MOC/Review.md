---
title: Review Dashboard
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---
## Notes tạo gần đây
```dataview
TABLE file.link, created
FROM ""
SORT created desc
LIMIT 25
```

## Notes sửa gần đây
```dataview
TABLE file.link, file.mtime
FROM ""
SORT file.mtime desc
LIMIT 25
```

## Thiếu chuẩn tags
```dataview
TABLE file.link, tags
FROM ""
WHERE !regexmatch("lang/", join(tags, ",")) OR (!regexmatch("area/", join(tags, ",")) AND !regexmatch("project/", join(tags, ","))) OR !regexmatch("type/", join(tags, ","))
SORT file.name asc
LIMIT 200
```

