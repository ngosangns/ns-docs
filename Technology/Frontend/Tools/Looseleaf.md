---
area: technology
domain: frontend-ui
type: tool
title: Looseleaf
description: Looseleaf (kevintngo/looseleaf, MIT) is a shadcn/ui-compatible React component library where every surface is paper and every line is a seeded SVG drawing — 123 components, 61 blocks and a static shadcn registry, installed as source rather than a dependency.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - frontend
  - react
  - shadcn
  - design-system
resource: https://github.com/kevintngo/looseleaf
---

# Looseleaf

[Looseleaf](https://github.com/kevintngo/looseleaf) — "shadcn/ui, drawn by hand" — is a React 19 + Tailwind v4 + Radix component library and [shadcn registry](https://ui.shadcn.com/docs/registry) where every surface is paper and every line is drawn with a pen. It keeps shadcn/ui's parts, props and `data-slot` names, so it swaps into existing JSX; the decoration is the difference, the semantics stay Radix. Demo: [kevintngo.github.io/looseleaf](https://kevintngo.github.io/looseleaf/). Checked 2026-11-02 against the README, `registry.json`, `notes/registry.md`, component source, tests, `package.json`, the GitHub API and the built registry JSON. Not installed, not built, no test run.

## What is in it

| Thing          | Count                   | Note                                                                                                                                                          |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI components  | **123** (`registry:ui`) | 61 mirror the shadcn/ui set snapshotted in `.upstream/shadcn`; the rest are paper objects, marks, stickers and media bits                                     |
| Blocks         | **61**                  | `registry:block` has 62 items, but one is the `looseleaf-blocks` umbrella; README's 61 excludes it                                                            |
| Registry items | **213**                 | 123 ui, 62 block, 19 lib, 5 hooks, 2 theme, 1 style, 1 font                                                                                                   |
| Icons          | **160**                 | verified by counting entries in 10 batch files                                                                                                                |
| Doodles        | **48**                  | 3 batches of 16                                                                                                                                               |
| Stickers       | **96 entries**          | README says 88; the last 8 entries in `badges-stamps.ts` are badges (rating, first place, A+, …), so the README likely counts stickers + stamps without those |
| Mascot         | **Stubby, 15 poses**    | idle, wave, think, write, sketch, celebrate, oops, shrug, sleep, peek, point, carry, halt, search, unplug                                                     |
| Font           | **Kevin Sans**          | custom hand-drawn face, woff2 400/700 (43.5 KB / 48.2 KB), MIT with the code; IBM Plex Mono is SIL OFL 1.1                                                    |

Repo snapshot: created 2026-11-01T05:16Z, last push 2026-11-01T18:25Z, 9 commits, single author (`kevintngo`, account created 2026-10-20), 41 stars, 2 forks, 1 open issue, MIT, TypeScript, ~31 MB. Stars rechecked on the GitHub API at 2026-11-02T09:37Z. The commit count was not recounted. Very new. Treat the API surface as unstable.

## Install

It is not an npm package (`"private": true`); installation is the shadcn CLI pulling source into your repo.

```json
{
  "registries": { "@looseleaf": "https://kevintngo.github.io/looseleaf/r/{name}.json" }
}
```

```sh
npx shadcn@latest add @looseleaf/button
npx shadcn@latest add @looseleaf/login-01
npx shadcn@latest add @looseleaf/looseleaf   # everything
```

```tsx
import { InkProvider } from "@/lib/ink/react"
import { Button } from "@/components/ui/button"

;<InkProvider>
  <Button>Save changes</Button>
</InkProvider>
```

Components land as `components/ui/*.tsx` and `lib/ink/*` — your code, not a dependency. The theme carries Kevin Sans; you can also load `https://kevintngo.github.io/looseleaf/fonts/kevin-sans.css` by hand.

Measured built items: `button.json` is 12 KB / 2 files (`ui/button.tsx` 3.9 KB + `lib/ink/recipes/button-ink.ts` 5.6 KB), depending on `class-variance-authority`, `radix-ui`, `ink.json` (148 KB) and `looseleaf-theme.json` (50 KB); `ink-stickers.json` is 258 KB. The repo's own `--explain` measurements say `shadcn add button` writes 26 files / 483 KB once dependencies are resolved, `login-01` 103 files / 1.0 MB, `sidebar-01` 121 files / 1.2 MB, and the full `looseleaf` item 326 files / 2.9 MB. Those last figures are from `notes/registry.md`, not reproduced here.

## How the drawing works

- Every drawn thing is one `<svg data-ink aria-hidden="true">` behind the real DOM label. The DOM keeps the accessible name and behavior; the SVG is decorative.
- Each component has a recipe (`src/lib/ink/recipes/<component>-ink.ts`): a pure, **seeded** TypeScript function that emits SVG paths colored by CSS variables. Same seed → same line on server and client, so SSR does not flicker.
- States are CSS, not React: hover, press and focus reveal layers drawn ahead of time. The drawing sits in a size-0/`absolute` layer, so it does not affect layout.
- Tokens (`--ll-*`) alias shadcn semantic variables; density variants are `compact` and `calm` on top of the default.
- The ink engine is split into registry items by import graph — `ink` (core), `ink-recipes`, `ink-paper`, `ink-art`, `ink-icons`, `ink-doodles`, `ink-stickers`, `ink-mascots`, `ink-props`, `ink-scenes` — so a button install does not drag the sticker book. Art is opt-in and the build fails on import cycles.
- Pipeline: `src/` → `registry.json` → `shadcn build` → `public/r/*.json`, all derived from source; `registry:check` catches stale output, and a consumer test installs items into fixture projects with several alias layouts. Verified against shadcn CLI 4.21.0, Tailwind 4.3.3, Node 24.

## Accessibility

README claims keyboard support, visible focus, AA text, 24 px targets, reduced motion, forced colors, RTL and three densities. What is visible in the repo:

- Real DOM controls with `data-slot="button"` etc.; the SVG is `aria-hidden`.
- `axe-core` in the test stack (`tests/audit-foundation.test.tsx` calls `axeCheck`, including dialog/escape/focus-return checks).
- `tools/contrast-pairs.json` lists 105 foreground/background pairs with explicit WCAG thresholds (7 = AAA body, 4.5 = AA, 3 = non-text UI, 1.3–1.5 = decorative hairlines), re-run per `[data-theme]` scope.
- `prefers-reduced-motion` and `[data-motion="reduced"]` zero the motion token; `@media (forced-colors: active)` rules exist; direction/RTL audits live in `tests/direction.audit.test.tsx`.
- 263 test files total; sizes go down to 24 px (`h-6`, `size-6`), consistent with the target claim.

Caveat: these are self-tests, not a third-party audit. There is no VPAT or WCAG conformance statement, and I did not run axe or browse the components.

## What to watch

- **Age and churn.** One day old, nine commits, single maintainer, no tags or releases. The registry URL always serves `main`, so an install is not version-pinned; the shadcn snapshot in `.upstream/` can drift from upstream.
- **Payload.** The engine plus theme is unavoidable for any component; art kits add hundreds of KB (stickers 258 KB alone). The repo mitigates with item splitting, but a "simple" button still writes ~483 KB across 26 files.
- **Accessibility is a claim, not a certification.** The tooling is unusually thorough for a launch project, but tests only prove what they cover.
- **License.** MIT covers code, art and Kevin Sans; IBM Plex Mono is OFL 1.1. No extra terms, unlike some "open" launch projects.

## Not checked

Did not `npm install`, build or run the test suite; did not install through the shadcn CLI or open the components in a browser; did not run axe, contrast checks, RTL or forced-colors; did not verify every one of the 123 components or the 61 blocks. Counts come from `registry.json` and source files, not from the marketing page. The 88-vs-96 sticker difference is inferred from the eight badge entries, not confirmed by the author.

> **See also:** [Hallmark](/Technology/Frontend/Tools/Hallmark) · [SakaniUI](/Technology/Frontend/Tools/SakaniUI) · [Audiocn](/Technology/Frontend/Tools/Audiocn) · [OrganUI](/Technology/Frontend/Tools/OrganUI)
