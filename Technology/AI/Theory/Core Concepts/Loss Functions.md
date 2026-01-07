---
tags:
  - area/technology
  - domain/ai-ml
  - type/resource
  - lang/vi
---

# Loss Functions

## Cross Entropy

- **Khái niệm**: Hàm mất mát (loss function) phổ biến nhất trong các bài toán phân loại của Deep Learning
- **Entropy**: Đo lường mức độ không chắc chắn trong một phân phối xác suất
  - Entropy cao = phân phối đồng đều, không chắc chắn
  - Entropy thấp = phân phối tập trung, chắc chắn hơn
- **Cross Entropy**: Đo lường sự khác biệt giữa hai phân phối xác suất
  - Thường dùng để so sánh phân phối dự đoán của model với phân phối thực tế (ground truth)
  - Cross Entropy càng thấp = model dự đoán càng gần với thực tế
- **KL Divergence (Kullback-Leibler Divergence)**: Đo lường "khoảng cách" giữa hai phân phối xác suất
  - Liên quan chặt chẽ với Cross Entropy
  - Cross Entropy = Entropy + KL Divergence
- **MLE (Maximum Likelihood Estimation)**: Phương pháp thống kê tối ưu tham số model
  - Tối đa hóa xác suất quan sát được dữ liệu
  - Tối thiểu hóa Cross Entropy tương đương với tối đa hóa likelihood
- **Ưu điểm của Cross Entropy**:
  - Cơ sở thống kê vững chắc
  - Đơn giản và hiệu quả trong tối ưu hóa
  - Gradient tốt, giúp model học nhanh và ổn định
  - Phù hợp với các bài toán phân loại đa lớp