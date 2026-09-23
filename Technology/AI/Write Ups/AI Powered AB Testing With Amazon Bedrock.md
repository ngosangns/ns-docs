---
area: technology
domain: ab-testing
type: case-study
title: AI Powered AB Testing With Amazon Bedrock
description: Notes on an adaptive A/B testing tool architecture that uses Amazon Bedrock and MCP to assign variants based on user context.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - ab-testing
  - agents
  - aws
  - bedrock
  - mcp
resource: https://awsstudygroup.com/2026/04/03/xay-dung-cong-cu-kiem-thu-a-b-duoc-ho-tro-boi-ai-su-dung-amazon-bedrock
---

# AI Powered AB Testing With Amazon Bedrock

> **Source**: [Building an AI-powered A/B testing tool using Amazon Bedrock](https://awsstudygroup.com/2026/04/03/xay-dung-cong-cu-kiem-thu-a-b-duoc-ho-tro-boi-ai-su-dung-amazon-bedrock) (Vietnamese translation, title rendered here in English) — Vijit Vashishtha & Koshal Agrawal, AWS Study Group, 03/18/2026

## Problems with Traditional A/B Testing

Random variant assignment plus waiting weeks for statistical significance has 4 limitations: it ignores early signals, converges slowly, is very noisy (users are assigned to variants that don't fit their needs), and needs manual segmentation after the data comes in.

Illustrative example: testing 2 CTAs, "Buy now" (A) vs "Buy now – Free shipping" (B). B wins early, but deeper analysis reveals that premium loyalty members (who already get free shipping) are put off by message B, visitors coming from a coupon page prefer B, and mobile users prefer A because the CTA is shorter. Random assignment needs a long time to average out these fragmented effects.

## Solution Architecture

Stack: **Amazon CloudFront + WAF** (CDN, DDoS/SQLi protection) → **VPC Origin** → **internal ALB** → **ECS Fargate** (FastAPI) → **Amazon Bedrock** (Claude Sonnet, native tool use) through the **Model Context Protocol (MCP)** to access behavioral data → **DynamoDB** (5 tables: experiments, events, assignments, profiles, batch jobs) + **S3** (static frontend, event logs), all through VPC Endpoints (no public internet egress).

## Hybrid Assignment Strategy

- **New user** → assigned by **hash** (`sha256(user_id)` → pick the variant by index) — fast, free, and needs no AI because there is no behavioral data to analyze yet.
- **Returning user** → calls **Amazon Bedrock** (`bedrock_client.converse` with a `toolConfig` pointing at the MCP tool registry) to make a context-based decision.

This is the key point: AI only creates value when there is behavioral data to analyze; new users get hashed so they have a consistent experience while the system collects signals.

## Two-Layer Prompt for Bedrock

- **System prompt**: defines the role ("A/B testing optimization expert"), lists the 11 available MCP tools, and sets hard constraints — always call `get_user_assignment` first, only change an assigned variant when there is evidence of an improvement of ≥30%, and output **only** valid JSON (no explanation outside the `reasoning` field).
- **User prompt**: packs in the specific context for the decision — device/page/referrer/previous variant, engagement score, conversion likelihood, interaction style, the list of variants, historical performance figures, and a 5-step decision framework.

The model decides for itself which tools to call based on the situation (multi-turn: call a tool → receive a `toolResult` → continue → final decision JSON), rather than hard-coding the data-fetching flow as in traditional ML.

## Why Bedrock Instead of Traditional ML

1. **Flexible tool orchestration**: MCP lets the model choose which tools to call by context (new user → similar users; existing user → personal profile) instead of rigid feature engineering.
2. **Explainable multi-factor reasoning**: the `reasoning` field combines device, similar users, engagement, and historical performance into one explanatory sentence — classic ML gives a probability without explaining how the factors interact.
3. **Handling conflicting signals**: when the overall conversion rate favors A but the similar-user cluster + device favor B, the model weighs the trade-off explicitly instead of optimizing a single metric.
4. **No training pipeline**: works from day 1 (using existing similar-user patterns) and improves as data accumulates — no need to collect a training set, do feature engineering, retrain periodically, or A/B test the ML model itself.

## Key MCP Tools

- **`get_similar_users()`** — collaborative filtering: finds similar clusters and computes a similarity score (0–1) from engagement (30%), interaction style (20%), content preference (20%), conversion likelihood (15%), and visual preference (15%); the similarity threshold is >0.5.
- **`get_user_profile()`** — reads the `PersonalizationProfile` table: behavioral signals (engagement, conversion likelihood, CTA responsiveness, reading depth, social/urgency sensitivity), preferences (interaction style, attention span, visual preference), performance data, and device context.
- **`get_variant_performance()`** — real-time figures from the `Experiment` table (impressions, clicks, conversions, conversion rate, confidence) + historical time series from the `Events` table.
- After each decision, the system writes `last_selected_variant`, `confidence_score`, and `behavior_tags` back to the profile to improve later decisions.

## Confidence Score

The confidence score (0–1) is a **holistic assessment** (not a fixed formula) based on: the amount of behavioral data available, consistency across signals, the size/homogeneity of the similar-user cluster, the statistical significance of performance data, and profile maturity. Reference scale: 0.9–1.0 very reliable, 0.7–0.89 high, 0.5–0.69 medium, 0.3–0.49 low, <0.3 insufficient data.

## Comparing Two Users

- **Existing user, loyalty member, mobile**: high profile confidence (0.87) → the model relies mainly on personal history, with the similar-user cluster confirming it → picks A (concise CTA) with confidence 0.86, because the free-shipping message is redundant for a loyalty member.
- **New user from a coupon page**: very low profile confidence (0.12), but the referrer + 39 similar new users from the coupon site give a strong signal → picks B (incentive messaging) with confidence 0.91 despite lacking personal history — compensating with context + similar-user evidence.

Key point: the system automatically shifts weight between "personal history" and "similar-user patterns" depending on the data available, instead of applying the same logic to every user.

## Extension Directions

Dynamic variant generation (Bedrock generates the CTA copy itself instead of choosing from a fixed set), multi-armed bandits (combining AI personalization with automatic traffic allocation), cross-experiment learning, real-time optimization via Kinesis, and auto-discovery of segments through clustering.

## Suggested Rollout Plan

1. Deploy the infrastructure through CloudFormation, starting with 100% hash-based assignment to get a baseline.
2. Turn on AI selection gradually for returning users, trying small traffic first.
3. Expand MCP tools as business needs require (inventory, pricing, customer service history...).
4. Monitor through CloudWatch: variant assignment latency, Bedrock API cost, conversion metrics, and anomaly alerts.
5. Roll out advanced features (dynamic variants, bandits, cross-experiment learning) gradually as the system matures.

Reference source code (FastAPI backend, React frontend, CloudFormation templates, MCP server) is on GitHub — "A/B Testing Engine" (link in the original article).

> **See also:** [Recommender Systems](/Technology/AI/Practices/Recommender Systems) · [Agents Overview](/Technology/AI/Tools/Agents/Agents Overview) · [Multi Agent Systems](/Technology/AI/Tools/Agents/Multi Agent Systems)
