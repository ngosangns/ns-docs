---
area: technology
domain: memory
type: tool
title: Neural Memory
description: An open-source Python library that gives AI agents persistent, graph-based memory recalled through spreading activation, with MCP tools, a CLI, and offline-first storage.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - memory
  - code-intelligence
resource: https://github.com/nhadaututtheky/neural-memory
---

# Neural Memory

## Definition

**Neural Memory** is an open-source Python library that provides persistent memory for AI agents. It stores experiences as interconnected neurons and recalls them through spreading activation, mimicking how the human brain recalls memories.

## Installation

```bash
pip install neural-memory
nmem init --full
```

## Core Tools

| Tool            | Function                                                |
| --------------- | ------------------------------------------------------- |
| `nmem_remember` | Store memory with auto-detected type, tags, connections |
| `nmem_recall`   | Recall via spreading activation                         |
| `nmem_health`   | Brain health score (A-F) with fix suggestions           |

## CLI Commands

```bash
# Store memories
nmem remember "Fixed auth bug with null check in login.py:42"
nmem remember "We decided to use PostgreSQL" --type decision

# Recall through spreading activation
nmem recall "auth bug"
nmem recall "database decision" --depth 2

# Brain health check
nmem brain health

# Sync across devices
nmem sync --full

# Web dashboard
nmem serve
```

## Python API

```python
from neural_memory import Brain
from neural_memory.storage import InMemoryStorage
from neural_memory.engine.encoder import MemoryEncoder
from neural_memory.engine.retrieval import ReflexPipeline

# Initialize brain
brain = Brain(storage=InMemoryStorage())

# Store memory
brain.remember(
    content="Fixed auth bug with null check",
    memory_type="bugfix",
    tags=["auth", "bug", "login"],
    connections=["authentication", "validation"]
)

# Recall with spreading activation
results = brain.recall(
    query="auth bug",
    depth=2,  # Multi-hop
    threshold=0.5
)

# Check brain health
health = brain.health()
print(health.score)  # A-F scale
```

## Configuration

### Pro Version (Semantic Search)

```toml
# ~/.neuralmemory/config.toml
storage_backend = "infinitydb"
```

### Cloud Sync

Deploy to your own Cloudflare account (free tier) - data is never stored by the service.

```bash
nmem sync --full
```

## Graph-Based Architecture

Neural Memory uses a graph-based approach with **24 explicit relationship types**:

```
CAUSED_BY, LEADS_TO, RELATED_TO, SIMILAR_TO,
DEPENDS_ON, IMPLEMENTS, EXTENDS, OVERRIDES,
CALLS, CALLED_BY, IMPORTED_BY, DEFINES,
USES, USED_BY, CONTAINS, CONTAINED_IN,
FOLLOWS, PRECEDES, ANSWERS, ASKS,
SUPPORTS, OPPOSES, ENABLES, BLOCKS
```

### Spreading Activation Algorithm

```
1. Query → Find matching neurons (activation sources)
2. Spread → Propagate activation through connections
3. Decay → Activation decreases with distance
4. Reinforce → Strong connections strengthen
5. Consolidation → Memories merge over time
```

### Memory Compression Tiers

| Tier      | Description                      |
| --------- | -------------------------------- |
| Full      | Complete memory with all details |
| Summary   | Condensed version                |
| Essence   | Core facts only                  |
| Ghost     | Metadata only                    |
| Reference | Pointer to external storage      |

## Setup by Tool

### Claude Code

```
/plugin marketplace add nhadaututtheky/neural-memory
```

### MCP Clients

```bash
pip install neural-memory
# Add to your MCP config
```

### OpenClaw

```bash
pip install neural-memory && npm install -g neuralmemory
```

## 56 MCP Tools

Neural Memory provides 56 MCP tools for:

- Memory operations
- Brain management
- Sync operations
- Health checks

## Tech Stack

- Python 3.11+
- SQLite / InfinityDB
- FastAPI
- React dashboard
- MCP protocol
- MIT License

## Strengths

| Strength            | Description                           |
| ------------------- | ------------------------------------- |
| Graph-based         | True graph memory, not a vector store |
| Fully offline       | No dependency on external APIs        |
| Good free tier      | SQLite + keyword search at no cost    |
| Multi-hop reasoning | Outstanding associative recall        |
| Privacy-focused     | User data never stored                |

## Weaknesses

| Weakness             | Description                                |
| -------------------- | ------------------------------------------ |
| Pro requires payment | InfinityDB costs money for semantic search |
| Learning curve       | Requires understanding graph-based memory  |
| Limited integrations | Fewer than some alternatives               |

## When to Use

- **Offline AI agents**: You don't want to depend on cloud APIs
- **Cost-sensitive projects**: You don't want to pay for a vector database
- **Graph memory needs**: Multi-hop reasoning is essential
- **Privacy-first applications**: User data must not be stored
- **Persistent context**: You need context across sessions

---

**References**:

- [nhadaututtheky/neural-memory](https://github.com/nhadaututtheky/neural-memory)

> **See also:** [Mem0](/Technology/AI/Tools/Memory/Mem0) · [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison)
