---
area: technology
domain: rag
type: tutorial
title: RAG Tutorial Neo4j GraphRAG
description: Step-by-step tutorial on building a RAG system on a Neo4j knowledge graph with LangChain, plus best practices and common pitfalls for GraphRAG.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - rag
  - graphrag
  - neo4j
resource: https://neo4j.com/blog/developer/rag-tutorial/
---

# RAG Tutorial Neo4j GraphRAG

> **Source**: [RAG Tutorial: How to Build a RAG System on a Knowledge Graph](https://neo4j.com/blog/developer/rag-tutorial/)

## What Is RAG?

- **Retrieval-Augmented Generation (RAG)**: A technique that combines information retrieval with LLM response generation
- Lets the LLM access up-to-date information from external data sources
- Reduces hallucination by supplying factual context
- No need to fine-tune the model; just update the knowledge base

## Basic RAG Pipeline

1. **Chunking**: Split documents into small pieces (chunks)
2. **Embedding**: Convert chunks into vector embeddings
3. **Storage**: Store the embeddings in a vector database
4. **Query**: The user asks a question
5. **Retrieval**: Find relevant chunks based on similarity
6. **Augmentation**: Combine the query with the retrieved context
7. **Generation**: The LLM produces an answer based on the context

## Why Does RAG Work?

- **Grounding**: Supplies factual information from the knowledge base instead of relying on training data
- **Up-to-date**: New information can be added without retraining the model
- **Transparency**: The origin of information can be traced (source attribution)
- **Cost-effective**: Cheaper than fine-tuning; you only query when needed

## Core Components of RAG

### Document Loader

- Extracts content from many sources: PDF, web, database, API
- Example: LangChain DocumentLoaders

### Text Splitter (Chunking)

- Splits documents into suitably sized pieces
- Methods: fixed-size, recursive, semantic, document-based
- **Important**: The chunking strategy directly affects retrieval quality

### Embedding Model

- Converts text into vectors
- Options: OpenAI, Cohere, BGE, or fine-tuned models
- See also: [RAG Overview](/Technology/AI/Concepts/LLM And Generative AI/RAG/RAG Overview)

### Vector Database

- Stores and searches embeddings
- Examples: Neo4j, Pinecone, Weaviate, Milvus, FAISS

### LLM

- Generates the response from the query + retrieved context
- Examples: GPT-4, Claude, Llama

### Retrieval Strategy

- Vector similarity search (semantic search)
- Hybrid search (keyword + vector)
- Graph queries (structured queries)

## GraphRAG - RAG with a Knowledge Graph

### What is GraphRAG?

- **GraphRAG**: A RAG implementation on top of a graph database
- Combines semantic vector search with structured graph reasoning
- Uses Neo4j as both the knowledge graph and the vector database

### Why GraphRAG?

- **Structured + Unstructured**: Handles both structured and unstructured data
- **Exact queries**: Answers questions about relationships, counts, and dependencies precisely
- **Multi-hop reasoning**: Searches across multiple relationship steps
- **Explainable**: Can explain how the answer was found
- **Scalable**: Suited to enterprise scale

### GraphRAG architecture

1. **Knowledge Graph Construction**
   - Create nodes and relationships from documents
   - Use an LLM to extract entities and relationships
   - Store them in Neo4j

2. **Vector Index**
   - Create vector embeddings for documents/chunks
   - Store them in a Neo4j vector index

3. **Hybrid Retrieval**
   - Vector search for semantic queries
   - Cypher queries for structured queries
   - Agent routing to pick the appropriate method

4. **Response Generation**
   - Combine the retrieved context with the query
   - The LLM generates the answer

## Implementation Guide with Neo4j + LangChain

### Step 1: Set up Neo4j

- Create a Neo4j instance (AuraDB or self-hosted)
- Install the LangChain-Neo4j package

### Step 2: Load and Chunk Documents

```python
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = PyPDFLoader("document.pdf")
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
chunks = text_splitter.split_documents(documents)
```

### Step 3: Build the Knowledge Graph

- Use an LLM to extract entities and relationships
- Create nodes and relationships in Neo4j

### Step 4: Create the Vector Index

```python
from langchain_neo4j import Neo4jVector

vector_store = Neo4jVector.from_documents(
    documents=chunks,
    embedding=embedding_model,
    url=neo4j_url,
    username=neo4j_username,
    password=neo4j_password,
    index_name="document_index"
)
```

### Step 5: Retrieval and Generation

```python
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI

qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    retriever=vector_store.as_retriever(),
    return_source_documents=True
)

response = qa_chain.invoke({"query": "Your question"})
```

## Best Practices

### Improve retrieval quality

- **Optimize embedding models**: Pick a model that fits the domain
- **Refine chunking strategies**: Overlap chunks, tune window sizes
- **Score & filter context**: Use metadata or ranking heuristics

### Handle structured and unstructured data

- Use a knowledge graph with native vector search
- The LangChain-Neo4j package supports both structured queries and vector search
- Wrap it in an agent that automatically picks the right method

### Tool routing

- The agent decides on its own whether to use vector search or a graph query
- Describe each tool clearly in the agent's Tool definitions
- Use descriptive prompts to guide the agent

### Handle vector search limitations

- Increase k cautiously
- Filter on a similarity threshold
- Combine with Cypher queries to validate results

### Testing and debugging

- Log every intermediate step: query embeddings, retrieved docs, prompt construction
- Use synthetic queries with known answers to validate retrieval
- Ask the system "Why did you say that?" to debug hallucinations

### Latency and scalability

- Cache query results and embedding computations
- Use lightweight models (GPT-3.5) for retrieval and GPT-4 for final answers
- Consider batching or asynchronous calls

## Common Pitfalls and Solutions

### Hallucination

- **Cause**: Insufficient retrieved context, or the LLM favoring fluency over factuality
- **Solution**: Improve retrieval quality and use GraphRAG for exact answers

### Redundant or irrelevant documents

- **Cause**: Embeddings that don't capture the meaning well, noisy source text
- **Solution**:
  - Use domain-specific embeddings
  - Pre-clean the text (remove boilerplate, headers)
  - Use node-level filters in Neo4j

### Limited vector search results

- **Cause**: Fixed top-k results even when similarity is low
- **Solution**:
  - Increase k cautiously and filter by threshold
  - Combine with Cypher queries to cross-reference

### Handling both structured and unstructured data

- **Problem**: Basic RAG only supports unstructured data
- **Solution**: Use a knowledge graph with native vector search (Neo4j)

## The Future of RAG

- **Structured RAG** is the next trend
- GraphRAG combines semantic vector search with structured graph reasoning
- Suited to production systems that need:
  - Accuracy and grounding in real data
  - Flexibility across use cases
  - Transparency and explainability
  - Enterprise scale

## References

- [What is GraphRAG?](https://neo4j.com/developer/graphrag/)
- [Knowledge Graphs & LLMs: Multi-Hop Question Answering](https://neo4j.com/developer/knowledge-graphs-llms/)
- [The Developer's Guide to Building a Knowledge Graph](https://neo4j.com/developer/knowledge-graphs/)
- [LangChain Library Adds Full Support for Neo4j Vector Index](https://neo4j.com/developer/langchain/)
- [Neo4j GraphAcademy – Neo4j & Generative AI Fundamentals](https://graphacademy.neo4j.com/)
- [GraphRAG DevOps Example on GitHub](https://github.com/neo4j/neo4j-graphrag)

> **See also:** [RAG Overview](/Technology/AI/Concepts/LLM And Generative AI/RAG/RAG Overview) · [Chunking Strategies](/Technology/AI/Concepts/LLM And Generative AI/RAG/Chunking Strategies) · [Vector Databases](/Technology/AI/Tools/Database/Vector Databases)
