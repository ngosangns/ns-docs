---
area: technology
domain: system-design
type: tool
title: Breakscale
description: "MIT discrete-event system design simulator at breakscale.tech (workersio/breakscale). The browser, the VS Code webview, and the MCP server share one engine: 33 node kinds, 23 presets, and four challenges. Checked 2 November 2026: 1,953 stars, share links seal designs with AES-GCM and keep the key in the URL fragment, and the website also loads Vercel Analytics."
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - system-design
  - simulation
  - mcp
resource: https://breakscale.tech
---

# Breakscale

[Breakscale](https://breakscale.tech) is a system design simulator. You place components, wire them, and raise the offered traffic until queues, timeouts, or shed requests show up. The numbers come from a discrete-event engine in `src/sim`, which has no React and no network calls. The same engine is what the website, the VS Code panel, and the MCP server run. Checked 2 November 2026 against `main` at `9c71585`.

This is a different product from [GonnaCrash](/Technology/System Design/Resources/GonnaCrash). GonnaCrash is 200Lab's level game: a server grades a design against a budget. Breakscale is an open canvas with bundled examples and a local engine.

GitHub snapshot the same day: `workersio/breakscale`, MIT, TypeScript, created 23 August 2026, pushed 30 October 2026, 1,953 stars, 163 forks, 12 open issues, about 2 MB. `xevrion/breakscale` resolves to this repo. The npm author and the VS Code publisher are still `xevrion`. There are no GitHub releases. The homepage and `https://docs.breakscale.tech` both returned HTTP 200. This note did not run `bun dev`, did not run the test suite, and did not compare the published npm tarball with `main`.

## Where it runs

| Surface | What the repo says | What was checked |
| --- | --- | --- |
| Browser | `bun install` then `bun dev`, then `http://localhost:5173`. No account. | `package.json` script `dev` is Vite. React 19, Vite 8, TypeScript `~7.0.2`, Bun lockfile. |
| VS Code | Command **Open Breakscale**. Designs sit in the extension's own storage. A `.breakscale` file or a share link moves one to the website. | Marketplace item `xevrion.breakscale` is 0.1.1, last updated 26 September 2026, 33 installs and 77 downloads. `extension/package.json` is also 0.1.1 and wants VS Code `^1.90.0`. Storage key is `breakscale.webviewStorage` in `globalState`. |
| MCP | Hosted at `https://mcp.breakscale.tech/mcp`, or `npx -y breakscale-mcp --stdio` on Node 20 or newer. | A GET of that URL returned 405. npm `breakscale-mcp` is 0.1.1, published 28 September 2026. The server object in `mcp/src/server.ts` still says version `0.1.0`. |

`main` was pushed on 30 October 2026, after both the npm publish and the Marketplace update. The hosted server and the installed extension can lag the repo. The four tools registered in `createServer` are `read_me`, `create_view`, `export_design`, and `open_design`. `create_view` is the app tool: it builds a topology, runs it, and returns measured lines plus a breakscale.tech link. All four set `readOnlyHint`. `open_design` also sets `openWorldHint` because it fetches a share link.

## Engine

`Engine` in `src/sim/engine.ts` advances a min-heap of events. One `advance` call clamps the wall-clock step to 100 ms and processes at most 60,000 events. A request deeper than 32 hops fails with reason `depth`.

Service time is not a fixed multiple of the mean. `Rng` in `src/sim/random.ts` is mulberry32, so one seed and one topology replay the same draws. `serviceTime(mean, cv)` returns the mean when `cv` is at most 0.01, and otherwise a gamma draw with shape `1/cv^2` (Marsaglia-Tsang, with a boost when the shape is below 1). `cv` of 1 is the exponential case.

A component's `capacity` is how many requests it can work on at once, and `instances` is how many copies exist. Work past `instances × capacity` waits in a FIFO queue. The engine comment on buffering nodes says the caller's chain resolves as a success at the buffer, and a detached copy is relayed onward, so a queue can ack while workers are still behind. Latency percentiles come from a ring buffer of completed samples. Past 512 samples the percentile pass strides the window (`PERCENTILE_SAMPLE_CAP`).

Chaos is `FailureKind`: `crash`, `slow`, `errors`, and `partition`.

## Catalog

`NodeKind` in `src/sim/types.ts` has 33 members: `client`, `lb`, `service`, `cache`, `db`, `queue`, `worker`, `autoscaler`, `region`, `cdn`, `ratelimiter`, `breaker`, `replica`, `shard`, `objectstore`, `searchindex`, `timeseriesdb`, `graphdb`, `coldstorage`, `vectordb`, `streambroker`, `pubsub`, `websocket`, `apigateway`, `sidecar`, `lambda`, `cron`, `bulkhead`, `retryqueue`, `transcoder`, `edgecompute`, `writebehind`, `loadshedder`.

`PRESETS` has 23 entries. The first 16 are teaching topologies. The last seven are named after published systems. The README feature table names nine of the teaching presets and all seven company names. The other seven teaching presets are still in the array.

| id | Name in source |
| --- | --- |
| `single-server` | Single server |
| `load-balanced` | Load balanced |
| `cache-aside` | Cache aside |
| `async-workers` | Async workers |
| `retry-storm` | Retry storm |
| `cdn-origin` | CDN and origin |
| `rate-limited-api` | Rate limited API |
| `circuit-breaker` | Circuit breaker |
| `read-replicas` | Read replicas |
| `sharded-database` | Sharded database |
| `autoscaling-service` | Autoscaling service |
| `multi-region` | Multi-region failover |
| `full-stack` | Full stack |
| `specialised-stores` | Specialised stores |
| `event-driven` | Event-driven backend |
| `resilient-delivery` | Resilient delivery |
| `discord` | Discord: real-time chat |
| `uber` | Uber: ride dispatch |
| `netflix` | Netflix: streaming at scale |
| `spotify` | Spotify: music and discovery |
| `twitter` | Twitter/X: timeline fan-out |
| `stripe` | Stripe: correctness over availability |
| `whatsapp` | WhatsApp: store and forward |

The README says the company presets are reconstructions from published engineering write-ups, and that each one states what it leaves out. This note did not check those descriptions against the papers.

`src/sim/challenges.ts` adds four briefs on top of presets: `hold-the-line`, `more-machines`, `stop-the-storm`, `keep-it-warm`. The file header says each shipped preset fails at the brief's load, a named change makes it pass, and the thresholds were measured and pinned by tests. Those tests were not re-run here.

## What leaves the machine

A design can stay in browser storage or in the VS Code `globalState` key above. Sharing has two shapes, both described in `src/share/crypto.ts`.

An unstored link carries the design in the URL fragment. Browsers do not send the fragment to a server.

A stored link looks like `https://breakscale.tech/?s=<id>#k=<key>`. The key is a fresh AES-GCM 128-bit key per design. The 12-byte IV is prepended to the ciphertext. The Worker at `links.breakscale.tech` (`worker/src/index.ts`, KV binding `LINKS`) stores that blob and the id. The comment in the Worker says it never sees the key, so it cannot read the design. A GET of `https://links.breakscale.tech/` returned 404, which matches a store that only answers by id. Limits in that file and in `worker/wrangler.toml`: blob from 28 bytes to 256 KiB, id of 10 random bytes, 20 writes per address per 60 seconds, and browser writes allowed from `https://breakscale.tech` and `http://localhost:5173`. `seal` needs WebCrypto. The crypto file says `crypto.subtle` is missing on an insecure origin, so plain HTTP on a LAN address cannot seal.

`SECURITY.md` says Breakscale has no backend, no accounts, and sends no data anywhere. That sentence is older than the rest of the repo. The website entry `src/main.tsx` mounts Vercel Analytics and Speed Insights, and the comment there says both no-op outside a Vercel deployment. The README calls the page-view counter cookie-free and says the extension and the MCP server have no analytics. A search of the repo found `@vercel/analytics` imported only from `src/main.tsx`. The share Worker is a backend, and it is limited to ciphertext.

The code license is MIT. The bundled Caveat webfont under `public/fonts/Caveat/` is called out in the README as SIL Open Font License 1.1, copyright 2014 The Caveat Project Authors, with `OFL.txt` beside the file.

## Local use

```bash
git clone https://github.com/workersio/breakscale.git
cd breakscale
bun install
bun dev
```

The engine can be driven without the UI. The README's script constructs `Engine` with a preset topology and a seed, calls `advance(1000 / 60)` in a loop, and prints `snapshot().system`.

> **See also:** [GonnaCrash](/Technology/System Design/Resources/GonnaCrash) · [Sys0](/Technology/System Design/Resources/Sys0) · [Syscraft](/Technology/System Design/Resources/Syscraft) · [Designing For Distributed Failure](/Technology/System Design/Concepts/Designing For Distributed Failure) · [System design fundamentals](/Technology/System Design/Practices/System Design Notes/Fundamentals) · [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker)
