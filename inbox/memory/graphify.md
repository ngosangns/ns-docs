# Graphify - AI Coding Assistant Skill for Codebase Understanding

## Định nghĩa

**Graphify** là một Claude Code skill biến đổi codebases, documentation, papers, images, và videos thành queryable knowledge graphs. Gõ `/graphify` trong Claude Code, Codex, Cursor, hoặc các AI editors khác — nó sẽ đọc files, build knowledge graph, và trả về structure bạn chưa từng biết.

## Key Metrics

- **71.5× token reduction** per query vs reading raw files
- **8.2× average token reduction** on reviews
- Up to **49× fewer tokens** on daily coding tasks
- **100% recall** on impact analysis

## Cài đặt

### Prerequisites
- Claude Code (https://claude.ai/code)
- Python 3.10+

### Standard Installation

```bash
pip install graphifyy && graphify install
```

> **Note:** PyPI package tạm thời named `graphifyy` trong khi `graphify` name đang được reclaim.

Sau installation, open Claude Code và type:
```
/graphify .
```

### Manual Installation (curl)

```bash
mkdir -p ~/.claude/skills/graphify
curl -fsSL https://raw.githubusercontent.com/safishamsi/graphify/v1/skills/graphify/skill.md \
  > ~/.claude/skills/graphify/SKILL.md
```

Thêm vào `~/.claude/CLAUDE.md`:
```
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.
```

### Hướng dẫn cài đặt chi tiết từng bước

#### Bước 1: Cài đặt Python và pip

Kiểm tra phiên bản Python:
```bash
python3 --version  # Cần Python 3.10+
```

Nếu chưa có, cài đặt qua Homebrew (macOS):
```bash
brew install python@3.11
```

#### Bước 2: Cài đặt graphifyy từ PyPI

```bash
# Cài đặt package
pip install graphifyy

# Hoặc sử dụng pipx để cách ly môi trường
pipx install graphifyy
```

#### Bước 3: Cài đặt skill vào Claude Code

```bash
graphify install
```

Lệnh này sẽ:
- Tạo thư mục `~/.claude/skills/graphify/`
- Copy skill file
- Thêm config vào CLAUDE.md nếu cần

#### Bước 4: Verify installation

```bash
# Kiểm tra installation
graphify --help
```

Output mong đợi:
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

#### Bước 5: Khởi tạo graph đầu tiên

```bash
# Trong thư mục project
cd /path/to/your/project

# Chạy graphify trong Claude Code
/graphify .
```

### Cấu hình nâng cao

#### Custom output directory
```bash
/graphify . --output ./my-graph-folder
```

#### Exclude patterns
Tạo file `.graphifyignore` trong thư mục gốc:
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

#### Lỗi: "command not found: graphify"
```bash
# Thêm vào PATH
export PATH="$PATH:$HOME/.local/bin"

# Hoặc cài đặt lại
pip uninstall graphifyy -y
pip install graphifyy
```

#### Lỗi: "No module named 'tree_sitter'"
```bash
pip install tree-sitter
```

#### Lỗi: Permission denied khi install
```bash
# Sử dụng pipx thay vì pip
pipx install graphifyy

# Hoặc sudo (không khuyến khích)
sudo pip install graphifyy
```

#### Lỗi: Claude không nhận skill
Thêm thủ công vào `~/.claude/CLAUDE.md`:
```markdown
# Graphify
- **graphify**: Use skill `graphify` when user wants to analyze code structure
- Location: ~/.claude/skills/graphify/SKILL.md
```

#### Tốc độ chậm với large codebase
```bash
# Chạy với shallow mode
/graphify . --mode shallow

# Hoặc chỉ parse specific folders
/graphify ./src
/graphify ./src --mode deep
```

## Sử dụng chi tiết

### Các kịch bản sử dụng thực tế

#### 1. Hiểu project structure lần đầu

```bash
# Bước 1: Chạy graphify trên toàn bộ project
/graphify .

# Bước 2: Xem graph.html trong browser
open graphify-out/graph.html

# Bước 3: Query để hiểu architecture
/graphify query "what is the main architecture pattern?"
/graphify query "how is data flow organized?"
```

#### 2. Tìm related code

```bash
# Tìm đường dẫn giữa 2 components
/graphify path "AuthService" "Database"

// Output: AuthService → AuthRepository → Database

# Explain một component
/graphify explain "UserController"
```

#### 3. Thêm external resources

```bash
# Thêm paper
/graphify add https://arxiv.org/abs/1706.03762

# Thêm blog post
/graphify add https://karpathy.ai/zero-to-hero/

# Thêm image/diagram
/graphify add ./docs/architecture.png
```

#### 4. Continuous updates

```bash
# Auto-sync mode
/graphify . --watch

# Sau đó edit files như bình thường
# Graph sẽ tự động update
```

#### 5. Export for other tools

```bash
# Export cho Neo4j
/graphify . --neo4j

# Export cho Gephi
/graphify . --graphml

# Generate wiki
/graphify . --wiki
```

### Ví dụ Output

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

1. **Chạy lần đầu với shallow mode** để test
   ```bash
   /graphify . --mode shallow
   ```

2. **Sử dụng --watch** cho active development
   ```bash
   /graphify . --watch
   ```

3. **Exclude generated files** trong `.graphifyignore`
4. **Commit graph.json** để share với team
5. **Weekly rebuild** với `--update` để keep fresh

## Basic Commands

| Command | Description |
|---------|-------------|
| `/graphify` | Run on current directory |
| `/graphify ./raw` | Run on specific folder |
| `/graphify ./raw --mode deep` | More aggressive INFERRED edge extraction |
| `/graphify ./raw --update` | Re-extract only changed files, merge into existing graph |

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

| Flag | Description |
|------|-------------|
| `--watch` | Auto-sync graph as files change |
| `--wiki` | Build agent-crawlable wiki |
| `--svg` | Export graph.svg |
| `--graphml` | Export for Gephi, yEd |
| `--neo4j` | Generate cypher.txt for Neo4j |
| `--mcp` | Start MCP stdio server |

## Automation

```
graphify hook install  # Post-commit git hook
```

## Supported File Types

| Type | Extensions | Extraction Method |
|------|-----------|-------------------|
| Code | `.py .ts .js .go .rs .java .c .cpp .rb .cs .kt .scala .php` | AST via tree-sitter + call-graph |
| Docs | `.md .txt .rst` | Concepts + relationships via Claude |
| Papers | `.pdf` | Citation mining + concept extraction |
| Images | `.png .jpg .webp .gif` | Claude vision for screenshots, diagrams |

## How It Works

### 1. AST Pass (No LLM needed)
- Extract structure từ code files
- Classes, functions, imports
- Call graphs, docstrings
- Sử dụng tree-sitter

### 2. Transcription Pass
- Video/audio → text
- Local với faster-whisper

### 3. Semantic Pass
- Claude subagents extract concepts
- Relationships
- Design rationale từ docs, papers, images, transcripts

## Output Artifacts

`graphify-out/` directory chứa:
- **graph.html** – Interactive graph với clickable nodes, search, community filtering
- **knowledge-base/** – Open as Markdown workspace
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
Every edge tagged `EXTRACTED`, `INFERRED`, hoặc `AMBIGUOUS`

## Advanced Features

### Auto-sync (--watch)
- Runs in background
- Code file saves trigger instant rebuild (AST only)
- Doc/image changes notify you to run `--update`

### Git commit hook
Installs post-commit hook that rebuilds graph after every commit

### Wiki (--wiki)
Generates Wikipedia-style markdown articles per community and god node

## Worked Examples

| Corpus | Files | Reduction | Output |
|--------|-------|-----------|--------|
| Karpathy repos + 5 papers + 4 images | 52 | **71.5x** | `worked/karpathy-repos/` |
| Graphify source + Transformer paper | 4 | **5.4x** | `worked/mixed-corpus/` |
| httpx (synthetic Python library) | 6 | ~1x | `worked/httpx/` |

## Tech Stack

- NetworkX + Leiden (graspologic)
- tree-sitter
- vis.js
- Claude for semantic extraction
- faster-whisper + yt-dlp for video/audio

## Architecture

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| Massive token reduction | Up to 71.5× less tokens |
| Multimodal | Xử lý code, docs, media |
| No Neo4j required | Local storage, không cần graph DB |
| Persistent | Query lại sau nhiều tuần |
| Multiple exports | Nhiều format options |
| Interactive UI | Clickable graph visualization |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| LLM-dependent for semantic | Cần Claude/API cho semantic pass |
| Không real-time | Batch processing |
| Graph storage | JSON có thể lớn với large codebases |

## Sử dụng khi nào

- **Understanding codebases**: Nhanh chóng hiểu project structure
- **Architecture decisions**: Tìm "why" đằng sau design
- **Personal knowledge**: Manage như Andrej Karpathy's /raw folder
- **Token optimization**: Khi cần giảm token usage
- **Code review**: Impact analysis
- **Legacy code exploration**: Hiểu undocumented codebases

---

**Tài liệu tham khảo**: 
- [safishamsi/graphify](https://github.com/safishamsi/graphify)
- [Examples](./worked)
