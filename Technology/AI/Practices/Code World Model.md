---
area: technology
domain: ai-ml
topic: llm
type: resource
title: Code World Model
description: Code World Model (CWM)
timestamp: '2026-06-19T13:43:26.164Z'
tags:
  - technology
  - ai-ml
  - llm
resource: https://ai.meta.com/research/publications/cwm
---
# Code World Model (CWM)

## Tổng quan

- **Code World Model (CWM)**: Mô hình ngôn ngữ 32 tỷ tham số của Meta
- Không chỉ đoán dòng code tiếp theo, mà còn:
  - Mô phỏng việc thực thi hàm Python
  - Tái hiện tương tác agentic trong môi trường Bash
- **Ý nghĩa**: AI không chỉ viết code, mà còn biết nghĩ trước, mô phỏng và lên kế hoạch như con người

## Kết quả thử nghiệm

- **68.6%** trên LiveCodeBench v5
- **76%** trên AIME24
- **65.8%** trên SweBench Verified (với test-time scaling)

## Ứng dụng và tiềm năng

- Thử nghiệm cách world model cải thiện code generation
- Xây dựng AI agent có khả năng suy luận và lập kế hoạch
- Đưa AI lập trình đến gần hơn với cách con người thật sự tư duy
- Mở ra "phòng thí nghiệm mở" cho cộng đồng nghiên cứu

## World Models khác

- [Code World Model](/Technology/AI/Practices/Code World Model): World model tự giám sát được train trên video, cho phép zero-shot robot control và visual understanding

## Tài nguyên

- **Tech Report**: https://ai.meta.com/research/publications/cwm
- **Model Weights**: https://ai.meta.com/.../models-and-libraries/cwm-downloads/
- **HuggingFace**: https://huggingface.co/facebook/cwm
- **HuggingFace SFT**: https://huggingface.co/facebook/cwm-sft
- **HuggingFace Pretrain**: https://huggingface.co/facebook/cwm-pretrain
- **Inference Code**: https://github.com/facebookresearch/cwm