---
area: technology
domain: gitnexus
type: tool
title: GitNexus
description: GitNexus is a zero-server code intelligence engine that indexes codebases into knowledge graphs and exposes them to AI agents through a CLI, MCP tools, and a browser-based Web UI.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - gitnexus
  - memory
  - code-intelligence
resource: https://github.com/abhigyanpatwari/gitnexus.git
---

# GitNexus

## Definition

**GitNexus** is a "Zero-Server Code Intelligence Engine" — a client-side knowledge graph creator that indexes codebases into interactive graphs with a built-in Graph RAG Agent. It helps AI agents understand code relationships, dependencies, and execution flows.

## Key Metrics

- **Stars**: 26.8k
- **Forks**: 3k
- **License**: PolyForm Noncommercial

## Two Ways to Use It

| Feature | CLI + MCP                                      | Web UI                                     |
| ------- | ---------------------------------------------- | ------------------------------------------ |
| What    | Index repos locally, connect AI agents via MCP | Visual graph explorer + AI chat in browser |
| Install | `npm install -g gitnexus`                      | No install — gitnexus.vercel.app           |
| Storage | LadybugDB native (fast, persistent)            | LadybugDB WASM (in-memory)                 |
| Privacy | Everything local, no network                   | Everything in-browser                      |

## Installation

### CLI

```bash
npm install -g gitnexus
```

### Quick Start

```bash
npx gitnexus analyze
```

This single command:

1. Indexes the codebase
2. Installs agent skills
3. Registers Claude Code hooks
4. Creates `AGENTS.md` / `CLAUDE.md` context files

### MCP Setup

```bash
gitnexus setup
```

Auto-detects editors and writes the global MCP config. Run it once.

## CLI Commands

| Command                              | Description                          |
| ------------------------------------ | ------------------------------------ |
| `gitnexus setup`                     | Configure MCP for editors (one-time) |
| `gitnexus analyze [path]`            | Index a repository                   |
| `gitnexus analyze --force`           | Force full re-index                  |
| `gitnexus analyze --skills`          | Generate repo-specific skill files   |
| `gitnexus analyze --skip-embeddings` | Skip embeddings (faster)             |
| `gitnexus mcp`                       | Start MCP server (stdio)             |
| `gitnexus serve`                     | Start local HTTP server for web UI   |
| `gitnexus list`                      | List all indexed repositories        |
| `gitnexus status`                    | Show index status                    |
| `gitnexus clean`                     | Delete index for current repo        |
| `gitnexus wiki [path]`               | Generate repository wiki             |
| `gitnexus group create <name>`       | Create repository group              |
| `gitnexus group add <name> <repo>`   | Add repo to group                    |

## Editor Support

| Editor      | MCP | Skills | Hooks                          |
| ----------- | --- | ------ | ------------------------------ |
| Claude Code | Yes | Yes    | Yes (PreToolUse + PostToolUse) |
| Cursor      | Yes | Yes    | —                              |
| Codex       | Yes | Yes    | —                              |
| Windsurf    | Yes | —      | —                              |
| OpenCode    | Yes | Yes    | —                              |

## What AI Agents Get

### 16 MCP Tools

| Tool              | Description                |
| ----------------- | -------------------------- |
| `list_repos`      | List indexed repositories  |
| `query`           | Query knowledge graph      |
| `context`         | Get code context           |
| `impact`          | Analyze change impact      |
| `detect_changes`  | Detect file changes        |
| `rename`          | Preview rename refactoring |
| `cypher`          | Run Cypher queries         |
| `group_list`      | List repository groups     |
| `group_sync`      | Sync group indices         |
| `group_contracts` | Get group contracts        |
| `group_query`     | Query across group         |
| `group_status`    | Group status               |

### MCP Resources

```
gitnexus://repos
gitnexus://repo/{name}/context
gitnexus://repo/{name}/clusters
gitnexus://repo/{name}/processes
gitnexus://repo/{name}/schema
```

### MCP Prompts

| Prompt          | Description                                      |
| --------------- | ------------------------------------------------ |
| `detect_impact` | Pre-commit change analysis                       |
| `generate_map`  | Architecture documentation with Mermaid diagrams |

### 4 Agent Skills

- **Exploring**: Code exploration
- **Debugging**: Debug assistance
- **Impact Analysis**: Change impact analysis
- **Refactoring**: Refactoring assistance

## The Problem GitNexus Solves

> "AI edits UserService.validate()... Doesn't know 47 functions depend on its return type... Breaking changes ship."

Traditional Graph RAG hands the LLM raw graph edges and hopes it explores enough. GitNexus precomputes structure at index time — clustering, tracing, scoring — so tools return complete context in one call.

## Bridge Mode

```bash
gitnexus serve
```

Connects the CLI and the web UI — the web UI auto-detects the local server and can browse all CLI-indexed repos without re-uploading or re-indexing.

## Web UI

### Online

Visit **gitnexus.vercel.app** — no install needed.

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

| Component     | Technology                   |
| ------------- | ---------------------------- |
| Parser        | Tree-sitter                  |
| Graph Storage | LadybugDB                    |
| Integration   | MCP (Model Context Protocol) |
| UI            | WebAssembly (WASM)           |
| Architecture  | Zero-server                  |

## Pros

| Pro              | Description                           |
| ---------------- | ------------------------------------- |
| Zero-server      | No server needed; runs in the browser |
| WASM-based       | Fast, secure, client-side execution   |
| High popularity  | 26.8k stars, 3k forks                 |
| Enterprise ready | PR automation, multi-repo             |
| Interactive UI   | Web-based graph exploration           |
| Smart tooling    | Impact analysis, refactoring support  |

## Cons

| Con                   | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| Noncommercial license | PolyForm Noncommercial — cannot be used for commercial purposes |
| Browser-only          | May be limiting for use cases that need CLI-focused workflows   |
| LadybugDB             | You need to learn this storage engine                           |

## When to Use

- **Codebase understanding**: Understand code relationships and dependencies
- **AI agent enhancement**: Give AI agents architectural awareness
- **Interactive exploration**: Explore code through the web UI
- **Impact analysis**: Analyze the blast radius before making changes
- **Enterprise workflows**: PR automation, code wiki
- **Multi-repo projects**: With enterprise multi-repo support

---

**References**:

- [abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus)
- [Web UI](https://gitnexus.vercel.app)
- [Enterprise](https://akonlabs.com)

> **See also:** [Codebase Memory MCP](/Technology/AI/Tools/Memory/Codebase Memory MCP) · [Graphify](/Technology/AI/Tools/Memory/Graphify) · [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison)
