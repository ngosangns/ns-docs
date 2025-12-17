---
title: Inbox MOC
tags: ["type/moc", "lang/vi"]
created: 2025-12-17
---
## Mục tiêu
Tập trung ghi chú chưa xử lý để review và phân loại

## Notes mới nhất trong Inbox
```dataview
TABLE file.link, tags, created
FROM "00-Inbox"
SORT created desc
LIMIT 20
```

## Cần review (chưa có tags đầy đủ)
```dataview
TABLE file.link, tags, created
FROM "00-Inbox"
WHERE length(tags) < 4
SORT created desc
LIMIT 15
```

## Quy trình xử lý Inbox
1. **Daily**: Review notes mới, bổ sung tags cơ bản
2. **Weekly**: Di chuyển notes sang thư mục phù hợp
3. **Monthly**: Dọn dẹp notes cũ không cần thiết

## Tags cần bổ sung thường xuyên
- `type/`: loại ghi chú (note, research, howto, meeting)
- `area/` hoặc `project/`: lĩnh vực/dự án
- `lang/vi` hoặc `lang/en`: ngôn ngữ
- `status/idea`: nếu chưa bắt đầu thực hiện