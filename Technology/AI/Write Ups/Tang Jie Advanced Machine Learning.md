---
area: technology
domain: ai-ml
topic: llm
type: note
title: Tang Jie Advanced Machine Learning
description: "Bài tập Advanced Machine Learning của Tang Jie ở Thanh Hoa (2026) và các phán đoán ông nói về bước sau của chatbot"
timestamp: "2026-09-22T00:00:00.000Z"
tags:
  - technology
  - ai-ml
  - llm
  - tsinghua
  - zhipu
resource: https://www.sohu.com/a/1077377896_115060
---

# Tang Jie: Advanced Machine Learning ở Thanh Hoa

> **Nguồn**: Bianews, 17/09/2026, đăng lại trên [Sohu](https://www.sohu.com/a/1077377896_115060) và [Phoenix](https://tech.ifeng.com/c/8wUruDb30rN). Cùng danh sách bài tập xuất hiện ở [快科技](https://tech.ifeng.com/c/8wVjdWJ9m5i) và [HKET](https://inews.hket.com/article/4195430/). Phán đoán về PC và thang năng lực của Zhipu nằm ở [21世纪经济报道, 18/09/2026](https://www.163.com/dy/article/L7583PLT05199NPP.html).
>
> Danh sách bài tập được các báo dẫn lại từ sinh viên trong lớp, không phải syllabus PDF của trường.

## Người nói

Tang Jie (唐杰) là giáo sư khoa Khoa học máy tính, Đại học Thanh Hoa, đồng sáng lập và chief scientist của Zhipu AI (thương hiệu tiếng Anh Z.AI, dòng GLM). Ông không nhận chức danh điều hành; 21世纪经济报道 gọi ông là một trong những người kiểm soát thực tế của công ty. Gọi ông là ông chủ là cách nói rút gọn của vai đó.

## Môn học

Môn tên 《高级机器学习》, 16 tuần. Buổi đầu khoảng 17/09/2026: phòng 112 chỗ ngồi đầy, có người đứng ngoài ghế. Ông nói trước rằng bài tập sẽ nhiều, để lọc bớt người. Tên môn vẫn là machine learning; nội dung 16 tuần đã xoay quanh một đường pipeline mô hình lớn.

HKET tóm đường đó thành một mạch: base, scaling, dữ liệu tổng hợp, preference và RL, rồi tới vai trò agent, continual learning, và AI train AI.

## Bài tập

Sinh viên tự đi hết pipeline, làm nhóm 2–3 người:

1. Tự viết tokenizer và transformer từ đầu, train end-to-end một model **0.1B** (100 triệu tham số).
2. Tự viết Triton attention kernel, tự đo phần lợi khi train và inference trên nhiều GPU.
3. Làm sạch corpus từ raw dump, fit scaling law, rồi ngoại suy.
4. Trên cùng một base model, chạy đối chứng **SFT**, **DPO** và **RLVR** (reinforcement learning from verifiable rewards).
5. Dựng environment có thể kiểm chứng cùng harness, train một agent cho task dài, và khuyến khích vòng self-judge (model tự chấm output của mình).

Nộp report tiếng Anh theo format NeurIPS. Tuần 16 demo trực tiếp. Bài tập chiếm 40% điểm, đồ án lớn 60%. Bốn mục problem, motivation, method, results đều phải có.

Một bài lan trên Sohu kể thêm lịch từng tuần: Triton phải nhanh hơn FlashAttention 12%, scaling law sai quá 5% thì làm lại, và tuần 14 so LoRA / QLoRA / Adapter. Các báo dẫn danh sách năm hạng mục ở trên không có các ngưỡng đó, và hạng mục thứ tư của họ là SFT / DPO / RLVR. Headline của bài lịch tuần còn viết “0.1亿 tham số”, tức 10 triệu, lệch mười lần so với 0.1B. Giữ danh sách năm hạng mục và cỡ 0.1B.

## Phán đoán ở buổi khai giảng

Câu các báo dẫn trực tiếp: AGI và ASI là mục tiêu tiếp theo của model; cuộc đua chat cơ bản đã xong; việc của 2026 là đẩy trí tuệ lên, để model tự nhớ, tự tiến hóa, và tự làm xong task dài.

Câu “cuộc đua chatbot dựa trên kiến thức đã chạm trần” gom hai việc khác nhau. Việc ông gọi là gần xong là sản phẩm chat. Tháng 1/2026, trên [diễn đàn ở Hải Điến](https://www.163.com/dy/article/KJ162U2A0530NLC9.html), ông nói trong paradigm kiểu DeepSeek thì bài toán thời chat về cơ bản đã giải, phần còn lại chủ yếu là engineering, và paradigm kế tiếp là để mỗi người dùng AI làm một việc thật. Tháng 12/2025, trên Weibo, ông vẫn viết rằng thêm dữ liệu, thêm tham số và tính toán bão hòa hơn vẫn là cách nâng base model hiệu quả nhất. Scaling tri thức của base, trong chữ của ông thời điểm đó, vẫn đang chạy.

Đa phương thức không nằm trong câu báo dẫn ngày 17/09. Từ đầu 2026 ông gọi **multimodal sensory integration** là trọng tâm của năm: có nó thì AI mới làm task dài trong máy (tương tác GUI) và, qua robotics, đi vào thế giới vật lý. Bộ nhớ, continual learning và self-judge là mạch ông nhắc từ Weibo tháng 12/2025 và thư nội bộ tháng 7/2026: context, RAG và tham số lần lượt ứng với các tầng nhớ; model phải tự biết output của mình đúng hay sai thì mới có mục tiêu để tự cải thiện.

## Một đến hai năm và máy tính cá nhân

21世纪经济报道 thuật phán đoán ông đưa ở cùng buổi học: trong một đến hai năm, AI sẽ đảm nhận toàn bộ thao tác trên PC. Đây là phán đoán được báo ghi lại, không kèm định nghĩa của “toàn bộ” và không kèm mốc đo. Cách kể “gần như hoàn toàn” mềm hơn chữ 全面接管 trong bài báo.

## Thang năng lực

Trong cùng chu kỳ tin, Zhipu công bố thang năng lực ở buổi trao đổi với nhà đầu tư: **Chat → Coding → Agent → Co-work → Autonomous AI**. Tới bậc Co-work, model đi vào workflow thật và được trả tiền theo task đã giao; ngưỡng là người làm nghề nhận kết quả, không phải làm lại từ đầu. Báo nói GLM-5.3 ra mắt được một tháng thì đơn Co-work theo ngành vượt 1 tỷ NDT. Con số đó là lời quản lý, chưa phải báo cáo đã kiểm toán trong bài này.

Chuỗi “kiến thức → lập trình → thế giới số → thế giới vật lý” là cách nén của người kể lại: kiến thức ứng với pretrain, lập trình ứng với Coding, thế giới số ứng với agent trên máy, thế giới vật lý ứng với câu embodied qua robotics từ tháng 1/2026. Các bản tin buổi 17/09 không chép nguyên một câu bốn nấc như vậy. Thang được viết ra thành chữ là Chat, Coding, Agent, Co-work, Autonomous AI.
