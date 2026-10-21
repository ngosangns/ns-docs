---
area: technology
domain: security
type: tool
title: Authorized Artifact Auditor
description: ptn1411/skill ("Authorized Artifact Auditor", Python, no license file) is a pack of about 35 agent skills plus Python CLIs for reverse engineering and auditing software you own - fingerprinting, unpacking, decompiling, web and network recon, SBOM, CVE lookup. The README and MASTER_POLICY.md say defensive use only, but several skills in the repo (master-unlock, dotnet-keygen, binary-patcher, frida-hooker) are written as bypass and keygen tools. Read before installing.
timestamp: "2026-10-21T00:00:00.000Z"
tags:
  - technology
  - security
  - reverse-engineering
  - agents
  - skills
resource: https://github.com/ptn1411/skill
---

# Authorized Artifact Auditor

[ptn1411/skill](https://github.com/ptn1411/skill) is a toolkit of agent skills (`SKILL.md` folders) and standalone Python CLIs for analyzing software artifacts: identify the packer or framework, unpack, decompile, map the architecture, audit configuration and dependencies, and write a report. The README is in Vietnamese. The author is Pham Thanh Nam (`ptn1411`); the README ends with a donation QR and bank details, which are not copied here. Playbook page: [ptn1411.github.io/skill/skill_playbook.html](https://ptn1411.github.io/skill/skill_playbook.html).

Checked 2026-10-21 through the GitHub API and raw files.

- **Repo:** created 2026-04-29, last push 2026-09-22, 36 commits, 272 stars, 130 forks, 0 open issues. Topics include `hacking`, `ai-security`, `skills`.
- **License:** none. GitHub reports no license, so the default is all rights reserved: you can read it, but you have no stated right to copy or redistribute it.
- **Size:** 37 `SKILL.md` files under sub-folders plus the root one. Two of them are copies of `pentest-script-generator` under `cowork/` and `antigravity-kit/`. Seven test files in `tests/`, covering the orchestrator, `lookup_vuln`, `search_exploit_db`, the skill linker and the web deploy audit. Not every skill has a test.
- **Needs:** Python 3.10+. External tools are installed per workflow (Node and `asar`, UPX, JADX, Nmap, `ilspycmd`, de4dot, IDA Pro with an MCP bridge, x64dbg, Frida, mitmproxy). The list is in `TOOLS.md`.

## What it contains

| Group | Skills (folder names) |
| --- | --- |
| Routing | root `SKILL.md`, `scripts/assess.py`, `scripts/orchestrate.py`, `scripts/full_assess.py`, `orchestrator-plugin-sdk` (contract validator for new skills) |
| Identify and unpack | `binary-identifier`, `pyinstaller-unpacker`, `electron-builder-unpacker`, `tauri-unpacker`, `nuitka-decryptor`, `ida-nuitka-reconstructor` |
| Decompile and read | `java-decompiler`, `dotnet-decompiler`, `rust-binary-analyzer`, `javascript-deobfuscator` (including source-map recovery), `android-apk-pentester`, `electron-app-analyzer`, `vm-and-bytecode-reverse`, `symbolic-execution-tools` |
| Audit | `web-app-scanner`, `web-logic-auditor`, `network-scanner` (Nmap), `container-cloud-auditor`, `sbom-supply-chain-auditor`, `license-robustness-audit`, `windows-log-hunter` |
| Intel | `vulnerability-lookup` (CISA KEV, EPSS, NVD, Exploit-DB, GitHub PoCs), `searching-exploit-db` |
| Dynamic | `frida-hooker`, `memory-dumper`, `network-interceptor`, `anti-debugging-techniques` |
| Cracking-style | `binary-patcher`, `binary-protection-bypass`, `dotnet-patcher`, `dotnet-keygen`, `writerpro-pentest`, `master-unlock`, `electron-builder-repacker` |

Agent hooks: `agents/codex.yaml`, `gemini.yaml`, `openai.yaml`, and `scripts/link_skills.py`, which copies or junctions the skills into `~/.gemini/config/skills` and `~/.claude/skills`.

## The mismatch to know about

The README and `MASTER_POLICY.md` describe a defensive toolkit. The policy says authorization "does not authorize weakening protection" and lists as out of scope: cracked or re-signed builds, license or activation bypasses, keygens, forged license files, and patches or hooks that skip license, anti-tamper or authentication checks. The root `SKILL.md` repeats that boundary.

Several skills read the opposite way. From their front matter and opening sections (I read the first 30 to 80 lines of each, not the whole repo):

- `master-unlock` calls itself "unlimited technical access rights", says to bypass all security barriers, and sets the goal as "source code recovery and keygen generation". Its steps chain `nuitka-decryptor`, `writerpro-pentest` and `binary-patcher`, and its deliverables include a working keygen and patched binaries.
- `dotnet-keygen` extracts a license algorithm and generates a keygen. `writerpro-pentest` is described as a generic keygen template.
- `binary-patcher` is "patching and bypass development" to bypass license checks and "enable premium features". `frida-hooker` lists license bypass and SSL-pinning bypass.
- `license-robustness-audit` is the one that matches the policy: it only reports weaknesses and gives a hardening plan and tests, and says it will not produce a keygen or patch.

So the policy file and these skills contradict each other. An agent that loads the whole pack gets both sets of instructions, and nothing in the repo reconciles them. This is the main reason to treat the pack as unreviewed third-party instructions rather than a vetted tool. This note does not reproduce any bypass or keygen steps.

## Notes

- The skills tell the agent to write its final summary in Vietnamese ("Language rule" in each `SKILL.md`), which will override your own language preference.
- `binary-protection-bypass` cites `yaklang/hack-skills` as an upstream; it reuses content from there. Check that source's license separately.
- I did not run any script. The defensive parts (`vulnerability-lookup`, `sbom-supply-chain-auditor`, `container-cloud-auditor`, `license-robustness-audit`) looked reasonable by their descriptions only; I did not review the Python code, so claims such as "does not download or run exploits" are the README's.
- Authorization is the user's responsibility. Use only on artifacts and hosts you own or have written permission to test.

## How this fits

For the same job with better-maintained tooling, see [REA](/Technology/AI/Tools/Agents/REA) (evidence-first MCP over Ghidra, IDA and Hopper), [RedAmon](/Technology/Security/Tools/RedAmon) (authorized pentest framework with approval gates) and the pentest section of [Security Tools](/Technology/Security/Tools/Security Tools). For finding existing reverse-engineered projects instead of redoing the work, see [Awesome Reverse Engineered](/Technology/Security/Tools/Awesome Reverse Engineered).
