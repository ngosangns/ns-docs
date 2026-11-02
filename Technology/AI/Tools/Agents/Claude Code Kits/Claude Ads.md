---
area: technology
domain: claude-code
type: tool
title: Claude Ads
description: Claude Ads (AgriciDaniel/claude-ads, MIT) is a Claude Code skill that audits paid-media accounts across 12 platforms from exported evidence, and keeps live account changes behind a mutation gate.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - claude-code
  - marketing
  - agent-skills
resource: https://github.com/AgriciDaniel/claude-ads
---

# Claude Ads

[Claude Ads](https://github.com/AgriciDaniel/claude-ads) is a free MIT-licensed skill for Claude Code. You give it ad-account evidence and it reports what passed, what failed, and what it could not check, across Google, Meta, YouTube, LinkedIn, TikTok, Microsoft, Apple, Amazon, Reddit, Pinterest, Snapchat, and X. The README says it reads and reports. It does not change accounts on its own. Checked 2026-11-02 against the README, `pyproject.toml`, the GitHub API, and the release list. Not installed, no audit run, no account export uploaded.

## What a run does

Standalone installs use `/ads`. A Claude Code plugin install uses `/claude-ads:ads`. Both load `ads/SKILL.md`.

| Command | What the README says it returns |
| --- | --- |
| `/ads setup` | A saved profile: business model, goal, conversion, monthly spend, platforms, and who may approve a change. The README says never to paste API keys or tokens. |
| `/ads audit` | Pass, fail, unknown, and not-applicable checks, each tied to evidence. Platform shortcuts such as `/ads audit google` exist. |
| `/ads plan` | Channel, budget, measurement, and competitor plans. |
| `/ads create` | Copy, image, video, and product-photo briefs. |
| `/ads launch --draft` and `/ads optimize --draft` | A written change plan. The account is not touched. |
| `/ads monitor` | Pacing, delivery, tracking, fatigue, and policy checks. |
| `/ads experiment` | A test design, or a readout of a finished test. |
| `/ads report` | A saved run rendered as Markdown, HTML, or PDF. |
| `/ads research refresh` | A refresh of platform, policy, API, and benchmark evidence. |
| `/ads validate`, `/ads status`, `/ads next` | Contract checks, current state, and the top blocker. |

Evidence can be a CSV or JSON export, screenshots, or a pasted summary that includes the date range, currency, and timezone. The canonical artifact is versioned JSON. Markdown, HTML, and PDF are renderings of that bundle. One conductor owns scope and the final artifact. Workers return schema-valid findings. If a required worker fails, the run is partial and must not be shown as complete.

Each check is `pass`, `fail`, `unknown`, or `not_applicable`. Unknown means the input was missing. The README says it is never guessed. Health, evidence coverage, regulatory exposure, and opportunities stay separate scores. Coverage of 80% or more is graded, 60 to 79% is provisional, and below 60% is insufficient evidence. A disabled platform profile produces no health score.

## Status and writes

The README marks the project a development candidate. It is not release-ready until every gate in `control-plane/RELEASE_REQUIREMENTS.md` passes in a fresh verification context. All twelve account-health scoring profiles are disabled, so an audit reports findings and evidence coverage instead of a health score. Optional Cockpit (`ads-cockpit`, version 0.1.0) is a local workbench for a finished audit, including a synthetic demo. The main installer does not enable it. Its compatibility doc says it is not yet natively accepted.

Adapters are read-only by default. Applying a change needs an enabled capability for that exact operation, explicit account and object IDs, a before-and-after diff, owner approval inside account ceilings, an idempotency key, an audit destination, rollback, and a check that remote state still matches the precondition. Missing ceilings mean no write. Permanent deletion is not supported in v2. Credentials belong in environment variables, an OS keychain, or a secret manager, not in the repo, profiles, reports, or logs. The capability manifest at `control-plane/manifests/capability-manifest.json` is the record of what can be read or changed live. This note did not open that file.

## Install and versions

Claude Code is the only runtime the README calls verified. Codex, Gemini, Cursor, Windsurf, and Goose can receive the same skill files, and the installer marks those targets experimental. The native Claude Code flow is:

```text
/plugin marketplace add agricidaniel/claude-ads
/plugin install claude-ads@ai-marketing-hub-claude-ads
```

A marketplace added before v2.0.0 may still sit under the local alias `agricidaniel-claude-ads`. Remove that alias, then add the marketplace again. A local clone uses `bash install.sh --source=local`. The README says not to pipe a remote installer into a shell. `--source=git` clones default-branch HEAD, which is unpinned. Prefer a reviewed checkout or a release zip checked with `SHA256SUMS`. Releases are checksummed, not signed. A matching checksum shows the files match what that release published. It is not an independent proof of origin.

Managed dependencies need CPython 3.11 or 3.12. Linux x86_64 needs glibc 2.28 or later. musl is unsupported. PDF rendering needs WeasyPrint and Pango. Browser capture needs an operator-installed Playwright browser. `pyproject.toml` names the package `claude-ads-core` at version 2.0.0, with an empty required-dependency list and optional `weasyprint>=70,<71`. The latest GitHub release is `v2.1.0` (2026-10-16), titled as a Cockpit, routing, evidence, and installer update. Earlier tags are `v2.0.2` (2026-09-10) and `v2.0.1` (2026-07-13). `main` was pushed 2026-11-01, after that tag, so the branch can be ahead of the release. This note did not diff them.

There is a public MIT repo and a community mirror, `AI-Marketing-Hub/claude-ads`, for [AI Marketing Hub Pro](https://www.skool.com/ai-marketing-hub-pro) members. The GitHub homepage field points at that Skool page. The mirror was not fetched.

## Repo snapshot

GitHub API on 2026-11-02: created 2026-02-11, default branch `main`, Python, MIT, 10,662 stars, 1,551 forks, 5 open issues, about 6 MB. Topics include `agent-skills`, `claude-code`, `google-ads`, and `meta-ads`.

## Not checked

Not installed on Claude Code or any other host. No audit, plan, or draft mutation was run. Scoring behavior was not executed. The capability manifest, release-requirements file, and community mirror were not opened. Homepage membership terms were not read.
