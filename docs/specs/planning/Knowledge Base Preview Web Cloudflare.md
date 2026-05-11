# Knowledge Base Preview Web Cloudflare

## Bối Cảnh

Repo là một Markdown knowledge base với scripts Node để format, thống kê, kiểm tra link, quản lý attachments và export. Preview web tham khảo nằm ở `../ns-workspace`; bản triển khai hiện tại reuse UI static đã build từ preview đó, nhưng thay backend filesystem runtime bằng static data bundle để deploy được lên Cloudflare Pages.

## Mục Tiêu

- Cung cấp preview web cho toàn bộ knowledge base.
- Giữ các tính năng chính của preview tham khảo: sidebar tài liệu, Markdown render, Mermaid, graph, search 4 panel, modal preview, theme toggle, tag navigation, random note review và copy reference.
- Build ra static output `web/dist` để serve local hoặc deploy Cloudflare Pages.
- Cung cấp Taskfile cho `web:build`, `web:serve`, `web:watch` và `web:deploy`.

## Kiến Trúc Hiện Tại

- `web/static/` chứa static UI runtime: HTML, CSS, JS, graph modules, favicon và `api-shim.js`.
- `scripts/build-preview-data.js` scan Markdown/code files, trích xuất tag từ frontmatter/inline hashtags, dựng document list, docs graph, tag graph, code corpus, graphify data optional và ghi `web/dist/data/preview.json`.
- `scripts/build-preview-web.js` copy `web/static` sang `web/dist`, rồi build data.
- `scripts/watch-preview-web.js` rebuild khi notes/scripts/static assets đổi và chạy Vite dev server.
- `web/static/api-shim.js` intercept các request `/api/project`, `/api/docs`, `/api/docs/:id`, `/api/files`, `/api/graph` và `/api/search` trong browser, sau đó trả response từ `data/preview.json`.
- `wrangler.jsonc` dùng `pages_build_output_dir: "web/dist"` và project name `ngosangns-knowledge-base`.

## Taskfile

- `task web:build`: build static preview.
- `task web:serve`: build rồi serve local bằng Vite.
- `task web:watch`: watch notes/assets, rebuild data và serve local.
- `task web:deploy`: build rồi deploy `web/dist` bằng Wrangler Pages Direct Upload.

## Rủi Ro Và Ràng Buộc

- Preview deploy là static snapshot; nội dung chỉ mới sau khi chạy build/deploy lại.
- Code Graph phụ thuộc `graphify-out/graph.json` nếu file này tồn tại local. Nếu thiếu, search vẫn hoạt động và Code Graph degrade bằng warning.
- Tag graph được sinh từ snapshot Markdown; tag mới chỉ xuất hiện trên web sau khi build lại preview data.
- Một số thư viện render vẫn dùng CDN giống preview tham khảo, nên môi trường offline hoàn toàn có thể cần bước bundle riêng sau này.
- Deploy Cloudflare cần Wrangler đã login hoặc token env hợp lệ.

## Kiểm Chứng

- `npm run web:build`
- `npm run web:serve`
- HTTP smoke test với `/` và `/data/preview.json`
- `node --check` cho các scripts preview mới và `web/static/api-shim.js`
