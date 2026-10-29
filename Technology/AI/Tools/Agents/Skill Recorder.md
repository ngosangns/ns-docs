---
area: technology
domain: agents
type: tool
title: Skill Recorder
description: "Skill Recorder (microsoft/skill-recorder, MIT, Electron + TypeScript) records a screen session on-device, optionally transcribes narration with Whisper and blurs OCR-located text before anything leaves the machine, has GitHub Copilot reconstruct the intent and ordered steps, then renders a SKILL.md into ~/.copilot/skills or a Scout automation. 5.4k stars, v0.7.0."
timestamp: "2026-10-28T00:00:00.000Z"
tags:
  - technology
  - agents
  - skills
  - copilot
  - electron
  - screen-recording
  - privacy
resource: https://github.com/microsoft/skill-recorder
---

# Skill Recorder

[Skill Recorder](https://github.com/microsoft/skill-recorder) records a person doing a task once and turns that run into an agent artifact: a `SKILL.md` procedure or a scheduled automation. It is a Microsoft open-source desktop app (Electron + TypeScript, MIT). The value is in the pipeline, not the recorder: capture is deliberately boring, and the product is the reconstruction step plus the privacy work around it.

Checked 2026-10-28 against the README, `INSTALL.md`, `evals/README.md`, `package.json`, and source in `common/`, `electron/` and `src/`. I did not install or run the app.

|                |                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| License        | MIT                                                                                                                             |
| Version        | v0.7.0, released 2026-09-21                                                                                                     |
| Created / main | 2026-07-29 / 2026-09-21 (repo pushed 2026-10-24)                                                                                |
| GitHub         | 5,449 stars, 619 forks                                                                                                          |
| Stack          | Electron + React + TypeScript, Node 24; Copilot CLI 1.0.78 pinned; Whisper small int8 via transformers.js; tesseract.js + sharp |
| Platforms      | macOS primary; Windows 11 x64/ARM64 supported (separate `WINDOWS-VALIDATION.md`)                                                |
| Install        | source release: one command builds the pinned commit locally, no global install                                                 |

## Pipeline

1. **Record.** Global hotkey (`⌘⇧R` / `Ctrl+Shift+R`). Collects active-app/window switches, browser URLs (macOS), low-rate frames only when the screen changes or a heartbeat is due, short clipboard previews, optional spoken narration, and — only if you open the app-owned terminal — command, cwd, shell, exit status, duration and full output. There are no global hooks and existing terminals are not observed.
2. **Stay local.** Recording, frame extraction and narration transcription all run on-device. Nothing leaves until **Analyze**.
3. **Scrub.** Protection is on by default. `@secretlint` (recommended preset + custom patterns) and a structured-PII scan run over text; for frames, OCR locates text regions and `sharp` blurs them before a JPEG is sent — the OCR text itself never leaves. If the OCR model cannot provision within 30 s, frames are withheld rather than sent unscanned.
4. **Analyze.** A multi-turn Copilot agent reads the timeline and produces one overall intent plus an ordered step list; it pulls frames only when the timeline is ambiguous. Sign-in is the Copilot CLI web OAuth flow.
5. **Build.** A second agent proposes a plan — steps typed `calculation` (no side effect) vs `action` (creates/sends/deletes), the native tools per step, and fixed values as `{{id}}` tokens — which the user edits in natural language. On confirmation it renders `SKILL.md` and either installs it to `~/.copilot/skills/<name>/SKILL.md` or exports `<dir>/<name>/SKILL.md`.
6. **Generalize.** The instructions are written imperatively to the agent and loop over all items of a kind, not the recorded examples; UI actions must map to portable tools, an API or a CLI, never to "click"/"type".

## Target catalogues

Builders are pinned to a **versioned static snapshot** of each target's built-in tools, so a generated skill cannot depend on something the target lacks:

| Target                | Catalogue date | Note                                                     |
| --------------------- | -------------- | -------------------------------------------------------- |
| Scout                 | 2026-08-08     | exact tool ids (`workiq_*`, …)                           |
| Copilot Cowork (M365) | 2026-07-28     | built-ins only, no user-installed skills                 |
| Generic agent skill   | 2026-08-06     | portable capabilities only: files, shell/CLIs, HTTP APIs |

The catalogues must be refreshed by hand when a target changes; they are compiled into the system prompt, not introspected at runtime.

## Evals

The parts with real variance are tested with fixture recordings, not live capture: a fixed `session.json` + `events.jsonl` is materialised into a temp sessions root, the real `processSession()` and `Describer` run, and the result is scored deterministically — intent keywords, step-count range, expected apps, ordered actions, must-mention values, and **forbidden noise** (recorder chrome, permission dialogs, tracking-param hops) which fails a scenario outright. Pass is ≥80% of checks; `--judge` adds an optional LLM faithfulness score. Ten business scenarios, ~15–25 s each.

## Assessment

- **Strong engineering.** Typed IPC, zod schemas for every agent output, tests next to each module, a licensing/compliance boundary for redistributed builds, and evals that swap Electron for a headless stub so they exercise the real source.
- **The privacy story is the differentiator.** Secret scanning, OCR-and-blur before upload, and withholding frames on model failure are unusual care for a screen recorder.
- **It is the mirror image of [Rul](/Technology/Programming Languages/Tools/Rul).** Instead of an agent emitting code humans cannot read, a human works and the agent writes instructions it can run.
- **Limits.** macOS gets URL capture and is the primary target; Windows is a separate validated path. Analyze uploads the timeline, frames, narration and terminal excerpts to GitHub, and that cannot be undone. "Review SKILL.md" is visibility into generated instructions, explicitly _not_ a security guarantee — a skill built from one run inherits that run's shortcuts, and action steps are the risky surface.

> **See also:** [AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI Coding Productivity Tools) · [Coding Agents](/Technology/AI/Tools/Agents/Coding Agents)
