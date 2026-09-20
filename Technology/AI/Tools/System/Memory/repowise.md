---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Repowise
description: Repowise - Codebase Intelligence cho AI và Con người (Graph + Git + Docs + Decisions + Code Health)
timestamp: "2026-09-20T00:00:00.000Z"
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
resource: https://github.com/repowise-dev/repowise
---

# Repowise - Codebase Intelligence cho AI và Con người

## Định nghĩa

**Repowise** không chỉ là một code knowledge graph — nó gộp **graph + git history + docs + "decisions" (ADR mining) + code health** thành một index duy nhất, phục vụ cả agent lẫn con người (dashboard local, PR bot). Khẩu hiệu: "Understand your codebase without paying your agent to rediscover it."

## Key Metrics

- **Stars**: ~6.7k (repo tạo 03/2026)
- **Forks**: ~713
- **License**: AGPL-3.0 hoặc bản quyền thương mại riêng

## Cài đặt & Quick Start

```bash
pip install repowise
cd /path/to/your/repo
repowise init --no-prose -y
repowise serve
```

`init` build đồng thời graph, git, decisions, health, dead-code và structural-wiki layer; tự wire Claude Code. Không cần API key cho phần lõi (deterministic).

## 10 MCP Tools (task-shaped)

Khác với các tool khác thường thiết kế theo entity (1 file, 1 symbol) buộc agent gọi chuỗi tuần tự, Repowise thiết kế theo **task**: truyền nhiều target trong 1 lần gọi, nhận lại context đầy đủ.

## Các lớp trong index

| Lớp             | Nội dung                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Graph**       | Phụ thuộc file + symbol qua 26 ngôn ngữ AST-parsed, call resolution có confidence score, communities, centrality, cycles, execution flows |
| **Git**         | Hotspot, ownership, co-change, bus factor, lịch sử bug-fix — tín hiệu hành vi mà static analysis không thấy được                          |
| **Docs**        | Wiki cho từng module/file, rebuild incremental kèm freshness/confidence score + hybrid search                                             |
| **Decisions**   | Lý do kiến trúc khai thác từ 5 nguồn index-time + con người/agent ghi nhận thủ công, mỗi claim có evidence trace                          |
| **Code health** | 49 detector xác định (defect risk, maintainability, performance) kèm refactor plan cụ thể                                                 |

## Tính năng nổi bật

- **Change risk**: `repowise risk main..HEAD` chấm điểm 0-10 dựa trên phân phối commit của chính repo, PR mode trả về directive (`may_break`, `missing_cochanges`, `missing_tests`, `tests_to_run`).
- **Test intelligence**: `repowise impacted-tests` — tìm test nào thực sự cover 1 file qua call graph, không cần coverage report; ingest được LCOV/Cobertura/Clover nếu có.
- **`repowise distill <cmd>`**: nén output lệnh (pytest, git log...) trước khi agent đọc, giữ nguyên exit code/lỗi; `repowise expand <ref>` khôi phục lại phần bị cắt.
- **Decision mining từ transcript**: bật `repowise decision source set session --on` để đọc transcript agent, phát hiện correction lặp lại ("dùng shared HTTP client, đừng raw requests") và biến thành decision record — transcript không rời máy, `--no-llm` bỏ qua bước gọi model.
- **PR Bot** (GitHub App): 1 comment/PR, edit tại chỗ mỗi lần push, im lặng nếu PR "xanh" — có blast-radius symbol-level, test thiếu, change risk, Check Run có thể gate merge.
- Tự sinh `CLAUDE.md`/`AGENTS.md` từ index nên vẫn hữu ích cho agent không hỗ trợ MCP.

## Ưu điểm

| Ưu điểm                     | Mô tả                                                                            |
| --------------------------- | -------------------------------------------------------------------------------- |
| Toàn diện hơn "graph thuần" | Kết hợp git analytics + code health + decisions, không chỉ cấu trúc code         |
| Zero LLM cho phần lõi       | Graph/risk/health/tests/dead-code/PR review đều deterministic, prose là optional |
| PR Bot miễn phí             | Review tự động ngay trên GitHub, không cần cấu hình agent                        |
| Minh bạch benchmark         | Công bố kèm sample, method, limitations và cả hàng thua trong bảng so sánh       |

## Nhược điểm

| Nhược điểm | Mô tả                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------- |
| AGPL-3.0   | Copyleft mạng — cần cân nhắc nếu tích hợp vào sản phẩm đóng, có option mua license thương mại |
| Còn trẻ    | Repo tạo 03/2026, cộng đồng/watcher còn nhỏ so với số sao                                     |
| Python     | Không native-binary như codegraph/codebase-memory-mcp, cần môi trường Python                  |

## Sử dụng khi nào

- Cần hiểu "sức khỏe" codebase (bug hotspot, ai sở hữu file nào, quyết định kiến trúc) chứ không chỉ quan hệ code thuần túy.
- Muốn PR review tự động miễn phí, không cần config thêm.
- Muốn giảm token/tool-call bằng cách nén output lệnh trước khi agent đọc.

---

**Tài liệu tham khảo**:

- [repowise-dev/repowise](https://github.com/repowise-dev/repowise)
- [repowise.dev](https://www.repowise.dev)
- [Docs](https://docs.repowise.dev)
