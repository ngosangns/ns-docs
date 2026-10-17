---
area: technology
domain: voice-cloning
type: tool
title: V-Clone
description: V-Clone is a paid, closed-source Vietnamese Windows desktop app sold by Rainbow Music Led (Hải Dương) for voice cloning, film dubbing against SRT/ASS, STT, and offline translation in 12 languages including Vietnamese; the model and licensing details are not published.
timestamp: "2026-10-17T00:00:00.000Z"
tags:
  - technology
  - voice-cloning
  - tts
  - dubbing
  - vietnamese
resource: https://rainbowmusicled.com/san-pham/v-clone-nhan-ban-giong-noi/
---

# V-Clone

V-Clone ("Nhân bản giọng nói") is a desktop voice cloning and dubbing app sold on [rainbowmusicled.com](https://rainbowmusicled.com/san-pham/v-clone-nhan-ban-giong-noi/) by Rainbow Music Led, a shop listed at 46/136 Phạm Văn Đồng, Tứ Minh, Hải Dương (phone 0981373223, open 8h–23h). Everything below comes from that product page, checked 2026-10-17. No independent review, documentation site, GitHub repo, or company registration was found.

Name collision: [VClone.vip](https://vclone.vip/) is a different web/Android TTS and cloning service (10 s sample, 200+ languages claimed, payments via JazzCash/EasyPaisa/bank/crypto). It is not this app.

## What the page claims

- "Exclusive" (độc quyền) voice cloning model. Which base model it uses is **not disclosed**.
- Runs on Windows with GPU or CPU; installers for NVIDIA GPUs and new Intel CPU/iGPU (Core Ultra, Arc). The control UI is listed for Windows, Mac, iOS, Android, but the engine itself is Windows only.
- Cloning and STT languages: Vi, En, Ja, Ko, Zh, Es, De, Fr, Ru, Th, Id, Pt (Br).
- A separate "fast voice for weak machines (CPU)" mode: 60 languages, 100 preset voices.
- Reference samples from audio or video files, mic recording, auto-extracting the voice from a video; Pro can pull audio from YouTube/TikTok links. Noise removal, de-reverb, vocal/background separation by AI.
- Dubbing: auto subtitles, auto translate, shorten overflowing lines, clone and re-clone per line, match SRT/ASS timing, lip sync, multi-character voices, mp4 export, subtitle burn-in and watermark.
- Singing voice conversion, AI sound effects, tags for pauses/effects/characters, dictionary for abbreviations and English words.
- Local LLM integration and slots for ChatGPT, Gemini, Grok, Claude API keys; emotion-tag TTS via Gemini TTS (10 free/day).
- Output WAV/MP3; STT to TXT/SRT.

Sample length for cloning is **not stated**. The only number is "Nhại giọng chất lượng cao: tối đa 10 giây" on the Demo tier (unlimited on Lite/Pro).

## Tiers and price

|                                                                                    | Demo                       | Lite      | Pro       |
| ---------------------------------------------------------------------------------- | -------------------------- | --------- | --------- |
| Clone length                                                                       | 1,000 chars                | Unlimited | Unlimited |
| Reference voices at once                                                           | 2                          | 2         | Unlimited |
| Lip sync                                                                           | 5 s                        | Unlimited | Unlimited |
| YouTube/TikTok audio, AI sample upscaling, multi-key AI, punctuation pause control | No                         | No        | Yes       |
| Devices per license                                                                | 1 (3 device changes/month) | 1         | 1         |

Listed price: **175,000 ₫** (down from 250,000 ₫). The page does not say which tier or how long that buys; the purchase widget shows "Gói / Hết hạn sau" fields and payment by bank transfer. Treat the price and duration as **unverified**.

## Licensing and API

- Closed source, per-device license. No terms of service, commercial-use terms, privacy policy, or public API were found on the product page.
- The 36 five-star reviews on the shop page are unverified.

## Pros and cons

Pros
: Built around Vietnamese content creators: Vietnamese UI and support, an all-in-one dubbing pipeline (SRT → translate → clone → mp4), runs locally on Windows, cheap one-off VND price.

Cons
: Opaque: unknown model, unknown license and commercial terms, no API, single vendor contact. Windows-only engine. Claims ("cực giống") are marketing with no samples verified for this note. If the "exclusive model" wraps open models with non-commercial weights, output rights are unclear.

See [Voice Cloning Comparison](/Technology/AI/Tools/Voice Cloning/Voice Cloning Comparison).
