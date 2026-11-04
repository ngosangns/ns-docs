---
area: technology
domain: frontend
type: tool
title: Bklit TanStack Charts
description: "bklit-tanstack-charts (toomingos/bklit-tanstack-charts-migration, MIT) rebuilds bklit-ui chart components on TanStack Charts 1.1 and keeps the bklit compound API. Checked 4 November 2026 on main 9bdabac. npm latest is 0.1.1, published 1 November 2026, with peers React 19 and @tanstack/charts ~1.1.0. The README says this is not a pull request to bklit/bklit-ui. GitHub's license API returns NOASSERTION because the LICENSE file appends a derived-work notice after the MIT text."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - frontend
  - charts
  - tanstack
  - react
  - typescript
resource: https://github.com/toomingos/bklit-tanstack-charts-migration
sources:
  - id: github
    resource: https://github.com/toomingos/bklit-tanstack-charts-migration
    author: human:toomingos
  - id: npm
    resource: https://www.npmjs.com/package/bklit-tanstack-charts
  - id: package-readme
    resource: https://github.com/toomingos/bklit-tanstack-charts-migration/blob/main/showcase/migrated/README.md
  - id: upstream-gaps
    resource: https://github.com/toomingos/bklit-tanstack-charts-migration/blob/main/docs/UPSTREAM-GAPS.md
---

# Bklit TanStack Charts

[bklit-tanstack-charts](https://github.com/toomingos/bklit-tanstack-charts-migration) is an independent chart library. It rebuilds the chart components of [bklit-ui](https://github.com/bklit/bklit-ui) on [TanStack Charts](https://github.com/TanStack/charts) 1.1 and keeps the bklit compound-component API. The published package lives at `showcase/migrated`. Checked 4 November 2026 on `main` at `9bdabac665e6a77d0529dedac2db0267f649e806`. This note did not clone the repo, did not run pnpm, and did not open the Vercel showcase.

This library draws charts. [TanStack DB](/Technology/Frontend/Tools/TanStack DB) is a separate client store. The two packages do not share a repository.

## Who publishes it

The GitHub API the same day reported owner `toomingos` (user id 86632157), not a fork, created 4 August 2026, pushed 31 October 2026 at 23:52 UTC, default branch `main`, language TypeScript, 26 stars, 3 forks, 0 open issues, and 0 subscribers. The public description is "bklit-ui's charts rebuilt natively on TanStack Charts: same API, design and motion". The homepage field is `https://bklit-tanstack-charts-migration.vercel.app`. Topics are empty. `updated_at` is 4 November 2026, later than `pushed_at`, so that timestamp is not a newer commit.

`HEAD` is `Date pill: smooth fast hover, tick fade follows the pill (0.1.1)`, authored by `toomingos` on 31 October 2026 at 23:52 UTC. The message says WAAPI springs rebuilt on every retarget froze the date pill, so the pill now uses the overlay animation loop, and tick fade keys on the CSS variable `--bkm-pill-x`. The same commit bumps `showcase/migrated/package.json` from `0.1.0` to `0.1.1`.

`LICENSE` on that commit is the MIT text. The copyright line is "Copyright (c) 2026 bklit-tanstack-charts contributors". After the MIT text, a notice says portions derive from bklit-ui, MIT, copyright 2026 uixmat, and points at `showcase/migrated/NOTICE`. That notice also names TanStack Charts, MIT, copyright 2026-present Tanner Linsley. GitHub's license API returns SPDX `NOASSERTION` (`key` `other`). npm `bklit-tanstack-charts@0.1.1` reports license MIT. The root README says the migration code is MIT as well.

npm `latest` is `0.1.1`, published 1 November 2026 at 00:00 UTC. The registry lists one maintainer, `toomingos`. The package document records `0.0.0-stage` at 30 October 2026 17:22 UTC with the description "Temporary package placeholder for staged publishing", then `0.1.0` two minutes later, then `0.1.1`. The `0.1.1` tarball metadata says 682 files and an unpacked size of 2143609 bytes. This check did not download the tarball.

## Where the code lives

The root of `main` contains `.gitignore`, `.npmrc`, `AGENTS.md`, `LICENSE`, `README.md`, `docs/`, `scripts/`, and `showcase/`. There is no root `package.json`. `docs/` on this commit contains only `UPSTREAM-GAPS.md`.

The root README describes `showcase/` as a Next.js 15 app on port 5200. Each chart route renders bklit and the migrated chart together. `showcase/migrated/charts` is the library. `showcase/packages/bklit-charts` re-exports bklit's own charts. `showcase/repos` is a gitignored clone of bklit-ui. `scripts/` holds `clone-repos.sh` and `vercel-build.sh`. Getting started in that README requires Node 20 or newer and pnpm, then the clone script, `pnpm install`, and `pnpm dev` at `http://localhost:5200`. None of that was run.

`showcase/migrated/package.json` names `bklit-tanstack-charts`, version `0.1.1`, `sideEffects` false. Source `exports` point `.` at `./charts/index.ts` and `./styles.css` at `./charts/styles.css`. `publishConfig.exports` point at `dist/index.d.mts`, `dist/index.mjs`, and `dist/styles.css`. The `prepack` script exits unless `npm_config_user_agent` starts with `pnpm/`. Its error text says only pnpm applies `publishConfig.exports`, and npm would ship exports that point at TypeScript files the tarball does not contain. `build` is `tsdown && cp charts/styles.css dist/styles.css`. `files` includes `dist`, `docs`, `skills` except `skills/_artifacts`, `LICENSE`, `NOTICE`, and `README.md`.

Peer dependencies are `@tanstack/charts` `~1.1.0`, `@tanstack/react-charts` `~1.1.0`, `react` `^19.0.0`, and `react-dom` `^19.0.0`. Dev dependencies pin both TanStack packages to `1.1.0`, plus `tsdown` `0.23.1` and `typescript` `5.9.3`. Runtime dependencies include `@base-ui/react` `^1.7.0`, `@number-flow/react` `^0.5.4`, `clsx`, `tailwind-merge`, `d3-geo` `3.1.1`, `d3-sankey` `0.12.3`, `d3-scale` `4.0.2`, and `d3-shape` `^3.2.0`. `@types/d3-geo`, `@types/d3-sankey`, `@types/d3-scale`, `@types/d3-shape`, and `@types/geojson` sit in `dependencies`, not `devDependencies`.

## How a chart is built

The root README says the migration is complete. Every chart is a `defineChart` composition of built-in marks, layouts, states, `motion()`, and the native interaction controller. Custom code is limited to what that README says TanStack Charts 1.1 cannot express. Those cases are written in `docs/UPSTREAM-GAPS.md`.

`showcase/migrated/charts/index.ts` opens by saying the public API follows bklit-ui's shape. Exports tagged `@internal` stay so importers from bklit-ui still compile. They are not the documented API. The package README says a move from bklit-ui swaps `@bklitui/ui/charts` for `bklit-tanstack-charts` and adds one stylesheet import. Props and child names stay the same, in that README's account. This check read the file comment and the README. It did not diff each prop against bklit-ui.

The package README lists 16 chart kinds. They are Line, Area, Scatter, Bar, Candlestick, Composed, Live line, Pie, Ring, Radar, Gauge, Funnel, Heatmap, Sunburst, Sankey, and Choropleth. The JavaScript entry does not import CSS. The app imports `bklit-tanstack-charts/styles.css` once. Without that file the README says the charts render unstyled. The default palette is greyscale through `--chart-1` to `--chart-5`. Dark mode follows an ancestor `.dark` class or `data-theme="dark"`.

The same README says the package is ESM only and needs ES2023, including `Array.prototype.toSorted`, plus Node 20 or newer and React 19. It claims server rendering for Next.js App Router, TanStack Start, React Router framework mode, Astro, and Vite. It marks Line, Area, Scatter, Bar, Candlestick, Composed, Gauge, Funnel, Sunburst, Sankey, and Choropleth as server-rendered SVG with the entrance replayed after hydration. It marks Pie, Ring, Radar, Heatmap, and Live line as client-only. Those five render an empty shell until mount. This check did not render any of them.

Differences the package README states, and this check did not re-verify in source, are these. No Tailwind, shadcn, or `motion` package is required, and a spring `enterTransition` becomes a tween of its duration. Gradients and patterns use the same names and are not re-exports of `@visx/gradient` and `@visx/pattern`. `useAnimatedYDomains`, `useChartInteraction`, `CHART_CLIP_PASSTHROUGH`, and `extractProjectionLineConfigs` are not exported. Pie shows the hovered value in `PieCenter` and has no floating tooltip. The dependency list still includes `tailwind-merge` even though that README says Tailwind is not required. This check did not search call sites.

## Gotchas

The root README's "What this is NOT" list says this is not a pull request against `bklit/bklit-ui`, not an official bklit product, and not a replacement for proprietary bklit Studio. It calls the repo an independent exploration of TanStack Charts as a rendering backend for bklit's chart API.

The root README also says `charts/index.ts` exports bklit's public chart API only. The file comment on the same commit keeps `@internal` exports for compatibility. Read both. The public documented surface and the compatibility exports are not the same set.

`docs/UPSTREAM-GAPS.md` says it was verified against TanStack Charts 1.1.0, tag `v1.1.0`, commit `57774e14`, on 11 October 2026. The glance line says 43 open gaps, 29 covered by a posted upstream issue or comment, and 14 not. The area counts in that table add to 43. The file says 12 retired numbers sit at the bottom and are not reused. It names gaps 15, 55, 17, 34, and 39 among the ones not posted, and it says drafts live in `docs/upstream-issues/`, local only. That directory is not in the `docs/` tree on this commit. Gap costs in the file come from the author's Live Perf panel and Chrome profiles. This check did not remeasure them and did not open the TanStack issues.

The root README says the showcase overview reports first paint and settled time at parity, and a larger bundle for the migrated charts. It also says the method and the raw data are not a claim of a win. Those figures were not opened and were not remeasured here.

`prepack` refuses a pack whose user agent is not pnpm. Publishing with npm would skip `publishConfig.exports`.

## What this check did not do

No clone, no `pnpm install`, no typecheck, no production build, and no browser session on the Vercel app or on `localhost:5200`. Chart source beyond `charts/index.ts`, `package.json`, `LICENSE`, `NOTICE`, the two READMEs, and the opening of `UPSTREAM-GAPS.md` was not read. The 43 gap count is the document's own glance line, checked only by adding the area counts in that table.

## See also

- [TanStack DB](/Technology/Frontend/Tools/TanStack DB) for the separate TanStack client store.
