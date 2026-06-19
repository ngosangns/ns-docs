---
type: Note
title: Code Review Graph
description: Code Review Graph - Local Knowledge Graph for AI Coding Tools
timestamp: '2026-06-19T13:43:26.087Z'
tags:
  - inbox
resource: https://github.com/tirth8205/code-review-graph
---
# Code Review Graph - Local Knowledge Graph for AI Coding Tools

## Định nghĩa

**Code Review Graph** là một local knowledge graph cho AI coding tools (Claude Code, Cursor, etc.) xây dựng persistent structural map của codebase. Sử dụng Tree-sitter để parse code thành AST nodes và edges, cho phép AI assistants chỉ đọc relevant files thay vì toàn bộ codebase.

## Key Metrics

- **8.2× average token reduction** on reviews
- Up to **49× fewer tokens** on daily coding tasks
- **100% recall** on impact analysis
- **Under 2 seconds** for incremental updates

## Cài đặt

```bash
pip install code-review-graph  # hoặc: pipx install code-review-graph
code-review-graph install      # auto-detects và configures all supported platforms
code-review-graph build        # parse your codebase
```

Target specific platform:
```bash
code-review-graph install --platform codex   # configure only Codex
code-review-graph install --platform cursor  # configure only Cursor
code-review-graph install --platform claude-code  # configure only Claude Code
```

### Hướng dẫn cài đặt chi tiết từng bước

#### Bước 1: Kiểm tra Prerequisites

```bash
# Kiểm tra Python version
python3 --version  # Cần Python 3.10+

# Kiểm tra pip
pip --version
```

#### Bước 2: Cài đặt code-review-graph

```bash
# Cơ bản
pip install code-review-graph

# Hoặc với pipx (recommended)
pipx install code-review-graph
```

#### Bước 3: Cài đặt dependencies tùy chọn

```bash
# Core (bắt buộc)
pip install code-review-graph

# Cho embeddings (optional)
pip install code-review-graph[embeddings]

# Cho community detection (optional)
pip install code-review-graph[communities]

# Cho wiki generation (optional)
pip install code-review-graph[wiki]

# Tất cả dependencies
pip install code-review-graph[all]
```

**Chi tiết từng option:**

| Option | Dependencies | Use Case |
|--------|-------------|----------|
| `embeddings` | sentence-transformers | Semantic search |
| `google-embeddings` | google-generativeai | Google Gemini embeddings |
| `communities` | igraph, leidenalg | Community detection, visualization |
| `eval` | matplotlib, numpy | Benchmarks |
| `wiki` | wiki, LLM | Auto-generate markdown wiki |
| `all` | Tất cả trên | Full features |

#### Bước 4: Auto-install cho AI platforms

```bash
# Install cho tất cả platforms
code-review-graph install

# Hoặc chỉ cho Claude Code
code-review-graph install --platform claude-code

# Hoặc cho Codex
code-review-graph install --platform codex

# Hoặc cho Cursor
code-review-graph install --platform cursor
```

#### Bước 5: Verify installation

```bash
# Kiểm tra CLI
code-review-graph --help

# Kiểm tra version
code-review-graph --version
```

Output:
```
usage: code-review-graph [-h] [--version] {install,build,update,status,watch,visualize,wiki,detect-changes,register,unregister,repos,eval,serve} ...

positional arguments:
  {install,build,update,status,watch,visualize,wiki,detect-changes,register,unregister,repos,eval,serve}
    install               Install and configure for AI platforms
    build                 Build knowledge graph
    update                Incremental update
    status                Show graph statistics
    watch                 Watch mode for continuous updates
    visualize             Generate interactive visualization
    wiki                  Generate markdown wiki
    detect-changes        Analyze changes with risk scoring
    register              Register a repository
    unregister            Unregister a repository
    repos                 List registered repositories
    eval                  Run evaluation benchmarks
    serve                 Start MCP server
```

#### Bước 6: Build graph cho project

```bash
cd /path/to/your/project

# Build graph
code-review-graph build

# Hoặc incremental update (nhanh hơn)
code-review-graph update
```

### Cấu trúc thư mục sau khi cài đặt

```
project-root/
├── .code-review-graph/          # Graph database
│   ├── graph.db                 # SQLite database
│   ├── embeddings/              # Vector embeddings (nếu có)
│   └── config.json              # Configuration
├── .code-review-graphignore     # Exclude patterns
└── (các files khác của project)
```

### Cấu hình nâng cao

#### 1. Exclude patterns

Tạo file `.code-review-graphignore` trong thư mục gốc:

```bash
# Syntax giống .gitignore

# Generated files
generated/**
*.generated.ts
*.generated.js

# Dependencies
node_modules/
vendor/
.venv/
venv/

# Build outputs
dist/
build/
target/

# Test files (optional - có thể muốn giữ lại)
tests/**
*_test.py
*_spec.py

# Documentation
docs/
*.md
```

#### 2. Cấu hình trong pyproject.toml

```toml
[tool.code-review-graph]
# Languages to parse
languages = ["python", "typescript", "javascript"]

# Exclude patterns (override .code-review-graphignore)
exclude = ["node_modules/**", "dist/**"]

# Include patterns
include = ["src/**", "lib/**"]

# Watch mode settings
watch = { debounce = 1.0 }

# Embeddings
embeddings = { provider = "sentence-transformers", model = "all-MiniLM-L6-v2" }
```

#### 3. Environment variables

```bash
# Custom database path
export CRG_DB_PATH=/custom/path/graph.db

# Parallel workers
export CRG_WORKERS=8

# Log level
export CRG_LOG_LEVEL=DEBUG
```

### Troubleshooting

#### Lỗi: "command not found"

```bash
# Thêm vào PATH
export PATH="$PATH:$HOME/.local/bin"

# Hoặc sử dụng full path
~/.local/bin/code-review-graph --help
```

#### Lỗi: Missing tree-sitter language

```bash
# Cài đặt tất cả languages
code-review-graph install-languages

# Hoặc cài đặt language cụ thể
code-review-graph install-languages --language python
```

#### Lỗi: SQLite permission

```bash
# Check folder permissions
ls -la .code-review-graph/

# Recreate nếu cần
rm -rf .code-review-graph/
code-review-graph build
```

#### Lỗi: Out of memory với large repo

```bash
# Giới hạn parallel workers
code-review-graph build --workers 2

# Exclude more folders
# Thêm vào .code-review-graphignore
```

#### Lỗi: Embeddings failure

```bash
# Sử dụng basic mode (không embeddings)
code-review-graph build --no-embeddings

# Hoặc cài đặt đúng dependencies
pip install code-review-graph[embeddings]
```

## Sử dụng chi tiết

### Các kịch bản sử dụng thực tế

#### 1. Khởi tạo graph cho project mới

```bash
# Bước 1: Register repository
code-review-graph register /path/to/project

# Bước 2: Build graph
code-review-graph build

# Bước 3: Check status
code-review-graph status
```

Output:
```
Repository: my-project
Language: Python
Files: 234
Nodes: 1,523
Edges: 4,891
Last updated: 2026-04-13 10:30:00
```

#### 2. Code review trước khi commit

```bash
# Xem thay đổi
code-review-graph detect-changes

# Hoặc sử dụng slash command trong Claude Code
/code-review-graph:review-delta

# Hoặc review một PR
/code-review-graph:review-pr
```

Output:
```
Blast Radius: HIGH (affects 12 files)
Files affected:
  - src/auth/login.py (modified)
  - src/auth/validator.py (modified)
  - tests/test_auth.py (test)
  - src/api/middleware.py (dependency)

Risk Score: 7/10
Recommendations:
  - Test authentication flows
  - Check JWT token generation
  - Verify middleware integration
```

#### 3. Tìm kiếm trong codebase

```bash
# Query graph
code-review-graph query "User authentication"

# Semantic search (nếu có embeddings)
code-review-graph query "login flow" --semantic
```

#### 4. Incremental updates

```bash
# Manual update
code-review-graph update

# Auto-watch mode
code-review-graph watch

# Trong Claude Code, edit file → auto-update
```

#### 5. Generate visualization

```bash
# Tạo interactive HTML
code-review-graph visualize

# Mở trong browser
open .code-review-graph/visualization.html
```

#### 6. Generate wiki

```bash
# Tạo markdown wiki
code-review-graph wiki

# Output trong .code-review-graph/wiki/
```

#### 7. Cross-repo search

```bash
# Register multiple repos
code-review-graph register /repo/backend
code-review-graph register /repo/frontend

# Search across repos
code-review-graph query "auth implementation" --all-repos
```

### CLI Commands chi tiết

#### build
```bash
# Build mới (xóa graph cũ)
code-review-graph build

# Incremental (giữ graph cũ)
code-review-graph build --update

# Với custom workers
code-review-graph build --workers 8

# Không embeddings
code-review-graph build --no-embeddings
```

#### update
```bash
# Incremental update
code-review-graph update

# Update specific files
code-review-graph update src/auth/
```

#### status
```bash
# Xem statistics
code-review-graph status

# Verbose
code-review-graph status --verbose
```

#### detect-changes
```bash
# Detect changes
code-review-graph detect-changes

# Với diff
code-review-graph detect-changes --diff

# Since specific commit
code-review-graph detect-changes --since HEAD~5
```

#### register/unregister
```bash
# Register repo
code-review-graph register /path/to/project

# List repos
code-review-graph repos

# Unregister
code-review-graph unregister <repo-id>
```

### MCP Tools (sử dụng trong Claude Code)

| Tool | Description | Example |
|------|-------------|---------|
| `build_or_update_graph_tool` | Build/update graph | Tự động khi có changes |
| `get_impact_radius_tool` | Get blast radius | Trace impact của change |
| `get_review_context_tool` | Review context | Context cho PR review |
| `query_graph_tool` | Query graph | Tìm related code |
| `semantic_search_nodes_tool` | Semantic search | Natural language query |
| `detect_changes_tool` | Risk analysis | Analyze git diff |
| `generate_wiki_tool` | Wiki generation | Tạo documentation |
| `cross_repo_search_tool` | Multi-repo | Search across repos |

### Best Practices

1. **Chạy build lần đầu** cho mọi project mới
   ```bash
   code-review-graph build
   ```

2. **Sử dụng watch mode** cho active development
   ```bash
   code-review-graph watch
   ```

3. **Review trước mỗi commit**
   ```bash
   code-review-graph detect-changes
   ```

4. **Exclude generated files** trong `.code-review-graphignore`

5. **Commit `.code-review-graph/`** để share với team (nếu repo nhỏ)

6. **Sử dụng embeddings** cho semantic search tốt hơn
   ```bash
   pip install code-review-graph[embeddings]
   code-review-graph build --embeddings
   ```

### So sánh với Graphify

| Feature | graphify | code-review-graph |
|---------|----------|-------------------|
| Token reduction | 71.5× | 8.2× |
| AST parsing | ✅ tree-sitter | ✅ tree-sitter |
| Semantic extraction | ✅ Claude | ❌ Optional |
| Languages | 23 | 19+jupyter |
| MCP | ✅ | ✅ (22 tools) |
| Visualization | ✅ | ✅ D3.js |
| Wiki generation | ✅ | ✅ |
| Speed | Slow | Fast (<2s) |
| Use case | Deep understanding | Code review |

## How It Works

```
Repository → AST (Tree-sitter) → Graph (nodes/edges) → MCP Query → AI Context
```

1. **Parse**: Repository parsed into AST with Tree-sitter
2. **Store**: Graph of nodes (functions, classes, imports) and edges (calls, inheritance, test coverage)
3. **Query**: At review time, compute minimal set of files needed

## Benchmarks

### Token Efficiency

| Repo | Avg Naive Tokens | Avg Graph Tokens | Reduction |
|------|-----------------:|-----------------:|----------:|
| express | 693 | 983 | 0.7x |
| fastapi | 4,944 | 614 | 8.1x |
| flask | 44,751 | 4,252 | 9.1x |
| gin | 21,972 | 1,153 | 16.4x |
| httpx | 12,044 | 1,728 | 6.9x |
| nextjs | 9,882 | 1,249 | 8.0x |
| **Average** | | | **8.2x** |

### Impact Accuracy

- Average F1: 0.54
- Precision: 0.38
- Recall: 1.0 (100% - never misses affected files)

### Performance

- Search latency: 0.4ms - 1.5ms
- Flow detection: 95-128ms

## Features

### Core Features
- **Blast-radius analysis**: Trace every caller, dependent, test affected by change
- **Incremental updates**: Re-parses only changed files, updates in under 2 seconds
- **19 languages + Jupyter notebooks**: Python, TypeScript/TSX, JavaScript, Vue, Go, Rust, Java, Scala, C#, Ruby, Kotlin, Swift, PHP, Solidity, C/C++, Dart, R, Perl, Lua, Jupyter

### Advanced Features
- **Monorepo support**: Large repos - 27,700+ files excluded, only ~15 actually read
- **Auto-update hooks**: Graph updates on every file edit and git commit
- **Semantic search**: Optional vector embeddings via sentence-transformers, Google Gemini, MiniMax
- **Interactive visualization**: D3.js force-directed graph with edge-type toggles
- **Local storage**: SQLite in `.code-review-graph/`
- **Watch mode**: Continuous graph updates
- **Execution flows**: Trace call chains from entry points
- **Community detection**: Cluster related code via Leiden algorithm
- **Architecture overview**: Auto-generated architecture map
- **Risk-scored reviews**: `detect_changes` maps diffs to affected functions
- **Refactoring tools**: Rename preview, dead code detection
- **Wiki generation**: Auto-generate markdown wiki from communities
- **Multi-repo registry**: Register and search across multiple repos

## Slash Commands

| Command | Description |
|---------|-------------|
| `/code-review-graph:build-graph` | Build or rebuild the code graph |
| `/code-review-graph:review-delta` | Review changes since last commit |
| `/code-review-graph:review-pr` | Full PR review with blast-radius |

## CLI Reference

```bash
code-review-graph install              # Auto-detect và configure all platforms
code-review-graph install --platform <name>  # Target specific platform
code-review-graph build                # Parse entire codebase
code-review-graph update               # Incremental update
code-review-graph status               # Graph statistics
code-review-graph watch                # Auto-update on file changes
code-review-graph visualize           # Generate interactive HTML
code-review-graph wiki                 # Generate markdown wiki
code-review-graph detect-changes       # Risk-scored impact analysis
code-review-graph register <path>       # Register repo
code-review-graph unregister <id>      # Remove repo
code-review-graph repos                # List registered repos
code-review-graph eval                 # Run benchmarks
code-review-graph serve                # Start MCP server
```

## MCP Tools (22 total)

| Tool | Description |
|------|-------------|
| `build_or_update_graph_tool` | Build/update graph |
| `get_impact_radius_tool` | Get blast radius |
| `get_review_context_tool` | Get review context |
| `query_graph_tool` | Query graph |
| `semantic_search_nodes_tool` | Semantic search |
| `embed_graph_tool` | Generate embeddings |
| `detect_changes_tool` | Detect and analyze changes |
| `refactor_tool` | Refactoring assistance |
| `generate_wiki_tool` | Generate wiki |
| `cross_repo_search_tool` | Search across repos |

## Configuration

### Exclude paths

Create `.code-review-graphignore`:

```
generated/**
*.generated.ts
vendor/**
node_modules/**
```

### Optional Dependencies

```bash
pip install code-review-graph[embeddings]       # sentence-transformers
pip install code-review-graph[google-embeddings] # Google Gemini
pip install code-review-graph[communities]      # igraph
pip install code-review-graph[eval]              # matplotlib
pip install code-review-graph[wiki]              # wiki + LLM summaries
pip install code-review-graph[all]               # All dependencies
```

## Supported Platforms

Codex, Claude Code, Cursor, Windsurf, Zed, Continue, OpenCode, Antigravity

## License

MIT

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| Massive token reduction | 8.2× on reviews, 49× on daily tasks |
| Fast incremental updates | Dưới 2 giây |
| 100% recall | Impact analysis accuracy |
| Multi-platform | 8 AI editors supported |
| Architecture mapping | Community detection |
| Risk scoring | Prioritized reviews |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| Python 3.10+ | Requirement có thể hạn chế |
| Không semantic extraction | Chỉ structural, không phải semantic |
| Optional vectors | Cần extra setup cho semantic search |

## Sử dụng khi nào

- **Large codebases**: Khi reading entire codebase không khả thi
- **Code reviews**: Impact analysis trước khi merge
- **Token optimization**: Giảm context window usage
- **Architecture understanding**: Community detection, module structure
- **Risk assessment**: Prioritize code reviews
- **Daily coding**: Continuous context với minimal tokens

---

**Tài liệu tham khảo**: 
- [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)
- [Website](https://code-review-graph.com)
- [Discord](https://discord.gg/3p58KXqGFN)