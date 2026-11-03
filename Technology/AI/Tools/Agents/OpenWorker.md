---
area: technology
domain: agent-infrastructure
type: tool
title: OpenWorker
description: "OpenWorker (andrewyng/openworker, MIT) is a local desktop AI coworker with a Python server and a Tauri shell. Checked 3 November 2026, the Tauri config and Python package on main say 0.3.4, the newest GitHub release is v0.3.1, and PyPI openworker is 0.0.1."
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - agent-infrastructure
  - agents
resource: https://github.com/andrewyng/openworker
sources:
  - id: github-api
    resource: https://github.com/andrewyng/openworker
    author: human:Andrew Ng
  - id: readme
    resource: https://github.com/andrewyng/openworker/blob/main/README.md
    author: human:Andrew Ng
  - id: pyproject
    resource: https://github.com/andrewyng/openworker/blob/main/pyproject.toml
    author: human:Andrew Ng
  - id: tauri
    resource: https://github.com/andrewyng/openworker/blob/main/surfaces/gui/src-tauri/tauri.conf.json
    author: human:Andrew Ng
  - id: catalog
    resource: https://github.com/andrewyng/openworker/blob/main/coworker/connectors/catalog_copy.py
    author: human:Andrew Ng
  - id: pypi
    resource: https://pypi.org/pypi/openworker/json
    author: human:Andrew Ng
  - id: security
    resource: https://github.com/andrewyng/openworker/blob/main/SECURITY.md
    author: human:Andrew Ng
  - id: aisuite
    resource: https://github.com/andrewyng/aisuite
    author: human:Andrew Ng
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# OpenWorker

[OpenWorker](https://github.com/andrewyng/openworker) is a local desktop app that runs an agent on your machine. The README calls the project an open beta and says the app updates itself. Checked 3 November 2026 against the GitHub API, the README, `pyproject.toml` on main and at tag `v0.3.1`, `tauri.conf.json`, `Cargo.toml`, `surfaces/gui/package.json`, `coworker/connectors/catalog_copy.py`, `SECURITY.md`, the PyPI JSON for `openworker`, and the GitHub API for `andrewyng/aisuite`. The repo was not cloned. The app was not installed. The server was not started.

The GitHub profile for `andrewyng` names Andrew Ng and sets the blog field to `http://andrewng.org`. That site was not opened. The API homepage field is `http://openworker.com`. `pyproject.toml` sets the homepage to `https://openworker.com`. The product site was not opened.

## Versions that do not match

These numbers were read on the same check. They are not one release.

| Place | Version | When |
| --- | --- | --- |
| `pyproject.toml` on `main` | 0.3.4 | file on `main` at this check |
| `tauri.conf.json` `version` | 0.3.4 | same `main` |
| GitHub release `v0.3.1` | 0.3.1 in that tag's `pyproject.toml` | published 2026-10-05T21:12:52Z, commit `b9b35036668dfb1653f3aa35bafb9aeea6d47c3c` |
| PyPI `openworker` | 0.0.1 | wheel upload 2026-09-18T22:26:29Z |
| `surfaces/gui/src-tauri/Cargo.toml` | crate `openworker-desktop` 0.1.0 | same `main` |
| `surfaces/gui/package.json` | `openworker-gui` 0.0.0, `private` true | same `main` |

The PyPI summary says 0.0.1 is a placeholder and that the installable runtime is coming to this name. It is not the 0.3.4 tree. `main` is ahead of tag `v0.3.1`. The range was not diffed.

GitHub on this check lists 18,871 stars, 2,680 forks, and 375 open issues. The repo is public, not archived, language Python, default branch `main`, created 2026-07-20T01:52:32Z, and `pushed_at` 2026-11-02T14:32:02Z. The API description is null. Size is 33,239 KB. HEAD is `5e3d7261f203bbd94a91fa10856d29aad0bfaeae`, committer date 2026-11-02T10:34:19Z. The message is a merge of pull request 820. It says the Ollama default becomes `127.0.0.1` so Windows does not wait 2 seconds per connection. That duration is the commit message, not a timing run here.

`tauri.conf.json` sets `productName` to OpenWorker and `identifier` to `com.openworker.desktop`. `bundle.macOS.minimumSystemVersion` is `12.0`. The README download line also says macOS 12 or newer, Apple Silicon, signed and notarized, from `https://download.openworker.com/mac`. The Windows line says Windows 10 or 11 on x64, from `https://download.openworker.com/windows`, and says the builds are not code-signed yet, so SmartScreen will warn. Those two URLs were not fetched. The README has no Linux download link.

## What the pages say it does

The README says you bring a key for OpenAI, Anthropic, Google, or an open-weight provider, or you point the app at Ollama. It says data leaves the machine only through the model and the integrations you choose. A small cloud service brokers OAuth for connectors. The same section says you can use the app without signing in, with credentials you create yourself. None of that was exercised.

The README vendor list names OpenAI, Azure OpenAI, Anthropic, Google Gemini, BytePlus Ark, Volcengine Ark Agent Plan, Atlas Cloud, Inkling, GLM, DeepSeek, Kimi, and Qwen. It also names MiniMax, Mistral, Grok, Solar, Cohere, OrcaRouter, OpenRouter, and Hugging Face Inference Providers. It also names Together, Fireworks, Cerebras, SiliconFlow, Ollama, llama.cpp, vLLM, LM Studio, Jan, Docker Model Runner, and mlx-lm. The `coworker/providers` directory on `main` lists Python modules for Anthropic, Bedrock, Gemini, OpenAI, OpenRouter, llama.cpp, Ollama, a local server, Vertex, and Codex. `recommended_models.json` was not opened, so the README list and the module list stay separate. Bedrock is an optional extra, `boto3`. OpenShell is an optional extra, `grpcio`.

OpenRouter is two cards in the README. One takes a pasted key. One signs in through the browser and uses OpenRouter credits. The README says the issued key stays on the computer, and disconnecting the account does not fall back to the pasted key. That screen was not opened.

The engine depends on `aisuite>=0.2.0`. A comment in `pyproject.toml` says 0.2.0 is the first PyPI release with the tool modules this app uses. That PyPI claim was not checked. The README says OpenWorker was developed inside the aisuite repo and then moved here. That history was not walked. The aisuite GitHub API on this check shows MIT, Python, `pushed_at` 2026-09-18T23:01:44Z, and 16,372 stars.

## Layout and how a run is described

The README table and the GitHub tree agree on these top directories.

| Path | Role in the README |
| --- | --- |
| `coworker/` | Python backend. Engine, providers, connectors, MCP client, memory, automations. |
| `surfaces/gui/` | React UI and a Tauri shell that supervises the server. |
| `stt/` | Rust speech-to-text sidecar. |
| `packaging/` | macOS DMG, Windows installer, auto-update manifest, dev bootstrap. |
| `docs/` | Design specs and decision logs. Not opened, except that the README links three sandbox docs. |
| `tests/` | Backend tests. Not run. |

`pyproject.toml` requires Python `>=3.10` and registers the console script `openworker` as `coworker.cli:main`. The README also asks for Node 20 or newer and a Rust toolchain when you build the desktop shell. The documented server command is `python -m coworker.server.run` with `--port 8765`. The README says a per-launch token file is `<state-dir>/sidecar-8765.token`, and direct API calls send it as `X-OpenWorker-Token`. It says the desktop app keeps its launch token in memory and does not write that token to disk. Those commands were not run. `npm test` and `npm run e2e` were not run.

The MCP dependency is `mcp>=1.28.1,<2`. The comment names advisories PYSEC-2026-3481, PYSEC-2026-3482, and PYSEC-2026-3483, and says the upper bound exists because 2.0.0 removed `streamablehttp_client`. The advisories were not opened.

## Connectors and builtin personas

`catalog_copy.py` is the same on `main` and on tag `v0.3.1`. The `ACCESS` dict has 35 keys. The `ABOUT` dict has 14 keys, and those 14 are a subset of `ACCESS`. The README says 25 or more integrations and then names some of them. The three counts stay separate. The 35 keys are telegram, slack, email, gmail, google_calendar, browser, github, outlook, jira, monday, asana, confluence, zendesk, linear, gitlab, and discord. The rest are stripe, hubspot, dropbox, box, whatsapp, quickbooks, docusign, clickup, google_drive, canva, figma, close, notion, attio, posthog, mixpanel, amplitude, apollo, and hunter. The README also names the terminal, local files, and MCP. Those three are not keys in `ACCESS`.

`coworker/personas/builtin` has the same 17 directories and the same `ops.md` file on `main` and on tag `v0.3.1`. The directory names are `appsec-worker`, `change-worker`, `cloud-posture`, `dep-audit`, `design-worker`, `devops-lead`, `devsecops-lead`, `infra-worker`, `logs-worker`, `posture-worker`, `reviewer`, `secrets-worker`, `security`, `swe-lead`, `swe-worker`, `test-worker`, and `triage-lead`. Those files were not opened. The README says specialist security coworkers ship first.

## Governance as the README states it

The README describes four controls. Some operations stay human-only, and it says full auto-approve does not lower that floor. Other actions ask for approval by default. One approval can become a standing rule and then an allowlist. In auto-approve mode a reviewer model lets some actions through and escalates the rest. Repeated denials pause that reviewer. Every tool call is stored with its approval record. Commands and file tools can run in an NVIDIA OpenShell container, in the macOS sandbox, or under a hidden Windows local account. The three sandbox docs were not opened. Unattended runs do not approve themselves. The tree contains `permissions.py`, `reviewer.py`, `decision_reviewer.py`, `audit.py`, `unattended.py`, and `coworker/sandbox/`. Their bodies were not read, so this paragraph is the README, not a code trace.

## Reporting and license

`SECURITY.md` asks for reports at security@openworker.com and says the project will acknowledge them within 3 business days. In scope are the desktop app, the local server, the permission gates, and the OAuth broker. Out of scope are vulnerabilities in third-party model providers, vulnerabilities in the connected services themselves, and issues that need an already compromised machine. Supported versions are the latest release only. There is no bug bounty.

The license file is MIT. Its copyright line is 2024 Andrew Ng. The GitHub repo was created on 20 July 2026. Both dates stay.

## Other projects with the same name

PyPI `openworker` 0.0.1 is the placeholder above, not this tree. `SpaceAfterYou/OpenWorker` is a SoulWorker server emulator. `supergis/OpenWorker` is a data-processing framework. `different-ai/openwork-hub` uses the name OpenWork. `simonlin000/openworker-zh-CN` describes itself as a Chinese localization pack for this app. The search also returned `openworkers/openworkers-runner` and two other `openworkers` repos. Those three were not opened.

## See also

[Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms) lists this repo next to other local agent runtimes.
