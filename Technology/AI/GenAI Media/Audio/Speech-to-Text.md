---
tags:
  - area/technology
  - domain/ai-ml
  - type/resource
  - lang/vi
---

# Speech-to-Text

- Chuyển giọng nói thành văn bản:
  - [https://transcribe.com](https://transcribe.com/) #speech2text
  - [https://bevoice.net](https://bevoice.net/) #speech2text
  - **ViStreamASR**: Thư viện nhận dạng giọng nói tiếng Việt thời gian thực - [GitHub](https://github.com/nguyenvulebinh/ViStreamASR) #ASR #Vietnamese #speech2text #streaming
  - **ZipVoice**: Hệ thống nhận dạng giọng nói tự động (ASR) nén, tập trung vào hiệu suất cao và độ trễ thấp - [GitHub](https://github.com/k2-fsa/ZipVoice) #ASR #compression #low-latency
  - **Whisper**: Hệ thống nhận dạng giọng nói tự động (ASR) mã nguồn mở của OpenAI, được huấn luyện trên tập dữ liệu lớn và đa dạng, hỗ trợ nhiều ngôn ngữ và nhiệm vụ nhận dạng giọng nói. Có khả năng chuyển đổi giọng nói thành văn bản với độ chính xác cao - [GitHub](https://github.com/openai/whisper) #ASR #speech2text #OpenAI
  - **ChunkFormer**: Masked Chunking Conformer cho long-form speech transcription (ICASSP 2025)
    - Long-form transcription: xử lý audio lên đến 16 tiếng với model 110M tham số trên GPU 80GB (4 tiếng trên GPU 24GB)
    - Endless decoding: xử lý audio dài trên GPU bộ nhớ hạn chế mà không mất context (history và future context) nhờ streaming
    - Masked Batching Technique: loại bỏ padding trong batch, tối ưu xử lý audio có độ dài khác nhau
    - Model train trên 3000h dữ liệu public tiếng Việt: [HuggingFace](https://huggingface.co/khanhld/chunkformer-large-vie) | [GitHub](https://github.com/khanld/chunkformer) | [Paper](https://github.com/khanld/chunkformer/blob/main/docs/paper.pdf) #ASR #speech2text #long-form #Vietnamese #ZaloAI
- Tạo tóm tắt cho metting:
  - [https://insight7.io](https://insight7.io/) #summary
  - [https://tldv.io](https://tldv.io/) #summary

