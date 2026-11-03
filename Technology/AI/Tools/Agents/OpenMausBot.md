---
area: technology
domain: agent-infrastructure
type: tool
title: OpenMausBot
description: "OpenMausBot (milind-soni/OpenMausBot, Apache-2.0) is a local-first chat app that runs a team of coding-agent bots. Checked 3 November 2026, main is package 0.1.139, the newest GitHub release and npm latest are 0.1.138, and the app was not installed."
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - agents
  - desktop
resource: https://github.com/milind-soni/OpenMausBot
sources:
  - id: github-api
    resource: https://github.com/milind-soni/OpenMausBot
    author: human:Milind Soni
  - id: readme
    resource: https://github.com/milind-soni/OpenMausBot/blob/main/README.md
    author: human:Milind Soni
  - id: package
    resource: https://github.com/milind-soni/OpenMausBot/blob/main/package.json
    author: human:Milind Soni
  - id: enterprise
    resource: https://github.com/milind-soni/OpenMausBot/blob/main/enterprise/LICENSE
    author: human:Milind Soni
  - id: security
    resource: https://github.com/milind-soni/OpenMausBot/blob/main/SECURITY.md
    author: human:Milind Soni
  - id: npm
    resource: https://registry.npmjs.org/openmausbot
    author: human:Milind Soni
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# OpenMausBot

[OpenMausBot](https://github.com/milind-soni/OpenMausBot) is a desktop and server chat app for a roster of bots. The README also calls it MausBot, and says it was formerly OpenGrokBot. It says the project is inspired by Grok Bot and is not affiliated with xAI, Meta, OpenAI, or Manus. Checked 3 November 2026 against the GitHub API, the README, `package.json` on `main` and at tag `v0.1.138`, `enterprise/LICENSE`, `SECURITY.md`, the `server/drivers` names, and the npm registry. The repo was not cloned. The app was not installed. `openmausbot` was not started.

The GitHub profile for `milind-soni` names Milind Soni. The homepage field is `https://www.openmausbot.com/`. That site was not opened. The Apache notice in the README is 2026 Milind Soni and OpenMausBot contributors. The repo was created 2026-08-11T18:58:55Z.

## Versions

The repo API at 2026-11-02T21:48:43Z listed 11,186 stars, 1,524 forks, and 669 open issues. The repo is public, not archived, primary language TypeScript, default branch `main`, and `pushed_at` 2026-11-02T20:29:15Z. Size is 391,003 KB.

`package.json` on `main` is name `openmausbot`, version `0.1.139`, `private` true, license Apache-2.0. Its description calls the app a local-first chat app for a team of AI agents. `engines.node` is `>=24`. React is `^19.1.0`. Electron in devDependencies is `^43.5.0`. The README badge says React 19. Tag `v0.1.138` has package version `0.1.138`.

`releases/latest` is OpenMausBot 0.1.138, tag `v0.1.138`, published 2026-11-02T03:16:35Z. npm `openmausbot` latest is `0.1.138`, time `2026-11-02T03:25:04.704Z`, license Apache-2.0. The npm description says it runs the server anywhere and pairs devices to it. That sentence is not the root `package.json` description. HEAD is `f52effc1a5871e4e54b3d2c699336a28c6cb1f97`, committer date 2026-11-02T18:34:59Z, after the 0.1.138 release. The range from the tag to HEAD was not diffed.

## What the README says it runs

Bots use the `claude`, `codex`, and `grok` CLIs already on the machine. The README says there is no new account and no proxy in the middle, and that Settings can point an engine at another CLI binary. A later section says an ACP CLI or an OpenAI-compatible endpoint can be added in config. The same section links a providers page for OpenRouter, Fireworks AI, DeepSeek, Cline, and other OpenAI-compatible or Anthropic-compatible providers. That page was not opened.

`server/drivers` includes files named `claude.ts`, `codex.ts`, and `grok.ts`. The same listing also includes `antigravity.ts`, `cerebras.ts`, `groq.ts`, `minimax.ts`, `mistral.ts`, `ollama-context.ts`, `openai-chat.ts`, `openrouter-free.ts`, `pi.ts`, `muse-code.ts`, and `greenference.ts`. Those files were not opened, so a filename is not a claim that the engine is offered in the UI.

One harness server on `127.0.0.1` owns the agent processes. Transcripts, keys, and events live in `~/.openmausbot`. Each bot can use a cloud Linux desktop, an isolated local VM, or the host computer where the README says the safety boundary is certified. Host control is available on macOS and Ubuntu Xorg after an explicit opt-in. Ubuntu Wayland host control stays off while issue 345 is open. The README does not put Windows in that certified list. Downloads named in the README are a signed macOS dmg for Apple silicon, a signed Intel dmg, a Windows x64 installer, and an Ubuntu 24.04 x64 deb, plus an AppImage the README calls beta. Those files were not downloaded.

Connected apps go through Composio. The README says 500 or more apps, and names Gmail, Slack, GitHub, Notion, and Linear. The count was not checked against Composio. A Boat API key gives an isolated remote Linux computer. The README says Boat is paid after its trial, and a cloud computer may incur charges. ElevenLabs and Fish Audio keys are for spoken replies and calls. Hosted voice can also use an xAI key. Built-in Mac voices and local Chatterbox need no cloud key. Calls are macOS-only for now. `docs/voice-mode.md` was not opened.

## Schedules, webhooks, and keys

The README says a bot can create a trigger in the same turn, with no confirmation, and the chat shows Edit, Pause, and Undo. Schedules can run once, on chosen weekdays, or on an interval from 5 minutes to 1,440 minutes. An interval skips an occurrence when the previous run is still active. Webhook secrets are shown once. The local receiver listens on `127.0.0.1:8800` by default, or one port above `OMB_PORT`. `OMB_WEBHOOK_PORT` picks another port. The app must stay running to accept a delivery. A public delivery needs a proxy in front of that receiver. These paths were not exercised.

App events need the included connected apps. The README says a server that uses its own Composio key cannot watch apps yet. Gmail is checked every 15 minutes. Slack, GitHub, and other push apps arrive at once. A desktop keeps up to 500 events a day. A paid Cloud keeps 2,000. The README says what is skipped shows on the automation.

The terminal install lines are `npm install -g openmausbot` and `npx openmausbot`, with Node 24 or newer. They were not run. The README says API keys are saved as plaintext, not encrypted, in a private `config.json`, mode `0600` on Unix. `docs/cli-onboarding.md` was not opened.

Usage analytics are optional. The README says they are anonymous product events and a once-a-day count of what is set up, and that they never include keys, names, addresses, or conversations. `docs/analytics.md` was not opened.

## License split and reporting

The repository license is Apache 2.0 except `enterprise/`. That directory's license says it is not Apache. Evaluation use is free. Running enterprise features in production requires a license key from the copyright holder, under a separate agreement for features, seats, and term. Redistribution, resale, and white-label hosting of that directory need a written partner agreement. The same file says deleting `enterprise/` leaves an open-source edition under Apache 2.0. Packaged Cua driver pieces keep their own MIT, SIL OFL 1.1, MPL-2.0, and other terms. `third_party/cua-driver/` was not opened.

`SECURITY.md` asks for reports by email to soni.mil2001@gmail.com, or by GitHub private advisory if that is enabled. It says a response is normally within a few days. It says the harness binds `127.0.0.1` only. Packaged builds allow anonymous loopback reads. Public mutations need the desktop's per-launch capability or a paired session. The next sentence in that file was not copied past the cut in this read.

The README says OpenMausBot has no token. It says any coin using the OpenMausBot, Maus, or SupaMaus name is not affiliated, and that the maintainer received no tokens. A search in this check for those names returned an empty list, so no second repository was identified from that query.

The README table compares the project with Grok Bot, Meta Muse, OpenAI dots, Cue by Manus, and Instinct. The heading above the table says four closed products shipped in seven weeks of 2026, while the table has five rows. Those product sites were not opened. The table's cells stay the README's claims.

## See also

[Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) lists this repo next to other local agent runtimes.
