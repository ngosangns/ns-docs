# Knowns - The Memory Layer for AI-Native Development

## Định nghĩa

**Knowns** là "memory layer" cho AI-native software development — cung cấp khả năng hiểu project persistent cho AI. Thay vì bắt đầu từ zero mỗi session, AI làm việc với structured, persistent project context. Kết nối specs, tasks, documentation, decisions, và team knowledge vào một unified context layer.

- **Repository**: https://github.com/knowns-dev/knowns
- **Website**: https://knowns.sh
- **npm**: `knowns`
- **License**: MIT

## Key Metrics

- **154+ stars** | **26 forks**
- Rewritten in **Go 1.24.2** (v0.13+) với backward-compatible CLI
- Hỗ trợ **Windows, macOS, Linux**
- Self-hostable, local-first

## Core Capabilities

| Capability                    | Description                                                 |
| ----------------------------- | ----------------------------------------------------------- |
| **Persistent Project Memory** | Long-term understanding of codebase và workflows            |
| **Structured Knowledge**      | Kết nối specs, tasks, docs thành unified context layer      |
| **Smart Context Delivery**    | Auto-provide relevant context — reduce noise và token usage |
| **AI-Native Workflow**        | Transform AI từ tool thành engineering collaborator         |
| **Self-Hostable**             | Keep knowledge private, fully under control                 |

## What It Does

Knowns giải quyết vấn đề AI là **stateless** — mỗi session phải re-explain architecture, paste docs, repeat conventions. Knowns cung cấp:

- **Task Management** — Create, track tasks với acceptance criteria
- **Documentation** — Nested folders với markdown + mermaid support
- **Semantic Search** — Search by meaning với local AI models (offline)
- **Time Tracking** — Built-in timers và reports
- **Context Linking** — `@task-42` và `@doc/patterns/auth` references
- **Validation** — Check broken refs với `knowns validate`
- **Template System** — Code generation với Handlebars (`.hbs`)
- **Import System** — Import docs/templates từ git, npm, local
- **Memory System** — 3-layer memory (project/working/global) cho AI recall
- **AI Integration** — Full MCP Server với AC/plan/notes operations
- **AI Workspaces** — Multi-phase agent orchestration với live terminal
- **Code Intelligence** — AST indexing, code search, dependency graph
- **Web UI** — Kanban board, doc browser, mermaid diagrams
- **Knowledge Graph** — Visual graph của tasks, docs, memories, code relationships

## What's New in v0.18.0

- **Workspace-aware browser mode** — `knowns browser` outside a repo, scan for projects
- **AST code intelligence** — index Go, TS, JS, Python symbols với `knowns code ingest`
- **Code graph support** — include indexed code nodes và dependency edges
- **Chat runtime upgrades** — stronger tool-output rendering, timeline/history navigation

## Cài đặt

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

# Or clone và build
git clone https://github.com/knowns-dev/knowns.git
cd knowns
make build        # Output: dist/knowns
make install      # Install to GOPATH/bin
```

### Get started

```bash
knowns init
knowns browser --open   # Start Web UI và open browser
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

Knowns cung cấp skills (slash commands) cho Claude Code:

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

## ưu điểm

| Ưu điểm            | Mô tả                                   |
| ------------------ | --------------------------------------- |
| Persistent context | AI không mất kiến thức giữa các session |
| Local-first        | Self-hostable, không phụ thuộc cloud    |
| Multi-platform     | Windows, macOS, Linux                   |
| Rich CLI & Web UI  | Kanban, docs, graphs, search            |
| Code intelligence  | AST indexing, dependency graphs         |
| MCP integration    | Native support cho Claude Desktop       |
| Agent workspaces   | Multi-phase AI agent orchestration      |

## Nhược điểm

| Nhược điểm               | Mô tả                                        |
| ------------------------ | -------------------------------------------- |
| Under active development | APIs, schemas có thể change between releases |
| Go dependency            | Build from source cần Go 1.24.2+             |
| Learning curve           | Nhiều commands và concepts để master         |

## Sử dụng khi nào

- Dự án cần AI hiểu **persistent context** qua nhiều session
- Team muốn **self-hosted** knowledge base cho AI collaboration
- Cần **task management** + **documentation** + **code intelligence** trong một tool
- Muốn integrate AI agents vào workflow với **git worktree isolation** và **live terminal**

## Links

- [GitHub Repository](https://github.com/knowns-dev/knowns)
- [npm Package](https://www.npmjs.com/package/knowns)
- [Website](https://knowns.sh)
- [Discord](https://discord.knowns.dev)
