---
type: Note
title: Neural Memory
description: Neural Memory - Persistent Memory for AI Agents
timestamp: '2026-06-19T13:43:26.089Z'
tags:
  - inbox
resource: https://github.com/nhadaututtheky/neural-memory
---
# Neural Memory - Persistent Memory for AI Agents

## Định nghĩa

**Neural Memory** là một Python library mã nguồn mở cung cấp persistent memory cho AI agents. Nó lưu trữ experiences như interconnected neurons và recall chúng thông qua spreading activation — mô phỏng cách human brain recall memories.

## Cài đặt

```bash
pip install neural-memory
nmem init --full
```

## Core Tools

| Tool | Function |
|------|----------|
| `nmem_remember` | Store memory with auto-detected type, tags, connections |
| `nmem_recall` | Recall via spreading activation |
| `nmem_health` | Brain health score (A-F) with fix suggestions |

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

Deploy to your own Cloudflare account (free tier) - data never stored by the service.

```bash
nmem sync --full
```

## Graph-Based Architecture

Neural Memory sử dụng graph-based approach với **24 explicit relationship types**:

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

| Tier | Description |
|------|-------------|
| Full | Complete memory with all details |
| Summary | Condensed version |
| Essence | Core facts only |
| Ghost | Metadata only |
| Reference | Pointer to external storage |

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

Neural Memory cung cấp 56 MCP tools cho:
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

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| Graph-based | True graph memory, không phải vector store |
| Fully offline | Không phụ thuộc external APIs |
| Free tier tốt | SQLite + keyword search miễn phí |
| Multi-hop reasoning | Associative recall vượt trội |
| Privacy-focused | User data never stored |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| Pro requires payment | InfinityDB tốn phí cho semantic search |
| Learning curve | Cần hiểu graph-based memory |
| Limited integrations | Ít hơn so với một số alternatives |

## Sử dụng khi nào

- **Offline AI agents**: Không muốn phụ thuộc cloud APIs
- **Cost-sensitive projects**: Không muốn trả cho vector database
- **Graph memory needs**: Multi-hop reasoning essential
- **Privacy-first applications**: User data không được lưu trữ
- **Persistent context**: Cần context across sessions

---

**Tài liệu tham khảo**: 
- [nhadaututtheky/neural-memory](https://github.com/nhadaututtheky/neural-memory)
- [Config](./config.toml)