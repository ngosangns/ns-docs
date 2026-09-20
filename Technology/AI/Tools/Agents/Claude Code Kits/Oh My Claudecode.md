---
area: technology
domain: ai-ml
topic: coding-agents
type: resource
title: Oh My Claudecode
description: Oh-My-ClaudeCode (OMC) - Teams-first Multi-agent Orchestration
timestamp: '2026-06-19T13:43:26.090Z'
tags:
  - technology
  - ai-ml
  - coding-agents
  - claude-code
resource: https://github.com/Yeachan-Heo/oh-my-claudecode
---
# Oh-My-ClaudeCode (OMC) - Teams-first Multi-agent Orchestration

## Định nghĩa

**Oh-My-ClaudeCode** (OMC) là hệ thống multi-agent orchestration cho Claude Code với zero learning curve. Nổi bật với Team mode (canonical staged pipeline), multi-provider orchestration (Claude + Codex + Gemini), deep interview system, và persistent execution modes. NPM package: `oh-my-claude-sisyphus`.

## Thông tin cơ bản

| Thông tin             | Giá trị               |
| --------------------- | --------------------- |
| **Stars**             | 28.4k                 |
| **Forks**             | 2.6k                  |
| **Top Collaborators** | 5+ active             |
| **License**           | MIT                   |
| **npm package**       | oh-my-claude-sisyphus |

## Cài đặt

### Plugin Marketplace (Recommended)

```bash
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode
```

### NPM

```bash
npm i -g oh-my-claude-sisyphus@latest
```

### Setup

```bash
/setup        # Inside Claude Code session
omc setup     # From terminal
```

## Core Orchestration Modes

| Mode                   | What it is                                                      | Use For                           |
| ---------------------- | --------------------------------------------------------------- | --------------------------------- |
| **Team** (recommended) | `team-plan -> team-prd -> team-exec -> team-verify -> team-fix` | Coordinated agents on shared task |
| **omc team** (CLI)     | tmux CLI workers: `claude`/`codex`/`gemini` in split-panes      | Cross-provider tasks              |
| **ccg**                | `/ask codex` + `/ask gemini`, Claude synthesizes                | Mixed backend+UI work             |
| **Autopilot**          | Autonomous execution (single lead agent)                        | End-to-end features               |
| **Ultrawork**          | Maximum parallelism (non-team)                                  | Burst parallel fixes              |
| **Ralph**              | Persistent mode with verify/fix loops                           | Must-complete tasks               |
| **Pipeline**           | Sequential, staged processing                                   | Multi-step transformations        |

## Key Features

### 1. Team Mode (Canonical)

```bash
/team 3:executor "fix all TypeScript errors"
```

Staged pipeline: plan -> PRD -> exec -> verify -> fix (loop)

Enable Claude Code native teams:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### 2. tmux CLI Workers (v4.4.0+)

```bash
omc team 2:codex "review auth module"
omc team 2:gemini "redesign UI components"
omc team 1:claude "implement payment flow"
omc team status auth-review
omc team shutdown auth-review
```

Workers spawn on-demand và die khi task completes.

### 3. Deep Interview

```bash
/deep-interview "I want to build a task management app"
```

Socratic questioning để clarify thinking trước khi code. Measures clarity across weighted dimensions.

### 4. 19 Specialized Agents

| Agent Tier   | Purpose                 |
| ------------ | ----------------------- |
| Architecture | System design decisions |
| Research     | Information gathering   |
| Design       | UI/UX decisions         |
| Testing      | Quality assurance       |
| Data Science | Data analysis           |
| Executor     | Task implementation     |

Smart model routing: Haiku cho simple tasks, Opus cho complex reasoning.

### 5. Custom Skills

```yaml
# .omc/skills/fix-proxy-crash.md
---
name: Fix Proxy Crash
description: aiohttp proxy crashes on ClientDisconnectedError
triggers: ["proxy", "aiohttp", "disconnected"]
source: extracted
---
Wrap handler at server.py:42 in try/except ClientDisconnectedError...
```

| Scope   | Path             | Shared with               |
| ------- | ---------------- | ------------------------- |
| Project | `.omc/skills/`   | Team (version-controlled) |
| User    | `~/.omc/skills/` | All projects              |

Manage: `/skill list | add | remove | edit | search`
Auto-learn: `/learner` extracts patterns

### 6. Provider Advisor

```bash
omc ask claude "review this migration plan"
omc ask codex "identify architecture risks"
omc ask gemini "propose UI polish ideas"
```

### 7. HUD Statusline

Real-time orchestration metrics trong status bar.

### 8. Notifications

Telegram, Discord, Slack notifications khi sessions stop:

```bash
omc config-stop-callback telegram --enable --token <bot_token> --chat <chat_id>
omc config-stop-callback discord --enable --webhook <url>
omc config-stop-callback slack --enable --webhook <url>
```

### 9. OpenClaw Integration

Forward Claude Code session events to OpenClaw gateway cho automated responses.

### 10. Autoresearch

```bash
omc autoresearch --mission "improve startup performance" --eval "npm test"
```

### 11. Rate Limit Wait

```bash
omc wait          # Check status
omc wait --start  # Auto-resume daemon
```

## In-Session Shortcuts

| Shortcut             | Kind          | Effect                  |
| -------------------- | ------------- | ----------------------- |
| `/team`              | Slash skill   | Team orchestration      |
| `/ccg`               | Slash skill   | Tri-model synthesis     |
| `/autopilot`         | Skill/trigger | Autonomous execution    |
| `/ralph`             | Skill/trigger | Persistence mode        |
| `/ultrawork` / `ulw` | Skill/trigger | Maximum parallelism     |
| `/ralplan`           | Skill/trigger | Iterative planning      |
| `/deep-interview`    | Slash skill   | Socratic requirements   |
| `deepsearch`         | Trigger       | Codebase-focused search |
| `ultrathink`         | Trigger       | Deep reasoning          |

## Requirements

| Requirement               | Notes                               |
| ------------------------- | ----------------------------------- |
| Claude Code CLI           | Required                            |
| Claude Max/Pro OR API key | Required                            |
| tmux                      | For team mode, rate-limit detection |
| Codex CLI (optional)      | For cross-provider orchestration    |
| Gemini CLI (optional)     | For cross-provider orchestration    |

### Cost Estimate

3 Pro plans (Claude + Gemini + ChatGPT) = ~$60/month

## Tech Stack

| Component     | Technology                        |
| ------------- | --------------------------------- |
| Language      | TypeScript                        |
| Runtime       | Node.js                           |
| Package       | npm (oh-my-claude-sisyphus)       |
| Process       | tmux                              |
| Notifications | Telegram, Discord, Slack webhooks |

## Ưu điểm

| Ưu điểm              | Mô tả                                      |
| -------------------- | ------------------------------------------ |
| Zero learning curve  | Natural language, auto-delegation          |
| Multi-provider       | Claude + Codex + Gemini orchestration      |
| Team mode            | Canonical staged pipeline                  |
| Deep interview       | Socratic requirements clarification        |
| Custom skills        | Auto-learn và auto-inject                  |
| HUD statusline       | Real-time metrics                          |
| 28k+ stars           | Large community                            |
| Persistent execution | Ralph mode keeps going                     |
| Cost optimization    | Smart model routing (30-50% token savings) |

## Nhược điểm

| Nhược điểm               | Mô tả                                   |
| ------------------------ | --------------------------------------- |
| tmux dependency          | Cần tmux cho team mode                  |
| Multiple subscriptions   | ~$60/month cho full multi-provider      |
| Complex architecture     | Nhiều modes và commands                 |
| Package naming confusion | npm: oh-my-claude-sisyphus != repo name |
| Windows support          | Cần psmux cho native Windows            |
| Resource intensive       | Multi-agent orchestration uses tokens   |

## Sử dụng khi nào

- **Multi-agent orchestration**: Cần coordinated team of agents
- **Cross-provider workflows**: Muốn combine Claude + Codex + Gemini
- **Complex features**: Cần staged plan -> exec -> verify pipeline
- **Requirements clarification**: Muốn Socratic deep interview trước khi code
- **Persistent execution**: Muốn tasks complete fully (Ralph mode)
- **Large teams**: Cần shared skills và coordination

---

**Tài liệu tham khảo**:

- [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode)
- [npm: oh-my-claude-sisyphus](https://www.npmjs.com/package/oh-my-claude-sisyphus)
- [Docs](https://yeachan-heo.github.io/oh-my-claudecode-website)
