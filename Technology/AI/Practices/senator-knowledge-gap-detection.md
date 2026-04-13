---
area: technology
domain: ai-ml
topic: llm
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# SENATOR - Knowledge Gap Detection và Vá Lỗ Hổng Kiến Thức

## Vấn đề

- LLMs trả lời thiếu chính xác hoặc sai lệch trong các lĩnh vực chuyên sâu do chưa nắm vững các mối liên hệ chuyên môn phức tạp
- Dẫn đến hiện tượng "hallucination" - mô hình tạo ra thông tin không chính xác

## SENATOR Framework

**SENATOR** (Structural Entropy-guided Knowledge Navigator) là framework giúp LLM tự kiểm tra và vá lỗ hổng kiến thức một cách có hệ thống.

### Kiến trúc

- **Knowledge Graph**: Biểu diễn các mối quan hệ kiến thức
- **Monte Carlo Tree Search (MCTS)**: Thuật toán tìm kiếm để khám phá các vùng kiến thức
- **Structural Entropy (SE)**: Đo lường mức độ hiểu biết của mô hình về các chuỗi kiến thức liên kết
- **Synthetic Data**: Dữ liệu huấn luyện nhân tạo
- **Fine-Tuning**: Tinh chỉnh mô hình với dữ liệu mới

## Quy trình

### Bước 1: Tìm lỗ hổng kiến thức

- **Đo độ bất định (Uncertainty)**: Đo lường mức độ chắc chắn của mô hình đối với các câu hỏi cloze (điền vào chỗ trống)
- **Sử dụng Structural Entropy (SE)**: Đánh giá mức độ hiểu biết của mô hình đối với các chuỗi kiến thức liên kết trong knowledge graph
- **Áp dụng Monte Carlo Tree Search (MCTS)**: Khám phá hiệu quả các vùng kiến thức đáng nghi, tập trung vào các khu vực mà mô hình có độ bất định cao

### Bước 2: Vá lỗ hổng

- **Sinh dữ liệu huấn luyện nhân tạo (Synthetic QA)**: Tạo ra các câu hỏi và câu trả lời nhắm chính xác vào vùng kiến thức mà mô hình chưa nắm vững
- **Fine-tuning có mục tiêu**: Sử dụng dữ liệu synthetic để huấn luyện lại mô hình, giúp mô hình học lại đúng nội dung cần thiết mà không bị nhiễu bởi thông tin không liên quan

## Lợi ích

- Phát hiện và sửa chữa các lỗ hổng kiến thức một cách tự động và có hệ thống
- Tập trung vào các vùng yếu của mô hình thay vì huấn luyện lại toàn bộ
- Cải thiện độ chính xác và giảm hallucination trong các lĩnh vực chuyên sâu
- Tối ưu hóa quá trình fine-tuning bằng cách chỉ tập trung vào kiến thức cần thiết