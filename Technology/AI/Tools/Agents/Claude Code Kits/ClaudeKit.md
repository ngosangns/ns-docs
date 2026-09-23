---
area: technology
domain: claude-code
type: tool
title: ClaudeKit
description: ClaudeKit is a Claude Code toolkit offering smart guardrails, real-time error prevention, expert subagents, and spec-driven workflow automation.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - claude-code
  - coding-agents
resource: https://github.com/carlrannaberg/claudekit
---

# ClaudeKit

## Definition

**ClaudeKit** is a toolkit that provides smart guardrails and workflow automation for Claude Code. It catches errors in real time, saves checkpoints, and strengthens AI coding with expert subagents. It stands out for its automatic codebase map, 6-agent parallel code review, and spec-driven development workflow.

## Basic Information

| Item          | Value                                          |
| ------------- | ---------------------------------------------- |
| **Stars**     | 657                                            |
| **Forks**     | 105                                            |
| **Languages** | TypeScript 84.3%, Shell 10.9%, JavaScript 4.8% |
| **License**   | MIT                                            |
| **Version**   | v0.9.5                                         |

## Installation

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

### Instant Codebase Navigation

Claude sees the entire project structure automatically, skipping most discovery searches.

- Navigate directly to code
- No trial-and-error
- Confident code access
- See relationships & dependencies
- Automatic setup, updates as you code

### Comprehensive Code Review

6 parallel agents analyze the code:

| Agent                  | Focus                       |
| ---------------------- | --------------------------- |
| Architecture reviewer  | Design patterns, structure  |
| Security reviewer      | Vulnerabilities, OWASP      |
| Performance reviewer   | Optimization opportunities  |
| Testing reviewer       | Coverage, test quality      |
| Quality reviewer       | Code smells, best practices |
| Documentation reviewer | Completeness, clarity       |

### Git Checkpoint System

- Auto-saves checkpoints when Claude stops
- `/checkpoint:restore` to undo changes
- List, restore, or clean up checkpoints

### Real-time Error Prevention

| Guard            | Function                           |
| ---------------- | ---------------------------------- |
| TypeScript Guard | Block `any` types                  |
| Linting          | Catch style issues immediately     |
| Anti-patterns    | Prevent code->comments replacement |
| Test Runner      | Run tests on file changes          |
| File Security    | 195+ patterns, 12 categories       |

### Enhanced AI Reasoning

- 4 configurable thinking levels (0-3)
- < 5ms overhead
- Session-aware, activates on first prompt

### AI Subagents

| Agent              | Function                              |
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

### Iterative Spec Implementation

6-phase workflow: Implementation -> Test Writing -> Code Review -> Iterative Improvement -> Commit -> Progress Tracking

## Hooks

| Hook              | Event             | Function                    |
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

| Command                           | Function                 |
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

## Pros

| Pro                  | Description                           |
| -------------------- | ------------------------------------- |
| Real-time guards     | Catch errors as soon as code changes  |
| Codebase map         | Automatically injects project context |
| 6-agent code review  | Parallel, multi-aspect analysis       |
| Checkpoint system    | Easy undo/restore                     |
| Session hook control | Temporarily disable hooks per session |
| Thinking enhancement | Invisible reasoning boost             |
| External LLM support | Extract prompts for other tools       |
| Profile hooks        | Measure performance impact            |

## Cons

| Con               | Description                                    |
| ----------------- | ---------------------------------------------- |
| Max plan required | Needs the Claude Code Max plan for token usage |
| Node.js 20+       | Requires Node.js 20+                           |
| Hook overhead     | Many hooks can slow the workflow               |
| Smaller ecosystem | Fewer agents/skills than ECC                   |
| No session memory | No built-in cross-session memory               |

## When to Use

- **TypeScript-heavy projects**: Need real-time type checking
- **Code quality focus**: Want automated guards and reviews
- **Spec-driven development**: Want a structured implementation workflow
- **Team environments**: Need consistent quality standards
- **Hook profiling**: Want to optimize hook performance

---

**References**:

- [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit)
- [npm: claudekit](https://www.npmjs.com/package/claudekit)

> **See also:** [Claudekit Cli](/Technology/AI/Tools/Agents/Claude Code Kits/Claudekit Cli) · [Claudekit Skills](/Technology/AI/Tools/Agents/Claude Code Kits/Claudekit Skills) · [Kit Comparison](/Technology/AI/Tools/Agents/Claude Code Kits/Kit Comparison)
