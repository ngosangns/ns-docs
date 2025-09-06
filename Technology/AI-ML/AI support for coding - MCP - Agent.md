---
relates:
  - "[[Machine learning - Deep Learning - AI - ML - DL]]"
  - "[[Kho chung IT]]"
  - "[[Microservices]]"
tags:
  - machine-learning
  - deep-learning
  - ai
  - ml
  - kho-chung-it
  - microservices
  - resources
  - tools
  - cli
  - vs-code-extensions
  - devin-ai
---
# 1. Resources

# 2. Tools

- SQL query generator with database schema context: https://github.com/sqlchat/sqlchat

## 2.1. Agent File

https://github.com/letta-ai/agent-file

Agent File (.af) là **định dạng file mở để tuần tự hóa trạng thái của các AI agent có bộ nhớ và hành vi liên tục**. Được thiết kế ban đầu cho framework Letta, Agent File giúp **gói tất cả các thành phần của một AI agent trạng thái bao gồm lệnh hệ thống, bộ nhớ chỉnh sửa được (thông tin cá nhân, người dùng), cấu hình công cụ (mã nguồn và sơ đồ JSON), cùng với cài đặt mô hình ngôn ngữ LLM** vào một file duy nhất[3].

### 2.1.1. Chức năng chính của Agent File (.af)

- **Tuần tự hóa trạng thái agent**: Bao gồm toàn bộ các trạng thái để tái tạo chính xác agent ban đầu (cấu hình mô hình, lịch sử hội thoại, lệnh hệ thống, bộ nhớ, công cụ).
- **Chuyển đổi và chia sẻ agent giữa các môi trường và framework tương thích**.
- **Checkpoint và version control**: Theo dõi sự thay đổi trạng thái agent qua thời gian bằng cách lưu các phiên bản khác nhau.
- **Hỗ trợ import/export agent dễ dàng với SDK (Python, Node.js) hoặc API REST**.
- **Hỗ trợ nhiều loại agent mẫu để tải xuống và sử dụng ngay**, ví dụ MemGPT với quản lý bộ nhớ vô hạn, agent nghiên cứu sâu, hỗ trợ khách hàng, và workflow không giữ trạng thái[1].

### 2.1.2. Ưu điểm

- **Tính di động cao**: Cho phép di chuyển AI agent có trạng thái qua lại giữa các nền tảng hoặc môi trường thử nghiệm khác nhau.
- **Tiện lợi khi phát triển và cộng tác**: Dễ dàng chia sẻ agent với người khác, cũng như đóng góp vào cộng đồng.
- **Quản lý trạng thái đầy đủ**: Bao gồm nhiều thành phần như memory blocks, tool rules, môi trường cấu hình, giúp việc tái khởi động agent trở nên chính xác.
- **Hỗ trợ đa dạng công cụ và tùy chỉnh agent**.
- **Có roadmap phát triển để mở rộng tính năng (hỗ trợ multi-agent, bộ nhớ lưu trữ dạng passages, nguồn dữ liệu, chuyển đổi schema giữa các phiên bản)**.

### 2.1.3. Nhược điểm

- **Phụ thuộc vào framework hỗ trợ**: Hiện chủ yếu tích hợp sâu với Letta, các framework khác cần tự chuyển đổi trạng thái và có thể không hỗ trợ hoàn toàn một số tính năng như context window blocks.
- **Chưa hỗ trợ đầy đủ một số tính năng nâng cao như Passages của Archival Memory theo roadmap**.
- **Khi export agent chứa secrets, các giá trị bí mật sẽ bị xoá để bảo mật (đặt bằng null), nên cần xử lý riêng khi deploy ngoài môi trường phát triển**.

### 2.1.4. Usecases (Trường hợp sử dụng)

- **Phát triển agent có trạng thái phức tạp cần lưu trữ và khôi phục liên tục** (ví dụ như MemGPT với bộ nhớ dài hạn).
- **Chia sẻ agent giữa các nhà phát triển và cộng đồng AI** mà không lo mất các thành phần cấu hình hoặc bộ nhớ tùy chỉnh.
- **Checkpoint và version control agent để dễ dàng rollback hoặc track quá trình phát triển agent**.
- **Xây dựng và triển khai các loại agent đa dạng từ nghiên cứu, hỗ trợ khách hàng cho đến các workflow tự động**.
- **Nền tảng khởi điểm cho đa-agent và hợp tác agent trong tương lai khi định dạng tiếp tục được hoàn thiện**.

Tóm lại, **Agent File (.af)** là giải pháp tiêu chuẩn mở, giúp chuẩn hóa cách lưu trữ, chia sẻ và quản lý trạng thái các AI agent đa dạng, đặc biệt phù hợp với các hệ thống cần có bộ nhớ và hành vi phức tạp, hỗ trợ phát triển đa framework trong tương lai[3].

[1] https://github.com/letta-ai/agent-file
[2] https://viblo.asia/p/tim-hieu-ve-ai-agents-llm-agents-GyZJZQ8Z4jm
[3] https://blog.slimcrm.vn/ai-agent-la-gi
[4] https://base.vn/blog/ai-agent-la-gi/
[5] https://www.reddit.com/r/AI_Agents/comments/1glzob6/tutorial_on_building_agent_with_memory_using_letta/?tl=vi
[6] https://www.getguru.com/vi/reference/github-wiki-ai-agent

# 3. CLI

- Gemini CLI: https://github.com/google-gemini/gemini-cli
- Claude Code
- Rovo Dev
- [QwenLM/qwen-code: qwen-code is a coding agent that lives in digital world.](https://github.com/QwenLM/qwen-code)
- [charmbracelet/crush: The glamourous AI coding agent for your favourite terminal 💘](https://github.com/charmbracelet/crush)

# 4. VS Code Extensions

- https://www.gocodeo.com
- [Roo Code – Your AI-Powered Dev Team in VS Code](https://roocode.com/)
- [TabbyML/tabby: Self-hosted AI coding assistant](https://github.com/TabbyML/tabby)
- [continuedev/continue: ⏩ Ship faster with Continuous AI. Build and run custom agents across your IDE, terminal, and CI](https://github.com/continuedev/continue)

# 5. IDE

- [Kiro: The AI IDE for prototype to production](https://kiro.dev/)
- Cursor
- Winsurf
- Zed Editor

# 6. Local agent

- [All-Hands-AI/OpenHands: 🙌 OpenHands: Code Less, Make More](https://github.com/All-Hands-AI/OpenHands)

# 7. Các công cụ khác

- ClonewebX - Clone giao diện web nâng cao
- Tạo sandbox để run agent: [daytonaio/daytona: Daytona is a Secure and Elastic Infrastructure for Running AI-Generated Code](https://github.com/daytonaio/daytona)

# 6. Các công cụ khác

- ClonewebX - Clone giao diện web nâng cao

# 7. Devin AI

**Devin** được mệnh danh là **"kỹ sư phần mềm AI đầu tiên trên thế giới"**, được phát triển bởi công ty khởi nghiệp **Cognition AI** của Mỹ. Sản phẩm này được giới thiệu lần đầu vào **ngày 12 tháng 3 năm 2024** bởi Scott Wu, CEO của Cognition AI.

**Tự chủ hoàn toàn:** Khác với các trợ lý AI khác chỉ hỗ trợ việc mã hóa, Devin có khả năng **hoạt động độc lập** khi được giao nhiệm vụ.

**Quy trình phát triển đầy đủ:** Devin có thể:

- Tự lập trình
- Sửa lỗi (debugging)
- Triển khai ứng dụng
- Hoàn thành các dự án lập trình phần mềm một cách tự động

**Hỗ trợ lập trình viên:** Devin được thiết kế để hỗ trợ lập trình viên trong quá trình phát triển phần mềm, giúp các kỹ sư thật **giảm bớt thời gian làm việc**.

Devin đại diện cho một **sáng tạo đột phá** trong lĩnh vực trí tuệ nhân tạo, mở ra khả năng tự động hóa nhiều khâu trong quy trình phát triển phần mềm và có thể thay đổi cách thức làm việc của các lập trình viên trên toàn thế giới.
