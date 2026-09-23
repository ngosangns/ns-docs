---
area: technology
domain: manga-translation
type: cheatsheet
title: Translator Comparison
description: Side-by-side comparison of open-source and commercial manga/comic translator tools by stars, license, platform, OCR, inpainting and translation method, with top picks per need.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - manga-translation
  - ocr
resource: https://github.com/zyddnys/manga-image-translator
---

# Translator Comparison

## Overview

A comparison table of open-source manga/comic translation tools, ranked by stars (popularity).

## Main Comparison Table

| #   | Tool                                                                                       | Stars | Language   | License    | Platform    | Input Formats          | Inpainting                     | OCR                            | Translation                                                  |
| --- | ------------------------------------------------------------------------------------------ | ----- | ---------- | ---------- | ----------- | ---------------------- | ------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| 1   | [manga-image-translator](https://github.com/zyddnys/manga-image-translator)                | 9,700 | Python     | GPL-3.0    | Web/CLI/API | Images                 | LaMa, SD                       | 48px, MangaOCR                 | 20+ translators (Sugoi, DeepL, ChatGPT, NLLB, Qwen2...)      |
| 2   | [koharu](https://github.com/mayocream/koharu)                                              | 3,000 | Rust       | GPL-3.0    | Desktop     | Images, PSD            | LaMa, AOT                      | PaddleOCR-VL, MangaOCR         | Local LLMs (Gemma, Qwen, Sakura) + Cloud                     |
| 3   | [comic-translate](https://github.com/ogkalu2/comic-translate)                              | 2,500 | Python     | Apache-2.0 | Desktop     | Image/PDF/Epub/CBR/CBZ | LaMa, AOT-GAN                  | manga-ocr, Pororo, PaddleOCR   | GPT-4.1, Claude-4.5, Gemini-2.5                              |
| 4   | [cotrans](https://github.com/VoileLabs/cotrans)                                            | 270   | TypeScript | GPL-3.0    | Web         | Images                 | manga-image-translator backend | manga-image-translator backend | manga-image-translator backend                               |
| 5   | [cameronkinsella/manga-translator](https://github.com/cameronkinsella/manga-translator)    | 148   | Go         | MIT        | Desktop     | Images                 | None (overlay)                 | Google Cloud Vision            | DeepL, Google Cloud Translation                              |
| 6   | [MangaTranslator (grinnch)](https://github.com/meangrinch/MangaTranslator)                 | 175   | Python     | Apache-2.0 | Web/CLI     | Images, ZIP            | Flux.2/Kontext, OpenCV         | LLM-based                      | 10+ cloud providers (Google, OpenAI, Anthropic, DeepSeek...) |
| 7   | [TareHimself/manga-translator](https://github.com/TareHimself/manga-translator)            | 105   | Python     | AGPL-3.0   | Web/CLI     | Images                 | DeepFillv2, LaMa               | General                        | OpenAI-compatible                                            |
| 8   | [dalelyunas/manga-translator](https://github.com/dalelyunas/manga-translator)              | 103   | Python 2.7 | N/A        | CLI         | Images                 | OpenCV basic                   | Tesseract                      | Google Translate (npm)                                       |
| 9   | [JMTrans](https://github.com/ttop32/JMTrans)                                               | 90    | Python     | AGPL-3.0   | Desktop     | Images, URLs           | SickZil                        | Google Drive OCR, Windows OCR  | ezTrans XP, Google Translate                                 |
| 10  | [manga-translator (Android)](https://github.com/wiryaimd/manga-translator)                 | 76    | Java       | N/A        | Android     | Images                 | Canvas                         | ML Kit                         | ML Kit, Microsoft Translate                                  |
| 11  | [TachiyomiAT](https://github.com/mannu691/TachiyomiAT)                                     | 179   | Kotlin     | Apache-2.0 | Android     | Manga chapters         | None (overlay)                 | N/A                            | ML Kit, Google Translate, Gemini, OpenRouter                 |
| 12  | [MangaQuick](https://github.com/DCY1117/MangaQuick)                                        | 84    | Python     | Apache-2.0 | Web         | Images                 | LaMa                           | manga-ocr, EasyOCR             | DeepL, Google, Ollama                                        |
| 13  | [pedguedes090/Manga-Translator](https://github.com/pedguedes090/Manga-Translator)          | 58    | Python     | MIT        | Web         | Images                 | OpenCV                         | Manga-OCR, Chrome Lens         | Gemini, Ollama/LM Studio, NLLB                               |
| 14  | [ImageTrans (docs)](https://github.com/xulihang/ImageTrans-docs)                           | 126   | N/A        | Commercial | Desktop     | Multiple               | Proprietary                    | Multiple                       | Multiple                                                     |
| 15  | [comic-translator](https://github.com/ImDarkShadow/comic-translator)                       | 33    | JavaScript | GPL-3.0    | CLI         | Images, Website        | N/A                            | N/A                            | API-based                                                    |
| 16  | [AutoScanlate-AI](https://github.com/P4ST4S/AutoScanlate-AI)                               | 21    | Go+Python  | Custom NC  | Web         | Images                 | OpenCV                         | MangaOCR                       | Qwen 2.5 7B (local)                                          |
| 17  | [Manga_Translator (Whalefishin)](https://github.com/Whalefishin/Manga_Translator)          | 19    | Jupyter    | AGPL-3.0   | Notebook    | Images                 | Segmentation                   | Manga-OCR, Tesseract           | Google Cloud Translation                                     |
| 18  | [BallonsTranslator-Pro](https://github.com/thomaswantstobeaskeleton/BallonsTranslator-Pro) | 15    | Python     | MIT        | Desktop     | Multiple               | LaMa, SD/SDXL/FLUX, MAT        | 30+ OCR engines                | Google, DeepL, ChatGPT, Qwen_MT, Sugoi...                    |
| 19  | [NyanTranslate](https://github.com/Mabzak-Knight/NyanTranslate)                            | 13    | Python     | MIT        | Web         | Images                 | Basic                          | Manga-OCR                      | Google Translate                                             |
| 20  | [AntonRls/Manga-Translator](https://github.com/AntonRls/Manga-Translator)                  | 29    | C#         | N/A        | Desktop     | Images                 | Manual selection               | Manual                         | DeepL, Google, OpenAI                                        |
| 21  | [onyx-manga-translator](https://github.com/thradnea/onyx-manga-translator)                 | 5     | Python     | MIT        | Desktop     | Images                 | Built-in                       | Manga-OCR                      | Google Translate                                             |
| 22  | [Komic](https://github.com/mikezzb/Komic)                                                  | 8     | Java       | N/A        | Android     | MangaDex               | None                           | ML Kit                         | ML Kit                                                       |
| 23  | [MangaReader](https://github.com/kawayiYokami/MangaReader)                                 | 6     | Python     | GPL-3.0    | Desktop/Web | Local manga            | N/A                            | N/A                            | LLM-based                                                    |
| 24  | [manga-translator-project](https://github.com/manga-translator-project/manga-translator)   | 4     | Python     | N/A        | Web         | Images                 | N/A                            | PaddleOCR                      | Google Generative AI                                         |
| 25  | [oomol-flows/manga-translator](https://github.com/oomol-flows/manga-translator)            | 1     | Python     | N/A        | Workflow    | Image/CBZ/CBR/EPUB/PDF | manga-image-translator         | manga-image-translator         | OOMOL translation service                                    |
| 26  | [brainatron GitLab](https://gitlab.com/brainatron/ai/manga-image-translator)               | N/A   | Python     | GPL-3.0    | N/A         | N/A                    | N/A                            | N/A                            | N/A                                                          |

## Classification by Use Case

### Desktop Apps

| Tool                      | OS              | GUI Framework | Highlights                         |
| ------------------------- | --------------- | ------------- | ---------------------------------- |
| **koharu**                | Win/Mac/Linux   | Tauri         | Local-first, Rust, PSD export      |
| **comic-translate**       | Win/Mac         | PySide6       | LLM translation, multi-format      |
| **BallonsTranslator-Pro** | Win/Mac/Linux   | PyQt5/6       | 30+ OCR, 15+ inpainters, 370 fonts |
| **MangaQuick**            | Web (Streamlit) | Streamlit     | Academic project, LaMa inpainting  |
| **AutoScanlate-AI**       | Web             | Next.js       | Microservices (Go+Python+Next.js)  |
| **JMTrans**               | Win             | PyQt5         | URL download, Korean-focused       |

### Mobile Apps

| Tool                            | Platform | Highlights                          |
| ------------------------------- | -------- | ----------------------------------- |
| **TachiyomiAT**                 | Android  | Mihon fork, auto-translate chapters |
| **manga-translator (wiryaimd)** | Android  | ML Kit, 60+ languages               |
| **Komic**                       | Android  | MangaDex reader + ML Kit            |

### Web Platforms

| Tool                              | Type            | Highlights                       |
| --------------------------------- | --------------- | -------------------------------- |
| **cotrans**                       | Online platform | Collaborative, browser extension |
| **MangaTranslator (grinnch)**     | Web UI (Gradio) | Flux.2 inpainting, 59 languages  |
| **pedguedes090/Manga-Translator** | Web (Flask)     | Gemini + context memory          |
| **NyanTranslate**                 | Web (Flask)     | Simple, 23 languages             |
| **AI Manga Translator**           | Commercial SaaS | Chrome extension, paid service   |

### Libraries/Pipelines

| Tool                             | Type     | Highlights                               |
| -------------------------------- | -------- | ---------------------------------------- |
| **manga-image-translator**       | Pipeline | Most comprehensive, modular              |
| **TareHimself/manga-translator** | Pipeline | YOLO + DeepFillv2                        |
| **oomol-flows/manga-translator** | Workflow | No-code, based on manga-image-translator |
| **dalelyunas/manga-translator**  | Script   | Classic, Python 2.7                      |

## Classification by Translation Method

| Method                     | Tools                                                                            |
| -------------------------- | -------------------------------------------------------------------------------- |
| **LLM API (Best quality)** | comic-translate (GPT-4.1/Claude/Gemini), MangaTranslator-grinnch (10+ providers) |
| **Local LLM**              | koharu (Gemma/Qwen/Sakura via llama.cpp), AutoScanlate-AI (Qwen 2.5)             |
| **Hybrid**                 | manga-image-translator (online + offline options), MangaQuick (DeepL + Ollama)   |
| **Free API**               | Detopall/manga-translator (Google), NyanTranslate (Google)                       |
| **On-device**              | TachiyomiAT (ML Kit), manga-translator-Android (ML Kit), Komic (ML Kit)          |
| **Specialized**            | JMTrans (ezTrans XP for Korean), Sugoi (offline Japanese)                        |

## Top Picks by Need

### Best Translation Quality

1. **comic-translate** - SOTA LLMs (GPT-4.1, Claude-4.5)
2. **MangaTranslator (grinnch)** - 10+ cloud providers, Flux inpainting
3. **koharu** - Fine-tuned translation models (Sakura, Sugoi, vntl)

### Most Features

1. **manga-image-translator** - Most modular pipeline
2. **BallonsTranslator-Pro** - 30+ OCR, 15+ inpainters, 370 fonts
3. **koharu** - PSD export, MCP server, headless mode

### Easiest to Use

1. **cotrans** - Web-based, no install needed
2. **TachiyomiAT** - Mobile, integrated reader
3. **comic-translate** - Desktop installer

### Privacy / Local-first

1. **koharu** - All models run locally, Rust performance
2. **AutoScanlate-AI** - Local Qwen 2.5 LLM
3. **manga-image-translator** - Offline translators (NLLB, Sugoi, Sakura)

### Android

1. **TachiyomiAT** - Full reader + translation
2. **manga-translator (wiryaimd)** - Standalone translator
3. **Komic** - MangaDex reader + translation

---

**References**:

- See the detailed notes for each tool: [Manga Image Translator](/Technology/AI/Tools/Manga Translator/Manga Image Translator), [Koharu](/Technology/AI/Tools/Manga Translator/Koharu), [Comic Translate](/Technology/AI/Tools/Manga Translator/Comic Translate), [Cotrans](/Technology/AI/Tools/Manga Translator/Cotrans), [Tachiyomi AT](/Technology/AI/Tools/Manga Translator/Tachiyomi AT)
- [Reddit r/mangapiracy discussion](https://www.reddit.com/r/mangapiracy/comments/1ks8ld5/)

> **See also:** [Manga Translator Others](/Technology/AI/Tools/Manga Translator/Manga Translator Others) · [Manga Image Translator](/Technology/AI/Tools/Manga Translator/Manga Image Translator) · [Koharu](/Technology/AI/Tools/Manga Translator/Koharu)
