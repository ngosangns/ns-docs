---
tags:
  - area/technology
  - domain/ai-ml
  - topic/rag
  - type/tutorial
  - lang/vi
---

# RAG Tutorial - Neo4j GraphRAG

> **Nguồn**: [RAG Tutorial: How to Build a RAG System on a Knowledge Graph](https://neo4j.com/blog/developer/rag-tutorial/)

## RAG là gì?

- **Retrieval-Augmented Generation (RAG)**: Kỹ thuật kết hợp tìm kiếm thông tin với việc tạo phản hồi từ LLM
- Giúp LLM truy cập thông tin cập nhật từ nguồn dữ liệu bên ngoài
- Giảm hallucination (ảo giác) bằng cách cung cấp context thực tế
- Không cần fine-tune model, chỉ cần cập nhật knowledge base

## Quy trình RAG cơ bản

1. **Chunking**: Chia tài liệu thành các đoạn nhỏ (chunks)
2. **Embedding**: Chuyển đổi chunks thành vector embeddings
3. **Storage**: Lưu trữ embeddings trong vector database
4. **Query**: Người dùng đặt câu hỏi
5. **Retrieval**: Tìm kiếm các chunks liên quan dựa trên similarity
6. **Augmentation**: Kết hợp query với retrieved context
7. **Generation**: LLM tạo câu trả lời dựa trên context

## Tại sao RAG hoạt động?

- **Grounding**: Cung cấp thông tin thực tế từ knowledge base thay vì dựa vào training data
- **Up-to-date**: Có thể cập nhật thông tin mới mà không cần retrain model
- **Transparency**: Có thể trace lại nguồn gốc thông tin (source attribution)
- **Cost-effective**: Rẻ hơn fine-tuning, chỉ cần query khi cần

## Các thành phần cốt lõi của RAG

### 1. Document Loader

- Trích xuất nội dung từ nhiều nguồn: PDF, web, database, API
- Ví dụ: LangChain DocumentLoaders

### 2. Text Splitter (Chunking)

- Chia tài liệu thành các đoạn nhỏ phù hợp
- Các phương pháp: fixed-size, recursive, semantic, document-based
- **Quan trọng**: Chunking strategy ảnh hưởng trực tiếp đến chất lượng retrieval

### 3. Embedding Model

- Chuyển đổi text thành vector
- Lựa chọn: OpenAI, Cohere, BGE, hoặc fine-tuned models
- Xem thêm: [[RAG Embedding Models]]

### 4. Vector Database

- Lưu trữ và tìm kiếm embeddings
- Ví dụ: Neo4j, Pinecone, Weaviate, Milvus, FAISS

### 5. LLM

- Tạo phản hồi dựa trên query + retrieved context
- Ví dụ: GPT-4, Claude, Llama

### 6. Retrieval Strategy

- Vector similarity search (semantic search)
- Hybrid search (kết hợp keyword + vector)
- Graph queries (structured queries)

## GraphRAG - RAG với Knowledge Graph

### GraphRAG là gì?

- **GraphRAG**: RAG implementation trên graph database
- Kết hợp semantic vector search với structured graph reasoning
- Sử dụng Neo4j làm knowledge graph + vector database

### Tại sao GraphRAG?

- **Structured + Unstructured**: Xử lý cả dữ liệu có cấu trúc và không có cấu trúc
- **Exact queries**: Trả lời chính xác các câu hỏi về quan hệ, số lượng, dependencies
- **Multi-hop reasoning**: Tìm kiếm qua nhiều bước quan hệ
- **Explainable**: Có thể giải thích được cách tìm ra câu trả lời
- **Scalable**: Phù hợp cho enterprise scale

### Kiến trúc GraphRAG

1. **Knowledge Graph Construction**
   - Tạo nodes và relationships từ documents
   - Sử dụng LLM để extract entities và relationships
   - Lưu trữ trong Neo4j

2. **Vector Index**
   - Tạo vector embeddings cho documents/chunks
   - Lưu trong Neo4j vector index

3. **Hybrid Retrieval**
   - Vector search cho semantic queries
   - Cypher queries cho structured queries
   - Agent routing để chọn phương pháp phù hợp

4. **Response Generation**
   - Kết hợp retrieved context với query
   - LLM tạo câu trả lời

## Hướng dẫn triển khai với Neo4j + LangChain

### Bước 1: Setup Neo4j

- Tạo Neo4j instance (AuraDB hoặc self-hosted)
- Cài đặt LangChain-Neo4j package

### Bước 2: Load và Chunk Documents

```python
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = PyPDFLoader("document.pdf")
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
chunks = text_splitter.split_documents(documents)
```

### Bước 3: Tạo Knowledge Graph

- Sử dụng LLM để extract entities và relationships
- Tạo nodes và relationships trong Neo4j

### Bước 4: Tạo Vector Index

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

### Bước 5: Retrieval và Generation

```python
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI

qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    retriever=vector_store.as_retriever(),
    return_source_documents=True
)

response = qa_chain.invoke({"query": "Câu hỏi của bạn"})
```

## Best Practices

### 1. Cải thiện chất lượng retrieval

- **Optimize embedding models**: Chọn model phù hợp với domain
- **Refine chunking strategies**: Overlap chunks, điều chỉnh window sizes
- **Score & filter context**: Sử dụng metadata hoặc ranking heuristics

### 2. Xử lý structured và unstructured data

- Sử dụng knowledge graph với native vector search
- LangChain-Neo4j package hỗ trợ cả structured queries và vector search
- Wrap trong agent để tự động chọn phương pháp phù hợp

### 3. Tool routing

- Agent tự động quyết định sử dụng vector search hay graph query
- Mô tả rõ ràng từng tool trong agent's Tool definitions
- Sử dụng descriptive prompts để guide agent

### 4. Xử lý vector search limitations

- Tăng k một cách thận trọng
- Filter dựa trên similarity threshold
- Kết hợp với Cypher queries để validate kết quả

### 5. Testing và debugging

- Log tất cả các bước trung gian: query embeddings, retrieved docs, prompt construction
- Sử dụng synthetic queries với known answers để validate retrieval
- Hỏi hệ thống "Why did you say that?" để debug hallucinations

### 6. Latency và scalability

- Cache query results và embedding calculations
- Sử dụng lightweight models (GPT-3.5) cho retrieval, GPT-4 cho final answers
- Xem xét batching hoặc asynchronous calls

## Common Pitfalls và Giải pháp

### 1. Hallucination

- **Nguyên nhân**: Retrieved context không đủ hoặc LLM ưu tiên fluency hơn factuality
- **Giải pháp**: Cải thiện retrieval quality, sử dụng GraphRAG cho exact answers

### 2. Redundant hoặc irrelevant documents

- **Nguyên nhân**: Embeddings không capture đúng ý nghĩa, noisy source text
- **Giải pháp**:
  - Sử dụng domain-specific embeddings
  - Pre-clean text (remove boilerplate, headers)
  - Sử dụng node-level filters trong Neo4j

### 3. Vector search results hạn chế

- **Nguyên nhân**: Fixed top-k results ngay cả khi similarity thấp
- **Giải pháp**:
  - Tăng k thận trọng và filter theo threshold
  - Kết hợp với Cypher queries để cross-reference

### 4. Xử lý cả structured và unstructured data

- **Vấn đề**: Basic RAG chỉ hỗ trợ unstructured data
- **Giải pháp**: Sử dụng knowledge graph với native vector search (Neo4j)

## Tương lai của RAG

- **Structured RAG** là xu hướng tiếp theo
- GraphRAG kết hợp semantic vector search với structured graph reasoning
- Phù hợp cho production systems cần:
  - Accuracy và grounding trong real data
  - Flexibility across use cases
  - Transparency và explainability
  - Enterprise scale

## Tài nguyên tham khảo

- [What is GraphRAG?](https://neo4j.com/developer/graphrag/)
- [Knowledge Graphs & LLMs: Multi-Hop Question Answering](https://neo4j.com/developer/knowledge-graphs-llms/)
- [The Developer's Guide to Building a Knowledge Graph](https://neo4j.com/developer/knowledge-graphs/)
- [LangChain Library Adds Full Support for Neo4j Vector Index](https://neo4j.com/developer/langchain/)
- [Neo4j GraphAcademy – Neo4j & Generative AI Fundamentals](https://graphacademy.neo4j.com/)
- [GraphRAG DevOps Example on GitHub](https://github.com/neo4j/neo4j-graphrag)