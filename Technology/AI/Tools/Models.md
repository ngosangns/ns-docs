--- 
tags:
  - area/technology
  - domain/ai-ml
  - topic/llm
  - topic/rag
  - type/resource
  - type/guide
  - lang/vi
---

# Models

## LLM Products & Models

- **BLT (Byte Latent Transformer)**: Kiến trúc LLM mới ở cấp byte, mã hóa bytes thành các patches có kích thước động, lần đầu tiên đạt hiệu suất tương đương với LLM dựa trên tokenization ở quy mô lớn - https://github.com/facebookresearch/blt #LLM #byte-level #transformer
- https://llama.meta.com #LLaMA
- https://huggingface.co/vilm #VILM
- https://github.com/mistralai/mistral-src #Mistral
- https://huggingface.co/bkai-foundation-models/vietnamese-llama2-7b-120GB #Vietnamese #LLaMA2
- PrivateGPT - Đọc và trả lời dữ liệu từ document với sức mạnh của GPT: https://github.com/imartinez/privateGPT #PrivateGPT
- https://github.com/nomic-ai/gpt4all #GPT4All
- **Dify**: Nền tảng mã nguồn mở giúp xây dựng các ứng dụng AI một cách nhanh chóng và dễ dàng, cung cấp giao diện người dùng trực quan và các công cụ quản lý dữ liệu hiệu quả - [GitHub](https://github.com/langgenius/dify) #Dify #LLM #platform
- **Khoj**: Trợ lý AI cá nhân mã nguồn mở, giúp tìm kiếm và truy xuất thông tin từ các tài liệu cá nhân, hỗ trợ nhiều định dạng và tích hợp với các công cụ khác nhau - [GitHub](https://github.com/khoj-ai/khoj) #AI #assistant #personal #search
- https://ollama.com/seallms/seallm-7b-v2 #SeaLLM
- https://huggingface.co/Viet-Mistral #VietMistral
- FinGPT - LLM models cho domain tài chính: https://github.com/AI4Finance-Foundation/FinGPT #FinGPT #finance
- **Qlib**: Nền tảng đầu tư định lượng hướng AI của Microsoft, sử dụng công nghệ AI để hỗ trợ nghiên cứu định lượng từ khám phá ý tưởng đến triển khai sản phẩm. Hỗ trợ các mô hình học máy đa dạng: supervised learning, market dynamics modeling, và reinforcement learning. Tích hợp RD-Agent để tự động hóa quy trình R&D - [GitHub](https://github.com/microsoft/qlib) #quantInvestment #finance #AI #ML
- https://github.com/duydvu/gpt-j-6B-vietnamese-news-api #GPT-J #Vietnamese
- SEO/Content:
  - WordAI - Công cụ viết nội dung tự động, WordAI sử dụng công nghệ Spinning AI để tạo ra nội dung có độ chính xác cao từ các nguồn dữ liệu có sẵn: https://wordai.com #SEO #content
  - BuzzSumo - Công cụ nghiên cứu nội dung, BuzzSumo sử dụng AI để tìm kiếm và phân tích các nội dung phổ biến trên mạng xã hội và Internet: https://buzzsumo.com #SEO #content
  - ContentBot: Công cụ tạo nội dung tự động, ContentBot sử dụng AI để tạo ra nội dung theo yêu cầu từ nguồn dữ liệu có sẵn. #SEO #content
  - Quill: Công cụ viết nội dung tự động, Quill sử dụng AI để tạo ra nội dung tự động dựa trên dữ liệu có sẵn. #SEO #content
  - Acrolinx: Công cụ kiểm tra và tối ưu nội dung, Acrolinx sử dụng AI để đảm bảo sự nhất quán và chất lượng của nội dung trên nhiều nền tảng và kênh truyền thông. #SEO #content

### Self-hosted
- [assafelovic/gpt-researcher: LLM based autonomous agent that conducts deep local and web research on any topic and generates a long report with citations.](https://github.com/assafelovic/gpt-researcher) [[Microservices]]

### API
- https://together.ai #API
- Ollama - Hỗ trợ cài đặt các LLM model và cung cấp API tương tác #API

### GUI
- NextChat: https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web #GUI
- https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web #GUI
- https://jan.ai #GUI
- GUI cho việc download và chạy các model LLM: https://lmstudio.ai #GUI
- Tạo giao diện chat cho các AI models: https://github.com/huggingface/chat-ui #GUI
- **Lobe Chat**: Khung làm việc mã nguồn mở cho ứng dụng chat AI với thiết kế hiện đại, hỗ trợ nhiều nhà cung cấp AI (OpenAI, Claude 3, Gemini, Ollama, Azure, DeepSeek), quản lý kiến thức, đa phương thức (Vision/TTS) và hệ thống plugin - [GitHub](https://github.com/lobehub/lobe-chat) #GUI #chat #LLM

---

## Diffusion Language Models

### Tổng quan về Diffusion Language Models
Diffusion Language Models (DLMs) là một kiến trúc thay thế cho Autoregressive (AR) models trong text generation. Khác với AR models tạo text tuần tự từ trái sang phải, discrete diffusion models tinh chỉnh toàn bộ sequence song song từ trạng thái nhiễu ban đầu.

**Ưu điểm của Diffusion so với AR:**
- **Bidirectional contextual modeling**: Tích hợp thông tin từ cả hai hướng, tăng coherence toàn cục
- **Flexible controllable generation**: Khả năng kiểm soát linh hoạt thông qua quá trình tinh chỉnh lặp lại
- **Potential for sampling acceleration**: Khả năng tăng tốc sampling thông qua kiến trúc và training objectives mới

**Ứng dụng tiềm năng:**
- Embodied AI
- Autonomous agents
- Long-horizon decision-making systems
- Các bài toán cần reasoning và contextual understanding kéo dài

### Dream 7B
**Dream 7B** (Diffusion reasoning model) là diffusion language model mạnh nhất hiện tại, được phát triển bởi HKU NLP Group và Huawei Noah's Ark Lab.

**Đặc điểm nổi bật:**
- Vượt trội so với các diffusion language models hiện có
- Tương đương hoặc vượt các AR models cùng kích thước (Qwen2.5 7B, LLaMA3 8B) trên các tác vụ general, math, và coding
- Thể hiện khả năng planning mạnh mẽ và inference flexibility nhờ diffusion modeling

**Kiến trúc và Training:**
- Sử dụng mask diffusion paradigm
- Pretraining trên 580 tỷ tokens từ Dolma v1.7, OpenCoder, và DCLM-Baseline
- Pretraining trên 96 NVIDIA H800 GPUs trong 256 giờ
- Khởi tạo weights từ Qwen2.5 7B (AR initialization)
- Context-adaptive token-level noise rescheduling mechanism

**Kỹ thuật Training chính:**
1. **AR Initialization**: Sử dụng weights từ AR model (Qwen2.5 7B) làm initialization, giúp tăng tốc training và giảm tokens/computation cần thiết
2. **Context-adaptive Token-level Noise Rescheduling**: 
   - Động lực: Mỗi token phụ thuộc vào context, nhưng noise level trong discrete diffusion không nhất quán với timestep t
   - Giải pháp: Động lực reassign noise level cho mỗi token dựa trên corrupted context sau khi inject noise
   - Lợi ích: Cung cấp guidance chính xác hơn cho quá trình học của từng token

**Khả năng Planning:**
- Vượt trội trên các tác vụ Countdown và Sudoku so với các models cùng kích thước
- Đôi khi vượt cả DeepSeek V3 671B mặc dù nhỏ hơn nhiều về parameters
- Hiệu quả hơn trong việc giải quyết các bài toán có nhiều constraints hoặc mục tiêu cụ thể

**Inference Flexibility:**
1. **Arbitrary Order Generation**: 
   - Không bị ràng buộc bởi sequential generation
   - Hỗ trợ completion, infilling với exact ending sentence
   - Có thể điều chỉnh decoding behavior từ left-to-right (giống AR) đến fully random order
2. **Quality-speed Trade-off**: 
   - Có thể điều chỉnh số tokens generated per step (diffusion steps)
   - Ít steps → nhanh hơn nhưng chất lượng thô hơn
   - Nhiều steps → chất lượng cao hơn nhưng tốn computation hơn
   - Đây là lợi thế độc đáo so với AR frameworks

**Models:**
- Base model: [Dream-org/Dream-v0-Base-7B](https://huggingface.co/Dream-org/Dream-v0-Base-7B)
- SFT model: [Dream-org/Dream-v0-Instruct-7B](https://huggingface.co/Dream-v0-Instruct-7B)
- Codebase: [GitHub](https://github.com/hkunlp/dream)

**Supervised Fine-tuning:**
- Dataset: 1.8M pairs từ Tulu 3 và SmolLM2
- Fine-tuning: 3 epochs
- Kết quả: Tiềm năng tương đương với autoregressive models

---

## RAG Embedding Models

### Mục tiêu của Embedding trong RAG
- Biểu diễn văn bản (câu, đoạn) thành vector trong không gian nhiều chiều
- Đảm bảo các đoạn có ngữ nghĩa tương tự nhau nằm gần nhau trong không gian embedding
- Dùng để truy xuất bằng vector search (FAISS, Milvus, Weaviate, v.v.)
- **Quan trọng**: Nếu truy xuất không tốt, dù LLM mạnh đến đâu cũng không thể sinh ra câu trả lời chất lượng

### So sánh các loại Embedding phổ biến

#### OpenAI Embedding (text-embedding-3-small, text-embedding-3-large)
- **Ưu điểm**: Rất mạnh, huấn luyện trên tập dữ liệu cực lớn; Tối ưu cho truy vấn ngôn ngữ tự nhiên
- **Nhược điểm**: Cần gọi API, tính phí; Không host được local
- **Dùng khi**: Muốn độ chính xác cao; Không giới hạn tài nguyên; Dùng kèm GPT-4

#### Cohere Embedding (embed-english-v3.0, embed-multilingual-v3.0)
- **Ưu điểm**: Hiệu suất rất tốt; Hỗ trợ đa ngôn ngữ; API dễ dùng
- **Nhược điểm**: Vẫn cần gọi API; Phí rẻ hơn OpenAI nhưng vẫn tính tiền
- **Dùng khi**: Cần làm RAG đa ngôn ngữ (Việt - Anh - Nhật...); Kết hợp với LLM nhỏ

#### BAAI/BGE (BGE-small, BGE-base, BGE-large)
- **Ưu điểm**: Miễn phí; Mạnh, có bản multilingual (bge-m3); Được cộng đồng ủng hộ rộng rãi
- **Nhược điểm**: Cần GPU để host local; Có thể cần fine-tune cho domain-specific
- **Dùng khi**: Muốn self-host; Tiết kiệm chi phí; Vẫn đạt hiệu năng cao

#### Tự huấn luyện (Fine-tune Embedding Model)
- **Ưu điểm**: Tối ưu cho domain riêng (y tế, pháp luật, tài chính...); Tăng độ chính xác retrieval
- **Nhược điểm**: Cần tập dữ liệu triplet (query, positive, negative); Công sức huấn luyện
- **Dùng khi**: Xây RAG cho một ngành cụ thể; Cần precision cao nhất

---

## Specialized Models

### Vietnamese Embedding Models
- **Vietnamese_Embedding**: Mô hình nhúng ngôn ngữ Việt Nam được tinh chỉnh từ mô hình BGE-M3, nhằm nâng cao khả năng truy xuất thông tin cho tiếng Việt - [HuggingFace](https://huggingface.co/AITeamVN/Vietnamese_Embedding) #embedding #Vietnamese #BGE-M3 #retrieval

### GreenNode Text Embedding Models
- **Team**: GreenNode
- **Models**: [HuggingFace Collection](https://huggingface.co/collections/GreenNode/greennode-text-embedding-models-66a75c00889910bc76007de5)
- **Đặc điểm**:
  - Fine-tuned từ dataset Table Markdown Retrieval (chỉ dùng tập trained)
  - Đứng đầu về retrieval dữ liệu dạng bảng (markdown) cho tiếng Việt so với các model opensource và closed source
  - Model `GreenNode/GreenNode-Embedding-Large-VN-Mixed-V1`: Interpolating giữa model finetuned và BAAI/bge-m3 (model gốc) để tránh overfitting và giữ performance với các tasks khác

### GreenNode Table Markdown Retrieval Dataset
- **Dataset**: [HuggingFace Dataset](https://huggingface.co/datasets/GreenNode/GreenNode-Table-Markdown-Retrieval-VN)
- **Đặc điểm**:
  - Được tạo từ LLM 70B với dữ liệu thực tế, format dạng context retrieval
  - Context (corpus) chính là dạng text + markdown table
  - Train: ~143k samples, Test (eval): ~35k samples

### MTEB Benchmark Tasks
- **Repository**: https://github.com/embeddings-benchmark/mteb
- **Sử dụng**:
```bash
mteb run -m GreenNode/GreenNode-Embedding-Large-VN-V1 \
-t [task-name] \
--verbosity 3
```
- **Vietnamese Retrieval Tasks**:
  - `GreenNodeTableMarkdownRetrieval` (GreenNode work)
  - `ZacLegalTextRetrieval` (Zalo Legal Text Retrieval Challenge 2021)
  - `VieQuADRetrieval` (taidng/UIT-ViQuAD2.0)

### Motivation & Pain Point
- **Motivation**: Các hệ thống chatbot có RAG, GraphRAG đều cần embedding text để encode và retrieve dữ liệu (text, table, image, etc).
- **Pain point**: Khi build chatbot có quá nhiều dữ liệu dạng Table nhưng model hiện tại chưa đáp ứng được
