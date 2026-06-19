---
type: Note
title: Claude Code Memory Analysis
description: Đánh giá Memory System của Claude Code và Claude-Mem
timestamp: '2026-06-19T13:43:26.086Z'
tags:
  - inbox
resource: https://code.claude.com/docs/en/memory
---
# Đánh giá Memory System của Claude Code và Claude-Mem

## Tổng quan

Tài liệu này phân tích cấu trúc memory của Claude Code (phiên bản gốc) và đánh giá xem claude-mem plugin có cần thiết hay không.

---

## 1. Cấu trúc Memory của Claude Code

Claude Code có **2 cơ chế memory chính** hoạt động từ phiên bản v2.1.59:

### 1.1 CLAUDE.md Files

| Loại | Vị trí | Phạm vi |
|------|--------|---------|
| Managed policy | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Toàn tổ chức |
| Project | `./CLAUDE.md` hoặc `./.claude/CLAUDE.md` | Team |
| User | `~/.claude/CLAUDE.md` | Cá nhân, mọi project |
| Local | `./CLAUDE.local.md` | Project cụ thể |

**Đặc điểm:**
- Viết bằng markdown, người dùng tự tạo
- Loaded vào mọi session (200 dòng đầu tiên hoặc 25KB đầu tiên)
- Áp dụng cho: build commands, coding standards, architectural decisions
- **Không tự động** - cần người dùng viết thủ công
- Có thể import thêm file với `@path/to/file`
- Hỗ trợ `.claude/rules/` cho path-specific instructions

### 1.2 Auto Memory

```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # Index, loaded vào mọi session
├── debugging.md       # Notes về debugging patterns
├── api-conventions.md # API design decisions
└── ...                # Topic files khác
```

**Đặc điểm:**
- **Tự động** - Claude tự ghi nhận kiến thức
- Chỉ load 200 dòng đầu hoặc 25KB đầu của MEMORY.md
- Topic files được đọc on-demand
- Machine-local (không sync across machines)
- Yêu cầu Claude Code v2.1.59+

**Khi nào Claude ghi nhớ:**
- Build commands
- Debugging insights
- Architecture notes
- Code style preferences
- Workflow habits

### 1.3 So sánh CLAUDE.md vs Auto Memory

| Tiêu chí | CLAUDE.md | Auto Memory |
|----------|-----------|--------------|
| **Ai viết** | Người dùng | Claude tự động |
| **Nội dung** | Instructions và rules | Learnings và patterns |
| **Phạm vi** | Project/User/Org | Per working tree |
| **Loaded** | Mọi session (full) | Mọi session (200 dòng/25KB đầu) |
| **Use case** | Coding standards, workflows | Build commands, preferences |

---

## 2. Các tính năng bổ sung của Claude Code

### 2.1 Skills System
- Load on-demand khi được invoke
- Dùng cho task-specific instructions
- Không phải memory nhưng bổ sung cho workflow

### 2.2 Hooks System
- `InstructionsLoaded` - Log which files loaded
- PreToolUse, PostToolUse hooks
- Session lifecycle hooks

### 2.3 Settings
- `autoMemoryEnabled` - Toggle auto memory
- `autoMemoryDirectory` - Custom storage location
- `claudeMdExcludes` - Exclude specific CLAUDE.md files

---

## 3. Claude-Mem: Nó thêm gì?

### 3.1 Kiến trúc của Claude-Mem

```
┌─────────────────────────────────────────────┐
│           Claude-Mem System                │
├─────────────────────────────────────────────┤
│  5 Lifecycle Hooks:                         │
│  - SessionStart                             │
│  - UserPromptSubmit                         │
│  - PostToolUse                              │
│  - Stop                                     │
│  - SessionEnd                               │
├─────────────────────────────────────────────┤
│  Worker Service (port 37777)               │
│  - Web Viewer UI                           │
│  - 10 search endpoints                     │
├─────────────────────────────────────────────┤
│  SQLite + ChromaDB                          │
│  - Sessions, observations, summaries      │
│  - Hybrid semantic + keyword search         │
└─────────────────────────────────────────────┘
```

### 3.2 Tính năng độc đáo của Claude-Mem

| Tính năng | Mô tả |
|-----------|-------|
| **AI Compression** | Tự động compress observations bằng AI |
| **3-Layer Search** | search → timeline → get_observations (~10x token savings) |
| **Progressive Disclosure** | Layered retrieval với token cost visibility |
| **Web Viewer** | Real-time memory stream tại localhost:37777 |
| **Skill-Based Search** | `mem-search` skill cho natural language queries |
| **Privacy Control** | `<private>` tags để exclude sensitive content |
| **Vector Search** | ChromaDB cho semantic search |
| **Beta Features** | Endless Mode, etc. |

### 3.3 Điểm khác biệt chính

| Khía cạnh | Claude Code gốc | Claude-Mem |
|-----------|-----------------|------------|
| **Ghi nhận** | Auto (build commands, insights) | Auto (mọi tool use observation) |
| **Compression** | Không | AI-powered |
| **Search** | File-based | Vector + keyword hybrid |
| **Token optimization** | Không | 10x savings |
| **UI** | Không | Web viewer |
| **Storage** | Markdown files | SQLite + ChromaDB |
| **Privacy tags** | Không | Có (`<private>`) |
| **Timeline context** | Không | Có |

---

## 4. Đánh giá: Claude-Mem có cần thiết không?

### 4.1 Khi Claude-Mem **CÓ价值 (Nên dùng)**

| Scenario | Lý do |
|----------|-------|
| **Long-running projects** | Duy trì context across nhiều sessions |
| **Large codebases** | 10x token savings quan trọng |
| **Need semantic search** | Tìm kiếm bằng natural language |
| **Detailed history** | Lưu trữ mọi tool use observation |
| **Privacy concerns** | `<private>` tags để kiểm soát |
| **Multi-machine** | Persistence across machines (với sync) |
| **Complex debugging** | Timeline context cho errors |

### 4.2 Khi Claude Code gốc **ĐỦ**

| Scenario | Lý do |
|----------|-------|
| **Simple projects** | CLAUDE.md + auto memory đã đủ |
| **Short sessions** | Không cần persistent context |
| **Token budget OK** | Không cần 10x optimization |
| **Privacy-first** | Claude Code local-only, không external |
| **Minimal setup** | Không cần thêm dependencies |
| **Team shared docs** | CLAUDE.md trong git đủ |

### 4.3 So sánh Chi phí & Phức tạp

| Yếu tố | Claude Code | Claude-Mem |
|--------|-------------|------------|
| **Cài đặt** | Built-in | `npx claude-mem install` |
| **Dependencies** | Không | Node.js 18+, Bun, SQLite, Chroma |
| **Resource** | Minimal | Worker service, database |
| **Maintenance** | Không | Cần update định kỳ |
| **Learning curve** | Thấp | Trung bình |

---

## 5. Khuyến nghị

### 5.1 Sử dụng **CHỈ Claude Code** khi:

```bash
# Bạn chỉ cần:
- CLAUDE.md cho coding standards
- Auto memory cho build commands
- Đơn giản, minimal setup
- Không cần semantic search
- Token budget không phải vấn đề
```

```markdown
# CLAUDE.md đơn giản
## Build
- Run `npm test` before committing

## Code Style
- Use 2-space indentation
- Prefer const over let

## Project
- API handlers in src/api/
```

### 5.2 Sử dụng **Claude-Mem** khi:

```bash
# Bạn cần:
- Tìm kiếm "where did we fix that auth bug?"
- 10x token reduction cho large projects
- Lưu trữ chi tiết mọi session
- Timeline context cho debugging
- Privacy controls với <private> tags
```

### 5.3 Decision Matrix

| Nhu cầu | Recommendation |
|---------|----------------|
| Project instructions | CLAUDE.md (đủ) |
| Build commands | Auto memory (đủ) |
| Complex project memory | CLAUDE.md + Auto memory (đủ) |
| Semantic search across history | Claude-Mem |
| Token optimization | Claude-Mem |
| Detailed tool-use history | Claude-Mem |
| Simple setup | Claude Code |

---

## 6. Kết luận

### Claude-Mem **không cần thiết** nếu:

1. Bạn chỉ cần basic project instructions → **CLAUDE.md đủ**
2. Bạn muốn Claude nhớ build commands → **Auto memory đủ**
3. Bạn thích đơn giản, không thêm dependencies
4. Token budget không phải vấn đề
5. Project không quá lớn

### Claude-Mem **nên dùng** nếu:

1. Cần semantic search qua history
2. Token optimization quan trọng (10x savings)
3. Muốn lưu trữ chi tiết mọi observation
4. Cần timeline context cho debugging
5. Privacy controls với `<private>` tags
6. Làm việc trên nhiều machines

### Tóm tắt

```
Claude Code (gốc) = 80% functionality với 20% effort
Claude-Mem = 100% functionality với 100% effort

→ Bắt đầu với Claude Code gốc
→ Thêm Claude-Mem khi cần advanced features
```

---

## 7. Tham khảo

- [Claude Code Memory Documentation](https://code.claude.com/docs/en/memory)
- [Claude-Mem GitHub](https://github.com/thedotmack/claude-mem)
- [Claude Code Settings](https://code.claude.com/docs/en/settings)

---

*Generated: 2026-04-13*
*Analysis based on official Claude Code documentation and Claude-Mem repository*