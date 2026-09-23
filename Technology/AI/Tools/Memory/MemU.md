---
area: technology
domain: memu
type: tool
title: MemU
description: MemU is a hierarchical memory framework for 24/7 proactive AI agents that cuts LLM token costs and infers user intent without explicit commands, available self-hosted or as a cloud API.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - memu
  - memory
  - code-intelligence
resource: https://openrouter.ai
---

# MemU

## Definition

**MemU** (Memory-U) is a memory framework for proactive AI agents that run 24/7. It helps reduce LLM token costs for always-online agents and lets agents understand user intent without explicit commands.

## Installation (Self-Hosted)

```bash
pip install -e .
```

**Requirements**: Python 3.13+ and an OpenAI API key

## Quick Start

### Cloud Version

Visit **memu.so** for the hosted service with 7×24 continuous learning.

### Self-Hosted Test

```bash
# In-memory mode
export OPENAI_API_KEY=your_api_key
cd tests
python test_inmemory.py

# With PostgreSQL
docker run -d --name memu-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=memu \
  -p 5432:5432 pgvector/pgvector:pg16

export OPENAI_API_KEY=your_api_key
cd tests
python test_postgres.py
```

## Core APIs

### memorize() - Continuous Learning Pipeline

```python
from memu import MemUService

service = MemUService()

# Continuous learning - stores insights, facts, preferences
result = service.memorize(
    user_id="user123",
    content="User prefers concise responses in the morning",
    interaction_type="preference"
)
# Auto-categorizes, extracts skills & knowledge
# Updates user profiles automatically
```

### retrieve() - Dual-Mode Intelligence

```python
# RAG-based retrieval (method="rag")
facts = service.retrieve(
    user_id="user123",
    query="What are user's communication preferences?",
    method="rag"
)

# LLM-based retrieval (method="llm")
context = service.retrieve(
    user_id="user123",
    query="What should I prepare for the user?",
    method="llm"
)
```

## Custom LLM Providers

### OpenRouter Integration

```python
from memu import MemUService

service = MemUService(
    llm_profiles={
        "default": {
            "provider": "openrouter",
            "base_url": "https://openrouter.ai",
            "api_key": "your_openrouter_api_key",
            "chat_model": "anthropic/claude-3.5-sonnet",
            "embed_model": "openai/text-embedding-3-small"
        }
    }
)
```

### DashScope (Alibaba)

```python
service = MemUService(
    llm_profiles={
        "default": {
            "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
            "api_key": "your_api_key",
            "chat_model": "qwen3-max",
            "client_backend": "sdk"
        }
    }
)
```

## Cloud API (v3)

| Base URL | https://api.memu.so                  |
| -------- | ------------------------------------ |
| Auth     | `Authorization: Bearer YOUR_API_KEY` |

### Endpoints

| Method | Endpoint                                   | Description                         |
| ------ | ------------------------------------------ | ----------------------------------- |
| POST   | `/api/v3/memory/memorize`                  | Register continuous learning task   |
| GET    | `/api/v3/memory/memorize/status/{task_id}` | Check processing status             |
| POST   | `/api/v3/memory/categories`                | List auto-generated categories      |
| POST   | `/api/v3/memory/retrieve`                  | Query memory with proactive context |

## Hierarchical Memory Architecture

```
┌─────────────────────────────────────────┐
│         Category Layer                  │
│   (Summary-level, automatic assembly)   │
├─────────────────────────────────────────┤
│         Item Layer                      │
│   (Targeted fact retrieval)             │
├─────────────────────────────────────────┤
│         Resource Layer                  │
│   (Direct access to original data)      │
└─────────────────────────────────────────┘
```

### Three Layers

1. **Resource Layer**: Direct access to original data
2. **Item Layer**: Targeted fact retrieval
3. **Category Layer**: Summary-level overview + automatic context assembly

## Proactive Features

### Information Recommendation

- Tracks user interests
- Surfaces relevant content proactively
- Pattern detection for recurring themes

### Email Management

- Learns communication patterns
- Drafts responses
- Prioritizes inbox

### Trading & Financial Monitoring

- Tracks market context
- Monitors investment behavior
- Alerts on price movements

## Use Cases

1. **Information Recommendation** - Proactively surfaces relevant content based on interests
2. **Email Management** - Learns patterns, drafts responses, prioritizes inbox
3. **Trading & Financial Monitoring** - Tracks market context, alerts on price movements

## Tech Stack

| Component | Technology                                  |
| --------- | ------------------------------------------- |
| Language  | Python 3.13+                                |
| Database  | PostgreSQL + pgvector                       |
| LLM       | OpenAI API, OpenRouter, DashScope, VoyageAI |
| Cloud     | api.memu.so                                 |

## Pros

| Pro                 | Description                           |
| ------------------- | ------------------------------------- |
| Proactive memory    | Agents proactively remember and learn |
| Hierarchical        | Clearly tiered memory organization    |
| Cost efficient      | Significantly reduces token costs     |
| Multiple use cases  | Email, trading, recommendations       |
| Flexible deployment | Cloud or self-hosted                  |

## Cons

| Con                             | Description                         |
| ------------------------------- | ----------------------------------- |
| PostgreSQL required             | Needs PostgreSQL for production     |
| Not a pure graph                | Not graph-based memory              |
| Fewer open source contributions | Fewer contributors than other repos |

## When to Use

- **24/7 AI agents**: Always-on assistants that need memory
- **User intent understanding**: When agents must understand the user without explicit prompts
- **Cost-sensitive applications**: Production systems that need to optimize token usage
- **Recommendation systems**: Proactive content/email/trading recommendations
- **Personal AI assistants**: With hierarchical memory needs

---

**References**:

- [NevaMind-AI/memU](https://github.com/NevaMind-AI/memU)
- [Cloud API](https://api.memu.so)
- [Examples](./examples/proactive/proactive.py)

> **See also:** [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [Mem0](/Technology/AI/Tools/Memory/Mem0)
