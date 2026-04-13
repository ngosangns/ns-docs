---
area: technology
domain: ai-ml
topic: llm
type: resource
---
Để bạn không bị loạn chưởng với AI agents trước khi nói kỹ hơn chủ đề. Bạn hãy tưởng tượng một cái cây đại thụ to lớn.

- Rễ cây chính là các LLM (Large language model) như GPT, Gemini (Google), Claude, Llama (Meta) hay DeepSeek, nơi thật sự có công tác Machine Learning thu thập, huấn luyện dữ liệu. Gọi là nổi bật thì chỉ khoảng 10 LLM lớn.

- Gốc cây được tách thành nhiều nhánh, có nhánh liên quan tới ngôn ngữ, nhánh khác liên quan với hình ảnh, video, lại có nhánh liên quan tới âm nhạc…như Dall-E2, Imagen, Claude, Gemini. Số lượng nhánh cây chắc cũng chỉ loanh quanh dưới 30 cái lớn.

- Các cành và lá cây chính là các ứng dụng AI tạo ra. Số lượng hiện nay đã lên tới cả trăm ngàn cái và mỗi ngày lại có thêm nhiều cái mới. Các lá cây được quảng cáo nghe pro ghê gớm này kia nhưng cuối cùng cũng dùng chung loanh quanh mấy chục Rễ cây và Nhánh cây bên trên.

Các AI Agents là những chiếc lá. Mỗi chiếc lá sẽ có truyền tín hiệu tới Rễ cây nhưng theo những cách khác nhau, đó chính là: Prompt, RAG và Finetuning.

1. prompt-engineering:

Mỗi khi chúng ta đưa ra một yêu cầu cho ChatGPT hay Gemini, đó chính là một Prompt, nghệ thuật đặt Prompt nôm na được gọi là prompt-engineering. Tuy nhiên, không phải ai cũng biết cách đặt Prompt cho hiệu quả để có kết quả như mong muốn. Vì vậy, có những AI Agents chỉ làm một việc là tinh chỉnh prompt mà vẫn kiếm được tiền. Ví dụ, thay vì prompt “Viết 1 bài viết về sự khác biệt của CRM B2B và B2C”, thì prompt được chỉnh lại thành:

- Hãy đóng vai Nam Nguyễn, tác giả của cuốn sách “Cưa đổ CRM”, hãy viết một bài viết…

- Hoặc: Hãy xem người đọc của bạn là những sinh viên mới ra trường, chưa từng biết gì về CRM, hãy viết một bài viết…

- Hoặc phức tạp hơn, xây dựng cả một ngữ cảnh có phân nhánh với nhiều điều kiện ràng buộc để có kết quả sát với ngữ cảnh yêu cầu, còn tiết kiệm được chi phí (token).

2. RAG:

prompt-engineering không thể mapping các prompt vào ngữ cảnh một cách thủ công (vì số lượng prompt quá đa dạng) nên chỉ xử lý được các vấn đề chung chung. Vì vậy, để xử lý các vấn đề cụ thể như người mua hàng cụ thể khiếu nại, hay cần truy vấn và chỉnh sửa thông tin của một đơn hàng/mặt hàng cụ thể… thì AI Agents cần truy xuất thêm thông tin từ một nguồn dữ liệu bên ngoài.

Và phương án này được gọi là RAG (Retrieval-Augumented Generation).

Dữ liệu bên ngoài có thể là các đoạn chat trước đó, hoặc là 1 cơ sở dữ liệu của ứng dụng cụ thể, hoặc dữ liệu dưới nhiều định dạng khác nhau.

Việc tổ chức RAG là một nghệ thuật trong việc tối ưu tốc độ, bảo mật và cả tiết kiệm chi phí token.

3. Finetuning:

Finetuning là phương án dạy lại (điều chỉnh trọng số) AI Agents bằng tập dữ liệu chuẩn xác hoặc mới hơn so với dữ liệu mà LLM được dạy trước đó. Chỗ này điểm lại các phương pháp bằng 1 ví dụ cho dễ hiểu:

- Prompt thường: “Viết một bài thơ về CRM”

- Prompt xịn “prompt-engineering”: Dùng bút pháp của Nam Nguyễn “Viết một bài thơ về CRM”

- Prompt dùng RAG: Dùng bút pháp của Nam Nguyễn tại dòng thứ 2, trang 129 trong cuốn sách Cưa đổ CRM để “Viết một bài thơ về CRM” - (Lúc này cần nạp thêm toàn bộ nội dung cuốn sách Cưa đổ CRM và xem như 1 cơ sở dữ liệu bên ngoài)

- Nếu hệ thống quăng ra một bài thơ quê xệ hoặc không còn hợp thời, thì phải áp dụng Finetuning - hướng dẫn cho AI Agents tham khảo thêm toàn bộ các bài viết về CRM của Nam Nguyễn trên Facebook trong năm 2024 cho nó học lại về khái niệm CRM.

Như vậy, RAG liên quan tới tính đúng sai (facts), còn Finetunine lại liên quan đến hình thức (form). Nếu Prompt không đủ thông tin và dữ liệu, thì RAG là giải pháp. Nhưng nếu kết quả trả về là “không sai” nhưng lại không liên quan hoặc không đáp ứng yêu cầu hoặc không đủ tinh tế (behavior issue) thì Finetuning là giải pháp.

Tóm lại, AI Agents dùng Prompt Engineer, hoặc RAG hoặc Finetune, hoặc có thể cả RAG lẫn Finetune (RAFT). Tuy nhiên, ở thời điểm hiện tại thì RAG phổ biến nhất.

Cuốn "AI Engineer" của Huyền Chip viết về chủ đề này hay và mang tính hệ thống cao cho anh em đang tìm hiểu xây dựng AI Agents.

# 4. Thư viện mã nguồn mở cho RAG, Agents & AI Search

- **RAG (Retrieval Augmented Generation)**: Kỹ thuật AI kết hợp tìm kiếm thông tin liên quan với việc tạo phản hồi
  - Giúp AI cung cấp câu trả lời chính xác và phù hợp với ngữ cảnh hơn
  - Truy cập thông tin cập nhật từ nguồn dữ liệu bên ngoài
  - Độ chính xác nâng cao, hiểu ngữ cảnh tốt hơn
  - Giảm ảo giác (hallucination) trong mô hình AI
- **7 thư viện mã nguồn mở phổ biến**:
  - **SWIRL**: Hỗ trợ tìm kiếm nhanh chóng và an toàn trên các nguồn dữ liệu mà không cần di chuyển hoặc sao chép dữ liệu
  - **Cognita**: Framework mã nguồn mở để xây dựng hệ thống RAG theo mô-đun, sẵn sàng cho sản xuất, hỗ trợ nhiều trình truy xuất tài liệu và nhúng
  - Các thư viện khác cung cấp công cụ và framework cần thiết để triển khai hệ thống RAG, Agents và AI Search hiệu quả

# 5. Tools

- [code-graph-rag](https://github.com/vitali87/code-graph-rag): RAG system that uses code graphs to improve retrieval and generation for code-related queries. #RAG #codeGraph
- **Quivr**: Giải pháp RAG (Retrieval-Augmented Generation) cho việc tích hợp GenAI vào ứng dụng, hỗ trợ nhiều mô hình ngôn ngữ lớn (LLM) và kho vector - [GitHub](https://github.com/QuivrHQ/quivr) #RAG #LLM #vector
- **Unsloth**: Thư viện tối ưu hóa việc tinh chỉnh các mô hình ngôn ngữ lớn, giúp giảm 70% sử dụng bộ nhớ và tăng tốc độ huấn luyện 2x. Hỗ trợ train OpenAI gpt-oss, Qwen3, Llama 4, DeepSeek-R1, Gemma 3, TTS - [GitHub](https://github.com/unslothai/unsloth) #finetune #LLM #optimization

# Finetuning Large Language Models

## In-Context Learning và Indexing

- **In-Context Learning**: Cho phép mô hình thực hiện các tác vụ mới mà không cần huấn luyện thêm, bằng cách cung cấp ví dụ trực tiếp trong đầu vào (prompt)
- **Hard Prompt Tuning**: Một dạng của In-Context Learning, thay đổi trực tiếp các từ hoặc token đầu vào để cải thiện đầu ra
  - Tiết kiệm tài nguyên hơn so với parameter finetuning
  - Hiệu quả thường không bằng finetuning vì không cập nhật tham số của mô hình
  - Có thể tốn nhiều công sức vì yêu cầu con người tham gia so sánh chất lượng các prompt
- **Indexing**: Phương pháp thay thế cho In-Context Learning, biến LLMs thành hệ thống truy xuất thông tin
  - Chia nhỏ tài liệu hoặc nội dung trang web thành các đoạn nhỏ (chunks)
  - Biến đổi chúng thành vector và lưu trữ trong vector database
  - Khi người dùng gửi truy vấn, tính toán độ tương đồng vector giữa truy vấn và các vector trong database để tìm kiếm thông tin liên quan

## Các phương pháp Finetuning

### Feature-Based

- Sử dụng tập huấn luyện có nhãn để tải mô hình transformer đã được huấn luyện trước
- Huấn luyện thêm một mô hình khác trên các đặc trưng được trích xuất từ mô hình transformer
- Không cập nhật trọng số của mô hình transformer gốc

### Adapter-Based

- Thêm các lớp adapter nhỏ vào mô hình transformer
- Chỉ cập nhật trọng số của các lớp adapter, giữ nguyên mô hình gốc
- Hiệu quả về tài nguyên và cho phép tái sử dụng mô hình gốc cho nhiều tác vụ

### Full Finetuning

- Huấn luyện lại toàn bộ mô hình trên tập dữ liệu cụ thể
- Cập nhật tất cả các tham số của mô hình
- Thường cho kết quả tốt nhất nhưng tốn nhiều tài nguyên nhất

## Parameter-Efficient Finetuning Techniques (PEFT)

- **Ưu điểm của PEFT**:
  - Chi phí tính toán thấp hơn (cần ít GPU và thời gian GPU hơn)
  - Thời gian training nhanh hơn
  - Yêu cầu phần cứng thấp hơn (ít GPU và bộ nhớ hơn)
  - Hiệu suất mô hình tốt hơn (giảm overfitting)
  - Tiết kiệm dung lượng lưu trữ (đa số trọng số có thể được chia sẻ qua các tác vụ khác nhau)
- **Các kỹ thuật PEFT phổ biến**:
  - Prefix Tuning: Thêm các token đặc biệt vào đầu prompt
  - Adapters: Thêm các lớp nhỏ vào mô hình
  - Low-Rank Adaptation (LoRA): Phân rã ma trận trọng số thành các ma trận nhỏ hơn

## Reinforcement Learning with Human Feedback (RLHF)

- **Quy trình RLHF**:
  1. **Thu thập dữ liệu minh họa và training mô hình supervised policy**: Prompt được lấy mẫu từ tập dữ liệu, người gán nhãn minh họa hành vi đầu ra mong muốn, dữ liệu này được sử dụng để finetuning với học giám sát
  2. **Thu thập dữ liệu so sánh và training mô hình phần thưởng (reward model)**: Prompt và nhiều đầu ra mô hình được lấy mẫu, người gán nhãn xếp hạng các đầu ra từ tốt nhất đến tệ nhất, dữ liệu này được sử dụng để training mô hình reward model
  3. **Tối ưu hóa policy so với reward model sử dụng học tăng cường**: Prompt mới được lấy mẫu, policy tạo ra output, reward model tính toán phần thưởng, phần thưởng này được sử dụng để cập nhật policy sử dụng PPO (proximal policy optimization)
- **Lý do sử dụng reward model**: Việc liên quan đến con người trong quá trình học sẽ tạo ra một điểm nghẽn, vì không thể nhận được phản hồi từ con người theo thời gian thực

# Chunking trong RAG

## Vai trò của Chunking

- Chia nhỏ văn bản (chunking) là bước quan trọng trong hệ thống RAG để tối ưu hóa truy xuất và sử dụng thông tin
- Ảnh hưởng trực tiếp đến chất lượng kết quả truy xuất và phản hồi của mô hình

## Các loại Chunking

### Fixed Size Chunking

- Chia văn bản thành các đoạn có kích thước cố định dựa trên số lượng ký tự
- Đơn giản nhưng có thể cắt ngang ý nghĩa của câu hoặc đoạn văn

### Recursive Chunking

- Chia văn bản dựa trên cấu trúc như dấu xuống dòng, sau đó áp dụng Fixed Size Chunking
- Tôn trọng cấu trúc tự nhiên của văn bản hơn

### Document-Based Chunking

- Chia tài liệu dựa trên cấu trúc vốn có của nó (tiêu đề, phần, chương)
- Phù hợp với tài liệu có cấu trúc rõ ràng

### Semantic Chunking

- Chia văn bản dựa trên ý nghĩa ngữ nghĩa, nhóm các câu hoặc đoạn văn có liên quan về mặt ngữ nghĩa
- **Cách hoạt động**:
  1. Chia tài liệu thành các đoạn nhỏ
  2. Nhúng (embed) các đoạn thành vector
  3. So sánh độ tương đồng giữa các đoạn liên tiếp
  4. Gộp các đoạn có độ tương đồng cao (vượt ngưỡng nhất định) để tạo thành các chunk mang ý nghĩa riêng
- **Thông số quan trọng**:
  - `buffer_size`: Số lượng câu gộp thành một nhóm trước khi thực hiện semantic chunking
  - `threshold`: Ngưỡng độ tương đồng để quyết định gộp các đoạn
- Hiệu quả hơn trong việc tạo ra các chunk có ý nghĩa hoàn chỉnh

### Agentic Chunking

- Sử dụng LLM để tự động chia nhỏ tài liệu
- LLM có thể hiểu ngữ cảnh và cấu trúc phức tạp để tạo ra các chunk tối ưu

## Proposition-Based Retrieval

- Phương pháp nâng cao trong RAG, tập trung vào việc truy xuất các mệnh đề (proposition) thay vì các đoạn văn bản lớn
- Giúp nâng cao hiệu suất RAG bằng cách truy xuất thông tin chính xác và liên quan hơn

# RAG vs CAG (Cache-Augmented Generation)

## Vấn đề của RAG

- RAG truy vấn cơ sở dữ liệu vector mỗi lần, kể cả với dữ liệu không thay đổi
- Chậm và tốn kém do phải query lại dữ liệu tĩnh

## Giải pháp CAG

- CAG lưu trữ thông tin tĩnh trong bộ nhớ KV thay vì truy vấn lại
- Kết hợp:
  - **Tĩnh** → được lưu trong cache
  - **Động** → truy xuất trực tiếp (live)

## Lợi ích

- Nhanh hơn, rẻ hơn, ít dư thừa
- Chỉ cache dữ liệu ổn định, phần còn lại fetch mới
- OpenAI và Anthropic hỗ trợ tính năng này qua prompt caching
- RAG + CAG = bộ nhớ AI hiệu quả

# 6. RAG Tools & Vector Databases

- **PageIndex**: Hệ thống lập chỉ mục tài liệu cho các ứng dụng RAG dựa trên lý luận (reasoning-based RAG), tối ưu hóa cho việc truy xuất thông tin từ tài liệu trong các hệ thống AI - [GitHub](https://github.com/VectifyAI/PageIndex) #RAG #documentIndexing #reasoning
- **Milvus**: Cơ sở dữ liệu vector hiệu suất cao, cloud-native, được thiết kế cho tìm kiếm xấp xỉ lân cận (ANN) trên quy mô lớn. Hỗ trợ tìm kiếm vector nhanh chóng và mở rộng, phù hợp cho các ứng dụng AI và học máy - [GitHub](https://github.com/milvus-io/milvus) #vectorDatabase #ANN #scalable
- **LEANN**: Ứng dụng RAG cho phép tiết kiệm 97% dung lượng lưu trữ, hoạt động nhanh chóng, chính xác và hoàn toàn riêng tư trên thiết bị cá nhân. Chạy RAG trên thiết bị cá nhân mà không cần kết nối internet - [GitHub](https://github.com/yichuan-w/LEANN) #RAG #private #onDevice #storageOptimization
- **turbopuffer**: Serverless vector và full-text search database được xây dựng từ đầu trên object storage (S3), nhanh, rẻ hơn 10x và cực kỳ có thể mở rộng
  - **Kiến trúc**: Memory/SSD cache layer kết hợp với object storage (S3) để lưu trữ dữ liệu
  - **Tính năng chính**:
    - Serverless architecture, tự động scaling
    - Low latency: sub-10ms p50 cho vector search
    - Hỗ trợ hàng tỷ vectors
    - Full-text search và hybrid search (kết hợp vector + keyword)
    - Metadata filtering
    - Tiết kiệm chi phí đáng kể so với các vector database truyền thống
  - **Hiệu năng production**:
    - Xử lý 1T+ documents, 10M+ writes/s, 10k+ queries/s trong production
    - Max documents: Unlimited (global), 500M @ 2TB (per namespace)
    - Max write throughput: Unlimited (global), 10k writes/s @ 32 MB/s (per namespace)
    - Max queries: Unlimited (global), 1k+ queries/s (per namespace)
    - Vector search recall@10: 90-100%
  - **Use cases**: AI applications, semantic search, recommendation systems, RAG, similarity search
  - **Khách hàng**: Cursor, Notion, Linear, Anthropic, Atlassian, Grammarly, Readwise, Clay, Photoroom, GitBook, Superhuman, Warp, Cognition
  - [Website](https://turbopuffer.com/) #vectorDatabase #fullTextSearch #serverless #RAG #scalable #costEffective

# 7. Text Embedding Models & Vietnamese Retrieval Datasets

## Vietnamese Embedding Models

- **Vietnamese_Embedding**: Mô hình nhúng ngôn ngữ Việt Nam được tinh chỉnh từ mô hình BGE-M3, nhằm nâng cao khả năng truy xuất thông tin cho tiếng Việt - [HuggingFace](https://huggingface.co/AITeamVN/Vietnamese_Embedding) #embedding #Vietnamese #BGE-M3 #retrieval

## GreenNode Text Embedding Models

- **Team**: GreenNode
- **Models**: https://huggingface.co/collections/GreenNode/greennode-text-embedding-models-66a75c00889910bc76007de5
- **Đặc điểm**:
  - Fine-tuned từ dataset Table Markdown Retrieval (chỉ dùng tập trained)
  - Đứng đầu về retrieval dữ liệu dạng bảng (markdown) cho tiếng Việt so với các model opensource và closed source
  - Model `GreenNode/GreenNode-Embedding-Large-VN-Mixed-V1`: Interpolating giữa model finetuned và BAAI/bge-m3 (model gốc) để tránh overfitting và giữ performance với các tasks khác
- **Key finding**: Interpolation model finetuned và model gốc có thể tạo ra model vượt trội hơn cả hai do vừa có weight của model finetuned (task specific) và weight của model gốc (more general)

## GreenNode Table Markdown Retrieval Dataset

- **Dataset**: https://huggingface.co/datasets/GreenNode/GreenNode-Table-Markdown-Retrieval-VN
- **Đặc điểm**:
  - Được tạo từ LLM 70B với dữ liệu thực tế, format dạng context retrieval
  - Context (corpus) chính là dạng text + markdown table
  - Train: ~143k samples, Test (eval): ~35k samples (hay Corpus 44.7k samples, Queries 179k samples)
- **Key finding**: Dùng LLM để synthesize data theo dạng markdown có thể làm giàu dữ liệu, nhưng cần có bước kiểm định chất lượng của data được sinh ra

## MTEB Benchmark Tasks

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

## Motivation & Pain Point

- **Motivation**: Các hệ thống chatbot có RAG, GraphRAG đều cần embedding text để encode và retrieve dữ liệu (text, table, image, etc). Phần lớn các open-source + product đang convert data ở mọi định dạng sang text, markdown, HTML để truy xuất dữ liệu trả về dạng text cho LLM hiểu và generate được câu trả lời (ví dụ: llamaIndex, Langchain, Microsoft Markitdown)
- **Pain point**: Khi build chatbot có quá nhiều dữ liệu dạng Table nhưng model hiện tại chưa đáp ứng được