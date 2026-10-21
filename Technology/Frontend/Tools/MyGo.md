---
area: technology
domain: frontend
type: tool
title: MyGo
description: MyGo (egoist/mygo, MIT) builds desktop apps in pure Go without cgo. Each window shows either a web page in the system webview, with a TypeScript client generated from Go, or native UI drawn by MyGo on the GPU. The latest release is v0.6.2 and it needs Go 1.27+.
timestamp: "2026-10-21T00:00:00.000Z"
tags:
  - technology
  - frontend
  - desktop
  - go
resource: https://github.com/egoist/mygo
---

# MyGo

[egoist/mygo](https://github.com/egoist/mygo) ([mygo.egoist.dev](https://mygo.egoist.dev)) is a Go framework for desktop apps. Each window shows one of two kinds of interface, and one app, or one window, can mix them:

- **A web page** in the webview the OS already has: WKWebView on macOS, WebKitGTK 4.1 on Linux (4.0 as fallback), WebView2 on Windows. No browser engine is bundled. The frontend calls Go through a TypeScript client generated from your Go code.
- **Native UI**, written in Go with package `ui` and drawn by MyGo itself with Metal, Direct3D 11, OpenGL, or on the CPU. No HTML, JavaScript, or webview. Native-UI apps can also compile to WebAssembly and run in browsers on WebGL 2.

Checked 2026-10-21 against the README, [docs](https://github.com/egoist/mygo/tree/main/docs), architecture guide, release notes, and GitHub API.

|                |                                                                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Author         | GitHub user `egoist` (440 of the commits; next contributors have 13 or fewer)                                                                                                           |
| License        | MIT                                                                                                                                                                                     |
| Created        | 2026-09-26                                                                                                                                                                              |
| Latest release | v0.6.2 (2026-10-21); v0.6.0 introduced substantial native-UI redraw and layout optimizations |
| GitHub         | 2,548 stars, 136 forks, 89 open issues, last push 2026-10-21 |
| Requirements   | Go 1.27+ (`go.mod`: `go 1.27.1`). Bun for web-frontend projects (dev tooling only). Linux: GTK 3 and WebKitGTK 4.1 for web pages. Windows 10: WebView2 Runtime (Windows 11 includes it) |

## Features

- **Pure Go, no cgo.** Builds with `CGO_ENABLED=0`, so you can cross-compile for any platform from any machine. Native APIs go through [purego](https://github.com/ebitengine/purego) (`dlopen` + assembly trampolines) on macOS and Linux and through `syscall` on Windows.
- **Typed IPC for pages.** `mygo.Bind` Go services, stream values through `Channel[T]`, send typed `Event[T]`. The TypeScript client carries your Go struct types and method docs.
- **Go UI toolkit.** Flexbox and grid layout, widgets, text editing with input methods, virtualized lists, SVG icons, animations, screen reader support, views testable without a window. Liquid Glass on every platform via the glass plugin. Web pages can sit inside native UI.
- **Desktop APIs.** Windows, menus, tray, dialogs, notifications, global shortcuts, deep links, file associations, recent documents, system accent color and accessibility settings, file watching.
- **Shipping.** App bundles and disk images, Windows installers, Debian packages and a Linux install script, code signing, notarization, signed auto-updates with delta updates and a Sparkle-style update window.
- **Current release.** v0.6.0 made native UI redraw only changed regions, made layout incremental, skipped drawing windows out of sight, and added the `loading` plugin. v0.6.2 forwards the activation token to the first instance on Wayland, reports touchpad pinch as `InputZoom`, and improves CJK punctuation font selection on Linux. These are release-note claims, not independently benchmarked here.
- **API feel.** The architecture doc says it is meant to feel like Electron (app lifecycle, windows, menus, dialogs) but Go-first: `http.Handler` for custom protocols, blocking calls safe from any goroutine.

Footprint, per the [architecture doc](https://github.com/egoist/mygo/blob/main/docs/architecture.md) (author's measurements, not reproduced here): a hello-world web app is a ~7 MB binary, ~35 MB physical memory on macOS (~62 MB counting WKWebView's processes), idle at 0% CPU. A small native-UI window takes about 44 MB on macOS.

## Quick start

Web frontend (Go 1.27+ and Bun):

```sh
bunx mygo-cli init my-app      # or: npx mygo-cli init my-app
cd my-app
bun run dev
```

Native UI (Go only):

```sh
go run github.com/egoist/mygo/cmd/mygo@latest init -template native my-app
cd my-app
go tool mygo dev
```

`mygo doctor` checks the machine. A web project is a Go module plus a Vite + TypeScript frontend side by side, with `mygo.config.ts` for name, identifier, version, and build.

A web window whose page calls Go:

```go
type Greeter struct{}

// Greet returns a greeting.
func (Greeter) Greet(name string) string { return "Hello, " + name }

func main() {
	mygo.Bind(Greeter{})
	mygo.App.WhenReady(func() {
		mygo.NewWindow(mygo.WindowOptions{Title: "Hello", URL: "/"})
	})
	if err := mygo.App.Run(); err != nil {
		log.Fatal(err)
	}
}
```

```ts
import { Greeter } from "./mygo" // generated

document.body.textContent = await Greeter.greet("Ada")
```

A native-UI counter:

```go
func (s *counter) view(c *ui.Context) {
	ui.Column(c).Fill().Center().Gap(12).Children(func() {
		ui.Text(c, fmt.Sprint(s.n)).FontSize(40).Bold()
		if ui.PrimaryButton(c, "Increment").Clicked() {
			s.n++
		}
	})
}
```

## Compared with

|                    | MyGo                                                   | [Wails](https://github.com/wailsapp/wails) | [Fyne](https://github.com/fyne-io/fyne) | [Gio](https://github.com/gioui/gio) | Electron / Tauri                  |
| ------------------ | ------------------------------------------------------ | ------------------------------------------ | --------------------------------------- | ----------------------------------- | --------------------------------- |
| Language           | Go                                                     | Go                                         | Go                                      | Go                                  | JS / Rust                         |
| UI                 | System webview **or** own GPU-drawn native UI, mixable | System webview                             | Own toolkit                             | Own immediate-mode toolkit          | Bundled Chromium / system webview |
| Stars (rough snapshot) | ~2.5k                                                | ~36.6k                                  | ~28.8k                                 | ~2.3k                               | —                                 |
| License            | MIT                                                    | MIT                                        | BSD-3-Clause                            | GitHub reports no single SPDX id    | —                                 |
| Age                | Weeks                                                  | Years                                      | Years                                   | Years                               | Years                             |

The "no cgo" claim, the generated TS client, and the mix of webview and native windows are MyGo's selling points against Wails and Fyne. How the other Go frameworks handle cgo was not checked for this note.

## Pros and cons

Pros
: One small Go binary, cross-compiles without a C toolchain, typed Go-to-TypeScript bridge, choice of web or native UI per window, packaging, signing, and auto-update built in. Very active development.

Cons
:: Pre-1.0 and only weeks old, so the API is likely to change. Mostly a single maintainer. Needs a very recent Go (1.27+). Web pages depend on whichever system webview the user has. Footprint numbers are the author's own; native-UI performance improvements in v0.6.0 are described in release notes but not reproduced here.

See also [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks).
