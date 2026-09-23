---
area: technology
domain: ai-ml
topic: coding-agents
type: resource
title: Everything Claude Code
description: Everything Claude Code (ECC) - Agent Harness Performance Optimization System
timestamp: "2026-06-19T13:43:26.090Z"
tags:
  - technology
  - ai-ml
  - coding-agents
  - claude-code
resource: https://github.com/affaan-m/ECC
---

# Everything Claude Code (ECC) - Agent Harness Performance Optimization System

## Định nghĩa

**Everything Claude Code** (ECC) là hệ thống tối ưu hóa hiệu suất cho AI agent harnesses, tương đối đạt tại Anthropic Hackathon. Không chỉ là config pack - đây là hệ thống hoàn chỉnh gồm skills, instincts, memory optimization, continuous learning, security scanning, và research-first development. Hoạt động trên Claude Code, Codex, Cursor, OpenCode, Gemini và các AI agent harnesses khác.

> **Repo đã đổi tên**: `affaan-m/everything-claude-code` → **`affaan-m/ECC`** (URL cũ vẫn redirect). Dự án giờ tự gọi là "ECC".

Vòng lặp kỹ thuật mà ECC cài sẵn vào agent:

```text
plan -> test -> implement -> review -> verify -> remember -> improve
```

Thay vì mô tả lại quy trình này trong mỗi prompt, cài một lần và nó trở thành cách agent làm việc.

## Thông tin cơ bản

| Thông tin               | Giá trị                                                                    |
| ----------------------- | -------------------------------------------------------------------------- |
| **Repo**                | [affaan-m/ECC](https://github.com/affaan-m/ECC)                            |
| **Stars**               | 263k+                                                                      |
| **Forks**               | 39.4k+                                                                     |
| **Contributors**        | 340+                                                                       |
| **Language Ecosystems** | 12+ (TypeScript, Python, Go, Java, Kotlin, C++, Rust, Perl, PHP, Swift...) |
| **License**             | MIT (OSS vĩnh viễn)                                                        |
| **Version**             | v2.2.1                                                                     |

## Cài đặt

### Universal guided setup (Recommended từ v2.2)

Yêu cầu Node.js 18+; với Claude Code plugin cần Git và Claude Code 2.1+.

```bash
npx ecc-universal@2.2.2 setup
```

Tương đương với `pnpm dlx` / `yarn dlx` / `bunx`. Hỗ trợ guided setup cho Claude Code, Codex và Kimi Code.

### Plugin Marketplace

```
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc
```

> Chọn **một** cách cài — đừng chồng manual install lên trên plugin install.

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

| Agent                                        | Chức năng                       |
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

| Hook         | Trigger           | Chức năng                           |
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

Tabbed interface với Agents, Skills, Commands, Rules tabs. Dark/Light theme, font customization.

## ECC 2.0 Alpha (Rust)

Rust control-plane prototype trong `ecc2/` với commands:

- `dashboard`, `start`, `sessions`, `status`, `stop`, `resume`, `daemon`

## Cross-Platform Support

Từ v2.2 repo nói rõ **không phải harness nào cũng ngang nhau** — xem [support status matrix](https://github.com/affaan-m/ECC#platform-support) trước khi giả định feature parity.

| Platform                                                         | Status                     |
| ---------------------------------------------------------------- | -------------------------- |
| Claude Code                                                      | Hỗ trợ tốt nhất            |
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

## Ưu điểm

| Ưu điểm             | Mô tả                                        |
| ------------------- | -------------------------------------------- |
| Massive ecosystem   | 38 agents, 181 skills, 72 commands           |
| Multi-harness       | Claude Code, Codex, Cursor, OpenCode, Gemini |
| Multi-language      | 12+ language ecosystems                      |
| Production-ready    | 997+ tests, 170+ contributors                |
| Anthropic winner    | Built from real hackathon experience         |
| Dashboard GUI       | Visual exploration of components             |
| Continuous learning | Auto-extract patterns from sessions          |
| Security            | AgentShield integration, 102 rules           |

## Nhược điểm

| Nhược điểm               | Mô tả                                       |
| ------------------------ | ------------------------------------------- |
| Overwhelming size        | Repo rất lớn, khó bắt đầu cho beginner      |
| Configuration complexity | Nhiều option cài đặt, có thể quá tải        |
| Token overhead           | Nhiều agents/skills tiêu tốn context window |
| Mixed quality            | Một số skills tốt hơn những skills khác     |
| Slow install             | Full profile install mất thời gian          |

## Sử dụng khi nào

- **Enterprise teams**: Cần full-featured toolkit với multi-language support
- **Multi-harness workflows**: Dùng nhiều AI coding tools cùng lúc
- **Security-first development**: Cần tích hợp security scanning
- **Large codebases**: Cần specialized agents cho nhiều languages
- **CI/CD integration**: Cần automated quality gates

---

## Mô hình kinh doanh

- **OSS**: repo MIT, miễn phí vĩnh viễn.
- **ECC Pro + GitHub App**: bản hosted cho private repo, trả phí theo seat. Sponsor + Pro là nguồn fund cho dự án (một maintainer ship hàng tuần trên 7 harness).

---

**Tài liệu tham khảo**:

- [affaan-m/ECC](https://github.com/affaan-m/ECC) — repo chính (tên cũ: `everything-claude-code`)
- [ecc.tools](https://ecc.tools) — website & pricing
- [npm: ecc-universal](https://www.npmjs.com/package/ecc-universal)
- [npm: ecc-agentshield](https://www.npmjs.com/package/ecc-agentshield)
