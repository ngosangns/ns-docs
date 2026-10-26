---
area: technology
domain: security
type: tool
title: Security Audit Skill (Cloudflare)
description: "security-audit (cloudflare/security-audit-skill, MIT) is an agent skill that runs a six-phase defensive security audit - reconnaissance with a coverage ledger, isolated hunters, adversarial candidate validation, schema-validated findings.json, independent record verification, and target-neutral reports - seeded from Cloudflare's fleet-wide vulnerability discovery harness. 48.2k stars, 3k forks, 98 open issues at check time."
timestamp: "2026-10-27T00:00:00.000Z"
tags:
  - technology
  - security
  - agents
  - skills
  - audit
  - pentest
  - cloudflare
resource: https://github.com/cloudflare/security-audit-skill
---

# Security Audit Skill (Cloudflare)

[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) is an **agent skill** that turns a coding agent into a security auditor, described by Cloudflare as the single-repo starting point of the vulnerability discovery harness behind [Build your own vulnerability harness](https://blog.cloudflare.com/build-your-own-vulnerability-harness). Everything lives under `skills/security-audit/`; the repo is one skill, not a toolkit.

Checked 2026-10-27 against the README, `SKILL.md`, and the GitHub API. I did **not** install it or run an audit.

|                  |                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| License          | MIT                                                                                                                                 |
| Created / pushed | 2026-06-18 / 2026-09-14                                                                                                             |
| GitHub           | ~48,200 stars, ~3,000 forks, 98 open issues, default branch `main`, no releases                                                     |
| Language / size  | JavaScript for the two validators; ~143 KB checkout                                                                                 |
| Commits          | `literally-dan` 11, then three one-commit contributors                                                                              |
| Needs            | an agent with tool use and **parallel sub-agents**, Node for the validators, and an **OS-enforced sandbox** for running target code |
| Contact          | `security-ai-research@cloudflare.com` (README)                                                                                      |

## The six phases

| Phase                              | What happens                                                                                   | Artifact                                                 |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 1. Reconnaissance                  | Map architecture, trust boundaries, input surfaces, prior evidence, and deterministic coverage | `architecture.md`, `coverage-ledger.json`                |
| 2. Coverage-led hunting            | Assign isolated hunters per ledger unit, record every check, use coverage critics to find gaps | ledger updates                                           |
| 3. Candidate validation            | Every unique candidate goes to a **fresh verifier** that tries to disprove it                  | validated candidates                                     |
| 4. Structured output               | Write `confirmed`, `needs_validation`, `rejected` records and validate them against the schema | `findings.json` + `report-schema.json` check             |
| 5. Independent record verification | Fresh agents verify the final source claims; material replacements get another verifier        | verified records                                         |
| 6. Reporting                       | Derive reports from verified records and the coverage ledger, not from the transcript          | `REPORT.md`, `FINDINGS-DETAIL.md`, `NEEDS-VALIDATION.md` |

The parent agent runs `validate-coverage-ledger.cjs` after creating the ledger and after each update, and `validate-findings.cjs` in phase 4 and after every phase-5 replacement. Both validators are **zero-dependency** and ship with tests.

**Verdicts are deliberately narrow.** `confirmed` needs a complete source trace and a bounded observed result; `needs_validation` names one exact unresolved fact and carries **no severity**; `rejected` records a disproved candidate. There is no "likely" bucket and no score without an impact.

## Modes

- **Guidance mode** (default when the skill loads): security questions, focused reviews, methodology, triage. It does not run all six phases, create an output directory, or write artifacts.
- **Full audit mode**: only for an explicit audit/pen-test request, a full or end-to-end review, or when report artifacts are asked for. If the request could be either, the skill asks one question before writing files.
- Output defaults to `~/security-audit-skill/<repo-name>/run-<N>`; it writes inside the target repo only when you explicitly choose a directory that version control ignores.
- Runs are **additive**: prior ledgers and findings target gaps, revalidate changed source, and carry forward current-source evidence without counting stale work as covered.

## Hunting classes (reference files)

| File                                      | Covers                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| `ATTACK-CLASSES.md`                       | Core, wildcard, and "obvious things" prompts                                        |
| `MEMORY-SAFETY-AND-BINARY.md`             | Native targets: memory safety, binary, kernel                                       |
| `AI-AND-LLM.md`                           | Prompt injection, agent/tool boundaries, output handling                            |
| `WEB-PROTOCOL-AND-AUTH.md`                | HTTP request framing, caching, authentication protocols                             |
| `CLIENT-SIDE.md`                          | DOM injection, messaging trust, UI redress, prototype pollution                     |
| `SUPPLY-CHAIN-AND-RELEASE.md`             | Dependencies, CI, signing, update, plugin and extension surfaces                    |
| `CLOUD-AND-DEPLOYMENT.md`                 | IAM, infrastructure as code, containers, serverless, ingress, runtime config        |
| `PROTOCOLS-RPC-AND-MESSAGING.md`          | RPC, serialization, queues, brokers, webhooks, streaming                            |
| `RESOURCE-EXHAUSTION-AND-AVAILABILITY.md` | Shared resources, quotas, workers, operator spend                                   |
| `DATA-ISOLATION-AND-LIFECYCLE.md`         | Tenant isolation, cache, search, export, backup, migration, deletion, restore       |
| `DESKTOP-MOBILE-AND-LOCAL-IPC.md`         | Native apps, deep links, webviews, exported components, helpers, daemons, local IPC |

Orchestration lives in `RECONNAISSANCE.md`, `HUNTING.md`, `VALIDATION-AND-REPORTING.md` and `SKILL.md` (~22 KB, including setup, terminology, safety rules and audit anti-patterns).

## Safety model

Source inspection is read-only. Target-controlled builds, tests, processes, browsers, emulators, fuzzers and fixtures may run **only** inside an OS-enforced sandbox that provides:

- no external network (loopback namespace only when local client/server traffic is needed),
- an empty environment populated from an allowlist, with scratch-local `HOME`, temp dirs and caches,
- a read-only target and toolchain, with writes confined to an assigned `scratch/`,
- explicit CPU, memory, process, file-size, disk and wall-clock limits.

No dependency installation by builds, no probing deployed endpoints or other users' data, no availability tests against live processes, no paid quota. **If any control cannot be enforced, the skill does not execute target code** and reports the missing capability as a `needs_validation` blocker with a safe validation plan.

## Design principles (from the README)

- Only **established boundary failures** are confirmed; a source-grounded blocked lead stays `needs_validation` with its exact unresolved fact.
- **Adversarial validation** — the agent that checks a finding is never the agent that found it.
- **Severity requires impact** — likelihood × impact, not deviation from a checklist.
- **Defense-in-depth gaps are not vulnerabilities** — if layer A stops the attack, a missing layer B is a hardening note.
- **Multiple runs improve coverage** — in Cloudflare's own test runs, one run found roughly half of what repeated runs found in total.

## Install and use

```bash
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit --global
```

Then start the agent in the target repo and ask, e.g. `security audit this codebase`, `find security vulnerabilities in ./src`, or `do a security review, output to ~/audits/my-project`. The skill also triggers on security questions in guidance mode.

## Caveats

- **Not a turnkey scanner** — the value is the process (ledger, isolation, adversarial verification), and it depends on the host model and on real sub-agent parallelism.
- **The sandbox is the bottleneck** — without an OS-enforced sandbox the workflow degrades to source reading and `needs_validation` records rather than reproduction.
- **High stars, low maintenance surface** — one main contributor, 98 open issues, last push 2026-09-14. The blog post describes a much larger fleet-wide system; this repo is the seed, not that system.
- **"Confirmed" still needs human judgement** on severity and fix priority; `needs_validation` is not a finding.
- Not checked: installing the skill, running a full audit, or reproducing any finding.

See also [Authorized Artifact Auditor](/Technology/Security/Tools/Authorized Artifact Auditor) (different, more aggressive skill pack), [RedAmon](/Technology/Security/Tools/RedAmon), [Security Tools](/Technology/Security/Tools/Security Tools), [AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI Coding Productivity Tools).
