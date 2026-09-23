---
area: technology
domain: ai-ml
type: resource
title: Agent Frameworks
description: Agent Frameworks
timestamp: "2026-06-19T13:43:26.162Z"
tags:
  - technology
  - ai-ml
resource: https://github.com/exo-explore/exo
---

# Agent Frameworks

## AI Infrastructure

- **Exo**: Cho phép bạn chạy cụm AI của riêng mình tại nhà bằng các thiết bị hàng ngày - [GitHub](https://github.com/exo-explore/exo) #AI-cluster #infrastructure
- **YEScale**: Cung cấp hạ tầng cho các mô hình ngôn ngữ lớn (LLM) trong doanh nghiệp, giúp triển khai và quản lý các mô hình AI một cách hiệu quả
  - Hạ tầng LLM chuyên nghiệp cho doanh nghiệp
  - Hỗ trợ triển khai và quản lý các mô hình ngôn ngữ lớn
  - Website: https://yescale.io/ #LLM #infrastructure #enterprise
- **nanoGPT**: Kho lưu trữ đơn giản và nhanh nhất để huấn luyện/tinh chỉnh các mô hình GPT cỡ trung bình - [GitHub](https://github.com/karpathy/nanoGPT) #GPT #training
- **nanochat**: Phiên bản ChatGPT tốt nhất mà $100 có thể mua được - [GitHub](https://github.com/karpathy/nanochat) #LLM #chatbot
- **LLaMA-Factory**: Nền tảng hợp nhất cho việc tinh chỉnh hiệu quả hơn 100 mô hình ngôn ngữ lớn (LLMs) và mô hình thị giác-ngôn ngữ (VLMs)
  - Hỗ trợ nhiều phương pháp fine-tuning: LoRA, QLoRA, full fine-tuning
  - Tích hợp với các framework phổ biến như PEFT, TRL
  - Hỗ trợ RLHF (Reinforcement Learning from Human Feedback)
  - Giao diện web và CLI để quản lý quá trình training
  - Tài liệu chi tiết và cộng đồng hỗ trợ tích cực
  - [GitHub](https://github.com/hiyouga/LLaMA-Factory) #fine-tuning #LLM #training #LoRA
  - [Tài liệu](https://llamafactory.readthedocs.io)
- **Jan-Nano**: Mô hình ngôn ngữ 4 tỷ tham số được thiết kế cho các nhiệm vụ nghiên cứu sâu, tối ưu hóa để tích hợp với các máy chủ Model Context Protocol (MCP)
  - **Kích thước**: 4B parameters
  - **Base model**: Qwen/Qwen3-4B-Base
  - **Đặc điểm**: Non-thinking model, tối ưu cho deep research tasks
  - **Tích hợp MCP**: Được tối ưu hóa để làm việc với MCP servers, cho phép tích hợp hiệu quả với các công cụ nghiên cứu và nguồn dữ liệu
  - **Đánh giá**: Được đánh giá trên SimpleQA benchmark sử dụng phương pháp benchmark dựa trên MCP
  - **Chạy local**: Hỗ trợ VLLM với các tham số sampling được đề xuất (Temperature: 0.7, Top-p: 0.8, Top-k: 20, Min-p: 0)
  - **Hỗ trợ**: Jan app (open-source ChatGPT alternative) chạy hoàn toàn trên máy tính cá nhân
  - [HuggingFace](https://huggingface.co/Menlo/Jan-nano) | [GitHub](https://github.com/menloresearch/jan-nano) #LLM #research #MCP #4B #agentic
- **AdalFlow**: Nền tảng mã nguồn mở cho phép xây dựng và triển khai các ứng dụng trí tuệ nhân tạo một cách dễ dàng và hiệu quả - [GitHub](https://github.com/SylphAI-Inc/AdalFlow) #AI-workflow #platform
- **lance-format/lance**: Định dạng dữ liệu mã nguồn mở được thiết kế cho hiệu suất cao trong các ứng dụng máy học và phân tích dữ liệu - [GitHub](https://github.com/lance-format/lance) #data-format #ML
- **Deploying-AI-IoT-Applications**: Tài liệu và hướng dẫn triển khai ứng dụng AI và IoT - [GitHub](https://github.com/FIT-DNU/Deploying-AI-IoT-Applications) #AI #IoT #deployment
- **Deer Flow**: Khung nghiên cứu sâu dựa trên cộng đồng, kết hợp các mô hình ngôn ngữ lớn (LLM) với các công cụ chuyên biệt như tìm kiếm web, thu thập dữ liệu và thực thi Python. Mục tiêu là cung cấp một quy trình nghiên cứu hiệu quả và tự động hóa - [GitHub](https://github.com/bytedance/deer-flow) #research #LLM #workflow #ByteDance
- **DeerFlow**: Trợ lý nghiên cứu cá nhân, cung cấp các công cụ như tìm kiếm web, trình thu thập dữ liệu web, dịch vụ Python và MCP để cung cấp thông tin tức thời, báo cáo toàn diện và podcast hấp dẫn - [Website](https://deerflow.tech/) #research-assistant #MCP #tools

## Conversational AI

- **Storm**: Nền tảng mã nguồn mở cho phép phát triển và triển khai các ứng dụng hội thoại thông minh, hỗ trợ nhiều ngôn ngữ và tích hợp với các dịch vụ AI khác nhau - [GitHub](https://github.com/stanford-oval/storm) #conversationalAI #chatbot

## AI Infrastructure & Data Platforms

- **Hash.ai**: Nền tảng tích hợp dữ liệu, cải thiện quyết định và tối ưu hóa quy trình với AI
  - Cách tiếp cận ưu tiên quản trị (governance-first), phù hợp cho các ứng dụng AI quan trọng về an toàn và độ tin cậy cao
  - Mã nguồn mở, được sử dụng bởi các doanh nghiệp có doanh thu hàng tỷ đô la mỗi năm
  - Tính năng chính:
    - **HASH Web**: Tạo "web" HASH để tích hợp thông tin từ nhiều nguồn (ứng dụng, tệp, email, cảm biến vật lý, cơ sở dữ liệu, web), tự động cập nhật, làm sạch và cấu trúc dữ liệu, đồ thị tri thức tự duy trì
    - **Tối ưu hóa và Tự động hóa Quy trình**: Lập bản đồ quy trình, cải thiện quyết định, sử dụng AI agents để tự động hóa
    - **Knowledge Graph cho AI**: Cung cấp ngữ cảnh đầy đủ cho AI, đảm bảo quyền truy cập dữ liệu an toàn và có kiểm soát
  - Đặc điểm kỹ thuật: Bảo mật enterprise-grade, quyền hạn chi tiết, mã nguồn mở, hỗ trợ nhiều người dùng, lịch sử vô hạn, đảm bảo nguồn gốc (provenance), đồng bộ hai chiều, dữ liệu thời gian thực
  - Use Cases: Dự báo nhu cầu, dự báo và ngăn ngừa hết hàng, ứng dụng AI yêu cầu độ an toàn cao, tích hợp dữ liệu từ nhiều nguồn, tối ưu hóa quy trình kinh doanh
  - Website: https://hash.ai/ #AI-platform #data-integration #knowledge-graph #governance

## Education AI

- **DeepTutor**: Trợ lý học tập cá nhân hóa được hỗ trợ bởi AI, nhằm cung cấp trải nghiệm học tập tùy chỉnh cho người dùng
  - Sử dụng các thuật toán học sâu để phân tích nhu cầu học tập và cung cấp nội dung phù hợp
  - Phân tích tiến trình học tập của người dùng
  - Đề xuất tài liệu và bài tập phù hợp
  - Giao diện thân thiện và dễ sử dụng
  - [GitHub](https://github.com/HKUDS/DeepTutor) #education #tutoring #personalized-learning #AI
  - [Website](https://hkuds.github.io/DeepTutor)

## computer-vision

- **Deep-Live-Cam**: Ứng dụng camera trực tiếp sử dụng công nghệ học sâu để cải thiện chất lượng hình ảnh và cung cấp các tính năng nâng cao - [GitHub](https://github.com/hacksider/Deep-Live-Cam) #computerVision #deepLearning #liveCamera
- [Pose Estimation](/Technology/AI/Practices/Pose Estimation): Bài toán ước lượng tư thế trong computer-vision, nhận diện vị trí các khớp và bộ phận cơ thể. Hai giải pháp phổ biến: YOLO-Pose (Ultralytics) và MediaPipe Pose (Google) #poseEstimation #computerVision

## Machine Learning Libraries

- **FlashMLA**: Thư viện học máy nhẹ, được thiết kế để triển khai nhanh chóng và hiệu quả các mô hình học máy trong các ứng dụng thực tế - [GitHub](https://github.com/deepseek-ai/FlashMLA) #ML #library #lightweight

## AI Edge Computing

- **Google AI Edge Gallery**: Bộ sưu tập các mô hình và ứng dụng AI được tối ưu hóa cho các thiết bị biên, giúp triển khai AI trên các thiết bị có tài nguyên hạn chế - [GitHub](https://github.com/google-ai-edge/gallery) #AI #edge #gallery

## Finance AI

- **FinGPT**: Nền tảng GPT mã nguồn mở cho lĩnh vực tài chính, cung cấp các mô hình ngôn ngữ lớn (LLM) chuyên biệt cho tài chính - [GitHub](https://github.com/AI4Finance-Foundation/FinGPT) #finance #LLM #GPT #open-source
