---
area: technology
domain: knowledge-graph
type: tool
title: TrustGraph
description: A self-hosted context development platform that stores, enriches, and retrieves structured knowledge through a multi-model database, graph-native RAG pipelines, and portable context cores.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - knowledge-graph
  - rag
  - memory
  - code-intelligence
resource: http://localhost:8080
---

# TrustGraph

## Definition

**TrustGraph** is "the context development platform" — it stores, enriches, and retrieves structured knowledge with graph-native infrastructure, semantic retrieval, and portable context cores. It is designed for applications that need to manage structured knowledge at scale, similar to Supabase but built around context graphs.

## Installation

### Local Deployment (Docker)

```bash
docker compose up -d
```

### Cloud Deployment (Kubernetes)

```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: trustgraph
spec:
  replicas: 3
  # ... full config in repo
```

## Quick Start

```python
from trustgraph import Client

# Connect
client = Client(base_url="http://localhost:8080")

# Store knowledge
client.ingest(
    documents=[{
        "id": "doc1",
        "content": "AI agents need memory to maintain context",
        "metadata": {"source": "research"}
    }]
)

# Query
results = client.query("What do AI agents need?")
```

## Key Features in Detail

### Multi-model Database

| Model     | Description                         |
| --------- | ----------------------------------- |
| Tabular   | Structured data with schemas        |
| Key-value | Fast lookups                        |
| Document  | Unstructured text storage           |
| Graph     | Knowledge graphs with relationships |
| Vectors   | Semantic embeddings                 |
| Images    | Image storage                       |
| Video     | Video storage                       |
| Audio     | Audio storage                       |

### Pre-built RAG Pipelines

| Pipeline    | Use Case                |
| ----------- | ----------------------- |
| DocumentRAG | Document-based QA       |
| GraphRAG    | Graph-based retrieval   |
| OntologyRAG | Ontology-driven queries |

### 3D GraphViz

Interactive visual context exploration:

```python
from trustgraph.viz import GraphViz

viz = GraphViz(client)
viz.render("graph.html")
```

### Agentic System

```python
from trustgraph.agents import Agent

agent = Agent(
    name="researcher",
    llm="anthropic/claude-3-sonnet",
    tools=["search", "query", "memory"]
)

result = agent.run("What have we learned about AI memory?")
```

## API Reference

### REST API

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | `/api/v1/ingest` | Ingest documents |
| POST   | `/api/v1/query`  | Query knowledge  |
| GET    | `/api/v1/graph`  | Get graph data   |
| POST   | `/api/v1/agents` | Create agent     |

### Python SDK

```python
from trustgraph import TrustGraph

tg = TrustGraph(api_key="your-key")

# Ingest
tg.ingest(documents=[...])

# Query
results = tg.query("question", pipeline="graphrag")

# Agent
agent = tg.agent("my-agent")
response = agent.chat("hello")
```

### WebSocket API

```python
import asyncio
from trustgraph.ws import WebSocketClient

async def listen():
    ws = WebSocketClient("ws://localhost:8080/ws")
    await ws.connect()
    async for event in ws.events():
        print(event)

asyncio.run(listen())
```

## Deployment Options

### Local (Docker)

```bash
git clone https://github.com/trustgraph-ai/trustgraph.git
cd trustgraph
docker compose up -d
```

### Cloud (Kubernetes)

```bash
# Deploy to Kubernetes
kubectl apply -f kubernetes/
```

## Tech Stack

| Category          | Technologies                                                 |
| ----------------- | ------------------------------------------------------------ |
| LLM APIs          | Anthropic, AWS Bedrock, AzureAI, Google AI, Mistral, OpenAI  |
| LLM Orchestration | LM Studio, Llamafiles, Ollama, TGI, vLLM                     |
| Storage           | Apache Cassandra (multi-model), Qdrant (vector), Garage (S3) |
| Messaging         | Apache Pulsar                                                |
| Observability     | Prometheus, Grafana, Loki                                    |
| Cloud             | AWS, Azure, Google Cloud, OVHcloud, Scaleway                 |

## Use Cases

1. **Knowledge graph construction**: Build structured knowledge from documents
2. **Semantic search**: Natural language querying
3. **Retrieval-augmented generation**: RAG with graph context
4. **Agent memory management**: Persistent context for AI agents
5. **Portable context cores**: Move context between systems
6. **Multi-agent systems**: Shared knowledge bases

## Developer APIs

- **REST API**: Full CRUD operations
- **WebSocket**: Real-time updates
- **Python SDK**: Python client library
- **CLI**: Command-line interface

## No API Keys Required

- Except for third-party LLM services, OCR, and a user-defined API gateway key

## Strengths

| Strength               | Description                        |
| ---------------------- | ---------------------------------- |
| Multi-model            | Many data types in one platform    |
| Portable contexts      | Context cores can be moved         |
| No vendor lock-in      | Self-hosted with Docker/K8s        |
| Enterprise-ready       | Kubernetes support, observability  |
| Multiple RAG pipelines | DocumentRAG, GraphRAG, OntologyRAG |
| Flexible LLM           | Many LLM options                   |

## Weaknesses

| Weakness             | Description                      |
| -------------------- | -------------------------------- |
| Complex stack        | Apache Cassandra, Pulsar, Qdrant |
| Heavy resources      | Needs a lot of infrastructure    |
| Steep learning curve | Many components                  |

## When to Use

- **Enterprise applications**: Need scalable knowledge management
- **Multi-agent systems**: With portable context cores
- **Complex RAG**: DocumentRAG, GraphRAG, OntologyRAG options
- **Multi-model data**: Need to store many kinds of data
- **Self-hosted preference**: Don't want cloud vendor lock-in
- **Graph-native apps**: When the graph is the core of the architecture

---

**References**:

- [trustgraph-ai/trustgraph](https://github.com/trustgraph-ai/trustgraph)
- [Documentation](https://docs.trustgraph.ai/)

> **See also:** [RAGFlow](/Technology/AI/Tools/Memory/RAGFlow) · [Semantica](/Technology/AI/Tools/Memory/Semantica) · [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison)
