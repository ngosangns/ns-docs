---
tags:
  - area/technology
  - domain/ai-ml
  - type/resource
  - lang/vi
---

# Vision Transformers

## NaViT (Native Vision Transformer)

- **Vấn đề của ViT (Vision Transformer) truyền thống**:
  - Yêu cầu hình ảnh đầu vào có kích thước cố định
  - Mất thông tin về tỷ lệ khung hình (aspect ratio) khi resize
  - Chi phí tính toán cao khi xử lý hình ảnh độ phân giải cao
  - Không tận dụng được thông tin tự nhiên của hình ảnh đa kích thước
- **NaViT (Native Vision Transformer)**: Giải pháp cải tiến cho phép xử lý hình ảnh đa phân giải
  - Cho phép xử lý hình ảnh với kích thước và tỷ lệ khung hình khác nhau một cách tự nhiên
  - Loại bỏ yêu cầu tiền xử lý phức tạp (resize, crop)
  - Giảm thiểu chi phí tính toán bằng cách tối ưu hóa việc sử dụng tài nguyên
  - Bảo toàn thông tin tỷ lệ khung hình gốc của hình ảnh
- **Phương pháp Patch n' Pack**:
  - Kết hợp các chuỗi patch ngắn từ nhiều hình ảnh khác nhau thành một chuỗi duy nhất
  - Tương tự kỹ thuật example packing trong NLP
  - Tăng hiệu suất huấn luyện bằng cách tận dụng tốt hơn tài nguyên tính toán
  - Cho phép xử lý batch hiệu quả với hình ảnh có kích thước khác nhau