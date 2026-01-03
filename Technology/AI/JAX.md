---
tags:
  - area/technology
  - domain/ai-ml
  - topic/machine-learning
  - type/resource
  - lang/vi
---

# JAX

## Tổng quan

- JAX là thư viện Python mã nguồn mở của Google, cho phép biến đổi các chương trình Python+NumPy
- Kết hợp autograd và XLA (Accelerated Linear Algebra) để tối ưu hóa tính toán
- Cung cấp giao diện tương tự NumPy, chạy trên CPU, GPU và TPU
- Được phát triển bởi Google với sự đóng góp từ Nvidia và cộng đồng
- Giấy phép Apache-2.0

## Tính năng chính

### Automatic Differentiation (Tự động tính đạo hàm)

- Sử dụng `jax.grad` để tính gradient hiệu quả theo chế độ reverse-mode
- Có thể tính đạo hàm đến bất kỳ bậc nào
- Hỗ trợ Python control flow (if/else, loops) trong quá trình tính đạo hàm
- Tự động đánh giá lại hàm khi cần thiết

### Just-In-Time Compilation (Biên dịch JIT)

- Sử dụng XLA để biên dịch hàm end-to-end với `jax.jit`
- Có thể dùng như decorator `@jit` hoặc higher-order function
- Tối ưu hóa hiệu suất bằng cách fusion các phép toán element-wise
- Có một số ràng buộc về Python control flow khi sử dụng JIT

### Auto-vectorization (Tự động vector hóa)

- Sử dụng `jax.vmap` để ánh xạ hàm dọc theo các trục của mảng
- Thay vì loop qua các lần gọi hàm, đẩy loop xuống các primitive operations
- Chuyển matrix-vector multiplies thành matrix-matrix multiplies để tăng hiệu suất
- Có thể kết hợp với `grad` và `jit` để tạo per-example gradients hoặc Jacobian matrices hiệu quả

## Scaling (Mở rộng quy mô)

- Hỗ trợ mở rộng tính toán trên hàng nghìn thiết bị
- Ba chế độ song song hóa:
  - **Auto**: Compiler-based automatic parallelization, lập trình như một máy toàn cục, compiler tự chọn cách shard data và partition computation
  - **Explicit**: Explicit sharding với automatic partitioning, có global view nhưng data shardings được chỉ định rõ ràng trong JAX types
  - **Manual**: Per-device programming, có per-device view và có thể giao tiếp với explicit collectives
- Hỗ trợ FSDP (Fully Sharded Data Parallel) cho parameters
- Hỗ trợ batch parallelism cho data

## Nền tảng hỗ trợ

| Nền tảng            | CPU | NVIDIA GPU   | Google TPU | AMD GPU      | Apple GPU    | Intel GPU    |
| ------------------- | --- | ------------ | ---------- | ------------ | ------------ | ------------ |
| Linux x86_64        | ✅  | ✅           | ✅         | ✅           | N/A          | Experimental |
| Linux aarch64       | ✅  | ✅           | N/A        | ❌           | N/A          | N/A          |
| Mac aarch64         | ✅  | N/A          | N/A        | N/A          | Experimental | N/A          |
| Windows x86_64      | ✅  | ❌           | N/A        | ❌           | N/A          | ❌           |
| Windows WSL2 x86_64 | ✅  | Experimental | N/A        | Experimental | N/A          | ❌           |

## Cài đặt

- CPU: `pip install -U jax`
- NVIDIA GPU: `pip install -U "jax[cuda13]"`
- Google TPU: `pip install -U "jax[tpu]"`
- AMD GPU (Linux): Theo hướng dẫn của AMD
- Mac GPU: Theo hướng dẫn của Apple
- Intel GPU: Theo hướng dẫn của Intel

## Lưu ý

- JAX là dự án nghiên cứu, không phải sản phẩm chính thức của Google
- Có một số "gotchas" và "sharp bits" cần lưu ý khi sử dụng (xem Gotchas Notebook)
- Có thể tích hợp với các framework hiện có như TensorFlow và PyTorch

## Tài liệu tham khảo

- Website: https://docs.jax.dev
- GitHub: https://github.com/jax-ml/jax
- Reference documentation: https://jax.readthedocs.io
- Developer documentation: https://jax.readthedocs.io/en/latest/developer.html
