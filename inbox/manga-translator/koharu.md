# Koharu - ML-Powered Manga Translator viết bằng Rust

## Định nghĩa

**Koharu** là local-first manga translator viết bằng Rust, sử dụng Tauri cho desktop app. Kết hợp object detection, OCR, inpainting, và LLMs để tạo workflow dịch manga tự động. Tất cả ML models chạy locally để đảm bảo privacy.

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

| Backend | Platform              | Mô tả                   |
| ------- | --------------------- | ----------------------- |
| CUDA    | Windows (NVIDIA)      | Compute capability 7.5+ |
| ZLUDA   | Windows (AMD)         | Experimental            |
| Metal   | macOS (Apple Silicon) | Native support          |
| Vulkan  | Windows/Linux         | OCR + LLM inference     |
| CPU     | All                   | Fallback luôn available |

## ML Models - Staged Pipeline

### Computer Vision

| Stage         | Models                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------- |
| Detection     | comic-text-bubble-detector, comic-text-detector, PP-DocLayoutV3, speech-bubble-segmentation |
| OCR           | PaddleOCR-VL-1.5, Manga OCR, MIT 48px OCR                                                   |
| Inpainting    | aot-inpainting, lama-manga                                                                  |
| Font Analysis | YuzuMarker.FontDetection                                                                    |

### LLM Translation

| Loại                   | Models                                                            |
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
| Translation    | Local hoặc remote LLM backends              |
| Text rendering | Vertical CJK, RTL support, OpenType shaping |
| PSD export     | Layered export với editable text            |
| MCP server     | Built-in cho AI agent integration           |
| Headless mode  | Chạy không cần GUI                          |
| Google Fonts   | Built-in font catalog                       |

## Cài đặt

### Pre-built binaries

Download từ [releases page](https://github.com/mayocream/koharu/releases/latest) cho Windows, macOS, Linux.

### From source

```bash
# Prerequisites: Rust 1.92+, Bun 1.0+, LLVM 15+
bun install
bun dev       # Development
bun run build # Build binaries
```

## Sử dụng

### GUI Mode

```bash
koharu                    # Normal launch
koharu --cpu              # Force CPU
koharu --port 9999        # Pin MCP port
```

### Headless Mode

```bash
koharu --port 4000 --headless
# Web client tại http://localhost:4000
```

### MCP Server

```bash
koharu --port 9999
# Point client to http://localhost:9999/mcp
```

### Export

- **Image**: Flattened rendered image
- **PSD**: Layered Photoshop file với editable text layers

## Tech Stack

| Component      | Technology                       |
| -------------- | -------------------------------- |
| Core           | Rust                             |
| Desktop        | Tauri                            |
| ML Inference   | candle (Hugging Face), llama.cpp |
| UI             | TypeScript                       |
| Text Rendering | Custom OpenType shaper           |

## Ưu điểm

| Ưu điểm                 | Mô tả                                    |
| ----------------------- | ---------------------------------------- |
| Local-first             | Tất cả models chạy locally, privacy      |
| Rust performance        | Nhanh và an toàn                         |
| GPU support             | CUDA, Metal, Vulkan, ZLUDA               |
| Rich LLM options        | Local + cloud providers                  |
| PSD export              | Editable text layers cho post-processing |
| MCP integration         | Cho AI agent automation                  |
| Active development      | 99 releases, frequent updates            |
| Advanced text rendering | Vertical CJK, RTL, OpenType shaping      |

## Nhược điểm

| Nhược điểm            | Mô tả                                    |
| --------------------- | ---------------------------------------- |
| GPL-3.0               | Copyleft license                         |
| Large downloads       | Nhiều models cần download                |
| GPU recommended       | CPU mode chậm hơn nhiều                  |
| Rust build complexity | Build from source cần nhiều dependencies |

## Sử dụng khi nào

- **Privacy-focused**: Khi không muốn gửi data ra ngoài
- **Professional workflow**: Cần PSD export với editable text
- **MCP integration**: Khi muốn integrate với AI agents
- **Apple Silicon**: Metal support native
- **Rust enthusiasts**: Khi ưu tiên performance và safety
- **Fine-tuned LLMs**: Khi cần translation quality tốt với local models

---

**Tài liệu tham khảo**:

- [mayocream/koharu](https://github.com/mayocream/koharu)
- [Documentation](https://koharu.rs)
- [Discord](https://discord.gg/mHvHkxGnUY)
