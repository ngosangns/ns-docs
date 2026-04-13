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

| Feature | Support |
|---------|----------|
| **Languages** | 23 languages (Python, JS, TS, Go, Rust, Java, C++, etc.) |
| **AST Parsing** | ✅ tree-sitter |
| **Code Indexing** | ✅ Persistent graph (graph.json) |
| **Code Search** | ✅ query, path, explain commands |
| **Token Reduction** | 71.5× |
| **MCP** | ✅ (MCP server) |
| **Output** | graph.html (interactive), GRAPH_REPORT.md |

**Cách hoạt động:**
1. AST pass - deterministic extraction (classes, functions, imports, call graphs)
2. Semantic pass - Claude extracts concepts, relationships, design rationale
3. Output: NetworkX graph + Leiden community detection

### 2. code-review-graph

| Feature | Support |
|---------|----------|
| **Languages** | 19 languages + Jupyter |
| **AST Parsing** | ✅ tree-sitter |
| **Code Indexing** | ✅ SQLite |
| **Code Search** | ✅ Blast-radius, impact analysis |
| **Token Reduction** | 8.2× - 49× |
| **MCP** | ✅ (22 tools) |
| **Output** | D3.js visualization |

**Điểm mạnh:**
- Incremental updates (<2s)
- 100% recall on impact analysis
- Auto-update on file edit/git commit

### 3. gitnexus

| Feature | Support |
|---------|----------|
| **Languages** | Multiple (tree-sitter based) |
| **AST Parsing** | ✅ tree-sitter |
| **Code Indexing** | ✅ LadybugDB |
| **Code Search** | ✅ MCP tools (query, context, impact) |
| **MCP** | ✅ (16 tools) |
| **Architecture** | Zero-server (WASM) |

**Điểm mạnh:**
- Runs in browser (WASM)
- Zero-server architecture
- Enterprise features (PR review, wiki)

---

## So sánh Chi tiết

| Feature | graphify | code-review-graph | gitnexus | semantica | trustgraph | mempalace | neural-memory |
|---------|:--------:|:-----------------:|:--------:|:---------:|:----------:|:----------:|:-------------:|
| **Languages** | 23 | 19+ | Multiple | Generic | Generic | ❌ | ❌ |
| **AST Parsing** | ✅ tree-sitter | ✅ tree-sitter | ✅ tree-sitter | ⚠️ basic | ❌ | ❌ | ❌ |
| **Code Indexing** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Code Search** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Token Reduction** | 71.5× | 8.2-49× | - | - | - | - | - |
| **MCP** | ✅ | ✅ (22) | ✅ (16) | ❌ | ✅ | ✅ | ✅ (56) |
| **Offline** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Khuyến nghị

### Cho Source Code Indexing & Searching:

| Use Case | Recommendation | Lý do |
|----------|---------------|-------|
| **Codebase understanding** | graphify | 71.5× token reduction, 23 languages, AST parsing |
| **Code review** | code-review-graph | Blast-radius, impact analysis |
| **Code intelligence** | gitnexus | Zero-server, WASM, enterprise |
| **Simple code search** | code-review-graph | Fast, incremental updates |

### Không nên dùng cho source code:

| Tool | Lý do |
|------|-------|
| semantica | Document-focused, không có AST parsing |
| trustgraph | Enterprise knowledge, không phải code analysis |
| mempalace | Memory system, không có code features |
| neural-memory | Memory library, không tập trung vào code |

---

## Quick Decision

```
Bạn cần gì?
│
├─► Index & Search Source Code
│   ├─► Token optimization (71.5×) → graphify
│   ├─► Code review, impact analysis → code-review-graph  
│   └─► Zero-server, WASM → gitnexus
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

**Kết luận:** Để index và search source code của dự án, hãy dùng **graphify** (tốt nhất), **code-review-graph** (cho review), hoặc **gitnexus** (cho enterprise).

---

*Updated: 2026-04-13*