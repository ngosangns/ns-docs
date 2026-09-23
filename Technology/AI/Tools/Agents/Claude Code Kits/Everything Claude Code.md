---
area: technology
domain: claude-code
type: tool
title: Everything Claude Code
description: Everything Claude Code (ECC) is a large multi-harness agent performance system bundling agents, skills, hooks, rules, continuous learning, and security scanning.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - claude-code
  - coding-agents
resource: https://github.com/affaan-m/ECC
---

# Everything Claude Code

## Definition

**Everything Claude Code** (ECC) is a performance optimization system for AI agent harnesses, originally a winner at the Anthropic Hackathon. It is more than a config pack: it is a complete system of skills, instincts, memory optimization, continuous learning, security scanning, and research-first development. It works on Claude Code, Codex, Cursor, OpenCode, Gemini, and other AI agent harnesses.

> **The repo was renamed**: `affaan-m/everything-claude-code` → **`affaan-m/ECC`** (the old URL still redirects). The project now calls itself "ECC".

The engineering loop that ECC pre-installs into the agent:

```text
plan -> test -> implement -> review -> verify -> remember -> improve
```

Instead of re-describing this process in every prompt, you install it once and it becomes how the agent works.

## Basic Information

| Item                    | Value                                                                      |
| ----------------------- | -------------------------------------------------------------------------- |
| **Repo**                | [affaan-m/ECC](https://github.com/affaan-m/ECC)                            |
| **Stars**               | 263k+                                                                      |
| **Forks**               | 39.4k+                                                                     |
| **Contributors**        | 340+                                                                       |
| **Language Ecosystems** | 12+ (TypeScript, Python, Go, Java, Kotlin, C++, Rust, Perl, PHP, Swift...) |
| **License**             | MIT (open source forever)                                                  |
| **Version**             | v2.2.1                                                                     |

## Installation

### Universal Guided Setup (Recommended since v2.2)

Requires Node.js 18+; the Claude Code plugin additionally needs Git and Claude Code 2.1+.

```bash
npx ecc-universal@2.2.2 setup
```

Equivalent to `pnpm dlx` / `yarn dlx` / `bunx`. Provides guided setup for Claude Code, Codex, and Kimi Code.

### Plugin Marketplace

```
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc
```

> Pick **one** install method: don't layer a manual install on top of a plugin install.

### Manual Install

```bash
git clone https://github.com/affaan-m/ECC.git
cd ECC
npm install
./install.sh --profile full
```

## Architecture

```
ECC/
├── .claude-plugin/     # Plugin & marketplace manifests
├── agents/             # 68 specialized subagents
├── skills/             # 292 workflow definitions
├── commands/           # 94 legacy command shims
├── hooks/              # Session lifecycle hooks
├── rules/              # Multi-language coding rules
├── contexts/           # Project context templates
├── scripts/            # Automation scripts
├── plugins/            # Plugin integrations
├── mcp-configs/        # MCP server configurations
├── schemas/            # JSON schemas
├── research/           # Research workflows
├── ecc2/               # ECC 2.0 Alpha (Rust)
└── docs/               # Documentation
```

## Key Components

### Agents (68)

| Agent                                        | Function                        |
| -------------------------------------------- | ------------------------------- |
| planner.md                                   | Feature implementation planning |
| architect.md                                 | System design decisions         |
| tdd-guide.md                                 | Test-driven development         |
| code-reviewer.md                             | Quality & security review       |
| security-reviewer.md                         | Vulnerability analysis          |
| build-error-resolver.md                      | Build error diagnosis           |
| cpp-reviewer / go-reviewer / python-reviewer | Language-specific review        |
| loop-operator.md                             | Autonomous loop execution       |
| harness-optimizer.md                         | Harness config tuning           |

### Skills (292)

| Category               | Skills                                                               |
| ---------------------- | -------------------------------------------------------------------- |
| **Coding Standards**   | TypeScript, Python, Go, Java, Kotlin, C++, Rust, Swift, PHP, Perl    |
| **Framework Patterns** | Django, Spring Boot, Laravel, NestJS, Next.js                        |
| **Security**           | Security review, AgentShield integration                             |
| **TDD Workflow**       | Per-framework TDD workflows                                          |
| **Verification**       | Per-framework verification loops                                     |
| **DevOps**             | Docker patterns, deployment patterns, database migrations            |
| **Business**           | Article writing, content engine, market research, investor materials |
| **Media**              | Manim video, Remotion video, VideoDB                                 |
| **Specialized**        | ClickHouse, API design, E2E testing, regex vs LLM                    |

### Hooks (Lifecycle)

| Hook         | Trigger           | Function                            |
| ------------ | ----------------- | ----------------------------------- |
| SessionStart | Claude starts     | Restore context, inject discoveries |
| PostToolUse  | After tool use    | Capture file ops to memory          |
| PreToolUse   | Before tool use   | Security checks, type validation    |
| PreCompact   | Before compaction | Save session continuity             |
| SessionEnd   | Session ends      | Save summary                        |
| Stop         | Response stops    | Quality check                       |

## Dashboard GUI

```bash
npm run dashboard
# or
python3 ./ecc_dashboard.py
```

A tabbed interface with Agents, Skills, Commands, and Rules tabs. Dark/Light theme and font customization.

## ECC 2.0 Alpha (Rust)

A Rust control-plane prototype in `ecc2/` with these commands:

- `dashboard`, `start`, `sessions`, `status`, `stop`, `resume`, `daemon`

## Cross-Platform Support

Since v2.2 the repo states explicitly that **not every harness is equal**; see the [support status matrix](https://github.com/affaan-m/ECC#platform-support) before assuming feature parity.

| Platform                                                         | Status                     |
| ---------------------------------------------------------------- | -------------------------- |
| Claude Code                                                      | Best supported             |
| Codex (app + CLI)                                                | Supported sync path        |
| Kimi Code                                                        | Guided setup               |
| Cursor, OpenCode, Gemini, Zed, GitHub Copilot, Antigravity, Qwen | Capability-limited adapter |

## Hook Runtime Controls

```bash
# Hook strictness profile
export ECC_HOOK_PROFILE=minimal|standard|strict

# Disable specific hooks
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"
```

## Tech Stack

| Component        | Technology             |
| ---------------- | ---------------------- |
| Primary Language | TypeScript             |
| Secondary        | Python, Go, Java, Rust |
| Runtime          | Node.js 18+            |
| Testing          | 997+ internal tests    |
| Package Manager  | npm, pnpm, yarn, bun   |

## Pros

| Pro                 | Description                                  |
| ------------------- | -------------------------------------------- |
| Massive ecosystem   | 38 agents, 181 skills, 72 commands           |
| Multi-harness       | Claude Code, Codex, Cursor, OpenCode, Gemini |
| Multi-language      | 12+ language ecosystems                      |
| Production-ready    | 997+ tests, 170+ contributors                |
| Anthropic winner    | Built from real hackathon experience         |
| Dashboard GUI       | Visual exploration of components             |
| Continuous learning | Auto-extracts patterns from sessions         |
| Security            | AgentShield integration, 102 rules           |

## Cons

| Con                      | Description                                     |
| ------------------------ | ----------------------------------------------- |
| Overwhelming size        | A very large repo, hard for beginners to start  |
| Configuration complexity | Many install options, which can be overwhelming |
| Token overhead           | Many agents/skills consume context window       |
| Mixed quality            | Some skills are better than others              |
| Slow install             | A full-profile install takes time               |

## When to Use

- **Enterprise teams**: Need a full-featured toolkit with multi-language support
- **Multi-harness workflows**: Use several AI coding tools at once
- **Security-first development**: Need integrated security scanning
- **Large codebases**: Need specialized agents for many languages
- **CI/CD integration**: Need automated quality gates

---

## Business Model

- **OSS**: MIT-licensed repo, free forever.
- **ECC Pro + GitHub App**: a hosted version for private repos, paid per seat. Sponsors plus Pro fund the project (one maintainer shipping weekly across 7 harnesses).

---

**References**:

- [affaan-m/ECC](https://github.com/affaan-m/ECC): main repo (old name: `everything-claude-code`)
- [ecc.tools](https://ecc.tools): website & pricing
- [npm: ecc-universal](https://www.npmjs.com/package/ecc-universal)
- [npm: ecc-agentshield](https://www.npmjs.com/package/ecc-agentshield)

> **See also:** [Kit Comparison](/Technology/AI/Tools/Agents/Claude Code Kits/Kit Comparison) · [Oh My Claudecode](/Technology/AI/Tools/Agents/Claude Code Kits/Oh My Claudecode) · [Claude Capsule Kit](/Technology/AI/Tools/Agents/Claude Code Kits/Claude Capsule Kit)
