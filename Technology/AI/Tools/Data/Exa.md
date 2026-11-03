---
area: technology
domain: web-search
type: guide
title: Exa
description: Exa is a paid web index and retrieval API for agents. Search starts at $4 per 1,000 requests, contents at $1 per 1,000 pages, and a new account gets $10 in credits each month.
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - web-search
  - exa
  - search-api
resource: https://exa.ai/
sources:
  - id: llms
    resource: https://exa.ai/llms.txt
    author: human:Exa
  - id: pricing
    resource: https://exa.ai/docs/admin/pricing.md
    author: human:Exa
  - id: cloudflare
    resource: /Technology/AI/Tools/Agents/Cloudflare Web Search API.md
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# Exa

Exa is a search index and retrieval API built for agents. The company describes itself as an applied AI research lab. It keeps its own index of the public web plus structured collections such as companies, people, filings, papers, and jobs. The homepage at [exa.ai](https://exa.ai/) is a script-rendered shell. The page itself tells an agent to start at [exa.ai/llms.txt](https://exa.ai/llms.txt). This note follows that file and the pricing page it links.

Checked 3 November 2026. No account was created and no API call was made. The homepage claim of 500,000 developers was not counted.

## How a call is made

The pricing page says the API is served at `https://api.exa.ai`. Send the key as `Authorization: Bearer $EXA_API_KEY` or as `x-api-key`. Keys are created at [dashboard.exa.ai/api-keys](https://dashboard.exa.ai/api-keys). `llms.txt` says `/search` and `/contents` also accept x402 pay-per-request payments. The OpenAPI files at [exa-spec.yaml](https://exa.ai/docs/exa-spec.yaml) and [team-management-spec.yaml](https://exa.ai/docs/team-management-spec.yaml) are the schema source. The guides are usage advice, not the schema.

Official clients are `exa-py` (`pip install exa-py`) and `exa-js` (`npm install exa-js`). Both read `EXA_API_KEY` from the environment. A hosted MCP server at `https://mcp.exa.ai/mcp` can be tried without a key, at a limited rate. The skill install line on the pricing page is `npx skills add exa-labs/agent-skills`.

## Products and prices

The pricing page says there is no subscription and no minimum. You load credits and pay per request. A new account gets $10 in credits on the day it signs up, and the free balance resets to $10 on the first of each month. No payment method is required. Finishing onboarding adds a one-time $10 bonus. The page says $10 covers up to 2,500 Lite searches, which matches the Lite rate below. The free tier can call every endpoint.

Each base price includes up to 10 results. Every result past 10 adds $1 per 1,000 results. An Exa-written page summary adds $1 per 1,000 pages.

| Call | Base price | Note on the pricing page |
| --- | --- | --- |
| `/search` type `lite` | $4 / 1,000 requests | No separate summary meter |
| `/search` type `instant` | $4 / 1,000 | Legacy type, same price |
| `/search` type `auto` or `fast` | $7 / 1,000 | `fast` is legacy. Summaries are $1 / 1,000 pages |
| `/search` type `deep-lite` | $12 / 1,000 | About 4 seconds |
| `/search` type `deep` | $12 / 1,000 | 4 to 15 seconds |
| `/search` type `deep-reasoning` | $15 / 1,000 | Legacy. 12 to 40 seconds |
| `/contents` | $1 / 1,000 pages, per content type | `text`, `highlights`, and `summary` are billed apart |
| `/answer` | $5 / 1,000 requests | A model answer with citations |
| `/monitors` | $2 / 1,000 requests | A scheduled search for new pages |

The homepage labels latency as Lite 450 ms, Auto 1 s, and Deep about 10 s. Those are the homepage's labels. The ranges in the table are the ones next to the price.

The Agent API prices a run by an `effort` value. `minimal` is $0.012, `low` is $0.025, `medium` is $0.10, `high` is $0.50, and `xhigh` is $1.00. `auto` is metered, with a default cap of $5 per run. `ultra` uses the same meters with a default cap of $20. The meters are $0.10 per Agent Compute Unit, $0.005 per search tool call, $0.02 per email found, and $0.07 per phone number found. Exa Connect adds the upstream provider's own price on top. Zero Data Retention, a custom index, more than 25 results on the self-serve plan, and an SLA are enterprise terms, not the default plan.

## What else the index file lists

Exa Library is a set of structured collections queried through the same search call. The file names places, people, companies, job postings, earnings calls, SEC filings, stock pages, market quotes, products, events, podcasts, Wikipedia, research papers, patents, court opinions, indicators, countries, sports, and weather.

The file also lists comparison pages, including [Exa vs Brave](https://exa.ai/versus/brave). Those pages are Exa's. None of them was opened, so none of their scores is repeated here. Published evals and an open benchmark repo are linked from `llms.txt`. The runs were not repeated.

The [Cloudflare Web Search API](/Technology/AI/Tools/Agents/Cloudflare Web Search API) note already records Exa as the `exa` provider at $7.00 per 1,000, using the `auto` search type, with Zero Data Retention marked No. The $7 figure matches the `auto` row above. The enterprise-only ZDR line matches that No.

> **See also:** [Brave AI](/Technology/AI/Tools/Data/Brave AI) · [SearXNG](/Technology/AI/Tools/Data/SearXNG) · [Cloudflare Web Search API](/Technology/AI/Tools/Agents/Cloudflare Web Search API)
