---
area: technology
domain: llm
type: tool
title: Clef
description: Clef and Clef-flash are Cloudflare's first self-trained decision models, hosted on Workers AI and open-weight under Apache 2.0. They return a probability for every option of typed noul, choice, and score questions, and are Jev-API compatible.
timestamp: "2026-10-21T00:00:00.000Z"
tags:
  - technology
  - llm
  - cloudflare
  - workers-ai
  - decision-model
resource: https://developers.cloudflare.com/changelog/post/2026-10-01-clef-workers-ai/
---

# Clef

[Clef](https://developers.cloudflare.com/workers-ai/models/clef/) (`@cf/cloudflare/clef`, 27B) and [Clef-flash](https://developers.cloudflare.com/workers-ai/models/clef-flash/) (`@cf/cloudflare/clef-flash`, 9B) are the first models trained by the Cloudflare Workers AI team. They were announced on 1 October 2026 in the [changelog post](https://developers.cloudflare.com/changelog/post/2026-10-01-clef-workers-ai/) and the [launch blog post](https://blog.cloudflare.com/clef-decision-models/). A decision model does not generate text. It reads a `state` and a set of typed questions, then returns a probability for every allowed answer, so code can route, block, or escalate on a number. The family is the same kind as [Typesafe's Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) and the open [Decision 2.0](/Technology/AI/Concepts/LLM And Generative AI/Decision 2.0) models.

Weights are on Hugging Face ([Clef](https://huggingface.co/Cloudflare/clef), [Clef-flash](https://huggingface.co/Cloudflare/clef-flash)), tagged `license:apache-2.0`. Cloudflare also opened a reinforcement-learning fine-tuning service for design partners ([sign-up form](https://www.cloudflare.com/resource/clef-rl-interest)).

## Models

| Model | Size | Base (from the blog) | Context | Price per M input tokens | Use |
| --- | --- | --- | --- | --- | --- |
| `@cf/cloudflare/clef` | 27B | Qwen3.8-27B | 65,536 tokens | $0.24 | Highest-precision decisions |
| `@cf/cloudflare/clef-flash` | 9B | Qwen3.5-9B | 24,576 tokens (model page) | $0.038 | Latency-critical, hot-path decisions |

- Output tokens are not billed. Images are converted to input tokens and billed at the input rate.
- The changelog table says 64K context for both models. The Clef-flash model page says 24,576 tokens. Check the model page before sending long state to Clef-flash.
- Both accept images (vision encoder). The model pages also say the state can be video. Jev is text only.
- Workers AI itself bills in Neurons (the pricing page lists Clef at 21,818 and Clef-flash at 3,455 Neurons per M input tokens, at $0.011 per 1,000 Neurons, with a free 10,000 Neurons per day).
- The Workers AI pricing page also lists `@cf/cloudflare/clef-omni` ($0.15 per M input tokens). Its [model page](https://developers.cloudflare.com/workers-ai/models/clef-omni/) describes a 30B mixture-of-experts model with 3B active parameters, 64,000-token context, and audio as well as image and video input. It is not in the 1 October changelog and I did not read its benchmarks.

## API

Use the [Workers AI binding](https://developers.cloudflare.com/workers-ai/configuration/bindings/) (`env.AI.run()`) or the REST endpoint `POST /client/v4/accounts/{account_id}/ai/run/@cf/cloudflare/clef`. Requests can go through [AI Gateway](https://developers.cloudflare.com/ai-gateway/). The `model` field is required and must be `clef` or `clef-flash`. It follows the System One API, so moving a Jev integration is a change of endpoint and model.

Limits from the model page: 1 to 64 questions per request; question ids use letters, digits, `_`, `.`, `-` (max 100 characters); `state` is a string or structured data; up to 4 embedded PNG, JPEG, or WebP images (4 MiB and 16 megapixels each, 8 MiB total, 13 MiB request body); remote image URLs are not accepted. Image tokens: each side rounds to a multiple of 32 px, one token per 32x32 block plus 3 marker tokens, capped at 1,024 per image. Media tokens count toward the context window and the text `state` is truncated to fit what is left.

| Question `type` | Input | Answer |
| --- | --- | --- |
| `noul` | `instructions` | Yes/no. `noul` is the probability of yes |
| `choice` | `instructions`, `criteria` (option to description) | `choice` (top option), `probabilities` per option, `confidence` |
| `score` | `instructions`, `criteria` (ordered list of levels) | `score` (probability-weighted, can fall between levels), `legend`, `probabilities`, `confidence` |

```ts
const response = await env.AI.run("@cf/cloudflare/clef", {
  model: "clef",
  state: "Checkout has been failing for every customer for the last hour.",
  questions: {
    urgent: { type: "noul", instructions: "Is this support request urgent?" },
    team: {
      type: "choice",
      instructions: "Which team should handle this request?",
      criteria: {
        billing: "Payments, invoices, and refunds",
        technical: "Outages, errors, and configuration",
        sales: "Plans and upgrades",
      },
    },
    severity: {
      type: "score",
      instructions: "How severe is the customer impact?",
      criteria: ["No impact", "Minor", "Major", "Critical"],
    },
  },
});
// response.answers.urgent.noul, response.answers.team.choice, response.usage.input_tokens
```

Typical use: put Clef in the agent's request path to answer "urgent?", "which team?", or "should I take this action?", then hand the action to an LLM. Cloudflare's examples are support triage, domain classification with [Browser Run](https://developers.cloudflare.com/browser-run/) (2.2 s to fetch, render, and classify, against 4.7 s for `gpt-oss-120b` in the same workflow), trust and safety scoring against a policy rubric, agent guardrails, and image classification.

## How it works (blog's account)

Inference is one prefill pass over the backbone, then the valid schema choices are scored in parallel. There is no token-by-token decoding. The base model is frozen, and a routing head plus rank-256 low-rank adapters are trained on top. Training used label-smoothed cross-entropy plus a Brier loss for calibration, on Cloudflare's internal synthetic data. A second stage, RLCD (Reinforcement Learning for Calibrated Decisions), gives partial credit to adjacent ordinal choices. Cloudflare says it does not read, store, or train on requests or responses unless a customer uses the fine-tuning product.

## Cloudflare's numbers

All figures below come from Cloudflare's own launch posts. I did not rerun them. The benchmark site is the Jev Decision Index on the blog.

| Benchmark | Clef | Clef-flash | Jev |
| --- | --- | --- | --- |
| BFCL (case exact) | 98.47 | 98.76 | 95.75 |
| BANKING77 (macro-F1) | 94.20 | 90.93 | 79.74 |
| CLINC150+OOS (macro-F1) | 97.43 | 66.77 | 89.27 |
| Home appliances (case exact) | 82.95 | 97.73 | 52.27 |
| When2Call (accuracy) | 72.37 | 65.58 | 80.97 |
| BRIGHT (nDCG@10) | 45.91 | 39.26 | 47.52 |

- "Highest on 7 of 10" holds for the blog table. Jev wins When2Call and BRIGHT, and DiffusionGemma Jev wins PhishNChips (85.35 against 79.60 for Clef).
- Clef-flash drops sharply on CLINC150+OOS (66.77) against Clef (97.43). The model is not a drop-in downgrade for every task.
- Typesafe's workflow evals: Clef beats Jev on invoice processing (64.7 against 61.8), customer service (76.3 against 76.0, a small gap), and security incidents (62.9 against 61.7). Jev wins agent trace observability (71.6 against 68.5).
- Latency over 43 runs: median Clef 209.3 ms, Clef-flash 38.8 ms, Jev 524.1 ms (2.5x and about 13x faster). p95 is 238.6 ms, 122.4 ms, and 536.0 ms. In the same blog table DiffusionGemma Jev (84.4 ms), Kev 9B (51.4 ms), and Laya (5.8 ms) have a lower median than Clef. Only Clef-flash beats the first two, and the "faster than other decision models" line in the post is true of Clef-flash, not Clef.

## Related

- Decision 2.0 reports a different suite (JevArena and the Jev Decision Index reproduction); do not line its numbers up with the table above.
- [Anymd](/Technology/AI/Tools/Agents/Anymd) uses Jev as a tie-breaker in search. Clef is the drop-in replacement the changelog describes, but I have not checked whether Anymd lets you swap it.

> **See also:** [Decision 2.0](/Technology/AI/Concepts/LLM And Generative AI/Decision 2.0) · [LLM Overview](/Technology/AI/Concepts/LLM And Generative AI/LLM Overview) · [Cloudflare Web Search API](/Technology/AI/Tools/Agents/Cloudflare Web Search API)
