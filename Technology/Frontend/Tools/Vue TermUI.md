---
area: technology
domain: frontend
type: tool
title: Vue TermUI
description: Vue TermUI (vue-terminal/vue-termui, MIT, posva) is a Vue 3 custom renderer for terminal apps on OpenTUI's native Zig engine — flexbox layout, forms, focus, and a Vite plugin with in-terminal HMR; ground-up rewrite from the old Yoga-based stack. npm vue-termui 0.3.0.
timestamp: "2026-10-26T00:00:00.000Z"
tags:
  - technology
  - frontend
  - vue
  - terminal
  - tui
  - opentui
  - vite
resource: https://github.com/vue-terminal/vue-termui
---

# Vue TermUI

[Vue TermUI](https://vue-termui.dev) ([vue-terminal/vue-termui](https://github.com/vue-terminal/vue-termui)) lets you build **interactive terminal apps** with Vue 3: SFCs, Composition API, `ref`/`computed`, slots, `v-if`/`v-for`, and `v-model`, but the output is a TUI instead of the DOM. Checked 2026-10-26 against the README, `AGENTS.md`, `docs/guide/` and `docs/essentials/`, `docs/components/`, `skills/vue-termui/SKILL.md`, root and `packages/three/package.json`, GitHub API, and npm. I did not install, run the playground, or execute tests (they need Node FFI).

|            |                                                                                                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Author     | Eduardo San Martin Morote ([@posva](https://github.com/posva)) — also Vue Router and Pinia                                                                                                       |
| License    | MIT                                                                                                                                                                                             |
| Created    | GitHub repo 2022-02-19; **current OpenTUI-based stack** is a ground-up rewrite (0.1.0 npm 2026-07-09, 0.3.0 2026-08-18). Previous Yoga/custom-renderer code lives in `old/` and is being removed |
| npm        | `vue-termui` **0.3.0**; `create-vue-termui` **0.3.0** (`npm create vue-termui@latest`). `@vue-termui/three` is workspace-only **0.0.0**, not published on npm yet                              |
| Downloads  | `vue-termui` ~184/week (npm point 2026-10-16–22); early adoption                                                                                                                                |
| GitHub     | ~980 stars, 37 forks, 5 open issues, last push 2026-10-26. Top contributor: posva (~496 commits), webfansplz (~44)                                                                             |
| Runtime    | Renders through [OpenTUI](https://opentui.com/) (`@opentui/core` ^0.5.3) — native **Zig** renderer loaded via Node **FFI**. **Node ≥ 26.3** with `--experimental-ffi` at runtime, or **Bun** (FFI without the flag). Plain imports of `@opentui/core` types/helpers do not need FFI |
| Docs       | [vue-termui.dev](https://vue-termui.dev) (VitePress); agent skill in repo `skills/vue-termui/SKILL.md`                                                                                        |

## What it is

A **Vue custom renderer** (`createRenderer` from `@vue/runtime-core`) that maps your component tree to OpenTUI **renderables**. OpenTUI owns flexbox layout, drawing, the alternate screen buffer, and input; Vue owns reactivity and composition. Updates are diffed and patched like on the web, not string-built frames.

Public components are **unprefixed** (`Box`, `Text`, …) — no DOM namespace clash. Under the hood, host tags use the `tui-` prefix (`tui-box`, `tui-text`, …).

Built-in components (docs + skill; import explicitly, **no auto-import**):

| Component      | Role                                                                 |
| -------------- | -------------------------------------------------------------------- |
| `Box`          | Flexbox container — border, padding, margin, overflow, mouse events  |
| `ScrollBox`    | Scrollable viewport (needs width/height/flex constraints)          |
| `Text`         | Styled text — `fg`/`bg`, wrap, attributes; **text only inside**    |
| `Newline`      | Line breaks (`count`)                                                |
| `Input`        | Single-line field with `v-model`                                     |
| `Textarea`     | Multi-line; Meta/Cmd+Enter → `submit`                                |
| `Select`       | Scrollable single-choice list with `v-model`                         |
| `TabSelect`    | Tab-style selection                                                  |
| `ProgressBar`  | Horizontal progress                                                  |
| `Image`        | Terminal image (added in 0.3.0)                                      |

Composables and events (from docs): `useExit`, `useInterval`, `useTimeout`, `onKeyDown`, paste support (0.3.0), plus standard Vue lifecycle and reactivity — all imported from **`vue-termui`**, never from `vue` (a second `@vue/runtime-core` copy breaks vnode interop). `@opentui/core` is a **private** dependency of the library; apps should not import it unless OpenTUI APIs are needed directly.

## Tooling

- **Vite plugin** (`vue-termui/vite`): compiles SFCs, registers host tags, and in **dev** launches the app **in-process with HMR** — `vite` opens the TUI directly.
- **Scaffold**: `npm create vue-termui@latest`.
- **Monorepo** (pnpm): `playground/` (demos including shaders and TresJS), `examples/` (e.g. lazygit-style app), `packages/three/` (`@vue-termui/three` — Three.js **WebGPU** scenes rasterized into the terminal; playground uses `@tresjs/core`), `session-player/` for cast replays on the docs site.

## Rewrite vs the old stack

The pre-OpenTUI version (still under `old/packages/`) used a different renderer (Yoga layout, `TuiBox`-prefixed components, auto-imports, class-based styling, `onKeyData`, etc.). The rewrite drops prefix and auto-import magic; docs call out that `<Link>` and `<TextTransform>` are **not yet ported**. README on main is already the new API; if you find older blog posts or stars from 2022–2024, assume they describe the legacy stack unless they mention OpenTUI.

## When to use it

Good fit when you want a **long-lived, keyboard-driven TUI** (dashboards, wizards, dev tools) and already think in Vue. The docs steer simple one-shot prompts to [enquirer](https://github.com/enquirer/enquirer), [prompts](https://github.com/terkelg/prompts), [ora](https://github.com/sindresorhus/ora), or [chalk](https://github.com/chalk/chalk) instead.

## Where it fits

| Approach                         | Stack                         | Notes                                                                 |
| -------------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| **Vue TermUI**                   | Vue 3 + OpenTUI (Zig via FFI) | Declarative components, real flexbox, Vue reactivity                  |
| [OpenTUI](https://opentui.com/)  | TS/React/Solid + same engine  | Lower-level; Vue TermUI is the Vue binding                            |
| [Ink](https://github.com/vadimdemedes/ink) | React + Yoga (flex)   | Mature React TUI ecosystem; no Vue                                    |
| [Ratatui](https://ratatui.rs/)   | Rust                          | Performance and Rust interop, not component-DOM style                 |

OpenTUI's own description: TypeScript/React/Solid on a native Zig renderer — Vue TermUI is the Vue 3 entry in that family.

## Implementation notes (from `AGENTS.md`)

Worth knowing if you extend or debug the renderer:

- `createApp` is **async**: it awaits `createCliRenderer`, then mounts the Vue root into `renderer.root`.
- OpenTUI `Box.add` requires layout nodes; Vue **Fragment** boundaries create empty text nodes inside `<box>`, so `nodeOps` substitutes invisible out-of-flow `BoxRenderable` anchors — without that, `v-for` / multi-root / `<RouterView>` throw `getLayoutNode is not a function`.
- Lone string children of `<text>` use a fast path; mixed/interpolated text uses `TextNodeRenderable`. Nested `<Text>` is rejected.
- `Text` defaults `flexShrink: 0` so wrapped lines do not paint over siblings in height-constrained columns (0.3.0 fix).

Vitest defaults to `happy-dom`; specs that build a renderer need `// @vitest-environment node` and `NODE_OPTIONS=--experimental-ffi` (the repo sets this on `test:cov` / `dev` because `execArgv` did not propagate the flag to workers).

## Caveats

- **Node version bar is high** (26.3+ and experimental FFI) until FFI stabilizes; Bun is the documented alternative.
- **0.x API** with a breaking rewrite already behind you; old tutorials and the `old/` tree can mislead.
- **`@vue-termui/three`** is experimental, unpinned on npm, and pulls a heavy 3D stack — demos exist in playground, not a production default.
- **Downloads are tiny** (~184/week); production battle stories are scarce compared to Ink.
- Not checked: live demos on vue-termui.dev, full component matrix vs OpenTUI React/Solid, Windows terminal quirks, or running the full `pnpm test` suite locally.

See also [Vue And Nuxt](/Technology/Frontend/Tools/Vue And Nuxt), [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks), and [Tools Notes § Terminal UI](/Technology/Tools And Utilities/Tools/Tools Notes#terminal-ui-tools).
