---
area: technology
domain: agent-infrastructure
type: tool
title: OpenDuet
description: OpenDuet (CopilotKit/OpenDuet, MIT) is an early self-hosted template for a proactive agent, built on a vendored OpenBot tree, with mail triage and a morning brief, and the server refuses to start without a CopilotKit Intelligence key.
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - ag-ui
resource: https://github.com/CopilotKit/OpenDuet
---

# OpenDuet

[OpenDuet](https://github.com/CopilotKit/OpenDuet) is CopilotKit's self-hosted template for a proactive agent. It starts the day with a short brief, keeps working on a computer of its own, and pauses before it sends, pays, signs, or deletes. Checked 3 November 2026 against the GitHub API, the README, the tenant YAML, `triage.ts`, `brief.ts`, `morning-brief.ts`, `telemetry.ts`, `gateway.ts`, `policy-store.ts`, `config.ts`, `copilot.ts`, `channels/routes.ts`, `chat-screen.tsx`, the head of `calls.ts`, `docs/telemetry.md`, `evals/triage/README.md`, and the public page at copilotkit.ai/openduet. Not cloned and not started.

## What you get

The GitHub description calls it an open-source template for a proactive AI agent that gets your work done and keeps you in the loop. The README badge says early development. What makes the checkout OpenDuet, rather than plain OpenBot, is the name, the bots, the channels, the model, and the skills in `openbot/examples/openduet`. The platform under `openbot/` is a copy of [OpenBot](https://github.com/CopilotKit/openbot) committed in this repo. A request for `.gitmodules` returned 404, so the copy is not a submodule. That copy was not diffed against CopilotKit/openbot. The tenant folder is not the only OpenDuet code. `wiring.ts` says `index.ts` is OpenBot's, and every OpenDuet line added there can collide with an OpenBot update. `openbot/server/src/openduet/` also holds tasks, pages, channels, replies, and offers. Those files were listed. Their bodies were not read, except `brief.ts` and `triage.ts`.

The README says OpenDuet is CopilotKit's open-source take on assistants that reach out first, such as Claude Duet, and that it is not affiliated with or endorsed by Anthropic.

The product page, fetched 3 November 2026, says early preview and MIT. It says you self-host with Docker and Bun. It says policy, approvals, the audit record, and saved logins stay in your PostgreSQL, while threads and memory stay in CopilotKit Intelligence. The page lists LangChain, Mastra, Google ADK, CrewAI, Microsoft Agent Framework, and AWS Strands. The README lists LangGraph, Mastra, CrewAI, Pydantic AI, Google ADK, or an agent written by hand. The tree contains `agent-langgraph`, `agent-mastra`, `agent-crewai`, `agent-pydantic-ai`, `agent-adk`, `agent-microsoft`, `agent-strands`, and other `agent-*` folders. Those folders were not opened.

## How a turn runs

You talk in the web app on port 3010. Slack and Microsoft Teams are OpenBot's, per the README. `.env.example` says those two arrive through an OpenTag deployment, and that the old `SLACK_*` settings are refused at startup. That path was not exercised.

The server package depends on Hono `^4.10.0` and `@copilotkit/runtime` `1.77.0`. It sends each turn to an agent over AG-UI. `@ag-ui/client` and `@ag-ui/core` are `1.0.1`. `openbot/examples/openduet/agents.yaml` defines three bots.

`openduet` is `type: built-in`. Its prompt tells it to stay under 35 words in ordinary chat, to call the tool for send, pay, sign, or delete without asking first in the chat, and to put longer work in `make_page` or `start_task`. The pause the person sees is the approval gate, not a second question in the thread.

`your-agent` is `type: remote-ag-ui`. Its endpoint is `${MANAGED_AGENT_AG_UI_URL:-}`. A blank endpoint leaves this bot out instead of failing startup. `.env.example` says `scripts/start.sh` points that URL at the LangGraph agent on port 4201 for a laptop, and that the proof of concept on port 4200 is a reference, not something to deploy.

`picked-harness` is kept so OpenBot's harness picker in `scripts/start.sh` still works.

Computer actions and connector calls take different paths.

The header of `openbot/server/src/computer/gateway.ts` says that file is the only way an action reaches a bot's computer. It resolves the element ref from the server's snapshot, asks policy, writes the audit row, and only then acts. Deny beats allow. An absent policy denies. A broken rule denies. The comment says a label supplied by the model is not what gets clicked. `DEFAULT_ACTION_POLICY` in `policy-store.ts` is mode `enforce`, with an empty deny list and `allow: ["true"]`. The comment says that allow is deliberate, so a new install can act and an administrator has a place to write the first restriction. The approval gate is what pauses a write. The buttons that map `allow_once`, `allow_always`, and `deny` onto Allow once, Always allow, and Refuse were not opened.

Connector tools go through `callTool` in `openbot/server/src/plugins/plugin-store/calls.ts`. A write that `shareTargetOf` treats as a message to other people asks the owner first, even when the general approvals switch is off. The rest of that file was not read.

`openbot/worker/src/index.ts` sets `TICK_MS` to 30 seconds and sweeps due routines in the same process, because a laptop has no CronJob. The handler for `/internal/routines/run` was not opened.

The README says each agent can have a container with Chromium, a `/workspace` volume, a browser profile, and a shell. Two switches are easy to mix up. The README says keep `OPENBOT_ONE_COMPUTER_EACH=true` for a computer per bot, and set it to `false` with an empty `COMPUTER_SUPERVISOR_URL` to share one. `.env.example` says an unset `COMPUTER_SUPERVISOR_URL` means every bot shares `AGENT_COMPUTER_URL`, and setting it makes the supervisor give each bot its own container. `COMPUTER_RUNTIME=runsc` uses gVisor when the host has it. Unset, the example says a computer is an ordinary container on the host kernel.

## Mail triage and the morning brief

`openbot/shared/morning-brief.ts` exports `MORNING_BRIEF_TOOL` as `morning_brief`. The frame text is `Give me my morning brief.` It tells the model that nobody typed it, to call `morning_brief` once, and to add at most one short sentence after the card.

The browser does not send that text. `chat-screen.tsx` POSTs `{ agentId, date }` to `/api/channels/morning-brief`. The comment there says the server writes the message. `routes.ts` ignores a `brief` field an older app might still send, and calls `morningBriefMessage()`. `briefDate` accepts `YYYY-MM-DD` only when the date is within one day of the server's UTC date. The first-day update sets `morningBriefOn` to that date. The comment says a later open on the same day does not also post a brief. `first-day.ts` was not read.

`buildMorningBrief` in `openbot/server/src/openduet/brief.ts` searches Gmail with `in:inbox newer_than:1d` unless `since` is set, and caps the fetch at `BRIEF_MAIL_CAP`, which is 50. It sorts eight messages at a time. The text it sorts is the search snippet, not the full message. A message that fails to sort is listed under needs you, with the reason "Could not be sorted, so it is here to be safe." Calendar events come from `google-workspace/calendar_list_events`. If Gmail or Calendar errors, the brief records that source under `couldNotCheck`. A comment in that file says four-at-a-time sorting of 50 messages took about 50 seconds against the fake mailbox. That timing was not re-run.

`triage.ts` has two stages. `ruleVerdict` can only return `can_wait`. The rules are `bulk` (a list or bulk header, and a Gmail Promotions or Social label), `category` (those two labels alone), `auto-reply` (`Auto-Submitted: auto-replied`, not `auto-generated`), and `calendar-response` (a subject that starts with accepted, declined, or tentatively accepted). Updates and Forums are left for the model. A `noreply` sender is not a rule. Anything the rules do not settle goes to the model through `triage`. `decidedBy` is `rule:<id>` or `model:<model name>`.

`evals/triage/README.md` says the set is 62 invented messages to Maya Okafor on the morning of Thursday 22 October 2026. 27 need her and 35 can wait. No real mail is used. The committed notes in that README are `claude-sonnet-5-5` on all 62, with precision 100% and recall 100% for needs you, and 12 decided by rules. `gpt-5.6-terra` is on the earlier 60, with precision 96.2% and recall 100%. The same README says the set is small, the same person wrote the labels and the prompt, and the numbers are a regression check, not proof on a real inbox. The eval was not re-run.

The `morning-brief` skill tells the bot to call `morning_brief` and not to list the items again. The app has `morning-brief-card.tsx` and `morning-brief.tsx`. Those components were not read.

## The tenant package

Copy `openbot/examples/openduet` and point `TENANT_PACKAGE_DIR` at the copy. The path is resolved from `openbot/server`. `.env.example` sets `TENANT_PACKAGE_DIR=../examples/openduet`.

| File | What it sets |
| --- | --- |
| `brand.yaml` | `tenant.id` is `openduet` and `product_name` is OpenDuet. The comment says the bot id and the tenant id are renamed together. |
| `model.yaml` | Provider `openai`, `default_model` `gpt-5.6-terra`, credential ref `openai-api-key`. |
| `channels.yaml` | Channels `openduet` and `your-agent`, both with `allowed_groups: [all]`. |
| `knowledge.yaml` | `sources: []`. People connect their own accounts. |
| `agents.yaml` | The three bots above. The built-in bot's skills are `morning-brief`, `first-day`, `reply-to-an-email`, `research-public-web`, `bot-creator`, and `skill-creator`. |
| `skills.yaml` | Eleven skills. The extra five are `find-a-document`, `find-a-notion-page`, `whats-changed`, `who-owns-this`, and `check-a-claim`. |

The comment in `skills.yaml` says naming a tool there grants nothing. The offer is intersected with the bot's grants. `reply-to-an-email` tells the bot to call `gmail_send_reply` without asking in chat first, because the send itself pauses. `research-public-web` names `@research/search` and `@research/fetch`. The README says an administrator enables a connector from Parallel, Exa, or Firecrawl and grants those tools. `openbot/docs/web-research.md` was not opened.

## What you need to run it

From the repository root, the README's quick start needs Docker, Bun 1.3 or newer, Node so `npx` can run the CopilotKit CLI, a model key, and a CopilotKit Intelligence project. Intelligence is required. `runtimeCapabilities` in `openbot/server/src/config.ts` throws `CopilotKit Intelligence is required and is not configured` and names whichever of `INTELLIGENCE_API_URL`, `INTELLIGENCE_GATEWAY_WS_URL`, and `INTELLIGENCE_API_KEY` is missing. `docs/telemetry.md` only mentions the key. Whether `scripts/start.sh` fills the two URLs was not traced.

```sh
git clone https://github.com/CopilotKit/OpenDuet.git
cd OpenDuet
cp .env.example .env
bun install
npx --yes copilotkit@latest login
npx --yes copilotkit@latest project select
bun openbot/scripts/setup-learning.ts
bash scripts/start.sh
```

Then open `http://localhost:3010`. `scripts/start.sh` links this repo's `.env` and execs `openbot/scripts/start.sh`. `scripts/stop.sh` stops the app, the worker, the API, the Docker services, and this install's bot computers. It does not delete the database volume, the workspace files, or the browser profile.

`project select` writes `CPK_INTELLIGENCE_API_KEY` and `CPK_TELEMETRY_ID`. The server reads `INTELLIGENCE_API_KEY`. `setup-learning.ts` copies the key and sets `CPK_INTELLIGENCE_LEARNING_CONTAINER_ID=openbot`. The README says the free Developer plan is enough. That plan was not signed into.

The OpenDuet bot's model in `model.yaml` is `gpt-5.6-terra`. `runtimeModelForEnvironment` in `copilot.ts` keeps the tenant model unless `BOT_PROVIDER` is `anthropic`, or `BOT_MODEL` is set and `OPENAI_BASE_URL` is also set. The built-in OpenAI fallback constant in that file is also `gpt-5.6-terra`. The tool loop stops at `TOOL_STEPS`, which is 8. For Anthropic, set `BOT_PROVIDER=anthropic` and `ANTHROPIC_API_KEY`. The model is `BOT_MODEL` if you set one, and `claude-sonnet-4-5` if you do not. `.env.example` separately says the framework bot's `BOT_MODEL` defaults to `gpt-5.5`, and the proof-of-concept bot's `AGENT_BOT_MODEL` defaults to `gpt-5.5`. Those defaults were not traced through `start.sh`.

`PORT` and `SERVER_PORT` are both `3001` in the example. The comment says the server prefers `PORT` when both are set and refuses to start if they disagree. The app's Vite proxy reads `SERVER_PORT`. If 5432 is taken, set `POSTGRES_PORT` and change the port in `DATABASE_URL`. The example URL is `postgres://openbot:openbot@localhost:5432/openbot`. `COMPOSE_PROJECT_NAME=openduet` keeps Compose from sharing containers with a checkout whose compose file lives in a folder named `openbot`. Image tags in the example are `openduet-server:latest` and the other `openduet-*` names listed there.

The README says a hosted deploy guide and an OpenDuet image are not published. Docker and Helm docs under `openbot/docs` deploy plain OpenBot from OpenBot's image, not this template.

Root `package.json` is private, name `openduet`, version `0.1.0`. `openbot/package.json` is private, name `openbot`, version `0.2.0`, `packageManager` `bun@1.4.3`. There are no GitHub releases and no tags. `openbot/CHANGELOG.md` starts at `Unreleased`, then `0.2.0`.

## Telemetry and sign-in

`openbot/server/src/telemetry.ts` sets `TELEMETRY_APP_TITLE` to `OpenDuet` and sets `COPILOTKIT_TELEMETRY_SAMPLE_RATE` to `1` when that variable is empty. `docs/telemetry.md` calls `1` full sampling and says the SDK default is 5%. The title is fixed. A renamed fork is still counted as OpenDuet unless `OPENBOT_ACCESSIBILITY_DISABLED=true`. Events go to `https://telemetry.copilotkit.ai/ingest`. The doc names `oss.runtime.instance_created`, `oss.runtime.copilot_request_created`, and `intelligence_signup`. Intelligence sends the last one when an account is created. This repo does not. Opt out with `COPILOTKIT_TELEMETRY_DISABLED=true` or `DO_NOT_TRACK=1`, then restart. The tests replace `fetch` and do not prove the events arrive.

`.env.example` sets `OPENBOT_SINGLE_USER=true`. The comment says every visitor is an administrator while that line is set, and that with no sign-in provider the listen address is this machine only unless `OPENBOT_HOST` widens it. Delete the line and configure Google, Microsoft, or Okta before anyone else can reach it. With no provider and the line removed, the deployment refuses to start. The example `KEY_ENCRYPTION_KEY` is a public development value. The comment says production refuses to start with that key.

Composio is optional. Without `COMPOSIO_API_KEY` there is no brokered catalogue. The example says there is no screen that sets the key.

Gmail and Calendar need a Google OAuth client, then each person connects under Connections. `OPENDUET_FAKE_GOOGLE_URL` points those connectors at `openbot/scripts/fake-google/server.ts` and is ignored when `NODE_ENV=production`. The fake steps in the README were not run.

## Repo snapshot

GitHub API on 3 November 2026. Created 2026-10-21T19:43:59Z. Last push 2026-10-31T21:26:41Z. `updated_at` 2026-11-02T20:02:16Z. Default branch `main`. The newest commit in the first page is `f52288fff5`, a README badge merge. Language TypeScript. License MIT, copyright 2026 CopilotKit. 1,847 stars, 233 forks, 11 open issues, 8 watchers. Topics empty. The API `size` field is 164,245 KB. Homepage field `copilotkit.ai/openduet`. `https://www.copilotkit.ai/openduet` returned 200. `https://copilotkit.ai/openduet` returned 308.

CopilotKit/openbot, read the same day and not diffed, had 9,885 stars, 1,211 forks, MIT, and a push at 2026-11-02T19:06:20Z.

## Not checked

Not cloned, not installed, and not started. No Intelligence login, no model call, and no eval re-run. The password box, the approval policy defaults, pgvector, and the OpenTag path were not read past the README and `.env.example`. The README diagram names PostgreSQL and pgvector for policy, approvals, audit, and encrypted credentials. The schema was not opened to confirm the extension. The vendored `openbot/` tree was not compared with CopilotKit/openbot. The Tauri app under `openbot/desktop` and the Expo app under `openbot/mobile` were not built. `evals/reply-chips` and `evals/voice` were not scored again.

> **See also:** [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms)
