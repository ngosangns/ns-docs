---
area: technology
domain: claude-code
type: tool
title: Claude Task Master
description: Claude Task Master is an editor-agnostic, MCP-based task management system that parses PRDs into tasks and subtasks for AI-driven development.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - claude-code
  - coding-agents
  - task-management
resource: https://cursor.com/en/install-mcp?name=task-master-ai&config=
---

# Claude Task Master

## Definition

**Task Master** is a task management system for AI-driven development that works in Cursor, Claude Code, Windsurf, Roo, Lovable, and other AI chats. It parses a PRD into tasks, auto-expands them into subtasks, tracks progress, and integrates with many AI providers.

## Basic Information

| Item             | Value                                        |
| ---------------- | -------------------------------------------- |
| **Stars**        | 26.5k                                        |
| **Forks**        | 2.5k                                         |
| **Contributors** | Large community                              |
| **Languages**    | JavaScript 51.6%, TypeScript 43.8%, MDX 3.3% |
| **License**      | MIT with Commons Clause                      |
| **Version**      | v0.43.1                                      |

## Installation

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

### PRD to Tasks

Parses a Product Requirements Document into structured tasks with dependencies, priorities, and complexity scores.

### Task Structure

Each task has:

- ID, title, description
- Status (pending, in-progress, done, etc.)
- Dependencies (task IDs)
- Priority (high, medium, low)
- Subtasks
- Complexity score
- Tags

### Multi-AI Provider Support

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

### MCP Integration

36 MCP tools available (~21,000 tokens):

| Mode            | Tools    | Tokens   | Use Case                 |
| --------------- | -------- | -------- | ------------------------ |
| `all` (default) | 36       | ~21k     | Complete feature set     |
| `standard`      | 15       | ~10k     | Common operations        |
| `core`          | 7        | ~5k      | Essential daily workflow |
| Custom          | Variable | Variable | Specific tool selection  |

### AI Research

```bash
task-master research "What are the latest best practices for JWT authentication?"
```

Researches with project context and cross-references findings.

### Task Commands

| Command                  | Function                |
| ------------------------ | ----------------------- |
| `task-master init`       | Initialize project      |
| `task-master parse-prd`  | Parse PRD to tasks      |
| `task-master list`       | List all tasks          |
| `task-master next`       | Show next task          |
| `task-master show 1,3,5` | Show specific tasks     |
| `task-master expand`     | Expand task to subtasks |
| `task-master move`       | Move tasks between tags |
| `task-master research`   | AI-powered research     |

### Cross-Tag Movement

```bash
task-master move --from=5 --from-tag=backlog --to-tag=in-progress
task-master move --from=5,6,7 --from-tag=backlog --to-tag=done --with-dependencies
```

## Configuration

MCP config in `.cursor/mcp.json`, `.vscode/mcp.json`, etc.:

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

## Pros

| Pro               | Description                                 |
| ----------------- | ------------------------------------------- |
| Editor-agnostic   | Cursor, Claude Code, Windsurf, VS Code, Roo |
| Multi-AI provider | 10+ providers supported                     |
| MCP integration   | 36 tools, selectable loading                |
| PRD-driven        | Structured from requirements                |
| Task dependencies | Auto-manages dependencies                   |
| Research built-in | AI-powered context research                 |
| Scale             | 26.5k stars, large community                |
| Free tier         | Works with Claude Code (no API key)         |

## Cons

| Con                | Description                          |
| ------------------ | ------------------------------------ |
| Commons Clause     | Cannot sell the product as a service |
| API key dependency | Most models need an API key          |
| Token overhead     | 36 MCP tools = ~21k tokens           |
| Complex setup      | Many config options                  |
| Monorepo overhead  | Turborepo build complexity           |

## When to Use

- **New projects**: Start with a PRD and generate structured tasks
- **Multi-editor teams**: Team members use different editors
- **Task-driven development**: Want structured task management
- **AI-assisted planning**: Need AI to expand and research tasks
- **MCP-first workflows**: Want task management through MCP tools

---

**References**:

- [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)
- [npm: task-master-ai](https://www.npmjs.com/package/task-master-ai)
- [Docs](https://docs.task-master.dev)

> **See also:** [Kit Comparison](/Technology/AI/Tools/Agents/Claude Code Kits/Kit Comparison) · [Other Kits](/Technology/AI/Tools/Agents/Claude Code Kits/Other Kits) · [Coding Agents](/Technology/AI/Tools/Agents/Coding Agents)
