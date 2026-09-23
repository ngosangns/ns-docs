---
area: technology
domain: claude-mem
type: tool
title: Claude Mem
description: Claude-Mem is a persistent memory compression system for Claude Code that captures sessions, compresses them with AI, and injects relevant context into future sessions.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - claude-mem
  - memory
  - code-intelligence
resource: http://localhost:37777
---

# Claude Mem

## Definition

**Claude-Mem** is a persistent memory compression system (v6.5.0) built for Claude Code. It automatically captures everything Claude does in coding sessions, compresses it with AI, and injects relevant context into future sessions.

## System Requirements

- **Node.js**: 18.0.0+
- **Claude Code**: Latest version with plugin support
- **Bun**: JavaScript runtime and process manager (auto-installed)
- **uv**: Python package manager for vector search (auto-installed)
- **SQLite 3**: Bundled

## Installation

```bash
npx claude-mem install
```

Or for Gemini CLI:

```bash
npx claude-mem install --ide gemini-cli
```

Or via plugin marketplace:

```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

Restart Claude Code. Context from previous sessions will automatically appear.

## Architecture

```
┌─────────────────────────────────────────────┐
│           Claude-Mem System                │
├─────────────────────────────────────────────┤
│  ┌─────────────┐  ┌────────────────────┐   │
│  │ 5 Lifecycle │  │   Worker Service   │   │
│  │   Hooks     │  │ (HTTP :37777)      │   │
│  └──────┬──────┘  └─────────┬──────────┘   │
│         │                   │              │
│         └─────────┬─────────┘              │
│                   ▼                        │
│         ┌─────────────────┐               │
│         │   SQLite DB     │               │
│         │ (sessions, obs) │               │
│         └────────┬────────┘               │
│                  │                         │
│         ┌────────┴────────┐               │
│         │ Chroma Vector   │               │
│         │    Database      │               │
│         └─────────────────┘               │
└─────────────────────────────────────────────┘
```

## Lifecycle Hooks

| Hook             | Trigger                   |
| ---------------- | ------------------------- |
| SessionStart     | When Claude Code starts   |
| UserPromptSubmit | When user submits prompt  |
| PostToolUse      | After each tool execution |
| Stop             | When session stops        |
| SessionEnd       | When session ends         |

## MCP Search Tools - 3-Layer Workflow

### Layer 1: Search

```typescript
search((query = "authentication bug"), (type = "bugfix"), (limit = 10))
// Returns: compact index with IDs (~50-100 tokens/result)
```

### Layer 2: Timeline

```typescript
timeline((ids = [123, 456]))
// Returns: chronological context around results
```

### Layer 3: Get Observations

```typescript
get_observations((ids = [123, 456]))
// Returns: full details for filtered IDs (~500-1,000 tokens/result)
```

**~10x token savings** by filtering before fetching details.

## Key Features

| Feature                | Description                                       |
| ---------------------- | ------------------------------------------------- |
| Persistent Memory      | Context survives across sessions                  |
| Progressive Disclosure | Layered retrieval with token cost visibility      |
| Skill-Based Search     | Query project history with the `mem-search` skill |
| Web Viewer UI          | Real-time memory stream at http://localhost:37777 |
| Privacy Control        | Use `<private>` tags to exclude sensitive content |
| Context Configuration  | Fine-grained control over context injection       |
| Automatic Operation    | No manual intervention required                   |
| Citations              | Reference past observations with IDs              |
| Beta Channel           | Experimental features like Endless Mode           |

## Configuration

Settings in `~/.claude-mem/settings.json` (auto-created):

```json
{
  "ai_model": "claude-3-5-sonnet-20241022",
  "worker_port": 37777,
  "data_dir": "~/.claude-mem",
  "log_level": "info",
  "context": {
    "max_tokens": 10000,
    "include_types": ["bugfix", "feature", "refactor"]
  }
}
```

## Web Viewer

Open http://localhost:37777 to:

- View real-time memory stream
- Browse session history
- Search memories
- Configure settings
- Switch between stable/beta channels

## Troubleshooting

Describe problem to Claude - troubleshoot skill will auto-diagnose.

```bash
# Create bug report
cd ~/.claude/plugins/marketplaces/thedotmack
npm run bug-report
```

## Documentation Links

- **Full Documentation**: https://docs.claude-mem.ai/
- **Installation**: https://docs.claude-mem.ai/installation
- **Configuration**: https://docs.claude-mem.ai/configuration
- **Search Tools**: https://docs.claude-mem.ai/usage/search-tools
- **Architecture**: https://docs.claude-mem.ai/architecture/overview

## Tech Stack

| Component       | Technology         |
| --------------- | ------------------ |
| Runtime         | Node.js 18.0.0+    |
| Language        | TypeScript         |
| Process Manager | Bun                |
| Storage         | SQLite 3 with FTS5 |
| Vector DB       | Chroma             |

## License

AGPL 3.0 | PolyForm Noncommercial License for ragtime/

## Pros

| Pro                    | Description                            |
| ---------------------- | -------------------------------------- |
| True persistence       | Genuine context across sessions        |
| Token optimization     | ~10x token savings with 3-layer search |
| Privacy control        | Exclude sensitive content              |
| Progressive disclosure | Layered retrieval with cost visibility |
| Web UI                 | Visual memory stream                   |
| Active development     | Version 6.5.0, regular updates         |

## Cons

| Con                  | Description                          |
| -------------------- | ------------------------------------ |
| Claude Code only     | Only works with Claude Code          |
| Node.js required     | Requires Node.js 18+                 |
| AGPL license         | Copyleft, may cause licensing issues |
| Compression overhead | AI compression adds latency          |

## When to Use

- **Long projects**: Projects that span many sessions
- **Claude Code users**: Primary integration point
- **Token optimization**: When you need to optimize context usage
- **Context continuity**: You don't want to lose context when reconnecting
- **Project history**: Query what happened earlier

---

**References**:

- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
- [Documentation](https://docs.claude-mem.ai/)
- [Discord](https://discord.com/invite/J4wttp9vDu)

> **See also:** [Claude Code Memory Analysis](/Technology/AI/Tools/Memory/Claude Code Memory Analysis) · [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [Mem0](/Technology/AI/Tools/Memory/Mem0)
