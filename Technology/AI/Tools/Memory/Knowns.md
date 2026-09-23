---
area: technology
domain: knowns
type: tool
title: Knowns
description: Knowns is a local-first, self-hostable memory layer for AI-native development that gives AI assistants persistent project context across tasks, docs, memories, and code intelligence.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - knowns
  - memory
  - code-intelligence
resource: https://github.com/knowns-dev/knowns
---

# Knowns

## Definition

**Knowns** is a "memory layer" for AI-native software development. It gives AI a persistent understanding of the project. Instead of starting from zero every session, the AI works with structured, persistent project context. Knowns connects specs, tasks, documentation, decisions, and team knowledge into one unified context layer.

- **Repository**: https://github.com/knowns-dev/knowns
- **Website**: https://knowns.sh
- **npm**: `knowns`
- **License**: MIT

## Key Metrics

- **154+ stars** | **26 forks**
- Rewritten in **Go 1.24.2** (v0.13+) with a backward-compatible CLI
- Supports **Windows, macOS, Linux**
- Self-hostable, local-first

## Core Capabilities

| Capability                    | Description                                                             |
| ----------------------------- | ----------------------------------------------------------------------- |
| **Persistent Project Memory** | Long-term understanding of the codebase and workflows                   |
| **Structured Knowledge**      | Connects specs, tasks, and docs into a unified context layer            |
| **Smart Context Delivery**    | Automatically provides relevant context, reducing noise and token usage |
| **AI-Native Workflow**        | Turns AI from a tool into an engineering collaborator                   |
| **Self-Hostable**             | Keeps knowledge private and fully under your control                    |

## What It Does

Knowns solves the problem that AI is **stateless**: every session you must re-explain the architecture, paste docs, and repeat conventions. Knowns provides:

- **Task Management** — Create and track tasks with acceptance criteria
- **Documentation** — Nested folders with markdown + mermaid support
- **Semantic Search** — Search by meaning with local AI models (offline)
- **Time Tracking** — Built-in timers and reports
- **Context Linking** — `@task-42` and `@doc/patterns/auth` references
- **Validation** — Check for broken refs with `knowns validate`
- **Template System** — Code generation with Handlebars (`.hbs`)
- **Import System** — Import docs/templates from git, npm, or local sources
- **Memory System** — 3-layer memory (project/working/global) for AI recall
- **AI Integration** — Full MCP server with AC/plan/notes operations
- **AI Workspaces** — Multi-phase agent orchestration with a live terminal
- **Code Intelligence** — AST indexing, code search, dependency graph
- **Web UI** — Kanban board, doc browser, mermaid diagrams
- **Knowledge Graph** — Visual graph of task, doc, memory, and code relationships

## What's New in v0.18.0

- **Workspace-aware browser mode** — run `knowns browser` outside a repo to scan for projects
- **AST code intelligence** — index Go, TS, JS, and Python symbols with `knowns code ingest`
- **Code graph support** — include indexed code nodes and dependency edges
- **Chat runtime upgrades** — stronger tool-output rendering, timeline/history navigation

## Installation

### Pre-built binaries

```bash
# Homebrew (macOS/Linux)
brew install knowns-dev/tap/knowns

# Shell installer (macOS/Linux)
curl -fsSL https://knowns.sh/script/install | sh

# PowerShell (Windows)
irm https://knowns.sh/script/install.ps1 | iex

# npm — installs platform-specific binary automatically
npm install -g knowns

# npx (no install)
npx knowns
```

### From source (Go 1.24.2+)

```bash
go install github.com/howznguyen/knowns/cmd/knowns@latest

# Or clone and build
git clone https://github.com/knowns-dev/knowns.git
cd knowns
make build        # Output: dist/knowns
make install      # Install to GOPATH/bin
```

### Get started

```bash
knowns init
knowns browser --open   # Start Web UI and open browser
```

## Quick Reference

```bash
# Tasks
knowns task create "Title" -d "Description" --ac "Criterion"
knowns task list --plain
knowns task <id> --plain
knowns task edit <id> -s in-progress -a @me
knowns task edit <id> --check-ac 1

# Documentation
knowns doc create "Title" -d "Description" -f "folder"
knowns doc "doc-name" --plain
knowns doc "doc-name" --smart --plain

# Templates
knowns template list
knowns template run <name> --name "X"
knowns template create <name>

# Imports
knowns import add <name> <source>
knowns import sync
knowns import list

# Time, Search & Validate
knowns time start <id> && knowns time stop
knowns search "query" --plain
knowns validate

# Code intelligence
knowns code ingest
knowns code search "oauth login" --neighbors 5
knowns code deps --type calls
knowns code symbols --kind function

# AI Guidelines
knowns agents --sync
knowns sync
```

## Claude Code Skills Workflow

Knowns provides skills (slash commands) for Claude Code:

| Skill                | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `/kn-init`           | Read project docs, understand context                      |
| `/kn-plan <id>`      | Take task, gather context, create plan (wait for approval) |
| `/kn-implement <id>` | Follow plan, check ACs, track progress                     |
| `/kn-commit`         | Commit with conventional format                            |
| `/kn-research`       | Search codebase, find patterns, explore before coding      |
| `/kn-spec`           | Create specification document for features (SDD)           |
| `/kn-go <spec>`      | Full pipeline from approved spec (no review gates)         |
| `/kn-verify`         | Run SDD verification and coverage report                   |
| `/kn-review`         | Multi-perspective code review (P1/P2/P3 severity)          |
| `/kn-doc`            | Create or update documentation                             |
| `/kn-extract`        | Extract reusable patterns into docs, templates, and memory |
| `/kn-template`       | List, run, or create code templates                        |
| `/kn-debug`          | Debug errors and failures with memory-backed triage        |

### Example Session

```
You: /kn-init
Claude: [Reads README, ARCHITECTURE, checks task backlog]
        "Project uses NestJS with CQRS pattern. 3 tasks in-progress..."

You: /kn-plan 42
Claude: [Takes task, reads refs, searches docs]
        "Task #42: Add user authentication
         ## Implementation Plan
         1. Review @doc/patterns/auth
         2. Create AuthModule with JWT strategy
         3. Add login/register endpoints
         4. Write unit tests
         Approve this plan?"

You: Yes

You: /kn-implement 42
Claude: [Follows plan, generates code, checks ACs]
        "✓ AC1: User can login - DONE
         ✓ AC2: JWT token returned - DONE
         ✓ AC3: Tests pass - DONE
         All acceptance criteria complete. Ready to commit?"

You: /kn-commit
Claude: [Creates conventional commit]
        "feat(auth): add JWT authentication
         - Add AuthModule with passport JWT strategy
         - Add login/register endpoints
         - Add unit tests (94% coverage)"
```

## Project Structure

```
cmd/knowns/          # CLI entry point
internal/
  cli/               # Cobra commands
  models/            # Domain models
  storage/           # File-based storage (.knowns/)
  server/            # HTTP server, SSE, WebSocket
    routes/          # REST API handlers
    workspace/       # Agent orchestrator, process manager, worktree
  mcp/               # MCP server (stdio)
  search/            # Semantic search (ONNX)
ui/                  # Embedded React UI (built assets)
tests/               # E2E tests
```

## Development Commands

```bash
make build              # Build binary → dist/knowns
make dev                # Build with race detector
make test               # Run unit tests
make test-e2e           # Run CLI + MCP E2E tests
make test-e2e-semantic  # E2E tests including semantic search
make lint               # Run golangci-lint
make cross-compile      # Build for all 6 platforms
make ui                 # Rebuild embedded Web UI (requires pnpm)
```

## Pros

| Pro                | Description                                 |
| ------------------ | ------------------------------------------- |
| Persistent context | AI does not lose knowledge between sessions |
| Local-first        | Self-hostable, no cloud dependency          |
| Multi-platform     | Windows, macOS, Linux                       |
| Rich CLI & Web UI  | Kanban, docs, graphs, search                |
| Code intelligence  | AST indexing, dependency graphs             |
| MCP integration    | Native support for Claude Desktop           |
| Agent workspaces   | Multi-phase AI agent orchestration          |

## Cons

| Con                      | Description                                  |
| ------------------------ | -------------------------------------------- |
| Under active development | APIs and schemas may change between releases |
| Go dependency            | Building from source requires Go 1.24.2+     |
| Learning curve           | Many commands and concepts to master         |

## When to Use

- Projects where the AI needs **persistent context** across many sessions
- Teams that want a **self-hosted** knowledge base for AI collaboration
- You need **task management** + **documentation** + **code intelligence** in a single tool
- You want to integrate AI agents into the workflow with **git worktree isolation** and a **live terminal**

## Links

- [GitHub Repository](https://github.com/knowns-dev/knowns)
- [npm Package](https://www.npmjs.com/package/knowns)
- [Website](https://knowns.sh)
- [Discord](https://discord.knowns.dev)

> **See also:** [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [Mem0](/Technology/AI/Tools/Memory/Mem0)
