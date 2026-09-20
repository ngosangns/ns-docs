---
area: technology
domain: ai-ml
type: resource
title: Multi Agent Systems
description: Multi-agent Systems
timestamp: '2026-06-19T13:43:26.163Z'
tags:
  - technology
  - ai-ml
resource: https://docs.agno.com/introduction
---
# Multi-agent Systems

- [What is Agno? - Agno](https://docs.agno.com/introduction) - Agno is a python framework for building multi-agent systems with shared memory, knowledge and reasoning.
- **TinyTroupe**: Thư viện Python thử nghiệm của Microsoft, sử dụng các mô hình ngôn ngữ lớn (LLMs) như GPT-4 để mô phỏng hành vi con người trong các môi trường ảo. TinyTroupe cho phép tạo ra các "TinyPerson" với tính cách, sở thích và mục tiêu riêng biệt, giúp nghiên cứu và thử nghiệm trong các lĩnh vực như quảng cáo, kiểm thử phần mềm và phát triển sản phẩm - [GitHub](https://github.com/microsoft/TinyTroupe) #multi-agent #LLM #simulation
- **Google ADK**: Bộ công cụ phát triển để xây dựng multi-agent systems, streaming agents, và các AI agents phức tạp #multi-agent #agents #google
- **Dify**: Nền tảng sẵn sàng cho sản xuất để phát triển các quy trình làm việc dựa trên agent và ứng dụng AI
  - Hỗ trợ xây dựng và triển khai các ứng dụng AI phức tạp với khả năng mở rộng cao
  - Cung cấp các công cụ và API để phát triển nhanh chóng
  - Hỗ trợ tích hợp với nhiều mô hình AI và dịch vụ
  - Giao diện trực quan để thiết kế workflows
  - Hỗ trợ RAG, agent workflows, và LLM orchestration
  - [GitHub](https://github.com/langgenius/dify) #agent #workflow #LLM #platform
  - [Website](https://dify.ai)- **TradingAgents**: Framework multi-agent LLM cho financial trading, mô phỏng cấu trúc của một trading firm thật. Mỗi vai trò là một agent chuyên biệt, tranh luận với nhau để chốt chiến lược:
  - **Analyst Team**: Fundamentals (báo cáo tài chính, intrinsic value), Sentiment (news headline + StockTwits + Reddit), News (macro/global events), Technical (MACD, RSI...)
  - **Researcher Team**: cặp bull/bear researcher debate có cấu trúc để cân gain vs risk
  - **Trader Agent**: tổng hợp report của analyst + researcher để quyết định timing và khối lượng lệnh
  - **Risk Management + Portfolio Manager**: đánh giá volatility/liquidity, duyệt hoặc từ chối đề xuất giao dịch; lệnh được duyệt sẽ chạy trên simulated exchange
  - Tính năng đáng chú ý: **point-in-time integrity** trên mọi data path (chống look-ahead bias), SEC EDGAR fundamentals đúng thời điểm filed, backtesting theo grid ticker × date, portfolio-aware runs, CLI có checkpoint resume; hỗ trợ nhiều LLM provider (Anthropic, OpenAI, Google, Bedrock, NVIDIA, Kimi, Groq, Mistral, Ollama, và endpoint OpenAI-compatible bất kỳ)
  - **Lưu ý**: tác giả nói rõ đây là framework cho mục đích nghiên cứu, không phải lời khuyên đầu tư
  - [GitHub](https://github.com/TauricResearch/TradingAgents) · [Paper (arXiv 2412.20138)](https://arxiv.org/abs/2412.20138) · Apache-2.0 #multi-agent #LLM #trading #finance #research
