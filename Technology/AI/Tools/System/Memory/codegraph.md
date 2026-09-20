---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Codegraph
description: CodeGraph - Rust Kernel Code Knowledge Graph, Auto-sync, Surgical Context cho Coding Agent
timestamp: "2026-09-20T00:00:00.000Z"
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
resource: https://github.com/colbymchenry/codegraph
---

# CodeGraph - Rust Kernel Code Knowledge Graph

## Định nghĩa

**CodeGraph** là code knowledge graph tập trung vào **tốc độ và "surgical context"** — một Rust kernel parse toàn bộ symbol/call-edge/dependency của codebase thành graph, agent chỉ cần một lệnh `codegraph_explore` để lấy đúng phần code cần thiết thay vì crawl từng file bằng grep/glob/Read.

## Key Metrics

- **Stars**: ~71.5k (repo tạo 01/2026)
- **Forks**: ~4.6k
- **License**: MIT

## Cài đặt & Quick Start

```bash
# macOS / Linux — không cần Node.js
curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh

# hoặc qua npm
npm i -g @colbymchenry/codegraph

# 1. Wire agent (Claude Code, Cursor, Codex, opencode, Hermes Agent, Gemini, Antigravity, Kiro, GitHub Copilot)
codegraph install

# 2. Build graph cho project
cd your-project
codegraph init
```

`codegraph upgrade`/`codegraph uninstall` có sẵn để cập nhật/gỡ toàn bộ (kể cả config đã ghi vào từng agent).

## Kiến trúc & hiệu năng

- **Native Rust kernel** cho 20 ngôn ngữ (TypeScript, JS, Java, Python, Go, C, C++, Rust, C#, Ruby, PHP, Swift, Kotlin, Scala, Dart, R, Lua, Luau — Metal/CUDA đi qua path C++); mỗi ngôn ngữ chỉ ship khi graph ra "byte-for-byte identical" với engine tham chiếu trên repo thật.
- **Auto-sync**: file watcher dùng OS-native events (FSEvents/inotify/ReadDirectoryChangesW), graph luôn cập nhật khi agent hoặc người dùng sửa file — không cần lệnh reindex thủ công.
- **Tự scale theo máy**: worker pool/cache size theo core count thật (container/cgroup-aware) và RAM khả dụng đo được — máy 2-core/6GB VPS vẫn index xong Linux kernel (70k files) dưới 12 phút; workstation full-parallel index Swift compiler repo (27k files) trong ~100s, re-sync 1 file ~4s.
- Full-text search FTS5, impact analysis (callers/callees/blast radius).

## Benchmark (tự công bố, 2026-08)

Đo trên Claude Opus 4.8 headless, chặn CLI `codegraph` ở cả 2 nhánh để tránh gian lận, 7 repo OSS thật (VS Code, Excalidraw, Django, Tokio, OkHttp, Gin, Alamofire), median 4 lần chạy:

- **Trung bình**: 88% ít tool-call hơn, 53% nhanh hơn, 62% ít token hơn, 44% rẻ hơn, 0 lần đọc file trên cả 7 repo.
- **Đánh đổi được công bố công khai**: context còn đọng lại trong cửa sổ hội thoại sau phiên nhiều-lượt cao hơn ~80% so với agent grep-and-read (do trả về 1 payload đậm đặc thay vì nhiều kết quả nhỏ bị evict dần).

## Tính năng khác

- **Telemetry ẩn danh bật mặc định** (chỉ thống kê tool/command/ngôn ngữ dùng, không gửi code/path/query) — tắt bằng `codegraph telemetry off` hoặc `DO_NOT_TRACK=1`.
- Có sản phẩm SaaS "CodeGraph platform" đang trong waitlist (PR-level test/impact prediction).
- Verified releases: build qua GitHub Actions công khai, có npm provenance + attested builds.

## Ưu điểm

| Ưu điểm             | Mô tả                                                          |
| ------------------- | -------------------------------------------------------------- |
| Không cần Node.js   | Cài qua 1 script tải binary sẵn, tự bundle runtime             |
| Auto-sync mượt      | Graph theo kịp thay đổi theo thời gian thực, không cần reindex |
| MIT license         | Không ràng buộc thương mại                                     |
| Benchmark minh bạch | Công bố cả methodology và mặt trái (context tồn đọng)          |

## Nhược điểm

| Nhược điểm                       | Mô tả                                                                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Cài qua `curl \| sh`             | Rủi ro chuỗi cung ứng chung của mọi installer kiểu này, nên cân nhắc dùng npm hoặc kiểm tra script trước khi chạy                               |
| Telemetry mặc định bật           | Cần chủ động tắt nếu không muốn gửi thống kê                                                                                                    |
| Repo còn trẻ, tăng sao rất nhanh | Tạo 01/2026 đã đạt ~71.5k sao — tốc độ vượt trội so với mặt bằng chung, nên tự kiểm chứng thêm trước khi tin tuyệt đối vào benchmark tự công bố |

## Sử dụng khi nào

- Cần tốc độ tối đa và graph luôn "tươi" khi code đang được agent chỉnh sửa liên tục.
- Đã quen hệ sinh thái npm/CLI, không ngại cài native binary.
- Ưu tiên MIT license, không muốn vướng ràng buộc thương mại như GitNexus/Repowise.

---

**Tài liệu tham khảo**:

- [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)
- [Documentation & Website](https://colbymchenry.github.io/codegraph/)
- [getcodegraph.com](https://getcodegraph.com) (SaaS waitlist)
