---
area: technology
domain: agent-infrastructure
type: tool
title: ktx
description: ktx (npm @kaelio/ktx 0.16.0, Kaelio/ktx, Apache-2.0) is a local context layer that turns a SQL warehouse and team docs into a wiki and semantic layer, then serves approved metrics to coding agents over a CLI and MCP; the unscoped npm package ktx and the Khronos KTX texture format are different projects.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - agents
  - analytics
  - mcp
resource: https://github.com/Kaelio/ktx
---

# ktx

[ktx](https://github.com/Kaelio/ktx) is a local context layer for data agents, published as npm [`@kaelio/ktx`](https://www.npmjs.com/package/@kaelio/ktx). The bin is `ktx`. License Apache-2.0. The README says it is built by [Kaelio](https://www.kaelio.com/). Docs: [docs.kaelio.com/ktx](https://docs.kaelio.com/ktx). A README badge says Y Combinator P25.

Checked 2026-10-07. The GitHub repo was created 2026-05-10. Default branch `main`. Language TypeScript. 1,610 stars, 105 forks, 55 open issues. `main` HEAD is `49a4ae6` (2026-07-07, "fix(ci): repair slow sl test and sync uv.lock to 0.16.0"). `packages/cli/package.json` on that commit says `0.16.0`. npm `@kaelio/ktx` `latest` is **0.16.0**, published 2026-07-03, the same day as GitHub release tag `v0.16.0` (`a6dd8cf`). Commit search found no commits after 2026-07-07. The repo record's `pushed_at` is 2026-09-11.

Two other things use the same short name. The unscoped npm package `ktx` was `0.0.1-beta` (license ISC, empty description) on this date. Khronos KTX is a GPU texture container. `ktx-parse` is a parser for that container. Korean-rail packages also use the letters KTX. This note is only `@kaelio/ktx`.

## What it stores

The README says ktx sits on a SQL warehouse. It samples tables, keeps approved metric definitions, detects joinable columns, and ingests wiki and BI material into one searchable surface. Agents then ask for a metric instead of rewriting the canonical SQL. The README says the semantic layer resolves chasm and fan traps. That claim was not re-tested here.

The FAQ says ktx does not run a hosted service. The only data that leaves the machine is what you send to the LLM provider you configured. It also says warehouse connections are read-only and that ktx never writes to the database.

A project on disk:

| Path | Role |
| --- | --- |
| `ktx.yaml` | Project configuration. Commit it. |
| `semantic-layer/<connection-id>/` | YAML semantic sources. Commit it. |
| `wiki/global/` and `wiki/user/<user-id>/` | Shared and per-user notes. Commit them. |
| `raw-sources/<connection-id>/` | Ingest artifacts |
| `.ktx/` | Local state and secrets. Git-ignored. |

Resolution order in the README: `KTX_PROJECT_DIR`, then the nearest `ktx.yaml`, then the current directory. Scripts can pass `--project-dir`.

## Install

Node `>=22`, from `packages/cli/package.json` and the published manifest.

```bash
npm install -g @kaelio/ktx
ktx setup
ktx status
```

`ktx setup` creates or resumes a project, configures providers and connections, builds context, and installs the agent integration. If `ktx status` prints `ktx mcp start --project-dir ...`, run that before opening the agent. Other commands named in the README: `ktx ingest`, `ktx sl "revenue"`, `ktx wiki "refund policy"`. Upgrade with `npm install -g @kaelio/ktx@latest`.

The README also shows this prompt for Claude Code, Codex, Cursor, or OpenCode:

```text
Run npx skills add Kaelio/ktx --skill ktx and use the ktx skill to install
and configure ktx in this project.
```

Warehouses named in the README: PostgreSQL, Snowflake, BigQuery, ClickHouse, MySQL, SQL Server, SQLite, DuckDB, Amazon Athena, and MongoDB. Integrations named there: dbt, MetricFlow, LookML, Looker, Metabase, Sigma, Notion, and Google Drive.

LLM backends named in the FAQ: Anthropic API, Google Vertex AI, AI Gateway, the local Claude Code session through the Claude Agent SDK, and local Codex authentication through the Codex SDK. The sample `ktx status` in the README shows `claude-sonnet-4-6` and `text-embedding-3-small`. Those are the sample, not a fixed default.

The repo is a pnpm and uv workspace. `packages/cli` is the published TypeScript CLI. `python/ktx-sl` plans semantic-layer queries. `python/ktx-daemon` is the portable compute service. Root `package.json` says `pnpm@11.4.0` and Node `>=22`.

## Telemetry

Telemetry is on by default after the first `ktx` run, including an agent-started MCP server. The docs say it stays off in CI and when an opt-out is set. Opt out with any of these:

| Mechanism | Effect, from the docs |
| --- | --- |
| `KTX_TELEMETRY_DISABLED=1` | Off for that shell and its children |
| `DO_NOT_TRACK=1` | Same opt-out |
| `CI=1` | Off in CI |
| `~/.ktx/telemetry.json` with `"enabled": false` | Off for the machine, including MCP |

The telemetry page says catalog events are counts and coarse signals (command, duration, success, CLI version, Node version, OS), plus a salted hash of the project directory and the MCP client's self-reported name and version. It says they do not deliberately collect `ktx.yaml`, query results, passwords, or tokens. Error reports go to PostHog Error Tracking and can include stack frames, local file paths, and raw error messages. The same page says the `$exception` payload is not supposed to include secrets, database URLs, SQL text, schema names, row data, or user prompt text. It says raw events are kept 90 days. Full page: [docs.kaelio.com/ktx/docs/community/telemetry](https://docs.kaelio.com/ktx/docs/community/telemetry).

Slack: the invite linked from the README. Issues: [github.com/Kaelio/ktx/issues](https://github.com/Kaelio/ktx/issues).

> **See also:** [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms)
