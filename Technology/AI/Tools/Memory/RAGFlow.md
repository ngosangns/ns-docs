---
area: technology
domain: rag
type: tool
title: RAGFlow
description: An open-source Retrieval-Augmented Generation engine that combines deep document understanding, template-based chunking, grounded citations, and agent capabilities.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - rag
  - memory
  - code-intelligence
resource: https://github.com/infiniflow/ragflow
---

# RAGFlow

## Definition

**RAGFlow** is a leading open-source Retrieval-Augmented Generation (RAG) engine that combines advanced RAG with agent capabilities to create a superior context layer for LLMs. It stands out with 77.8k stars and 8.8k forks on GitHub.

## Installation

### Prerequisites

| Requirement    | Minimum                      |
| -------------- | ---------------------------- |
| CPU            | ≥4 cores                     |
| RAM            | ≥16GB                        |
| Disk           | ≥50GB                        |
| Docker         | ≥24.0.0                      |
| Docker Compose | ≥v2.26.1                     |
| gVisor         | Optional (for code executor) |

### Quick Start

```bash
# Use pre-built Docker images
docker compose -f docker-compose.yml up -d

# Build the Docker image from source
docker build --platform linux/amd64 -f Dockerfile -t infiniflow/ragflow:nightly .

# Launch from source for development
uv sync --python 3.12
# Backend and frontend services must be launched separately
```

## Configuration

### Environment Variables

Create the file `docker/.env`:

```bash
SVR_HTTP_PORT=9380
MYSQL_PASSWORD=your_password
MINIO_PASSWORD=your_password
```

### Service Configuration

The file `docker/service_conf.yaml.template` configures the backend services.

### Doc Engine

You can switch from Elasticsearch to Infinity:

```yaml
# docker-compose.yml
doc_engine: infinity
```

## Full Documentation

Full documentation is hosted at: **ragflow.io/docs/dev/**

## Key Features in Detail

### "Quality in, quality out"

- **Deep document understanding**: Extracts knowledge from unstructured data with complex formats
- **Docling**: Advanced document parsing
- **Finding a "needle in a data haystack"**: Handles unlimited tokens

### Template-based Chunking

| Template     | Use Case          |
| ------------ | ----------------- |
| General      | Standard text     |
| Paper        | Academic papers   |
| Book         | Books             |
| Laws         | Legal documents   |
| Manual       | Technical manuals |
| Resume       | CVs/Resumes       |
| Table        | Spreadsheets      |
| Presentation | Slides            |
| QA           | Q&A documents     |

### Grounded Citations

- Visualization of text chunking for human intervention
- Quick view of key references
- Traceable citations
- Reduced hallucinations

### Data Sources

| Type       | Support                                       |
| ---------- | --------------------------------------------- |
| Documents  | Word, slides, Excel, txt, PDF, images         |
| Web        | HTML, crawled content                         |
| Databases  | SQL databases                                 |
| Cloud      | Confluence, S3, Notion, Discord, Google Drive |
| Structured | JSON, CSV, XML                                |

### Automated RAG Workflow

- **Ingestion**: Multi-source data loading
- **Chunking**: Template-based segmentation
- **Embedding**: Configurable embedding models
- **Retrieval**: Multiple recall + fused re-ranking
- **Generation**: Grounded response generation

## Architecture

```
┌─────────────────────────────────────────────┐
│           RAGFlow System                    │
├─────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────────┐ │
│  │Ingestion│  │ Chunking│  │  Embedding  │ │
│  └────┬────┘  └────┬────┘  └──────┬──────┘ │
│       │            │               │        │
│  ┌────┴────────────┴───────────────┴────┐ │
│  │         Vector Store                   │ │
│  │   (Infinity/Elasticsearch)           │ │
│  └────────────────────┬──────────────────┘ │
│                       │                     │
│  ┌────────────────────┴──────────────────┐ │
│  │         RAG Agent                      │ │
│  │  - Retrieval                          │ │
│  │  - Re-ranking                         │ │
│  │  - Generation                         │ │
│  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Tech Stack

| Component | Technology                    |
| --------- | ----------------------------- |
| Backend   | Python 3.12, Go               |
| Frontend  | React                         |
| Database  | MySQL, Elasticsearch/Infinity |
| Storage   | MinIO, Redis                  |
| Container | Docker, Docker Compose        |
| Sandbox   | gVisor                        |

## API Endpoints

RAGFlow provides a REST API for:

- Dataset management
- Document upload
- Chunk configuration
- Retrieval testing
- Chat/completion

See details at: ragflow.io/docs/dev/

## Strengths

| Strength                    | Description                         |
| --------------------------- | ----------------------------------- |
| Production-ready            | Mature enough for production use    |
| Deep document understanding | Handles complex documents well      |
| Citation accuracy           | Significantly reduces hallucination |
| Multi-source ingestion      | Supports many data sources          |
| Agentic capabilities        | More than plain RAG                 |
| Large community             | 77.8k stars, active development     |

## Weaknesses

| Weakness           | Description                                        |
| ------------------ | -------------------------------------------------- |
| Resource intensive | Needs many resources (MySQL, Elasticsearch, MinIO) |
| Complex setup      | Complex Docker Compose stack                       |
| Not a pure graph   | Not a knowledge graph system                       |

## When to Use

- **Production RAG systems**: When you need production-ready RAG
- **Enterprise knowledge bases**: With many data sources
- **Complex document processing**: PDFs, scanned documents, multi-format
- **Multi-modal RAG**: You need to process text, images, and tables
- **Agentic AI applications**: With MCP integration
- **Grounded Q&A**: When citation accuracy matters

---

**References**:

- [infiniflow/ragflow](https://github.com/infiniflow/ragflow)
- [RAGFlow Documentation](https://ragflow.io/docs/dev/)

> **See also:** [TrustGraph](/Technology/AI/Tools/Memory/TrustGraph) · [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [Semantica](/Technology/AI/Tools/Memory/Semantica)
