---
tags:
  - area/technology
  - domain/ai-ml
  - topic/llm
  - type/resource
  - lang/vi
---

# Chunking trong RAG

## Vai trò của Chunking

- Chia nhỏ văn bản (chunking) là bước quan trọng trong hệ thống RAG để tối ưu hóa truy xuất và sử dụng thông tin
- Ảnh hưởng trực tiếp đến chất lượng kết quả truy xuất và phản hồi của mô hình

## Các loại Chunking

### Fixed Size Chunking

- Chia văn bản thành các đoạn có kích thước cố định dựa trên số lượng ký tự
- Đơn giản nhưng có thể cắt ngang ý nghĩa của câu hoặc đoạn văn

### Recursive Chunking

- Chia văn bản dựa trên cấu trúc như dấu xuống dòng, sau đó áp dụng Fixed Size Chunking
- Tôn trọng cấu trúc tự nhiên của văn bản hơn

### Document-Based Chunking

- Chia tài liệu dựa trên cấu trúc vốn có của nó (tiêu đề, phần, chương)
- Phù hợp với tài liệu có cấu trúc rõ ràng

### Semantic Chunking

- Chia văn bản dựa trên ý nghĩa ngữ nghĩa, nhóm các câu hoặc đoạn văn có liên quan về mặt ngữ nghĩa
- **Cách hoạt động**:
  1. Chia tài liệu thành các đoạn nhỏ
  2. Nhúng (embed) các đoạn thành vector
  3. So sánh độ tương đồng giữa các đoạn liên tiếp
  4. Gộp các đoạn có độ tương đồng cao (vượt ngưỡng nhất định) để tạo thành các chunk mang ý nghĩa riêng
- **Thông số quan trọng**:
  - `buffer_size`: Số lượng câu gộp thành một nhóm trước khi thực hiện semantic chunking
  - `threshold`: Ngưỡng độ tương đồng để quyết định gộp các đoạn
- Hiệu quả hơn trong việc tạo ra các chunk có ý nghĩa hoàn chỉnh

### Agentic Chunking

- Sử dụng LLM để tự động chia nhỏ tài liệu
- LLM có thể hiểu ngữ cảnh và cấu trúc phức tạp để tạo ra các chunk tối ưu

## Proposition-Based Retrieval

- Phương pháp nâng cao trong RAG, tập trung vào việc truy xuất các mệnh đề (proposition) thay vì các đoạn văn bản lớn
- Giúp nâng cao hiệu suất RAG bằng cách truy xuất thông tin chính xác và liên quan hơn

## ChunkFormer

**ChunkFormer**: Masked Chunking Conformer cho long-form speech transcription (ICASSP 2025)
- Long-form transcription: xử lý audio lên đến 16 tiếng với model 110M tham số trên GPU 80GB (4 tiếng trên GPU 24GB)
- Endless decoding: xử lý audio dài trên GPU bộ nhớ hạn chế mà không mất context (history và future context) nhờ streaming
- Masked Batching Technique: loại bỏ padding trong batch, tối ưu xử lý audio có độ dài khác nhau
- Model train trên 3000h dữ liệu public tiếng Việt: [HuggingFace](https://huggingface.co/khanhld/chunkformer-large-vie) | [GitHub](https://github.com/khanld/chunkformer) | [Paper](https://github.com/khanld/chunkformer/blob/main/docs/paper.pdf) #ASR #speech2text #long-form #Vietnamese #ZaloAI
