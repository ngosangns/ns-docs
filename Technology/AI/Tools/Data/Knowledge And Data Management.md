---
area: technology
domain: ai-ml
topic: data
type: resource
title: Knowledge And Data Management
description: Graph/vector DB, RAG pipeline, document parsing, và các công cụ quản lý tri thức/dữ liệu khác
timestamp: "2026-09-20T00:00:00.000Z"
tags:
  - technology
  - ai-ml
  - data
  - rag
resource: https://github.com/FalkorDB/FalkorDB
---

# Knowledge And Data Management

- https://github.com/FalkorDB/FalkorDB — Ultra-fast, multi-tenant property graph database built on sparse matrices; optimized for LLMs and AI workloads.
- https://github.com/Anshler/graphify-novel — AI writing assistant that builds a knowledge graph from your manuscript to track characters, threads, and lore.
- https://github.com/bsquang/naotab — Chrome extension that turns browser tabs into an organized, searchable personal knowledge base with graph visualization.
- https://github.com/oceanbase/oceanbase — Distributed relational database by Ant Group; HTAP, linear scalability, MySQL compatible, with vector search support.
- https://github.com/HKUDS/RAG-Anything — All-in-one multimodal RAG framework built on LightRAG; processes text, images, tables, equations, and mixed-format documents in one pipeline.
- https://huggingface.co/jinaai/jina-embeddings-v5-text-nano — Compact multilingual text embedding model for retrieval, matching, clustering, and classification; 239M parameters.
- https://github.com/StarTrail-org/PixelRAG — Visual RAG that renders documents (web pages, PDFs, images) to screenshots and retrieves over the images with a LoRA-tuned Qwen3-VL embedding model; ships a hosted 8.28M-page Wikipedia index and a Claude Code "pixelbrowse" skill.
- https://github.com/GoogleCloudPlatform/knowledge-catalog — Google Cloud Knowledge Catalog tools and samples, including an LLM-based enrichment agent for cataloging and enriching data assets.
- https://github.com/searxng/searxng — Free, self-hostable internet metasearch engine that aggregates results from many search services and databases without tracking or profiling users; commonly used as a web-search backend for AI agents/RAG.
- https://github.com/tursodatabase/turso — SQLite-compatible SQL database written in Rust ("the LLVM of databases"), now also speaking the Postgres wire protocol (experimental).
- https://github.com/lfnovo/open-notebook — Open-source implementation of Notebook LM with more flexibility and features.
- https://github.com/firecrawl/anydoc — Converts Word, PowerPoint, Excel, OpenDocument, RTF, EPUB, CSV, and PDF to clean Markdown; built in Rust with Node.js and Python bindings.
- https://huggingface.co/GreenNode/GreenNode-Embedding-Large-VN-Mixed-V1 — Vietnamese-focused sentence embedding model (0.6B params, up to 8,192 tokens); maps sentences/paragraphs to 1024-dim vectors for semantic search, trained on Vietnamese data with strong results on table retrieval, legal text, and QA benchmarks.
- https://huggingface.co/nvidia/NVIDIA-Nemotron-Parse-2.0 — Sub-1B-param vision-encoder-decoder model that turns document images/PDFs into structured machine-readable output (text, layout classes, bounding boxes, reading order); expanded multilingual OCR, handwriting, and chart-to-table parsing over v1.2, aimed at document intelligence and RAG ingestion.
- https://seeing-theory.brown.edu/ — Brown University's "visual introduction to probability and statistics"; six interactive, D3.js-powered modules from basic probability through regression, good as a reference for building data/stats intuition.
- https://github.com/ngwgsang/vietquill — Unified Python framework for Vietnamese paraphrase generation, quality evaluation, and control; centralizes datasets, generation methods, and metrics for research and production use (also on PyPI: pypi.org/project/vietquill).
- https://huggingface.co/convaiinnovations/laya — Multilingual decision/classification model (100+ ngôn ngữ): trả lời câu hỏi trắc nghiệm với xác suất calibrated trong một forward pass (~33ms), không sinh text nên tránh hallucination. Option-marker scoring (điểm từng lựa chọn tại `[MASK]` token riêng) cho phép đổi schema câu trả lời mà không cần train lại; router tự phát hiện ngôn ngữ/script và dispatch checkpoint phù hợp (<0.5ms). Kiến trúc ModernBERT-large 421M (English, context 512) / mmBERT-base 322M (multilingual, context 1.024); train bằng RLCD (proper scoring rules) để hiệu chỉnh xác suất trung thực. Apache 2.0; hợp cho email triage, routing, content moderation — nhanh hơn 7–8x so với đối thủ ở benchmark intent classification/NLI.
