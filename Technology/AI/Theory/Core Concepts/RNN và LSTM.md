---
tags:
  - area/technology
  - domain/ai-ml
  - topic/deep-learning
  - type/resource
  - lang/vi
---

# RNN và LSTM

## RNN (Recurrent Neural Network) - Mạng Nơ-ron Hồi Quy

### Giới thiệu

RNN được thiết kế để xử lý dữ liệu tuần tự như văn bản, chuỗi thời gian, giọng nói bằng cách duy trì trạng thái ẩn (hidden state) để ghi nhớ thông tin trước đó.

### Kiến trúc RNN

- **Xử lý tuần tự**: RNN xử lý từng phần tử trong chuỗi theo thứ tự, sử dụng trạng thái ẩn để lưu trữ thông tin từ các bước trước
- **Cơ chế lặp**: Tại mỗi bước, trạng thái ẩn được cập nhật dựa trên đầu vào hiện tại và trạng thái ẩn trước đó
- **Tạo đầu ra**: RNN có thể tạo ra đầu ra tại mỗi bước, chẳng hạn như dự đoán từ tiếp theo trong câu

### Công thức toán học

- **Cập nhật trạng thái ẩn**: `h_t = activation(W * x_t + U * h_{t-1} + b)`
  - `h_t`: Trạng thái ẩn tại bước thời gian t
  - `x_t`: Đầu vào tại bước thời gian t
  - `W`, `U`: Ma trận trọng số
  - `b`: Bias
- **Tính toán đầu ra**: `y_t = V * h_t + c`
  - `y_t`: Đầu ra tại bước thời gian t
  - `V`: Ma trận trọng số cho đầu ra
  - `c`: Bias cho đầu ra

### Thách thức

- **Gradient biến mất (Vanishing Gradient)**: Khi xử lý chuỗi dài, gradient có xu hướng giảm dần về 0 khi lan truyền ngược, làm cho việc học các phụ thuộc dài hạn trở nên khó khăn
- **Gradient bùng nổ (Exploding Gradient)**: Trong một số trường hợp, gradient có thể tăng lên rất lớn, gây mất ổn định trong quá trình huấn luyện
- **Hạn chế ghi nhớ**: RNN gặp khó khăn trong việc ghi nhớ thông tin dài hạn do vấn đề gradient biến mất

## LSTM (Long Short-Term Memory)

### Giới thiệu

LSTM là một biến thể của RNN, được thiết kế để khắc phục vấn đề gradient biến mất, cho phép ghi nhớ thông tin dài hạn hiệu quả hơn.

### Kiến trúc LSTM

- **Trạng thái ô nhớ (Cell State)**: Lưu trữ thông tin dài hạn, có thể truyền thông tin qua nhiều bước thời gian mà không bị suy giảm
- **Trạng thái ẩn (Hidden State)**: Lưu trữ thông tin ngắn hạn, được sử dụng để tạo đầu ra

### Ba cổng chính

#### 1. Cổng quên (Forget Gate)

- **Chức năng**: Quyết định thông tin nào cần loại bỏ khỏi trạng thái ô nhớ
- **Cơ chế**: Sử dụng hàm sigmoid để tạo ra giá trị từ 0 đến 1, trong đó 0 có nghĩa là "quên hoàn toàn" và 1 có nghĩa là "giữ lại hoàn toàn"

#### 2. Cổng nhập (Input Gate)

- **Chức năng**: Quyết định thông tin nào từ đầu vào sẽ được lưu trữ vào trạng thái ô nhớ
- **Cơ chế**:
  - Sử dụng hàm sigmoid để quyết định giá trị nào sẽ được cập nhật
  - Sử dụng hàm tanh để tạo ra các giá trị mới có thể được thêm vào trạng thái ô nhớ

#### 3. Cổng xuất (Output Gate)

- **Chức năng**: Quyết định phần nào của trạng thái ô nhớ sẽ được sử dụng để tạo đầu ra
- **Cơ chế**: Sử dụng hàm sigmoid để quyết định phần nào của trạng thái ô nhớ sẽ được xuất ra, sau đó nhân với trạng thái ô nhớ đã được xử lý qua hàm tanh

### Hoạt động của LSTM

1. **Cập nhật trạng thái ô nhớ**:
   - Cổng quên quyết định thông tin nào từ trạng thái ô nhớ cũ cần loại bỏ
   - Cổng nhập quyết định thông tin mới nào sẽ được thêm vào
   - Kết hợp hai thông tin trên để cập nhật trạng thái ô nhớ mới

2. **Tạo đầu ra**:
   - Cổng xuất quyết định phần nào của trạng thái ô nhớ sẽ được sử dụng
   - Tạo ra trạng thái ẩn mới và đầu ra dựa trên quyết định của cổng xuất

### Ưu điểm so với RNN

- **Giữ gradient ổn định**: Cơ chế cổng giúp gradient có thể truyền qua nhiều bước thời gian mà không bị biến mất hoặc bùng nổ
- **Ghi nhớ thông tin dài hạn**: Trạng thái ô nhớ cho phép LSTM lưu trữ và truyền thông tin qua nhiều bước thời gian
- **Xử lý phụ thuộc dài hạn**: Hiệu quả hơn RNN trong việc xử lý các phụ thuộc dài hạn trong dữ liệu tuần tự
- **Ứng dụng rộng rãi**: Được sử dụng trong nhiều bài toán như dịch máy, nhận dạng giọng nói, phân tích cảm xúc, dự đoán chuỗi thời gian