---
area: technology
domain: system-design
type: resource
title: Quorum
description: "Quorum (elianiva/quorum) is the browser systems game at playquorum.dev. The README says you wire components, pick a stack, and the simulation marks one bottleneck. Checked 4 November 2026 on main 13f0c90. package.json says GPL-3.0-or-later, while the GitHub license API says GPL-3.0. quorum.elianiva.com returns HTTP 301 to playquorum.dev. The scope document still describes build 02f8200, and main is 126 commits ahead of it."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - system-design
  - learning
  - simulation
  - game
resource: https://playquorum.dev/
sources:
  - id: site
    resource: https://playquorum.dev/
    author: human:elianiva
  - id: github
    resource: https://github.com/elianiva/quorum
    author: human:elianiva
  - id: readme
    resource: https://github.com/elianiva/quorum/blob/main/README.md
---

# Quorum

[Quorum](https://playquorum.dev/) is a browser game by elianiva. The page title calls it a systems design game for software engineers. The meta description says you grow a startup from one server in a garage to a public company, wire components, pick stacks, and fix one bottleneck after another. Checked 4 November 2026. The HTML shell loaded. The board was not played.

The public source is [elianiva/quorum](https://github.com/elianiva/quorum). This is not the Quilibrium messenger, not GoQuorum, and not the multi-model debate CLIs that also use the name Quorum.

## Who publishes it

The GitHub API the same day reported owner `elianiva`, not a fork, created 17 October 2026, pushed 4 November 2026 at 09:06 UTC, default branch `main`, language TypeScript, 36 stars, 7 forks, 3 open issues, and 0 subscribers. The public description is "The on-call simulator. Try designing your system to survive." Topics are empty. There are no GitHub releases. The homepage field is still `quorum.elianiva.com`.

`HEAD` is `13f0c90611485c135b8c5cb9df6140c8b76a90cd`, "Turn the title screen into the on-call booth", authored by `elianiva` on 4 November 2026 at 08:54 UTC.

`package.json` on that commit says `"license": "GPL-3.0-or-later"`. The README license section says GNU General Public License v3.0 or later. The `LICENSE` file is the standard GPLv3 text. GitHub's license API returns SPDX `GPL-3.0`.

JSON-LD on `https://playquorum.dev/` types the page as a `VideoGame`, names the author elianiva with `https://elianiva.com`, lists genres Incremental, Simulation, and Educational, sets `gamePlatform` to "Web browser", and sets `isAccessibleForFree` to true. The canonical URL is `https://playquorum.dev/`. A request to `https://quorum.elianiva.com/` returned HTTP 301 to `https://playquorum.dev/`. `alchemy.run.ts` on this commit sets the prod domain to `playquorum.dev` and lists `quorum.elianiva.com` as a redirect. `CONTRIBUTING.md` says CI deploys every push to `main` to the prod stage at playquorum.dev after checks pass.

## Where the code lives

The root of `main` is a pnpm workspace. `apps/web` is the Foldkit client and the website Worker. `apps/backend` is the Effect RPC handlers and the API Worker. `packages/simulation` is the simulation package. `packages/rpc` is the wire contract. `CONTRIBUTING.md` names the stack Cafe. Cloudflare is the runtime, Alchemy is the infrastructure, Foldkit is the UI, and Effect is the server and the shared contract.

Root `package.json` is private, `packageManager` `pnpm@12.0.0`, and `engines.node` is `>=24.11.0`. `CONTRIBUTING.md` asks for Node.js 24.11 or newer and pnpm 12, then `pnpm install` and `pnpm dev`. None of that was run. Dev dependencies on that file include `effect` `4.0.0`, `alchemy` `2.0.0-beta.84`, and `vitest` `5.0.3`. `apps/web/package.json` depends on `pixi.js` `8.22.0`, `foldkit` `0.167.0`, and `@foldkit/ui` `0.168.0`.

`packages/rpc/src/paths.ts` sets `API_PREFIX` to `/api` and `RPC_PATH` to `/api/rpc`. `alchemy.run.ts` binds the API Worker to the website and forwards that prefix. It also creates a D1 database named `Results` for challenge results. The same file sets Workers observability `headSamplingRate` to 1, and its comment says sampling at 1 records every request and that both rates should be lowered before real traffic. This check did not read the live Cloudflare settings.

## How a company runs

The README on this commit is the play guide. The first Company is one Users node, one App Server, Payments, and Analytics. Requests move along links you draw. Served requests earn Cash. Analytics samples traffic into Insight, which buys research. The simulation is a flow network. One node limits the most revenue, and the board marks it. The card names the limit, such as CPU, credits, RAM, workers, or connections. The README says more hardware fixes only some of those limits, and each fix moves the bottleneck.

Each App Server runs a stack of runtime and framework. The README says no option strictly beats another. The inspector image alt text lists mod_php, PHP-FPM, Puma, Node.js, Gunicorn, Go, Tomcat, Kestrel, BEAM, and Tokio. Go is described as cheap on idle connections, with garbage collection taking CPU when the heap fills. PHP-FPM is described as slow per request and unable to leak memory between requests. Those sentences are the README. This check did not read the runtime formulas.

The same README gives this era table.

| Era | Leave at | New request kinds | New failure mode |
| --- | --- | --- | --- |
| Garage | 1,000 users | page, read | One box runs out of CPU, then RAM |
| Pre-seed | 5,000 users | write, login | Database contention, connections, CPU-heavy work |
| Seed | 25,000 users | search, upload, bot | Unlike workloads, abuse, large payloads |
| Series A | 150,000 users | media, rt, buy | Zone failures, egress cost, money correctness |
| Series B | 1,000,000 users | job, report, ai | OLTP against OLAP, GPU economics, team scaling |
| Series C | 10,000,000 users | feed, hook, push | Fan-out, hot keys, geography, region failures |
| Pre-IPO | 50,000,000 users plus IPO | none listed | Compliance, disaster recovery, margin |
| Public | Endless | none listed | Quarterly guidance |

An incident tests a weak part of the design. The README names a zone outage, a cache stampede, a retry storm, and a CVE. A company ends in an exit. The README names an acqui-hire, an acquisition, an IPO, or stepping down. Equity times valuation pays Legacy. Legacy buys perks. Saved playbooks carry into the next company. New ventures named there include fintech, streaming media, and an AI startup.

Outside one company, the README describes sandboxes and challenges. A challenge is a fixed puzzle scored on cost, tail latency, and complexity. The README says the server re-runs each replay and places the result on a histogram of every player's best, as a percentile rather than a rank. `CONTRIBUTING.md` says the browser plays the simulation and the API Worker replays it. This check did not submit a replay.

## Gotchas

`docs/gdd/17-scope-and-roadmap.md` on this same commit still opens "What exists today" with build `02f8200`. That commit is `02f82006d2da9b11e1b57bb809f09ef3a6e5d3a6`, dated 1 November 2026, message "Even out the build dock's top padding". The compare API says `main` at `13f0c90` is 126 commits ahead of `02f8200` and 0 behind. Catalog counts in that scope section were not copied here.

The sitemap at `https://playquorum.dev/sitemap.xml` lists only `https://playquorum.dev/`. `robots.txt` allows all agents. The page says the game needs JavaScript. The manifest names a standalone display.

`alchemy.run.ts` deploys prod with full request sampling while `CONTRIBUTING.md` says every green push to `main` deploys to playquorum.dev. The comment in the stack file still says to lower the rates before real traffic.

## What this check did not do

No clone, no `pnpm install`, no test run, and no play of the board, a sandbox, or a challenge. `/api/rpc` was not called. The design documents under `docs/gdd/` were not used as the current catalog, except to record that the scope file still names build `02f8200`.

## See also

- [GonnaCrash](/Technology/System Design/Resources/GonnaCrash) is 200Lab's graded browser game.
- [Syscraft](/Technology/System Design/Resources/Syscraft) is a hosted system design lab.
- [Breakscale](/Technology/System Design/Tools/Breakscale) is a local discrete-event canvas.
