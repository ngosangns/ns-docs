---
area: technology
domain: ai-ml
topic: memory-code-intelligence
type: resource
title: Think Better
description: Think-Better - OS for Clear Thinking & Better Decisions
timestamp: '2026-06-19T13:43:26.089Z'
tags:
  - technology
  - ai-ml
  - memory
  - code-intelligence
resource: https://raw.githubusercontent.com/HoangTheQuyen/think-better/main/install.sh
---
# Think-Better - OS for Clear Thinking & Better Decisions

## Định nghĩa

**Think-Better** là "Hệ điều hành cho tư duy rõ ràng và quyết định tốt hơn". Đây là công cụ đưa các decision frameworks có cấu trúc trực tiếp vào AI prompts, biến đổi các phản hồi AI generic thành các phân tích có cấu trúc và chặt chẽ.

## Installation

```bash
# macOS / Linux
curl -sSL https://raw.githubusercontent.com/HoangTheQuyen/think-better/main/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/HoangTheQuyen/think-better/main/install.ps1 | iex

# Alternative: Go install
go install github.com/HoangTheQuyen/think-better/cmd/make-decision@latest
```

## Setup

```bash
think-better init --ai claude      # Claude Code
think-better init --ai copilot     # GitHub Copilot
think-better init --ai antigravity # Antigravity
```

## Hai Skills chính

### `/decide` — For Choices

**Keywords**: "choose", "compare", "should I", "pros and cons"

**10 Decision Frameworks**:

| Framework | Mô tả |
|-----------|-------|
| Reversibility Filter | Đánh giá mức độ reversible của quyết định |
| Weighted Matrix | So sánh có trọng số |
| Hypothesis-Driven | Quyết định dựa trên hypothesis |
| Pre-Mortem | Phân tích thất bại trước khi quyết định |
| Pros-Cons-Fixes | Pros-Cons-Fixes with bias warnings |

**12 Cognitive Bias Warnings**:
- Overconfidence
- Anchoring
- Sunk Cost
- Status Quo
- Confirmation Bias
- Và 7 biases khác

```bash
# Sử dụng
/decide "Should we migrate from React to Next.js?"
/decide.quick "Choose between AWS vs GCP"
/decide.deep "Enterprise migration decision"
/decide.exec "Board-level strategic decision"
```

### `/solve` — For Problems

**Keywords**: "solve", "debug", "root cause", "I'm stuck"

**7-Step McKinsey Method**:
1. Define → 2. Decompose → 3. Prioritize → 4. Analyze → 5. Synthesize → 6. Communicate → 7. Recommend

**15 Decomposition Methods**:
- Issue Tree
- MECE (Mutually Exclusive, Collectively Exhaustive)
- Hypothesis Tree
- Profitability Tree
- Systems Map
- Và 10 methods khác

**12 Mental Models**:
- First Principles
- Inversion
- Bayesian Updating
- Pareto Principle

**10 Communication Patterns**:
- Pyramid Principle
- BLUF (Bottom Line Up Front)
- SCR (Situation-Complication-Resolution)
- Action Titles

```bash
# Sử dụng
/solve "Why is the API slow?"
/solve.quick "Quick debug this issue"
/solve.deep "Root cause analysis"
/solve.exec "Executive-level problem report"
```

## Depth Levels

| Command | Depth | Records | Best For |
|---------|-------|---------|----------|
| `/solve.quick` / `/decide.quick` | Quick | 0.5× | Fast scan |
| `/solve` / `/decide` | Standard | 1.0× | Default |
| `/solve.deep` / `/decide.deep` | Deep | 1.7× | Complex decisions |
| `/solve.exec` / `/decide.exec` | Executive | 2.5× | Board reports |

## CLI Commands

```bash
think-better init       # Install skills
think-better list       # Show installed skills
think-better check      # Verify prerequisites (Python 3)
think-better uninstall  # Remove skills
think-better version    # Show version
```

## How It Works

**Architecture**: BM25 search engine querying 160 knowledge records với depth multipliers (0.5× to 2.5×), kết hợp với advisor engine:
1. Classifies input (decision/problem)
2. Applies relevant frameworks
3. Detects cognitive biases
4. Generates structured output với next-step suggestions

**Auto-activation**: Think Better tự động kích hoạt khi phát hiện decision hoặc problem trong conversation.

### Example Flow

```
User: "Should we migrate from React to Next.js?"

Think Better:
1. Detects: Binary Choice
2. Applies: Reversibility Filter framework
3. Warns: Overconfidence Bias, Status Quo Bias
4. Output: Weighted comparison matrix with recommendations
```

## Step-by-Step Workspace

Thêm "save step-by-step" vào bất kỳ prompt nào để generate full markdown workspace:
- Overview
- Decomposition
- Analysis
- Findings
- Synthesis
- Recommendation
- Bias warnings

## Requirements

| Method | Requirements |
|--------|--------------|
| Binary download | None |
| go install | Go 1.25+ |
| Build from source | Go 1.25+ |
| Running skills | Python 3 |

## Ưu điểm

| Ưu điểm | Mô tả |
|---------|-------|
| Structured thinking | Biến AI thành structured decision maker |
| Bias detection | Tự động phát hiện 12 cognitive biases |
| Multiple frameworks | 10 decision frameworks + 15 decomposition methods |
| Depth control | 4 mức độ phân tích tùy chọn |
| Easy integration | Cài đặt đơn giản, tích hợp với Claude, Copilot, Antigravity |
| CLI tool | Không cần code, chạy trực tiếp |

## Nhược điểm

| Nhược điểm | Mô tả |
|------------|-------|
| Go-based | Cần Go 1.25+ để build |
| Limited LLM support | Chỉ hỗ trợ Claude, GitHub Copilot, Antigravity |
| Không phải memory system | Chỉ là thinking framework, không lưu trữ memory |

## Sử dụng khi nào

- **Complex decision making**: Khi cần đưa ra quyết định quan trọng
- **Problem solving**: Phân tích vấn đề theo phương pháp McKinsey
- **Bias prevention**: Nhận diện và tránh cognitive biases
- **Team workshops**: Như framework cho group thinking
- **Strategic planning**: Với Executive depth level

---

**Tài liệu tham khảo**: 
- [HoangTheQuyen/think-better](https://github.com/HoangTheQuyen/think-better)
- [Install Script](https://raw.githubusercontent.com/HoangTheQuyen/think-better/main/install.sh)