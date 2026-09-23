---
area: technology
domain: claude-code
type: guide
title: Claude Code Memory Analysis
description: An evaluation of Claude Code's built-in memory system (CLAUDE.md and auto memory) versus the Claude-Mem plugin, with guidance on when the plugin is worth adding.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - claude-code
  - memory
  - code-intelligence
resource: https://code.claude.com/docs/en/memory
---

# Claude Code Memory Analysis

## Overview

This document analyzes the memory structure of Claude Code (the stock version) and evaluates whether the claude-mem plugin is necessary.

---

## Claude Code Memory Structure

Claude Code has **two main memory mechanisms**, available since v2.1.59:

### CLAUDE.md Files

| Type           | Location                                                    | Scope                  |
| -------------- | ----------------------------------------------------------- | ---------------------- |
| Managed policy | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Organization-wide      |
| Project        | `./CLAUDE.md` or `./.claude/CLAUDE.md`                      | Team                   |
| User           | `~/.claude/CLAUDE.md`                                       | Personal, all projects |
| Local          | `./CLAUDE.local.md`                                         | A specific project     |

**Characteristics:**

- Written in markdown, created by the user
- Loaded into every session (first 200 lines or first 25KB)
- Applies to: build commands, coding standards, architectural decisions
- **Not automatic** - the user has to write it by hand
- Additional files can be imported with `@path/to/file`
- Supports `.claude/rules/` for path-specific instructions

### Auto Memory

```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # Index, loaded into every session
├── debugging.md       # Notes on debugging patterns
├── api-conventions.md # API design decisions
└── ...                # Other topic files
```

**Characteristics:**

- **Automatic** - Claude records knowledge on its own
- Only the first 200 lines or first 25KB of MEMORY.md are loaded
- Topic files are read on demand
- Machine-local (not synced across machines)
- Requires Claude Code v2.1.59+

**When Claude remembers things:**

- Build commands
- Debugging insights
- Architecture notes
- Code style preferences
- Workflow habits

### CLAUDE.md vs Auto Memory

| Criterion    | CLAUDE.md                   | Auto Memory                          |
| ------------ | --------------------------- | ------------------------------------ |
| **Author**   | The user                    | Claude, automatically                |
| **Content**  | Instructions and rules      | Learnings and patterns               |
| **Scope**    | Project/User/Org            | Per working tree                     |
| **Loaded**   | Every session (in full)     | Every session (first 200 lines/25KB) |
| **Use case** | Coding standards, workflows | Build commands, preferences          |

---

## Additional Claude Code Features

### Skills System

- Loaded on demand when invoked
- Used for task-specific instructions
- Not memory, but complements the workflow

### Hooks System

- `InstructionsLoaded` - Log which files were loaded
- PreToolUse, PostToolUse hooks
- Session lifecycle hooks

### Settings

- `autoMemoryEnabled` - Toggle auto memory
- `autoMemoryDirectory` - Custom storage location
- `claudeMdExcludes` - Exclude specific CLAUDE.md files

---

## Claude-Mem: What Does It Add?

### Claude-Mem Architecture

```
┌─────────────────────────────────────────────┐
│           Claude-Mem System                │
├─────────────────────────────────────────────┤
│  5 Lifecycle Hooks:                         │
│  - SessionStart                             │
│  - UserPromptSubmit                         │
│  - PostToolUse                              │
│  - Stop                                     │
│  - SessionEnd                               │
├─────────────────────────────────────────────┤
│  Worker Service (port 37777)               │
│  - Web Viewer UI                           │
│  - 10 search endpoints                     │
├─────────────────────────────────────────────┤
│  SQLite + ChromaDB                          │
│  - Sessions, observations, summaries      │
│  - Hybrid semantic + keyword search         │
└─────────────────────────────────────────────┘
```

### Unique Claude-Mem Features

| Feature                    | Description                                               |
| -------------------------- | --------------------------------------------------------- |
| **AI Compression**         | Automatically compresses observations with AI             |
| **3-Layer Search**         | search → timeline → get_observations (~10x token savings) |
| **Progressive Disclosure** | Layered retrieval with token cost visibility              |
| **Web Viewer**             | Real-time memory stream at localhost:37777                |
| **Skill-Based Search**     | `mem-search` skill for natural language queries           |
| **Privacy Control**        | `<private>` tags to exclude sensitive content             |
| **Vector Search**          | ChromaDB for semantic search                              |
| **Beta Features**          | Endless Mode, etc.                                        |

### Key Differences

| Aspect                 | Stock Claude Code               | Claude-Mem                        |
| ---------------------- | ------------------------------- | --------------------------------- |
| **Capture**            | Auto (build commands, insights) | Auto (every tool use observation) |
| **Compression**        | No                              | AI-powered                        |
| **Search**             | File-based                      | Vector + keyword hybrid           |
| **Token optimization** | No                              | 10x savings                       |
| **UI**                 | No                              | Web viewer                        |
| **Storage**            | Markdown files                  | SQLite + ChromaDB                 |
| **Privacy tags**       | No                              | Yes (`<private>`)                 |
| **Timeline context**   | No                              | Yes                               |

---

## Assessment: Is Claude-Mem Necessary?

### When Claude-Mem **Is Worth It (Use It)**

| Scenario                  | Reason                                  |
| ------------------------- | --------------------------------------- |
| **Long-running projects** | Maintains context across many sessions  |
| **Large codebases**       | 10x token savings matter                |
| **Need semantic search**  | Search using natural language           |
| **Detailed history**      | Stores every tool use observation       |
| **Privacy concerns**      | `<private>` tags for control            |
| **Multi-machine**         | Persistence across machines (with sync) |
| **Complex debugging**     | Timeline context for errors             |

### When Stock Claude Code **Is Enough**

| Scenario             | Reason                                      |
| -------------------- | ------------------------------------------- |
| **Simple projects**  | CLAUDE.md + auto memory are enough          |
| **Short sessions**   | No need for persistent context              |
| **Token budget OK**  | No need for 10x optimization                |
| **Privacy-first**    | Claude Code is local-only, nothing external |
| **Minimal setup**    | No extra dependencies needed                |
| **Team shared docs** | CLAUDE.md in git is enough                  |

### Cost and Complexity Comparison

| Factor             | Claude Code | Claude-Mem                       |
| ------------------ | ----------- | -------------------------------- |
| **Installation**   | Built-in    | `npx claude-mem install`         |
| **Dependencies**   | None        | Node.js 18+, Bun, SQLite, Chroma |
| **Resources**      | Minimal     | Worker service, database         |
| **Maintenance**    | None        | Needs periodic updates           |
| **Learning curve** | Low         | Medium                           |

---

## Recommendations

### Use **Claude Code alone** when:

```bash
# You only need:
- CLAUDE.md for coding standards
- Auto memory for build commands
- Simple, minimal setup
- No semantic search
- Token budget is not an issue
```

```markdown
# A simple CLAUDE.md

## Build

- Run `npm test` before committing

## Code Style

- Use 2-space indentation
- Prefer const over let

## Project

- API handlers in src/api/
```

### Use **Claude-Mem** when:

```bash
# You need:
- Search such as "where did we fix that auth bug?"
- 10x token reduction for large projects
- Detailed storage of every session
- Timeline context for debugging
- Privacy controls with <private> tags
```

### Decision Matrix

| Need                           | Recommendation                   |
| ------------------------------ | -------------------------------- |
| Project instructions           | CLAUDE.md (enough)               |
| Build commands                 | Auto memory (enough)             |
| Complex project memory         | CLAUDE.md + Auto memory (enough) |
| Semantic search across history | Claude-Mem                       |
| Token optimization             | Claude-Mem                       |
| Detailed tool-use history      | Claude-Mem                       |
| Simple setup                   | Claude Code                      |

---

## Conclusion

### Claude-Mem is **not necessary** if:

1. You only need basic project instructions → **CLAUDE.md is enough**
2. You want Claude to remember build commands → **Auto memory is enough**
3. You prefer simplicity and no extra dependencies
4. Token budget is not an issue
5. The project is not very large

### Claude-Mem is **worth using** if:

1. You need semantic search across history
2. Token optimization matters (10x savings)
3. You want detailed storage of every observation
4. You need timeline context for debugging
5. You want privacy controls with `<private>` tags
6. You work across multiple machines

### Summary

```
Claude Code (stock) = 80% of the functionality for 20% of the effort
Claude-Mem = 100% of the functionality for 100% of the effort

→ Start with stock Claude Code
→ Add Claude-Mem when you need advanced features
```

---

## References

- [Claude Code Memory Documentation](https://code.claude.com/docs/en/memory)
- [Claude-Mem GitHub](https://github.com/thedotmack/claude-mem)
- [Claude Code Settings](https://code.claude.com/docs/en/settings)

---

_Generated: 2026-04-13_
_Analysis based on official Claude Code documentation and Claude-Mem repository_

> **See also:** [Claude Mem](/Technology/AI/Tools/Memory/Claude Mem) · [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison)
