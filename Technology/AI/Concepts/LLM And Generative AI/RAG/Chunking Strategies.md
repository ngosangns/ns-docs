---
area: technology
domain: rag
type: guide
title: Chunking Strategies
description: Overview of text chunking approaches for RAG (fixed size, recursive, document-based, semantic, agentic), proposition-based retrieval, and the ChunkFormer speech model.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - rag
  - chunking
  - llm
resource: https://huggingface.co/khanhld/chunkformer-large-vie
---

# Chunking Strategies

## The Role of Chunking

- Splitting text (chunking) is an important step in a RAG system for optimizing how information is retrieved and used
- It directly affects the quality of retrieval results and of the model's responses

## Types of Chunking

### Fixed Size Chunking

- Splits text into segments of a fixed size based on character count
- Simple, but can cut across the meaning of a sentence or paragraph

### Recursive Chunking

- Splits text based on structure such as line breaks, then applies Fixed Size Chunking
- Respects the natural structure of the text better

### Document-Based Chunking

- Splits a document based on its inherent structure (headings, sections, chapters)
- Suited to documents with clear structure

### Semantic Chunking

- Splits text by semantic meaning, grouping sentences or paragraphs that are semantically related
- **How it works**:
  1. Split the document into small segments
  2. Embed the segments into vectors
  3. Compare the similarity between consecutive segments
  4. Merge segments with high similarity (above a certain threshold) to form chunks that carry their own meaning
- **Key parameters**:
  - `buffer_size`: The number of sentences grouped together before semantic chunking is performed
  - `threshold`: The similarity threshold that decides whether segments are merged
- More effective at producing chunks with complete meaning

### Agentic Chunking

- Uses an LLM to split documents automatically
- The LLM can understand context and complex structure to produce optimal chunks

## Proposition-Based Retrieval

- An advanced RAG method that focuses on retrieving propositions rather than large blocks of text
- Improves RAG performance by retrieving more precise and relevant information

## ChunkFormer

**ChunkFormer**: Masked Chunking Conformer for long-form speech transcription (ICASSP 2025)

- Long-form transcription: processes up to 16 hours of audio with a 110M-parameter model on an 80GB GPU (4 hours on a 24GB GPU)
- Endless decoding: processes long audio on memory-limited GPUs without losing context (history and future context) thanks to streaming
- Masked Batching Technique: removes padding in batches, optimizing processing of audio with varying lengths
- Model trained on 3000h of public Vietnamese data: [HuggingFace](https://huggingface.co/khanhld/chunkformer-large-vie) | [GitHub](https://github.com/khanld/chunkformer) | [Paper](https://github.com/khanld/chunkformer/blob/main/docs/paper.pdf) #ASR #speech2text #long-form #Vietnamese #ZaloAI

> **See also:** [RAG Overview](/Technology/AI/Concepts/LLM And Generative AI/RAG/RAG Overview) · [RAG Fine Tuning](/Technology/AI/Concepts/LLM And Generative AI/Fine Tuning/RAG Fine Tuning)
