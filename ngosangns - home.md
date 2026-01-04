---
tags:
  - area/general
  - type/note
  - lang/vi
---

# 1. Làm lều

- Sức chứa: 3-4 người.
- Trọng lượng: 3kg.
- Loại vải: Dyneema Composite (Cuben Fiber), Polyester phủ silicone, Oxford polyester.

## 1.1. May đáy

- Kích thước đáy sau khi may: 2x2m.
- Chuẩn bị vải chống nước có kích thước 2.5x2.5m.
- Gấp vải thành hình hồ bơi sao cho mặt đáy có kích thước 2x2m.
- Kẹp miếng cố định khung lều vào mặt ngoài của đoạn mép vải đã gấp.
- May đoạn mép vải đã gấp để cố định.

## 1.2. Khung

- Chiều cao lều: 1.2m.
- Khung lều: Hợp kim nhôm, 2 thanh, mỗi thanh 4.11m (nửa chu vi của hình ellipse có bán kính nhỏ bằng sqrt(2) và bán kính lớn là 1.2).
- Móc khung vào các miếng cố định của đáy, đan chéo nhau, cố định bằng dây thừng.

## 1.3. Màn chống côn trùng

- Dùng miếng kẹp để treo màn vào khung và đáy.

## 1.4. May áo chống mưa cho lều

- Chuẩn bị vải chống nước có kích thước 3x3m (do độ dài đường chéo phải dài bằng độ dài khung => độ dài cạnh = 2.9 => cộng thêm 0.1 thành 3 dể trừ hao).
- Phủ áo chống mưa ngoài lều.
- Cố định áo chống mưa vào 4 góc của lều.
- Phần thừa có thể để nguyên hoặc dùng kẹp kẹp lại (áp dụng cho cả cửa).

# 2. Code tool giao dịch, quản lý tài chính

## 2.1. Tài liệu tham khảo

- https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-finance
- https://www.facebook.com/permalink.php?story_fbid=pfbid02W4ebZqJeLktqGA6e1iyq6c6tmoQEnViFe1NgFVgzytXYyNMLtYy5bAWxbdbNTSCzl&id=100074305494707

# 3. Vocab

- PhoTranscriptor - Ứng dụng transcribe ngôn ngữ tiếng Việt dành cho nhà nghiên cứu: https://www.facebook.com/meousensei/posts/pfbid0sKSPNQkduSiAY2TX9CjZJ795Z6ACBjkNtqy7QJVc1ZhMhevtarjeUNKKHi17WJXFl
- Text 2 speech: https://github.com/KittenML/KittenTTS

## 3.1. Speech Recognition & TTS Tools

- **gopt** (https://github.com/YuanGongND/gopt): Công cụ đánh giá phát âm cho người nói tiếng Anh không phải bản ngữ, sử dụng mô hình Transformer. Dựa trên bài báo ICASSP 2022 "Transformer-Based Multi-Aspect Multi-Granularity Non-native English Speaker Pronunciation Assessment". Đánh giá phát âm dựa trên nhiều khía cạnh và mức độ chi tiết khác nhau.
- **phonemizer** (https://github.com/bootphon/phonemizer): Công cụ Python chuyển đổi văn bản thành phiên âm (phonemes) cho nhiều ngôn ngữ. Hỗ trợ các hệ thống tổng hợp giọng nói như eSpeak, Festival. Cài đặt qua pip, sử dụng qua API Python hoặc dòng lệnh. Hữu ích cho việc chuẩn bị dữ liệu cho hệ thống nhận dạng giọng nói hoặc tổng hợp giọng nói.
- **espeak-ng** (https://github.com/espeak-ng/espeak-ng): Bộ tổng hợp giọng nói mã nguồn mở hỗ trợ hơn 100 ngôn ngữ và giọng điệu. Sử dụng phương pháp tổng hợp formant, tạo ra giọng nói rõ ràng với kích thước nhỏ gọn. Có thể sử dụng như chương trình dòng lệnh hoặc thư viện chia sẻ. Hỗ trợ SSML và tạo đầu ra dưới dạng file WAV. Phù hợp cho ứng dụng đọc văn bản, hỗ trợ người khiếm thị.
- **kaldi** (https://github.com/kaldi-asr/kaldi): Bộ công cụ nhận dạng giọng nói tự động (ASR) mã nguồn mở viết bằng C++. Được thiết kế cho các nhà nghiên cứu ASR, hỗ trợ nhiều mô hình như GMM-HMM, DNN-HMM và WFST. Cung cấp công cụ để trích xuất đặc trưng, huấn luyện mô hình và giải mã. Cho phép xây dựng hệ thống nhận dạng giọng nói tùy chỉnh. Cần cài đặt dependencies và biên dịch từ mã nguồn.
- **whisper-timestamped** (https://github.com/linto-ai/whisper-timestamped): Mở rộng của mô hình Whisper của OpenAI, cung cấp dấu thời gian và độ tin cậy ở mức từ cho nhận dạng giọng nói đa ngôn ngữ. Xác định chính xác thời điểm xuất hiện của từng từ trong đoạn âm thanh. Hữu ích cho việc tạo phụ đề tự động cho video hoặc phân tích nội dung âm thanh với độ chính xác cao.
- **DeepSpeech** (https://github.com/mozilla/DeepSpeech): Công cụ nhận dạng giọng nói mã nguồn mở do Mozilla phát triển, dựa trên mô hình học sâu end-to-end. Chuyển đổi giọng nói thành văn bản với độ chính xác cao, hỗ trợ nhiều ngôn ngữ. Có thể cài đặt qua pip và sử dụng qua API Python hoặc dòng lệnh. **Lưu ý**: DeepSpeech đã ngừng phát triển và không còn được duy trì. Nên xem xét các giải pháp khác như Whisper hoặc các hệ thống ASR khác.
- **Praat** (https://github.com/praat/praat.github.io): Phần mềm mã nguồn mở cho phân tích, tổng hợp và thao tác giọng nói. Hỗ trợ nhiều chức năng như phân tích phổ, đo formant, phân tích cao độ và cường độ, tạo và thao tác TextGrid để gán nhãn và phân đoạn. Phù hợp cho nghiên cứu ngữ âm và ngôn ngữ học. Có thể tải xuống binary executables cho Windows, Mac, Linux, Chromebook, Raspberry Pi hoặc biên dịch từ mã nguồn. Website chính: https://praat.org
- **aeneas** (https://github.com/readbeyond/aeneas): Thư viện Python/C và bộ công cụ để tự động đồng bộ hóa âm thanh và văn bản (forced alignment). Tạo ra các tệp chú thích thời gian (TextGrid hoặc các định dạng khác) để gán nhãn thời gian cho từng đoạn văn bản trong tệp âm thanh. Hữu ích cho việc tạo phụ đề tự động, sách nói, hoặc phân tích ngữ âm. Hỗ trợ nhiều ngôn ngữ và có thể được tích hợp vào các dự án khác.
- **Goodness-of-Pronunciation** (https://github.com/sweekarsud/Goodness-of-Pronunciation): Công cụ đánh giá chất lượng phát âm dựa trên mô hình học máy. Tính toán điểm GOP (Goodness-of-Pronunciation) để đánh giá khả năng đọc thành tiếng bằng cách so sánh phát âm của người học với mẫu chuẩn. Cung cấp mã nguồn và hướng dẫn để huấn luyện và đánh giá mô hình.
- **goodness-of-pronunciation-HTK** (https://github.com/topel/goodness-of-pronunciation-HTK): Triển khai GOP sử dụng HTK (Hidden Markov Model Toolkit) để đánh giá phát âm ở mức độ âm vị cho người học ngôn ngữ thứ hai. Cung cấp các script và hướng dẫn để tính toán điểm GOP. Yêu cầu cài đặt HTK và chuẩn bị dữ liệu phù hợp.
- **goparrot** (https://github.com/tzyll/goparrot): Công cụ đơn giản tính toán điểm GOP dựa trên Kaldi cho việc đánh giá đọc thành tiếng. Cung cấp ba loại điểm GOP: dựa trên posterior, likelihood và likelihood ratio. Bao gồm mô hình ASR được huấn luyện với bộ dữ liệu WSJ và các mẫu thử nghiệm. Cần cài đặt Kaldi và chuẩn bị dữ liệu theo định dạng của Kaldi.
- **allosaurus** (https://github.com/xinjli/allosaurus): Mô hình nhận dạng âm vị đa ngôn ngữ dựa trên học sâu, hỗ trợ hơn 100 ngôn ngữ. Cho phép nhận dạng và phân đoạn âm vị từ tệp âm thanh. Cung cấp API Python để sử dụng. Hữu ích cho nghiên cứu ngôn ngữ học và xử lý ngôn ngữ tự nhiên, đặc biệt cho các ngôn ngữ ít tài nguyên.
- **FastHuBERT** (https://github.com/yanghaha0908/FastHuBERT): Mô hình HuBERT được tối ưu hóa cho tốc độ và hiệu suất, giúp tăng tốc độ huấn luyện và suy luận trong các tác vụ nhận dạng giọng nói. Cải thiện hiệu suất so với các phiên bản trước đó mà không làm giảm chất lượng. Cung cấp mã nguồn và hướng dẫn huấn luyện mô hình trên dữ liệu tùy chỉnh.
- **Whisper timestamp discussion** (https://github.com/openai/whisper/discussions/318): Thảo luận về việc mở rộng mô hình Whisper để hỗ trợ đánh dấu thời gian chính xác trong nhận dạng giọng nói. Cung cấp thông tin và mã nguồn để triển khai tính năng timestamp, giúp cải thiện ứng dụng trong các lĩnh vực như phụ đề và phiên âm.
- **fairseq HuBERT** (https://github.com/facebookresearch/fairseq/tree/main/examples/hubert): Ví dụ và hướng dẫn về cách sử dụng mô hình HuBERT trong fairseq (bộ công cụ học sâu của Facebook AI Research). HuBERT là mô hình học tự giám sát cho nhận dạng giọng nói, học các biểu diễn âm thanh hữu ích cho nhiều tác vụ xử lý giọng nói. Cung cấp mã nguồn và hướng dẫn để huấn luyện và tinh chỉnh các mô hình HuBERT cho các ứng dụng cụ thể.
- **fairseq wav2vec** (https://github.com/facebookresearch/fairseq/tree/main/examples/wav2vec): Ví dụ và hướng dẫn về cách sử dụng mô hình wav2vec trong fairseq. Wav2vec là mô hình học tự giám sát khác cho nhận dạng giọng nói, được thiết kế để học các biểu diễn âm thanh từ dữ liệu không gán nhãn. Fairseq cung cấp các công cụ để huấn luyện và tinh chỉnh mô hình wav2vec, giúp cải thiện hiệu suất trong các tác vụ nhận dạng giọng nói.

# 4. NS Store

- Làm trang quảng cáo
- Làm trang tạo mẫu áo dựa vào AI và có thể upload hình để tạo mẫu áo
- Ý tưởng mới: Sản phẩm quét hình ảnh đồ vật và con người để dung ra vật thể 3D, từ đó phát công cụ thử đồ online
- Hậu cần có thể sử dụng https://burgerprints.com

# 5. NS Money

- Làm widget app.
- React native.
- Thông báo theo giờ cài đặt (ngày 3 lần mặc định).
- thêm tính năng đặt mục tiêu cho money.
- Tạo thêm bot telegram.

# 6. IoT

## 6.1. Camera

- https://hshop.vn/kit-rf-thu-phat-wifi-ble-esp32-cam
- Làm camera phát hiện di chuyển và stream video
- https://www.youtube.com/watch?v=HK57H3mzQ_c
- Setup mô phỏng ESP32 và setup VSCode cho IoT
  - https://www.facebook.com/watch/?ref=saved&v=1372564440378160
- https://www.jeffgeerling.com/blog/2025/how-i-monitor-and-control-all-my-powered-devices-zigbee-ha

## 6.2. Kính

- https://www.facebook.com/reel/1664889724380657
- https://www.facebook.com/reel/533452956179734
- Setup mô phỏng ESP32 và setup VSCode cho IoT
  - https://www.facebook.com/watch/?ref=saved&v=1372564440378160
- Nghiên cứu về pin: https://cafef.vn/dot-pha-vo-song-trung-quoc-tim-ra-cong-nghe-phuc-hoi-pin-lithium-ion-da-bi-chai-khong-can-thao-roi-van-dua-duoc-pin-ve-trang-thai-nhu-moi-xuat-xuong-co-the-dat-tuoi-tho-60000-chu-ky-sac-xa-trong-164-nam-188250216112303946.chn

## 6.3. Drone

- https://www.facebook.com/reel/1144052800510992
- https://www.facebook.com/reel/655674513905186

# 7. Sóng âm

- https://www.facebook.com/reel/560138376963731
- LeviPrint
- Levitation by sound
- Biến WiFi Router thành “Camera” dùng AI
  - Ý tưởng chính
    - Dùng AI kết hợp sóng WiFi để theo dõi chuyển động con người xuyên tường
    - Biến WiFi router thành "camera ảo" không cần hình ảnh trực quan
  - Nguyên lý hoạt động
    - Sóng WiFi có thể xuyên qua tường và phản xạ từ cơ thể người
    - AI phân tích tín hiệu phản xạ để tái tạo hình dáng và chuyển động
      - Dùng mô hình học sâu (deep learning)
      - Ánh xạ tín hiệu WiFi thành khung xương người 3D
  - Kết quả
    - Nhận diện tư thế và hành động người chính xác
    - Không cần gắn thiết bị lên người
    - Hoạt động được qua vật cản như tường
  - Ứng dụng tiềm năng
    - An ninh và giám sát
      - Theo dõi người trong phòng kín
      - Không cần camera truyền thống
    - Hỗ trợ y tế và chăm sóc người già
      - Phát hiện té ngã hoặc chuyển động bất thường
    - Ứng dụng trong thực tế ảo (VR) / tăng cường thực tế (AR)
      - Theo dõi cơ thể người dùng mà không cần cảm biến đeo
    - Tìm kiếm và cứu hộ
      - Xác định vị trí người trong các khu vực bị sập, cháy nổ
  - Rủi ro và vấn đề đạo đức
    - Xâm phạm quyền riêng tư
      - Có thể theo dõi người mà họ không biết
    - Nguy cơ bị lạm dụng
      - Dùng cho mục đích giám sát trái phép
    - Cần quy định pháp luật rõ ràng
      - Giới hạn ứng dụng và giám sát chặt chẽ
