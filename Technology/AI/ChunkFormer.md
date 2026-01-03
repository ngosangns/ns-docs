---
tags:
  - area/technology
  - domain/ai-ml
  - type/resource
  - lang/vi
---

# ChunkFormer: Masked Chunking Conformer For Long-Form Speech Transcription

## Tổng quan

- Công trình nghiên cứu về Speech-to-Text và Speech Recognition tại ICASSP 2025
- Tác giả: Khánh (ZaloAI)

## Điểm nổi bật

### Long-form transcription

- Xử lý audio lên đến **16 tiếng** với model 110M tham số trên GPU 80GB
- Xử lý khoảng **4 tiếng** trên GPU 24GB

### Endless decoding

- Hỗ trợ xử lý audio dài trên GPU có bộ nhớ hạn chế
- Không làm mất context (history và future context) nhờ cơ chế streaming
- Ví dụ: Transcribe audio dài 10 tiếng trên GPU chỉ có 8GB memory

### Masked Batching Technique

- Loại bỏ phần padding trong batch chứa các audio có độ dài khác nhau
- Xử lý một audio 60 phút và một audio 1 phút chỉ tốn tài nguyên tương đương với một audio 61 phút
- Thay vì hai audio 60 phút trong batch truyền thống do padding

## Model & Resources

- **Model & Dataset**: [HuggingFace - chunkformer-large-vie](https://huggingface.co/khanhld/chunkformer-large-vie)
  - Train trên 3000h dữ liệu public tiếng Việt
- **Github**: [khanld/chunkformer](https://github.com/khanld/chunkformer)
- **Paper**: [PDF](https://github.com/khanld/chunkformer/blob/main/docs/paper.pdf)
