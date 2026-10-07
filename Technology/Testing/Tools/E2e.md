---
area: technology
domain: testing
type: tool
title: e2e
description: e2e (npm e2e 0.18.0, tester-army/e2e, Apache-2.0) is TesterArmy's pre-1.0 web and mobile runner that mixes natural-language agent steps with locator assertions, using Playwright in the browser and agent-device on devices; npm versions 0.0.x are the older willscott/e2e OpenPGP library.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - testing
  - e2e
  - agents
resource: https://github.com/tester-army/e2e
---

# e2e

[e2e](https://github.com/tester-army/e2e) is an end-to-end runner from [TesterArmy](https://tester.army/). The docs site is [e2e.tester.army/docs](https://e2e.tester.army/docs). The npm package is `e2e`, bin `e2e`. License Apache-2.0. Contributors named in `package.json`: Oskar Kwaśniewski and Szymon Rybczak.

Checked 2026-10-07. The GitHub repo was created 2026-07-22. Default branch `main`. Language TypeScript. 6,950 stars, 310 forks, 73 open issues. Last push 2026-10-07. npm `latest` is **0.18.0**, published 2026-10-06 (GitHub release tag `e2e@0.18.0`). `packages/e2e/package.json` on the tree read that day also says `0.18.0`. `main` was pushed after that publish, so the branch can contain commits that are not in the tag. The README says the project is still on the way to 1.0, and that APIs and config can change between minor releases.

The same npm name already existed. Versions `0.0.1` (2014-12-16) through `0.0.8` are [willscott/e2e](https://github.com/willscott/e2e), described on npm as a browser OpenPGP helper for encrypting, decrypting, signing, and verifying messages. TesterArmy versions start at `0.1.0` (2026-07-21, description then "Coming soon."). `npm install e2e` on 2026-10-07 resolves to 0.18.0. Maintainers of `latest` are `okwasniewski` and `szymonrybczak`.

## How a test runs

A test can open the app, ask an agent to reach a goal, and then check the screen with locators. The README's example imports `test` and `expect` from `e2e` and uses `app.open`, `agent.act`, `agent.assert`, and `screen.getByRole`. Tests with no agent steps need no model. `e2e init` can be pointed at **None** for that path.

From the docs (cache and introduction, read 2026-10-07):

`agent.act`
: Completes one natural-language goal. After a later check verifies it, the replay cache records the actions. The next run replays them with no model call until a control or the expected end state no longer matches, and then the agent takes over from the current screen.

`agent.assert`, `agent.waitFor`, `agent.extract`
: Judge or read the screen. These always call the model. They are not replayed from the cache.

Locator assertions such as `expect(screen.getByRole(...))` stay deterministic. The introduction says one test can mix goals and locators, and that each test runs once per target (a browser, or a simulator).

`maxSteps` and `maxModelCalls` default to 25 and go up to 100. `agents.<name>.system` is read by the act loop only. `agents.<name>.context` (at most 16 KiB) and a test's `agentContext` are also read by judges. The docs say nothing in `system` reaches a judge.

## Packages

The repo is a pnpm workspace (`packageManager` `pnpm@12.3.4` in the root `package.json`). Versions below are npm `latest` on 2026-10-07.

| Package | Version | Role |
| --- | --- | --- |
| `e2e` | 0.18.0 | SDK, runner, and CLI. Docs are shipped in the package, so an agent can read `node_modules/e2e/docs` offline. |
| `@e2e-dev/web` | 0.13.0 | Browser engine on `playwright-core` 1.63.0. Peer `e2e` `>=0.18.0 <1`. The README lists Chromium, Firefox, and WebKit. Web docs show `web()` and `web({ browser: 'webkit' })`. |
| `@e2e-dev/mobile` | 0.10.0 | iOS and Android on [agent-device](https://github.com/callstack/agent-device) 0.21.22. Peer `e2e` `>=0.15.0 <1`. Docs cover simulators, emulators, and a phone connected to the machine. |
| `@e2e-dev/github` | 0.4.0 | Reporter that posts results as a pull request comment. |
| `@e2e-dev/kernel` | 0.2.0 | Optional. `web({ browser: kernel() })` uses [Kernel](https://kernel.sh) hosted Chromium. Reads `KERNEL_API_KEY`. |
| `@e2e-dev/eas` | 0.3.0 | Optional. `mobile({ device: easSimulators() })` uses Expo's hosted simulators. Reads `EXPO_TOKEN`, or an `eas login` session. |
| `@e2e-dev/decision` | 0.1.0 | Optional executor. Peer `ai` `^7.0.128` and `e2e` `>=0.15.2 <1`. |

Example projects named in the README: Vite, Next.js, Expo, SwiftUI, Jetpack Compose, Kotlin Multiplatform, and Flutter.

## Models

There is no default model and no shared API-key variable. Agent steps use the AI SDK. The built-in agent needs the `ai` package and a model that supports tool calls and images. Optional peer providers in `e2e` 0.18.0: `@ai-sdk/anthropic`, `@ai-sdk/google`, `@ai-sdk/openai`, `@ai-sdk/openai-compatible`, `@ai-sdk/xai`, and `ai`, all optional. The quickstart's sample config calls Vercel AI Gateway as `gateway('openai/gpt-6-luna-fast')`. That is the sample, not a model the runner selects on its own.

Subscriptions the docs tell you to sign in with, using the plan's own limits:

| Plan | Command |
| --- | --- |
| ChatGPT Plus or Pro | `npx e2e login openai` |
| GitHub Copilot | `npx e2e login github-copilot` |
| OpenCode Console (OpenCode Zen and OpenCode Go) | `npx e2e login opencode-console` |
| SuperGrok or X Premium+ | `npx e2e login spacexai` |

The subscriptions page says Claude subscriptions are not supported. Claude goes through an API provider, or through a model on a Copilot plan.

`@e2e-dev/decision` is a different path from the built-in agent. Its docs say a decision model answers one choice per action (which operation, and which element) from a semantic tree, and never generates free text. When the choice is `type`, a small language model writes the field value. The sample config uses `@ai-sdk/typesafe-ai` as `typeSafeAi.decisionModel('jev-latest')` plus an OpenRouter text model. The models page also names Clef as a decision model. This package is not the [Decision 2.0](/Technology/AI/Concepts/LLM And Generative AI/Decision 2.0) collection.

## Install

Node engines, from `packages/e2e/package.json` and the quickstart: `^22.22.3 || >=24.8.0`. The quickstart says to run inside WSL on Windows. Mobile setup also needs Xcode with an iOS simulator runtime, or the Android SDK with an emulator. `npx agent-device doctor` checks that machine.

```bash
npx e2e init
npx e2e run
```

`pnpm dlx e2e init` and `bunx e2e init` are the other forms in the quickstart. `init` asks for web or mobile, then a provider, and writes a config and an example test. The first example run in the quickstart has no model call. The coding-agent prompt on that page uses `npx e2e init --yes`, which it says writes a web config, an example test, the e2e skill, and MCP config, and installs nothing yet. `npx e2e guide` prints the skill.

The CLI sends anonymous usage telemetry by default: commands, engines, and where runs fail. The telemetry page says it does not send test content, app content, or credentials. Opt out with `npx e2e telemetry disable` (saved in `~/.config/e2e/telemetry.json`), `E2E_TELEMETRY_DISABLED=1`, or `DO_NOT_TRACK=1`.

Security reports go to `security@tester.army`, not to a public issue. See `SECURITY.md` in the repo.

> **See also:** [Testing Tools](/Technology/Testing/Tools/Testing Tools) · [Decision 2.0](/Technology/AI/Concepts/LLM And Generative AI/Decision 2.0)
