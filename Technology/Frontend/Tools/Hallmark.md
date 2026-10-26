---
area: technology
domain: frontend
type: tool
title: Hallmark
description: "Hallmark (Nutlope/hallmark, MIT, v2.0.0, made by Together AI) is a design skill for Claude Code, Codex, Cursor and OpenCode that builds new pages from one of 48 dealt themes under a non-negotiable Floor of design rules, then lints the result in a real browser with sloplint --render and a fresh-context review. 35.7k stars, 1.9k forks, 62 open issues at check time."
timestamp: "2026-10-27T00:00:00.000Z"
tags:
  - technology
  - frontend
  - design
  - agents
  - skills
  - claude-code
  - codex
  - cursor
  - css
resource: https://github.com/Nutlope/hallmark
---

# Hallmark

[Hallmark](https://github.com/Nutlope/hallmark) ([usehallmark.com](https://www.usehallmark.com)) is an **agent skill** for Claude Code, Codex, Cursor and OpenCode whose stated job is that a generated page "refuses to look AI-generated". Owner is **Nutlope** (Hassan El Mghari); the README says "Made by Together AI". On `main` the top committer is `Luffixos` (282 commits), then `Nutlope` (12).

Checked 2026-10-27 against the README, `SKILL.md`, `references/gates.md`, `package.json`, `eval/README.md` and the GitHub API. I did **not** install it or run a build.

|                  |                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------ |
| License          | MIT                                                                                        |
| Version          | **2.0.0** (`package.json` and `SKILL.md`); no GitHub releases, repo is the distribution    |
| Created / pushed | 2026-04-27 / 2026-10-22                                                                    |
| GitHub           | ~35,700 stars, ~1,860 forks, 62 open issues, default branch `main`                         |
| Language         | CSS (plain HTML/CSS output; Node scripts for the tooling)                                  |
| Size             | ~232 MB of checkout, almost all of it site screenshots and theme art                       |
| Needs            | Node 18+; `puppeteer-core` + Chrome for the render checks (static checks run without them) |

## What it is

Not a component library and not a site builder: it is a **procedure plus a rule set** an agent loads. It holds a hard floor, deals a visual direction so consecutive builds do not converge, and then gets out of the way. Output is self-contained HTML and CSS, stamped in its first CSS comment with the decisions the build took.

The mechanisms, in the order they matter:

- **The Floor** — 16 numbered rules in `SKILL.md` that bind every output and cannot be waived: colours and fonts only through `:root` tokens, never `transition: all`, never animate `width`/`height`/`top`/`left`, `overflow-x: clip` on `html` and `body`, `minmax(0, 1fr)` on image grid tracks, `:focus-visible` on every interactive element, a `prefers-reduced-motion` fallback, **never an invented metric, testimonial, logo wall or case-study count**, no eyebrow above headings, no tracked-capital labels, no purple-to-blue gradient, hero headline + one sentence + primary action visible at 1280×800, ~80 words per screen, capped and centred container.
- **Tiered gates** — `references/gates.md` holds the full numbered list (numbers run past 80; retired numbers are never reused). **Floor** never ships, **Reflex** is a model default that may be waived on the record, **Finish** is craft detail that is reported and answered but never blocks, and **Ledger** is bookkeeping about repetition. Grades are `FAIL`, `REFLEX`, `WAIVED`, `WARN`, `ANSWERED`, `NOTE`; each gate is classed **M** (static), **M/R**, **R** (render) or **J** (judged).
- **Waivers with evidence** — a Reflex gate is waived in the CSS stamp as `/* Hallmark · waive 47b · <guard evidence> · <reason> */`. A waiver naming a Floor gate is rejected; boilerplate reasons or a reason reused verbatim are rejected; the same gate waived three builds in a row is treated as a house style that belongs in a `design.md`.
- **A deferred theme** — 48 themes in `references/themes/`, each one file of at most 8 KB plus a screenshot of a finished page. A theme is a **material** (paper, type, colour, surfaces, texture, its own components), not a plan: it never decides what the page contains or in what order.
- **A browser lint** — `scripts/sloplint.mjs --render` checks the page at eight widths and implements every M gate, deriving its tier map from `gates.md` (the file wins on disagreement).
- **A cold review** — after the sweep, a fresh-context reviewer (subagent) sees the page without the build's reasoning.

## How a build runs

1. **Pre-flight** reads the project before asking anything: `design.md`/`DESIGN.md` (a locked system that overrides everything), `.hallmark/brand-spec.md`, the project's fonts/palette/framework, the product itself (a URL, a dev server or an app, captured with `scripts/capture.mjs`), an Inspo MCP server, and whether `TOGETHER_API_KEY` is set (the comp step).
2. **Ask once** — material (what the page can actually show), audience, the one action the page drives, and a tone from a list of extremes ("clean and modern" is explicitly not a tone). Skipped answers are inferred and stamped; **facts are never inferred** — a number, quote or logo not given is absent, and a picture not given is a stand-in from the photo library.
3. **Shape** — inventory the material, name the visitor's job, read that job's anatomy, then choose one of **21 macrostructures** (`references/macrostructures/01–21`, from Bento Grid and Workbench to Specimen, Index-First and Component Playground).
4. **Direction** — a named theme wins; "custom"/"bespoke" routes to `references/direction.md`; otherwise `theme.mjs deal` offers **three** themes that fit the prompt and clear the log, and `theme.mjs draw` deals the page anatomy. Re-deal only when asked.
5. **Load** — exactly the files for the build: `layout.md`, `anatomy.md`, `imagery.md`, `craft.md`, one genre file (`atmospheric`, `modern-minimal`, `playful`, `editorial`), the chosen theme, and `gates.md` § 1–4.
6. **Picks block** — the run's only recital of its decisions (shape, theme, chrome, hero, …), and the user's window to redirect before the build.
7. **Build and sweep** — hero built and reviewed alone first, then the page; stamp + `tokens.css` + log; `sloplint --render` until clean, then the judged gates and the reviewer.

`/hallmark redesign <path>` rebuilds an existing page keeping its content and wiring (say _keep the layout_ for a restyle, _polish_ for only the tells); `/hallmark audit <path>` only reports. `sloplint --before` records every link, field, handler and heading first, and `sloplint --kept` fails the redesign if one went missing; the handoff is a before/after side-by-side.

## Scripts and assets

- `theme.mjs` — `deal` (three themes) and `draw` (page anatomy from the job).
- `sloplint.mjs`, `sloplint-render.mjs` — the lint, static and rendered.
- `capture.mjs` — screenshots of a URL, dev server or app; `picture.mjs`, `imagegen.mjs`, `refcheck.mjs`.
- `photos.json` — **755 openly licensed photographs** hosted on Wikimedia Commons, picked per subject and credited on the page. Hallmark explicitly does not use Unsplash, Pexels or Pixabay because their terms bar AI tools from picking their images; no image files live in the repo.
- `install.mjs`, `install-hook.mjs`, `lint-hook.mjs` — validated install, plus an edit-time Floor check for Claude Code.
- `eval/` — a benchmark harness that is **not shipped** (`package.json` `files` whitelists only `skills/`): eight briefs, Tier A drives the real `claude -p` binary for conformance, Tier B is an archived bare-API matrix, scored by sloplint and a vision judge.

## Install

```bash
npx skills add nutlope/hallmark -g          # every project; drop -g for the current one
npx skills add nutlope/hallmark -g --agent claude-code   # one harness only
```

Lands in `~/.claude/skills/hallmark` (Claude Code), `~/.agents/skills/hallmark` (Codex CLI), and is found from there by Cursor and OpenCode. Also installable as a Claude Code plugin (`/plugin marketplace add nutlope/hallmark`, then `/plugin install hallmark@hallmark`). Invoke as `/hallmark <prompt>`, `$hallmark <prompt>`, or just describe a new build; if it does not fire, name it.

## Caveats

- **It fires on new designs, not on existing ones** — a change to an existing design is deliberately outside a Hallmark run unless you name `redesign`/`audit`.
- **The design is only as good as the material** — without real screenshots, numbers or photos it works with stand-ins and says so; it will not invent proof.
- **Render checks need a browser** — `puppeteer-core` plus Chrome; without them only the static half runs.
- **Skill auto-trigger is not guaranteed in non-interactive runs** — the repo's own eval notes that skills do not auto-trigger under `claude -p`, so it invokes by name.
- **Young and fast-moving** — v2 rewrote themes and flow (48 themes, deal/draw split); older posts describe v1. 62 open issues, no releases, no changelog outside commits.
- Not checked: actually installing it in this environment, running `sloplint`, or judging output quality on a real page.

See also [Frontend Overview § UI/UX Design Intelligence](/Technology/Frontend/Resources/Frontend Overview#uiux-design-intelligence), [CSS Tools](/Technology/Frontend/Tools/CSS Tools), [AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI Coding Productivity Tools), [Vue TermUI](/Technology/Frontend/Tools/Vue TermUI).
