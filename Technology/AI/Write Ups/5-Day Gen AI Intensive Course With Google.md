---
area: technology
domain: ai-ml
topic: generative-ai
type: case-study
title: 5-Day Gen AI Intensive Course With Google
description: Tóm tắt nội dung khóa học tự học "5-Day Gen AI Intensive" của Google trên Kaggle
timestamp: "2026-09-20T00:00:00.000Z"
tags:
  - technology
  - ai-ml
  - generative-ai
  - llm
  - kaggle
  - google
resource: https://www.kaggle.com/learn-guide/5-day-genai
---

# 5-Day Gen AI Intensive Course With Google — Ghi chú

> **Nguồn**: [5-Day Gen AI Intensive Course with Google](https://www.kaggle.com/learn-guide/5-day-genai) — Kaggle Learn Guide (bản gốc tổ chức live 31/03–04/04/2025, nay là self-paced guide)

## Tổng quan

Khóa học miễn phí gồm 5 ngày do Google phối hợp Kaggle tổ chức, cung cấp kiến thức nền tảng về Generative AI. Mỗi ngày gồm: 1 podcast tóm tắt, 1 whitepaper đọc thêm, và (hầu hết các ngày) một vài codelab thực hành trên Kaggle Notebook; có thêm livestream Q&A với các chuyên gia Google cho từng chủ đề. Cần tài khoản Kaggle (xác minh số điện thoại để chạy codelab) và tài khoản AI Studio (để lấy API key Gemini).

## Ngày 1 — Foundational LLMs & Prompt Engineering

- **Nội dung lý thuyết**: lịch sử phát triển của LLM — từ kiến trúc transformer đến các kỹ thuật fine-tuning, tăng tốc inference, và các mô hình reasoning. Whitepaper: _"Foundational Large Language Models & Text Generation"_ và _"Prompt Engineering"_.
- **Codelab**: làm quen Gemini API (các tham số ảnh hưởng đến prompt ra sao), và cách đánh giá output của LLM bằng autorater + structured output.
- **Tài liệu tùy chọn**: case study về một ngân hàng dùng prompt engineering nâng cao để tự động hóa quy trình tư vấn tài chính; bản ghi livestream với các diễn giả Google (Warren Barkley, Logan Kilpatrick, Kieran Milan, Anant Nawalgaria, Irina Sigler, Mat Velloso).

## Ngày 2 — Embeddings và Vector Stores/Databases

- **Nội dung lý thuyết**: nền tảng khái niệm của embeddings và vector database — cách sinh embedding, các thuật toán vector search, ứng dụng thực tế kết hợp LLM, và đánh đổi (tradeoff) giữa các phương pháp. Whitepaper: _"Embeddings and Vector Stores/Databases"_.
- **Codelab**: xây một hệ RAG hỏi-đáp trên tài liệu tùy chỉnh; khám phá độ tương đồng văn bản (text similarity) qua embeddings; dựng một mạng neural phân loại bằng Keras dùng embeddings.
- **Tùy chọn**: livestream với Andre Araujo, Patricia Florissi, Alan Li, Anant Nawalgaria, Xiaoqi Ren, Chuck Sugnet, Howard Zhou.

## Ngày 3 — Generative AI Agents

- **Nội dung lý thuyết**: các thành phần cốt lõi của AI agent, quy trình phát triển agent lặp lại (iterative), kiến trúc agent nâng cao (multi-agent systems), và cách đánh giá agent. Whitepaper chính: _"Generative AI Agents"_; whitepaper nâng cao (tùy chọn): _"Agents Companion"_.
- **Codelab**: cho chatbot dùng function calling để "nói chuyện" với database qua SQL tool (có ví dụ dùng Gemini 2.0 Live API); xây một agent nhận order tại quán café bằng **LangGraph**.
- **Tùy chọn**: case study về một nhà cung cấp giải pháp báo cáo tuân thủ (regulatory reporting) dùng hệ agentic GenAI để tự động hóa "ticket-to-code" trong phát triển phần mềm, đạt năng suất gấp 2.5 lần; livestream với Alan Blount, Antonio Gulli, Steven Johnson, Jaclyn Konzelmann, Patrick Marlow, Anant Nawalgaria, Julia Wiesinger.

## Ngày 4 — Domain-Specific LLMs

- **Nội dung lý thuyết**: cách xây dựng và ứng dụng các LLM chuyên biệt theo ngành như **SecLM** (an ninh mạng) và **MedLM/Med-PaLM** (y tế), có chia sẻ từ chính các nhà nghiên cứu tạo ra chúng. Whitepaper: _"Solving Domain-Specific Problems Using LLMs"_.
- **Codelab**: đưa dữ liệu thời gian thực vào model qua Google Search rồi trực quan hóa bằng công cụ vẽ đồ thị qua Live API; fine-tune một model Gemini tùy chỉnh bằng dữ liệu gán nhãn của riêng mình cho một tác vụ cụ thể.
- **Tùy chọn**: livestream với Donny Cheung, Scott Coull, Ewa Dominowska, Chris Grier, Anant Nawalgaria, Karthik Raman.

## Ngày 5 — MLOps cho Generative AI

- **Nội dung lý thuyết**: cách điều chỉnh các thực hành MLOps cho phù hợp với Generative AI, và cách tận dụng bộ công cụ của **Vertex AI** cho foundation model/ứng dụng GenAI (bao gồm AgentOps cho ứng dụng dạng agent). Whitepaper: _"MLOps for Generative AI"_.
- **Không có codelab riêng** — thay vào đó, livestream sẽ code-walkthrough/demo trực tiếp repo `goo.gle/agent-starter-pack` (khuyến khích đọc trước repo này).
- **Tùy chọn**: livestream với Sokratis Kartakis, Gabriela Hernandez Larios, Ivan Nardini, Anant Nawalgaria, Elia Secchi, Michael Styer, Saurabh Tiwary.

## Bonus & sau khóa học

- **Bonus notebook**: giới thiệu thêm một số khả năng khác của Gemini API chưa được đề cập trong 5 ngày chính (không đi kèm whitepaper/podcast).
- Sau khi hoàn thành, Kaggle gợi ý học tiếp guide **"AI Agents Intensive"** để đi sâu và thực hành nhiều hơn về AI agent.

## Tóm tắt nhanh theo ngày

| Ngày | Chủ đề                                    | Điểm nhấn thực hành                                             |
| ---- | ----------------------------------------- | --------------------------------------------------------------- |
| 1    | Foundational LLMs & Prompt Engineering    | Gemini API, prompt techniques, đánh giá bằng autorater          |
| 2    | Embeddings & Vector Stores/DB             | RAG QA system, text similarity, Keras classifier với embeddings |
| 3    | Generative AI Agents                      | Function calling + SQL, agent order-taking bằng LangGraph       |
| 4    | Domain-Specific LLMs (SecLM, Med-PaLM...) | Google Search grounding + visualize, fine-tune Gemini tùy chỉnh |
| 5    | MLOps cho GenAI                           | Vertex AI tooling, agent-starter-pack, AgentOps                 |
