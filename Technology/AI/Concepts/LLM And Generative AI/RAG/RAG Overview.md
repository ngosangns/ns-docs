---
area: technology
domain: rag
type: guide
title: RAG Overview
description: Explains how prompt engineering, RAG, and fine-tuning relate as ways to steer an LLM, with open-source RAG libraries and a comparison of RAG versus cache-augmented generation.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - rag
  - llm
resource: https://github.com/vitali87/code-graph-rag
---

# RAG Overview

To keep from getting lost among AI agents before going deeper into the topic, imagine a huge, ancient tree.

- The roots are the LLMs (Large Language Models) such as GPT, Gemini (Google), Claude, Llama (Meta), or DeepSeek, where the real Machine Learning work of collecting data and training happens. Only about 10 LLMs are really prominent.

- The trunk splits into many branches: some related to language, others to images, video, or music, like Dall-E2, Imagen, Claude, and Gemini. There are probably fewer than 30 major branches.

- The twigs and leaves are the AI applications that get built. There are now hundreds of thousands of them, with more added every day. The leaves are advertised as impressively professional, but in the end they all share the same few dozen roots and branches above.

AI agents are the leaves. Each leaf sends signals to the roots in different ways: Prompt, RAG, and Finetuning.

## Prompt Engineering

Every time we make a request to ChatGPT or Gemini, that is a Prompt, and the art of writing prompts is loosely called prompt engineering. However, not everyone knows how to write an effective prompt to get the result they want. That is why some AI agents do only one thing, refine prompts, and still make money. For example, instead of the prompt "Write an article about the differences between B2B and B2C CRM", the prompt is rewritten as:

- Play the role of Nam Nguyễn, author of the book "Cưa đổ CRM" (Winning Over CRM), and write an article...

- Or: Treat your readers as fresh graduates who know nothing about CRM, and write an article...

- Or, more complex: build an entire branching context with many constraints to get results that fit the requested context, while also saving cost (tokens).

## RAG (Retrieval-Augmented Generation)

Prompt engineering cannot map prompts to context manually (the number of prompts is too varied), so it can only handle generic problems. To handle specific problems, such as a particular buyer's complaint, or the need to query and edit the information of a particular order or item, the AI agent needs to retrieve additional information from an external data source.

This approach is called RAG (Retrieval-Augmented Generation).

The external data can be earlier chat messages, a specific application's database, or data in many different formats.

Organizing RAG is an art of optimizing speed, security, and token cost.

## Finetuning

Finetuning means retraining (adjusting the weights of) the AI agent using a dataset that is more accurate or newer than the data the LLM was originally trained on. Here is a recap of the approaches using one example for clarity:

- Plain prompt: "Write a poem about CRM"

- Good prompt (prompt engineering): Use Nam Nguyễn's writing style: "Write a poem about CRM"

- Prompt with RAG: Use Nam Nguyễn's writing style from line 2, page 129 of the book Cưa đổ CRM to "Write a poem about CRM" (this requires loading the entire content of the book Cưa đổ CRM and treating it as an external database)

- If the system produces a corny or outdated poem, Finetuning is needed: instruct the AI agent to study all of Nam Nguyễn's CRM posts on Facebook from 2024 so it relearns the concept of CRM.

So RAG is about correctness (facts), while Finetuning is about form. If the prompt lacks enough information and data, RAG is the solution. But if the returned result is "not wrong" yet irrelevant, does not meet the request, or lacks finesse (a behavior issue), Finetuning is the solution.

In short, AI agents use Prompt Engineering, or RAG, or Finetuning, or both RAG and Finetuning (RAFT). At present, however, RAG is the most common.

The book "AI Engineering" by Chip Huyen covers this topic well and systematically for anyone looking into building AI agents.

## Open-Source Libraries for RAG, Agents & AI Search

- **RAG (Retrieval Augmented Generation)**: An AI technique that combines retrieving relevant information with generating responses
  - Helps AI give more accurate, context-appropriate answers
  - Accesses up-to-date information from external data sources
  - Improved accuracy and better understanding of context
  - Reduces hallucination in AI models
- **7 popular open-source libraries**:
  - **SWIRL**: Supports fast, secure search across data sources without moving or copying the data
  - **Cognita**: An open-source framework for building modular, production-ready RAG systems, supporting multiple document retrievers and embeddings
  - Other libraries provide the tools and frameworks needed to deploy effective RAG, Agents, and AI Search systems

## Tools

- [code-graph-rag](https://github.com/vitali87/code-graph-rag): RAG system that uses code graphs to improve retrieval and generation for code-related queries. #RAG #codeGraph
- **Quivr**: A RAG (Retrieval-Augmented Generation) solution for integrating GenAI into applications, supporting many large language models (LLMs) and vector stores - [GitHub](https://github.com/QuivrHQ/quivr) #RAG #LLM #vector
- **Unsloth**: A library that optimizes fine-tuning of large language models, cutting memory use by 70% and speeding up training 2x. Supports training OpenAI gpt-oss, Qwen3, Llama 4, DeepSeek-R1, Gemma 3, TTS - [GitHub](https://github.com/unslothai/unsloth) #finetune #LLM #optimization

## RAG vs CAG (Cache-Augmented Generation)

### The Problem With RAG

- RAG queries the vector database every time, even for data that does not change
- Slow and expensive because static data is re-queried

### The CAG Solution

- CAG stores static information in KV memory instead of querying it again
- Combines:
  - **Static** → stored in the cache
  - **Dynamic** → retrieved directly (live)

### Benefits

- Faster, cheaper, less redundant
- Cache only stable data and fetch the rest fresh
- OpenAI and Anthropic support this feature through prompt caching
- RAG + CAG = an efficient AI memory

> **See also:** [Chunking Strategies](/Technology/AI/Concepts/LLM And Generative AI/RAG/Chunking Strategies) · [RAG Fine Tuning](/Technology/AI/Concepts/LLM And Generative AI/Fine Tuning/RAG Fine Tuning) · [LLM Overview](/Technology/AI/Concepts/LLM And Generative AI/LLM Overview)
