---
area: technology
domain: frontend
type: tool
title: TanStack Hotkeys
description: TanStack Hotkeys (@tanstack/hotkeys 0.18.0, MIT, TanStack) is a type-safe keyboard-shortcut library for ten frameworks plus vanilla JS - Mod, Vim-style sequences, scopes, app hotkeys, recording, key-state tracking and devtools - with Agent Skills shipped inside the npm packages. Still beta at 0.x.
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - frontend
  - tanstack
  - keyboard
  - typescript
resource: https://github.com/TanStack/hotkeys
---

# TanStack Hotkeys

[TanStack Hotkeys](https://tanstack.com/hotkeys) ([TanStack/hotkeys](https://github.com/TanStack/hotkeys)) registers keyboard shortcuts and handles the parts people usually re-implement badly: platform differences, keyboard layouts, text inputs, nested dialogs, duplicate bindings, and cheat sheets that drift from the real shortcuts. Checked 2026-10-25 on `main` (commit `41f06c5`) and on npm.

|            |                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Maintainer | TanStack; MIT, Copyright (c) 2026 Tanner Linsley                                                                                                                                |
| Created    | GitHub 2026-01-21; first npm publish 2026-02-10                                                                                                                                 |
| npm        | `@tanstack/hotkeys` **0.18.0** (2026-10-24). Adapters run from 0.6.0 to 0.18.0 (Alpine and Ember 0.6.0, Octane 0.7.0, most 0.17.0, Lit 0.18.0); each pins core `0.18.0` exactly |
| Downloads  | core ~769k/week, `@tanstack/react-hotkeys` ~687k/week, `@tanstack/hotkeys-devtools` ~41k/week (16–22 Oct 2026)                                                                  |
| GitHub     | 751 stars, 48 forks, 1 open issue or PR, 32 contributors, 30 releases, last push 2026-10-24                                                                                     |
| Status     | beta, versioned `0.x`, API still subject to change                                                                                                                              |
| Packages   | 18 in the repo: core, 10 framework adapters, 6 framework devtools adapters, shared `@tanstack/hotkeys-devtools`                                                                 |
| Frameworks | React, Preact, Solid, Angular, Vue, Svelte, Lit, Alpine, Ember, Octane, plus vanilla JS through the core                                                                        |

The npm surface has version skew worth knowing: adapters are released independently, so an adapter still at 0.6.0 or 0.7.0 is not running old core code — a changeset only bumps the packages that changed. Every adapter depends on core `0.18.0` exactly (not `^`), so installing an adapter pulls the matching core; the docs say not to install the core package alongside an adapter.

## What it does

- **Registration** for chords (`Mod+S`, `Escape`) and Vim-style sequences (`['G', 'G']`, `['D', 'I', 'W']`).
- **`Mod`** maps to Command on macOS and Control on Windows/Linux, so one binding covers all three.
- **Logical vs physical bindings**: `Mod+S` follows the character typed (`event.key`), `Mod+[KeyS]` follows the key position (`event.code`).
- **Display formatting** for menus and buttons: `⌘ S` on macOS, `Ctrl+S` elsewhere.
- **Scopes** that switch groups of hotkeys on and off with the part of the page they belong to.
- **App hotkeys** declared up front with `defineAppHotkeys`, for cheat sheets and user-rebindable shortcuts.
- **Recording** (`HotkeyRecorder`) for settings screens, with optional conflict checks.
- **Key-state tracking** for held keys and "hold a modifier to show hints" UIs.
- **Devtools** panel listing registrations, scopes, held keys and sequence progress.
- **Agent Skills** shipped inside the packages, wired up by `@tanstack/intent`.

## Core model

One singleton `HotkeyManager` owns every registration. It keeps **one `keydown` and one `keyup` listener per target and capture phase** however many hotkeys are registered, and the listeners are attached on the first registration for that target, not at import time. Hotkeys attach to `document` by default, so they work wherever focus is, and the manager also accepts a same-origin iframe or popup as a target. No listeners are attached during server rendering.

```tsx
import { useHotkey } from "@tanstack/react-hotkeys"

function Editor() {
  useHotkey("Mod+S", () => saveDocument())
  return <textarea />
}
```

The hotkey lives exactly as long as the component that registered it: a dialog's `Escape` exists only while the dialog is mounted. For conditions that don't map to a component, pass `enabled`; for a group that switches together, use a scope.

Bindings are stored in canonical form, so equivalent spellings are one registration. That canonical form is **platform-dependent**: on Windows and Linux `Control+S` is stored as `Mod+S`, while on macOS `Control+S` stays `Control+S` because Control is not the primary modifier there. A custom hotkey saved on one platform can therefore mean something different on another.

## Defaults

These are the defaults that decide behavior; each can be overridden per hotkey or through the adapter's shared defaults (`HotkeysProvider`, `provideHotkeys`, or `createHotkeysScope`).

| Situation               | Default                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `Mod`                   | Command on macOS, Control on Windows/Linux; `platform` overrides detection                          |
| Key identity            | `event.key`, with a positional fallback for non-Latin layouts, macOS Option, dead keys              |
| Modifiers               | Must match exactly; `Mod+S` does not fire for `Mod+Shift+S`                                         |
| Typing in a text field  | Single keys and Shift/Alt chords are ignored; Control/Meta chords and `Escape` still fire           |
| Browser behavior        | `preventDefault` and `stopPropagation` are `true` when a hotkey matches                             |
| Held key repeat         | Fires again on every automatic repeat; `requireReset: true` makes it once per press                 |
| Listener placement      | `document`, bubble phase (the focused widget's own handler runs first); `capture: true` reverses    |
| Sequence gap            | 1 second (`DEFAULT_SEQUENCE_TIMEOUT = 1000`)                                                        |
| Duplicate registrations | Allowed, both callbacks run, console warning; `conflictBehavior` sets `replace`, `error` or `allow` |
| Recording               | Records physical positions (`recordBy: 'code'`), Escape cancels                                     |
| Display                 | Symbols on macOS (`⇧ ⌘ S`), text elsewhere (`Ctrl+Shift+S`), sequence steps joined by a space       |

Two defaults deserve a second look. First, input filtering is `ignoreInputs: 'auto'`, which decides from the hotkey itself: `K` is ignored in fields, `Mod+S` is not, `Escape` is not. Second, a hotkey that cannot fire — disabled, or in an inactive scope — does **not** call `preventDefault`, so the browser gets the key back; `preventDefault: 'always'` is opt-in and, per the docs, usually the better choice for commands like `Mod+S` because it keeps the Save dialog closed even while the command is off.

The docs also handle policy that most implementations skip: focused widgets keep their own keys (Enter/Space on buttons, arrows inside a menu or listbox, following the WAI-ARIA Authoring Practices); AltGr matches the character it types but never a `Control+Alt` shortcut on Linux, while Windows reports AltGr as Control+Alt and fires those; IME composition suppresses character and physical bindings while named keys still fire; single-letter shortcuts satisfy WCAG 2.1.4 by offering an off switch, a remap, or component focus; and held keys reset when the window loses focus because the browser never delivers the lost keyup.

## Scopes

A `HotkeysProvider` with a `scope` groups every hotkey inside it. Scopes are **names, not instances**: two mounted providers with `scope="editor"` share one scope. Nesting gives precedence — the innermost active scope wins — so `Escape` closes the dialog instead of the panel behind it without every component knowing about every other component. `exclusive` (plus an optional `allow` list) suspends every other scope, including `global`, which is the dialog and menu case. `enabled: false` turns a scope off without unmounting it, for tabs and split panes that stay rendered.

## App hotkeys

`defineAppHotkeys` declares the whole set once — id, default hotkey, `meta` for labels, options, optional scope — and never holds the callback. The declarations go to the root provider; callbacks still attach through `useHotkey`. That gives a cheat sheet that includes routes that have not rendered yet, conflict checks across all declarations, and rebinding. Ids are the persistence contract, because saved custom hotkeys are keyed by them, and **where to store those custom hotkeys is the app's job** — the library has no storage layer.

## Recording and key state

`HotkeyRecorder` captures a chord, or a sequence with `maxSteps: Infinity`, and pauses registered hotkeys while recording so pressing `Mod+S` does not also save. Conflict detection exists but is **off by default** (`detectConflicts: false`), so enabling it is a deliberate step. `KeyStateTracker`, `useHeldKeys`, `useHeldKeyCodes` and `useKeyHold` expose held keys for keyboard-driven UI and hint badges.

## Devtools

A panel inside the TanStack Devtools dock, showing registrations with their options and status, sequence progress, declared app hotkeys that nothing has registered yet, held keys, and a way to trigger callbacks without pressing keys. The adapter exports are **no-ops outside development**; including them in a production build means importing from the `/production` entry point, which React, Solid, Angular, Vue and Svelte provide. Preact has no production entry, and Lit, Alpine, Ember and Octane have no devtools adapter at all. Angular devtools needs Angular 21+, Svelte devtools 5.25+.

## Agent Skills

Each package ships `skills/<name>/SKILL.md` plus `references/`, so the guidance travels with `npm update` instead of living in the model's training data. `npx @tanstack/intent@latest install` writes an `intent-skills` block into `AGENTS.md` by default, or `CLAUDE.md`, `.cursorrules` and `.github/copilot-instructions.md`. `intent list` and `intent load <package>#<skill>` inspect and load them by hand. A React project has three entry points: `hotkeys-core`, `app-hotkeys` and `react-hotkeys`. The `references/` files load only when a task needs them — scopes, testing, rebinding.

## Size

`size-limit` in CI sets these gzip budgets on the core bundle: everything 13.5 KB, `HotkeyManager` 8.5 KB, `HotkeyRecorder` 7 KB, `KeyStateTracker` 3.5 KB, `formatForDisplay` 3 KB. These are limits enforced in CI, not measured figures, and the numbers are for the core package only — an adapter adds its framework glue. The repo's own `build` script runs `size-limit` after building.

## Things to know before adopting

- **Beta.** Version `0.x`, docs say the API is still subject to change, and the repo asks early adopters to report layout and OS edge cases.
- **SSR labels differ from the client.** `detectPlatform()` returns `'linux'` when `navigator` is undefined, and `formatForDisplay` calls it at render time. Server markup for `Mod+S` therefore says `Ctrl+S` while a macOS browser says `⌘ S`; pass `platform` explicitly or format after mount if hydration warnings matter. The docs describe the SSR default but not the hydration consequence.
- **Recorded hotkeys are physical by default.** `recordBy: 'code'` stores the key position, so a recorded shortcut follows the same physical key on another layout. Use `recordBy: 'key'` when the character matters.
- **Browser and OS reserves.** `Mod+T`, `Mod+N`, `Mod+W`, `Alt+Tab` and similar never reach the page; pick other keys.
- **`preventDefault: 'always'` has a cost.** With it in shared defaults, a disabled `Mod+C`, `Tab` or `Escape` keeps blocking the browser; the docs list the cases that need `preventDefault: true` instead.
- **The Devtools panel is a development tool.** No-op in production unless the `/production` entry point is imported on purpose.

## Sources

- [TanStack/hotkeys](https://github.com/TanStack/hotkeys) — README, `docs/overview.md`, `docs/installation.md`, `docs/guides/sensible-defaults.md`, `docs/devtools.md`, `docs/agent-skills.md`, `packages/hotkeys/src/*`, `package.json` size-limit config.
- [TanStack Hotkeys docs](https://tanstack.com/hotkeys) and [TanStack Intent](https://tanstack.com/intent/latest/docs/overview).
- npm: `@tanstack/hotkeys`, `@tanstack/react-hotkeys`, `@tanstack/hotkeys-devtools`, `@tanstack/intent`; download counts from the npm API for 16–22 Oct 2026.

> **See also:** [React Next](/Technology/Frontend/Tools/React Next) · [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview) · [Vue And Nuxt](/Technology/Frontend/Tools/Vue And Nuxt)
