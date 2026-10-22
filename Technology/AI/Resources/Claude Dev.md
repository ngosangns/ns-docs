---
area: technology
domain: ai-tools
type: resource
title: claude.dev
description: Blog kỹ thuật claude.dev của Anthropic (Anthropic, PBC) cho người xây dựng với Claude, gồm mục trên site, 16 bài trong posts.json, trang /terminal/ và điều khoản site, đã đối chiếu ngày 23/10/2026.
timestamp: "2026-10-23T00:00:00.000Z"
tags:
  - technology
  - ai-tools
  - tech-blogs
  - claude
resource: https://claude.dev/
---

# claude.dev

[claude.dev](https://claude.dev/) là blog kỹ thuật của Anthropic cho người đang xây sản phẩm với Claude. Mình đối chiếu trực tiếp trong phiên 23/10/2026. Mỗi mục dưới ghi câu nào lấy từ chính site, câu nào chỉ mới thấy ngoài site, và câu nào mình chưa mở.

## Đã đọc trên site

`curl` tới `https://claude.dev/` nhận HTTP 200 và dừng tại đúng URL đó, không có bước redirect. Thẻ canonical cùng là `https://claude.dev/`. `<title>` là "claude.dev Blog / technical writing for people building with Claude". Meta description: "Articles, videos, and build logs from Anthropic’s developers on building with Claude and Claude Code, including tips, tricks, and points of view." Dòng chữ hiện trên trang: "Sharing tips, tricks, and POVs from Anthropic’s developers." [llms.txt](https://claude.dev/llms.txt) mở đầu: "Technical writing from Anthropic for people building with claude: deep dives, mental models, and guides."

`https://claude.com/blog` trả 308 rồi tới `https://claude.com/resources/articles`. Trang đó có title "Articles | Claude by Anthropic" khi mình lấy nội dung. Đó là hub bài của Claude by Anthropic. Một số thẻ trên hub dẫn sang bài nằm trên claude.dev, ví dụ bài code review ngày 15/10/2026. Hai địa chỉ là hai trang.

### Điều khoản

Trang [Terms of Use](https://claude.dev/terms/) ghi LAST UPDATED September 18, 2026. Site do Anthropic, PBC vận hành. Điều khoản này chỉ phủ claude.dev. Việc dùng Claude, Claude API, hoặc sản phẩm Anthropic khác theo điều khoản của sản phẩm đó. Bài viết, ảnh, video và thiết kế thuộc Anthropic hoặc bên cấp phép. Người đọc được đọc, chia sẻ link, và trích đoạn ngắn có ghi nguồn. Phần còn lại cần phép viết nếu muốn copy, đăng lại hoặc bán. Mẫu code theo MIT License, trừ khi mẫu ghi giấy phép khác. Nội dung là thông tin chung, có thể cũ hoặc thiếu, và một phần có thể được soạn với sự hỗ trợ của AI. Trang trỏ chính sách quyền riêng tư sang `https://www.anthropic.com/legal/privacy`. Mình chưa đọc chính sách đó. Hộp thư trên trang điều khoản là legal@anthropic.com. Đoạn này là tóm tắt, không phải bản chép điều khoản.

### Mục trên trang

Bộ lọc bài trên trang chủ: ALL, AGENTS, ENGINEERING, PLAYBOOKS, SKILLS, TUTORIALS. Có ô SEARCH (phím S) và nút LOAD MORE (phím R). Phía dưới là khối Featured videos.

Thanh điều hướng mình thấy trong HTML của `/terminal/`: HOME, MODS (`/mods/`), CHANGELOG (`https://code.claude.com/docs/en/changelog`), DOCS (`https://code.claude.com/docs`), TERMINAL (`/terminal/`), và nút Try Claude Code tới `https://claude.com/product/claude-code`. Trang chủ cũng có link `/mods/` và `/terminal/`.

[`/mods/`](https://claude.dev/mods/) có title "Claude Code mods / claude.dev Blog". Trang tự mô tả: "Small TypeScript functions that ship inside Claude Code plugins. They hook its events, change what it does, and draw their own UI in the terminal." Trang liệt kê ba demo (Token weather, Blast radius, Replay theater), nhóm "BUILT INTO CLAUDE CODE" gồm `/diff`, `AGENTS.md` và `sec-default` với link source trong `anthropics/claude-code`, và một mod cộng đồng `next-steps`. Dòng cài in trên trang là `claude plugin install next-steps@claude-community`, tên người ghi cạnh mod là Thariq Shihipar. Mình chưa chạy lệnh cài và chưa mở từng repo.

Chỉ mục máy đọc mình tải được: [posts.json](https://claude.dev/posts.json) (`site` = `claude.dev`, `count` = 16), [llms.txt](https://claude.dev/llms.txt), và [rss.xml](https://claude.dev/rss.xml).

### Bài trong posts.json

Bảng dưới lấy từ `posts.json` lúc tải. Mình chưa đọc hết thân từng bài, nên không tóm kỹ thuật bên trong. Cột phút là trường `mins`. Tên người giữ đúng chính tả trong file, kể cả "Issac G.".

| Ngày       | Mục         | Phút | Tác giả trên site                               | Bài                                                                                                                                                                 |
| ---------- | ----------- | ---- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-15 | engineering | 14   | Addy Osmani, Morgan Westlee Lunt, and Qing Wang | [How the Claude Code team does code review](https://claude.dev/blog/solving-code-review-at-anthropic/)                                                              |
| 2026-10-08 | agents      | 9    | Lance Martin and CJ Avilla                      | [Building effective agent automations](https://claude.dev/blog/building-effective-agent-automations/)                                                               |
| 2026-10-06 | playbooks   | 18   | Addy Osmani                                     | [Claude Code in the cloud: a field guide to cloud sessions](https://claude.dev/blog/claude-code-in-the-cloud/)                                                      |
| 2026-10-01 | tutorials   | 11   | Addy Osmani                                     | [Getting started with Claude Code mods](https://claude.dev/blog/getting-started-with-claude-code-mods/)                                                             |
| 2026-09-28 | playbooks   | 9    | Addy Osmani                                     | [Building with Claude Sonnet 5.5](https://claude.dev/blog/building-with-claude-sonnet-5-5/)                                                                         |
| 2026-09-28 | playbooks   | 12   | Lance Martin                                    | [Automating eval design and hillclimbing with Claude](https://claude.dev/blog/automating-eval-design-and-hillclimbing/)                                             |
| 2026-09-25 | playbooks   | 21   | Addy Osmani                                     | [What a task costs on Opus 5.5](https://claude.dev/blog/what-a-task-costs-on-opus-5-5/)                                                                             |
| 2026-09-25 | engineering | 8    | Thariq Shihipar                                 | [Using Claude Code: Spending your effort](https://claude.dev/blog/spending-your-effort/)                                                                            |
| 2026-09-23 | engineering | 15   | Raymond Wang, Sam Attard, and Issac G.          | [How we made claude.ai 3x faster in two weeks](https://claude.dev/blog/how-we-made-claude-ai-faster/)                                                               |
| 2026-09-22 | playbooks   | 9    | Addy Osmani                                     | [Getting the most out of Opus 5.5 in Claude and Claude Code](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/)                                             |
| 2026-07-24 | engineering | 7    | Thariq Shihipar                                 | [The new rules of context engineering for Claude 5 generation models](https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/) |
| 2026-06-03 | skills      | 11   | Thariq Shihipar                                 | [Lessons from building Claude Code: How we use skills](https://claude.dev/blog/lessons-from-building-claude-code-how-we-use-skills/)                                |
| 2026-06-02 | agents      | 11   | Thariq Shihipar and Sid Bidasaria               | [A harness for every task: dynamic workflows in Claude Code](https://claude.dev/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code/)                    |
| 2026-05-20 | playbooks   | 9    | Thariq Shihipar                                 | [Using Claude Code: The unreasonable effectiveness of HTML](https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/)                      |
| 2026-04-30 | engineering | 6    | Thariq Shihipar                                 | [Lessons from building Claude Code: Prompt caching is everything](https://claude.dev/blog/lessons-from-building-claude-code-prompt-caching-is-everything/)          |
| 2026-04-10 | agents      | 7    | Thariq Shihipar                                 | [Seeing like an agent: how we design tools in Claude Code](https://claude.dev/blog/seeing-like-an-agent/)                                                           |

Trang chủ, trước khi bấm load more, hiện 10 bài từ 15/10/2026 trở về 22/09/2026. Sáu bài từ 24/07/2026 trở về trước vẫn có trong `posts.json`. Con số trong tiêu đề, ví dụ "3x faster", là chữ của Anthropic trên tiêu đề. Mình chưa đo.

### Video trên trang chủ

Năm video này nằm trong HTML trang chủ. Mình chưa mở kênh YouTube ngoài link cuối bảng.

| Ngày       | Thời lượng trên trang | Tên                                                  |
| ---------- | --------------------- | ---------------------------------------------------- |
| 2026-09-08 | 34 phút 42 giây       | How founders build on Claude Managed Agents          |
| 2026-09-02 | 22 phút 23 giây       | How the Claude Code team uses Claude Code            |
| 2026-08-06 | 21 phút 59 giây       | How Ramp engineers work with AI agents at every step |
| 2026-07-07 | 25 phút 11 giây       | DoorDash gave every employee Claude Code             |
| 2026-07-02 | 11 phút 26 giây       | The future of work with Claude                       |

Link "WATCH MORE ON YOUTUBE" trỏ [youtube.com/@claude](https://www.youtube.com/@claude).

### Trang /terminal/

[claude.dev/terminal/](https://claude.dev/terminal/) cũng HTTP 200, canonical là chính URL đó. Title: "Terminal / claude.dev Blog". Meta description: "The site as a shell: feeds are scrollback, navigation is a prompt. Type /help to start." Trên trang có câu "Type /help below to discover other commands" và gợi ý "LOAD MORE" kèm "/posts for more".

Trong HTML còn khối `swag` với hai lệnh: `/stickers` ("Claude Code sticker pack") và `/plushies` ("Clawd plushie", câu trên trang: "You'll get one of these at random."). Mình không gõ lệnh trong trình duyệt, nên chưa thấy màn hình terminal trả về.

Cùng trang có thẻ "Introducing Claude Opus 5.5". Câu trên thẻ, là chữ của Anthropic: "Claude Opus 5.5 leads in agentic coding and knowledge work, and costs 40% less to run than Opus 5 on typical workloads." Nút đọc thêm mở `https://www.anthropic.com/claude-opus-5-5`. Mình chưa mở trang sản phẩm đó và chưa đo chi phí. "40% less ... on typical workloads" là claim của Anthropic trên thẻ, không phải kết quả mình kiểm lại.

## Đã đọc ngoài site

Mình mở bài của [@ClaudeDevs](https://x.com/ClaudeDevs/status/2105391694741119047) (status `2105391694741119047`). Trang X hiển thị "8:17 PM · Sep 30, 2026" và không gắn nhãn múi giờ cạnh giờ đó. Nội dung: "Claude.dev is our new home for developers building with Claude. You'll find engineering deep dives, Claude Code and API guides, tips from the teams building Claude, and some fun easter eggs." Bản ghi tìm kiếm của cùng status ghi thêm mốc 2026-09-30 20:17:50 UTC. Bio trên trang tài khoản: "Official updates for developers building with @ClaudeAI". Cụm "easter eggs" là lời bài đăng. Mình mới thấy `/stickers` và `/plushies` trong HTML của `/terminal/`, chưa xác nhận đó là toàn bộ trứng, và chưa chạy chúng.

## Chưa kiểm

- Chưa đọc thân 16 bài. Tóm tắt một dòng trong `posts.json` và `llms.txt` là lời của site, mình không chép lại và không biến chúng thành kết luận của mình.
- Chưa gõ `/help`. Ngoài `/help`, `/posts`, `/stickers` và `/plushies` có trong HTML đã tải, mình không khẳng định thêm lệnh nào.
- Chưa mở kênh YouTube.
- Một bài điểm tin thứ cấp nói footer có Discord, Reddit, Claude Academy, và terminal có ASCII art "CLAUDE". HTML trang chủ mình lưu không chứa chuỗi `discord`, `reddit` hay `academy`. Mình không đưa các chi tiết đó vào phần đã kiểm.
- Chưa đo giá Opus 5.5 so với Opus 5. Câu 40% ở trên là claim của Anthropic.

> **Xem thêm:** [20 engineering blog của các công ty product](/Technology/Documentation/Resources/Company Engineering Blogs) · [Tech Blogs And Books](/Technology/Documentation/Resources/Tech Blogs And Books) · [AI Tools And Resources](/Technology/AI/Resources/AI Tools And Resources)
