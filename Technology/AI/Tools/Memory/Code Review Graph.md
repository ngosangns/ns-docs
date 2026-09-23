---
area: technology
domain: code-review-graph
type: tool
title: Code Review Graph
description: Code Review Graph is a local Tree-sitter knowledge graph for AI coding tools that cuts tokens on code reviews and provides blast-radius impact analysis, with a full install, CLI, and troubleshooting guide.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - code-review-graph
  - memory
  - code-intelligence
resource: https://github.com/tirth8205/code-review-graph
---

# Code Review Graph

## Definition

**Code Review Graph** is a local knowledge graph for AI coding tools (Claude Code, Cursor, etc.) that builds a persistent structural map of a codebase. It uses Tree-sitter to parse code into AST nodes and edges, letting AI assistants read only the relevant files instead of the entire codebase.

## Key Metrics

- **8.2× average token reduction** on reviews
- Up to **49× fewer tokens** on daily coding tasks
- **100% recall** on impact analysis
- **Under 2 seconds** for incremental updates

## Installation

```bash
pip install code-review-graph  # or: pipx install code-review-graph
code-review-graph install      # auto-detects and configures all supported platforms
code-review-graph build        # parse your codebase
```

Target specific platform:

```bash
code-review-graph install --platform codex   # configure only Codex
code-review-graph install --platform cursor  # configure only Cursor
code-review-graph install --platform claude-code  # configure only Claude Code
```

### Detailed Step-by-Step Installation Guide

#### Step 1: Check Prerequisites

```bash
# Check Python version
python3 --version  # Requires Python 3.10+

# Check pip
pip --version
```

#### Step 2: Install code-review-graph

```bash
# Basic
pip install code-review-graph

# Or with pipx (recommended)
pipx install code-review-graph
```

#### Step 3: Install Optional Dependencies

```bash
# Core (required)
pip install code-review-graph

# For embeddings (optional)
pip install code-review-graph[embeddings]

# For community detection (optional)
pip install code-review-graph[communities]

# For wiki generation (optional)
pip install code-review-graph[wiki]

# All dependencies
pip install code-review-graph[all]
```

**Details of each option:**

| Option              | Dependencies          | Use Case                           |
| ------------------- | --------------------- | ---------------------------------- |
| `embeddings`        | sentence-transformers | Semantic search                    |
| `google-embeddings` | google-generativeai   | Google Gemini embeddings           |
| `communities`       | igraph, leidenalg     | Community detection, visualization |
| `eval`              | matplotlib, numpy     | Benchmarks                         |
| `wiki`              | wiki, LLM             | Auto-generate markdown wiki        |
| `all`               | All of the above      | Full features                      |

#### Step 4: Auto-Install for AI Platforms

```bash
# Install for all platforms
code-review-graph install

# Or only for Claude Code
code-review-graph install --platform claude-code

# Or for Codex
code-review-graph install --platform codex

# Or for Cursor
code-review-graph install --platform cursor
```

#### Step 5: Verify Installation

```bash
# Check the CLI
code-review-graph --help

# Check the version
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

#### Step 6: Build the Graph for a Project

```bash
cd /path/to/your/project

# Build graph
code-review-graph build

# Or incremental update (faster)
code-review-graph update
```

### Directory Structure After Installation

```
project-root/
├── .code-review-graph/          # Graph database
│   ├── graph.db                 # SQLite database
│   ├── embeddings/              # Vector embeddings (if enabled)
│   └── config.json              # Configuration
├── .code-review-graphignore     # Exclude patterns
└── (other project files)
```

### Advanced Configuration

#### 1. Exclude Patterns

Create a `.code-review-graphignore` file in the root directory:

```bash
# Same syntax as .gitignore

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

# Test files (optional - you may want to keep them)
tests/**
*_test.py
*_spec.py

# Documentation
docs/
*.md
```

#### 2. Configuration in pyproject.toml

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

#### 3. Environment Variables

```bash
# Custom database path
export CRG_DB_PATH=/custom/path/graph.db

# Parallel workers
export CRG_WORKERS=8

# Log level
export CRG_LOG_LEVEL=DEBUG
```

### Troubleshooting

#### Error: "command not found"

```bash
# Add to PATH
export PATH="$PATH:$HOME/.local/bin"

# Or use the full path
~/.local/bin/code-review-graph --help
```

#### Error: Missing tree-sitter language

```bash
# Install all languages
code-review-graph install-languages

# Or install a specific language
code-review-graph install-languages --language python
```

#### Error: SQLite permission

```bash
# Check folder permissions
ls -la .code-review-graph/

# Recreate if needed
rm -rf .code-review-graph/
code-review-graph build
```

#### Error: Out of memory with a large repo

```bash
# Limit parallel workers
code-review-graph build --workers 2

# Exclude more folders
# Add them to .code-review-graphignore
```

#### Error: Embeddings failure

```bash
# Use basic mode (no embeddings)
code-review-graph build --no-embeddings

# Or install the right dependencies
pip install code-review-graph[embeddings]
```

## Detailed Usage

### Real-World Usage Scenarios

#### 1. Initialize a Graph for a New Project

```bash
# Step 1: Register the repository
code-review-graph register /path/to/project

# Step 2: Build the graph
code-review-graph build

# Step 3: Check status
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

#### 2. Code Review Before Committing

```bash
# View changes
code-review-graph detect-changes

# Or use a slash command in Claude Code
/code-review-graph:review-delta

# Or review a PR
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

#### 3. Search the Codebase

```bash
# Query graph
code-review-graph query "User authentication"

# Semantic search (if embeddings are enabled)
code-review-graph query "login flow" --semantic
```

#### 4. Incremental Updates

```bash
# Manual update
code-review-graph update

# Auto-watch mode
code-review-graph watch

# In Claude Code, edit a file → auto-update
```

#### 5. Generate Visualization

```bash
# Create interactive HTML
code-review-graph visualize

# Open in the browser
open .code-review-graph/visualization.html
```

#### 6. Generate Wiki

```bash
# Create markdown wiki
code-review-graph wiki

# Output goes to .code-review-graph/wiki/
```

#### 7. Cross-Repo Search

```bash
# Register multiple repos
code-review-graph register /repo/backend
code-review-graph register /repo/frontend

# Search across repos
code-review-graph query "auth implementation" --all-repos
```

### CLI Commands in Detail

#### build

```bash
# Fresh build (discards the old graph)
code-review-graph build

# Incremental (keeps the old graph)
code-review-graph build --update

# With custom workers
code-review-graph build --workers 8

# Without embeddings
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
# View statistics
code-review-graph status

# Verbose
code-review-graph status --verbose
```

#### detect-changes

```bash
# Detect changes
code-review-graph detect-changes

# With diff
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

### MCP Tools (Used in Claude Code)

| Tool                         | Description        | Example                      |
| ---------------------------- | ------------------ | ---------------------------- |
| `build_or_update_graph_tool` | Build/update graph | Automatic when changes occur |
| `get_impact_radius_tool`     | Get blast radius   | Trace the impact of a change |
| `get_review_context_tool`    | Review context     | Context for PR review        |
| `query_graph_tool`           | Query graph        | Find related code            |
| `semantic_search_nodes_tool` | Semantic search    | Natural language query       |
| `detect_changes_tool`        | Risk analysis      | Analyze git diff             |
| `generate_wiki_tool`         | Wiki generation    | Generate documentation       |
| `cross_repo_search_tool`     | Multi-repo         | Search across repos          |

### Best Practices

1. **Run the first build** for every new project

   ```bash
   code-review-graph build
   ```

2. **Use watch mode** during active development

   ```bash
   code-review-graph watch
   ```

3. **Review before every commit**

   ```bash
   code-review-graph detect-changes
   ```

4. **Exclude generated files** in `.code-review-graphignore`

5. **Commit `.code-review-graph/`** to share with the team (if the repo is small)

6. **Use embeddings** for better semantic search
   ```bash
   pip install code-review-graph[embeddings]
   code-review-graph build --embeddings
   ```

### Comparison with Graphify

| Feature             | graphify           | code-review-graph |
| ------------------- | ------------------ | ----------------- |
| Token reduction     | 71.5×              | 8.2×              |
| AST parsing         | ✅ tree-sitter     | ✅ tree-sitter    |
| Semantic extraction | ✅ Claude          | ❌ Optional       |
| Languages           | 23                 | 19+jupyter        |
| MCP                 | ✅                 | ✅ (22 tools)     |
| Visualization       | ✅                 | ✅ D3.js          |
| Wiki generation     | ✅                 | ✅                |
| Speed               | Slow               | Fast (<2s)        |
| Use case            | Deep understanding | Code review       |

## How It Works

```
Repository → AST (Tree-sitter) → Graph (nodes/edges) → MCP Query → AI Context
```

1. **Parse**: Repository parsed into AST with Tree-sitter
2. **Store**: Graph of nodes (functions, classes, imports) and edges (calls, inheritance, test coverage)
3. **Query**: At review time, compute minimal set of files needed

## Benchmarks

### Token Efficiency

| Repo        | Avg Naive Tokens | Avg Graph Tokens | Reduction |
| ----------- | ---------------: | ---------------: | --------: |
| express     |              693 |              983 |      0.7x |
| fastapi     |            4,944 |              614 |      8.1x |
| flask       |           44,751 |            4,252 |      9.1x |
| gin         |           21,972 |            1,153 |     16.4x |
| httpx       |           12,044 |            1,728 |      6.9x |
| nextjs      |            9,882 |            1,249 |      8.0x |
| **Average** |                  |                  |  **8.2x** |

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

| Command                           | Description                      |
| --------------------------------- | -------------------------------- |
| `/code-review-graph:build-graph`  | Build or rebuild the code graph  |
| `/code-review-graph:review-delta` | Review changes since last commit |
| `/code-review-graph:review-pr`    | Full PR review with blast-radius |

## CLI Reference

```bash
code-review-graph install              # Auto-detect and configure all platforms
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

| Tool                         | Description                |
| ---------------------------- | -------------------------- |
| `build_or_update_graph_tool` | Build/update graph         |
| `get_impact_radius_tool`     | Get blast radius           |
| `get_review_context_tool`    | Get review context         |
| `query_graph_tool`           | Query graph                |
| `semantic_search_nodes_tool` | Semantic search            |
| `embed_graph_tool`           | Generate embeddings        |
| `detect_changes_tool`        | Detect and analyze changes |
| `refactor_tool`              | Refactoring assistance     |
| `generate_wiki_tool`         | Generate wiki              |
| `cross_repo_search_tool`     | Search across repos        |

## Configuration

### Exclude Paths

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

## Pros

| Pro                      | Description                         |
| ------------------------ | ----------------------------------- |
| Massive token reduction  | 8.2× on reviews, 49× on daily tasks |
| Fast incremental updates | Under 2 seconds                     |
| 100% recall              | Impact analysis accuracy            |
| Multi-platform           | 8 AI editors supported              |
| Architecture mapping     | Community detection                 |
| Risk scoring             | Prioritized reviews                 |

## Cons

| Con                    | Description                           |
| ---------------------- | ------------------------------------- |
| Python 3.10+           | Requirement may be limiting           |
| No semantic extraction | Structural only, not semantic         |
| Optional vectors       | Needs extra setup for semantic search |

## When to Use

- **Large codebases**: When reading the entire codebase is not feasible
- **Code reviews**: Impact analysis before merging
- **Token optimization**: Reduce context window usage
- **Architecture understanding**: Community detection, module structure
- **Risk assessment**: Prioritize code reviews
- **Daily coding**: Continuous context with minimal tokens

---

**References**:

- [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)
- [Website](https://code-review-graph.com)
- [Discord](https://discord.gg/3p58KXqGFN)

> **See also:** [Graphify](/Technology/AI/Tools/Memory/Graphify) · [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison) · [CodeGraph](/Technology/AI/Tools/Memory/CodeGraph)
