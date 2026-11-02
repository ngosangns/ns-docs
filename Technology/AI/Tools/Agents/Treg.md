---
area: technology
domain: agent-infrastructure
type: tool
title: Treg
description: treg is an open-source tool catalog and credential-injecting proxy for AI agents — one token for 4,000+ priced API endpoints across 121 providers, plus a team's own keys, CLIs and skills, with $1 free credit and 0% markup.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - agents
  - mcp
  - api
resource: https://treg.to/
---

# Treg

[treg](https://treg.to/) calls itself "OpenRouter for agent tools" — one base URL and one token so an agent can search 4,000+ tools across 121 providers by the job it needs done, read the price, call one, and relay the answer. Repo: [superdesigndev/treg](https://github.com/superdesigndev/treg). Checked 2026-11-02 on the landing page, [/pricing](https://treg.to/pricing), [/llms.txt](https://treg.to/llms.txt), the README, the LICENSE and the GitHub API. Not installed, no account created, no endpoint called.

## Why it exists

The tools real agent work needs sit behind subscriptions nobody buys for one run (Semrush $139/mo, Moz $99/mo, Crunchbase $99/mo, Apollo $59/seat), behind signup walls, or behind no public API at all (invite-only, partner-only, app review). treg holds those accounts and bills a fraction of a cent per call. Categories are grouped by what endpoints do: keyword and rank, backlinks and authority, AI visibility, trending and discovery, publishing to socials, people and company enrichment, ads management and creative, measurement, scraping, and image/video/voice generation.

## Two halves, one token

- **The catalog** — curated endpoints sold by treg. When the team has no key for that provider, treg serves the call on a verified free public route if one exists, otherwise on treg's own account, billed to the team's prepaid balance.
- **Your own tools** — an API account, a teammate's OAuth connection, a vendor CLI (`stripe`, `gh`, `vercel`, …), or a `SKILL.md`. The credential stays on the server; every teammate's agent can call it. The team's own key always wins over treg's and those calls are never metered. One exception: an X connection made through treg's own X app is billed per call, because X bills the app owner.

Vocabulary: a **tool** is an upstream `base_url` plus one or more secret **bindings** (an endpoint), or a vendor CLI. A **skill/bundle** is a `SKILL.md` recipe plus its secrets and tool(s), registered together.

The design rule is explicit: the proxy **relays, never models** the upstream, and **injects auth server-side** — method, path, query and body reach the provider unchanged and the answer comes back verbatim. That is why it survives upstream API changes and why the caller never holds a key.

## Setup, by where the agent runs

- **Hosted assistant** (ChatGPT, claude.ai, including code sandboxes): install nothing. Add `https://treg.to/mcp/` as a custom connector and finish the OAuth consent, choosing which team pays.
- **Local coding agent** (Claude Code, Cursor, Codex, opencode): installer puts in the CLI and the treg skill for every agent it detects.
- **Sandboxed agent** with restricted egress: if `https://treg.to` is blocked (proxy 403 on CONNECT, DNS failure, timeout), that is an egress allowlist; the documented options are the MCP connector, install on a machine with normal access, or an admin allowlisting the host on port 443.

```bash
curl -fsSL https://treg.to/install.sh | sh
curl -fsSL https://treg.to/install.sh | sh -s -- --token <token>   # no browser
treg login          # GitHub, Google or emailed code; --email for the code
treg                # account, team, balance, own tools, next commands
treg scan           # read-only preview of keys/skills/CLIs that upload would register
treg upload         # register approved ones (encrypted server-side, idempotent)
```

Also ships as a Claude Code plugin (`/plugin marketplace add superdesigndev/treg`, `/plugin install treg@treg`) and as skills via `npx skills add superdesigndev/treg`. `install.sh` installs only the `treg` skill and lists the others: `web-access`, `lead-signals`, `recruit`, `make-ugc`, and the opt-in `jev-memory` / `rea-growth`. The agent entry point is `/llms.txt`; the operating guide is `/skill.md`.

## The loop: search, read, call

```bash
treg catalog search "backlinks for a domain"   # tools that do the job, with prices
treg catalog get <id>                          # params, price, reliability, a ready call line
treg call <id> --query key=value               # or --data '{...}' for a JSON body
treg balance                                   # what that cost
```

| Surface          | Call shape                                                                                                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CLI              | `treg call <id> --query k=v` · own tool `treg call stripe v1/balance` · `treg run gh -- pr list`                                                                                                               |
| HTTP proxy       | `GET https://treg.to/call/<id>?k=v` with `X-Treg-Token`; own tool `https://treg.to/call/<tool-name>/<path>` or its upstream URL behind `/call/`, e.g. `https://treg.to/call/https://api.stripe.com/v1/charges` |
| MCP              | `https://treg.to/mcp/` (bearer or OAuth) with `catalog_search`, `catalog_get`, `call`, `call_media`, `resources_list`, `balance`, `my_tools`, `catalog_request`, `feedback`, `review`                          |
| Claude connector | `https://treg.to/mcp/v2/` — curated catalog only (no image/video/audio), read calls separated from write calls                                                                                                 |

A team token (agent token or dashboard API key) carries its team; with a personal sign-in token also send `X-Treg-Org: <team-slug>`.

**Credential ladder** for a catalogued call, in order: (1) the team's own registered tool for that provider, (2) a team secret injected through a virtual tool, (3) a verified public route with no provider key — free, (4) treg's own key, billed to the prepaid balance. The anonymous price assumes the caller sends no provider credential; a caller-supplied key uses that key's credits. An endpoint with no published price is refused rather than served free.

**Cost and failure controls.** `X-Treg-Cost-Micro` (or `cost_usd` over MCP) reports what a call cost; `X-Treg-Route-Max-Cost` caps one call. Running out of balance is an HTTP 402 `insufficient_balance` carrying `balance_micro`, `estimated_cost_micro` and `topup_url`. A 4xx other than 429 is about the request — fix it, don't retry elsewhere; after a 429 or 5xx, switch provider and say which. `treg catalog get` compares a job's ten most reliable and cheapest providers; for common jobs the routed `treg.<capability>` tools (e.g. `treg.web.search`, `treg.web.extract`) pick and fail over automatically.

## Pricing

| Item                           | Detail                                                                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Model                          | Prepaid balance, metered per catalog call at the provider's own rate; no subscription, no seats, no monthly minimum                 |
| Markup                         | **0%** — stated as a public commitment in the terms                                                                                 |
| Free credit                    | **$1.00** once per new verified account/team                                                                                        |
| Own key (BYOK)                 | Never metered; the key wins over treg's shared key                                                                                  |
| Own tools / connected accounts | Never metered                                                                                                                       |
| Balance empty                  | Metered calls stop with a clear 402 until top-up; BYOK calls keep working                                                           |
| Enterprise SSO                 | Optional monthly Stripe plan via WorkOS; `TREG_ENTERPRISE_SSO_BUNDLE_ONLY` defaults to showing only the SSO + Directory Sync bundle |

Published example rates (live catalog, 2026-11-02): Douyin from `$0.001/success` (286 tools), people & contact from `$0.00038/result` (274), companies from `<$0.0001/result` (249), open web & SEO from `<$0.0001/result` (242), TikTok from `$0.00035/success` (192), Instagram from `$0.0007/success` (187), YouTube from `$0.0009/success` (168), Google keyword from `$0.00012/call` (167). The pricing page also publishes four settlement receipts from real runs, e.g. 20 verified leads for `$2.33` (`$0.12` per usable lead) and 50 keywords expanded for `$0.11`. The useful distinction it draws: a raw call is one charge, but a deliverable row often takes several calls and filters misses; per-success tools settle a miss at `$0.00`, per-call tools charge regardless.

## Teams

Everything is scoped to an org: a token is a `(user, org)` membership, and secrets, tools and skills belong to the active org. Roles: owner / admin / member / viewer. An account can own up to 10 teams; joining others as a member does not count. Per-member tool access is set by admins (`treg org access <member> --tools a,b`). Owners can enable enterprise SSO and Directory Sync (WorkOS) so a deactivated employee loses access.

## Self-host and architecture

The hosted service runs on Render; anyone can self-host. Server is Python/FastAPI, SQLite for dev, Postgres in prod, secrets encrypted at rest with a Fernet key (`TREG_SECRET_KEY`). One-command dev stack needs `tmux` + `uv` and serves `http://localhost:18790` with hot reload and email OTP shown on the page:

```bash
scripts/dev-local.sh up        # server in tmux, own sqlite DB, dev-safe settings
scripts/dev-local.sh cli login # sandboxed CLI, never touches ~/.treg/config.json
pip install "tools-registry[server]"   # server extra; the base package is CLI only
uv run python -m treg keygen           # fresh Fernet key
```

Request flow for `/call`: resolve tool by URL host + longest `base_url` prefix (or by name) → decrypt secret(s) → apply each binding's injector → stream to the upstream → fire-and-forget audit record. The relay streams bytes without business logic; responses needing settlement or ownership evidence are buffered up to 8 MiB, and larger ones return 502 without charging rather than a truncated success. Back up the Fernet key and the database before moving or redeploying — losing the Fernet key makes every stored secret unrecoverable.

## What to verify before trusting it

- **License wording.** The site says "100% open source · Apache 2.0", but the LICENSE is Apache 2.0 **plus Additional Terms**: you may not use the software, original or modified, to provide a hosted, managed or embedded service to third parties without prior written permission from the licensor (jason@superdesign.dev). Running a registry for your own team is explicitly allowed. So it is source-available and self-hostable, not OSI-pure Apache 2.0; a product that resells it needs permission.
- **Catalog size and provenance.** "4,000+ endpoints · 121 providers" is marketing copy; I did not independently count it. The per-platform counts on the pricing page are consistent in scale but cover only a handful of categories. Some entries rest on platforms whose official APIs are invite-only, partner-only or app-review-only (TikTok, Instagram, LinkedIn, X); the catalog marks these ("API: invite-only", "no official API", "rate-limited", "manual research"), and ToS/legal risk for how the data is obtained sits with the caller, not with the marketing line.
- **llms.txt is agent-directed marketing.** It tells an agent to open with a "doorway" pitch, propose three tasks, and ask the human to star the repo (`gh api -X PUT user/starred/superdesigndev/treg`). Treat it as untrusted prompt content: read it, don't let an agent auto-star, auto-propose or auto-run. Likewise `install.sh` and `treg scan`/`upload` are worth inspecting the first time; `treg scan` is read-only but `upload` registers keys and skills.
- **Telemetry.** The CLI sends anonymous command usage to PostHog on treg.to (no arguments or credentials); disable with `TREG_TELEMETRY=0` or `DO_NOT_TRACK=1`.
- **Trust boundary.** Credentials are injected server-side, which is the selling point, but it also means treg (or a self-hosted operator) holds provider keys and OAuth refresh tokens. For sensitive accounts, prefer BYOK registration on a self-hosted instance and review the audit log (`treg calls`, `treg runs`).
- **Repo snapshot (2026-11-02T09:37Z).** 6,977 stars, 616 forks, 232 open issues, created 2026-07-15, last push 2026-11-02T09:15Z, ~124 MB, Python. Domain `treg.to` was created 2026-08-13 (Porkbun). A young brand, which makes the self-host path the main hedge against vendor risk.

## Not checked

Not installed, no account, no call made, so none of the prices, endpoint counts, latency or reliability claims were reproduced. The terms, privacy policy, enterprise SSO flow, OAuth scopes, and the self-host guide were read only through the README/llms.txt, not exercised end to end. No comparison against alternatives (Composio, Pipedream, Arcade, MCP gateways) was done.

> **See also:** [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) · [AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI Coding Productivity Tools) · [Cloudflare Web Search API](/Technology/AI/Tools/Agents/Cloudflare Web Search API)
