---
tags:
  - area/technology
  - domain/ai-ml
  - topic/llm
  - type/resource
  - lang/vi
---

# Specialized Models

## Text Embedding Models & Vietnamese Retrieval Datasets

### Vietnamese Embedding Models

- **Vietnamese_Embedding**: Mô hình nhúng ngôn ngữ Việt Nam được tinh chỉnh từ mô hình BGE-M3, nhằm nâng cao khả năng truy xuất thông tin cho tiếng Việt - [HuggingFace](https://huggingface.co/AITeamVN/Vietnamese_Embedding) #embedding #Vietnamese #BGE-M3 #retrieval

### GreenNode Text Embedding Models

- **Team**: GreenNode
- **Models**: https://huggingface.co/collections/GreenNode/greennode-text-embedding-models-66a75c00889910bc76007de5
- **Đặc điểm**:
  - Fine-tuned từ dataset Table Markdown Retrieval (chỉ dùng tập trained)
  - Đứng đầu về retrieval dữ liệu dạng bảng (markdown) cho tiếng Việt so với các model opensource và closed source
  - Model `GreenNode/GreenNode-Embedding-Large-VN-Mixed-V1`: Interpolating giữa model finetuned và BAAI/bge-m3 (model gốc) để tránh overfitting và giữ performance với các tasks khác
- **Key finding**: Interpolation model finetuned và model gốc có thể tạo ra model vượt trội hơn cả hai do vừa có weight của model finetuned (task specific) và weight của model gốc (more general)

### GreenNode Table Markdown Retrieval Dataset

- **Dataset**: https://huggingface.co/datasets/GreenNode/GreenNode-Table-Markdown-Retrieval-VN
- **Đặc điểm**:
  - Được tạo từ LLM 70B với dữ liệu thực tế, format dạng context retrieval
  - Context (corpus) chính là dạng text + markdown table
  - Train: ~143k samples, Test (eval): ~35k samples (hay Corpus 44.7k samples, Queries 179k samples)
- **Key finding**: Dùng LLM để synthesize data theo dạng markdown có thể làm giàu dữ liệu, nhưng cần có bước kiểm định chất lượng của data được sinh ra

### MTEB Benchmark Tasks

- **Repository**: https://github.com/embeddings-benchmark/mteb
- **Sử dụng**:

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

- **Motivation**: Các hệ thống chatbot có RAG, GraphRAG đều cần embedding text để encode và retrieve dữ liệu (text, table, image, etc). Phần lớn các open-source + product đang convert data ở mọi định dạng sang text, markdown, HTML để truy xuất dữ liệu trả về dạng text cho LLM hiểu và generate được câu trả lời (ví dụ: llamaIndex, Langchain, Microsoft Markitdown)
- **Pain point**: Khi build chatbot có quá nhiều dữ liệu dạng Table nhưng model hiện tại chưa đáp ứng được
