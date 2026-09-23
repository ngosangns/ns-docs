---
area: technology
domain: ai-ml
topic: llm
type: resource
title: RAG Overview
description: RAG Overview
timestamp: "2026-06-19T13:43:26.169Z"
tags:
  - technology
  - ai-ml
  - llm
resource: https://github.com/vitali87/code-graph-rag
---

# RAG Overview

Để bạn không bị loạn chưởng với AI agents trước khi nói kỹ hơn chủ đề. Bạn hãy tưởng tượng một cái cây đại thụ to lớn.

- Rễ cây chính là các LLM (Large language model) như GPT, Gemini (Google), Claude, Llama (Meta) hay DeepSeek, nơi thật sự có công tác Machine Learning thu thập, huấn luyện dữ liệu. Gọi là nổi bật thì chỉ khoảng 10 LLM lớn.

- Gốc cây được tách thành nhiều nhánh, có nhánh liên quan tới ngôn ngữ, nhánh khác liên quan với hình ảnh, video, lại có nhánh liên quan tới âm nhạc…như Dall-E2, Imagen, Claude, Gemini. Số lượng nhánh cây chắc cũng chỉ loanh quanh dưới 30 cái lớn.

- Các cành và lá cây chính là các ứng dụng AI tạo ra. Số lượng hiện nay đã lên tới cả trăm ngàn cái và mỗi ngày lại có thêm nhiều cái mới. Các lá cây được quảng cáo nghe pro ghê gớm này kia nhưng cuối cùng cũng dùng chung loanh quanh mấy chục Rễ cây và Nhánh cây bên trên.

Các AI Agents là những chiếc lá. Mỗi chiếc lá sẽ có truyền tín hiệu tới Rễ cây nhưng theo những cách khác nhau, đó chính là: Prompt, RAG và Finetuning.

## prompt-engineering

Mỗi khi chúng ta đưa ra một yêu cầu cho ChatGPT hay Gemini, đó chính là một Prompt, nghệ thuật đặt Prompt nôm na được gọi là prompt-engineering. Tuy nhiên, không phải ai cũng biết cách đặt Prompt cho hiệu quả để có kết quả như mong muốn. Vì vậy, có những AI Agents chỉ làm một việc là tinh chỉnh prompt mà vẫn kiếm được tiền. Ví dụ, thay vì prompt "Viết 1 bài viết về sự khác biệt của CRM B2B và B2C", thì prompt được chỉnh lại thành:

- Hãy đóng vai Nam Nguyễn, tác giả của cuốn sách "Cưa đổ CRM", hãy viết một bài viết…

- Hoặc: Hãy xem người đọc của bạn là những sinh viên mới ra trường, chưa từng biết gì về CRM, hãy viết một bài viết…

- Hoặc phức tạp hơn, xây dựng cả một ngữ cảnh có phân nhánh với nhiều điều kiện ràng buộc để có kết quả sát với ngữ cảnh yêu cầu, còn tiết kiệm được chi phí (token).

## RAG (Retrieval-Augmented Generation)

prompt-engineering không thể mapping các prompt vào ngữ cảnh một cách thủ công (vì số lượng prompt quá đa dạng) nên chỉ xử lý được các vấn đề chung chung. Vì vậy, để xử lý các vấn đề cụ thể như người mua hàng cụ thể khiếu nại, hay cần truy vấn và chỉnh sửa thông tin của một đơn hàng/mặt hàng cụ thể… thì AI Agents cần truy xuất thêm thông tin từ một nguồn dữ liệu bên ngoài.

Và phương án này được gọi là RAG (Retrieval-Augumented Generation).

Dữ liệu bên ngoài có thể là các đoạn chat trước đó, hoặc là 1 cơ sở dữ liệu của ứng dụng cụ thể, hoặc dữ liệu dưới nhiều định dạng khác nhau.

Việc tổ chức RAG là một nghệ thuật trong việc tối ưu tốc độ, bảo mật và cả tiết kiệm chi phí token.

## Finetuning

Finetuning là phương án dạy lại (điều chỉnh trọng số) AI Agents bằng tập dữ liệu chuẩn xác hoặc mới hơn so với dữ liệu mà LLM được dạy trước đó. Chỗ này điểm lại các phương pháp bằng 1 ví dụ cho dễ hiểu:

- Prompt thường: "Viết một bài thơ về CRM"

- Prompt xịn "prompt-engineering": Dùng bút pháp của Nam Nguyễn "Viết một bài thơ về CRM"

- Prompt dùng RAG: Dùng bút pháp của Nam Nguyễn tại dòng thứ 2, trang 129 trong cuốn sách Cưa đổ CRM để "Viết một bài thơ về CRM" - (Lúc này cần nạp thêm toàn bộ nội dung cuốn sách Cưa đổ CRM và xem như 1 cơ sở dữ liệu bên ngoài)

- Nếu hệ thống quăng ra một bài thơ quê xệ hoặc không còn hợp thời, thì phải áp dụng Finetuning - hướng dẫn cho AI Agents tham khảo thêm toàn bộ các bài viết về CRM của Nam Nguyễn trên Facebook trong năm 2024 cho nó học lại về khái niệm CRM.

Như vậy, RAG liên quan tới tính đúng sai (facts), còn Finetunine lại liên quan đến hình thức (form). Nếu Prompt không đủ thông tin và dữ liệu, thì RAG là giải pháp. Nhưng nếu kết quả trả về là "không sai" nhưng lại không liên quan hoặc không đáp ứng yêu cầu hoặc không đủ tinh tế (behavior issue) thì Finetuning là giải pháp.

Tóm lại, AI Agents dùng Prompt Engineer, hoặc RAG hoặc Finetune, hoặc có thể cả RAG lẫn Finetune (RAFT). Tuy nhiên, ở thời điểm hiện tại thì RAG phổ biến nhất.

Cuốn "AI Engineer" của Huyền Chip viết về chủ đề này hay và mang tính hệ thống cao cho anh em đang tìm hiểu xây dựng AI Agents.

## Thư viện mã nguồn mở cho RAG, Agents & AI Search

- **RAG (Retrieval Augmented Generation)**: Kỹ thuật AI kết hợp tìm kiếm thông tin liên quan với việc tạo phản hồi
  - Giúp AI cung cấp câu trả lời chính xác và phù hợp với ngữ cảnh hơn
  - Truy cập thông tin cập nhật từ nguồn dữ liệu bên ngoài
  - Độ chính xác nâng cao, hiểu ngữ cảnh tốt hơn
  - Giảm ảo giác (hallucination) trong mô hình AI
- **7 thư viện mã nguồn mở phổ biến**:
  - **SWIRL**: Hỗ trợ tìm kiếm nhanh chóng và an toàn trên các nguồn dữ liệu mà không cần di chuyển hoặc sao chép dữ liệu
  - **Cognita**: Framework mã nguồn mở để xây dựng hệ thống RAG theo mô-đun, sẵn sàng cho sản xuất, hỗ trợ nhiều trình truy xuất tài liệu và nhúng
  - Các thư viện khác cung cấp công cụ và framework cần thiết để triển khai hệ thống RAG, Agents và AI Search hiệu quả

## Tools

- [code-graph-rag](https://github.com/vitali87/code-graph-rag): RAG system that uses code graphs to improve retrieval and generation for code-related queries. #RAG #codeGraph
- **Quivr**: Giải pháp RAG (Retrieval-Augmented Generation) cho việc tích hợp GenAI vào ứng dụng, hỗ trợ nhiều mô hình ngôn ngữ lớn (LLM) và kho vector - [GitHub](https://github.com/QuivrHQ/quivr) #RAG #LLM #vector
- **Unsloth**: Thư viện tối ưu hóa việc tinh chỉnh các mô hình ngôn ngữ lớn, giúp giảm 70% sử dụng bộ nhớ và tăng tốc độ huấn luyện 2x. Hỗ trợ train OpenAI gpt-oss, Qwen3, Llama 4, DeepSeek-R1, Gemma 3, TTS - [GitHub](https://github.com/unslothai/unsloth) #finetune #LLM #optimization

## RAG vs CAG (Cache-Augmented Generation)

### Vấn đề của RAG

- RAG truy vấn cơ sở dữ liệu vector mỗi lần, kể cả với dữ liệu không thay đổi
- Chậm và tốn kém do phải query lại dữ liệu tĩnh

### Giải pháp CAG

- CAG lưu trữ thông tin tĩnh trong bộ nhớ KV thay vì truy vấn lại
- Kết hợp:
  - **Tĩnh** → được lưu trong cache
  - **Động** → truy xuất trực tiếp (live)

### Lợi ích

- Nhanh hơn, rẻ hơn, ít dư thừa
- Chỉ cache dữ liệu ổn định, phần còn lại fetch mới
- OpenAI và Anthropic hỗ trợ tính năng này qua prompt caching
- RAG + CAG = bộ nhớ AI hiệu quả
