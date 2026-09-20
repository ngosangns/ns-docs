---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Comparison
description: So sánh 15 Công cụ AI Memory & Knowledge Graph
timestamp: "2026-06-19T13:43:26.087Z"
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
---

# So sánh 15 Công cụ AI Memory & Knowledge Graph

## Tổng quan Category

| Category                  | Công cụ                                                               |
| ------------------------- | --------------------------------------------------------------------- |
| **Knowledge Graph / RAG** | semantica, ragflow, trustgraph, graphify, code-review-graph, gitnexus |
| **AI Memory Systems**     | memU, neural-memory, claude-mem, mem0, mempalace                      |
| **Vector Database**       | zvec                                                                  |
| **Development Workflow**  | think-better, superpowers, knowns                                     |

---

## 1. So sánh theo Architecture

### 1.1 Storage Type

| Công cụ               |    Graph DB     |  Vector Store   | SQLite | PostgreSQL | Multi-model |
| --------------------- | :-------------: | :-------------: | :----: | :--------: | :---------: |
| **semantica**         |       ✅        |       ✅        |   ❌   |     ✅     |     ❌      |
| **ragflow**           |       ❌        |       ✅        |   ❌   |     ✅     |     ❌      |
| **trustgraph**        |       ✅        |       ✅        |   ❌   |     ✅     |     ✅      |
| **graphify**          |      JSON       |       ❌        |   ❌   |     ❌     |     ❌      |
| **code-review-graph** |   JSON/SQLite   |       ❌        |   ✅   |     ❌     |     ❌      |
| **gitnexus**          | ✅ (LadybugDB)  |       ❌        |   ❌   |     ❌     |     ❌      |
| **zvec**              |       ❌        | ✅ (in-process) |   ❌   |     ❌     |     ❌      |
| **mem0**              |       ❌        |       ✅        |   ❌   |     ❌     |     ❌      |
| **mempalace**         |   ✅ (SQLite)   |  ✅ (ChromaDB)  |   ✅   |     ❌     |     ❌      |
| **memU**              |       ❌        |       ✅        |   ❌   |     ✅     |     ❌      |
| **neural-memory**     |   ✅ (custom)   |    ✅ (Pro)     |   ✅   |  ✅ (Pro)  |     ❌      |
| **claude-mem**        |       ❌        |  ✅ (ChromaDB)  |   ✅   |     ❌     |     ❌      |
| **think-better**      |       ❌        |       ❌        |   ❌   |     ❌     |     ❌      |
| **superpowers**       |       ❌        |       ❌        |   ❌   |     ❌     |     ❌      |
| **knowns**            | ✅ (file-based) |    ✅ (ONNX)    |   ❌   |     ❌     |     ❌      |

**Nhận xét:**

- **Trustgraph** là duy nhất hỗ trợ multi-model (tabular, key-value, document, graph, vectors, images, video, audio)
- **Graphify & code-review-graph** dùng JSON-based storage đơn giản
- **Neural-memory** có custom graph implementation riêng với neurons và spreading activation
- **Knowns** dùng file-based markdown database (`.knowns/`) với frontmatter, không cần SQLite hay graph DB riêng

---

### 1.2 Memory Type

| Công cụ               | Short-term | Long-term | Hierarchical | Temporal | Proactive |
| --------------------- | :--------: | :-------: | :----------: | :------: | :-------: |
| **semantica**         |     ✅     |    ✅     |      ❌      |    ✅    |    ❌     |
| **ragflow**           |     ✅     |    ✅     |      ❌      |    ❌    |    ❌     |
| **trustgraph**        |     ✅     |    ✅     |      ❌      |    ✅    |    ❌     |
| **graphify**          |     ❌     |    ✅     |      ❌      |    ❌    |    ❌     |
| **code-review-graph** |     ❌     |    ✅     |      ❌      |    ❌    |    ❌     |
| **gitnexus**          |     ❌     |    ✅     |      ❌      |    ❌    |    ❌     |
| **zvec**              |     ❌     |    ✅     |      ❌      |    ❌    |    ❌     |
| **mem0**              |     ✅     |    ✅     |      ✅      |    ❌    |    ❌     |
| **mempalace**         |     ❌     |    ✅     |      ✅      |    ✅    |    ❌     |
| **memU**              |     ✅     |    ✅     |      ✅      |    ❌    |    ✅     |
| **neural-memory**     |     ✅     |    ✅     |      ❌      |    ✅    |    ❌     |
| **claude-mem**        |     ✅     |    ✅     |      ✅      |    ❌    |    ❌     |
| **think-better**      |     ❌     |    ❌     |      ❌      |    ❌    |    ❌     |
| **superpowers**       |     ❌     |    ❌     |      ❌      |    ❌    |    ❌     |
| **knowns**            |     ✅     |    ✅     |      ✅      |    ❌    |    ❌     |

**Nhận xét:**

- **memU** là duy nhất có **proactive memory** (24/7, tự động học)
- **semantica, trustgraph, mempalace, neural-memory** hỗ trợ **temporal**
- **memU, claude-mem, mem0, mempalace, knowns** có **hierarchical memory**
- **think-better & superpowers** không phải memory systems
- **knowns** có 3-layer memory: project / working / global

---

## 2. So sánh theo Features

### 2.1 Core Features

| Công cụ               | RAG | Graph Algorithms | Reasoning | Multi-hop | Citation |
| --------------------- | :-: | :--------------: | :-------: | :-------: | :------: |
| **semantica**         | ✅  |        ✅        |    ✅     |    ✅     |    ✅    |
| **ragflow**           | ✅  |        ❌        |    ❌     |    ❌     |    ✅    |
| **trustgraph**        | ✅  |        ❌        |    ❌     |    ✅     |    ✅    |
| **graphify**          | ✅  |        ✅        |    ❌     |    ✅     |    ❌    |
| **code-review-graph** | ✅  |        ✅        |    ❌     |    ✅     |    ❌    |
| **gitnexus**          | ✅  |        ✅        |    ✅     |    ✅     |    ❌    |
| **zvec**              | ✅  |        ❌        |    ❌     |    ❌     |    ❌    |
| **mem0**              | ✅  |        ❌        |    ❌     |    ❌     |    ❌    |
| **mempalace**         | ✅  |        ✅        |    ❌     |    ✅     |    ❌    |
| **memU**              | ❌  |        ❌        |    ✅     |    ❌     |    ❌    |
| **neural-memory**     | ❌  |        ✅        |    ✅     |    ✅     |    ❌    |
| **claude-mem**        | ✅  |        ❌        |    ❌     |    ❌     |    ✅    |
| **think-better**      | ❌  |        ❌        |    ✅     |    ❌     |    ❌    |
| **superpowers**       | ❌  |        ❌        |    ❌     |    ❌     |    ❌    |
| **knowns**            | ✅  |        ❌        |    ❌     |    ✅     |    ✅    |

### 2.2 Advanced Capabilities

| Công cụ               | Ontology | Temporal Query | Audit Trail | Provenance |
| --------------------- | :------: | :------------: | :---------: | :--------: |
| **semantica**         |    ✅    |       ✅       |     ✅      |     ✅     |
| **ragflow**           |    ❌    |       ❌       |     ✅      |     ✅     |
| **trustgraph**        |    ✅    |       ✅       |     ✅      |     ✅     |
| **graphify**          |    ✅    |       ❌       |     ✅      |     ❌     |
| **code-review-graph** |    ❌    |       ❌       |     ❌      |     ❌     |
| **gitnexus**          |    ❌    |       ❌       |     ❌      |     ❌     |
| **zvec**              |    ❌    |       ❌       |     ❌      |     ❌     |
| **mem0**              |    ❌    |       ❌       |     ❌      |     ❌     |
| **mempalace**         |    ✅    |       ✅       |     ❌      |     ❌     |
| **memU**              |    ❌    |       ❌       |     ❌      |     ❌     |
| **neural-memory**     |    ❌    |       ✅       |     ❌      |     ❌     |
| **claude-mem**        |    ❌    |       ✅       |     ❌      |     ❌     |
| **think-better**      |    ❌    |       ❌       |     ✅      |     ❌     |
| **superpowers**       |    ❌    |       ❌       |     ❌      |     ❌     |
| **knowns**            |    ❌    |       ❌       |     ✅      |     ❌     |

---

## 3. So sánh theo Integration

### 3.1 AI Platforms Supported

| Công cụ               | Claude Code | Cursor | Codex | Other LLMs |
| --------------------- | :---------: | :----: | :---: | :--------: |
| **semantica**         |     ❌      |   ❌   |  ❌   | ✅ (100+)  |
| **ragflow**           |     ✅      |   ✅   |  ❌   |     ✅     |
| **trustgraph**        |     ✅      |   ❌   |  ❌   |     ✅     |
| **graphify**          |     ✅      |   ✅   |  ✅   |     ✅     |
| **code-review-graph** |     ✅      |   ✅   |  ✅   |     ✅     |
| **gitnexus**          |     ✅      |   ✅   |  ✅   |     ✅     |
| **zvec**              |     ❌      |   ❌   |  ❌   |     ❌     |
| **mem0**              |     ❌      |   ❌   |  ❌   |     ✅     |
| **mempalace**         |     ✅      |   ✅   |  ❌   |     ✅     |
| **memU**              |     ❌      |   ❌   |  ❌   |     ✅     |
| **neural-memory**     |     ✅      |   ✅   |  ✅   |     ❌     |
| **claude-mem**        |     ✅      |   ❌   |  ❌   |     ❌     |
| **think-better**      |     ✅      |   ✅   |  ❌   |     ✅     |
| **superpowers**       |     ✅      |   ✅   |  ✅   |     ✅     |
| **knowns**            |     ✅      |   ❌   |  ⚠️   |     ✅     |

### 3.2 MCP Support

| Công cụ               | MCP | Tools Count |
| --------------------- | :-: | :---------: |
| **semantica**         | ❌  |      0      |
| **ragflow**           | ✅  |  Multiple   |
| **trustgraph**        | ✅  |  Multiple   |
| **graphify**          | ✅  | MCP server  |
| **code-review-graph** | ✅  |     22      |
| **gitnexus**          | ✅  |     16      |
| **zvec**              | ✅  |  Skill/MCP  |
| **mem0**              | ❌  |      0      |
| **mempalace**         | ✅  |     19      |
| **memU**              | ❌  |      0      |
| **neural-memory**     | ✅  |     56      |
| **claude-mem**        | ✅  |      4      |
| **think-better**      | ❌  |      0      |
| **superpowers**       | ❌  |      0      |
| **knowns**            | ✅  |     30+     |

---

## 4. So sánh theo Tech Stack

### 4.1 Programming Languages

| Công cụ               | Primary            | Secondary       |
| --------------------- | ------------------ | --------------- |
| **semantica**         | Python 3.8+        | -               |
| **ragflow**           | Python 3.12        | Go              |
| **trustgraph**        | Python, Go         | -               |
| **graphify**          | Python             | -               |
| **code-review-graph** | Python 3.10+       | -               |
| **gitnexus**          | Python             | -               |
| **zvec**              | C++                | Python, Node.js |
| **mem0**              | Python             | TypeScript      |
| **mempalace**         | Python             | -               |
| **memU**              | Python 3.13+       | -               |
| **neural-memory**     | Python 3.11+       | -               |
| **claude-mem**        | Node.js/TypeScript | -               |
| **think-better**      | Go 1.25+           | Python 3        |
| **superpowers**       | Shell              | JavaScript      |
| **knowns**            | Go 1.24.2+         | TypeScript (UI) |

### 4.2 Infrastructure

| Công cụ               | Docker | Cloud | Local-only | Free Tier |
| --------------------- | :----: | :---: | :--------: | :-------: |
| **semantica**         |   ❌   |  ❌   |     ✅     |    ✅     |
| **ragflow**           |   ✅   |  ✅   |     ❌     |    ✅     |
| **trustgraph**        |   ✅   |  ✅   |     ✅     |    ✅     |
| **graphify**          |   ❌   |  ❌   |     ✅     |    ✅     |
| **code-review-graph** |   ❌   |  ❌   |     ✅     |    ✅     |
| **gitnexus**          |   ❌   |  ❌   |     ✅     |    ✅     |
| **zvec**              |   ❌   |  ❌   |     ✅     |    ✅     |
| **mem0**              |   ✅   |  ✅   |     ✅     |    ✅     |
| **mempalace**         |   ❌   |  ❌   |     ✅     |  ✅ ($0)  |
| **memU**              |   ❌   |  ✅   |     ✅     |    ❌     |
| **neural-memory**     |   ❌   |  ❌   |     ✅     |    ✅     |
| **claude-mem**        |   ❌   |  ❌   |     ✅     |    ✅     |
| **think-better**      |   ❌   |  ❌   |     ✅     |    ✅     |
| **superpowers**       |   ❌   |  ❌   |     ✅     |    ✅     |
| **knowns**            |   ❌   |  ❌   |     ✅     |    ✅     |

---

## 5. So sánh theo Use Cases & Benchmarks

### 5.1 Primary Use Cases

| Công cụ               | Best For                                                     |
| --------------------- | ------------------------------------------------------------ |
| **semantica**         | Regulated industries, Explainable AI, Decision tracking      |
| **ragflow**           | Production RAG, Deep document understanding                  |
| **trustgraph**        | Enterprise, Multi-agent, Context development                 |
| **graphify**          | Codebase understanding (71.5× token reduction)               |
| **code-review-graph** | Code review, Impact analysis (8.2× reduction)                |
| **gitnexus**          | Code intelligence, Zero-server (WASM)                        |
| **zvec**              | High-performance vector search (billions vectors)            |
| **mem0**              | Universal memory (User/Session/Agent)                        |
| **mempalace**         | Highest benchmark (96.6% R@5), $0 cost                       |
| **memU**              | 24/7 Proactive agents                                        |
| **neural-memory**     | Offline, Privacy, Graph-based                                |
| **claude-mem**        | Claude Code persistent memory                                |
| **think-better**      | Decision making, Bias detection                              |
| **superpowers**       | TDD Development workflow                                     |
| **knowns**            | AI-native dev, persistent project context, code intelligence |

---

## 6. So sánh theo Ưu/Nhược điểm

| Công cụ               | Ưu điểm                                             | Nhược điểm            |
| --------------------- | --------------------------------------------------- | --------------------- |
| **semantica**         | Most features: reasoning, ontology, temporal, audit | Complex, no MCP       |
| **ragflow**           | Production-ready, 77.8k stars, deep doc             | Resource intensive    |
| **trustgraph**        | Multi-model, portable contexts                      | Complex infra         |
| **graphify**          | 71.5× token reduction, multimodal                   | LLM-dependent         |
| **code-review-graph** | Fast updates, 100% recall                           | Semantic optional     |
| **gitnexus**          | Zero-server, WASM, 26.8k stars                      | Noncommercial license |
| **zvec**              | Blazing fast, in-process                            | Not memory system     |
| **mem0**              | 52.8k stars, multi-level memory                     | External API          |
| **mempalace**         | Highest benchmark, $0, local-only                   | No audit              |
| **memU**              | Proactive, 24/7                                     | PostgreSQL needed     |
| **neural-memory**     | Offline, 56 MCP tools, reasoning                    | Pro for semantic      |
| **claude-mem**        | True persistence, 10× savings                       | Claude only           |
| **think-better**      | Decision frameworks, bias detection                 | Go 1.25+              |
| **superpowers**       | Complete TDD workflow                               | Process overhead      |
| **knowns**            | Claude Code skills, AST code intel, file-based DB   | Active dev, Go needed |

---

## 7. Similarities & Differences

### Common Characteristics

1. Most use Python (10/15 tools)
2. All aim to improve AI context management
3. 8/15 support MCP protocol

### Key Differences

- **zvec**: Vector DB, NOT memory system
- **think-better/superpowers/knowns**: Workflow/framework/dev-tools, NOT pure memory
- **memU**: Only proactive memory (24/7)
- **mempalace**: Highest benchmark (96.6% R@5), $0/year
- **neural-memory**: Only fully offline with 56 MCP tools
- **knowns**: Only AI-native dev tool with Claude Code skills and code graph

---

## 8. Quick Reference

| Tool              | Type               | Offline | MCP | Reasoning | Stars |
| ----------------- | ------------------ | :-----: | :-: | :-------: | ----: |
| semantica         | KG Framework       |   ✅    | ❌  |    ✅     |     - |
| ragflow           | RAG Engine         |   ❌    | ✅  |    ❌     | 77.8k |
| trustgraph        | Context Platform   |   ✅    | ✅  |    ❌     |     - |
| graphify          | Code Understanding |   ✅    | ✅  |    ❌     |     - |
| code-review-graph | Code Analysis      |   ✅    | ✅  |    ❌     |     - |
| gitnexus          | Code Intelligence  |   ✅    | ✅  |    ✅     | 26.8k |
| zvec              | Vector DB          |   ✅    | ✅  |    ❌     |  9.3k |
| mem0              | Memory Layer       |   ✅    | ❌  |    ❌     | 52.8k |
| mempalace         | Memory System      |   ✅    | ✅  |    ❌     |   44k |
| memU              | Memory Framework   |   ✅    | ❌  |    ✅     |     - |
| neural-memory     | Memory Library     |   ✅    | ✅  |    ✅     |     - |
| claude-mem        | Memory Plugin      |   ✅    | ✅  |    ❌     |     - |
| think-better      | Decision Framework |   ✅    | ❌  |    ✅     |     - |
| superpowers       | Dev Methodology    |   ✅    | ❌  |    ❌     |     - |
| knowns            | AI Project Memory  |   ✅    | ✅  |    ❌     |   154 |

---

## 9. Có cần thiết không? (Verified)

### semantica

**Cần:** Regulated industries, audit trail, reasoning engines, ontology, temporal queries
**Không:** Project nhỏ, chỉ cần basic RAG

### ragflow

**Cần:** Production RAG, complex documents, enterprise
**Không:** Simple RAG, resource constraints

### trustgraph

**Cần:** Multi-model data, enterprise multi-agent
**Không:** Project nhỏ, đơn giản

### graphify

**Cần:** Token optimization, codebase understanding
**Không:** Project nhỏ, không cần token optimization

### code-review-graph

**Cần:** Code review, impact analysis, blast radius
**Không:** Không làm code review

### gitnexus

**Cần:** Zero-server, WASM, code intelligence
**Không:** Thương mại (license), CLI-focused

### zvec

**Cần:** High-performance vector search (millions/billions vectors)
**Không:** Memory system, basic needs

### mem0

**Cần:** Multi-level memory (User/Session/Agent), managed service
**Không:** Fully offline required

### mempalace

**Cần:** Highest accuracy (96.6%), privacy-first, $0 cost
**Không:** Cloud services OK

### memU

**Cần:** 24/7 proactive agents, recommendations
**Không:** Reactive only

### neural-memory

**Cần:** Fully offline, privacy, 56 MCP tools, reasoning
**Không:** Pro requires payment

### claude-mem

**Cần:** Claude Code persistent context, semantic search
**Không:** Claude Code gốc đủ

### think-better

**Cần:** Decision making, bias detection, structured thinking
**Không:** Không đưa quyết định phức tạp

### superpowers

**Cần:** Complete TDD workflow, team standardization
**Không:** Project nhỏ

### knowns

**Cần:** AI-native development, persistent project context, code intelligence, Claude Code workflow, team collaboration với structured knowledge
**Không:** Không dùng Claude Code, không cần persistent context giữa các session

---

_Generated: 2026-04-13_
_Verified: All features cross-checked with official documentation_
_Sources: GitHub README files and documentation_
