---
tags:
  - area/technology
  - domain/ai-ml
  - topic/mlops
  - type/resource
  - lang/vi
---

# MLOps

## CI/CD truyền thống vs MLOps

### CI/CD truyền thống

- Git PR merge → trigger pipeline CI/CD → build → deploy code
- Phù hợp với app development: source code thay đổi thường xuyên
- Git version control quản lý source code

### MLOps - Vấn đề với CI/CD truyền thống

- Code training chủ yếu thay đổi trong giai đoạn experiments (SageMaker notebook, GPU instance)
- Sau khi code chạy ổn định → ít khi thay đổi
- PR code merge như deploy app thông thường không còn phù hợp
- **Thay đổi nhiều nhất là data train** → cần Data Version Control (DVC)

## Data Version Control (DVC)

- **DVC**: Quản lý data versioning như quản lý code
- Thay vì push code → push data → auto trigger MLOps pipeline → train và deploy model
- Website: https://dvc.org/

## MLOps Pipeline - Workflow cơ bản

1. **Download/collect data**
2. **Preprocess/clean/EDA data**
3. **Train the model**
4. **Validate the model**
5. **Run inference and visualize results**

### Trước khi có DVC

- Chạy script thủ công, bất tiện

### Sau khi có DVC

- Đóng gói tất cả steps vào DVC pipeline
- Tạo luồng MLOps full flow tự động

## Use Cases

### Xử lý ảnh y tế

- Phân tích hình ảnh X-Quang:
  - Kiểm tra răng sâu
  - X-Quang lồng ngực để nhận biết dấu hiệu ung thư
- Có nguồn data từ phòng khám, cơ sở y tế
- Build AI model chuyên dụng thay vì dùng pretrained model (không có sẵn)

## Feature Store

- [[ML Feature Store - DoorDash Redis Optimization]]: Case study về xây dựng và tối ưu hóa ML Feature Store quy mô lớn với Redis tại DoorDash, bao gồm benchmarking key-value stores, tối ưu hóa Redis Hashes, string hashing, binary serialization và compression để giảm chi phí 3x và latency 38% #feature-store #redis #optimization

## Model Serving - Performance & Debugging

### Queuing Theory trong Model Serving

- Xem: [[Queuing Theory trong Model Serving]]
- Vấn đề: p99 latency ở replay system khác biệt so với production
- Nguyên nhân: Traffic pattern (fixed intervals vs Poisson distribution)
- Bài học: Cần mô phỏng đúng traffic pattern khi benchmark/replay

## Training Model Tracking & Monitoring

### Tầm quan trọng của tracking

- Theo dõi quá trình train model là phần quan trọng trong phát triển ML
- Giúp hiểu mô hình đang học như thế nào
- Kiểm soát các tham số, so sánh các lần huấn luyện
- Tái sử dụng mô hình sau này
- Hỗ trợ debug khi có vấn đề

### Các thông tin cần track

- **Hyperparameters**: learning rate, batch size, epochs, class weights, segmentation weight, offset weight
- **Metrics theo epoch**: loss, accuracy (train và validation)
- **Lưu trữ mô hình**: lưu các checkpoint và model tốt nhất
- **So sánh experiments**: tìm cấu hình tốt nhất

### Khái niệm cơ bản

#### Epoch

- **Định nghĩa**: Khi mô hình đã nhìn thấy toàn bộ dataset một lần
- **Ví dụ**: Dataset 10.000 ảnh → 1 epoch = scan xong toàn bộ 10.000 ảnh
- **Batch và iteration**:
  - Dataset: 10.000 ảnh
  - Batch size: 100 (lấy 1 cục 100 ảnh)
  - Sẽ có 10.000 / 100 = 100 iterations / 1 epoch

#### Learning Rate

- **Ví dụ non-tech**: Giống như tập leo núi
  - Trèo từ từ, từng bước một → chắc chắn nhưng lâu
  - Trèo nhanh, bước dài → nhanh nhưng dễ sẩy chân
- **Mục đích**: Điều chỉnh các trọng số (weights) để đạt kết quả tối ưu
- **Ví dụ về tham số**: Giống như chỉnh đài Radio, dò kênh/tần số cho đến khi nghe rõ
- LLM có đến cả tỉ tham số → cần experiment và track liên tục

#### Loss và Accuracy

- **Train Loss**: Đo lường mức độ "sai" của mô hình
  - Lúc mới học: `train_loss = 5.0` (làm sai nhiều)
  - Học dần: `train_loss = 0.5` (giảm dần)
  - Mục tiêu: loss càng thấp càng tốt
- **Train Accuracy**: Tỉ lệ làm đúng, ngược lại của loss
  - Làm đúng nhiều → accuracy cao
  - Mục đích của train AI là tăng accuracy

### Công cụ tracking phổ biến

#### Wandb (Weight & Biases)

- **Đánh giá**: Chất lượng uy tín nhất trong 3 công cụ
- **Loại**: SaaS (commercial)
- **Cách dùng**: Đăng ký account, make payment, tạo project
- **Tích hợp code**:
  - Khởi tạo project với `wandb.init()` và config hyperparameters
  - Log metrics với `wandb.log()` theo từng epoch
- **Lợi ích**: Tracking thông số giúp điều chỉnh phương pháp training cho đúng

#### TensorBoard

- Lựa chọn low cost
- Công cụ visualization của TensorFlow

#### MLFlow

- **Loại**: Self-host solution
- **Đặc điểm**: Đội dự án tự build MLFlow tracker server để collect dữ liệu training
- **Tích hợp**: Có thể tích hợp với SageMaker
- **Lợi ích**: Kiểm soát hoàn toàn infrastructure tracking

## LLM Serving & Production Deployment

### LMCache

- **LMCache**: Thư viện mã nguồn mở để tăng cường hiệu suất suy luận của các mô hình ngôn ngữ lớn (LLM) bằng cách cung cấp một lớp bộ nhớ đệm khóa-giá trị (KV cache) nhanh chóng
  - **GitHub**: https://github.com/LMCache/LMCache
  - **Mục đích**: Tối ưu hóa hiệu suất inference của LLM thông qua KV cache
  - **Tính năng:**
    - Lưu trữ và tái sử dụng các bộ nhớ đệm KV của các văn bản tái sử dụng
    - Giảm thời gian phản hồi và tăng thông lượng
    - Đặc biệt hiệu quả trong các kịch bản có ngữ cảnh dài
    - Tích hợp với vLLM
    - Hỗ trợ nhiều phương pháp lưu trữ:
      - CPU memory
      - Disk storage
      - NIXL (Non-Volatile Memory Express Interface Library)
    - Hỗ trợ lưu trữ đa cấp: GPU, RAM, và đĩa cục bộ
  - **Use cases:**
    - Tối ưu hóa inference cho LLM với context dài
    - Giảm latency và tăng throughput trong production
    - Tái sử dụng KV cache cho các prompt tương tự
    - Tích hợp vào pipeline vLLM

### vLLM Production Stack

- **vLLM Production Stack**: Hệ thống tham chiếu cho việc triển khai vLLM trong môi trường Kubernetes (K8S) với tối ưu hóa hiệu suất do cộng đồng đóng góp
  - **GitHub**: https://github.com/vllm-project/production-stack
  - **Mục đích**: Cung cấp production-ready deployment stack cho vLLM trên Kubernetes
  - **Tính năng:**
    - **Scalability**: Cho phép mở rộng từ một phiên bản vLLM đơn lẻ đến triển khai phân tán mà không cần thay đổi mã ứng dụng
    - **Monitoring**: Cung cấp khả năng giám sát thông qua bảng điều khiển web
    - **Performance optimization**:
      - Tận dụng lợi ích hiệu suất từ việc định tuyến yêu cầu (request routing)
      - Offloading bộ nhớ đệm KV (KV cache offloading)
    - **Cloud support**: Cung cấp các hướng dẫn triển khai chi tiết trên các nền tảng đám mây chính:
      - AWS
      - GCP (Google Cloud Platform)
      - Azure
  - **Kiến trúc:**
    - Kubernetes-native deployment
    - Tích hợp với vLLM inference engine
    - Hỗ trợ distributed inference
    - Production-grade monitoring và observability
  - **Use cases:**
    - Triển khai vLLM ở quy mô production
    - Scaling LLM inference trên Kubernetes
    - Tối ưu hóa hiệu suất và chi phí cho LLM serving
    - Multi-cloud deployment
