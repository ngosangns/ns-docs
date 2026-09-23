---
area: technology
domain: ai-ml
topic: javascript
type: resource
title: Coding Agents
description: AI Tools Registry | A registry distributing AI Tools and components using shadcn.
timestamp: "2026-06-19T13:43:26.163Z"
tags:
  - technology
  - ai-ml
  - javascript
resource: https://ai-tools-registry.vercel.app/
---

# 1. Resources

- [AI Tools Registry | A registry distributing AI Tools and components using shadcn.](https://ai-tools-registry.vercel.app/)

# 2. Tools

- SQL query generator with database schema context: https://github.com/sqlchat/sqlchat
- [eli64s/readme-ai: README file generator, powered by AI.](https://github.com/eli64s/readme-ai)
- **NLWeb**: Nền tảng mã nguồn mở để xây dựng giao diện hội thoại cho website, hỗ trợ MCP (Model Context Protocol) native
  - Cho phép tương tác với website bằng ngôn ngữ tự nhiên, trả về JSON sử dụng Schema.org
  - Mỗi instance NLWeb cũng hoạt động như một MCP server với method `ask` để đặt câu hỏi ngôn ngữ tự nhiên
  - Tận dụng Schema.org và RSS (được hơn 100 triệu website sử dụng) như một lớp ngữ nghĩa cho web
  - Hỗ trợ đa nền tảng: Windows, macOS, Linux
  - Vector stores: Qdrant, Snowflake, Milvus, Azure AI Search, Elasticsearch, Postgres, Cloudflare AutoRAG
  - LLMs: OpenAI, DeepSeek, Gemini, Anthropic, Inception, HuggingFace
  - [GitHub](https://github.com/nlweb-ai/NLWeb) #MCP #natural-language #Schema.org #conversational-interface
- Tạo giao diện cho website:
  - [https://library.relume.io](https://library.relume.io/) #webUI
  - **same.new**: Công cụ tạo giao diện website - [Website](https://same.new/) #webUI
  - Tool tương tự figma: https://github.com/onlook-dev/onlook
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
- **OpenCode**: AI coding agent mã nguồn mở, tương tự Claude Code nhưng 100% open source
  - **Tính năng chính:**
    - 100% mã nguồn mở, không bị ràng buộc với bất kỳ provider nào
    - Hỗ trợ nhiều model: Claude, OpenAI, Google, hoặc local models
    - Hỗ trợ LSP (Language Server Protocol) out of the box
    - Tập trung vào TUI (Terminal User Interface), được xây dựng bởi neovim users
    - Kiến trúc client/server: Có thể chạy trên máy tính và điều khiển từ xa (ví dụ từ mobile app)
  - **Agents:**
    - **build**: Agent mặc định, có quyền truy cập đầy đủ cho công việc phát triển
    - **plan**: Agent read-only cho phân tích và khám phá code, từ chối chỉnh sửa file mặc định, yêu cầu permission trước khi chạy bash commands
    - **general**: Subagent cho tìm kiếm phức tạp và các tác vụ đa bước, có thể gọi bằng `@general` trong messages
  - **Cài đặt:**
    - `curl -fsSL https://opencode.ai/install | bash`
    - Hoặc qua package managers: npm, brew, scoop, choco, paru, mise, nix
  - **Desktop App (BETA):** Có sẵn cho macOS, Windows, Linux
  - **Khác biệt với Claude Code:**
    - Provider-agnostic: Không bị khóa vào một provider cụ thể
    - Tập trung vào TUI và terminal experience
    - Kiến trúc client/server linh hoạt
  - [GitHub](https://github.com/anomalyco/opencode) #codingAgent #AI #open-source #TUI #LSP

# 4. VS Code Extensions

- https://www.gocodeo.com
- [Roo Code – Your AI-Powered Dev Team in VS Code](https://roocode.com/)
- [TabbyML/tabby: Self-hosted AI coding assistant](https://github.com/TabbyML/tabby)
- [continuedev/continue: ⏩ Ship faster with Continuous AI. Build and run custom agents across your IDE, terminal, and CI](https://github.com/continuedev/continue)
- **Kilo**: All-in-one agentic engineering platform, #1 trên OpenRouter - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Kilo.kilo) | [GitHub](https://github.com/Kilo-Org/kilocode) | [Website](https://kilo.ai/)

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

# 10. Paper to Agent

- **Paper2Agent**: Công cụ chuyển đổi các bài báo học thuật thành các tác nhân AI có thể thực thi - [GitHub](https://github.com/jmiao24/Paper2Agent) #paper #agent #academic #research
- **HumanLayer**: Công cụ giúp các AI coding agents giải quyết các vấn đề khó trong codebase phức tạp. Cung cấp cách tốt nhất để các agent AI lập trình xử lý các codebase phức tạp - [GitHub](https://github.com/humanlayer/humanlayer) #codingAgent #AI #codebase #development

# 11. Cosine AI

**Cosine** (https://cosine.sh/) là coding agent được xây dựng cho doanh nghiệp, đặc biệt tập trung vào các codebase phức tạp và môi trường bảo mật cao.

- **Tính năng chính:**
  - Coding agent tự chủ cho enterprise codebase
  - Hỗ trợ triển khai on-premise (air-gapped hoặc VPC)
  - Sử dụng model Genie 2 (proprietary model) đạt 72% pass rate trên SWE-Lancer benchmark
  - Xử lý song song nhiều task (bug fixes, features, refactors)
  - Tích hợp với GitHub, Jira, Slack
  - Tự động tạo PR, developer chỉ cần review và merge

- **Use cases:**
  - Phát triển feature bất đồng bộ, đa luồng
  - Quét và sửa bug toàn diện, viết test
  - Refactor và cập nhật library quy mô lớn
  - Nghiên cứu codebase legacy hoặc third-party ("research mode")
  - Gán task trực tiếp từ Jira, Linear, Trello, Asana, GitHub, Slack
  - Tự động tạo và cập nhật documentation
  - Tối ưu và bảo trì CI/CD pipeline
  - Sửa lỗi bảo mật và cải thiện compliance
  - Migration và hiện đại hóa frameworks, services, libraries

- **Bảo mật & Compliance:**
  - SOC 2 attested, ISO 27001 aligned
  - IP của khách hàng được bảo vệ, không training trên shared models
  - Audit logs và fine-grained access controls
  - Tích hợp với identity provider (IdP)
  - Zero data leakage, private deployments
  - Hỗ trợ các quy định nghiêm ngặt: FINRA, HIPAA, ITAR, GDPR
  - Red-team tested, encryption everywhere

- **Deployment options:**
  - Fully air-gapped, on-premise: Cài đặt hoàn toàn trên infrastructure của khách hàng, không có external dependencies
  - In your VPC: Triển khai trong VPC, chạy hoàn toàn trong cloud của khách hàng, đằng sau firewall
  - Option fine-tune trên codebase nội bộ, frameworks, hoặc ngôn ngữ (ví dụ: COBOL, Fortran) để hỗ trợ legacy systems

# 12. Dyad

**Dyad** (https://www.dyad.sh/) là AI app builder mã nguồn mở, chạy local, linh hoạt và không bị lock-in.

- **Tính năng chính:**
  - AI app builder mã nguồn mở, chạy local
  - Không bị lock-in: source code ở trên máy của bạn, dùng IDE yêu thích (VS Code, Cursor, etc.)
  - Hỗ trợ bất kỳ AI model nào, kể cả free tiers (Gemini 3, GPT-5, Claude Sonnet 4.5, etc.)
  - Tích hợp Supabase (Auth, Database, Server Functions) để build full-stack app
  - Chạy local models với Ollama cho privacy hoàn toàn
  - Trải nghiệm nhanh, mượt mà: edit, preview, undo với real-time feedback
  - 19k+ GitHub stars, 1M+ downloads, 4.9/5 reviews

- **Plans:**
  - **Dyad Free**: Local, open-source AI App Builder, không cần sign-up, bring your own API key, community support
  - **Dyad Pro** ($20/month): Exclusive Pro modes cho large codebases, 200 AI credits/month, full Dyad Academy access
  - **Dyad Max** ($79/month): 900 AI credits/month, prioritized access to office hours, reload credits anytime

- **Ưu điểm:**
  - Privacy: Chạy local, data không rời khỏi máy
  - Speed: Instant, responsive interactions
  - Flexibility: Không bị ràng buộc vendor, model, hoặc platform
  - Open source: Luôn free và mạnh mẽ

# 13. Kilo

**Kilo** (https://kilo.ai/) là all-in-one agentic engineering platform, coding agent mã nguồn mở phổ biến nhất. Hiện tại đứng #1 trên OpenRouter với 750k+ Kilo Coders và xử lý 6.1 trillion tokens/tháng.

- **Tính năng chính:**
  - **Code Generation**: Tạo code từ ngôn ngữ tự nhiên
  - **Task Automation**: Tự động hóa các tác vụ coding lặp đi lặp lại
  - **Automated Refactoring**: Tự động refactor và cải thiện code hiện có
  - **MCP Server Marketplace**: Dễ dàng tìm và sử dụng MCP servers để mở rộng khả năng của agent
  - **Multi Mode**:
    - **Architect**: Lập kế hoạch
    - **Coder**: Viết code
    - **Debugger**: Debug
    - Tạo custom modes riêng
  - **Self-checking**: Tự kiểm tra công việc của mình
  - **Terminal commands**: Chạy các lệnh terminal
  - **Browser automation**: Tự động hóa trình duyệt
  - **Latest AI models**: Hỗ trợ 500+ AI models bao gồm Gemini 3 Pro, Claude 4.5 Sonnet & Opus, GPT-5
  - **API keys optional**: Có thể dùng mà không cần API keys (với bonus credits)

- **Cài đặt:**
  - Cài đặt extension từ VS Code Marketplace
  - Tạo tài khoản để truy cập 500+ AI models với pricing minh bạch (match với provider rates)
  - Bonus: $20 credits khi top-up lần đầu

- **Tài liệu & Hỗ trợ:**
  - [GitHub](https://github.com/Kilo-Org/kilocode) - Apache-2.0 license
  - [Documentation](https://kilo.ai/docs)
  - Discord community
  - GitHub Discussions
  - Reddit community

- **Ưu điểm:**
  - Mã nguồn mở, phổ biến nhất trong cộng đồng
  - Hỗ trợ nhiều AI models, không bị lock-in
  - MCP Server Marketplace để mở rộng dễ dàng
  - Multi mode linh hoạt cho các use cases khác nhau
  - Pricing minh bạch, match với provider rates
  - Self-checking và automation mạnh mẽ

- **Use cases:**
  - Generate code từ mô tả tự nhiên
  - Automate repetitive coding tasks
  - Refactor và improve existing codebase
  - Debug và fix bugs
  - Browser automation cho testing
  - Custom workflows với custom modes
