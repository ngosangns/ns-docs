---
title: Tags MOC
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---
## area/*
```dataview
TABLE file.link, tags
FROM ""
WHERE regexmatch("area/", join(tags, ","))
```

## project/*
```dataview
TABLE file.link, tags
FROM ""
WHERE regexmatch("project/", join(tags, ","))
```

## domain/*
```dataview
TABLE file.link, tags
FROM ""
WHERE regexmatch("domain/", join(tags, ","))
```

## topic/*
```dataview
TABLE file.link, tags
FROM ""
WHERE regexmatch("topic/", join(tags, ","))
```

## type/*
```dataview
TABLE file.link, tags
FROM ""
WHERE regexmatch("type/", join(tags, ","))
```

## status/*
```dataview
TABLE file.link, tags
FROM ""
WHERE regexmatch("status/", join(tags, ","))
```

## media/*
```dataview
TABLE file.link, tags
FROM ""
WHERE regexmatch("media/", join(tags, ","))
```

## lang/*
```dataview
TABLE file.link, tags
FROM ""
WHERE regexmatch("lang/", join(tags, ","))
```

## Thiếu chuẩn tags
```dataview
TABLE file.link, tags
FROM ""
WHERE !regexmatch("lang/", join(tags, ",")) OR (!regexmatch("area/", join(tags, ",")) AND !regexmatch("project/", join(tags, ","))) OR !regexmatch("type/", join(tags, ","))
SORT file.name asc
LIMIT 200
```
