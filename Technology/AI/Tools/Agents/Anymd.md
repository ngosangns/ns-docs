---
area: technology
domain: agent-infrastructure
type: tool
title: Anymd
description: anymd reads a public URL into structured Markdown, stores it in a private library, and serves it through a URL prefix, REST, CLI, and a remote MCP server.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - agents
  - mcp
resource: https://anymd.cc/
---

# Anymd

[anymd](https://anymd.cc/) (repo [digitopvn/anymd](https://github.com/digitopvn/anymd), MIT, Digitop.ai, copyright 2026) turns a public URL into structured Markdown and, when signed in, keeps that result in a private library an agent can search. Docs checked 2026-10-07: [quickstart](https://anymd.cc/docs/quickstart) (updated 2026-10-04), [URL API](https://anymd.cc/docs/url), [REST](https://anymd.cc/docs/api), [MCP](https://anymd.cc/docs/mcp), [library and search](https://anymd.cc/docs/library-search), [sources](https://anymd.cc/docs/sources), [billing](https://anymd.cc/docs/billing). The GitHub page opened on branch `dev`. The README says CI deploys `dev` to staging.anymd.cc and `main` to anymd.cc.

It reads only URLs a user or their agent asks for. No autonomous crawl, no login, paywall, or CAPTCHA bypass. Private networks, localhost, internal hostnames, and URLs with credentials are blocked. Before a fetch it checks `robots.txt` for the token `anymd` or `*`: `403 robots_disallowed` if disallowed, `503 robots_unreachable` if robots.txt cannot be read. A shared per-minute budget returns `429 domain_rate_limited`. Owner opt-out returns `403 site_opted_out` on every channel. Those refusals cost 0 credits. Abuse and takedown: [Site Owners & Abuse](https://anymd.cc/legal/abuse).

## Surfaces

Prefix any public URL with `anymd.cc/`. `curl https://anymd.cc/stephango.com/saw` returns Markdown plus YAML (title, author, source, kind, word count). `Accept: application/json` or `?format=html` changes the shape. Anonymous use is 50 conversions a day per IP and nothing is saved.

A key (`amd_…`, shown once) counts the call against credits and saves it. The same key works on the prefix, `POST /api/v1/convert`, the CLI, and MCP. Response headers `X-Anymd-Credits` and `X-Anymd-Cache` say what the call cost. `fresh=1` skips the cache and is billed as a new conversion. `save=0`, `"save": false`, `--no-save`, or MCP `save: false` skips the library.

CLI, installed from a tarball rather than an npm name:

```bash
npm i -g https://cdn.anymd.cc/cli/anymd-cli-latest.tgz
anymd login --key "$ANYMD_API_KEY"
anymd https://stephango.com/saw
```

Remote MCP is `https://anymd.cc/mcp`, Streamable HTTP, stateless JSON. Auth is `Authorization: Bearer amd_…` or OAuth 2.1 with dynamic client registration and PKCE (`/.well-known/oauth-authorization-server`). Tools appear only for scopes the key holds. Browser WebMCP is a separate docs page: [WebMCP](https://anymd.cc/docs/webmcp).

| Tool | Needs |
| --- | --- |
| `read_url` `{ url, save?, fresh? }` | `convert`. Saving also needs `library:write` |
| `convert_url` | Same tool, old name. New clients use `read_url` |
| `search_library` `{ query, mode?, limit? }` | `library:read` |
| `get_document`, `list_documents` | `library:read` |
| `delete_document` | `library:write` |
| `usage_summary` | `usage:read` |

Page tools (`list_pages`, `apply_page_ops`, `publish_page`, posts) need `pages:*` or `content:*`. `apply_page_ops` returns `revision_conflict` if `baseRevision` is stale. A missing tool means the key lacks that scope (`GET /api/v1/me` or `anymd whoami`). `401 invalid_api_key` means revoked, expired, or mistyped. `402 quota_exceeded` means the Free plan is out of credits for the month.

## What a conversion returns

The `kind` field and the `X-Anymd-Kind` header name the adapter. HTML limit is 5 MB. File limit is 20 MB. PDFs, Office files, and images use Cloudflare Workers AI `toMarkdown`.

| Source | `kind` | Credits |
| --- | --- | --- |
| Web page | `web` | 1 |
| X / Twitter, via the FxTwitter API (posts, Articles, quotes, polls, media, engagement counts) | `x` | 1 |
| GitHub README, issue, PR, discussion | `github` | 1 |
| Reddit thread with comments | `reddit` | 1 |
| Hacker News story plus top 20 threads, up to 3 replies, nested 3 levels, official API | `hackernews` | 1 |
| Plain text, Markdown, or JSON URL | `text` | 1 |
| YouTube watch, youtu.be, Shorts, Live. Title and channel from oEmbed. Timestamped transcript from a third-party caption provider. `lang` prefers a language. No transcript still returns metadata and is still charged | `youtube` | 3 |
| PDF, or DOCX, XLSX, XLS, ODS, ODT, CSV | `pdf` or `document` | 3 |
| JPEG, PNG, WebP, SVG: vision description and transcription | `image` | 5 |

Cache hit, failed conversion, library search, and MCP reads cost 0. Other content types return `415 unsupported_type`. If a client-rendered page comes back almost empty, anymd retries once with its bot user agent and keeps the richer body. It always identifies as `anymd`. GitHub is fetched with the bot user agent first. `selector`, `images=0`, and `lang` are caller overrides on the URL API.

Not available yet, listed as planned on the sources page (2026-09-26): audio and podcasts, speech-to-text for video other than YouTube captions, Facebook, LinkedIn, Threads, TikTok, Notion, Google Docs, EPUB. The general web pipeline may still pull some text from those URLs. That is not a dedicated adapter.

## Library search

One document per source URL. Converting it again refreshes the row. Metadata includes title, author, domain, site, published date, language, kind, word count, and tags. Keyword search works as soon as the row is saved. Semantic indexing (Workers AI `bge-m3` in Vectorize) follows in the background. Every query is filtered to that user id. Free keeps 1,000 documents. Paid plans are unlimited.

| Mode | What it does |
| --- | --- |
| `hybrid` (default) | BM25 plus semantic, merged with Reciprocal Rank Fusion, k = 60. Score is the sum of `1 / (60 + rank)` across lists |
| `bm25` | SQLite FTS5 over title, description, body, domain, and tags. Title and tags weigh most |
| `fulltext` | Raw FTS5: phrases, `AND` / `NOT`, prefix `embed*`, column filters such as `title:markdown`. Invalid syntax falls back to plain keywords |
| `semantic` | Vectorize only |

`q` uses up to 500 characters. `limit` defaults to 10 and caps at 50. `fanout=1` asks a small model for up to three query variants (synonym, narrower, broader), runs them, and fuses the lists. If the rewrite fails, the original query runs. `decide=1` may call Jev when the gap between rank 1 and rank 2 is under 25% of rank 1's score. On Free, both flags are skipped and named in the response `gated` array. Pro and above can use them.

Jev here is TypeSafe System One, a tie-breaker over candidates already in that user's library. It reorders only when its top probability has a clear margin. Timeout, error, or low confidence leaves the fused order. Emails and strings that look like API keys are masked before the query is sent. The `jev` field reports `used`, `choice`, `confidence`, and a `reason` (`decided`, `low_confidence`, `none`, `disabled`). This is not the [Decision 2.0](/Technology/AI/Concepts/LLM And Generative AI/Decision 2.0) model family. The docs use the same short name for a different system.

Snippets from keyword hits wrap matches in `<mark>`. `created_at` is Unix milliseconds.

## Credits

Checked against the billing page updated 2026-10-04. One credit is one ordinary web page. Credits reset at the start of each calendar month, UTC. Payments go through Polar.sh. API keys cannot start checkout. `POST /api/v1/billing/checkout` and the portal need a browser session.

| Plan | Price | Credits / month | Past the included credits |
| --- | --- | --- | --- |
| Free | $0 | 100 | Hard stop. Search and reads still work. New conversions return `402` |
| Pro | $9/mo, or $7/mo when billed yearly | 10,000 | $1 per extra 1,000 |
| Scale | $49/mo, or $39/mo when billed yearly | 100,000 | $0.60 per extra 1,000 |
| Enterprise | Custom | Custom | $0.40 per 1,000 |

Launch code `LAUNCH30` is 30% off until 2026-10-31. `COMEBACK20` is 20% off for 48 hours after it is shown. The pricing page is the live list of extras.

## Self-host

One Cloudflare Worker. Create a D1 database, KV namespaces `OAUTH_KV` and `CACHE`, an R2 bucket, and a 1024-dimension Vectorize index with metadata indexes on `user_id` and `doc_id`. Point `wrangler.jsonc` at the account, apply `migrations/` with `wrangler d1 migrations apply`, set secrets named in `src/env.ts`, then `npm install && npm run deploy:production`. Guide: [self-host](https://anymd.cc/docs/self-host).

> **See also:** [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) · [Cloudflare Web Search API](/Technology/AI/Tools/Agents/Cloudflare Web Search API)
