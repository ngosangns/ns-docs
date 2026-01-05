---
tags:
  - area/technology
  - domain/ai-ml
  - type/resource
  - lang/vi
---

# OCR (Optical Character Recognition)

- SVTR NET - Lời giải hoàn hảo cho bài toán OCR ? (viblo.asia): https://viblo.asia/p/svtr-net-loi-giai-hoan-hao-cho-bai-toan-ocr-924lJg3a5PM #SVTR #OCR
- **doctr**: Thư viện mã nguồn mở mạnh mẽ cho nhận dạng ký tự quang học (OCR) dựa trên học sâu, hỗ trợ cả TensorFlow và PyTorch - [GitHub](https://github.com/mindee/doctr) #OCR #document #textRecognition
- **CRAFT-pytorch**: Mô hình phát hiện văn bản trong hình ảnh, tập trung vào việc nhận diện các vùng ký tự để cải thiện độ chính xác - [GitHub](https://github.com/clovaai/CRAFT-pytorch) #OCR #textDetection #CRAFT
- **olmocr**: Bộ công cụ để chuyển đổi PDF thành định dạng phù hợp cho việc huấn luyện mô hình ngôn ngữ lớn (LLM)
  - Chuyển đổi PDF thành dữ liệu tuyến tính (linearized data)
  - Hỗ trợ tạo và huấn luyện các tập dữ liệu cho LLM
  - Tối ưu hóa cho việc xử lý tài liệu để training models
  - [GitHub](https://github.com/allenai/olmocr) #OCR #PDF #LLM #dataset
- **VIntern-1B v3.5**: Mô hình ngôn ngữ lớn đa phương thức (MLLM) với 1 tỷ tham số, tối ưu cho tiếng Việt, kết hợp OCR và xử lý văn bản nhỏ gọn
  - **Quá trình phát triển**: Bắt đầu từ mô hình InternVL2.5-1B, tinh chỉnh trên dữ liệu Viet-ShareGPT-4o-Text-VQA. Các phiên bản trước bao gồm ColVintern-1B-v1, Vintern-1B-v2, Vintern-1B-v3.5
  - **Cấu trúc mô hình**: Áp dụng kiến trúc "ViT-MLP-LLM" gồm ba thành phần chính:
    - Mô hình thị giác InternViT-300M-448px để xử lý hình ảnh
    - Mô hình ngôn ngữ Qwen2-0.5B-Instruct để xử lý văn bản
    - MLP projector kết nối hai mô hình trên, cho phép tương tác hiệu quả giữa thông tin thị giác và văn bản
  - **Đặc điểm**: Nhỏ gọn, hiệu quả, tối ưu cho tiếng Việt, kết hợp khả năng OCR và xử lý văn bản trong một mô hình duy nhất
  - Nguồn: https://viblo.asia/p/vintern-1b-v35-mo-hinh-ket-hop-ocr-va-xu-ly-van-ban-nho-nhe-danh-cho-tieng-viet-AZoJj8WOVY7 #OCR #Vietnamese #MLLM
