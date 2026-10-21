---
area: technology
domain: frontend
type: tool
title: NSH
description: NSH (Native Shell, longbridge/nsh, Apache-2.0) is a Rust engine that renders TSX or Rust UI with each platform's own native views, built for AI-generated screens and signed plugins delivered to a host app at run time. Weeks old, v0.1.1.
timestamp: "2026-10-22T00:00:00.000Z"
tags:
  - technology
  - frontend
  - rust
  - tsx
  - native-ui
  - desktop
  - mobile
resource: https://github.com/longbridge/nsh
---

# NSH

[NSH](https://github.com/longbridge/nsh) ([nsh.dev](https://nsh.dev)), short for Native Shell, is a Rust engine for cross-platform native UI. You write screens in TSX (with Tailwind classes and signals), in Rust, or both. Each platform draws them with its own UI toolkit instead of a webview. Checked 2026-10-22 against the README, `AGENTS.md`, `docs/dev/` (sandbox, signed packages, compatibility, performance), the installation page, and the GitHub API. I did not install it or run any example.

|                |                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source         | GitHub org `longbridge`, which also publishes `gpui-kit` (see [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks)) |
| License        | Apache-2.0 (`LICENSE-APACHE`, "Copyright 2026 Longbridge"). GitHub's API shows no SPDX id because the file is not named `LICENSE`                  |
| Created        | 2026-10-14                                                                                                                                         |
| Latest release | v0.1.1 (2026-10-18); v0.1.0 before it. `Cargo.toml` on main already says 0.2.0                                                                     |
| GitHub         | 523 stars, 33 forks, 22 open issues, last push 2026-10-21. Top contributors: huacnlee 116, sunli829 110, madcodelife 37 commits                    |
| Language       | Rust (workspace of ~25 crates under `crates/`; the website and docs are separate folders)                                                          |

## What it is

The pitch in `AGENTS.md`: native UI that is designed to be AI-generated and delivered dynamically. A host app embeds NSH and loads TSX modules at run time as plugins. The modules are signed, sandboxed by the host, and rendered with the platform's own views. Embedding comes first; standalone apps use the same machinery.

Platform backends (from the README table):

| Platform       | Drawn with                   | Embed with                                      | Needs                                |
| -------------- | ---------------------------- | ----------------------------------------------- | ------------------------------------ |
| iOS            | UIKit, CoreText              | `NshAppView` (Swift, `NativeShell.xcframework`) | iOS 15+                              |
| Android        | Android views                | `NshView` (Java/Kotlin, `nsh.aar`)              | Android 9 (API 28)+                  |
| macOS          | AppKit, Core Animation       | `AppView` (Rust crate)                          | macOS 14+                            |
| Windows        | Win32, Direct2D, DirectWrite | `AppView` (Rust crate)                          | Windows 10 1809+                     |
| Linux          | GTK 4, Pango                 | `AppView` (Rust crate)                          | GTK 4.14+                            |
| GPUI (desktop) | GPUI                         | a GPUI view                                     | macOS, Windows, or Linux with Vulkan |
| Web            | HTML, CSS                    | `createPlayer` (JS) or an iframe                | modern browsers                      |

## How it is built

- JS runs in QuickJS inside a native runtime. The reactive graph (Solid's algorithm), the renderer, and every module an app imports are Rust. Layout uses Taffy (flexbox and grid).
- Layering copies GPUI Kit: `nsh-core` plays the role of `gpui` (primitives, layout, rendering) and `nsh-base` plays `gpui-base` (unstyled behavior, focus, accessibility). A styled component library is deliberately not part of NSH; apps build their own on `nsh-base`.
- The toolchain is pure Rust and needs no Node.js. App developers get a prebuilt `nsh` binary and, for TSX apps, need no Rust either.
- `AGENTS.md` and the docs say the main thread never waits for JS, and performance is the project's "first priority".

### Sandbox and signed packages

From `docs/dev/sandbox.md` and `signed-packages.md`:

- Apps embedded in another app get limits that the host sets (defaults in the doc: 256 MB heap, 4 MB stack, 10 s to load, 2 s per call, 200,000 nodes). Standalone apps run with no heap or time limit.
- Hardening is on unless the bundle came from a dev server: `eval` is deleted, `Function` constructors throw, shared prototypes are frozen.
- Capabilities are declared in `nsh.json` (network hosts and methods, web view hosts, process execution, file-system roots, clipboard) and enforced in Rust.
- Packages (`.nshpkg`) are signed by a release key, which a root key certifies. Keys rotate without app updates. The doc notes that QuickJS does not validate bytecode, so loading untrusted bytecode is `unsafe` and downloaded code is either JS source or a signed package.

### Compatibility promise

`docs/dev/compatibility.md` says every release must run every app built for an earlier one, and an app that breaks after an update is "a bug in NSH, never in the app". That promise holds "from the first release recorded in `nsh-compat` on", and it is enforced with `tests/compat/`. With the version at 0.1.x this is a stated intention, not a track record.

## Quick start

```sh
curl -fsSL https://nsh.dev/install.sh | sh     # or: brew install longbridge/tap/nsh
nsh init my-app --template ts                  # or rust, or mixed
nsh run my-app --target macos                  # ios, android, windows, linux, gpui, web
```

Other commands in the README: `nsh package --target web` publishes a static site, `nsh publish` signs a package, `nsh test` runs a headless trace (`--trace`), and `cargo run` in the repo runs the gallery. Examples live in `examples/` (gallery, counter, hopper dashboard, desktop, embed-ios, embed-android, embed-gpui, bench).

## Where it fits

NSH is closest to React Native in aim (JS-authored UI rendered by native views), with a Rust core instead of a JS-bridge runtime. Unlike [MyGo](/Technology/Frontend/Tools/MyGo), Tauri, or Electron, it does not put a webview at the centre; the web is just one more target. What sets it apart in its own docs is the plugin story: signed, capability-limited TSX delivered to a native host, plus model-readable docs at [nsh.dev/llms.txt](https://nsh.dev/llms.txt) for generating screens. It also builds on [GPUI](https://www.gpui.rs/) ideas (typed units, `SharedString`, API vocabulary), shadcn/ui tokens for the default theme, and Solid for reactivity (README acknowledgements). These comparisons are my reading of the docs, not tested head to head.

## Caveats

- Weeks old and pre-1.0 (v0.1.1; main is already 0.2.0). Expect API churn despite the compatibility pledge.
- Performance numbers in `docs/dev/performance.md` are the authors' own, mostly headless debug builds on Apple Silicon (for example a counter's first frame of about 0.5 to 0.65 ms). I did not reproduce them, and the doc itself warns that single-frame timings depend on CPU clock state.
- Each platform backend is separate code, so behavior can differ by OS. The docs have per-backend "what differs" sections that I did not read in full.
- The GitHub license badge reads NOASSERTION. The text is Apache-2.0, so it only looks unlicensed to the API.
- Not checked: the `nsh.dev` live demos, the Chinese docs, the Android and iOS embedding paths, and whether the AI-generation workflow produces good screens in practice.

See also [Ely GPUI](/Technology/Frontend/Tools/Ely GPUI) and [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks).
