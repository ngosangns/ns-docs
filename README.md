---
title: Hướng dẫn sử dụng với Foam
tags: ["type/guide", "lang/vi"]
created: 2025-12-17
---

## Giới thiệu

- Vault ghi chú được tổ chức theo PARA: `Inbox`, `Projects`, `Areas`, `Resources`, `Archives`, `Admin`.
- Trung tâm điều hướng: [[Admin/MOC/Home]] gồm Projects đang active, Areas chính, Research/Meetings mới, và các quick actions.
- Chất lượng & kiểm soát: [[Admin/MOC/Quality-Control]] theo dõi tags, cấu trúc, naming.

## Yêu cầu

- Cài `Visual Studio Code` và extension `Foam`.
- Khuyến nghị cài thêm `Markdown All in One` để hỗ trợ wikilinks và Markdown.
- Foam hoạt động trực tiếp trên các tệp Markdown; không cần plugin Dataview.

## Mở workspace

- Clone hoặc copy thư mục vào máy và mở bằng VS Code: `File → Open Folder...`.
- Nếu dùng git: `git clone <repo-url>` vào thư mục làm việc rồi mở bằng VS Code.

## Tạo ghi chú mới

- Tạo tệp `*.md` mới trong thư mục phù hợp (Inbox/Projects/Areas/Resources)
- Thêm frontmatter tối thiểu và điền `title`, `tags`, `created`, `updated`

## Quy tắc đặt tên & frontmatter

- Tên file: `kebab-case` không dấu, ví dụ: `react-core-web-vitals.md`.
- Frontmatter tối thiểu cho `Note.md`:

```yaml
---
title: Tên ghi chú
aliases: []
tags:
  [
    "area/<area>",
    "domain/<domain>",
    "topic/<topic>",
    "type/note",
    "status/<status>",
    "lang/<lang>",
  ]
created: YYYY-MM-DD
updated: YYYY-MM-DD
project:
source:
url:
---
```

## Tags & taxonomy

- Chuẩn tags: xem [[Admin/Guides/Tags]].
- Phân loại chính:
  - `area/*`: english, fashion, travel, personal-dev, technology
  - `project/*`: ví dụ `project/viclass`, `project/troodonlabs`
  - `domain/*`: backend, frontend, ai-ml, devops, system-design, security, cs
  - `topic/*`: chủ đề cụ thể (ví dụ `topic/kafka`, `topic/react`)
  - `type/*`: note, research, meeting, howto, plan, daily, moc, resource, project
  - `status/*`: idea, in-progress, done, archive, backlog
  - `lang/*`: vi, en
  - `media/*`: img, pdf, excalidraw, canvas
- Khuyến nghị: mỗi note có 5–8 tags; bắt buộc phải có 1 `area/` hoặc `project/`, 1 `type/`, 1 `lang/`.

## Quy trình review

- Theo [[Admin/Workflows/Review]]:
  - Daily (5–10 phút): xử lý [[Inbox]], cập nhật status, bổ sung tags cơ bản.
  - Weekly (30–45 phút): dọn Inbox, chuẩn hóa tags (`kebab-case`), cập nhật tiến độ projects.
- Monthly (1–2 giờ): archive, chuẩn hóa tên files, dọn `Attachments/`, cập nhật MOCs.

## MOC & điều hướng

- Trang chủ: [[Admin/MOC/Home]]
- Tags & hướng dẫn: [[Admin/MOC/Tags]] [[Admin/Guides/Tags]]
- Review: [[Admin/MOC/Review]]
- Quality Control: [[Admin/MOC/Quality-Control]]

## Scripts tự động hoá (tuỳ chọn)

- Vị trí: `Admin/Scripts/`.
- Chạy trong terminal tại thư mục vault:
  - Thêm `lang/*` tự động toàn vault: `bash Admin/Scripts/batch-lang-tags.sh`
  - Đánh `lang/*` cho `Technology/`: `bash Admin/Scripts/tech-lang-tags.sh`
  - Batch tiếp theo có hướng dẫn: `bash Admin/Scripts/next-batch-automation.sh`
- Lưu ý: luôn backup trước khi chạy, kiểm tra vài file mẫu, xem lại [[Admin/Scripts/tag-migration]].

## Quy tắc attachments

- Lưu tại `Attachments/`.
- Đặt tên gợi nhớ theo dạng `YYYYMMDD-topic-slug.ext`.
- Dọn định kỳ theo checklist trong [[Admin/Workflows/Review]].

## Kiểm soát chất lượng

- Mở [[Admin/MOC/Quality-Control]] để xem các mục kiểm tra và hướng dẫn thao tác bằng VS Code.
  - Tìm notes thiếu tags bắt buộc.
  - Phát hiện tags sai chuẩn (`excalidraw` → `media/excalidraw`, `js` → `topic/javascript`).
  - Kiểm tra naming `kebab-case`.

## Quick start

- Mở [[Admin/MOC/Home]] để xem tổng quan.
- Tạo ghi chú mới trong `Inbox` với frontmatter chuẩn và di chuyển khi phân loại.
- Duyệt [[Inbox]] và chuyển sang thư mục phù hợp, thêm frontmatter + tags.
- Với tài liệu kỹ thuật, đặt `area/technology` + `domain/*` + `topic/*`.
