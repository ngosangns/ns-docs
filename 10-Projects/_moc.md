---
title: Projects MOC
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---
## Mục tiêu
Quản lý các dự án theo tiến độ và trạng thái

## Dự án chính
- [[Business/Troodonlabs/Troodonlabs]] - `project/troodonlabs`
- [[Business/Viclass/Inceptionlabs - Viclass]] - `project/viclass`
- [[Business/Freelance]] - `project/freelance`
- [[Business/Vietop]] - `project/vietop`

## Projects đang active
```dataview
TABLE file.link, tags, updated
FROM #type/project AND -#status/done
SORT updated desc
```

## Projects ý tưởng (backlog)
```dataview
TABLE file.link, tags, created
FROM #type/project AND #status/idea
SORT created desc
```

## Projects in-progress
```dataview
TABLE file.link, tags, updated
FROM #type/project AND #status/in-progress
SORT updated desc
```

## Projects hoàn thành gần đây
```dataview
TABLE file.link, tags, updated
FROM #type/project AND #status/done
SORT updated desc
LIMIT 10
```

## Theo dõi tiến độ
```dataview
TABLE file.link, tags, updated
FROM "10-Projects"
WHERE contains(tags, "project/")
SORT updated desc
```
