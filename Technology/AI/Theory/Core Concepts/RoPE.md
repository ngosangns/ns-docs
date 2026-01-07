---
tags:
  - area/technology
  - domain/ai-ml
  - topic/llm
  - type/resource
  - lang/vi
---

# RoPE - Rotary Position Embedding

## Tại sao cần mã hóa vị trí (Positional Embedding)?

- Mô hình xử lý song song (như Transformer) xử lý tất cả từ cùng lúc, không biết thứ tự từ
- Cần thêm thông tin về vị trí từ để mô hình hiểu được thứ tự trong câu
- Ví dụ: "Chó ăn cơm" khác với "Cơm ăn chó" - thứ tự từ rất quan trọng

## RoPE (Rotary Position Embedding)

### Khái niệm cơ bản

- **RoPE**: Mã hóa thông tin vị trí bằng cách **xoay** các vector embedding trong không gian 2D
- Thay vì cộng thêm giá trị vị trí, RoPE xoay vector theo góc dựa trên vị trí

### Cách hoạt động

- Chia vector embedding thành các **cặp 2D**
- Mỗi cặp được xoay với góc khác nhau dựa trên vị trí
- Góc xoay được tính bằng: `θ = pos × f` (vị trí nhân với tần số)

### Tần số (Frequency)

- Độ xoay được gọi là **tần số** (kí hiệu `f`)
- Công thức tính tần số: `f_i = base^(-2i/n_dim)`
  - `i`: chỉ số của cặp 2D (từ `0` đến `d/2 - 1`)
  - `base`: hằng số định trước (thường là 10000)
  - `n_dim`: số chiều của vector embedding
- **Đặc điểm**: Mỗi cặp có tần số khác nhau, tương tự như kim giây quay nhanh hơn kim phút trên đồng hồ

### Ưu điểm

- Giúp mô hình nhận biết vị trí từ hiệu quả hơn
- Không cạn kiệt các góc khả dụng nhờ sử dụng nhiều tần số khác nhau
- Hiệu quả trong các mô hình Transformer

## 2D-RoPE

### Khái niệm

- **2D-RoPE**: Mở rộng RoPE cho dữ liệu 2D như hình ảnh
- Sử dụng hai bộ mã hóa vị trí riêng biệt cho trục **x** và **y**

### Cách hoạt động

- Chia vector embedding thành 2 phần: một phần cho trục Y, một phần cho trục X
- Áp dụng RoPE độc lập cho từng trục với tần số riêng
- Ví dụ: Vị trí `[y=1, x=2]` sẽ được mã hóa bằng cách xoay phần Y với góc dựa trên `y=1` và phần X với góc dựa trên `x=2`

### 2D-RoPE với tần số đan xen

- Có thể sử dụng tần số khác nhau cho từng trục
- Ví dụ: Tần số `[40°, 30°, 20°, 10°]` có thể được chia thành:
  - Trục Y: `[40°, 20°]` (tần số lẻ)
  - Trục X: `[30°, 10°]` (tần số chẵn)
- Được sử dụng trong vision encoder của mô hình Llama 4 và Pixtral của Mistral

## M-RoPE (Multimodal-RoPE)

### Khái niệm

- **M-RoPE**: Mã hóa vị trí tương đối đa phương thức
- Mở rộng ý tưởng từ 2D-RoPE cho dữ liệu nhiều chiều hơn
- Lần đầu được giới thiệu bởi **Qwen2VL**

### Cách hoạt động

- Thay vì chia vector thành 2 phần (như 2D-RoPE), chia thành **n phần** với `n` là số chiều trên mỗi vị trí
- Ví dụ: Chiều 3D `[time, y, x]` hoặc nhiều chiều hơn
- Mỗi phần được áp dụng RoPE độc lập tương tự như 2D-RoPE

### Cấu hình `mrope_section`

- Trong file config.json của Qwen2VL, có cấu hình `mrope_section` chứa các số
- Mỗi số đại diện cho số cặp 2D trong từng phần
- Ví dụ: `mrope_section: [16, 24, 24]` có nghĩa là:
  - Phần 1: 16 cặp 2D
  - Phần 2: 24 cặp 2D
  - Phần 3: 24 cặp 2D

## So sánh các phương pháp

| Phương pháp | Số chiều    | Ứng dụng          | Ví dụ                           |
| ----------- | ----------- | ----------------- | ------------------------------- |
| **RoPE**    | 1D          | Văn bản, ngôn ngữ | GPT, LLaMA                      |
| **2D-RoPE** | 2D          | Hình ảnh          | Llama 4 vision encoder, Pixtral |
| **M-RoPE**  | Nhiều chiều | Đa phương thức    | Qwen2VL                         |

## Kết luận

- Các phương pháp mã hóa vị trí như RoPE, 2D-RoPE và M-RoPE giúp mô hình học sâu nhận biết thông tin vị trí trong dữ liệu
- Cải thiện hiệu quả trong các tác vụ xử lý ngôn ngữ và hình ảnh
- Tiếp cận trực quan qua hình ảnh giúp hiểu rõ hơn so với các công thức toán học phức tạp

## Nguồn tham khảo

- https://blog.ngxson.com/de-hieu-den-bat-ngo-rope-2drope-mrope
