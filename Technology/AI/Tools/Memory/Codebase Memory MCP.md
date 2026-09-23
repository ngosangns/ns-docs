---
area: technology
domain: codebase-memory-mcp
type: tool
title: Codebase Memory MCP
description: codebase-memory-mcp (DeusData/CBM) is a zero-dependency, pure C code intelligence MCP server that indexes 162 languages into a queryable knowledge graph.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - codebase-memory-mcp
  - memory
  - code-intelligence
resource: https://github.com/DeusData/codebase-memory-mcp
---

# Codebase Memory MCP

## Definition

**codebase-memory-mcp** (CBM) is the "zero-dependency, maximum-performance" entry among code-knowledge-graph tools: **a single static C binary** that needs no Node/Python runtime and vendors 162 tree-sitter grammars. It claims to fully index the Linux kernel (28M LOC, 75k files) in 3 minutes and to answer structural queries in under 1ms.

## Key Metrics

- **Stars**: ~43.9k (repo created 02/2026)
- **Forks**: ~3.6k
- **License**: MIT

## Installation & Quick Start

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

It is also available on npm, PyPI, Homebrew, Scoop, Winget, Chocolatey, AUR, and via `go install`. After installing, restart your coding agent and say "Index this project" — `install` automatically detects and configures 45 client surfaces.

> **Antivirus note**: The README states that Microsoft Defender may flag `Trojan:Script/Wacatac.B!ml` as a false positive (citing 61/62 clean engines on VirusTotal, the same false-positive family as `gh`, llama.cpp, and Godot). This is the author's own claim, so verify the checksum/VirusTotal result yourself before installing on a sensitive machine.

## 15 MCP Tools & Key Features

- **Architecture overview**: `get_architecture` returns languages, packages, entry points, routes, hotspots, boundaries, layers, and clusters in a single call.
- **Louvain community detection** to discover functional modules through call edges.
- **Git diff impact mapping**: `detect_changes` maps uncommitted changes to affected symbols, with risk classification.
- **Semantic search** (`semantic_query`): vector search across the whole graph using the Nomic `nomic-embed-code` embedding (768d int8) compiled into the binary — no API key, Ollama, or Docker needed; it combines 11 signals (TF-IDF, RRI, API/Type/Decorator signature, AST profile, data flow, Halstead-lite, MinHash, module proximity, graph diffusion).
- **BM25 full-text** via SQLite FTS5 with a camelCase/snake_case-aware tokenizer.
- **Cross-service linking**: HTTP route to call-site matching, gRPC/GraphQL/tRPC detection, and channel detection (Socket.IO, EventEmitter, pub-sub) across 8 languages.
- **Cross-repo**: `CROSS_*` edges link multiple repos in the same store, with a 3D multi-galaxy UI for cross-repo architecture.
- **Hybrid LSP**: reimplements the type-resolution logic of tsserver/pyright/gopls/rust-analyzer and others in pure C for 11 major languages (Python, TS/JS/JSX/TSX, PHP, C#, Go, C, C++, Java, Kotlin, Rust, Perl) — it does not run real language servers.
- **Infrastructure-as-code indexing**: Dockerfiles, Kubernetes manifests, and Kustomize overlays become graph nodes.
- **Built-in 3D graph visualization UI** at `localhost:9749`.

## Operating Architecture

- **Session coordination daemon**: multiple clients (Claude Code, Codex, OpenCode, ...) share one background daemon per user account, which shuts down when the last session closes; an admission barrier prevents two CBM processes of different versions from running over each other.
- **No internal LLM**: it is a purely graph-based "structural analysis backend" that relies entirely on the agent (the MCP client) as the natural-language-to-graph-query translation layer, so CBM needs no API key of its own.
- **Team-shared graph artifact**: `.codebase-memory/graph.db.zst` (SQLite compressed with zstd at 8-13:1) can be committed to the repo so teammates skip reindexing — with a warning that committing every time bloats git history (a real-world example is ~6GB over 350 commits when committing on every watcher write).
- It makes no network calls of its own ("cbm makes no network request of its own accord") — updates must be run manually via the install script, and it never phones home.

## Pros

| Pro                             | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| Zero dependency                 | One static binary; no Node/Python/Docker needed                       |
| Most languages in its category  | 162 tree-sitter languages plus Hybrid LSP for 11 major languages      |
| MIT, no automatic network calls | Suitable for air-gapped or sensitive environments                     |
| Team-shared artifact            | Teammates skip reindexing via a compressed file committed to the repo |

## Cons

| Con                                        | Description                                                                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Installs via `curl \| bash`                | The usual supply-chain risk; inspect the script or use npm/pip instead of piping directly                                              |
| Self-declared trust badges                 | VirusTotal/SLSA-3/OpenSSF Scorecard/arXiv preprint are all claimed by the project itself, with no independent third-party verification |
| Very young repo with very fast star growth | Created 02/2026 and already ~43.9k stars — do your own checks (commit history, community discussion) before trusting it fully          |
| Team-shared artifact easily bloats git     | Pick a sensible commit cadence and avoid committing on every watcher write                                                             |

## When to Use

- You need the widest language support and don't want to install any runtime beyond a single binary.
- You work in a network-restricted or air-gapped environment and need a "no automatic network calls" guarantee.
- You want to share an already-indexed graph with the whole team through git instead of everyone reindexing.

---

**References**:

- [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)
- [Documentation](https://deusdata.github.io/codebase-memory-mcp/)
- Preprint: _Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP_ (arXiv:2603.27277)

> **See also:** [GitNexus](/Technology/AI/Tools/Memory/GitNexus) · [Graphify](/Technology/AI/Tools/Memory/Graphify) · [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison)
