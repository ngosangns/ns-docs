---
area: technology
domain: claude-code
type: tool
title: Claudekit Cli
description: ClaudeKit CLI (`ck`) is the command-line tool and React web dashboard for managing ClaudeKit projects, with hook diagnostics, a projects registry, and GitHub automation.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - claude-code
  - coding-agents
resource: https://claudekit.cc
---

# Claudekit Cli

## Definition

**ClaudeKit CLI** (`ck`) is a command-line tool and web dashboard for managing ClaudeKit projects. It provides 16 CLI commands, a React web dashboard, hook diagnostics, a projects registry, and GitHub integration. It is a commercial product of [ClaudeKit.cc](https://claudekit.cc).

## Basic Information

| Item          | Value                     |
| ------------- | ------------------------- |
| **Stars**     | 95                        |
| **Forks**     | 41                        |
| **Languages** | TypeScript 99.1%          |
| **License**   | MIT                       |
| **Version**   | v3.41.4                   |
| **Product**   | ClaudeKit.cc (commercial) |

## Installation

```bash
npm install -g claudekit-cli
# or: bun add -g claudekit-cli
# or: yarn global add claudekit-cli
# or: pnpm add -g claudekit-cli

ck --version
```

## Architecture

```
claudekit-cli/
├── src/              # Modular domain-driven architecture (122 modules)
├── bin/              # CLI entry point
├── scripts/          # Build & utility scripts
├── docs/             # Comprehensive documentation
├── __tests__/        # Test suite
├── tests/            # Integration tests
├── plans/templates/  # Project templates
└── backlog/          # Development backlog
```

## Core Features

### CLI Commands (16)

| Command        | Function                         |
| -------------- | -------------------------------- |
| `ck new`       | Create new project from template |
| `ck init`      | Initialize/update project        |
| `ck config`    | Web dashboard (React UI)         |
| `ck projects`  | Projects registry management     |
| `ck setup`     | Setup ClaudeKit                  |
| `ck skills`    | Manage skills                    |
| `ck agents`    | Manage agents                    |
| `ck commands`  | Manage commands                  |
| `ck migrate`   | Migrate skills structure         |
| `ck doctor`    | Full health check                |
| `ck versions`  | List available versions          |
| `ck update`    | Update CLI                       |
| `ck uninstall` | Remove installation              |
| `ck watch`     | GitHub issue monitoring daemon   |
| `ck content`   | Automated content generation     |

### Web Dashboard

```bash
ck config              # Local only (127.0.0.1)
ck config --host 0.0.0.0 --no-open  # LAN access
```

An interactive React UI for configuration and project management.

### Hook Diagnostics Dashboard

Inspect recent Claude hook activity and failures from `ck config`, across global and project scopes.

### Projects Registry

A centralized registry at `~/.claudekit/projects.json` with file locking.

### Multi-Tier Authentication

```
1. GitHub CLI (gh auth token)
2. Environment Variables (GITHUB_TOKEN)
3. Config File (~/.claudekit/config.json)
4. OS Keychain (secure storage)
5. User Prompt (with save option)
```

### GitHub Issue Watcher (`ck watch`)

An autonomous daemon that monitors GitHub issues, analyzes them with Claude, generates plans, and creates PRs.

Features: issue lifecycle management (10 statuses), Claude-powered brainstorming/planning, automatic PR creation, rate limiting, multi-repo support.

### Content Generation (`ck content`)

Scans git activity, generates social media content with Claude, and publishes to X/Twitter and Facebook.

11-phase pipeline: scan -> filter -> classify -> context -> create -> validate -> review -> photo -> publish -> engage -> analyze.

### Doctor Command

```bash
ck doctor              # Full health check
ck doctor --verbose    # Verbose mode
ck doctor --report     # Shareable diagnostic report
ck doctor --fix        # Auto-fix issues
ck doctor --check-only # CI mode
ck doctor --json       # Machine-readable output
```

Health checks: System, ClaudeKit, Auth, Project, Modules.

### Skills Migration

Auto-detects structure changes (flat -> categorized):

- SHA-256 hash comparison for customization detection
- Backup before migration, rollback on failure

## Available Kits

| Kit       | Description                         |
| --------- | ----------------------------------- |
| engineer  | Engineering toolkit (v1.0.0+)       |
| marketing | Content automation toolkit (v1.0.0) |

## Configuration

```json
// ~/.claudekit/config.json
{
  "github": {
    "token": "stored_in_keychain"
  },
  "defaults": {
    "kit": "engineer",
    "dir": "."
  }
}
```

## Architecture Highlights

- **Modular**: 122 focused modules (< 100 lines each)
- **Facade pattern**: Each domain exposes a public API
- **Phase handlers**: Complex commands use an orchestrator + phase handlers
- **Self-documenting**: kebab-case file names

## Tech Stack

| Component           | Technology |
| ------------------- | ---------- |
| Language            | TypeScript |
| Development Runtime | Bun        |
| Published Runtime   | Node.js    |
| Web Dashboard       | React      |
| Testing             | Bun test   |

## Pros

| Pro                | Description                               |
| ------------------ | ----------------------------------------- |
| Web dashboard      | Visual configuration management           |
| Hook diagnostics   | Debug hook issues easily                  |
| Multi-tier auth    | Flexible authentication                   |
| Skills migration   | Auto-detects and preserves customizations |
| Doctor command     | Comprehensive health check with auto-fix  |
| GitHub watcher     | Autonomous issue management               |
| Content generation | Automated social media pipeline           |
| Cross-platform     | macOS, Linux, Windows                     |

## Cons

| Con                 | Description                           |
| ------------------- | ------------------------------------- |
| Commercial product  | Must purchase a kit from ClaudeKit.cc |
| Private repo access | Needs a GitHub PAT to download        |
| Bun dependency      | Bun is needed for development         |
| Smaller community   | 95 stars                              |
| Limited free tier   | Only the starter kit is free          |

## When to Use

- **ClaudeKit users**: Manage ClaudeKit projects through the CLI/dashboard
- **Project scaffolding**: Need new project templates
- **Hook debugging**: Need visual hook diagnostics
- **GitHub automation**: Need autonomous issue/PR management
- **Content generation**: Need an automated social media pipeline

---

**References**:

- [mrgoonie/claudekit-cli](https://github.com/mrgoonie/claudekit-cli)
- [npm: claudekit-cli](https://www.npmjs.com/package/claudekit-cli)
- [ClaudeKit.cc](https://claudekit.cc)

> **See also:** [ClaudeKit](/Technology/AI/Tools/Agents/Claude Code Kits/ClaudeKit) · [Claudekit Skills](/Technology/AI/Tools/Agents/Claude Code Kits/Claudekit Skills) · [Kit Comparison](/Technology/AI/Tools/Agents/Claude Code Kits/Kit Comparison)
