---
area: technology
domain: frontend
type: tool
title: Histoire
description: Histoire (histoire-dev/histoire, MIT) is a Vite-native story book for developing and documenting components in isolation, the Vite answer to Storybook, led by Guillaume Chau (Akryum). npm latest is 1.0.0-beta.1 (Jan 2026) with Vue 3 and Svelte plugins; main also documents React, Nuxt, SvelteKit, and MCP tools not yet in a release.
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - frontend
  - vue
  - svelte
  - vite
  - storybook
resource: https://histoire.dev/
---

# Histoire

[Histoire](https://histoire.dev/) ([histoire-dev/histoire](https://github.com/histoire-dev/histoire)) builds "story" apps (books): pages that show components in specific use cases, for design systems and component libraries. The name is French for "story" (`/is.twaʁ/`). It is built on Vite and reuses the project's Vite config. Checked 2026-10-19.

|                   |                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Maintainer        | Guillaume Chau ([Akryum](https://github.com/Akryum), 1,128 commits), then hugoattal (46), danielroe (11)                         |
| License           | MIT                                                                                                                              |
| Created           | 2022-01-21                                                                                                                       |
| npm               | `histoire` latest **1.0.0-beta.1** (2026-01-07); last stable **0.17.17** (2024-04-09). About 58k downloads/week (10–16 Oct 2026) |
| Plugins on npm    | `@histoire/plugin-vue`, `@histoire/plugin-svelte` at 1.0.0-beta.1. `@histoire/plugin-react` is **not on npm** yet                |
| GitHub            | ~3.6k stars, 212 forks, 203 open issues/PRs, last push 2026-10-19                                                                |
| Unreleased builds | Any commit on `main` can be installed from [nightly.akryum.dev](https://nightly.akryum.dev/histoire-dev/histoire)                |

## What it does

- Stories hold one or more **variants**. Each variant can set up state, mount components, and add controls.
- **Dynamic source**: generates copyable template/JSX code for the current variant.
- **Variant grids**: all variants on one page.
- **Markdown docs** next to stories.
- Written idiomatically in `.vue`, `.svelte`, or JSX files, not a separate args/CSF syntax.
- Instant HMR from Vite, code-split production books, themeable UI that also works on phones, plugins.
- Visual testing via screenshots (docs pages `visual-testing`, `ui-screenshots-mcp`).

The current README on `main` says it needs Node.js 22+ and Vite 7 or 8, and supports Vue 3, React 18/19, Svelte 4/5, Nuxt 3/4 and SvelteKit 2/3. It also says `histoire dev` exposes [MCP tools](https://github.com/histoire-dev/histoire/blob/main/docs/guide/mcp.md) by default, and `histoire build --target node` builds a standalone Node book plus MCP server. Since the last npm release is January 2026 and the React plugin is not published, these may only exist in nightly builds. Not verified against 1.0.0-beta.1.

## Quick start (Vue 3)

```sh
pnpm i -D histoire @histoire/plugin-vue
```

```ts
// histoire.config.ts
import { HstVue } from "@histoire/plugin-vue"
import { defineConfig } from "histoire"

export default defineConfig({
  plugins: [HstVue()]
})
```

Commands: `histoire dev` (dev server with hot reload), `histoire build` (production build), `histoire preview` (serve the build). Try the [online demo](https://histoire.dev/demo/).

## Compared with

|                    | Histoire                                                   | [Storybook](https://github.com/storybookjs/storybook)            | [Ladle](https://github.com/tajo/ladle) |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------- |
| Frameworks         | Vue 3, Svelte (released); React, Nuxt, SvelteKit on `main` | Most frameworks (React, Vue, Svelte, Angular, web components, …) | React only                             |
| Build              | Vite only, reuses app config                               | Vite or Webpack builders                                         | Vite                                   |
| Story format       | Native `.vue` / `.svelte` / JSX files with variants        | CSF (Component Story Format), args                               | CSF                                    |
| npm latest         | 1.0.0-beta.1 (2026-01)                                     | 10.6.2 (2026-10-12)                                              | 5.1.1 (2025-11)                        |
| Stars (2026-10-19) | ~3.6k                                                      | ~91k                                                             | ~3k                                    |
| License            | MIT                                                        | MIT                                                              | MIT                                    |

Storybook has the much larger addon ecosystem and broader framework support. Histoire's case is a lighter, Vite-native setup with idiomatic Vue/Svelte stories. Ladle is the comparable lightweight Vite option for React. These are general characterizations, not a measured benchmark.

## Pros and cons

Pros
: Fast Vite-based dev loop, no second build config, stories read like normal Vue/Svelte code, variant grids and generated source are useful for design-system docs. Actively maintained on `main`.

Cons
: No stable release since 0.17.17 (April 2024); the 1.0 line has been alpha/beta since at least Oct 2025. Released packages lag `main` (React plugin unpublished). Effectively one lead maintainer. Many open issues. Smaller ecosystem than Storybook.

Also listed in [Vue And Nuxt](/Technology/Frontend/Tools/Vue And Nuxt).
