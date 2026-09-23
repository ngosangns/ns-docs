---
area: technology
domain: manga-translation
type: tool
title: Comic Translate
description: Comic-Translate is a desktop app that translates manga, manhwa, BDs and other comics from images, PDF, Epub, CBR and CBZ using detection, OCR, LLM translation and inpainting.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - manga-translation
  - ocr
resource: https://github.com/ogkalu2/comic-translate
---

# Comic Translate

## Definition

**Comic-Translate** is a desktop app that automatically translates comics: BDs, manga, manhwa, fumetti and many other formats (Image, PDF, Epub, CBR, CBZ). It uses SOTA LLMs such as GPT-4, Claude and Gemini for the highest translation quality.

- **Repository**: https://github.com/ogkalu2/comic-translate
- **Website**: https://www.comic-translate.com
- **License**: Apache-2.0

## Key Metrics

- **Stars**: 2,500
- **Forks**: 277
- **Language**: Python 100%
- **GUI**: PySide6

## Pipeline

```
┌──────────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
│  Detection   │→ │    OCR    │→ │ Translation│→ │ Inpainting│→ │  Render   │
│ (RT-DETR-v2) │  │(Multi)    │  │ (LLM)     │  │ (LaMa/    │  │ (Text)    │
│              │  │           │  │           │  │  AOT-GAN) │  │           │
└──────────────┘  └───────────┘  └───────────┘  └───────────┘  └───────────┘
```

## Detection & OCR

### Detection

- **comic-text-and-bubble-detector** (RT-DETR-v2): trained on 11k images (manga, webtoons, Western comics)
- Algorithmic segmentation based on the detected boxes

### OCR (Auto-selected by language)

| Language | OCR Engine            |
| -------- | --------------------- |
| Japanese | manga-ocr (kha-white) |
| Korean   | Pororo                |
| Other    | PPOCRv5 (PaddleOCR)   |

### OCR (Optional - any language)

- Gemini 2.0 Flash
- Microsoft Azure Vision

## Translation

Uses SOTA LLMs for better translation quality than Google Translate/DeepL:

- **GPT-4.1** (OpenAI)
- **Claude-4.5** (Anthropic)
- **Gemini-2.5** (Google)

All LLMs receive the full page text to aid translation. An option supplies the image as well for extra context.

## Inpainting

- **LaMa** (Anime/Manga finetuned) - from dreMaz
- **AOT-GAN** - from zyddnys

## Input Formats

| Format | Support                  |
| ------ | ------------------------ |
| Images | PNG, JPG, WebP, etc.     |
| PDF    | Yes                      |
| Epub   | Yes                      |
| CBR    | Yes (needs WinRAR/7-Zip) |
| CBZ    | Yes                      |

## Source Languages

English, Korean, Japanese, French, Simplified Chinese, Traditional Chinese, Russian, German, Dutch, Spanish, Italian

## Installation

### Download (Recommended)

Download the Windows/macOS installer from [comic-translate.com](https://www.comic-translate.com)

### From Source

```bash
git clone https://github.com/ogkalu2/comic-translate
cd comic-translate
uv init --python 3.12
uv add -r requirements.txt --compile-bytecode

# NVIDIA GPU
uv pip install onnxruntime-gpu

# Run
uv run comic.py
```

## Features

| Feature          | Description                          |
| ---------------- | ------------------------------------ |
| Automatic mode   | One-click translation                |
| Manual mode      | Corrections for detection/OCR issues |
| Zoom             | Ctrl + Mouse Wheel                   |
| Navigation       | Arrow keys, trackpad gestures        |
| Batch processing | Multiple images/files                |
| Undo             | Undo individual image corrections    |

## Tech Stack

| Component   | Technology                      |
| ----------- | ------------------------------- |
| Language    | Python                          |
| GUI         | PySide6                         |
| Detection   | RT-DETR-v2                      |
| OCR         | manga-ocr, Pororo, PaddleOCR    |
| Translation | GPT-4.1, Claude-4.5, Gemini-2.5 |
| Inpainting  | LaMa, AOT-GAN                   |

## Pros

| Pro                      | Description                |
| ------------------------ | -------------------------- |
| Best translation quality | SOTA LLMs for translation  |
| Multi-format             | Image, PDF, Epub, CBR, CBZ |
| Desktop app              | Nice, easy-to-use GUI      |
| Manual mode              | Can fix automatic mistakes |
| Multi-comic types        | BD, Manga, Manhwa, Fumetti |
| Pre-built installer      | No complicated setup       |
| Apache-2.0               | Permissive license         |

## Cons

| Con                  | Description                                    |
| -------------------- | ---------------------------------------------- |
| LLM API required     | Needs an API key (OpenAI/Anthropic/Google)     |
| API costs            | Cost of API calls                              |
| GPU only from source | GPU acceleration only when running from source |
| Python 3.12 required | Specific Python version                        |

## When to Use

- **Best translation quality**: when you need the best translation quality (LLM-based)
- **Multi-format comics**: when you need to handle many formats (PDF, Epub, CBR, CBZ)
- **Desktop workflow**: when you want an easy-to-use GUI app
- **Non-manga comics**: BDs, Western comics, fumetti
- **Manual correction**: when you want control over the translation process

---

**References**:

- [ogkalu2/comic-translate](https://github.com/ogkalu2/comic-translate)
- [Website](https://www.comic-translate.com)

> **See also:** [Manga Image Translator](/Technology/AI/Tools/Manga Translator/Manga Image Translator) · [Koharu](/Technology/AI/Tools/Manga Translator/Koharu) · [Translator Comparison](/Technology/AI/Tools/Manga Translator/Translator Comparison)
