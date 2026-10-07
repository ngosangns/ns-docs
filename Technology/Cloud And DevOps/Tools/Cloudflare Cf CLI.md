---
area: technology
domain: devops
type: tool
title: Cloudflare cf CLI
description: Cloudflare's next-generation agentic CLI (cf) covering the entire Cloudflare API via OpenAPI-generated commands, cloudflare.config.ts TypeScript config, and Vite-first local development — the intended successor to Wrangler.
timestamp: "2026-09-29T00:00:00.000Z"
tags:
  - technology
  - devops
  - cloudflare
  - cli
  - agents
resource: https://github.com/cloudflare/cf
---

# Cloudflare cf CLI

[cloudflare/cf](https://github.com/cloudflare/cf) is Cloudflare's next-generation "agentic" CLI — designed for the agent era of software development and positioned as the successor to Wrangler for the entire Cloudflare API (Workers, KV, R2, D1, DNS, zones, Pages, Queues, WAF, Zero Trust/Access, Tunnels, Containers, Registrar, AI…). TypeScript, dual-licensed MIT/Apache-2.0, cross-platform (Windows/macOS/Linux). Currently in open beta: `npm i -g cf` (requires Node.js ≥ 22).

## Agent-First Design

- **Full-API coverage via generation** — ~178 product command roots are generated from a pinned Cloudflare OpenAPI spec through `@cloudflare/forge`, not hand-maintained. Every emitted command is type-checked end-to-end against the generated SDK; product knowledge (limits, batching, confirmations, error text) lives in the spec/overlays as the source of truth. `src/` stays product-agnostic — new API products need zero CLI code.
- **Command search and steering** — `cf cli search` (MiniSearch-backed) lets an agent find the right command without knowing the tree; `cf schema` dumps the JSON schema for any op; `cf tools` lists MCP tool definitions.
- **JSON as the default interface** — pretty-printed for humans on TTY, condensed for agents to save context tokens. `--quiet`, `--dry-run`, `--zone` (ID or domain name), `--profile`, `--local`, `--persist-to` as global flags.
- **`cloudflare.config.ts`** — the new configuration format for all of Cloudflare, starting with Workers: real TypeScript config gives LSP type-safety to both humans and agents. `cf migrate` converts Wrangler `wrangler.toml`/`wrangler.jsonc` configs; `cf workers types` generates `.cloudflare/types/index.d.ts`.
- **Vite by default** — local dev runs on Vite (best-in-class dev server) plus the plugin suite for framework authors; `cf dev` auto-discovers vite-plugin vs wrangler-bundler projects.
- **Local-install delegation** — Wrangler-2 style: a globally installed `cf` re-execs the project-pinned local version (`CF_DELEGATION` sentinel), so agents always run the version the repo pins.
- **Cold-start obsession** — every command is a lazy-loaded yargs shell (otherwise each invocation would import all 178 root indexes); CI runs a hyperfine benchmark of `cf --help` on every PR.

## Key Commands

```bash
npm i -g cf                        # bin aliases: cf, cloudflare
cf auth login                      # OAuth via @cloudflare/workers-auth (keyring, refresh)
cf init / cf init workers          # hello-world scaffold or autoconfig setup
cf dev                             # local dev server (Vite first; detects project type)
cf build / cf deploy               # Build Output (.cloudflare/output/v0) → upload
cf workers versions create         # Build Output upload leaf (hand-written override)
cf d1 migrations …                 # spliced into generated d1 tree
cf tunnel / cf access …            # cloudflared-backed leaves, token/ssh/tcp subcommands
cf cli search <query>              # find commands; cf schema <op>; cf tools (MCP defs)
cf complete                        # shell completions via @bomb.sh/tab (runtime-parsed)
cf migrate                         # Wrangler → cloudflare.config.ts migration
```

Generated leaves come straight from OpenAPI (`cf zones list`, `cf kv …`, `cf r2 …`); hand-written exceptions are a small, centrally-registered set (`auth`, `dev`, `build`, `deploy`, `init`, `previews`, `containers`, `tunnels`, `cli`) plus three leaf overrides where the request schema lives behind a sibling endpoint (`cf ai run`, `cf registrar registrations create`, `cf workers versions create`).

## Repo Architecture

- **Pipeline** — `pnpm build` → `turbo run generate` → fetch pinned Forge OpenAPI release → regenerate `src/sdk/` → `forge.transform` (per-command emitter) → `forge.finalize` → oxfmt. Emits yargs command modules + `_meta/` JSON sidecars (full command catalogue, hand-written provenance, per-op schemas) copied next to `dist/` so `cf --help` works post-install.
- **Bundler/build** — tsdown (Rolldown) emits chunked ESM for dynamic per-root imports; tsgo (`@typescript/native-preview`) type-checks — no `tsc`; oxfmt + oxlint-tsgolint (type-aware); pnpm 10 + turbo with remote cache.
- **Testing** — vitest + MSW harness (67 in-package test files), an imported Wrangler test corpus (118 files aliased onto cf source) as the compatibility suite, plus 114 JSON e2e fixtures driving a generated bash runner against a real Cloudflare account (out-of-band, not per-commit).
- **Auth** — OAuth tokens via `@cloudflare/workers-auth` (canonical cf config dir, credential storage/refresh/keyring); `CLOUDFLARE_API_TOKEN` env supported, global API key deliberately disabled, no Wrangler credential fallback.
- **Telemetry** — opt-out Sparrow dispatch with argument/error sanitization; `cf cli telemetry` to toggle.

> **See also:** [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools) · [File Transfer And Networking](/Technology/Cloud And DevOps/Tools/Tools Notes#file-transfer-and-networking) · [Coding Agents](/Technology/AI/Tools/Agents/Coding Agents) · [Cloudflare Web Search API](/Technology/AI/Tools/Agents/Cloudflare Web Search API)
