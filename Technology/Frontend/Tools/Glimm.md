---
area: technology
domain: frontend
type: tool
title: Glimm
description: "glimm (npm glimm 0.3.1, MIT, Noman Ijaz) draws a WebGL band across the page during a route change, with a vanilla core and React and Next.js adapters. Checked 4 November 2026. The homepage says the library is under 10 KB. Published dist/index.js is 68514 bytes and gzip at level 9 is 18231 bytes. The repository URL in the npm document, github.com/nomanjack/glimm, returned HTTP 404. The homepage says Next 13 or newer, while peerDependencies set next to >=14."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - frontend
  - react
  - nextjs
  - webgl
  - animation
resource: https://glimm.dev/
sources:
  - id: site
    resource: https://glimm.dev/
    author: human:Noman Ijaz
  - id: npm
    resource: https://www.npmjs.com/package/glimm
  - id: skill
    resource: https://github.com/nomanjack/glimm-skill
    author: human:nomanjack
---

# Glimm

[glimm](https://glimm.dev/) is a page-transition library by Noman Ijaz. A WebGL colour band sweeps the viewport and the next view shows behind the band. The homepage, read on 4 November 2026, says the library is for React and Next.js, that the same sweep can run on a route change or on a state change you choose, and that the build is GPU-composited, under 10 KB, and has zero performance impact. The size sentence and the performance sentence are the homepage. This check did not run a transition and did not trace a frame.

This note is the npm package `glimm`. It is not [getglim.dev](https://getglim.dev/) (`@axaylabs/glim`), not the GLIM mapping framework, not the GitLab TUI named glim, and not Glimmervoid.

## Who publishes it

npm `latest` is `0.3.1`, published 13 September 2026 at 14:40 UTC. The package was created 21 May 2026. Versions `0.1.0`, `0.1.1`, `0.1.2`, and `0.1.3` set `license` to `UNLICENSED`. `0.1.4` and later, including `0.3.1`, set `license` to `MIT`. The published `LICENSE` file is the MIT text, copyright 2026 Noman Ijaz, and it names iamnoman.com. The homepage footer says `v0.3.1` and MIT, made by Noman. The npm maintainer name is `nojack`.

The npm document points `repository` at `git+https://github.com/nomanjack/glimm.git` in directory `packages/glimm`, and `bugs` at `https://github.com/nomanjack/glimm/issues`. A request to the GitHub API for `nomanjack/glimm` on 4 November 2026 returned HTTP 404. The homepage HTML fetched the same day has no GitHub link. The public repo [nomanjack/glimm-skill](https://github.com/nomanjack/glimm-skill) is a coding-agent skill that installs glimm. Its README says `npx skills add nomanjack/glimm-skill` and Node 22.20 or later. That repo is MIT, has no description, 0 stars, and was pushed 3 November 2026. It is not the library source.

## Where the package lives

`glimm@0.3.1` has no `dependencies` field. `peerDependencies` are `react` `>=18` and `next` `>=14`, both marked optional in `peerDependenciesMeta`. `engines.node` is `>=18`. Dev dependencies on that document include `next` `^16.0.0`, `react` `^19.0.0`, `tsup` `^8.3.5`, `typescript` `^5.7.3`, and `vitest` `^3.2.7`. `sideEffects` is false. `exports` map `.` to `dist/index.js`, `./react` to `dist/react.js`, and `./next` to `dist/next.js`, each with a matching `.d.ts`.

The jsDelivr file list for `0.3.1` gives these sizes. `dist/index.js` is 68514 bytes. `dist/index.min.js` is not in `exports`, and the CDN still serves it at 52035 bytes. `dist/chunk-IKX3GGU3.js` is 41024 bytes. `dist/next.js` is 3386 bytes. `dist/react.js` is 96 bytes. Gzip at level 9 of the CDN bytes, computed here and not a browser transfer, is 18231 bytes for `dist/index.js` and 16900 bytes for `dist/index.min.js`. An application bundle after tree-shaking was not built. The unpacked package metadata says 11 files and 148009 bytes.

The npm README names three entry points. `glimm` is the core, with shader factories, `playSweep`, palettes, easings, and colour math. `glimm/react` adds `GlimmProvider` and `useGlimm`. `glimm/next` adds `TransitionLink`, `useTransitionRouter`, and `InterceptLinks`. The README says one app should import the provider from a single entry so the hooks share one React context.

## How a sweep runs

The npm README says a sweep keeps the outgoing view ahead of the band and reveals the incoming view behind it. `playSweep` is the low-level call. `onMidpoint` swaps content. `GlimmProvider` is what coordinates React and Next.js. The README says that provider keeps the outgoing view with the browser View Transitions API, turns off the browser crossfade, and draws the shader as a separate layer. If snapshots fail, it covers the view with an opaque curtain, updates, then reveals. `prefers-reduced-motion` and missing WebGL skip the shader and navigate immediately. The same section says an 8 second preparation timeout stops the transition from trapping the page, and that the timeout cannot cancel requests the app already started.

The homepage says the provider stays idle until the first sweep, and that it creates one WebGL context then. It also says an app that never transitions pays nothing at setup. That sentence is the homepage. This check did not profile it.

Default options in the npm README include `sweepMs` 1100, `outroMs` 220, `midpoint` 0.56, palette `prism`, and direction `ltr`. The changelog for `0.3.1` says the default outro moved from 700 ms to 220 ms. Built-in palettes named there are `prism`, `berry`, `lagoon`, `citrus`, `azure`, and `ember`. Built-in easings named there are `linear`, `easeOutQuart`, `easeOutCubic`, `easeInCubic`, `easeInOutCubic`, `easeOutExpo`, `easeInOutQuint`, `snap`, `ease`, and `back`. Directions are `ltr`, `rtl`, `ttb`, and `btt`.

On Next.js, the homepage shows three triggers. `TransitionLink` is for a known href. `useTransitionRouter` is for a push after other work. `InterceptLinks` sends same-origin clicks through a sweep. The README says `data-glimm-skip` opts a link out. It also says Next.js router calls do not return a readiness promise, so the provider does not promise that every image or streamed boundary has finished.

## Gotchas

The homepage says React 18 or newer and Next 13 or newer are the peer deps. The published `0.3.1` peer range for Next is `>=14`. React `>=18` matches the homepage. Both peers are optional, and the README says the core entry needs neither.

The homepage size line does not match the published files measured above. "Zero performance impact" was not measured here.

`0.3.1` says cancelling a sweep settles the handle and skips a midpoint callback that has not started. It does not undo navigation that already began. The README says to call `ctrl.setAlpha(0)` or destroy the controller when a core sweep stops with no replacement.

Two other packages wrap the same idea and are not this release. `glimm-adapters` says it wires TanStack Router, React Router, SvelteKit, Vue Router, Nuxt, Astro, and vanilla JS, and that it is built against glimm `0.3.1`. `glimm-vue` calls itself an unofficial Vue 3 port by Kamarool Karim and says it is not endorsed by Noman Ijaz. This check did not open those repositories.

## What this check did not do

No `npm install`, no test run, and no browser session through the four homepage demos. The library source at `github.com/nomanjack/glimm` was not readable. Shader source inside the published bundle was not read. The gzip figures are level 9 on the CDN file bytes.

## See also

The public install skill is [nomanjack/glimm-skill](https://github.com/nomanjack/glimm-skill).
