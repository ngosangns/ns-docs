---
area: technology
domain: agents
type: tool
title: Pi Durable
description: Experimental durable agent harness from Earendil (shipped with Pi 1.0) for long-running, crash-survivable, multi-conversation agent apps over memory/JSONL/SQLite storage, with pluggable extensions, tools, hooks, tasks, compaction, and documents.
timestamp: "2026-10-02T00:00:00.000Z"
tags:
  - technology
  - agents
  - pi
  - durable-agents
  - earendil
  - typescript
resource: https://earendil.com/posts/pi-durable/
---

# Pi Durable

[Pi Durable](https://earendil.com/posts/pi-durable/) (`@earendil-works/pi-durable`) is an **experimental** TypeScript harness Earendil shipped with [Pi 1.0](https://pi.dev/) for building long-running, malleable agentic applications that survive process death and run anywhere a JavaScript runtime exists. It does **not** replace the [Pi coding agent](https://github.com/earendil-works/pi); it is a separate framework for any agentic app (coding agents included), sharing code like `pi-ai` and the same minimalism/malleability principles. The API may still change.

A harness here means storage plus the machinery to run one or more LLM conversations in parallel, provide tools, and host execution environments. Everything the harness runs (model call, tool call, compaction) is a **task**. Core source without tests is about 15k lines (~150k–250k tokens depending on the model), so an agent can usually read enough to extend it.

## Why it exists

The Pi coding agent is built for one person in a terminal on a (remote) machine: if the process dies, you look and tell it to continue. Earendil wants agents that:

- run for a long time, reachable from many surfaces
- support infinitely long conversations
- survive catastrophic internal/external failures
- let multiple humans steer the same agents

Pi Durable explores those designs without disrupting the coding-agent product; proven ideas can flow back into Pi later.

## Storage and runtimes

Open a harness over a storage backend. Built-ins: **memory**, **JSONL**, **SQLite**, plus a conformance suite and benchmarks for custom backends.

| Backend | Notes |
| ------- | ----- |
| Memory | In-process; good for tests |
| JSONL | Portable core; Node opener via `@earendil-works/pi-durable/storage/jsonl/node`; one owner must serialize writes to a directory |
| SQLite | Portable core + Node opener; working set (active transcripts, live tasks, pending submissions) stays in memory, rest on disk |

SQLite/JSONL cores avoid Node APIs, so a small adapter can run on **Bun** or inside a **Cloudflare Durable Object**. The storage interface is small enough to implement on a key-value store or Postgres. One process owns a storage at a time; other clients attach to that process. Remote async APIs like Cloudflare D1 cannot implement the sync SQLite facade and need a dedicated `Storage` backend.

## Crash recovery

Every step of a run is a task that **checkpoints before it moves on**. After a crash, a new process opens the same storage, finds unfinished tasks, and continues from the last checkpoint:

- A cut-off model request is sent again; the partial answer stays in the transcript marked aborted.
- A cut-off tool call **reruns only if** the tool declares `replay: "safe"`; otherwise the model is told it was interrupted (with output so far).
- Queued messages stay queued.
- A `requestId` makes a submission **exactly-once** so client retries after a crash do not double-submit.

Call `harness.resume()` after reopen to continue interrupted work.

## Conversations and forks

One harness runs many conversations **concurrently**. A conversation starts fresh or **forks** another at any transcript point and sees parent history up to that point without copying it (Slack channel + thread is the canonical example).

Each conversation stores its own agent config: model, thinking level, selected extensions/tools, extra instructions, and working directory in the execution environment. A reviewer next to the main agent can use a cheaper model, read-only tools, and its own checkout.

## Extensions, tools, hooks, tasks

An **extension** is a named bundle of system-prompt sections, tools, hooks, and tasks, installed in a registry. Conversations store **names only**, never code, so a restart picks up whatever the new process installs. Hot-replace an extension under the same name while conversations run; in-flight tool calls finish on the old code, the next call uses the new code.

- **Sections** — rebuilt before every request from selected extensions; changes are recorded in the transcript so restarts/forks see what the model saw. On models that support mid-conversation system/tool changes, only the delta is sent to keep the prompt cache warm.
- **Tools** — each call is a durable task; intent stored before run. `replay: "safe"` (e.g. search) may rerun after crash; omit replay for side effects like deploy. Tools get a harness API (commit entries/documents, start tasks/conversations, talk to other conversations). Same-name tools in a later extension replace earlier ones; `wrapTool` decorates the winner.
- **Hooks** — intercept built-in tasks (model response, tool invoke, compaction): rewrite requests, block/rewrite tool calls, replace results, keep a run going, or write summaries. After a crash, store decisions in a **memo** (first write wins) so hooks do not re-ask. Chains follow extension selection order.
- **Tasks** — extensions can define custom phase machines with checkpoints, wait policies (`failFast`, etc.), and abort/cleanup. Tasks and conversations form an **ownership tree**: aborting a task aborts what it owns bottom-up. Foreground tasks are part of current work (Esc aborts them); **background** tasks belong to the conversation but not the current turn (Esc leaves them alone).

Subagents are not built-in; a few lines create an owned child conversation, wait for its answer, and survive crashes the same way (see the triage-tool example in the announcement).

## Compaction and handoff

Compaction is a task that can run **in the background** while the conversation continues. When context nears the model limit, older messages are summarized and the summary is placed at the next turn boundary; the conversation only waits if the next request would not fit. Older messages always stay in storage. Manual `compact(instructions)` is available anytime. `reset()` / tool `control: { handoff }` start a new context from a note without deleting history, so a search tool can still read everything before the handoff.

## Documents (app state)

Typed JSON **documents** live next to the transcript and change in the same atomic commits, so app state (todos, plans, tickets, sandbox metadata) never disagrees with the transcript. Each document declares fork behavior (`asOf` parent at fork point, current value, or fresh). UIs can `subscribe` to committed document state.

## Execution environment and multiplayer

Tools that need files or a shell get them from an **execution environment**. Node ships as `NodeExecutionEnv`; the interface is small so tools can run on a remote machine while the harness runs elsewhere. `env({ cwd })` can give each conversation a different place.

Everything a UI needs is committed state: any number of clients can attach, get a current view (transcript, streaming answer, running tools, queue, agent, usage), then receive diffs. Late joiners start from the current view. Clients can steer a busy conversation (`whenBusy: "steer"`) or queue follow-ups. Remote clients can `watch()` commit ops or `watchEvents()` for coding-agent-style events.

## Install and demos

```bash
npm install @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

From a Pi checkout (after `npm install && npm run build`):

```bash
node packages/coding-agent/src/experimental/durable/main.ts
node packages/coding-agent/src/experimental/vacation/main.ts
```

The vacation planner (~1.3k lines, mostly TUI) demos parallel durable search subagents, crash mid-run, safe replay, steering, compaction, and a report that becomes a plan. Earendil has also pointed at upcoming Slack / GitHub triage bots built on the same harness.

## Ecosystem context

| Piece | Role |
| ----- | ---- |
| [earendil-works/pi](https://github.com/earendil-works/pi) / [pi.dev](https://pi.dev/) | Pi coding agent + toolkit (pi-ai, pi-agent-core, pi-tui, pi-coding-agent) |
| `@earendil-works/pi-durable` | This harness (npm; also `packages/durable` in the mono) |
| `@earendil-works/chord` | Application-composition runtime used with the harness context |
| [pi-autoresearch](/Technology/AI/Tools/Agents/Agent%20Infrastructure%20And%20Platforms.md), [pi-multix](/Technology/AI/Tools/Agents/AI%20Coding%20Productivity%20Tools.md) | Third-party skills/extensions for the Pi coding agent (not Pi Durable itself) |

> **See also:** [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent%20Infrastructure%20And%20Platforms.md) · [AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI%20Coding%20Productivity%20Tools.md) · [Agents Overview](/Technology/AI/Tools/Agents/Agents%20Overview.md)
