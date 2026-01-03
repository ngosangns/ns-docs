---
tags:
  - area/technology
  - domain/ai-ml
  - topic/rag
  - type/guide
  - lang/vi
---

# RAG Embedding Models - Lựa chọn Embedding cho RAG

## Mục tiêu của Embedding trong RAG

- Biểu diễn văn bản (câu, đoạn) thành vector trong không gian nhiều chiều
- Đảm bảo các đoạn có ngữ nghĩa tương tự nhau nằm gần nhau trong không gian embedding
- Dùng để truy xuất bằng vector search (FAISS, Milvus, Weaviate, v.v.)
- **Quan trọng**: Nếu truy xuất không tốt, dù LLM mạnh đến đâu cũng không thể sinh ra câu trả lời chất lượng

## So sánh các loại Embedding phổ biến

### OpenAI Embedding (text-embedding-3-small, text-embedding-3-large)

**Ưu điểm:**

- Rất mạnh, huấn luyện trên tập dữ liệu cực lớn
- Tối ưu cho truy vấn ngôn ngữ tự nhiên

**Nhược điểm:**

- Cần gọi API, tính phí
- Không host được local

**Dùng khi:**

- Muốn độ chính xác cao
- Không giới hạn tài nguyên
- Dùng kèm GPT-4

### Cohere Embedding (embed-english-v3.0, embed-multilingual-v3.0)

**Ưu điểm:**

- Hiệu suất rất tốt
- Hỗ trợ đa ngôn ngữ
- API dễ dùng

**Nhược điểm:**

- Vẫn cần gọi API
- Phí rẻ hơn OpenAI nhưng vẫn tính tiền

**Dùng khi:**

- Cần làm RAG đa ngôn ngữ (Việt - Anh - Nhật...)
- Kết hợp với LLM nhỏ

### BAAI/BGE (BGE-small, BGE-base, BGE-large)

**Ưu điểm:**

- Miễn phí
- Mạnh, có bản multilingual (bge-m3)
- Được cộng đồng ủng hộ rộng rãi

**Nhược điểm:**

- Cần GPU để host local
- Có thể cần fine-tune cho domain-specific

**Dùng khi:**

- Muốn self-host
- Tiết kiệm chi phí
- Vẫn đạt hiệu năng cao

### Tự huấn luyện (Fine-tune Embedding Model)

**Ưu điểm:**

- Tối ưu cho domain riêng (y tế, pháp luật, tài chính...)
- Tăng độ chính xác retrieval

**Nhược điểm:**

- Cần tập dữ liệu triplet (query, positive, negative)
- Công sức huấn luyện

**Dùng khi:**

- Xây RAG cho một ngành cụ thể
- Cần precision cao nhất

## Kết luận

- **Không có mô hình embedding nào tốt nhất cho mọi trường hợp**
- Chọn theo:
  - Ngữ cảnh sử dụng
  - Ngân sách
  - Mức độ kiểm soát cần thiết
- **Nếu mới bắt đầu**: `bge-base-en` hoặc `all-MiniLM` là lựa chọn tuyệt vời để khởi động
