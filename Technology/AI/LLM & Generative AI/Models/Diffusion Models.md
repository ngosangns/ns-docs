---
tags:
  - area/technology
  - domain/ai-ml
  - topic/llm
  - type/resource
  - lang/vi
---

# Diffusion Language Models

## Tổng quan về Diffusion Language Models

Diffusion Language Models (DLMs) là một kiến trúc thay thế cho Autoregressive (AR) models trong text generation. Khác với AR models tạo text tuần tự từ trái sang phải, discrete diffusion models tinh chỉnh toàn bộ sequence song song từ trạng thái nhiễu ban đầu.

**Ưu điểm của Diffusion so với AR:**

- **Bidirectional contextual modeling**: Tích hợp thông tin từ cả hai hướng, tăng coherence toàn cục
- **Flexible controllable generation**: Khả năng kiểm soát linh hoạt thông qua quá trình tinh chỉnh lặp lại
- **Potential for sampling acceleration**: Khả năng tăng tốc sampling thông qua kiến trúc và training objectives mới

**Ứng dụng tiềm năng:**

- Embodied AI
- Autonomous agents
- Long-horizon decision-making systems
- Các bài toán cần reasoning và contextual understanding kéo dài

## Dream 7B

**Dream 7B** (Diffusion reasoning model) là diffusion language model mạnh nhất hiện tại, được phát triển bởi HKU NLP Group và Huawei Noah's Ark Lab.

**Đặc điểm nổi bật:**

- Vượt trội so với các diffusion language models hiện có
- Tương đương hoặc vượt các AR models cùng kích thước (Qwen2.5 7B, LLaMA3 8B) trên các tác vụ general, math, và coding
- Thể hiện khả năng planning mạnh mẽ và inference flexibility nhờ diffusion modeling

**Kiến trúc và Training:**

- Sử dụng mask diffusion paradigm
- Pretraining trên 580 tỷ tokens từ Dolma v1.7, OpenCoder, và DCLM-Baseline
- Pretraining trên 96 NVIDIA H800 GPUs trong 256 giờ
- Khởi tạo weights từ Qwen2.5 7B (AR initialization)
- Context-adaptive token-level noise rescheduling mechanism

**Kỹ thuật Training chính:**

1. **AR Initialization**: Sử dụng weights từ AR model (Qwen2.5 7B) làm initialization, giúp tăng tốc training và giảm tokens/computation cần thiết

2. **Context-adaptive Token-level Noise Rescheduling**:
   - Động lực: Mỗi token phụ thuộc vào context, nhưng noise level trong discrete diffusion không nhất quán với timestep t
   - Giải pháp: Động lực reassign noise level cho mỗi token dựa trên corrupted context sau khi inject noise
   - Lợi ích: Cung cấp guidance chính xác hơn cho quá trình học của từng token

**Khả năng Planning:**

- Vượt trội trên các tác vụ Countdown và Sudoku so với các models cùng kích thước
- Đôi khi vượt cả DeepSeek V3 671B mặc dù nhỏ hơn nhiều về parameters
- Hiệu quả hơn trong việc giải quyết các bài toán có nhiều constraints hoặc mục tiêu cụ thể

**Inference Flexibility:**

1. **Arbitrary Order Generation**:
   - Không bị ràng buộc bởi sequential generation
   - Hỗ trợ completion, infilling với exact ending sentence
   - Có thể điều chỉnh decoding behavior từ left-to-right (giống AR) đến fully random order

2. **Quality-speed Trade-off**:
   - Có thể điều chỉnh số tokens generated per step (diffusion steps)
   - Ít steps → nhanh hơn nhưng chất lượng thô hơn
   - Nhiều steps → chất lượng cao hơn nhưng tốn computation hơn
   - Đây là lợi thế độc đáo so với AR frameworks

**Models:**

- Base model: [Dream-org/Dream-v0-Base-7B](https://huggingface.co/Dream-org/Dream-v0-Base-7B)
- SFT model: [Dream-org/Dream-v0-Instruct-7B](https://huggingface.co/Dream-v0-Instruct-7B)
- Codebase: [GitHub](https://github.com/hkunlp/dream)

**Supervised Fine-tuning:**

- Dataset: 1.8M pairs từ Tulu 3 và SmolLM2
- Fine-tuning: 3 epochs
- Kết quả: Tiềm năng tương đương với autoregressive models

**Nguồn:**

- Blog post: https://hkunlp.github.io/blog/2025/dream/
- Paper: arXiv:2508.15487

