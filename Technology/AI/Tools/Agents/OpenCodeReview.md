---
area: technology
domain: coding-agents
type: tool
title: OpenCodeReview
description: Alibaba's open-source AI code review CLI (ocr) using a hybrid deterministic-pipeline + LLM-agent architecture for precise line-level comments, with delegation mode for host agents and CI/CD integrations.
timestamp: "2026-09-29T00:00:00.000Z"
tags:
  - technology
  - coding-agents
  - code-review
  - ai-tools
resource: https://github.com/alibaba/open-code-review
---

# OpenCodeReview

[OpenCodeReview](https://github.com/alibaba/open-code-review) (`ocr`) is Alibaba's open-source AI code review CLI, written in Go under Apache-2.0. It originated as Alibaba Group's internal AI review assistant — two years serving tens of thousands of developers and flagging millions of defects — before being released as open source. It reads Git diffs, sends changed files to a configurable LLM through an agent with tool-use capabilities, and produces structured review comments with line-level precision. Beyond diffs, `ocr scan` reviews whole files for auditing unfamiliar codebases with no meaningful diff.

## Architecture: Deterministic Engineering × Agent Hybrid

The core design splits responsibility between hard engineering constraints and the LLM agent.

**Deterministic engineering — steps that must not go wrong:**

- **Precise file selection** — decides exactly which files get reviewed and which are filtered, so no important change is missed.
- **Smart file bundling** — groups related files (e.g., `message_en.properties` + `message_zh.properties`) into one review unit; each bundle runs as a sub-agent with isolated context, keeping quality stable on large changesets and enabling concurrency.
- **Fine-grained rule matching** — template-engine-based rules matched to each file's characteristics (built-in ruleset covers NPE, thread-safety, XSS, SQL injection across multiple languages), keeping model attention focused.
- **External positioning and reflection modules** — independent comment-positioning and comment-reflection modules that systematically improve location accuracy and content accuracy of AI feedback.

**Agent — dynamic decisions only:**

- **Scenario-tuned prompts** — templates optimized for review, reducing token cost.
- **Scenario-tuned toolset** — distilled from large-scale production tool-call traces; the agent can read full files, search the codebase, and inspect other changed files for context.

## Why It Exists

Motivation: general-purpose agents with review skills (e.g., Claude Code) suffer on real changesets — **incomplete coverage** (agents selectively skip files on large diffs), **position drift** (reported line numbers don't match actual code), and **unstable quality** (natural-language skills fluctuate with prompt variations). Pure language-driven review lacks hard constraints.

On [AACR-Bench](https://huggingface.co/datasets/Alibaba-Aone/aacr-bench) — 50 open-source repos, 200 real PRs, 10 languages, 1,505 ground-truth issues annotated by 80+ senior engineers — OCR achieves significantly higher **Precision** and **F1** than general-purpose agents on the same underlying model, at **~1/9 the tokens** and faster wall-clock time. Recall is deliberately lower: precision over noise.

## Usage

Requires Git ≥ 2.41. Install:

```bash
npm install -g @alibaba-group/open-code-review   # `ocr` command
# also: install script, GitHub Release binary, build from source
```

Configure an LLM provider (OpenAI- and Anthropic-compatible, plus Bedrock and custom providers) via interactive `ocr config provider` + `ocr config model`, or use Delegation Mode instead.

```bash
ocr review                                   # staged + unstaged + untracked workspace changes
ocr review --from main --to feature-branch   # branch range, merge-base mode
ocr review --commit abc123                   # single commit
ocr review --from main --to feature-branch --resume <session-id>  # resume interrupted run
ocr scan --path internal/agent               # full-file scan, no diff needed
ocr review --format json --output result.json  # structured output for host agents
ocr delegate preview / ocr delegate rule <files>  # delegation mode, no LLM config needed
```

## Execution Modes and Integrations

- **Default (OCR-managed)** — OCR runs the review with its configured LLM.
- **Delegation Mode** — a host coding agent (Claude Code, Codex, Cursor, Kimi Code, OpenCode, QCA, any skill-compatible agent) performs the review with its own LLM; OCR handles file selection and rule resolution only, so no separate API key is needed.
- **Extensions/plugins** — Claude Code plugin with slash commands, Codex/Cursor/Kimi skills, OpenCode native tools, VS Code and IntelliJ IDEA extensions, MCP server for external tools, portable agent skill.
- **CI/CD** — GitHub Action (`action.yml`, `ocr-review.yml` self-reviewing workflow), GitLab CI, GitFlic CI, Gerrit.
- **Session Viewer** — browser UI to replay review sessions and mark comments fixed/ignored. OpenTelemetry telemetry for observability.

## Project Facts

- ~42k GitHub stars; OpenSSF Best Practices Gold badge; source files enforced English-only in CI; 90% coverage threshold (`make coverage`); SPDX headers on every source file.
- Contributor rules require disclosing AI usage in issues/PRs and forbid attributing commits to AI — notable for an AI-tooling project.
- Repo dogfoods itself: contributors run `ocr review` before committing, and CI runs an OCR review workflow.
- Docs site: https://open-codereview.ai/docs — [quickstart](https://open-codereview.ai/docs/quickstart), [CLI reference](https://open-codereview.ai/docs/cli-reference), [review rules](https://open-codereview.ai/docs/review-rules), [delegate](https://open-codereview.ai/docs/delegate), [CI/CD](https://open-codereview.ai/docs/cicd).

> **See also:** [AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI Coding Productivity Tools) · [Coding Agents](/Technology/AI/Tools/Agents/Coding Agents) · [Agents Overview](/Technology/AI/Tools/Agents/Agents Overview)
