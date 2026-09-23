---
area: technology
domain: code-intelligence
type: guide
title: Source Code Indexing Comparison
description: An evaluation of memory and graph tools for indexing and searching source code, with recommendations by use case and a decision tree.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - code-intelligence
  - memory
---

# Source Code Indexing Comparison

## Key Conclusion

**The 4 tools in the graph comparison (semantica, trustgraph, mempalace, neural-memory) are NOT good choices for source code indexing.**

These tools focus on:

- **semantica**: Document-based KG, reasoning, audit trail
- **trustgraph**: Multi-model data, enterprise knowledge
- **mempalace**: Memory system, Palace structure
- **neural-memory**: Graph-based memory, spreading activation

---

## Best Tools for Source Code Indexing

Among the 14 repos, **3 tools specialize in source code:**

### graphify ⭐ Best

| Feature             | Support                                                  |
| ------------------- | -------------------------------------------------------- |
| **Languages**       | 23 languages (Python, JS, TS, Go, Rust, Java, C++, etc.) |
| **AST Parsing**     | ✅ tree-sitter                                           |
| **Code Indexing**   | ✅ Persistent graph (graph.json)                         |
| **Code Search**     | ✅ query, path, explain commands                         |
| **Token Reduction** | 71.5×                                                    |
| **MCP**             | ✅ (MCP server)                                          |
| **Output**          | graph.html (interactive), GRAPH_REPORT.md                |

**How it works:**

1. AST pass - deterministic extraction (classes, functions, imports, call graphs)
2. Semantic pass - Claude extracts concepts, relationships, design rationale
3. Output: NetworkX graph + Leiden community detection

### code-review-graph

| Feature             | Support                          |
| ------------------- | -------------------------------- |
| **Languages**       | 19 languages + Jupyter           |
| **AST Parsing**     | ✅ tree-sitter                   |
| **Code Indexing**   | ✅ SQLite                        |
| **Code Search**     | ✅ Blast-radius, impact analysis |
| **Token Reduction** | 8.2× - 49×                       |
| **MCP**             | ✅ (22 tools)                    |
| **Output**          | D3.js visualization              |

**Strengths:**

- Incremental updates (<2s)
- 100% recall on impact analysis
- Auto-update on file edit/git commit

### gitnexus

| Feature           | Support                               |
| ----------------- | ------------------------------------- |
| **Languages**     | Multiple (tree-sitter based)          |
| **AST Parsing**   | ✅ tree-sitter                        |
| **Code Indexing** | ✅ LadybugDB                          |
| **Code Search**   | ✅ MCP tools (query, context, impact) |
| **MCP**           | ✅ (16 tools)                         |
| **Architecture**  | Zero-server (WASM)                    |

**Strengths:**

- Runs in browser (WASM)
- Zero-server architecture
- Enterprise features (PR review, wiki)

---

## Detailed Comparison

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

## Recommendations

### For Source Code Indexing & Searching

| Use Case                   | Recommendation    | Reason                                           |
| -------------------------- | ----------------- | ------------------------------------------------ |
| **Codebase understanding** | graphify          | 71.5× token reduction, 23 languages, AST parsing |
| **Code review**            | code-review-graph | Blast-radius, impact analysis                    |
| **Code intelligence**      | gitnexus          | Zero-server, WASM, enterprise                    |
| **Simple code search**     | code-review-graph | Fast, incremental updates                        |

### Not Recommended for Source Code

| Tool          | Reason                                  |
| ------------- | --------------------------------------- |
| semantica     | Document-focused, no AST parsing        |
| trustgraph    | Enterprise knowledge, not code analysis |
| mempalace     | Memory system, no code features         |
| neural-memory | Memory library, not focused on code     |

---

## Quick Decision

```
What do you need?
│
├─► Index & Search Source Code
│   ├─► Token optimization (71.5×) → graphify
│   ├─► Code review, impact analysis → code-review-graph
│   ├─► Zero-server, WASM → gitnexus
│   ├─► Speed + auto-sync, MIT → codegraph
│   ├─► Most languages, zero-dependency → codebase-memory-mcp
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

**Conclusion:** To index and search a project's source code, use **graphify** (best for token reduction), **code-review-graph** (for review), **gitnexus** (for enterprise, accepting its noncommercial license), **codegraph** (fastest, auto-sync, pure MIT), **codebase-memory-mcp** (most languages, zero-dependency), or **repowise** (if you need git analytics/code health/decisions and not just a graph).

---

## September 2026 Update — 3 New Tools (repowise, codegraph, codebase-memory-mcp)

These three tools were not in the original comparison table (04/2026) because they appeared or became popular afterward. See each tool's details: [Repowise](/Technology/AI/Tools/Memory/Repowise), [CodeGraph](/Technology/AI/Tools/Memory/CodeGraph), [Codebase Memory MCP](/Technology/AI/Tools/Memory/Codebase Memory MCP).

| Tool                    | Core language | Languages parsed | MCP tools                      | License             | Differentiator                                                             |
| ----------------------- | ------------- | ---------------- | ------------------------------ | ------------------- | -------------------------------------------------------------------------- |
| **repowise**            | Python        | 26               | 10 (task-shaped)               | AGPL-3.0/commercial | Graph + git analytics + code health + ADR mining, PR bot                   |
| **codegraph**           | Rust kernel   | 20               | focused on `codegraph_explore` | MIT                 | Fastest, auto-sync via OS file watcher, self-scales to the machine         |
| **codebase-memory-mcp** | Pure C        | 162              | 15                             | MIT                 | Zero-dependency (single binary), Hybrid LSP, makes no network calls itself |

**A note on trustworthiness**: all three (and gitnexus as well) are very young (created 08/2025–03/2026) yet have reached 6.7k–71.5k GitHub stars — the ratio of watchers/followers to stars is lower than typical for long-established popular repos. This is not evidence of fraud, but you should verify further (commit history, community discussion) and avoid piping `curl | bash`/`curl | sh` straight into a shell where possible, before fully trusting the self-published benchmark numbers/badges in a README.

_Updated: 2026-04-13, supplemented 2026-09-20_

> **See also:** [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison) · [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [Graphify](/Technology/AI/Tools/Memory/Graphify)
