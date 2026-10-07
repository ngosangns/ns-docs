---
area: technology
domain: llm
type: tool
title: Decision 2.0
description: Six Apache-2.0 decision models from vLLM Semantic Router that answer choice, yes/no, and score questions in one forward pass and return a probability for every option.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - llm
  - vllm
resource: https://huggingface.co/collections/vllm-sr/decision-20
---

# Decision 2.0

[Decision 2.0](https://huggingface.co/collections/vllm-sr/decision-20) is the open decision-model family from [vLLM Semantic Router](https://github.com/vllm-project/semantic-router). The collection title is "Towards Open Foundation Decision Models". Xunzhuo announced it on 3 October 2026. The Hub collection was last updated 4 October 2026 and holds six models. Give a model text or JSON plus the questions to answer. It returns a probability for every option and does not generate text. Choice, yes/no, and score questions about the same input run in one forward pass.

Each model card documents `transformers>=5.17`, `trust_remote_code=True`, and `model.system_one(state=..., questions=...)`. The same call is exposed as `transformers.pipeline("decision", ...)`. Vega also asks for `peft`. The JSON type for yes/no is `noul`, not a yes/no string. `choice` takes a `criteria` object of label to description. `score` takes an ordered `criteria` list.

```python
result = model.system_one(
    state="The order arrived damaged yesterday.",
    questions={
        "route": {"type": "choice", "instructions": "Which team?", "criteria": {"returns": "...", "billing": "..."}},
        "receipt": {"type": "noul", "instructions": "Does the customer have a receipt?"},
        "urgency": {"type": "score", "instructions": "How urgent?", "criteria": ["Routine", "Soon", "Today"]},
    },
)
```

[Decision Studio](https://huggingface.co/spaces/vllm-sr/decision-studio) reports Decision 2.0 confidence as one minus the normalized entropy of the distribution (`normalized_entropy_v2`) for both Choice and Score. Decision 1.0 used a top-two margin for Choice and ordinal concentration for Score. The studio request contract accepts 2 to 255 Choice options and 2 to 10 Score levels. Those limits are in the studio mapping, not restated on the model cards.

## Family

License is Apache-2.0 on every card. The median latency is "per single-question request on a single GPU". The cards do not name that GPU.

| Model | Parameters | Context | Base on the card | Median latency | JevArena | Transfer | Jev Decision Index |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Kai-0.6B](https://huggingface.co/vllm-sr/Decision-2.0-Kai-0.6B) | 0.60B | 8,192 | Finetune of `Qwen/Qwen3-0.6B-Base` | 4.9 ms | 48.6 | 45.9 | 16.3 |
| [Eos-0.8B](https://huggingface.co/vllm-sr/Decision-2.0-Eos-0.8B) | 0.75B | 16,384 | Finetune of Decision-1.0-Eos-0.8B | 6.0 ms | 53.9 | 50.3 | 20.1 |
| [Sol-2B](https://huggingface.co/vllm-sr/Decision-2.0-Sol-2B) | 1.88B | 16,384 | Finetune of Decision-1.0-Sol-2B | 7.2 ms | 52.1 | 51.3 | 29.5 |
| [Nox-4B](https://huggingface.co/vllm-sr/Decision-2.0-Nox-4B) | 4.21B | 16,384 | Finetune of `Qwen/Qwen3.5-4B-Base` | 12.9 ms | 63.6 | 52.3 | 43.8 |
| [Lux-9B](https://huggingface.co/vllm-sr/Decision-2.0-Lux-9B) | 7.94B | 16,384 | Finetune of Decision-1.0-Lux-9B, itself from Qwen3.5-9B | 18.4 ms | 68.1 | 56.2 | 46.3 |
| [Vega-27B](https://huggingface.co/vllm-sr/Decision-2.0-Vega-27B) | 29.37B | 32,768 | Adapter on `Qwen/Qwen3.8-27B` | 71.4 ms | 74.0 | 58.7 | 56.5 |

JevArena does not rise at every size step. Eos at 53.9 is above Sol at 52.1. The Jev Decision Index does rise in the order above, and so does human-labelled transfer.

## How the cards score

Each card prints three columns against a same-size set chosen on that card.

JevArena
: Same frozen prompts, scored the same way. A missing or invalid answer counts as an error.

Human-labelled transfer
: Median macro-F1 over 15 human-labelled tasks, times 100.

Jev Decision Index
: Decision 2.0 numbers are an independent reproduction with the official 0.2.1 kit on the released weights. The other rows are a public board snapshot from 28 September 2026. The cards say training data was audited at row level against all Index test items.

"Top JevArena score of its size" means the set printed on that card. Nox's card also calls 63.6 statistically level with Decider 4B at 61.9. On transfer, Decider 4B is 55.5 and Jet v6.2 is 53.8, both above Nox at 52.3. Vega's card calls 74.0 statistically level with AutoJev-27B at 72.1. Vega, AutoJev-27B, and Eikos-27B tie on transfer at 58.7. Vega's card calls it the strongest Decision 2.0 model, at +11.2 Index points over Lux.

Gains versus the matching Decision 1.0 model, as printed on each 2.0 card:

| 2.0 model | JevArena vs 1.0 | Index vs 1.0 |
| --- | --- | --- |
| Kai | 48.6 vs 35.9 (+12.7). Lex 1.0 is 31.0 | 16.3 vs 6.5 (+9.8) |
| Eos | 53.9 vs 42.5 (+11.4) | 20.1 vs 18.4 (+1.7) |
| Sol | 52.1 vs 45.8 (+6.3) | 29.5 vs 25.3 (+4.2) |
| Nox | 63.6 vs 56.5 (+7.1) | 43.8 vs 34.4 (+9.4) |
| Lux | 68.1 vs 65.8 (+2.3) | 46.3 vs 43.5 (+2.8) |

Decision 1.0's own 54-task weighted accuracy (Lux 77.40 on 3,766 decisions) is a different suite. Do not line it up with these JevArena numbers.

> **See also:** [LLM Overview](/Technology/AI/Concepts/LLM And Generative AI/LLM Overview)
