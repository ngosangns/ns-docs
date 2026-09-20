---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Graph Comparison
description: So sánh Graph + Semantic Repositories
timestamp: '2026-06-19T13:43:26.088Z'
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
---
# So sánh Graph + Semantic Repositories

## Tổng quan

Chỉ bao gồm các repositories hỗ trợ **CẢ** graph storage và semantic/vector search:

| Công cụ           | Graph Storage                         | Vector/Semantic Search          | Loại              |
| ----------------- | ------------------------------------- | ------------------------------- | ----------------- |
| **semantica**     | ✅ (Neo4j, AGE, FalkorDB)             | ✅ (FAISS, Pinecone, Qdrant...) | KG Framework      |
| **trustgraph**    | ✅ (Cassandra)                        | ✅ (Qdrant)                     | Context Platform  |
| **mempalace**     | ✅ (SQLite - temporal ER)             | ✅ (ChromaDB)                   | Memory System     |
| **neural-memory** | ✅ (custom graph)                     | ✅ (InfinityDB Pro / FTS5 Free) | Memory Library    |
| **knowns**        | ✅ (file-based markdown + code graph) | ✅ (ONNX local models, offline) | AI Project Memory |

---

## 1. So sánh Architecture

### 1.1 Storage

| Công cụ           |              Graph DB              |          Vector Store          | Hybrid  | Multi-model |
| ----------------- | :--------------------------------: | :----------------------------: | :-----: | :---------: |
| **semantica**     |        Neo4j, AGE, FalkorDB        |   FAISS, Pinecone, Qdrant...   |   ✅    |     ❌      |
| **trustgraph**    |             Cassandra              |             Qdrant             |   ✅    |     ✅      |
| **mempalace**     |               SQLite               |            ChromaDB            |   ✅    |     ❌      |
| **neural-memory** |            Custom graph            | InfinityDB (Pro) / FTS5 (Free) | Partial |     ❌      |
| **knowns**        | File-based (markdown + code graph) |     ONNX local embeddings      |   ✅    |     ❌      |

### 1.2 Data Model

| Công cụ           | Graph Model                        | Temporal |
| ----------------- | ---------------------------------- | :------: |
| **semantica**     | Typed edges, 24 relationship types |    ✅    |
| **trustgraph**    | Multi-model                        |    ✅    |
| **mempalace**     | Temporal ER triples                |    ✅    |
| **neural-memory** | Spreading activation neurons       |    ✅    |
| **knowns**        | Task/doc/code relationship graph   |    ❌    |

---

## 2. So sánh Features (Verified)

### Core Features

| Feature              | semantica | trustgraph |  mempalace  | neural-memory | knowns |
| -------------------- | :-------: | :--------: | :---------: | :-----------: | :----: |
| **Graph Storage**    |    ✅     |     ✅     |     ✅      |      ✅       |   ✅   |
| **Vector Search**    |    ✅     |     ✅     |     ✅      |      ✅       |   ✅   |
| **Temporal**         |    ✅     |     ✅     |     ✅      |      ✅       |   ❌   |
| **Ontology/SHACL**   |    ✅     |     ✅     | ✅ (Palace) |      ❌       |   ❌   |
| **Reasoning Engine** |    ✅     |     ❌     |     ❌      |      ✅       |   ❌   |
| **Graph Algorithms** |    ✅     |     ❌     |     ❌      |      ✅       |   ❌   |
| **Audit Trail**      |    ✅     |     ✅     |     ❌      |      ❌       |   ✅   |
| **RAG Pipeline**     |    ✅     |     ✅     |     ✅      |      ❌       |   ✅   |
| **MCP Support**      |    ❌     |     ✅     |     ✅      |      ✅       |   ✅   |
| **Offline**          |    ✅     |     ✅     |     ✅      |      ✅       |   ✅   |
| **Free Tier**        |    ✅     |     ✅     |     ✅      |      ✅       |   ✅   |
| **Multi-hop**        |    ✅     |     ✅     |     ✅      |      ✅       |   ✅   |

---

## 3. Detailed Features

### 3.1 Reasoning

| Tool              | Reasoning Type                                                                    |
| ----------------- | --------------------------------------------------------------------------------- |
| **semantica**     | Forward chaining, Rete networks, Deductive, Abductive, SPARQL                     |
| **trustgraph**    | GraphRAG (retrieval-augmented)                                                    |
| **mempalace**     | RAG với semantic search                                                           |
| **neural-memory** | Spreading activation, cognitive reasoning (hypothesize, submit evidence, predict) |
| **knowns**        | Context retrieval, code dependency analysis, task planning                        |

### 3.2 Graph Algorithms

| Tool              | Algorithms                                                           |
| ----------------- | -------------------------------------------------------------------- |
| **semantica**     | PageRank, betweenness centrality, Louvain, Node2Vec, link prediction |
| **trustgraph**    | Graph traversal, community detection                                 |
| **mempalace**     | Temporal ER, multi-hop queries                                       |
| **neural-memory** | Spreading activation, multi-hop traversal                            |
| **knowns**        | Code dependency graph, relationship traversal                        |

### 3.3 Temporal

| Tool              | Temporal Support                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| **semantica**     | Temporal GraphRAG, Allen Interval Algebra (13 relations), bi-temporal provenance, validity windows |
| **trustgraph**    | Context cores, point-in-time snapshots                                                             |
| **mempalace**     | `as_of` parameter, timeline feature                                                                |
| **neural-memory** | Validity windows, episodic → semantic consolidation                                                |
| **knowns**        | Time tracking on tasks, version history for docs/tasks                                             |

### 3.4 Unique Features

| Tool              | Unique Feature                                                               |
| ----------------- | ---------------------------------------------------------------------------- |
| **semantica**     | W3C PROV-O audit, ontology auto-generation, Node2Vec                         |
| **trustgraph**    | Multi-model (tabular, KV, doc, graph, vector, media), portable context cores |
| **mempalace**     | Palace structure (Wings/Rooms/Halls), 96.6% R@5 benchmark, $0 cost           |
| **neural-memory** | 56 MCP tools, 5-tier compression, brain versioning                           |
| **knowns**        | Claude Code skills (/kn-\*), AST code intelligence, file-based markdown DB   |

---

## 4. Integration

| Platform    | semantica | trustgraph | mempalace | neural-memory | knowns |
| ----------- | :-------: | :--------: | :-------: | :-----------: | :----: |
| Claude Code |    ❌     |     ✅     |    ✅     |      ✅       |   ✅   |
| Cursor      |    ❌     |     ❌     |    ✅     |      ✅       |   ❌   |
| Codex       |    ❌     |     ❌     |    ❌     |      ✅       |   ⚠️   |
| MCP         |    ❌     |     ✅     |    ✅     |      ✅       |   ✅   |
| Tools       |     0     |  Multiple  |    19     |      56       |  30+   |

---

## 5. Use Cases

| Tool              | Best For                                            |
| ----------------- | --------------------------------------------------- |
| **semantica**     | Enterprise, Regulated (audit, reasoning, ontology)  |
| **trustgraph**    | Enterprise (multi-model, portable contexts)         |
| **mempalace**     | Privacy-first, highest accuracy                     |
| **neural-memory** | Offline, privacy, AI agents                         |
| **knowns**        | Software teams, AI-native development, code context |

---

## 6. Quick Decision

| Nhu cầu                          | Chọn              |
| -------------------------------- | ----------------- |
| Audit, reasoning, ontology       | **semantica**     |
| Multi-model data                 | **trustgraph**    |
| Highest accuracy, $0             | **mempalace**     |
| Fully offline, MCP               | **neural-memory** |
| AI-native dev, code intelligence | **knowns**        |

---

_Updated: 2026-04-13 (Added Knowns)_
_Verified with official documentation_
