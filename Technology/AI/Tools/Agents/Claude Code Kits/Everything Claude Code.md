---
area: technology
domain: claude-code
type: tool
title: Everything Claude Code
description: "Everything Claude Code (affaan-m/ECC, MIT, npm ecc-universal 2.2.3) is a multi-harness pack of agents, skills, hooks, and rules. Checked 4 November 2026 on main b38be6a. The GitHub API reported 296819 stars and 43886 forks. On that commit the tree has 71 agent markdown files and 314 SKILL.md files. The README says to count the inventory instead of assuming a fixed total."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - claude-code
  - coding-agents
resource: https://github.com/affaan-m/ECC
---

# Everything Claude Code

## Definition

**Everything Claude Code** (ECC) is a performance optimization system for AI agent harnesses. The README background says the author won the Anthropic x Forum Ventures hackathon in September 2025. The pack ships skills, instincts, memory, continuous learning, and security guidance. It targets Claude Code, Codex, Cursor, OpenCode, Gemini, and other harnesses. Checked 4 November 2026 on `main` at `b38be6a7f6350964d59328b52f0624e1d1d552d1`. This check did not clone the repo and did not run an installer.

> **The repo was renamed**: `affaan-m/everything-claude-code` → **`affaan-m/ECC`** (the old URL still redirects). The project now calls itself "ECC".

The engineering loop that ECC pre-installs into the agent:

```text
plan -> test -> implement -> review -> verify -> remember -> improve
```

Instead of re-describing this process in every prompt, you install it once and it becomes how the agent works.

ECC installs that loop once so the agent plans, tests, implements, reviews, verifies, remembers, and improves without a fresh prompt each time. The pack holds specialized agents, workflow skills, command shims, and lifecycle hooks. Hooks can restore context at session start, check tools before they run, and save a summary when the session ends. Claude Code is the best supported harness. Codex has a sync path, and Kimi Code has guided setup.

## Basic Information

| Item                    | Value                                                                      |
| ----------------------- | -------------------------------------------------------------------------- |
| **Repo**                | [affaan-m/ECC](https://github.com/affaan-m/ECC)                            |
| **Stars**               | 296819 on 4 November 2026                                                  |
| **Forks**               | 43886 on the same API read                                                 |
| **Open issues**         | 228                                                                        |
| **Detected language**   | JavaScript, per the GitHub API                                             |
| **License**             | MIT, copyright 2026 Affaan Mustafa                                         |
| **Version**             | 2.2.3 in VERSION, package.json, the GitHub release, and npm                |

## Installation

### Universal Guided Setup (Recommended since v2.2)

Requires Node.js 18+; the Claude Code plugin additionally needs Git and Claude Code 2.1+.

```bash
npx ecc-universal@2.2.3 setup
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
├── agents/             # 71 agent markdown files on this commit
├── skills/             # 314 SKILL.md files, one per top-level skill directory
├── commands/           # 98 command markdown files
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

### Agents (71)

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

### Skills (314)

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

The README platform table on this commit is the source for support status. Claude Code is the stable primary. Codex is a supported native plugin, and the legacy sync is compatibility-only. Qoder is a supported native plugin. Cursor and OpenCode are beta. GitHub Copilot Chat is instruction-only. GitHub Copilot CLI is a beta project adapter. Gemini, Zed, Antigravity, Qwen, Hermes, OpenClaw, Kimi, CodeBuddy, and JoyCode are experimental or minimal adapters. The same page says the core CLI runs on Windows, macOS, and Linux, and that some optional paths still need Bash or Python.

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
| Testing          | 534 files under tests/ on this commit. That is a file count, not a count of test cases. |
| Package Manager  | npm, pnpm, yarn, bun   |

## Pros

| Pro                 | Description                                  |
| ------------------- | -------------------------------------------- |
| Inventory on this commit | 71 agent markdown files, 314 SKILL.md files, 98 command markdown files, 121 rule markdown files besides rules/README.md |
| Multi-harness       | The README status table names Claude Code as the stable primary, Codex as a native plugin, and several adapters as beta or experimental |
| Dashboard GUI       | `npm run dashboard` is still a package script, and `ecc_dashboard.py` is still at the repo root. This check did not run either. |
| Security            | The README points at npm `ecc-agentshield` and says that package has 102 static analysis rules. That figure was not re-counted here. |

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

- **OSS**: the repo is MIT. The README says the project stays free because sponsors and Pro users fund the work.
- **ECC Pro**: the README says Pro adds private-repo analysis, PR-triggered audits, AgentShield-backed scanning, automatic push and PR checks, pooled team usage, and priority support through the hosted GitHub App at ecc.tools. This check did not open the pricing page and did not record a price.

---

**References**:

- [affaan-m/ECC](https://github.com/affaan-m/ECC): main repo (old name: `everything-claude-code`)
- [ecc.tools](https://ecc.tools): website & pricing
- [npm: ecc-universal](https://www.npmjs.com/package/ecc-universal)
- [npm: ecc-agentshield](https://www.npmjs.com/package/ecc-agentshield)

> **See also:** [Kit Comparison](/Technology/AI/Tools/Agents/Claude Code Kits/Kit Comparison) · [Oh My Claudecode](/Technology/AI/Tools/Agents/Claude Code Kits/Oh My Claudecode) · [Claude Capsule Kit](/Technology/AI/Tools/Agents/Claude Code Kits/Claude Capsule Kit)
