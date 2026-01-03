---
tags:
  - area/technology
  - domain/ai-ml
  - topic/nlp
  - type/resource
  - lang/vi
---

# Word2Vec - Word Embeddings

## Giới thiệu

- **Word2Vec**: Kỹ thuật nhúng từ phổ biến trong xử lý ngôn ngữ tự nhiên
- Chuyển đổi từ ngữ thành các vector số học để máy tính có thể xử lý và hiểu được mối quan hệ giữa các từ

## Hai kiến trúc chính

### CBOW (Continuous Bag of Words)

- Dự đoán từ mục tiêu dựa trên ngữ cảnh xung quanh
- Sử dụng các từ ngữ cảnh để dự đoán từ trung tâm

### Skip-Gram

- Dự đoán ngữ cảnh dựa trên từ mục tiêu
- Sử dụng từ trung tâm để dự đoán các từ ngữ cảnh xung quanh

## Cơ chế hoạt động của CBOW

### Quy trình huấn luyện

1. **Tạo dữ liệu huấn luyện**: Tạo các cặp (ngữ cảnh, từ mục tiêu) từ văn bản
2. **Chuyển đổi thành vector**: Sử dụng các vector nhúng để biểu diễn từ
3. **Tính toán hàm mất mát**: Đo lường sự khác biệt giữa dự đoán và thực tế
4. **Cập nhật trọng số**: Sử dụng lan truyền ngược để tối ưu hóa khả năng dự đoán

### Cách thức hoạt động

- Mô hình nhận đầu vào là các từ ngữ cảnh (context words) xung quanh
- Dự đoán từ mục tiêu (target word) ở vị trí trung tâm
- Sử dụng mạng nơ-ron để học các vector biểu diễn từ
- Các vector này được cập nhật trong quá trình huấn luyện để tối ưu hóa khả năng dự đoán

## Ưu điểm của CBOW

- **Hiệu quả trong việc học biểu diễn từ**: Học được mối quan hệ ngữ nghĩa giữa các từ
- **Xử lý dữ liệu lớn**: Có thể xử lý các tập dữ liệu lớn một cách hiệu quả
- **Nhanh hơn Skip-gram**: Trong một số trường hợp, CBOW nhanh hơn và hiệu quả hơn Skip-gram
- **Học được mối quan hệ ngữ nghĩa và cú pháp**: Vector từ có thể phản ánh các mối quan hệ như đồng nghĩa, trái nghĩa, và quan hệ cú pháp

## Ứng dụng

- Tìm kiếm từ đồng nghĩa và từ liên quan
- Phân tích tình cảm (sentiment analysis)
- Dịch máy
- Phân loại văn bản
- Nền tảng cho nhiều mô hình NLP hiện đại
