---
area: technology
domain: codegraph
type: tool
title: CodeGraph
description: CodeGraph is an MIT-licensed code knowledge graph with a native Rust kernel, auto-sync, and surgical context retrieval for coding agents.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - codegraph
  - memory
  - code-intelligence
resource: https://github.com/colbymchenry/codegraph
---

# CodeGraph

## Definition

**CodeGraph** is a code knowledge graph focused on **speed and "surgical context"**. A Rust kernel parses every symbol, call edge, and dependency in the codebase into a graph, so an agent needs only a single `codegraph_explore` command to get exactly the code it needs instead of crawling file by file with grep/glob/Read.

## Key Metrics

- **Stars**: ~71.5k (repo created 01/2026)
- **Forks**: ~4.6k
- **License**: MIT

## Installation and Quick Start

```bash
# macOS / Linux — no Node.js required
curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh

# or via npm
npm i -g @colbymchenry/codegraph

# 1. Wire up the agent (Claude Code, Cursor, Codex, opencode, Hermes Agent, Gemini, Antigravity, Kiro, GitHub Copilot)
codegraph install

# 2. Build the graph for a project
cd your-project
codegraph init
```

`codegraph upgrade` and `codegraph uninstall` are available to update or remove everything (including the config written into each agent).

## Architecture and Performance

- **Native Rust kernel** for 20 languages (TypeScript, JS, Java, Python, Go, C, C++, Rust, C#, Ruby, PHP, Swift, Kotlin, Scala, Dart, R, Lua, Luau — Metal/CUDA go through the C++ path); each language ships only when its graph comes out "byte-for-byte identical" to the reference engine on real repos.
- **Auto-sync**: a file watcher using OS-native events (FSEvents/inotify/ReadDirectoryChangesW) keeps the graph up to date whenever the agent or the user edits files — no manual reindex command needed.
- **Scales to the machine**: worker pool and cache size follow the real core count (container/cgroup-aware) and measured available RAM — a 2-core/6GB VPS still indexes the Linux kernel (70k files) in under 12 minutes; a fully parallel workstation indexes the Swift compiler repo (27k files) in ~100s, and re-syncing a single file takes ~4s.
- FTS5 full-text search, impact analysis (callers/callees/blast radius).

## Benchmark (self-published, 2026-08)

Measured on headless Claude Opus 4.8, with the `codegraph` CLI blocked in both arms to prevent cheating, across 7 real OSS repos (VS Code, Excalidraw, Django, Tokio, OkHttp, Gin, Alamofire), median of 4 runs:

- **Average**: 88% fewer tool calls, 53% faster, 62% fewer tokens, 44% cheaper, 0 file reads on all 7 repos.
- **Publicly disclosed trade-off**: context left in the conversation window after a multi-turn session is ~80% higher than with a grep-and-read agent (because it returns one dense payload instead of many small results that get evicted gradually).

## Other Features

- **Anonymous telemetry is on by default** (only tool/command/language usage statistics; no code, paths, or queries are sent) — turn it off with `codegraph telemetry off` or `DO_NOT_TRACK=1`.
- A SaaS product, the "CodeGraph platform" (PR-level test/impact prediction), is on a waitlist.
- Verified releases: built through public GitHub Actions, with npm provenance and attested builds.

## Pros

| Pro                   | Description                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ |
| No Node.js required   | Installs via one script that downloads a prebuilt binary and bundles its own runtime |
| Smooth auto-sync      | The graph keeps up with changes in real time, no reindex needed                      |
| MIT license           | No commercial restrictions                                                           |
| Transparent benchmark | Publishes both the methodology and the downside (lingering context)                  |

## Cons

| Con                               | Description                                                                                                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installs via `curl \| sh`         | The usual supply-chain risk of any installer like this; consider using npm or inspecting the script before running it                                       |
| Telemetry on by default           | You must actively turn it off if you don't want to send statistics                                                                                          |
| Young repo, very fast star growth | Reached ~71.5k stars after being created in 01/2026 — growth far above the norm, so verify independently before fully trusting the self-published benchmark |

## When to Use

- You need maximum speed and a graph that stays "fresh" while an agent keeps editing code.
- You are comfortable with the npm/CLI ecosystem and don't mind installing a native binary.
- You prefer the MIT license and don't want commercial restrictions like those of GitNexus/Repowise.

---

**References**:

- [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)
- [Documentation & Website](https://colbymchenry.github.io/codegraph/)
- [getcodegraph.com](https://getcodegraph.com) (SaaS waitlist)

> **See also:** [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison) · [Source Code Indexing Comparison](/Technology/AI/Tools/Memory/Source Code Indexing Comparison) · [Code Review Graph](/Technology/AI/Tools/Memory/Code Review Graph)
