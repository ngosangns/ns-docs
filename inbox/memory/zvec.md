# ZVec - In-Process Vector Database

## Định nghĩa

**ZVec** là một open-source, in-process vector database — nhẹ, nhanh, và được thiết kế để embed trực tiếp vào applications. Được xây dựng trên Proxima (vector search engine đã được Alibaba kiểm chứng trong production), cung cấp similarity search tốc độ cao, low-latency và scalable với minimal setup.

## Key Metrics

- **Stars**: 9.3k
- **Forks**: 531
- **License**: Apache-2.0
- **Latest**: v0.3.0 (April 3, 2026)

## Tính năng chính

### Blazing Fast
- Searches hàng tỷ vectors trong milliseconds
- Production-grade performance

### Simple, Just Works
- Install và start searching trong seconds
- Không servers hay config

### Dense + Sparse Vectors
- Native support cho multi-vector queries trong một call

### Hybrid Search
- Kết hợp semantic similarity với structured filters

### Runs Anywhere
- Notebooks, servers, CLI tools, edge devices

## Cài đặt

### Python
```bash
pip install zvec
```
Yêu cầu: Python 3.10-3.14

### Node.js
```bash
npm install @zvec/zvec
```

### Supported Platforms
- Linux (x86_64, ARM64)
- macOS (ARM64)
- Windows (x86_64)

## Python API

```python
import zvec

# Create schema
schema = zvec.CollectionSchema(
    name="example",
    vectors=zvec.VectorSchema(
        "embedding",
        zvec.DataType.VECTOR_FP32,
        4
    )
)

# Create and open collection
collection = zvec.create_and_open(path="./zvec_example", schema=schema)

# Insert documents
collection.insert([
    zvec.Doc(
        id="doc_1",
        vectors={"embedding": [0.1, 0.2, 0.3, 0.4]}
    )
])

# Query
results = collection.query(
    zvec.VectorQuery(
        "embedding",
        vector=[0.4, 0.3, 0.3, 0.1]
    ),
    topk=10
)

print(results)
```

## Use Cases

- **Vector search**: Dense vector similarity search
- **ANN search**: Approximate nearest neighbor
- **Embedded database**: In-process vector storage
- **RAG applications**: Retrieval-augmented generation
- **Agent memory**: Store embeddings cho AI agents

## Tech Stack

| Language | Percentage |
|----------|------------|
| C++ | 79.8% |
| SWIG | 7.8% |
| Python | 7.6% |
| C | 3.5% |
| CMake | 1.2% |

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| In-process | Không cần server, chạy trong app |
| Blazing fast | Milliseconds cho hàng tỷ vectors |
| Simple | Install và use trong seconds |
| Hybrid search | Semantic + structured filters |
| Multi-platform | Linux, macOS, Windows |
| Apache 2.0 | Open source permissive |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| Không phải memory system | Chỉ là vector DB, không có memory features |
| Cần embedding model | Phải tự generate embeddings |
| Limited features | Focused on vector search, không có advanced ML |

## Sử dụng khi nào

- **RAG applications**: Cần fast vector search
- **Embedded systems**: Không muốn deploy separate DB
- **Edge devices**: Lightweight vector search
- **Agent memory**: Store embeddings cho AI agents
- **High performance**: Khi speed quan trọng nhất

---

**Tài liệu tham khảo**: 
- [alibaba/zvec](https://github.com/alibaba/zvec)
- [Quickstart](https://zvec.org/en/docs/quickstart/)
- [Docs](https://zvec.org/en/docs/)
- [Benchmarks](https://zvec.org/en/docs/benchmarks/)