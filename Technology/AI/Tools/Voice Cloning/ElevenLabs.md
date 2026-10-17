---
area: technology
domain: voice-cloning
type: tool
title: ElevenLabs
description: ElevenLabs is a hosted AI audio platform (TTS, Instant and Professional Voice Cloning, dubbing, Scribe STT, voice agents, music) with a public API. Vietnamese is in Eleven v4, v3, and Flash v2.5 but not Multilingual v2; commercial use starts at the Starter plan.
timestamp: "2026-10-17T00:00:00.000Z"
tags:
  - technology
  - voice-cloning
  - tts
  - stt
  - dubbing
resource: https://elevenlabs.io/
---

# ElevenLabs

[ElevenLabs](https://elevenlabs.io/) is a closed-source, cloud-only AI audio platform. One account and one shared credit pool cover text to speech, voice cloning, voice design, voice changer, dubbing, speech to text (Scribe), sound effects, music, and the voice agent platform (ElevenAgents). Everything is also reachable through the [API](https://elevenlabs.io/docs). Checked 2026-10-17 against the [pricing page](https://elevenlabs.io/pricing), [models page](https://elevenlabs.io/docs/overview/models), and [voice cloning docs](https://elevenlabs.io/docs/creative-platform/voices/voice-cloning).

## Models (TTS and STT)

| Model ID                           | What it is                                                                                   | Vietnamese                                         | Per-request limit |
| ---------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------- |
| `eleven_v4`                        | Newest, most expressive TTS; multi-speaker dialogue; served through the Text to Dialogue API | Yes (90+ languages)                                | 10,000 chars      |
| `eleven_v4_turbo`                  | Real-time v4, median ~100 ms model latency                                                   | Yes                                                | —                 |
| `eleven_v3`                        | Previous expressive model, audio tags, Text to Dialogue                                      | Yes (70+ languages)                                | 5,000 chars       |
| `eleven_multilingual_v2`           | Stable long-form model, best number normalization                                            | **No** (29 languages, `vi` not listed)             | 10,000 chars      |
| `eleven_flash_v2_5`                | Fast, cheap (~75 ms), 0.5–1 credit/char on API                                               | Yes (`vi` is one of the 3 languages added over v2) | 40,000 chars      |
| `scribe_v2` / `scribe_v2_realtime` | Speech to text, 90+ languages, diarization up to 32 speakers, word timestamps                | 90+ languages (Vietnamese not separately checked)  | —                 |

Flash v2.5 does not normalize numbers, dates, or currency by default (only Enterprise can turn `apply_text_normalization` on). For Vietnamese that means normalizing numbers in your own text before sending.

## Voice cloning

Instant Voice Cloning (IVC)
: No model is trained; the system conditions on the sample. Docs recommend **1–2 minutes** of clean audio (MP3 ≥192 kbps); more than 2–3 minutes adds little and can hurt stability. Unusual voices or accents may not come out right. Available from **Starter**.

Professional Voice Cloning (PVC)
: Fine-tunes a dedicated model on **30–180 minutes** of audio, usually 3–6 hours (up to 24 h in queue). Available from **Creator** (1 slot; Scale 3; Business 10). PVC supports every language in the v4 family, including Vietnamese.

Rules that matter:

- PVC is **only for your own voice**. A verification recording is required; even with consent you cannot PVC someone else. They can create and share their own PVC with you.
- Clones cannot be exported as files. They stay in the account and are used through the app or API.
- The accent of a clone cannot be changed after creation; change the samples instead.
- Generated audio is traceable to the account that generated it ([use policy](https://elevenlabs.io/use-policy)).

## Plans (USD, monthly, from the pricing FAQ)

| Plan       | Price                 | Credits/month | Notes                                         |
| ---------- | --------------------- | ------------- | --------------------------------------------- |
| Free       | $0                    | 10k           | No commercial license, no IVC                 |
| Starter    | $6                    | 30k           | Commercial license, IVC, Dubbing Studio       |
| Creator    | $22 ($11 first month) | 121k          | PVC (1 slot)                                  |
| Pro        | $99                   | 600k          | 44.1 kHz PCM via API, 192 kbps                |
| Scale      | $299                  | 1.8M          | 3 seats, 3 PVC                                |
| Business   | $990                  | 6M            | 10 seats, 10 PVC, low-latency TTS from 5¢/min |
| Enterprise | Custom                | Custom        | DPA/SLA, HIPAA BAA, SSO                       |

Annual billing = 10× the monthly price. The pricing page also showed time-limited first-month promos on 2026-10-17; they are not recorded here.

Approximate credit costs: TTS 1 credit/char (Flash/Turbo API 0.5–1), STT 330/min, voice changer and isolator 1,000/min, dubbing 2,000–10,000/min depending on automatic vs Dubbing Studio and watermark. Unused credits roll over up to 2 months on an active paid plan. Payment is card, Apple Pay, or Google Pay (no VND).

## API and integration

- REST and WebSocket API with official SDKs; TTS streaming over WebSocket counts toward concurrency only while generating.
- Concurrency by plan, e.g. Multilingual v2: Free 2, Starter 3, Creator 5, Pro 10, Scale/Business 15.
- Voice agents (ElevenAgents) with low-latency models; startup grants program (12 months, 33M characters).
- Used as a TTS provider by other SDKs, e.g. [Laravel AI SDK](/Technology/AI/Tools/Frameworks/Laravel AI SDK).

## Pros and cons

Pros
: Most complete feature set of the three (TTS, clone, dubbing, STT, agents) behind one API. PVC gives the highest-fidelity clone path. Clear commercial license on paid plans. Vietnamese available on the newest models.

Cons
: Cloud only; audio is uploaded. Costs scale with characters. PVC is limited to your own voice. Clones are locked to the account. Best long-form model (Multilingual v2) has no Vietnamese. Vietnamese pronunciation quality was **not listened to** for this note; third-party comparisons exist (for example [CoolMe's blog](https://www.coolme.vn/blog/clone-giong-tieng-viet-coolme-vbee-elevenlabs)) but are written by competitors.

See [Voice Cloning Comparison](/Technology/AI/Tools/Voice Cloning/Voice Cloning Comparison).
