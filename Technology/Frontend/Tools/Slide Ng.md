---
area: technology
domain: frontend
type: tool
title: slide.ng
description: slide.ng (slide-ng/slide.ng, npm @slide-ng/core 1.0.0, MIT, by Erkam Yaman) is a Slidev port for Angular. One slides.md becomes one standalone Angular component per slide, with real Angular template syntax inside, Slidev's layouts, clicks, presenter view, Shiki/Magic Move/Monaco/KaTeX/Mermaid, export to PDF/PNG/PPTX (pictures only)/Markdown, offline builds, themes, an MCP server and an agent skill. Created 2026-10-16, about 100 stars, almost all commits by one author.
timestamp: "2026-10-22T00:00:00.000Z"
tags:
  - technology
  - frontend
  - angular
  - slidev
  - markdown
  - presentation
  - slides
  - mcp
resource: https://github.com/slide-ng/slide.ng
---

# slide.ng

[slide.ng](https://github.com/slide-ng/slide.ng) ([slide-ng.dev](https://slide-ng.dev/)) writes presentations in one markdown file, the way [Slidev](https://sli.dev) does, but compiles them with Angular instead of Vue and Vite, so a slide can hold Angular templates (`@if`, `@for`, `@let`, bindings, your own standalone components). I read the README, `package.json`, `docs/STATUS.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md` (start), `docs/PARITY.md` (start) and `docs/SYNTAX.md` (start), plus the GitHub and npm APIs. I did not install it, run a deck or open the site. Checked 2026-10-22.

|         |                                                                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Author  | Erkam Yaman ([erkamyaman](https://github.com/erkamyaman)), 349 commits; abiramcodes 2 commits, plus the all-contributors bot                           |
| License | MIT. Uses Slidev's own `@slidev/parser` (MIT, credited in NOTICE). Not affiliated with Google, the Angular team or the Slidev team                     |
| Created | 2026-10-16; last push 2026-10-22. No GitHub release; one git tag `v1.0.0`                                                                              |
| npm     | `@slide-ng/core` 0.1.0 (2026-10-16), **1.0.0** (2026-10-18). 479 downloads in the week 12–18 Oct 2026                                                  |
| GitHub  | 106 stars, 4 forks, 62 open issues/PRs                                                                                                                 |
| Stack   | TypeScript, Angular 22.2 (plain Angular CLI, esbuild builder, AOT), UnoCSS, Shiki, KaTeX, Mermaid, Monaco, `@modelcontextprotocol/sdk`. Node ≥ 22.22.3 |
| Sibling | [slide-ng/themes](https://github.com/slide-ng/themes) holds the official themes (`seriph`, `shibainu`, `bricks`, `apple-basic`) as `@slide-ng/theme-*` |

## How it works

Two halves, per `docs/ARCHITECTURE.md`. A **generator** of plain Node `.mjs` scripts reads `slides.md` (and files it imports with `src:`) with `@slidev/parser`, then writes one standalone Angular component per slide (`slide-001.ts` …), an index, the page HTML, UnoCSS output and theme files into a git-ignored `src/slides/generated/`. Then the normal `ng build` / `ng serve` compiles that like any other Angular app into a static site.

Design choices from `docs/DECISIONS.md`: the layout is chosen at generation time so no runtime lookup is needed and AOT checks every slide; code blocks are protected with both entity escaping of `{ } @` and `ngNonBindable` (entities alone fail because Angular decodes them before looking for `{{`); a stray `@` or brace in prose is escaped rather than an error; there is no per-slide `<script>` block, slides share state through template references and `@let`.

All built-ins carry a `slide-ng-` prefix where Slidev uses `v-`: `slide-ng-click`, `<slide-ng-clicks>`, `<slide-ng-toc />`, `<slide-ng-youtube>` (see `docs/RENAMES.md`). There is deliberately no converter for Vue syntax, so a Slidev deck needs hand edits to move over.

```sh
npx @slide-ng/core create my-talk
cd my-talk && npm install
npm run dev      # http://localhost:4230
npm run build    # static site in dist/
npm run export   # PDF
```

## Features (as the project reports them)

- Slidev's layouts, clicks, transitions, speaker notes with click markers, presenter view, drawing, overview, `src:` imports with ranges, `defaults:` headmatter.
- Code with Shiki, Magic Move, Twoslash and Monaco (runnable), plus KaTeX math, Mermaid and PlantUML.
- `slide-ng export` to PDF (per slide or per click step, optional outline), PNG, PPTX and Markdown; `slide-ng build` for a static site with `--base`, history or hash routing, size budgets; `build --offline` for a folder that opens from disk; optional PWA.
- Themes and addons resolved from `node_modules` like Slidev, `theme eject`, `setup/` hooks.
- `slide-ng mcp`: an MCP server over stdio with seven tools (get, update, insert, move, remove slides…). `slide-ng skills install` copies an agent skill (`SKILL.md` + 82 references) into a project, with a CI drift guard.
- `docs/PARITY.md` compares 173 rows against Slidev's docs and source; a `done` row must name a test that was found.
- `docs/STATUS.md` reports 914 unit tests and several hundred browser and export checks passing on the last run, and a 1.0.0 test round of fifty purpose-written decks plus a port of one real Slidev talk. These are the author's numbers; I did not run the suites.

## Gaps the project lists

From `docs/STATUS.md` "Not done" and known issues:

- **PPTX is pictures plus notes only.** Editable PPTX is out of scope on purpose.
- No `dev --tunnel`, no `dev --base`, no Prettier plugin, no community themes, no Vue-syntax converter. A VS Code extension exists in a separate repo but was never run inside VS Code.
- Monaco type loading, MDC, slide hooks and custom transition objects are not done. `:emoji:` shortcodes are not converted.
- Offline folders still need the network for PlantUML, YouTube, tweet and Bluesky embeds; a deck with Monaco and Mermaid becomes one large script (27 MB folder, 16 MB script on their test deck). First load with Monaco and KaTeX is about 850 kB.
- Keyboard and screen-reader use of the menus is incomplete (focus not always returned on Escape, overview moves a highlight not focus, no arrow keys in the context menu).
- Security fixes are tested with unit tests and local servers only; the project marks LAN use with a second device, DNS-rebinding against the exporter's request filter and `npm audit` as NOT VERIFIED. `--remote` has no HTTPS.
- MCP cannot move or remove slide 1, and edits need all slides in the entry file.

## Compared with other markdown or code slide tools

| Tool         | Engine                        | Write slides in                         | Fits when                                                 |
| ------------ | ----------------------------- | --------------------------------------- | --------------------------------------------------------- |
| slide.ng     | Angular 22 + UnoCSS           | Markdown + Angular templates/components | You already build in Angular and want live components     |
| Slidev       | Vue + Vite                    | Markdown + Vue components               | The mature original; npm `@slidev/cli` latest is 53.0.0   |
| Marp         | Marpit renderer               | Plain Markdown with directives          | Simple decks, a VS Code preview, editable PPTX not needed |
| reveal.js    | Vanilla JS framework          | HTML or Markdown sections               | Full control of HTML, a long-lived plugin ecosystem       |
| Typst slides | Typst (e.g. Touying, Polylux) | Typst markup                            | Print-first PDF decks with math, next to Typst documents  |

Only the slide.ng row and the Slidev npm version come from what I read today. The other rows are general characterizations from my own knowledge, not checked against those projects' current docs.

## Verdict

A careful, well-documented port (parity table with test names, decision log, honest status file), but it is days old with a single main author and no track record. Pick it if your team lives in Angular and wants Angular components inside slides; otherwise Slidev has the larger ecosystem, and for a Typst-based workflow a Typst slide package keeps everything in one toolchain. Re-check activity and the issue count before depending on it for a real talk.

Also listed in [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks).
