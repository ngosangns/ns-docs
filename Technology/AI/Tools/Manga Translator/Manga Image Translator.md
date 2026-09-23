---
area: technology
domain: manga-translation
type: tool
title: Manga Image Translator
description: Manga-Image-Translator is the flagship open-source modular manga translation pipeline with pluggable detectors, OCR engines, inpainters and translators, usable via Web UI, CLI, API and WebSocket.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - manga-translation
  - ocr
resource: https://github.com/zyddnys/manga-image-translator
---

# Manga Image Translator

## Definition

**Manga-Image-Translator** is the most comprehensive open-source pipeline for translating manga/comics. It supports one-click translation for many kinds of images, with many different detectors, OCR engines, inpainters, and translators. It is the foundational project that many other tools (cotrans, oomol-flows) build on.

- **Repository**: https://github.com/zyddnys/manga-image-translator
- **License**: GPL-3.0

## Key Metrics

- **Stars**: 9,700
- **Forks**: 969
- **Language**: Python
- **Docker image**: ~15GB

## Architecture - Modular Pipeline

```
┌─────────────────────────────────────────────────────────┐
│                manga-image-translator                     │
├──────────┬──────────┬──────────┬────────────────────────┤
│ Detector │   OCR    │Inpainter │     Translator          │
├──────────┼──────────┼──────────┼────────────────────────┤
│ CTD      │ 48px     │LaMa_large│ Sugoi / DeepL / ChatGPT│
│ CRAFT    │ 48px_ctc │ LaMa_MPE │ Sakura / DeepSeek      │
│ Paddle   │ 32px     │ SD/SDXL  │ Groq / NLLB / Qwen2   │
│ DBConvNext│MangaOCR │ original │ Papago / Youdao / Baidu│
└──────────┴──────────┴──────────┴────────────────────────┘
│            Web UI / CLI / API / WebSocket                │
└──────────────────────────────────────────────────────────┘
```

## Detectors

| Detector   | Description                    |
| ---------- | ------------------------------ |
| CTD        | Comic Text Detector (default)  |
| CRAFT      | Character-aware text detection |
| Paddle     | PaddleOCR-based detection      |
| DBConvNext | DBConvNext-based detection     |

## OCR Engines

| OCR             | Description                        |
| --------------- | ---------------------------------- |
| 48px            | Default OCR model                  |
| 48px_ctc        | CTC variant                        |
| 32px            | Smaller model                      |
| MangaOCR (mocr) | Specialized manga OCR by kha-white |

## Inpainters

| Inpainter        | Description                 |
| ---------------- | --------------------------- |
| LaMa_large       | Large resolution inpainting |
| LaMa_MPE         | Mask-aware inpainting       |
| Stable Diffusion | AI-based inpainting         |
| original         | Basic inpainting            |

## Translators

| Translator              | Type                       |
| ----------------------- | -------------------------- |
| Sugoi                   | Offline (Japanese-focused) |
| DeepL                   | API (high quality)         |
| ChatGPT / OpenAI        | API (LLM-based)            |
| Sakura                  | Offline (Japanese)         |
| DeepSeek                | API (LLM-based)            |
| Groq                    | API (fast inference)       |
| custom_openai           | API (compatible)           |
| NLLB / M2M100 / mbart50 | Offline (Meta)             |
| Qwen2                   | Offline/Online             |
| Papago                  | API (Korean-focused)       |
| Youdao / Baidu / Caiyun | API (Chinese-focused)      |

## Installation

### pip (venv recommended)

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

### Docker

```bash
docker pull zyddnys/manga-image-translator
```

## Usage

### Web UI

```bash
python -m manga_translator --mode webui
# Open http://localhost:5003
```

### CLI

```bash
# Single image
python -m manga_translator --input input.jpg --output output.jpg

# Batch
python -m manga_translator --input ./manga_pages/ --output ./translated/

# With options
python -m manga_translator -i input.jpg -o output.jpg \
  --detector ctd \
  --ocr 48px \
  --translator deepL \
  --inpainter lama_large \
  --target-lang ENG
```

### WebSocket mode

```bash
python -m manga_translator --mode ws
```

## Additional Features

| Feature          | Description                     |
| ---------------- | ------------------------------- |
| Upscaler         | ESRGAN, waifu2x                 |
| Colorizer        | mc2 (manga colorization)        |
| API mode         | RESTful API                     |
| Batch processing | CLI batch mode                  |
| Multi-language   | JA, ZH, EN, KO + 20 minor langs |

## Tech Stack

| Component  | Technology             |
| ---------- | ---------------------- |
| Language   | Python                 |
| Framework  | FastAPI                |
| ML         | PyTorch                |
| OCR        | PaddleOCR, MangaOCR    |
| Inpainting | LaMa, Stable Diffusion |
| Upscaling  | ESRGAN, waifu2x        |

## Pros

| Pro                   | Description                                            |
| --------------------- | ------------------------------------------------------ |
| Most comprehensive    | Widest variety of detectors/OCR/translators/inpainters |
| Modular               | Choose each component of the pipeline                  |
| Active community      | 9,700 stars, many contributors                         |
| Multiple interfaces   | Web UI, CLI, API, WebSocket                            |
| Docker support        | Easy to deploy                                         |
| Foundation for others | cotrans and oomol-flows are built on this project      |

## Cons

| Con                | Description                       |
| ------------------ | --------------------------------- |
| Heavy dependencies | Docker image ~15GB                |
| GPL-3.0            | Copyleft license                  |
| GPU recommended    | Needs a GPU for good performance  |
| Complex setup      | Many models need to be downloaded |

## When to Use

- **Best overall choice**: when you need the most comprehensive manga translation tool
- **Custom pipeline**: when you want to pick each component (detector, OCR, translator)
- **Docker deploy**: when you need to deploy it as a service
- **Build upon**: when you want to build your own tool on an existing foundation
- **Batch processing**: when you need to process many images

---

**References**:

- [zyddnys/manga-image-translator](https://github.com/zyddnys/manga-image-translator)
- [Cotrans (hosted)](https://cotrans.touhou.ai)
- [Docker Hub](https://hub.docker.com/r/zyddnys/manga-image-translator)

> **See also:** [Cotrans](/Technology/AI/Tools/Manga Translator/Cotrans) · [Comic Translate](/Technology/AI/Tools/Manga Translator/Comic Translate) · [Translator Comparison](/Technology/AI/Tools/Manga Translator/Translator Comparison)
