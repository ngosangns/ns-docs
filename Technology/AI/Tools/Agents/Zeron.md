---
area: technology
domain: agents
type: tool
title: Zeron
description: Native local-first control plane (Rust, gpui) for driving coding agents such as Claude Code, Codex, Cursor, Devin, Grok, Hermes, Pi, and Antigravity, with optional multi-device sync over Loro and Cloudflare Durable Objects.
timestamp: "2026-10-03T00:00:00.000Z"
tags:
  - technology
  - agents
  - coding-agents
  - rust
  - gpui
  - local-first
resource: https://github.com/zeronsh/zeron
---

# Zeron

[Zeron](https://github.com/zeronsh/zeron) ([zeron.sh](https://zeron.sh/)) is a native control plane for coding agents. Each device runs a small engine that stores sessions on that device. A fresh install is **local-only**: no account and no network. Optional sign-in turns on a synced workspace so you can start an agent on one device and follow or drive it from another, including an always-on machine after the laptop closes. MIT.

The README names these harnesses: Claude Code, Codex, Cursor, Devin, Grok, Hermes, [Pi](https://github.com/earendil-works/pi), and Antigravity. The engine talks to them as external processes; the UI is a viewport, not the agent.

## Install

| Platform | How |
| -------- | --- |
| Linux | `curl -fsSL https://zeron.sh/install.sh \| sh`, then `zeron status`. Installer starts the daemon and a per-user desktop entry. Needs ALSA (`libasound.so.2`) even headless, plus the Linux browser runtime for the sidebar browser. |
| macOS | Desktop release, or build from source and `zeron daemon install` (launchd). |
| Windows | `zeron-<version>-windows-x86_64-setup.exe` from the latest release (per-user, no admin). Portable ZIP exists; keep `zeron-update.json` next to `zeron.exe`. |

Day-to-day: `zeron status`, `zeron update`, `zeron daemon start\|stop\|restart\|status`. Desktop checks for updates on launch, hourly, and after sleep; `ZERON_AUTO_UPDATE=0` notifies without downloading.

## Local vs synced

Auth and the data profile are separate. `zeron login` / `zeron logout` only change `session.json` while the daemon is **stopped**; the next start picks the profile.

- Local profile: `{data_dir}/profiles/local/`. Signing in does **not** upload or import existing local sessions. Logout and restart brings them back.
- Synced profile: `{data_dir}/orgs/{org_id}/{user_id}/`, online transports on when a bearer exists.
- The open store does not switch if auth changes mid-run. Scope changes only after restart.

Devices on the same synced account are trusted peers. A remote device can list, read, and write the owning device's workspace files. `Show ignored files` also exposes gitignored files such as `.env`. `.git` is always excluded. There is no filename denylist. Only sign in machines you trust with the whole workspace.

## Architecture

[ARCHITECTURE.md](https://github.com/zeronsh/zeron/blob/main/ARCHITECTURE.md) describes a ground-up Rust rewrite (no backwards compatibility with the older stack). One binary:

- Headed `zeron` renders a **gpui** UI (Zed's `gpui`, not Zed's GPL UI/markdown/theme crates) and either attaches to a local daemon or runs the engine in-process while still serving the IPC port.
- `zeron headless` is the engine alone, so a VPS can host runs that a laptop UI drives.

Sync, when enabled, uses **Loro** CRDT docs through Cloudflare **Durable Objects** (the edge stays TypeScript: Worker, ChatRoom, DeviceRoom, R2, WorkOS). The same docs persist locally when sync is off. Postgres, the old Hono server, and WebRTC signaling are gone. Two doc kinds: a per-chat session doc (transcript plus a durable command queue) and a per-profile workspace registry (spaces, chats, devices). Send, steer, interrupt, and input responses are command entries executed by the chat's host device, so an offline send still queues.

Spaces are (device, folder) pairs. Sidebar tabs are a device-local viewport; closing a tab does not archive the session.

Deliberately out of the CRDT: token-usage display. Rate-limit meters on agent accounts stay, probed from the CLIs rather than synced. A supported self-hosted backend is deferred; endpoint overrides are a dev seam, not a compatibility promise. ARCHITECTURE's milestone notes still call out gaps (composer attachments, some polish); treat `docs/PARITY.md` as the live gap list rather than the milestone checkboxes.

> **See also:** [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent%20Infrastructure%20And%20Platforms.md) · [Pi Durable](/Technology/AI/Tools/Agents/Pi%20Durable.md) · [Coding Agents](/Technology/AI/Tools/Agents/Coding%20Agents.md)
