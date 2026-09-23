---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Source Code Indexing Comparison
description: Đánh giá khả năng Index & Search Source Code
timestamp: "2026-06-19T13:43:26.089Z"
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
---

# Đánh giá khả năng Index & Search Source Code

## Kết luận quan trọng

**4 tools trong graph-comparison (semantica, trustgraph, mempalace, neural-memory) KHÔNG phải là lựa chọn tốt cho source code indexing.**

Những tools này tập trung vào:

- **semantica**: Document-based KG, reasoning, audit trail
- **trustgraph**: Multi-model data, enterprise knowledge
- **mempalace**: Memory system, Palace structure
- **neural-memory**: Graph-based memory, spreading activation

---

## Tools TỐT NHẤT cho Source Code Indexing

Trong số 14 repos, có **3 tools chuyên về source code:**

### 1. graphify ⭐ TỐT NHẤT

| Feature             | Support                                                  |
| ------------------- | -------------------------------------------------------- |
| **Languages**       | 23 languages (Python, JS, TS, Go, Rust, Java, C++, etc.) |
| **AST Parsing**     | ✅ tree-sitter                                           |
| **Code Indexing**   | ✅ Persistent graph (graph.json)                         |
| **Code Search**     | ✅ query, path, explain commands                         |
| **Token Reduction** | 71.5×                                                    |
| **MCP**             | ✅ (MCP server)                                          |
| **Output**          | graph.html (interactive), GRAPH_REPORT.md                |

**Cách hoạt động:**

1. AST pass - deterministic extraction (classes, functions, imports, call graphs)
2. Semantic pass - Claude extracts concepts, relationships, design rationale
3. Output: NetworkX graph + Leiden community detection

### 2. code-review-graph

| Feature             | Support                          |
| ------------------- | -------------------------------- |
| **Languages**       | 19 languages + Jupyter           |
| **AST Parsing**     | ✅ tree-sitter                   |
| **Code Indexing**   | ✅ SQLite                        |
| **Code Search**     | ✅ Blast-radius, impact analysis |
| **Token Reduction** | 8.2× - 49×                       |
| **MCP**             | ✅ (22 tools)                    |
| **Output**          | D3.js visualization              |

**Điểm mạnh:**

- Incremental updates (<2s)
- 100% recall on impact analysis
- Auto-update on file edit/git commit

### 3. gitnexus

| Feature           | Support                               |
| ----------------- | ------------------------------------- |
| **Languages**     | Multiple (tree-sitter based)          |
| **AST Parsing**   | ✅ tree-sitter                        |
| **Code Indexing** | ✅ LadybugDB                          |
| **Code Search**   | ✅ MCP tools (query, context, impact) |
| **MCP**           | ✅ (16 tools)                         |
| **Architecture**  | Zero-server (WASM)                    |

**Điểm mạnh:**

- Runs in browser (WASM)
- Zero-server architecture
- Enterprise features (PR review, wiki)

---

## So sánh Chi tiết

| Feature             |    graphify    | code-review-graph |    gitnexus    | semantica | trustgraph | mempalace | neural-memory |
| ------------------- | :------------: | :---------------: | :------------: | :-------: | :--------: | :-------: | :-----------: |
| **Languages**       |       23       |        19+        |    Multiple    |  Generic  |  Generic   |    ❌     |      ❌       |
| **AST Parsing**     | ✅ tree-sitter |  ✅ tree-sitter   | ✅ tree-sitter | ⚠️ basic  |     ❌     |    ❌     |      ❌       |
| **Code Indexing**   |       ✅       |        ✅         |       ✅       |    ❌     |     ❌     |    ❌     |      ❌       |
| **Code Search**     |       ✅       |        ✅         |       ✅       |    ❌     |     ❌     |    ❌     |      ❌       |
| **Token Reduction** |     71.5×      |      8.2-49×      |       -        |     -     |     -      |     -     |       -       |
| **MCP**             |       ✅       |      ✅ (22)      |    ✅ (16)     |    ❌     |     ✅     |    ✅     |    ✅ (56)    |
| **Offline**         |       ✅       |        ✅         |       ✅       |    ✅     |     ✅     |    ✅     |      ✅       |

---

## Khuyến nghị

### Cho Source Code Indexing & Searching:

| Use Case                   | Recommendation    | Lý do                                            |
| -------------------------- | ----------------- | ------------------------------------------------ |
| **Codebase understanding** | graphify          | 71.5× token reduction, 23 languages, AST parsing |
| **Code review**            | code-review-graph | Blast-radius, impact analysis                    |
| **Code intelligence**      | gitnexus          | Zero-server, WASM, enterprise                    |
| **Simple code search**     | code-review-graph | Fast, incremental updates                        |

### Không nên dùng cho source code:

| Tool          | Lý do                                          |
| ------------- | ---------------------------------------------- |
| semantica     | Document-focused, không có AST parsing         |
| trustgraph    | Enterprise knowledge, không phải code analysis |
| mempalace     | Memory system, không có code features          |
| neural-memory | Memory library, không tập trung vào code       |

---

## Quick Decision

```
Bạn cần gì?
│
├─► Index & Search Source Code
│   ├─► Token optimization (71.5×) → graphify
│   ├─► Code review, impact analysis → code-review-graph
│   ├─► Zero-server, WASM → gitnexus
│   ├─► Tốc độ + auto-sync, MIT → codegraph
│   ├─► Nhiều ngôn ngữ nhất, zero-dependency → codebase-memory-mcp
│   └─► Graph + git history + code health + decisions → repowise
│
├─► Knowledge Graph / Semantic Search (documents)
│   ├─► Audit, reasoning → semantica
│   ├─► Multi-model enterprise → trustgraph
│   └─► Memory system → mempalace / neural-memory
│
└─► Vector Search Only
    └─► zvec (high-performance)
```

---

**Kết luận:** Để index và search source code của dự án, hãy dùng **graphify** (tốt nhất cho token reduction), **code-review-graph** (cho review), **gitnexus** (cho enterprise, chấp nhận license noncommercial), **codegraph** (nhanh nhất, auto-sync, MIT thuần), **codebase-memory-mcp** (nhiều ngôn ngữ nhất, zero-dependency), hoặc **repowise** (nếu cần cả git analytics/code health/decisions chứ không chỉ graph).

---

## Cập nhật 09/2026 — 3 tool mới nổi (repowise, codegraph, codebase-memory-mcp)

Ba tool này chưa có trong bảng so sánh gốc (04/2026) vì ra đời/phổ biến sau đó. Xem chi tiết từng tool: [repowise.md](repowise.md), [codegraph.md](codegraph.md), [codebase-memory-mcp.md](codebase-memory-mcp.md).

| Tool                    | Ngôn ngữ lõi | Số ngôn ngữ parse | MCP tools                     | License             | Điểm khác biệt                                               |
| ----------------------- | ------------ | ----------------- | ----------------------------- | ------------------- | ------------------------------------------------------------ |
| **repowise**            | Python       | 26                | 10 (task-shaped)              | AGPL-3.0/thương mại | Graph + git analytics + code health + ADR mining, PR bot     |
| **codegraph**           | Rust kernel  | 20                | tập trung `codegraph_explore` | MIT                 | Nhanh nhất, auto-sync qua OS file watcher, tự scale theo máy |
| **codebase-memory-mcp** | Pure C       | 162               | 15                            | MIT                 | Zero-dependency (1 binary), Hybrid LSP, không tự gọi mạng    |

**Lưu ý về độ tin cậy**: cả 3 (và cả gitnexus) đều rất trẻ (tạo 08/2025–03/2026) nhưng đã đạt 6.7k–71.5k sao GitHub — tỷ lệ watcher/follower-chủ-repo trên số sao thấp hơn mặt bằng chung của các repo phổ biến lâu năm. Không phải bằng chứng gian lận, nhưng nên tự kiểm chứng thêm (lịch sử commit, thảo luận cộng đồng) và tránh pipe thẳng `curl | bash`/`curl | sh` vào shell khi có thể, trước khi tin tuyệt đối vào các con số benchmark/badge tự công bố trong README.

_Updated: 2026-04-13, bổ sung 2026-09-20_
