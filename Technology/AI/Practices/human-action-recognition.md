---
area: technology
domain: ai-ml
topic: computer-vision
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Human Action Recognition

## 3D-CNN + LSTM: Bộ đôi quyền lực cho nhận dạng hành động

### Vấn đề với CNN đơn thuần

- CNN chỉ phù hợp với hình ảnh tĩnh hoặc video ngắn
- Với video dài, hành động phức tạp → CNN không đủ khả năng

### Hạn chế của 3D-CNN

- **Mạnh ở**: Nắm chuyển động cục bộ (local motion), hiểu frame liền kề trong đoạn ngắn
- **Yếu ở**: Video dài, hành động kéo dài theo thời gian (leo núi, chơi piano, tập võ...) → mất bối cảnh tổng thể
- **Giải pháp**: Cần "bộ nhớ dài hạn" → LSTM

### Cách kết hợp 3D-CNN + LSTM

**Quy trình**:

1. Chia video thành các clip nhỏ (mỗi clip vài chục frames)
2. Dùng 3D-CNN (C3D / I3D) để trích xuất đặc trưng spatio-temporal từ mỗi clip
3. Đưa chuỗi các vector đặc trưng vào LSTM → hiểu chuỗi động tác từ đầu đến cuối

**Hình dung**:

- 👁 3D-CNN là mắt → thấy từng đoạn rõ ràng
- 🧠 LSTM là não → xâu chuỗi các đoạn → hiểu toàn hành động

### Ưu điểm khi kết hợp

- ✅ Hiểu được cả chuyển động ngắn và dài
- ✅ Giải mã hành động phức tạp, có cấu trúc
- ✅ Phù hợp với video dài, hoặc có nhiều stage liên tiếp (vd: "ngồi xuống rồi đứng lên", "nhảy rồi xoay người")

### Kết luận

- 3D-CNN × LSTM = combo cực mạnh cho các task nhận dạng hành động khó nhằn
- Kết hợp khả năng "thấy" của CNN và "ghi nhớ" của RNN
- Mô hình vừa chính xác vừa tổng quát hơn nhiều
- Được dùng trong nhiều paper đỉnh cao từ năm 2016 đến nay:
  - "Convolutional Two-Stream Network Fusion for Video Action Recognition"
  - "Deep Temporal Linear Encoding"

### So sánh & Hướng phát triển

- **So sánh**: 3D-CNN + LSTM vs ST-GCN cho recognition dựa trên keypoints
- **Thay thế**: Transformer thay cho LSTM