---
area: technology
domain: rag
type: note
title: RAG Fine Tuning
description: Notes on choosing between prompting, RAG, and fine-tuning for LLM applications, covering PEFT, RLHF, chunking, RAG vs CAG, vector databases, and Vietnamese embedding models.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - rag
  - fine-tuning
  - llm
resource: https://github.com/vitali87/code-graph-rag
---

# RAG Fine Tuning

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

## RAG

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

## Finetuning Large Language Models

### In-Context Learning and Indexing

- **In-Context Learning**: Lets the model perform new tasks without additional training by providing examples directly in the input (prompt)
- **Hard Prompt Tuning**: A form of In-Context Learning that directly changes the input words or tokens to improve the output
  - Uses fewer resources than parameter finetuning
  - Usually not as effective as finetuning because it does not update the model's parameters
  - Can be labor-intensive because humans must compare the quality of prompts
- **Indexing**: An alternative to In-Context Learning that turns LLMs into information retrieval systems
  - Split documents or web page content into small chunks
  - Transform them into vectors and store them in a vector database
  - When a user submits a query, compute vector similarity between the query and the vectors in the database to find relevant information

### Finetuning Methods

#### Feature-Based

- Use a labeled training set to load a pre-trained transformer model
- Train another model on the features extracted from the transformer model
- The original transformer model's weights are not updated

#### Adapter-Based

- Add small adapter layers to the transformer model
- Update only the adapter layers' weights and keep the original model unchanged
- Resource-efficient and lets the original model be reused for many tasks

#### Full Finetuning

- Retrain the whole model on a specific dataset
- Updates all of the model's parameters
- Usually gives the best results but uses the most resources

### Parameter-Efficient Finetuning Techniques (PEFT)

- **Advantages of PEFT**:
  - Lower computational cost (needs fewer GPUs and less GPU time)
  - Faster training time
  - Lower hardware requirements (fewer GPUs and less memory)
  - Better model performance (reduced overfitting)
  - Saves storage space (most weights can be shared across different tasks)
- **Popular PEFT techniques**:
  - Prefix Tuning: Adds special tokens to the beginning of the prompt
  - Adapters: Adds small layers to the model
  - Low-Rank Adaptation (LoRA): Decomposes weight matrices into smaller matrices

### Reinforcement Learning with Human Feedback (RLHF)

- **The RLHF process**:
  1. **Collect demonstration data and train a supervised policy model**: Prompts are sampled from a dataset, labelers demonstrate the desired output behavior, and this data is used to finetune with supervised learning
  2. **Collect comparison data and train a reward model**: A prompt and several model outputs are sampled, labelers rank the outputs from best to worst, and this data is used to train the reward model
  3. **Optimize the policy against the reward model using reinforcement learning**: A new prompt is sampled, the policy generates an output, the reward model computes a reward, and this reward is used to update the policy with PPO (proximal policy optimization)
- **Why use a reward model**: Involving humans in the learning loop creates a bottleneck, because human feedback cannot be obtained in real time

## Chunking in RAG

### The Role of Chunking

- Splitting text (chunking) is an important step in a RAG system for optimizing how information is retrieved and used
- It directly affects the quality of retrieval results and of the model's responses

### Types of Chunking

#### Fixed Size Chunking

- Splits text into segments of a fixed size based on character count
- Simple, but can cut across the meaning of a sentence or paragraph

#### Recursive Chunking

- Splits text based on structure such as line breaks, then applies Fixed Size Chunking
- Respects the natural structure of the text better

#### Document-Based Chunking

- Splits a document based on its inherent structure (headings, sections, chapters)
- Suited to documents with clear structure

#### Semantic Chunking

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

#### Agentic Chunking

- Uses an LLM to split documents automatically
- The LLM can understand context and complex structure to produce optimal chunks

### Proposition-Based Retrieval

- An advanced RAG method that focuses on retrieving propositions rather than large blocks of text
- Improves RAG performance by retrieving more precise and relevant information

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

## RAG Tools & Vector Databases

- **PageIndex**: A document indexing system for reasoning-based RAG applications, optimized for retrieving information from documents in AI systems - [GitHub](https://github.com/VectifyAI/PageIndex) #RAG #documentIndexing #reasoning
- **Milvus**: A high-performance, cloud-native vector database designed for approximate nearest neighbor (ANN) search at large scale. Supports fast, scalable vector search, suited to AI and machine learning applications - [GitHub](https://github.com/milvus-io/milvus) #vectorDatabase #ANN #scalable
- **LEANN**: A RAG application that saves 97% of storage, runs fast, accurately, and fully privately on personal devices. Runs RAG on a personal device without an internet connection - [GitHub](https://github.com/yichuan-w/LEANN) #RAG #private #onDevice #storageOptimization
- **turbopuffer**: A serverless vector and full-text search database built from the ground up on object storage (S3), fast, 10x cheaper, and extremely scalable
  - **Architecture**: A memory/SSD cache layer combined with object storage (S3) for data storage
  - **Key features**:
    - Serverless architecture with automatic scaling
    - Low latency: sub-10ms p50 for vector search
    - Supports billions of vectors
    - Full-text search and hybrid search (combining vector + keyword)
    - Metadata filtering
    - Significant cost savings compared with traditional vector databases
  - **Production performance**:
    - Handles 1T+ documents, 10M+ writes/s, 10k+ queries/s in production
    - Max documents: Unlimited (global), 500M @ 2TB (per namespace)
    - Max write throughput: Unlimited (global), 10k writes/s @ 32 MB/s (per namespace)
    - Max queries: Unlimited (global), 1k+ queries/s (per namespace)
    - Vector search recall@10: 90-100%
  - **Use cases**: AI applications, semantic search, recommendation systems, RAG, similarity search
  - **Customers**: Cursor, Notion, Linear, Anthropic, Atlassian, Grammarly, Readwise, Clay, Photoroom, GitBook, Superhuman, Warp, Cognition
  - [Website](https://turbopuffer.com/) #vectorDatabase #fullTextSearch #serverless #RAG #scalable #costEffective

## Text Embedding Models & Vietnamese Retrieval Datasets

### Vietnamese Embedding Models

- **Vietnamese_Embedding**: A Vietnamese-language embedding model fine-tuned from the BGE-M3 model to improve information retrieval for Vietnamese - [HuggingFace](https://huggingface.co/AITeamVN/Vietnamese_Embedding) #embedding #Vietnamese #BGE-M3 #retrieval

### GreenNode Text Embedding Models

- **Team**: GreenNode
- **Models**: https://huggingface.co/collections/GreenNode/greennode-text-embedding-models-66a75c00889910bc76007de5
- **Characteristics**:
  - Fine-tuned from the Table Markdown Retrieval dataset (using only the train split)
  - Ranks first in retrieval of tabular (markdown) data for Vietnamese compared with both open-source and closed-source models
  - Model `GreenNode/GreenNode-Embedding-Large-VN-Mixed-V1`: Interpolates between the fine-tuned model and BAAI/bge-m3 (the base model) to avoid overfitting and preserve performance on other tasks
- **Key finding**: Interpolating a fine-tuned model with the base model can produce a model that beats both, since it carries the fine-tuned (task-specific) weights and the base model's (more general) weights

### GreenNode Table Markdown Retrieval Dataset

- **Dataset**: https://huggingface.co/datasets/GreenNode/GreenNode-Table-Markdown-Retrieval-VN
- **Characteristics**:
  - Generated by a 70B LLM from real-world data, in a context retrieval format
  - The context (corpus) is text + markdown tables
  - Train: ~143k samples, Test (eval): ~35k samples (or Corpus 44.7k samples, Queries 179k samples)
- **Key finding**: Using an LLM to synthesize data in markdown form can enrich data, but the generated data needs a quality validation step

### MTEB Benchmark Tasks

- **Repository**: https://github.com/embeddings-benchmark/mteb
- **Usage**:

```bash
mteb run -m GreenNode/GreenNode-Embedding-Large-VN-V1 \
-t [task-name] \
--verbosity 3
```

- **Vietnamese Retrieval Tasks**:
  - `GreenNodeTableMarkdownRetrieval` (GreenNode work)
  - `ZacLegalTextRetrieval` (Zalo Legal Text Retrieval Challenge 2021)
  - `VieQuADRetrieval` (taidng/UIT-ViQuAD2.0)

### Motivation & Pain Point

- **Motivation**: Chatbot systems with RAG or GraphRAG all need text embeddings to encode and retrieve data (text, tables, images, etc.). Most open-source projects and products convert data in every format into text, markdown, or HTML so they can retrieve it as text that the LLM can understand and use to generate an answer (for example: llamaIndex, Langchain, Microsoft Markitdown)
- **Pain point**: When building a chatbot with a lot of tabular data, current models do not yet meet the need

> **See also:** [Fine Tuning Techniques](/Technology/AI/Concepts/LLM And Generative AI/Fine Tuning/Fine Tuning Techniques) · [RAG Overview](/Technology/AI/Concepts/LLM And Generative AI/RAG/RAG Overview) · [Chunking Strategies](/Technology/AI/Concepts/LLM And Generative AI/RAG/Chunking Strategies)
