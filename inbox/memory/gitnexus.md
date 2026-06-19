---
type: Note
title: Gitnexus
description: GitNexus - Zero-Server Code Intelligence Engine
timestamp: '2026-06-19T13:43:26.088Z'
tags:
  - inbox
resource: https://github.com/abhigyanpatwari/gitnexus.git
---
# GitNexus - Zero-Server Code Intelligence Engine

## Định nghĩa

**GitNexus** là "Zero-Server Code Intelligence Engine" — một client-side knowledge graph creator indexes codebases thành interactive graphs với built-in Graph RAG Agent. Nó giúp AI agents understand code relationships, dependencies, và execution flows.

## Key Metrics

- **Stars**: 26.8k
- **Forks**: 3k
- **License**: PolyForm Noncommercial

## Hai Cách Sử Dụng

| Feature | CLI + MCP | Web UI |
|---------|-----------|--------|
| What | Index repos locally, connect AI agents via MCP | Visual graph explorer + AI chat in browser |
| Install | `npm install -g gitnexus` | No install — gitnexus.vercel.app |
| Storage | LadybugDB native (fast, persistent) | LadybugDB WASM (in-memory) |
| Privacy | Everything local, no network | Everything in-browser |

## Cài đặt

### CLI

```bash
npm install -g gitnexus
```

### Quick Start

```bash
npx gitnexus analyze
```

Single command này:
1. Indexes the codebase
2. Installs agent skills
3. Registers Claude Code hooks
4. Creates `AGENTS.md` / `CLAUDE.md` context files

### MCP Setup

```bash
gitnexus setup
```

Auto-detects editors và writes global MCP config. Run once.

## CLI Commands

| Command | Description |
|---------|-------------|
| `gitnexus setup` | Configure MCP for editors (one-time) |
| `gitnexus analyze [path]` | Index a repository |
| `gitnexus analyze --force` | Force full re-index |
| `gitnexus analyze --skills` | Generate repo-specific skill files |
| `gitnexus analyze --skip-embeddings` | Skip embeddings (faster) |
| `gitnexus mcp` | Start MCP server (stdio) |
| `gitnexus serve` | Start local HTTP server for web UI |
| `gitnexus list` | List all indexed repositories |
| `gitnexus status` | Show index status |
| `gitnexus clean` | Delete index for current repo |
| `gitnexus wiki [path]` | Generate repository wiki |
| `gitnexus group create <name>` | Create repository group |
| `gitnexus group add <name> <repo>` | Add repo to group |

## Editor Support

| Editor | MCP | Skills | Hooks |
|--------|-----|--------|-------|
| Claude Code | Yes | Yes | Yes (PreToolUse + PostToolUse) |
| Cursor | Yes | Yes | — |
| Codex | Yes | Yes | — |
| Windsurf | Yes | — | — |
| OpenCode | Yes | Yes | — |

## What AI Agents Get

### 16 MCP Tools

| Tool | Description |
|------|-------------|
| `list_repos` | List indexed repositories |
| `query` | Query knowledge graph |
| `context` | Get code context |
| `impact` | Analyze change impact |
| `detect_changes` | Detect file changes |
| `rename` | Preview rename refactoring |
| `cypher` | Run Cypher queries |
| `group_list` | List repository groups |
| `group_sync` | Sync group indices |
| `group_contracts` | Get group contracts |
| `group_query` | Query across group |
| `group_status` | Group status |

### MCP Resources

```
gitnexus://repos
gitnexus://repo/{name}/context
gitnexus://repo/{name}/clusters
gitnexus://repo/{name}/processes
gitnexus://repo/{name}/schema
```

### MCP Prompts

| Prompt | Description |
|--------|-------------|
| `detect_impact` | Pre-commit change analysis |
| `generate_map` | Architecture documentation with Mermaid diagrams |

### 4 Agent Skills

- **Exploring**: Code exploration
- **Debugging**: Debug assistance
- **Impact Analysis**: Change impact analysis
- **Refactoring**: Refactoring assistance

## The Problem GitNexus Solves

> "AI edits UserService.validate()... Doesn't know 47 functions depend on its return type... Breaking changes ship."

Traditional Graph RAG gives LLM raw graph edges và hopes it explores enough. GitNexus precomputes structure at index time — clustering, tracing, scoring — so tools return complete context in one call.

## Bridge Mode

```bash
gitnexus serve
```

Connects CLI và web UI — web UI auto-detects local server và can browse all CLI-indexed repos without re-uploading or re-indexing.

## Web UI

### Online
Truy cập **gitnexus.vercel.app** — No install needed.

### Local Development

```bash
git clone https://github.com/abhigyanpatwari/gitnexus.git
cd gitnexus/gitnexus-shared && npm install && npm run build
cd ../gitnexus-web && npm install
npm run dev
```

## Enterprise Features

- **PR Review**: Automated blast radius analysis on pull requests
- **Auto-updating Code Wiki**: Automatically generated documentation
- **Auto-reindexing**: Keep graphs up-to-date
- **Multi-repo support**: Manage multiple repositories
- **OCaml support**: Language support
- **Priority feature/language support**: Custom language priorities

### Upcoming

- Auto regression forensics
- End-to-end test generation

## Tech Stack

| Component | Technology |
|-----------|------------|
| Parser | Tree-sitter |
| Graph Storage | LadybugDB |
| Integration | MCP (Model Context Protocol) |
| UI | WebAssembly (WASM) |
| Architecture | Zero-server |

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| Zero-server | Không cần server, chạy trong browser |
| WASM-based | Fast, secure, client-side execution |
| High popularity | 26.8k stars, 3k forks |
| Enterprise ready | PR automation, multi-repo |
| Interactive UI | Web-based graph exploration |
| Smart tooling | Impact analysis, refactoring support |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| Noncommercial license | PolyForm Noncommercial - không dùng được cho mục đích thương mại |
| Browser-only | Có thể hạn chế với use cases cần CLI-focused workflows |
| LadybugDB | Cần học thêm về storage này |

## Sử dụng khi nào

- **Codebase understanding**: Hiểu code relationships và dependencies
- **AI agent enhancement**: Cung cấp architectural awareness cho AI
- **Interactive exploration**: Khám phá code qua web UI
- **Impact analysis**: Phân tích blast radius trước khi thay đổi
- **Enterprise workflows**: PR automation, code wiki
- **Multi-repo projects**: Với enterprise multi-repo support

---

**Tài liệu tham khảo**: 
- [abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus)
- [Web UI](https://gitnexus.vercel.app)
- [Enterprise](https://akonlabs.com)