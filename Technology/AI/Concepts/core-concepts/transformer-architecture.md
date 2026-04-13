---
area: technology
domain: ai-ml
topic: transformer
type: resource
---
# Attention is All You Need - Transformer Architecture

> Tóm tắt từ: https://bfcmath.github.io/posts/Attention-is-all-you-need-and-much-more/

## Giới thiệu

- Paper "Attention is All You Need" (2017) là nền tảng của kiến trúc Transformer, đã cách mạng hóa AI hiện đại
- Transformer thay thế các mô hình RNN/LSTM/GRU trong sequence modeling, đặc biệt là machine translation
- Kiến trúc này tránh recurrence và dựa hoàn toàn vào attention mechanism để thiết lập dependencies toàn cục

## Vấn đề của RNN

- **RNN**: Xử lý tuần tự từng từ, chậm với chuỗi dài, khó parallelize training
- **Transformer**: Xử lý song song tất cả từ cùng lúc, có thể "nhìn" toàn bộ câu/đoạn văn cùng một lúc, nhanh hơn và không quên thông tin

## Kiến trúc Transformer

### Encoder-Decoder Architecture

- **Encoder**: "Reader" - hiểu câu trong một ngôn ngữ và tạo representation
- **Decoder**: "Writer" - sử dụng representation để sinh câu trong ngôn ngữ khác
- Cả encoder và decoder đều có 6 layers (stacked)

### Cấu trúc Encoder

Mỗi encoder layer gồm:

1. **Multi-Head Self-Attention**: Xem tất cả từ trong câu cùng lúc, quyết định từ nào quan trọng
2. **Residual Connection & Layer Normalization**: Kết nối tắt và chuẩn hóa
3. **Position-wise Feed-Forward Network**: Mạng feed-forward theo vị trí
4. **Residual Connection & Layer Normalization**: Kết nối tắt và chuẩn hóa

### Cấu trúc Decoder

Mỗi decoder layer gồm:

1. **Masked Multi-Head Attention**: Self-attention với mask để không nhìn vào từ tương lai
2. **Residual Connection & Layer Normalization**
3. **Multi-Head Attention over Encoder Output**: Attention vào output của encoder
4. **Residual Connection & Layer Normalization**
5. **Position-wise Feed-Forward Network**
6. **Residual Connection & Layer Normalization**

### Các thành phần quan trọng

- **Layer Normalization**: Chuẩn hóa output của mỗi layer, quản lý internal covariate shift
- **Residual Connection**: Kết nối tắt giúp tránh vanishing gradient, cho phép training mạng sâu dễ dàng hơn
- **Masked Attention**: Trong decoder, mask các từ tương lai để đảm bảo chỉ nhìn vào các từ đã sinh ra

## Attention Mechanism

### Dot-Product Attention

- **Query (Q)**: "Tôi đang tìm gì?"
- **Key (K)**: "Tôi là gì?"
- **Value (V)**: "Thông tin thực tế tôi chứa"

Công thức:

```
Attention(Q, K, V) = softmax(QK^T / √d_k) V
```

- Tính similarity giữa Q và K
- Scale bằng √d_k để tránh gradient quá nhỏ
- Softmax để tạo attention weights
- Weighted sum của V

### Multi-Head Attention

- Thay vì một attention, sử dụng nhiều "heads" (mắt) nhìn câu theo nhiều cách khác nhau
- Ví dụ: một head tập trung vào "dog", một head vào "bark", một head vào "pet"
- Cho phép model thu thập thông tin đầy đủ hơn từ nhiều góc độ

### Scaled Dot-Product Attention

- Scale factor (√d_k) giúp:
  - Tránh gradient quá nhỏ khi d_k lớn
  - Ổn định training
  - Cải thiện hiệu suất

## Positional Encoding

- Attention không có thông tin về thứ tự tự nhiên
- Thêm positional encoding vào embeddings để model biết vị trí của từ
- Sử dụng sin/cos functions với tần số khác nhau cho mỗi chiều

## Tại sao Transformer thành công?

### Lý do phổ biến

1. **Performance Breakthrough**: Đạt state-of-the-art, vượt RNN-based systems
2. **Parallelization**: Xử lý song song, tận dụng GPU/TPU hiệu quả
3. **Long-Range Dependencies**: Giải quyết vấn đề dependencies xa trong sequence
4. **Simplicity**: Thiết kế sạch, dễ hiểu và implement hơn RNN phức tạp
5. **Open Source**: Cộng đồng nhanh chóng adopt và cải tiến
6. **Data Boom**: Ra đời đúng lúc có nhiều dữ liệu lớn (Common Crawl, Wikipedia)

## Các biến thể và cải tiến

### BERT (Bidirectional Encoder Representations)

- Google, 2018
- Pre-training deep bidirectional Transformers
- Thành công trong question answering, text classification
- Cornerstone của NLP

### GPT Series (Generative Pre-trained Transformer)

- OpenAI, từ GPT-2 đến GPT-3, GPT-4
- Nhấn mạnh khả năng generative
- Pre-trained trên lượng text khổng lồ
- Breakthrough trong text generation, creative writing, code generation

### Transformer-XL và Longformer

- Giải quyết giới hạn context length của Transformer gốc
- Mở rộng khả năng xử lý sequence dài
- Ứng dụng cho document-level tasks

### Efficient Transformer Variants

- **Reformer, Performer**: Giảm quadratic complexity của self-attention
- Tối ưu cho sequence rất dài

### Vision Transformers (ViT)

- Áp dụng Transformer vào computer vision
- Xử lý ảnh như sequence của patches
- State-of-the-art trong image recognition
- Thách thức dominance của CNN trong vision

### Audio và Multimodal Transformers

- Xử lý audio, speech recognition
- Multimodal tasks: kết hợp text, image, audio
- Versatile như general-purpose sequence processing architecture

## Ứng dụng ngoài NLP

- **computer-vision**: Image recognition, object detection, image generation
- **Speech Recognition**: Speech-to-text systems, audio classification, music generation
- **Time Series Analysis**: Forecasting, anomaly detection
- **Drug Discovery**: Phân tích protein sequences, dự đoán drug interactions
- **Robotics**: Robot control từ sequences of sensor data và actions
- **Scientific Discovery**: Phân tích dữ liệu khoa học, phát hiện patterns

## Tài liệu tham khảo

- Paper gốc: "Attention is All You Need" (2017)
- Blog post: https://bfcmath.github.io/posts/Attention-is-all-you-need-and-much-more/