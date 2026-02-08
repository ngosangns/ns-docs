---
tags:
  - area/technology
  - domain/ai-ml
  - topic/speech-recognition
  - topic/tts
  - type/tool
  - lang/vi
---

# Speech Recognition & TTS Tools

## Vietnamese Language Tools

- **PhoTranscriptor** - Ứng dụng transcribe ngôn ngữ tiếng Việt dành cho nhà nghiên cứu: https://www.facebook.com/meousensei/posts/pfbid0sKSPNQkduSiAY2TX9CjZJ795Z6ACBjkNtqy7QJVc1ZhMhevtarjeUNKKHi17WJXFl
- **KittenTTS** (https://github.com/KittenML/KittenTTS): Text 2 speech

## Pronunciation Assessment

- **gopt** (https://github.com/YuanGongND/gopt): Công cụ đánh giá phát âm cho người nói tiếng Anh không phải bản ngữ, sử dụng mô hình Transformer. Dựa trên bài báo ICASSP 2022 "Transformer-Based Multi-Aspect Multi-Granularity Non-native English Speaker Pronunciation Assessment". Đánh giá phát âm dựa trên nhiều khía cạnh và mức độ chi tiết khác nhau.
- **phonemizer** (https://github.com/bootphon/phonemizer): Công cụ Python chuyển đổi văn bản thành phiên âm (phonemes) cho nhiều ngôn ngữ. Hỗ trợ các hệ thống tổng hợp giọng nói như eSpeak, Festival. Cài đặt qua pip, sử dụng qua API Python hoặc dòng lệnh. Hữu ích cho việc chuẩn bị dữ liệu cho hệ thống nhận dạng giọng nói hoặc tổng hợp giọng nói.
- **Goodness-of-Pronunciation** (https://github.com/sweekarsud/Goodness-of-Pronunciation): Công cụ đánh giá chất lượng phát âm dựa trên mô hình học máy. Tính toán điểm GOP (Goodness-of-Pronunciation) để đánh giá khả năng đọc thành tiếng bằng cách so sánh phát âm của người học với mẫu chuẩn. Cung cấp mã nguồn và hướng dẫn để huấn luyện và đánh giá mô hình.
- **goodness-of-pronunciation-HTK** (https://github.com/topel/goodness-of-pronunciation-HTK): Triển khai GOP sử dụng HTK (Hidden Markov Model Toolkit) để đánh giá phát âm ở mức độ âm vị cho người học ngôn ngữ thứ hai. Cung cấp các script và hướng dẫn để tính toán điểm GOP. Yêu cầu cài đặt HTK và chuẩn bị dữ liệu phù hợp.
- **goparrot** (https://github.com/tzyll/goparrot): Công cụ đơn giản tính toán điểm GOP dựa trên Kaldi cho việc đánh giá đọc thành tiếng. Cung cấp ba loại điểm GOP: dựa trên posterior, likelihood và likelihood ratio. Bao gồm mô hình ASR được huấn luyện với bộ dữ liệu WSJ và các mẫu thử nghiệm. Cần cài đặt Kaldi và chuẩn bị dữ liệu theo định dạng của Kaldi.
- **IPA Audio Visual** (https://hanna-hofmann.com/ipa-audio-visual/): Công cụ học Bảng Ký hiệu Ngữ âm Quốc tế (IPA) độc đáo sử dụng hình ảnh MRI thời gian thực được đồng bộ hóa với âm thanh. Bao gồm các phần về nguyên âm, phụ âm và giải phẫu, giúp người học hiểu rõ cách phát âm và cấu trúc âm thanh.

## ASR (Automatic Speech Recognition)

- **espeak-ng** (https://github.com/espeak-ng/espeak-ng): Bộ tổng hợp giọng nói mã nguồn mở hỗ trợ hơn 100 ngôn ngữ và giọng điệu. Sử dụng phương pháp tổng hợp formant, tạo ra giọng nói rõ ràng với kích thước nhỏ gọn. Có thể sử dụng như chương trình dòng lệnh hoặc thư viện chia sẻ. Hỗ trợ SSML và tạo đầu ra dưới dạng file WAV. Phù hợp cho ứng dụng đọc văn bản, hỗ trợ người khiếm thị.
- **kaldi** (https://github.com/kaldi-asr/kaldi): Bộ công cụ nhận dạng giọng nói tự động (ASR) mã nguồn mở viết bằng C++. Được thiết kế cho các nhà nghiên cứu ASR, hỗ trợ nhiều mô hình như GMM-HMM, DNN-HMM và WFST. Cung cấp công cụ để trích xuất đặc trưng, huấn luyện mô hình và giải mã. Cho phép xây dựng hệ thống nhận dạng giọng nói tùy chỉnh. Cần cài đặt dependencies và biên dịch từ mã nguồn.
- **whisper-timestamped** (https://github.com/linto-ai/whisper-timestamped): Mở rộng của mô hình Whisper của OpenAI, cung cấp dấu thời gian và độ tin cậy ở mức từ cho nhận dạng giọng nói đa ngôn ngữ. Xác định chính xác thời điểm xuất hiện của từng từ trong đoạn âm thanh. Hữu ích cho việc tạo phụ đề tự động cho video hoặc phân tích nội dung âm thanh với độ chính xác cao.
- **DeepSpeech** (https://github.com/mozilla/DeepSpeech): Công cụ nhận dạng giọng nói mã nguồn mở do Mozilla phát triển, dựa trên mô hình học sâu end-to-end. Chuyển đổi giọng nói thành văn bản với độ chính xác cao, hỗ trợ nhiều ngôn ngữ. **Lưu ý**: DeepSpeech đã ngừng phát triển và không còn được duy trì. Nên xem xét các giải pháp khác như Whisper hoặc các hệ thống ASR khác.
- **Praat** (https://github.com/praat/praat.github.io): Phần mềm mã nguồn mở cho phân tích, tổng hợp và thao tác giọng nói. Hỗ trợ nhiều chức năng như phân tích phổ, đo formant, phân tích cao độ và cường độ, tạo và thao tác TextGrid để gán nhãn và phân đoạn. Website chính: https://praat.org
- **aeneas** (https://github.com/readbeyond/aeneas): Thư viện Python/C và bộ công cụ để tự động đồng bộ hóa âm thanh và văn bản (forced alignment). Tạo ra các tệp chú thích thời gian (TextGrid hoặc các định dạng khác) để gán nhãn thời gian cho từng đoạn văn bản trong tệp âm thanh.
- **allosaurus** (https://github.com/xinjli/allosaurus): Mô hình nhận dạng âm vị đa ngôn ngữ dựa trên học sâu, hỗ trợ hơn 100 ngôn ngữ. Cho phép nhận dạng và phân đoạn âm vị từ tệp âm thanh.
- **CMUSphinx** (https://cmusphinx.github.io/): Bộ công cụ nhận dạng giọng nói mã nguồn mở, cung cấp các thư viện và công cụ để phát triển ứng dụng nhận dạng giọng nói. Bao gồm PocketSphinx, SphinxTrain, và Sphinx4.

## Self-Supervised Learning Models

- **FastHuBERT** (https://github.com/yanghaha0908/FastHuBERT): Mô hình HuBERT được tối ưu hóa cho tốc độ và hiệu suất, giúp tăng tốc độ huấn luyện và suy luận trong các tác vụ nhận dạng giọng nói.
- **fairseq HuBERT** (https://github.com/facebookresearch/fairseq/tree/main/examples/hubert): Ví dụ và hướng dẫn về cách sử dụng mô hình HuBERT trong fairseq (bộ công cụ học sâu của Facebook AI Research). HuBERT là mô hình học tự giám sát cho nhận dạng giọng nói.
- **fairseq wav2vec** (https://github.com/facebookresearch/fairseq/tree/main/examples/wav2vec): Ví dụ và hướng dẫn về cách sử dụng mô hình wav2vec trong fairseq. Wav2vec là mô hình học tự giám sát khác cho nhận dạng giọng nói.
- **wav2vec 2.0** (https://arxiv.org/abs/2006.11477): Khung làm việc cho việc học biểu diễn giọng nói tự giám sát. Chứng minh lần đầu tiên rằng học các biểu diễn mạnh mẽ từ âm thanh giọng nói đơn thuần, sau đó tinh chỉnh trên dữ liệu được phiên âm, có thể vượt qua các phương pháp bán giám sát tốt nhất.
- **Whisper timestamp discussion** (https://github.com/openai/whisper/discussions/318): Thảo luận về việc mở rộng mô hình Whisper để hỗ trợ đánh dấu thời gian chính xác trong nhận dạng giọng nói.
