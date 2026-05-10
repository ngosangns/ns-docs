# Remove Legacy Editor Traces

## Bối Cảnh

Repo đã được chuyển sang cách gọi trung lập là personal knowledge base. Các cấu hình editor-specific cũ đã được xóa khỏi workspace, package metadata đã đổi sang `ngosangns-knowledge-base`, và các script nội bộ không còn tự mô tả theo công cụ ghi chú cũ.

## Mục Tiêu

- Giữ repo độc lập với một editor cụ thể.
- Duy trì các workflow hữu ích cho Markdown workspace: format, stats, link check, build preview web và deploy static.
- Tránh public path hoặc generated preview data chứa tên checkout cũ.

## Thay Đổi Chính

- Xóa thư mục cấu hình editor legacy khỏi workspace.
- Xóa ignore rule dành riêng cho cấu hình legacy.
- Đổi package name và description sang `ngosangns-knowledge-base`.
- Đổi link checker Python sang `MarkdownLinkChecker` với flag `--root-path`.
- Đổi README của link checker sang wording trung lập.
- Thay các path cũ trong notes bằng `ngosangns-knowledge-base`.
- Preview data builder sanitize tên legacy khi nhúng dữ liệu graphify cũ vào `web/dist/data/preview.json`.

## Kiểm Chứng

- Search legacy-name không còn match ngoài `.git`, `node_modules` và generated folders bị ignore.
- `find . -maxdepth 5 -iname '*legacy-editor*'` chỉ nên trả về docs nếu còn nhắc đến thuật ngữ legacy theo chủ đích.
- `npm run stats` vẫn chạy.
- `npm run links:check` vẫn chạy; repo hiện có nhiều broken links lịch sử không thuộc scope cleanup này.
