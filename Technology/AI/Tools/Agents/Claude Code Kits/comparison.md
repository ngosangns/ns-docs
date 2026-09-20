---
area: technology
domain: ai-ml
topic: coding-agents
type: resource
title: Comparison
description: So sánh 7 Claude Code Toolkits & Enhancement Systems
timestamp: '2026-06-19T13:43:26.090Z'
tags:
  - technology
  - ai-ml
  - coding-agents
  - claude-code
resource: https://github.com/affaan-m/everything-claude-code
---
# So sánh 7 Claude Code Toolkits & Enhancement Systems

## Tổng quan Category

| Category                      | Công cụ                     |
| ----------------------------- | --------------------------- |
| **Full Ecosystem**            | everything-claude-code      |
| **Engineering Toolkit**       | claude-capsule-kit          |
| **Guardrails & Automation**   | claudekit (carlrannaberg)   |
| **Task Management**           | claude-task-master          |
| **CLI & Dashboard**           | claudekit-cli (mrgoonie)    |
| **Skills Collection**         | claudekit-skills (mrgoonie) |
| **Multi-agent Orchestration** | oh-my-claudecode            |

---

## 1. So sánh tổng quan

### 1.1 Basic Info

| Công cụ                    | Stars | Forks | License              | Primary Language |
| -------------------------- | ----: | ----: | -------------------- | ---------------- |
| **everything-claude-code** |  154k | 23.9k | MIT                  | TypeScript       |
| **oh-my-claudecode**       | 28.4k |  2.6k | MIT                  | TypeScript       |
| **claude-task-master**     | 26.5k |  2.5k | MIT + Commons Clause | JavaScript       |
| **claudekit-skills**       |    2k |   391 | MIT                  | Python           |
| **claudekit**              |   657 |   105 | MIT                  | TypeScript       |
| **claudekit-cli**          |    95 |    41 | MIT                  | TypeScript       |
| **claude-capsule-kit**     |    75 |     8 | MIT                  | Shell/JS/Go      |

**Nhận xét:**

- **ECC** dẫn đầu với 154k stars, là toolkit lớn nhất
- **OMC** và **Task Master** đều > 25k stars, community rất lớn
- **CCK** nhỏ nhất nhưng có unique features (session memory, crew teams)

---

### 1.2 Primary Focus

| Công cụ                    | Primary Focus                                     | Secondary Focus                                      |
| -------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| **everything-claude-code** | Complete ecosystem (agents, skills, rules, hooks) | Multi-harness, multi-language, security              |
| **claude-capsule-kit**     | Session memory & dependency analysis              | Large file navigation, crew teams                    |
| **claudekit**              | Real-time error prevention & code review          | Checkpoints, codebase map, spec implementation       |
| **claude-task-master**     | Task management (PRD -> tasks)                    | Multi-editor MCP integration                         |
| **claudekit-cli**          | Project management CLI & dashboard                | GitHub automation, content generation                |
| **claudekit-skills**       | Specialized domain skills                         | Document processing, payments, AI/ML                 |
| **oh-my-claudecode**       | Multi-agent orchestration                         | Cross-provider (Claude+Codex+Gemini), deep interview |

---

## 2. So sánh theo Features

### 2.1 Core Features Matrix

| Feature                 |      ECC       |        CCK        |    ClaudeKit     |  Task Master   |     CK-CLI      |     CK-Skills      |          OMC           |
| ----------------------- | :------------: | :---------------: | :--------------: | :------------: | :-------------: | :----------------: | :--------------------: |
| **Agents/Subagents**    |      38+       |        18         |       15+        |       -        |        -        |         -          |           19           |
| **Skills**              |      181+      |         7         |        -         |       -        |        -        |        30+         |         Custom         |
| **Slash Commands**      |      72+       |        6+         |       12+        |       -        |       16        |         -          |          10+           |
| **Hooks**               | Full lifecycle |      6 hooks      |    10+ hooks     |       -        |        -        |         -          |       Callbacks        |
| **Session Memory**      |   Via hooks    | Built-in (SQLite) |        -         |       -        |        -        |         -          |        Sessions        |
| **Code Review**         |  Agent-based   |    Agent-based    | 6-agent parallel |       -        |        -        |    Skill-based     |      Agent-based       |
| **Checkpoints**         |       -        |         -         | Git checkpoints  |       -        |        -        |         -          |           -            |
| **Error Prevention**    |  Rules-based   |    PreToolUse     | Real-time guards |       -        |        -        |         -          |           -            |
| **Multi-provider**      | Multi-harness  |    Claude only    |   Claude only    | 10+ providers  |        -        |         -          |  Claude+Codex+Gemini   |
| **MCP Server**          |    Configs     |         -         |        -         |    36 tools    |        -        |         -          |           -            |
| **Task Management**     |       -        |         -         |  Spec workflow   | Full PRD-based |        -        |         -          |     Team pipeline      |
| **Crew/Team**           |       -        |    Crew teams     |        -         |       -        |        -        |         -          |       Team mode        |
| **Codebase Map**        |       -        | Dependency graph  |   Auto-inject    |       -        |        -        |         -          |           -            |
| **Document Processing** |       -        |         -         |        -         |       -        |        -        | docx/pdf/pptx/xlsx |           -            |
| **Dashboard/GUI**       |    Tkinter     |         -         |        -         |       -        | React dashboard |         -          |     HUD statusline     |
| **Notifications**       |       -        |         -         |        -         |       -        |        -        |         -          | Telegram/Discord/Slack |

---

### 2.2 Integration & Platform Support

| Platform           | ECC  | CCK  | ClaudeKit | Task Master | CK-CLI | CK-Skills |     OMC      |
| ------------------ | :--: | :--: | :-------: | :---------: | :----: | :-------: | :----------: |
| **Claude Code**    | Full | Full |   Full    |     MCP     |  Full  |  Plugin   |     Full     |
| **Cursor**         | Full |  -   |     -     |     MCP     |   -    |     -     |      -       |
| **Codex CLI**      | Full |  -   |     -     |     MCP     |   -    |     -     | tmux workers |
| **OpenCode**       | Full |  -   |     -     |      -      |   -    |     -     |      -       |
| **Gemini**         | Full |  -   |     -     |     MCP     |   -    |     -     | tmux workers |
| **Windsurf**       |  -   |  -   |     -     |     MCP     |   -    |     -     |      -       |
| **VS Code**        |  -   |  -   |     -     |     MCP     |   -    |     -     |      -       |
| **GitHub Copilot** |  -   |  -   |     -     |      -      |   -    |     -     |      -       |

---

### 2.3 Orchestration & Multi-Agent

| Feature                  |    ECC    |      CCK       |   ClaudeKit    | Task Master  |         OMC         |
| ------------------------ | :-------: | :------------: | :------------: | :----------: | :-----------------: |
| **Subagent delegation**  | 38 agents |   18 agents    |   15 agents    |      -       |      19 agents      |
| **Parallel execution**   |     -     |   Crew teams   | 6-agent review |      -       |  Team + Ultrawork   |
| **Cross-provider**       |     -     |       -        |       -        |      -       | Claude+Codex+Gemini |
| **Staged pipeline**      |     -     |       -        | Spec workflow  | PRD pipeline |    Team pipeline    |
| **Git worktrees**        |     -     | Crew worktrees |       -        |      -       |          -          |
| **Persistent execution** |     -     |       -        |       -        |      -       |     Ralph mode      |

---

## 3. So sánh theo Architecture

### 3.1 Storage & Data

| Công cụ         | Storage                    | Memory System             | Data Persistence        |
| --------------- | -------------------------- | ------------------------- | ----------------------- |
| **ECC**         | File-based                 | Hook-based session memory | Skills, rules, agents   |
| **CCK**         | SQLite (capsule.db)        | Built-in session memory   | blink-query namespaces  |
| **ClaudeKit**   | File-based                 | -                         | Checkpoints (git)       |
| **Task Master** | File-based (.taskmaster/)  | -                         | Tasks, PRD              |
| **CK-CLI**      | File-based + JSON registry | -                         | Projects registry       |
| **CK-Skills**   | File-based (skills/)       | -                         | Markdown skills         |
| **OMC**         | File-based (.omc/)         | Session files             | Skills, sessions, state |

### 3.2 Tech Stack

| Công cụ         | Language                           | Runtime               | Key Dependencies       |
| --------------- | ---------------------------------- | --------------------- | ---------------------- |
| **ECC**         | TypeScript, Python, Go, Java, Rust | Node.js 18+           | Multi-language         |
| **CCK**         | Shell, JavaScript, Go              | Node.js 18+, Go 1.20+ | SQLite, blink-query    |
| **ClaudeKit**   | TypeScript                         | Node.js 20+           | Vitest, Biome          |
| **Task Master** | JavaScript, TypeScript             | Node.js               | Turborepo, MCP         |
| **CK-CLI**      | TypeScript                         | Node.js (Bun dev)     | React dashboard        |
| **CK-Skills**   | Python, JavaScript                 | -                     | Claude Code skills API |
| **OMC**         | TypeScript                         | Node.js               | tmux                   |

---

## 4. So sánh theo Use Case

### 4.1 Best For

| Use Case                           | Best Choice | Reason                                        |
| ---------------------------------- | ----------- | --------------------------------------------- |
| **Enterprise multi-language team** | ECC         | 12+ languages, 38 agents, security scanning   |
| **Session continuity**             | CCK         | SQLite memory, auto-restore context           |
| **Code quality enforcement**       | ClaudeKit   | Real-time guards, 6-agent review, checkpoints |
| **Task/project management**        | Task Master | PRD-based, multi-editor, MCP integration      |
| **CLI project management**         | CK-CLI      | Dashboard, doctor, skills migration           |
| **Domain-specific skills**         | CK-Skills   | 30+ specialized skills, document processing   |
| **Multi-agent orchestration**      | OMC         | Team mode, cross-provider, deep interview     |
| **Cross-provider workflows**       | OMC         | Claude + Codex + Gemini via tmux              |
| **Dependency analysis**            | CCK         | Go-based dependency scanner, impact analysis  |
| **Large file handling**            | CCK         | Progressive AST reader, 75-97% token savings  |
| **Spec-driven development**        | ClaudeKit   | 6-phase spec workflow                         |
| **Payment integration**            | CK-Skills   | 5 payment providers                           |
| **Zero-config setup**              | OMC / CCK   | Auto-activate via hooks                       |

---

## 5. Maturity & Community

| Metric                 |         ECC |    CCK | ClaudeKit | Task Master |      CK-CLI | CK-Skills |         OMC |
| ---------------------- | ----------: | -----: | --------: | ----------: | ----------: | --------: | ----------: |
| **GitHub Stars**       |        154k |     75 |       657 |       26.5k |          95 |        2k |       28.4k |
| **Forks**              |       23.9k |      8 |       105 |        2.5k |          41 |       391 |        2.6k |
| **Contributors**       |        170+ |      4 |         - |       Large |           - |         - |   5+ active |
| **npm downloads**      |        High |    Low |    Medium |   Very High |         Low |         - |        High |
| **Active development** | Very active | Active |    Active | Very active | Very active |    Active | Very active |

---

## 6. Combinations & Recommendations

### 6.1 Compatible Combinations

| Combination                 | Why                                         |
| --------------------------- | ------------------------------------------- |
| **Task Master + OMC**       | Task management + multi-agent orchestration |
| **CCK + ClaudeKit**         | Session memory + real-time guards           |
| **ECC standalone**          | Complete ecosystem, no additions needed     |
| **CK-Skills + any toolkit** | Skills enhance any setup                    |
| **CK-CLI + CK-Skills**      | CLI management + skills content             |
| **OMC + CCK**               | Orchestration + session memory              |

### 6.2 Quick Selection Guide

```
Bạn cần gì?
│
├── Complete ecosystem, all-in-one
│   └── everything-claude-code
│
├── Multi-agent orchestration
│   └── oh-my-claudecode
│
├── Task management
│   └── claude-task-master
│
├── Code quality & guards
│   └── claudekit
│
├── Session memory & dependency analysis
│   └── claude-capsule-kit
│
├── Specialized domain skills
│   └── claudekit-skills
│
└── CLI project management
    └── claudekit-cli
```

---

**Tài liệu tham khảo**:

- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) - 154k stars
- [arpitnath/claude-capsule-kit](https://github.com/arpitnath/claude-capsule-kit) - 75 stars
- [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) - 657 stars
- [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) - 26.5k stars
- [mrgoonie/claudekit-cli](https://github.com/mrgoonie/claudekit-cli) - 95 stars
- [mrgoonie/claudekit-skills](https://github.com/mrgoonie/claudekit-skills) - 2k stars
- [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) - 28.4k stars
