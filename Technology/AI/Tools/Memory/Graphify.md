---
area: technology
domain: graphify
type: tool
title: Graphify
description: Graphify is a Claude Code skill that turns codebases, docs, papers, images, and videos into queryable knowledge graphs, cutting token usage substantially compared with reading raw files.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - graphify
  - memory
  - code-intelligence
resource: https://claude.ai/code
---

# Graphify

## Definition

**Graphify** is a Claude Code skill that transforms codebases, documentation, papers, images, and videos into queryable knowledge graphs. Type `/graphify` in Claude Code, Codex, Cursor, or other AI editors — it reads the files, builds a knowledge graph, and returns structure you didn't know was there.

## Key Metrics

- **71.5× token reduction** per query vs reading raw files
- **8.2× average token reduction** on reviews
- Up to **49× fewer tokens** on daily coding tasks
- **100% recall** on impact analysis

## Installation

### Prerequisites

- Claude Code (https://claude.ai/code)
- Python 3.10+

### Standard Installation

```bash
pip install graphifyy && graphify install
```

> **Note:** The PyPI package is temporarily named `graphifyy` while the `graphify` name is being reclaimed.

After installation, open Claude Code and type:

```
/graphify .
```

### Manual Installation (curl)

```bash
mkdir -p ~/.claude/skills/graphify
curl -fsSL https://raw.githubusercontent.com/safishamsi/graphify/v1/skills/graphify/skill.md \
  > ~/.claude/skills/graphify/SKILL.md
```

Add to `~/.claude/CLAUDE.md`:

```
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.
```

### Detailed Step-by-Step Installation

#### Step 1: Install Python and pip

Check your Python version:

```bash
python3 --version  # Requires Python 3.10+
```

If it isn't installed, install it via Homebrew (macOS):

```bash
brew install python@3.11
```

#### Step 2: Install graphifyy from PyPI

```bash
# Install the package
pip install graphifyy

# Or use pipx to isolate the environment
pipx install graphifyy
```

#### Step 3: Install the skill into Claude Code

```bash
graphify install
```

This command will:

- Create the `~/.claude/skills/graphify/` directory
- Copy the skill file
- Add config to CLAUDE.md if needed

#### Step 4: Verify the installation

```bash
# Check the installation
graphify --help
```

Expected output:

```
usage: graphify [-h] [--version] {install,query,add,hook,serve} ...

positional arguments:
  {install,query,add,hook,serve}
    install              Install graphify skill for Claude Code
    query                Query existing graph
    add                  Add external content (papers, URLs)
    hook                 Install git hooks
    serve                Start MCP server

optional arguments:
  -h, --help            show this help message and output
  --version             show program version number
```

#### Step 5: Build your first graph

```bash
# In your project directory
cd /path/to/your/project

# Run graphify in Claude Code
/graphify .
```

### Advanced Configuration

#### Custom output directory

```bash
/graphify . --output ./my-graph-folder
```

#### Exclude patterns

Create a `.graphifyignore` file in the root directory:

```
node_modules/
.git/
__pycache__/
*.pyc
dist/
build/
.venv/
venv/
```

#### Environment variables

```bash
export GRAPHIFY_MODEL=claude-sonnet-4-20250514  # Default model
export GRAPHIFY_CACHE_DIR=~/.cache/graphify       # Cache location
export GRAPHIFY_MAX_WORKERS=4                     # Parallel processing
```

### Troubleshooting

#### Error: "command not found: graphify"

```bash
# Add to PATH
export PATH="$PATH:$HOME/.local/bin"

# Or reinstall
pip uninstall graphifyy -y
pip install graphifyy
```

#### Error: "No module named 'tree_sitter'"

```bash
pip install tree-sitter
```

#### Error: Permission denied during install

```bash
# Use pipx instead of pip
pipx install graphifyy

# Or sudo (not recommended)
sudo pip install graphifyy
```

#### Error: Claude doesn't recognize the skill

Add it manually to `~/.claude/CLAUDE.md`:

```markdown
# Graphify

- **graphify**: Use skill `graphify` when user wants to analyze code structure
- Location: ~/.claude/skills/graphify/SKILL.md
```

#### Slow on large codebases

```bash
# Run in shallow mode
/graphify . --mode shallow

# Or parse only specific folders
/graphify ./src
/graphify ./src --mode deep
```

## Detailed Usage

### Real-World Scenarios

#### 1. Understand a project's structure for the first time

```bash
# Step 1: Run graphify on the whole project
/graphify .

# Step 2: View graph.html in the browser
open graphify-out/graph.html

# Step 3: Query to understand the architecture
/graphify query "what is the main architecture pattern?"
/graphify query "how is data flow organized?"
```

#### 2. Find related code

```bash
# Find the path between 2 components
/graphify path "AuthService" "Database"

// Output: AuthService → AuthRepository → Database

# Explain a component
/graphify explain "UserController"
```

#### 3. Add external resources

```bash
# Add a paper
/graphify add https://arxiv.org/abs/1706.03762

# Add a blog post
/graphify add https://karpathy.ai/zero-to-hero/

# Add an image/diagram
/graphify add ./docs/architecture.png
```

#### 4. Continuous updates

```bash
# Auto-sync mode
/graphify . --watch

# Then edit files as usual
# The graph updates automatically
```

#### 5. Export for other tools

```bash
# Export for Neo4j
/graphify . --neo4j

# Export for Gephi
/graphify . --graphml

# Generate wiki
/graphify . --wiki
```

### Example Output

#### Query Result

```
/graphify query "authentication flow"

Answer:
Authentication in this codebase follows this flow:

1. UserController receives login request
2. Validates credentials via AuthService
3. AuthService checks against UserRepository
4. On success, generates JWT via JwtGenerator
5. Returns token to client

Key files:
- src/auth/controller.py (main entry)
- src/auth/service.py (business logic)
- src/auth/repository.py (data access)
- src/auth/jwt.py (token generation)
```

#### Graph Structure

```
graphify-out/
├── graph.json          # 5MB for medium repo
├── graph.html          # Interactive visualization
├── GRAPH_REPORT.md     # AI-generated insights
├── knowledge-base/           # Markdown workspace
├── wiki/               # Markdown wiki
└── cache/              # SHA256 cache
```

### Best Practices

1. **Run in shallow mode the first time** to test

   ```bash
   /graphify . --mode shallow
   ```

2. **Use --watch** during active development

   ```bash
   /graphify . --watch
   ```

3. **Exclude generated files** in `.graphifyignore`
4. **Commit graph.json** to share with the team
5. **Rebuild weekly** with `--update` to keep it fresh

## Basic Commands

| Command                       | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `/graphify`                   | Run on current directory                                 |
| `/graphify ./raw`             | Run on specific folder                                   |
| `/graphify ./raw --mode deep` | More aggressive INFERRED edge extraction                 |
| `/graphify ./raw --update`    | Re-extract only changed files, merge into existing graph |

## Query Commands

```
/graphify query "what connects attention to the optimizer?"
/graphify path "DigestAuth" "Response"
/graphify explain "SwinTransformer"
```

## Adding External Content

```
/graphify add https://arxiv.org/abs/1706.03762  # Fetch a paper
/graphify add https://x.com/karpathy/status/...  # Fetch a tweet
```

## Export Options

| Flag        | Description                     |
| ----------- | ------------------------------- |
| `--watch`   | Auto-sync graph as files change |
| `--wiki`    | Build agent-crawlable wiki      |
| `--svg`     | Export graph.svg                |
| `--graphml` | Export for Gephi, yEd           |
| `--neo4j`   | Generate cypher.txt for Neo4j   |
| `--mcp`     | Start MCP stdio server          |

## Automation

```
graphify hook install  # Post-commit git hook
```

## Supported File Types

| Type   | Extensions                                                  | Extraction Method                       |
| ------ | ----------------------------------------------------------- | --------------------------------------- |
| Code   | `.py .ts .js .go .rs .java .c .cpp .rb .cs .kt .scala .php` | AST via tree-sitter + call-graph        |
| Docs   | `.md .txt .rst`                                             | Concepts + relationships via Claude     |
| Papers | `.pdf`                                                      | Citation mining + concept extraction    |
| Images | `.png .jpg .webp .gif`                                      | Claude vision for screenshots, diagrams |

## How It Works

### 1. AST Pass (No LLM needed)

- Extract structure from code files
- Classes, functions, imports
- Call graphs, docstrings
- Uses tree-sitter

### 2. Transcription Pass

- Video/audio to text
- Runs locally with faster-whisper

### 3. Semantic Pass

- Claude subagents extract concepts
- Relationships
- Design rationale from docs, papers, images, transcripts

## Output Artifacts

The `graphify-out/` directory contains:

- **graph.html** – Interactive graph with clickable nodes, search, community filtering
- **knowledge-base/** – Open as a Markdown workspace
- **wiki/** – Wikipedia-style articles for agent navigation
- **GRAPH_REPORT.md** – God nodes, surprising connections, suggested questions
- **graph.json** – Persistent graph for querying weeks later
- **cache/** – SHA256 cache; re-runs only process changed files

## Core Features

### God nodes

Highest-degree concepts - what everything connects through

### Surprising connections

- Ranked by composite score
- Code-paper edges rank higher than code-code
- Includes plain-English explanations

### Suggested questions

4-5 questions the graph is uniquely positioned to answer

### Edge confidence

Every edge is tagged `EXTRACTED`, `INFERRED`, or `AMBIGUOUS`

## Advanced Features

### Auto-sync (--watch)

- Runs in background
- Code file saves trigger an instant rebuild (AST only)
- Doc/image changes notify you to run `--update`

### Git commit hook

Installs a post-commit hook that rebuilds the graph after every commit

### Wiki (--wiki)

Generates Wikipedia-style markdown articles per community and god node

## Worked Examples

| Corpus                               | Files | Reduction | Output                   |
| ------------------------------------ | ----- | --------- | ------------------------ |
| Karpathy repos + 5 papers + 4 images | 52    | **71.5x** | `worked/karpathy-repos/` |
| Graphify source + Transformer paper  | 4     | **5.4x**  | `worked/mixed-corpus/`   |
| httpx (synthetic Python library)     | 6     | ~1x       | `worked/httpx/`          |

## Tech Stack

- NetworkX + Leiden (graspologic)
- tree-sitter
- vis.js
- Claude for semantic extraction
- faster-whisper + yt-dlp for video/audio

## Pros

| Pro                     | Description                       |
| ----------------------- | --------------------------------- |
| Massive token reduction | Up to 71.5× fewer tokens          |
| Multimodal              | Handles code, docs, and media     |
| No Neo4j required       | Local storage; no graph DB needed |
| Persistent              | Query again weeks later           |
| Multiple exports        | Many format options               |
| Interactive UI          | Clickable graph visualization     |

## Cons

| Con                        | Description                            |
| -------------------------- | -------------------------------------- |
| LLM-dependent for semantic | Needs Claude/API for the semantic pass |
| Not real-time              | Batch processing                       |
| Graph storage              | JSON can get large on big codebases    |

## When to Use

- **Understanding codebases**: Quickly grasp a project's structure
- **Architecture decisions**: Find the "why" behind a design
- **Personal knowledge**: Manage it like Andrej Karpathy's /raw folder
- **Token optimization**: When you need to reduce token usage
- **Code review**: Impact analysis
- **Legacy code exploration**: Understand undocumented codebases

---

**References**:

- [safishamsi/graphify](https://github.com/safishamsi/graphify)
- [Examples](./worked)

> **See also:** [Codebase Memory MCP](/Technology/AI/Tools/Memory/Codebase Memory MCP) · [GitNexus](/Technology/AI/Tools/Memory/GitNexus) · [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison)
