---
type: Note
title: Superpowers
description: Superpowers - Agentic Skills Framework & Software Development Methodology
timestamp: '2026-06-19T13:43:26.089Z'
tags:
  - inbox
resource: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
---
# Superpowers - Agentic Skills Framework & Software Development Methodology

## Định nghĩa

**Superpowers** là một complete software development workflow cho coding agents, được xây dựng trên composable "skills" và initial instructions đảm bảo agents sử dụng chúng tự động. Agent sẽ hỏi bạn đang cố làm gì trước khi viết code, không nhảy vào code ngay lập tức.

## Cài đặt

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
Hoặc search "superpowers" trong plugin marketplace.

### Codex

```
Fetch từ https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
```

### OpenCode

```
Fetch từ https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
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

Start new session và ask something triggers a skill:
- "help me plan this feature"
- "let's debug this issue"

## The 7-Step Basic Workflow

### 1. brainstorming
- Activates **before writing code**
- Refines rough ideas through Socratic questions
- Explores alternatives
- Presents design in sections for validation
- Saves design document

### 2. using-git-worktrees
- Activates **after design approval**
- Creates isolated workspace on new branch
- Runs project setup
- Verifies clean test baseline

### 3. writing-plans
- Activates **with approved design**
- Breaks work into bite-sized tasks (2-5 minutes each)
- Every task has exact file paths
- Complete code với verification steps

### 4. subagent-driven-development / executing-plans
- Activates **with plan**
- Dispatches fresh subagent per task
- Two-stage review: spec compliance → code quality
- Or executes in batches with human checkpoints

### 5. test-driven-development
- Activates **during implementation**
- Enforces RED-GREEN-REFACTOR:
  - Write failing test
  - Watch it fail
  - Write minimal code
  - Watch it pass
  - Commit
- Deletes code written before tests

### 6. requesting-code-review
- Activates **between tasks**
- Reviews against plan
- Reports issues by severity
- Critical issues block progress

### 7. finishing-a-development-branch
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
- **executing-plans** - Batch execution với checkpoints
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

| Language | Percentage |
|----------|------------|
| Shell | 58.8% |
| JavaScript | 29.6% |
| HTML | 4.3% |
| Python | 3.7% |
| TypeScript | 2.8% |
| Batchfile | 0.8% |

## Supported Platforms

- Claude Code
- Cursor
- Codex
- OpenCode
- GitHub Copilot CLI
- Gemini CLI

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| Complete workflow | Toàn bộ SDLC từ brainstorm đến merge |
| Composable skills | Tái sử dụng và mở rộng |
| TDD-focused | Đảm bảo test quality |
| Multi-platform | Hỗ trợ nhiều AI editors |
| Subagent support | Autonomous work với review |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| Process overhead | Có thể chậm với những task nhỏ |
| Learning curve | Cần hiểu methodology |
| Không phải memory system | Tập trung vào workflow, không phải memory |

## Sử dụng khi nào

- **Complex projects**: Cần systematic approach
- **Team workflows**: Standardized development process
- **TDD focus**: Khi test quality quan trọng
- **Multi-agent development**: Subagent orchestration
- **Code review automation**: Structured review process
- **Long-term projects**: Với maintainability requirements

---

**Tài liệu tham khảo**: 
- [obra/superpowers](https://github.com/obra/superpowers)
