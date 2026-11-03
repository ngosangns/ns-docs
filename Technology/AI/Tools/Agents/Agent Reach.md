---
area: technology
domain: coding-agents
type: tool
title: Agent Reach
description: "Agent Reach (Panniantong/Agent-Reach, MIT) is a Python CLI that gives coding agents read commands for web and social channels. Checked 3 November 2026, version 1.6.1 matches the latest release, and the PyPI package agent-reach is a different project."
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - coding-agents
  - agents
  - search
resource: https://github.com/Panniantong/Agent-Reach
sources:
  - id: github-api
    resource: https://github.com/Panniantong/Agent-Reach
    author: human:Neo Reid
  - id: readme
    resource: https://github.com/Panniantong/Agent-Reach/blob/main/README.md
    author: human:Neo Reid
  - id: readme-en
    resource: https://github.com/Panniantong/Agent-Reach/blob/main/docs/README_en.md
    author: human:Neo Reid
  - id: pyproject
    resource: https://github.com/Panniantong/Agent-Reach/blob/main/pyproject.toml
    author: human:Neo Reid
  - id: llms
    resource: https://github.com/Panniantong/Agent-Reach/blob/main/llms.txt
    author: human:Neo Reid
  - id: pypi
    resource: https://pypi.org/pypi/agent-reach/json
    author: human:Jean Galea
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# Agent Reach

[Agent Reach](https://github.com/Panniantong/Agent-Reach) is a Python CLI named `agent-reach`. The script entry is `agent_reach.cli:main`. The root README and `docs/README_en.md` describe the same product in Chinese and English. Checked 3 November 2026 against the GitHub API, both READMEs, `pyproject.toml` on `main` and at tag `v1.6.1`, `llms.txt`, the `agent_reach/channels` listing, `SECURITY.md`, and the PyPI JSON for `agent-reach`. The repo was not cloned. The CLI was not installed. No channel was called.

The GitHub profile for `Panniantong` displays the name Pnant. `pyproject.toml` lists the author as Neo Reid. The README links X as [@Neo_Reidlab](https://x.com/Neo_Reidlab) and prints the email pnt01@foxmail.com. The license copyright line is 2025 Agent Eyes. The repo was created 2026-02-24T02:10:24Z. Those labels stay separate. The X profile and the email inbox were not opened.

## Version

`pyproject.toml` on `main` and on tag `v1.6.1` both say version 1.6.1, Python `>=3.10`, and MIT. The classifier line says Development Status Beta. `releases/latest` is v1.6.1, published 2026-11-01T07:24:15Z. HEAD is `7a38047acf26a729cbb27851e3cb81639da86b29`, committer date 2026-11-01T07:23:03Z, message "Merge pull request #897 from Panniantong/release/1.6.1". `pushed_at` is 2026-11-01T07:23:13Z.

The repo API at 2026-11-02T21:44:37Z listed 108,045 stars, 9,640 forks, and 267 open issues. The repo is public, not archived, language Python, default branch `main`. Size is 3,269 KB. The API homepage is null. The API description says one CLI and zero API fees. `pyproject.toml` keywords include `free-api` and `no-api-key`. The channel table still requires a Groq or OpenAI key for some actions. Those sentences stay separate.

`llms.txt` tells a reader to install with `uv tool install` from the tag zip `v1.6.0`. The current release is v1.6.1. `docs/install.md` was not opened, so this note does not say whether that file still names 1.6.0.

The dependency `yt-dlp[default]` is pinned to `==2026.8.19`. Tests were not run.

## Channels

Both READMEs list the same 14 channels and the same level for each one. The row order differs. `agent_reach/channels` has one module for each of those 14 names, plus `base.py` and `_opencli_site.py`. No extra platform module was in that directory. The module bodies were not opened.

| Channel | Level | What the English table says it needs |
| --- | --- | --- |
| github, web, v2ex | default | nothing |
| youtube | default | nothing for info, search, and subtitles. Speech to text needs a Groq or OpenAI key |
| bilibili | default | nothing for search, info, and trending. Subtitles need a login by QR scan |
| reddit, boss, xiaohongshu | optional | login |
| linkedin | optional | public jobs need nothing. In-site search needs a login |
| xueqiu | optional | quotes need nothing. Hot posts and hot stocks need a login |
| xiaoyuzhou | optional | a Groq key |
| twitter, facebook, instagram | experimental | login |

The English README says default channels work after install and can be removed so later updates do not add them back. Optional channels turn on when you ask. Experimental channels can break when a site tightens blocking. The GitHub description names Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu. Twitter is experimental. Reddit and XiaoHongShu are optional. The description does not say those six are the default set.

`llms.txt` says `agent-reach channels` is the live list of actions. That command was not run. It also names error codes `NEED_SETUP`, `NEED_LOGIN`, `UPSTREAM_BROKEN`, `TIMEOUT`, `RATE_LIMITED`, `NOT_FOUND`, and `BAD_INPUT`.

The root README says a Bilibili video read tries bili-cli first and a public Bilibili interface second, and a web read tries Jina Reader then Exa. Credits name OpenCLI, bili-cli, boss-agent-cli, yt-dlp, Jina Reader, and Exa. Those upstream repos were not opened on this check.

## Login, state, and the other PyPI package

Both READMEs say the tool searches and reads. They say it does not post, comment, like, or send messages. They say it never logs in for you and never asks for a password. They say some platforms reuse a login already on the computer, for that one site, and the original browser stays unchanged. A login window opens only when a new sign-in is needed, and the person completes it. They say the dedicated browser accepts connections from this computer only. They suggest a secondary account. Keys go in your own terminal with `agent-reach configure groq-key`, not in chat. That command was not run.

`llms.txt` says browser channels share one CloakBrowser profile at `~/.agent-reach/browser/profile`, with system Chrome if that download fails. It says the browser closes after 10 idle minutes, one-time site imports exist, and no personal cookie database is read. The session doc `agent_reach/skill/references/sessions.md` was not opened, so the README's "copy this site's login" line and the cookie-database line stay as two sentences from two files.

State for channel tools, logins, and settings is `~/.agent-reach/`, per both READMEs. `llms.txt` also says `setup` writes a skill at `~/.agents/skills/agent-reach/SKILL.md` and links it into other agents found on the machine. Those are two directories.

Both READMEs say the PyPI package named `agent-reach` is not this project. The PyPI JSON on this check is version 0.1.0, author Jean Galea, wheel upload 2026-08-02T13:55:57Z. Its summary talks about per-channel install, one output shape, caching, and a token budget. Its home page is the PyPI project URL. The wheel was not downloaded.

## Security contact and names that are not this repo

`SECURITY.md` says only the latest version is supported. Reports go to GitHub private advisories, not a public issue. It says acknowledgement within 48 hours, a status update within 7 days, and a fix timeline within 14 days. Dependencies, social engineering, and denial of service by resource exhaustion are out of scope.

Both READMEs say Agent Reach has no official token, coin, investment product, fee-claim program, wallet connection, or Solana or Pump.fun project. They say a crypto project that uses the name, the GitHub URL, or the author identity is not this repository.

Search also returned `EdisonChenAI/agent-reach`, whose description mentions Douyin, and `vibe-with-me-tools/agent-reachout`. Those repositories were not opened. A badge image alt text says Trendshift GitHub Trending number 1 repository of the day. That badge page was not opened. The README names a sponsor block and an AtomGit mirror. The sponsor price lines and the mirror were not checked.

## See also

[AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI Coding Productivity Tools) lists this CLI with other agent utilities.
