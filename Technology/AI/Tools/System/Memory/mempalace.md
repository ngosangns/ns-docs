---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Mempalace
description: MemPalace - Highest-Scoring AI Memory System
timestamp: "2026-06-19T13:43:26.088Z"
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
resource: https://github.com/MemPalace/mempalace
---

# MemPalace - Highest-Scoring AI Memory System

## Định nghĩa

**MemPalace** được quảng cáo là "highest-scoring AI memory system ever benchmarked. And it's free." Với 44k stars, đây là một trong những memory systems mạnh nhất cho AI assistants.

## Key Metrics

- **Stars**: 44k
- **Forks**: 5.6k
- **License**: MIT

## Benchmarks

| Metric           | Result                                   |
| ---------------- | ---------------------------------------- |
| LongMemEval R@5  | **96.6%** (raw mode)                     |
| Questions tested | 500/500 independently reproduced         |
| Annual cost      | **$0** (vs ~$507/year for LLM summaries) |

## Tính năng chính

### Palace Structure

- **Wings**: People/Projects
- **Rooms**: Topics
- **Halls**: Memory types
- **Tunnels**: Cross-wing connections
- **Closets**: Summaries
- **Drawers**: Original files

### Raw Verbatim Storage

- Stores actual exchanges trong ChromaDB
- **Không summarization**
- Achieves 96.6% LongMemEval R@5

### AAAK Dialect

- Experimental lossy abbreviation system
- Token compression
- Currently regresses to 84.2% vs raw mode

### Knowledge Graph

- Temporal entity-relationship triples trong SQLite
- Local alternative to Zep's Graphiti

### Specialist Agents

- Create focused agents với their own wings
- Individual diaries

### MCP Integration

- 19 tools available
- Claude, ChatGPT, Cursor, Gemini support

## Cài đặt

```bash
pip install mempalace
mempalace init ~/projects/myapp
mempalace mine ~/projects/myapp
```

## CLI Commands

```bash
# Initialize
mempalace init ~/projects/myapp

# Mine data
mempalace mine ~/projects/myapp

# Search
mempalace search "query"

# Status
mempalace status

# Wake-up
mempalace wake-up

# Split
mempalace split
```

## Python API

```python
from mempalace.searcher import search_memories

# Search memories
results = search_memories(
    query="authentication bug",
    limit=10
)
```

## MCP Server

```bash
python -m mempalace.mcp_server
```

## Architecture

```
┌─────────────────────────────────────────┐
│           MemPalace                     │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────────┐  │
│  │  ChromaDB   │  │     SQLite      │  │
│  │  (Vectors)  │  │ (Knowledge Graph)│ │
│  └─────────────┘  └──────────────────┘  │
├─────────────────────────────────────────┤
│           MCP Server                    │
│  (19 tools for AI integration)          │
└─────────────────────────────────────────┘
```

## Storage Details

| Storage  | Type   | Purpose                       |
| -------- | ------ | ----------------------------- |
| ChromaDB | Vector | Raw verbatim exchanges        |
| SQLite   | Graph  | Temporal entity-relationships |

## Use Cases

- **Solo developers**: Managing multiple AI conversations across projects
- **Team leads**: Tracking decisions, preferences, project history
- **Anyone wanting persistent AI memory**: Without cloud dependency

## Why It's Free

- Local-only (no cloud, no API calls)
- Zero external dependencies
- Self-hosted

## Tech Stack

- Python 3.9+
- ChromaDB (vector storage)
- SQLite (knowledge graph)
- MCP for AI integration
- Local-only (no cloud, no API calls)

## Ưu điểm

| Ưu điểm           | Mô tả                                 |
| ----------------- | ------------------------------------- |
| Highest benchmark | 96.6% R@5 on LongMemEval              |
| Free forever      | $0 annual cost                        |
| Local-only        | No cloud, no API dependency           |
| Knowledge graph   | Temporal ER triples in SQLite         |
| Rich structure    | Palace metaphor (Wings, Rooms, Halls) |
| Specialist agents | Focused agents với own wings          |

## Nhược điểm

| Nhược điểm       | Mô tả                        |
| ---------------- | ---------------------------- |
| AAAK regressed   | 84.2% vs raw mode            |
| No summarization | Raw storage có thể tốn space |
| Local only       | Không có cloud sync          |

## Sử dụng khi nào

- **Maximum accuracy**: Khi benchmark performance là priority
- **Privacy-first**: Không muốn cloud dependency
- **Cost-sensitive**: Free với đầy đủ features
- **Multi-project**: Managing multiple AI conversations
- **Team memory**: Shared knowledge across team

---

**Tài liệu tham khảo**:

- [MemPalace/mempalace](https://github.com/MemPalace/mempalace)
- [Documentation](https://docs.mempalace.ai/)
- [Benchmarks](https://github.com/MemPalace/mempalace/tree/main/benchmarks)
