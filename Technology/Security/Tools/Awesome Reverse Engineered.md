---
area: technology
domain: security
type: resource
title: Awesome Reverse Engineered
description: alexgaoth/awesome-reverse-engineered is a searchable index of about 12,900 open-source projects that exist because someone reverse engineered a closed app, API, device, protocol, file format, game or AI tool, with a website, a JSON dataset (CC0) and an agent skill that searches it. Use it to check whether the work is already done before reverse engineering something yourself.
timestamp: "2026-10-21T00:00:00.000Z"
tags:
  - technology
  - security
  - reverse-engineering
  - awesome-list
  - agents
resource: https://github.com/alexgaoth/awesome-reverse-engineered
---

# Awesome Reverse Engineered

[awesome-reverse-engineered](https://github.com/alexgaoth/awesome-reverse-engineered) (author `alexgaoth`) has one idea: "don't reverse engineer it twice". Before you open an app, API, device or file format in a disassembler, search the index for a maintained project that already did it. Site: [alexgaoth.github.io/awesome-reverse-engineered](https://alexgaoth.github.io/awesome-reverse-engineered/) (also [awesome.alexgaoth.com](https://awesome.alexgaoth.com)).

Checked 2026-10-21 through the GitHub API and raw files.

- **Repo:** created 2026-10-11, last push 2026-10-20, 37 commits (all in 10 days), 304 stars, 69 forks, 1 open issue. Python.
- **License:** code (scripts, site, skill) is MIT; the list and data are CC0 1.0 (`LICENSE-DATA`). Each linked project keeps its own license.
- **Size, per the README:** 12,869 projects with 10.7M GitHub stars between them. Health split: 7,077 active, 1,953 slowing, 2,491 dormant, 900 archived. Top languages are Python (3,298), C++ (1,861), C (1,697), JavaScript (842) and TypeScript (736). I counted the entries in `data/entries.json` and got 12,869, so the headline number matches the data.
- **Refresh:** a nightly GitHub Action updates stars, archived flags and dead links; 31 repos were removed this way (`data/removed.json`).
- **Translations:** README in English, Chinese, French and Spanish.

## Categories (README counts)

| Category | Projects |
| --- | --: |
| Game Decompilations and Reimplementations | 3,036 |
| Devices, IoT and Hardware | 3,028 |
| Unofficial Web/App API Clients | 904 |
| RE Tooling | 741 |
| AI Tools and LLM Clients | 737 |
| Automotive | 520 |
| Firmware and Embedded | 472 |
| File Formats | 436 |
| Drivers and Low-level Hardware | 432 |
| Network and Wire Protocols | 422 |
| Apple Ecosystem | 340 |
| Chinese and Asian Platforms | 324 |
| Messaging and Social Apps | 296 |
| Industrial and Building Automation | 291 |
| Desktop Software Reimplementations | 201 |
| Third-party Clients | 190 |
| Online Service Revivals | 173 |
| Alternative Frontends | 121 |
| Collections and Awesome Lists | 103 |
| Mobile Apps | 102 |

Each entry in `data/entries.json` has: name, URL, one-line description, category and subcategory, stars, archived flag, last push date, language, license, topics and the date it was added.

## The agent skill

`find-reverse-engineered` is a skill (folder `plugin/skills/find-reverse-engineered/`) built on one standard-library Python file, `re_index.py`. It downloads the index, caches it for 24 hours in `~/.cache/awesome-reverse-engineered/`, and has `search`, `info owner/repo`, `clone owner/repo` and `categories` commands. Filters: `--lang`, `--min-stars`, `--category`, `--include-archived`, `--json`.

Install options from the README: `npx skills add alexgaoth/awesome-reverse-engineered`, or the Claude Code plugin `/plugin install reverse-engineered --marketplace alexgaoth/awesome-reverse-engineered`, or download the single script with curl. I read the `SKILL.md` but did not run the script.

The workflow it prescribes is sensible: try an official API or SDK first; search with the vendor name plus the need; prefer a project that is not archived, was pushed in the last 1 to 2 years, matches your language and has a compatible license (blank license means all rights reserved); read the README with `info` before installing; and tell the user which project and version you chose. It also says to treat downloaded code as untrusted and not to give it credentials before reading it.

## Scope and caveats

- **Stated scope:** interoperability, preservation and research - unofficial clients, drivers, local-control libraries, file-format parsers, protocol docs, reimplementations, decompilations. Left out on purpose: exploits, jailbreaks, certificate-pinning and security bypasses, decryption tools, cheats, DRM or paywall removal, CAPTCHA solvers, account bots and credential tools. The README says 147 repos were dropped by that filter.
- **The index is wider than the stated scope** in places. The "most starred" and "just added" tables include relay proxies that expose subscription logins as APIs (CLIProxyAPI, sub2api), leaked system-prompt archives, and WeChat and Xiaohongshu crawlers. Those can break a service's terms of use or get an account locked. The README itself warns that unofficial clients may violate terms of service; use them with your own accounts and data.
- **Star counts look odd.** The index lists [REA](/Technology/AI/Tools/Agents/REA) at 342,757 stars, and the GitHub API returned 351,629 today, while my REA note recorded 11,741 on 2026-10-07. I could not explain the jump, so treat star-based ranking in this list with caution until it is checked.
- **Young and single-maintainer.** Ten days old, curated by one person with research agents; each entry is checked against the GitHub API for existence, stars and license, but not for quality or safety.
- **Unofficial APIs break** when the vendor changes its side. The health column (active, slowing, dormant, archived) is the quick check.

## Related

Pairs with [REA](/Technology/AI/Tools/Agents/REA) (do the reverse engineering when nothing exists yet), [Authorized Artifact Auditor](/Technology/Security/Tools/Authorized Artifact Auditor) and the lists in [Security Tools](/Technology/Security/Tools/Security Tools).
