---
tags:
  - area/technology
  - domain/ai-ml
  - type/resource
  - lang/vi
---

# 1. Resources

- https://github.com/modelcontextprotocol/servers

# 2. MCP

- [Grep a million GitHub repositories via MCP - Vercel](https://vercel.com/blog/grep-a-million-github-repositories-via-mcp)

# 3. MCP registry

- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Coinbase agentkit: https://github.com/coinbase/agentkit
- Open Source Generic MCP Client for testing & evaluating mcp servers and agents: https://github.com/Flux159/mcp-chat
- https://smithery.ai
- https://cursor.directory
- https://mastra.ai/mcp-registry-registry
- **GenAI Toolbox**: MCP server mã nguồn mở cho database, được phát triển bởi Google
  - Cung cấp các công cụ để tương tác với các nguồn dữ liệu thông qua ngôn ngữ tự nhiên
  - Hỗ trợ tích hợp với nhiều hệ thống cơ sở dữ liệu khác nhau
  - Cung cấp SDK và tools để quản lý các công cụ trong môi trường database
  - [GitHub](https://github.com/googleapis/genai-toolbox) #MCP #database #Google #genai

# 4. Coding CLI

- Codex: https://github.com/openai/codex

## 4.1. Openhands

**Tương đương với lập trình viên con người:** AI agents của OpenHands **có thể làm bất cứ điều gì mà một lập trình viên con người có thể làm**, bao gồm:

- **Chỉnh sửa mã nguồn** (modifying code)
- **Chạy các lệnh** (running commands)
- **Tìm kiếm thông tin trên web** (browsing the web)

# 5. Automate MCP

- browsermcp - Interact with browser: https://github.com/browsermcp/mcp

# 6. Context storage

- Up-to-date documentation for LLMs and AI code editors: https://context7.com

## 6.1. MCP Knowledge Graph

**Repository**: https://github.com/shaneholloman/mcp-knowledge-graph

**Mô tả**: MCP server cho phép lưu trữ bộ nhớ bền vững (persistent memory) cho AI models thông qua knowledge graph local. Hoạt động với Claude Code/Desktop và các platform AI tương thích MCP.

**Tính năng chính**:

- **Master Database**: Database mặc định cho tất cả operations
- **Multiple Databases**: Có thể tạo nhiều database theo context (work, personal, health, etc.)
- **Project Detection**: Tự động phát hiện và sử dụng `.aim` directory trong project
- **Location Override**: Có thể force sử dụng project hoặc global storage
- **Safe Operations**: Bảo vệ khỏi việc overwrite các file không liên quan
- **Database Discovery**: Liệt kê tất cả databases có sẵn

**Cấu trúc lưu trữ**:

- **Global**: Lưu tại `--memory-path` (ví dụ: `~/.aim/`)
- **Project-local**: Tự động sử dụng `.aim/memory.jsonl` khi có `.aim` directory trong project root
- **Master Database**: `memory.jsonl` - database mặc định
- **Named Databases**: `memory-{context}.jsonl` (ví dụ: `memory-work.jsonl`)

**Các tools có sẵn**:

- `aim_memory_store` - Lưu memories mới (people, projects, concepts)
- `aim_memory_add_facts` - Thêm facts vào memories hiện có
- `aim_memory_link` - Link hai memories với nhau
- `aim_memory_search` - Tìm kiếm memories theo keyword
- `aim_memory_get` - Lấy memories cụ thể theo tên chính xác
- `aim_memory_read_all` - Đọc tất cả memories trong database
- `aim_memory_list_stores` - Liệt kê các databases có sẵn
- `aim_memory_forget` - Xóa memories
- `aim_memory_remove_facts` - Xóa facts cụ thể từ memory
- `aim_memory_unlink` - Xóa links giữa memories

**Cấu hình**:

```json
{
  "mcpServers": {
    "Aim-Memory-Bank": {
      "command": "npx",
      "args": ["-y", "mcp-knowledge-graph", "--memory-path", "/Users/yourusername/.aim"],
      "autoapprove": ["aim_memory_search", "aim_memory_get", "aim_memory_read_all", "aim_memory_list_stores"]
    }
  }
}
```

**Safety System**:

- Mỗi memory file bắt đầu với `{"type":"_aim","source":"mcp-knowledge-graph"}`
- System từ chối ghi vào files không có marker này
- Ngăn chặn việc overwrite nhầm các JSONL files không liên quan

**AIM naming convention**:

- `.aim` directories: Tổ chức các AI memory files
- `aim_` tool prefixes: Nhóm các memory functions lại với nhau
- `_aim` safety markers: Đánh dấu an toàn trong mỗi memory file

# 7. Cursor IDE

## 7.1. Resources

- https://cursor.directory

# 8. Browser MCP

- https://github.com/BrowserMCP/mcp

# 9. MCP Inspector

- **Repository**: https://github.com/modelcontextprotocol/inspector
- **Description**: Visual inspection tool for MCP servers
- **Features**:
  - Debug and test MCP servers
  - Visual interface for MCP protocol
  - Inspect server capabilities
  - Test tools and resources

# 10. AI Agent Frameworks

- **Koog**: Framework chính thức của Kotlin để xây dựng các tác nhân AI dự đoán, chịu lỗi và sẵn sàng cho doanh nghiệp trên tất cả các nền tảng – từ dịch vụ backend đến Android, iOS, JVM và thậm chí cả môi trường trình duyệt - [GitHub](https://github.com/JetBrains/koog) #Kotlin #AI #agents #framework #enterprise
