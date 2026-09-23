---
area: technology
domain: mempalace
type: tool
title: MemPalace
description: MemPalace is a free, local-only AI memory system that stores raw verbatim exchanges in ChromaDB with a SQLite knowledge graph and reports the highest LongMemEval score at 96.6% R@5.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - mempalace
  - memory
  - code-intelligence
resource: https://github.com/MemPalace/mempalace
---

# MemPalace

## Definition

**MemPalace** is advertised as the "highest-scoring AI memory system ever benchmarked. And it's free." With 44k stars, it is one of the strongest memory systems for AI assistants.

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

## Key Features

### Palace Structure

- **Wings**: People/Projects
- **Rooms**: Topics
- **Halls**: Memory types
- **Tunnels**: Cross-wing connections
- **Closets**: Summaries
- **Drawers**: Original files

### Raw Verbatim Storage

- Stores the actual exchanges in ChromaDB
- **No summarization**
- Achieves 96.6% LongMemEval R@5

### AAAK Dialect

- Experimental lossy abbreviation system
- Token compression
- Currently regresses to 84.2% vs raw mode

### Knowledge Graph

- Temporal entity-relationship triples in SQLite
- Local alternative to Zep's Graphiti

### Specialist Agents

- Create focused agents with their own wings
- Individual diaries

### MCP Integration

- 19 tools available
- Claude, ChatGPT, Cursor, Gemini support

## Installation

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

## Pros

| Pro               | Description                           |
| ----------------- | ------------------------------------- |
| Highest benchmark | 96.6% R@5 on LongMemEval              |
| Free forever      | $0 annual cost                        |
| Local-only        | No cloud, no API dependency           |
| Knowledge graph   | Temporal ER triples in SQLite         |
| Rich structure    | Palace metaphor (Wings, Rooms, Halls) |
| Specialist agents | Focused agents with their own wings   |

## Cons

| Con              | Description                            |
| ---------------- | -------------------------------------- |
| AAAK regressed   | 84.2% vs raw mode                      |
| No summarization | Raw storage can consume a lot of space |
| Local only       | No cloud sync                          |

## When to Use

- **Maximum accuracy**: When benchmark performance is the priority
- **Privacy-first**: You do not want a cloud dependency
- **Cost-sensitive**: Free with the full feature set
- **Multi-project**: Managing multiple AI conversations
- **Team memory**: Shared knowledge across a team

---

**References**:

- [MemPalace/mempalace](https://github.com/MemPalace/mempalace)
- [Documentation](https://docs.mempalace.ai/)
- [Benchmarks](https://github.com/MemPalace/mempalace/tree/main/benchmarks)

> **See also:** [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [Mem0](/Technology/AI/Tools/Memory/Mem0)
