# Claude Task Master - AI-Powered Task Management System

## Định nghĩa

**Task Master** là hệ thống quản lý task cho AI-driven development, hoạt động mỗi trong Cursor, Claude Code, Windsurf, Roo, Lovable và các AI chat khác. Parse PRD thành tasks, auto-expand thành subtasks, track progress, và integrate với nhiều AI providers.

## Thông tin cơ bản

| Thông tin        | Giá trị                                      |
| ---------------- | -------------------------------------------- |
| **Stars**        | 26.5k                                        |
| **Forks**        | 2.5k                                         |
| **Contributors** | Large community                              |
| **Languages**    | JavaScript 51.6%, TypeScript 43.8%, MDX 3.3% |
| **License**      | MIT with Commons Clause                      |
| **Version**      | v0.43.1                                      |

## Cài đặt

### Claude Code

```bash
claude mcp add taskmaster-ai -- npx -y task-master-ai
```

### Cursor (One-Click)

[Add task-master-ai MCP server to Cursor](https://cursor.com/en/install-mcp?name=task-master-ai&config=...)

### NPM

```bash
npm install -g task-master-ai
task-master init
```

## Architecture

```
claude-task-master/
├── .claude-plugin/   # Plugin manifests
├── .taskmaster/      # Task data & configs
├── apps/             # Frontend apps
├── context/          # Context templates
├── docs/             # Documentation
├── mcp-server/       # MCP server implementation
├── packages/         # Core packages
├── scripts/          # Utility scripts
├── src/              # Core source
└── tests/            # Test suite
```

## Core Features

### 1. PRD to Tasks

Parse Product Requirements Document thành structured tasks với dependencies, priorities, và complexity scores.

### 2. Task Structure

Mỗi task có:

- ID, title, description
- Status (pending, in-progress, done, etc.)
- Dependencies (task IDs)
- Priority (high, medium, low)
- Subtasks
- Complexity score
- Tags

### 3. Multi-AI Provider Support

| Provider           | Use Case            |
| ------------------ | ------------------- |
| Anthropic (Claude) | Main model          |
| OpenAI (GPT)       | Main/research model |
| Google (Gemini)    | Main/research model |
| Perplexity         | Research model      |
| xAI (Grok)         | Research/main model |
| OpenRouter         | Multi-model access  |
| Claude Code        | No API key needed   |
| Codex CLI          | OAuth via ChatGPT   |

### 4. MCP Integration

36 MCP tools available (~21,000 tokens):

| Mode            | Tools    | Tokens   | Use Case                 |
| --------------- | -------- | -------- | ------------------------ |
| `all` (default) | 36       | ~21k     | Complete feature set     |
| `standard`      | 15       | ~10k     | Common operations        |
| `core`          | 7        | ~5k      | Essential daily workflow |
| Custom          | Variable | Variable | Specific tool selection  |

### 5. AI Research

```bash
task-master research "What are the latest best practices for JWT authentication?"
```

Research với project context, cross-reference findings.

### 6. Task Commands

| Command                  | Chức năng               |
| ------------------------ | ----------------------- |
| `task-master init`       | Initialize project      |
| `task-master parse-prd`  | Parse PRD to tasks      |
| `task-master list`       | List all tasks          |
| `task-master next`       | Show next task          |
| `task-master show 1,3,5` | Show specific tasks     |
| `task-master expand`     | Expand task to subtasks |
| `task-master move`       | Move tasks between tags |
| `task-master research`   | AI-powered research     |

### 7. Cross-Tag Movement

```bash
task-master move --from=5 --from-tag=backlog --to-tag=in-progress
task-master move --from=5,6,7 --from-tag=backlog --to-tag=done --with-dependencies
```

## Configuration

MCP config trong `.cursor/mcp.json`, `.vscode/mcp.json`, etc:

```json
{
  "mcpServers": {
    "task-master-ai": {
      "command": "npx",
      "args": ["-y", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "...",
        "PERPLEXITY_API_KEY": "...",
        "TASK_MASTER_TOOLS": "standard"
      }
    }
  }
}
```

## Tool Loading Configuration

```bash
# Claude Code CLI
claude mcp add task-master-ai --scope user \
  --env TASK_MASTER_TOOLS="core" \
  -- npx -y task-master-ai@latest
```

## Tech Stack

| Component  | Technology              |
| ---------- | ----------------------- |
| Language   | JavaScript + TypeScript |
| Runtime    | Node.js                 |
| MCP Server | stdio transport         |
| AI Models  | Multi-provider          |
| Testing    | Vitest, Jest            |
| Monorepo   | Turborepo, Changesets   |

## Ưu điểm

| Ưu điểm           | Mô tả                                       |
| ----------------- | ------------------------------------------- |
| Editor-agnostic   | Cursor, Claude Code, Windsurf, VS Code, Roo |
| Multi-AI provider | 10+ providers supported                     |
| MCP integration   | 36 tools, selectable loading                |
| PRD-driven        | Structured from requirements                |
| Task dependencies | Auto-manage dependencies                    |
| Research built-in | AI-powered context research                 |
| Scale             | 26.5k stars, large community                |
| Free tier         | Works với Claude Code (no API key)          |

## Nhược điểm

| Nhược điểm         | Mô tả                              |
| ------------------ | ---------------------------------- |
| Commons Clause     | Không được bán product như service |
| API key dependency | Cần API key cho hầu hết models     |
| Token overhead     | 36 MCP tools = ~21k tokens         |
| Complex setup      | Nhiều config options               |
| Monorepo overhead  | Turborepo build complexity         |

## Sử dụng khi nào

- **New projects**: Start với PRD, generate structured tasks
- **Multi-editor teams**: Dùng nhiều editors khác nhau
- **Task-driven development**: Muốn structured task management
- **AI-assisted planning**: Cần AI expand và research tasks
- **MCP-first workflows**: Muốn task management qua MCP tools

---

**Tài liệu tham khảo**:

- [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)
- [npm: task-master-ai](https://www.npmjs.com/package/task-master-ai)
- [Docs](https://docs.task-master.dev)
