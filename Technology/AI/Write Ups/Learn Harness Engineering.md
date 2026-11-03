---
area: technology
domain: llm
type: guide
title: Learn Harness Engineering
description: "Learn Harness Engineering is WalkingLab's MIT course on the files, checks, and session rules around a coding agent. The English site has 14 lectures and 8 projects, and the repo was last pushed on 22 October 2026."
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - llm
  - agents
  - harness
  - course
resource: https://github.com/walkinglabs/learn-harness-engineering
sources:
  - id: readme
    resource: https://github.com/walkinglabs/learn-harness-engineering/blob/main/README.md
    author: human:WalkingLab
  - id: github-api
    resource: https://api.github.com/repos/walkinglabs/learn-harness-engineering
    author: human:GitHub
  - id: lecture-02
    resource: https://github.com/walkinglabs/learn-harness-engineering/blob/main/docs/en/lectures/lecture-02-what-a-harness-actually-is/index.md
    author: human:WalkingLab
  - id: designs
    resource: https://github.com/walkinglabs/learn-harness-engineering/blob/main/docs/en/harness-designs/index.md
    author: human:WalkingLab
  - id: skill
    resource: https://github.com/walkinglabs/learn-harness-engineering/blob/main/skills/harness-creator/SKILL.md
    author: human:WalkingLab
  - id: package
    resource: https://github.com/walkinglabs/learn-harness-engineering/blob/main/package.json
    author: human:WalkingLab
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# Learn Harness Engineering

[Learn Harness Engineering](https://github.com/walkinglabs/learn-harness-engineering) is a public course on the working environment around a coding agent. The GitHub description is "Harness engineering beginner tutorial, from 0 to 1". The site is [walkinglabs.github.io/learn-harness-engineering](https://walkinglabs.github.io/learn-harness-engineering/). Checked 3 November 2026. The repository was not cloned. The lectures were not taken as a course. `npm run dev` was not run.

## Repository

The GitHub API on that check returned these fields. License SPDX id is MIT. Language is TypeScript. Default branch is main. `created_at` is 2026-03-29T12:28:19Z. `pushed_at` is 2026-10-22T14:23:31Z. Stars were 22,974. Forks were 2,615. Open issues were 18. The repository is not archived. Homepage is the GitHub Pages URL above. Reported size was 30,164 KB. Star counts move.

`package.json` on main says name `learn-harness-engineering`, version 0.1.0, private, license MIT. The description says the course docs are powered by VitePress. `dev`, `build`, and `preview` call VitePress on `docs`. `pdf:build` builds the docs and then exports PDFs. The script comment in `package.json` does not name the output folder. The README says `npm run pdf:build` writes files under `artifacts/pdfs/`. The releases API returned an empty list, so no release assets were published at this check. HEAD was `a9342ff471f2c0e60be0c08b9f4a7c502df4e442`, committer date 2026-10-22T14:02:14Z, message "docs: correct cited course data across 15 locales (#92)". The GitHub file list showed 267 commits. The site responded HTTP 200, and its `last-modified` header was Thu, 22 Oct 2026 14:04:39 GMT.

The LICENSE file says MIT License, copyright 2025 WalkingLab. That year is earlier than `created_at`. Both stay in this note.

## What the course contains

The English docs tree has 14 lecture folders and 8 project folders. The README syllabus matches that count. A separate capstone section on the same README still says all six course projects share one Electron app. Project 06 is the row the syllabus calls the capstone. Projects 07 and 08 were added later, in the July 2026 and August 2026 "What's New" blocks. The evolution diagram says each project's solution becomes the next project's starter.

The app in the capstone section is an Electron personal knowledge base. It imports documents, indexes them, and answers questions with citations. This note did not open the Electron source.

The README syllabus questions, one per lecture, are these.

- L01. Why do strong models still fail on real tasks?
- L02. What does "harness" actually mean?
- L03. Why must the repo be the single source of truth?
- L04. Why does one giant instruction file fail?
- L05. Why do long-running tasks lose continuity?
- L06. Why does initialization need its own phase?
- L07. Why do agents overreach and under-finish?
- L08. Why are feature lists harness primitives?
- L09. Why do agents declare victory too early?
- L10. Why does end-to-end testing change results?
- L11. Why does observability belong inside the harness?
- L12. Why must every session leave a clean state?
- L13. Why do you need to stop prompting your agent?
- L14. Why does a single loop grow into a graph?

The project rows say what you do.

- P01. Run the same task twice, prompt-only against rules-first.
- P02. Restructure the repo so the agent can read it.
- P03. Make the agent pick up from where it left off.
- P04. Stop the agent from doing too much or too little.
- P05. Make the agent verify its own work.
- P06. Build a complete harness from scratch. The table calls this the capstone.
- P07. Build your first automated loop.
- P08. Draw your workflow as a graph.

Docs locale folders on main are `ar`, `de`, `en`, `es`, `fr`, `ja`, `ko`, `pt-BR`, `ru`, `tr`, `uk`, `uz`, `vi`, `zh`, and `zh-TW`. That is 15. The README badge row names the same 15 languages, including Tiếng Việt. Extra skill README files exist for Hindi and Urdu. Those two names are not in the 15 doc folders.

## Two lists of five subsystems

The same README uses two different lists of five names. They are not merged here.

The syllabus row for L02, the harness diagram on the README, and `skills/harness-creator/SKILL.md` name instructions, state, verification, scope, and lifecycle. The skill's minimal files are `AGENTS.md` or `CLAUDE.md`, `feature_list.json` and `progress.md`, `init.sh` or documented commands, feature dependencies, and `session-handoff.md`.

Lecture 02 and `docs/en/harness-designs/index.md` name instructions, tools, environment, state, and feedback. Lecture 02's diagram uses project rules, progress and git, shell and file tools, runtime versions, and check results. The August 2026 breakdown section on the README uses this second list. It points at Pi, Claude Code, Codex, and DeepSeek. The breakdown index says those articles skip model scores and product feature tours.

## Skill, audit script, and cited sources

`skills/harness-creator` is the only skill directory with a `SKILL.md`. Its frontmatter name is `harness-creator` and its license line is MIT. The description says to use it when a coding agent forgets context, leaves scope, or claims done before tests pass. This note did not install the skill.

`tools/audit-harness.sh` is a bash audit. The header says exit 0 when every CRITICAL item passes, and exit 1 otherwise. It says it needs no Node.js. The header credits Stephen Kimoi and links a different template repo, `Stephen-Kimoi/harness-engineering-template`. The README also shows a `curl` pipe into `bash`. Neither form was run.

The README names four references and does not paste them. This note did not open those pages. They are OpenAI's "Harness engineering: leveraging Codex in an agent-first world", Anthropic's "Effective harnesses for long-running agents", Anthropic's "Harness design for long-running application development", and `walkinglabs/awesome-harness-engineering`. The acknowledgments say the course draws ideas from `shareAI-lab/learn-claude-code`. Two other WalkingLab courses are linked from the README, `hands-on-modern-rl` and `modern-llm-notebook`. They were not read.

The README retells one Anthropic comparison and one OpenAI claim. Same model, named as Opus 4.5, and the same prompt to build a 2D retro game editor. Without a harness, the README says the run spent $9 in 20 minutes and did not work. With a planner, a generator, and an evaluator, it says the run spent $200 in 6 hours and produced a playable game. It also says OpenAI reported that a harnessed repository makes the same Codex model reliable. Those sentences are the course README. They were not checked against the Anthropic or OpenAI articles.

## See also

[LLM Learning Resources](/Technology/AI/Resources/LLM Learning Resources) lists this course next to the other lecture notes.
