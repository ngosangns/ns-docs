---
tags:
  - area/technology
  - domain/ai-ml
  - topic/world-model
  - type/resource
  - lang/vi
---

# V-JEPA 2 (Video Joint Embedding Predictive Architecture 2)

## Tổng quan

- **V-JEPA 2**: World model tự giám sát (self-supervised foundation world model) được train trên video
- Đạt state-of-the-art trong visual understanding và prediction
- Cho phép **zero-shot robot control** trong môi trường mới
- Bước tiếp theo hướng tới tầm nhìn về AI sử dụng world model để:
  - Hiểu thực tế vật lý
  - Dự đoán kết quả
  - Lập kế hoạch chiến lược hiệu quả
  - Tất cả với minimal supervision

## Khả năng chính

### Hiểu thế giới (World Understanding)

- Hiểu chuyển động (motion understanding) xuất sắc
- Khả năng visual reasoning hàng đầu khi kết hợp với language modeling

### Dự đoán (Prediction)

- Có thể dự đoán về cách thế giới sẽ phát triển
- Đặt state-of-the-art mới trong việc dự đoán hành động từ các tín hiệu ngữ cảnh (contextual cues)

### Lập kế hoạch cho Robot Control

- Xây dựng trên khả năng hiểu và dự đoán
- Có thể được sử dụng cho **zero-shot robot planning** để tương tác với các đối tượng không quen thuộc trong môi trường mới
- Train trên 62 giờ dữ liệu robot từ Droid dataset
- Deploy trên robot arm trong môi trường mới
- Bằng cách chỉ định tasks như goal images, mô hình hoàn thành các tasks như:
  - Reaching
  - Grasping
  - Pick-and-place
- **Task-agnostic**: Có thể được train mà không cần dữ liệu robot rộng rãi hoặc demonstrations cụ thể cho task

## Kiến trúc mô hình

### Two-Phase Training Approach

1. **Pre-training (Self-supervised learning)**:
   - Encoder và predictor được pre-train qua self-supervised learning từ visual data
   - Tận dụng video tự nhiên phong phú để bootstrap hiểu biết và dự đoán về thế giới vật lý

2. **Fine-tuning**:
   - Fine-tune trên một lượng nhỏ dữ liệu robot
   - Cho phép lập kế hoạch hiệu quả mà không cần extensive expert robot demonstrations (khó thu thập ở quy mô lớn)

## Tầm nhìn về World Models

- Câu hỏi lớn: "Điều gì sẽ xảy ra nếu AI có thể suy luận và lập kế hoạch một cách dễ dàng như chúng ta?"
- Một trong những thách thức khoa học lớn mà Meta đang giải quyết

## Ứng dụng tiềm năng

### Robotic Assistants

- World models có thể mở ra một kỷ nguyên mới cho robotics
- Cung cấp năng lượng cho AI agents điều hướng môi trường vật lý để:
  - Xử lý công việc nhà
  - Thực hiện các tasks phức tạp

### Wearable Assistants

- World models có thể cho phép công nghệ hỗ trợ giúp cá nhân điều hướng môi trường bận rộn
- Cung cấp cảnh báo thời gian thực về:
  - Chướng ngại vật đang đến gần
  - Mối nguy hiểm

## World Models khác

- [[Code World Model]]: World model của Meta cho code generation, mô phỏng việc thực thi code và tương tác agentic

## Tài nguyên

- **Website**: https://ai.meta.com/vjepa/
- **AI at Meta blog**: [Link trong website]
- **Research paper**: [Link trong website]
- **Hugging Face**: [Link trong website]
- **Download V-JEPA 2**: [Link trong website]
- **V-JEPA 1**: [Link trong website]
