---
title: Technology MOC
tags: ["type/moc", "lang/vi", "area/technology"]
created: 2025-12-17
---
## Mục tiêu
Tổ chức kiến thức công nghệ theo domain và topic

## Domains chính
- **Backend**: [[Technology/Backend-Database/Backend - Back-end]] - `domain/backend`
- **Frontend**: [[Technology/Frontend/React/Frontend - Front-end]] - `domain/frontend`
- **AI-ML**: [[Technology/AI-ML/AI - ML]] - `domain/ai-ml`
- **DevOps**: [[Technology/Cloud-DevOps/DevOps]] - `domain/devops`
- **System-Design**: [[Technology/System-Design/Clean Code notes]] - `domain/system-design`
- **Security**: [[Technology/Security/Security]] - `domain/security`
- **CS**: [[Technology/Computer-Science/Computer Science - Khoa học máy tính]] - `domain/cs`

## Theo domain
```dataview
TABLE file.link, tags, updated
FROM "Technology"
WHERE contains(tags, "domain/backend")
SORT updated desc
LIMIT 15
```

```dataview
TABLE file.link, tags, updated
FROM "Technology"
WHERE contains(tags, "domain/frontend")
SORT updated desc
LIMIT 15
```

```dataview
TABLE file.link, tags, updated
FROM "Technology"
WHERE contains(tags, "domain/ai-ml")
SORT updated desc
LIMIT 15
```

## Research gần đây
```dataview
TABLE file.link, tags, created
FROM "Technology"
WHERE contains(tags, "type/research")
SORT created desc
LIMIT 20
```

## Notes mới nhất
```dataview
TABLE file.link, tags, created
FROM "Technology"
SORT created desc
LIMIT 20
```

## Excalidraw theo chủ đề
```dataview
TABLE file.link, tags
FROM "Technology"
WHERE contains(tags, "media/excalidraw")
SORT file.name asc
```

## Theo programming language
```dataview
TABLE file.link, tags, updated
FROM "Technology/Programming-Languages"
SORT updated desc
LIMIT 20
```
