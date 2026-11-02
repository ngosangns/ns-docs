---
area: technology
domain: system-design
type: resource
title: Syscraft
description: "Syscraft is Nguyen Thanh Minh's hosted system design lab at syscraft.app: draw an architecture, run simulated traffic, and pass graded challenges. Checked 2 November 2026 without an account: the marketing page lists 7 topics and Pro at $9 a month through Lemon Squeezy, while the learn index lists 42 lessons and the challenge index lists 19."
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - system-design
  - learning
  - simulation
resource: https://syscraft.app/
---

# Syscraft

[Syscraft](https://syscraft.app/) is a hosted system design lab. The terms, last updated 9 October 2026, say you read a lesson, draw an architecture, run simulated traffic, and get a score from a deterministic simulation engine. The operator named on the terms and the privacy policy is Nguyen Thanh Minh, an individual in Vietnam. Contact is working@ngthminh.dev. The app is at [dashboard.syscraft.app](https://dashboard.syscraft.app/). Checked 2 November 2026. This note did not sign in, did not pay, and did not press Run.

It is a different product from [Breakscale](/Technology/System Design/Tools/Breakscale), [GonnaCrash](/Technology/System Design/Resources/GonnaCrash), and [Sys0](/Technology/System Design/Resources/Sys0). Breakscale is an open-source engine you can run locally. GonnaCrash is 200Lab's level game. Sys0 is Rakesh K's written course. None of the Syscraft pages read here name those three.

Other names that showed up in search are also different: systemcraft.app (an interview guide, with a course at learn.systemcraft.app), syscraft.io (architecture documentation), systemcraft.in, system-craft.me, and systemcraft.ashwinsi.in. The pages read here do not connect syscraft.app to those sites, to the Indore company Syscraft Information System, or to the Android developer Syscraft Labs.

## What the marketing page says

The homepage title is "Syscraft, System Design Lab: build it, run it, break it". Sitemap lastmod for `/` is 12 October 2026. The page is static HTML, `style.css`, and `app.js`, plus GSAP 3.12.5 from cdnjs. Cloudflare served it (`server: cloudflare`, a cache hit). JSON-LD calls it both a `SoftwareApplication` (offers Free at 0 USD and Pro at 9 USD per month) and a `Course` with `courseWorkload` of `PT1H`. That one-hour field is not the sum of the lesson cards below.

The syllabus section names seven topics and says more are on the way: scaling from one server to millions of users, back-of-the-envelope estimation, rate limiting, consistent hashing, a key-value store, unique ID generation, and a URL shortener. A scripted order-checkout demo (the page says "Scripted here; in the app it's your design") shows 200 requests/s, p95 42 ms, 0 errors, and $184 a month. Those figures are the demo, not a run from this session.

The same page says any design that meets the goals passes, and that AI can explain a run but never grades one. The terms repeat the second point: scores come from the simulation engine, and model text can be wrong.

## Plans, as written

The homepage pricing table and the terms do not use the same sentence for the free plan. Both are quoted here. This session had no account, so neither sentence was checked against a live free account.

| Limit | Free, $0 | Pro, $9 / month |
| --- | --- | --- |
| Lessons and guided experiments | All | All |
| Challenge modes | First 2 of each | Every mode |
| Hard challenges | 1 | All |
| Components on one canvas | Up to 10 | Up to 30 |
| Saved Lab designs | 3 | Unlimited |
| Failures you pick before a run | 1 | Up to 4, stacked |
| Traffic controls and replay | Included | Included |
| Simulation runs (lessons do not count) | 30 / day | Unlimited |
| AI explanations | 10 / day | 200 / day |
| Chaos mode (the page says AI picks the failures) | Not included | Included |
| Leaderboards | Not included | Ranked, with medals |

The terms, same date, say the free plan is lessons, the Lab within its size limits, and the first mode of every challenge. They also say Pro is US$9 a month plus tax, with a 7-day trial for a first-time subscriber only, then monthly renewal until you cancel. Pro on the terms adds every challenge mode, hard challenges, leaderboards, larger designs, higher run limits, and AI explanations. The homepage table still gives the free plan 10 AI explanations a day. Those two sentences are both on the site.

Cancel from Profile, Settings, Manage billing, or from the Lemon Squeezy receipt. Pro then lasts until the paid period ends, and designs stay. The refund page (9 October 2026) says paid periods are not refunded, because the trial exists, except a double charge, a charge after cancel, a technical failure on their side for a substantial part of the period, or a refund the local consumer law requires. Email working@ngthminh.dev within 30 days, from the account address, with the order number. They say they reply within 3 business days. Lemon Squeezy is the Merchant of Record. An approved refund ends the subscription immediately and usually shows on the card in 5 to 10 business days. A price change needs 30 days of email notice. Liability is capped at what you paid in the previous 12 months. Governing law is Vietnam. The terms say simulation results are teaching models, not measurements of real infrastructure, and not a reason to size a production system.

## What the app showed while logged out

Sign-in on `/login` is "Continue with Google". The line under it says designs, attempts, and progress are saved to that Google account. Nav items: Lab, Learn, Challenges, Leaderboard, search. Opening `/leaderboard` redirected to `/login?next=/leaderboard`. Learn, Challenges, and the concept map stayed on their URLs.

`/learn` said "Showing 42 of 42 lessons". Five are marked Easy, twenty-eight Medium, nine Hard. Twenty-one cards are Reading and twenty-one are Experiment. Adding the "~N min" labels on those 42 cards gives 409 minutes. That sum is this note's arithmetic. It is not a duration the site states, and it disagrees with the homepage JSON-LD field `PT1H`. The open lesson, "Scaling the Web Tier: Up or Out", showed a Draft label, four reading steps, and "Sign in to continue". The lesson body was not opened.

| # | Lesson | Level | Kind | Min |
| --- | --- | --- | --- | --- |
| 01 | Scaling the Web Tier: Up or Out | Easy | Reading | 8 |
| 02 | Serving Static Content From a CDN | Easy | Reading | 7 |
| 03 | Stateless Web Servers | Medium | Reading | 6 |
| 04 | Choosing and Sharding the Database | Medium | Reading | 10 |
| 05 | Scaling Read-Heavy Architectures | Medium | Experiment | 8 |
| 06 | Decoupling With a Message Queue | Medium | Reading | 6 |
| 07 | Serving Users From Multiple Data Centers | Medium | Reading | 6 |
| 08 | One service, then scale out | Medium | Experiment | 8 |
| 09 | Protect hot reads with Redis | Medium | Experiment | 8 |
| 10 | PostgreSQL and MySQL: capacity first | Medium | Experiment | 8 |
| 11 | Replication and sharding: more copies, more primaries | Hard | Experiment | 12 |
| 12 | Background jobs: workers, prefetch and partitions | Hard | Experiment | 15 |
| 13 | Riding out failures: memory, DNS routing and storage regions | Hard | Experiment | 10 |
| 14 | Concurrent writes: sell every unit once | Hard | Experiment | 15 |
| 15 | Back-of-the-Envelope Estimation | Easy | Reading | 8 |
| 16 | Estimate, then run it: average and peak QPS | Easy | Experiment | 6 |
| 17 | A Framework For System Design Interviews | Easy | Reading | 10 |
| 18 | Design a Rate Limiter | Medium | Reading | 10 |
| 19 | Rate limiting algorithms: windows, buckets, shared counters | Medium | Experiment | 10 |
| 20 | Consistent Hashing | Hard | Reading | 9 |
| 21 | Lose a cache server: hash % N against a hash ring | Hard | Experiment | 8 |
| 22 | Designing a Key-Value Store: CAP and Quorums | Hard | Reading | 10 |
| 23 | Key-Value Store Internals: Conflicts, Failures, Write and Read Paths | Hard | Reading | 10 |
| 24 | Tune N, W and R: fresh reads, fast reads, failures | Hard | Experiment | 10 |
| 25 | Design a Unique ID Generator in Distributed Systems | Medium | Reading | 10 |
| 26 | Unique IDs: masters, UUIDs, snowflake | Medium | Experiment | 10 |
| 27 | Design a URL Shortener | Medium | Reading | 10 |
| 28 | URL shortener: cache, redirects, short codes | Medium | Experiment | 10 |
| 29 | Design a Web Crawler | Medium | Reading | 10 |
| 30 | Web crawler: duplicates, parser, DNS, politeness | Medium | Experiment | 10 |
| 31 | Design a Notification System | Medium | Reading | 10 |
| 32 | Notification system: servers, retries, dedupe, capping | Medium | Experiment | 10 |
| 33 | Design a News Feed System | Medium | Reading | 10 |
| 34 | News feed: fanout on write, on read, hybrid | Medium | Experiment | 10 |
| 35 | Design a Chat System | Medium | Reading | 12 |
| 36 | Chat system: inboxes, message IDs, heartbeats | Medium | Experiment | 8 |
| 37 | Design a Search Autocomplete System | Medium | Reading | 12 |
| 38 | Autocomplete: trie cache and offline data gathering | Medium | Experiment | 10 |
| 39 | Design YouTube | Medium | Reading | 14 |
| 40 | YouTube: async uploads, transcoding capacity, CDN, a spare server | Medium | Experiment | 10 |
| 41 | Design Google Drive | Medium | Reading | 15 |
| 42 | Google Drive: notifications, block servers, delta sync | Medium | Experiment | 10 |

`/challenges` said "Showing 19 of 19 challenges". Two Easy, ten Medium, seven Hard. The "0/N modes" figure is the mode count on that card. The open challenge, "Survive a Traffic Surge", also showed Draft. Its public brief: a storefront at 8,000 requests/s, a promotion that triples that to 24,000 for the middle of the run, p95 at or below 100 ms, availability at least 99.9%, one public entry with web servers on a private network, and no single machine whose loss cuts visitors off. Modes listed there: Standard (Easy, at most $200 a month), Tight budget (Medium, at most $112), Sick servers (Hard, at most $200). The component list on that one challenge, "per instance, default settings": API Service $50, Client free, Load Balancer $25, PostgreSQL $2,700. That list is not a price catalog for the other 18 challenges. The sandbox was not opened.

| # | Challenge | Level | Modes | Time |
| --- | --- | --- | --- | --- |
| 01 | Survive a Traffic Surge | Easy | 3 | 10 to 20 min |
| 02 | Scale a Read-Heavy Web Application | Medium | 5 | 15 to 30 min |
| 03 | Slow, Image-Heavy Pages | Medium | 3 | 10 to 20 min |
| 04 | From One Server to Millions of Users | Hard | 5 | 25 to 45 min |
| 05 | Background Jobs: Thumbnails Without a Backlog | Hard | 3 | 20 to 40 min |
| 06 | Flash Sale: Sell Every Unit Exactly Once | Hard | 3 | 20 to 40 min |
| 07 | Capacity Estimation: From Daily Users to Servers | Easy | 1 | 10 to 25 min |
| 08 | Design a Rate Limiter: Algorithms and Counters | Medium | 3 | 10 to 25 min |
| 09 | Consistent Hashing: Lose a Cache Server, Keep the Cache | Hard | 2 | 10 to 25 min |
| 10 | Design a Key-Value Store: Tune N, W and R | Hard | 5 | 10 to 25 min |
| 11 | Design a Unique ID Generator in Distributed Systems | Medium | 2 | 10 to 25 min |
| 12 | Design a URL Shortener | Medium | 2 | 10 to 25 min |
| 13 | Design a Web Crawler | Medium | 2 | 10 to 25 min |
| 14 | Design a Notification System | Medium | 4 | 10 to 25 min |
| 15 | Design a News Feed System | Medium | 4 | 10 to 25 min |
| 16 | Design a Chat System | Medium | 3 | 10 to 20 min |
| 17 | Design a Search Autocomplete System | Medium | 3 | 10 to 25 min |
| 18 | Design YouTube | Hard | 3 | 15 to 35 min |
| 19 | Design Google Drive | Hard | 3 | 15 to 35 min |

`/concepts` said "48 of 48 concepts" and grouped them as Scalability, Databases, Caching, Concurrency, Reliability, Messaging, and Distributed Systems. The blurbs were not copied. No public source repository was linked from the pages read here.

## What the privacy page says it stores

The privacy policy, 9 October 2026, says:

- Google sign-in gives them email, name, Google account ID, and profile picture.
- Learning data is the architectures, attempts, runs, results, lesson progress, hints opened, and settings such as leaderboard visibility.
- Lemon Squeezy sends subscription status, plan, renewal and end dates, and the amount and date of each payment. Card numbers stay with Lemon Squeezy.
- A session cookie keeps the sign-in. They say the cookie is HTTP-only and the session token is stored hashed. IP addresses are used to protect sign-in and rate-limit abuse. Server logs are kept for a short period.
- Theme, animation, and whether you have seen the tour stay in the browser's local storage.
- AI features send a summary of the design and the simulation results through OpenRouter. Name and email are not in that summary.
- Hosting is described as the servers and database that run the app, plus Cloudflare for this website. The database vendor is not named.
- No ads, no sale of personal data, and, as written, no third-party analytics or tracking cookies.
- Leaderboard display name, picture, and results are visible to other users until you turn that off.
- Delete on request within 30 days, except billing records the law requires them to keep. They say they reply to a privacy request within 30 days.
- Not for children under 13. The terms use 13 or the higher age the reader's country requires.
- Providers may process data outside the reader's country, including the United States.

> **See also:** [Breakscale](/Technology/System Design/Tools/Breakscale) · [GonnaCrash](/Technology/System Design/Resources/GonnaCrash) · [Sys0](/Technology/System Design/Resources/Sys0) · [System design fundamentals](/Technology/System Design/Practices/System Design Notes/Fundamentals) · [Designing For Distributed Failure](/Technology/System Design/Concepts/Designing For Distributed Failure)
