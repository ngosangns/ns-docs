---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Ragflow
description: RAGFlow - Retrieval-Augmented Generation Engine
timestamp: "2026-06-19T13:43:26.089Z"
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
resource: https://github.com/infiniflow/ragflow
---

# RAGFlow - Retrieval-Augmented Generation Engine

## Định nghĩa

**RAGFlow** là một Retrieval-Augmented Generation (RAG) engine mã nguồn mở hàng đầu, kết hợp RAG tiên tiến với Agent capabilities để tạo context layer vượt trội cho LLMs. Nổi bật với 77.8k stars và 8.8k forks trên GitHub.

## Cài đặt

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
# Sử dụng pre-built Docker images
docker compose -f docker-compose.yml up -d

# Build Docker image từ source
docker build --platform linux/amd64 -f Dockerfile -t infiniflow/ragflow:nightly .

# Launch from source for development
uv sync --python 3.12
# Backend và Frontend services cần launch riêng
```

## Configuration

### Environment Variables

Tạo file `docker/.env`:

```bash
SVR_HTTP_PORT=9380
MYSQL_PASSWORD=your_password
MINIO_PASSWORD=your_password
```

### Service Configuration

File `docker/service_conf.yaml.template` cho backend services.

### Doc Engine

Có thể chuyển từ Elasticsearch sang Infinity:

```yaml
# docker-compose.yml
doc_engine: infinity
```

## Full Documentation

Tài liệu đầy đủ được host tại: **ragflow.io/docs/dev/**

## Key Features chi tiết

### "Quality in, quality out"

- **Deep document understanding**: Trích xuất knowledge từ unstructured data với format phức tạp
- **Docling**: Advanced document parsing
- **Tìm "needle in a data haystack"**: Xử lý được unlimited tokens

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

- Visualization của text chunking cho human intervention
- Quick view của key references
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

RAGFlow cung cấp REST API cho:

- Dataset management
- Document upload
- Chunk configuration
- Retrieval testing
- Chat/completion

Xem chi tiết tại: ragflow.io/docs/dev/

## Ưu điểm

| Ưu điểm                     | Mô tả                           |
| --------------------------- | ------------------------------- |
| Production-ready            | Đủ mature cho production use    |
| Deep document understanding | Xử lý documents phức tạp tốt    |
| Citation accuracy           | Giảm hallucination đáng kể      |
| Multi-source ingestion      | Hỗ trợ nhiều data sources       |
| Agentic capabilities        | Không chỉ RAG thuần túy         |
| Large community             | 77.8k stars, active development |

## Nhược điểm

| Nhược điểm            | Mô tả                                             |
| --------------------- | ------------------------------------------------- |
| Resource intensive    | Cần nhiều resources (MySQL, Elasticsearch, MinIO) |
| Complex setup         | Docker Compose stack phức tạp                     |
| Không phải pure graph | Không phải knowledge graph system                 |

## Sử dụng khi nào

- **Production RAG systems**: Khi cần production-ready RAG
- **Enterprise knowledge bases**: Với nhiều nguồn dữ liệu
- **Complex document processing**: PDF, scanned documents, multi-format
- **Multi-modal RAG**: Cần xử lý cả text, images, tables
- **Agentic AI applications**: Với MCP integration
- **Grounded Q&A**: Khi citation accuracy quan trọng

---

**Tài liệu tham khảo**:

- [infiniflow/ragflow](https://github.com/infiniflow/ragflow)
- [RAGFlow Documentation](https://ragflow.io/docs/dev/)
- [Docker Compose](./docker/docker-compose.yml)
