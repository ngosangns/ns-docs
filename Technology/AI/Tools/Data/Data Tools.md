---
area: technology
domain: data-tools
type: resource
title: Data Tools
description: "Curated tools for analytics and tabular ML, document processing, and knowledge or data management."
timestamp: "2026-10-03T00:00:00.000Z"
tags:
  - technology
  - data-analytics
  - data-visualization
  - tabular-ml
  - document-processing
  - etl
  - extraction
  - knowledge-management
  - data
  - rag
resource: https://lookerstudio.google.com
---

# Data Tools

## Data Analytics Tools

- **Apache Iceberg**: A high-performance open-source table format designed specifically for managing big data analytics tables in data lakes. Developed by Netflix to handle petabyte-scale data and now an Apache project. Its main goal is to bring the reliability and simplicity of traditional SQL tables to big data environments, letting processing engines such as Apache Spark, Trino, Flink, Presto, Hive, and Impala safely work on the same table at the same time #data-analytics #table-format #data-lake
- **Looker Studio**: Google's free cloud-based data analytics and visualization tool - [Website](https://lookerstudio.google.com) #data-visualization #BI #analytics
- **polarsource/polar**: Open-source engine for digital products that lets you sell SaaS and digital products within minutes - [GitHub](https://github.com/polarsource/polar) #SaaS #digital-products
- **OpenBB**: Open-source financial data platform for analysts, quants, and AI agents. Provides tools and data for financial analysis, letting users access and analyze market data, run research, and produce detailed financial reports - [GitHub](https://github.com/OpenBB-finance/OpenBB) #finance #dataAnalytics #trading

### Machine Learning & Tabular Data

- https://github.com/google-research/tabfm — Google's zero-shot foundation model for tabular classification and regression; treats prediction as in-context learning, no training, tuning, or feature engineering, single forward pass.
- https://github.com/PriorLabs/TabPFN — Foundation model for tabular data with classification and regression support, optimized especially for small to medium datasets.
- https://github.com/apple/coreai-models — Apple's model export recipes, Python primitives, and Swift runtime utilities for on-device AI with Core AI; includes agent skills to help coding agents deploy PyTorch models on Apple silicon.
- https://github.com/Kanaries/pygwalker — Python library for exploratory data analysis; turns a pandas/polars dataframe into an interactive Tableau-style UI for visual exploration in Jupyter, Streamlit, and more (DuckDB-powered).
- https://github.com/xai-org/x-algorithm — Open-source source code for the recommendation algorithm powering the "For You" feed on X; written in Rust and Python (Apache-2.0).
- https://www.tensortonic.com/ — Interactive learning platform to implement 1000+ algorithms from scratch (foundational ML through CUDA kernels), with in-browser code execution, visualizations, real-world test cases, research-paper implementations, and interview prep.

> **See also:** [Monitoring Tracking](/Technology/AI/Tools/MLOps/Monitoring Tracking)

## Document Processing

- [docling-project/docling: Get your documents ready for gen AI](https://github.com/docling-project/docling)
- **ai-powerpoint-translator**: A tool that automatically translates PowerPoint content using the Gemini API. It translates from Vietnamese to Japanese by default, but the source and target languages can be customized - [GitHub](https://github.com/hoangduong92/ai-powerpoint-translator)
- **docetl**: A tool for extracting, transforming, and loading data from documents - [GitHub](https://github.com/ucbepic/docetl) #ETL #document #extraction
- Data labeling: https://doccano.github.io/doccano #dataLabeling
- Get your documents ready for gen AI: https://github.com/docling-project/docling
- **Doctra**: A tool for extracting and processing information from text documents - [GitHub](https://github.com/AdemBoukhris457/Doctra) #document #processing #extraction

### AI Resources & Collections

- **Redis AI Resources**: A collection of AI and Redis resources, including examples, tutorials, and best practices for using Redis in AI applications - [GitHub](https://github.com/redis-developer/redis-ai-resources) #Redis #AI #resources

> **See also:** [Vector Databases](/Technology/AI/Tools/Database/Vector Databases) · [Chunking Strategies](/Technology/AI/Concepts/LLM And Generative AI/RAG/Chunking Strategies)

## Knowledge And Data Management

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
- https://huggingface.co/convaiinnovations/laya — Multilingual decision/classification model (100+ languages): answers multiple-choice questions with calibrated probabilities in a single forward pass (~33ms), and does not generate text, so it avoids hallucination. Option-marker scoring (scoring each option at its own `[MASK]` token) lets you change the answer schema without retraining; a router automatically detects the language/script and dispatches the matching checkpoint (<0.5ms). Architecture: ModernBERT-large 421M (English, 512 context) / mmBERT-base 322M (multilingual, 1,024 context); trained with RLCD (proper scoring rules) so probabilities are honestly calibrated. Apache 2.0; suited to email triage, routing, and content moderation — 7–8x faster than competitors on intent classification/NLI benchmarks.

> **See also:** [Vector Databases](/Technology/AI/Tools/Database/Vector Databases) · [RAG Overview](/Technology/AI/Concepts/LLM And Generative AI/RAG/RAG Overview)
