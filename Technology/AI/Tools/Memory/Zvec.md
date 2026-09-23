---
area: technology
domain: vector-database
type: tool
title: Zvec
description: Alibaba's open-source in-process vector database, built on Proxima, offering fast dense and sparse vector search with hybrid filtering and no server to run.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - vector-database
  - memory
  - code-intelligence
resource: https://github.com/alibaba/zvec
---

# Zvec

## Definition

**ZVec** is an open-source, in-process vector database — lightweight, fast, and designed to be embedded directly into applications. Built on Proxima (a vector search engine proven in production at Alibaba), it provides high-speed, low-latency, scalable similarity search with minimal setup.

## Key Metrics

- **Stars**: 9.3k
- **Forks**: 531
- **License**: Apache-2.0
- **Latest**: v0.3.0 (April 3, 2026)

## Main Features

### Blazing Fast

- Searches billions of vectors in milliseconds
- Production-grade performance

### Simple, Just Works

- Install and start searching in seconds
- No servers or config

### Dense + Sparse Vectors

- Native support for multi-vector queries in a single call

### Hybrid Search

- Combines semantic similarity with structured filters

### Runs Anywhere

- Notebooks, servers, CLI tools, edge devices

## Installation

### Python

```bash
pip install zvec
```

Requires: Python 3.10-3.14

### Node.js

```bash
npm install @zvec/zvec
```

### Supported Platforms

- Linux (x86_64, ARM64)
- macOS (ARM64)
- Windows (x86_64)

## Python API

```python
import zvec

# Create schema
schema = zvec.CollectionSchema(
    name="example",
    vectors=zvec.VectorSchema(
        "embedding",
        zvec.DataType.VECTOR_FP32,
        4
    )
)

# Create and open collection
collection = zvec.create_and_open(path="./zvec_example", schema=schema)

# Insert documents
collection.insert([
    zvec.Doc(
        id="doc_1",
        vectors={"embedding": [0.1, 0.2, 0.3, 0.4]}
    )
])

# Query
results = collection.query(
    zvec.VectorQuery(
        "embedding",
        vector=[0.4, 0.3, 0.3, 0.1]
    ),
    topk=10
)

print(results)
```

## Use Cases

- **Vector search**: Dense vector similarity search
- **ANN search**: Approximate nearest neighbor
- **Embedded database**: In-process vector storage
- **RAG applications**: Retrieval-augmented generation
- **Agent memory**: Store embeddings for AI agents

## Tech Stack

| Language | Percentage |
| -------- | ---------- |
| C++      | 79.8%      |
| SWIG     | 7.8%       |
| Python   | 7.6%       |
| C        | 3.5%       |
| CMake    | 1.2%       |

## Strengths

| Strength       | Description                             |
| -------------- | --------------------------------------- |
| In-process     | No server needed, runs inside the app   |
| Blazing fast   | Milliseconds across billions of vectors |
| Simple         | Install and use in seconds              |
| Hybrid search  | Semantic + structured filters           |
| Multi-platform | Linux, macOS, Windows                   |
| Apache 2.0     | Permissive open source                  |

## Weaknesses

| Weakness              | Description                              |
| --------------------- | ---------------------------------------- |
| Not a memory system   | Only a vector DB, no memory features     |
| Needs embedding model | You must generate embeddings yourself    |
| Limited features      | Focused on vector search, no advanced ML |

## When to Use

- **RAG applications**: Need fast vector search
- **Embedded systems**: Don't want to deploy a separate DB
- **Edge devices**: Lightweight vector search
- **Agent memory**: Store embeddings for AI agents
- **High performance**: When speed matters most

---

**References**:

- [alibaba/zvec](https://github.com/alibaba/zvec)
- [Quickstart](https://zvec.org/en/docs/quickstart/)
- [Docs](https://zvec.org/en/docs/)
- [Benchmarks](https://zvec.org/en/docs/benchmarks/)

> **See also:** [Mem0](/Technology/AI/Tools/Memory/Mem0) · [RAGFlow](/Technology/AI/Tools/Memory/RAGFlow) · [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison)
