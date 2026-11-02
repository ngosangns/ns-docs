---
area: technology
domain: local-runtime
type: resource
title: Local Runtime Tools
description: Tools for running LLMs and voice models locally, including LM Studio, Ollama, and IchigoLLaMA3.1.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - local-runtime
  - llm
resource: https://lmstudio.ai/models
---

# Local Runtime Tools

This note lists tools for running LLMs and voice models on your own machine, with one entry per tool. LM Studio is a desktop app for downloading and chatting with models, and it can expose an OpenAI-compatible API server, with catalog and SDK links for TypeScript and Python. Ollama offers a command line runtime with the same compatible server, aimed at offline experiments and prototypes. IchigoLLaMA3.1 adds real-time voice, running on an NVIDIA 3090 without a connection, so speech recognition, synthesis, and responses stay private and low latency. Each entry states what the tool is for and where to get it. Use the list to pick a runtime before wiring a model into a project.

- **LM Studio**: Desktop app for downloading, running, and interacting with LLMs directly on your computer. Supports an OpenAI-compatible API server for easy integration into projects, suited to experimentation, chat, and internal deployment.
  - Model catalog: https://lmstudio.ai/models
  - SDK: [TypeScript](https://github.com/lmstudio-ai/lmstudio-js) | [Python](https://github.com/lmstudio-ai/lmstudio-python) #local-runtime #LLM #desktop
- **Ollama**: Local LLM runtime with a simple CLI, supporting download and running of many models (Llama, Qwen, Mistral…). Provides an OpenAI-compatible server for quick integration into applications, suited to offline experimentation and prototyping. Model catalog: https://ollama.com/search #local-runtime #LLM #CLI
- **IchigoLLaMA3.1**: An open-source real-time voice AI model that runs locally. Runs on an NVIDIA 3090 GPU with no internet connection, ensuring privacy and lower latency. Features: real-time speech recognition and synthesis, and a response when it does not understand the input. Applications: virtual assistants, speech synthesis, and voice applications that demand high privacy #local-runtime #voice #TTS #real-time #privacy

The three entries split by form factor rather than by capability. LM Studio is the one to open when you want to browse a catalog, interact with a model, and then expose it through an OpenAI-compatible API server. Its TypeScript and Python SDKs mean the experiment can move into a project without swapping the server. Ollama trades the desktop window for a CLI, keeps the same compatible server, and lists its own catalog, so it suits offline experiments and prototypes where a command is faster than a UI. IchigoLLaMA3.1 is different in kind. It is a voice model, not a text chat runtime, and it runs on an NVIDIA 3090 with no internet connection. Recognition, synthesis, and the reply all stay on the machine, which is what buys the privacy and the lower latency. Its fallback response covers input it does not understand. Pick the text runtime first, then add voice if the project needs speech.

> **See also:** [Development Frameworks](/Technology/AI/Tools/Frameworks/Development Frameworks) · [Speech Recognition Tools](/Technology/AI/Tools/Speech Recognition Tools) · [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms)
