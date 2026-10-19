---
area: technology
domain: frontend
type: tool
title: SakaniUI
description: SakaniUI (samzydd/Sakaniui, npm @sakaniui/react 0.8.5, MIT) is a single-author React 19 design system built 1:1 from a Figma file - 114+ components, 42 copy-and-edit blocks, three-layer CSS-variable tokens, light/dark plus a Solid/Glass/Liquid surface axis with SVG-refraction liquid glass (Chromium only), Tabler icons and Recharts charts. About 3 months old, 63 stars.
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - frontend
  - react
  - design-system
  - component-library
  - liquid-glass
resource: https://github.com/samzydd/Sakaniui
---

# SakaniUI

[SakaniUI](https://www.sakaniui.com) ([samzydd/Sakaniui](https://github.com/samzydd/Sakaniui), formerly `Sakani-design-system`; the old URL redirects) is an open-source **React component library and design system for SaaS UIs**. Every component is designed first in a [Figma community file](https://www.figma.com/community/file/1661001585975776295) and then implemented 1:1 in React with the same tokens, variants and states. Its main selling point is glass and Apple-style "liquid glass" surfaces built into the theme system.

Checked 2026-10-19:

- **Author:** Samuel (Sam) Okpere, GitHub `samzydd` (display name "csakani"), a UI/UX and design-systems designer. 495 commits, all by him, from 2026-07-17 to today.
- **Repo:** 63 stars, 5 forks, 0 open issues. Single maintainer.
- **License:** MIT. `THIRD_PARTY_NOTICES.md` covers Tabler Icons (MIT).
- **npm:**
  - [`@sakaniui/react`](https://www.npmjs.com/package/@sakaniui/react): latest is `0.8.5`; the repo is already at 0.8.6, unpublished. 51 versions since 2026-08-28, about 2.3k downloads in the week of 2026-10-10 to 10-16. The unpacked size is 6.7 MB in 6,595 files, mostly the per-icon modules.
  - [`@sakaniui/cli`](https://www.npmjs.com/package/@sakaniui/cli) `0.1.0` copies blocks into a project.
- **Docs:** [sakaniui.com/docs](https://www.sakaniui.com/docs), a [live Storybook on Chromatic](https://main--6a5a658b3681fcc010430db5.chromatic.com), and an `AGENTS.md` plus [llms.txt](https://www.sakaniui.com/llms.txt) for coding agents.
- **Stale descriptions:**
  - The GitHub repo description still mentions "Sicons (1,626 icons, based on Lucide) and Glass Icons". Per the CHANGELOG both were removed and replaced by Tabler Icons.
  - The site FAQ says "Is there a CLI? Not yet", but `@sakaniui/cli` exists. Trust the README and CHANGELOG.

## What's in it

- **Stack:** React 19 (peer dependency), strict TypeScript, CSS Modules on CSS custom properties, Vite library build, Storybook 10.
  - Runtime dependencies are only `recharts` and the Geist font packages.
  - It works with Next.js, Vite or CRA, and next to Tailwind, because its styles are CSS Modules.
- **Tokens:** three layers, all exported from Figma into `tokens.css`:
  - primitives (raw scales)
  - semantic (`bg/surface`, `fg/muted`, `accent/default`, `chart/1–6`, which flip in dark mode)
  - components, which bind only to semantic tokens.
  - Re-theming means changing the semantic layer. Dark mode is a `.dark` class on any container.
- **Surface axis: Solid, Glass, Liquid.** This is a third theme dimension next to light and dark.
  - `data-surface="glass"` on any ancestor gives frosted glassmorphism.
  - `LiquidBackdrop` + `LiquidGlass` (and `useLiquidGlass`) give lens-style refraction. They use an SVG `feDisplacementMap` filter, with color fringing, rim light and Figma's own Glass properties (refraction, depth, dispersion, frost) as props or tokens.
  - Refraction renders only in Chromium. Safari and Firefox get a frosted fallback.
  - `prefers-reduced-transparency` turns the glass opaque, and `prefers-reduced-motion` stops the glare and squish effects.
  - Big static lenses are drawn once into a canvas.
- **Components (114+ by the README; 69 component folders in `src/components`, many with sub-parts):**
  - Core, Forms (Combobox with async loading, File Upload) and Composite (generic `Table<T>`, Calendar with range, Stepper, Toast).
  - A 9-part Sidebar kit, Top Bar and Menu.
  - Charts: Recharts wrappers (Area, Bar, Donut, Funnel, Heatmap, Line, Pie, Radar, Radial).
  - Chat, Application widgets (Balance, Transactions, Stock Market and more), E-commerce, and Marketing/blog pieces.
  - The Figma file has "1,500+ components and variants", and the React side is still catching up.
- **Blocks (42):** auth, billing, e-commerce, marketing, a CRM dashboard, a Kanban board, a Liquid Glass dashboard, chat and more.
  - They are composition examples with fixed demo states, not configurable components.
  - Import them from `@sakaniui/react/blocks`, or copy the source and edit it, which is the intended workflow.
- **Icons:** `@sakaniui/react/icons` has all 5,184 outline and 1,054 filled Tabler icons, one tree-shakeable component each (about 1 kB per icon). Props follow lucide-react (`size`, `color`, `strokeWidth`).
- **Accessibility claims (from the README, not audited here):** WCAG AA contrast-checked token pairs, a global focus ring, ARIA patterns (combobox active-descendant, live-region toasts, focus-returning popovers). The Storybook includes the a11y addon.

## Usage

```bash
npm install @sakaniui/react
```

```tsx
import "@sakaniui/react/tokens.css" // once, at the app root (README's Liquid Glass guide also imports style.css)
import { Button, StatCard } from "@sakaniui/react"
import { IconCurrencyDollar } from "@sakaniui/react/icons"

;<div className="dark">
  <StatCard variant="icon" icon={IconCurrencyDollar} title="Revenue" value="$48,120" delta="+12.5%" trend="up" />
  <Button variant="primary">Get started</Button>
</div>
```

Blocks: `import { DataTableBlock } from "@sakaniui/react/blocks"`, or use `npx @sakaniui/cli list` and `npx @sakaniui/cli add data-table-block [--dir path]`. The second copies the source into `src/blocks/<Name>`.

To browse the source locally: `git clone`, then `npm install && npm run storybook` (port 6006).

## Install safety (source skim, nothing run)

- **`@sakaniui/react`:**
  - No `preinstall`, `install` or `postinstall` scripts.
  - It has a `prepare` script (`npm run build:lib`), which npm runs only for git or local installs, not when installing from the registry tarball.
  - A grep of `src/` found no `fetch`, XHR or beacon calls, so no telemetry.
- **`@sakaniui/cli`:** a 122-line Node script using only `node:fs` and `node:path`. It reads a bundled `manifest.json` and copies template folders into your project. It has no network calls and refuses to overwrite an existing folder.
- **Repo clutter:** a stray `sakani-button.zip` (an early Button component's source) sits in the repo root. It is harmless, and it is not in the npm `files` list.

## Pros and cons (my assessment)

Pros:

- Real design-to-code parity. The Figma file and the code share tokens and variants, which helps when a designer works from the Figma file.
- Liquid glass is a theme layer with fallbacks and reduced-transparency support, not one-off CSS.
- Installable package with tree-shaken icons and few dependencies. MIT. Ships agent docs.

Cons:

- One author and about 3 months old. Versions are 0.x with 51 releases in 7 weeks, so expect breaking changes; for example the icon sets were swapped in 0.7.
- React 19 only. You take the Sakani visual language as it is: unlike shadcn/ui, you don't own the component source, except for blocks.
- Liquid refraction is Chromium-only. Marketing numbers ("1,500+") count Figma variants, not React components.
- Accessibility and contrast claims are self-reported.

## Alternatives

- [React Next → Design Systems](/Technology/Frontend/Tools/React Next) lists shadcn/ui and its offshoots (RetroUI, HextaUI, ReUI), plus Arco, Semi, Mantine, Tremor, HeroUI, Magic UI and others.
  - The site's own comparison: shadcn/ui gives you source to copy and restyle, while SakaniUI is an installed package that mirrors one maintained Figma file.
- [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks) lists larger design systems such as IBM Carbon and Meta's Astryx.
- [Histoire](/Technology/Frontend/Tools/Histoire) is a Vite-native alternative to Storybook, the tool SakaniUI documents itself with.
