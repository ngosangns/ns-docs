# Manga-Image-Translator - Flagship Open Source Manga Translation Pipeline

## Định nghĩa

**Manga-Image-Translator** là pipeline mã nguồn mở toàn diện nhất để dịch manga/comic. Hỗ trợ one-click translation cho nhiều loại hình ảnh với nhiều detector, OCR, inpainter, và translator khác nhau. Đây là project nền tảng mà nhiều tool khác (cotrans, oomol-flows) build trên.

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

| Detector   | Mô tả                          |
| ---------- | ------------------------------ |
| CTD        | Comic Text Detector (default)  |
| CRAFT      | Character-aware text detection |
| Paddle     | PaddleOCR-based detection      |
| DBConvNext | DBConvNext-based detection     |

## OCR Engines

| OCR             | Mô tả                              |
| --------------- | ---------------------------------- |
| 48px            | Default OCR model                  |
| 48px_ctc        | CTC variant                        |
| 32px            | Smaller model                      |
| MangaOCR (mocr) | Specialized manga OCR by kha-white |

## Inpainters

| Inpainter        | Mô tả                       |
| ---------------- | --------------------------- |
| LaMa_large       | Large resolution inpainting |
| LaMa_MPE         | Mask-aware inpainting       |
| Stable Diffusion | AI-based inpainting         |
| original         | Basic inpainting            |

## Translators

| Translator              | Loại                       |
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

## Cài đặt

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

## Sử dụng

### Web UI

```bash
python -m manga_translator --mode webui
# Truy cập http://localhost:5003
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

## Ưu điểm

| Ưu điểm                   | Mô tả                                                |
| ------------------------- | ---------------------------------------------------- |
| Most comprehensive        | Đa dạng nhất về detectors/OCR/translators/inpainters |
| Modular                   | Chọn từng component trong pipeline                   |
| Active community          | 9,700 stars, nhiều contributors                      |
| Multiple interfaces       | Web UI, CLI, API, WebSocket                          |
| Docker support            | Dễ deploy                                            |
| Foundation cho tools khác | cotrans, oomol-flows build trên project này          |

## Nhược điểm

| Nhược điểm         | Mô tả                       |
| ------------------ | --------------------------- |
| Heavy dependencies | Docker image ~15GB          |
| GPL-3.0            | Copyleft license            |
| GPU recommended    | Cần GPU cho performance tốt |
| Complex setup      | Nhiều models cần download   |

## Sử dụng khi nào

- **Best overall choice**: Khi cần tool dịch manga toàn diện nhất
- **Custom pipeline**: Khi muốn chọn từng component (detector, OCR, translator)
- **Docker deploy**: Khi cần deploy như một service
- **Build upon**: Khi muốn build tool riêng trên nền tảng đã có
- **Batch processing**: Khi cần xử lý nhiều hình ảnh

---

**Tài liệu tham khảo**:

- [zyddnys/manga-image-translator](https://github.com/zyddnys/manga-image-translator)
- [Cotrans (hosted)](https://cotrans.touhou.ai)
- [Docker Hub](https://hub.docker.com/r/zyddnys/manga-image-translator)
