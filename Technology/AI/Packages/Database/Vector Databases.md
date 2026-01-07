---
tags:
  - area/technology
  - domain/ai-ml
  - topic/llm
  - type/resource
  - lang/vi
---

# Vector Databases & Indexing

## Tools

- [HelixDB](https://github.com/HelixDB/helix-db) is an open-source, high-performance graph-vector database designed for Retrieval-Augmented Generation (RAG) and AI applications. Built in Rust and powered by LMDB, it offers a unified platform for managing both graph relationships and vector embeddings, streamlining the development process for AI-driven systems.

## Context store

- Context7 - https://context7.com: Context7 là một máy chủ MCP (Model Context Protocol) được phát triển bởi Upstash, nhằm cung cấp tài liệu chính thức và ví dụ mã cập nhật theo thời gian thực cho các mô hình ngôn ngữ lớn (LLMs) và trợ lý lập trình AI như Cursor, Claude Desktop, VS Code, Windsurf, v.v.
- Airweave AI: Airweave là một công cụ cho phép các agent tìm kiếm ngữ nghĩa trên bất kỳ ứng dụng nào. Nó tương thích với MCP và kết nối liền mạch bất kỳ ứng dụng, cơ sở dữ liệu hoặc API nào để biến nội dung của chúng thành kiến thức sẵn sàng cho agent.

## RAG (Retrieval-Augmented Generation)

- Weaviate: CSDL vector mã nguồn mở, cloud-native, tìm kiếm ngữ nghĩa, tích hợp LLM.
- Milvus: CSDL vector mã nguồn mở, chuyên quản lý/tìm kiếm vector quy mô lớn, phân tán, mở rộng cao.
- Faiss: Thư viện tìm kiếm tương đồng vector hiệu quả của Facebook AI, tối ưu tốc độ/bộ nhớ, không phải DB hoàn chỉnh.
- Cognita: Framework mã nguồn mở xây dựng ứng dụng RAG, đơn giản hóa phát triển, kiến trúc module hóa, hỗ trợ đa dạng thành phần và tính năng nâng cao.
- LLMWare: Framework mã nguồn mở xây dựng ứng dụng LLM doanh nghiệp (RAG, Agent), cung cấp công cụ pipeline RAG, hỗ trợ nhiều loại dữ liệu, chạy được trên CPU.
- GraphRAG: Kỹ thuật kết hợp RAG với đồ thị tri thức để cải thiện ngữ cảnh LLM, giúp hiểu sâu sắc, truy vấn phức tạp, tăng giải thích được, giảm nhiễu.
- **Trieve**: Nền tảng tất cả trong một cho tìm kiếm, gợi ý, RAG và phân tích, được cung cấp qua API - https://github.com/devflowinc/trieve #RAG #search #vector
- **Quivr**: Giải pháp RAG (Retrieval-Augmented Generation) cho việc tích hợp GenAI vào ứng dụng, hỗ trợ nhiều mô hình ngôn ngữ lớn (LLM) và kho vector - [GitHub](https://github.com/QuivrHQ/quivr) #RAG #LLM #vector
