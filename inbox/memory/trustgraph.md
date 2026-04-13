# TrustGraph - Context Development Platform

## Định nghĩa

**TrustGraph** là "The context development platform" — lưu trữ, enrich, và retrieve structured knowledge với graph-native infrastructure, semantic retrieval, và portable context cores. Được thiết kế cho applications cần quản lý structured knowledge ở scale, tương tự Supabase nhưng built around context graphs.

## Cài đặt

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

## Key Features chi tiết

### 1. Multi-model Database

| Model | Description |
|-------|-------------|
| Tabular | Structured data with schemas |
| Key-value | Fast lookups |
| Document | Unstructured text storage |
| Graph | Knowledge graphs with relationships |
| Vectors | Semantic embeddings |
| Images | Image storage |
| Video | Video storage |
| Audio | Audio storage |

### 2. Pre-built RAG Pipelines

| Pipeline | Use Case |
|----------|----------|
| DocumentRAG | Document-based QA |
| GraphRAG | Graph-based retrieval |
| OntologyRAG | Ontology-driven queries |

### 3. 3D GraphViz

Interactive visual context exploration:
```python
from trustgraph.viz import GraphViz

viz = GraphViz(client)
viz.render("graph.html")
```

### 4. Agentic System

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

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/ingest` | Ingest documents |
| POST | `/api/v1/query` | Query knowledge |
| GET | `/api/v1/graph` | Get graph data |
| POST | `/api/v1/agents` | Create agent |

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

| Category | Technologies |
|----------|-------------|
| LLM APIs | Anthropic, AWS Bedrock, AzureAI, Google AI, Mistral, OpenAI |
| LLM Orchestration | LM Studio, Llamafiles, Ollama, TGI, vLLM |
| Storage | Apache Cassandra (multi-model), Qdrant (vector), Garage (S3) |
| Messaging | Apache Pulsar |
| Observability | Prometheus, Grafana, Loki |
| Cloud | AWS, Azure, Google Cloud, OVHcloud, Scaleway |

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

- Trừ third-party LLM services, OCR, và user-defined API gateway key

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| Multi-model | Nhiều data types trong một platform |
| Portable contexts | Context cores có thể di chuyển |
| No vendor lock-in | Self-hosted với Docker/K8s |
| Enterprise-ready | Kubernetes support, observability |
| Multiple RAG pipelines | DocumentRAG, GraphRAG, OntologyRAG |
| Flexible LLM | Nhiều LLM options |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| Complex stack | Apache Cassandra, Pulsar, Qdrant |
| Heavy resources | Cần nhiều infrastructure |
| Steep learning curve | Nhiều components |

## Sử dụng khi nào

- **Enterprise applications**: Cần scalable knowledge management
- **Multi-agent systems**: Với portable context cores
- **Complex RAG**: DocumentRAG, GraphRAG, OntologyRAG options
- **Multi-model data**: Cần store nhiều loại data
- **Self-hosted preference**: Không muốn cloud vendor lock-in
- **Graph-native apps**: Khi graph là core của architecture

---

**Tài liệu tham khảo**: 
- [trustgraph-ai/trustgraph](https://github.com/trustgraph-ai/trustgraph)
- [Documentation](https://docs.trustgraph.ai/)
- [Kubernetes](./kubernetes/)