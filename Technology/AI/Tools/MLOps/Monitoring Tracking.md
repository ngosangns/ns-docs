---
area: technology
domain: ai-ml
type: resource
---
# Model Evaluation & Statistics

## T-test trong Machine Learning

- **Khái niệm**: Phương pháp thống kê so sánh trung bình của hai nhóm dữ liệu để xác định sự khác biệt có ý nghĩa thống kê hay chỉ do ngẫu nhiên
- **Ứng dụng trong ML**: So sánh hiệu suất của hai mô hình (Model A vs Model B) khi chạy nhiều lần với các kết quả khác nhau do yếu tố random (random seed, phân chia dữ liệu)
- **Mục đích**: Trả lời câu hỏi "Liệu hiệu quả trung bình của Model A có tốt hơn Model B thật sự hay không?" hay chỉ là sự khác biệt nhỏ do ngẫu nhiên
- **Ví dụ**:
  - Model A chạy 10 lần: accuracy = [0.85, 0.86, 0.84, 0.87, 0.85, 0.86, 0.85, 0.84, 0.87, 0.86]
  - Model B chạy 10 lần: accuracy = [0.83, 0.82, 0.81, 0.83, 0.82, 0.81, 0.83, 0.82, 0.81, 0.83]
  - Model A có điểm trung bình cao hơn, nhưng cần T-test để xác nhận sự khác biệt có ý nghĩa thống kê
- **Quy trình**:
  - **Giả thuyết**:
    - Null hypothesis (H0): Hai mô hình không khác biệt về hiệu suất trung bình
    - Alternative hypothesis (H1): Hai mô hình có hiệu suất trung bình khác nhau
  - **Tính toán**: t-statistic và p-value dựa trên dữ liệu accuracy của 2 mô hình
  - **Đánh giá p-value**:
    - p-value < 0.05 → bác bỏ H0 → sự khác biệt có ý nghĩa thống kê
    - p-value ≥ 0.05 → không đủ bằng chứng bác bỏ H0 → không thể khẳng định mô hình nào tốt hơn
- **Tại sao quan trọng**:
  - ML không phải lúc nào cũng cho kết quả chính xác tuyệt đối
  - Các yếu tố như random seed, phân chia tập dữ liệu có thể ảnh hưởng đến kết quả
  - So sánh một lần duy nhất có thể dẫn đến kết luận sai về hiệu quả mô hình
  - T-test giúp tránh "đánh giá cảm tính" bằng cách dùng dữ liệu chạy nhiều lần và phân tích thống kê để đảm bảo quyết định có cơ sở khoa học