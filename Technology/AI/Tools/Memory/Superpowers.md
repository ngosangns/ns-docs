---
area: technology
domain: agent-skills
type: tool
title: Superpowers
description: An agentic skills framework and software development methodology that gives coding agents a complete brainstorm-to-merge workflow built on composable skills.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - agent-skills
  - memory
  - code-intelligence
resource: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
---

# Superpowers

## Definition

**Superpowers** is a complete software development workflow for coding agents, built on composable "skills" and initial instructions that make sure agents use them automatically. The agent asks what you are trying to do before writing code, rather than jumping straight into it.

## Installation

### Claude Code (Official Marketplace)

```
/plugin install superpowers@claude-plugins-official
```

### Claude Code (Plugin Marketplace)

```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

### Cursor

```
/add-plugin superpowers
```

Or search for "superpowers" in the plugin marketplace.

### Codex

```
Fetch from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
```

### OpenCode

```
Fetch from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

### GitHub Copilot CLI

```
copilot plugin marketplace add obra/superpowers-marketplace
copilot plugin install superpowers@superpowers-marketplace
```

### Gemini CLI

```
gemini extensions install https://github.com/obra/superpowers
```

### Verify Installation

Start a new session and ask something that triggers a skill:

- "help me plan this feature"
- "let's debug this issue"

## The 7-Step Basic Workflow

### brainstorming

- Activates **before writing code**
- Refines rough ideas through Socratic questions
- Explores alternatives
- Presents design in sections for validation
- Saves design document

### using-git-worktrees

- Activates **after design approval**
- Creates isolated workspace on new branch
- Runs project setup
- Verifies clean test baseline

### writing-plans

- Activates **with approved design**
- Breaks work into bite-sized tasks (2-5 minutes each)
- Every task has exact file paths
- Complete code with verification steps

### subagent-driven-development / executing-plans

- Activates **with plan**
- Dispatches fresh subagent per task
- Two-stage review: spec compliance → code quality
- Or executes in batches with human checkpoints

### test-driven-development

- Activates **during implementation**
- Enforces RED-GREEN-REFACTOR:
  - Write failing test
  - Watch it fail
  - Write minimal code
  - Watch it pass
  - Commit
- Deletes code written before tests

### requesting-code-review

- Activates **between tasks**
- Reviews against plan
- Reports issues by severity
- Critical issues block progress

### finishing-a-development-branch

- Activates **when tasks complete**
- Verifies tests
- Presents options: merge/PR/keep/discard
- Cleans up worktree

## Skills Library

### Testing

- **test-driven-development** - RED-GREEN-REFACTOR cycle

### Debugging

- **systematic-debugging** - 4-phase root cause process
- **verification-before-completion** - Ensure it's actually fixed

### Collaboration

- **brainstorming** - Socratic design refinement
- **writing-plans** - Detailed implementation plans
- **executing-plans** - Batch execution with checkpoints
- **dispatching-parallel-agents** - Concurrent subagent workflows
- **requesting-code-review** - Pre-review checklist
- **receiving-code-review** - Responding to feedback
- **using-git-worktrees** - Parallel development branches
- **finishing-a-development-branch** - Merge/PR decision workflow
- **subagent-driven-development** - Two-stage review

### Meta

- **writing-skills** - Create new skills
- **using-superpowers** - Introduction

## Philosophy

- **Test-Driven Development** - Write tests first, always
- **Systematic over ad-hoc** - Process over guessing
- **Complexity reduction** - Simplicity as primary goal
- **Evidence over claims** - Verify before declaring success

## Updating

```
/plugin update superpowers
```

## Tech Stack

| Language   | Percentage |
| ---------- | ---------- |
| Shell      | 58.8%      |
| JavaScript | 29.6%      |
| HTML       | 4.3%       |
| Python     | 3.7%       |
| TypeScript | 2.8%       |
| Batchfile  | 0.8%       |

## Supported Platforms

- Claude Code
- Cursor
- Codex
- OpenCode
- GitHub Copilot CLI
- Gemini CLI

## Strengths

| Strength          | Description                             |
| ----------------- | --------------------------------------- |
| Complete workflow | The whole SDLC from brainstorm to merge |
| Composable skills | Reusable and extensible                 |
| TDD-focused       | Ensures test quality                    |
| Multi-platform    | Supports many AI editors                |
| Subagent support  | Autonomous work with review             |

## Weaknesses

| Weakness            | Description                            |
| ------------------- | -------------------------------------- |
| Process overhead    | Can be slow for small tasks            |
| Learning curve      | Requires understanding the methodology |
| Not a memory system | Focused on workflow, not memory        |

## When to Use

- **Complex projects**: Need a systematic approach
- **Team workflows**: Standardized development process
- **TDD focus**: When test quality matters
- **Multi-agent development**: Subagent orchestration
- **Code review automation**: Structured review process
- **Long-term projects**: With maintainability requirements

---

**References**:

- [obra/superpowers](https://github.com/obra/superpowers)

> **See also:** [Think Better](/Technology/AI/Tools/Memory/Think Better) · [Knowns](/Technology/AI/Tools/Memory/Knowns) · [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison)
