---
area: technology
domain: frontend
type: tool
title: Ely GPUI
description: Ely (elygpui.com) is an MIT component library for GPUI, the Rust UI framework behind Zed, not a GPU cloud. It claims about 1,279 components in 44 chapters with a live WebAssembly gallery. It is a weeks-old solo project, git-only, pinned to gpui-pre 0.3.8, and tested only on macOS.
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - frontend
  - rust
  - gpui
  - desktop
  - ui-components
resource: https://elygpui.com/
---

# Ely GPUI

[Ely](https://elygpui.com/) is a Rust component library for [GPUI](https://www.gpui.rs/), the GPU-rendered UI framework the Zed editor is built on. Despite the "GPU" in the name, it is not a GPU rental service or anything about GPU compute. It is a widget library for native Rust desktop apps. Checked 2026-10-19 against the homepage, the [docs](https://elygpui.com/docs/), the [installation page](https://elygpui.com/docs/installation/), the [getting started page](https://elygpui.com/docs/getting-started/), the author's [project page](https://zacharyzhang.com/elygpui), and the source repository.

|           |                                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source    | [git.zacharyzhang.com/ZacharyZhang-NY/Ely-GPUI-Components](https://git.zacharyzhang.com/ZacharyZhang-NY/Ely-GPUI-Components), a self-hosted Gitea-style forge, not GitHub |
| License   | MIT (`LICENSE`: "Copyright (c) 2026 Ely GPUI Component contributors"). Icons are Lucide (ISC). Inter, JetBrains Mono and IBM Plex Sans are under SIL OFL 1.1              |
| Crate     | `ely-gpui-component` 0.1.1, edition 2024, `rust-version = "1.95"`, `publish = false`. Not on crates.io                                                                    |
| GPUI      | Pins `gpui-pre` and `gpui-pre-platform` at `=0.3.8` (crates.io republish of Zed's GPUI; crates.io latest was 0.3.9 on 2026-10-19)                                         |
| Platforms | macOS tested. Windows and Linux builds not tested yet                                                                                                                     |
| Price     | Free. No paid tier or pricing page seen                                                                                                                                   |

## Who is behind it

The author is Zachary Zhang ([zacharyzhang.com](https://zacharyzhang.com/)), who describes himself there as a New York-based AI founder and product/technology lead, and as the official Chinese maintainer of Omarchy Linux. The same page lists Elydora (agent accountability infrastructure), Kigi CLI (a Rust multi-agent coding CLI), Ely GPUI, and Ely Office (six offline desktop apps on GPUI). Those self-descriptions were not verified independently.

## What it offers

- 44 "chapters" from primitives, typography, layout, forms, menus and overlays to tables, charts, finance (candles, order books, tapes), a code editor (folds, minimap, multiple cursors), terminal, git, debug, documents, AI chat and agent views, mail, calendar, maps, dashboards, theme, i18n and a11y.
- One theme for every component: light and dark, high contrast, color-blind-safe charts, and tokens for color, size, radius and shadow. `Theme::set_mode` cross-fades every window.
- Keyboard first: `init` binds Tab and Shift-Tab, a root `FocusScope` keeps focus in the window, and every pressable control is a Tab stop with a focus ring.
- Reduced motion is honored: durations drop to a millisecond and repeating motion holds still.
- A gallery (`cargo run --example gallery`) that also compiles to WebAssembly and runs in the browser through `gpui_web` on WebGPU or WebGL2. The terminal is native only. Tray icon, Dock badge and web view are macOS only.
- Bundled renderers for Markdown, Mermaid diagrams (`mermaid-rs-renderer`), LaTeX math (`ratex-*`), QR codes and barcodes, according to `Cargo.toml`.

The live gallery was not opened in a browser for this note.

## How to use it

```toml
[dependencies]
ely-gpui-component = { git = "https://git.zacharyzhang.com/ZacharyZhang-NY/Ely-GPUI-Components" }
gpui = { package = "gpui-pre", version = "=0.3.8" }
gpui_platform = { package = "gpui-pre-platform", version = "=0.3.8", features = ["font-kit"] }
```

An Ely app is a GPUI app with four more parts:

1. `gpui_platform::application().with_assets(Assets)`, since Ely embeds its icons and fonts.
2. `ely_gpui_component::init(cx)?` once, before any window.
3. A root `FocusScope::new(&handle).root()` around each window's content.
4. Colors, sizes and radii from `cx.theme()`.

Pitfalls the docs list:

- `gpui` must be the same `gpui-pre =0.3.8` snapshot. Any other version or a git source builds a second GPUI and gives `mismatched types`.
- Without the `font-kit` feature, macOS windows draw no text.
- The default `runtime_shaders` feature compiles Metal shaders at run time, so full Xcode is not needed. With `default-features = false` the build needs `xcrun metal`.
- Pin the commit with `rev = "..."`, because `Cargo.lock` is the only thing holding it otherwise.

## Trust and maturity signals

| Signal           | Finding (2026-10-19)                                                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain           | `elygpui.com` registered 2026-10-01 through Cloudflare (RDAP), so it is under three weeks old. `zacharyzhang.com` registered 2024-07-15                                           |
| Repo age         | First commit 2026-09-24 ("T00 foundation: theme, motion, assets, icon, buttons, gallery"), repo created on the forge 2026-10-09                                                   |
| Activity         | 693 commits, latest 2026-10-19. Commit author name is 雷电芽衣, a pseudonym                                                                                                       |
| Adoption         | 1 star, 0 forks on the forge. A few copies on GitHub (for example `csells/Ely-GPUI-Components`, `mrchypark/Ely-GPUI-Components`) are third-party mirrors, not the official source |
| Reviews          | No independent reviews, articles, or discussions were found. Search results were only the project's own pages                                                                     |
| Self-description | The docs say "Ely is early" and that its API moves when GPUI's does. They list 8 of 1158 task entries still open                                                                  |

Inconsistent counts: the homepage says 1,279 components and 44 chapters; the author's page says 1,272 components and 43 chapters. The number of usable, production-quality components was not checked.

Nothing looks like a scam. There is no payment, no account, and no binary download. But it is a very new single-author project on a personal git server, with no community track record yet.

## Pros and cons

Pros
: Very broad catalog for GPUI, which ships few finished widgets. Consistent theming and keyboard focus. Live browser gallery to try before adding. MIT license. Detailed docs with a troubleshooting table.

Cons
: Weeks old, one maintainer, pre-1.0 (0.1.1). Git-only dependency on a self-hosted forge, so the source and its availability depend on one personal server. Hard pin to `gpui-pre =0.3.8`, so it breaks if your app needs another GPUI. macOS only in practice. No independent users or reviews yet.

## Alternatives

- [longbridge/gpui-kit](https://github.com/longbridge/gpui-kit) (formerly `gpui-component`, about 18k stars on 2026-10-19). It is the established GPUI component library, already listed in [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks). Ely's docs say GPUI Kit pins the same `gpui-pre` snapshot.
- [zed-industries/awesome-gpui](https://github.com/zed-industries/awesome-gpui), for other GPUI projects.

For a real app, GPUI Kit is the safer default today. Ely is worth watching or borrowing from, especially for finance, editor, or chat surfaces, if you can live with a macOS-only, git-pinned dependency.
