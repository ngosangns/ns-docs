---
area: technology
domain: manga-translation
type: tool
title: Tachiyomi AT
description: TachiyomiAT is a Mihon (Tachiyomi) fork for Android that adds automatic manga translation using ML Kit, Google Translate, Gemini or OpenRouter.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - manga-translation
  - ocr
resource: https://github.com/mannu691/TachiyomiAT
---

# Tachiyomi AT

## Definition

**TachiyomiAT** is a fork of Mihon (formerly Tachiyomi), the Android manga reader, that adds automatic manga translation. Discover, translate, and read manga directly on an Android device.

- **Repository**: https://github.com/mannu691/TachiyomiAT
- **License**: Apache-2.0
- **Requires**: Android 8.0+

## Key Metrics

- **Stars**: 179
- **Forks**: 14
- **Language**: Kotlin 100%
- **Commits**: 7,076

## Key Features

| Feature                    | Description                                       |
| -------------------------- | ------------------------------------------------- |
| All Mihon features         | Full-featured manga reader                        |
| Auto translation           | Translate a chapter after downloading it          |
| Auto translate on download | Translates automatically when a download finishes |
| Multiple translators       | ML Kit, Google Translate, Gemini, OpenRouter      |
| Custom fonts               | Pick your favorite font                           |

## Supported Source Languages

- Chinese
- Korean
- Japanese

These can be translated into any language.

## Available Translators

| Translator       | Type      | Description                                          |
| ---------------- | --------- | ---------------------------------------------------- |
| ML Kit           | On-device | No internet needed (after downloading the model)     |
| Google Translate | Web       | Needs internet                                       |
| Gemini           | API       | Needs an API key                                     |
| OpenRouter       | API       | Needs an API key, default: google/gemma-2-9b-it:free |

## Installation

### Download

Download the APK from the [releases page](https://github.com/mannu691/TachiyomiAT/releases)

### Configuration

1. Select the source language in Settings
2. Select the target language in Settings
3. Add API keys if using Gemini/OpenRouter
4. Download a chapter → click the translate button

## Tech Stack

| Component   | Technology                                   |
| ----------- | -------------------------------------------- |
| Language    | Kotlin                                       |
| Platform    | Android                                      |
| Base        | Mihon (Tachiyomi fork)                       |
| Translation | ML Kit, Google Translate, Gemini, OpenRouter |

## Pros

| Pro                   | Description                             |
| --------------------- | --------------------------------------- |
| Integrated reader     | Read + translate in one app             |
| On-device translation | ML Kit needs no internet                |
| Free translators      | Google Translate is free                |
| Mihon ecosystem       | Supports every Mihon source             |
| Auto translate        | Translates automatically after download |

## Cons

| Con                      | Description                            |
| ------------------------ | -------------------------------------- |
| Android only             | Only available for Android             |
| Limited source languages | Only JA/ZH/KO                          |
| Being rewritten          | Currently rebasing on the latest Mihon |
| No inpainting            | Overlay translation, no inpainting     |

## When to Use

- **Mobile reading**: read translated manga on Android
- **On-device translation**: you don't want to send data elsewhere (ML Kit)
- **Tachiyomi/Mihon users**: already familiar with the ecosystem
- **Quick reading**: quickly read translated raw manga

---

**References**:

- [mannu691/TachiyomiAT](https://github.com/mannu691/TachiyomiAT)
- [Discord](https://discord.com/invite/rkvXfVPRdq)

> **See also:** [Translator Comparison](/Technology/AI/Tools/Manga Translator/Translator Comparison) · [Manga Translator Others](/Technology/AI/Tools/Manga Translator/Manga Translator Others)
