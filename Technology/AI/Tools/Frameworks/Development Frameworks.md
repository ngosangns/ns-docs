---
area: technology
domain: machine-learning
type: guide
title: Development Frameworks
description: Guide to JAX (autodiff, JIT, vectorization, scaling) plus a curated list of LLM application frameworks, agent tooling, and supporting libraries.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - machine-learning
  - jax
  - llm
  - frameworks
resource: https://docs.jax.dev
---

# Development Frameworks

## JAX

### Overview

- JAX is Google's open-source Python library that lets you transform Python+NumPy programs
- Combines autograd and XLA (Accelerated Linear Algebra) to optimize computation
- Provides a NumPy-like interface that runs on CPU, GPU, and TPU
- Developed by Google with contributions from Nvidia and the community
- Apache-2.0 license

### Key Features

#### Automatic Differentiation

- Use `jax.grad` to compute gradients efficiently in reverse mode
- Can differentiate to any order
- Supports Python control flow (if/else, loops) during differentiation
- Automatically re-evaluates the function when needed

#### Just-In-Time Compilation

- Uses XLA to compile functions end-to-end with `jax.jit`
- Can be used as the `@jit` decorator or as a higher-order function
- Optimizes performance by fusing element-wise operations
- Some restrictions on Python control flow apply when using JIT

#### Auto-vectorization

- Use `jax.vmap` to map a function along array axes
- Instead of looping over function calls, pushes the loop down into primitive operations
- Turns matrix-vector multiplies into matrix-matrix multiplies for better performance
- Can be combined with `grad` and `jit` to compute per-example gradients or Jacobian matrices efficiently

### Scaling

- Supports scaling computation across thousands of devices
- Three parallelization modes:
  - **Auto**: Compiler-based automatic parallelization; you program as if for one global machine, and the compiler chooses how to shard data and partition computation
  - **Explicit**: Explicit sharding with automatic partitioning; you have a global view, but data shardings are specified explicitly in JAX types
  - **Manual**: Per-device programming; you have a per-device view and can communicate with explicit collectives
- Supports FSDP (Fully Sharded Data Parallel) for parameters
- Supports batch parallelism for data

### Supported Platforms

| Platform            | CPU | NVIDIA GPU   | Google TPU | AMD GPU      | Apple GPU    | Intel GPU    |
| ------------------- | --- | ------------ | ---------- | ------------ | ------------ | ------------ |
| Linux x86_64        | ✅  | ✅           | ✅         | ✅           | N/A          | Experimental |
| Linux aarch64       | ✅  | ✅           | N/A        | ❌           | N/A          | N/A          |
| Mac aarch64         | ✅  | N/A          | N/A        | N/A          | Experimental | N/A          |
| Windows x86_64      | ✅  | ❌           | N/A        | ❌           | N/A          | ❌           |
| Windows WSL2 x86_64 | ✅  | Experimental | N/A        | Experimental | N/A          | ❌           |

### Installation

- CPU: `pip install -U jax`
- NVIDIA GPU: `pip install -U "jax[cuda13]"`
- Google TPU: `pip install -U "jax[tpu]"`
- AMD GPU (Linux): Follow AMD's instructions
- Mac GPU: Follow Apple's instructions
- Intel GPU: Follow Intel's instructions

### Notes

- JAX is a research project, not an official Google product
- There are some "gotchas" and "sharp bits" to watch out for (see the Gotchas Notebook)
- Can be integrated with existing frameworks such as TensorFlow and PyTorch

### References

- Website: https://docs.jax.dev
- GitHub: https://github.com/jax-ml/jax
- Reference documentation: https://jax.readthedocs.io
- Developer documentation: https://jax.readthedocs.io/en/latest/developer.html

## LLM Frameworks

- OpenCopilot: https://github.com/openchatai/OpenCopilot #OpenCopilot
- https://aistudio.google.com #GoogleAI
- CoreNet: A library for training deep neural networks: https://github.com/apple/corenet #CoreNet
- Triton language - a language and compiler for writing highly efficient custom Deep-Learning primitives: https://github.com/triton-lang/triton #Triton
- **Flax**: A neural network library for JAX, designed for flexibility. Flax NNX is the new API released in 2024; it simplifies creating, inspecting, debugging, and analyzing neural networks in JAX by adding first-class support for Python reference semantics - [GitHub](https://github.com/google/flax) #JAX #neuralNetwork #framework
- **LLM-App**: Open-source framework for developing applications that use large language models, providing tools and interfaces to integrate LLMs into real-world applications - [GitHub](https://github.com/pathwaycom/llm-app) #LLM #framework #application
- **FastRTC**: Open-source platform for building real-time communication applications, supporting audio, video, and integration with large language models (LLMs) - [GitHub](https://github.com/gradio-app/fastrtc) #realtime #communication #LLM
- [MLX Server – OpenAI-Compatible API](https://github.com/cubist38/mlx-server-OAI-compat)
  - High-performance API server for MLX models, compatible with OpenAI.
  - Built with Python and FastAPI; runs language and vision models on macOS M-series. #MLX #API #OpenAI
- [LangSmith – Monitoring and Evaluating AI Applications](https://www.langchain.com/langsmith)
  - Platform for debugging, testing, and monitoring the performance of AI applications.
  - Supports tracing, evaluation with LLM-as-Judge, and collecting user feedback.
  - Does not require LangChain; supports Python, TypeScript, and OpenTelemetry. #LangSmith #debug #test
- [LiteLLM – Unified Interface for 100+ LLMs](https://docs.litellm.ai/docs/)
  - Call more than 100 LLMs using the OpenAI format.
  - Supports retries, fallbacks, cost tracking, and per-project budgets.
  - Provides a Proxy Server and a Python SDK for flexible integration. #LiteLLM #API #LLM
- [OpenUI – Design User Interfaces with Your Imagination](https://github.com/wandb/openui?tab=readme-ov-file)
  - Tool that lets you describe a UI in natural language and see the result live.
  - Supports converting HTML to React, Svelte, Web Components, and more.
  - Suited to experimenting with and prototyping LLM-powered applications. #OpenUI #UI #design
- **Gemini Fullstack LangGraph Quickstart**: Google sample project showing how to build a full-stack application with LangGraph and Gemini AI - [GitHub](https://github.com/google-gemini/gemini-fullstack-langgraph-quickstart) #LangGraph #Gemini #fullstack
- **LangGraph** – Building Stateful LLM Applications with Graphs:
  - A library built on top of LangChain, dedicated to creating stateful, multi-actor LLM applications.
  - Lets you define a workflow as a graph, where "nodes" can be LLM calls, tool use, or any custom logic.
  - Supports state management between workflow steps, making it possible to build complex agents that can make decisions and iterate.
  - Ideal for applications that need complex action chains, decisions based on earlier results, or coordination of multiple models/tools.
  - The core concept is defining computation as a graph:
    - Nodes: Represent processing steps (LLM calls, tool use, custom logic).
    - Edges: Define transitions between nodes. They can be fixed or conditional.
  - State is passed between nodes and is mutable.
  - Supports cycles in the graph, which is essential for agent behavior (plan, act, observe, repeat).
  - Main components:
    - `StateGraph`: Defines the state structure, nodes, and edges.
    - Nodes: Functions or runnables that operate on the state.
    - Edges: Define how to move from one node to another.
    - State: A data model (usually Pydantic) that stores information.
  - Common use cases:
    - Building complex agents.
    - Coordinated multi-agent systems.
    - Complex workflows that require state management.
    - Chatbots with memory and decision-making ability.
  - Advantages:
    - Clear, explicit state management.
    - Easy visualization of the workflow.
    - Handles complex control flow (loops, branching).
    - Leverages the LangChain ecosystem.
  - Documentation:
    - https://viblo.asia/s/hanh-trinh-kham-pha-langgraph-muon-hero-ban-phai-bat-dau-tu-zero-vlZL9lMdJQK
  - #LangGraph #LLM #framework
- llmware: Framework that connects enterprise knowledge with LLMs. https://github.com/llmware-ai/llmware
- Composio: Provides 100+ integrations for AI agents. https://github.com/ComposioHQ/composio
- [openai/gym: A toolkit for developing and comparing reinforcement learning algorithms.](https://github.com/openai/gym)
- Prompt & flow optimizing: [SylphAI-Inc/AdalFlow: AdalFlow: The library to build & auto-optimize LLM applications.](https://github.com/SylphAI-Inc/AdalFlow)
- [Auto-Claude: Autonomous multi-session AI coding framework](https://github.com/AndyMik90/Auto-Claude)
  - Framework that automates programming with AI, letting agents plan, build, and validate software on their own.
  - Supports parallel execution with multiple agents working in isolated workspaces (git worktrees), and has an automated QA system.
  - Provides a desktop app for Windows, macOS, and Linux. #AutoClaude #agent #coding
- [valtec-tts: Text-to-Speech tool](https://github.com/tronghieuit/valtec-tts) #TTS #text2speech
- [LTEngine: Local AI Machine Translation](https://github.com/LibreTranslate/LTEngine)
  - Open-source local machine translation API written in Rust, fully self-hosted and compatible with LibreTranslate.
  - Translation is powered by large language models (LLMs) running locally through llama.cpp. #translation #LLM #local
- [MiroThinker](https://github.com/MiroMindAI/MiroThinker): AI thinking and reasoning framework. #AI #reasoning
- [valuecell](https://github.com/ValueCell-ai/valuecell): AI-powered value and data processing tool. #AI #dataProcessing

## Data Extractor

- [google/langextract: A Python library for extracting structured information from unstructured text using LLMs with precise source grounding and interactive visualization.](https://github.com/google/langextract)
- **Crawl4AI**: Open-source, LLM-friendly web crawler that extracts data from websites efficiently. Supports multiple output formats such as JSON, cleaned HTML, and Markdown, as well as different chunking and content extraction strategies. Useful for building RAG systems and data pipelines - [GitHub](https://github.com/unclecode/crawl4ai) #webCrawling #dataExtraction #RAG

## Caching

- [LMCache/LMCache: Supercharge Your LLM with the Fastest KV Cache Layer](https://github.com/LMCache/LMCache)
- [GibsonAI/memori: Open-Source Memory Engine for LLMs, AI Agents & Multi-Agent Systems](https://github.com/GibsonAI/memori)

> **See also:** [Agent Frameworks](/Technology/AI/Tools/Agents/Agent Frameworks) · [Local Runtime Tools](/Technology/AI/Tools/Runtime/Local Runtime Tools) · [Multi Agent Systems](/Technology/AI/Tools/Agents/Multi Agent Systems)
