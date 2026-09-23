---
area: technology
domain: graph-memory
type: guide
title: Graph Comparison
description: A comparison of five memory and knowledge-graph tools (semantica, trustgraph, mempalace, neural-memory, knowns) that combine graph storage with semantic/vector search, with a quick decision table.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - graph-memory
  - memory
  - code-intelligence
---

# Graph Comparison

## Overview

This covers only repositories that support **BOTH** graph storage and semantic/vector search:

| Tool              | Graph Storage                         | Vector/Semantic Search          | Type              |
| ----------------- | ------------------------------------- | ------------------------------- | ----------------- |
| **semantica**     | ✅ (Neo4j, AGE, FalkorDB)             | ✅ (FAISS, Pinecone, Qdrant...) | KG Framework      |
| **trustgraph**    | ✅ (Cassandra)                        | ✅ (Qdrant)                     | Context Platform  |
| **mempalace**     | ✅ (SQLite - temporal ER)             | ✅ (ChromaDB)                   | Memory System     |
| **neural-memory** | ✅ (custom graph)                     | ✅ (InfinityDB Pro / FTS5 Free) | Memory Library    |
| **knowns**        | ✅ (file-based markdown + code graph) | ✅ (ONNX local models, offline) | AI Project Memory |

---

## Architecture Comparison

### Storage

| Tool              |              Graph DB              |          Vector Store          | Hybrid  | Multi-model |
| ----------------- | :--------------------------------: | :----------------------------: | :-----: | :---------: |
| **semantica**     |        Neo4j, AGE, FalkorDB        |   FAISS, Pinecone, Qdrant...   |   ✅    |     ❌      |
| **trustgraph**    |             Cassandra              |             Qdrant             |   ✅    |     ✅      |
| **mempalace**     |               SQLite               |            ChromaDB            |   ✅    |     ❌      |
| **neural-memory** |            Custom graph            | InfinityDB (Pro) / FTS5 (Free) | Partial |     ❌      |
| **knowns**        | File-based (markdown + code graph) |     ONNX local embeddings      |   ✅    |     ❌      |

### Data Model

| Tool              | Graph Model                        | Temporal |
| ----------------- | ---------------------------------- | :------: |
| **semantica**     | Typed edges, 24 relationship types |    ✅    |
| **trustgraph**    | Multi-model                        |    ✅    |
| **mempalace**     | Temporal ER triples                |    ✅    |
| **neural-memory** | Spreading activation neurons       |    ✅    |
| **knowns**        | Task/doc/code relationship graph   |    ❌    |

---

## Feature Comparison (Verified)

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

## Detailed Features

### Reasoning

| Tool              | Reasoning Type                                                                    |
| ----------------- | --------------------------------------------------------------------------------- |
| **semantica**     | Forward chaining, Rete networks, Deductive, Abductive, SPARQL                     |
| **trustgraph**    | GraphRAG (retrieval-augmented)                                                    |
| **mempalace**     | RAG with semantic search                                                          |
| **neural-memory** | Spreading activation, cognitive reasoning (hypothesize, submit evidence, predict) |
| **knowns**        | Context retrieval, code dependency analysis, task planning                        |

### Graph Algorithms

| Tool              | Algorithms                                                           |
| ----------------- | -------------------------------------------------------------------- |
| **semantica**     | PageRank, betweenness centrality, Louvain, Node2Vec, link prediction |
| **trustgraph**    | Graph traversal, community detection                                 |
| **mempalace**     | Temporal ER, multi-hop queries                                       |
| **neural-memory** | Spreading activation, multi-hop traversal                            |
| **knowns**        | Code dependency graph, relationship traversal                        |

### Temporal

| Tool              | Temporal Support                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| **semantica**     | Temporal GraphRAG, Allen Interval Algebra (13 relations), bi-temporal provenance, validity windows |
| **trustgraph**    | Context cores, point-in-time snapshots                                                             |
| **mempalace**     | `as_of` parameter, timeline feature                                                                |
| **neural-memory** | Validity windows, episodic → semantic consolidation                                                |
| **knowns**        | Time tracking on tasks, version history for docs/tasks                                             |

### Unique Features

| Tool              | Unique Feature                                                               |
| ----------------- | ---------------------------------------------------------------------------- |
| **semantica**     | W3C PROV-O audit, ontology auto-generation, Node2Vec                         |
| **trustgraph**    | Multi-model (tabular, KV, doc, graph, vector, media), portable context cores |
| **mempalace**     | Palace structure (Wings/Rooms/Halls), 96.6% R@5 benchmark, $0 cost           |
| **neural-memory** | 56 MCP tools, 5-tier compression, brain versioning                           |
| **knowns**        | Claude Code skills (/kn-\*), AST code intelligence, file-based markdown DB   |

---

## Integration

| Platform    | semantica | trustgraph | mempalace | neural-memory | knowns |
| ----------- | :-------: | :--------: | :-------: | :-----------: | :----: |
| Claude Code |    ❌     |     ✅     |    ✅     |      ✅       |   ✅   |
| Cursor      |    ❌     |     ❌     |    ✅     |      ✅       |   ❌   |
| Codex       |    ❌     |     ❌     |    ❌     |      ✅       |   ⚠️   |
| MCP         |    ❌     |     ✅     |    ✅     |      ✅       |   ✅   |
| Tools       |     0     |  Multiple  |    19     |      56       |  30+   |

---

## Use Cases

| Tool              | Best For                                            |
| ----------------- | --------------------------------------------------- |
| **semantica**     | Enterprise, Regulated (audit, reasoning, ontology)  |
| **trustgraph**    | Enterprise (multi-model, portable contexts)         |
| **mempalace**     | Privacy-first, highest accuracy                     |
| **neural-memory** | Offline, privacy, AI agents                         |
| **knowns**        | Software teams, AI-native development, code context |

---

## Quick Decision

| Need                             | Choose            |
| -------------------------------- | ----------------- |
| Audit, reasoning, ontology       | **semantica**     |
| Multi-model data                 | **trustgraph**    |
| Highest accuracy, $0             | **mempalace**     |
| Fully offline, MCP               | **neural-memory** |
| AI-native dev, code intelligence | **knowns**        |

---

_Updated: 2026-04-13 (Added Knowns)_
_Verified with official documentation_

> **See also:** [Codebase Memory MCP](/Technology/AI/Tools/Memory/Codebase Memory MCP) · [GitNexus](/Technology/AI/Tools/Memory/GitNexus) · [Graphify](/Technology/AI/Tools/Memory/Graphify)
