---
area: technology
domain: mem0
type: tool
title: Mem0
description: Mem0 is a popular universal memory layer for AI agents and assistants offering multi-level user, session, and agent memory with Python and Node.js SDKs and an optional managed service.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - mem0
  - memory
  - code-intelligence
resource: https://github.com/mem0ai/mem0
---

# Mem0

Mem0 is presented here as a universal memory layer that sits between an agent and its model. The note covers what it does, its star and fork counts, and its Apache 2.0 license. It then breaks the feature set into three memory levels, user, session and agent, plus personalization and the developer surface. Install steps follow for Python, Node.js and the CLI, so you can pick a stack. The API and configuration examples show how to add, search and delete memories and how to wire an LLM and a vector store. Later sections give use cases, benchmarks against full context, the pros and cons, and a short list of situations where Mem0 fits.

## Definition

**Mem0** is a universal memory layer for AI agents. It enhances AI assistants and agents with an intelligent memory layer, enabling personalized AI interactions. It is one of the most popular memory systems, with 52.8k stars.

## Key Metrics

- **Stars**: 52.8k
- **Forks**: 5.9k
- **License**: Apache 2.0

## Key Features

### Multi-Level Memory

- **User State**: Persistent user preferences and history
- **Session State**: Current conversation context
- **Agent State**: The agent's knowledge and learning

### Adaptive Personalization

- Learns automatically from interactions
- Context-aware memory retrieval

### Developer-Friendly

- Intuitive API
- Cross-platform SDKs
- Fully managed service option

## Installation

### Python

```bash
pip install mem0ai
```

### Node.js

```bash
npm install mem0ai
```

### CLI

```bash
npm install -g @mem0/cli
# or
pip install mem0-cli
```

## Python API

```python
from mem0 import Memory

# Initialize
memory = Memory()

# Add memory
memory.add(
    messages=[{"role": "user", "content": "I prefer concise responses"}],
    user_id="user123"
)

# Search memories
result = memory.search(
    query="user preferences",
    user_id="user123"
)

# Get all memories
all_memories = memory.get_all(user_id="user123")

# Delete memory
memory.delete(memory_id="xyz")
```

## Configuration

```python
from mem0 import Memory

memory = Memory(
    config={
        "llm": {
            "provider": "openai",
            "model": "gpt-4"
        },
        "vector_store": {
            "provider": "qdrant",
            "config": {"host": "localhost", "port": 6333}
        }
    }
)
```

## Use Cases

### AI Assistants

- Consistent, context-rich conversations
- Personalize responses based on history

### Customer Support

- Recall past tickets
- User history tracking

### Healthcare

- Track patient preferences
- Medical history management

### Productivity & Gaming

- Adaptive workflows
- Personalized experiences

## Tech Stack

| Language         | Percentage |
| ---------------- | ---------- |
| Python           | 60.8%      |
| TypeScript       | 29.2%      |
| MDX              | 4.8%       |
| Jupyter Notebook | 2.9%       |
| JavaScript       | 1.1%       |
| Shell            | 0.7%       |

## Benchmarks

| Metric            | Result                       |
| ----------------- | ---------------------------- |
| Accuracy (LOCOMO) | +26% over OpenAI Memory      |
| Response Speed    | 91% faster than full-context |
| Token Usage       | 90% lower than full-context  |

## Managed Service

Mem0 also offers a managed service at **mem0.com** with:

- Fully managed infrastructure
- Advanced analytics
- Enterprise features

## Pros

| Pro                | Description                        |
| ------------------ | ---------------------------------- |
| Multi-level memory | User, Session, Agent state         |
| High popularity    | 52.8k stars, active community      |
| Developer-friendly | Intuitive API, SDKs                |
| Cross-platform     | Python, Node.js, CLI               |
| Managed service    | Optional cloud hosting             |
| Strong benchmarks  | +26% accuracy, 90% token reduction |

## Cons

| Con                   | Description                           |
| --------------------- | ------------------------------------- |
| External API calls    | Requires an LLM for memory operations |
| Vector store required | Needs Qdrant, Weaviate, etc.          |
| Cloud dependency      | Managed service requires internet     |

## When to Use

- **AI Assistants**: Need personalized conversations
- **Customer Support**: Track user history
- **Multi-session apps**: Persistent context across sessions
- **Production deployment**: With the managed service option
- **Enterprise**: Need a scalable memory solution

The benchmark table compares Mem0 with two baselines. On LOCOMO the result is +26% over OpenAI Memory. Response speed is 91% faster than full-context, and token usage is 90% lower than full-context. Those savings sit on top of three memory levels. User state keeps preferences and history. Session state keeps the current conversation. Agent state keeps what the agent has learned. Retrieval is context-aware, and the layer learns from interactions on its own. A managed option at mem0.com adds hosted infrastructure, analytics, and enterprise features, but memory operations still call an LLM and still need a vector store.

---

**References**:

- [mem0ai/mem0](https://github.com/mem0ai/mem0)
- [Documentation](https://docs.mem0.ai/)
- [Managed Service](https://mem0.com)

> **See also:** [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [MemU](/Technology/AI/Tools/Memory/MemU) · [MemPalace](/Technology/AI/Tools/Memory/MemPalace)
