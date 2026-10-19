---
area: technology
domain: agents
type: tool
title: Eve
description: eve (vercel/eve, npm eve 0.80.1, Apache-2.0, public beta) is Vercel's filesystem-first TypeScript framework for durable backend AI agents - an agent is an agent/ directory of instructions, tools, skills, connections, channels, schedules and subagents; sessions run as Workflow SDK durable workflows with a per-session sandbox, evals, useEveAgent frontend hooks, and Agent Runs tracing on Vercel or self-hosted on Node.
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - agents
  - agent-frameworks
  - durable-agents
  - vercel
  - typescript
resource: https://github.com/vercel/eve
---

# Eve

[eve](https://eve.dev/) ([vercel/eve](https://github.com/vercel/eve)) is Vercel's open-source framework for building durable backend AI agents in TypeScript. The npm package describes it as a "filesystem-first framework for durable backend AI agents that run anywhere". The GitHub description is "The Open Framework for Building Agents". You write an agent as files in conventional folders (prompt, tools, skills, channels, schedules, subagents), and eve runs the agent loop as a durable workflow that survives restarts and redeploys.

Checked 2026-10-19 from the repo, the bundled docs (`docs/` in the repo, which the README says ship in `node_modules/eve/docs`), npm, and the Vercel changelog:

- **Status:** public beta under the [Vercel beta terms](https://vercel.com/docs/release-phases/public-beta-agreement). The README says the framework, APIs, docs and behavior may change before general availability.
- **Version:** npm `eve` latest is `0.80.1` (2026-10-16), with about 245 releases since `0.6.0-beta.1` on 2026-06-09. It releases almost daily via changesets (0.79.0 to 0.80.1 in four days). The npm name `eve` existed before; versions up to 0.5.4 (2011–2017) belong to an unrelated older package.
- **npm downloads:** about 827k in the week 2026-10-10 to 2026-10-16 (npm API; raw count, includes CI installs).
- **GitHub:** 5.6k stars, 620 forks, 778 open issues. Created 2026-06-16, last push 2026-10-19. 67 contributors listed by the API. TypeScript pnpm/turbo monorepo.
- **License:** Apache-2.0 (with NOTICE and a DCO for contributions).
- **Requirements:** Node.js 24 or newer.
- **Packages:**
  - Published: `eve` and `@vercel/agent-runs` (0.0.1, "framework-neutral agent run tracing with OpenTelemetry and durable checkpoints").
  - Private source packages that ship as `eve/...` extensions: `eve-code`, `eve-git`, `eve-computer-use`, `eve-self-modification`, `eve-catalog`.

## Core concepts

### An agent is a directory

```text
my-agent/
├── package.json
├── agent/
│   ├── agent.ts            # optional: model, reasoning, runtime config (defineAgent)
│   ├── instructions.md     # required on the root agent: always-on system prompt
│   ├── tools/              # typed functions (defineTool + zod), e.g. tools/get_weather.ts -> tool get_weather
│   ├── skills/             # on-demand procedures (Markdown or defineSkill)
│   ├── connections/        # external MCP and OpenAPI services
│   ├── channels/           # entry points: HTTP (eve), Slack, Discord, Teams, Telegram, GitHub, Linear, Twilio, MCP, custom
│   ├── schedules/          # cron jobs (defineSchedule or Markdown with cron frontmatter)
│   ├── subagents/          # specialist child agents with their own prompt, tools, sandbox
│   ├── hooks/              # lifecycle and stream-event subscribers
│   ├── memory/             # cross-session memory providers
│   ├── sandbox/            # sandbox.ts + workspace/** seeded into /workspace
│   ├── extensions/         # mounted reusable capability packages
│   ├── instrumentation/    # telemetry destinations (OTel, Agent Runs)
│   └── lib/                # shared helper code (import-only)
└── evals/                  # *.eval.ts beside agent/, not inside it
```

- Names come from paths: `agent/subagents/researcher/agent.ts` becomes subagent `researcher`.
- Framework defaults use the same slots, so a file at the same path replaces the default. Built-in `bash`, `read_file` and `write_file` tools occupy `tools/` slots; `defaultTools: false` turns the optional ones off.
- Several separately addressable agents use an **agent workspace**: `agents/<name>/agent/`, sharing one package and one deployment (`eve init ops --agents support,research`, then `eve dev --agent support`).

### Sessions, turns, steps (durability)

- **Session:** the whole durable conversation; it can run for days and survives restarts and redeploys. **Turn:** one user message and all the work it triggers. **Step:** a durable checkpoint inside a turn, by default one model call plus the inline tool calls after it.
- Every session is one workflow on the open-source [Workflow SDK](https://workflow-sdk.dev/) ([vercel/workflow](https://github.com/vercel/workflow), Apache-2.0). It uses Vercel Workflow on Vercel and a local "world" persisted under `.eve/.workflow-data` elsewhere. Custom worlds (for example Postgres) are possible; the docs pin the `@workflow/*` `5.0.0-beta` line.
- On Vercel, an idle session is handed off to the newest deployment. On other worlds, a session built by a different eve version is **stranded**: the history is readable, but the session must be reset. The docs advise pinning the exact eve version when self-hosting.
- **Human-in-the-loop:** tool `approval` policies (`auto()`, `always()`, `once()`, `never()` or custom), and the agent can ask the user a question. Both park the turn durably (`turn.waiting`) for seconds or days.

### Sandbox and security model

- Each agent has one sandbox rooted at `/workspace`. Tools reach it with `ctx.getSandbox()` (`run`, `spawn`, file I/O).
- Providers: Vercel Sandbox (default on Vercel, microVMs), Docker, microsandbox, just-bash, or a custom `defineSandboxProvider()`. Without a sandbox file, eve picks what is available.
- Trust boundary: tools, model calls, connections and secrets (`process.env`) stay in the app runtime. The sandbox has no secrets and network access set by policy. Built-in file and bash tools proxy into the sandbox.
- Route auth fails closed: without `agent/channels/eve.ts`, production browser traffic gets `401` from the default `[vercelOidc(), localDev(), placeholderAuth()]` policy. `none()` exists for public demos only.

### Other runtime features

- **Models:** a string model ID goes through the Vercel AI Gateway (Vercel OIDC or `AI_GATEWAY_API_KEY`), or you pass an AI SDK provider model directly. `auto()` from `eve/models` can pick a model per turn from an allowlist; this uses the experimental AI SDK decision API.
- **Evals:** `evals/*.eval.ts` with `defineEval`. They drive the real HTTP surface, can stub tools and use an LLM judge, report to Braintrust, and run with `eve eval` against a local or remote target.
- **Frontend clients:** `useEveAgent()` in `eve/react`, with Vue and Svelte versions. Framework integrations exist for Next.js (`withEve` in `eve/next`), Nuxt, SvelteKit and TanStack Start. There is a client SDK in `eve/client`, and `eve add channel/web` generates a Web Chat app (Next.js or TanStack Start) with Sign in with Vercel.
- **Protocols:** `eve acp` serves an agent to Agent Client Protocol editors over stdio. There is a guide for serving a UCP (Universal Commerce Protocol) profile from a custom channel. Remote agents can be used as subagents.

## Quick start

```bash
npx eve@latest init my-agent            # scaffold, install deps, git init, open the TUI
npx eve@latest init my-agent --model openai/gpt-5.6-terra
npx eve@latest init .                   # add agent/ to an existing package
npm run dev                             # = eve dev: local dev server + terminal UI
npx eve link && npx eve add channel/web # link a Vercel project, add Web Chat
npx eve deploy                          # deploy to Vercel
eve build && PORT=3000 eve start --host 0.0.0.0   # self-host: Nitro Node server in .output/
```

Other CLI commands: `eve info`, `eve set model`, `eve eval`, `eve logs` / `eve traces` (local), `eve remote connect|invoke|info --url`, `eve add` / `eve registry`, `eve extension init`, and `eve telemetry`. Health check: `GET /eve/v1/health`.

Minimal tool, from the README:

```ts
// agent/tools/get_weather.ts
import { defineTool } from "eve/tools"
import { z } from "zod"

export default defineTool({
  description: "Return mock weather data for a city.",
  inputSchema: z.object({ city: z.string().min(1) }),
  async execute({ city }) {
    return { city, condition: "Sunny", temperatureF: 72 }
  }
})
```

The scaffold's default model is `openai/gpt-6-luna-fast` with high reasoning.

## Deployment

| Target       | Build output            | Workflows                         | Sandbox                         |
| ------------ | ----------------------- | --------------------------------- | ------------------------------- |
| Vercel       | `.vercel/output`        | Vercel Workflow                   | Vercel Sandbox                  |
| Self-hosting | `.output/` Nitro server | Local (persist `.eve/`) or custom | Docker, microsandbox, or custom |

- On Vercel, `eve link` creates or links the project and pulls env vars, and `eve deploy` ships it. Schedules use Vercel Cron.
- Agents can sit beside a frontend via `eve/next`, or as peer services via `withEve` from `eve/vercel` in a root `vercel.ts`.
- Self-hosting: forward `/eve/` and `/.well-known/workflow/` through the proxy. Don't rely on `vercelOidc()` alone for auth; use Basic, JWT, generic OIDC or a custom verifier.
- Production checklist from the docs: run `eve build`, set the model credential, replace `placeholderAuth()`, choose the workflow world and sandbox, then verify the health route plus one real turn (for example with `eve remote connect --url ...`).

## Observability

- **Agent Runs (Vercel, beta):** preview and production deployments export eve sessions by default. They appear in the project's Observability tab with traces of turns, messages, reasoning, tool calls and token usage.
  - Available on Hobby, Pro and Enterprise. The tab needs to be enabled for the team.
  - Billed at Always-on Tracing rates during beta, with 30-day retention.
  - `eve deploy` sets 100% trace sampling on new projects; existing projects need a sampling rule.
  - `agent/instrumentation/agent-runs.ts` can filter or redact spans (`exportPolicy`), or turn export off (`disableInstrumentation()`).
- **Vercel MCP and CLI** ([changelog, 2026-07-03](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)):
  - MCP tools: `list_agent_run_projects`, `list_agent_runs`, `get_agent_run`, `get_agent_run_trace`.
  - CLI: `vercel agent-runs projects|list|inspect|trace`, all supporting `--json`.
  - The point is that a coding agent can debug its own runs.
- **Elsewhere:** OpenTelemetry destinations. Peer dependencies include `@opentelemetry/api`, `dd-trace` and `braintrust`. Locally there are `eve traces` and `eve logs`.
- **CLI telemetry is on by default** and is sent to Vercel: version, OS, command and outcome, plus random install and project IDs. Per the docs, prompts, arguments, files and environment variables are not sent. Turn it off with `eve telemetry disable` or `EVE_TELEMETRY_DISABLED=1`.

## Pros and cons (my assessment)

Pros:

- The file layout makes an agent easy to read and diff, both for people and for coding agents. The full docs ship inside the package.
- Durability (days-long sessions, durable human-in-the-loop pauses, survives redeploys), a sandbox, evals, auth that fails closed and tracing are built in rather than added later.
- The core is portable: a self-hosted Node server, pluggable workflow worlds and sandbox providers, and models through any AI SDK provider. It is Apache-2.0.

Cons:

- Beta. 0.x versions ship almost daily and the docs warn about breaking changes. Upgrades can strand in-flight sessions outside Vercel.
- Best experience is on Vercel: AI Gateway, Vercel Workflow handoff, Vercel Sandbox, Agent Runs (paid tracing, team enablement). Self-hosting means running the world storage, sandbox and auth yourself.
- TypeScript and Node 24 only. CLI telemetry is opt-out.

## Compared with alternatives (brief)

Repo facts below are from the GitHub API on 2026-10-19; one-line positioning is from each project's description. None of these were tested here.

| Project                                                                                                                                        | Positioning (own description)                                               | Notes vs eve                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vercel AI SDK](https://github.com/vercel/ai) (27k stars)                                                                                      | "The AI Toolkit for TypeScript"                                             | A library, not a runtime. eve uses AI SDK models (`ai` is a peer dependency) and adds files, durable sessions, channels, sandbox and deploy on top. |
| [Mastra](https://github.com/mastra-ai/mastra) (29k stars; GitHub reports license NOASSERTION)                                                  | "TypeScript framework for AI-powered applications and agents"               | Also a TypeScript agent framework; configured in code rather than eve's folder convention. Licensing not checked in detail.                         |
| [LangGraph](https://github.com/langchain-ai/langgraph) (Python, 43k) / [LangGraph.js](https://github.com/langchain-ai/langgraphjs) (3.4k), MIT | "Build resilient agents" / "agents as graphs"                               | Explicit graph or state-machine model; eve is a fixed agent loop shaped by files.                                                                   |
| OpenAI Agents SDK ([Python](https://github.com/openai/openai-agents-python) 30k, [JS](https://github.com/openai/openai-agents-js) 3.9k), MIT   | "Lightweight framework for multi-agent workflows"                           | Lightweight SDK; durability, hosting and channels are left to you.                                                                                  |
| [Cloudflare Agents](https://github.com/cloudflare/agents) (5.8k, MIT)                                                                          | "Build and deploy AI Agents on Cloudflare"                                  | Same platform-native idea, for Cloudflare's runtime instead of Vercel's.                                                                            |
| [Inngest AgentKit](https://github.com/inngest/agent-kit) (949, Apache-2.0; last push 2026-04-29)                                               | "Multi-agent networks in TypeScript with deterministic routing ... via MCP" | Multi-agent routing that pairs with Inngest's durable functions; less active recently.                                                              |

Similar idea in this repo: [Pi Durable](/Technology/AI/Tools/Agents/Pi Durable) (an experimental durable agent harness from Earendil). For building the sandbox layer yourself, see [Building Your Own Sandboxes](/Technology/Security/Write Ups/Building Your Own Sandboxes). For hosted sandbox and agent platforms, see [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms).

## Links

- Docs: https://eve.dev/docs (bundled in `node_modules/eve/docs`). Tutorial: https://eve.dev/docs/tutorial/first-agent
- Repo: https://github.com/vercel/eve. Community: GitHub Discussions. Security reports: responsible.disclosure@vercel.com
- Agent Runs in Vercel MCP and CLI: https://vercel.com/changelog/agent-runs-vercel-mcp-cli
