---
area: technology
domain: ai-saas
type: resource
title: PostClaw
description: "PostClaw is Cassau, LLC's hosted social scheduler at postclaw.fun. The marketing site is Astro 5.18.1, the about page says a Go backend and a React app, and the pricing page lists Free, Connect at $10, Pro at $20, and Business at $50."
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - ai-saas
  - social
  - scheduler
resource: https://postclaw.fun/
sources:
  - id: home
    resource: https://postclaw.fun/
    author: human:Cassau, LLC
  - id: pricing
    resource: https://postclaw.fun/pricing/
    author: human:Cassau, LLC
  - id: about
    resource: https://postclaw.fun/about/
    author: human:Cassau, LLC
  - id: docs-publish
    resource: https://postclaw.fun/docs/social-publishing
    author: human:Cassau, LLC
  - id: privacy
    resource: https://postclaw.fun/privacy/
    author: human:Cassau, LLC
  - id: terms
    resource: https://postclaw.fun/terms/
    author: human:Cassau, LLC
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# PostClaw

[PostClaw](https://postclaw.fun/) is a hosted social scheduler. The homepage title calls it an AI social agent and a hosted Postiz alternative. The app URL is `https://app.postclaw.fun/register`. Checked 3 November 2026. No account was created. No plan was purchased. No social account was connected.

This note is not [ChristopherLittle51/PostClaw](https://github.com/ChristopherLittle51/PostClaw). That repository is a PostgreSQL memory plugin for OpenClaw. A search on this check did not find a public source repository for postclaw.fun.

## Who operates it

The about page and the terms say Cassau, LLC, a Delaware LLC. The about page prints EIN 37-2230243 and the office at 131 Continental Dr, Suite 305, Newark, DE 19713, USA. The Cloudflare-protected address on that page decodes to contact@postclaw.fun. The EIN and the address were not checked against a Delaware filing. Terms were last updated 9 April 2026. The privacy policy was last updated 23 May 2026. Terms say you must be at least 16. Governing law is Delaware. There is no contractual uptime SLA unless an enterprise agreement says otherwise.

## What the pages say it does

The about page says the product has a Go backend and a React frontend. The marketing pages, including the homepage and the pricing page, are Astro v5.18.1. Those are two different layers. The docs page on social publishing says posts move through Redis and a distributed worker. A rate limit retries with exponential backoff, at most 5 attempts. Post states on that page are `draft`, `scheduled`, `publishing`, then `published` or `failed`.

The homepage offers AI captions, a trend radar, a visual workflow builder, scheduling, and media generation. It names FLUX for images, Seedance for video, and ElevenLabs for voice. Media generation is bring-your-own-key on every plan. Named providers on the homepage include OpenAI, Anthropic, Google Gemini, Groq, OpenRouter, DeepSeek, Together AI, Fireworks, Mistral, Cohere, Perplexity, xAI, Cerebras, and Hyperbolic. The privacy policy's subprocessor list also names Kling, Fish Audio, and MiniMax, and it says those providers run only when you invoke an AI feature.

The docs page lists eight social networks and then says "10+ major platforms". The eight names are X, Instagram, Facebook, LinkedIn, TikTok, YouTube, Threads, and Bluesky. The features page says 18 platforms, split as 11 social and 7 blog. The seven blog names there are WordPress, Medium, Dev.to, Hashnode, Ghost, Blogger, and Your Website. The homepage comparison table says PostClaw has 15 publishing platforms. The homepage stat block says 18 platforms. The heading "Eight capabilities" is followed by nine cards. Those counts stay separate.

LinkedIn on the docs page says personal posts work, and Company Page publishing is pending LinkedIn Marketing Developer Program review. The privacy policy lists organization scopes, including `w_organization_social`, as if Company Pages can be destinations. Both sentences stay in this note.

YouTube docs say a video scheduled as public is uploaded at once as private, and YouTube publishes it at the scheduled time. Image uploads on that page are JPG, PNG, GIF, and WebP, up to 20 MB. Video formats are MP4, MOV, and AVI, up to 5 GB in that table. The TikTok section on the same page caps video at 4 GB. Files over 40 MB upload in chunks on paid plans. The Free plan caps a file at 100 MB.

## Price snapshot

Prices below are the public pricing page on 3 November 2026. The annual toggle says "Save 17%". The annual dollar amounts were not loaded.

| Plan | Card price | Accounts on the card | Accounts in the table |
| --- | --- | --- | --- |
| Free | $0 | 2 social accounts | 5 social channels |
| Connect | $10 a month | 10 | 10 |
| Pro | $20 a month | 15 | 15 |
| Business | $50 a month | 25 | 25 |

The Free card and the Free row disagree on account count. The Free card also says 50 posts a month, 3 workflows, 1 automation, and 20 free AI calls to start. The table says 50 posts, 3 workflows, 1 automation, 30 automation runs, 3 news sources, 5,000 monthly AI credits, and an em dash for agent memory and for news research. AI text on Free is marked with a check icon. Image, video, and voice on Free say BYOK.

Connect on the pricing page is $1 for the first month for new customers, then $10. The homepage price card did not show that $1 line. The Connect row says AI text, image, video, and voice run on your own key, with 20 workflows, 10 automations, and 500 runs a month.

Pro on the pricing card adds 20 workflows and 10 automations. The homepage Pro card did not list those two counts. The table gives Pro 80,000 monthly AI credits. Business gets 250,000 credits, 100 workflows, 50 automations, 2,000 runs, analytics export, and priority plus chat. Analytics export is an em dash on Free, Connect, and Pro.

The pricing FAQ says Pro and Business have a 14-day trial. The first paid charge has a 30-day money-back guarantee. Named payment methods there are Visa, Mastercard, Amex, and PayPal. The privacy policy names Stripe as the payment processor and says PostClaw stores the last 4 digits and the billing address. PayPal is not in the subprocessor list. Both pages stay as written.

## Homepage comparison icons

The homepage HTML on this check used a green check or a grey cross in the cells that had no words. The page footnote says competitor details came from each product's public pages and were last verified in June 2026. This note did not reopen Postiz, SocialClaw, or Buffer.

| Feature | PostClaw | Postiz | SocialClaw | Buffer |
| --- | --- | --- | --- | --- |
| Publishing platforms | 15 | 20+ | 13 | 10+ |
| Hosting | Hosted | Self-host | Hosted | Hosted |
| AI content generation | Built-in | Built-in | Limited | Add-on |
| AI image generation | check | cross | cross | cross |
| AI video generation | Yes, 11 variants | cross | cross | cross |
| TTS voiceover | check | cross | cross | cross |
| BYOK | check | check | check | cross |
| Automation pipelines | check | check | Limited | Limited |
| Free plan | check | check | check | check |

## Privacy claims that do not match the homepage

The homepage BYOK block says requests go directly to your provider and that PostClaw never stores your prompts or outputs. Privacy section 17 says AI inputs are sent to the configured provider. It says PostClaw does not train its own models on your content or on connected social data. It does not repeat the "never store prompts" sentence. Terms say a BYOK key also follows that provider's terms.

OAuth tokens are stored with AES-256-GCM, according to the privacy policy. Account data is kept for the life of the account plus 90 days after deletion. Published posts and analytics are kept 24 months. Billing records are kept 7 years. Server logs are kept 30 days. Disconnecting Google, Meta, TikTok, LinkedIn, or Pinterest deletes tokens and cached data within 7 days. X is the exception named there, with a 24-hour purge. Named subprocessors are AWS, Cloudflare, Stripe, Resend, and the AI providers you invoke.

## What was not verified

The homepage shows three five-star quotes from Sarah Chen, Marcus Rivera, and Aiko Tanaka. None of the quotes links to a company site or a review page. The trend widget showed four headlines, including "Buffer raises Series C". Those headlines were not checked against the named sources. The workflow sample numbers, 42 runs a week and 21 hours saved, are labels on the homepage graphic.

## See also

[AI Saas Tools](/Technology/AI/Tools/AI Saas Tools) lists this product in the general section.
