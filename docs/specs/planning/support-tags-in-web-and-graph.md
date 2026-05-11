# Support Tags In Web And Graph

## Bối Cảnh

Preview web hiện build dữ liệu từ Markdown trong `scripts/build-preview-data.js`, trả dữ liệu qua `web/static/api-shim.js`, render UI chính trong `web/static/app.js`, và render docs graph qua `web/static/js/graph.js` + `web/static/js/network_graph.js`.

Hiện tại tag chưa là một field dữ liệu chuẩn. `scripts/tags-stats.js` chỉ đọc frontmatter dạng list `tags:` cho thống kê CLI, còn preview data chỉ lưu các field như `status`, `compliance`, `priority`, `description`. Trong vault thực tế có cả inline hashtag trong nội dung như `#LLM`, `#agents`, `#system-design` và một số frontmatter `tags:`. Vì vậy web search/sidebar/graph chưa thể lọc hoặc biểu diễn theo tag.

## Mục Tiêu

- Trích xuất tag vào preview data cho mỗi Markdown document.
- Hiển thị tag trong web preview ở những nơi người dùng cần nhận diện nhanh note.
- Hỗ trợ lọc/tìm theo tag trong sidebar và search.
- Hỗ trợ tag trong docs graph bằng node/edge hoặc metadata đủ rõ để tìm và duyệt quan hệ tag-note.
- Giữ static deploy model hiện tại: mọi dữ liệu tag phải được build vào `web/dist/data/preview.json`.

## Ngoài Phạm Vi

- Không chỉnh nội dung note để chuẩn hóa tag.
- Không thay đổi code graph `graphify-out`; tag support trước mắt áp dụng cho docs graph/Markdown docs.
- Không thêm backend/runtime mới.
- Không thay đổi SM2 random note ngoài việc có thể dùng tag metadata nếu cần ở UI sau này.

## Hướng Tiếp Cận Đề Xuất

1. Thêm parser tag dùng chung trong `scripts/build-preview-data.js`.
   - Đọc frontmatter `tags:` ở các dạng:
     - YAML list:
       ```yaml
       tags:
         - area/technology
         - domain/frontend
       ```
     - Inline array: `tags: [AI, agents]`
     - Scalar: `tags: AI, agents`
   - Đọc inline hashtag trong Markdown body như `#LLM`, `#multi-agent`, `#area/technology`.
   - Bỏ qua code fence để tránh bắt nhầm `#include`, heading anchor hoặc shell comment.
   - Normalize tag bằng cách bỏ prefix `#`, trim, bỏ dấu câu cuối, de-dupe case-insensitive nhưng giữ display ổn định.

2. Mở rộng preview data model.
   - Mỗi doc có `tags: string[]`.
   - `summary` có `tagCounts` hoặc `topTags`.
   - `files[doc.path]` có thể giữ `tags` nếu UI/file preview cần truy cập nhanh.

3. Mở rộng docs graph.
   - Thêm tag nodes dạng `tag:<tag>` với `type: "tag"` và `label: "#tag"`.
   - Thêm edges từ doc sang tag với `type: "tagged"` hoặc `label: "tagged"`.
   - Giữ relationship metadata để graph details/search graph có thể hiển thị quan hệ tag.
   - Cập nhật `nodeColor` trong `web/static/js/graph.js` và `searchNodeColor` trong `web/static/app.js` để tag nodes có màu riêng.

4. Mở rộng UI web.
   - Sidebar search: include `spec.tags` trong haystack để nhập tag có thể lọc note.
   - File rows hoặc doc header: render các tag badge nhỏ, giới hạn số lượng để không làm sidebar rối.
   - Document view: hiển thị tag badge gần title/path hoặc ở đầu article; badge có thể click để mở search với tag đó.
   - Search results: bổ sung doc tags vào badge list, và search API tìm trong `tags`.

5. Mở rộng graph interactions.
   - Graph search haystack include `node.tags`.
   - Graph details hiển thị tag badges của doc nodes.
   - Khi chọn tag node, details liệt kê incoming docs giống các edge hiện tại.
   - Tag node labels tuân theo cơ chế ẩn/hiện label theo zoom hiện có.

## Công Việc Cần Làm

- `scripts/build-preview-data.js`
  - Thêm `extractTags(raw)` và helper normalize.
  - Gắn `tags` vào docs, graph nodes, files, summary.
  - Tạo tag nodes/edges trong `buildGraph`.

- `web/static/api-shim.js`
  - Include `tags` trong search fields.
  - Trả `tags` trong docs API nếu hiện tại đã strip hoặc clone thiếu field.
  - Đưa tag vào kết quả `docsSemantic` và graph neighbors nếu cần.

- `web/static/app.js`
  - Render tag badges trong doc view/search/sidebar.
  - Thêm click handler cho tag badge để mở search/filter.
  - Include tags trong sidebar filter.
  - Cập nhật search graph color/type display cho tag nodes.

- `web/static/js/graph.js`
  - Include tags trong graph search haystack/details.
  - Color `type: "tag"` riêng.

- `web/static/style.css`
  - Thêm style nhỏ cho tag badges/tag row nếu cần.

- `docs/specs/planning/Knowledge Base Preview Web Cloudflare.md`
  - Sau khi implementation được duyệt và hoàn tất, cập nhật mô tả kiến trúc/tính năng để phản ánh tag support và loại bỏ nhắc tới raw toggle cũ nếu vẫn stale.

## Rủi Ro Và Ràng Buộc

- Inline hashtag có thể bắt nhầm URL fragment hoặc code nếu parser quá rộng; cần strip code fences và giới hạn pattern tag.
- Số lượng tag nodes có thể làm graph dày hơn. Nên chỉ tạo tag nodes cho tags thật sự xuất hiện và cân nhắc graph search/filter để giảm nhiễu.
- Một số tag có uppercase/camelCase như `#LLM`, `#faceRecognition`; normalize không nên phá display.
- Frontmatter parser hiện tại đơn giản, chưa phải YAML parser đầy đủ. Nên implement vừa đủ theo pattern vault hiện tại thay vì kéo dependency mới.
- Worktree hiện đang có thay đổi preview web chưa commit từ các task trước; khi implement phải giữ nguyên các thay đổi đó và chỉ cộng thêm phần tag support.

## Kiểm Chứng

- `node --check scripts/build-preview-data.js`
- `node --check web/static/api-shim.js`
- `node --check web/static/app.js`
- `node --check web/static/js/graph.js`
- `npm run web:build`
- Smoke check `web/dist/data/preview.json`:
  - Một doc như `Technology/AI/Tools/Agents/Agent Frameworks.md` có `tags` từ inline hashtags.
  - `graph.nodes` có tag nodes.
  - `graph.edges` có `type: "tagged"`.
- Browser smoke test sau execution:
  - Search/sidebar tìm `LLM` hoặc `#LLM` thấy note liên quan.
  - Graph search tag thấy tag node hoặc docs có tag.
  - Click tag badge mở search đúng query.
