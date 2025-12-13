---
relates:
  - "[[AI - ML]]"
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

- [AI Tools Registry | A registry distributing AI Tools and components using shadcn.](https://ai-tools-registry.vercel.app/)

# 2. Tools

- SQL query generator with database schema context: https://github.com/sqlchat/sqlchat
- [eli64s/readme-ai: README file generator, powered by AI.](https://github.com/eli64s/readme-ai)
- [https://github.com/microsoft/NLWeb](https://github.com/microsoft/NLWeb)
- Tạo giao diện cho website:
  - [https://library.relume.io](https://library.relume.io/) #webUI
  - [https://same.new](https://same.new/)
  - Tool tương tự figma: [https://github.com/onlook-dev/onlook](https://github.com/onlook-dev/onlook)
- Agent File: Agent File (.af) là định dạng mở để tuần tự hóa trạng thái của AI agent có bộ nhớ và hành vi liên tục. Nó gói gọn các thành phần của agent (lệnh hệ thống, bộ nhớ, cấu hình công cụ, cài đặt mô hình ngôn ngữ) trong một file duy nhất.
  - Chức năng chính:
    - Tuần tự hóa trạng thái: Lưu toàn bộ cấu hình, bộ nhớ, lịch sử, công cụ.
    - Chia sẻ và chuyển đổi: Dùng giữa các môi trường, framework.
    - Checkpoint & version control: Theo dõi và lưu nhiều phiên bản.
    - Import/Export linh hoạt: Hỗ trợ SDK (Python, Node.js) và API REST.
    - Agent mẫu sẵn có: Ví dụ MemGPT, agent nghiên cứu, hỗ trợ khách hàng.
  - Ưu điểm:
    - Có roadmap mở rộng (multi-agent, lưu trữ passages, schema mới).
  - Nhược điểm:
    - Phụ thuộc framework hỗ trợ (hiện chủ yếu Letta).
    - Secrets bị xoá khi export, cần xử lý riêng khi triển khai.
  - Trường hợp sử dụng:
    - Agent phức tạp cần lưu/khôi phục liên tục (như MemGPT).
    - Chia sẻ agent với cộng đồng AI.
    - Checkpoint & version control trong phát triển.

# 3. CLI

- Gemini CLI: https://github.com/google-gemini/gemini-cli
- Claude Code
  - https://z.ai
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

# 8. Các công cụ khác

- ClonewebX - Clone giao diện web nâng cao

# 9. Devin AI

**Devin** được mệnh danh là **"kỹ sư phần mềm AI đầu tiên trên thế giới"**, được phát triển bởi công ty khởi nghiệp **Cognition AI** của Mỹ. Sản phẩm này được giới thiệu lần đầu vào **ngày 12 tháng 3 năm 2024** bởi Scott Wu, CEO của Cognition AI.

**Tự chủ hoàn toàn:** Khác với các trợ lý AI khác chỉ hỗ trợ việc mã hóa, Devin có khả năng **hoạt động độc lập** khi được giao nhiệm vụ.

**Quy trình phát triển đầy đủ:** Devin có thể:

- Tự lập trình
- Sửa lỗi (debugging)
- Triển khai ứng dụng
- Hoàn thành các dự án lập trình phần mềm một cách tự động

**Hỗ trợ lập trình viên:** Devin được thiết kế để hỗ trợ lập trình viên trong quá trình phát triển phần mềm, giúp các kỹ sư thật **giảm bớt thời gian làm việc**.

Devin đại diện cho một **sáng tạo đột phá** trong lĩnh vực trí tuệ nhân tạo, mở ra khả năng tự động hóa nhiều khâu trong quy trình phát triển phần mềm và có thể thay đổi cách thức làm việc của các lập trình viên trên toàn thế giới.
