---
area: technology
domain: multi-agent
type: resource
title: Multi Agent Systems
description: Curated list of frameworks and platforms for building multi-agent systems, including Agno, TinyTroupe, Google ADK, Dify, and TradingAgents.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - multi-agent
  - agents
  - llm
resource: https://docs.agno.com/introduction
---

# Multi Agent Systems

- [What is Agno? - Agno](https://docs.agno.com/introduction) - Agno is a python framework for building multi-agent systems with shared memory, knowledge and reasoning.
- **TinyTroupe**: Experimental Python library from Microsoft that uses large language models (LLMs) such as GPT-4 to simulate human behavior in virtual environments. TinyTroupe lets you create "TinyPerson" agents with distinct personalities, interests, and goals, supporting research and experimentation in areas such as advertising, software testing, and product development - [GitHub](https://github.com/microsoft/TinyTroupe) #multi-agent #LLM #simulation
- **Google ADK**: Development kit for building multi-agent systems, streaming agents, and sophisticated AI agents #multi-agent #agents #google
- **Dify**: Production-ready platform for developing agent-based workflows and AI applications
  - Supports building and deploying complex, highly scalable AI applications
  - Provides tools and APIs for rapid development
  - Integrates with many AI models and services
  - Visual interface for designing workflows
  - Supports RAG, agent workflows, and LLM orchestration
  - [GitHub](https://github.com/langgenius/dify) #agent #workflow #LLM #platform
  - [Website](https://dify.ai)
- **TradingAgents**: Multi-agent LLM framework for financial trading that mirrors the structure of a real trading firm. Each role is a specialized agent, and they debate one another to settle on a strategy:
  - **Analyst Team**: Fundamentals (financial reports, intrinsic value), Sentiment (news headlines + StockTwits + Reddit), News (macro/global events), Technical (MACD, RSI, and so on)
  - **Researcher Team**: a bull/bear researcher pair holds a structured debate to weigh gain against risk
  - **Trader Agent**: combines the analyst and researcher reports to decide the timing and size of orders
  - **Risk Management + Portfolio Manager**: assesses volatility/liquidity and approves or rejects trade proposals; approved orders run on a simulated exchange
  - Notable features: **point-in-time integrity** on every data path (guards against look-ahead bias), SEC EDGAR fundamentals as of the filing date, backtesting over a ticker × date grid, portfolio-aware runs, a CLI with checkpoint resume; supports many LLM providers (Anthropic, OpenAI, Google, Bedrock, NVIDIA, Kimi, Groq, Mistral, Ollama, and any OpenAI-compatible endpoint)
  - **Note**: the authors state clearly that this is a research framework, not investment advice
  - [GitHub](https://github.com/TauricResearch/TradingAgents) · [Paper (arXiv 2412.20138)](https://arxiv.org/abs/2412.20138) · Apache-2.0 #multi-agent #LLM #trading #finance #research

> **See also:** [Agents Overview](/Technology/AI/Tools/Agents/Agents Overview) · [Agent Frameworks](/Technology/AI/Tools/Agents/Agent Frameworks) · [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms)
