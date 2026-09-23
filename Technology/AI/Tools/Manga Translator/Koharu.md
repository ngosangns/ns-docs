---
area: technology
domain: manga-translation
type: tool
title: Koharu
description: Koharu is a local-first, ML-powered manga translator written in Rust with a Tauri desktop app, combining detection, OCR, inpainting and local or cloud LLMs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - manga-translation
  - ocr
resource: https://github.com/mayocream/koharu
---

# Koharu

## Definition

**Koharu** is a local-first manga translator written in Rust that uses Tauri for its desktop app. It combines object detection, OCR, inpainting, and LLMs into an automated manga translation workflow. All ML models run locally to ensure privacy.

- **Repository**: https://github.com/mayocream/koharu
- **Website**: https://koharu.rs
- **License**: GPL-3.0

## Key Metrics

- **Stars**: 3,000
- **Forks**: 158
- **Language**: Rust (80.7%), TypeScript (19.1%)
- **Releases**: 99+

## Architecture

```
┌──────────────────────────────────────────────┐
│              Koharu (Rust + Tauri)            │
├──────────────────────────────────────────────┤
│  koharu-core    │  koharu-ml   │  koharu-llm │
│  (pipeline)     │  (candle)    │  (llama.cpp)│
│  koharu-renderer│  koharu-psd  │  koharu-rpc │
│  (text layout)  │  (PSD export)│  (MCP/API)  │
├──────────────────────────────────────────────┤
│         koharu-app (Tauri Desktop)           │
│         koharu-runtime (GPU/CPU)             │
└──────────────────────────────────────────────┘
```

## GPU Acceleration

| Backend | Platform              | Description               |
| ------- | --------------------- | ------------------------- |
| CUDA    | Windows (NVIDIA)      | Compute capability 7.5+   |
| ZLUDA   | Windows (AMD)         | Experimental              |
| Metal   | macOS (Apple Silicon) | Native support            |
| Vulkan  | Windows/Linux         | OCR + LLM inference       |
| CPU     | All                   | Always-available fallback |

## ML Models - Staged Pipeline

### Computer Vision

| Stage         | Models                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------- |
| Detection     | comic-text-bubble-detector, comic-text-detector, PP-DocLayoutV3, speech-bubble-segmentation |
| OCR           | PaddleOCR-VL-1.5, Manga OCR, MIT 48px OCR                                                   |
| Inpainting    | aot-inpainting, lama-manga                                                                  |
| Font Analysis | YuzuMarker.FontDetection                                                                    |

### LLM Translation

| Type                   | Models                                                            |
| ---------------------- | ----------------------------------------------------------------- |
| General-purpose local  | Gemma 4 (E2B→31B), Qwen 3.5 (0.8B→35B)                            |
| NSFW-capable           | Gemma 4 uncensored, Qwen 3.5 uncensored                           |
| Fine-tuned translation | vntl-llama3-8b, sakura-galtransl-7b, sugoi-14b/32b, hunyuan-mt-7b |
| Cloud providers        | OpenAI, Gemini, Claude, DeepSeek                                  |
| OpenAI-compatible      | LM Studio, OpenRouter, self-hosted                                |

## Key Features

| Feature        | Description                                 |
| -------------- | ------------------------------------------- |
| Auto detection | Text regions, speech bubbles, cleanup masks |
| OCR            | Manga dialogue, captions, page text         |
| Inpainting     | Remove source lettering                     |
| Translation    | Local or remote LLM backends                |
| Text rendering | Vertical CJK, RTL support, OpenType shaping |
| PSD export     | Layered export with editable text           |
| MCP server     | Built-in, for AI agent integration          |
| Headless mode  | Runs without a GUI                          |
| Google Fonts   | Built-in font catalog                       |

## Installation

### Pre-built binaries

Download from the [releases page](https://github.com/mayocream/koharu/releases/latest) for Windows, macOS, and Linux.

### From source

```bash
# Prerequisites: Rust 1.92+, Bun 1.0+, LLVM 15+
bun install
bun dev       # Development
bun run build # Build binaries
```

## Usage

### GUI Mode

```bash
koharu                    # Normal launch
koharu --cpu              # Force CPU
koharu --port 9999        # Pin MCP port
```

### Headless Mode

```bash
koharu --port 4000 --headless
# Web client at http://localhost:4000
```

### MCP Server

```bash
koharu --port 9999
# Point client to http://localhost:9999/mcp
```

### Export

- **Image**: Flattened rendered image
- **PSD**: Layered Photoshop file with editable text layers

## Tech Stack

| Component      | Technology                       |
| -------------- | -------------------------------- |
| Core           | Rust                             |
| Desktop        | Tauri                            |
| ML Inference   | candle (Hugging Face), llama.cpp |
| UI             | TypeScript                       |
| Text Rendering | Custom OpenType shaper           |

## Pros

| Pro                     | Description                              |
| ----------------------- | ---------------------------------------- |
| Local-first             | All models run locally, for privacy      |
| Rust performance        | Fast and safe                            |
| GPU support             | CUDA, Metal, Vulkan, ZLUDA               |
| Rich LLM options        | Local + cloud providers                  |
| PSD export              | Editable text layers for post-processing |
| MCP integration         | For AI agent automation                  |
| Active development      | 99 releases, frequent updates            |
| Advanced text rendering | Vertical CJK, RTL, OpenType shaping      |

## Cons

| Con                   | Description                                  |
| --------------------- | -------------------------------------------- |
| GPL-3.0               | Copyleft license                             |
| Large downloads       | Many models need to be downloaded            |
| GPU recommended       | CPU mode is much slower                      |
| Rust build complexity | Building from source needs many dependencies |

## When to Use

- **Privacy-focused**: when you don't want to send data elsewhere
- **Professional workflow**: you need PSD export with editable text
- **MCP integration**: when you want to integrate with AI agents
- **Apple Silicon**: native Metal support
- **Rust enthusiasts**: when performance and safety are the priority
- **Fine-tuned LLMs**: when you need good translation quality with local models

---

**References**:

- [mayocream/koharu](https://github.com/mayocream/koharu)
- [Documentation](https://koharu.rs)
- [Discord](https://discord.gg/mHvHkxGnUY)

> **See also:** [Comic Translate](/Technology/AI/Tools/Manga Translator/Comic Translate) · [Manga Image Translator](/Technology/AI/Tools/Manga Translator/Manga Image Translator) · [Translator Comparison](/Technology/AI/Tools/Manga Translator/Translator Comparison)
