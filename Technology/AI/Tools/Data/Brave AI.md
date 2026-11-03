---
area: technology
domain: web-search
type: guide
title: Brave AI
description: Brave's AI page covers Ask Brave, the Leo browser assistant, and the Brave Search API. The API serves its own index at $5 per 1,000 search requests, with $5 of free credit a month.
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - web-search
  - brave
  - search-api
resource: https://brave.com/ai/
sources:
  - id: ai-page
    resource: https://brave.com/ai/
    author: human:Brave Software
  - id: api-page
    resource: https://brave.com/search/api/
    author: human:Brave Software
  - id: pricing
    resource: https://api-dashboard.search.brave.com/documentation/pricing
    author: human:Brave Software
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# Brave AI

Brave AI is the name on [brave.com/ai](https://brave.com/ai/) for three products from Brave Software, Inc. Ask Brave writes an answer on the search results page. Leo is the assistant inside the Brave browser. The Brave Search API lets a program query Brave's own index. The page footer says © 2015–2026 and gives the address as 48 2nd St, Floor 3, San Francisco, CA 94105.

Checked 3 November 2026 by fetching the AI page, the [API page](https://brave.com/search/api/), and the [pricing page](https://api-dashboard.search.brave.com/documentation/pricing). No account was created and no API call was made. Benchmark charts on the API page were not re-run.

## Ask Brave and Leo

Ask Brave is the answer box inside Brave Search. The AI page says Brave Search answers more than 50 million queries a day, and that about one third of those queries trigger an AI summary. It then calls Brave Search the most widely used answer engine by volume. Those three sentences are Brave's. This note did not count queries.

Leo is the in-browser assistant. The page says a chat needs no account, and that Leo does not retain chats, share them, or use them for model training. The listed pre-installed model families are Claude, DeepSeek, Gemma, Llama, and Qwen, and the page also says you can bring your own model. A linked headline says chats with the open-weight GLM 5.3 Flash model are end-to-end encrypted, use Oblivious HTTP, and run inside an Nvidia trusted execution environment. That headline was not opened.

The same page says Brave's browser agent is off by default and needs a feature flag. It runs in an isolated profile so it cannot read other tabs, and it asks before it completes an action. The comparison table on that page says Duck.ai keeps chats at most 30 days, Gemini 18 to 36 months, and Copilot up to 18 months. Those retention figures are Brave's table. They were not checked against those vendors.

## The Search API

The base URL in the page samples is `https://api.search.brave.com/res/v1`. Requests send the key in the `X-Subscription-Token` header. The samples on the AI page show these paths.

| Path | What the sample returns |
| --- | --- |
| `/web/search` | Titles, URLs, and snippets |
| `/llm/context` | Extracted text, tables, and source URLs for a model |
| `/chat/completions` | An OpenAI-shaped completion. The sample response names the model `brave-pro` |
| `/images/search` | Image results |
| `/videos/search` | Video results |
| `/news/search` | News results |
| `/suggest/search` | Query suggestions |
| `/spellcheck/search` | A corrected query |

The docs navigation also lists a Place search service. The pricing extract below has no separate Place line.

The [pricing page](https://api-dashboard.search.brave.com/documentation/pricing) sells prepaid credits, not a subscription. The Search plan is $5.00 per 1,000 requests, includes $5 of credit every month, and lists a capacity of 50 requests per second. Its feature list covers web search, LLM context, and news, video, and image results, so LLM context is not a separate meter on this page. Answers are $4.00 per 1,000 queries, plus $5.00 per 1,000,000 input tokens and $5.00 per 1,000,000 output tokens, also with $5 of monthly credit. The Answers block in the extracted text has no requests-per-second figure. Spellcheck and autosuggest are each $5.00 per 10,000 requests, at 100 requests per second, with the same $5 monthly credit.

The API marketing page says "up to $20 in free calls every month." The pricing page says $5 on each prepaid plan. This note does not add those credits together. Enterprise is "contact us" and is the plan that lists full-funnel Zero Data Retention, custom agreements, and invoicing.

## What the pages claim, and where they disagree

The AI page says the index has over 30 billion pages, and a later block on the same page says over 35 billion. The API page says index size is a vanity stat, then says Brave indexes 99.9% of the web that matters, built from signals of 130 million or more people. Use the pricing page for money. Treat the page counts as slogans that do not match each other.

The API FAQ says every result comes from Brave's own index, with no fallback to Google or Bing. It says Zero Data Retention is architectural, because the query never leaves infrastructure Brave operates. It says a credit card is required to buy credits, to limit abuse, and that you are charged only for credits you buy. It says the index comes from Brave's crawler plus opt-in signals from Brave users, and that the code for that contribution path is open source. The FAQ also says Google's Custom Search JSON API shuts down on 1 January 2027. That date is Brave's statement. The migration guide was not opened.

The API page cites an AIMultiple test for agent quality and latency, and Brave's own FreshQA runs for a cost figure of 85.3% accuracy at $18 per 1,000 questions. A nearby line says Parallel Advanced scored 79.0% at $49 on the same chart. The page labels the FreshQA numbers as Brave's own published runs. They were not repeated here. A blog title on the page says the Place Search API costs 6 to 7 times less than Google Maps. That post was not opened, so the multiple is not a finding of this note.

> **See also:** [Exa](/Technology/AI/Tools/Data/Exa) · [SearXNG](/Technology/AI/Tools/Data/SearXNG) · [Cloudflare Web Search API](/Technology/AI/Tools/Agents/Cloudflare Web Search API)
