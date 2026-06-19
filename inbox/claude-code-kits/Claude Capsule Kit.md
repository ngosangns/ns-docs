---
type: Note
title: Claude Capsule Kit
description: Claude Capsule Kit (CCK) - Engineering Toolkit cho Claude Code
timestamp: '2026-06-19T13:43:26.089Z'
tags:
  - inbox
resource: https://github.com/arpitnath/claude-capsule-kit
---
# Claude Capsule Kit (CCK) - Engineering Toolkit cho Claude Code

## Định nghĩa

**Claude Capsule Kit** là một toolkit nâng cao cho Claude Code giải quyết các vấn đề thực tế: session isolation, dependency awareness, large file navigation, và parallel multi-branch work. Được xây dựng hoàn toàn trên Claude Code's official hook system - không patch, không hack.

## Thông tin cơ bản

| Thông tin        | Giá trị                                              |
| ---------------- | ---------------------------------------------------- |
| **Stars**        | 75                                                   |
| **Forks**        | 8                                                    |
| **Contributors** | 4                                                    |
| **Languages**    | Shell 50.2%, JavaScript 36.3%, Go 11.8%, Python 1.3% |
| **License**      | MIT                                                  |
| **Version**      | v3.0.4                                               |

## Cài đặt

```bash
npm install -g claude-capsule-kit
cck setup
```

Restart Claude Code. Everything activates automatically via hooks.

## Architecture

```
claude-capsule-kit/
├── agents/         # 18 specialist agents
├── bin/            # CLI binaries
├── commands/       # Slash commands
├── crew/           # Crew team management
├── docs/           # Documentation
├── hooks/          # 6 lifecycle hooks
├── lib/            # Core libraries (blink-query)
├── scripts/        # Utility scripts
├── skills/         # Auto-trigger skills
├── templates/      # Project templates
└── tools/          # Dependency tools (Go)
```

## Core Features

### 1. Session Memory

Hooks capture mỗi file read, edit, và agent invocation vào local SQLite database (blink-query).

| Event               | What happens                            |
| ------------------- | --------------------------------------- |
| Read/edit file      | Operation logged to capsule.db          |
| Session ends        | Summary saved with branch context       |
| Next session starts | Previous context restored automatically |
| Context fills up    | Continuity doc saved before compaction  |
| Switch branches     | Context switches with you               |

### 2. Dependency Tools

| Tool              | What it answers                             |
| ----------------- | ------------------------------------------- |
| `query-deps`      | What does this file import? Who imports it? |
| `impact-analysis` | What breaks if I change this file?          |
| `find-circular`   | Are there circular dependencies?            |
| `find-dead-code`  | What code is never imported?                |

### 3. Large File Navigation

Progressive reader parses AST và splits files vào navigable chunks:

- 75-97% token savings on large files
- Supports TypeScript, JavaScript, Python, Go

```bash
progressive-reader --path src/huge-file.ts --list     # See structure
progressive-reader --path src/huge-file.ts --chunk 3   # Read specific section
```

### 4. 18 Specialist Agents

| Agent                  | Chức năng                              |
| ---------------------- | -------------------------------------- |
| error-detective        | Root cause analysis                    |
| debugger               | Step-through debugging                 |
| code-reviewer          | Pre-commit review                      |
| architecture-explorer  | Codebase architecture                  |
| refactoring-specialist | Safe refactoring plans                 |
| security-engineer      | Threat modeling                        |
| database-navigator     | Schema exploration                     |
| database-architect     | Schema design, indexing                |
| git-workflow-manager   | Branching strategies                   |
| system-architect       | Scalability analysis                   |
| devops-sre             | Production readiness                   |
| brainstorm-coordinator | Multi-perspective design               |
| context-librarian      | Context retrieval from capsule records |
| context-manager        | Context optimization                   |
| github-issue-tracker   | GitHub issue management                |
| session-summarizer     | Cross-device continuation              |
| agent-developer        | Custom agent debugging                 |

### 5. Crew Teams

Parallel agent teams, mỗi teammate làm việc trên riêng git branch via worktrees.

```json
{
  "team": {
    "name": "my-feature",
    "teammates": [
      { "name": "backend", "branch": "feat/api", "role": "developer", "focus": "Build REST API" },
      { "name": "frontend", "branch": "feat/ui", "role": "developer", "focus": "Build React UI" }
    ]
  }
}
```

**Roles**: `developer` (sonnet, auto-commit) | `reviewer` (sonnet, read-only) | `tester` (haiku, auto-commit) | `architect` (opus, read-only)

## Hooks

| Hook         | Trigger           | Chức năng                                        |
| ------------ | ----------------- | ------------------------------------------------ |
| SessionStart | Claude starts     | Restore context, inject discoveries, detect crew |
| PostToolUse  | After tool use    | Capture file ops to capsule.db                   |
| PreToolUse   | Before tool use   | Enforce dependency tools, block large files      |
| PreCompact   | Before compaction | Save session continuity doc                      |
| SessionEnd   | Session ends      | Save summary with branch, file count             |
| Stop         | Response stops    | Quality check                                    |

## CLI Commands

```bash
cck setup              # Install hooks, tools, context
cck teardown           # Remove CCK (keeps data)
cck status             # Show what's installed
cck build              # Build Go binaries
cck stats <cmd>        # Usage analytics
cck prune [days]       # Clean old records

cck crew init          # Create .crew-config.json
cck crew start         # Launch team
cck crew stop          # Stop team
cck crew status        # Show team state
cck crew doctor        # Check teammate health
cck crew merge-preview # Preview branch merges
cck crew merge         # Execute branch merges
cck crew decompose     # Dependency-aware task splitting
```

## Tech Stack

| Component          | Technology                          |
| ------------------ | ----------------------------------- |
| Storage            | SQLite (capsule.db) via blink-query |
| Dependency Scanner | Go binary                           |
| Progressive Reader | Go binary                           |
| Hooks              | Shell + JavaScript                  |
| CLI                | Node.js                             |

## Requirements

- Node.js 18+
- Claude Code with hooks support
- Git
- Go 1.20+ (optional, for dependency scanner)

## Ưu điểm

| Ưu điểm               | Mô tả                                    |
| --------------------- | ---------------------------------------- |
| Session memory        | Context survives across sessions tự động |
| Dependency awareness  | Import graph built trước, instant query  |
| Large file navigation | 75-97% token savings                     |
| Crew teams            | Real parallel multi-branch work          |
| Automatic operation   | Zero configuration, hooks do everything  |
| Data preservation     | Uninstall keeps capsule.db               |

## Nhược điểm

| Nhược điểm      | Mô tả                               |
| --------------- | ----------------------------------- |
| Small community | Chỉ 75 stars, 4 contributors        |
| Go dependency   | Cần Go 1.20+ cho dependency scanner |
| SQLite storage  | Don't scale cho very large projects |
| Limited agents  | 18 agents, ít hơn ECC               |
| No MCP support  | Không có tích hợp MCP               |

## Sử dụng khi nào

- **Long coding sessions**: Cần session continuity across restarts
- **Dependency-heavy projects**: Cần import graph awareness
- **Large codebases**: Files > 50KB cần progressive reading
- **Parallel features**: Muốn làm nhiều features song song với crew teams
- **Zero-config preference**: Muốn everything automatic qua hooks

---

**Tài liệu tham khảo**:

- [arpitnath/claude-capsule-kit](https://github.com/arpitnath/claude-capsule-kit)
- [npm: claude-capsule-kit](https://www.npmjs.com/package/claude-capsule-kit)
- [blink-query](https://github.com/arpitnath/blink-query)
