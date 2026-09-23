---
area: technology
domain: ai-ml
topic: manga-translation
type: resource
title: Comic Translate
description: Comic-Translate - Desktop App Dịch Comics Đa Ngôn Ngữ
timestamp: "2026-06-19T13:43:26.089Z"
tags:
  - technology
  - ai-ml
  - ocr
  - manga-translation
resource: https://github.com/ogkalu2/comic-translate
---

# Comic-Translate - Desktop App Dịch Comics Đa Ngôn Ngữ

## Định nghĩa

**Comic-Translate** là desktop app tự động dịch comics - BDs, Manga, Manhwa, Fumetti và nhiều format khác (Image, PDF, Epub, CBR, CBZ). Sử dụng SOTA LLMs như GPT-4, Claude, Gemini cho translation quality cao nhất.

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

- **comic-text-and-bubble-detector** (RT-DETR-v2): Trained trên 11k images (Manga, Webtoons, Western comics)
- Algorithmic segmentation based trên detected boxes

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

Sử dụng SOTA LLMs cho translation quality tốt hơn Google Translate/DeepL:

- **GPT-4.1** (OpenAI)
- **Claude-4.5** (Anthropic)
- **Gemini-2.5** (Google)

Tất cả LLMs nhận full page text để aid translation. Option cung cấp image cho thêm context.

## Inpainting

- **LaMa** (Anime/Manga finetuned) - từ dreMaz
- **AOT-GAN** - từ zyddnys

## Input Formats

| Format | Support                |
| ------ | ---------------------- |
| Images | PNG, JPG, WebP, etc.   |
| PDF    | Yes                    |
| Epub   | Yes                    |
| CBR    | Yes (cần WinRAR/7-Zip) |
| CBZ    | Yes                    |

## Source Languages

English, Korean, Japanese, French, Simplified Chinese, Traditional Chinese, Russian, German, Dutch, Spanish, Italian

## Cài đặt

### Download (Recommended)

Download installer cho Windows/macOS từ [comic-translate.com](https://www.comic-translate.com)

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
| Manual mode      | Corrections cho detection/OCR issues |
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

## Ưu điểm

| Ưu điểm                  | Mô tả                      |
| ------------------------ | -------------------------- |
| Best translation quality | SOTA LLMs cho translation  |
| Multi-format             | Image, PDF, Epub, CBR, CBZ |
| Desktop app              | GUI đẹp, dễ dùng           |
| Manual mode              | Có thể sửa lỗi tự động     |
| Multi-comic types        | BD, Manga, Manhwa, Fumetti |
| Pre-built installer      | Không cần setup phức tạp   |
| Apache-2.0               | Permissive license         |

## Nhược điểm

| Nhược điểm           | Mô tả                                    |
| -------------------- | ---------------------------------------- |
| LLM API required     | Cần API key (OpenAI/Anthropic/Google)    |
| API costs            | Chi phí API calls                        |
| GPU only from source | GPU acceleration chỉ khi run from source |
| Python 3.12 required | Phiên bản Python cụ thể                  |

## Sử dụng khi nào

- **Best translation quality**: Khi cần chất lượng dịch tốt nhất (LLM-based)
- **Multi-format comics**: Khi cần xử lý nhiều format (PDF, Epub, CBR, CBZ)
- **Desktop workflow**: Khi muốn GUI app dễ dùng
- **Non-manga comics**: BDs, Western comics, Fumetti
- **Manual correction**: Khi muốn có control over translation process

---

**Tài liệu tham khảo**:

- [ogkalu2/comic-translate](https://github.com/ogkalu2/comic-translate)
- [Website](https://www.comic-translate.com)
