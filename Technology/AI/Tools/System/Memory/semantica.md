---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Semantica
description: Semantica - Framework for Context Graphs & Decision Intelligence
timestamp: "2026-06-19T13:43:26.089Z"
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
resource: https://github.com/Hawksight-AI/semantica
---

# Semantica - Framework for Context Graphs & Decision Intelligence

## Định nghĩa

**Semantica** là một framework mã nguồn mở để xây dựng context graphs và decision intelligence layers cho hệ thống AI. Mục tiêu là biến hỗn loạn thành trí tuệ, xây dựng hệ thống AI có thể giải thích được, theo dõi được và đáng tin cậy — không phải "hộp đen".

## Cài đặt

```bash
pip install semantica
```

## Modules

| Module                       | Purpose                                             |
| ---------------------------- | --------------------------------------------------- |
| `semantica.context`          | Context graphs, decision tracking, causal analysis  |
| `semantica.kg`               | Knowledge graph construction, algorithms            |
| `semantica.semantic_extract` | NER, relation extraction, triplet generation        |
| `semantica.reasoning`        | Multiple reasoning engines                          |
| `semantica.vector_store`     | FAISS, Pinecone, Weaviate, Qdrant, Milvus, PgVector |
| `semantica.ontology`         | OWL generation, SHACL validation                    |
| `semantica.pipeline`         | Pipeline DSL with retry policies                    |
| `semantica.graph_store`      | Neo4j, FalkorDB, Apache AGE, Neptune                |
| `semantica.ingest`           | Files, web crawl, databases, Snowflake              |

## Tính năng chi tiết

### 1. Context & Decision Intelligence

```python
# Decision tracking
from semantica.context import ContextGraph

graph = ContextGraph()
graph.add_decision("选择PostgreSQL", context="database decision")
graph.record_decision("选择PostgreSQL", reason="scalability needs")

# Causal chains
graph.add_causal_relationship("选择PostgreSQL", "性能提升")
chain = graph.trace_decision_chain("选择PostgreSQL")

# Precedent search
similar = graph.find_similar_decisions("database migration")

# Policy engine
graph.check_decision_rules(decision)
```

### 2. Knowledge Graphs

- **Entity & Relationship**: Typed edges với 24 relationship types
- **Graph Algorithms**: PageRank, betweenness centrality, clustering coefficient
- **Node2Vec Embeddings**: `NodeEmbedder` class
- **Link Prediction**: `LinkPredictor` class
- **Temporal Graphs**: Incremental delta processing

### 3. Reasoning Engines

| Engine           | Use Case                         |
| ---------------- | -------------------------------- |
| Forward chaining | IF/THEN rules                    |
| Rete network     | High-throughput production rules |
| Deductive        | Logical deduction                |
| Abductive        | Hypothesis generation            |
| SPARQL           | RDF querying                     |

```python
from semantica.reasoning import Reasoner, ReteEngine

# Forward chaining
reasoner = Reasoner()
reasoner.add_rule("IF user.is_active AND subscription.is_valid THEN user.can_access")
results = reasoner.forward_chain(facts)

# Rete network for high-throughput
rete = ReteEngine()
rete.load_rules(rules)
rete.fire()
```

### 4. Temporal Intelligence (v0.4.0)

- **Temporal GraphRAG**: Retrieve knowledge as it existed at any point in the past
- **Allen Interval Algebra**: 13 deterministic interval relations
- **Point-in-time query engine**: With consistency validation
- **Decision validity windows**: `valid_from` / `valid_until`

```python
# Temporal queries
snapshot = graph.get_snapshot(timestamp="2024-01-01")
valid_decisions = graph.get_valid_decisions(as_of=datetime.now())
```

### 5. Provenance & Auditability

- Entity provenance via `ProvenanceTracker.track_entity()`
- W3C PROV-O compliant lineage tracking
- Full revision history và audit log export (JSON/CSV)

```python
from semantica.provenance import ProvenanceTracker

tracker = ProvenanceTracker()
tracker.track_entity(entity_id, source="user_input", lineage=[])
export = tracker.export_audit_log(format="json")
```

### 6. Ontology & SHACL

```python
from semantica.ontology import OntologyGenerator, OntologyEngine

# Auto-generate OWL
gen = OntologyGenerator()
owl = gen.generate_owl(entities, relationships)

# SHACL validation
shapes = OntologyEngine.to_shacl(graph, tier="standard")
validation = OntologyEngine.validate(graph, shapes)
```

### 7. Data Ingestion

| Source    | Support                                           |
| --------- | ------------------------------------------------- |
| Files     | PDF, DOCX, HTML, JSON, CSV, Excel, PPTX, archives |
| Web       | `WebIngestor` class                               |
| Database  | `DBIngestor` (any SQL)                            |
| Snowflake | `SnowflakeIngestor`                               |
| Advanced  | Docling for complex documents                     |

### 8. Export Formats

- RDF: Turtle, JSON-LD, N-Triples
- Parquet
- ArangoDB AQL
- OWL ontologies
- SHACL shapes

### 9. Pipeline Builder

```python
from semantica.pipeline import Pipeline

pipeline = (
    Pipeline()
    .stage("ingest", ingestor.ingest)
    .stage("extract", extractor.extract)
    .stage("validate", validator.validate)
    .stage("store", storer.store)
    .with_retry(max_attempts=3, backoff="exponential")
)
```

## Integration

- **Graph Databases**: AWS Neptune, Apache AGE, FalkorDB
- **Vector Stores**: FAISS, Pinecone, Weaviate, Qdrant, Milvus, PgVector
- **LLM Providers**: 100+ models via LiteLLM (OpenAI, Anthropic, Cohere, Mistral, Ollama)
- **Frameworks**: LangChain, LlamaIndex, AutoGen, CrewAI

## Plugins

- **Claude Code**: 17 domain skills
- **Cursor**: Specialized agents
- **Codex**: Integration support

Specialized agents:

- `decision-advisor`: Decision making assistant
- `explainability`: AI decision explanation
- `kg-assistant`: Knowledge graph construction

## Ưu điểm

| Ưu điểm                | Mô tả                                                         |
| ---------------------- | ------------------------------------------------------------- |
| Explainable AI         | Đầy đủ decision provenance, có thể giải thích mọi quyết định  |
| Audit trail hoàn chỉnh | Tuân thủ W3C PROV-O                                           |
| Multi-vector store     | Linh hoạt trong việc chọn storage backend                     |
| Temporal reasoning     | Hiểu được thời gian và sự kiện theo thời gian                 |
| Tích hợp tốt           | LangChain, LlamaIndex, AutoGen, CrewAI, LiteLLM (100+ models) |
| Mã nguồn mở            | MIT License                                                   |

## Nhược điểm

| Nhược điểm          | Mô tả                                        |
| ------------------- | -------------------------------------------- |
| Độ phức tạp cao     | Nhiều tính năng nâng cao, learning curve dốc |
| Cần hiểu biết về KG | Yêu cầu knowledge graph fundamentals         |
| Tài nguyên          | Graph algorithms có thể tốn nhiều compute    |

## Sử dụng khi nào

- **Regulated industries**: Healthcare, finance, legal, government — nơi cần audit trails
- **Explainable AI**: Khi cần giải thích được mọi quyết định của AI
- **Enterprise knowledge management**: Với temporal reasoning
- **Multi-agent pipelines**: Cross-system context capture
- **Complex decision systems**: Cần causal reasoning và precedent tracking

---

**Tài liệu tham khảo**:

- [Hawksight-AI/semantica](https://github.com/Hawksight-AI/semantica)
- [Cookbook Examples](./cookbook)
- [Docs Reference](./docs/reference)
