---
tags:
  - area/technology
  - domain/ai-ml
  - type/resource
  - lang/vi
---

# AI Agents Overview

## Make It Heavy

https://github.com/Doriandarko/make-it-heavy

### Chức năng nổi bật

- **Mô phỏng Grok Heavy**: Hệ thống multi-agent tái hiện chế độ phân tích sâu, đa chiều như Grok heavy.
- **Song song nhiều agent**: Triển khai đồng thời 4 (hoặc hơn) agent chuyên biệt để đảm bảo độ bao phủ thông tin và quan điểm.
- **Tạo câu hỏi động**: AI tự động tạo 4 câu hỏi nghiên cứu chuyên sâu từ truy vấn người dùng nhằm đảm bảo từng khía cạnh được khai triển độc lập.
- **Hiển thị trạng thái thực thi**: Giao diện console hiển thị tiến độ xử lý theo từng agent theo thời gian thực.
- **Tích hợp công cụ linh hoạt**: Hệ thống tool tự động phát hiện các thư viện, hàm công cụ được thêm vào thư mục `tools/`, cho phép "cắm nóng".
- **Tổng hợp thông minh**: Tích hợp kết quả từ nhiều góc nhìn của các agent thành một câu trả lời thống nhất, sâu sắc.
- **Chế độ đơn agent**: Có thể chạy ở chế độ một agent duy nhất (cho bài toán đơn giản hơn).

### Thành phần chính

| Thành phần      | Chức năng                                                                |
| --------------- | ------------------------------------------------------------------------ |
| agent.py        | Triển khai agent độc lập, tích hợp tool, vòng lặp tác vụ tự hoàn chỉnh   |
| orchestrator.py | Sinh câu hỏi chuyên biệt, điều phối agent song song, tổng hợp & recovery |
| tools/          | Hệ thống phát hiện, gắn, sử dụng tool động, interface thống nhất         |
| config.yaml     | Tùy chỉnh API, model, max agent, timeout, prompt sinh câu hỏi/tổng hợp   |

### Tool tích hợp sẵn

| Tool               | Nhiệm vụ                   | Tham số chính                    |
| ------------------ | -------------------------- | -------------------------------- |
| search_web         | Tìm kiếm web DuckDuckGo    | query, max_results               |
| calculate          | Tính toán an toàn          | expression                       |
| read_file          | Đọc file                   | path, head, tail                 |
| write_file         | Ghi/ghi đè file            | path, content                    |
| mark_task_complete | Đánh dấu hoàn thành tác vụ | task_summary, completion_message |

### Tích hợp AI Model

- Hỗ trợ chọn model OpenRouter (Claude, GPT-4.1, Gemini, Llama v.v.)
- Tùy chỉnh số lượng agent song song (cấu hình orchestrator)
- Có thể thêm tool nhanh chỉ qua thêm file Python kế thừa `BaseTool`

### Cài đặt & Sử dụng cơ bản

- Yêu cầu Python 3.8+, package manager `uv`, API key OpenRouter
- Khởi chạy chế độ 1 agent: `uv run main.py`
- Khởi chạy Grok heavy (multi-agent): `uv run make_it_heavy.py`
- Tùy chỉnh bot, tool, config trong `config.yaml`

### Ưu và nhược điểm

#### Ưu điểm

- **Phân tích đa chiều, chuyên sâu**: Mỗi agent tiếp cận một góc độ → tổng hợp sâu, giảm thiếu sót thông tin.
- **Tự động hóa workflow**: Không tốn công sinh câu hỏi, điều phối, chỉ việc nhập truy vấn.
- **Mở rộng công cụ dễ dàng**: Chỉ cần thêm file tool mới vào đúng thư mục.
- **Dễ cấu hình**: Tùy chỉnh thông qua file YAML, hỗ trợ nhiều model khác nhau linh hoạt về hiệu năng, giá thành.
- **Có chế độ đơn giản và nâng cao**: Phù hợp nhiều bài toán, usecase khác nhau.

#### Nhược điểm

- **Phụ thuộc OpenRouter API và quota**: Mỗi agent ngốn request riêng, giới hạn bởi gói dịch vụ.
- **Overhead cho task đơn giản**: Quá trình orchestrator/agent có thể dư thừa nếu bài toán ngắn/gọn.
- **Yêu cầu cấu hình ban đầu (API key, Python env)**, newbie sẽ phải setup nhiều bước.
- **Các tool mặc định chỉ ở mức cơ bản**, nếu muốn cao cấp cần tự phát triển thêm.

#### Các ứng dụng tiềm năng (Usecases)

- **Nghiên cứu tổng hợp**: Yêu cầu phân tích chuyên sâu từ nhiều khía cạnh (ex: ảnh hưởng AI đến lập trình, xu hướng công nghệ...).
- **Tư vấn/chẩn đoán kỹ thuật**: Nhận diện, so sánh, xác thực nhiều phương án/phản biện (tư vấn code, so sánh framework, xác thực dữ liệu...).
- **Kịch bản sáng tạo/phân tích rủi ro**: Lập kế hoạch startup, đánh giá thị trường, phân tích tài chính, risk assessment.
- **Tổng hợp tài liệu lớn**: Chia nhỏ nhiệm vụ theo hướng chuyên môn hóa (giống teamwork), thay thế brainstorming nhóm nhỏ.

## Awesome LLM Apps

- **Repository**: https://github.com/Shubhamsaboo/awesome-llm-apps
- **Description**: Curated collection of awesome LLM applications with AI Agents and RAG using OpenAI, Anthropic, Gemini, and open-source models
- **Categories**:
  - AI Agents
  - RAG (Retrieval-Augmented Generation) applications
  - LLM-powered applications
  - Open-source model implementations
- **Use Cases**: Finding LLM application examples, learning RAG implementations, exploring AI agent architectures

## CrewAI

https://github.com/crewAIInc/crewAI

**CrewAI** là một framework Python nhẹ, tốc độ cao, dùng để điều phối hệ thống đa agent dựa trên mô hình ngôn ngữ lớn (LLM Multi-Agent Orchestration Framework).

### Chức năng chính của CrewAI

- CrewAI tổ chức các **agent** (đại diện cho các vai trò như Researcher, Writer, Critic...) hoạt động phối hợp như một "đội nhóm" (crew) để xử lý các tác vụ (tasks) cụ thể.
- Mỗi agent có vai trò rõ ràng, bối cảnh, mục tiêu, và có thể sử dụng các tool mặc định hoặc riêng phục vụ cho từng task.
- Hỗ trợ tạo các luồng công việc (process) linh hoạt: thực thi nhiệm vụ tuần tự hoặc song song, tương tác trong nhóm agent có hoặc không.
- Điều phối toàn bộ bằng **CrewManager**, quản lý khởi tạo, kích hoạt và xử lý logic phân chia nhiệm vụ và trả về kết quả cuối cùng.
- Cho phép gán tool riêng cho từng agent, hỗ trợ các mô hình LLM như OpenAI GPT, Claude, Mistral, Cohere, và dễ dàng cấu hình qua langchain.llms.
- Cung cấp API đơn giản, dễ hiểu, hỗ trợ tốt cho các workflow AI thực tế dạng Nghiên cứu → Viết → Phản biện → Tổng hợp → Xuất bản.

### Ưu điểm

- **Phong cách tư duy giống teamwork thực tế**: dễ hình dung, dễ mở rộng các vai trò mới trong hệ thống.
- **Phù hợp workflow AI thực tế đa tác vụ** với các giai đoạn rõ ràng.
- **Hỗ trợ nhiều loại mô hình LLM** và khả năng cấu hình đa dạng công cụ.
- **Giao diện lập trình rõ ràng và đơn giản**, dễ tiếp cận với người mới.
- Cho phép gán công cụ riêng cho từng agent, tăng tính linh hoạt khi làm việc chuyên sâu.

### Nhược điểm

- **Không hỗ trợ hội thoại trực tiếp giữa các agent** (agents không giao tiếp tương tác song phương như trong một số framework khác như AutoGen).
- **Tasks tuyến tính, không có vòng lặp phản hồi tự động hay multi-round interaction**, tức là các tác vụ chỉ chạy theo một chiều không lặp lại hoặc tự điều chỉnh trong quá trình chạy.
- **Chưa tích hợp bộ nhớ dài hạn hoặc đa vòng trò chuyện mặc định** (long-term memory).

### Usecases phù hợp

- Các workflow AI đa tác vụ, cần phân chia rõ ràng vai trò như nghiên cứu, viết, phản biện, tổng hợp và xuất bản nội dung.
- Hệ thống tự động hóa phức hợp, có nhiều bước xử lý liên tiếp hoặc song song, ví dụ:
  - Tạo nội dung tự động với nhiều bước kết hợp xử lý logic và đánh giá.
  - Quản lý dự án AI mà có nhiều chuyên gia ảo đóng vai trò khác nhau.
  - Các hệ thống cần tương tác định hướng nhiệm vụ rõ ràng cho từng agent, ví dụ chatbot đa agent, hệ thống hỗ trợ ra quyết định phức tạp.

CrewAI có thể dùng làm framework độc lập, không phụ thuộc vào LangChain hoặc các framework agent khác, đem lại sự linh hoạt và nhanh chóng trong việc xây dựng multi-agent orchestration dựa trên LLM.

## AI Agents Frameworks

- **Suna (Kortix)**: Framework xây dựng, quản lý và huấn luyện các AI Agents - https://github.com/kortix-ai/suna #AI #agents #framework
- **VoltAgent**: AI Agent framework - https://github.com/VoltAgent/voltagent #AI #agents
- **OpenAI Agents Python**: Framework nhẹ và mạnh mẽ để xây dựng các quy trình làm việc đa tác nhân trong Python - [GitHub](https://github.com/openai/openai-agents-python) #AI #agents #openai
- **Google ADK**: Bộ công cụ phát triển mã nguồn mở (Python, TypeScript, Go, Java) để xây dựng, đánh giá và triển khai các tác nhân AI phức tạp với sự linh hoạt và kiểm soát - [GitHub Python](https://github.com/google/adk-python) - [Documentation](https://google.github.io/adk-docs/) #AI #agents #google
- **OWL (Optimized Workforce Learning)**: Hệ thống hỗ trợ đa tác nhân cho việc tự động hóa các nhiệm vụ thực tế trong thế giới thực - [GitHub](https://github.com/camel-ai/owl) #AI #agents #multi-agent
- **PraisonAI**: Framework mã nguồn mở để phát triển các ứng dụng AI agents, hỗ trợ xây dựng chatbot và các công cụ tương tác dựa trên LLM - [GitHub](https://github.com/MervinPraison/PraisonAI) #AI #agents #framework
