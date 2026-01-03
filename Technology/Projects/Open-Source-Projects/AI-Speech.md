---
tags:
  - area/technology
  - domain/open-source
  - topic/ai-speech
  - type/resource
  - lang/vi
---

# AI - Speech Recognition

## WhisperLiveKit

- **Repository**: https://github.com/QuentinFuxa/WhisperLiveKit
- **Description**: Hệ thống speech-to-text độ trễ cực thấp, tự host với khả năng nhận diện người nói, sử dụng các nghiên cứu SOTA về simultaneous speech processing
- **Features**:
  - Ultra-low latency transcription
  - Speaker identification (diarization)
  - Hỗ trợ 200+ ngôn ngữ
  - Simultaneous translation với NLLW
  - Voice Activity Detection (VAD) để giảm overhead
  - Multiple backend support (Faster-Whisper, MLX-Whisper, OpenAI API)
  - Streaming strategies: SimulStreaming (AlignAtt) và LocalAgreement
  - WebSocket API
  - Docker support (GPU và CPU)
  - HTTPS/SSL support
  - LoRA adapter support
- **Tech Stack**: Python, FastAPI, WebSocket, Whisper models
- **License**: MIT
- **Use Cases**: Meeting transcription, accessibility tools, podcast transcription, real-time captioning, customer service call transcription
- **Research**: Sử dụng Simul-Whisper/Streaming (SOTA 2025), WhisperStreaming (SOTA 2023), Streaming Sortformer (SOTA 2025)

