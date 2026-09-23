---
area: technology
domain: decision-making
type: tool
title: Think Better
description: A CLI that injects structured decision and problem-solving frameworks, with cognitive-bias warnings, into AI prompts for Claude Code, Copilot, and Antigravity.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - decision-making
  - memory
  - code-intelligence
resource: https://raw.githubusercontent.com/HoangTheQuyen/think-better/main/install.sh
---

# Think Better

## Definition

**Think-Better** is an "OS for clear thinking and better decisions". It is a tool that brings structured decision frameworks directly into AI prompts, turning generic AI responses into rigorous, structured analyses.

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

## The Two Main Skills

### `/decide` — For Choices

**Keywords**: "choose", "compare", "should I", "pros and cons"

**10 Decision Frameworks**:

| Framework            | Description                                |
| -------------------- | ------------------------------------------ |
| Reversibility Filter | Assess how reversible a decision is        |
| Weighted Matrix      | Weighted comparison                        |
| Hypothesis-Driven    | Decisions based on hypotheses              |
| Pre-Mortem           | Analyze failure before making the decision |
| Pros-Cons-Fixes      | Pros-Cons-Fixes with bias warnings         |

**12 Cognitive Bias Warnings**:

- Overconfidence
- Anchoring
- Sunk Cost
- Status Quo
- Confirmation Bias
- And 7 other biases

```bash
# Usage
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
- And 10 other methods

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
# Usage
/solve "Why is the API slow?"
/solve.quick "Quick debug this issue"
/solve.deep "Root cause analysis"
/solve.exec "Executive-level problem report"
```

## Depth Levels

| Command                          | Depth     | Records | Best For          |
| -------------------------------- | --------- | ------- | ----------------- |
| `/solve.quick` / `/decide.quick` | Quick     | 0.5×    | Fast scan         |
| `/solve` / `/decide`             | Standard  | 1.0×    | Default           |
| `/solve.deep` / `/decide.deep`   | Deep      | 1.7×    | Complex decisions |
| `/solve.exec` / `/decide.exec`   | Executive | 2.5×    | Board reports     |

## CLI Commands

```bash
think-better init       # Install skills
think-better list       # Show installed skills
think-better check      # Verify prerequisites (Python 3)
think-better uninstall  # Remove skills
think-better version    # Show version
```

## How It Works

**Architecture**: a BM25 search engine querying 160 knowledge records with depth multipliers (0.5× to 2.5×), combined with an advisor engine:

1. Classifies input (decision/problem)
2. Applies relevant frameworks
3. Detects cognitive biases
4. Generates structured output with next-step suggestions

**Auto-activation**: Think Better activates automatically when it detects a decision or problem in the conversation.

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

Add "save step-by-step" to any prompt to generate a full markdown workspace:

- Overview
- Decomposition
- Analysis
- Findings
- Synthesis
- Recommendation
- Bias warnings

## Requirements

| Method            | Requirements |
| ----------------- | ------------ |
| Binary download   | None         |
| go install        | Go 1.25+     |
| Build from source | Go 1.25+     |
| Running skills    | Python 3     |

## Strengths

| Strength            | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| Structured thinking | Turns AI into a structured decision maker                    |
| Bias detection      | Automatically detects 12 cognitive biases                    |
| Multiple frameworks | 10 decision frameworks + 15 decomposition methods            |
| Depth control       | 4 selectable levels of analysis                              |
| Easy integration    | Simple install, integrates with Claude, Copilot, Antigravity |
| CLI tool            | No code needed, runs directly                                |

## Weaknesses

| Weakness            | Description                                       |
| ------------------- | ------------------------------------------------- |
| Go-based            | Requires Go 1.25+ to build                        |
| Limited LLM support | Only supports Claude, GitHub Copilot, Antigravity |
| Not a memory system | Only a thinking framework, stores no memory       |

## When to Use

- **Complex decision making**: When you need to make an important decision
- **Problem solving**: Analyze problems using the McKinsey method
- **Bias prevention**: Recognize and avoid cognitive biases
- **Team workshops**: As a framework for group thinking
- **Strategic planning**: With the Executive depth level

---

**References**:

- [HoangTheQuyen/think-better](https://github.com/HoangTheQuyen/think-better)
- [Install Script](https://raw.githubusercontent.com/HoangTheQuyen/think-better/main/install.sh)

> **See also:** [Superpowers](/Technology/AI/Tools/Memory/Superpowers) · [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison)
