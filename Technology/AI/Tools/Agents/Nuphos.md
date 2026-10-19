---
area: technology
domain: agents
type: tool
title: Nuphos
description: Nuphos (nuphos/nuphos, Apache-2.0, by Zeabur Inc.) is a team workspace for coding agents - Claude Code, Codex, Grok Build, Antigravity and OpenCode run over ACP on local, remote or cloud runtimes, with shared multi-user sessions, team skills, memory and credentials, DevOps GUIs (Kubernetes, Grafana, cloud consoles), Slack/Discord, triggers, and Electron/iOS/CLI clients. Early access; the Desktop app ships PostHog analytics with session replay on by default.
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - agents
  - coding-agents
  - devops
  - acp
  - self-hosted
resource: https://github.com/nuphos/nuphos
---

# Nuphos

[Nuphos](https://nuphos.ai) ([nuphos/nuphos](https://github.com/nuphos/nuphos)) calls itself "the agent workspace for your team". It is not an agent or a model. It is the platform **around** the terminal coding agents you already use: Claude Code, Codex, Grok Build, Google Antigravity and OpenCode.

- Each agent runs in a runtime (your laptop, a machine you own, or Nuphos Cloud) and is reached over the [Agent Client Protocol](https://agentclientprotocol.com) (ACP).
- Nuphos adds shared multi-user sessions, team-wide skills, memory and credentials, approvals, and a desktop with real DevOps GUIs beside the chat.
- Its [docs](https://docs.nuphos.ai/introduction) frame it as "the shared DevOps platform for the AI agents your team already uses".

Checked 2026-10-19:

- **Who:** copyright and trademark belong to **Zeabur Inc.** (the PaaS company). Human committers include Yuanlin Lin (yuaanlin, Zeabur), seraph27, Tomy Hsieh and others. 384 of about 430 commits come from `nuphos[bot]`, the GitHub App that commits merged PRs.
- **Repo:**
  - Public repo created 2026-10-01, last push today. 144 stars, 12 forks, 40 open issues.
  - The product is older than the repo: the changelog mentions Desktop v0.46 in early September. The open-source release was announced on [2026-10-11](https://nuphos.ai/changelog/open-source-new-agents-sharing).
- **License:**
  - Code is Apache-2.0 (GitHub shows "Other" because of the extra NOTICE and TRADEMARK files).
  - The "Nuphos" name and logo are trademarks: a redistributed modified build must be renamed (see `TRADEMARK.md`).
  - `apps/runtime/openab` is vendored from [openabdev/openab](https://github.com/openabdev/openab) under MIT.
- **Releases:** 54 GitHub releases with separate tags per component: Desktop `vX.Y.Z` (latest v0.83.0, 2026-10-18), `backend-v` (0.96.1), `runtime-v` (0.1.25), `cli-v` (0.5.1) and `ios-v` (0.12.0). Several ship every day.
- **Status:** the docs say "early access — features and these docs are evolving quickly". No pricing page was found (`nuphos.ai/pricing` returns 404).

## Monorepo layout

| Path           | What it is                                                                               |
| -------------- | ---------------------------------------------------------------------------------------- |
| `apps/backend` | Bun + Hono API: accounts, teams, sessions, runtime registry, integrations (MongoDB, S3)  |
| `apps/desktop` | Electron + Vite + React workspace (Monaco, xterm/node-pty, Kubernetes client, noVNC)     |
| `apps/runtime` | Container images (`ghcr.io/nuphos/runtime`) and ACP adapters: OpenAB gateway + agent CLI |
| `apps/cli`     | Rust (ratatui) terminal client `nuphos`, styled after the Codex CLI                      |
| `apps/ios`     | SwiftUI client for picking a session back up away from the desk                          |
| `apps/android` | Jetpack Compose client (Nuphos Cloud sign-in only for now)                               |
| `deploy/`      | Docker Compose, Helm, Railway and Zeabur templates for self-hosting                      |

How a turn runs: the backend does not run the agent. It opens an ACP session to a runtime. The runtime container holds the OpenAB gateway, which supervises the agent and keeps sessions alive. Claude Code goes through `@agentclientprotocol/claude-agent-acp` and Codex through `codex-acp`. Grok Build, Antigravity and OpenCode speak ACP natively behind a small shim, and the proprietary CLIs install on first boot.

## Key features (README and changelog)

- **Bring your own agent and subscription.** The runtime signs in with your Claude or ChatGPT (or other) account, with "no extra model charge on top".
- **The session outlives your machine.** Runtimes can be local, remote or cloud. You can move a running conversation between them, and continue from the iOS app.
- **Multiplayer sessions.** Invite teammates into a running session to talk to the same agent and see the same tool calls. Sessions have their own access levels (view, reply, manage).
- **Team skills, tools and memory.** Grant a skill or integration once and every agent on the team gets it. Memory is shared across people, agents and sessions without adding an MCP server.
- **DevOps GUIs in the desktop:**
  - Kubernetes and Grafana (dashboards, alerts, logs, traces).
  - GitHub and Linear (pull requests and issues).
  - Cloud accounts: AWS including ECS, GCP, Cloudflare, Linode and others.
  - MongoDB and SQL connections, plus an in-app browser and split panes (⌘D / ⌘⇧D).
- **Credential model.** AWS access uses a cross-account assume-role and GCP uses service-account impersonation. The docs describe short-lived, least-privilege credentials, human approvals and an audit trail.
- **Slack and Discord**, plus **triggers** (cron or webhook starts a turn). A linked GitHub pull request wakes the session on reviews, CI results and merges.

## Quick start

- **Hosted:** download the Desktop app (macOS, Windows and Linux builds; macOS is signed and notarized, Windows and Linux are unsigned) or the iOS app, sign in, then add a local agent or a Cloud agent.
- **CLI:**

  ```sh
  curl -fsSL https://nuphos.ai/install | sh        # installs nuphos into ~/.local/bin
  nuphos team "Acme" --create
  nuphos agents claude-code --create                # Nuphos-managed Cloud agent; also codex, grok, antigravity, opencode
  nuphos                                            # full-screen TUI
  nuphos exec "list the EKS clusters"               # one-shot, scriptable (--json)
  nuphos agent                                      # make this computer a local agent (needs Node 22+)
  ```

- **Self-host:** `deploy/compose` brings up MongoDB, S3-compatible storage (RustFS), the backend and one runtime with `docker compose up`. There are also Helm, Railway and Zeabur templates. Point Desktop or iOS at your backend with "Self-hosted? Set API endpoint".
  - One team per deployment.
  - Google sign-in only works against Nuphos Cloud; email sign-in works anywhere.
  - Not available self-hosted: managed runtime provisioning and managed backups.
  - Zeabur's runtime template says to deploy the runtime in a separate project from the backend data, because the agent executes code there.
- **Dev:** `bun run dev` from the repo root starts the local stack, backend, runtime and Electron app. This needs Bun, Node 22, pnpm 10, Docker and openssl.

## Safety review (source skim, nothing run)

- **CLI installer** (`apps/cli/install.sh`, served via the `nuphos.ai/install` redirect):
  - It is a `curl | sh` installer. It looks up the newest `cli-v*` tag through the GitHub API, downloads the release tarball and its `.sha256` from GitHub Releases, verifies the checksum and installs into `~/.local/bin`.
  - No `sudo`, and nothing outside the install directory.
  - The checksum comes from the same release, so it protects against a corrupted download, not a compromised release.
- **CLI behavior:**
  - The CLI checks GitHub for updates at start (`NUPHOS_NO_UPDATE_CHECK=1` turns this off).
  - The first `nuphos agent` run downloads the runtime (OpenAB and the ACP adapters) into `~/.local/share/nuphos/runtime`.
  - A grep of `apps/cli/src` found no analytics.
- **Local agent = remote command execution as you.** Once a conversation moves onto your computer, anyone in that team can continue it, and "their messages run commands here, as you" (CLI README).
  - `nuphos exec` defaults to **Full Access** (no approval prompts) unless you switched to Auto Mode.
  - A server agent keeps a device credential in `~/.local/share/nuphos/agent/device-credential.json`. The README recommends a dedicated non-root account.
- **Desktop telemetry:**
  - Production builds embed a default PostHog project key (`us.i.posthog.com`) and start analytics at launch, with `autocapture: true` and **session replay enabled**.
  - Replay masks all inputs, plus `pre`, `code`, `.secret`, `.token` and `.sensitive` elements.
  - The main process sends app-lifecycle, update, deep-link, crash and privileged-operation events.
  - I found no opt-out setting, and unlike the iOS app it is not gated on using Nuphos Cloud. Treat this as a finding from the source at `7756897e`, not confirmed at runtime.
- **iOS telemetry:** PostHog for product events only (no screen capture or replay), turned off in debug builds and when pointed at a self-hosted backend.
- **Backend:** PostHog only when `POSTHOG_API_KEY` is set. OpenTelemetry export is optional.
- **Auto-update:** Desktop uses `electron-updater` from Nuphos's S3 publish location.
- **Built-in skills** under `apps/backend/src/lib/agent/builtin-skills/` contain install scripts for aws, gcloud, kubectl, helm, eksctl, gh, Loki/Alloy and Tailscale SSH. Agents run these inside runtimes.

## Pros and cons (my assessment)

Pros:

- Turns single-player coding agents into a shared, persistent team surface, and keeps using the subscriptions you already pay for.
- Open source (Apache-2.0) and fully self-hostable, with Compose, Helm and Zeabur/Railway templates. There are clients for desktop, iOS, Android and the terminal.
- Strong DevOps focus: cloud and Kubernetes GUIs and scoped cloud credentials beside the agent.

Cons:

- Very young as open source (public since 2026-10-01) and in early access, with releases several times a day.
- Desktop telemetry with session replay is on by default. A self-hosted deployment still uses the same Desktop build unless you rebuild it with your own `VITE_POSTHOG_KEY` / `POSTHOG_KEY`.
- Big trust surface: shared sessions can run commands on local agents and act on connected cloud accounts.
  - Self-hosting is one team per deployment, and some features (Google sign-in, managed runtimes and backups) are Cloud-only.
  - Using a personal Claude or ChatGPT subscription for team-shared agents may run into the provider's terms (not checked).

## Related

- [Zeron](/Technology/AI/Tools/Agents/Zeron): a local-first native control plane for driving many coding agents, single-user with optional sync. Nuphos is the team and cloud take on the same idea.
- [Eve](/Technology/AI/Tools/Agents/Eve): a framework for building your own durable agents, whereas Nuphos hosts existing coding agents.
- [Coding Agents](/Technology/AI/Tools/Agents/Coding Agents) covers the agents themselves (Claude Code, Codex and others), and [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) covers sandboxes and runtimes.
