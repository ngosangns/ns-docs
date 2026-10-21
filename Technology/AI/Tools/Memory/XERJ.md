---
area: technology
domain: ai
type: tool
title: XERJ
description: XERJ (xerj-org/xerj, Apache-2.0, Rust) is a local-first search engine and MCP server for AI agents. One binary auto-indexes folders of code, docs, logs and PDFs into BM25, vector and hybrid search behind an Elasticsearch-compatible API, with an agent memory endpoint. Its headline claim is fewer output tokens for "reference coding". Release candidate (v1.0.0-rc.97), asks users for a field-report PR.
timestamp: "2026-10-22T00:00:00.000Z"
tags:
  - technology
  - ai
  - search
  - mcp
  - rust
  - agent-memory
  - rag
resource: https://github.com/xerj-org/xerj
---

# XERJ

[XERJ](https://github.com/xerj-org/xerj) ([xerj.org](https://xerj.org)) is one Rust binary that indexes a folder, serves it over an Elasticsearch-compatible HTTP API on port 9200, and exposes it to coding agents through MCP (`xerj mcp`) and a CLI (`xerj search`, `xerj def`, `xerj code`, `xerj gain`). Checked 2026-10-22 against the README, `ROADMAP.md`, `CHANGELOG.md`, `docs/SECURITY_MODEL.md`, the repo tree and the GitHub API. I did not install or run it, and I did not open the case study, the demo or the playground. Every performance number below comes from the project.

|           |                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source    | GitHub org `xerj-org`. Most commits (2,999) are by the org account itself; the next humans are `Vinz2168` (130) and `buger` (109)                                                              |
| License   | Apache-2.0, with a CLA (`CLA.md`, `.clabot`)                                                                                                                                                   |
| Created   | 2026-06-30                                                                                                                                                                                     |
| Version   | `ROADMAP.md` is reviewed "against `v1.0.0-rc.97` and `main`" on 2026-10-17, so it is still a release candidate. The GitHub releases list shows data "pack-*" releases at the top, not binaries |
| GitHub    | 12,713 stars, 794 forks, 140 open issues                                                                                                                                                       |
| Language  | Rust, workspace under `engine/crates/`                                                                                                                                                         |
| Platforms | Prebuilt for Linux, macOS and Windows on x86-64 and arm64; no JVM                                                                                                                              |

## What it does

- **Autoindex.** `xerj autoindex <folder>` sniffs each file, infers the dataset type and creates one typed index per dataset, with no schema. The README example: 25,329 files, 593 datasets, 83,103 live records in 158 s. It reads code (tree-sitter, so records have symbols and line numbers), CSV, JSON/JSONL, XML, YAML, SQLite, PDF, DOCX, PPTX, XLSX, EPUB, Jupyter, man pages, HTML, mail and common log formats, and has special handling for Unity projects.
- **Search.** BM25 full text, vector kNN and hybrid, using Elasticsearch's `knn`, `semantic` and aggregation syntax, so existing ES clients can point at it. The default embedder is lexical and offline; a neural embedder is opt-in and downloads about 90 MB.
- **Agent features.** `xerj init` wires it into Claude Code or Cursor (MCP plus a skill). `xerj def` gives go-to-definition as `file:line` plus signature. `/_memory/{namespace}` stores and recalls agent notes by meaning. `xerj gain` reports what it saved, "counted, not estimated" per the README.
- **Corpus Hub.** The description mentions hundreds of reference memory corpora; the data "pack-*" releases are presumably those. I did not open the hub.
- **Optional Jev rerank.** Adding `"rerank": {}` to a `_search` sends the top results' text to TypeSafe AI's Jev service. It is off until a key is set, and `[rerank] enabled = false` forbids it. A local `POST /_decide` answers similar questions by voting over labelled documents you already have, and answers under its own name `xerj-history-vote-1`, not as Jev.

## The main claim: reference coding

The README pitches "reference coding": the agent downloads open-source repos closest to the task, indexes them, and reads how they solved it before writing code. The table in the README comes from the project's own case study (8 tasks, 4 languages, 16 runs per arm, real `claude -p` token counts):

| Approach          | Output tokens |   Cost | Solved |
| ----------------- | ------------: | -----: | -----: |
| From memory only  |       260,916 | $11.18 |  11/16 |
| Grep-driven agent |        26,477 |  $3.27 |  16/16 |
| XERJ              |         9,982 |  $1.58 |  16/16 |

That is where "2.7x fewer output tokens than grep" comes from. The README also cites user field reports of "roughly 5x" and says XERJ is "neutral to harmful on popular public libraries the model already knows", so the gain is for private, niche or post-cutoff code. The case study is small and was run by the project. I did not reproduce any of it. The README's own "up to 1.06M input tokens" for grep on one corpus is likewise unreplicated.

## Security notes worth reading first

- `--insecure` turns off TLS and API-key auth, making every caller a superuser who can read or delete every index, including memory namespaces. A fresh node binds `127.0.0.1` only, and a cleartext bind elsewhere refuses to start unless explicitly allowed. Without `--insecure`, auth is on and a key is minted at `<data_dir>/admin.key`. `autoindex` needs that key via `--api-key` or `XERJ_API_KEY`.
- Do not put `--data-dir` inside a folder you autoindex. `data/` is not in the built-in ignore list, so the node would index its own storage.
- `CHANGELOG.md` "Unreleased" records CVE-2026-97406 (CERT VU#645818, published 2026-10-20): in the console API a bearer API token could mint more tokens and invitations. The fix requires a passkey-backed browser session for those actions. It was in the unreleased section when I read it, so check that your build includes it.
- `docs/SECURITY_MODEL.md` is written to list partial or absent controls honestly and says "the code is right and this document is a bug" if they disagree. I read only its opening.
- `ROADMAP.md` lists five open defects, including #1635 (autoindex at the default worker count stalled on a 13,765-file repo and the node stopped answering searches).

## Odd things about the project

- **Field-report ask.** The README says you "join" by running it and sending one short report as a PR adding a single markdown file under `user-feedback/16-agent-field-reports/`. It calls this "the only thing the project asks in return". The PRs skip the CLA. This is a community and feedback mechanism, not a license term, but it means the repo's `user-feedback/` folder is largely self-reported.
- **Promotional README.** It carries a Trendshift badge, many badges, and phrases like "community-trusted". The conformance badge "ES-YAML conformance 1366/1369" is the project's own test run.
- **Mostly one account.** The org account holds most commits, so the real number of people maintaining it is unclear from the contributor list.

## Where it fits

It sits beside the code-index and memory tools in this folder ([Codebase Memory MCP](/Technology/AI/Tools/Memory/Codebase Memory MCP), [CodeGraph](/Technology/AI/Tools/Memory/CodeGraph), [GitNexus](/Technology/AI/Tools/Memory/GitNexus), [Knowns](/Technology/AI/Tools/Memory/Knowns), [Source Code Indexing Comparison](/Technology/AI/Tools/Memory/Source Code Indexing Comparison)). The difference, going by its docs, is a general search server (ES API, logs, CSV, PDF) with code intelligence on top, instead of a code graph alone. I did not benchmark it against those tools.

## Caveats

- Still at a release candidate with 140 open issues and a recent auth-related CVE. Do not expose it beyond localhost without reading the security model.
- The headline token savings come from the vendor's own study and depend on code the model has not memorised.
- Neural search needs a model download. Air-gapped use is described in `docs/recipes/air-gapped-deployment.md`, which I did not read.
- Not checked: the playground, MCP tool list, memory API behavior, resource use on large corpora, and how the star count was reached.
