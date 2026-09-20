---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Codebase Memory Mcp
description: codebase-memory-mcp (DeusData/CBM) - Code Intelligence MCP Server bằng Pure C, 162 ngôn ngữ, zero dependencies
timestamp: "2026-09-20T00:00:00.000Z"
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
resource: https://github.com/DeusData/codebase-memory-mcp
---

# codebase-memory-mcp (CBM) - Code Intelligence bằng Pure C

## Định nghĩa

**codebase-memory-mcp** (CBM) là bản "zero-dependency, tối đa hiệu năng" của nhóm tool code-knowledge-graph: **1 binary C tĩnh**, không cần Node/Python runtime, vendor sẵn 162 grammar tree-sitter. Tự nhận full-index Linux kernel (28M LOC, 75k files) trong 3 phút, trả lời structural query dưới 1ms.

## Key Metrics

- **Stars**: ~43.9k (repo tạo 02/2026)
- **Forks**: ~3.6k
- **License**: MIT

## Cài đặt & Quick Start

```bash
# macOS / Linux — one-line install
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
```

```powershell
# Windows
Invoke-WebRequest -Uri https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.ps1 -OutFile install.ps1
Unblock-File .\install.ps1
.\install.ps1
```

Cũng có trên npm, PyPI, Homebrew, Scoop, Winget, Chocolatey, AUR, `go install`. Sau khi cài, restart coding agent và nói "Index this project" là xong — `install` tự detect và cấu hình 45 client surface.

> **Lưu ý AV**: README tự nhận Microsoft Defender có thể báo `Trojan:Script/Wacatac.B!ml` là false positive (dẫn chứng 61/62 engine sạch trên VirusTotal, cùng family false-positive với `gh`, llama.cpp, Godot). Đây là tuyên bố của tác giả, nên tự xác minh checksum/VirusTotal nếu quan tâm trước khi cài trên máy nhạy cảm.

## 15 MCP Tools & tính năng chính

- **Architecture overview**: `get_architecture` trả về ngôn ngữ, package, entry point, route, hotspot, boundary, layer, cluster trong 1 lần gọi.
- **Louvain community detection** để phát hiện module chức năng qua call edge.
- **Git diff impact mapping**: `detect_changes` map uncommitted changes → symbol bị ảnh hưởng kèm risk classification.
- **Semantic search** (`semantic_query`): vector search toàn graph bằng embedding Nomic `nomic-embed-code` (768d int8) compile sẵn vào binary — không cần API key/Ollama/Docker; kết hợp 11 tín hiệu (TF-IDF, RRI, API/Type/Decorator signature, AST profile, data flow, Halstead-lite, MinHash, module proximity, graph diffusion).
- **BM25 full-text** qua SQLite FTS5 với tokenizer camelCase/snake_case-aware.
- **Cross-service linking**: HTTP route ↔ call-site, gRPC/GraphQL/tRPC detection, channel detection (Socket.IO, EventEmitter, pub-sub) qua 8 ngôn ngữ.
- **Cross-repo**: `CROSS_*` edges liên kết nhiều repo cùng store, 3D UI multi-galaxy cho kiến trúc cross-repo.
- **Hybrid LSP**: mô phỏng logic resolve type của tsserver/pyright/gopls/rust-analyzer... bằng C thuần cho 11 ngôn ngữ chính (Python, TS/JS/JSX/TSX, PHP, C#, Go, C, C++, Java, Kotlin, Rust, Perl) — không chạy language server thật.
- **Infrastructure-as-code indexing**: Dockerfile, Kubernetes manifest, Kustomize overlay thành graph node.
- **Graph visualization UI** 3D built-in tại `localhost:9749`.

## Kiến trúc vận hành

- **Session coordination daemon**: nhiều client (Claude Code, Codex, OpenCode...) dùng chung 1 daemon nền qua tài khoản, tự tắt khi phiên cuối đóng; admission barrier chặn 2 tiến trình CBM khác bản chạy đè lên nhau.
- **Không LLM nội bộ**: chỉ là "structural analysis backend" thuần graph — dựa hoàn toàn vào agent (MCP client) làm lớp dịch ngôn ngữ tự nhiên ↔ graph query, nên không cần API key riêng cho CBM.
- **Team-shared graph artifact**: `.codebase-memory/graph.db.zst` (SQLite nén zstd 8-13:1) commit được vào repo để đồng đội skip reindex — kèm cảnh báo commit mỗi lần sẽ phình lịch sử git (ví dụ thực tế ~6GB/350 commit nếu commit mọi lần watcher ghi).
- Không tự động gọi mạng ("cbm makes no network request of its own accord") — update phải chạy install script thủ công, không tự phone-home.

## Ưu điểm

| Ưu điểm                        | Mô tả                                                       |
| ------------------------------ | ----------------------------------------------------------- |
| Zero dependency                | 1 binary tĩnh, không cần Node/Python/Docker                 |
| Nhiều ngôn ngữ nhất trong nhóm | 162 ngôn ngữ tree-sitter + Hybrid LSP cho 11 ngôn ngữ chính |
| MIT, không gọi mạng tự động    | Phù hợp môi trường air-gapped/nhạy cảm                      |
| Team-shared artifact           | Đồng đội skip reindex qua file nén commit vào repo          |

## Nhược điểm

| Nhược điểm                           | Mô tả                                                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Cài qua `curl \| bash`               | Rủi ro chuỗi cung ứng chung, nên inspect script hoặc dùng npm/pip thay vì pipe thẳng                                     |
| Badge "uy tín" tự công bố            | VirusTotal/SLSA-3/OpenSSF Scorecard/arXiv preprint đều do chính dự án tuyên bố, chưa có kiểm chứng độc lập từ bên thứ ba |
| Repo còn rất trẻ, tăng sao rất nhanh | Tạo 02/2026 đã ~43.9k sao — nên tự kiểm chứng thêm (lịch sử commit, thảo luận cộng đồng) trước khi tin tuyệt đối         |
| Team-shared artifact dễ phình git    | Cần chọn cadence commit hợp lý, tránh commit mọi lần watcher ghi                                                         |

## Sử dụng khi nào

- Cần hỗ trợ nhiều ngôn ngữ nhất, không muốn cài thêm runtime nào ngoài 1 binary.
- Làm việc trong môi trường hạn chế mạng/air-gapped, cần cam kết "không tự gọi mạng".
- Cần chia sẻ graph đã index cho cả team qua git thay vì mỗi người tự reindex.

---

**Tài liệu tham khảo**:

- [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)
- [Documentation](https://deusdata.github.io/codebase-memory-mcp/)
- Preprint: _Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP_ (arXiv:2603.27277)
