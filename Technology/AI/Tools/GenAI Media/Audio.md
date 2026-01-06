---
tags:
  - area/technology
  - domain/ai-ml
  - type/resource
  - lang/vi
---

# Audio AI

## Speech-to-Text

- **Chuyển giọng nói thành văn bản:**
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

- **Tạo tóm tắt cho meeting:**
  - [https://insight7.io](https://insight7.io/) #summary
  - [https://tldv.io](https://tldv.io/) #summary

## Text-to-Speech

- **Chuyển văn bản thành giọng nói:**
  - [https://vmixvoice.net](https://vmixvoice.net/) #text2speech
  - [https://bevoice.net](https://bevoice.net/) #text2speech
  - [https://elevenlabs.io](https://elevenlabs.io/) #text2speech
  - https://github.com/resemble-ai/chatterbox
  - **MegaTTS3**: Mô hình Text-to-Speech tiên tiến do ByteDance phát triển, tạo ra giọng nói tự nhiên và biểu cảm - [GitHub](https://github.com/bytedance/MegaTTS3) #text2speech #TTS #ByteDance
  - **StyleTTS2-lite-vi**: Mô hình Text-to-Speech cho tiếng Việt, được phát triển dựa trên StyleTTS2
    - Tinh chỉnh từ trọng số của StyleTTS2 LibriTTS, mở rộng bộ ký hiệu lên 189 ký tự để tương thích hoàn toàn với IPA tiếng Việt
    - Dữ liệu huấn luyện: FonosVietnam và VoizFM, được trích xuất từ tập dữ liệu viVoice
    - Huấn luyện trong 120.000 bước
    - Kiến trúc bao gồm: Decoder, Predictor, Style Encoder và Text Encoder
    - Nguồn: [HuggingFace](https://huggingface.co/dangtr0408/StyleTTS2-lite-vi) #text2speech #TTS #Vietnamese
  - **Viterbox**: Mô hình TTS tiếng Việt fine-tune từ Chatterbox Multilingual (23 ngôn ngữ) trên 3000 giờ audio tiếng Việt
    - **Thông tin mô hình**:
      - Base model: Chatterbox Multilingual (Resemble AI), kiến trúc LLama 0.5B
      - Training: 1 epoch
      - Dataset: 3000 giờ audio tiếng Việt (ViVoice, PhoAudiobook, Dolly Voice)
      - Vocabulary: Mở rộng thêm token cho tiếng Việt
    - **Tính năng**: 
      - Zero-shot voice cloning (3-10s)
      - Phát âm tự nhiên với đầy đủ dấu thanh
      - Tự động chuẩn hoá văn bản (soe-vinorm)
      - Chất lượng 24kHz, inference nhanh với GPU
      - Tự động chia câu và ghép audio mượt mà với crossfade
    - **Tài nguyên**:
      - Demo: [HuggingFace Space](https://huggingface.co/spaces/nguyenhuy/viterbox-tts)
      - GitHub: [iamdinhthuan/viterbox-tts](https://github.com/iamdinhthuan/viterbox-tts)
      - HuggingFace: [dolly-vn/viterbox](https://huggingface.co/dolly-vn/viterbox)
    - **Ghi chú**: Code infer đã được chuẩn bị sẵn trên GitHub để có thể tải về và tiếp tục fine-tune nếu muốn #text2speech #TTS #Vietnamese
  - **ebook2audiobook**: Công cụ chuyển đổi sách điện tử thành sách nói với voice cloning và hỗ trợ 1158+ ngôn ngữ
    - Hỗ trợ nhiều định dạng sách: .epub, .pdf, .mobi, .txt, .html, .rtf, .chm, .lit, .pdb, .fb2, .odt, .cbr, .cbz, .prc, .lrf, .pml, .snb, .cbc, .rb, .tcr
    - Định dạng đầu ra: .m4b, .m4a, .mp4, .webm, .mov, .mp3, .flac, .wav, .ogg, .aac
    - Tính năng voice cloning với XTTSv2
    - Hỗ trợ tự động phát hiện chapter từ .epub và .mobi
    - Có giao diện Gradio/GUI và chế độ headless
    - Hỗ trợ Docker với nhiều backend: CPU, CUDA, ROCm, XPU, Jetson
    - Nguồn: [GitHub](https://github.com/DrewThomasson/ebook2audiobook) #text2speech #audiobook #voice-cloning #TTS #ebook
  - **GPT-SoVITS**: Dự án kết hợp GPT và SoVITS để tạo ra các mô hình chuyển đổi giọng nói dựa trên AI. Hỗ trợ tổng hợp giọng nói (text-to-speech) và chuyển đổi giọng nói (voice conversion) - [GitHub](https://github.com/RVC-Boss/GPT-SoVITS) #TTS #voice #synthesis #GPT #SoVITS

- **Chuyển chữ thành nhạc:**
  - https://github.com/facebookresearch/audiocraft #text2music
  - https://github.com/GrandaddyShmax/audiocraft_plus #text2music
  - [https://suno.com](https://suno.com/) #text2music
