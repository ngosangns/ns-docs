---
type: Note
title: Claude Mem
description: Claude-Mem - Persistent Memory Compression for Claude Code
timestamp: '2026-06-19T13:43:26.087Z'
tags:
  - inbox
resource: http://localhost:37777
---
# Claude-Mem - Persistent Memory Compression for Claude Code

## Định nghĩa

**Claude-Mem** là một persistent memory compression system (v6.5.0) được xây dựng cho Claude Code. Nó tự động capture mọi thứ Claude làm trong các coding sessions, compress nó bằng AI, và inject relevant context vào các sessions tương lai.

## System Requirements

- **Node.js**: 18.0.0+
- **Claude Code**: Latest version with plugin support
- **Bun**: JavaScript runtime và process manager (auto-installed)
- **uv**: Python package manager for vector search (auto-installed)
- **SQLite 3**: Bundled

## Cài đặt

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

| Hook | Trigger |
|------|---------|
| SessionStart | When Claude Code starts |
| UserPromptSubmit | When user submits prompt |
| PostToolUse | After each tool execution |
| Stop | When session stops |
| SessionEnd | When session ends |

## MCP Search Tools - 3-Layer Workflow

### Layer 1: Search
```typescript
search(query="authentication bug", type="bugfix", limit=10)
// Returns: compact index with IDs (~50-100 tokens/result)
```

### Layer 2: Timeline
```typescript
timeline(ids=[123, 456])
// Returns: chronological context around results
```

### Layer 3: Get Observations
```typescript
get_observations(ids=[123, 456])
// Returns: full details for filtered IDs (~500-1,000 tokens/result)
```

**~10x token savings** by filtering before fetching details.

## Key Features

| Feature | Description |
|---------|-------------|
| Persistent Memory | Context survives across sessions |
| Progressive Disclosure | Layered retrieval với token cost visibility |
| Skill-Based Search | Query project history với `mem-search` skill |
| Web Viewer UI | Real-time memory stream tại http://localhost:37777 |
| Privacy Control | Use `<private>` tags to exclude sensitive content |
| Context Configuration | Fine-grained control over context injection |
| Automatic Operation | No manual intervention required |
| Citations | Reference past observations with IDs |
| Beta Channel | Experimental features like Endless Mode |

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

Truy cập http://localhost:37777 để:
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

| Component | Technology |
|-----------|------------|
| Runtime | Node.js 18.0.0+ |
| Language | TypeScript |
| Process Manager | Bun |
| Storage | SQLite 3 với FTS5 |
| Vector DB | Chroma |

## License

AGPL 3.0 | PolyForm Noncommercial License cho ragtime/

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| True persistence | Context across sessions thực sự |
| Token optimization | ~10x token savings với 3-layer search |
| Privacy control | Exclude sensitive content |
| Progressive disclosure | Layered retrieval với cost visibility |
| Web UI | Visual memory stream |
| Active development | Version 6.5.0, regular updates |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| Claude Code only | Chỉ hoạt động với Claude Code |
| Node.js required | Cần Node.js 18+ |
| AGPL license | Copyleft, có thể có vấn đề license |
| Compression overhead | AI compression có latency |

## Sử dụng khi nào

- **Long projects**: Project kéo dài nhiều sessions
- **Claude Code users**: Primary integration point
- **Token optimization**: Khi cần tối ưu context usage
- **Context continuity**: Không muốn mất context khi reconnect
- **Project history**: Query what happened trước đó

---

**Tài liệu tham khảo**: 
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
- [Documentation](https://docs.claude-mem.ai/)
- [Discord](https://discord.com/invite/J4wttp9vDu)