---
area: technology
domain: coding-agents
type: tool
title: gstack
description: "gstack (garrytan/gstack, MIT) is Garry Tan's skill pack that adds review, QA, and release commands to coding agents. Checked 3 November 2026, main VERSION is 1.93.21.0, the newest GitHub release is v1.92.55.0, and the pack was not installed."
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - coding-agents
  - agents
  - skills
resource: https://github.com/garrytan/gstack
sources:
  - id: github-api
    resource: https://github.com/garrytan/gstack
    author: human:Garry Tan
  - id: readme
    resource: https://github.com/garrytan/gstack/blob/main/README.md
    author: human:Garry Tan
  - id: privacy
    resource: https://github.com/garrytan/gstack/blob/main/docs/privacy.md
    author: human:Garry Tan
  - id: security
    resource: https://github.com/garrytan/gstack/blob/main/SECURITY.md
    author: human:Garry Tan
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# gstack

[gstack](https://github.com/garrytan/gstack) is a MIT pack of markdown skills and local helper binaries for coding agents. The GitHub description says it is Garry Tan's Claude Code setup, with 23 opinionated tools. The tree on `main` has more `SKILL.md` files than 23. Checked 3 November 2026 against the GitHub API, the README, `VERSION`, `package.json`, the file tree, `docs/privacy.md`, and `SECURITY.md`. The repo was not cloned. `./setup` was not run.

The GitHub profile for `garrytan` names Garry Tan, sets the company field to Y Combinator, and sets the blog field to `https://blog.garrytan.com`. That blog was not opened. The README says he is President and CEO of Y Combinator. That title was not checked against Y Combinator.

## Versions

The repo API at 2026-11-02T21:40:35Z listed 138,673 stars, 20,555 forks, and 117 open issues. A search in the same minute listed 138,674 stars. The repo is public, not archived, primary language TypeScript, default branch `main`, created 2026-03-11T21:22:45Z, and `pushed_at` 2026-11-02T21:40:21Z. Size is 249,099 KB. The API homepage is empty.

HEAD is `e0531db79332b5ce77ca8d0a55f7d0592ddd28b1`, committer date 2026-11-02T21:39:39Z. The subject starts with `v1.93.21.0` and says a ship fix. `VERSION` on that commit is `1.93.21.0`. `package.json` name is `gstack`, version `1.93.21`, license MIT. Those two strings differ by the trailing `.0`.

`releases/latest` is gstack v1.92.55.0, tag `v1.92.55.0`, published 2026-11-02T14:07:05Z. The two releases before it are v1.91.318.0 on 2026-10-29 and v1.91.242.0 on 2026-10-26. `main` is ahead of v1.92.55.0. The range was not diffed. The README says team mode follows a `stable` channel of tagged releases, named as Monday and Thursday, at most once every 72 hours, plus security and regression fixes. `gstack-config set update_channel main` follows every merge. That switch was not tested.

`package.json` sets `engines.bun` to `>=1.4.2`. The README says Bun v1.4.2 or newer is the tested version, and that setup refuses Bun older than 1.3.3 because that older Bun would let compiled tools read a project's `.env`. The Bun behavior was not checked. The `package.json` description calls the repo Garry's stack of Claude Code skills plus a fast headless browser. The file writes that sentence with an em dash. This note does not copy the character.

The license file is MIT. Its copyright line is 2026 Garry Tan.

## Skill files

The tree has 71 paths ending in `SKILL.md`. One is the root `SKILL.md`. Sixty-two are `SKILL.md` files one directory down. Eight are deeper. The bodies were not opened, so a folder name is not a promise about what the file does.

The 62 folder names are `autoplan`, `benchmark-models`, `benchmark`, `browse`, `canary`, `captain`, `careful`, `codex`, `context-restore`, `context-save`, `cso`, `design-consultation`, `design-html`, `design-motion`, `design-review`, and `design-shotgun`. They continue with `deslop-shared-libs`, `devex-review`, `diagram`, `document-generate`, `document-release`, `eval-plan`, `freeze`, `gstack-upgrade`, `guard`, `health`, `investigate`, `ios-clean`, `ios-design-review`, `ios-fix`, and `ios-qa`. They continue with `ios-sync`, `land-and-deploy`, `landing-report`, `learn`, `make-pdf`, `modernize`, `office-hours`, `open-gstack-browser`, `pair-agent`, `plan-ceo-review`, `plan-design-review`, `plan-devex-review`, `plan-eng-review`, and `plan-tune`. They end with `qa-only`, `qa`, `retro`, `review`, `scrape`, `setup-browser-cookies`, `setup-deploy`, `setup-gbrain`, `ship`, `skillify`, `spec`, `sync-gbrain`, `test-audit`, `ubicloud`, `unfreeze`, `verify`, and `write-skill`.

The eight deeper files are `browser-skills/hackernews-frontpage/SKILL.md`, `capy/skill/gstack/SKILL.md`, four files under `openclaw/skills/`, and two files under `test/fixtures/`. The four OpenClaw names are `gstack-openclaw-ceo-review`, `gstack-openclaw-investigate`, `gstack-openclaw-office-hours`, and `gstack-openclaw-retro`. The README says an OpenClaw install has five task skills and one router skill. The four files and that sentence stay separate.

## Hosts and browsers

Bare `./setup` installs for Claude Code. `--host auto` installs for every agent the script detects. `--host` with one name does not change another agent's install. Tiers on the README are full, experimental, and instruction-only. Only Claude Code is full. The README says that tier was certified by a workflow run. This check did not run one.

Experimental hosts on that table are OpenAI Codex CLI, OpenCode, Cursor, Factory Droid, Kiro, GitHub Copilot CLI, Antigravity CLI, Gemini CLI, OpenClaw, and Hermes. Instruction-only hosts are Slate and GBrain. The README says Zed, Amp, and Jules can read `agents-digest/gstack-AGENTS.md` with no install. That digest was not opened. On Claude Code, the README says hooks block safety skills. On the other rows, safety skills are advisory and not blocked.

The README says macOS and Linux are fully supported, and Windows and Gemini models are minimal. With the Aside browser open on macOS 15 or newer, browser skills, `/make-pdf`, and `/diagram` use Aside and its logged-in sessions. gstack does not install Aside. Without it, setup builds a bundled browser. On Linux the skills use that bundled Chromium. If Ubuntu 24.04 or newer AppArmor blocks user namespaces, the README says to set `GSTACK_CHROMIUM_NO_SANDBOX=1`. On Windows the compiled binaries are unsigned. The README points at issue 2595, where Smart App Control refuses to start them. Those installs were not tried. Node.js is required on Windows because of a Bun Playwright pipe bug the README cites as oven-sh/bun issue 4253. `/cso` also wants a native toolchain, and setup leaves that skill unavailable when the toolchain is absent.

## Privacy

`docs/privacy.md` matches the README on three switches, and it names fields the README summary does not.

Telemetry is opt-in and off by default. The first run asks once. `gstack-config set telemetry off` turns it off. When it is on, a skill run can send the skill name, the event type, the outcome, the duration, the gstack version, the OS, and the CPU architecture. It can also send whether the browser was used, whether the run was live or a test, a session id, a count of live session markers, the error class, the failed step, and an error message. The page says that message goes through secret redaction and is cut to 200 characters. Mode `community` adds a stable device id. Mode `anonymous` sends no id. A prompt-injection detection can add the attacking page's domain, a payload hash, a confidence score, the detection layer, and the verdict.

The same page says telemetry never sends code, file paths, repo names, branch names, prompts, or other content you write. Opted-in runs are also logged locally at `~/.gstack/analytics/skill-usage.jsonl`, and that local file does keep the repo name and branch. The page says the upload step deletes those two fields, and deletes the device id for anonymous mode, before the upload. With telemetry off, it says no usage analytics are written. Events go to Supabase. The page says the publishable key in the repo is public, row-level security denies direct access, and edge functions check the schema. The key was not copied here. The migrations were not opened.

The update check is on by default even when telemetry is off. A stale cache asks GitHub with `git ls-remote`, a GET of `VERSION` from raw GitHub, and sometimes a compare API call. The page says GitHub sees your IP, and that the check sends nothing about you or your code. With telemetry on, the same check also posts the gstack version and the OS to Supabase. `gstack-config set update_check false` turns the check off.

Outside reviews are on by default. The first one prints a notice. The page lists plan reviews, `/autoplan`, `/review`, `/ship`, `/design-review`, `/design-consultation`, `/office-hours`, `/document-release`, and `/spec`. Those can send the review prompt and the relevant code, diff, or plan to Codex or Claude Code under your own login. `gstack-config set codex_reviews disabled` makes the sending binaries refuse. `/codex` and `/claude-code` still run when you ask for them by name. A later heading covers local state that is not telemetry. That section was not read past the heading.

`SECURITY.md` asks for GitHub private vulnerability reports. If that link fails, it says to open a public issue titled "Request for a private security contact" and to put no technical detail in it. Fixes land on `main` and ship in the next release. Older versions are not patched separately. Third-party tools that gstack drives are out of scope.

## Other repos

Search hits that are not this tree include `loperanger7/gstack-auto`, `Ahacad/gstack`, `fagemx/gstack-game`, `mr-daedalium/ostack-saas`, and `lucas-flatwhite/gstack-ko`. The Korean repo's search description says 6 tools. Those repositories were not opened.

## See also

[AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI Coding Productivity Tools) lists this repo with other skill packs.
