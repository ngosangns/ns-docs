---
area: technology
domain: ai-frameworks
type: resource
title: Agent Frameworks
description: Curated list of open-source AI frameworks and platforms for infrastructure, fine-tuning, research agents, conversational AI, education, computer vision, edge computing, and finance.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - ai-frameworks
  - agents
resource: https://github.com/exo-explore/exo
---

# Agent Frameworks

## AI Infrastructure

- **Exo**: Lets you run your own AI cluster at home using everyday devices - [GitHub](https://github.com/exo-explore/exo) #AI-cluster #infrastructure
- **YEScale**: Provides infrastructure for enterprise large language models (LLMs), helping deploy and manage AI models efficiently
  - Professional LLM infrastructure for enterprises
  - Supports deploying and managing large language models
  - Website: https://yescale.io/ #LLM #infrastructure #enterprise
- **nanoGPT**: The simplest, fastest repository for training/fine-tuning medium-sized GPT models - [GitHub](https://github.com/karpathy/nanoGPT) #GPT #training
- **nanochat**: The best ChatGPT that $100 can buy - [GitHub](https://github.com/karpathy/nanochat) #LLM #chatbot
- **LLaMA-Factory**: Unified platform for efficiently fine-tuning 100+ large language models (LLMs) and vision-language models (VLMs)
  - Supports multiple fine-tuning methods: LoRA, QLoRA, full fine-tuning
  - Integrates with popular frameworks such as PEFT and TRL
  - Supports RLHF (Reinforcement Learning from Human Feedback)
  - Web UI and CLI for managing the training process
  - Detailed documentation and an active support community
  - [GitHub](https://github.com/hiyouga/LLaMA-Factory) #fine-tuning #LLM #training #LoRA
  - [Documentation](https://llamafactory.readthedocs.io)
- **Jan-Nano**: A 4-billion-parameter language model designed for deep research tasks, optimized for integration with Model Context Protocol (MCP) servers
  - **Size**: 4B parameters
  - **Base model**: Qwen/Qwen3-4B-Base
  - **Characteristics**: Non-thinking model, optimized for deep research tasks
  - **MCP integration**: Optimized to work with MCP servers, enabling effective integration with research tools and data sources
  - **Evaluation**: Evaluated on the SimpleQA benchmark using an MCP-based benchmarking method
  - **Running locally**: Supports vLLM with recommended sampling parameters (Temperature: 0.7, Top-p: 0.8, Top-k: 20, Min-p: 0)
  - **Support**: The Jan app (an open-source ChatGPT alternative) runs entirely on a personal computer
  - [HuggingFace](https://huggingface.co/Menlo/Jan-nano) | [GitHub](https://github.com/menloresearch/jan-nano) #LLM #research #MCP #4B #agentic
- **AdalFlow**: Open-source platform for building and deploying AI applications easily and efficiently - [GitHub](https://github.com/SylphAI-Inc/AdalFlow) #AI-workflow #platform
- **lance-format/lance**: Open-source data format designed for high performance in machine learning and data analytics applications - [GitHub](https://github.com/lance-format/lance) #data-format #ML
- **Deploying-AI-IoT-Applications**: Documentation and guides for deploying AI and IoT applications - [GitHub](https://github.com/FIT-DNU/Deploying-AI-IoT-Applications) #AI #IoT #deployment
- **Deer Flow**: Community-driven deep research framework that combines large language models (LLMs) with specialized tools such as web search, crawling, and Python execution. The goal is an efficient, automated research workflow - [GitHub](https://github.com/bytedance/deer-flow) #research #LLM #workflow #ByteDance
- **DeerFlow**: Personal research assistant offering tools such as web search, a web crawler, Python services, and MCP to deliver instant information, comprehensive reports, and engaging podcasts - [Website](https://deerflow.tech/) #research-assistant #MCP #tools

## Conversational AI

- **Storm**: Open-source platform for developing and deploying intelligent conversational applications, supporting multiple languages and integrating with various AI services - [GitHub](https://github.com/stanford-oval/storm) #conversationalAI #chatbot

## AI Infrastructure & Data Platforms

- **Hash.ai**: Platform that integrates data, improves decisions, and optimizes processes with AI
  - Governance-first approach, suited to safety-critical and high-reliability AI applications
  - Open source, used by businesses with billions of dollars in annual revenue
  - Key features:
    - **HASH Web**: Create a HASH "web" that integrates information from many sources (apps, files, email, physical sensors, databases, the web), automatically updating, cleaning, and structuring data, with a self-maintaining knowledge graph
    - **Process optimization and automation**: Map processes, improve decisions, and use AI agents to automate
    - **Knowledge Graph for AI**: Gives AI full context while ensuring secure, controlled data access
  - Technical characteristics: Enterprise-grade security, fine-grained permissions, open source, multi-user support, unlimited history, provenance guarantees, two-way sync, real-time data
  - Use cases: Demand forecasting, forecasting and preventing stock-outs, safety-critical AI applications, data integration from multiple sources, business process optimization
  - Website: https://hash.ai/ #AI-platform #data-integration #knowledge-graph #governance

## Education AI

- **DeepTutor**: AI-powered personalized learning assistant that delivers a customized learning experience for users
  - Uses deep learning algorithms to analyze learning needs and deliver suitable content
  - Analyzes each user's learning progress
  - Recommends appropriate materials and exercises
  - Friendly, easy-to-use interface
  - [GitHub](https://github.com/HKUDS/DeepTutor) #education #tutoring #personalized-learning #AI
  - [Website](https://hkuds.github.io/DeepTutor)

## Computer Vision

- **Deep-Live-Cam**: Live camera application that uses deep learning to improve image quality and provide advanced features - [GitHub](https://github.com/hacksider/Deep-Live-Cam) #computerVision #deepLearning #liveCamera
- [Pose Estimation](/Technology/AI/Practices/Pose Estimation): The problem of estimating pose in computer vision, identifying the positions of joints and body parts. Two popular solutions: YOLO-Pose (Ultralytics) and MediaPipe Pose (Google) #poseEstimation #computerVision

## Machine Learning Libraries

- **FlashMLA**: Lightweight machine learning library designed for fast, efficient deployment of ML models in real-world applications - [GitHub](https://github.com/deepseek-ai/FlashMLA) #ML #library #lightweight

## AI Edge Computing

- **Google AI Edge Gallery**: Collection of AI models and applications optimized for edge devices, helping deploy AI on resource-constrained hardware - [GitHub](https://github.com/google-ai-edge/gallery) #AI #edge #gallery

## Finance AI

- **FinGPT**: Open-source GPT platform for finance, providing large language models (LLMs) specialized for the financial domain - [GitHub](https://github.com/AI4Finance-Foundation/FinGPT) #finance #LLM #GPT #open-source

> **See also:** [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) · [Multi Agent Systems](/Technology/AI/Tools/Agents/Multi Agent Systems) · [Agents Overview](/Technology/AI/Tools/Agents/Agents Overview)
