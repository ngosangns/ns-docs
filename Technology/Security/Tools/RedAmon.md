---
area: technology
domain: security
type: tool
title: RedAmon
description: RedAmon (samugit83/redamon, MIT) is a self-hosted Docker penetration-testing framework that maps an authorized target into a Neo4j graph, runs an agent from a Kali sandbox behind approval gates, and can open a GitHub pull request for a fix.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - security
  - pentest
  - agents
resource: https://github.com/samugit83/redamon
---

# RedAmon

[RedAmon](https://github.com/samugit83/redamon) is a self-hosted penetration-testing framework. The site is [redamon.org](https://www.redamon.org/). License on the repo is MIT. Creator and maintainer is Samuele Giampieri (`samugit83`, [Devergo Labs](https://www.devergolabs.com/)). The README also names Ritesh Gohil (`L4stPL4Y3R`) as maintainer. Contact on the README: `samuele@redamon.org`. The same README points at [Pathbreak](https://pathbreak.io/) as a separate cloud-security product from the same creator.

Checked 2026-10-07. Created 2025-12-29. Default branch `master`. Language Python. 2,950 stars, 609 forks, 15 open issues. Last push 2026-10-07.

`DISCLAIMER.md` limits use to systems you own or have written permission to test, including authorized engagements, research, and CTFs. It says the tool does not enforce a global rate cap, so scan intensity is the operator's responsibility. `SECURITY.md` says only the latest code on `master` receives security updates, and that reports go to [GitHub private advisories](https://github.com/samugit83/redamon/security/advisories), not a public issue.

## What the README describes

The README's pipeline is reconnaissance, an exploitation phase, post-exploitation, triage, and a code fix that opens a GitHub pull request. Human approval gates and per-project rules of engagement sit on that path. This note does not repeat tool flags, payloads, or exploit steps. The wiki is [github.com/samugit83/redamon/wiki](https://github.com/samugit83/redamon/wiki).

| Piece | Role, from the README |
| --- | --- |
| Recon pipeline | Maps a domain, an IP or CIDR, or a batch of domains into the graph. Optional GVM/OpenVAS for network checks. A stealth setting keeps the pipeline on passive sources. |
| Agent | LangGraph agent in a Kali sandbox. It calls tools over MCP and can be steered from chat. The architecture diagram names MCP servers for network recon, Nuclei, Nmap, and Metasploit. |
| Graph | Neo4j. The README says 17 node types. Postgres holds project settings and accounts. |
| CypherFix | Triage of findings, then a code agent that clones a repository and opens a GitHub pull request. |
| MCP | The repo description says an outside MCP server can be added as a tool, and that Claude Code or another agent can drive RedAmon. |

The README says a guardrail that blocks government, military, and intergovernmental targets cannot be turned off. It also says the project was assessed with STRIDE and publishes a security-posture note and a threat-model note under `docs/readmes/`. Those documents were not re-audited for this entry.

The README says the recon pipeline can call TypeSafe Jev for typed decisions when the project owner has a Jev token. That hook is the TypeSafe decision model named on the project's wiki. It is not the [Decision 2.0](/Technology/AI/Concepts/LLM And Generative AI/Decision 2.0) collection.

The README claims 101 of 104 XBOW benchmark challenges solved black-box and links a wiki scorecard. That run was not repeated here. Badge counts for tools, detection rules, and models were not checked.

## Install

Docker with Compose v2. The README says the host does not need Node, Python, or the scanners installed locally. Minimums it prints: 2 CPU cores, 4 GB RAM, and 80 GB disk without OpenVAS; 4 cores, 8 GB RAM, and 110 GB with OpenVAS. It says an always-on server needs more disk than those minimums.

```bash
git clone https://github.com/samugit83/redamon.git
cd redamon
./redamon.sh install
```

`./redamon.sh install --gvm` adds GVM/OpenVAS. The README says the first GVM feed sync takes about 30 minutes. `./redamon.sh install --kbase` adds an optional local knowledge base. The web UI is `http://localhost:3000`. The installer asks for an admin email and a password of at least 12 characters. `./redamon.sh create-admin` creates that user if the prompt was skipped.

Without OpenVAS the README lists seven containers: webapp, postgres, neo4j, agent, kali-sandbox, recon-orchestrator, and docker-broker. The broker is a filtering proxy in front of the Docker socket.

Default install is for a local machine. The README says the raw stack has no internet-facing controls, and that putting it on a public IP exposes internal services. A separate hardened path lives in `tooling/deploy/single-host/` (nginx, TLS, a host firewall, one public HTTPS origin, internal services on loopback). Wiki: [Deploying to a Server](https://github.com/samugit83/redamon/wiki/Deploying-to-a-Server).

LLM keys are entered in the web UI (OpenAI, Anthropic, OpenRouter, Bedrock, or an OpenAI-compatible endpoint such as Ollama). There is no `.env` required for that.

## Version

`VERSION` and the top of `CHANGELOG.md` on `master` say **6.25.1**, dated 2026-10-07. The latest GitHub Release tag is still [v6.14.1](https://github.com/samugit83/redamon/releases/tag/v6.14.1), published 2026-09-11. `./redamon.sh update` pulls `master`. Treat the release page as behind the branch.

## License

Project code is MIT. `THIRD-PARTY-LICENSES.md` lists bundled tools under their own terms, including MIT, Apache-2.0, BSD, GPL, AGPL, LGPL, and the WPScan Public Source License. The README says the Kali image bundles WPScan, and that WPScan's license limits commercial SaaS and paid offerings unless WPScan grants a separate license. It says pentest engagements and personal use are allowed.

> **See also:** [Security Tools](/Technology/Security/Tools/Security Tools) · [Decision 2.0](/Technology/AI/Concepts/LLM And Generative AI/Decision 2.0)
