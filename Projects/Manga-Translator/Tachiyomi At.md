---
area: technology
domain: ai-ml
topic: manga-translation
type: resource
title: Tachiyomi At
description: TachiyomiAT - Android Manga Reader với Auto Translation
timestamp: "2026-06-19T13:43:26.089Z"
tags:
  - technology
  - ai-ml
  - ocr
  - manga-translation
resource: https://github.com/mannu691/TachiyomiAT
---

# TachiyomiAT - Android Manga Reader với Auto Translation

## Định nghĩa

**TachiyomiAT** là fork của Mihon (trước đây là Tachiyomi) - manga reader cho Android, thêm tính năng automatic manga translation. Discover, translate và read manga trực tiếp trên Android device.

- **Repository**: https://github.com/mannu691/TachiyomiAT
- **License**: Apache-2.0
- **Requires**: Android 8.0+

## Key Metrics

- **Stars**: 179
- **Forks**: 14
- **Language**: Kotlin 100%
- **Commits**: 7,076

## Key Features

| Feature                    | Description                                  |
| -------------------------- | -------------------------------------------- |
| All Mihon features         | Full-featured manga reader                   |
| Auto translation           | Dịch chapter sau khi download                |
| Auto translate on download | Tự động dịch khi download xong               |
| Multiple translators       | ML Kit, Google Translate, Gemini, OpenRouter |
| Custom fonts               | Chọn font yêu thích                          |

## Supported Source Languages

- Chinese
- Korean
- Japanese

Có thể translate từ các ngôn ngữ trên sang bất kỳ ngôn ngữ nào.

## Available Translators

| Translator       | Loại      | Mô tả                                           |
| ---------------- | --------- | ----------------------------------------------- |
| ML Kit           | On-device | Không cần internet (sau khi download model)     |
| Google Translate | Web       | Cần internet                                    |
| Gemini           | API       | Cần API key                                     |
| OpenRouter       | API       | Cần API key, default: google/gemma-2-9b-it:free |

## Cài đặt

### Download

Download APK từ [releases page](https://github.com/mannu691/TachiyomiAT/releases)

### Configuration

1. Select source language trong Settings
2. Select target language trong Settings
3. Add API keys nếu dùng Gemini/OpenRouter
4. Download chapter → Click translate button

## Tech Stack

| Component   | Technology                                   |
| ----------- | -------------------------------------------- |
| Language    | Kotlin                                       |
| Platform    | Android                                      |
| Base        | Mihon (Tachiyomi fork)                       |
| Translation | ML Kit, Google Translate, Gemini, OpenRouter |

## Ưu điểm

| Ưu điểm               | Mô tả                         |
| --------------------- | ----------------------------- |
| Integrated reader     | Đọc + dịch trong 1 app        |
| On-device translation | ML Kit không cần internet     |
| Free translators      | Google Translate miễn phí     |
| Mihon ecosystem       | Hỗ trợ mọi nguồn của Mihon    |
| Auto translate        | Tự động dịch sau khi download |

## Nhược điểm

| Nhược điểm               | Mô tả                              |
| ------------------------ | ---------------------------------- |
| Android only             | Chỉ dành cho Android               |
| Limited source languages | Chỉ JA/ZH/KO                       |
| Being rewritten          | Đang rebasing trên latest mihon    |
| No inpainting            | Overlay translation, không inpaint |

## Sử dụng khi nào

- **Mobile reading**: Đọc manga dịch trên Android
- **On-device translation**: Không muốn gửi data ra ngoài (ML Kit)
- **Tachiyomi/Mihon users**: Đã quen với ecosystem
- **Quick reading**: Đọc raw manga dịch nhanh

---

**Tài liệu tham khảo**:

- [mannu691/TachiyomiAT](https://github.com/mannu691/TachiyomiAT)
- [Discord](https://discord.com/invite/rkvXfVPRdq)
