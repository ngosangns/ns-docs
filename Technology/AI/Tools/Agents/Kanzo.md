---
area: technology
domain: agent-infrastructure
type: tool
title: Kanzo
description: Kanzo (emanuele-em/kanzo, AGPL-3.0, v0.3.0) is a self-hosted kanban board and MCP server in one Rust binary, so a person and coding agents share the same local tasks.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - mcp
  - kanban
  - rust
resource: https://github.com/emanuele-em/kanzo
---

# Kanzo

[Kanzo](https://github.com/emanuele-em/kanzo) is a browser kanban board and an MCP server in one program. You and your coding agents work the same cards, on one computer or on one board shared across a network you trust. There is no account. Checked 2026-11-02 against the README, `Cargo.toml`, `src/mcp.rs`, the GitHub API, and the release list. Not installed, not measured, no board created.

## Run

`kanzo` opens the board at `http://localhost:4242`. The first run creates `~/kanzo`. The board is `kanzo.db` (SQLite, bundled `rusqlite`) and settings are `config.toml`. `--home` or `KANZO_HOME` points at another folder. `--port` changes the port. `--no-open` skips the browser. `kanzo service install` keeps it running and starts it at login.

The README's keyboard list: `n` adds a task, `/` or Command-K searches every project, Tab moves to the description, Command-Enter saves, Esc cancels. A task marked Human is left for the person. Paste or drop an image onto a task or a comment to attach it. An optional Backlog column is ignored by agents until you move a card to `todo`.

Agents connect with `kanzo mcp` over stdio, or with the running board at `http://localhost:4242/mcp` when `mcp_http` is true (the README's sample config). Documented client lines:

```sh
claude mcp add kanzo --scope user -- kanzo mcp
codex mcp add kanzo -- kanzo mcp
```

The agent is told to find the project from the git remote of the repo it is in. More repos are linked from the project's menu. `mcp-name` in the README is `io.github.emanuele-em/kanzo`.

## MCP tools

`src/mcp.rs` registers these tools with rmcp 3.7.0. Descriptions below are the strings in the source.

| Tool | Source description |
| --- | --- |
| `list_projects` | List projects with their repos and open task counts. |
| `create_project` | Create a project. |
| `link_repo` | Link another GitHub repo to a project. |
| `list_tasks` | List tasks in board order. |
| `get_task` | Show a task with its comments and image paths. |
| `create_task` | Add a task, to todo unless you pass status. |
| `update_task` | Change the fields you pass. |
| `add_comment` | Comment on a task, like to report progress. |
| `next_task` | Take the top todo task, move it to doing and show it. |
| `delete_task` | Delete a task with its comments and images. Can't be undone. |

The tool list is built once per process. Replies are plain text.

## Share and sync

Sharing is live and has no login. `kanzo share on` (or the share icon) opens the board to other computers on the network. They `kanzo join <address>`. `kanzo share off` and `kanzo leave` return to the local board. The README says to share only on a network you trust. A Raspberry Pi can hold the board with `kanzo service install`. A remote Pi uses a VPN such as Tailscale, NetBird, or WireGuard. Kanzo does not provide that VPN.

Sync is for machines you use one at a time. You paste a private git URL you own. Kanzo makes `~/kanzo` a git repo and pushes the board. `kanzo sync` commits, then pulls or pushes, including while the board is running. If both sides changed, it asks which copy to keep (`--keep-local` or `--keep-remote`).

`kanzo export` prints Markdown or JSON. `kanzo update` installs the latest release and restarts the service. The README says every release is signed by GitHub and can be checked with `gh attestation verify <file> --repo emanuele-em/kanzo`. That attestation was not run here.

## Size claims and build

The README's "small and fast" table, measured by the author on an Apple M4 and not re-run here: a 4.5 MB program with SQLite included, 4.5 MB idle and 8 MB with 3,000 tasks, 2 ms to start, 17 ms to load a 3,000-task board, about 900 tokens for the tool list once per session, and 10 to 60 tokens per agent reply.

`Cargo.toml` for version 0.3.0 says "One 4 MB binary" in the package description, which does not match the README's 4.5 MB. The release profile is `opt-level = "s"`, LTO, one codegen unit, stripped. A comment in that file says `"s"` measured 30% smaller than `3` at the same speed, and `"z"` was smaller but twice as slow to render a large board. That measurement was not repeated.

The crate needs Rust 1.89 and edition 2024. The HTTP server is axum 0.8 with the `http1`, `json`, `query`, and `tokio` features. SQLite is bundled. `if-addrs` lists local addresses for share. Config is parsed with `toml` and never written as TOML by that crate. `cargo install kanzo` is the documented source install. The crates.io API returned 403 on 2026-11-02, so the published crate version was not confirmed beyond the README badge and this `Cargo.toml`.

License is AGPL-3.0-only. Offering a changed version over a network requires sharing its source.

## Repo snapshot

GitHub API on 2026-11-02: created 2026-10-25, last push 2026-11-02T08:28Z, Rust, 711 stars, 40 forks, 2 open issues, about 12 MB. Latest release is `v0.3.0`, published 2026-11-01. Earlier tags in the first page are `v0.2.1` and `v0.2.0`, both 2026-10-27. Topics include `mcp`, `kanban`, `local-first`, and `raspberry-pi`.

## Not checked

Not installed on macOS, Linux, Windows, or a Pi. The 4.5 MB, 2 ms, and token figures were not measured. Sharing, sync conflict handling, and GitHub attestation were not exercised. The crates.io download count was not read.
