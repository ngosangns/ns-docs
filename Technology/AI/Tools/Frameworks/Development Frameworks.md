---
area: technology
domain: ai-ml
topic: machine-learning
type: resource
title: Development Frameworks
description: JAX
timestamp: '2026-06-19T13:43:26.162Z'
tags:
  - technology
  - ai-ml
  - machine-learning
resource: https://docs.jax.dev
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

# LLM Frameworks

- OpenCopilot: https://github.com/openchatai/OpenCopilot #OpenCopilot
- https://aistudio.google.com #GoogleAI
- CoreNet: A library for training deep neural networks: https://github.com/apple/corenet #CoreNet
- Triton language - a language and compiler for writing highly efficient custom Deep-Learning primitives: https://github.com/triton-lang/triton #Triton
- **Flax**: Thư viện mạng nơ-ron cho JAX, được thiết kế để linh hoạt. Flax NNX là API mới được phát hành vào 2024, đơn giản hóa việc tạo, kiểm tra, debug và phân tích neural networks trong JAX bằng cách thêm hỗ trợ first-class cho Python reference semantics - [GitHub](https://github.com/google/flax) #JAX #neuralNetwork #framework
- **LLM-App**: Framework mã nguồn mở để phát triển các ứng dụng sử dụng mô hình ngôn ngữ lớn, cung cấp các công cụ và giao diện để tích hợp LLM vào các ứng dụng thực tế - [GitHub](https://github.com/pathwaycom/llm-app) #LLM #framework #application
- **FastRTC**: Nền tảng mã nguồn mở cho phép xây dựng các ứng dụng giao tiếp thời gian thực, hỗ trợ âm thanh, video và tích hợp với các mô hình ngôn ngữ lớn (LLM) - [GitHub](https://github.com/gradio-app/fastrtc) #realtime #communication #LLM
- [MLX Server – API tương thích OpenAI](https://github.com/cubist38/mlx-server-OAI-compat)
  - Máy chủ API hiệu suất cao cho mô hình MLX, tương thích với OpenAI.
  - Phát triển bằng Python và FastAPI, hỗ trợ chạy mô hình ngôn ngữ và thị giác trên MacOS M-series. #MLX #API #OpenAI
- [LangSmith – Giám sát và Đánh giá Ứng dụng AI](https://www.langchain.com/langsmith)
  - Nền tảng giúp debug, test và giám sát hiệu suất ứng dụng AI.
  - Hỗ trợ tracing, đánh giá với LLM-as-Judge, thu thập phản hồi từ người dùng.
  - Không yêu cầu sử dụng LangChain; hỗ trợ Python, TypeScript và OpenTelemetry. #LangSmith #debug #test
- [LiteLLM – Giao diện Thống nhất cho 100+ Mô hình LLM](https://docs.litellm.ai/docs/)
  - Cho phép gọi hơn 100 mô hình LLM với định dạng OpenAI.
  - Hỗ trợ retry, fallback, theo dõi chi phí và thiết lập ngân sách theo dự án.
  - Cung cấp Proxy Server và Python SDK để tích hợp linh hoạt. #LiteLLM #API #LLM
- [OpenUI – Thiết kế Giao diện Người Dùng bằng Trí Tưởng Tượng](https://github.com/wandb/openui?tab=readme-ov-file)
  - Công cụ cho phép mô tả UI bằng ngôn ngữ tự nhiên và xem kết quả trực tiếp.
  - Hỗ trợ chuyển đổi HTML sang React, Svelte, Web Components, v.v.
  - Phù hợp cho việc thử nghiệm và tạo nguyên mẫu ứng dụng sử dụng LLM. #OpenUI #UI #design
- **Gemini Fullstack LangGraph Quickstart**: Dự án mẫu của Google, hướng dẫn cách xây dựng ứng dụng full-stack sử dụng LangGraph và Gemini AI - [GitHub](https://github.com/google-gemini/gemini-fullstack-langgraph-quickstart) #LangGraph #Gemini #fullstack
- **LangGraph** – Xây dựng Ứng dụng LLM Stateful với Đồ thị:
  - Một thư viện được xây dựng dựa trên LangChain, chuyên dùng để tạo các ứng dụng LLM có trạng thái (stateful) và nhiều tác nhân (multi-actor).
  - Cho phép định nghĩa luồng xử lý (workflow) dưới dạng đồ thị (graph), nơi các "node" có thể là LLM call, tool use, hoặc bất kỳ logic tùy chỉnh nào.
  - Hỗ trợ quản lý trạng thái giữa các bước trong luồng, giúp xây dựng các tác nhân (agents) phức tạp có khả năng ra quyết định và lặp lại.
  - Lý tưởng cho các ứng dụng cần chuỗi hành động phức tạp, ra quyết định dựa trên kết quả trước đó, hoặc phối hợp nhiều mô hình/công cụ.
  - Khái niệm cốt lõi là định nghĩa tính toán dưới dạng đồ thị:
    - Các node: Đại diện cho các bước xử lý (gọi LLM, sử dụng công cụ, logic tùy chỉnh).
    - Các cạnh (edges): Định nghĩa chuyển đổi giữa các node. Có thể là chuyển đổi cố định hoặc có điều kiện.
  - Trạng thái (state) được truyền qua lại giữa các node và có thể thay đổi (mutable).
  - Hỗ trợ các chu trình (cycles) trong đồ thị, rất quan trọng cho hành vi của tác nhân (lập kế hoạch, hành động, quan sát, lặp lại).
  - Các thành phần chính:
    - `StateGraph`: Định nghĩa cấu trúc trạng thái, các node và cạnh.
    - Nodes: Các hàm hoặc runnables thực hiện thao tác trên trạng thái.
    - Edges: Định nghĩa cách chuyển từ node này sang node khác.
    - State: Mô hình dữ liệu (thường là Pydantic) lưu trữ thông tin.
  - Trường hợp sử dụng phổ biến:
    - Xây dựng các tác nhân (agents) phức tạp.
    - Hệ thống nhiều tác nhân phối hợp.
    - Các luồng xử lý phức tạp cần quản lý trạng thái.
    - Chatbot có bộ nhớ và khả năng ra quyết định.
  - Ưu điểm:
    - Quản lý trạng thái rõ ràng, tường minh.
    - Trực quan hóa luồng xử lý dễ dàng.
    - Xử lý được luồng điều khiển phức tạp (vòng lặp, phân nhánh).
    - Tận dụng hệ sinh thái LangChain.
  - Tài liệu:
    - https://viblo.asia/s/hanh-trinh-kham-pha-langgraph-muon-hero-ban-phai-bat-dau-tu-zero-vlZL9lMdJQK
  - #LangGraph #LLM #framework
- llmware: Framework kết nối tri thức doanh nghiệp với LLM. https://github.com/llmware-ai/llmware
- Composio: Cung cấp hơn 100 integration cho AI agents. https://github.com/ComposioHQ/composio
- [openai/gym: A toolkit for developing and comparing reinforcement learning algorithms.](https://github.com/openai/gym)
- Prompt & flow optimizing: [SylphAI-Inc/AdalFlow: AdalFlow: The library to build & auto-optimize LLM applications.](https://github.com/SylphAI-Inc/AdalFlow)
- [Auto-Claude: Autonomous multi-session AI coding framework](https://github.com/AndyMik90/Auto-Claude)
  - Framework tự động hóa việc lập trình với AI, cho phép các agent tự động lập kế hoạch, xây dựng và xác thực phần mềm.
  - Hỗ trợ thực thi song song với nhiều agent, làm việc trong isolated workspaces (git worktrees), và có hệ thống QA tự động.
  - Cung cấp desktop app cho Windows, macOS, và Linux. #AutoClaude #agent #coding
- [valtec-tts: Text-to-Speech tool](https://github.com/tronghieuit/valtec-tts) #TTS #text2speech
- [LTEngine: Local AI Machine Translation](https://github.com/LibreTranslate/LTEngine)
  - API dịch máy cục bộ mã nguồn mở, được viết bằng Rust, hoàn toàn tự lưu trữ và tương thích với LibreTranslate.
  - Khả năng dịch được cung cấp bởi các mô hình ngôn ngữ lớn (LLMs) chạy cục bộ thông qua llama.cpp. #translation #LLM #local
- [MiroThinker](https://github.com/MiroMindAI/MiroThinker): AI thinking and reasoning framework. #AI #reasoning
- [valuecell](https://github.com/ValueCell-ai/valuecell): AI-powered value and data processing tool. #AI #dataProcessing

## Data extractor

- [google/langextract: A Python library for extracting structured information from unstructured text using LLMs with precise source grounding and interactive visualization.](https://github.com/google/langextract)
- **Crawl4AI**: Công cụ thu thập dữ liệu web mã nguồn mở, thân thiện với LLM, giúp trích xuất dữ liệu từ các trang web một cách hiệu quả. Hỗ trợ nhiều định dạng đầu ra như JSON, HTML sạch và Markdown, cũng như các chiến lược phân đoạn và trích xuất nội dung khác nhau. Hữu ích cho việc xây dựng hệ thống RAG và các pipeline dữ liệu - [GitHub](https://github.com/unclecode/crawl4ai) #webCrawling #dataExtraction #RAG

## Caching

- [LMCache/LMCache: Supercharge Your LLM with the Fastest KV Cache Layer](https://github.com/LMCache/LMCache)
- [GibsonAI/memori: Open-Source Memory Engine for LLMs, AI Agents & Multi-Agent Systems](https://github.com/GibsonAI/memori)