---
area: technology
domain: ai-ml
topic: coding-agents
type: resource
title: Claudekit
description: ClaudeKit - Smart Guardrails & Workflow Automation cho Claude Code
timestamp: "2026-06-19T13:43:26.090Z"
tags:
  - technology
  - ai-ml
  - coding-agents
  - claude-code
resource: https://github.com/carlrannaberg/claudekit
---

# ClaudeKit - Smart Guardrails & Workflow Automation cho Claude Code

## Định nghĩa

**ClaudeKit** là toolkit cung cấp smart guardrails và workflow automation cho Claude Code. Bắt lỗi real-time, save checkpoints, và tăng cường AI coding với expert subagents. Nổi bật với codebase map tự động, 6-agent parallel code review, và spec-driven development workflow.

## Thông tin cơ bản

| Thông tin     | Giá trị                                        |
| ------------- | ---------------------------------------------- |
| **Stars**     | 657                                            |
| **Forks**     | 105                                            |
| **Languages** | TypeScript 84.3%, Shell 10.9%, JavaScript 4.8% |
| **License**   | MIT                                            |
| **Version**   | v0.9.5                                         |

## Cài đặt

```bash
npm install -g claudekit
claudekit setup
```

## Architecture

```
claudekit/
├── .claude/          # Claude configs
├── .claudekit/       # Kit configs
├── bin/              # CLI binaries
├── cli/              # CLI source
├── docs/             # Documentation
├── examples/         # Example configs
├── scripts/          # Build scripts
├── specs/            # Spec definitions
├── src/              # Core source (hooks, agents, commands)
└── tests/            # Test suite
```

## Core Features

### 1. Instant Codebase Navigation

Claude thấy toàn bộ project structure tự động - bỏ qua hầu hết discovery searches.

- Navigate directly to code
- No trial-and-error
- Confident code access
- See relationships & dependencies
- Automatic setup, updates as you code

### 2. Comprehensive Code Review

6 parallel agents phân tích code:

| Agent                  | Focus                       |
| ---------------------- | --------------------------- |
| Architecture reviewer  | Design patterns, structure  |
| Security reviewer      | Vulnerabilities, OWASP      |
| Performance reviewer   | Optimization opportunities  |
| Testing reviewer       | Coverage, test quality      |
| Quality reviewer       | Code smells, best practices |
| Documentation reviewer | Completeness, clarity       |

### 3. Git Checkpoint System

- Auto-save checkpoints khi Claude stops
- `/checkpoint:restore` để undo changes
- List, restore, hoặc clean up checkpoints

### 4. Real-time Error Prevention

| Guard            | Chức năng                          |
| ---------------- | ---------------------------------- |
| TypeScript Guard | Block `any` types                  |
| Linting          | Catch style issues immediately     |
| Anti-patterns    | Prevent code->comments replacement |
| Test Runner      | Run tests on file changes          |
| File Security    | 195+ patterns, 12 categories       |

### 5. Enhanced AI Reasoning

- 4 configurable thinking levels (0-3)
- < 5ms overhead
- Session-aware, activates on first prompt

### 6. AI Subagents

| Agent              | Chức năng                             |
| ------------------ | ------------------------------------- |
| code-review-expert | 6-agent parallel review               |
| triage-expert      | Problem diagnosis & routing           |
| research-expert    | Parallel research, 90% time reduction |
| code-search        | Fast parallel codebase search         |
| typescript-expert  | TypeScript/JavaScript development     |
| react-expert       | React components & performance        |
| database-expert    | Query optimization & schema design    |
| oracle             | Deep debugging (requires setup)       |
| refactoring-expert | Code smell detection                  |
| ai-sdk-expert      | Vercel AI SDK v5                      |
| nestjs-expert      | Nest.js architecture                  |

### 7. Iterative Spec Implementation

6-phase workflow: Implementation -> Test Writing -> Code Review -> Iterative Improvement -> Commit -> Progress Tracking

## Hooks

| Hook              | Event             | Chức năng                   |
| ----------------- | ----------------- | --------------------------- |
| file-guard        | PreToolUse        | Block sensitive file access |
| typecheck-changed | PostToolUse       | TypeScript type checking    |
| lint-changed      | PostToolUse       | Linting validation          |
| test-changed      | PostToolUse       | Run relevant tests          |
| check-any-changed | PostToolUse       | Forbid `any` types          |
| codebase-map      | UserPromptSubmit  | Inject codebase context     |
| thinking-level    | UserPromptSubmit  | Enhance reasoning           |
| create-checkpoint | Stop              | Auto checkpoint             |
| self-review       | Stop/SubagentStop | Targeted self-review        |

## CLI Commands

```bash
claudekit setup              # Interactive setup
claudekit setup --yes        # Quick setup
claudekit setup --all        # Install everything
claudekit list               # Show components
claudekit list agents        # List agents with token counts
claudekit doctor             # Health check
claudekit-hooks profile      # Profile hook performance
claudekit-hooks disable/enable <hook>  # Session hook control
```

## Slash Commands

| Command                           | Chức năng                |
| --------------------------------- | ------------------------ |
| `/code-review`                    | 6-agent parallel review  |
| `/research [query]`               | Deep parallel research   |
| `/spec:create`                    | Generate specs           |
| `/spec:execute`                   | Implement specs          |
| `/git:commit`                     | Smart commit             |
| `/git:status`                     | Intelligent git analysis |
| `/checkpoint:create/restore/list` | Git checkpoints          |
| `/validate-and-fix`               | Quality checks           |

## Configuration

`.claude/settings.json` - Hooks config:

```json
{
  "hooks": {
    "PreToolUse": [{"matcher": "Read|Edit|MultiEdit|Write", "hooks": [...]}],
    "PostToolUse": [{"matcher": "Write|Edit|MultiEdit", "hooks": [...]}],
    "Stop": [{"matcher": "*", "hooks": [...]}]
  }
}
```

`.claudekit/config.json` - Hook config:

```json
{
  "hooks": {
    "typecheck-changed": { "command": "npm run typecheck" },
    "thinking-level": { "level": 2 },
    "codebase-map": { "include": ["src/**"], "exclude": ["**/*.test.ts"] }
  }
}
```

## Tech Stack

| Component | Technology    |
| --------- | ------------- |
| Language  | TypeScript    |
| Runtime   | Node.js 20+   |
| Testing   | Vitest        |
| Linting   | Biome, ESLint |
| Package   | npm           |

## Ưu điểm

| Ưu điểm              | Mô tả                                 |
| -------------------- | ------------------------------------- |
| Real-time guards     | Bắt lỗi ngay khi code thay đổi        |
| Codebase map         | Tự động inject project context        |
| 6-agent code review  | Parallel, multi-aspect analysis       |
| Checkpoint system    | Easy undo/restore                     |
| Session hook control | Temporarily disable hooks per session |
| Thinking enhancement | Invisible reasoning boost             |
| External LLM support | Extract prompts cho other tools       |
| Profile hooks        | Measure performance impact            |

## Nhược điểm

| Nhược điểm        | Mô tả                                    |
| ----------------- | ---------------------------------------- |
| Max plan required | Cần Claude Code Max plan cho token usage |
| Node.js 20+       | Yêu cầu Node.js 20+                      |
| Hook overhead     | Nhiều hooks có thể làm chậm workflow     |
| Smaller ecosystem | Ít agents/skills hơn ECC                 |
| No session memory | Không có cross-session memory built-in   |

## Sử dụng khi nào

- **TypeScript-heavy projects**: Cần real-time type checking
- **Code quality focus**: Muốn automated guards và reviews
- **Spec-driven development**: Muốn structured implementation workflow
- **Team environments**: Cần consistent quality standards
- **Hook profiling**: Muốn optimize hook performance

---

**Tài liệu tham khảo**:

- [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit)
- [npm: claudekit](https://www.npmjs.com/package/claudekit)
