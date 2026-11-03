---
area: technology
domain: agent-infrastructure
type: tool
title: BrowserOS
description: "BrowserOS (browseros-ai/BrowserOS, AGPL-3.0) is a Chromium monorepo that ships BrowserOS neo for agents and BrowserOS for people. Checked 3 November 2026, the newest GitHub release is BrowserOS neo v0.52.0, and neither app was installed."
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - agents
  - browser
resource: https://github.com/browseros-ai/BrowserOS
sources:
  - id: github-api
    resource: https://github.com/browseros-ai/BrowserOS
    author: human:Felafax, Inc.
  - id: readme
    resource: https://github.com/browseros-ai/BrowserOS/blob/main/README.md
    author: human:Felafax, Inc.
  - id: readme-human
    resource: https://github.com/browseros-ai/BrowserOS/blob/main/README.BrowserOS.md
    author: human:Felafax, Inc.
  - id: privacy
    resource: https://docs.browseros.com/neo/privacy
    author: human:Felafax, Inc.
  - id: pr-3134
    resource: https://github.com/browseros-ai/BrowserOS/pull/3134
    author: human:Felafax, Inc.
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# BrowserOS

[BrowserOS](https://github.com/browseros-ai/BrowserOS) is one AGPL-3.0 monorepo with two Chromium browsers. BrowserOS neo is the browser an agent drives. BrowserOS is the browser a person drives, with an agent in the new tab. The root README says they run side by side and that neo is not a Chrome replacement. Checked 3 November 2026 against the GitHub API, both READMEs, `CHROMIUM_VERSION`, two package versions, `packages/browseros/pyproject.toml`, the newest 100 GitHub releases, the neo privacy page, and pull request 3134. The repo was not cloned. Neither installer was downloaded. Neither app was started.

The GitHub organization `browseros-ai` is named BrowserOS. Its blog field is `https://www.browseros.com/`. The API homepage is `https://BrowserOS.com`. Those sites were not opened. Both READMEs print copyright 2026 Felafax, Inc. That name was not checked against a company filing.

## Versions that do not match

The GitHub API on this check lists 14,227 stars, 1,526 forks, and 125 open issues. The repo is public, not archived, primary language TypeScript, default branch `main`, created 2025-05-18T16:23:54Z, and `pushed_at` 2026-11-02T21:28:06Z. Size is 213,919 KB. HEAD is `40f35b89b1890c716fecbbc4eafe76b5d05459ff`, committer date 2026-11-02T20:56:02Z. That commit merges pull request 3134. `main` is ahead of the newest release. The range was not diffed.

`releases/latest` is BrowserOS neo v0.52.0, tag `browserclaw/v0.52.0`, published 2026-10-31T05:30:20Z. The newest 100 releases also name other lines. Numbers on `main` are a third set.

| Line | Newest release in that page | File on `main` |
| --- | --- | --- |
| BrowserOS neo app | v0.52.0 on 2026-10-31, tag `browserclaw/v0.52.0` | no single app version file was opened |
| BrowserOS neo extension | v0.2.54.0 on 2026-10-29, tag `ext-browserclaw/v0.2.54.0` | `@browseros/claw-app` 0.2.56 |
| Claw server | v0.0.90 on 2026-10-30, tag `claw-server/v0.0.90` | crate `claw-server` 0.0.93 |
| BrowserOS app | v0.51.0 on 2026-10-05, tag `v0.51.0` | no matching app version file was opened |
| BrowserOS server | v0.0.168 on 2026-10-05, tag `agent-server/v0.0.168` | `@browseros/server` 0.0.168 |
| BrowserOS agent extension | v0.0.161.0 on 2026-10-05, tag `ext-agent/v0.0.161.0` | that package file was not opened |
| Build system | not a product release | `packages/browseros/pyproject.toml` name `browseros`, version 0.0.1 |
| Monorepo package | not a product release | `browseros-monorepo` 1.0.0, private |

`CHROMIUM_VERSION` sets MAJOR 155, MINOR 0, BUILD 8059, and PATCH 26. Both READMEs say system requirements match Google Chrome. That sentence is not this Chromium tuple. The tuple was not compared with a Chrome release.

## What neo says

The root README says neo imports Chrome logins, bookmarks, and extensions in one click, then connects an agent over MCP. One list names Claude Code, Codex, Cursor, VS Code, OpenClaw, and Hermes. The FAQ names Claude Code, Codex, Cursor, VS Code, Zed, OpenCode, Hermes, OpenClaw, and Antigravity. The comparison blurb names Claude Code, Cowork, Codex, Cursor, and others. Those three lists stay separate. Any MCP client is the FAQ's general rule.

The same README says each agent gets its own tab, sessions can be replayed, and files for sessions, screenshots, and history live under `~/.browserclaw/`. It also says neo sends anonymous product-usage events for agent connect and disconnect, version, and OS, and that a Settings toggle turns them off. It says those events do not include URLs, page content, prompts, tool results, or screenshots. The claim that neo uses fewer tokens than Claude's Chrome extension or the Codex browser has no number on the page. It was not measured here.

Install lines that were not run are `brew tap browseros-ai/tap` and `brew install --cask browseros-neo`. Download links point at `cdn.browseros.com` for a macOS dmg, a Windows exe, an x64 AppImage, and an amd64 deb. The README says neo's Linux builds are x64, and that both browsers run on macOS, Windows, and Linux. Those files were not fetched.

## What the human browser says

`README.BrowserOS.md` calls BrowserOS a Chromium fork with an agent in every new tab. It says the agent has 20 or more built-in tools and 40 or more app integrations, and it names Gmail, Slack, GitHub, Linear, and Notion. It says providers are 11 or more, or local models through Ollama or LM Studio. The provider page was not opened, so the count stays as written. Named providers in the install section are Claude, OpenAI, Gemini, and ChatGPT Pro through OAuth. The same file says you can expose the browser as an MCP server for Claude Code, Cursor, or any MCP client. It names uBlock Origin with Manifest V2, scheduled tasks, and file work in the same session.

The brew line on that page is `brew install --cask browseros`, with no tap in the snippet. Downloads use `files.browseros.com` for the dmg, the Windows installer, and the AppImage, and `cdn.browseros.com` for the deb. Those URLs were not fetched. This README does not mention `~/.browserclaw/` or PostHog.

Its comparison table marks cells for Chrome, Brave, Dia, Comet, and Atlas. Those products were not reopened. On that table, BrowserOS is yes for open source, an AI agent, an MCP server, files plus browser, scheduled tasks, your own keys, Ollama, local-first privacy, and Manifest V2 ad blocking. The Dia column is no on every row. Comet is yes for an AI agent and for Manifest V2 ad blocking. Atlas is yes for an AI agent. The neo README groups Atlas, Comet, and Dia together as browsers that use their own AI. The table and that sentence stay separate.

## Tree, licenses, and credits

The README splits the repo into a Chromium fork in C++ and Python, and an agent platform in TypeScript and Rust. `packages/browseros` holds the fork, `chromium_patches`, `series_patches`, and the build system. `packages/browseros/pyproject.toml` requires Python `>=3.12` and describes itself as the build system. `packages/browseros-agent` holds the neo Rust server `apps/claw-server`, the neo dashboard `apps/claw-app`, the human Bun server `apps/server`, and the human extension `apps/app`. The contributing guide says the C++ browser needs about 100 GB of disk. That build was not run.

The `LICENSE` file is the GNU AGPL version 3 text, with the Free Software Foundation copyright of 2007. `LICENSE.ungoogled_chromium` is BSD 3-Clause for the ungoogled-chromium patches, copyright 2015 through 2023, The ungoogled-chromium Authors. It names paths under `packages/browseros/series_patches`. The root README says the project uses some of those patches. The patch list was not read.

A citation block names Nithin Sonti, Nikhil Sonti, and BrowserOS-team, with year 2025. The credits table also names Dani and the X handles `nv_sonti`, `ThatNithin`, and `dani_akash_`. Dani is not in the citation author list. The repo was created in 2025. The README copyright line says 2026. All three dates stay.

`.gitmodules` points `.internal-docs` at `git@github.com:browseros-ai/internal-docs.git` on branch `main`. That submodule was not cloned.

## Privacy page and pull request 3134

The neo privacy page, fetched the same day, says history, cookies, sessions, downloads, and agent recordings stay in the local profile. It says sessions and screenshots under `~/.browserclaw/` do not upload, and that there is no cloud sync and no account. It says URLs, titles, page content, prompts, tool arguments, tool results, screenshots, file paths, passwords, API keys, and email never leave the machine in any stream or log.

The same page says anonymous product events are on by default. The fields it names are startup and shutdown, which AI tool connected or disconnected, session end times, the neo version, and the operating system. It says there is no user identifier. Events go to PostHog and follow PostHog's privacy policy. A Settings toggle turns them off. The page says the AI vendor, such as the one behind Claude Code, Cursor, or Codex, receives prompts under that vendor's policy, and that neo does not sit on that leg. It says the Claude Desktop extension collects no analytics. The extension repository was not opened.

Pull request 3134 was merged at the HEAD commit. Its summary says remote MCP callers were getting container-local paths they could not open. Neo now returns one output id per saved call, and `read_output` can fetch text, images, or bytes. The summary says storage defaults to `$NEO_DATA_DIR/tool-output`, Docker can set `NEO_OUTPUT_DIR`, permissions are private, and expiry is 24 hours. Nested previews are capped at four images or 8 MiB. The diff was not read. This MCP read path is not the PostHog event list. The two pages stay separate.

## Other repos

`browseros-ai/BrowserOS-agent` had 52 stars and an empty description on this search. `browseros-ai/browserclaw-claude-desktop` and `browseros-ai/skills` are separate repositories. `will-stone/browserosaurus` is a macOS browser prompter. `HernanRodriguez1/BrowserOSINT` is a different name. None of those trees were opened.

## See also

[Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) lists this repo next to other local agent runtimes.
