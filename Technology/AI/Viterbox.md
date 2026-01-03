---
tags:
  - area/technology
  - domain/ai-ml
  - topic/tts
  - type/resource
  - lang/vi
---

# Viterbox

Mô hình TTS (Text-to-Speech) tiếng Việt được fine-tune từ Chatterbox Multilingual (23 ngôn ngữ) trên hơn 3000 giờ audio tiếng Việt.

## Thông tin mô hình

- **Base model**: Chatterbox Multilingual (23 ngôn ngữ) – Resemble AI
- **Kiến trúc**: Dựa trên LLama 0.5B
- **Training**: 1 epoch
- **Dataset**: 3000 giờ audio tiếng Việt từ 3 bộ dữ liệu:
  - ViVoice
  - PhoAudiobook
  - Dolly Voice (bộ dữ liệu đã được công bố trước đó)
- **Vocabulary**: Mở rộng thêm token cho tiếng Việt

## Tính năng

- **Zero-shot voice cloning**: Clone giọng từ 3–10 giây audio
- **Phát âm tiếng Việt tự nhiên**: Hỗ trợ đầy đủ dấu thanh
- **Tự động chuẩn hoá văn bản**: Số, ngày tháng, viết tắt bằng soe-vinorm
- **Chất lượng audio**: 24 kHz
- **Inference nhanh**: Với GPU
- **Tự động xử lý**: Chia câu và ghép audio mượt mà với crossfade

## Tài nguyên

- **Demo**: https://huggingface.co/spaces/nguyenhuy/viterbox-tts
- **GitHub**: https://github.com/iamdinhthuan/viterbox-tts
- **HuggingFace**: https://huggingface.co/dolly-vn/viterbox

## Ghi chú

- Code infer đã được chuẩn bị sẵn trên GitHub để có thể tải về và tiếp tục fine-tune nếu muốn
