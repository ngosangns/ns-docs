---
area: technology
domain: tech-blogs
type: resource
title: 20 engineering blog của các công ty product
description: Danh sách 20 engineering blog của công ty product (Netflix, Uber, Meta, Cloudflare, Stripe, Discord, Grab...) chia theo 5 nhóm, kèm URL đã kiểm tra ngày 21/10/2026, bài mới nhất thấy trong feed và những blog chưa xác nhận được.
timestamp: "2026-10-21T00:00:00.000Z"
tags:
  - technology
  - tech-blogs
  - reading
  - system-design
resource: https://blog.cloudflare.com/
---

# 20 engineering blog của các công ty product

Danh sách này lấy từ một bài chia sẻ không rõ tác giả. Người viết đọc các blog này nhiều năm rồi viết lại trên blog cá nhân cho dễ hiểu, và nói nhiều bài khó đọc nên có lúc nhờ AI tóm tắt. Lý do bài đưa ra: công ty làm product là chủ sản phẩm nên tự quyết định công bố hoặc mở mã nguồn phần nào, còn công ty outsource thì không viết kiểu này được vì đăng một bài có thể thành sự cố bảo mật thông tin. Đó là quan điểm của tác giả, mình không kiểm chứng. "OS" trong bài mình hiểu là outsource.

Cột "Mô tả" là lời của bài chia sẻ, không phải mình đã đọc từng blog để xác nhận. Cột "Kiểm tra" là kết quả mình gọi từng URL và đọc feed ngày 21/10/2026. Một số blog chặn công cụ của mình (HTTP 403/406), nên "chưa xác nhận" nghĩa là mình không đọc được, không có nghĩa blog đã chết.

## Hệ thống và xử lý dữ liệu

| Blog | Mô tả theo bài | Kiểm tra |
| --- | --- | --- |
| [Netflix TechBlog](https://netflixtechblog.com/) | Kiến trúc phân tán, Chaos Engineering | Trang chính trả 403 cho curl. [Feed](https://netflixtechblog.com/feed) đọc được, bài đầu: Ontology-Driven Observability (16/10/2026) |
| [Uber Engineering](https://www.uber.com/en-US/blog/engineering/) | Định tuyến, xử lý luồng real-time | Chuyển về `/US/en/blog/engineering/`, trả 406 cho curl, chưa xác nhận nội dung |
| [Meta Engineering](https://engineering.fb.com/) | Hạ tầng tỷ người dùng, data center | Còn hoạt động. Feed có bài GenRecs Tokenization về gợi ý quảng cáo (20/10/2026) |
| [Google Research](https://research.google/blog/) | LLM, hệ thống phân tán | Còn hoạt động. Feed mới nhất 16/10/2026 nghiêng về AI agent và địa không gian, chưa thấy bài về hệ thống phân tán |
| [LinkedIn Engineering](https://engineering.linkedin.com/blog) | Big Data (Kafka), AI | Trả 200 nhưng nội dung rất ngắn (hình như tải bằng JavaScript), chưa xác nhận bài mới |

## Hạ tầng, cloud và bảo mật

| Blog | Mô tả theo bài | Kiểm tra |
| --- | --- | --- |
| [Cloudflare Blog](https://blog.cloudflare.com/) | Tối ưu mạng, bảo mật, edge computing | Còn hoạt động, bài mới 20/10/2026. Cũng là nơi đăng [bài Clef](/Technology/AI/Concepts/LLM And Generative AI/Clef) |
| [AWS Architecture Blog](https://aws.amazon.com/blogs/architecture/) | Design pattern, serverless | Còn hoạt động, bài mới 15/10/2026 (multi-region DR cho API Gateway WebSocket) |
| [Datadog Engineering](https://www.datadoghq.com/blog/engineering/) | Observability, Kubernetes, xử lý log | Còn hoạt động, bài mới 21/10/2026 |
| [Stripe Engineering](https://stripe.com/blog/engineering) | API chuẩn mực, hạ tầng tài chính | URL cũ chuyển sang [stripe.dev/blog/topic/engineering](https://stripe.dev/blog/topic/engineering). Mình không tìm được feed ở stripe.dev/blog/feed.rss (404) nên chưa biết bài mới nhất |

## Nền tảng và tương tác real-time

| Blog | Mô tả theo bài | Kiểm tra |
| --- | --- | --- |
| [Discord Engineering](https://discord.com/category/engineering) | WebSocket đồng thời với Rust/Elixir | Trang trả 200. RSS thấy được là của cả blog Discord (patch notes, sự kiện), không phải riêng engineering, nên chưa xác nhận bài kỹ thuật mới |
| [Slack Engineering](https://slack.engineering/) | Real-time messaging, đồng bộ state | Feed có bài đầu Shipyard (nền tảng EC2) với ngày 14/07/2026, tức khoảng 3 tháng chưa có bài mới theo feed. Có thể blog chậm lại |
| [Airbnb Engineering](https://medium.com/airbnb-engineering) | Data science, RAG, tìm kiếm | URL Medium trả 200 nhưng feed Medium trả rỗng. Blog hiện có trang riêng [airbnb.tech](https://airbnb.tech/blog/), feed bài mới 13/10/2026 (CASTLE: huấn luyện tìm kiếm ngôn ngữ tự nhiên) |
| [Spotify Engineering](https://engineering.atspotify.com/) | Xử lý luồng dữ liệu âm nhạc | Còn hoạt động, bài mới 20/10/2026 (recommendation inference với NVIDIA TensorRT LLM) |
| [Shopify Engineering](https://shopify.engineering/) | Scale e-commerce, Black Friday | Còn hoạt động, atom feed cập nhật 21/10/2026 |

## Logistics và chuyển động

| Blog | Mô tả theo bài | Kiểm tra |
| --- | --- | --- |
| [DoorDash Engineering](https://doordash.engineering/) | Thuật toán logistics, event-driven | URL chuyển về `careersatdoordash.com/engineering-blog/`, trả 403 cho curl, chưa xác nhận |
| [Grab Tech Blog](https://engineering.grab.com/) | Kiến trúc super app, định tuyến Đông Nam Á | Còn hoạt động, bài mới 21/10/2026 (App stability at scale với layered defense). Đã có trong [Tech Blogs And Books](/Technology/Documentation/Resources/Tech Blogs And Books) |
| [Lyft Engineering](https://eng.lyft.com/) | Mạng microservice, Envoy Proxy | Trang chính trả 403 cho curl, [feed](https://eng.lyft.com/feed) đọc được, mới nhất 21/10/2026 |

## Công cụ và lưu trữ

| Blog | Mô tả theo bài | Kiểm tra |
| --- | --- | --- |
| [GitHub Engineering](https://github.blog/category/engineering/) | CSDL phân tán, hệ thống quản lý mã nguồn | URL chuyển về `github.blog/engineering/`. Feed bài mới 15/10/2026 (bài đầu về tự động hóa quyền truy cập và vệ sinh repo trong một org dùng chung) |
| [Dropbox Tech Blog](https://dropbox.tech/) | Lưu trữ exabyte, từ Python sang Go/Rust | Còn hoạt động, bài mới 29/09/2026 (Reclaim, trợ lý lịch AI) |
| [Pinterest Engineering](https://medium.com/@Pinterest_Engineering) | Khám phá nội dung, graph data | URL Medium trả 200 nhưng feed Medium trả rỗng. Mình chưa tìm được địa chỉ blog mới hay ngày bài gần nhất, nên chưa xác nhận |

## Ghi chú về danh sách

- **Còn hoạt động theo feed ngày 21/10/2026:** Meta, Google Research, Cloudflare, AWS, Datadog, Spotify, Shopify, Grab, Lyft, GitHub, Netflix, Airbnb (qua airbnb.tech), Dropbox (bài cuối 29/09). Slack là ngoại lệ với bài cuối 14/07/2026.
- **Chưa xác nhận được:** Uber, LinkedIn, Stripe, DoorDash, Pinterest, và bài kỹ thuật của Discord. Lý do là trang chặn curl, feed rỗng hoặc không tìm được feed, không phải bằng chứng blog dừng.
- **Địa chỉ cũ:** Airbnb đã có trang riêng, Stripe đã chuyển sang stripe.dev, DoorDash đã chuyển sang careersatdoordash.com. Bookmark nên dùng địa chỉ mới.
- **Trùng với note khác:** [Tech Blogs And Books](/Technology/Documentation/Resources/Tech Blogs And Books) đã có Netflix, Uber, Meta, Cloudflare, Spotify, Grab và Dropbox. Mình giữ danh sách riêng vì đây là một nhóm có chủ đích (blog của công ty product), không sửa danh sách lớn kia.
- **Mô tả "theo bài" có thể đã cũ.** Ví dụ feed Google Research hiện nghiêng về AI agent, còn "Discord gánh WebSocket bằng Rust/Elixir" là chủ đề cũ của blog. Đọc vài bài mới trước khi coi đó là trọng tâm.
- **Theo dõi bằng RSS:** Netflix, Cloudflare, Lyft, Datadog, Meta, Spotify, Grab đều có feed mình đọc được.

> **See also:** [Tech Blogs And Books](/Technology/Documentation/Resources/Tech Blogs And Books) · [Grab Tech Talk Takeaways](/Technology/Documentation/Resources/Grab Tech Talk Takeaways) · [Developer Resources](/Technology/Documentation/Resources/Developer Resources)
