---
area: technology
domain: ai-ml
type: resource
---
# Transfer Learning

> **User prompt:** viết lại nội dung bên dưới ngắn gọn, bullet list, note vào file phù hợp

## Transfer Learning là gì?

- Tái sử dụng kiến thức đã học từ một miền (domain) hoặc tác vụ (task) trước, để phục vụ cho một miền hoặc tác vụ mới
- Giống như con người học lái xe ô tô số sàn rồi sau đó học lái xe số tự động — không cần học lại từ đầu, chỉ học phần khác biệt

## Cơ chế hoạt động

### 1. Chọn mô hình nguồn (Source Model)

- Mô hình nguồn là mô hình do người khác xây dựng, huấn luyện nhằm giải quyết một vấn đề tương tự
- Thường là mô hình của những gã khổng lồ công nghệ hoặc nhóm các nhà khoa học nổi tiếng
- Được huấn luyện trên tập dữ liệu rất lớn như: ImageNet hoặc Wikipedia Corpus
- Mô hình nguồn được chọn phải được công khai và được cho phép tái sử dụng

### 2. Tùy chỉnh mô hình (Fine-tuning)

- Sử dụng kiến thức mà mô hình đã học: lớp, tính năng, trọng số, hệ số tự do
- Tải mô hình nguồn vào môi trường của mình, biến nó trở thành một tệp/thư mục có chứa thông tin liên quan
- Ưu tiên tùy chỉnh các viện học sâu lưu trữ nhiều mô hình trước như:
  - TensorFlow Hub
  - Keras Applications
  - PyTorch Hub

### 3. Áp dụng cho tác vụ mới (Inference)

- Trong một mạng thần kinh:
  - Các lớp dưới cùng và lớp giữa: đại diện cho các tính năng chung
  - Các lớp trên cùng: thể hiện các tính năng cụ thể của bài toán trong mô hình đó
- Bài toán mới của mô hình mới sẽ khác với bài toán ban đầu từ mô hình nguồn
- Cần thêm vào các tác vụ mới, loại bỏ các lớp trên cùng để bài toán có độ chính xác cao hơn
- Có thể định cấu hình mô hình bằng trình tối ưu hóa đặc biệt

### Tại sao Transfer Learning chủ yếu tận dụng lại phần "feature extractor"?

- Các đặc trưng cơ bản như cạnh, góc, đường thẳng... là universal, có thể dùng lại cho nhiều tác vụ
- Chỉ cần thay hoặc tinh chỉnh phần head cho tác vụ mới

## Tại sao Transfer Learning hiệu quả?

- **Mạng nơ-ron học được thông tin cấp cao và khái quát** → có thể áp dụng lại ở môi trường khác
- **Huấn luyện mô hình từ đầu là tốn kém và dễ overfit nếu thiếu dữ liệu** → Khởi đầu bằng mô hình đã học tốt rồi sẽ tiết kiệm cực nhiều
- **Tăng khả năng tổng quát hóa (generalization)** → Dữ liệu mới dù ít, nhưng mô hình đã "quen học rồi"
