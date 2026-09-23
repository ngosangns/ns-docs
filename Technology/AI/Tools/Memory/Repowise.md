---
area: technology
domain: code-intelligence
type: tool
title: Repowise
description: A codebase intelligence tool that merges a code graph, git history, docs, architectural decisions, and code health into one index for both agents and humans.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - code-intelligence
  - memory
resource: https://github.com/repowise-dev/repowise
---

# Repowise

## Definition

**Repowise** is more than a code knowledge graph — it merges **graph + git history + docs + "decisions" (ADR mining) + code health** into a single index that serves both agents and humans (local dashboard, PR bot). Tagline: "Understand your codebase without paying your agent to rediscover it."

## Key Metrics

- **Stars**: ~6.7k (repo created 03/2026)
- **Forks**: ~713
- **License**: AGPL-3.0 or a separate commercial license

## Installation & Quick Start

```bash
pip install repowise
cd /path/to/your/repo
repowise init --no-prose -y
repowise serve
```

`init` builds the graph, git, decisions, health, dead-code, and structural-wiki layers in one go and wires up Claude Code automatically. No API key is needed for the deterministic core.

## 10 MCP Tools (task-shaped)

Unlike other tools that are typically designed around entities (one file, one symbol) and force agents into sequential call chains, Repowise is designed around **tasks**: pass multiple targets in a single call and get full context back.

## Index Layers

| Layer           | Content                                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Graph**       | File + symbol dependencies across 26 AST-parsed languages, call resolution with confidence scores, communities, centrality, cycles, execution flows |
| **Git**         | Hotspots, ownership, co-change, bus factor, bug-fix history — behavioral signals that static analysis cannot see                                    |
| **Docs**        | Per-module/file wiki, incremental rebuild with freshness/confidence scores + hybrid search                                                          |
| **Decisions**   | Architectural rationale mined from 5 index-time sources + manual notes from humans/agents, every claim with an evidence trace                       |
| **Code health** | 49 deterministic detectors (defect risk, maintainability, performance) with concrete refactor plans                                                 |

## Notable Features

- **Change risk**: `repowise risk main..HEAD` scores 0-10 based on the repo's own commit distribution; PR mode returns directives (`may_break`, `missing_cochanges`, `missing_tests`, `tests_to_run`).
- **Test intelligence**: `repowise impacted-tests` — finds which tests actually cover a file via the call graph, with no coverage report needed; it can ingest LCOV/Cobertura/Clover when available.
- **`repowise distill <cmd>`**: compresses command output (pytest, git log, ...) before the agent reads it, preserving exit codes/errors; `repowise expand <ref>` restores the truncated parts.
- **Decision mining from transcripts**: enable `repowise decision source set session --on` to read agent transcripts, detect repeated corrections ("use the shared HTTP client, not raw requests"), and turn them into decision records — transcripts never leave the machine, and `--no-llm` skips the model-call step.
- **PR Bot** (GitHub App): one comment per PR, edited in place on every push, silent if the PR is "green" — includes symbol-level blast radius, missing tests, change risk, and a Check Run that can gate merges.
- Auto-generates `CLAUDE.md`/`AGENTS.md` from the index, so it is still useful for agents without MCP support.

## Strengths

| Strength                               | Description                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| More comprehensive than a "pure graph" | Combines git analytics + code health + decisions, not just code structure            |
| Zero LLM for the core                  | Graph/risk/health/tests/dead-code/PR review are all deterministic; prose is optional |
| Free PR Bot                            | Automated review right on GitHub, no agent configuration needed                      |
| Transparent benchmarks                 | Published with samples, method, limitations, and even the rows where it loses        |

## Weaknesses

| Weakness | Description                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| AGPL-3.0 | Network copyleft — needs consideration if integrated into a closed product; a commercial license is available |
| Young    | Repo created 03/2026; community/watchers are still small relative to its star count                           |
| Python   | Not a native binary like codegraph/codebase-memory-mcp; requires a Python environment                         |

## When to Use

- You need to understand codebase "health" (bug hotspots, who owns which file, architectural decisions), not just pure code relationships.
- You want free automated PR review with no extra configuration.
- You want to cut tokens/tool calls by compressing command output before the agent reads it.

---

**References**:

- [repowise-dev/repowise](https://github.com/repowise-dev/repowise)
- [repowise.dev](https://www.repowise.dev)
- [Docs](https://docs.repowise.dev)

> **See also:** [Source Code Indexing Comparison](/Technology/AI/Tools/Memory/Source Code Indexing Comparison) · [CodeGraph](/Technology/AI/Tools/Memory/CodeGraph) · [Codebase Memory MCP](/Technology/AI/Tools/Memory/Codebase Memory MCP)
