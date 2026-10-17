---
area: technology
domain: voice-cloning
type: tool
title: VoiceStudio
description: VoiceStudio (formerly OmniVoice Studio, debpalash/VoiceStudio, AGPL-3.0) is a local desktop app for zero-shot voice cloning, voice design, dubbing, dictation, and transcription, defaulting to the k2-fsa/OmniVoice model (600+ languages, Vietnamese included). The app code is AGPL; model weight terms are separate.
timestamp: "2026-10-17T00:00:00.000Z"
tags:
  - technology
  - voice-cloning
  - tts
  - local-first
  - open-source
resource: https://github.com/debpalash/VoiceStudio
---

# VoiceStudio (formerly OmniVoice Studio)

"OmniVoice Studio" is the old name of [VoiceStudio](https://voicestudio.sh/) ([debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio); the old URL `github.com/debpalash/OmniVoice-Studio` redirects there). The [rename page](https://voicestudio.sh/omnivoice-studio) says it is the same project, repo, and API; "OmniVoice" now names the default engine and some old installer files. Checked 2026-10-17.

Not to be confused with the model itself, [k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice), which VoiceStudio wraps.

|                     | VoiceStudio (app)                                                           | OmniVoice (model)                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Repo                | [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)           | [k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice), [HF](https://huggingface.co/k2-fsa/OmniVoice), [paper arXiv 2604.00688](https://arxiv.org/abs/2604.00688) |
| What                | Electron desktop app + FastAPI backend, local API and MCP                   | Zero-shot multilingual TTS, diffusion-LM-style architecture, base model Qwen3-0.6B                                                                                 |
| License             | AGPL-3.0 (code). Maintainer company: Yupcha Softwares Private Limited (CLA) | Code Apache-2.0. Weights: see licensing below                                                                                                                      |
| Latest release      | v0.5.6 (2026-09-23)                                                         | PyPI/GitHub 0.2.1 (2026-07-16)                                                                                                                                     |
| GitHub (2026-10-17) | ~72.7k stars, ~8k forks, created 2026-04-09                                 | ~14.7k stars, ~2.2k forks, created 2026-03-31                                                                                                                      |

## Features

- Voice cloning from a short reference clip, voice design (describe gender, age, pitch, accent), saved Voice Profiles reusable across features.
- Video dubbing with timed speech, stories/audiobooks, batch jobs, watch folders, dictation widget, transcription.
- 14 swappable TTS engines in a Model Catalogue; OmniVoice is the default. A GGUF build of OmniVoice is offered for low-VRAM/CPU machines.
- Local OpenAI-compatible API on `localhost:3900` (e.g. `POST /v1/audio/speech`) and an MCP server for agents.
- Non-verbal tags such as `[laughter]` and pronunciation correction (OmniVoice README).

## Voice cloning approach and samples

Zero-shot: no training per voice. The OmniVoice engine doc says **3–10 seconds** of clean speech is the sweet spot; a matching transcript improves conditioning (VoiceStudio can transcribe it with an installed STT model). With a supplied transcript the clip is capped at 20 s; without one, the app searches up to 75 s and picks the best 15 s window. Accepts WAV, MP3, M4A, FLAC, OGG, or a mic recording. Output is 24 kHz mono.

## Vietnamese

Vietnamese (`vi`) is in the OmniVoice language list with about **8,482 hours** of training data (VoiceStudio `docs/languages.md`). Cross-language cloning is advertised. Real Vietnamese quality (tones, regional accents, numbers) was **not listened to** for this note.

## Hardware and platforms

- macOS (Apple Silicon, Metal), Windows, Linux (`.dmg`, `.exe`, `.AppImage`/`.deb`), Docker. Intel Mac: UI only, needs a remote backend.
- OmniVoice engine recommends a dedicated GPU with **≥6 GB VRAM**; 4 GB cards page to RAM and become very slow. CPU works, slower (~5 GB disk for the CPU PyTorch build). Site says ~8 GB RAM is enough to start.
- Install: `curl -fsSL https://voicestudio.sh/install | sh` (macOS/Linux) or the PowerShell one-liner on Windows. First launch downloads multi-GB model weights.
- No account, no cloud; network only for updates and model downloads. Analytics only with consent.

## Pricing and licensing

| Tier           | Price (voicestudio.sh, 2026-10-17)                         | Notes                                                                            |
| -------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Open source    | Free                                                       | AGPL-3.0, commercial use allowed under AGPL terms                                |
| Pro / Lifetime | $99/year or $299 one-time, 1 user, 3 devices, 7-day refund | Closed-source build, commercial license (no AGPL obligations) and extra features |
| Cloud          | "Soon" / waitlist                                          | Hosted                                                                           |

Important for commercial use:

- The app license does **not** cover model weights. VoiceStudio's [LICENSE-NOTICE](https://github.com/debpalash/VoiceStudio/blob/main/LICENSE-NOTICE.md) says the `k2-fsa/OmniVoice` model card identifies the pretrained weights as **CC-BY-NC** (non-commercial), and that `audio_tokenizer/LICENSE` carries Boson Higgs Audio 2 / Meta Llama community terms. On 2026-10-17 the HF model card had no `license` field, and `audio_tokenizer/LICENSE` was confirmed to be the Boson Higgs Audio 2 Community License. The CC-BY-NC statement was **not re-confirmed** on the current card; check before any commercial output.
- A paid Pro license does not grant model or voice rights. Clone only with the voice owner's permission.

## Pros and cons

Pros
: Fully local and private, free, cross-platform, very broad language list including Vietnamese, short 3–10 s samples, OpenAI-compatible local API and MCP, engine choice.

Cons
: Needs a decent GPU for speed; multi-GB downloads. Default model's weight license is likely non-commercial, so commercial voiceover needs another engine or a license check. Zero-shot clones are generally less faithful than a fine-tuned PVC (not measured here). Young project (created April 2026), fast-moving.

See [Voice Cloning Comparison](/Technology/AI/Tools/Voice Cloning/Voice Cloning Comparison).
