---
area: technology
domain: agent-infrastructure
type: tool
title: REA
description: REA (npm package rea-agents, MIT) is a local CLI and MCP server that connects a coding agent to Hopper, Ghidra, IDA, or static analysis and returns evidence for binaries, JavaScript, Electron, .NET, APKs, firmware, and browsers.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - agents
  - mcp
  - reverse-engineering
resource: https://github.com/morluto/rea
---

# REA

[REA](https://github.com/morluto/rea) (Reverse Engineer Anything, author morluto) is one local CLI and one MCP server for inspecting software when the source is missing. The npm package is `rea-agents`. Both bins, `rea` and `rea-agents`, point at `scripts/rea.mjs`. The MCP name in `package.json` is `io.github.morluto/rea`. License MIT. Site: [morluto.github.io/rea](https://morluto.github.io/rea/). Guides: [morluto.github.io/rea/guides](https://morluto.github.io/rea/guides/). Discord: [discord.gg/GkcryMnJDM](https://discord.gg/GkcryMnJDM).

Checked 2026-10-07 against GitHub and the npm registry. The repo was created 2026-04-14. Default branch `main`. Language TypeScript. 11,741 stars, 1,254 forks, 99 open issues. Last push 2026-10-07, HEAD `c7530f9` (`perf(javascript): reduce analysis and source-map work`, #955). Published npm `latest` is **4.1.0**, released 2026-10-06 as tag `rea-agents-4.1.0` (commit `9622b4b4`). `package.json` on `main` still says `4.1.0`. The README says `main` can lead the npm package, so a fact read from `main` on this date is not automatically in the published tarball.

Analysis runs on the machine. Hopper and Ghidra are reached through authenticated private local sockets. IDA is reached through a local MCP registration the caller already has. The model provider still has its own data policy. The README's disclaimer says the tools are for lawful research, analysis, and reconstruction, and that authorization is the caller's responsibility.

## Install

Node engines, from `package.json` and the live npm manifest: `^22.19.0 || ^24.11.0 || >=26.0.0`. npm is required. REA does not install a particular npm version.

```bash
npx rea-agents setup
npm install --global rea-agents
rea setup
rea update
```

`npx rea-agents setup` is the README's recommended path. It shows the paths it will change, backs up existing configuration, and registers MCP plus a version-matched skill for the agents you select. Existing REA registrations are selected by default. Newly detected agents stay unselected until chosen. Hopper is a separate consent step. An existing Ghidra install can be recorded. REA does not download Ghidra or Java.

The optional repo skill is `reverse-engineer-anything` (`npx skills add morluto/rea --skill reverse-engineer-anything`). That command installs the repository copy. Setup installs the copy that matches the package version.

Manual MCP on `main`, pinned to the release the README names:

```json
{
  "mcpServers": {
    "rea": {
      "command": "npx",
      "args": ["-y", "rea-agents@4.1.0", "mcp"]
    }
  }
}
```

`rea update` installs an exact release and returns an unapplied plan for existing registrations. Restart the agents after applying it. `rea uninstall` removes REA-owned MCP registrations and the managed skill. `rea uninstall --purge-data` also removes `~/.rea/cache` and `~/.rea/state`. It leaves Hopper, Node.js, Evidence files, captures, unrelated skills, and other MCP servers in place, and it refuses to follow purge-data symlinks.

Setup's named agents: Claude Code, Claude Desktop, Codex, Cursor, Gemini CLI, Windsurf, Devin, OpenCode, Antigravity, GitHub Copilot CLI, Command Code, and VS Code. Any other client that can launch a local MCP server can use the JSON above.

## Providers

Static JavaScript and Electron mapping needs only Node. Deep native analysis needs a bring-your-own engine. When more than one installed engine can open a target, REA does not choose. The open fails with `code: "capability_unavailable"` and `details.selection_reason: "ambiguous"`. Pass `--provider` on the CLI, `provider_id` on `open_binary`, or set `REA_ANALYSIS_PROVIDER`. An explicit selector overrides the environment variable. The session keeps that choice.

| Provider | What the README says it does | Bring your own |
| --- | --- | --- |
| Hopper | Deep native analysis, `.hop` databases, annotations (names, comments, bookmarks). GUI controls go through Hopper. One request at a time. Cancelling the wait does not stop work already running inside Hopper. | Separate Hopper license. Demo mode has the vendor's limits. Setup can install it after approval: `~/Applications` on macOS, system packages on supported Linux. Default launchers: `/Applications/Hopper Disassembler.app/Contents/MacOS/hopper` and `/opt/hopper/bin/Hopper`. Override with `HOPPER_LAUNCHER_PATH`. |
| Ghidra | Inventory, functions, memory, load image. On Linux and macOS, `annotate_native_function` edits names and entry comments in the session database and returns a refreshed dossier. Executable bytes stay unchanged. Those edits are discarded on close. Also imports DOS MZ with an explicit 16-bit x86 real-mode profile. Optional NativeAOT metadata recovery has its own pinned headless adapter. | **Ghidra 12.1.x** and the 64-bit JDK that install declares. Current 12.1 releases require JDK 21 or newer and set no maximum. The bridge is verified with Ghidra 12.1.4 and JDK 21. macOS also needs the native decompiler for that architecture. `GHIDRA_INSTALL_DIR` and, when `java` is not on `PATH`, `JAVA_HOME`. |
| IDA Pro | Read-only function and string operations. `attached` reuses a current GUI target (legacy 1.4 tools). `headless` uses the database supervisor. REA leaves an attached GUI database open and does not save it. Results stay live because an external IDA database change is not an immutable snapshot. | [mrexodia/ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp), path in `REA_IDA_MCP_CONFIG`. The README's first verified workflows are a Windows GUI and Windows x64 headless IDA 9.3. Other engine and platform pairs are unverified. |
| Static JavaScript | Modules, imports, source maps, routes, IPC channels, storage, and native add-ons for a directory or ASAR. Dynamic and ambiguous relationships stay unresolved. | None. `rea analyze` on a directory or `.asar` selects this provider when neither `--provider` nor `--snapshot` is set. |
| Android APK | Package and manifest declarations, class search, member inventories, method decompilation, incoming static references. No emulator and no APK execution. | Caller-supplied headless JADX JAR and a full JDK. Linux and macOS. The metadata bridge is verified on macOS arm64. |
| Firmware | Region inspection and explicit extraction, then a native handoff. | Caller-supplied Binwalk and Unblob, on Linux. |
| Browser | Passive Chrome-family inspection over a literal loopback CDP endpoint, and a separate Playwright scenario command that can interact. | Caller-supplied Chromium for module traces (`REA_BROWSER_EXECUTABLE`). |
| .NET | Metadata, CIL, declared native dependencies, build comparison. The assembly is not loaded or run. Imported decompiler output is labeled analyst inference. | None named as a required external decompiler in the status section. |
| Process capture | Runs the executable and scenario named in the request and records behavior. | Linux and macOS with a working native PTY. |

`rea doctor` with no scope audits every detected agent registration, the installed skill, and every optional engine. That audit can report `healthy: false` while the task you are running still works. Scope it: `--provider ghidra` (or `hopper`, `ida`), `--client codex`, or `--skill`. A scoped report sets `scope.mode` to `explicit`. Only `scope_checks` decide `healthy` and the exit status.

## Catalog on main

The README on `main` at `c7530f9` groups the investigation surface like this. `rea capabilities` and `rea providers` list binary-session providers and auxiliary operations. They are not the full browser, Android, or application-workflow inventory. The connected MCP tool list is that inventory. Exact counts are generated into `docs/product-catalog.json`.

| Family | Count | Examples named in the table |
| --- | ---: | --- |
| Native inspection | 41 | functions, pseudocode, assembly, strings, symbols, calls, references, annotations, byte reads, file offsets |
| Investigation workflows | 14 | overviews, function dossiers, native APIs and dispatch, batch decompilation, feature traces, call paths, call graphs, Swift and Objective-C discovery |
| Native macOS utilities | 7 | Mach-O metadata, code signatures, plists, architectures, Swift demangling, without launching Hopper |
| Artifact graph | 5 | directory and package inventories, compiled Interface Builder, Apple asset catalogs, extraction |
| Managed PE/CLI | 7 | .NET identity, metadata, CIL, native dependencies, reconstruction imports, build comparisons |
| Firmware | 2 | Linux region inspection and explicit extraction |
| Android APK | 5 | manifest, class search, members, method decompilation, incoming static references |
| Browser observation | 9 | page structure, network metadata, scripts, source maps, WebMCP discovery, screenshots, capture comparisons |
| Electron analysis | 5 | renderer observation, static app mapping, static/runtime reconciliation |
| JavaScript runtime | 2 | Inspector target discovery, script locations, execution-context events |
| Application workflows | 13 | website script export, Android and Apple inventory projections, cross-layer traces, build comparisons, historical source mapping, reconstruction checks |
| Workspace and observation | 21 | sessions, evidence bundles, navigation context, process/artifact/function comparisons, open questions |

Those counts sum to 131. Six guided MCP workflows are also advertised through `prompts/list`.

## Hosts and limits

Supported hosts for the main product: macOS 12 or newer, Ubuntu 24.04+, Fedora 41+, and 64-bit Arch Linux.

Windows is a narrower surface, and the README states each boundary separately:

- Repository `main` and npm 4.1.0 include experimental Windows x64 Ghidra for native, non-managed, non-DLL x86-64 PE applications on fixed local NTFS, with 25 read-only operations, a bundled Job Object, a private DACL, and path admission. Linux and macOS Ghidra can also edit session-scoped function names and entry comments. Windows P0 has no mutation authority and no GUI controls. The README says to check the release boundary before expecting this from an older npm package.
- Native Windows process capture stays unavailable until the PTY adapter can verify descendant cleanup. Reinstalling the Windows PTY binary does not enable it. Comparing capture Evidence that already exists does run on Windows.
- Historical source import (`rea import-reference-source`) needs safe no-follow opens and runs on Linux and macOS. Native Windows reports `unsupported_host`.

Other limits from the same README:

- Passive browser tools do not navigate, click, or evaluate page JavaScript. They do not retain credentials, cookies, authorization headers, or raw payload values. REA cannot see activity from before it attached. `capture_browser_scenario` is the separate path that can interact, through Playwright, using a caller-declared scenario.
- Node and Electron Inspector observation records script locations and execution-context events. It does not evaluate code or set breakpoints, and it does not establish imports, IPC, process identity, or Electron roles.
- Optional JavaScript source recovery (`recover_javascript_sources`) is a Linux x64 adapter and needs caller-supplied Wakaru 1.13.0.
- The first Ghidra query starts import and auto-analysis and can outlast a client's default request deadline. `analysis_activity` reports a tool that is still busy after the caller times out. `cleanup_incomplete` means shutdown or removal could not be verified.
- Snapshots are reused only when the target bytes, operation, parameters, analysis tool, and settings match. Snapshot files stay local with owner-only permissions.
- ASAR inventory checks Electron integrity metadata for archive entries and `.asar.unpacked` companions. A hash mismatch is reported. A declared unpacked companion that is missing locally is kept as `unavailable`. REA continues on the embedded JavaScript.
- The roadmap's Later list is not shipped: more browser and Electron scenario actions, native runtime observation (LLDB, Frida, system logs, native API tracing), and an evaluation of Binary Ninja, Rizin, LIEF, and further Windows-native, mobile, and firmware tools. IDA is already a shipped bring-your-own adapter, not part of that evaluation.

## Evidence

CLI and MCP share the same workflows and evidence contracts. A result carries artifact identity, provider, locations, confidence, and limitations. Missing observations stay unknown. Reconstruction checks report pass, fail, or unknown. Comparison does not treat correlation as causality.

Commands that move evidence, named in the README: `rea evidence-import`, `rea evidence-export`, `rea compare`. Export does not replace an existing file unless `--overwrite` is set. Reference-source import stores hashes and metadata. To skip paths, set `REA_REFERENCE_SECRET_PATTERNS_JSON` to a JSON array of ignore patterns.

Process capture runs with the caller's user permissions. The README says it records behavior and is not a security sandbox. Filesystem observation paths choose what to snapshot. A missing observation cannot prove that two runs behaved the same way.

## See also

Listed from [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) and from [Security Tools](/Technology/Security/Tools/Security Tools), next to the other reverse-engineering entries.
