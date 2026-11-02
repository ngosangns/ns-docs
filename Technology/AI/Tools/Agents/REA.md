---
area: technology
domain: agent-infrastructure
type: tool
title: REA
description: "REA (npm rea-agents 6.8.0, MIT) is a local CLI and MCP server that returns evidence for native binaries, JavaScript, Electron, .NET, Android, firmware, browsers, and other static formats. Checked 2 November 2026: GitHub lists 420,599 stars, the site is rea.tools, and main has commits after the 25 October 2026 npm release."
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - agents
  - mcp
  - reverse-engineering
resource: https://github.com/morluto/rea
---

# REA

[REA](https://github.com/morluto/rea) (Reverse Engineer Anything, author morluto) is one local CLI and one MCP server. An agent, or the `rea` command, asks it to inspect a target and it returns findings with the evidence and the limits of that evidence. The npm package is `rea-agents`. Both bins, `rea` and `rea-agents`, point at `scripts/rea.mjs`. License MIT.

Checked 2 November 2026 against the GitHub API, `package.json` on `main`, the README, `DISCLAIMER.md`, the start of `SECURITY.md`, and the npm registry. This note did not install REA and did not run it.

Get it from [morluto/rea](https://github.com/morluto/rea), [rea.tools](https://rea.tools/), or the [rea-agents](https://www.npmjs.com/package/rea-agents) package. The README says a similar repository name or a copied README does not make a download official. Guides: [rea.tools/guides](https://rea.tools/guides/). Showcases: [rea.tools/showcase](https://rea.tools/showcase/). Discord: [discord.gg/GkcryMnJDM](https://discord.gg/GkcryMnJDM).

## Snapshot

| Fact | 2 November 2026 | 7 October 2026 note |
| --- | --- | --- |
| Stars | 420,599 | 11,741 |
| Forks | 105,015 | 1,254 |
| Open issues | 1,625 | 99 |
| npm `rea-agents` | 6.8.0, published 25 October 2026, tag `rea-agents-6.8.0` | 4.1.0, published 6 October 2026 |
| `package.json` on `main` | 6.8.0 | 4.1.0 |
| Commit read | `93b8b82db7`, 2 November 2026 08:50 UTC, `feat(native): deliver batch decompile as a retained summary` (#8631) | `c7530f9` |
| Last push | 2 November 2026 10:31 UTC | 7 October 2026 |
| Node engines | `^22.23.4 \|\| ^24.22.1 \|\| >=26.12.1` | `^22.19.0 \|\| ^24.11.0 \|\| >=26.0.0` |
| Site named in the README | rea.tools | morluto.github.io/rea |

The repo was created 14 April 2026. Default branch `main`. Language TypeScript. GitHub `size` is 137,536 KB. A later vault note, [Awesome Reverse Engineered](/Technology/Security/Tools/Awesome Reverse Engineered), already recorded an API reading of 351,629 stars against this note's 11,741. The 2 November count is another API reading. This note does not explain the size of the move.

`package.json` and the published package both say 6.8.0. `main` still has commits after the 25 October tag. The README tells you to check release availability for features added since the latest npm release. A fact read from `main` on this date is not automatically in the 6.8.0 tarball.

## What the current README says it can open

Analysis runs on the machine. The FAQ says the agent receives tool results, and the model provider has its own data policy. Static JavaScript and .NET inspection read the supplied files and do not run the application. Runtime capture runs or interacts with the selected target using the caller's user permissions.

Deep native analysis uses Hopper, Ghidra, IDA, or Kuna. Setup can install Hopper after you approve it. Ghidra, IDA, and Kuna use installations you already have. Static JavaScript and .NET inspection need no native engine. Offline native inspection can also use caller-supplied GNU objdump or Rizin. REA does not install those two.

The README's target table, read on this date, also names desktop installation markers, Go and Rust binaries, GPU code objects, GGUF and safetensors headers, IL2CPP metadata, Godot PCK, PE certificates and imports, ELF notes, Apple IPS crashes, Linux kernel modules, Erlang BEAM, WASM (caller-supplied WABT 1.0.42), EVM bytecode, SQLite, recorded Linux crashes, websites, HAR or Fiddler SAZ captures, Android APKs (headless JADX and a full JDK), firmware, recorded packets, logic-signal recordings, packages and Apple bundles, process behavior, and PyInstaller executables. Linux static JavaScript, Electron, Ghidra, JADX, and firmware launches need a procps-compatible `ps` on `PATH`.

On Linux, the process-ownership check is a prerequisite named in the README, with recovery steps in `docs/installation.md`. This note did not re-count MCP tools. `docs/product-catalog.json`, which the 7 October note used, returned 404. The README badge now points at the generated catalog in `docs/mcp-contracts.md`.

Setup's own sentence lists Claude Code, Codex, Cursor, Gemini CLI, Grok Build, and other agents in the installation guide. The FAQ says any client that can launch a local MCP server can be registered by hand. MCP input schemas are compact unless `REA_MCP_INPUT_SCHEMA_PROFILE=full`. Output schemas are complete unless `REA_MCP_OUTPUT_SCHEMA_PROFILE` is `compact` or `off`.

```bash
npx rea-agents setup
npm install --global rea-agents
rea update
npx rea-agents@latest setup
```

`rea update` is the path for a global npm or Bun install. The README says Bun global updates need Bun 1.2.17 or newer, and that the updater keeps at most 4 MiB of combined stdout and stderr. One-off commands use `npx rea-agents@latest` or `bunx rea-agents@latest`.

The README names three showcases (a DX-Ball sound pan, a Notion clipboard bridge, and a TH04 bullet-ring calculation) and a separate guide for turning a recorded web session into an AgentEnv environment. Those pages were not opened for this check. The numbers in the showcase blurbs are the README's claims.

## Limits the project states

`DISCLAIMER.md` says REA is for lawful analysis: security research, malware and incident analysis, vulnerability research and coordinated disclosure, CTFs and education, interoperability, software preservation, and debugging software you own or are allowed to examine. It says the project will not help with DRM or license circumvention, game cheats, bypassing authentication or access controls on systems you are not allowed to test, copying proprietary software, evading a model provider's safety measures, or reselling AI accounts. Local operation does not by itself authorize execution, traffic capture, or device changes. Decompiler output can be wrong. IDA, Hopper, and JEB stay under their own licenses. REA does not supply a key for them.

`SECURITY.md` says fixes are for the latest published version. Report a vulnerability through GitHub private reporting, or by email to morluto@outlook.com. Do not put proof-of-concept exploits, credentials, or private provider projects in a public issue. Hopper and Ghidra bridges use a per-session random capability token. POSIX uses a current-user Unix socket. The same file says this is not a sandbox and does not protect against another process already running as the same user. Opening an untrusted binary hands parsing to the selected local provider with that user's permissions.

## Reading from 7 October 2026

The sections below are the note as checked on 7 October 2026, against npm 4.1.0 and `main` at `c7530f9`. They were not re-verified on 2 November 2026. Where they disagree with the snapshot above, the 2 November reading is the later one.

The site named then was [morluto.github.io/rea](https://morluto.github.io/rea/). The MCP name in `package.json` was `io.github.morluto/rea`. Manual MCP was pinned to `rea-agents@4.1.0`. `rea uninstall` removed REA-owned MCP registrations and the managed skill. `rea uninstall --purge-data` also removed `~/.rea/cache` and `~/.rea/state`, left Hopper, Node.js, Evidence files, and captures in place, and refused to follow purge-data symlinks. Named setup agents then included Claude Desktop, Windsurf, Devin, OpenCode, Antigravity, GitHub Copilot CLI, Command Code, and VS Code, in addition to the clients still named in the 2 November README sentence.

When more than one installed engine could open a target, REA did not choose. The open failed with `code: "capability_unavailable"` and `details.selection_reason: "ambiguous"`. An explicit `--provider`, `provider_id` on `open_binary`, or `REA_ANALYSIS_PROVIDER` selected one.

| Provider | What the 7 October README said | Bring your own |
| --- | --- | --- |
| Hopper | Deep native analysis, `.hop` databases, annotations. One request at a time. | Separate Hopper license. Setup could install it after approval. |
| Ghidra | Inventory, functions, memory, load image. Linux and macOS could edit session-scoped names and entry comments. Executable bytes stayed unchanged. | Ghidra 12.1.x and the JDK that install declared. The bridge was verified with Ghidra 12.1.4 and JDK 21. |
| IDA Pro | Read-only function and string operations. | [mrexodia/ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp). First verified workflows were a Windows GUI and Windows x64 headless IDA 9.3. |
| Static JavaScript | Modules, imports, source maps, routes, IPC, storage, native add-ons. | None. |
| Android APK | Manifest, class search, members, method decompilation, static references. No emulator and no APK execution. | Caller-supplied headless JADX and a full JDK. Linux and macOS. |
| Firmware | Region inspection and explicit extraction, then a native handoff. | Caller-supplied Binwalk and Unblob, on Linux. |
| Browser | Passive Chrome-family inspection over a loopback CDP endpoint, plus a separate Playwright scenario command. | Caller-supplied Chromium for module traces. |
| .NET | Metadata, CIL, declared native dependencies, build comparison. The assembly was not loaded. | No external decompiler named as required. |
| Process capture | Ran the named executable and recorded behavior. | Linux and macOS with a native PTY. |

The README on `c7530f9` grouped the investigation surface as 41 native inspection tools, 14 investigation workflows, 7 native macOS utilities, 5 artifact-graph tools, 7 managed PE/CLI tools, 2 firmware tools, 5 Android APK tools, 9 browser tools, 5 Electron tools, 2 JavaScript runtime tools, 13 application workflows, and 21 workspace tools. Those counts summed to 131, plus six guided workflows on `prompts/list`. `rea capabilities` was not that full inventory. Exact counts were generated into `docs/product-catalog.json`.

Hosts named then for the main product: macOS 12 or newer, Ubuntu 24.04+, Fedora 41+, and 64-bit Arch Linux. Windows was a narrower surface: experimental Windows x64 Ghidra for native, non-managed, non-DLL x86-64 PE on fixed local NTFS, with 25 read-only operations. Native Windows process capture stayed unavailable. Historical source import ran on Linux and macOS. Optional JavaScript source recovery was a Linux x64 adapter and needed caller-supplied Wakaru 1.13.0. The Later list then included native runtime observation (LLDB, Frida) and an evaluation of Binary Ninja, Rizin, and LIEF. The 2 November tree contains `bridge/native/rea_lldb_tracer.py`, `docs/frida-instrumentation.md`, and `docs/kuna-provider.md`, so that Later list is not a description of `main` on this date. This note did not read those new guides.

CLI and MCP shared evidence contracts. A result carried artifact identity, provider, locations, confidence, and limitations. Process capture used the caller's user permissions and was not a security sandbox.

> **See also:** [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) · [Security Tools](/Technology/Security/Tools/Security Tools) · [Awesome Reverse Engineered](/Technology/Security/Tools/Awesome Reverse Engineered)
