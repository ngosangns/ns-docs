---
area: technology
domain: postgres
type: tool
title: PGX
description: PGX (pgrundev/pgx, AGPL-3.0) is a Rust runtime that serves hundreds to thousands of isolated Postgres databases from one process by keeping a single Postgres 18.6-compatible engine, minting databases on connect and branching them with ZFS copy-on-write — built for CI, previews and agent sandboxes, explicitly not production.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - postgres
  - database
  - rust
  - agent-infrastructure
resource: https://github.com/pgrundev/pgx
---

# PGX

[PGX](https://github.com/pgrundev/pgx) ([pgx.dev](https://pgx.dev)) is a Rust database runtime that speaks the PostgreSQL wire protocol and SQL, but does not run one Postgres process per database. One process hosts a shared engine and mints isolated databases on connect — from a template, or from a ZFS copy-on-write branch. It is built on [pgrust](https://github.com/malisper/pgrust), a separate Postgres-compatible engine in Rust.

Not to be confused with [jackc/pgx](https://github.com/jackc/pgx), the widely used Go driver for PostgreSQL. This is `pgrundev/pgx`, a server, not a client library.

Checked 2026-11-02: repository, README, `docs/pgx/v0.1-readiness.md`, `docs/pgx/compatibility-gate.md`, `docs/pgx/local-dev/agents.md`, `Cargo.toml`, npm metadata, releases and GitHub API. Not installed, not started, no database created, no benchmark reproduced.

## Why it exists

The expensive part of giving every test run, pull request, preview environment or agent its own database is not storage — it is the per-database cost of a Postgres instance: a process, shared buffers, catalog caches, background workers, connection slots. PGX replaces that with one runtime and per-database state that is cheap to create and cheap to throw away.

The intended uses are explicitly ephemeral: CI, PR previews, agent sandboxes, test suites, preview environments. The project's own readiness document puts production, system-of-record, high availability and point-in-time recovery on the **not approved** list.

## Version and project state

| Item          | Value                                                                                   |
| ------------- | --------------------------------------------------------------------------------------- |
| Latest        | **v0.1.2**, released 2026-10-27 (beta.1 2026-10-19, 0.1.0 2026-10-21, 0.1.1 2026-10-26) |
| Repository    | `pgrundev/pgx`, created 2026-10-08, last push 2026-11-02                                |
| Stars / forks | 636 / 33, 10 open issues                                                                |
| Language      | Rust                                                                                    |
| License       | **AGPL-3.0**; PostgreSQL-derived portions under the PostgreSQL License (see `NOTICE`)   |
| Base engine   | `malisper/pgrust` (AGPL-3.0, Rust, created 2026-04-20, ~5.7k stars)                     |
| Compatibility | PostgreSQL **18.6** wire protocol and SQL                                               |
| Platforms     | macOS Apple silicon, Linux arm64 and x86-64; Intel Mac unsupported                      |

The project is roughly three weeks old at the time of this note. Treat every number below as a claim by the authors, not an established property.

## Install

Four entry points, all pulling the same SHA-256-verified binary into `~/.pgx/dist/<version>`:

```bash
# Claude Code plugin (also installs the skill and hooks)
/plugin marketplace add pgrundev/pgx-plugin
/plugin install pgx@pgx-plugin

# Agent Skill only
npx skills add pgrundev/pgx --skill pgx

# npm wrapper
npx pgxdb@latest

# Standalone installer
curl -fsSL https://pgx.dev/install | sh
```

The npm package is `pgxdb@0.1.2` (AGPL-3.0, Node >= 18, bins `pgx` and `pgxdb`). As with any `curl | sh`, read `dist/install.sh` first; the repository ships it, so it can be inspected before running.

## CLI

```text
pgx url                        # connection string for the active database
pgx ls                         # databases, templates, branches
pgx create <name>              # database from a template
pgx branch <name> [--from ...] # copy-on-write branch
pgx clone <from> <to>
pgx ttl <name> <duration>      # schedule reaping
pgx stop <name>
pgx copy --from "$DATABASE_URL" --to myapp --schema-only
pgx agent setup|doctor|exec|ls|down|uninstall
```

Most commands accept `--json`, which is what the agent skill and the hooks consume. `pgx copy` defaults to schema-only, a deliberate guard against pulling production rows into an agent sandbox without an explicit decision.

## Architecture

### One runtime, many databases

A single process serves all databases. Connections are handled by threads rather than one process per connection, and catalog caches are shared across databases. Each database gets its own catalog, relations and session state, but not its own buffer pool or background-worker set.

### Mint-on-connect

Databases are created lazily from a template with a generated name of the form `<prefix><template>__<token>`. A warm pool keeps pre-minted databases ready so a connection does not pay the full creation cost. A janitor process reaps expired databases according to their TTL.

### ZFS copy-on-write branches

Where the filesystem supports it, a branch is a ZFS clone (`file_copy_method=clone`) of a template dataset. The README's example: branching a 10 GB template took 674 ms and consumed 13.6 MB. That is the mechanism that makes "one database per PR" plausible — the branch shares blocks with the template until either side writes.

### Resource limits

Per-session, per-database and runtime-wide memory limits are enforced, with a cgroup as the backstop. `pgrust_runtime_status()` returns a JSON snapshot of the runtime (databases, memory, connections) for monitoring.

## Performance claims

All figures are the authors' published benchmarks, run on a 4 vCPU / 8 GB host unless noted.

| Scenario                              | Claim                                                               |
| ------------------------------------- | ------------------------------------------------------------------- |
| Postgres regression corpus            | 219/231 byte-exact, **0 result diffs**, 12 differ only in plan text |
| 1,000 databases, untouched            | 128–155 MB total                                                    |
| 1,000 databases, with queries running | 213 MB total                                                        |
| Warm mint                             | p50 6.2 ms, p99 9.4 ms                                              |
| Cold mint                             | 74 ms p50, 102 ms p99 (readiness doc cites ~60 ms)                  |
| 500 concurrent connections            | drained in 12.6–13.8 s                                              |
| ZFS branch of a 10 GB template        | 674 ms, 13.6 MB                                                     |
| 30,000 create/drop lifecycles         | 111 MB retained (~0.2 KB per lifecycle)                             |
| Framework test suites                 | 36/36 pass                                                          |
| Point `SELECT`                        | 0.25 ms vs 0.13 ms on Postgres (1.4–1.9× slower)                    |
| Large scans                           | 1.5–2.2× slower than Postgres                                       |

The honest part is that the README publishes the losses as well as the wins. The headline is density and creation latency, not query throughput: this is not a faster Postgres, it is a cheaper way to have many small ones.

Write amplification is the other cost: at a 128K recordsize, a scattered update costs about 0.45 MB of new blocks. Copy-on-write is cheap until the branch starts writing, and then it behaves like ZFS.

## Compatibility

The compatibility gate runs before a workload is allowed onto PGX. The default profile is `STANDARD_POSTGRES_REQUIRED`, and the rules are ordered:

1. `extension_unavailable`
2. `language_unavailable`
3. `schema_restore_failed`
4. `type_unavailable`
5. `version_newer_than_pgx`
6. `feature_unsupported`
7. `host_library_missing`

The output is JSON with a verdict, reasons, warnings and a fingerprint. Built-in contrib coverage includes `pgvector` with HNSW, `pgcrypto`, `postgres_fdw`, `pg_trgm`, `hstore`, `citext` and `ltree`, plus others. Coverage is partial, and the gate exists precisely because it is partial.

## Agent integration

The repository ships a Claude Code plugin and marketplaces entry (`.claude-plugin/marketplace.json`), an agent skill, and hooks for Claude Code and Codex. The security posture documented in `docs/pgx/local-dev/agents.md` is unusually explicit:

- No credentials in the conversation; detection prints host and database name only.
- The skill is told not to read credential files.
- Schema-only copy by default; production data requires approval.
- Nothing leaves the machine.
- No application-config edits, no deletion of a developer's existing databases.
- Official installers only; existing hooks are preserved; sandboxes are never weakened; failures fail closed.

The hooks were live-verified on 2026-10-25/26 with 3 and 20 concurrent subagents. Cursor environment injection was still pending live verification, and the Codex wrapper requires `sandbox_workspace_write.network_access = true`. A `.pgx.toml` file is safe to commit because it carries only names and durations and rejects URLs. Hook commands are guarded with `command -v pgx … || exit 0` so a machine without the binary does not break.

## License

AGPL-3.0. Running a modified PGX as a network service triggers the AGPL's source-offer obligation, which matters for anyone embedding it in a hosted product. The PostgreSQL-derived portions are under the PostgreSQL License and are listed in `NOTICE`.

## Limits and risks

- **Not crash-safe.** The default profile runs with `fsync=off` and `full_page_writes=off`; it is a non-durable configuration. A crash can lose or corrupt data, and all databases share **one crash domain**.
- **No HA, no PITR.** There is no replication, failover or point-in-time recovery story.
- **No C extensions, no PL/Python, PL/Perl or PL/Tcl.** Rust-implemented extensions only. Anything that loads a `.so` will fail the compatibility gate.
- **Partial extension compatibility.** Built-ins cover common cases, not every extension or version.
- **Slower per-query.** Point lookups and large scans are measurably slower than Postgres; the trade is density, not speed.
- **Young project.** v0.1.2, about three weeks old, built on a base engine that is itself months old. No long-term operational track record.
- **Platform gap.** Intel Macs are unsupported.
- **Name collision.** Searching for "pgx" will overwhelmingly return the Go driver.

## Not checked

Not installed; no database created; the benchmark harness was not run. The regression numbers, memory figures, mint latencies and concurrency results are reproduced from the README and readiness document, not measured. The compatibility gate was not exercised against a real schema, and the agent hooks were not installed or tested here. The ZFS behavior depends on the host filesystem and was not verified on this machine.

> **See also:** [PostgreSQL](/Technology/Backend And Database/Tools/PostgreSQL) · [Database Tools](/Technology/Backend And Database/Tools/Utilities/Database Tools) · [Treg](/Technology/AI/Tools/Agents/Treg)
